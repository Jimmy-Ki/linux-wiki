---
title: chage - Change user password expiry information
sidebar_label: chage
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chage - Change user password expiry information

The `chage` command is a system administration tool used to view and modify user password aging and expiration information in Linux/Unix systems. It provides comprehensive control over password policies including expiration dates, minimum/maximum password ages, warning periods, and account lockout settings. The command operates on the `/etc/shadow` file to manage security policies that enforce regular password changes and prevent indefinite use of compromised credentials.

## Basic Syntax

```bash
chage [OPTIONS] USERNAME
```

## Password Aging Fields

The `chage` command manages the following password aging fields:

- **Last Password Change** - Date when password was last modified
- **Minimum Password Age** - Minimum days before password can be changed
- **Maximum Password Age** - Maximum days before password must be changed
- **Warning Period** - Days before expiration to warn user
- **Inactive Period** - Days after expiration before account is disabled
- **Account Expiration Date** - Date when account becomes unavailable

## Common Options

### Information Options
- `-l, --list` - Show password aging information
- `-h, --help` - Display help message

### Password Modification Options
- `-d, --lastday LAST_DAY` - Set date of last password change
- `-m, --mindays MIN_DAYS` - Set minimum number of days between password changes
- `-M, --maxdays MAX_DAYS` - Set maximum number of days before password change
- `-W, --warndays WARN_DAYS` - Set warning period before password expires
- `-I, --inactive INACTIVE` - Set number of days after password expires to disable account
- `-E, --expiredate EXPIRE_DATE` - Set account expiration date

### Date Formats
Dates can be specified in several formats:
- Number of days since January 1, 1970 (Unix epoch)
- YYYY-MM-DD format
- Direct values (0 for never, -1 for immediate expiration)

## Usage Examples

### Viewing Password Information

#### Basic Information Display
```bash
# Show password aging information for current user
chage -l

# Show password aging information for specific user
chage -l username

# Show information in script-friendly format
chage -l root | grep -E "(Last|Minimum|Maximum|Warning)"

# Display all user password policies
getent passwd | cut -d: -f1 | while read user; do
    echo "=== $user ==="
    chage -l "$user" 2>/dev/null || echo "No password aging info"
done
```

#### Extracting Specific Information
```bash
# Get only the password expiration date
chage -l username | grep "Password expires" | cut -d: -f2-

# Get account expiration date
chage -l username | grep "Account expires" | cut -d: -f2-

# Check if password will expire within 7 days
chage -l username | grep "Password expires" | grep -q "$(date -d '+7 days' +%Y-%m-%d)" && echo "Password expires soon"

# Get days until password expires
expire_date=$(chage -l username | grep "Password expires" | cut -d: -f2- | sed 's/^ *//')
if [[ "$expire_date" != "never" ]]; then
    days_until=$(( ($(date -d "$expire_date" +%s) - $(date +%s)) / 86400 ))
    echo "Password expires in $days_until days"
fi
```

### Basic Password Management

#### Setting Password Expiration
```bash
# Set password to expire in 90 days
chage -M 90 username

# Set minimum password age to 7 days
chage -m 7 username

# Set warning period to 14 days
chage -W 14 username

# Force user to change password at next login
chage -d 0 username

# Set inactive period to 30 days after expiration
chage -I 30 username
```

#### Account Expiration Management
```bash
# Set account to expire on specific date
chage -E 2024-12-31 username

# Set account to never expire
chage -E -1 username

# Set account to expire immediately
chage -E 0 username

# Set account to expire in 365 days
future_date=$(date -d '+365 days' +%Y-%m-%d)
chage -E "$future_date" username

# Remove account expiration
chage -E -1 username
```

### Advanced Password Policy Configuration

#### Complex Password Policies
```bash
# Configure comprehensive password policy
chage -m 7 -M 90 -W 14 -I 30 username

# Set strict policy for service accounts
chage -m 30 -M 180 -W 30 -I 60 serviceuser

# Set temporary account policy
chage -m 1 -M 7 -W 2 -I 7 tempuser

# Set long-term stable account policy
chage -m 90 -M 365 -W 30 -I 90 stableuser
```

#### Last Password Change Management
```bash
# Set last password change to today
chage -d $(date +%Y-%m-%d) username

# Force password change by setting last change to epoch
chage -d 1970-01-01 username

# Reset password aging (equivalent to -d 0)
chage -d 0 username

# Set specific last change date
chage -d "2024-01-15" username
```

### Bulk User Management

