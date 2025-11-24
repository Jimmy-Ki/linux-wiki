---
title: passwd - Change User Password
sidebar_label: passwd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# passwd - Change User Password

The `passwd` command changes user passwords and manages password settings in Linux. It's a critical security tool that allows users to change their own passwords and enables administrators to manage password policies for all users.

## Basic Syntax

```bash
passwd [options] [username]
```

## Common Options

### Password Management
- `-d, --delete` - Delete password (make it empty)
- `-l, --lock` - Lock password (disable login)
- `-u, --unlock` - Unlock password
- `-e, --expire` - Force password to expire immediately

### Password Status
- `-S, --status` - Display password status information
- `-n, --minimum DAYS` - Set minimum days before password change
- `-x, --maximum DAYS` - Set maximum days for password validity
- `-w, --warning DAYS` - Set warning days before password expiration
- `-i, --inactive DAYS` - Set days after expiration before account is disabled

### Input Methods
- `--stdin` - Read password from standard input
- `-k, --keep-tokens` - Keep authentication tokens

### System Options
- `-f, --force` - Force operation
- `-q, --quiet` - Quiet mode
- `-r, --repository REPOSITORY` - Change password in repository

## Usage Examples

### Basic Password Operations
```bash
# Change your own password
passwd

# Change another user's password (root only)
passwd john

# Set password using stdin
echo "newpassword" | passwd --stdin john

# Delete password (make account passwordless)
passwd -d john

# Lock user account
passwd -l john

# Unlock user account
passwd -u john
```

### Password Status and Information
```bash
# Display password status
passwd -S john

# Check your own password status
passwd -S

# Example output:
# john PS 2024-12-31 0 99999 7 -1
# Format: username status expirationdate min max warning inactive
```

### Password Aging and Expiration
```bash
# Force user to change password on next login
passwd -e john

# Set password to expire in 30 days
passwd -x 30 john

# Set minimum days before password change
passwd -n 7 john

# Set warning days before expiration
passwd -w 7 john

# Set account inactive after 5 days of expired password
passwd -i 5 john
```

## Password Policy Management

### Set Password Aging Policy
```bash
#!/bin/bash
# Set comprehensive password policy for a user

username="$1"
min_days="7"
max_days="90"
warn_days="14"
inactive_days="30"

echo "Setting password policy for $username..."

# Apply password aging settings
passwd -n "$min_days" "$username"
passwd -x "$max_days" "$username"
passwd -w "$warn_days" "$username"
passwd -i "$inactive_days" "$username"

# Force password change on next login
passwd -e "$username"

echo "Password policy set for $username:"
echo "  Minimum days: $min_days"
echo "  Maximum days: $max_days"
echo "  Warning days: $warn_days"
echo "  Inactive days: $inactive_days"
```

### Batch Password Operations
```bash
#!/bin/bash
# Batch password management

# Force password change for all users in a group
groupname="developers"

echo "Forcing password change for group: $groupname"

getent group "$groupname" | cut -d: -f4 | tr ',' '\n' | while read -r user; do
    if [[ -n "$user" ]]; then
        echo "Processing user: $user"
        passwd -e "$user"
        passwd -S "$user"
    fi
done
```

### Password Reset Workflow
```bash
#!/bin/bash
# Secure password reset workflow

username="$1"
temporary_password="TempPass$(date +%Y%m%d)"

if [[ -z "$username" ]]; then
    echo "Usage: $0 <username>"
    exit 1
fi

# Verify user exists
if ! id "$username" &>/dev/null; then
    echo "Error: User $username does not exist"
    exit 1
fi

# Set temporary password
echo "$username:$temporary_password" | chpasswd

# Force password change on first login
passwd -e "$username"

# Lock account if not used within 24 hours
at now + 24 hours <<EOF
if passwd -S $username | grep -q "P"; then
    passwd -l $username
    logger "Account $username locked due to password not being changed within 24 hours"
fi
EOF

echo "Password reset for $username"
echo "Temporary password: $temporary_password"
echo "User must change password on next login"
echo "Account will be locked in 24 hours if not changed"
```

