---
title: mysqladmin - MySQL server administration
sidebar_label: mysqladmin
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mysqladmin - MySQL server administration

The `mysqladmin` command is a powerful administrative client for managing MySQL database servers. It provides essential functionality for server administration including status monitoring, user management, database operations, and server maintenance tasks. mysqladmin enables database administrators to perform critical operations like creating/dropping databases, reloading privileges, flushing tables, and monitoring server performance from the command line, making it indispensable for MySQL server management and automation.

## Basic Syntax

```bash
mysqladmin [OPTIONS] COMMAND [COMMAND_OPTIONS]
```

## Common Commands

- `create db_name` - Create a new database
- `drop db_name` - Drop a database
- `extended-status` - Show extended server status
- `flush-hosts` - Flush all cached hosts
- `flush-logs` - Flush all logs
- `flush-privileges` - Reload grant tables
- `flush-status` - Clear status variables
- `flush-tables` - Flush all tables
- `flush-threads` - Flush thread cache
- `kill id,id,...` - Kill server threads
- `password new_password` - Set new password
- `ping` - Check if server is alive
- `processlist` - Show list of active server threads
- `reload` - Reload grant tables
- `refresh` - Flush all tables and close/open log files
- `shutdown` - Take server down
- `status` - Show short server status
- `start-replica` - Start replication
- `stop-replica` - Stop replication
- `variables` - Show server variables
- `version` - Show version information

## Common Options

### Connection Options
- `-h, --host=name` - Connect to host (default: localhost)
- `-P, --port=#` - Port number to use for connection
- `-S, --socket=name` - Socket file to use for connection
- `-u, --user=name` - User for login if not current user
- `-p, --password[=name]` - Password to use when connecting
- `-C, --compress` - Use compression in server/client protocol
- `--connect-timeout=#` - Number of seconds before connection timeout

### SSL Options
- `--ssl` - Enable SSL for connection
- `--ssl-ca=name` - CA file in PEM format
- `--ssl-cert=name` - X.509 cert in PEM format
- `--ssl-key=name` - X.509 key in PEM format
- `--ssl-verify-server-cert` - Verify server's Common Name

### Other Options
- `--count=#` - Number of iterations to make
- `-i, --sleep=#` - Execute commands repeatedly with sleep between
- `-v, --verbose` - Write more information
- `--silent` - Silently exit if connection to server fails
- `--wait` - Wait and retry if connection fails
- `--debug-check` - Check memory and open files and exit

## Usage Examples

### Basic Server Administration

#### Creating and Managing Databases
```bash
# Create a new database
mysqladmin -u root -p create myapp_db

# Drop an existing database
mysqladmin -u root -p drop old_database

# Create database with custom connection
mysqladmin -h db.example.com -P 3306 -u admin -p create production_db

# Create multiple databases (multiple commands)
mysqladmin -u root -p create db1
mysqladmin -u root -p create db2
mysqladmin -u root -p create db3
```

#### Server Status and Monitoring
```bash
# Show basic server status
mysqladmin -u root -p status

# Show extended status information
mysqladmin -u root -p extended-status

# Show server version
mysqladmin -u root -p version

# Show server variables
mysqladmin -u root -p variables

# Check if server is alive
mysqladmin -u root -p ping

# Continuous monitoring with interval
mysqladmin -u root -p -i 5 status
```

#### Process Management
```bash
# Show active processes
mysqladmin -u root -p processlist

# Kill specific connection (by process ID)
mysqladmin -u root -p kill 123

# Kill multiple connections
mysqladmin -u root -p kill 123,456,789

# Kill all connections (be careful!)
mysqladmin -u root -p processlist | grep -v '^+' | awk '{print $2}' | xargs mysqladmin -u root -p kill
```

### Server Maintenance

