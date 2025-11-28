---
title: mysqlimport - MySQL Data Import Utility
sidebar_label: mysqlimport
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mysqlimport - MySQL Data Import Utility

The `mysqlimport` command is a powerful client utility that imports data from text files into MySQL database tables. It serves as a command-line interface to the `LOAD DATA INFILE` SQL statement, providing efficient bulk data import capabilities. mysqlimport automatically determines the target table name from the filename (stripping extensions) and supports various file formats, field delimiters, line terminators, and character encoding options. It's particularly useful for database migrations, data warehousing, bulk data loading operations, and ETL (Extract, Transform, Load) processes.

## Basic Syntax

```bash
mysqlimport [OPTIONS] database textfile...
```

## Common Connection Options

### Database Connection
- `-h, --host=HOST` - MySQL server hostname (default: localhost)
- `-P, --port=PORT` - MySQL server port number (default: 3306)
- `-u, --user=USER` - MySQL username (default: current user)
- `-p, --password[=PWD]` - Password for authentication
- `-S, --socket=SOCKET` - Socket file for local connections
- `--protocol=PROTO` - Connection protocol (TCP, SOCKET, PIPE, MEMORY)

### SSL and Security
- `--ssl` - Enable SSL connection
- `--ssl-ca=FILE` - CA certificate file
- `--ssl-cert=FILE` - Client certificate file
- `--ssl-key=FILE` - Client private key file
- `--ssl-cipher=CIPHER` - SSL cipher to use
- `--ssl-verify-server-cert` - Verify server certificate

## Import Format Options

### Field and Line Options
- `-f, --fields-terminated-by=STRING` - Field delimiter (default: tab)
- `--fields-enclosed-by=CHAR` - Field enclosing character
- `--fields-optionally-enclosed-by=CHAR` - Optional field enclosing character
- `--fields-escaped-by=CHAR` - Escape character for special characters
- `-L, --lines-terminated-by=STRING` - Line terminator (default: newline)
- `-C, --columns=LIST` - Comma-separated column list

### Data Processing Options
- `-d, --delete` - Delete existing data in table before import
- `-r, --replace` - Use REPLACE instead of INSERT
- `-i, --ignore` - Ignore duplicate rows with INSERT IGNORE
- `-l, --lock-tables` - Lock all tables for writing
- `--local` - Read files from client host
- `--low-priority` - Use LOW_PRIORITY when inserting
- `--force` - Continue even if SQL errors occur
- `--ignore-lines=N` - Skip first N lines of data file

## Character Set and Encoding
- `--default-character-set=SET` - Default character set
- `--character-sets-dir=DIR` - Character set directory

## Output and Behavior Options
- `-v, --verbose` - Verbose output showing program actions
- `-q, --quiet` - Silent mode (only errors)
- `-V, --version` - Display version information
- `-?, --help` - Display help message
- `--debug=DEBUG_INFO` - Debug information
- `--debug-check` - Check memory and open file usage

## Usage Examples

### Basic Import Operations

#### Simple Data Import
```bash
# Import data into database table
mysqlimport -u root -p mydatabase users.txt

# Import with specific password
mysqlimport -u admin -p"password" sales products.csv

# Import with verbose output
mysqlimport -v -u user -p database table_data.txt

# Import from remote server
mysqlimport -h db.example.com -u remote_user -p mydb imported_data.txt
```

#### Multiple File Import
```bash
# Import multiple files at once
mysqlimport -u root -p mydb users.txt orders.txt products.txt

# Import with different file formats
mysqlimport -u admin -p warehouse data1.csv data2.tsv data3.txt
```

### File Format Handling

#### CSV File Import
```bash
# Import CSV files with comma delimiter
mysqlimport -u root -p --fields-terminated-by=',' mydb sales_data.csv

# Import CSV with quoted fields
mysqlimport -u admin -p \
    --fields-terminated-by=',' \
    --fields-optionally-enclosed-by='"' \
    mydb contacts.csv

# Import Excel-style CSV with headers to skip
mysqlimport -u user -p \
    --ignore-lines=1 \
    --fields-terminated-by=',' \
    --fields-optionally-enclosed-by='"' \
    mydb spreadsheet_data.csv
```