#### Apply Policy to User Groups
```bash
# Apply same policy to all users in a group
for user in $(getent group developers | cut -d: -f4 | tr ',' ' '); do
    chage -m 7 -M 60 -W 14 "$user"
    echo "Updated password policy for $user"
done

# Set password expiration for all non-system users
getent passwd | grep -v 'nologin\|false' | while IFS=: read -r user _ uid _ _ home shell; do
    if [ "$uid" -ge 1000 ]; then
        chage -M 90 -W 14 "$user"
    fi
done

# Apply different policies based on user type
while IFS=: read -r user _ uid _ _ home shell; do
    if [ "$uid" -ge 1000 ]; then
        case "$home" in
            */admin*)
                chage -m 7 -M 60 -W 14 "$user"  # Admin policy
                ;;
            */service*)
                chage -m 30 -M 180 -W 30 "$user"  # Service policy
                ;;
            *)
                chage -m 7 -M 90 -W 14 "$user"    # Standard policy
                ;;
        esac
    fi
done < /etc/passwd
```

### Password Aging Monitoring

#### Expiration Monitoring
```bash
# Monitor users with expiring passwords
for user in $(getent passwd | cut -d: -f1); do
    expire_info=$(chage -l "$user" 2>/dev/null | grep "Password expires")
    if [[ "$expire_info" != *"never"* ]]; then
        expire_date=$(echo "$expire_info" | cut -d: -f2- | sed 's/^ *//')
        days_until=$(( ($(date -d "$expire_date" +%s) - $(date +%s)) / 86400 ))
        if [ "$days_until" -lt 15 ]; then
            echo "WARNING: $user password expires in $days_until days ($expire_date)"
        fi
    fi
done

# Generate password expiration report
echo "Password Expiration Report - $(date)"
echo "====================================="
echo ""

for user in $(getent passwd | cut -d: -f1); do
    if id "$user" &>/dev/null; then
        chage -l "$user" 2>/dev/null | while read line; do
            echo "$user: $line"
        done
        echo ""
    fi
done > password_report.txt
```

#### Account Status Analysis
```bash
# Check for expired accounts
for user in $(getent passwd | cut -d: -f1); do
    expire_date=$(chage -l "$user" 2>/dev/null | grep "Account expires" | cut -d: -f2- | sed 's/^ *//')
    if [[ "$expire_date" != "never" ]]; then
        if [[ $(date -d "$expire_date" +%s) -lt $(date +%s) ]]; then
            echo "EXPIRED: $user (account expired on $expire_date)"
        fi
    fi
done

# Find users who haven't changed passwords recently
for user in $(getent passwd | cut -d: -f1); do
    last_change=$(chage -l "$user" 2>/dev/null | grep "Last password change" | cut -d: -f2- | sed 's/^ *//')
    if [[ "$last_change" != "never" ]]; then
        days_since=$(( ($(date +%s) - $(date -d "$last_change" +%s)) / 86400 ))
        if [ "$days_since" -gt 365 ]; then
            echo "OLD PASSWORD: $user (last changed $days_since days ago)"
        fi
    fi
done
```

## Practical Examples

### System Administration

#### Security Policy Implementation
```bash
#!/bin/bash
# Implement corporate password policy

STANDARD_MIN=7
STANDARD_MAX=90
STANDARD_WARN=14
STANDARD_INACTIVE=30

ADMIN_MIN=7
ADMIN_MAX=60
ADMIN_WARN=14
ADMIN_INACTIVE=7

SERVICE_MIN=30
SERVICE_MAX=180
SERVICE_WARN=30
SERVICE_INACTIVE=60

# Apply policy based on user groups
if getent group wheel >/dev/null; then
    # Admin users (wheel group)
    for user in $(getent group wheel | cut -d: -f4 | tr ',' ' '); do
        echo "Applying admin policy to $user"
        chage -m $ADMIN_MIN -M $ADMIN_MAX -W $ADMIN_WARN -I $ADMIN_INACTIVE "$user"
    done
fi

if getent group services >/dev/null; then
    # Service accounts
    for user in $(getent group services | cut -d: -f4 | tr ',' ' '); do
        echo "Applying service policy to $user"
        chage -m $SERVICE_MIN -M $SERVICE_MAX -W $SERVICE_WARN -I $SERVICE_INACTIVE "$user"
    done
fi

# Standard users
getent passwd | while IFS=: read -r user _ uid _ _ home _; do
    if [ "$uid" -ge 1000 ] && ! groups "$user" | grep -q -E "(wheel|services)"; then
        echo "Applying standard policy to $user"
        chage -m $STANDARD_MIN -M $STANDARD_MAX -W $STANDARD_WARN -I $STANDARD_INACTIVE "$user"
    fi
done
```

