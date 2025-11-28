---
title: pwconv - Convert to shadow password files
sidebar_label: pwconv
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pwconv - Convert to shadow password files

The `pwconv` command is a system administration utility that converts the traditional password file format to shadow password format. This tool enhances system security by moving password hashes from the world-readable `/etc/passwd` file to the restricted `/etc/shadow` file. The shadow password system separates public user information from sensitive authentication data, providing better protection against password cracking attempts and unauthorized access. `pwconv` is essential for maintaining Linux system security compliance and implementing proper password management practices.

## Basic Syntax

```bash
pwconv [OPTIONS]
```

## Description

The `pwconv` command reads the `/etc/passwd` file and creates or updates the `/etc/shadow` file with encrypted password information. It moves the password field from `/etc/passwd` to `/etc/shadow` and replaces it with a placeholder 'x' character. This conversion enhances system security by:

- Moving password hashes to a restricted file (only readable by root)
- Separating user account information from authentication data
- Implementing password aging and expiration policies
- Preventing offline password cracking attacks

## Shadow Password System

### File Locations
- `/etc/passwd` - Public user account information
- `/etc/shadow` - Restricted password and aging information
- `/etc/passwd-` - Backup of original password file
- `/etc/shadow-` - Backup of original shadow file

### Shadow File Format
```
username:password:lastchanged:min:max:warn:inactive:expire:reserved
```

## Usage Examples

### Basic Conversion Operations

#### Initial Shadow Conversion
```bash
# Convert from standard password file to shadow format
sudo pwconv

# Check if shadow conversion was successful
sudo ls -la /etc/shadow

# Verify shadow file permissions (should be 600)
sudo ls -l /etc/shadow
```

#### System Security Enhancement
```bash
# Enable shadow passwords for better security
sudo pwconv

# Verify password field contains 'x' in /etc/passwd
grep root /etc/passwd

# Check corresponding entry in /etc/shadow
sudo grep root /etc/shadow
```

#### Post-Conversion Verification
```bash
# Verify shadow file integrity
sudo pwck

# Check shadow file permissions
sudo ls -la /etc/shadow*

# Validate both password and shadow files
sudo pwck -r
```

### System Administration

#### Security Hardening
```bash
# Convert to shadow passwords as part of security hardening
sudo pwconv

# Set appropriate file permissions
sudo chmod 600 /etc/shadow
sudo chown root:shadow /etc/shadow

# Verify system is using shadow passwords
sudo authconfig --test | grep shadow
```

#### System Migration
```bash
# Before migration - check current state
cat /etc/passwd | head -5

# Convert to shadow format
sudo pwconv

# After migration - verify changes
cat /etc/passwd | head -5
sudo cat /etc/shadow | head -5
```

#### Backup and Recovery
```bash
# Create backup before conversion
sudo cp /etc/passwd /etc/passwd.backup.$(date +%Y%m%d)

# Perform conversion
sudo pwconv

# Verify backup files were created
ls -la /etc/passwd- /etc/shadow-
```

### Advanced Operations

#### Multiple System Management
```bash
# Script to convert multiple systems
for host in server1 server2 server3; do
    echo "Converting $host to shadow passwords..."
    ssh $host "sudo pwconv && sudo pwck"
done

# Check shadow status across systems
for host in $(cat hosts.txt); do
    echo "=== $host ==="
    ssh $host "sudo authconfig --test | grep shadow"
done
```

#### Integration with Other Security Tools
```bash
# Convert to shadow before implementing other security measures
sudo pwconv

# Configure password aging policies
sudo chage -M 90 -W 7 username

# Enable password complexity requirements
sudo authconfig --passminlen=8 --passquality=1 --update

# Verify security configuration
sudo authconfig --test
```

## Practical Examples

### Security Compliance

#### Meeting Security Standards
```bash
# Implement shadow passwords for security compliance
sudo pwconv

# Document the conversion
echo "$(date): Shadow password conversion completed" >> /var/log/security.log

# Generate compliance report
echo "Shadow Password Status:" > /tmp/security_report.txt
sudo authconfig --test | grep shadow >> /tmp/security_report.txt
```

