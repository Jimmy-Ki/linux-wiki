---
title: chkconfig - System Service Management Tool
sidebar_label: chkconfig
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chkconfig - System Service Management Tool

The `chkconfig` command is a system administration tool for managing which services run at each run level on Linux systems, particularly in Red Hat-based distributions (RHEL, CentOS, Fedora). It provides a simple interface for enabling and disabling system services during system startup, ensuring that essential services start automatically and unnecessary ones are disabled for security and performance. The tool manipulates symbolic links in the `/etc/rc.d/rcN.d/` directories, where N represents different run levels (0-6), providing a standardized way to control service startup behavior across different system states.

## Basic Syntax

```bash
chkconfig [--list] [--type <type>] [service]
chkconfig --add <service>
chkconfig --del <service>
chkconfig [--level <levels>] <service> <on|off|reset|resetpriorities>
```

## Common Actions

- `--list` - List all services and their runlevel configurations
- `--add` - Add a new service to chkconfig management
- `--del` - Delete a service from chkconfig management
- `on` - Enable service at specified runlevels
- `off` - Disable service at specified runlevels
- `reset` - Reset service to default runlevels
- `resetpriorities` - Reset service priority numbers

## Common Options

### Display Options
- `--list` - List all services and their current configuration
- `--type <type>` - Specify service type (sysv, xinetd)
- `--help` - Display help message
- `--version` - Show version information

### Configuration Options
- `--level <levels>` - Specify runlevels (0-6) for operation
- `--add` - Add service to chkconfig management
- `--del` - Remove service from chkconfig management

### Service States
- `on` - Enable service at specified runlevels
- `off` - Disable service at specified runlevels
- `reset` - Reset to default configuration
- `resetpriorities` - Reset start/stop priority numbers

## Usage Examples

### Basic Service Management

#### Listing Services
```bash
# List all services and their runlevel status
chkconfig --list

# List specific service status
chkconfig --list httpd

# List services by type
chkconfig --list --type sysv
chkconfig --list --type xinetd

# Show verbose output
chkconfig --list | grep sshd
```

#### Enabling and Disabling Services
```bash
# Enable service at default runlevels
chkconfig httpd on

# Disable service
chkconfig httpd off

# Enable service at specific runlevels
chkconfig --level 345 httpd on

# Disable service at specific runlevels
chkconfig --level 0126 httpd off

# Enable service for multiple runlevels
chkconfig --level 2345 mysqld on
```

### Service Administration

#### Adding and Removing Services
```bash
# Add new service to chkconfig management
chkconfig --add nginx

# Remove service from chkconfig
chkconfig --del oldservice

# Reset service to defaults
chkconfig --resetdefaults httpd

# Reset service priorities
chkconfig --resetpriorities sshd
```

#### Service Configuration
```bash
# Configure custom service with specific runlevels
chkconfig --level 35 custom-app on

# Set service for single-user mode
chkconfig --level 1 emergency-service on

# Configure service for multi-user and graphical modes
chkconfig --level 2345 desktop-services on
```

## Practical Examples

### System Administration

#### Web Server Configuration
```bash
# Configure Apache for production
chkconfig --add httpd
chkconfig --level 345 httpd on
chkconfig --list httpd

# Configure Nginx alongside Apache
chkconfig --add nginx
chkconfig --level 2345 nginx on

# Disable services not needed in production
chkconfig --level 2345 bluetooth off
chkconfig --level 2345 cups off
chkconfig --level 2345 sendmail off
```

#### Database Service Management
```bash
# Configure MySQL/MariaDB
chkconfig --add mysqld
chkconfig --level 2345 mysqld on

# Configure PostgreSQL
chkconfig --add postgresql
chkconfig --level 345 postgresql on

# Configure Redis cache server
chkconfig --add redis
chkconfig --level 234 redis on

# Verify database services
chkconfig --list | grep -E "(mysql|postgres|redis)"
```

