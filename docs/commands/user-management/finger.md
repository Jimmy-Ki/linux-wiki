---
title: finger - User information lookup program
sidebar_label: finger
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# finger - User Information Lookup Program

The `finger` command is a user information lookup utility that displays information about users on the system. It can show who is currently logged in, their login times, idle periods, and additional personal information stored in system files. The command can query local users or remote users across the network, providing comprehensive details about user accounts, login sessions, and system activity. Finger is particularly useful for system administrators to monitor user activity and for users to find information about other system users.

## Basic Syntax

```bash
finger [OPTIONS] [USER[@HOST]...]
```

## Common Options

### Display Options
- `-l` - Force long output format (default when finger is invoked without arguments)
- `-s` - Force short output format (default when finger is invoked with arguments)
- `-m` - Prevent matching user names (exact matches only)
- `-p` - Prevent display of user's project file (~/.project)
- `-b` - Brief format (don't display user's home directory and shell)

### Display Control
- `-h` - Suppress display of user's .project file
- `-w` - Force wide output format

### Legacy Options
- `-i` - Force "idle" output format (Unix System V style)
- `-q` - Quick format: display only login name, terminal, and login time

## Usage Examples

### Basic User Information Queries

#### Display Information for a Specific User
```bash
# Display information for user john
finger john

# Display information for user with full name match
finger -m "John Smith"

# Force long format output
finger -l john

# Force short format output
finger -s john

# Quick format - just login info
finger -q john
```

#### Display All Logged-in Users
```bash
# Show all currently logged-in users
finger

# Show all users in short format
finger -s

# Show all users in wide format
finger -w

# Brief format without home directory and shell
finger -b
```

### Remote User Queries

#### Query Users on Remote Systems
```bash
# Query user on remote host
finger john@remote.example.com

# Query all users on remote host
finger @remote.example.com

# Query with specific port
finger john@remote.example.com:79

# Multiple remote queries
finger john@host1.com mary@host2.com
```

### Filtering and Formatting

#### Suppress Specific Information
```bash
# Don't display .project file
finger -p john

# Don't display .plan file
finger -h john

# Brief format (no home directory, shell)
finger -b john

# Multiple formatting options
finger -p -b -s john
```

#### Exact Name Matching
```bash
# Match exact username only (no partial matches)
finger -m john

# Useful when similar usernames exist
finger -m admin

# Prevent partial matches like 'administrator'
finger -m user
```

### System Administration Examples

#### Monitor User Activity
```bash
# Monitor who is currently logged in
finger

# Check specific user's login status
finger username

# Find when a user last logged in
finger -l username | grep "Last login"

# Monitor idle time of users
finger -s | awk '{print $1, $4, $5}'
```

#### User Information Auditing
```bash
# Get detailed information about a user
finger -l username

# Check user's plan and project files
finger -l username | grep -A10 "Plan:"

# Display user's login shell and home directory
finger -s username | awk '{print $6, $7}'

# List users with specific shell
finger -s | grep "/bin/bash"
```

### Integration with Other Commands

#### Pipeline Operations
```bash
# Count logged-in users
finger | grep "Login" | wc -l

# Get list of usernames only
finger -s | awk 'NR>1 {print $1}' | grep -v "Login"

# Find users with idle time more than 1 hour
finger -s | awk 'NR>1 && $5 > "1:00" {print $1, $5}'

# Sort users by login time
finger -s | sort -k6,7

# Monitor user activity in real-time
watch "finger -s"
```

#### Combining with System Tools
```bash
# Cross-reference with process information
finger -s | while read user; do
    ps -u "$user" --no-headers 2>/dev/null && echo "---"
done

# Check disk usage for logged-in users
finger -s | awk 'NR>1 {print $1}' | xargs -I {} sudo du -sh /home/{} 2>/dev/null

# Verify user account status
finger -s | awk 'NR>1 {print $1}' | xargs -I {} getent passwd {}

# Monitor users with running processes
finger -s | awk 'NR>1 {print $1}' | xargs -I {} pgrep -u {} && echo $?
```

## Practical Examples

### System Monitoring

#### Real-time User Monitoring
```bash
#!/bin/bash
# Monitor user activity with alerts

while true; do
    clear
    echo "=== User Activity Monitor ==="
    echo "Time: $(date)"
    echo ""

    # Display current users
    finger -s

    # Highlight users with long idle times
    echo ""
    echo "=== Users Idle > 30 minutes ==="
    finger -s | awk 'NR>1 && $5 ~ /[3-9][0-9]:/ {print $1, $5}'

    sleep 60
done
```

#### User Login History Analysis
```bash
#!/bin/bash
# Analyze user login patterns

echo "=== User Login Analysis ==="
echo "Generated on: $(date)"
echo ""

# Count logins by user
echo "=== Login Counts by User ==="
last | grep -v "reboot" | awk '{print $1}' | sort | uniq -c | sort -nr

echo ""
echo "=== Currently Active Users ==="
finger -s

echo ""
echo "=== Users with Long Idle Times ==="
finger -s | awk 'NR>1 && $5 ~ /[1-9][0-9]:/ {print $1, $5}'
```