#### Database and Table Operations
```bash
# Flush all tables (close and reopen)
mysqladmin -u root -p flush-tables

# Flush tables with read lock
mysqladmin -u root -p flush-tables-with-read-lock

# Flush logs (rotate log files)
mysqladmin -u root -p flush-logs

# Flush status variables
mysqladmin -u root -p flush-status

# Flush thread cache
mysqladmin -u root -p flush-threads

# Flush host cache
mysqladmin -u root -p flush-hosts

# Reload grant tables (refresh privileges)
mysqladmin -u root -p reload

# Refresh (flush tables and logs)
mysqladmin -u root -p refresh
```

#### Password Management
```bash
# Change current user password
mysqladmin -u user_name -p oldpassword password "newpassword"

# Change root password
mysqladmin -u root -p password "new_strong_password"

# Set password for another user (requires privileges)
mysqladmin -u root -p password "user_password" -h localhost -u target_user
```

#### Server Control
```bash
# Graceful shutdown
mysqladmin -u root -p shutdown

# Check if server is running
mysqladmin -u root -p ping

# Monitor server status continuously
mysqladmin -u root -p -i 10 status

# Test connection before shutdown
if mysqladmin -u root -p ping; then
    mysqladmin -u root -p shutdown
fi
```

## Advanced Usage

### Batch Operations

#### Database Backup Preparation
```bash
#!/bin/bash
# Prepare database for backup

# Lock tables and flush logs
mysqladmin -u backup_user -p flush-tables-with-read-lock

# Perform backup operations here...
# mysqldump -u backup_user -p --all-databases > backup.sql

# Unlock tables when done
mysqladmin -u backup_user -p unlock-tables
```

#### Server Health Check Script
```bash
#!/bin/bash
# MySQL server health monitoring

# Function to check server status
check_mysql_status() {
    if mysqladmin -u monitoring_user -p'monitor_pass' ping > /dev/null 2>&1; then
        echo "MySQL server is running"
        return 0
    else
        echo "MySQL server is not responding"
        return 1
    fi
}

# Get server information
if check_mysql_status; then
    echo "=== MySQL Server Status ==="
    mysqladmin -u monitoring_user -p'monitor_pass' status

    echo "=== Active Connections ==="
    mysqladmin -u monitoring_user -p'monitor_pass' processlist | wc -l

    echo "=== Server Uptime ==="
    mysqladmin -u monitoring_user -p'monitor_pass' status | grep "Uptime"
fi
```

#### Maintenance Automation
```bash
#!/bin/bash
# Automated MySQL maintenance

# Variables
MYSQL_USER="maintenance_user"
MYSQL_PASS="maintenance_pass"
LOG_FILE="/var/log/mysql_maintenance.log"

# Function to log actions
log_action() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Daily maintenance tasks
log_action "Starting MySQL maintenance"

# Flush slow query log
mysqladmin -u $MYSQL_USER -p$MYSQL_PASS flush-logs
log_action "Flushed MySQL logs"

# Flush table cache
mysqladmin -u $MYSQL_USER -p$MYSQL_PASS flush-tables
log_action "Flushed table cache"

# Get server status for monitoring
STATUS_OUTPUT=$(mysqladmin -u $MYSQL_USER -p$MYSQL_PASS status)
log_action "Server status: $STATUS_OUTPUT"

log_action "MySQL maintenance completed"
```

### Replication Management

#### Starting and Stopping Replication
```bash
# Start slave replication
mysqladmin -u root -p start-replica

# Stop slave replication
mysqladmin -u root -p stop-replica

# Check replication status
mysql -u root -p -e "SHOW REPLICA STATUS\G"
```

### Performance Monitoring

#### Real-time Monitoring
```bash
# Monitor server status every 5 seconds
mysqladmin -u monitor_user -p'monitor_pass' -i 5 status

# Monitor extended status
mysqladmin -u monitor_user -p'monitor_pass' -i 10 extended-status

# Monitor specific variables
mysqladmin -u monitor_user -p'monitor_pass' extended-status | grep -E "(Connections|Threads_running)"
```

