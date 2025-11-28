---
title: passwd - Change User Password
sidebar_label: passwd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# passwd - Change User Password

The `passwd` command is a fundamental Linux utility for managing user passwords and password aging policies. It serves as the primary interface for users to change their own passwords and enables system administrators to manage password security settings for all user accounts. The command works with the shadow password system to securely store encrypted passwords and implements various security features like password complexity checks, aging policies, and account locking mechanisms. With its comprehensive set of options, `passwd` provides complete control over user authentication security, making it an essential tool for system administration and security management.

## Basic Syntax

```bash
passwd [options] [username]
```

When used without arguments, `passwd` changes the current user's password. When a username is provided (requiring root privileges), it changes the specified user's password.

## Common Options

### Password Management Options
- `-d, --delete` - Delete password (make it empty, disabling password authentication)
- `-l, --lock` - Lock password by prefixing encrypted password with '!'
- `-u, --unlock` - Unlock password (removes locking prefix)
- `-e, --expire` - Force password to expire immediately, requiring change on next login
- `-S, --status` - Display password status information for the account
- `--stdin` - Read new password from standard input instead of prompting

### Password Aging and Policy
- `-n, --minimum DAYS` - Set minimum number of days before password can be changed
- `-x, --maximum DAYS` - Set maximum number of days for password validity
- `-w, --warning DAYS` - Set warning period before password expiration
- `-i, --inactive DAYS` - Set number of days after expiration before account is disabled

### System and Repository Options
- `-k, --keep-tokens` - Keep authentication tokens after password change
- `-f, --force` - Force operation even if it would normally fail
- `-q, --quiet` - Quiet mode - suppress informational messages
- `-r, --repository REPOSITORY` - Change password in specified repository (for NIS, LDAP, etc.)

## Usage Examples

### Basic Password Operations

#### Changing Passwords
```bash
# Change your own password (interactive)
passwd

# Change another user's password (root only)
passwd john

# Change password for user alice with confirmation
passwd alice

# Set password from stdin (useful in scripts)
echo "NewSecurePass123!" | passwd --stdin john

# Change password in quiet mode
passwd -q bob
```

#### Password Status and Information
```bash
# Display password status for user john
passwd -S john

# Check your own password status
passwd -S

# Display status for multiple users
for user in john alice bob; do
    echo "=== $user ==="
    passwd -S $user
done

# Status output format:
# john PS 2024-12-31 0 99999 7 -1
# Format: username status expirationdate min max warning inactive
# Status codes: PS=Password set, LK=Locked, NP=No password, L=Locked
```

#### Locking and Unlocking Accounts
```bash
# Lock user account (cannot login with password)
passwd -l john

# Lock multiple accounts
for user in alice bob charlie; do
    passwd -l $user
    echo "Account $user locked"
done

# Unlock user account
passwd -u john

# Unlock account and verify status
passwd -u alice && passwd -S alice

# Delete password (make account passwordless)
passwd -d tempuser

# Force password change on next login
passwd -e newuser

# Create workflow for temporary employee
username="temp_$(date +%Y%m%d)"
useradd $username
echo "TempPass123!" | passwd --stdin $username
passwd -e $username  # Force change on first login
```

### Password Policy Management

#### Setting Password Aging
```bash
# Set password to expire in 30 days
passwd -x 30 john

# Set minimum days before password change (prevent immediate reuse)
passwd -n 7 alice

# Set warning period before expiration
passwd -w 14 bob

# Set inactive period after expiration
passwd -i 5 charlie

# Apply comprehensive password policy
passwd -n 7 -x 90 -w 14 -i 30 newuser

# Remove password aging (never expires)
passwd -x 99999 systemuser
```

#### Bulk Password Policy Application
```bash
#!/bin/bash
# Apply password policies to all regular users

echo "=== Applying Password Policies ==="
min_days="7"
max_days="90"
warn_days="14"
inactive_days="30"

# Process all users with UID >= 1000
while IFS=: read -r username _ uid _ _ home shell; do
    # Skip system users and accounts without valid shells
    [[ "$uid" -lt 1000 ]] && continue
    [[ "$shell" =~ (nologin|false|sync)$ ]] && continue
    [[ ! -d "$home" ]] && continue

    echo "Setting policy for: $username"

    # Apply password aging settings
    passwd -n "$min_days" "$username" 2>/dev/null
    passwd -x "$max_days" "$username" 2>/dev/null
    passwd -w "$warn_days" "$username" 2>/dev/null
    passwd -i "$inactive_days" "$username" 2>/dev/null

    # Display final status
    passwd -S "$username"
    echo "---"
done < /etc/passwd
```

