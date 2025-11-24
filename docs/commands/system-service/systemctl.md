---
title: systemctl Command
description: Controls the systemd system and service manager, the central management tool for modern Linux systems.
categories:
  - system-administration
tags:
  - systemd
  - services
  - system-management
  - init
toc: true
---

# systemctl Command

The `systemctl` command is the primary interface for controlling the systemd system and service manager. It replaces older SysV init commands like `service` and `chkconfig`, providing unified management of system services, targets, and system state.

## Syntax

```bash
systemctl [OPTIONS] COMMAND [UNIT...]
```

## Core Service Management

| Command | Description | Old Equivalent |
|---------|-------------|----------------|
| `systemctl start service` | Start a service | `service service start` |
| `systemctl stop service` | Stop a service | `service service stop` |
| `systemctl restart service` | Restart a service | `service service restart` |
| `systemctl reload service` | Reload configuration | `service service reload` |
| `systemctl status service` | Show service status | `service service status` |
| `systemctl enable service` | Enable at boot | `chkconfig service on` |
| `systemctl disable service` | Disable at boot | `chkconfig service off` |

## Service Management Commands

### Basic Operations

**Start a service:**
```bash
systemctl start nginx.service
```

**Stop a service:**
```bash
systemctl stop nginx.service
```

**Restart a service:**
```bash
systemctl restart nginx.service
```

**Reload service configuration:**
```bash
systemctl reload nginx.service
```

**Check service status:**
```bash
systemctl status nginx.service
```

**Check if service is active:**
```bash
systemctl is-active nginx.service
```

### Enable/Disable Services

**Enable service to start at boot:**
```bash
systemctl enable nginx.service
```

**Enable and start immediately:**
```bash
systemctl enable --now nginx.service
```

**Disable service from starting at boot:**
```bash
systemctl disable nginx.service
```

**Disable and stop immediately:**
```bash
systemctl disable --now nginx.service
```

### Service Information

**List all services:**
```bash
systemctl list-units --type=service
```

**List all services including inactive:**
```bash
systemctl list-units --type=service --all
```

**List enabled services:**
```bash
systemctl list-unit-files --type=service --state=enabled
```

**List failed services:**
```bash
systemctl --failed --type=service
```

**Show service configuration:**
```bash
systemctl cat nginx.service
```

## System State Management

### Power Management

**Reboot the system:**
```bash
systemctl reboot
```

**Shutdown the system:**
```bash
systemctl poweroff
```

**Halt the system:**
```bash
systemctl halt
```

**Suspend the system:**
```bash
systemctl suspend
```

**Hibernate the system:**
```bash
systemctl hibernate
```

### Target Management

**List current targets:**
```bash
systemctl list-units --type=target
```

**Change to specific target:**
```bash
systemctl isolate graphical.target
```

**Set default target:**
```bash
systemctl set-default graphical.target
```

**Get default target:**
```bash
systemctl get-default
```

## Unit Management

### Common Target Levels

| Target | Description | Equivalent |
|--------|-------------|-----------|
| `poweroff.target` | System shutdown | Runlevel 0 |
| `rescue.target` | Rescue mode | Runlevel 1 |
| `multi-user.target` | Multi-user, no GUI | Runlevel 3 |
| `graphical.target` | Multi-user with GUI | Runlevel 5 |
| `reboot.target` | System reboot | Runlevel 6 |

### Unit File Management

**Create a new service:**
```bash
sudo systemctl edit --full --force myservice.service
```

**Edit service file:**
```bash
sudo systemctl edit nginx.service
```

**Reload systemd configuration:**
```bash
systemctl daemon-reload
```

**Reset service to defaults:**
```bash
sudo systemctl edit nginx.service --remove
```

## Job Management

### Control System Jobs

**List active jobs:**
```bash
systemctl list-jobs
```

**Cancel a job:**
```bash
systemctl cancel job-id
```

**Check system boot performance:**
```bash
systemd-analyze
```

**Analyze boot time:**
```bash
systemd-analyze blame
```

**Analyze critical chain:**
```bash
systemd-analyze critical-chain
```

## Advanced Usage

### Service Dependencies

**Show dependencies:**
```bash
systemctl list-dependencies nginx.service
```

**Show reverse dependencies:**
```bash
systemctl list-dependencies --reverse nginx.service
```

**Show unit requirements:**
```bash
systemctl show --property=Requires nginx.service
```

### Service Properties

**Show all service properties:**
```bash
systemctl show nginx.service
```

