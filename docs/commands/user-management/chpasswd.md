---
title: chpasswd - Batch Password Update Tool
sidebar_label: chpasswd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chpasswd - Batch Password Update Tool

The `chpasswd` command is a powerful utility for updating user passwords in batch mode. It reads username and password pairs from standard input or a file and updates the corresponding user account passwords. This command is particularly useful for system administrators who need to reset multiple passwords simultaneously, perform bulk password changes, or automate password management tasks. Chpasswd works with various authentication methods and supports both shadow and traditional password file formats, making it an essential tool for large-scale user account management.

## Basic Syntax

```bash
chpasswd [OPTIONS]
```

The command reads input in the format: `username:password` (one pair per line)

## Common Options

### Input Methods
- Read from standard input (default)
- Read from file using input redirection

### Security Options
- `-e, --encrypted` - Passwords are already encrypted
- `-c, --crypt-method METHOD` - Specify encryption method (NONE, DES, MD5, SHA256, SHA512)

### Configuration Options
- `-h, --help` - Display help information
- `-R, --root CHROOT_DIR` - Apply changes in chroot directory
- `-V, --verbose` - Provide verbose output

## Encryption Methods

- **NONE** - No encryption (plaintext, not recommended)
- **DES** - Traditional DES encryption (weak, legacy)
- **MD5** - MD5-based encryption (better than DES)
- **SHA256** - SHA-256 hashing (recommended)
- **SHA512** - SHA-512 hashing (strongest, default on modern systems)

## Usage Examples

### Basic Batch Password Updates

#### Standard Input Usage
```bash
# Basic batch password update from command line
echo "john:newpassword123" | sudo chpasswd
echo "mary:secretpass456" | sudo chpasswd

# Multiple users at once
echo -e "john:pass123\nmary:pass456\nbob:pass789" | sudo chpasswd

# Using cat with heredoc
sudo chpasswd << EOF
alice:wonderland123
bob:builder456
charlie:chocolate789
EOF
```

#### File-Based Updates
```bash
# Create password file
cat > passwords.txt << EOF
user1:tempPass123!
user2:tempPass456!
user3:tempPass789!
EOF

# Update passwords from file
sudo chpasswd < passwords.txt

# Alternative with input redirection
sudo chpasswd < user_passwords.txt

# Using process substitution
sudo chpasswd < <(printf "user1:%s\nuser2:%s\n" "$PASS1" "$PASS2")
```

### Encrypted Password Updates

#### Pre-Encrypted Passwords
```bash
# Generate encrypted passwords
echo "newpassword" | openssl passwd -1 -stdin
# Output: $1$salt$encryptedhash

# Use encrypted passwords
echo "user:\$1\$salt\$encryptedhash" | sudo chpasswd -e

# Multiple encrypted passwords
cat > encrypted_pass.txt << EOF
user1:\$6\$rounds=656000\$salt\$hash1
user2:\$6\$rounds=656000\$salt\$hash2
user3:\$6\$rounds=656000\$salt\$hash3
EOF

sudo chpasswd -e < encrypted_pass.txt
```

#### Specific Encryption Methods
```bash
# Use SHA512 encryption (recommended)
echo "user:strongpassword" | sudo chpasswd -c SHA512

# Use SHA256 encryption
echo "user:mediumpass" | sudo chpasswd -c SHA256

# Use MD5 encryption (legacy systems)
echo "user:weakpass" | sudo chpasswd -c MD5

# Test encryption method availability
sudo chpasswd -c SHA512 --help
```

### Administrative Password Management

#### Temporary Password Reset
```bash
# Reset all user passwords to temporary values
awk -F: '{if ($3 >= 1000 && $3 < 65534) print $1":TempPass123!"}' /etc/passwd | sudo chpasswd

# Force password change on next login
for user in alice bob charlie; do
    sudo chage -d 0 "$user"
done
```