## System Password Files

### Understanding Password Files
```bash
# Display password file contents (formatted)
echo "=== /etc/passwd format ==="
echo "username:password:UID:GID:comment:home:shell"
echo "Example: john:x:1001:1001:John Doe:/home/john:/bin/bash"
echo

echo "=== /etc/shadow format ==="
echo "username:password:lastchanged:min:max:warn:inactive:expire:reserved"
echo "Example: john:$6$encrypted:18436:0:99999:7:::"
echo

# Show actual entries (sensitive data)
if [[ $EUID -eq 0 ]]; then
    echo "=== Current password entry ==="
    getent passwd "$(whoami)"
    echo
    echo "=== Current shadow entry ==="
    getent shadow "$(whoami)"
fi
```

### Password File Analysis
```bash
#!/bin/bash
# Analyze password file security

echo "=== Password Security Analysis ==="

# Check for empty passwords
empty_passwords=$(sudo awk -F: '$2 == "" {print $1}' /etc/shadow)
if [[ -n "$empty_passwords" ]]; then
    echo "⚠️  Users with empty passwords:"
    echo "$empty_passwords"
else
    echo "✅ No users with empty passwords"
fi

# Check for unlocked root account
if sudo grep -q '^root::' /etc/shadow 2>/dev/null; then
    echo "⚠️  Root account has no password"
else
    echo "✅ Root account is secured"
fi

# Check password aging
echo "=== Password Aging Status ==="
while IFS=: read -r username encrypted _ min max warn inactive expire _; do
    [[ "$username" =~ ^(root|nobody|daemon) ]] && continue
    [[ "$username" =~ ^[a-zA-Z] ]] || continue

    status="✓"
    [[ "$max" == "99999" ]] && status="⚠️"
    [[ "$min" == "0" ]] && status="${status}⚠️"

    echo "$status $username: max=$max days, min=$min days"
done < /etc/shadow
```

## Authentication and Security

### Password Strength Validation
```bash
#!/bin/bash
# Password strength checker

check_password_strength() {
    local password="$1"
    local username="$2"
    local strength=0
    local issues=()

    # Length check
    if [[ ${#password} -ge 8 ]]; then
        ((strength++))
    else
        issues+=("Password too short (minimum 8 characters)")
    fi

    # Complexity checks
    [[ "$password" =~ [a-z] ]] && ((strength++)) || issues+=("Missing lowercase letters")
    [[ "$password" =~ [A-Z] ]] && ((strength++)) || issues+=("Missing uppercase letters")
    [[ "$password" =~ [0-9] ]] && ((strength++)) || issues+=("Missing numbers")
    [[ "$password" =~ [^a-zA-Z0-9] ]] && ((strength++)) || issues+=("Missing special characters")

    # Dictionary check
    if [[ "${password,,}" == "$username" || "${password,,}" == *"$username"* ]]; then
        issues+=("Password contains username")
        ((strength--))
    fi

    # Common patterns
    if [[ "$password" =~ ^(password|123456|qwerty|admin) ]]; then
        issues+=("Password is too common")
        ((strength--))
    fi

    # Report results
    echo "Password Strength Score: $strength/5"
    if [[ ${#issues[@]} -gt 0 ]]; then
        echo "Issues:"
        printf '  - %s\n' "${issues[@]}"
    fi

    return $strength
}

# Example usage
check_password_strength "MySecurePass123!" "john"
```

