---
title: chfn - Change user finger information
sidebar_label: chfn
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chfn - Change User Finger Information

The `chfn` command is a system administration utility that allows users to change their finger information stored in the `/etc/passwd` file. This information includes the user's real name, office location, office phone number, and home phone number. The finger information is used by various system utilities and displayed when users query information about other accounts using the `finger` command. It's part of the shadow-utils package and provides controlled access to modify user account GECOS (General Electric Comprehensive Operating System) field information.

## Basic Syntax

```bash
chfn [OPTIONS] [USERNAME]
chfn [-f FULL_NAME] [-o OFFICE] [-p OFFICE_PHONE] [-h HOME_PHONE] [USERNAME]
```

## Information Fields

The `chfn` command manages five information fields in the user's GECOS field:

1. **Full Name** (`-f`) - User's real name or display name
2. **Room/Office** (`-o`) - Office location or room number
3. **Office Phone** (`-p`) - Office telephone number
4. **Home Phone** (`-h`) - Home telephone number
5. **Other** - Additional information (accessed interactively)

## Common Options

### Field Specification Options
- `-f, --full-name FULL_NAME` - Set user's full name
- `-o, --office OFFICE` - Set office room number or location
- `-p, --office-phone OFFICE_PHONE` - Set office phone number
- `-h, --home-phone HOME_PHONE` - Set home phone number
- `-r, --room ROOM` - Alternative option for office room number

### Control Options
- `-R, --root CHROOT_DIR` - Directory to chroot into
- `-s, --shell SHELL` - Change user login shell (some implementations)
- `-u, --help` - Display help message
- `-v, --version` - Display version information

### Interactive Options
- `-i, --interactive` - Force interactive mode
- `-q, --quiet` - Suppress informational messages

## Usage Examples

### Basic User Information Management

#### Interactive Information Update
```bash
# Change your own finger information interactively
chfn

# Change another user's information (requires root privileges)
sudo chfn username

# Change specific user's information with prompts
sudo chfn -i john
```

#### Setting Specific Fields
```bash
# Set full name only
chfn -f "John Smith"

# Set office location
chfn -o "Room 301, Building A"

# Set office phone
chfn -p "555-1234"

# Set home phone
chfn -h "555-5678"

# Set multiple fields at once
chfn -f "Jane Doe" -o "Office 204" -p "555-9876" -h "555-5432"
```

#### Modifying Other User Information
```bash
# Set full name for another user (requires root)
sudo chfn -f "Robert Johnson" robert

# Set office information for user
sudo chfn -o "Engineering Department" -p "555-1000" alice

# Complete information update for user
sudo chfn -f "Mary Wilson" -o "Room 502" -p "555-2345" -h "555-6789" mary
```

### System Administration

#### Bulk User Information Updates
```bash
# Script to update department information
#!/bin/bash
# Update office information for multiple users

for user in alice bob charlie; do
    sudo chfn -o "IT Department" "$user"
    echo "Updated office for $user"
done

# Set full names from a file
while IFS=',' read -r username fullname; do
    sudo chfn -f "$fullname" "$username"
done < user_names.csv
```

#### User Account Migration
```bash
# Migrate user information with formatting
sudo chfn -f "John A. Smith (Contractor)" john

# Add department information
sudo chfn -o "Sales Department - West Wing" sales_user

# Set contact information for new employees
sudo chfn -f "New Employee" -o "Temp Office" -p "Extension 123" newhire
```

### Advanced Information Management

#### Complex Field Formatting
```bash
# Include title and department in name
chfn -f "Dr. Sarah Chen, PhD"

# Add location details
chfn -o "Building 2, Floor 3, Room 305"

# Include country codes in phone numbers
chfn -p "+1-555-123-4567" -h "+1-555-987-6543"

# Combine information with separators
chfn -f "Mark Davis | Project Manager" -o "HQ Office | Executive Floor"
```