#### Service Account Management
```bash
# Update service account passwords
cat > service_accounts.txt << EOF
nginx:NginxServ2023!
mysql:MySQLServ2023!
postgres:PostgresServ2023!
EOF

sudo chpasswd < service_accounts.txt

# Verify password updates
sudo getent shadow | grep -E "nginx|mysql|postgres"
```

#### Bulk User Creation
```bash
# Create users and set passwords in one script
while IFS=: read -r username password; do
    sudo useradd -m -s /bin/bash "$username"
    echo "$username:$password" | sudo chpasswd
done < new_users.txt
```

## Practical Examples

### System Administration

#### New Employee Onboarding
```bash
#!/bin/bash
# New user setup script

NEW_USERS_FILE="new_employees.txt"
TEMP_PASSWORD_PREFIX="Welcome2023!"

while IFS=: read -r username fullname department; do
    # Create user with proper settings
    sudo useradd -m -c "$fullname" -s /bin/bash "$username"

    # Set temporary password
    temp_pass="${TEMP_PASSWORD_PREFIX}${username:0:2}"
    echo "$username:$temp_pass" | sudo chpasswd

    # Force password change on first login
    sudo chage -d 0 "$username"

    # Add to department group
    if getent group "$department" >/dev/null; then
        sudo usermod -aG "$department" "$username"
    fi

    echo "Created user: $username with temporary password"
done < "$NEW_USERS_FILE"
```

#### Password Policy Enforcement
```bash
#!/bin/bash
# Bulk password reset for policy compliance

# Generate strong random passwords
generate_strong_password() {
    openssl rand -base64 12 | tr -d "=+/" | cut -c1-16
}

# Reset passwords for users in specific group
GROUP="developers"
TEMP_FILE="/tmp/password_reset_$(date +%s)"

getent group "$GROUP" | cut -d: -f4 | tr ',' '\n' | while read -r user; do
    if [ -n "$user" ]; then
        new_pass=$(generate_strong_password)
        echo "$user:$new_pass" >> "$TEMP_FILE"
        echo "User $user: $new_pass" # For secure distribution
    fi
done

# Apply password changes
if [ -f "$TEMP_FILE" ]; then
    sudo chpasswd < "$TEMP_FILE"

    # Force password change on next login
    getent group "$GROUP" | cut -d: -f4 | tr ',' '\n' | while read -r user; do
        if [ -n "$user" ]; then
            sudo chage -d 0 "$user"
        fi
    done

    rm -f "$TEMP_FILE"
fi
```

#### System Maintenance
```bash
#!/bin/bash
# Monthly password rotation for service accounts

SERVICE_ACCOUNTS="nginx apache mysql postgres redis"
BACKUP_DIR="/root/password_backups/$(date +%Y%m)"
LOG_FILE="/var/log/password_rotation.log"

mkdir -p "$BACKUP_DIR"

for account in $SERVICE_ACCOUNTS; do
    if id "$account" >/dev/null 2>&1; then
        # Generate new password
        new_pass=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-24)

        # Backup old password hash
        getent shadow "$account" >> "$BACKUP_DIR/${account}_old.hash"

        # Set new password
        echo "$account:$new_pass" | sudo chpasswd

        # Log the change
        echo "$(date): Password updated for $account" >> "$LOG_FILE"

        echo "Updated password for $account"
    fi
done

# Verify all changes succeeded
for account in $SERVICE_ACCOUNTS; do
    if id "$account" >/dev/null 2>&1; then
        password_status=$(sudo chage -l "$account" | grep "Last password change")
        echo "$account: $password_status"
    fi
done
```

### Security Operations

