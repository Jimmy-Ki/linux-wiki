---
title: id - Display user/group IDs
slug: id
tags: [system-info, linux-commands]
sidebar_label: id
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# id - Display user/group IDs

The `id` command displays user and group information for the specified user, or the current user if no username is provided. It shows real and effective user IDs, group IDs, and supplementary group IDs.

## Syntax

```bash
id [OPTION]... [USERNAME]
```

## Common Options

- `-a`: Ignore, for compatibility with other versions
- `-Z`, `--context`: Print security context of process
- `-g`, `--group`: Print only the effective group ID
- `-G`, `--groups`: Print all group IDs
- `-n`, `--name`: Print name instead of number
- `-r`, `--real`: Print the real ID instead of effective ID
- `-u`, `--user`: Print only the effective user ID
- `-z`, `--zero`: Delimit entries with NUL characters
- `--help`: Display help message
- `--version`: Display version information

## Usage Examples

### Basic Usage
```bash
# Display current user's ID information
id
# Output: uid=1000(john) gid=1000(john) groups=1000(john),4(adm),24(cdrom),27(sudo)

# Display specific user's ID information
id root
# Output: uid=0(root) gid=0(root) groups=0(root)
```

### Specific Information
```bash
# Print only user ID
id -u
# Output: 1000

# Print only group ID
id -g
# Output: 1000

# Print all group IDs
id -G
# Output: 1000 4 24 27

# Print names instead of numbers
id -ng
# Output: john

# Print all group names
id -nG
# Output: john adm cdrom sudo
```

### Real vs Effective IDs
```bash
# Show effective user ID
id -u
# Output: 1000

# Show real user ID
id -ru
# Output: 1000

# With sudo (effective changes, real stays same)
$ sudo id -u
# Output: 0
$ sudo id -ru
# Output: 1000
```

### Script Usage
```bash
# Check if user is root
if [ "$(id -u)" -eq 0 ]; then
    echo "Running as root"
else
    echo "Running as regular user"
fi

# Check if user belongs to sudo group
if id -nG "$USER" | grep -qw "sudo"; then
    echo "User has sudo privileges"
fi

# Check specific group membership
if id -Gn | grep -q "docker"; then
    echo "User can run Docker commands"
fi
```

### User Information Parsing
```bash
# Extract username, UID, and primary GID
USER_NAME=$(id -un)
USER_ID=$(id -u)
GROUP_ID=$(id -g)

echo "User: $USER_NAME (UID: $USER_ID, GID: $GROUP_ID)"

# Get all groups in a list format
GROUPS=$(id -nG | tr ' ' ',')
echo "Member of groups: $GROUPS"
```

## Understanding the Output

### Basic Format
```
uid=NUMBER(NAME) gid=NUMBER(NAME) groups=NUMBER(NAME),NUMBER(NAME),...
```

- **uid**: User ID and username
- **gid**: Primary group ID and group name
- **groups**: Supplementary groups the user belongs to

### Key Concepts

1. **Real UID**: The user who started the process
2. **Effective UID**: The user whose permissions are being used
3. **Real GID**: The primary group of the user who started the process
4. **Effective GID**: The group whose permissions are being used

## Best Practices

1. **Use `-u` option** for simple root checks
2. **Use `-nG` option** to check group membership by name
3. **Use in scripts** for permission validation:
   ```bash
   # Check if user can access Docker
   if ! id -nG "$USER" | grep -qw "docker"; then
       echo "User is not in docker group"
       exit 1
   fi
   ```
4. **Security checks**:
   ```bash
   # Verify script runs as specific user
   REQUIRED_USER="serviceuser"
   if [ "$(id -un)" != "$REQUIRED_USER" ]; then
       echo "This script must run as $REQUIRED_USER"
       exit 1
   fi
   ```

## Related Commands

- `whoami`: Display current username
- `groups`: Display groups a user is in
- `usermod`: Modify user account
- `getent`: Get entries from administrative database
- `su`: Substitute user identity

## Troubleshooting

### Common Issues

1. **User not found**: Check if username exists
2. **Permission denied**: Usually doesn't require special permissions
3. **Different results in sudo**: Understand real vs effective IDs

### Debugging User Context
```bash
# Comprehensive user context check
echo "Username: $(id -un)"
echo "User ID: $(id -u) (real: $(id -ru))"
echo "Primary group: $(id -gn) (ID: $(id -g))"
echo "All groups: $(id -nG | tr ' ' ', ')"
```

### Script Examples
```bash
#!/bin/bash
# User permission checker
check_user_permissions() {
    local username=${1:-$(id -un)}

    echo "Checking permissions for user: $username"
    echo "User ID: $(id -u "$username")"
    echo "Primary group: $(id -gn "$username")"

    # Check common privileged groups
    for group in sudo wheel docker adm; do
        if id -nG "$username" 2>/dev/null | grep -qw "$group"; then
            echo "✅ Member of $group group"
        fi
    done
}

# Usage
check_user_permissions
check_user_permissions "root"
```

### Security Scripts
```bash
# Check for users with UID 0 (root equivalents)
echo "Users with UID 0:"
awk -F: '$3 == 0 { print $1 }' /etc/passwd

# Check users with login shells and high UIDs
awk -F: '$7 == "/bin/bash" && $3 >= 1000 { print $1 " (UID: " $3 ")" }' /etc/passwd

# Group membership audit
for user in $(awk -F: '$3 >= 1000 {print $1}' /etc/passwd); do
    echo "$user: $(id -nG "$user" | tr ' ' ',')"
done
```