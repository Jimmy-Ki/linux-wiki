---
title: mysql - MySQL command-line client
sidebar_label: mysql
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mysql - MySQL Command-Line Client

The `mysql` command is a powerful SQL command-line client for interacting with MySQL and MariaDB database servers. It provides an interactive shell for executing SQL queries, managing database objects, performing administrative tasks, and automating database operations. The client supports both interactive mode and batch mode execution, making it essential for database administrators, developers, and system administrators who work with MySQL databases.

## Basic Syntax

```bash
mysql [OPTIONS] [database_name]
```

## Common Connection Options

### Connection Parameters
- `-h, --host=HOST` - Connect to MySQL server on HOST
- `-P, --port=PORT` - Port number to use for connection
- `-u, --user=USER` - MySQL username for login
- `-p, --password[=PASS]` - Password to use when connecting
- `-S, --socket=SOCKET` - Socket file to use for connection
- `--protocol=TYPE` - Connection protocol to use (TCP, SOCKET, PIPE, MEMORY)

### Database Selection
- `database_name` - Database name to use (optional)
- `-D, --database=DB` - Database to use
- `--default-character-set=CHARSET` - Set the default character set

## Execution Options

### Batch and Interactive Mode
- `-e, --execute=COMMAND` - Execute SQL statement and exit
- `-E, --vertical` - Print output vertically (one column per line)
- `-s, --silent` - Silent mode (less output)
- `-N, --skip-column-names` - Don't write column names in results
- `-t, --table` - Output in table format (default)
- `-H, --html` - Produce HTML output
- `-X, --xml` - Produce XML output

### File Execution
- `--batch` - Print results with tab as separator, each row on new line
- `--raw` - Write fields without conversion
- `--force` - Continue even if an SQL error occurs
- `--comments` - Preserve comments in statements
- `--skip-comments` - Discard comments

## Security and Authentication

### SSL/TLS Options
- `--ssl-mode=MODE` - SSL connection mode (DISABLED, PREFERRED, REQUIRED)
- `--ssl-ca=FILE` - CA certificate file
- `--ssl-cert=FILE` - X.509 certificate file
- `--ssl-key=FILE` - X.509 key file
- `--ssl-cipher=CIPHER` - SSL cipher to use

### Authentication Plugins
- `--default-auth=PLUGIN` - Default authentication client-side plugin
- `--enable-cleartext-plugin` - Enable cleartext authentication plugin

## Usage Examples

### Basic Database Operations

#### Connecting to MySQL Server
```bash
# Connect with interactive prompt for password
mysql -u root -p

# Connect to specific host and port
mysql -h localhost -P 3306 -u admin -p

# Connect to specific database
mysql -u user -p mydatabase

# Connect using socket (Unix/Linux)
mysql -u root -S /var/lib/mysql/mysql.sock

# Connect with SSL
mysql -u user -p --ssl-mode=REQUIRED mydb
```

#### Basic SQL Operations
```bash
# Execute single SQL statement
mysql -u root -p -e "SHOW DATABASES;"

# Execute multiple statements
mysql -u root -p -e "CREATE DATABASE testdb; USE testdb; CREATE TABLE users(id INT, name VARCHAR(50));"

# Execute SQL from file
mysql -u root -p mydatabase < script.sql

# Execute with vertical output (useful for wide tables)
mysql -u root -p -E -e "SELECT * FROM users WHERE id = 1;"

# Execute with HTML output
mysql -u root -p -H -e "SELECT * FROM users;" > users.html

# Execute with XML output
mysql -u root -p -X -e "SELECT * FROM users;" > users.xml
```

### Database Management

#### Creating and Managing Databases
```bash
# Create new database
mysql -u root -p -e "CREATE DATABASE companydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Show all databases
mysql -u root -p -e "SHOW DATABASES;"

# Drop database
mysql -u root -p -e "DROP DATABASE old_database;"

# Create database with specific options
mysql -u root -p -e "CREATE DATABASE webapp CHARACTER SET latin1 COLLATE latin1_swedish_ci;"

# Show database creation statement
mysql -u root -p -e "SHOW CREATE DATABASE companydb;"

# Select database and run queries
mysql -u root -p -D companydb -e "SHOW TABLES;"
```