#### Emergency Password Reset
```bash
#!/bin/bash
# Emergency password reset script

COMPROMISED_USERS="$1"
TEMP_PASSWORD="EmergencyReset$(date +%H%M)!"

if [ -z "$COMPROMISED_USERS" ]; then
    echo "Usage: $0 'user1,user2,user3'"
    exit 1
fi

# Reset passwords for compromised accounts
echo "$COMPROMISED_USERS" | tr ',' '\n' | while read -r user; do
    if id "$user" >/dev/null 2>&1; then
        echo "$user:$TEMP_PASSWORD" | sudo chpasswd
        sudo chage -d 0 "$user"  # Force change on next login
        sudo usermod -L "$user"  # Lock account temporarily

        # Log the emergency reset
        echo "$(date): Emergency password reset for $user" >> /var/log/emergency_resets.log

        echo "Emergency reset completed for: $user"
    else
        echo "User not found: $user"
    fi
done

# Send notification to administrators
echo "Emergency password reset performed for users: $COMPROMISED_USERS" | \
    mail -s "Emergency Password Reset Alert" admin@company.com
```

#### Audit and Compliance
```bash
#!/bin/bash
# Password audit and compliance check

AUDIT_FILE="/var/log/password_audit_$(date +%Y%m%d).log"
WEAK_PASSWORDS_FILE="/tmp/weak_passwords.txt"

# Check for users with weak or default passwords
echo "Password Audit Report - $(date)" > "$AUDIT_FILE"
echo "=================================" >> "$AUDIT_FILE"

# Find users who haven't changed passwords recently
while IFS=: read -r user pass_hash last_change min_age max_age warn inactive expire; do
    if [ "$last_change" -ne 0 ]; then
        days_since_change=$(( ($(date +%s) - $last_change * 86400) / 86400 ))
        if [ "$days_since_change" -gt 90 ]; then
            echo "$user:$days_since_change" >> "$WEAK_PASSWORDS_FILE"
            echo "User $user: Password unchanged for $days_since_change days" >> "$AUDIT_FILE"
        fi
    fi
done < <(sudo getent shadow | grep -v "^[^:]*:[*!]")

# Reset passwords for stale accounts if needed
if [ -f "$WEAK_PASSWORDS_FILE" ] && [ -s "$WEAK_PASSWORDS_FILE" ]; then
    echo "Stale passwords found. Consider bulk reset." >> "$AUDIT_FILE"
    cat "$WEAK_PASSWORDS_FILE" >> "$AUDIT_FILE"

    # Optional: Reset passwords for accounts older than 180 days
    while IFS=: read -r user days; do
        if [ "$days" -gt 180 ]; then
            temp_pass="Reset$(date +%s)$user"
            echo "$user:$temp_pass" | sudo chpasswd
            sudo chage -d 0 "$user"
            echo "Auto-reset password for $user (inactive $days days)" >> "$AUDIT_FILE"
        fi
    done < "$WEAK_PASSWORDS_FILE"
fi

rm -f "$WEAK_PASSWORDS_FILE"
echo "Audit completed. Report saved to: $AUDIT_FILE"
```

## Advanced Usage

### Integration with Automation

#### Ansible Integration
```bash
#!/bin/bash
# Generate password file for Ansible

ANSIBLE_INVENTORY="/tmp/ansible_passwords_$(date +%s).yml"

cat > "$ANSIBLE_INVENTORY" << EOF
all:
  vars:
    ansible_user: root
  children:
    webservers:
      hosts:
        server1.example.com:
          ansible_ssh_pass: \$(openssl rand -base64 16)
        server2.example.com:
          ansible_ssh_pass: \$(openssl rand -base64 16)
    databases:
      hosts:
        db1.example.com:
          ansible_ssh_pass: \$(openssl rand -base64 16)
EOF

# Apply passwords via chpasswd (run on target systems)
ansible-playbook -i "$ANSIBLE_INVENTORY" reset_passwords.yml
```

#### Docker Container User Management
```bash
#!/bin/bash
# Container user password management

CONTAINER_NAME="app_container"

# Add users and set passwords in container
docker exec "$CONTAINER_NAME" bash -c '
cat << EOL | chpasswd
developer:DevPass2023!
operator:OpsPass2023!
admin:AdminPass2023!
EOL
'

# Verify password updates
docker exec "$CONTAINER_NAME" getent shadow
```

