---
title: ftpshut - FTP Server Shutdown Utility
sidebar_label: ftpshut
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ftpshut - FTP Server Shutdown Utility

The `ftpshut` command is a system administration utility used to gracefully shut down an FTP server in a controlled manner. This command is part of the WU-FTPD (Washington University FTP daemon) package and allows administrators to schedule server shutdowns, notify connected users, and prevent new connections during maintenance windows. It creates a shutdown message file that informs users about the impending server shutdown and provides a controlled transition period.

## Basic Syntax

```bash
ftpshut [-l] [-d min] [-R] [time] [warning] [shutdown-message]
```

## Parameters

### Time Format
- **`now`** - Immediate shutdown
- **`+minutes`** - Shutdown after specified minutes (e.g., +5, +30)
- **`HHMM`** - Shutdown at specific time in 24-hour format (e.g., 1800, 2359)

### Arguments
- **`time`** - When to shut down the FTP server
- **`warning`** - Time interval between warning messages (in minutes)
- **`shutdown-message`** - Message displayed to users

## Options

### Warning Control
- `-l` - Do not allow logins after shutdown time
- `-d min` - Disconnect clients after specified minutes
- `-R` - Remove any existing shutdown files

### Message Options
- Default warning interval is 5 minutes
- Messages are sent to all connected users
- New connections are rejected during shutdown process

## Usage Examples

### Basic Shutdown Operations

#### Immediate Shutdown
```bash
# Immediate server shutdown
ftpshut now

# Immediate shutdown with custom message
ftpshut now "Server is going down for emergency maintenance"

# Immediate shutdown with no new logins
ftpshut -l now "Server is shutting down - no new connections allowed"
```

#### Scheduled Shutdown
```bash
# Shutdown in 5 minutes
ftpshut +5

# Shutdown in 30 minutes with 10-minute warnings
ftpshut +30 10 "Scheduled maintenance in progress"

# Shutdown at specific time (6:00 PM)
ftpshut 1800

# Shutdown at midnight with hourly warnings
ftpshut 0000 60 "End of day maintenance window"
```

### Advanced Shutdown Scenarios

#### Maintenance Window Planning
```bash
# Schedule evening maintenance with advance notice
ftpshut 2200 15 "Scheduled maintenance starting at 10 PM - Please save your work"

# Weekend maintenance
ftpshut 0200 30 "Weekend system updates - Service will resume at 6 AM"

# Force logout after shutdown time
ftpshut -l +15 5 "Server maintenance - All sessions will be terminated"

# Disconnect idle clients after 10 minutes of shutdown
ftpshut -d 10 +20 5 "Idle sessions will be disconnected during maintenance"
```

#### Emergency Scenarios
```bash
# Critical security update - immediate shutdown
ftpshut -l now "CRITICAL: Security update required - Server going offline immediately"

# Rapid response maintenance
ftpshut -d 5 +5 2 "Emergency maintenance - All sessions terminated in 5 minutes"

# Remove previous shutdown and create new one
ftpshut -R now +2 1 "Previous shutdown cancelled - New emergency shutdown initiated"
```

### Communication Management

#### User Notification Messages
```bash
# Detailed maintenance message
ftpshut +60 10 "The FTP server will undergo routine maintenance from 3:00 PM to 5:00 PM. Please complete your uploads/downloads before this time. The service will resume at approximately 5:00 PM."

# Brief notification
ftpshut +30 5 "Quick restart in 30 minutes - Please save your work"

# Technical update notification
ftpshut +45 15 "System patch deployment - Server unavailable during this time"
```

#### Multi-language Support
```bash
# English maintenance notice
ftpshut +20 5 "Server maintenance in 20 minutes - Please save your work"

# Spanish notice
ftpshut +20 5 "Mantenimiento del servidor en 20 minutos - Por favor guarde su trabajo"

# Generic message
ftpshut +15 3 "MAINTENANCE - Server will restart soon"
```

## Practical Examples

### System Administration

#### Routine Maintenance Planning
```bash
#!/bin/bash
# Scheduled maintenance script for FTP server

MAINTENANCE_TIME=0200
WARNING_INTERVAL=30
MESSAGE="Scheduled system maintenance - Service will be temporarily unavailable"

# Schedule shutdown for 2 AM with 30-minute warnings
ftpshut $MAINTENANCE_TIME $WARNING_INTERVAL "$MESSAGE"

# Log the maintenance action
echo "$(date): FTP server maintenance scheduled for $MAINTENANCE_TIME" >> /var/log/ftp_maintenance.log

# Notify system administrators
echo "FTP server maintenance scheduled. Check ftpshut status." | mail -s "FTP Maintenance Alert" admin@company.com
```