### User Management

#### User Account Verification
```bash
#!/bin/bash
# Verify user account information

USER="$1"
if [ -z "$USER" ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

echo "=== User Information for: $USER ==="
echo ""

# Basic finger information
finger -l "$USER"

echo ""
echo "=== Additional System Information ==="

# Check if user exists
if id "$USER" &>/dev/null; then
    echo "User account exists: YES"
    echo "UID: $(id -u "$USER")"
    echo "GID: $(id -g "$USER")"
    echo "Primary group: $(id -gn "$USER")"
    echo "Home directory: $(getent passwd "$USER" | cut -d: -f6)"
    echo "Shell: $(getent passwd "$USER" | cut -d: -f7)"
else
    echo "User account exists: NO"
fi
```

#### User Activity Report
```bash
#!/bin/bash
# Generate comprehensive user activity report

echo "=== User Activity Report ==="
echo "Generated: $(date)"
echo "Hostname: $(hostname)"
echo ""

# Current logged-in users
echo "=== Currently Logged-in Users ==="
finger -s
echo ""

# User login statistics
echo "=== Login Statistics (Last 100 logins) ==="
last | head -n 100 | grep -v "reboot" | awk '{print $1}' | sort | uniq -c | sort -nr
echo ""

# Users with .plan files
echo "=== Users with Plan Files ==="
for user in $(finger -s | awk 'NR>1 {print $1}'); do
    if [ -f "/home/$user/.plan" ]; then
        echo "$user: Has .plan file"
    fi
done
```

### Security Monitoring

#### Suspicious Activity Detection
```bash
#!/bin/bash
# Monitor for suspicious user activity

echo "=== Security Activity Monitor ==="
echo "Time: $(date)"
echo ""

# Users logged in from unusual locations
echo "=== Unusual Login Locations ==="
who | grep -v -E "(localhost|127\.0\.0\.1|::1)" | while read line; do
    echo "ALERT: $line"
done

echo ""
echo "=== Users with Long Idle Times ==="
finger -s | awk 'NR>1 && $5 ~ /[2-9][0-9]:/ {print $1, $5}'

echo ""
echo "=== Multiple Logins ==="
finger -s | awk 'NR>1 {print $1}' | sort | uniq -d | while read user; do
    echo "ALERT: User $user has multiple logins"
done
```

## Advanced Usage

### Custom Output Formatting

#### Custom User Information Display
```bash
#!/bin/bash
# Custom formatted user information

format_user_info() {
    local user="$1"
    echo "----------------------------------------"
    echo "User: $user"
    echo "----------------------------------------"

    # Get finger information
    finger_info=$(finger -l "$user" 2>/dev/null)

    if [ $? -eq 0 ]; then
        # Extract and format specific information
        echo "$finger_info" | grep "Login name:" | sed 's/Login name:/Login:/'
        echo "$finger_info" | grep "Directory:" | sed 's/Directory:/Home:/'
        echo "$finger_info" | grep "Shell:" | sed 's/Shell:/Shell:/'
        echo "$finger_info" | grep "On since:" | sed 's/On since:/Login time:/'
        echo "$finger_info" | grep "Idle Time:" | sed 's/Idle Time:/Idle:/'

        # Show plan if it exists
        plan=$(echo "$finger_info" | sed -n '/Plan:/,$p')
        if [ -n "$plan" ]; then
            echo ""
            echo "Plan:"
            echo "$plan" | tail -n +2
        fi
    else
        echo "User $user not found or no information available"
    fi
    echo ""
}

# Usage examples
format_user_info "username"
```

#### Finger Output Parsing
```bash
#!/bin/bash
# Parse finger output for specific information

parse_finger_output() {
    local user="$1"

    # Get finger output
    output=$(finger -l "$user" 2>/dev/null)

    if [ $? -ne 0 ]; then
        echo "Error: User $user not found"
        return 1
    fi

    # Parse specific fields
    login_name=$(echo "$output" | grep "Login name:" | awk '{print $3}')
    real_name=$(echo "$output" | grep "Name:" | cut -d: -f2- | sed 's/^ *//')
    directory=$(echo "$output" | grep "Directory:" | awk '{print $2}')
    shell=$(echo "$output" | grep "Shell:" | awk '{print $2}')
    login_time=$(echo "$output" | grep "On since:" | awk '{print $3, $4}')
    idle_time=$(echo "$output" | grep "Idle Time:" | awk '{print $3, $4}')

    # Output parsed information
    echo "Username: $login_name"
    echo "Real name: $real_name"
    echo "Home directory: $directory"
    echo "Shell: $shell"
    echo "Login time: $login_time"
    echo "Idle time: $idle_time"

    # Check for .plan file
    if echo "$output" | grep -q "Plan:"; then
        echo ""
        echo "Plan:"
        echo "$output" | sed -n '/Plan:/,$p' | tail -n +2
    fi
}

# Example usage
parse_finger_output "$1"
```