#### Custom Delimiter Files
```bash
# Import pipe-delimited file
mysqlimport -u root -p --fields-terminated-by='|' mydb pipe_data.txt

# Import semicolon-delimited file
mysqlimport -u admin -p --fields-terminated-by=';' mydb european_data.csv

# Import tab-separated values
mysqlimport -u user -p --fields-terminated-by='\t' mydb tsv_data.txt
```

#### Special Format Processing
```bash
# Import file with custom line endings
mysqlimport -u root -p --lines-terminated-by='\r\n' mydb windows_format.txt

# Import file with escaped characters
mysqlimport -u admin -p --fields-escaped-by='\\' mydb escaped_data.txt

# Import file with specific column mapping
mysqlimport -u user -p --columns="id,name,email,age" mydb partial_data.txt
```

### Data Management Options

#### Replace Existing Data
```bash
# Clear table before importing
mysqlimport -u root -p -d mydb fresh_data.txt

# Use REPLACE for duplicate handling
mysqlimport -u admin -p -r mydb update_data.txt

# Ignore duplicate records
mysqlimport -u user -p -i mydb incremental_data.txt
```

#### Lock and Priority Options
```bash
# Import with table locking
mysqlimport -u root -p -l mydb critical_data.txt

# Import with low priority (non-blocking)
mysqlimport -u admin -p --low-priority mydb background_data.txt

# Force import despite errors
mysqlimport -u user -p --force mydb problematic_data.txt
```

### Local vs. Remote File Handling

#### Local File Import
```bash
# Import files from client machine
mysqlimport -u root -p --local mydb local_data.txt

# Import multiple local files
mysqlimport -u admin -p --local mydb file1.txt file2.txt file3.txt
```

#### Server File Import
```bash
# Import files from server (default)
mysqlimport -u root -p mydb /server/path/data.txt

# Import with absolute server path
mysqlimport -u admin -p mydb /var/lib/mysql-files/import_data.txt
```

## Practical Examples

### Database Migration

#### Bulk Data Migration
```bash
# Migrate user data from legacy system
mysqlimport -u migration_user -p"migrate_pass" \
    --fields-terminated-by='|' \
    --ignore-lines=1 \
    --verbose \
    production_db \
    legacy_users.txt

# Migrate product catalog
mysqlimport -u migrator -p \
    --fields-terminated-by=',' \
    --fields-optionally-enclosed-by='"' \
    --replace \
    ecommerce_db \
    products_import.csv \
    categories_import.csv \
    inventory_import.csv

# Migrate log data with custom formatting
mysqlimport -u admin -p \
    --fields-terminated-by='\t' \
    --lines-terminated-by='\n' \
    --ignore-lines=1 \
    --columns="timestamp,level,message,source" \
    analytics_db \
    server_logs.txt
```

#### Incremental Data Updates
```bash
# Daily data import with duplicate handling
mysqlimport -u etl_user -p"etl_pass" \
    --ignore \
    --fields-terminated-by=',' \
    warehouse_db \
    daily_sales_$(date +%Y%m%d).csv

# Hourly sensor data import
mysqlimport -u sensor_user -p \
    --replace \
    --local \
    --fields-terminated-by=';' \
    iot_db \
    sensor_readings.txt
```

### Data Warehousing

#### ETL Process Integration
```bash
# Stage raw data import
mysqlimport -u etl_user -p"etl_pass" \
    --fields-terminated-by='|' \
    --ignore-lines=1 \
    --verbose \
    datawarehouse \
    raw_transactions.txt

# Import processed dimension data
mysqlimport -u dw_user -p \
    --delete \
    --fields-terminated-by=',' \
    datawarehouse \
    dim_customers.csv \
    dim_products.csv

# Import fact table data
mysqlimport -u dw_loader -p"dw_pass" \
    --fields-terminated-by='\t' \
    --replace \
    --columns="date_key,product_key,customer_key,sales_amount,quantity" \
    datawarehouse \
    fact_sales.txt
```