**Show specific properties:**
```bash
systemctl show -p CPUQuota,MemoryLimit nginx.service
```

**Get main PID:**
```bash
systemctl show --property=MainPID --value nginx.service
```

### Masking Services

**Mask a service (prevent manual start):**
```bash
systemctl mask nginx.service
```

**Unmask a service:**
```bash
systemctl unmask nginx.service
```

**Check if masked:**
```bash
systemctl is-enabled nginx.service
```

## Real-World Examples

### Web Server Management
```bash
# Enable and start Apache
systemctl enable --now httpd

# Check Apache status
systemctl status httpd

# Reload Apache configuration
systemctl reload httpd

# Restart Apache with verbose output
systemctl restart --verbose httpd
```

### Database Service Management
```bash
# Start MariaDB
systemctl start mariadb

# Enable MariaDB at boot
systemctl enable mariadb

# Check MariaDB status
systemctl status mariadb

# Check MariaDB logs
journalctl -u mariadb -f
```

### System Diagnostics
```bash
# Check failed services
systemctl --failed

# List all running services
systemctl list-units --type=service --state=running

# Check system load
systemctl status

# Analyze boot performance
systemd-analyze
```

### Service Troubleshooting
```bash
# Check service logs
journalctl -u service-name -b

# Start service in debug mode
systemctl edit service-name
# Add: Environment=SYSTEMD_LOG_LEVEL=debug

# Check service dependencies
systemctl list-dependencies service-name

# Verify service configuration
systemd-analyze verify service-name
```

## Unit File Examples

### Basic Service Template
```ini
[Unit]
Description=My Custom Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/mycommand
Restart=always
User=myuser

[Install]
WantedBy=multi-user.target
```

### Web Service Template
```ini
[Unit]
Description=Web Application
After=network.target postgresql.service

[Service]
Type=forking
PIDFile=/var/run/myapp.pid
ExecStart=/usr/local/bin/myapp start
ExecStop=/usr/local/bin/myapp stop
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

## Integration with Other Tools

### Monitoring Services
```bash
# Watch service status changes
watch systemctl status nginx.service

# Monitor service logs in real-time
journalctl -u nginx.service -f

# Check service resource usage
systemctl status nginx.service
# Look at CPU, Memory information
```

### Automation Scripts
```bash
#!/bin/bash
# Service restart script

SERVICE="nginx"
if systemctl is-active --quiet $SERVICE; then
    echo "$SERVICE is running, restarting..."
    systemctl restart $SERVICE
else
    echo "$SERVICE is not running, starting..."
    systemctl start $SERVICE
fi

systemctl enable $SERVICE
```

## Troubleshooting

### Common Issues

**Service fails to start:**
```bash
# Check status
systemctl status service-name

# Check logs
journalctl -u service-name -b

# Check configuration
systemctl cat service-name
```

**Service won't enable:**
```bash
# Check dependencies
systemctl list-dependencies service-name

# Check target
systemctl get-default

# Verify unit file exists
systemctl list-unit-files | grep service-name
```

**Performance issues:**
```bash
# Check boot time
systemd-analyze blame

# Check service startup time
systemd-analyze critical-chain service-name

# Check resource limits
systemctl show service-name | grep Limit
```

## Security Considerations

### Service Hardening

**Run as specific user:**
```ini
[Service]
User=serviceuser
Group=servicegroup
```

**Restrict capabilities:**
```ini
[Service]
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
```

**File system restrictions:**
```ini
[Service]
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/var/log/myservice
```

## Best Practices

1. **Always check status**: Use `systemctl status` for diagnostics
2. **Use --now with enable/disable**: Changes take effect immediately
3. **Test unit files**: Use `systemd-analyze verify` before deploying
4. **Monitor logs**: Use `journalctl` for troubleshooting
5. **Use templates**: Create reusable service templates
6. **Document dependencies**: Clearly specify service dependencies
7. **Security first**: Use service hardening options

## Migration from SysV

**Conversion examples:**
```bash
# Old SysV commands
service httpd start
chkconfig httpd on

# New systemd equivalents
systemctl start httpd
systemctl enable httpd
```

**Migration checklist:**
- Replace service commands with systemctl
- Update startup scripts to use targets
- Convert init scripts to unit files
- Update documentation and procedures
- Train administrators on new commands

---

*Content adapted from the linux-command project. Original content available at [https://github.com/jaywcjlove/linux-command](https://github.com/jaywcjlove/linux-command)*