### Migration and Backup

#### User Migration Script
```bash
#!/bin/bash
# Migrate users between systems

SOURCE_PASSWD_FILE="/root/source_passwords.txt"
TARGET_SYSTEM="target-server.example.com"

# Export current user passwords (requires appropriate privileges)
sudo getent shadow | awk -F: '{if ($2 !~ /^[*!]/) print $1":"$2}' > "$SOURCE_PASSWD_FILE"

# Transfer and apply on target system
scp "$SOURCE_PASSWD_FILE" "root@$TARGET_SYSTEM:/tmp/"

ssh "root@$TARGET_SYSTEM" bash -c "
# Backup existing passwords
cp /etc/shadow /etc/shadow.backup.$(date +%s)

# Apply new passwords
chpasswd -e < /tmp/source_passwords.txt

# Verify migration
echo 'Password migration completed successfully'
getent shadow | wc -l
"

# Clean up
rm -f "$SOURCE_PASSWD_FILE"
ssh "root@$TARGET_SYSTEM" rm -f "/tmp/source_passwords.txt"
```

## Troubleshooting

### Common Issues

#### Permission Denied
```bash
# Problem: Not running as root
echo "user:password" | chpasswd
# Error: chpasswd: permission denied

# Solution: Use sudo
echo "user:password" | sudo chpasswd

# Verify sudo access
sudo -v
```

#### Invalid Input Format
```bash
# Problem: Incorrect input format
echo "user password" | sudo chpasswd
# Error: chpasswd: invalid line format

# Solution: Use proper username:password format
echo "user:password" | sudo chpasswd

# Handle users with special characters
echo "user.name:pass@word" | sudo chpasswd
echo "user-name:pass-word" | sudo chpasswd
```

#### Password Policy Violations
```bash
# Problem: Password doesn't meet policy requirements
echo "user:weak" | sudo chpasswd
# Error: Password fails complexity check

# Solution: Use stronger passwords
generate_compliant_password() {
    # Generate password meeting complexity requirements
    echo "Strong$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-12)!"
}

strong_pass=$(generate_compliant_password)
echo "user:$strong_pass" | sudo chpasswd
```

#### User Does Not Exist
```bash
# Problem: Updating non-existent user
echo "nonexistent:password" | sudo chpasswd
# Error: chpasswd: user 'nonexistent' does not exist

# Solution: Check if user exists first
username="newuser"
if id "$username" >/dev/null 2>&1; then
    echo "$username:newpass" | sudo chpasswd
else
    echo "User $username does not exist"
fi
```

### Debugging Techniques

#### Verbose Mode
```bash
# Use verbose output for debugging
echo "user:password" | sudo chpasswd -V

# Enable debug logging
export LIBUSER_DEBUG=1
echo "user:password" | sudo chpasswd -V
```

#### Test Runs
```bash
# Test password format without applying changes
cat passwords.txt | while IFS=: read -r user pass; do
    echo "Would set password for user: $user"
    # Validate password format
    if [ ${#pass} -lt 8 ]; then
        echo "Warning: Password for $user is too short"
    fi
done
```

## Security Considerations

### Password Handling Best Practices

#### Secure Password Generation
```bash
#!/bin/bash
# Secure password generator for chpasswd

generate_secure_password() {
    # Generate 16-character random password
    openssl rand -base64 32 | tr -d "=+/\n" | cut -c1-16
}

# Password complexity requirements
validate_password() {
    local password="$1"
    local min_length=12

    # Check length
    if [ ${#password} -lt $min_length ]; then
        return 1
    fi

    # Check for uppercase, lowercase, numbers, special chars
    if [[ "$password" =~ [A-Z] ]] && \
       [[ "$password" =~ [a-z] ]] && \
       [[ "$password" =~ [0-9] ]] && \
       [[ "$password" =~ [!@#$%^&*()_+] ]]; then
        return 0
    else
        return 1
    fi
}

# Generate and validate passwords for multiple users
while read -r user; do
    pass=""
    until validate_password "$pass"; do
        pass=$(generate_secure_password)
    done

    echo "$user:$pass" | sudo chpasswd
    echo "$user:$pass" >> /root/secure_passwords_$(date +%s).txt

    # Force password change on next login
    sudo chage -d 0 "$user"
done < user_list.txt
```

