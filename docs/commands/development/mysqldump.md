---
title: mysqldump - MySQL Database Backup Utility
sidebar_label: mysqldump
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mysqldump - MySQL Database Backup Utility

The `mysqldump` command is a powerful database backup utility that creates logical backups of MySQL databases. It generates SQL statements that can recreate the database schema and data, making it essential for database migration, backup strategies, and disaster recovery. mysqldump supports various backup formats, including complete database dumps, table-specific backups, and conditional data extraction, with options for compression, encryption, and performance optimization.

## Basic Syntax

```bash
mysqldump [OPTIONS] [database_name [table_name ...]]
mysqldump [OPTIONS] --all-databases
mysqldump [OPTIONS] --databases [database_name ...]
```

## Common Connection Options

### Database Connection
- `-h, --host=HOST_NAME` - Connect to MySQL server on specified host
- `-u, --user=USER_NAME` - MySQL username for authentication
- `-p, --password[=PASSWORD]` - Password for MySQL authentication
- `-P, --port=PORT_NUM` - Port number to use for connection
- `-S, --socket=SOCKET` - Socket file to use for local connection
- `--protocol=PROTOCOL` - Connection protocol (TCP, SOCKET, PIPE, MEMORY)

### Authentication Options
- `--default-auth=PLUGIN` - Default authentication client-side plugin
- `--enable-cleartext-plugin` - Enable/disable the cleartext authentication plugin
- `--get-server-public-key` - Get RSA public key from server
- `--server-public-key-path=PATH` - Path to file containing RSA public key

## Backup Options

### Database Selection
- `--all-databases, -A` - Dump all databases
- `--databases, -B` - Dump several databases
- `--ignore-table=DB.TABLE` - Don't dump specified table
- `--tables` - Override option --databases

### Output Format
- `--add-drop-database` - Add DROP DATABASE before CREATE DATABASE
- `--add-drop-table` - Add DROP TABLE before CREATE TABLE
- `--add-drop-trigger` - Add DROP TRIGGER before CREATE TRIGGER
- `--create-options` - Include all MySQL-specific create options
- `--no-create-db, -n` - Suppress CREATE DATABASE statements
- `--no-create-info, -t` - Don't write table creation info
- `--no-data, -d` - Don't dump table contents
- `--replace` - Use REPLACE INTO statements instead of INSERT INTO

### Data Handling
- `--compact` - Produce less verbose output
- `--complete-insert, -c` - Use complete INSERT statements
- `--extended-insert, -e` - Use multiple-row INSERT syntax
- `--insert-ignore` - Insert rows with INSERT IGNORE
- `--quick, -q` - Don't buffer query, dump directly to stdout
- `--skip-extended-insert` - Disable extended-insert
- `--skip-opt` - Disable --opt option
- `--opt` - Shorthand for --add-drop-table --add-locks --create-options --disable-keys --extended-insert --lock-tables --quick --set-charset

## Locking and Transaction Options

### Table Locking
- `--lock-all-tables, -x` - Lock all tables across all databases
- `--lock-tables, -l` - Lock all tables before dump
- `--skip-add-locks` - Don't add locks around INSERT statements
- `--skip-lock-tables` - Skip locking tables

### Transaction Options
- `--single-transaction` - Create a consistent snapshot using transactions
- `--skip-disable-keys` - Don't disable keys during INSERT
- `--disable-keys` - Disable keys during INSERT

## Character Set and Encoding

- `--default-character-set=CHARSET` - Set default character set
- `--no-set-names, -N` - Don't set character set
- `--set-charset` - Add 'SET NAMES default_character_set' to output

## Filtering and Selection

### Conditional Dumping
- `--where=WHERE_CLAUSE` - Dump only selected records
- `--tables` - Override --databases option

### Exclusion Options
- `--ignore-table=DB.TABLE` - Don't dump specified table
- `--skip-triggers` - Don't dump triggers
- `--skip-events` - Don't dump events

## Performance and Resource Options

- `--compress, -C` - Use compression in server/client protocol
- `--compress-output=ALGORITHM` - Compress output with specified algorithm
- `--max_allowed_packet=MAX` - Maximum packet length to send to/receive from server
- `--net_buffer_length=SIZE` - Buffer size for TCP/IP and socket communication

## Usage Examples

### Basic Database Operations