#### User Management
```bash
# Create new user
mysql -u root -p -e "CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'securepassword';"

# Grant privileges
mysql -u root -p -e "GRANT SELECT, INSERT, UPDATE ON companydb.* TO 'appuser'@'localhost';"

# Grant all privileges
mysql -u root -p -e "GRANT ALL PRIVILEGES ON companydb.* TO 'admin'@'%';"

# Show user grants
mysql -u root -p -e "SHOW GRANTS FOR 'appuser'@'localhost';"

# Revoke privileges
mysql -u root -p -e "REVOKE INSERT ON companydb.* FROM 'appuser'@'localhost';"

# Drop user
mysql -u root -p -e "DROP USER 'olduser'@'localhost';"

# List all users
mysql -u root -p -e "SELECT User, Host FROM mysql.user;"

# Set user password
mysql -u root -p -e "ALTER USER 'admin'@'localhost' IDENTIFIED BY 'newpassword';"
```

### Table Operations

#### Creating and Managing Tables
```bash
# Create table with primary key
mysql -u user -p mydb -e "CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE
);"

# Create table with foreign key
mysql -u user -p mydb -e "CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_name VARCHAR(100),
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);"

# Show table structure
mysql -u user -p mydb -e "DESCRIBE employees;"
mysql -u user -p mydb -e "SHOW COLUMNS FROM employees;"

# Show create table statement
mysql -u user -p mydb -e "SHOW CREATE TABLE employees;"

# Add column to table
mysql -u user -p mydb -e "ALTER TABLE employees ADD COLUMN phone VARCHAR(20);"

# Drop column
mysql -u user -p mydb -e "ALTER TABLE employees DROP COLUMN phone;"

# Rename table
mysql -u user -p mydb -e "RENAME TABLE employees TO staff;"

# Drop table
mysql -u user -p mydb -e "DROP TABLE old_table;"
```

#### Data Manipulation
```bash
# Insert single record
mysql -u user -p mydb -e "INSERT INTO employees (name, email, department, salary) VALUES ('John Doe', 'john@example.com', 'Engineering', 75000.00);"

# Insert multiple records
mysql -u user -p mydb -e "INSERT INTO employees (name, email, department, salary) VALUES
    ('Jane Smith', 'jane@example.com', 'Marketing', 65000.00),
    ('Bob Johnson', 'bob@example.com', 'Engineering', 80000.00);"

# Update records
mysql -u user -p mydb -e "UPDATE employees SET salary = 85000.00 WHERE name = 'Bob Johnson';"

# Delete records
mysql -u user -p mydb -e "DELETE FROM employees WHERE department = 'Temp';"

# Select with conditions
mysql -u user -p mydb -e "SELECT * FROM employees WHERE department = 'Engineering';"

# Select with ordering
mysql -u user -p mydb -e "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 10;"

# Select with aggregation
mysql -u user -p mydb -e "SELECT department, AVG(salary) as avg_salary, COUNT(*) as count FROM employees GROUP BY department;"
```

### Data Import and Export

#### Importing Data
```bash
# Import from CSV file
mysql -u user -p mydb -e "LOAD DATA INFILE '/path/to/data.csv' INTO TABLE employees
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (name, email, department, salary);"

# Import from SQL file
mysql -u user -p mydatabase < backup.sql

# Import with specific character set
mysql -u user -p --default-character-set=utf8mb4 mydb < data.sql

# Import with disabled foreign key checks
mysql -u user -p mydb -e "SET FOREIGN_KEY_CHECKS=0; SOURCE data.sql; SET FOREIGN_KEY_CHECKS=1;"
```

#### Exporting Data
```bash
# Export to CSV
mysql -u user -p mydb -e "SELECT * FROM employees INTO OUTFILE '/tmp/employees.csv'
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '\"'
    LINES TERMINATED BY '\n';"

# Export with headers using shell commands
mysql -u user -p mydb -e "SELECT * FROM employees;" | sed '1i id,name,email,department,salary,hire_date' > employees.csv

# Export table structure
mysqldump -u user -p --no-data mydb > structure.sql

# Export data only
mysqldump -u user -p --no-create-info mydb > data.sql
```

## Practical Examples

### Database Administration