#### Temporary Password Management
```bash
#!/bin/bash
# Temporary password lifecycle management

TEMP_PASSWORD_LIFETIME=24  # hours
PASSWORD_LOG="/var/log/temp_passwords.log"

generate_temp_password() {
    local user="$1"
    local timestamp=$(date +%s)
    local expiry_time=$((timestamp + TEMP_PASSWORD_LIFETIME * 3600))

    echo "TempPass${timestamp}${user:0:3}"
}

log_temp_password() {
    local user="$1"
    local password="$2"
    echo "$(date): Temporary password for $user expires at $(date -d "+$TEMP_PASSWORD_LIFETIME hours")" >> "$PASSWORD_LOG"
}

# Set temporary passwords with expiration tracking
while IFS=: read -r user full_name; do
    temp_pass=$(generate_temp_password "$user")
    echo "$user:$temp_pass" | sudo chpasswd
    log_temp_password "$user" "$temp_pass"
    sudo chage -d 0 "$user"  # Force change on first login
done < new_hires.txt

# Schedule cleanup of expired temporary passwords
echo "0 */$TEMP_PASSWORD_LIFETIME * * * root /usr/local/bin/cleanup_temp_passwords.sh" | sudo tee -a /etc/crontab
```

## Related Commands

- [`passwd`](/docs/commands/user-management/passwd) - Change user password interactively
- [`useradd`](/docs/commands/user-management/useradd) - Create new user account
- [`usermod`](/docs/commands/user-management/usermod) - Modify user account
- [`userdel`](/docs/commands/user-management/userdel) - Delete user account
- [`chage`](/docs/commands/user-management/chage) - Change user password expiry information
- [`newusers`](/docs/commands/user-management/newusers) - Batch user creation
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database
- [`shadow`](/docs/commands/user-management/shadow) - Shadow password suite utilities

## Best Practices

1. **Always use `sudo`** when running chpasswd as it requires root privileges
2. **Validate user existence** before attempting password changes
3. **Use strong passwords** that meet system complexity requirements
4. **Force password changes** with `chage -d 0` for temporary passwords
5. **Log all password changes** for audit and compliance purposes
6. **Secure password files** immediately after use and remove them when no longer needed
7. **Test on non-production systems** before performing bulk password changes
8. **Use encrypted passwords** (`-e` flag) when transferring password hashes between systems
9. **Implement proper error handling** in scripts to handle failed password updates
10. **Follow your organization's password policies** regarding complexity and rotation frequency

## Performance Tips

1. **Batch processing** is more efficient than individual password updates
2. **Use input redirection** (`< file`) instead of pipes for large password files
3. **Process users in groups** to avoid system resource exhaustion
4. **Minimize concurrent operations** when updating passwords on shared systems
5. **Use appropriate encryption methods** - SHA512 provides good balance of security and performance
6. **Validate input format** before processing to avoid errors
7. **Monitor system load** during large-scale password updates
8. **Schedule bulk operations** during low-usage periods
9. **Use appropriate timeouts** for automated scripts
10. **Implement rollback procedures** for failed operations

The `chpasswd` command is an essential tool for system administrators managing multiple user accounts. Its ability to efficiently handle bulk password updates, support various encryption methods, and integrate with automation workflows makes it invaluable for large-scale user management scenarios. When used properly with appropriate security measures, chpasswd provides a powerful solution for maintaining password security and compliance in enterprise environments.