#### Password Expiration Monitoring
```bash
#!/bin/bash
# Monitor password expiration and send notifications

echo "=== Password Expiration Report ==="
current_date=$(date +%s)
warning_days="7"

while IFS=: read -r username encrypted lastchanged min max warn inactive expire _; do
    # Skip system users and accounts without passwords
    [[ "$username" =~ ^(root|nobody|daemon|bin|sys|sync|games|man|lp|mail|news|uucp|proxy|www-data|backup|list|irc|gnats|nobody)$ ]] && continue
    [[ "$encrypted" =~ ^[\!\*]$ ]] && continue
    [[ "$lastchanged" -eq 0 ]] && continue

    # Calculate expiration if max is set and not 99999
    if [[ "$max" -gt 0 && "$max" -ne 99999 ]]; then
        expire_timestamp=$((lastchanged * 86400 + max * 86400))
        days_until_expire=$(( (expire_timestamp - current_date) / 86400 ))

        if [[ $days_until_expire -le $warning_days ]]; then
            if [[ $days_until_expire -lt 0 ]]; then
                echo "🔴 EXPIRED: $username - Expired ${days_until_expire#-} days ago"
            elif [[ $days_until_expire -eq 0 ]]; then
                echo "🟠 EXPIRES TODAY: $username"
            elif [[ $days_until_expire -le $warn ]]; then
                echo "🟡 EXPIRES SOON: $username - $days_until_expire days"
            fi
        fi
    fi
done < /etc/shadow
```

## System Administration

### Automated Password Management

#### Service Account Password Rotation
```bash
#!/bin/bash
# Automated password rotation for service accounts

service_accounts=("appuser" "dbuser" "backupuser" "webuser")
password_length="16"
password_file="/root/service_passwords.txt"
log_file="/var/log/service_password_rotation.log"

generate_secure_password() {
    # Generate secure password with special characters
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-"$password_length" | \
        sed 's/[[:alpha:]]/\U&/3;s/[[:digit:]]/!/' | \
        head -c"$password_length"
}

log_rotation() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$log_file"
}

echo "Starting service account password rotation..."
echo "Rotation started at $(date)" >> "$log_file"

# Create backup of current passwords
if [[ -f "$password_file" ]]; then
    cp "$password_file" "${password_file}.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Clear password file for new entries
> "$password_file"

for account in "${service_accounts[@]}"; do
    if id "$account" &>/dev/null; then
        # Generate new password
        new_password=$(generate_secure_password)

        # Set new password
        if echo "$account:$new_password" | chpasswd; then
            # Store encrypted password reference
            echo "$account:$(date '+%Y-%m-%d %H:%M:%S')" >> "$password_file"

            # Update password aging
            passwd -x 90 "$account"
            passwd -n 1 "$account"

            log_rotation "Successfully rotated password for $account"
            echo "✅ Rotated password for: $account"
        else
            log_rotation "Failed to rotate password for $account"
            echo "❌ Failed to rotate password for: $account"
        fi
    else
        log_rotation "Account $account does not exist"
        echo "⚠️  Account $account does not exist"
    fi
done

chmod 600 "$password_file"
chmod 600 "$log_file"

echo "Password rotation completed"
echo "Rotation completed at $(date)" >> "$log_file"
```

