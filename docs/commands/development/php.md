---
title: php - PHP Command Line Interface
sidebar_label: php
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# php - PHP Command Line Interface

The `php` command is a powerful server-side scripting language designed for web development but also fully capable of being used as a general-purpose programming language. When run from the command line, PHP provides extensive capabilities for web development, system administration, data processing, automation, and rapid prototyping. It offers a rich set of built-in functions, excellent database connectivity, comprehensive library support, and robust error handling, making it an ideal choice for creating dynamic web applications, command-line utilities, and data processing scripts.

## Basic Syntax

```bash
php [options] [file] [args...]
php -r 'code' [args...]
php -R 'code' [files...]
php -B 'begin_code' -R 'code' -E 'end_code' [files...]
```

## Common Options

### Execution Options
- `-f <file>` - Parse and execute file
- `-r <code>` - Run PHP code without using script tags
- `-R <code>` - Run PHP code for every input line
- `-B <code>` - Run PHP code before processing input
- `-E <code>` - Run PHP code after processing input
- `-S <addr:port>` - Start built-in web server

### Information Options
- `-v` - Version information
- `-i` - PHP information and configuration
- `-m` - Compiled modules
- `-l` - Syntax check only (lint)

### Configuration Options
- `-c <path>` - Look for php.ini file in this directory
- `-n` - No php.ini file will be used
- `-d <foo>[=bar]` - Define INI entry foo with value bar

### Output Options
- `-q` - Quiet mode (suppress HTTP headers)
- `-s` - Display colorized source code
- `-w` - Display source with stripped comments and whitespace

### Interactive Options
- `-a` - Run as interactive shell
- `--interactive` - Force interactive mode

### File Handling Options
- `-F <file>` - Parse and execute file for every input line

### Debug Options
- `-z <file>` - Load Zend extension
- `--ini <path>` - Specify custom php.ini path

## Usage Examples

### Basic PHP Operations

#### Running PHP Files
```bash
# Execute a PHP script
php script.php

# Execute with command line arguments
php script.php arg1 arg2 arg3

# Run with specific php.ini
php -c /custom/path/ script.php

# Run without php.ini
php -n script.php

# Check syntax without execution
php -l script.php

# Display PHP version
php -v

# Show PHP configuration
php -i

# List compiled modules
php -m
```

#### Interactive PHP Shell
```bash
# Start interactive shell
php -a

# Interactive shell with specific configuration
php -c /custom/path/ -a

# Force interactive mode even with stdin redirected
php --interactive
```

#### Running PHP Code Directly
```bash
# Execute simple PHP code
php -r 'echo "Hello, World!\n";'

# Execute multiple statements
php -r '$date = date("Y-m-d"); echo "Today is: $date\n";'

# Use command line arguments
php -r 'echo "Hello, " . $argv[1] . "!\n";' World

# Define ini settings inline
php -d memory_limit=512M -r 'echo ini_get("memory_limit");'
```

### Web Server Operations

#### Built-in Web Server
```bash
# Start development server on default port 8000
php -S localhost:8000

# Start server on specific port
php -S localhost:8080

# Start server on all interfaces
php -S 0.0.0.0:8000

# Use custom document root
php -S localhost:8000 -t /var/www/html

# Use custom router script
php -S localhost:8000 router.php

# Start server with specific php.ini
php -c /custom/path/ -S localhost:8000
```

### File Processing Operations

#### Line-by-Line Processing
```bash
# Process each line of a file
php -R 'echo "Line: $argn\n";' input.txt

# Process with line numbers
php -R 'static $i=1; echo "$i: $argn\n"; $i++;' input.txt

# Code to run before processing
php -B 'echo "Starting processing...\n";' -R 'echo strtoupper($argn) . "\n";' input.txt

# Code to run after processing
php -R 'echo "$argn\n";' -E 'echo "Processing complete.\n";' input.txt

# Complex processing pipeline
php -B '$total=0;' -R '$total+=strlen($argn);' -E 'echo "Total chars: $total\n";' file.txt
```

#### File Analysis and Processing
```bash
# Count lines in file
php -R '$count++; END: echo "Lines: $count\n";' file.txt

# Filter lines containing pattern
php -R 'if (strpos($argn, "error") !== false) echo $argn . "\n";' log.txt

# Process CSV files
php -R '$fields = str_getcsv($argn); echo "Name: " . $fields[0] . "\n";' data.csv

# Process JSON lines
php -R '$data = json_decode($argn); echo "ID: " . $data->id . "\n";' json_data.txt

# Transform text
php -R 'echo ucwords(strtolower($argn)) . "\n";' text.txt
```

### Code Analysis and Development