#### User Account Lifecycle Management
```bash
#!/bin/bash
# Manage user account lifecycle

USER="$1"
ACTION="$2"

case "$ACTION" in
    "create")
        # New user with initial password policy
        chage -d 0 -m 7 -M 90 -W 14 -I 30 "$USER"
        echo "User $USER created with standard password policy"
        ;;
    "temporary")
        # Temporary user (30-day access)
        expire_date=$(date -d '+30 days' +%Y-%m-%d)
        chage -m 1 -M 30 -W 7 -I 7 -E "$expire_date" "$USER"
        echo "User $USER set as temporary account (expires $expire_date)"
        ;;
    "disable")
        # Disable account immediately
        chage -E 0 "$USER"
        echo "User $USER account disabled"
        ;;
    "expire")
        # Force password change
        chage -d 0 "$USER"
        echo "User $USER must change password at next login"
        ;;
    "extend")
        # Extend account by 90 days
        current_exp=$(chage -l "$USER" | grep "Account expires" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$current_exp" == "never" ]]; then
            new_exp=$(date -d '+90 days' +%Y-%m-%d)
        else
            new_exp=$(date -d "$current_exp + 90 days" +%Y-%m-%d)
        fi
        chage -E "$new_exp" "$USER"
        echo "User $USER account extended to $new_exp"
        ;;
    *)
        echo "Usage: $0 <username> <create|temporary|disable|expire|extend>"
        exit 1
        ;;
esac
```

### Security Auditing

#### Password Security Audit
```bash
#!/bin/bash
# Audit password security settings

echo "Password Security Audit Report"
echo "============================="
echo "Date: $(date)"
echo ""

# Check users with no password expiration
echo "=== Users with No Password Expiration ==="
getent passwd | while IFS=: read -r user _ uid _ _ home _; do
    if [ "$uid" -ge 1000 ]; then
        max_days=$(chage -l "$user" 2>/dev/null | grep "Maximum password age" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$max_days" == "99999" || "$max_days" == "never" ]]; then
            echo "$user: No password expiration (security risk)"
        fi
    fi
done

echo ""

# Check users with weak minimum password age
echo "=== Users with Weak Minimum Password Age ==="
getent passwd | while IFS=: read -r user _ uid _ _ home _; do
    if [ "$uid" -ge 1000 ]; then
        min_days=$(chage -l "$user" 2>/dev/null | grep "Minimum password age" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$min_days" -lt 7 && "$min_days" != "0" ]]; then
            echo "$user: Minimum password age = $min_days (should be at least 7)"
        fi
    fi
done

echo ""

# Check users with short warning period
echo "=== Users with Short Warning Period ==="
getent passwd | while IFS=: read -r user _ uid _ _ home _; do
    if [ "$uid" -ge 1000 ]; then
        warn_days=$(chage -l "$user" 2>/dev/null | grep "Warning period" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$warn_days" -lt 7 && "$warn_days" != "0" ]]; then
            echo "$user: Warning period = $warn_days (should be at least 7)"
        fi
    fi
done

echo ""

# Check for accounts expiring soon
echo "=== Accounts Expiring Soon ==="
getent passwd | while IFS=: read -r user _ uid _ _ home _; do
    if [ "$uid" -ge 1000 ]; then
        expire_date=$(chage -l "$user" 2>/dev/null | grep "Account expires" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$expire_date" != "never" ]]; then
            days_until=$(( ($(date -d "$expire_date" +%s) - $(date +%s)) / 86400 ))
            if [ "$days_until" -lt 30 ] && [ "$days_until" -gt 0 ]; then
                echo "$user: Account expires in $days_until days ($expire_date)"
            fi
        fi
    fi
done
```

### User Self-Service