#### Emergency Password Reset Workflow
```bash
#!/bin/bash
# Emergency password reset with security logging

username="$1"
admin_email="admin@company.com"
log_file="/var/log/emergency_resets.log"
temp_password_length="12"

if [[ -z "$username" ]]; then
    echo "Usage: $0 <username>"
    exit 1
fi

# Verify user exists
if ! id "$username" &>/dev/null; then
    echo "Error: User $username does not exist"
    exit 1
fi

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    echo "Error: This script must be run as root"
    exit 1
fi

generate_temp_password() {
    # Generate temporary password
    openssl rand -base64 12 | tr -d "=+/" | cut -c1-"$temp_password_length"
}

log_event() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$log_file"
}

# Check current account status
current_status=$(passwd -S "$username")
echo "Current account status: $current_status"

# Log the reset initiation
log_event "Emergency password reset initiated for $username by $(whoami) from $(tty)"

# Generate temporary password
temp_password="Temp$(date +%Y%m%d%H%M)${username:0:3}"

# Perform the reset
echo "Performing emergency password reset for $username..."

# Set temporary password
if echo "$username:$temp_password" | chpasswd; then
    echo "✅ Temporary password set successfully"
    log_event "Temporary password set for $username"

    # Force password change on next login
    if passwd -e "$username"; then
        echo "✅ Password expiration forced"
        log_event "Password expiration forced for $username"
    fi

    # Unlock account if it was locked
    if echo "$current_status" | grep -q " L "; then
        passwd -u "$username"
        echo "✅ Account unlocked"
        log_event "Account unlocked for $username"
    fi

    # Display reset information
    echo
    echo "=== EMERGENCY PASSWORD RESET COMPLETED ==="
    echo "Username: $username"
    echo "Temporary Password: $temp_password"
    echo "User must change password on next login"
    echo "This reset has been logged"
    echo

    # Send notification to admin (if mail is configured)
    if command -v mail &>/dev/null; then
        echo "Emergency password reset performed for user: $username
Performed by: $(whoami) from $(tty)
Time: $(date)
Temporary password: $temp_password
User must change password on next login" | mail -s "Emergency Password Reset Alert" "$admin_email"
    fi
else
    echo "❌ Failed to set temporary password"
    log_event "Failed to set temporary password for $username"
    exit 1
fi

echo "Emergency password reset workflow completed"
```

### Password Security Auditing

#### Comprehensive Password Audit Script
```bash
#!/bin/bash
# Comprehensive password security audit

audit_file="/var/log/password_audit_$(date +%Y%m%d).txt"
critical_issues=0
warnings=0

echo "=== PASSWORD SECURITY AUDIT ===" > "$audit_file"
echo "Audit Date: $(date)" >> "$audit_file"
echo "System: $(hostname)" >> "$audit_file"
echo "Kernel: $(uname -r)" >> "$audit_file"
echo >> "$audit_file"

echo "Starting password security audit..."

# Function to log findings
log_finding() {
    local severity="$1"
    local message="$2"
    local username="$3"

    echo "[$severity] $message" >> "$audit_file"
    [[ -n "$username" ]] && echo "    User: $username" >> "$audit_file"

    case "$severity" in
        "CRITICAL") ((critical_issues++)) ;;
        "WARNING") ((warnings++)) ;;
    esac
}

# Check for users with empty passwords
echo "Checking for empty passwords..."
while IFS=: read -r username encrypted _; do
    if [[ "$encrypted" == "" || "$encrypted" == "!" || "$encrypted" == "*" ]]; then
        if [[ ! "$username" =~ ^(root|nobody|daemon|bin|sys|sync|games|man|lp|mail|news|uucp|proxy)$ ]]; then
            log_finding "CRITICAL" "User has no password set" "$username"
        fi
    fi
done < /etc/shadow

# Check for unlocked root account
if grep -q '^root::' /etc/shadow 2>/dev/null; then
    log_finding "CRITICAL" "Root account has no password"
fi

# Check password aging policies
echo "Checking password aging policies..."
while IFS=: read -r username encrypted lastchanged min max warn inactive expire _; do
    [[ "$username" =~ ^(root|nobody|daemon|bin|sys|sync|games|man|lp|mail|news|uucp|proxy)$ ]] && continue
    [[ "$encrypted" =~ ^[\!\*]$ ]] && continue

    # Check for passwords that never expire
    if [[ "$max" -eq 99999 ]]; then
        log_finding "WARNING" "Password never expires" "$username"
    fi

    # Check for no minimum password age
    if [[ "$min" -eq 0 ]]; then
        log_finding "WARNING" "No minimum password age set" "$username"
    fi

    # Check for no warning period
    if [[ "$warn" -eq 0 ]]; then
        log_finding "WARNING" "No password expiration warning set" "$username"
    fi

    # Check for recently changed passwords (possible bypass)
    if [[ "$lastchanged" -gt 0 ]]; then
        days_since_change=$(( ($(date +%s) - lastchanged * 86400) / 86400 ))
        if [[ "$days_since_change" -lt 1 ]]; then
            log_finding "WARNING" "Password changed in last 24 hours" "$username"
        fi
    fi
done < /etc/shadow

# Check account status
echo "Checking account status..."
while IFS=: read -r username encrypted _; do
    [[ "$username" =~ ^(root|nobody|daemon|bin|sys|sync|games|man|lp|mail|news|uucp|proxy)$ ]] && continue

    # Check locked accounts
    if [[ "$encrypted" =~ ^!.*! ]]; then
        log_finding "INFO" "Account is locked" "$username"
    fi

    # Check accounts with expired passwords
    if [[ "$encrypted" =~ ^! ]]; then
        if ! [[ "$encrypted" =~ ^!.*! ]]; then
            log_finding "WARNING" "Account has expired password" "$username"
        fi
    fi
done < /etc/shadow

# Check system file permissions
echo "Checking system file permissions..."
passwd_perms=$(stat -c "%a" /etc/passwd 2>/dev/null)
shadow_perms=$(stat -c "%a" /etc/shadow 2>/dev/null)
group_perms=$(stat -c "%a" /etc/group 2>/dev/null)
gshadow_perms=$(stat -c "%a" /etc/gshadow 2>/dev/null)

if [[ "$passwd_perms" != "644" ]]; then
    log_finding "CRITICAL" "Incorrect permissions on /etc/passwd (current: $passwd_perms, expected: 644)"
fi

if [[ "$shadow_perms" != "600" && "$shadow_perms" != "640" ]]; then
    log_finding "CRITICAL" "Incorrect permissions on /etc/shadow (current: $shadow_perms, expected: 600/640)"
fi

# Summary statistics
echo "=== AUDIT SUMMARY ===" >> "$audit_file"
echo "Critical Issues Found: $critical_issues" >> "$audit_file"
echo "Warnings Found: $warnings" >> "$audit_file"
echo "Total Users Audited: $(getent passwd | wc -l)" >> "$audit_file"
echo "Users with Passwords: $(sudo awk -F: '$2 ~ /^\$/ {print $1}' /etc/shadow | wc -l)" >> "$audit_file"
echo "Locked Accounts: $(sudo awk -F: '$2 ~ /^!/ {print $1}' /etc/shadow | wc -l)" >> "$audit_file"
echo >> "$audit_file"
echo "Audit completed at $(date)" >> "$audit_file"

# Display results
echo "Audit completed. Report saved to: $audit_file"
echo
echo "=== AUDIT RESULTS ==="
echo "Critical Issues: $critical_issues"
echo "Warnings: $warnings"
echo

if [[ "$critical_issues" -gt 0 ]]; then
    echo "⚠️  CRITICAL ISSUES FOUND - IMMEDIATE ATTENTION REQUIRED"
    exit 1
elif [[ "$warnings" -gt 0 ]]; then
    echo "⚠️  WARNINGS FOUND - RECOMMENDED ACTIONS"
    exit 2
else
    echo "✅ No critical security issues found"
    exit 0
fi
```