#### Temporary Information Updates
```bash
# Set temporary contact information
sudo chfn -o "Remote Worker" -h "555-TEMP" remote_user

# Update for project duration
chfn -o "Project Team Room" -p "Project Extension: 4567"

# Add role information
sudo chfn -f "Alice Brown (System Administrator)" alice
```

## Practical Examples

### Corporate Environment Setup

#### New Employee Onboarding
```bash
#!/bin/bash
# Script for setting up new employee information

USERNAME=$1
FULLNAME=$2
DEPARTMENT=$3
EXTENSION=$4

if [ -z "$USERNAME" ] || [ -z "$FULLNAME" ]; then
    echo "Usage: $0 <username> <full_name> [department] [extension]"
    exit 1
fi

# Set comprehensive user information
sudo chfn -f "$FULLNAME" "$USERNAME"

if [ -n "$DEPARTMENT" ]; then
    sudo chfn -o "$DEPARTMENT" "$USERNAME"
fi

if [ -n "$EXTENSION" ]; then
    sudo chfn -p "Ext: $EXTENSION" "$USERNAME"
fi

echo "Updated finger information for $USERNAME"
```

#### Department Organization
```bash
# IT Department users
sudo chfn -f "Alice Johnson (Senior Admin)" -o "IT Department | Server Room" alice
sudo chfn -f "Bob Smith (Network Engineer)" -o "IT Department | Network Ops" bob
sudo chfn -f "Carol Davis (Security Analyst)" -o "IT Department | Security Office" carol

# Sales Department users
sudo chfn -f "David Wilson (Sales Manager)" -o "Sales Department | Executive Suite" david
sudo chfn -f "Eve Brown (Account Executive)" -o "Sales Department | Regional Office" eve
```

### Educational Institution

#### Faculty Information Setup
```bash
# Professor information
sudo chfn -f "Dr. Michael Roberts, PhD" -o "Physics Department | Room 204" michael
sudo chfn -p "555-1010" -h "555-1011" michael

# Teaching assistant
sudo chfn -f "Jennifer Lee (TA)" -o "Physics Department | Lab 301" jennifer
sudo chfn -p "555-1020" jennifer
```

#### Student Account Management
```bash
# Update student information batch
#!/bin/bash
# Student information update script

while IFS=',' read -r student_id full_name dorm room; do
    username="student_$student_id"
    if id "$username" &>/dev/null; then
        sudo chfn -f "$full_name" -o "$dorm - Room $room" "$username"
        echo "Updated: $username"
    else
        echo "User not found: $username"
    fi
done < student_list.csv
```

### Remote Work Setup

#### Teleworker Configuration
```bash
# Remote user setup
sudo chfn -f "John Miller (Remote)" -o "Remote Worker - Home Office" john
sudo chfn -p "Teams: @johnmiller" -h "Mobile: 555-CELL" john

# Hybrid worker
sudo chfn -f "Sarah Davis (Hybrid)" -o "Main Office Mon/Wed/Fri" sarah
sudo chfn -p "Office: 555-2000" -h "Home: 555-3000" sarah
```

## Integration and Automation

### Shell Script Integration

#### User Provisioning Script
```bash
#!/bin/bash
# Complete user provisioning with finger information

create_user_with_info() {
    local username=$1
    local fullname=$2
    local department=$3
    local office=$4
    local phone=$5

    # Create user account
    sudo useradd -m -s /bin/bash "$username"

    # Set initial password
    echo "$username:TempPass123!" | sudo chpasswd

    # Set finger information
    sudo chfn -f "$fullname" "$username"
    [ -n "$department" ] && sudo chfn -o "$department" "$username"
    [ -n "$office" ] && sudo chfn -o "$office" "$username"
    [ -n "$phone" ] && sudo chfn -p "$phone" "$username"

    echo "Created user: $username with finger information"
}

# Usage example
create_user_with_info "jdoe" "John Doe" "Engineering" "Room 301" "555-1234"
```

