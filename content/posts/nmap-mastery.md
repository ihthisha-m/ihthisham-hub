---
title: "Nmap Mastery: From Basics to Advanced Recon"
date: "2026-03-08"
excerpt: "A comprehensive reference covering Nmap's most powerful scan types, NSE scripts, and stealth techniques for penetration testing engagements."
tags: ["nmap", "recon", "tools", "oscp"]
featured: false
---

# Nmap Mastery

Nmap (Network Mapper) is the most essential tool in a penetration tester's arsenal. This cheatsheet covers everything from basic host discovery to advanced NSE scripting.

## Basic Syntax

```bash
nmap [scan type] [options] <target>
```

## Host Discovery

```bash
# Ping sweep (no port scan)
nmap -sn 192.168.1.0/24

# Disable ping, treat all as up
nmap -Pn 192.168.1.100

# ARP scan (fast, local network)
nmap -PR 192.168.1.0/24
```

## Port Scanning Techniques

```bash
# SYN scan (stealthy, requires root)
nmap -sS 10.10.10.100

# TCP connect scan (no root needed)
nmap -sT 10.10.10.100

# UDP scan (slow but important)
nmap -sU 10.10.10.100

# All ports
nmap -p- 10.10.10.100

# Common ports only
nmap --top-ports 1000 10.10.10.100

# Specific port range
nmap -p 1-65535 10.10.10.100
```

## Service & Version Detection

```bash
# Service version detection
nmap -sV 10.10.10.100

# Aggressive version detection
nmap -sV --version-intensity 9 10.10.10.100

# OS detection
nmap -O 10.10.10.100
```

## The Ultimate OSCP Scan

```bash
# Full OSCP-style enumeration
nmap -A -T4 -p- --min-rate=1000 10.10.10.100 -oN full_scan.txt
```

## NSE Scripts

```bash
# Default scripts
nmap -sC 10.10.10.100

# Vuln scripts
nmap --script vuln 10.10.10.100

# SMB enumeration
nmap --script smb-enum-shares,smb-enum-users -p 445 10.10.10.100

# HTTP enumeration
nmap --script http-title,http-headers -p 80,443 10.10.10.100

# FTP anonymous login
nmap --script ftp-anon -p 21 10.10.10.100
```

## Output Formats

```bash
# Normal output
nmap -oN scan.txt target

# XML output (for parsers)
nmap -oX scan.xml target

# Grepable output
nmap -oG scan.gnmap target

# All formats
nmap -oA scan target
```

## Stealth Techniques

```bash
# Fragment packets (evade some IDS)
nmap -f 10.10.10.100

# Decoy scan
nmap -D RND:10 10.10.10.100

# Slow scan (evade rate limiting)
nmap -T0 10.10.10.100

# Randomize host order
nmap --randomize-hosts 192.168.1.0/24
```

## Pro Tips

1. **Always save output** — `nmap -oA` saves all formats
2. **Start broad** — ping sweep first, then targeted scans
3. **UDP matters** — SNMP (161), DNS (53), TFTP (69) often overlooked
4. **Use `--reason`** — shows why ports are in a given state
5. **Timing** — `-T4` is fastest reliable; never use `-T5` in exams

Master Nmap and you master recon. 🗡️
