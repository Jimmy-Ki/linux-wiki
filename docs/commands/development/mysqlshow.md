---
title: mysqlshow - Show database, table, and column information
sidebar_label: mysqlshow
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mysqlshow - Show database, table, and column information

The `mysqlshow` command is a MySQL client utility that displays the structure of databases, tables, and columns. It provides a quick way to examine database schemas without needing to connect to the MySQL shell and run SQL queries. The tool supports various output formats and filtering options, making it invaluable for database administrators, developers, and system administrators who need to quickly inspect database structures, verify table existence, or generate documentation.

## Basic Syntax

```bash
mysqlshow [OPTIONS] [database_name [table_name [column_name]]]
```

## Connection Options

### Authentication Options
- `-u, --user=NAME` - Specify MySQL username
- `-p, --password[=NAME]` - Specify password (prompt if not provided)
- `-h, --host=HOST` - Connect to MySQL server on specified host
- `-P, --port=PORT` - Specify port number (default: 3306)
- `-S, --socket=SOCKET` - Use specified socket file for local connections
- `--protocol=TYPE` - Connection protocol (TCP, SOCKET, PIPE, MEMORY)

### SSL/TLS Options
- `--ssl` - Enable SSL connection
- `--ssl-ca=FILE` - CA certificate file
- `--ssl-cert=FILE` - Client certificate file
- `--ssl-key=FILE` - Client private key file
- `--ssl-cipher=CIPHER` - SSL cipher to use

## Display Options

### Output Format
- `--count` - Show number of rows for each table
- `--status` - Show table status information
- `-k, --keys` - Show table indexes
- `-i, --status` - Show extra status information
- `-t, --table` - Display output in table format
- `-v, --verbose` - Verbose output (can be used multiple times)

### Information Display
- `--debug-info` - Print debug information
- `--help` - Display help message and exit
- `--version` - Display version information and exit

### Behavior Options
- `--compress` - Use compression in client/server protocol
- `--default-character-set=NAME` - Set default character set
- `--pager[=COMMAND]` - Use pager for output
- `--no-auto-rehash` - Disable automatic rehashing
- `--auto-rehash` - Enable automatic rehashing (default)

## Usage Examples

### Basic Database Information

#### Listing Databases
```bash
# List all databases on server
mysqlshow

# List databases with specific user
mysqlshow -u root -p

# Connect to remote server and list databases
mysqlshow -h db.example.com -u admin -p

# List databases with verbose output
mysqlshow -v

# List databases with table counts
mysqlshow --count
```

#### Database Structure
```bash
# Show all tables in a specific database
mysqlshow myapp_database

# Show table structure with row counts
mysqlshow --count myapp_database

# Show detailed table status
mysqlshow --status myapp_database

# Show table indexes
mysqlshow --keys myapp_database

# Verbose table information
mysqlshow -v myapp_database
```

### Table Information

#### Table Structure Display
```bash
# Show all columns in a table
mysqlshow myapp_database users

# Show table structure with row count
mysqlshow --count myapp_database users

# Show table status and information
mysqlshow --status myapp_database users

# Show table with indexes
mysqlshow --keys myapp_database users

# Verbose column information
mysqlshow -v myapp_database users
```

#### Column Details
```bash
# Show specific column information
mysqlshow myapp_database users email

# Show column with status information
mysqlshow --status myapp_database users email

# Show column with keys information
mysqlshow --keys myapp_database users email
```

## Practical Examples

### Database Administration

#### Database Inventory
```bash
# Complete database inventory
mysqlshow --count --status

# Database inventory with specific user
mysqlshow -u dbadmin -p --count

# Remote database inventory
mysqlshow -h production-db.company.com -u readonly -p --count --status

# Detailed table analysis
mysqlshow --status --verbose production_db

# Quick database overview
mysqlshow --count --verbose
```

#### Schema Documentation
```bash
# Generate table list for documentation
mysqlshow myapp_db > table_list.txt

# Generate complete schema overview
mysqlshow --count --status myapp_db > schema_overview.txt

# Export table structures
mysqlshow --keys myapp_db > table_indexes.txt

# Create column inventory
mysqlshow myapp_db users > users_columns.txt
```

### Development Workflow

#### Database Exploration
```bash
# Quick database check during development
mysqlshow dev_db

# Verify table existence
mysqlshow myapp_db user_profiles

# Check table structure
mysqlshow myapp_db user_profiles

# Verify column exists
mysqlshow myapp_db user_profiles avatar_url

# Check table sizes
mysqlshow --count myapp_db
```

#### Debugging and Validation
```bash
# Validate database connection
mysqlshow -u testuser -p'testpass' testdb

# Check table status for optimization
mysqlshow --status myapp_db

# Verify new table creation
mysqlshow myapp_db new_table

# Check table row counts
mysqlshow --count myapp_db

# Detailed table information for debugging
mysqlshow --verbose --status myapp_db problematic_table
```

### Database Maintenance