#### Information Validation Script
```bash
#!/bin/bash
# Validate and fix user finger information

validate_user_info() {
    local username=$1

    # Get current finger information
    finger_output=$(finger "$username" 2>/dev/null | grep "Name:")

    if [ -z "$finger_output" ]; then
        echo "Warning: No finger information for $username"
        return 1
    fi

    echo "Current info for $username: $finger_output"
}

# Fix missing information
fix_user_info() {
    local username=$1
    local default_name=$2

    current_name=$(getent passwd "$username" | cut -d: -f5 | cut -d, -f1)

    if [ -z "$current_name" ] || [ "$current_name" = "$username" ]; then
        sudo chfn -f "$default_name" "$username"
        echo "Updated full name for $username to: $default_name"
    fi
}

# Process all users
for user in $(awk -F: '$3 >= 1000 && $3 < 60000 {print $1}' /etc/passwd); do
    validate_user_info "$user"
done
```

### System Integration

#### LDAP/Active Directory Integration
```bash
#!/bin/bash
# Sync finger information with LDAP

sync_ldap_finger_info() {
    local username=$1
    local ldap_fullname=$2
    local ldap_office=$3
    local ldap_phone=$4

    # Update local finger info from LDAP
    sudo chfn -f "$ldap_fullname" "$username"
    [ -n "$ldap_office" ] && sudo chfn -o "$ldap_office" "$username"
    [ -n "$ldap_phone" ] && sudo chfn -p "$ldap_phone" "$username"

    echo "Synced LDAP info for $username"
}

# Batch sync from LDAP query
ldapsearch -x -LLL "(objectClass=person)" cn telephoneNumber physicalDeliveryOfficeName | \
while read -r line; do
    case $line in
        dn:*) username=$(echo "$line" | sed 's/.*uid=\([^,]*\).*/\1/');;
        cn:*) fullname=${line#cn: };;
        telephoneNumber:*) phone=${line#telephoneNumber: };;
        physicalDeliveryOfficeName:*) office=${line#physicalDeliveryOfficeName: };;
        "")
            if [ -n "$username" ]; then
                sync_ldap_finger_info "$username" "$fullname" "$office" "$phone"
            fi
            username=""
            ;;
    esac
done
```

## Advanced Usage

### Information Security

#### Sensitive Information Handling
```bash
# Set generic information for security-sensitive accounts
sudo chfn -f "Service Account" -o "System Service" service_user
sudo chfn -f "Database Account" -o "Database Server" db_user

# Remove personal information for privileged accounts
sudo chfn -f "System Administrator" -o "IT Department" admin
sudo chfn -p "" -h "" admin

# Set contact information for escalation
sudo chfn -f "On-Call Administrator" -o "24/7 Support" -p "555-HELP" oncall
```

#### Compliance and Auditing
```bash
#!/bin/bash
# Audit user finger information for compliance

audit_user_info() {
    echo "=== User Finger Information Audit ==="
    echo "Date: $(date)"
    echo ""

    while IFS=: read -r username _ _ _ _ rest; do
        # Skip system users
        if [ "$username" = "root" ] || [ "${username#*nobody}" != "$username" ]; then
            continue
        fi

        finger_info=$(getent passwd "$username" | cut -d: -f5)
        echo "User: $username"
        echo "Info: $finger_info"
        echo ""
    done < /etc/passwd
}

# Check for missing or incomplete information
check_completeness() {
    echo "=== Checking Information Completeness ==="

    while IFS=: read -r username _ _ _ _ gecos; do
        # Skip system accounts
        uid=$(id -u "$username" 2>/dev/null)
        if [ "$uid" -lt 1000 ] || [ -z "$uid" ]; then
            continue
        fi

        if [ -z "$gecos" ] || [ "$gecos" = "," ]; then
            echo "WARNING: No finger information for $username"
        elif [[ ! "$gecos" =~ [a-zA-Z] ]]; then
            echo "WARNING: Invalid finger information for $username: $gecos"
        fi
    done < /etc/passwd
}

audit_user_info
check_completeness
```

### Multi-Environment Management

