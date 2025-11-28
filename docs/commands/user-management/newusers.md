---
title: newusers - Batch User Creation and Update Tool
sidebar_label: newusers
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# newusers - Batch User Creation and Update Tool

The `newusers` command is a powerful utility for batch creation and updating of user accounts in Linux systems. It reads user information from a file (or standard input) and creates or updates multiple user accounts efficiently. This tool is particularly useful for system administrators who need to manage large numbers of user accounts, migrate user databases, or set up new systems with multiple users quickly. Newusers can create new users, update existing users, set passwords, establish home directories, and assign all necessary user attributes in a single operation.

## Basic Syntax

```bash
newusers [OPTIONS] [INPUT_FILE]
```

If no input file is specified, newusers reads from standard input.

## Input File Format

Each line in the input file should contain user information in the following format:

```
username:password:UID:GID:comment:home_directory:shell
```

- Fields are separated by colons (:)
- Empty fields can be left blank but colons must be maintained
- Password can be plaintext or encrypted (preceded by ! for disabled accounts)

## Common Options

### Input and Output Options
- `-c, --crypt-method METHOD` - Specify password encryption method
- `-s, --sha-rounds ROUNDS` - Number of rounds for SHA encryption
- `-r, --system` - Create system users (UID < SYS_UID_MIN)
- `-b, --badnames` - Allow usernames that don't conform to standards
- `-R, --root CHROOT_DIR` - Directory to chroot into

### Password Options
- `-e, --encrypt` - Encrypt passwords before updating
- `-P, --prefix PREFIX_DIR` - Prefix directory for user files

## Usage Examples

### Basic User Creation

#### Creating Users from File
```bash
# Create users from a predefined file
newusers user_list.txt

# Example user_list.txt content:
# john:secure123:1001:1001:John Doe:/home/john:/bin/bash
# jane:pass456:1002:1002:Jane Smith:/home/jane:/bin/bash
# admin:admin789:1003:1003:Admin User:/home/admin:/bin/bash
```

#### Creating Users from Standard Input
```bash
# Create users by typing directly
newusers
# Then type:
# user1:password1:1001:1001:User One:/home/user1:/bin/bash
# user2:password2:1002:1002:User Two:/home/user2:/bin/bash
# Press Ctrl+D to end

# Using heredoc for batch input
newusers << EOF
developer:dev123:2001:2001:Developer:/home/developer:/bin/bash
tester:test456:2002:2002:Tester:/home/tester:/bin/bash
EOF
```

#### Creating Users with Pipe
```bash
# Generate users dynamically and pipe to newusers
echo "tempuser:temppass:3001:3001:Temp User:/home/tempuser:/bin/bash" | newusers

# Create users from CSV conversion
cat users.csv | awk -F, '{print $1":"$2":"$3":"$4":"$5":/home/"$1":/bin/bash}' | newusers
```

### Advanced User Management

#### System User Creation
```bash
# Create system users
newusers -r system_users.txt

# Example with system users:
# ntp:x:123:123:Network Time Protocol:/var/empty:/sbin/nologin
# daemon:x:2:2:Daemon:/sbin:/sbin/nologin
# mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
```

#### Password Encryption Methods
```bash
# Use SHA-512 encryption (default on most systems)
newusers -c SHA512 users.txt

# Use MD5 encryption
newusers -c MD5 users.txt

# Use SHA256 with custom rounds
newusers -c SHA256 -s 5000 users.txt

# Use DES encryption (not recommended)
newusers -c DES users.txt
```

#### Bulk User Operations
```bash
# Create students for a class
cat << EOF | newusers
student01:class2024:4001:4001:Student 01:/home/student01:/bin/bash
student02:class2024:4002:4002:Student 02:/home/student02:/bin/bash
student03:class2024:4003:4003:Student 03:/home/student03:/bin/bash
EOF

# Create temporary users with disabled passwords
cat << EOF | newusers
temp1:!disabled:5001:5001:Temp User 1:/home/temp1:/bin/bash
temp2:!disabled:5002:5002:Temp User 2:/home/temp2:/bin/bash
EOF
```

## Practical Examples

### System Administration

#### New System Setup
```bash
#!/bin/bash
# Create initial user accounts for new system

cat << 'EOF' > initial_users.txt
root:rootpassword:0:0:Root:/root:/bin/bash
admin:admin123:1000:1000:Administrator:/home/admin:/bin/bash
backup:backup456:1001:1001:Backup User:/home/backup:/bin/bash
mysql:mysql789:1002:1002:MySQL User:/var/lib/mysql:/sbin/nologin
wwwrun:www123:1003:1003:Web Server:/var/www:/sbin/nologin
EOF

# Create system users
newusers -r initial_users.txt

# Create regular users
newusers initial_users.txt

echo "Initial user accounts created successfully"
```