#### Data Quality Validation
```bash
# Import with error checking
mysqlimport -u validator -p"valid_pass" \
    --verbose \
    --force \
    --fields-terminated-by=',' \
    --fields-optionally-enclosed-by='"' \
    test_db \
    validation_data.csv

# Dry run with syntax checking
mysqlimport -u test_user -p \
    --verbose \
    --fields-terminated-by=',' \
    --debug \
    staging_db \
    test_import.txt
```

### Performance Optimization

#### Large Dataset Imports
```bash
# Import with table locking for consistency
mysqlimport -u bulk_user -p"bulk_pass" \
    --lock-tables \
    --low-priority \
    --verbose \
    large_db \
    huge_dataset.txt

# Batch import of multiple large files
for file in data_*.txt; do
    mysqlimport -u admin -p \
        --local \
        --replace \
        --fields-terminated-by='|' \
        --ignore-lines=1 \
        production_db \
        "$file"
    echo "Imported $file"
done
```

#### Parallel Import Strategy
```bash
# Parallel import using background processes
(
    mysqlimport -u user1 -p"pass1" --local db1 table1_data.txt &
    mysqlimport -u user2 -p"pass2" --local db2 table2_data.txt &
    mysqlimport -u user3 -p"pass3" --local db3 table3_data.txt &
    wait
) && echo "All parallel imports completed"
```

## Advanced Usage

### Character Set and Encoding

#### Multi-language Data Import
```bash
# Import UTF-8 encoded data
mysqlimport -u admin -p \
    --default-character-set=utf8mb4 \
    --fields-terminated-by=',' \
    --fields-optionally-enclosed-by='"' \
    multilang_db \
    international_data.csv

# Import Latin-1 data
mysqlimport -u user -p \
    --default-character-set=latin1 \
    legacy_db \
    european_data.txt

# Import with custom character set directory
mysqlimport -u root -p \
    --default-character-set=cp1251 \
    --character-sets-dir=/usr/share/mysql/charsets/ \
    cyrillic_db \
    russian_data.txt
```

### Error Handling and Recovery

#### Robust Import Scripts
```bash
#!/bin/bash
# Robust import with error handling

DB_NAME="production_db"
DB_USER="import_user"
DB_PASS="import_pass"
DATA_FILE="critical_data.txt"

# Log file for tracking
LOG_FILE="import_$(date +%Y%m%d_%H%M%S).log"

# Import with comprehensive logging
mysqlimport -u "$DB_USER" -p"$DB_PASS" \
    --verbose \
    --force \
    --fields-terminated-by=',' \
    --ignore-lines=1 \
    "$DB_NAME" \
    "$DATA_FILE" 2>&1 | tee "$LOG_FILE"

# Check import status
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "Import successful. Log saved to $LOG_FILE"
else
    echo "Import failed. Check $LOG_FILE for details"
    exit 1
fi
```

#### Conditional Import Logic
```bash
#!/bin/bash
# Conditional import based on file existence and size

IMPORT_DIR="/data/import"
DB_NAME="warehouse"
DB_USER="etl_user"

for file in "$IMPORT_DIR"/*.csv; do
    if [ -f "$file" ] && [ -s "$file" ]; then
        echo "Processing $file..."

        # Skip header if exists
        if head -n 1 "$file" | grep -q "id\|ID\|Id"; then
            SKIP_OPTION="--ignore-lines=1"
        else
            SKIP_OPTION=""
        fi

        mysqlimport -u "$DB_USER" -p \
            --local \
            --verbose \
            --replace \
            --fields-terminated-by=',' \
            $SKIP_OPTION \
            "$DB_NAME" \
            "$file"
    fi
done
```

### Integration with Other Tools