#### Quick Health Checks
```bash
# Quick database health check
mysqlshow --count --status

# Check specific database health
mysqlshow --status critical_db

# Monitor table sizes
mysqlshow --count large_database

# Check table indexes
mysqlshow --keys myapp_db

# Verify all databases accessible
mysqlshow -u dbchecker -p
```

#### Migration and Backup Preparation
```bash
# Inventory before migration
mysqlshow --count --status > pre_migration_inventory.txt

# Document source database structure
mysqlshow --keys --status source_db > source_structure.txt

# Verify target database setup
mysqlshow target_db

# Compare table counts before/after
mysqlshow --count myapp_db > table_counts_after.txt
```

## Advanced Usage

### Connection Management

#### Secure Connections
```bash
# Connect with SSL
mysqlshow --ssl -u secure_user -p secure_db

# Connect with specific SSL options
mysqlshow --ssl-ca=/path/to/ca.pem --ssl-cert=/path/to/client.pem \
          --ssl-key=/path/to/client-key.pem -u ssl_user -p secure_db

# Connect using specific socket
mysqlshow -S /var/run/mysqld/mysqld.sock -u root -p

# Connect to non-standard port
mysqlshow -P 3307 -u admin -p custom_port_db
```

#### Authentication Methods
```bash
# Connect with specific user and host
mysqlshow -u webapp_user -h localhost webapp_db

# Connect without password prompt (for scripts)
mysqlshow -u readonly -p'secretpassword' inventory_db

# Use pager for large outputs
mysqlshow --pager='less -S' large_database
```

### Output Formatting and Analysis

#### Custom Output Formats
```bash
# Table format output
mysqlshow --table myapp_db

# Verbose output with detailed information
mysqlshow -vv --status myapp_db

# Output compression for large databases
mysqlshow --compress large_database

# Status information with table details
mysqlshow --status --verbose myapp_db
```

#### Data Analysis
```bash
# Analyze table sizes
mysqlshow --count --status | sort -k5 -n

# Filter large tables
mysqlshow --count myapp_db | awk '$5 > 10000 {print $2, $5}'

# Check table engines
mysqlshow --status myapp_db | grep -E "(Engine|InnoDB|MyISAM)"

# Monitor row counts
mysqlshow --count monitoring_db | tail -n +2
```

### Script Integration

#### Automated Checks
```bash
#!/bin/bash
# Database availability check
DB_NAME="production_db"
TABLE_CHECK="users"

if mysqlshow $DB_NAME $TABLE_CHECK >/dev/null 2>&1; then
    echo "Database and table accessible"
else
    echo "Database or table not accessible"
    exit 1
fi
```

#### Monitoring Script
```bash
#!/bin/bash
# Table size monitoring
DATABASE="myapp_db"
DATE=$(date +%Y%m%d_%H%M%S)

mysqlshow --count $DATABASE > /var/log/db_monitor/${DATABASE}_${DATE}.txt

# Alert if table count exceeds threshold
for table in $(mysqlshow --count $DATABASE | awk 'NR>2 && $5!="" {print $2}'); do
    count=$(mysqlshow --count $DATABASE $table | awk 'NR>3 {print $5}')
    if [ "$count" -gt 100000 ]; then
        echo "ALERT: Table $table has $count rows"
    fi
done
```

## Performance Considerations

### Large Database Handling
```bash
# Use compression for large databases
mysqlshow --compress large_database

# Limit output for very large databases
mysqlshow large_database | head -50

# Use specific connection for better performance
mysqlshow -h db-server.internal -u readonly -p huge_db

# Query specific tables instead of entire database
mysqlshow myapp_db specific_large_table
```

### Resource Optimization
```bash
# Minimize server load
mysqlshow --status --quiet maintenance_db

# Use read-only user for checks
mysqlshow -u monitoring_user -p production_db

# Batch multiple checks efficiently
for db in $(mysqlshow | awk 'NR>2 && $1!="" {print $1}'); do
    echo "Checking $db..."
    mysqlshow --count $db
done
```

## Troubleshooting

### Connection Issues

#### Authentication Problems
```bash
# Test connection without database specification
mysqlshow -u testuser -p

# Check if user has privileges
mysqlshow -u user -p --help

# Try different authentication methods
mysqlshow -u user -p --default-character-set=utf8 test_db

# Check server connectivity
mysqlshow -h localhost -u root -p
```

#### Connection Timeouts
```bash
# Increase timeout with compression
mysqlshow --compress --connect-timeout=60 slow_db

# Test with different protocols
mysqlshow --protocol=TCP -u user -p test_db

# Check socket connection
mysqlshow -S /tmp/mysql.sock -u root -p
```

### Permission Issues

#### Access Denied
```bash
# Test with different user
mysqlshow -u another_user -p test_db

# Check database-specific permissions
mysqlshow -u user -p specific_db

# Verify user exists
mysqlshow -u user --help

# Test with root user
mysqlshow -u root -p
```