#### Performance Analysis
```bash
# Get connection statistics
mysqladmin -u root -p extended-status | grep -E "(Threads_connected|Max_used_connections|Connections)"

# Get query statistics
mysqladmin -u root -p extended-status | grep -E "(Questions|Slow_queries|QPS)"

# Get buffer pool status (InnoDB)
mysqladmin -u root -p extended-status | grep -E "Innodb_buffer_pool"
```

## Practical Examples

### Database Administration

#### Production Database Setup
```bash
#!/bin/bash
# Production database setup

DB_USER="admin"
DB_PASS="secure_password"
DB_NAME="production_db"

# Create database
mysqladmin -u root -p create $DB_NAME

# Create database user and grant privileges (using mysql client)
mysql -u root -p -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"

# Verify database creation
mysql -u $DB_USER -p$DB_PASS -e "SHOW DATABASES;" | grep $DB_NAME
```

#### Database Removal Script
```bash
#!/bin/bash
# Safe database removal with confirmation

DB_NAME="$1"
if [ -z "$DB_NAME" ]; then
    echo "Usage: $0 <database_name>"
    exit 1
fi

echo "WARNING: This will permanently delete database '$DB_NAME'"
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" = "yes" ]; then
    mysqladmin -u root -p drop $DB_NAME
    echo "Database $DB_NAME dropped successfully"
else
    echo "Operation cancelled"
fi
```

### Emergency Procedures

#### Emergency Server Recovery
```bash
#!/bin/bash
# Emergency MySQL server recovery procedures

# Check if server is responding
if ! mysqladmin -u root -p ping; then
    echo "Server is not responding. Attempting recovery..."

    # Try to restart MySQL service
    systemctl restart mysql

    # Wait for server to start
    sleep 10

    # Check again
    if mysqladmin -u root -p ping; then
        echo "Server recovered successfully"
    else
        echo "Manual intervention required"
    fi
fi
```

#### Connection Kill Script
```bash
#!/bin/bash
# Kill idle connections

# Find idle connections (sleeping for more than 300 seconds)
IDLE_THREADS=$(mysql -u root -p -e "SHOW PROCESSLIST;" | grep "Sleep" | awk '{print $1}' | tr '\n' ',')

if [ ! -z "$IDLE_THREADS" ]; then
    echo "Killing idle threads: $IDLE_THREADS"
    mysqladmin -u root -p kill $IDLE_THREADS
    echo "Idle connections terminated"
else
    echo "No idle connections found"
fi
```

## Integration and Automation

### System Service Integration

#### Systemd Integration
```bash
# Create a systemd service file for MySQL monitoring
cat > /etc/systemd/system/mysql-monitor.service << 'EOF'
[Unit]
Description=MySQL Server Monitoring
After=mysql.service

[Service]
Type=simple
ExecStart=/usr/local/bin/mysql_monitor.sh
Restart=always
User=mysql
Group=mysql

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the monitoring service
systemctl enable mysql-monitor
systemctl start mysql-monitor
```

### Cron Jobs

#### Daily Maintenance
```bash
# Add to crontab for daily execution
# 0 2 * * * /usr/local/bin/mysql_daily_maintenance.sh

cat > /usr/local/bin/mysql_daily_maintenance.sh << 'EOF'
#!/bin/bash
# Daily MySQL maintenance

# Flush logs
mysqladmin -u maintenance_user -p'password' flush-logs

# Get server statistics
mysqladmin -u maintenance_user -p'password' status > /var/log/mysql/status_$(date +%Y%m%d)

# Clean old status files (keep 7 days)
find /var/log/mysql -name "status_*" -mtime +7 -delete
EOF

chmod +x /usr/local/bin/mysql_daily_maintenance.sh
```