#### Pipeline Integration
```bash
# Transform and import data in pipeline
cat raw_data.txt | \
    awk -F'|' '{print $1","$2","$3}' | \
    mysqlimport -u user -p \
        --local \
        --fields-terminated-by=',' \
        --verbose \
        mydb \
        /dev/stdin

# Export from one database and import to another
mysqldump -u source_user -p"source_pass" \
    --tab=/tmp/export/ \
    source_db \
    table_name

mysqlimport -u target_user -p"target_pass" \
    --local \
    --verbose \
    target_db \
    /tmp/export/table_name.txt
```

#### File Processing Integration
```bash
# Convert Excel CSV to MySQL-compatible format
sed 's/"//g' excel_export.csv > clean_data.csv

mysqlimport -u admin -p \
    --fields-terminated-by=',' \
    --replace \
    mydb \
    clean_data.csv

# Process multiple file formats
for ext in txt csv tsv; do
    case $ext in
        txt)
            delimiter=$'\t'
            ;;
        csv)
            delimiter=','
            ;;
        tsv)
            delimiter=$'\t'
            ;;
    esac

    mysqlimport -u user -p \
        --fields-terminated-by="$delimiter" \
        --local \
        mydb \
    *.$ext
done
```

## Integration and Automation

### Shell Scripts

#### Automated Daily Import
```bash
#!/bin/bash
# Daily automated data import script

# Configuration
DB_HOST="localhost"
DB_USER="daily_importer"
DB_PASS="daily_pass"
DB_NAME="daily_reports"
IMPORT_DIR="/daily/data"
LOG_DIR="/daily/logs"
DATE=$(date +%Y%m%d)

# Create log directory
mkdir -p "$LOG_DIR"

# Function to import file with error handling
import_file() {
    local file=$1
    local table=$2
    local log_file="$LOG_DIR/import_${DATE}_${table}.log"

    echo "Importing $file to table $table..." | tee "$log_file"

    mysqlimport -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" \
        --verbose \
        --replace \
        --fields-terminated-by=',' \
        --ignore-lines=1 \
        --local \
        "$DB_NAME" \
        "$file" 2>&1 | tee -a "$log_file"

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        echo "Successfully imported $file" | tee -a "$log_file"
        # Archive imported file
        mv "$file" "$IMPORT_DIR/archive/"
    else
        echo "Failed to import $file" | tee -a "$log_file"
        # Send notification on failure
        echo "Import failed for $file" | mail -s "Import Failure" admin@company.com
    fi
}

# Process daily files
import_file "$IMPORT_DIR/sales_$DATE.csv" "sales"
import_file "$IMPORT_DIR/customers_$DATE.csv" "customers"
import_file "$IMPORT_DIR/products_$DATE.csv" "products"

echo "Daily import process completed for $DATE"
```

#### Multi-environment Import Script
```bash
#!/bin/bash
# Multi-environment import script

# Environment configurations
declare -A ENV_CONFIGS=(
    ["dev"]="localhost dev_user dev_pass dev_db"
    ["staging"]="staging.company.com staging_user staging_pass staging_db"
    ["prod"]="prod.company.com prod_user prod_pass prod_db"
)

# Function to import to specific environment
import_to_env() {
    local env=$1
    local file=$2

    read -r host user pass db <<< "${ENV_CONFIGS[$env]}"

    echo "Importing to $env environment..."

    mysqlimport -h "$host" -u "$user" -p"$pass" \
        --verbose \
        --replace \
        --fields-terminated-by=',' \
        --local \
        "$db" \
        "$file"
}

# Usage examples
if [ "$1" = "dev" ]; then
    import_to_env "dev" "$2"
elif [ "$1" = "staging" ]; then
    import_to_env "staging" "$2"
elif [ "$1" = "prod" ]; then
    read -p "Are you sure you want to import to production? (yes/no): " confirm
    if [ "$confirm" = "yes" ]; then
        import_to_env "prod" "$2"
    else
        echo "Production import cancelled"
        exit 1
    fi
else
    echo "Usage: $0 {dev|staging|prod} <filename>"
    exit 1
fi
```

