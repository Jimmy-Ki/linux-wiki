---
title: who - Show logged in users
slug: who
tags: [system-info, linux-commands]
sidebar_label: who
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# who - Show logged in users

The `who` command displays information about users currently logged into the system, including their login time, terminal, and remote host.

## Syntax

```bash
who [OPTION] [FILE] [am i]
```

## Common Options

- `-a`, `--all`: Same as `-b -d --login -p -r -t -T -u`
- `-b`, `--boot`: Time of last system boot
- `-d`, `--dead`: Print dead processes
- `-H`, `--heading`: Print line of column headings
- `-l`, `--login`: Print system login processes
- `-m`: Only hostname and user associated with stdin
- `-p`, `--process`: Print active processes spawned by init
- `-q`, `--count`: All login names and number of users logged on
- `-r`, `--runlevel`: Print current runlevel
- `-s`, `--short`: Print only name, line, and time (default)
- `-t`, `--time`: Print last system clock change
- `-T`, `-w`, `--mesg`: Add user's message status as +, - or ?
- `-u`, `--users`: List users logged in

## Usage Examples

### Basic Usage
```bash
# Display basic user information
who
# Output:
# user1   tty1         2023-11-10 09:15
# user2   pts/0        2023-11-10 10:30 (192.168.1.100)
# user3   pts/1        2023-11-10 11:45 (192.168.1.101)
```

### Count Users
```bash
# Count number of logged-in users
who -q
# Output:
# user1 user2 user3
# # users=3
```

### Detailed Information
```bash
# Show all information with headers
who -H -a
# Output:
# NAME       LINE         TIME             IDLE     PID COMMENT
# user1      tty1         2023-11-10 09:15  .        1234
# user2      pts/0        2023-11-10 10:30  00:05    2345 (192.168.1.100)
```

### Show Current User
```bash
# Show current user information
who am i
# Output: user2 pts/0        2023-11-10 10:30 (192.168.1.100)

# Alternative method
who -m
# Output: user2 pts/0        2023-11-10 10:30 (192.168.1.100)
```

### System Information
```bash
# Show boot time and runlevel
who -b -r
# Output:
# system boot  2023-11-09 08:00
# run-level 5  2023-11-10 09:15
```

### Message Status
```bash
# Show user message status
who -T
# Output:
# user1   +   tty1         2023-11-10 09:15
# user2   -   pts/0        2023-11-10 10:30 (192.168.1.100)
# Message status: + (accepts messages), - (doesn't accept), ? (cannot determine)
```

## Understanding the Output

### Columns
- **NAME**: Username
- **LINE**: Terminal line (tty, pts/0, etc.)
- **TIME**: Login time
- **IDLE**: Idle time (if -u option used)
- **PID**: Process ID
- **COMMENT**: Remote host or other information

### Terminal Types
- **tty**: Physical terminal (direct connection)
- **pts**: Pseudo-terminal (SSH, terminal emulator)
- **console**: System console

## Best Practices

1. **Use `who -q`** for quick user count
2. **Use `who -a`** for comprehensive system information
3. **Monitor user activity** in security scripts:
   ```bash
   # Alert if too many users are logged in
   USER_COUNT=$(who -q | tail -1 | cut -d'=' -f2)
   if [ $USER_COUNT -gt 10 ]; then
       echo "Warning: $USER_COUNT users logged in"
   fi
   ```
4. **Check for suspicious logins**:
   ```bash
   # Monitor for unusual login times
   who | grep -E "(0[0-6]:[0-5][0-9]|2[2-3]:[0-5][0-9])"
   ```

## Related Commands

- `w`: Show who is logged on and what they are doing
- `last`: Show listing of last logged in users
- `users`: Print the names of users currently logged in
- `finger`: User information lookup program
- `whoami`: Display current username

## Troubleshooting

### Common Issues

1. **Ghost sessions**: Users shown as logged in but not actually active
2. **Stale entries**: Old login sessions that haven't been properly terminated
3. **Permission denied**: Usually doesn't require special permissions

### Cleanup Stale Sessions
```bash
# Find and kill stale SSH sessions
who -u | awk '$5 ~ /[0-9]+/ && $5 > 3600 { print $1, $2, $6 }' | while read user line pid; do
    echo "Killing stale session: $user on $line (PID: $pid)"
    kill -9 $pid 2>/dev/null
done
```

### Security Monitoring
```bash
# Monitor for multiple logins from same user
who | awk '{print $1}' | sort | uniq -c | sort -nr | awk '$1 > 1'
```

### Script Examples
```bash
#!/bin/bash
# User activity report
echo "=== Current Users ==="
who -H
echo ""
echo "=== User Count ==="
echo "Total users logged in: $(who -q | tail -1 | cut -d'=' -f2)"
echo ""
echo "=== System Uptime ==="
uptime
echo ""
echo "=== Boot Time ==="
who -b
```