## Advanced Password Management

### Password Strength Enforcement

#### Custom Password Policy Script
```bash
#!/bin/bash
# Advanced password policy enforcement

username="$1"
new_password="$2"

min_length="12"
require_uppercase="true"
require_lowercase="true"
require_numbers="true"
require_special="true"
forbidden_words=("password" "123456" "qwerty" "admin" "root" "user" "login")

validate_password() {
    local password="$1"
    local user="$2"
    local issues=()

    # Length check
    if [[ ${#password} -lt $min_length ]]; then
        issues+=("Password must be at least $min_length characters long (current: ${#password})")
    fi

    # Complexity checks
    if [[ "$require_uppercase" == "true" ]] && ! [[ "$password" =~ [A-Z] ]]; then
        issues+=("Password must contain uppercase letters")
    fi

    if [[ "$require_lowercase" == "true" ]] && ! [[ "$password" =~ [a-z] ]]; then
        issues+=("Password must contain lowercase letters")
    fi

    if [[ "$require_numbers" == "true" ]] && ! [[ "$password" =~ [0-9] ]]; then
        issues+=("Password must contain numbers")
    fi

    if [[ "$require_special" == "true" ]] && ! [[ "$password" =~ [^a-zA-Z0-9] ]]; then
        issues+=("Password must contain special characters")
    fi

    # Dictionary checks
    local lower_password="${password,,}"
    local lower_user="${user,,}"

    if [[ "$lower_password" == "$lower_user" ]] || [[ "$lower_password" == *"$lower_user"* ]]; then
        issues+=("Password cannot contain username")
    fi

    # Forbidden words check
    for word in "${forbidden_words[@]}"; do
        if [[ "$lower_password" == "$word" ]] || [[ "$lower_password" == *"$word"* ]]; then
            issues+=("Password contains forbidden word: $word")
        fi
    done

    # Repeated characters check
    if [[ "$password" =~ (.)\1{2,} ]]; then
        issues+=("Password contains repeated characters")
    fi

    # Sequential characters check
    if echo "$password" | grep -q -E "(012|123|234|345|456|567|678|789|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)"; then
        issues+=("Password contains sequential characters")
    fi

    # Return validation result
    if [[ ${#issues[@]} -eq 0 ]]; then
        return 0  # Valid password
    else
        echo "Password validation failed:"
        printf '  - %s\n' "${issues[@]}"
        return 1  # Invalid password
    fi
}

# Main execution
if [[ -z "$username" || -z "$new_password" ]]; then
    echo "Usage: $0 <username> <password>"
    echo "Example: $0 john 'MySecurePass123!'"
    exit 1
fi

echo "Validating password for user: $username"

if validate_password "$new_password" "$username"; then
    echo "✅ Password meets security requirements"

    # Apply the password if validation passes
    if echo "$username:$new_password" | chpasswd; then
        echo "✅ Password successfully set for $username"

        # Force password change if requested
        read -p "Force password change on next login? (y/N): " force_change
        if [[ "$force_change" =~ ^[Yy]$ ]]; then
            passwd -e "$username"
            echo "✅ Password expiration set for $username"
        fi
    else
        echo "❌ Failed to set password for $username"
        exit 1
    fi
else
    echo "❌ Password does not meet security requirements"
    exit 1
fi
```