#### Complete Database Backup
```bash
# Backup single database
mysqldump -u username -p database_name > backup.sql

# Backup with specific host
mysqldump -h localhost -u username -p database_name > backup.sql

# Backup all databases
mysqldump -u username -p --all-databases > full_backup.sql

# Backup multiple databases
mysqldump -u username -p --databases db1 db2 db3 > multi_db_backup.sql

# Compressed backup
mysqldump -u username -p database_name | gzip > backup.sql.gz

# Backup to timestamped file
mysqldump -u username -p database_name > backup_$(date +%Y%m%d_%H%M%S).sql
```

#### Table-Specific Operations
```bash
# Backup specific tables
mysqldump -u username -p database_name table1 table2 > tables_backup.sql

# Backup table structure only (no data)
mysqldump -u username -p --no-data database_name > structure.sql

# Backup table data only (no structure)
mysqldump -u username -p --no-create-info database_name > data.sql

# Backup table structure with data
mysqldump -u username -p database_name table_name > table_backup.sql

# Skip specific tables from backup
mysqldump -u username -p --ignore-table=database_name.unwanted_table database_name > backup.sql
```

### Advanced Backup Strategies

#### Transactional Consistent Backup
```bash
# Use single transaction for InnoDB tables (recommended)
mysqldump -u username -p --single-transaction --routines --triggers database_name > consistent_backup.sql

# Complete backup with routines, triggers, and events
mysqldump -u username -p --single-transaction --routines --triggers --events --all-databases > complete_backup.sql

# Backup with extended insert for better performance
mysqldump -u username -p --extended-insert --quick database_name > optimized_backup.sql

# Quick backup without buffering (good for large databases)
mysqldump -u username -p --quick database_name > large_db_backup.sql
```

#### Production Backup with Locking
```bash
# Lock tables during backup for MyISAM
mysqldump -u username -p --lock-all-tables --all-databases > locked_backup.sql

# Use optimize options for best performance
mysqldump -u username -p --opt --routines --triggers database_name > optimized_backup.sql

# Backup with complete insert statements
mysqldump -u username -p --complete-insert --add-drop-table database_name > detailed_backup.sql
```

### Conditional and Selective Backups

#### Conditional Data Export
```bash
# Backup specific records with WHERE clause
mysqldump -u username -p --where="id > 1000" database_name table_name > partial_data.sql

# Backup recent records (example: last 30 days)
mysqldump -u username -p --where="created_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)" database_name table_name > recent_data.sql

# Backup records matching specific criteria
mysqldump -u username -p --where="status='active'" database_name users > active_users.sql
```

#### Schema and Data Separation
```bash
# Backup only database structure
mysqldump -u username -p --no-data --routines --triggers database_name > schema.sql

# Backup only data without structure
mysqldump -u username -p --no-create-info database_name > data_only.sql

# Backup structure and data in separate files
mysqldump -u username -p --no-data database_name > schema.sql
mysqldump -u username -p --no-create-info database_name > data.sql
```

## Practical Examples

### Database Administration

#### Automated Backup Script
```bash
#!/bin/bash
# Automated MySQL backup script

DB_USER="backup_user"
DB_PASS="secure_password"
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup all databases with compression
mysqldump -u "$DB_USER" -p"$DB_PASS" \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    --all-databases \
    --compress \
    | gzip > "$BACKUP_DIR/full_backup_$DATE.sql.gz"

# Backup individual databases
for db in $(mysql -u "$DB_USER" -p"$DB_PASS" -e "SHOW DATABASES;" | grep -v "Database\|information_schema\|performance_schema\|mysql\|sys"); do
    mysqldump -u "$DB_USER" -p"$DB_PASS" \
        --single-transaction \
        --routines \
        --triggers \
        "$db" \
        | gzip > "$BACKUP_DIR/db_${db}_$DATE.sql.gz"
done

# Remove old backups
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: full_backup_$DATE.sql.gz"
```

#### Incremental Backup Strategy
```bash
#!/bin/bash
# Incremental backup using binary logs

DB_USER="root"
DB_PASS="password"
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S")

# Get current binary log position
MASTER_STATUS=$(mysql -u "$DB_USER" -p"$DB_PASS" -e "SHOW MASTER STATUS\G")
BINLOG_FILE=$(echo "$MASTER_STATUS" | grep "File:" | awk '{print $2}')
BINLOG_POSITION=$(echo "$MASTER_STATUS" | grep "Position:" | awk '{print $2}')

# Create full backup
mysqldump -u "$DB_USER" -p"$DB_PASS" \
    --single-transaction \
    --master-data=2 \
    --all-databases \
    --routines \
    --triggers \
    --events \
    > "$BACKUP_DIR/full_backup_$DATE.sql"

# Save binary log position for incremental backup
echo "$BINLOG_FILE:$BINLOG_POSITION" > "$BACKUP_DIR/binlog_position_$DATE.txt"

echo "Full backup completed. Binary log: $BINLOG_FILE, Position: $BINLOG_POSITION"
```