#### Backup Integration
```bash
#!/bin/bash
# Backup script with FTP server coordination

BACKUP_START_TIME=0300
SHUTDOWN_ADVANCE=60
BACKUP_MESSAGE="Database backup in progress - FTP service temporarily unavailable"

# Schedule shutdown 1 hour before backup
ftpshut +$SHUTDOWN_ADVANCE 15 "$BACKUP_MESSAGE"

# Wait for scheduled time
sleep $((SHUTDOWN_ADVANCE * 60))

# Perform backup operations
echo "Starting backup process..."
# ... backup commands ...

# Resume service after backup
rm -f /etc/shutmsg
echo "FTP service resumed after backup" >> /var/log/backup.log
```

### Emergency Response

#### Security Incident Handling
```bash
#!/bin/bash
# Emergency security response script

SECURITY_MESSAGE="SECURITY ALERT: Immediate shutdown required for security update. All sessions terminated."

# Immediate shutdown with forced disconnection
ftpshut -l -d 2 now "$SECURITY_MESSAGE"

# Log security incident
echo "$(date): FTP emergency shutdown - Security incident" >> /var/log/security.log

# Notify security team
echo "FTP server emergency shutdown initiated due to security incident" | \
    mail -s "SECURITY ALERT - FTP Shutdown" security@company.com
```

#### System Failure Recovery
```bash
#!/bin/bash
# System recovery coordination

RECOVERY_MESSAGE="System recovery in progress - Service temporarily unavailable"

# Stop accepting new connections
ftpshut -l now "$RECOVERY_MESSAGE"

# Give current users time to finish (5 minutes)
sleep 300

# Force disconnect remaining users
ftpshut -d 0 now "Immediate disconnect required for system recovery"
```

### Automation and Monitoring

#### Maintenance Automation
```bash
#!/bin/bash
# Automated weekly maintenance script

WEEKDAY=$(date +%u)  # 1-7 (Monday-Sunday)
HOUR=$(date +%H)

# Weekly Sunday 2 AM maintenance
if [ $WEEKDAY -eq 7 ] && [ $HOUR -eq 1 ]; then
    ftpshut 0200 30 "Weekly maintenance - Service will resume at 4 AM"

    # Wait for maintenance window
    sleep 7200  # 2 hours

    # Perform maintenance tasks
    /usr/local/bin/maintenance_script.sh

    # Remove shutdown file to resume service
    rm -f /etc/shutmsg
    echo "Weekly maintenance completed" >> /var/log/maintenance.log
fi
```

#### Health Check Integration
```bash
#!/bin/bash
# FTP server health check with automatic shutdown

HEALTH_CHECK="/usr/local/bin/ftp_health_check.sh"

# Perform health check
if ! $HEALTH_CHECK; then
    ALERT_MSG="Health check failed - Automatic shutdown initiated for safety"
    ftpshut -l -d 5 now "$ALERT_MSG"

    # Alert administrators
    echo "FTP server health check failed - Automatic shutdown triggered" | \
        mail -s "FTP SERVER ALERT" admin@company.com
fi
```

## Advanced Usage

### Complex Scheduling

#### Coordinated Multi-Service Maintenance
```bash
#!/bin/bash
# Coordinated maintenance for multiple services

MAINTENANCE_START=0300
MAINTENANCE_DURATION=120  # 2 hours

# FTP server shutdown (1 hour before maintenance)
ftpshut +60 15 "Multi-service maintenance starting at 3 AM"

# Web server notification (30 minutes before)
echo "Web server maintenance at 3 AM" > /var/www/maintenance.txt

# Database server (15 minutes before)
# database_shutdown_command.sh

# Coordinated restart time
sleep 7200  # 2 hours

# Resume all services
rm -f /etc/shutmsg
rm -f /var/www/maintenance.txt
# database_restart_command.sh
```

#### Rolling Updates
```bash
#!/bin/bash
# Rolling update across multiple FTP servers

SERVERS=("ftp1.example.com" "ftp2.example.com" "ftp3.example.com")
UPDATE_INTERVAL=30  # minutes between servers

for server in "${SERVERS[@]}"; do
    # Shutdown current server
    ssh $server "ftpshut now 'Rolling update in progress - Please use backup servers'"

    # Perform update
    ssh $server "/usr/local/bin/update_ftp_server.sh"

    # Resume service
    ssh $server "rm -f /etc/shutmsg"

    echo "Updated $server - Waiting $UPDATE_INTERVAL minutes before next server"
    sleep $((UPDATE_INTERVAL * 60))
done
```

### Monitoring and Logging

#### Shutdown Status Monitoring
```bash
#!/bin/bash
# Monitor FTP shutdown status

SHUTDOWN_FILE="/etc/shutmsg"

if [ -f "$SHUTDOWN_FILE" ]; then
    echo "FTP server shutdown is scheduled:"
    cat "$SHUTDOWN_FILE"

    # Extract shutdown time
    SHUTDOWN_TIME=$(head -1 "$SHUTDOWN_FILE")
    echo "Shutdown scheduled for: $SHUTDOWN_TIME"

    # Count connected users
    FTP_COUNT=$(ftpcount 2>/dev/null | grep "Total users:" | awk '{print $3}')
    echo "Currently connected users: $FTP_COUNT"
else
    echo "No FTP server shutdown scheduled"
fi
```