### Integration with External Systems

#### LDAP Password Synchronization
```bash
#!/bin/bash
# LDAP password synchronization utility

username="$1"
new_password="$2"
ldap_server="ldap://ldap.example.com"
ldap_admin_dn="cn=admin,dc=example,dc=com"
ldap_base_dn="ou=users,dc=example,dc=com"

# Function to log operations
log_operation() {
    local operation="$1"
    local status="$2"
    local details="$3"

    echo "$(date '+%Y-%m-%d %H:%M:%S') - $operation - $status - $details" >> /var/log/ldap_sync.log
}

# Function to check LDAP connectivity
check_ldap_connectivity() {
    if ! ldapsearch -x -H "$ldap_server" -b "" -s base "(objectclass=*)" namingContexts &>/dev/null; then
        echo "Error: Cannot connect to LDAP server at $ldap_server"
        log_operation "LDAP_CONNECTIVITY" "FAILED" "Cannot reach LDAP server"
        return 1
    fi
    return 0
}

# Function to find user in LDAP
find_ldap_user() {
    local user="$1"
    if ldapsearch -x -H "$ldap_server" -b "$ldap_base_dn" "(uid=$user)" uid &>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to change LDAP password
change_ldap_password() {
    local user="$1"
    local password="$2"

    local user_dn="uid=$user,$ldap_base_dn"

    # Prompt for LDAP admin password if not provided
    echo "Enter LDAP admin password:"
    read -s ldap_admin_password

    # Change LDAP password
    if ldappasswd -x -H "$ldap_server" -D "$ldap_admin_dn" -w "$ldap_admin_password" \
        -s "$password" "$user_dn"; then
        log_operation "LDAP_PASSWORD_CHANGE" "SUCCESS" "Changed password for $user"
        return 0
    else
        log_operation "LDAP_PASSWORD_CHANGE" "FAILED" "Could not change password for $user"
        return 1
    fi
}

# Function to change local password
change_local_password() {
    local user="$1"
    local password="$2"

    if echo "$user:$password" | chpasswd; then
        log_operation "LOCAL_PASSWORD_CHANGE" "SUCCESS" "Changed password for $user"
        return 0
    else
        log_operation "LOCAL_PASSWORD_CHANGE" "FAILED" "Could not change password for $user"
        return 1
    fi
}

# Main execution
if [[ -z "$username" || -z "$new_password" ]]; then
    echo "Usage: $0 <username> <new_password>"
    echo "Example: $0 john 'NewSecurePass123!'"
    exit 1
fi

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    echo "Error: This script must be run as root"
    exit 1
fi

echo "LDAP Password Synchronization Utility"
echo "===================================="
echo "User: $username"
echo "LDAP Server: $ldap_server"
echo

# Check LDAP connectivity
if ! check_ldap_connectivity; then
    exit 1
fi

echo "✅ LDAP connectivity verified"

# Check if user exists locally
if ! id "$username" &>/dev/null; then
    echo "Error: User $username does not exist locally"
    exit 1
fi

echo "✅ Local user $username verified"

# Check if user exists in LDAP
if find_ldap_user "$username"; then
    echo "✅ Found user $username in LDAP"

    # Change LDAP password
    echo "Changing LDAP password..."
    if change_ldap_password "$username" "$new_password"; then
        echo "✅ LDAP password changed successfully"
    else
        echo "❌ Failed to change LDAP password"
        exit 1
    fi
else
    echo "⚠️  User $username not found in LDAP, skipping LDAP password change"
fi

# Change local password
echo "Changing local password..."
if change_local_password "$username" "$new_password"; then
    echo "✅ Local password changed successfully"
else
    echo "❌ Failed to change local password"
    exit 1
fi

# Apply password policies if requested
read -p "Apply password aging policies? (y/N): " apply_policies
if [[ "$apply_policies" =~ ^[Yy]$ ]]; then
    passwd -n 7 -x 90 -w 14 "$username"
    echo "✅ Password policies applied"
fi

echo
echo "=== PASSWORD SYNCHRONIZATION COMPLETED ==="
echo "User: $username"
echo "LDAP: $(find_ldap_user "$username" && echo "Updated" || echo "Skipped")"
echo "Local: Updated"
echo "Timestamp: $(date)"
```