### Database Migration

#### Cross-Server Migration
```bash
# Export from source server
mysqldump -h source_server -u source_user -p \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    --opt \
    --all-databases \
    | gzip > migration_backup.sql.gz

# Import to destination server
gunzip -c migration_backup.sql.gz | \
    mysql -h destination_server -u dest_user -p

# For large databases, transfer directly
mysqldump -h source_server -u source_user -p \
    --single-transaction \
    --quick \
    --compress \
    database_name | \
    mysql -h destination_server -u dest_user -p database_name
```

#### Schema Only Migration
```bash
# Export schema without data
mysqldump -u username -p \
    --no-data \
    --routines \
    --triggers \
    --events \
    --add-drop-database \
    --all-databases \
    > schema_migration.sql

# Import schema to new server
mysql -u username -p < schema_migration.sql
```

### Development and Testing

#### Development Environment Setup
```bash
# Export production data for development
mysqldump -u prod_user -p \
    --single-transaction \
    --no-create-info \
    --where="created_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)" \
    production_db \
    | mysql -u dev_user -p development_db

# Export anonymized data (example with user data)
mysqldump -u username -p \
    --single-transaction \
    --replace \
    production_db users \
    --where="email NOT LIKE '%@company.com'" \
    | sed 's/@[^.]*\./@example./g' \
    > anonymized_users.sql
```

#### Testing Data Generation
```bash
# Create template for testing
mysqldump -u username -p \
    --no-data \
    --routines \
    --triggers \
    database_name \
    > test_schema.sql

# Export small sample of data
mysqldump -u username -p \
    --single-transaction \
    --where="1=1 LIMIT 1000" \
    database_name table_name \
    > sample_data.sql
```

## Advanced Usage

### Performance Optimization

#### Large Database Handling
```bash
# Backup large database with memory optimization
mysqldump -u username -p \
    --quick \
    --single-transaction \
    --max_allowed_packet=512M \
    --net_buffer_length=16384 \
    large_database \
    > large_db_backup.sql

# Backup with specific character set to avoid encoding issues
mysqldump -u username -p \
    --default-character-set=utf8mb4 \
    --single-transaction \
    database_name \
    > utf8mb4_backup.sql

# Multi-threaded backup (using external tools)
mysqldump -u username -p --single-transaction database_name | \
    pigz -p 8 > parallel_backup.sql.gz
```

#### Network Optimization
```bash
# Remote backup with compression
mysqldump -h remote_server -u username -p \
    --compress \
    --single-transaction \
    --quick \
    database_name \
    | gzip > remote_backup.sql.gz

# Backup over slow network
mysqldump -h remote_server -u username -p \
    --compress \
    --net_buffer_length=4096 \
    --single-transaction \
    database_name \
    > slow_network_backup.sql
```

### Security and Encryption

#### Encrypted Backup
```bash
# Create encrypted backup with GPG
mysqldump -u username -p database_name | \
    gpg --symmetric --cipher-algo AES256 --compress-algo 1 \
    --output backup.sql.gpg

# Decrypt backup for restoration
gpg --decrypt backup.sql.gpg | mysql -u username -p database_name

# Backup with OpenSSL encryption
mysqldump -u username -p database_name | \
    openssl enc -aes-256-cbc -salt -out backup.sql.enc

# Decrypt OpenSSL encrypted backup
openssl enc -aes-256-cbc -d -in backup.sql.enc | \
    mysql -u username -p database_name
```

#### Secure Connection Backup
```bash
# Backup using SSL connection
mysqldump -u username -p \
    --ssl-ca=/path/to/ca.pem \
    --ssl-cert=/path/to/client-cert.pem \
    --ssl-key=/path/to/client-key.pem \
    database_name \
    > ssl_backup.sql

# Backup with SSL verification
mysqldump -u username -p \
    --ssl-mode=REQUIRED \
    --ssl-ca=/path/to/ca.pem \
    database_name \
    > secure_backup.sql
```

## Troubleshooting

### Common Issues