#### Syntax Checking and Validation
```bash
# Check syntax of all PHP files
find . -name "*.php" -exec php -l {} \;

# Check syntax with detailed output
php -l script.php

# Validate multiple files
for file in *.php; do php -l "$file"; done

# Check syntax and report errors
php -l script.php 2>&1 | grep -E "(Parse|Fatal) error"
```

#### Code Display and Analysis
```bash
# Display source with syntax highlighting
php -s script.php

# Display stripped source (no comments/whitespace)
php -w script.php > script.min.php

# Show configuration values
php -r 'echo "memory_limit: " . ini_get("memory_limit") . "\n";'

# Display all functions
php -r 'print_r(get_defined_functions());' | grep -v "Array\n("

# Show loaded extensions
php -r 'print_r(get_loaded_extensions());'
```

### Database Operations

#### MySQL Database Operations
```bash
# Simple database query
php -r '
$conn = new mysqli("localhost", "user", "pass", "db");
$result = $conn->query("SELECT COUNT(*) FROM users");
echo "Users: " . $result->fetch_row()[0] . "\n";
$conn->close();
'

# Database backup script
php -r '
$conn = new PDO("mysql:host=localhost;dbname=test", "user", "pass");
foreach($conn->query("SHOW TABLES") as $row) {
    $table = $row[0];
    echo "Dumping $table...\n";
    $conn->exec("COPY $table TO '/backup/$table.csv' WITH CSV");
}
'
```

#### Data Processing and Migration
```bash
# Process data from CSV and insert to database
php -R '
if ($line = str_getcsv($argn)) {
    list($name, $email) = $line;
    echo "INSERT INTO users (name, email) VALUES (\"$name\", \"$email\");\n";
}
' data.csv | mysql database

# Convert JSON to CSV
php -R '
$data = json_decode($argn);
echo $data->name . "," . $data->email . "\n";
' data.json
```

### Automation and System Administration

#### Log Processing
```bash
# Parse Apache access logs
php -R '
if (preg_match("/(\S+) \S+ \S+ \[([^\]]+)\] \"([^\"]+)\" (\d+) (\d+)/", $argn, $matches)) {
    echo "IP: {$matches[1]}, Time: {$matches[2]}, Status: {$matches[4]}\n";
}
' access.log

# Extract error messages from log
php -R '
if (strpos($argn, "ERROR") !== false) {
    echo $argn . "\n";
}
' application.log

# Count error types
php -R '
if (preg_match("/ERROR: (\w+)/", $argn, $matches)) {
    $errors[$matches[1]]++;
}
END: foreach ($errors as $type => $count) {
    echo "$type: $count\n";
}
' error.log
```

#### System Monitoring
```bash
# Check disk usage
php -r '
foreach (["/", "/home", "/var"] as $dir) {
    $free = disk_free_space($dir);
    $total = disk_total_space($dir);
    $percent = round((1 - $free/$total) * 100, 2);
    echo "$dir: $percent% used\n";
}
'

# Monitor memory usage
php -r '
$meminfo = file_get_contents("/proc/meminfo");
preg_match("/MemAvailable:\s+(\d+)/", $meminfo, $matches);
$available = $matches[1] / 1024 / 1024;
echo "Available memory: " . round($available, 2) . " GB\n";
'

# Check running processes
php -r '
$processes = shell_exec("ps aux | wc -l");
echo "Running processes: " . trim($processes) . "\n";
'
```

## Practical Examples

### Web Development Workflow

#### Quick Development Server Setup
```bash
# Start development server with error reporting
php -d display_errors=1 -d error_reporting=E_ALL -S localhost:8000

# Start server with custom error handler
php -S localhost:8000 -t public/ router.php

# Development server with hot reload
while true; do
    php -S localhost:8000 &
    SERVER_PID=$!
    inotifywait -e modify,create,delete -r .
    kill $SERVER_PID
done
```

#### Code Generation and Templates
```bash
# Generate class from template
php -r '
$template = "<?php\nclass {CLASS} {\n    // Generated class\n}\n";
$className = "UserController";
echo str_replace("{CLASS}", $className, $template);
' > UserController.php

# Generate migration files
php -r '
$table = "users";
$fields = ["id INT PRIMARY KEY", "name VARCHAR(255)", "email VARCHAR(255)"];
$sql = "CREATE TABLE $table (\n    " . implode(",\n    ", $fields) . "\n);";
echo $sql;
' > create_users.sql
```

### Data Processing and ETL