#### User Migration
```bash
#!/bin/bash
# Migrate users from old system

# Export users from old system (run on source)
getent passwd | grep -E '^[^:]+:[^:]*:[0-9]{4}:' > old_users.txt

# Process user list for new system
awk -F: 'BEGIN{OFS=":"} {
    # Skip system users
    if ($3 >= 1000 && $3 < 60000) {
        # Set placeholder passwords
        $2 = "changeme" + $3
        print $1, $2, $3, $4, $5, $6, $7
    }
}' old_users.txt > migrate_users.txt

# Create users on new system
newusers migrate_users.txt

# Force password change on first login
awk -F: '{print $1}' migrate_users.txt | xargs -I {} chage -d 0 {}

echo "User migration completed. Users must change passwords on first login."
```

#### Bulk User Creation for Organization
```bash
#!/bin/bash
# Create users for entire department

DEPT="engineering"
YEAR=$(date +%Y)
BASE_UID=5000

cat << EOF > ${DEPT}_users_${YEAR}.txt
eng01:Eng${YEAR}01:$((BASE_UID+1)):$((BASE_UID+1)):Engineer 1:/home/eng01:/bin/bash
eng02:Eng${YEAR}02:$((BASE_UID+2)):$((BASE_UID+2)):Engineer 2:/home/eng02:/bin/bash
eng03:Eng${YEAR}03:$((BASE_UID+3)):$((BASE_UID+3)):Engineer 3:/home/eng03:/bin/bash
eng04:Eng${YEAR}04:$((BASE_UID+4)):$((BASE_UID+4)):Engineer 4:/home/eng04:/bin/bash
eng05:Eng${YEAR}05:$((BASE_UID+5)):$((BASE_UID+5)):Engineer 5:/home/eng05:/bin/bash
EOF

# Create users with SHA-512 encryption
newusers -c SHA512 ${DEPT}_users_${YEAR}.txt

# Set up common group and permissions
groupadd engineering
awk -F: '{print $1}' ${DEPT}_users_${YEAR}.txt | xargs -I {} usermod -aG engineering {}

echo "Created ${DEPT} department users for ${YEAR}"
```

### Development and Testing

#### Test Environment Setup
```bash
#!/bin/bash
# Create test users for application testing

TEST_USERS=(
    "test_admin:admin123:6001:6001:Test Admin:/home/test_admin:/bin/bash"
    "test_user1:user1123:6002:6002:Test User 1:/home/test_user1:/bin/bash"
    "test_user2:user2123:6003:6003:Test User 2:/home/test_user2:/bin/bash"
    "test_guest:guest123:6004:6004:Test Guest:/home/test_guest:/bin/bash"
)

# Create test users
printf "%s\n" "${TEST_USERS[@]}" | newusers

# Set up test environment
groupadd test_group
usermod -aG test_group test_admin
usermod -aG test_group test_user1

echo "Test environment users created"
```

#### Performance Testing Users
```bash
#!/bin/bash
# Create multiple users for load testing

USER_COUNT=100
BASE_UID=7000

{
    echo "# Performance testing users"
    for i in $(seq 1 $USER_COUNT); do
        username="perf$(printf "%03d" $i)"
        password="perf$(printf "%03d" $i)pass"
        uid=$((BASE_UID + i))
        gid=$uid
        comment="Performance Test User $i"
        home="/home/$username"
        shell="/bin/bash"
        echo "$username:$password:$uid:$gid:$comment:$home:$shell"
    done
} | newusers

echo "Created $USER_COUNT performance testing users"
```

### Automated User Management

#### User Account Lifecycle Management
```bash
#!/bin/bash
# Automated user provisioning and deprovisioning

# Function to create new batch of users
create_batch_users() {
    local batch_name=$1
    local user_count=$2
    local base_uid=$3

    {
        for i in $(seq 1 $user_count); do
            username="${batch_name}$(printf "%03d" $i)"
            password="${batch_name}$(date +%Y%m%d)$(printf "%03d" $i)"
            uid=$((base_uid + i))
            gid=$uid
            comment="$batch_name User $i"
            home="/home/$username"
            shell="/bin/bash"
            echo "$username:$password:$uid:$gid:$comment:$home:$shell"
        done
    } | newusers

    echo "Created $user_count users for batch: $batch_name"
}

# Function to disable users
disable_batch_users() {
    local batch_name=$1

    grep "^$batch_name" /etc/passwd | cut -d: -f1 | while read user; do
        usermod -L "$user"  # Lock account
        chage -E 0 "$user"  # Expire account
        echo "Disabled user: $user"
    done
}

# Example usage
create_batch_users "intern" 10 8000
# Later...
# disable_batch_users "intern"
```