#### Insufficient Privileges
```bash
# Check what databases user can access
mysqlshow -u limited_user -p

# Test read-only access
mysqlshow -u readonly -p database_name

# Verify table-level permissions
mysqlshow -u user -p database_name table_name
```

### Output Issues

#### Garbled Output
```bash
# Force specific character set
mysqlshow --default-character-set=utf8 database_name

# Use table format for better readability
mysqlshow --table database_name

# Try verbose mode for more details
mysqlshow -v database_name
```

#### Missing Information
```bash
# Show all available information
mysqlshow --status --keys --verbose database_name

# Check table status specifically
mysqlshow --status database_name table_name

# Verify table exists
mysqlshow database_name table_name
```

## Integration and Automation

### Shell Scripting

#### Database Health Monitor
```bash
#!/bin/bash
# MySQL Database Health Monitor

LOG_FILE="/var/log/mysql_health.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Check database connectivity
check_database() {
    local db=$1
    echo "[$DATE] Checking database: $db" >> $LOG_FILE

    if mysqlshow --count "$db" >> $LOG_FILE 2>&1; then
        echo "[$DATE] Database $db: OK" >> $LOG_FILE
        return 0
    else
        echo "[$DATE] Database $db: FAILED" >> $LOG_FILE
        return 1
    fi
}

# Check all databases
DATABASES=$(mysqlshow | awk 'NR>2 && $1!="" {print $1}')

for db in $DATABASES; do
    check_database "$db"
done

echo "[$DATE] Health check completed" >> $LOG_FILE
```

#### Table Size Alert
```bash
#!/bin/bash
# Table Size Monitoring Alert

THRESHOLD=100000  # Alert if table has more than 100k rows
ADMIN_EMAIL="admin@company.com"

check_table_sizes() {
    local db=$1
    echo "Checking table sizes in $db..."

    mysqlshow --count "$db" | while read line; do
        # Parse table name and row count
        table=$(echo $line | awk '{print $2}')
        count=$(echo $line | awk '{print $5}')

        if [[ "$count" =~ ^[0-9]+$ ]] && [ "$count" -gt "$THRESHOLD" ]; then
            echo "ALERT: Table $table.$db has $count rows (threshold: $THRESHOLD)" | \
            mail -s "Large Table Alert" $ADMIN_EMAIL
        fi
    done
}

# Monitor production databases
check_table_sizes "production_db"
check_table_sizes "analytics_db"
```

### System Integration

#### Cron Job Monitoring
```bash
# Add to crontab for daily database checks
# 0 2 * * * /usr/local/bin/db_health_check.sh

# Hourly table size monitoring
# */30 * * * * /usr/local/bin/table_size_monitor.sh

# Weekly database inventory
# 0 3 * * 0 mysqlshow --count --status > /backups/db_inventory_$(date +\%Y\%m\%d).txt
```

#### Logrotate Integration
```bash
# Add to logrotate configuration
# /etc/logrotate.d/mysql_monitor
/var/log/mysql_health.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 mysql mysql
}
```

## Related Commands

- [`mysql`](/docs/commands/development/mysql) - MySQL command-line client
- [`mysqldump`](/docs/commands/development/mysqldump) - Database backup utility
- [`mysqladmin`](/docs/commands/development/mysqladmin) - MySQL administration utility
- [`mysqlimport`](/docs/commands/development/mysqlimport) - Data import utility
- [`mysqlcheck`](/docs/commands/development/mysqlcheck) - Table maintenance and repair
- [`mysqlbinlog`](/docs/commands/development/mysqlbinlog) - Binary log utility

## Best Practices

1. **Use read-only users** for routine checks to avoid accidental data modification
2. **Schedule regular monitoring** with cron jobs to track database health
3. **Document schemas** using `mysqlshow` output for team collaboration
4. **Monitor table growth** with `--count` option for capacity planning
5. **Use SSL connections** when querying databases over networks
6. **Store credentials securely** in configuration files, not command line
7. **Use specific queries** instead of full database listings when possible
8. **Implement timeout handling** for automated monitoring scripts
9. **Log output** for audit trails and troubleshooting
10. **Use compression** for large databases over network connections

## Performance Tips

1. **Use `--compress`** for network connections to reduce bandwidth
2. **Limit output** with specific table names instead of full database listings
3. **Use read-only users** to reduce server load during monitoring
4. **Batch operations** when checking multiple databases
5. **Cache results** for frequently accessed static information
6. **Use local socket connections** when possible for better performance
7. **Schedule intensive operations** during low-traffic periods
8. **Monitor execution time** to identify performance bottlenecks
9. **Use connection pooling** for frequent automated checks
10. **Consider indexing** large tables before frequent status checks

The `mysqlshow` command is an essential tool for MySQL database administration, providing quick access to database structure information without requiring SQL knowledge. Its flexible output options and connection capabilities make it ideal for both interactive use and automated monitoring systems, serving as a fundamental utility in any MySQL administrator's toolkit.