### CRON Job Integration
```bash
# Add to crontab for automated imports
# Edit crontab: crontab -e

# Daily import at 2 AM
0 2 * * * /home/user/scripts/daily_import.sh

# Hourly import of sensor data
0 * * * * /home/user/scripts/sensor_import.sh

# Weekly data warehouse update
0 3 * * 0 /home/user/scripts/weekly_etl_import.sh
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Test connection before import
mysql -u test_user -p"test_pass" -h db.server.com test_db

# Check if server is accepting connections
telnet db.server.com 3306

# Test with different protocols
mysqlimport -u user -p --protocol=TCP db_name file.txt
mysqlimport -u user -p --protocol=SOCKET db_name file.txt
```

#### File Access Issues
```bash
# Check file permissions
ls -la data_file.txt

# Test local file import
mysqlimport -u user -p --local db_name ./data_file.txt

# Check MySQL secure_file_priv
mysql -u root -p -e "SHOW VARIABLES LIKE 'secure_file_priv';"
```

#### Character Encoding Problems
```bash
# Check file encoding
file -i data_file.txt
chardet data_file.txt

# Convert file encoding
iconv -f ISO-8859-1 -t UTF-8 data_file.txt > utf8_data.txt

# Import with explicit character set
mysqlimport -u user -p --default-character-set=utf8mb4 db_name data_file.txt
```

#### Data Format Issues
```bash
# Validate CSV format
head -n 5 data_file.txt

# Check for special characters
cat data_file.txt | od -c | head

# Test with different delimiters
mysqlimport -u user -p --fields-terminated-by='|' db_name data_file.txt
mysqlimport -u user -p --fields-terminated-by='\t' db_name data_file.txt
```

### Performance Issues

#### Slow Import Performance
```bash
# Use low priority to reduce server load
mysqlimport -u user -p --low-priority db_name large_file.txt

# Lock tables for faster import
mysqlimport -u user -p --lock-tables db_name large_file.txt

# Import in smaller batches
split -l 10000 large_file.txt batch_
for batch in batch_*; do
    mysqlimport -u user -p db_name "$batch"
done
```

#### Memory Issues
```bash
# Monitor import progress
mysqlimport -u user -p --verbose db_name data_file.txt | tee import.log

# Import with minimal output
mysqlimport -u user -p --quiet db_name huge_file.txt

# Use streaming for very large files
tail -f growing_file.txt | mysqlimport -u user -p --local db_name /dev/stdin
```

## Related Commands

- [`mysql`](/docs/commands/development/mysql) - MySQL client program
- [`mysqladmin`](/docs/commands/development/mysqladmin) - MySQL administration utility
- [`mysqldump`](/docs/commands/development/mysqldump) - MySQL database backup utility
- [`mysqlshow`](/docs/commands/development/mysqlshow) - MySQL database information utility
- [`LOAD DATA INFILE`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) - SQL statement for bulk data loading

## Best Practices

1. **Always test imports** on a staging environment before production
2. **Use appropriate file formats** (CSV with proper quoting for complex data)
3. **Specify explicit character sets** when working with non-UTF-8 data
4. **Use table locking** for consistent imports on busy systems
5. **Implement error handling** in automated import scripts
6. **Validate data format** before large imports
7. **Monitor import performance** and optimize batch sizes
8. **Secure sensitive data** with SSL connections for remote imports
9. **Document import procedures** including field mappings and transformations
10. **Backup target tables** before using delete or replace options

## Performance Tips

1. **Use `--local`** for files on the client machine to avoid server file permission issues
2. **Enable `--lock-tables`** for better performance on large imports
3. **Use `--low-priority`** to minimize impact on production queries
4. **Process in smaller batches** for very large datasets
5. **Optimize file format** with consistent delimiters and proper escaping
6. **Disable indexes** during import for very large tables (manually)
7. **Use appropriate buffer sizes** in MySQL configuration for bulk imports
8. **Consider parallel imports** for independent tables with multiple connections

The `mysqlimport` command is an essential tool for MySQL database administrators and developers, providing efficient bulk data import capabilities with comprehensive format handling, error management, and performance optimization features. Its integration with MySQL's `LOAD DATA INFILE` functionality makes it ideal for data migration, ETL processes, and bulk data loading scenarios.