## Advanced Usage

### Security and Compliance

#### Password Policy Integration
```bash
#!/bin/bash
# Create users with compliance requirements

# Generate strong passwords
generate_strong_password() {
    local username=$1
    echo "${username}$(date +%Y%m%d)@Strong$(shuf -i 100-999 -n 1)"
}

# Create users with strong passwords
{
    echo "manager1:$(generate_strong_password manager1):9001:9001:Manager 1:/home/manager1:/bin/bash"
    echo "auditor1:$(generate_strong_password auditor1):9002:9002:Auditor 1:/home/auditor1:/bin/bash"
    echo "admin1:$(generate_strong_password admin1):9003:9003:Admin 1:/home/admin1:/bin/bash"
} | newusers -c SHA512 -s 10000

# Force password change and set password policies
for user in manager1 auditor1 admin1; do
    chage -d 0 "$user"  # Force change on first login
    chage -M 90 "$user"  # Password expires in 90 days
    chage -W 7 "$user"   # Warning 7 days before expiry
done

echo "Compliance users created with strong passwords"
```

#### Auditing User Creation
```bash
#!/bin/bash
# Create users with audit trail

LOG_FILE="/var/log/user_creation.log"
AUDIT_DIR="/var/audit/user_creation"

# Create audit directory
mkdir -p "$AUDIT_DIR"

# Function to log user creation
log_user_creation() {
    local username=$1
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local admin_user=$(whoami)
    local source_ip=$(echo $SSH_CLIENT | awk '{print $1}')

    echo "[$timestamp] User: $username, Admin: $admin_user, IP: $source_ip" >> "$LOG_FILE"
}

# Create users with audit logging
create_users_with_audit() {
    local input_file=$1

    while IFS=':' read -r username password uid gid comment home shell; do
        if [[ -n "$username" && "$username" != \#* ]]; then
            # Create user entry
            echo "$username:$password:$uid:$gid:$comment:$home:$shell"

            # Log creation
            log_user_creation "$username"

            # Store user details in audit file
            echo "username=$username" > "$AUDIT_DIR/${username}_creation.log"
            echo "uid=$uid" >> "$AUDIT_DIR/${username}_creation.log"
            echo "gid=$gid" >> "$AUDIT_DIR/${username}_creation.log"
            echo "created_by=$(whoami)" >> "$AUDIT_DIR/${username}_creation.log"
            echo "created_on=$(date)" >> "$AUDIT_DIR/${username}_creation.log"
        fi
    done < "$input_file" | newusers
}

# Usage
create_users_with_audit "user_batch.txt"
echo "Users created with audit logging"
```

### Integration with Authentication Systems

#### LDAP User Synchronization
```bash
#!/bin/bash
# Synchronize users from LDAP to local system

LDAP_SERVER="ldap://ldap.company.com"
LDAP_BASE="ou=users,dc=company,dc=com"
LDAP_FILTER="(objectClass=posixAccount)"

# Get users from LDAP
ldapsearch -x -H "$LDAP_SERVER" -b "$LDAP_BASE" "$LDAP_FILTER" uid uidNumber gidNumber gecos homeDirectory loginShell > ldap_users.ldif

# Convert LDAP data to newusers format
awk '
BEGIN { print "# Users imported from LDAP" }
/^uid:/ { username = $2 }
/^uidNumber:/ { uid = $2 }
/^gidNumber:/ { gid = $2 }
/^gecos:/ { comment = $2; for(i=3; i<=NF; i++) comment = comment " " $i }
/^homeDirectory:/ { home = $2 }
/^loginShell:/ { shell = $2 }
/^$/ && username != "" {
    # Generate temporary password
    password = "ldap" toupper(substr(username,1,1)) substr(username,2) "2024"
    print username ":" password ":" uid ":" gid ":" comment ":" home ":" shell
    username = ""; uid = ""; gid = ""; comment = ""; home = ""; shell = ""
}
' ldap_users.ldif > ldap_users.txt

# Create users locally
newusers ldap_users.txt

echo "LDAP users synchronized to local system"
```

## Integration and Automation

### Shell Scripts