### Network Security Considerations

#### Remote Finger Security
```bash
#!/bin/bash
# Secure remote finger queries

secure_finger_query() {
    local user="$1"
    local host="$2"
    local port="${3:-79}"

    # Security checks
    if [[ "$host" =~ [0-9]+\.[0-9]+\.[0-9]+\.[0-9]+ ]]; then
        echo "WARNING: Using IP address directly may bypass DNS security checks"
    fi

    # Use telnet for finger protocol if finger command doesn't support remote
    if command -v finger >/dev/null 2>&1; then
        finger "${user}@${host}" 2>/dev/null
    else
        echo "Fallback: Using telnet to finger port"
        echo "" | nc "$host" "$port" 2>/dev/null | grep -i "$user" || \
        echo "Finger service not available on $host:$port"
    fi
}

# Example usage with error handling
secure_finger_query "john" "example.com"
```

## Troubleshooting

### Common Issues

#### Finger Service Not Available
```bash
# Check if finger service is running
systemctl status finger

# Check if finger port is open
netstat -tlnp | grep :79
telnet localhost 79

# Enable finger service (if available)
sudo systemctl enable finger
sudo systemctl start finger

# Install finger server if needed
# Debian/Ubuntu:
sudo apt-get install finger-server

# RHEL/CentOS:
sudo yum install finger-server
```

#### User Information Not Displaying
```bash
# Check user account existence
id username
getent passwd username

# Check finger daemon configuration
cat /etc/finger.conf 2>/dev/null

# Verify .plan and .project file permissions
ls -la /home/username/.plan
ls -la /home/username/.project

# Check home directory permissions
ls -ld /home/username

# Test with different options
finger -l username
finger -s username
finger -m username
```

#### Remote Query Failures
```bash
# Test network connectivity
ping remote_host
telnet remote_host 79

# Check firewall rules
sudo iptables -L -n | grep 79
sudo ufw status | grep finger

# Use alternative method
echo "" | nc remote_host 79

# Debug with verbose output
finger -l username@remote_host
```

### Permission Issues

#### Fixing Finger Information Access
```bash
# Ensure finger service can read user information
sudo chmod 755 /home
sudo chmod 755 /home/username

# Set proper permissions for .plan and .project files
chmod 644 /home/username/.plan
chmod 644 /home/username/.project

# Check SELinux context (if enabled)
ls -Z /home/username/
sudo restorecon -R /home/username/

# Configure finger daemon security
sudo nano /etc/xinetd.d/finger
# Set disable = no
# Set only_from = 127.0.0.1 localhost your_network
```

## Related Commands

- [`who`](/docs/commands/system-info/who) - Display who is logged in
- [`w`](/docs/commands/system-info/w) - Show who is logged in and what they are doing
- [`users`](/docs/commands/user-management/users) - Display a list of current users
- [`last`](/docs/commands/system-info/last) - Display listing of last logged in users
- [`lastlog`](/docs/commands/system-info/lastlog) - Display the most recent login of all users
- [`id`](/docs/commands/system-info/id) - Display user identity
- [`whoami`](/docs/commands/system-info/whoami) - Print effective user ID
- [`logname`](/docs/commands/system-info/logname) - Print user's login name
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database
- [`pinkfinger`](/docs/commands/user-management/pinkfinger) - Finger client with IPv6 support

## Best Practices

1. **Security Considerations**: Disable finger service on production systems as it can reveal user information
2. **Privacy**: Inform users about what information finger displays and how to control it
3. **Network Security**: Restrict finger access to trusted networks only
4. **User Education**: Teach users to manage their .plan and .project files appropriately
5. **Monitoring**: Use finger responsibly for system monitoring, not user surveillance
6. **Alternative Tools**: Consider using `who` or `w` for basic login information when less detail is needed
7. **Configuration**: Properly configure finger daemon to limit information disclosure
8. **Audit**: Regularly review who has access to finger services and user information

## Performance Tips

1. **Local Queries**: Finger is very fast for local user information queries
2. **Network Queries**: Remote finger queries depend on network latency and remote service availability
3. **Caching**: Finger doesn't cache results, but system user information is cached by the OS
4. **Batch Processing**: Use shell scripts to process multiple users efficiently
5. **Alternative Tools**: For performance-critical applications, consider using `/etc/passwd` parsing directly
6. **Resource Usage**: Finger has minimal system impact for local queries
7. **Concurrent Queries**: Avoid making many simultaneous remote finger queries
8. **Service Limits**: Configure connection limits on finger daemon to prevent abuse

The `finger` command remains a useful tool for user information lookup, especially in academic and development environments where user collaboration and information sharing are valued. While its use has declined due to security concerns, it still provides valuable functionality for system administrators and users who need to find information about other system users.

---

*Security Note: Many modern Linux distributions disable the finger service by default due to security concerns. User information disclosure can potentially aid attackers. Always consider security implications before enabling finger services, especially on internet-facing systems.*