## Performance and Security Optimization

### Password File Optimization

#### Password Database Maintenance
```bash
#!/bin/bash
# Password database maintenance and optimization

backup_dir="/var/backups/passwords"
temp_file="/tmp/passwd_maintenance.tmp"
retention_days="30"

# Create backup directory if it doesn't exist
mkdir -p "$backup_dir"

# Function to create backup
create_backup() {
    local file="$1"
    local backup_name="$2"

    if [[ -f "$file" ]]; then
        cp "$file" "$backup_dir/${backup_name}_$(date +%Y%m%d_%H%M%S)"
        echo "✅ Backup created for $file"
    fi
}

# Function to clean old backups
clean_old_backups() {
    echo "Cleaning backups older than $retention_days days..."
    find "$backup_dir" -name "*" -type f -mtime +$retention_days -delete
    echo "✅ Old backups cleaned"
}

# Function to check file integrity
check_file_integrity() {
    local file="$1"
    local description="$2"

    if [[ -f "$file" ]]; then
        if pwck -r "$file" 2>/dev/null; then
            echo "✅ $description file integrity OK"
            return 0
        else
            echo "❌ $description file integrity issues found"
            return 1
        fi
    else
        echo "❌ $description file not found"
        return 1
    fi
}

echo "Password Database Maintenance"
echo "============================"
echo "Timestamp: $(date)"
echo

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    echo "Error: This script must be run as root"
    exit 1
fi

# Create current backups
echo "Creating backups..."
create_backup "/etc/passwd" "passwd"
create_backup "/etc/shadow" "shadow"
create_backup "/etc/group" "group"
create_backup "/etc/gshadow" "gshadow"

# Check file permissions
echo
echo "Checking file permissions..."
expected_passwd_perms="644"
expected_shadow_perms="600"
expected_group_perms="644"
expected_gshadow_perms="600"

current_passwd_perms=$(stat -c "%a" /etc/passwd 2>/dev/null)
current_shadow_perms=$(stat -c "%a" /etc/shadow 2>/dev/null)
current_group_perms=$(stat -c "%a" /etc/group 2>/dev/null)
current_gshadow_perms=$(stat -c "%a" /etc/gshadow 2>/dev/null)

if [[ "$current_passwd_perms" == "$expected_passwd_perms" ]]; then
    echo "✅ /etc/passwd permissions correct ($current_passwd_perms)"
else
    echo "⚠️  /etc/passwd permissions unusual ($current_passwd_perms, expected $expected_passwd_perms)"
fi

if [[ "$current_shadow_perms" == "$expected_shadow_perms" || "$current_shadow_perms" == "640" ]]; then
    echo "✅ /etc/shadow permissions correct ($current_shadow_perms)"
else
    echo "⚠️  /etc/shadow permissions unusual ($current_shadow_perms, expected $expected_shadow_perms)"
fi

# Check file integrity
echo
echo "Checking file integrity..."
passwd_ok=false
shadow_ok=false
group_ok=false
gshadow_ok=false

if check_file_integrity "/etc/passwd" "Password"; then
    passwd_ok=true
fi

if check_file_integrity "/etc/shadow" "Shadow"; then
    shadow_ok=true
fi

if check_file_integrity "/etc/group" "Group"; then
    group_ok=true
fi

if check_file_integrity "/etc/gshadow" "GShadow"; then
    gshadow_ok=true
fi

# Validate password database consistency
echo
echo "Checking database consistency..."
if pwck -q; then
    echo "✅ Password database consistency OK"
else
    echo "⚠️  Password database consistency issues found"
    echo "Consider running 'pwck -r' to fix issues"
fi

# Group database consistency
if grpck -q; then
    echo "✅ Group database consistency OK"
else
    echo "⚠️  Group database consistency issues found"
    echo "Consider running 'grpck -r' to fix issues"
fi

# Generate statistics report
echo
echo "=== DATABASE STATISTICS ==="
total_users=$(getent passwd | wc -l)
active_users=$(getent passwd | grep -v ":/bin/false" | grep -v ":/sbin/nologin" | wc -l)
users_with_passwords=$(sudo awk -F: '$2 ~ /^\$/ {print $1}' /etc/shadow | wc -l)
locked_accounts=$(sudo awk -F: '$2 ~ /^!/ {print $1}' /etc/shadow | wc -l)

echo "Total user accounts: $total_users"
echo "Active user accounts: $active_users"
echo "Users with passwords: $users_with_passwords"
echo "Locked accounts: $locked_accounts"

# Check for potential issues
echo
echo "=== SECURITY CHECKS ==="

# Check for users with UID 0 (root privileges)
root_users=$(awk -F: '$3 == 0 {print $1}' /etc/passwd)
if [[ $(echo "$root_users" | wc -l) -gt 1 ]]; then
    echo "⚠️  Multiple users with UID 0 found:"
    echo "$root_users"
else
    echo "✅ Only one user with UID 0"
fi

# Check for users without home directories
echo "Checking for users without home directories..."
while IFS=: read -r username _ _ _ _ home shell; do
    if [[ ! -d "$home" && "$shell" != "/bin/false" && "$shell" != "/sbin/nologin" ]]; then
        echo "⚠️  User $username has no home directory ($home)"
    fi
done < /etc/passwd

# Clean old backups
echo
clean_old_backups

# Maintenance summary
echo
echo "=== MAINTENANCE SUMMARY ==="
echo "Backups created: $(ls -1 "$backup_dir" | grep "$(date +%Y%m%d)" | wc -l)"
echo "File integrity checks: $((passwd_ok + shadow_ok + group_ok + gshadow_ok))/4 passed"
echo "Timestamp: $(date)"

if [[ "$passwd_ok" == true && "$shadow_ok" == true && "$group_ok" == true && "$gshadow_ok" == true ]]; then
    echo "✅ All checks passed - database is healthy"
    exit 0
else
    echo "⚠️  Some checks failed - review issues above"
    exit 1
fi
```