#### Audit Preparation
```bash
# Prepare system for security audit
sudo pwconv

# Generate shadow file summary
echo "Shadow file entries:" > /tmp/audit_preparation.txt
sudo wc -l /etc/shadow >> /tmp/audit_preparation.txt

# Check for accounts without passwords
sudo awk -F: '$2 == "" {print $1}' /etc/shadow >> /tmp/audit_preparation.txt
```

### System Maintenance

#### Regular Security Checks
```bash
# Create maintenance script for shadow password checks
#!/bin/bash
# shadow_maintenance.sh

echo "Starting shadow password maintenance..."

# Ensure shadow passwords are enabled
if [ ! -f /etc/shadow ]; then
    echo "Shadow file not found, converting..."
    sudo pwconv
fi

# Validate shadow file integrity
echo "Validating shadow file..."
sudo pwck

# Check file permissions
echo "Checking file permissions..."
sudo ls -la /etc/shadow*

echo "Shadow password maintenance completed."
```

#### Disaster Recovery Preparation
```bash
# Create shadow password backup strategy
#!/bin/bash
# backup_shadow.sh

BACKUP_DIR="/backup/security/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Backup current password and shadow files
sudo cp /etc/passwd "$BACKUP_DIR/passwd.backup"
sudo cp /etc/shadow "$BACKUP_DIR/shadow.backup"

# Create checksum for integrity verification
sudo sha256sum "$BACKUP_DIR"/passwd.shadow.backup* > "$BACKUP_DIR/checksums.txt"

echo "Shadow password backup completed: $BACKUP_DIR"
```

## Integration and Automation

### Shell Scripts

#### Automated Security Setup
```bash
#!/bin/bash
# setup_shadow_security.sh

# Function to check if shadow is enabled
check_shadow_status() {
    if [ -f /etc/shadow ]; then
        echo "Shadow passwords are already enabled"
        return 0
    else
        echo "Shadow passwords need to be enabled"
        return 1
    fi
}

# Function to enable shadow passwords
enable_shadow_passwords() {
    echo "Converting to shadow password format..."
    sudo pwconv

    if [ $? -eq 0 ]; then
        echo "Shadow conversion successful"

        # Set proper permissions
        sudo chmod 600 /etc/shadow
        sudo chown root:shadow /etc/shadow

        # Validate configuration
        sudo pwck -r
        echo "Shadow password configuration validated"
    else
        echo "Shadow conversion failed"
        exit 1
    fi
}

# Main execution
if ! check_shadow_status; then
    enable_shadow_passwords
fi

# Generate status report
echo "Shadow Password Status Report - $(date)" > /tmp/shadow_status.txt
sudo authconfig --test | grep shadow >> /tmp/shadow_status.txt

echo "Shadow security setup completed successfully"
```

#### System Hardening Script
```bash
#!/bin/bash
# system_hardening.sh

echo "Starting system security hardening..."

# Enable shadow passwords
if [ ! -f /etc/shadow ]; then
    echo "Enabling shadow passwords..."
    sudo pwconv
else
    echo "Shadow passwords already enabled"
fi

# Configure secure permissions
echo "Setting secure file permissions..."
sudo chmod 644 /etc/passwd
sudo chmod 600 /etc/shadow
sudo chmod 644 /etc/group
sudo chmod 600 /etc/gshadow

# Validate configuration
echo "Validating security configuration..."
sudo pwck
sudo grpck

# Generate hardening report
cat > /tmp/hardening_report.txt << EOF
System Security Hardening Report
Date: $(date)
Shadow Passwords: Enabled
File Permissions: Configured
Validation: Passed
EOF

echo "System hardening completed. See /tmp/hardening_report.txt"
```

### Configuration Management

#### Puppet Manifest Example
```puppet
# Enable shadow passwords
class security::shadow_passwords {
    exec { 'enable_shadow_passwords':
        command => '/usr/sbin/pwconv',
        onlyif  => '/usr/bin/test ! -f /etc/shadow',
        path    => ['/usr/sbin', '/usr/bin', '/bin'],
    }

    file { '/etc/shadow':
        ensure  => file,
        owner   => 'root',
        group   => 'shadow',
        mode    => '0600',
        require => Exec['enable_shadow_passwords'],
    }
}
```