#### Server Status and Information
```bash
# Show server status
mysql -u root -p -e "SHOW STATUS;"

# Show server variables
mysql -u root -p -e "SHOW VARIABLES;"

# Show process list
mysql -u root -p -e "SHOW PROCESSLIST;"

# Show full process list
mysql -u root -p -e "SHOW FULL PROCESSLIST;"

# Show database size
mysql -u root -p -e "SELECT table_schema 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) 'Size (MB)'
    FROM information_schema.TABLES
    GROUP BY table_schema;"

# Show table sizes
mysql -u user -p mydb -e "SELECT table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) 'Size (MB)'
    FROM information_schema.TABLES
    WHERE table_schema = 'mydb'
    ORDER BY (data_length + index_length) DESC;"

# Show user connections
mysql -u root -p -e "SELECT user, host FROM information_schema.processlist;"

# Check database charset
mysql -u root -p -e "SELECT SCHEMA_NAME, DEFAULT_CHARACTER_SET_NAME FROM information_schema.SCHEMATA;"
```

#### Performance Monitoring
```bash
# Show slow queries
mysql -u root -p -e "SHOW VARIABLES LIKE 'slow_query_log';"
mysql -u root -p -e "SHOW VARIABLES LIKE 'long_query_time';"

# Show query cache status
mysql -u root -p -e "SHOW STATUS LIKE 'Qcache%';"

# Show innodb status
mysql -u root -p -e "SHOW ENGINE INNODB STATUS;"

# Show open tables
mysql -u root -p -e "SHOW OPEN TABLES;"

# Show indexes usage
mysql -u root -p mydb -e "SHOW INDEX FROM employees;"

# Analyze table for optimization
mysql -u root -p mydb -e "ANALYZE TABLE employees;"
mysql -u root -p mydb -e "OPTIMIZE TABLE employees;"
```

### Backup and Recovery

#### Creating Backups
```bash
# Full database backup
mysqldump -u root -p --single-transaction --routines --triggers mydatabase > backup_$(date +%Y%m%d).sql

# Multiple databases backup
mysqldump -u root -p --databases db1 db2 db3 > multi_db_backup.sql

# All databases backup
mysqldump -u root -p --all-databases > full_backup.sql

# Compressed backup
mysqldump -u root -p mydatabase | gzip > mydatabase_$(date +%Y%m%d).sql.gz

# Backup specific tables
mysqldump -u root -p mydatabase table1 table2 > tables_backup.sql

# Backup with consistent snapshot
mysqldump -u root -p --single-transaction --flush-logs --master-data=2 mydatabase > consistent_backup.sql
```

#### Restoring Data
```bash
# Restore from SQL file
mysql -u root -p mydatabase < backup.sql

# Restore compressed backup
gunzip < mydatabase_20231201.sql.gz | mysql -u root -p mydatabase

# Restore to different database
mysql -u root -p newdatabase < backup.sql

# Restore with specific character set
mysql -u root -p --default-character-set=utf8mb4 mydatabase < backup.sql
```

### Development Workflow

#### Application Database Setup
```bash
# Create development database
mysql -u root -p -e "CREATE DATABASE devapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Create application user
mysql -u root -p -e "CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'app_password_2023';"

# Grant limited privileges
mysql -u root -p -e "GRANT SELECT, INSERT, UPDATE, DELETE ON devapp.* TO 'appuser'@'localhost';"

# Run database migrations
mysql -u root -p devapp < migrations/001_initial_schema.sql
mysql -u root -p devapp < migrations/002_add_user_profiles.sql

# Import test data
mysql -u root -p devapp < test_data/sample_users.sql

# Verify setup
mysql -u root -p -e "USE devapp; SHOW TABLES; SELECT COUNT(*) FROM users;"
```

#### Data Analysis and Reporting
```bash
# Generate sales report
mysql -u user -p salesdb -e "SELECT
    DATE(order_date) as sale_date,
    COUNT(*) as total_orders,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_order_value
    FROM orders
    WHERE order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY DATE(order_date)
    ORDER BY sale_date;"

# Customer activity report
mysql -u user -p salesdb -e "SELECT
    c.name,
    COUNT(o.id) as order_count,
    SUM(o.amount) as total_spent,
    MAX(o.order_date) as last_order
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customer_id
    GROUP BY c.id, c.name
    HAVING order_count > 0
    ORDER BY total_spent DESC;"

# Inventory status
mysql -u user -p inventory -e "SELECT
    p.name,
    p.category,
    i.quantity,
    p.reorder_level,
    CASE
        WHEN i.quantity <= p.reorder_level THEN 'Reorder Required'
        WHEN i.quantity <= p.reorder_level * 2 THEN 'Low Stock'
        ELSE 'Adequate'
    END as status
    FROM products p
    JOIN inventory i ON p.id = i.product_id
    ORDER BY i.quantity;"
```