#### Weekly Health Check
```bash
# Add to crontab for weekly execution
# 0 3 * * 0 /usr/local/bin/mysql_health_check.sh

cat > /usr/local/bin/mysql_health_check.sh << 'EOF'
#!/bin/bash
# Weekly MySQL health check

REPORT_FILE="/var/log/mysql/health_report_$(date +%Y%m%d).log"

echo "MySQL Health Check - $(date)" > $REPORT_FILE
echo "================================" >> $REPORT_FILE

# Server status
mysqladmin -u monitor_user -p'password' status >> $REPORT_FILE

# Extended status (summary)
mysqladmin -u monitor_user -p'password' extended-status | grep -E "(Connections|Queries|Slow_queries)" >> $REPORT_FILE

# Send email if critical issues
if mysqladmin -u monitor_user -p'password' extended-status | grep -q "Max_used_connections.*[0-9]"; then
    mail -s "MySQL Health Report" admin@example.com < $REPORT_FILE
fi
EOF

chmod +x /usr/local/bin/mysql_health_check.sh
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Check if MySQL server is running
systemctl status mysql

# Test connection with different hosts
mysqladmin -h localhost -u root -p ping
mysqladmin -h 127.0.0.1 -u root -p ping

# Check port availability
netstat -tuln | grep :3306

# Test with specific socket
mysqladmin -S /var/lib/mysql/mysql.sock -u root -p ping
```

#### Permission Issues
```bash
# Test connection with different users
mysqladmin -u test_user -p ping

# Check user privileges
mysql -u root -p -e "SHOW GRANTS FOR 'test_user'@'localhost';"

# Reload privileges if needed
mysqladmin -u root -p reload
```

#### Performance Issues
```bash
# Monitor server load
mysqladmin -u root -p -i 5 status

# Check slow queries
mysqladmin -u root -p extended-status | grep Slow_queries

# Check thread status
mysqladmin -u root -p processlist

# Identify blocking queries
mysql -u root -p -e "SHOW FULL PROCESSLIST;"
```

#### Lock Issues
```bash
# Check for table locks
mysql -u root -p -e "SHOW OPEN TABLES WHERE In_use > 0;"

# Kill problematic queries
mysqladmin -u root -p processlist
mysqladmin -u root -p kill [thread_id]

# Flush tables to release locks
mysqladmin -u root -p flush-tables
```

## Related Commands

- [`mysql`](/docs/commands/development/mysql) - MySQL command-line client
- [`mysqldump`](/docs/commands/development/mysqldump) - Database backup utility
- [`mysqlshow`](/docs/commands/development/mysqlshow) - Database information utility
- [`mysqlimport`](/docs/commands/development/mysqlimport) - Data import utility
- [`mysqlcheck`](/docs/commands/development/mysqlcheck) - Table maintenance and repair
- [`systemctl`](/docs/commands/systemd/systemctl) - System service management
- [`service`](/docs/commands/system-service/service) - Service management
- [`netstat`](/docs/commands/network/netstat) - Network statistics

## Best Practices

1. **Always use strong passwords** for MySQL administrative accounts
2. **Limit administrative access** to specific hosts when possible
3. **Monitor server status regularly** to catch issues early
4. **Use SSL connections** for remote administration
5. **Test commands in development** before production use
6. **Backup databases** before performing destructive operations
7. **Use specific user accounts** for automated scripts
8. **Log administrative actions** for audit purposes
9. **Schedule regular maintenance** during low-traffic periods
10. **Monitor replication status** if using replication

## Performance Tips

1. **Use connection pooling** for frequent administrative tasks
2. **Schedule maintenance** during off-peak hours
3. **Monitor slow query log** for performance issues
4. **Use read-only replicas** for monitoring queries
5. **Optimize MySQL configuration** based on workload
6. **Use InnoDB buffer pool** efficiently
7. **Monitor thread connections** and adjust thread cache
8. **Regular maintenance** improves overall performance
9. **Use flush-logs** strategically to rotate log files
10. **Consider mysqladmin for automation** over GUI tools in production

The `mysqladmin` command is an essential tool for MySQL database administration, providing comprehensive server management capabilities from the command line. Its versatility in monitoring, maintenance, and emergency management makes it indispensable for database administrators managing MySQL servers in production environments.