#### Password Management Helper
```bash
#!/bin/bash
# User password management helper

CURRENT_USER=$(whoami)

echo "Password Information for $CURRENT_USER"
echo "====================================="

# Display current password information
chage -l "$CURRENT_USER"

echo ""

# Show menu of options
echo "Available Actions:"
echo "1. Show days until password expires"
echo "2. Show account expiration information"
echo "3. Force password change at next login"
echo "4. Exit"

read -p "Select an option (1-4): " choice

case "$choice" in
    1)
        expire_date=$(chage -l "$CURRENT_USER" | grep "Password expires" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$expire_date" == "never" ]]; then
            echo "Your password never expires."
        else
            days_until=$(( ($(date -d "$expire_date" +%s) - $(date +%s)) / 86400 ))
            echo "Your password expires in $days_until days ($expire_date)."
            if [ "$days_until" -lt 7 ]; then
                echo "WARNING: Your password will expire soon! Please change it."
            fi
        fi
        ;;
    2)
        acc_expire=$(chage -l "$CURRENT_USER" | grep "Account expires" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$acc_expire" == "never" ]]; then
            echo "Your account never expires."
        else
            days_until=$(( ($(date -d "$acc_expire" +%s) - $(date +%s)) / 86400 ))
            echo "Your account expires in $days_until days ($acc_expire)."
            if [ "$days_until" -lt 30 ]; then
                echo "WARNING: Your account will expire soon!"
            fi
        fi
        ;;
    3)
        read -p "This will force you to change your password at next login. Continue? (y/N): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            chage -d 0 "$CURRENT_USER"
            echo "Password change requirement set. You will be prompted to change password at next login."
        else
            echo "Operation cancelled."
        fi
        ;;
    4)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid option."
        exit 1
        ;;
esac
```

## Advanced Usage

### Integration with System Scripts

#### Cron Job for Password Expiration Notifications
```bash
#!/bin/bash
# /etc/cron.weekly/password-expiry-notify

# Email settings
ADMIN_EMAIL="admin@company.com"
SMTP_SERVER="smtp.company.com"

# Send notifications for passwords expiring within 7 days
for user in $(getent passwd | cut -d: -f1); do
    if id "$user" &>/dev/null; then
        expire_info=$(chage -l "$user" 2>/dev/null | grep "Password expires")
        if [[ "$expire_info" != *"never"* ]]; then
            expire_date=$(echo "$expire_info" | cut -d: -f2- | sed 's/^ *//')
            days_until=$(( ($(date -d "$expire_date" +%s) - $(date +%s)) / 86400 ))

            if [ "$days_until" -le 7 ] && [ "$days_until" -ge 0 ]; then
                user_email=$(getent passwd "$user" | cut -d: -f5 | cut -d, -f1)
                subject="Password Expiration Warning for $user"

                if [ "$days_until" -eq 0 ]; then
                    message="Your password expires TODAY. Please change it immediately."
                else
                    message="Your password expires in $days_until day(s) on $expire_date. Please change it soon."
                fi

                # Send email (requires mail command)
                echo "$message" | mail -s "$subject" "$user_email@company.com"
                echo "Password expiry notification sent to $user"
            fi
        fi
    fi
done
```

#### Automatic Account Cleanup Script
```bash
#!/bin/bash
# /etc/cron.monthly/account-cleanup

# Disable accounts expired for more than 30 days
for user in $(getent passwd | cut -d: -f1); do
    if id "$user" &>/dev/null; then
        expire_date=$(chage -l "$user" 2>/dev/null | grep "Account expires" | cut -d: -f2- | sed 's/^ *//')
        if [[ "$expire_date" != "never" ]]; then
            days_since_expire=$(( ($(date +%s) - $(date -d "$expire_date" +%s)) / 86400 ))
            if [ "$days_since_expire" -gt 30 ]; then
                echo "Disabling long-expired account: $user (expired $days_since_expire days ago)"
                chage -E 0 "$user"
                usermod -L "$user"  # Lock the account
            fi
        fi
    fi
done

# Archive users who haven't logged in for 180 days
for user in $(getent passwd | cut -d: -f1); do
    if id "$user" &>/dev/null && [ "$user" != "root" ]; then
        last_login=$(lastlog -u "$user" | tail -1 | awk '{print $3,$4,$5,$6,$7,$8,$9}')
        if [[ "$last_login" == "**Never logged in**" ]] || \
           [[ $(date -d "$last_login" +%s 2>/dev/null) -lt $(date -d '180 days ago' +%s) ]]; then
            echo "Archiving inactive user: $user"
            mkdir -p "/archive/users/$user"
            cp -r "/home/$user" "/archive/users/$user/" 2>/dev/null
            usermod -L "$user"  # Lock but don't delete
        fi
    fi
done
```

### Performance Optimization

#### Efficient Batch Operations
```bash
# Parallel processing for large user bases
max_parallel=10
user_list=$(getent passwd | cut -d: -f1)

echo "$user_list" | xargs -P "$max_parallel" -I {} bash -c '
    user="$1"
    if [ "$(id -u "$user" 2>/dev/null)" -ge 1000 ]; then
        # Apply policy efficiently
        chage -m 7 -M 90 -W 14 -I 30 "$user" 2>/dev/null
        echo "Updated: $user"
    fi
' _ {}

# Use find for more efficient user discovery
find /home -maxdepth 1 -type d -printf "%f\n" 2>/dev/null | \
    grep -v "^home$" | \
    while read -r user; do
        if id "$user" >/dev/null 2>&1; then
            chage -l "$user" >/dev/null 2>&1 && echo "$user"
        fi
    done
```