#### Comprehensive User Management Script
```bash
#!/bin/bash
# Complete user management solution

CONFIG_FILE="/etc/user_management.conf"
LOG_FILE="/var/log/user_management.log"
BACKUP_DIR="/backup/user_accounts"

# Load configuration
[[ -f "$CONFIG_FILE" ]] && source "$CONFIG_FILE"

# Logging function
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Backup current user database
backup_users() {
    local backup_file="$BACKUP_DIR/users_backup_$(date +%Y%m%d_%H%M%S).tar.gz"

    mkdir -p "$BACKUP_DIR"
    tar -czf "$backup_file" /etc/passwd /etc/shadow /etc/group /etc/gshadow

    log_message "User database backed up to $backup_file"
    echo "Backup created: $backup_file"
}

# Validate user input file
validate_user_file() {
    local file=$1

    while IFS=':' read -r username password uid gid comment home shell; do
        # Skip empty lines and comments
        [[ -z "$username" || "$username" == \#* ]] && continue

        # Validate username format
        if [[ ! "$username" =~ ^[a-z_][a-z0-9_-]*$ ]]; then
            echo "Error: Invalid username format: $username"
            return 1
        fi

        # Check if user already exists
        if id "$username" &>/dev/null; then
            echo "Warning: User $username already exists"
        fi

        # Validate UID is numeric
        if [[ ! "$uid" =~ ^[0-9]+$ ]]; then
            echo "Error: Invalid UID for $username: $uid"
            return 1
        fi

        # Validate home directory
        if [[ ! "$home" =~ ^/ ]]; then
            echo "Error: Home directory must be absolute path for $username: $home"
            return 1
        fi

    done < "$file"

    return 0
}

# Create users with comprehensive setup
create_users_comprehensive() {
    local input_file=$1
    local setup_script=$2

    # Validate input
    validate_user_file "$input_file" || return 1

    # Create backup
    backup_users

    # Create users
    log_message "Starting user creation from $input_file"
    newusers "$input_file"

    if [[ $? -eq 0 ]]; then
        log_message "Users created successfully from $input_file"

        # Run setup script if provided
        if [[ -n "$setup_script" && -f "$setup_script" ]]; then
            log_message "Running post-creation setup script"
            bash "$setup_script" "$input_file"
        fi

        # Send notification
        echo "User creation completed successfully" | mail -s "User Management Notification" admin@company.com
    else
        log_message "Error: User creation failed"
        echo "User creation failed. Check logs for details."
        return 1
    fi
}

# Example usage
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    if [[ $# -lt 1 ]]; then
        echo "Usage: $0 <user_file> [setup_script]"
        exit 1
    fi

    create_users_comprehensive "$1" "$2"
fi
```

#### User Template System
```bash
#!/bin/bash
# User template-based creation system

TEMPLATES_DIR="/etc/user_templates"
CACHE_DIR="/var/cache/user_templates"

# Create template function
create_template() {
    local template_name=$1
    local default_shell=$2
    local default_group=$3
    local base_uid=$4

    mkdir -p "$TEMPLATES_DIR"

    cat > "$TEMPLATES_DIR/${template_name}.template" << EOF
# User template: $template_name
# Default shell: $default_shell
# Default group: $default_group
# Base UID: $base_uid

# Variables:
# \$USERNAME - Will be replaced with actual username
# \$PASSWORD - Will be replaced with actual password
# \$UID - Will be replaced with actual UID
# \$GID - Will be replaced with actual GID
# \$COMMENT - Will be replaced with user comment
# \$HOME - Will be replaced with home directory

\$USERNAME:\$PASSWORD:\$UID:\$GID:\$COMMENT:\$HOME:$default_shell
EOF

    echo "Template created: $template_name"
}

# Generate users from template
generate_from_template() {
    local template_name=$1
    local user_list=$2
    local base_uid=$3

    local template_file="$TEMPLATES_DIR/${template_name}.template"

    if [[ ! -f "$template_file" ]]; then
        echo "Error: Template $template_name not found"
        return 1
    fi

    mkdir -p "$CACHE_DIR"
    local output_file="$CACHE_DIR/${template_name}_users_$(date +%Y%m%d_%H%M%S).txt"

    {
        echo "# Users generated from template: $template_name"
        uid_counter=$base_uid

        while IFS= read -r username; do
            [[ -z "$username" || "$username" == \#* ]] && continue

            # Generate password
            password="${username}$(date +%Y%m%d)"

            # Process template
            sed "s/\\\$USERNAME/$username/g; s/\\\$PASSWORD/$password/g; s/\\\$UID/$uid_counter/g; s/\\\$GID/$uid_counter/g; s/\\\$COMMENT/$username User/g; s/\\\$HOME/\/home\/$username/g" "$template_file"

            ((uid_counter++))
        done < "$user_list"
    } > "$output_file"

    echo "User file generated: $output_file"
    echo "Run: newusers $output_file"

    # Optional: auto-create
    read -p "Create users now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        newusers "$output_file"
        echo "Users created from template: $template_name"
    fi
}

# Create standard templates
create_template "developer" "/bin/bash" "developers" 5000
create_template "service" "/sbin/nologin" "services" 100
create_template "student" "/bin/bash" "students" 6000

echo "User template system initialized"
```