## Troubleshooting

### Common Issues and Solutions

#### Password Change Failures
```bash
#!/bin/bash
# Password change troubleshooting utility

username="$1"

troubleshoot_password_change() {
    local user="$1"

    echo "Troubleshooting password issues for: $user"
    echo "========================================"

    # Check if user exists
    if ! id "$user" &>/dev/null; then
        echo "❌ User $user does not exist"
        return 1
    fi
    echo "✅ User $user exists"

    # Check user status
    user_status=$(passwd -S "$user")
    echo "User status: $user_status"

    # Check if account is locked
    if echo "$user_status" | grep -q " L "; then
        echo "⚠️  Account is locked"
        echo "To unlock: sudo passwd -u $user"
    fi

    # Check password file permissions
    echo
    echo "Checking password file permissions..."
    passwd_perms=$(stat -c "%a" /etc/passwd 2>/dev/null)
    shadow_perms=$(stat -c "%a" /etc/shadow 2>/dev/null)

    echo "/etc/passwd permissions: $passwd_perms"
    echo "/etc/shadow permissions: $shadow_perms"

    if [[ "$shadow_perms" != "600" && "$shadow_perms" != "640" ]]; then
        echo "⚠️  Incorrect /etc/shadow permissions"
        echo "To fix: sudo chmod 600 /etc/shadow"
    fi

    # Check password policy restrictions
    echo
    echo "Checking password policy restrictions..."
    shadow_entry=$(getent shadow "$user")
    if [[ -n "$shadow_entry" ]]; then
        IFS=: read -r _ _ lastchanged min max warn inactive expire _ <<< "$shadow_entry"

        echo "Last password change: Day $lastchanged ($(date -d "@$((lastchanged * 86400))" 2>/dev/null || echo "Unknown"))"
        echo "Minimum password age: $min days"
        echo "Maximum password age: $max days"

        if [[ "$min" -gt 0 ]]; then
            days_since_change=$(( ($(date +%s) - lastchanged * 86400) / 86400 ))
            if [[ "$days_since_change" -lt "$min" ]]; then
                echo "⚠️  Password too young (changed $days_since_change days ago, must wait $min days)"
                echo "To bypass: sudo passwd -n 0 $user"
            fi
        fi
    fi

    # Check file system space
    echo
    echo "Checking file system space..."
    df /etc 2>/dev/null | tail -1 | awk '{print "Available space on /etc: " $4 " KB"}'

    # Check PAM configuration
    echo
    echo "Checking PAM password configuration..."
    if [[ -f "/etc/pam.d/common-password" ]]; then
        echo "PAM password configuration found: /etc/pam.d/common-password"
        echo "Common restrictions may include:"
        grep -E "pam_pwquality|pam_cracklib|pam_unix" /etc/pam.d/common-password 2>/dev/null | head -5
    fi

    if [[ -f "/etc/security/pwquality.conf" ]]; then
        echo "Password quality configuration: /etc/security/pwquality.conf"
        grep -v "^#" /etc/security/pwquality.conf | grep -v "^$" | head -5
    fi
}

# Usage
if [[ -z "$username" ]]; then
    echo "Usage: $0 <username>"
    echo "Example: $0 john"
    exit 1
fi

troubleshoot_password_change "$username"
```