### Password Expiration Monitoring
```bash
#!/bin/bash
# Monitor password expiration

echo "=== Password Expiration Report ==="
current_date=$(date +%s)

while IFS=: read -r username encrypted lastchanged min max warn inactive expire _; do
    # Skip system users and those without passwords
    [[ "$username" =~ ^(root|nobody|daemon) ]] && continue
    [[ "$encrypted" =~ ^[\!\*]$ ]] && continue
    [[ "$lastchanged" -eq 0 ]] && continue

    # Calculate expiration
    if [[ "$max" -gt 0 && "$max" -ne 99999 ]]; then
        expire_timestamp=$((lastchanged * 86400 + max * 86400))
        days_until_expire=$(( (expire_timestamp - current_date) / 86400 ))

        if [[ $days_until_expire -le 7 ]]; then
            if [[ $days_until_expire -lt 0 ]]; then
                echo "🔴 $username: Password EXPIRED ${days_until_expire#-} days ago"
            elif [[ $days_until_expire -eq 0 ]]; then
                echo "🟠 $username: Password expires TODAY"
            else
                echo "🟡 $username: Password expires in $days_until_expire days"
            fi
        fi
    fi
done < /etc/shadow
```

## Advanced Password Management

### Automated Password Rotation
```bash
#!/bin/bash
# Automated password rotation for service accounts

service_accounts=("appuser" "dbuser" "backupuser")
password_length="16"

generate_password() {
    openssl rand -base64 "$password_length" | tr -d "=+/" | cut -c1-"$password_length"
}

for account in "${service_accounts[@]}"; do
    if id "$account" &>/dev/null; then
        new_password=$(generate_password)

        # Set new password
        echo "$account:$new_password" | chpasswd

        # Store encrypted password for applications
        echo "$account:$new_password" >> /root/service_passwords.txt

        # Set to expire in 90 days
        passwd -x 90 "$account"

        echo "Rotated password for $account"
        logger "Service account password rotated: $account"
    fi
done

chmod 600 /root/service_passwords.txt
```

### Password Policy Enforcement
```bash
#!/bin/bash
# Enforce password policies

echo "=== Password Policy Enforcement ==="

# Set default password aging for all regular users
while IFS=: read -r username _ uid _ _ _ _ shell; do
    # Only process regular users (UID >= 1000)
    [[ "$uid" -lt 1000 ]] && continue
    [[ "$shell" =~ (nologin|false)$ ]] && continue

    # Apply password aging policy
    passwd -x 90 "$username"  # Max 90 days
    passwd -n 7 "$username"   # Min 7 days
    passwd -w 14 "$username"  # Warning after 14 days

    echo "Applied password policy to: $username"
done < /etc/passwd
```

## Password Recovery and Security

### Emergency Password Reset
```bash
#!/bin/bash
# Emergency password reset for locked accounts

username="$1"
emergency_password="Emergency$(date +%Y%m%d%H%M)"

if [[ -z "$username" ]]; then
    echo "Usage: $0 <username>"
    exit 1
fi

# Check if account is locked
if passwd -S "$username" | grep -q "L"; then
    echo "Account $username is locked"

    # Unlock account
    passwd -u "$username"
    echo "Account unlocked"
fi

# Set emergency password
echo "$username:$emergency_password" | chpasswd

# Force password change on next login
passwd -e "$username"

# Log the reset
logger "Emergency password reset performed for user: $username"

echo "Emergency password reset completed for $username"
echo "Temporary password: $emergency_password"
echo "User must change password on next login"
```