## Advanced Usage

### Batch Processing and Automation

#### Scripting with MySQL
```bash
#!/bin/bash
# Database health check script

DB_USER="monitor"
DB_PASS="monitor_pass"
DB_HOST="localhost"

# Check database connectivity
if mysql -u "$DB_USER" -p"$DB_PASS" -h "$DB_HOST" -e "SELECT 1;" >/dev/null 2>&1; then
    echo "Database connection: OK"
else
    echo "Database connection: FAILED"
    exit 1
fi

# Check table counts
mysql -u "$DB_USER" -p"$DB_PASS" -h "$DB_HOST" -e "
    SELECT
        table_name,
        table_rows
    FROM information_schema.tables
    WHERE table_schema = 'production'
    ORDER BY table_rows DESC;
"

# Check long-running queries
mysql -u "$DB_USER" -p"$DB_PASS" -h "$DB_HOST" -e "
    SELECT
        id,
        user,
        host,
        db,
        command,
        time,
        state,
        left(info, 100) as query
    FROM information_schema.processlist
    WHERE time > 300
    ORDER BY time DESC;
"
```

#### Scheduled Database Maintenance
```bash
#!/bin/bash
# Automated database maintenance

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/mysql"
LOG_FILE="$BACKUP_DIR/maintenance_$DATE.log"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Optimize tables
echo "Starting table optimization..." >> "$LOG_FILE"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "
    SELECT CONCAT('OPTIMIZE TABLE ', table_name, ';')
    FROM information_schema.tables
    WHERE table_schema = 'appdb' AND data_free > 0;
" | mysql -u root -p"$MYSQL_ROOT_PASSWORD" appdb

# Backup databases
echo "Starting database backup..." >> "$LOG_FILE"
mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" --single-transaction appdb | gzip > "$BACKUP_DIR/appdb_$DATE.sql.gz"

# Cleanup old backups (keep 7 days)
find "$BACKUP_DIR" -name "appdb_*.sql.gz" -mtime +7 -delete

echo "Maintenance completed at $(date)" >> "$LOG_FILE"
```

### Advanced Query Techniques

#### Complex Joins and Subqueries
```bash
# Find top customers by category
mysql -u user -p salesdb -e "
    SELECT
        c.name,
        c.email,
        SUM(oi.quantity * oi.price) as total_spent,
        (SELECT SUM(quantity * price) FROM order_items
         WHERE product_id IN (SELECT id FROM products WHERE category = 'Electronics')
         AND order_id IN (SELECT id FROM orders WHERE customer_id = c.id)
        ) as electronics_spending
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    JOIN order_items oi ON o.id = oi.order_id
    GROUP BY c.id, c.name, c.email
    HAVING total_spent > 1000
    ORDER BY electronics_spending DESC;"

# Product performance analysis
mysql -u user -p salesdb -e "
    SELECT
        p.name,
        p.category,
        COUNT(oi.id) as times_sold,
        SUM(oi.quantity) as total_units,
        AVG(oi.price) as avg_price,
        (SELECT AVG(oi2.price)
         FROM order_items oi2
         WHERE oi2.product_id = p.id
         AND oi2.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ) as recent_avg_price
    FROM products p
    LEFT JOIN order_items oi ON p.id = oi.product_id
    GROUP BY p.id, p.name, p.category
    HAVING times_sold > 0
    ORDER BY total_units DESC;"

# Inventory turnover analysis
mysql -u user -p inventory -e "
    SELECT
        p.name,
        p.category,
        i.current_quantity,
        COALESCE(s.monthly_sales, 0) as monthly_sales,
        CASE
            WHEN s.monthly_sales > 0 THEN i.current_quantity / s.monthly_sales
            ELSE NULL
        END as months_of_inventory,
        CASE
            WHEN i.current_quantity / s.monthly_sales < 1 THEN 'Critical'
            WHEN i.current_quantity / s.monthly_sales < 2 THEN 'Low'
            WHEN i.current_quantity / s.monthly_sales > 6 THEN 'Overstock'
            ELSE 'Normal'
        END as inventory_status
    FROM products p
    JOIN inventory i ON p.id = i.product_id
    LEFT JOIN (
        SELECT
            product_id,
            SUM(quantity) / 3 as monthly_sales
        FROM sales
        WHERE sale_date >= DATE_SUB(NOW(), INTERVAL 90 DAY)
        GROUP BY product_id
    ) s ON p.id = s.product_id
    ORDER BY monthly_sales DESC;"
```