#### Development vs Production
```bash
# Development environment
sudo chfn -f "Alice Developer (Dev Env)" -o "Development Team" alice
sudo chfn -f "Bob Tester (QA)" -o "Quality Assurance" bob

# Production environment
sudo chfn -f "Alice Developer (Prod)" -o "Production Support" alice
sudo chfn -f "Bob Administrator (Prod)" -o "Production Operations" bob

# Staging environment
sudo chfn -f "Alice Developer (Staging)" -o "Staging Environment" alice
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied error
# Solution: Use sudo or ensure you're changing your own information
sudo chfn -f "New Name" username

# User not found error
# Solution: Verify user exists
id username
getent passwd username

# Password database busy error
# Solution: Wait for other user management operations to complete
sudo chfn -f "Name" username
```

#### Information Display Issues
```bash
# Finger command not showing updated information
# Solution: Check if finger daemon is running
systemctl status finger

# Clear finger cache if exists
sudo systemctl restart finger

# Verify information in passwd file
getent passwd username | cut -d: -f5
```

#### Field Limitations
```bash
# Information too long for field
# Solution: Use abbreviations or shorten information
chfn -f "John S." -o "B2-R301" -p "x1234"

# Special characters causing issues
# Solution: Escape special characters or use quotes
chfn -f "John O'Connor" -o "Room \#101" -p "555-1234"
```

### Recovery and Repair

#### Corrupted Finger Information
```bash
#!/bin/bash
# Repair corrupted finger information

repair_user_info() {
    local username=$1
    local backup_file="/etc/passwd.backup"

    # Create backup before making changes
    sudo cp /etc/passwd "$backup_file"

    # Reset to basic information
    sudo chfn -f "$username" "$username"
    sudo chfn -o "" -p "" -h "" "$username"

    echo "Reset finger information for $username"
    echo "Backup saved to $backup_file"
}

# Batch repair for all users
for user in $(awk -F: '$3 >= 1000 {print $1}' /etc/passwd); do
    if [[ $(getent passwd "$user" | cut -d: -f5) =~ [^a-zA-Z0-9,\.\- ] ]]; then
        repair_user_info "$user"
    fi
done
```

## Related Commands

- [`finger`](/docs/commands/user-management/finger) - Display user information
- [`passwd`](/docs/commands/user-management/passwd) - Change user password
- [`chsh`](/docs/commands/user-management/chsh) - Change user shell
- [`chage`](/docs/commands/user-management/chage) - Change user password expiry
- [`useradd`](/docs/commands/user-management/useradd) - Create new user account
- [`usermod`](/docs/commands/user-management/usermod) - Modify user account
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database
- [`whoami`](/docs/commands/system-info/whoami) - Display effective username
- [`id`](/docs/commands/system-info/id) - Display user and group information

## Best Practices

1. **Use real names** - Keep finger information professional and accurate
2. **Limit sensitive data** - Avoid including passwords or confidential information
3. **Maintain consistency** - Use standard formats across the organization
4. **Regular updates** - Keep information current when users change roles or locations
5. **Security awareness** - Don't include personal contact information for service accounts
6. **Department organization** - Use consistent department naming conventions
7. **Phone formatting** - Use standard phone number formats for easy parsing
8. **Audit regularly** - Periodically review user finger information for accuracy

## Performance Tips

1. **Batch operations** - Update multiple users efficiently with scripts
2. **Field limits** - Keep information within standard field length limits
3. **System load** - Avoid mass updates during peak system usage times
4. **Database locking** - Be aware of passwd file locking during updates
5. **Backup strategies** - Maintain backups of user information before bulk changes
6. **Testing environments** - Test scripts in non-production environments first
7. **Logging changes** - Maintain audit trails for information changes

The `chfn` command is an essential system administration tool for maintaining accurate user information across Unix/Linux systems. Its ability to manage contact and organizational details makes it valuable for both small organizations and large enterprise environments where proper user identification and contact information is crucial for effective system administration and user support.

---

*This documentation provides comprehensive coverage of the `chfn` command, from basic usage to advanced system administration scenarios.*