### Password Audit Script
```bash
#!/bin/bash
# Comprehensive password audit

echo "=== Password Audit Report ==="
echo "Date: $(date)"
echo

# Count users with different password states
echo "=== User Password Status ==="
echo "Total users: $(getent passwd | wc -l)"

users_with_passwords=$(sudo awk -F: '$2 ~ /^\$/ {print $1}' /etc/shadow | wc -l)
echo "Users with passwords: $users_with_passwords"

users_locked=$(sudo awk -F: '$2 ~ /^!/ {print $1}' /etc/shadow | wc -l)
echo "Locked users: $users_locked"

users_no_password=$(sudo awk -F: '$2 ~ /^[!*]?$/ {print $1}' /etc/shadow | wc -l)
echo "Users without passwords: $users_no_password"

# Check recent password changes
echo
echo "=== Recent Password Changes ==="
while IFS=: read -r username encrypted lastchanged min max warn inactive expire _; do
    [[ "$username" =~ ^(root|nobody|daemon) ]] && continue
    [[ "$encrypted" =~ ^[\!\*]$ ]] && continue
    [[ "$lastchanged" -eq 0 ]] && continue

    days_since_change=$(( ($(date +%s) - lastchanged * 86400) / 86400 ))

    if [[ $days_since_change -le 7 ]]; then
        echo "🔵 $username: Changed $days_since_change days ago"
    fi
done < /etc/shadow

# Check for password policy violations
echo
echo "=== Policy Violations ==="
while IFS=: read -r username encrypted lastchanged min max warn inactive expire _; do
    [[ "$username" =~ ^(root|nobody|daemon) ]] && continue

    # Check for passwords that never expire
    if [[ "$max" -eq 99999 ]]; then
        echo "⚠️  $username: Password never expires"
    fi

    # Check for no minimum password age
    if [[ "$min" -eq 0 ]]; then
        echo "⚠️  $username: No minimum password age set"
    fi
done < /etc/shadow
```

## Integration with Authentication Systems

### LDAP Password Management
```bash
#!/bin/bash
# LDAP password management integration

username="$1"
new_password="$2"

if [[ -z "$username" || -z "$new_password" ]]; then
    echo "Usage: $0 <username> <new_password>"
    exit 1
fi

# Check if user exists in LDAP
if ldapsearch -x -H ldap://ldap.example.com -b "ou=users,dc=example,dc=com" "(uid=$username)" uid &>/dev/null; then
    echo "User found in LDAP"

    # Change LDAP password
    ldappasswd -x -H ldap://ldap.example.com -D "cn=admin,dc=example,dc=com" -W \
        -s "$new_password" "uid=$username,ou=users,dc=example,dc=com"

    # Change local password if local account exists
    if id "$username" &>/dev/null; then
        echo "$username:$new_password" | chpasswd
        echo "Local password updated"
    fi

    echo "LDAP password updated for $username"
else
    echo "User not found in LDAP"
    exit 1
fi
```

## Best Practices

1. **Use strong passwords** with minimum 8 characters, including uppercase, lowercase, numbers, and special characters
2. **Implement password aging** to force regular password changes
3. **Set minimum password age** to prevent immediate password reuse
4. **Use password warnings** to remind users before expiration
5. **Regularly audit** password settings and user accounts
6. **Lock unused accounts** instead of deleting them immediately
7. **Use temporary passwords** for initial account setup
8. **Document password policies** and communicate them to users
9. **Monitor failed login attempts** for security breaches
10. **Use password managers** for service account passwords

## Security Considerations

### Password File Security
```bash
# Ensure proper permissions on password files
chmod 644 /etc/passwd
chmod 600 /etc/shadow
chmod 644 /etc/group
chmod 600 /etc/gshadow

# Check file ownership
chown root:root /etc/passwd /etc/shadow /etc/group /etc/gshadow
```

### Common Security Issues
- Empty passwords
- Passwords same as usernames
- Default or weak passwords
- Passwords never expiring
- No minimum password age
- Accounts without password expiration
- Shared passwords among users

## Related Commands

- [`chage`](/docs/commands/user-permissions/chage) - Change user password aging
- [`chpasswd`](/docs/commands/user-permissions/chpasswd) - Update passwords in batch
- [`useradd`](/docs/commands/user-permissions/useradd) - Create new user
- [`usermod`](/docs/commands/user-permissions/usermod) - Modify user account
- [`sudo`](/docs/commands/user-permissions/sudo) - Execute commands as another user
- [`su`](/docs/commands/user-permissions/su) - Switch user
- [`getent`](/docs/commands/system-info/getent) - Get entries from administrative databases

The `passwd` command is fundamental for Linux system security and user management. Understanding its options and proper usage ensures robust password policies and secure user authentication.