## Performance Optimization

### Query Optimization

#### Index Management
```bash
# Analyze query execution plan
mysql -u user -p mydb -e "EXPLAIN SELECT * FROM orders WHERE customer_id = 12345 AND order_date >= '2023-01-01';"

# Show indexes
mysql -u user -p mydb -e "SHOW INDEX FROM orders;"

# Create composite index
mysql -u user -p mydb -e "CREATE INDEX idx_customer_date ON orders(customer_id, order_date);"

# Create covering index
mysql -u user -p mydb -e "CREATE INDEX idx_order_covering ON orders(customer_id, order_date, total_amount, status);"

# Analyze table statistics
mysql -u user -p mydb -e "ANALYZE TABLE orders;"

# Check index usage
mysql -u user -p mydb -e "SELECT
    table_name,
    index_name,
    cardinality,
    sub_part,
    packed,
    nullable,
    index_type
    FROM information_schema.statistics
    WHERE table_schema = 'mydb' AND table_name = 'orders';"
```

#### Query Performance Tuning
```bash
# Identify slow queries
mysql -u root -p -e "
    SELECT
        start_time,
        user_host,
        query_time,
        lock_time,
        rows_sent,
        rows_examined,
        sql_text
    FROM mysql.slow_log
    WHERE start_time >= DATE_SUB(NOW(), INTERVAL 1 DAY)
    ORDER BY query_time DESC
    LIMIT 10;"

# Show query cache statistics
mysql -u root -p -e "SHOW STATUS LIKE 'Qcache%';"

# Monitor buffer pool usage
mysql -u root -p -e "
    SELECT
        variable_name,
        variable_value / 1024 / 1024 as value_mb
    FROM information_schema.global_variables
    WHERE variable_name IN ('innodb_buffer_pool_size', 'innodb_log_file_size');
"

# Check table fragmentation
mysql -u user -p mydb -e "
    SELECT
        table_name,
        ROUND(data_length/1024/1024) AS data_mb,
        ROUND(index_length/1024/1024) AS index_mb,
        ROUND(data_free/1024/1024) AS free_mb,
        ROUND(data_free/(data_length+index_length)*100,2) AS fragmentation_pct
    FROM information_schema.tables
    WHERE table_schema = 'mydb'
    AND data_free > 0
    ORDER BY fragmentation_pct DESC;"
```

## Security Best Practices

### Connection Security

#### Secure Connection Examples
```bash
# Connect with SSL verification
mysql -u user -p --ssl-mode=VERIFY_CA --ssl-ca=/path/to/ca.pem mydb

# Connect with client certificate
mysql -u user -p --ssl-mode=REQUIRED \
    --ssl-ca=/path/to/ca.pem \
    --ssl-cert=/path/to/client-cert.pem \
    --ssl-key=/path/to/client-key.pem \
    mydb

# Connect through SSH tunnel
ssh -L 3307:localhost:3306 user@remoteserver.com &
mysql -h 127.0.0.1 -P 3307 -u user -p mydb

# Connect with specific authentication plugin
mysql -u user -p --default-auth=auth_socket mydb
```

### User Privilege Management

#### Principle of Least Privilege
```bash
# Create read-only user for reports
mysql -u root -p -e "
    CREATE USER 'report_user'@'%' IDENTIFIED BY 'strong_password_2023';
    GRANT SELECT ON analytics.* TO 'report_user'@'%';
    FLUSH PRIVILEGES;"

# Create application user with limited access
mysql -u root -p -e "
    CREATE USER 'app_user'@'10.0.%' IDENTIFIED BY 'app_secure_pass';
    GRANT SELECT, INSERT, UPDATE ON webapp.users TO 'app_user'@'10.0.%';
    GRANT SELECT ON webapp.products TO 'app_user'@'10.0.%';
    GRANT INSERT ON webapp.orders TO 'app_user'@'10.0.%';
    FLUSH PRIVILEGES;"

# Create backup user
mysql -u root -p -e "
    CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'backup_pass_2023';
    GRANT SELECT, LOCK TABLES, SHOW VIEW ON *.* TO 'backup_user'@'localhost';
    GRANT RELOAD ON *.* TO 'backup_user'@'localhost';
    FLUSH PRIVILEGES;"
```

## Troubleshooting