#### File Format Conversion
```bash
# XML to JSON conversion
php -r '
$xml = simplexml_load_file("data.xml");
echo json_encode($xml, JSON_PRETTY_PRINT);
' > data.json

# CSV to JSON conversion
php -R '
$data[] = str_getcsv($argn);
END: array_shift($data); // Remove header
echo json_encode(array_map(function($row) use ($data) {
    return array_combine($data[0], $row);
}, array_slice($data, 1)), JSON_PRETTY_PRINT);
' data.csv
```

#### Data Validation and Cleaning
```bash
# Validate email addresses
php -R '
$emails = explode(",", $argn);
foreach ($emails as $email) {
    $email = trim($email);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Valid: $email\n";
    } else {
        echo "Invalid: $email\n";
    }
}
' emails.txt

# Clean and normalize phone numbers
php -R '
$phone = preg_replace("/[^\d]/", "", $argn);
if (strlen($phone) === 10) {
    echo substr($phone, 0, 3) . "-" . substr($phone, 3, 3) . "-" . substr($phone, 6) . "\n";
}
' phone_numbers.txt
```

### Configuration Management

#### Environment-Specific Configurations
```bash
# Generate configuration from template
php -r '
$env = $argv[1] ?? "dev";
$config = [
    "dev" => ["debug" => true, "db_host" => "localhost"],
    "prod" => ["debug" => false, "db_host" => "prod.db"]
];
echo json_encode($config[$env], JSON_PRETTY_PRINT);
' prod > config.json

# Validate configuration files
php -r '
$config = json_decode(file_get_contents("config.json"));
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "Invalid JSON: " . json_last_error_msg() . "\n";
    exit(1);
}
echo "Configuration is valid\n";
'
```

## Advanced Usage

### Performance Analysis

#### Code Profiling
```bash
# Profile script execution time
php -r '
$start = microtime(true);
// Your code here
$end = microtime(true);
echo "Execution time: " . ($end - $start) . " seconds\n";
'

# Memory usage analysis
php -r '
$memory_before = memory_get_usage();
// Code to profile
$memory_after = memory_get_usage();
echo "Memory used: " . ($memory_after - $memory_before) . " bytes\n";
echo "Peak memory: " . memory_get_peak_usage() . " bytes\n";
'
```

#### Performance Testing
```bash
# Benchmark database queries
php -r '
$start = microtime(true);
for ($i = 0; $i < 1000; $i++) {
    // Database operation
}
$end = microtime(true);
echo "1000 operations took: " . ($end - $start) . " seconds\n";
echo "Average: " . (($end - $start) / 1000) . " seconds per operation\n";
'

# Load testing
php -r '
$urls = ["http://localhost/api/users", "http://localhost/api/products"];
foreach ($urls as $url) {
    $start = microtime(true);
    file_get_contents($url);
    $end = microtime(true);
    echo "$url: " . round(($end - $start) * 1000, 2) . "ms\n";
}
'
```

### Error Handling and Debugging

#### Enhanced Error Reporting
```bash
# Run with maximum error reporting
php -d error_reporting=E_ALL -d display_errors=1 script.php

# Custom error handler
php -r '
set_error_handler(function($severity, $message, $file, $line) {
    echo "Error: $message in $file on line $line\n";
});
trigger_error("This is a test error", E_USER_WARNING);
'
```

#### Debug and Logging
```bash
# Debug with variable dump
php -r '
$debug = true;
$data = ["key" => "value"];
if ($debug) {
    var_dump($data);
}
'

# Create simple logger
php -r '
function log_message($message) {
    file_put_contents("debug.log", date("[Y-m-d H:i:s] ") . $message . "\n", FILE_APPEND);
}
log_message("Script started");
log_message("Processing complete");
'
```

### Integration and Automation

#### Shell Integration
```bash
# Use PHP output in shell pipelines
php -r 'echo json_encode(["status" => "success"]);' | jq .

# Process shell command output with PHP
ps aux | php -R '
if (preg_match("/(\S+)\s+(\d+)/", $argn, $matches)) {
    echo "Process: {$matches[1]}, PID: {$matches[2]}\n";
}
'

# Generate shell commands
php -r '
foreach (range(1, 10) as $i) {
    echo "mkdir test_dir_$i\n";
}
' | bash
```

#### Cron Jobs and Automation
```bash
# Backup script for cron
#!/bin/bash
php -r '
$date = date("Y-m-d_H-i-s");
$backup_file = "/backup/backup_$date.sql";
shell_exec("mysqldump -u user -ppass database > $backup_file");
echo "Backup created: $backup_file\n";
'

# Log rotation script
php -r '
$log_dir = "/var/log/myapp";
$max_files = 10;
$files = glob("$log_dir/*.log");
rsort($files);
for ($i = $max_files; $i < count($files); $i++) {
    unlink($files[$i]);
}
echo "Log rotation complete\n";
'
```