#### Security Hardening
```bash
# Disable unnecessary services for security
chkconfig --level 2345 telnet off
chkconfig --level 2345 rsh off
chkconfig --level 2345 rlogin off
chkconfig --level 2345 finger off

# Enable essential security services
chkconfig --level 2345 iptables on
chkconfig --level 2345 fail2ban on

# Verify security configuration
chkconfig --list | grep -E "(telnet|rsh|rlogin|finger)"
```

### Development Environment Setup

#### Development Services
```bash
# Configure development database
chkconfig --add mysqld
chkconfig --level 345 mysqld on

# Enable caching services for development
chkconfig --add memcached
chkconfig --level 345 memcached on

# Configure development web server
chkconfig --add httpd
chkconfig --level 345 httpd on

# Start services immediately
service mysqld start
service memcached start
service httpd start
```

#### Testing Environment Services
```bash
# Configure services for testing environment
chkconfig --level 345 httpd on
chkconfig --level 345 mysqld on
chkconfig --level 345 redis on

# Disable production-only services
chkconfig --level 2345 sendmail off
chkconfig --level 2345 crond off

# Verify testing configuration
chkconfig --list | grep -E "(httpd|mysql|redis)"
```

### Network Services Configuration

#### Mail Server Setup
```bash
# Configure Postfix mail server
chkconfig --add postfix
chkconfig --level 2345 postfix on

# Configure Dovecot IMAP/POP3
chkconfig --add dovecot
chkconfig --level 2345 dovecot on

# Configure spam filtering
chkconfig --add spamassassin
chkconfig --level 2345 spamassassin on

# Configure antivirus
chkconfig --add clamd
chkconfig --level 2345 clamd on
```

#### DNS and DHCP Services
```bash
# Configure BIND DNS server
chkconfig --add named
chkconfig --level 345 named on

# Configure DHCP server
chkconfig --add dhcpd
chkconfig --level 345 dhcpd on

# Configure DNS caching
chkconfig --add dnsmasq
chkconfig --level 2345 dnsmasq on
```

## Advanced Usage

### Service Dependencies

#### Managing Service Dependencies
```bash
# Check service dependencies
chkconfig --list | grep -E "(network|httpd|mysqld)"

# Ensure network starts before web services
chkconfig --level 345 network on
chkconfig --level 345 httpd on

# Configure service startup order
chkconfig --add network
chkconfig --add httpd
chkconfig --add mysqld

# Verify startup sequence
ls -la /etc/rc3.d/ | grep -E "^(S|K)[0-9]"
```

#### Custom Service Configuration
```bash
# Create custom service script
cat > /etc/init.d/custom-service << 'EOF'
#!/bin/bash
# custom-service - Custom application service
# chkconfig: 345 85 15
# description: Custom application service

case "$1" in
    start)
        echo "Starting custom service..."
        # Start commands
        ;;
    stop)
        echo "Stopping custom service..."
        # Stop commands
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac
exit 0
EOF

# Make script executable
chmod +x /etc/init.d/custom-service

# Add to chkconfig
chkconfig --add custom-service
chkconfig --level 345 custom-service on
```

### Runlevel Management

#### Understanding Runlevels
```bash
# Display current runlevel
runlevel

# Show services for each runlevel
chkconfig --list | awk '{print $1, $2, $3, $4, $5, $6, $7, $8}'

# Check which services start at runlevel 3
chkconfig --list | grep '3:on'

# Check services disabled at all runlevels
chkconfig --list | grep -v 'on' | head
```

#### Runlevel-specific Configuration
```bash
# Configure services for single-user mode (runlevel 1)
chkconfig --level 1 network on
chkconfig --level 1 sshd off

# Configure for multi-user mode (runlevel 3)
chkconfig --level 3 network on
chkconfig --level 3 sshd on
chkconfig --level 3 httpd on

# Configure for graphical mode (runlevel 5)
chkconfig --level 5 gdm on
chkconfig --level 5 network on
chkconfig --level 5 sshd on

# Reboot/recovery configurations (runlevel 6)
chkconfig --level 6 network off
chkconfig --level 6 httpd off
```

## Service Script Integration

### Creating Service Scripts