#### Automated Reporting
```bash
#!/bin/bash
# Generate maintenance report

REPORT_FILE="/var/log/ftp_maintenance_report.txt"
DATE=$(date +%Y-%m-%d)

{
    echo "FTP Maintenance Report - $DATE"
    echo "================================="
    echo

    if [ -f /etc/shutmsg ]; then
        echo "Current Status: Shutdown Scheduled"
        echo "Shutdown Details:"
        cat /etc/shutmsg
        echo
    else
        echo "Current Status: Normal Operation"
    fi

    echo "Connection Statistics:"
    ftpcount 2>/dev/null || echo "Unable to retrieve connection statistics"

    echo
    echo "Recent Maintenance Log:"
    tail -20 /var/log/ftp_maintenance.log 2>/dev/null || echo "No maintenance logs found"

} > "$REPORT_FILE"

# Email report to administrators
mail -s "FTP Maintenance Report - $DATE" admin@company.com < "$REPORT_FILE"
```

## Troubleshooting

### Common Issues

#### Shutdown Not Working
```bash
# Check if shutdown file exists
ls -la /etc/shutmsg

# Verify FTP daemon configuration
grep -i shutdown /etc/ftpaccess 2>/dev/null
grep -i shutdown /etc/proftpd.conf 2>/dev/null

# Check FTP daemon status
ps aux | grep ftpd
systemctl status vsftpd
```

#### Users Not Receiving Messages
```bash
# Check if daemon is running
ps aux | grep ftpd

# Test user notification
echo "Test message" | ftpshut now

# Restart FTP daemon if needed
systemctl restart vsftpd
# or
kill -HUP $(cat /var/run/ftpd.pid)
```

#### Premature Shutdown
```bash
# Check system time
date

# Verify shutdown file contents
cat /etc/shutmsg

# Check for cron jobs that might interfere
crontab -l | grep -i ftp
```

### Recovery Procedures

#### Canceling Scheduled Shutdown
```bash
# Remove shutdown file to cancel
rm -f /etc/shutmsg

# Verify cancellation
ftpwho

# Send notification to users
echo "Maintenance cancelled - Normal service resumed" | \
    mail -s "FTP Service Notice" all-users@company.com
```

#### Emergency Service Restoration
```bash
#!/bin/bash
# Emergency service restoration

# Cancel any pending shutdowns
rm -f /etc/shutmsg

# Restart FTP daemon
systemctl restart vsftpd

# Verify service is running
ftpwho

# Log emergency action
echo "$(date): Emergency FTP service restoration completed" >> /var/log/emergency.log
```

## Best Practices

1. **Schedule regular maintenance windows** during low-traffic periods
2. **Provide advance notice** with clear messaging about downtime duration
3. **Use warning intervals** to allow users to complete transfers
4. **Monitor user activity** before shutdown to minimize disruption
5. **Coordinate with other services** for comprehensive maintenance
6. **Document all shutdowns** for audit and troubleshooting purposes
7. **Test shutdown procedures** regularly in development environments
8. **Have backup access methods** ready during extended maintenance
9. **Communicate effectively** with all stakeholders about maintenance schedules
10. **Use appropriate disconnection timeouts** based on transfer completion times

## Security Considerations

1. **Restrict shutdown command access** to authorized administrators only
2. **Log all shutdown operations** for security auditing
3. **Use emergency shutdown procedures** for security incidents
4. **Verify user identities** before allowing extended maintenance windows
5. **Monitor for unauthorized shutdown attempts**
6. **Secure shutdown message files** to prevent tampering
7. **Implement notification protocols** for security-related shutdowns
8. **Document emergency contacts** for immediate response scenarios

## Related Commands

- [`ftp`](/docs/commands/networking/ftp) - FTP client program
- [`ftpcount`](/docs/commands/networking/ftpcount) - Show number of connected FTP users
- [`ftpwho`](/docs/commands/networking/ftpwho) - Show current FTP users
- [`ftptop`](/docs/commands/networking/ftptop) - Display running FTP processes
- [`vsftpd`](/docs/commands/networking/vsftpd) - Very Secure FTP Daemon
- [`proftpd`](/docs/commands/networking/proftpd) - Professional FTP Daemon
- [`systemctl`](/docs/commands/system/systemctl) - System service manager
- [`service`](/docs/commands/system/service) - Service control utility

The `ftpshut` command is an essential tool for FTP server administrators, providing controlled shutdown capabilities with user notification and graceful disconnection handling. Its scheduling features and messaging system ensure that maintenance and emergency operations can be performed with minimal disruption to users while maintaining system integrity and security.