## Best Practices

1. **Use strong password policies** - Implement minimum length, complexity requirements, and regular rotation
2. **Set appropriate password aging** - Use minimum and maximum password age to enforce regular changes
3. **Monitor expired passwords** - Regularly check for accounts with expired or expiring passwords
4. **Use account locking** - Lock inactive accounts instead of deleting them immediately
5. **Maintain backup copies** - Regular backup of password files before making changes
6. **Implement audit logging** - Log all password changes and security-related events
7. **Use secure temporary passwords** - Generate cryptographically secure temporary passwords
8. **Validate password strength** - Implement custom password validation when needed
9. **Regular security audits** - Periodically audit password policies and account security
10. **Educate users** - Train users on password security best practices

## Security Considerations

### Password File Security
```bash
# Ensure proper permissions
chmod 644 /etc/passwd
chmod 600 /etc/shadow
chmod 644 /etc/group
chmod 600 /etc/gshadow

# Verify ownership
chown root:root /etc/passwd /etc/shadow /etc/group /etc/gshadow

# Monitor for unauthorized changes
stat -c "%n %y %s %a" /etc/passwd /etc/shadow
```

### Common Security Issues
- Empty or weak passwords
- Passwords that never expire
- Accounts without minimum password age
- Shared passwords among users
- Default system passwords
- Passwords containing usernames
- Predictable password patterns
- Insufficient password complexity

## Related Commands

- [`chage`](/docs/commands/user-management/chage) - Change user password aging information
- [`chpasswd`](/docs/commands/user-management/chpasswd) - Update passwords in batch mode
- [`useradd`](/docs/commands/user-management/useradd) - Create new user account
- [`usermod`](/docs/commands/user-management/usermod) - Modify user account
- [`userdel`](/docs/commands/user-management/userdel) - Delete user account
- [`su`](/docs/commands/user-management/su) - Switch user
- [`sudo`](/docs/commands/user-management/sudo) - Execute commands as another user
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative databases
- [`pwck`](/docs/commands/user-management/pwck) - Verify integrity of password files
- [`grpck`](/docs/commands/user-management/grpck) - Verify integrity of group files

The `passwd` command is an essential tool for Linux system security, providing comprehensive password management capabilities that protect user accounts and maintain system integrity. Understanding its options and implementing proper password policies ensures robust authentication security across the system.