#### Standard SysV Service Script
```bash
# Create standard service script template
cat > /etc/init.d/myservice << 'EOF'
#!/bin/bash
#
# myservice - My Application Service
#
# chkconfig: 345 95 05
# description: My Application Service Description
# processname: myservice
# pidfile: /var/run/myservice.pid
# config: /etc/myservice.conf

# Source function library
. /etc/rc.d/init.d/functions

# Source networking configuration
. /etc/sysconfig/network

# Check that networking is up
[ "$NETWORKING" = "no" ] && exit 0

prog="myservice"
lockfile=/var/lock/subsys/$prog

start() {
    echo -n $"Starting $prog: "
    daemon $prog
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && touch $lockfile
    return $RETVAL
}

stop() {
    echo -n $"Stopping $prog: "
    killproc $prog
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && rm -f $lockfile
    return $RETVAL
}

restart() {
    stop
    start
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status $prog
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

exit 0
EOF

# Make executable and add to chkconfig
chmod +x /etc/init.d/myservice
chkconfig --add myservice
chkconfig --level 345 myservice on
```

#### Service with Dependencies
```bash
# Create service with network dependency
cat > /etc/init.d/network-service << 'EOF'
#!/bin/bash
#
# network-service - Service requiring network
#
# chkconfig: 345 98 02
# description: Network-dependent service
# processname: netservice

# Source function library
. /etc/rc.d/init.d/functions

# Check for network
if [ ! -f /var/lock/subsys/network ]; then
    exit 0
fi

start() {
    echo -n "Starting network service: "
    # Start service logic here
    success
    touch /var/lock/subsys/network-service
    echo
}

stop() {
    echo -n "Stopping network service: "
    # Stop service logic here
    success
    rm -f /var/lock/subsys/network-service
    echo
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac

exit 0
EOF

chmod +x /etc/init.d/network-service
chkconfig --add network-service
```

## Integration and Automation

### Shell Scripts

#### Bulk Service Management
```bash
#!/bin/bash
# Bulk service configuration script

SERVICES_TO_ENABLE="httpd mysql sshd iptables"
SERVICES_TO_DISABLE="telnet rsh rlogin finger bluetooth"

# Enable essential services
for service in $SERVICES_TO_ENABLE; do
    if chkconfig --list | grep -q "$service"; then
        echo "Enabling $service..."
        chkconfig --level 345 $service on
        echo "Service $service enabled at runlevels 3,4,5"
    else
        echo "Service $service not found"
    fi
done

# Disable unnecessary services
for service in $SERVICES_TO_DISABLE; do
    if chkconfig --list | grep -q "$service"; then
        echo "Disabling $service..."
        chkconfig --level 2345 $service off
        echo "Service $service disabled at all runlevels"
    else
        echo "Service $service not found"
    fi
done

# Show final configuration
echo -e "\nFinal service configuration:"
chkconfig --list | grep -E "(httpd|mysql|sshd|iptables|telnet|rsh|rlogin|finger|bluetooth)"
```

#### Service Backup and Restore
```bash
#!/bin/bash
# Backup and restore service configurations

BACKUP_DIR="/root/service-backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup current service configuration
echo "Backing up current service configuration..."
chkconfig --list > $BACKUP_DIR/chkconfig_backup_$DATE.txt

# Backup service scripts
echo "Backing up service scripts..."
cp -r /etc/init.d/ $BACKUP_DIR/init.d_backup_$DATE/

# Create restore script
cat > $BACKUP_DIR/restore_services_$DATE.sh << 'EOF'
#!/bin/bash
# Restore service configuration from backup

echo "Restoring service configuration..."
while read line; do
    service=$(echo $line | awk '{print $1}')
    levels=$(echo $line | awk '{for(i=2;i<=NF;i++) if($i ~ /on/) print $i}')

    if [ -n "$levels" ]; then
        runlevels=$(echo $levels | tr ':' ' ' | tr -d 'on' | tr ' ' ',')
        chkconfig --level $runlevels $service on
    fi
done < chkconfig_backup_*.txt
EOF

chmod +x $BACKUP_DIR/restore_services_$DATE.sh
echo "Backup completed: $BACKUP_DIR/chkconfig_backup_$DATE.txt"
```

## Troubleshooting