#### Memory-Efficient Processing
```bash
# Process users without loading all into memory
while IFS=: read -r user _ uid _ _ home _; do
    if [ "$uid" -ge 1000 ]; then
        # Process each user individually
        if chage -l "$user" >/dev/null 2>&1; then
            # Extract only needed information
            expire_date=$(chage -l "$user" | grep "Password expires" | cut -d: -f2-)
            echo "$user:$expire_date"
        fi
    fi
done < /etc/passwd
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Error: Permission denied
# Solution: Use sudo or run as root
sudo chage -l username

# Error: user not found
# Solution: Verify user exists
getent passwd username
id username

# Error: cannot open /etc/shadow
# Solution: Check file permissions and system status
ls -la /etc/shadow
sudo pwck  # Check password file integrity
```

#### Date Format Issues
```bash
# Invalid date format errors
# Use proper date formats:
chage -E "2024-12-31" username
chage -E 1999999999 username  # Unix timestamp
chage -E -1 username          # Never expires

# Convert between formats
date -d "2024-12-31" +%s
date -d @1999999999
```

#### Shadow File Issues
```bash
# /etc/shadow corruption
sudo pwck -r  # Check in read-only mode first
sudo pwck     # Fix issues
sudo grpck    # Check group file too

# Backup before modifications
sudo cp /etc/shadow /etc/shadow.backup.$(date +%Y%m%d)
```

### Debugging Techniques

#### Detailed Information Gathering
```bash
# Show full password file entry
getent shadow username

# Check system-wide password defaults
grep -E "^PASS_.*_DAYS" /etc/login.defs

# Verify PAM password settings
grep -r "pam_unix.so" /etc/pam.d/ | grep password

# Check password quality settings
grep -r "pam_pwquality.so" /etc/pam.d/

# List all users with password aging
getent shadow | while IFS=: read -r user pass last_change min_age max_age warn inactive expire; do
    if [ "$pass" != "*" ] && [ "$pass" != "!" ]; then
        echo "$user: min=$min_age, max=$max_age, warn=$warn, inactive=$inactive"
    fi
done
```

## Related Commands

- [`passwd`](/docs/commands/user-management/passwd) - Change user passwords
- [`useradd`](/docs/commands/user-management/useradd) - Create new user accounts
- [`usermod`](/docs/commands/user-management/usermod) - Modify user accounts
- [`userdel`](/docs/commands/user-management/userdel) - Delete user accounts
- [`passwd`](/docs/commands/user-management/passwd) - Set passwords
- [`login.defs`](/etc/login.defs) - Login and password policy defaults
- [`pwck`](/docs/commands/user-management/pwck) - Password file integrity checker
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database
- [`lastlog`](/docs/commands/user-management/lastlog) - Display recent login information

## Best Practices

1. **Regular Password Changes** - Set reasonable maximum password age (60-90 days)
2. **Minimum Age Enforcement** - Prevent immediate password reuse (7+ days)
3. **Warning Periods** - Provide adequate warning before expiration (7-14 days)
4. **Account Inactivation** - Set inactive period to disable expired accounts
5. **Service Account Policies** - Use longer intervals for service accounts
6. **Regular Auditing** - Monitor password aging compliance
7. **Backup /etc/shadow** - Before making bulk changes
8. **Test Policies** - Apply to test users first
9. **Document Policies** - Maintain clear password policy documentation
10. **User Education** - Inform users about password requirements

## Security Tips

1. **Force Password Changes** after security incidents using `chage -d 0`
2. **Set Account Expiration** for temporary employees and contractors
3. **Monitor Expired Accounts** regularly and disable or remove them
4. **Use Strong Minimum Ages** to prevent password cycling attacks
5. **Implement Warning Systems** to alert users before expiration
6. **Audit Password Policies** to ensure compliance with security standards
7. **Separate Service Accounts** with distinct password policies
8. **Regular Reviews** of password aging settings
9. **Automated Notifications** for password and account expiration
10. **Integration with Security Tools** for comprehensive password management

The `chage` command is essential for maintaining system security through proper password lifecycle management. It provides fine-grained control over password aging policies, ensuring that users regularly update their credentials while maintaining flexibility for different types of accounts and security requirements.