## Troubleshooting

### Common Issues

#### Memory Issues
```bash
# Increase memory limit
php -d memory_limit=512M script.php

# Monitor memory usage
php -r '
echo "Current memory: " . memory_get_usage() . " bytes\n";
echo "Peak memory: " . memory_get_peak_usage() . " bytes\n";
'

# Optimize memory usage
php -r '
ini_set("memory_limit", "256M");
$large_array = range(1, 100000);
unset($large_array); // Free memory
echo "Memory freed\n";
'
```

#### Configuration Problems
```bash
# Check if extension is loaded
php -r 'echo extension_loaded("pdo_mysql") ? "Loaded" : "Not loaded";'

# Check PHP.ini location
php -r 'echo php_ini_loaded_file();'

# Show all configuration values
php -i | grep memory_limit

# Check specific setting
php -r 'echo ini_get("max_execution_time");'
```

#### Path and Include Issues
```bash
# Set include path
php -d include_path=".:/usr/share/php:/custom/path" script.php

# Check include path
php -r 'echo get_include_path();'

# Debug file includes
php -r '
$file = "config.php";
if (file_exists($file)) {
    echo "File exists: $file\n";
} else {
    echo "File not found: $file\n";
}
'
```

### Performance Issues

#### Slow Script Execution
```bash
# Profile with Xdebug (if installed)
php -d xdebug.profiler_enable=1 script.php

# Use OPcache
php -d opcache.enable=1 script.php

# Increase execution time
php -d max_execution_time=300 script.php
```

#### Database Connection Issues
```bash
# Test database connection
php -r '
try {
    $pdo = new PDO("mysql:host=localhost", "user", "pass");
    echo "Database connection successful\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
'
```

## Related Commands

- [`composer`](/docs/commands/development/composer) - PHP dependency manager
- [`pear`](/docs/commands/development/pear) - PHP Extension and Application Repository
- [`pecl`](/docs/commands/development/pecl) - PHP Extension Community Library
- [`phpize`](/docs/commands/development/phpize) - PHP extension preparation tool
- [`php-config`](/docs/commands/development/php-config) - PHP configuration utility
- [`phpdbg`](/docs/commands/development/phpdbg) - PHP interactive debugger
- [`node`](/docs/commands/development/node) - Node.js JavaScript runtime
- [`python`](/docs/commands/development/python) - Python interpreter
- [`ruby`](/docs/commands/development/ruby) - Ruby interpreter
- [`perl`](/docs/commands/development/perl) - Perl interpreter

## Best Practices

1. **Always validate input** when processing command line arguments
2. **Use proper error handling** with try-catch blocks for robust scripts
3. **Set appropriate memory limits** for memory-intensive operations
4. **Use php -l** to check syntax before running critical scripts
5. **Enable error reporting** during development with `-d error_reporting=E_ALL`
6. **Use absolute paths** in cron jobs and scheduled tasks
7. **Secure sensitive data** and avoid hardcoding credentials
8. **Profile performance** when dealing with large datasets
9. **Use appropriate PHP versions** for compatibility and security
10. **Document complex scripts** with clear comments and usage instructions

## Performance Tips

1. **Use OPcache** for frequently executed scripts to improve performance
2. **Process files line by line** with `-R` option for large files instead of loading into memory
3. **Use built-in functions** instead of custom implementations when available
4. **Enable JIT compilation** in PHP 8+ for compute-intensive tasks
5. **Use appropriate data structures** (arrays vs objects) based on use case
6. **Minimize I/O operations** by batching operations when possible
7. **Use PDO prepared statements** for repeated database operations
8. **Leverage PHP 8 features** like named arguments and union types for better code
9. **Consider using async/await** with appropriate extensions for concurrent operations
10. **Profile with Xdebug** to identify bottlenecks in complex scripts

The `php` command is a versatile tool that extends far beyond web development, offering powerful capabilities for command-line scripting, data processing, system administration, and rapid application development. Its extensive standard library, robust error handling, and cross-platform compatibility make it an excellent choice for developers and system administrators alike.

## Additional Resources

### Official Documentation
- [PHP Manual](https://www.php.net/manual/en/)
- [Command Line Usage](https://www.php.net/manual/en/features.commandline.php)
- [Built-in Web Server](https://www.php.net/manual/en/features.commandline.webserver.php)

### Common Use Cases
- Web application development
- API development
- Data processing and ETL
- System administration scripts
- Quick prototyping
- Automation tools
- Database operations
- File processing utilities

### Integration Examples
- CI/CD pipelines
- Containerized applications
- Microservices
- Legacy system maintenance
- Cross-platform utilities