#### Memory and Performance Issues
```bash
# Out of memory errors - use quick option
mysqldump -u username -p --quick database_name > backup.sql

# Large packet errors - increase max_allowed_packet
mysqldump -u username -p --max_allowed_packet=1G database_name > backup.sql

# Slow backups - disable unnecessary options
mysqldump -u username -p --skip-extended-insert database_name > fast_backup.sql

# Connection timeouts during large backups
mysqldump -u username -p --net_buffer_length=8192 --quick database_name > backup.sql
```

#### Character Encoding Issues
```bash
# Fix character set encoding issues
mysqldump -u username -p \
    --default-character-set=utf8mb4 \
    --set-charset \
    database_name \
    > utf8_backup.sql

# Dump with specific collation
mysqldump -u username -p \
    --default-character-set=utf8 \
    database_name \
    | iconv -f UTF-8 -t UTF-8//IGNORE > cleaned_backup.sql
```

#### Lock and Timeout Issues
```bash
# Avoid locking issues with single transaction
mysqldump -u username -p \
    --single-transaction \
    --skip-lock-tables \
    database_name \
    > no_lock_backup.sql

# Handle timeout errors
mysqldump -u username -p \
    --single-transaction \
    --quick \
    --net_buffer_length=4096 \
    database_name \
    > timeout_safe_backup.sql
```

## Integration and Automation

### Cron Job Backup
```bash
# Add to crontab for daily backup at 2 AM
0 2 * * * /usr/local/scripts/mysql_backup.sh

# Weekly full backup with daily incrementals
0 3 * * 0 /usr/local/scripts/mysql_full_backup.sh
0 2 * * 1-6 /usr/local/scripts/mysql_incremental_backup.sh
```

### Monitoring and Logging
```bash
# Backup with logging
mysqldump -u username -p database_name 2>&1 | \
    tee >(gzip > backup.sql.gz) >(grep -v "Warning" > backup.log)

# Email notification after backup
mysqldump -u username -p database_name | gzip > backup.sql.gz && \
    echo "Database backup completed successfully" | \
    mail -s "MySQL Backup Success" admin@company.com
```

## Related Commands

- [`mysql`](/docs/commands/development/mysql) - MySQL command-line client
- [`mysqladmin`](/docs/commands/development/mysqladmin) - MySQL administration utility
- [`mysqlimport`](/docs/commands/development/mysqlimport) - MySQL data import utility
- [`mysqlshow`](/docs/commands/development/mysqlshow) - MySQL database information utility
- [`mysqlcheck`](/docs/commands/development/mysqlcheck) - MySQL table maintenance utility
- [`mysqlslap`](/docs/commands/development/mysqlslap) - MySQL load emulation client
- [`mysql_config_editor`](/docs/commands/development/mysql_config_editor) - MySQL configuration utility
- [`myisamchk`](/docs/commands/development/myisamchk) - MyISAM table maintenance utility
- [`myisampack`](/docs/commands/development/myisampack) - MyISAM table compression utility
- [`myisamlog`](/docs/commands/development/myisamlog) - MyISAM log file utility

## Best Practices

1. **Use --single-transaction** for InnoDB databases to get consistent backups without locking
2. **Compress backups** using gzip or pigz for storage efficiency
3. **Test backup files** regularly by restoring to a test environment
4. **Store backups securely** with encryption and proper access controls
5. **Use --routines, --triggers, --events** for complete database backup
6. **Implement retention policies** to manage storage costs
7. **Monitor backup success** with automated notifications
8. **Document recovery procedures** and test them regularly
9. **Use appropriate character sets** to avoid encoding issues
10. **Schedule backups during low-traffic periods** to minimize impact

## Performance Tips

1. **Extended inserts** (--extended-insert) significantly improve import performance
2. **Quick mode** (--quick) reduces memory usage for large databases
3. **Compression** (--compress) reduces network bandwidth for remote backups
4. **Single transaction** provides consistent snapshots without table locking
5. **Disable keys** (--disable-keys) speeds up data loading for MyISAM tables
6. **Multi-threaded compression** with pigz can speed up large backup creation
7. **Network buffer tuning** improves performance over slow connections
8. **Skip unnecessary options** like comments and stats for production backups
9. **Use --opt** for balanced performance and compatibility
10. **Monitor system resources** during large backup operations

The `mysqldump` command is an essential tool for MySQL database administrators, providing reliable backup and migration capabilities. Its extensive options support various backup strategies from simple table exports to complex multi-database migrations, making it a cornerstone of MySQL database maintenance and disaster recovery procedures.