### Common Connection Issues

#### Connection Debugging
```bash
# Test connection with verbose output
mysql -u user -p -v mydb

# Check if server is running
mysqladmin -u root -p ping

# Check server version and status
mysql -u root -p -e "SELECT VERSION(); SHOW STATUS;"

# Check allowed hosts for user
mysql -u root -p -e "SELECT user, host FROM mysql.user WHERE user = 'youruser';"

# Test specific authentication method
mysql -u user -p --default-auth=mysql_native_password mydb

# Connect with different protocol
mysql -u user -p --protocol=TCP -h 127.0.0.1 mydb
mysql -u user -p --protocol=SOCKET -S /var/lib/mysql/mysql.sock mydb
```

#### Permission and Access Issues
```bash
# Show current user
mysql -u user -p -e "SELECT CURRENT_USER();"

# Show current privileges
mysql -u user -p -e "SHOW GRANTS FOR CURRENT_USER();"

# Test database access
mysql -u user -p -e "USE mydb; SHOW TABLES;"

# Check if user exists
mysql -u root -p -e "SELECT user, host FROM mysql.user WHERE user = 'youruser';"

# Check user permissions
mysql -u root -p -e "
    SELECT
        user,
        host,
        Select_priv,
        Insert_priv,
        Update_priv,
        Delete_priv,
        Create_priv,
        Drop_priv
    FROM mysql.user
    WHERE user = 'youruser';"
```

### Performance Issues

#### Slow Query Diagnosis
```bash
# Enable slow query log
mysql -u root -p -e "
    SET GLOBAL slow_query_log = 'ON';
    SET GLOBAL long_query_time = 1;
    SET GLOBAL log_queries_not_using_indexes = 'ON';"

# Check slow queries
mysql -u root -p -e "SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 5;"

# Analyze query performance
mysql -u user -p mydb -e "
    EXPLAIN FORMAT=JSON
    SELECT * FROM large_table
    WHERE date_column >= '2023-01-01'
    AND category = 'important';"

# Show profiling information
mysql -u user -p mydb -e "
    SET profiling = 1;
    SELECT COUNT(*) FROM large_table WHERE complex_condition;
    SHOW PROFILE;
    SHOW PROFILE FOR QUERY 1;"
```

## Related Commands

- [`mysqladmin`](/docs/commands/development/mysqladmin) - MySQL server administration
- [`mysqldump`](/docs/commands/development/mysqldump) - Database backup utility
- [`mysqlimport`](/docs/commands/development/mysqlimport) - Data import utility
- [`mysqlshow`](/docs/commands/development/mysqlshow) - Show database information
- [`mysqlcheck`](/docs/commands/development/mysqlcheck) - Table maintenance and repair
- [`mysqlslap`](/docs/commands/development/mysqlslap) - Load emulation client
- [`mysqlbinlog`](/docs/commands/development/mysqlbinlog) - Binary log utility

## Best Practices

1. **Always use SSL/TLS** for remote connections to prevent data interception
2. **Use strong passwords** and implement proper authentication mechanisms
3. **Apply principle of least privilege** when granting user permissions
4. **Regularly backup databases** using mysqldump with appropriate options
5. **Monitor query performance** using slow query log and EXPLAIN
6. **Use prepared statements** in applications to prevent SQL injection
7. **Keep MySQL server updated** to the latest stable version
8. **Configure appropriate buffer sizes** based on available memory
9. **Use proper character sets** (utf8mb4) for full Unicode support
10. **Regular maintenance** including table optimization and statistics updates

## Performance Tips

1. **Use indexes effectively** on frequently queried columns
2. **Avoid SELECT *** in production queries - specify needed columns
3. **Use LIMIT** to restrict result sets when appropriate
4. **Optimize JOIN queries** by ensuring proper indexing
5. **Use connection pooling** in applications to reduce connection overhead
6. **Batch inserts and updates** instead of individual statements
7. **Use appropriate data types** to minimize storage requirements
8. **Regularly run ANALYZE TABLE** to update index statistics
9. **Monitor and optimize** slow queries identified in slow query log
10. **Use query cache** effectively for frequently accessed, static data

The `mysql` command-line client is an essential tool for database administrators and developers working with MySQL databases. Its versatility in handling both interactive sessions and batch processing makes it indispensable for database management, maintenance, and automation tasks. With proper understanding of its options and best practices, users can efficiently manage MySQL databases while maintaining security and performance standards.