### Common Issues

#### Service Not Found
```bash
# Problem: Service not listed in chkconfig
# Solution: Add service to chkconfig management

# Check if service script exists
ls -la /etc/init.d/servicename

# Ensure service script has proper chkconfig header
head -10 /etc/init.d/servicename | grep chkconfig

# Add service to chkconfig
chkconfig --add servicename

# Verify service is now managed
chkconfig --list servicename
```

#### Service Won't Enable/Disable
```bash
# Problem: Service state doesn't change
# Solution: Check permissions and dependencies

# Check service script permissions
ls -la /etc/init.d/servicename

# Ensure script is executable
chmod +x /etc/init.d/servicename

# Check for syntax errors
bash -n /etc/init.d/servicename

# Test service manually
service servicename start
service servicename stop

# Try to enable again
chkconfig --level 345 servicename on
```

#### Runlevel Configuration Problems
```bash
# Problem: Service doesn't start at correct runlevel
# Solution: Verify runlevel configuration and symlinks

# Check current runlevel
runlevel

# Verify service symlinks
ls -la /etc/rc.d/rc3.d/ | grep servicename

# Check if runlevels are configured correctly
chkconfig --list servicename

# Manually create symlinks if needed
ln -s ../init.d/servicename /etc/rc.d/rc3.d/S99servicename
```

#### Service Priority Issues
```bash
# Problem: Services starting in wrong order
# Solution: Adjust priority numbers

# Check current priorities
ls -la /etc/rc.d/rc3.d/ | grep -E '^[SK].*'

# Modify service script priority
# Edit the line: # chkconfig: 345 85 15
# where 85 is start priority, 15 is kill priority

# Reset priorities
chkconfig --resetpriorities servicename

# Re-add service with correct priorities
chkconfig --del servicename
chkconfig --add servicename
```

## Related Commands

- [`service`](/docs/commands/system-service/service) - Start, stop, and manage services
- [`systemctl`](/docs/commands/system-service/systemctl) - Systemd service manager (modern alternative)
- [`init`](/docs/commands/system-service/init) - System initialization process
- [`telinit`](/docs/commands/system-service/telinit) - Change system runlevel
- [`runlevel`](/docs/commands/system-service/runlevel) - Print previous and current runlevel
- [`system-config-services`](/docs/commands/system-service/system-config-services) - Graphical service configuration tool
- [`ntsysv`](/docs/commands/system-service/ntsysv) - Text-based service configuration tool
- [`update-rc.d`](/docs/commands/system-service/update-rc.d) - Debian/Ubuntu service management (alternative)

## Best Practices

1. **Always test services manually** before adding them to chkconfig
2. **Use appropriate runlevels** - 3 for multi-user, 5 for graphical, 1 for single-user
3. **Document custom service scripts** with clear chkconfig headers and descriptions
4. **Regular review and disable** unnecessary services for security
5. **Backup service configurations** before making major changes
6. **Use consistent priority numbers** for related services to ensure proper startup order
7. **Test service dependencies** to ensure all required services start first
8. **Monitor service logs** after enabling new services
9. **Use meaningful service names** and descriptions for clarity
10. **Consider systemd as replacement** for modern Linux distributions

## Performance Tips

1. **Minimize enabled services** - Only enable services that are actually needed
2. **Optimize startup priorities** - Critical services should start with lower numbers
3. **Group related services** - Configure similar services with consecutive priorities
4. **Avoid service conflicts** - Ensure services don't compete for the same resources
5. **Regular cleanup** - Remove unused or obsolete services from chkconfig
6. **Use service dependencies** - Configure services to depend on network availability
7. **Monitor boot time** - Track how long services take to start during boot
8. **Test service recovery** - Ensure services can be restarted properly
9. **Use service-specific logs** - Monitor individual service performance
10. **Consider alternative tools** - Use systemctl on systemd-based systems for better performance

The `chkconfig` command is a fundamental tool for traditional SysV init systems, providing reliable service management across different runlevels. While modern systems increasingly use systemd, understanding chkconfig remains essential for managing legacy systems and maintaining compatibility with traditional Linux distributions.