#### Ansible Playbook Example
```yaml
---
- name: Configure shadow passwords
  hosts: all
  become: yes
  tasks:
    - name: Check if shadow file exists
      stat:
        path: /etc/shadow
      register: shadow_file

    - name: Convert to shadow passwords
      command: pwconv
      when: not shadow_file.stat.exists

    - name: Set proper permissions on shadow file
      file:
        path: /etc/shadow
        owner: root
        group: shadow
        mode: '0600'

    - name: Validate shadow configuration
      command: pwck -r
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Check shadow file permissions
ls -la /etc/shadow

# Fix incorrect permissions
sudo chmod 600 /etc/shadow
sudo chown root:shadow /etc/shadow

# Verify group membership
groups $USER
sudo usermod -a -G shadow $USER
```

#### Conversion Failures
```bash
# Check system state before conversion
sudo pwck -r

# Backup current files
sudo cp /etc/passwd /etc/passwd.pre-conv
sudo cp /etc/group /etc/group.pre-conv

# Attempt conversion with verbose output
sudo pwconv

# Validate results
sudo pwck
```

#### Shadow File Corruption
```bash
# Check shadow file integrity
sudo pwck

# Restore from backup if needed
sudo cp /etc/shadow- /etc/shadow

# Re-create shadow file from passwd
sudo pwconv

# Validate recovery
sudo pwck -r
```

### System Recovery

#### Emergency Recovery Procedures
```bash
# If shadow file is corrupted, restore from backup
sudo cp /etc/shadow- /etc/shadow

# Validate restored file
sudo pwck

# If no backup exists, rebuild shadow file
sudo pwconv

# Test system authentication
sudo su - username
```

#### Service Recovery
```bash
# Check if authentication services are running
sudo systemctl status sshd
sudo systemctl status login

# Restart authentication services if needed
sudo systemctl restart sshd
sudo systemctl restart login

# Verify shadow password functionality
sudo su - testuser
```

## Related Commands

- [`pwunconv`](/docs/commands/user-management/pwunconv) - Convert from shadow to standard password files
- [`pwck`](/docs/commands/user-management/pwck) - Verify integrity of password and shadow files
- [`passwd`](/docs/commands/user-management/passwd) - Change user passwords
- [`chage`](/docs/commands/user-management/chage) - Change user password aging information
- [`grpconv`](/docs/commands/user-management/grpconv) - Convert to shadow group files
- [`grpunconv`](/docs/commands/user-management/grpunconv) - Convert from shadow to standard group files
- [`grpck`](/docs/commands/user-management/grpck) - Verify integrity of group files
- [`useradd`](/docs/commands/user-management/useradd) - Create new user accounts
- [`usermod`](/docs/commands/user-management/usermod) - Modify user accounts
- [`authconfig`](/docs/commands/system/authconfig) - Configure authentication settings

## Best Practices

1. **Always backup** password files before conversion using `pwconv`
2. **Verify permissions** after conversion to ensure `/etc/shadow` has 600 permissions
3. **Test authentication** after conversion to ensure users can still log in
4. **Regular validation** with `pwck` to maintain file integrity
5. **Document conversions** for audit and compliance purposes
6. **Monitor logs** for authentication issues after conversion
7. **Integrate with automation** for consistent deployment across systems
8. **Plan recovery procedures** before performing conversions
9. **Review password policies** as part of the conversion process
10. **Educate administrators** about shadow password benefits and management

## Performance Tips

1. **Schedule conversions** during maintenance windows to minimize user impact
2. **Test in staging** before applying to production systems
3. **Monitor system load** during conversion on large user databases
4. **Use scripts** for batch conversions across multiple systems
5. **Implement monitoring** for shadow file changes and integrity
6. **Regular maintenance** to ensure optimal performance and security
7. **Leverage automation tools** for consistent and repeatable deployments
8. **Document procedures** for quick troubleshooting and recovery

The `pwconv` command is a critical security utility that enhances Linux system protection by implementing shadow password mechanisms. Its proper usage ensures compliance with security best practices and provides robust protection against unauthorized access attempts.