## Troubleshooting

### Common Issues

#### File Format Errors
```bash
# Error: Invalid format
# Solution: Ensure proper colon separation
echo "username:password:1001:1001:User:/home/username:/bin/bash" | newusers

# Check file format before processing
awk -F: 'NF != 7 {print "Line " NR " has incorrect field count: " $0}' users.txt

# Validate usernames
awk -F: '$1 !~ /^[a-z_][a-z0-9_-]*$/ {print "Invalid username on line " NR ": " $1}' users.txt
```

#### Permission Issues
```bash
# Error: Permission denied
# Solution: Run with proper privileges
sudo newusers users.txt

# Check current user permissions
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root"
    exit 1
fi
```

#### UID/GID Conflicts
```bash
# Check for existing UIDs
awk -F: '{print $3}' /etc/passwd | sort -n | uniq -c | awk '$1 > 1 {print "Duplicate UID found"}'

# Check for existing GIDs
awk -F: '{print $4}' /etc/passwd | sort -n | uniq -c | awk '$1 > 1 {print "Duplicate GID found"}'

# Find next available UID
get_next_uid() {
    local base_uid=$1
    local max_uid=$(awk -F: '$3 >= '$base_uid' {print $3}' /etc/passwd | sort -n | tail -1)
    echo $((max_uid + 1))
}
```

#### Home Directory Issues
```bash
# Check home directory creation
ls -la /home/

# Fix missing home directories
awk -F: '{print $1, $6}' /etc/passwd | while read user home; do
    if [[ ! -d "$home" ]]; then
        mkdir -p "$home"
        chown "$user:$user" "$home"
        chmod 700 "$home"
        echo "Created home directory for $user"
    fi
done
```

#### Password Issues
```bash
# Test password authentication
for user in user1 user2 user3; do
    if su - "$user" -c "echo 'Authentication successful'" 2>/dev/null; then
        echo "Password OK for $user"
    else
        echo "Password issue for $user"
    fi
done

# Force password change
chage -d 0 username
```

## Related Commands

- [`useradd`](/docs/commands/user-management/useradd) - Create a new user
- [`usermod`](/docs/commands/user-management/usermod) - Modify a user account
- [`userdel`](/docs/commands/user-management/userdel) - Delete a user account
- [`passwd`](/docs/commands/user-management/passwd) - Change user password
- [`chpasswd`](/docs/commands/user-management/chpasswd) - Update passwords in batch
- [`groupadd`](/docs/commands/user-management/groupadd) - Create a new group
- [`chage`](/docs/commands/user-management/chage) - Change user password expiry
- [`id`](/docs/commands/system-information/id) - Display user and group information
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database

## Best Practices

1. **Always backup** user databases before bulk operations
2. **Use strong encryption** (SHA-512) for passwords with appropriate rounds
3. **Validate input files** before processing with newusers
4. **Test with small batches** before large-scale operations
5. **Implement password policies** (expiration, complexity requirements)
6. **Use meaningful usernames** that follow organizational standards
7. **Document user creation** processes and maintain audit trails
8. **Regular security audits** of created accounts
9. **Separate system and regular users** using appropriate UID ranges
10. **Use consistent home directory structure** and permissions

## Performance Tips

1. **Batch operations** are much faster than individual useradd commands
2. **Pre-process input files** to minimize validation overhead
3. **Use appropriate UID ranges** to avoid conflicts
4. **Consider filesystem performance** when creating many users with large home directories
5. **Parallel processing** of user setup scripts can speed up deployment
6. **Template systems** reduce repetitive configuration work
7. **Cache user creation** results for similar environments
8. **Monitor system resources** during large batch operations
9. **Use RAM disks** for temporary files during massive user creation
10. **Optimize home directory** creation with skeleton templates

The `newusers` command is an essential tool for system administrators managing large user populations. Its ability to efficiently create and update multiple user accounts makes it invaluable for initial system setup, user migrations, and bulk provisioning scenarios. When combined with proper security practices, validation procedures, and automation scripts, newusers provides a robust foundation for user management in enterprise environments.