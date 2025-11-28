---
title: logwatch - System log analyzer and reporter
sidebar_label: logwatch
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# logwatch - System log analyzer and reporter

The `logwatch` command is a powerful system log analysis and monitoring tool that processes system logs and generates customizable, readable reports. It analyzes log files from various services and system components, filtering out routine entries and highlighting important events, errors, and security concerns. Logwatch is highly configurable through its modular script architecture and can generate daily, weekly, or custom time-based reports that can be sent via email or displayed on the console. It supports multiple log formats and can be extended with custom service scripts for specific applications.

## Basic Syntax

```bash
logwatch [OPTIONS] [ARGUMENTS]
```

## Common Options

### Date and Time Options
- `--range RANGE` - Specify date range (today, yesterday, all, week, month)
- `--date DATE_FORMAT` - Specify exact date range (YYYY-MM-DD)
- `--hostname HOSTNAME` - Override hostname in reports

### Output Options
- `--output OUTPUT_FORMAT` - Output format (mail, stdout, file)
- `--format FORMAT_TYPE` - Report format (text, html)
- `--mailto EMAIL_ADDRESS` - Email address to send report
- `--filename FILE_PATH` - Output file for report

### Log Processing Options
- `--service SERVICE_NAME` - Analyze specific service only
- `--service-list` - List all available services
- `--detail DETAIL_LEVEL` - Detail level (low, med, high, or 0-10)
- `--logdir LOG_DIRECTORY` - Specify log directory path
- `--archives` - Process archived log files
- `--numeric` - Show numeric IP addresses instead of names

### Configuration Options
- `--config CONFIG_FILE` - Use specific configuration file
- `--save-config FILENAME` - Save current configuration
- `--usage` - Display usage information
- `--help` - Show detailed help
- `--version` - Display version information

## Usage Examples

### Basic Log Analysis

#### Daily Report Generation
```bash
# Generate default daily report
logwatch

# Generate yesterday's report
logwatch --range yesterday

# Generate report for specific date
logwatch --date 2024-01-15

# Generate weekly report
logwatch --range week

# Generate monthly report
logwatch --range month
```

#### Basic Output Formats
```bash
# Display report on console
logwatch --output stdout

# Send report via email
logwatch --output mail --mailto admin@example.com

# Save report to file
logwatch --output file --filename /var/log/daily_report.txt

# Generate HTML report
logwatch --format html --filename /var/www/reports/report.html
```

### Service-Specific Analysis

#### Analyzing Specific Services
```bash
# Analyze SSH service only
logwatch --service sshd

# Analyze multiple services
logwatch --service sshd --service httpd --service mysqld

# List all available services
logwatch --service-list

# Analyze authentication services
logwatch --service pam --service sudo

# Analyze web server logs
logwatch --service httpd --service httpd-error --service httpd-access
```

#### Service Detail Levels
```bash
# Low detail (summary only)
logwatch --detail low

# Medium detail (recommended)
logwatch --detail med

# High detail (verbose)
logwatch --detail high

# Numeric detail level (0-10)
logwatch --detail 5

# High detail for specific service
logwatch --service sshd --detail high
```

### Advanced Configuration

#### Custom Log Directories
```bash
# Specify custom log directory
logwatch --logdir /custom/log/path

# Process archived logs
logwatch --archives

# Process specific date range with archives
logwatch --range "2024-01-01" --archives

# Use numeric IP addresses
logwatch --numeric

# Custom hostname in reports
logwatch --hostname webserver-prod
```

#### Email Configuration
```bash
# Send to multiple recipients
logwatch --mailto admin@example.com --mailto ops@example.com

# Custom email configuration
logwatch --output mail --mailto security@company.com \
    --detail high --service sshd --service sudo

# Daily automated report
logwatch --range today --output mail \
    --mailto sysadmin@example.com --detail med
```

### Custom Time Ranges

#### Specific Date Analysis
```bash
# Analyze specific date
logwatch --date 2024-01-15

# Analyze date range
logwatch --date "2024-01-01" --date "2024-01-31"

# Analyze last 7 days
logwatch --date "2024-01-15:2024-01-22"

# Yesterday with high detail
logwatch --range yesterday --detail high
```

#### Periodic Analysis
```bash
# Last week analysis
logwatch --range week --detail med --output file \
    --filename /reports/weekly_$(date +%Y%m%d).txt

# Monthly security report
logwatch --range month --service sshd --service sudo \
    --service pam --detail high --mailto security@example.com

# Weekend activity report
logwatch --range "2024-01-13:2024-01-15" --detail high
```

## Practical Examples

### System Administration

#### Daily System Health Check
```bash
#!/bin/bash
# Daily system health report script

DATE=$(date +%Y-%m-%d)
REPORT_DIR="/var/log/reports"
EMAIL="sysadmin@example.com"

# Create report directory
mkdir -p "$REPORT_DIR"

# Generate comprehensive daily report
logwatch \
    --range today \
    --detail med \
    --output file \
    --filename "$REPORT_DIR/daily_report_$DATE.txt" \
    --service sshd \
    --service httpd \
    --service mysqld \
    --service kernel \
    --service postfix

# Send email summary
logwatch \
    --range today \
    --detail low \
    --output mail \
    --mailto "$EMAIL"

echo "Daily report generated: $REPORT_DIR/daily_report_$DATE.txt"
```

#### Security Audit Report
```bash
#!/bin/bash
# Security audit report generation

DATE=$(date +%Y-%m-%d)
SECURITY_EMAIL="security@example.com"

# Generate high-detail security report
logwatch \
    --range yesterday \
    --detail high \
    --numeric \
    --service sshd \
    --service sudo \
    --service pam \
    --service iptables \
    --service fail2ban \
    --output mail \
    --mailto "$SECURITY_EMAIL"

# Save detailed security report
logwatch \
    --range yesterday \
    --detail high \
    --numeric \
    --service sshd \
    --service sudo \
    --service pam \
    --format html \
    --filename "/var/log/security/security_audit_$DATE.html"

echo "Security audit report sent to $SECURITY_EMAIL"
```

### Web Server Monitoring

#### Apache/Nginx Analysis
```bash
# Web server performance analysis
logwatch \
    --service httpd \
    --service httpd-error \
    --detail high \
    --range today \
    --output file \
    --filename /var/log/web_analysis.txt

# Analyze web server errors
logwatch \
    --service httpd-error \
    --service nginx-error \
    --detail high \
    --range yesterday \
    --mailto webadmin@example.com

# HTTP access patterns
logwatch \
    --service httpd-access \
    --detail med \
    --range week \
    --numeric
```

#### Database Server Monitoring
```bash
# MySQL/MariaDB analysis
logwatch \
    --service mysqld \
    --detail high \
    --range today \
    --output file \
    --filename /var/log/mysql_daily.txt

# Database performance report
logwatch \
    --service mysqld \
    --service mysqld-error \
    --detail med \
    --range week \
    --mailto dba@example.com

# PostgreSQL analysis
logwatch \
    --service postgresql \
    --detail high \
    --numeric
```

### Network Infrastructure

#### Mail Server Analysis
```bash
# Postfix mail server analysis
logwatch \
    --service postfix \
    --service postfix-policyd \
    --detail med \
    --range today \
    --output mail \
    --mailto postmaster@example.com

# Mail server security report
logwatch \
    --service postfix \
    --service dovecot \
    --service spamassassin \
    --detail high \
    --range yesterday \
    --numeric
```

#### DNS and DHCP Analysis
```bash
# BIND DNS server analysis
logwatch \
    --service named \
    --detail high \
    --range today \
    --output file \
    --filename /var/log/dns_analysis.txt

# DHCP server monitoring
logwatch \
    --service dhcpd \
    --detail med \
    --range week \
    --mailto network@example.com

# Network traffic analysis
logwatch \
    --service iptables \
    --service fail2ban \
    --detail high \
    --numeric
```

## Integration and Automation

### Cron Job Setup

#### Automated Daily Reports
```bash
# Add to crontab for daily execution
# Edit crontab
crontab -e

# Add these lines:
# Daily system report at 8 AM
0 8 * * * /usr/sbin/logwatch --range today --output mail --mailto sysadmin@example.com

# Weekly detailed report on Sunday at 9 AM
0 9 * * 0 /usr/sbin/logwatch --range week --detail high --output mail --mailto admin@example.com

# Monthly security report on 1st at 10 AM
0 10 1 * * /usr/sbin/logwatch --range month --service sshd --service sudo --detail high --mailto security@example.com
```

#### Custom Script Integration
```bash
#!/bin/bash
# Automated log analysis and archiving

REPORT_DIR="/var/log/logwatch_reports"
ARCHIVE_DIR="/var/log/logwatch_archive"
DATE=$(date +%Y%m%d)

# Create directories
mkdir -p "$REPORT_DIR" "$ARCHIVE_DIR"

# Generate daily reports for all critical services
services=("sshd" "httpd" "mysqld" "postfix" "kernel" "iptables")

for service in "${services[@]}"; do
    logwatch \
        --range today \
        --service "$service" \
        --detail med \
        --output file \
        --filename "$REPORT_DIR/${service}_$DATE.txt"
done

# Generate consolidated report
logwatch \
    --range today \
    --detail med \
    --format html \
    --filename "$REPORT_DIR/consolidated_$DATE.html"

# Archive old reports (older than 30 days)
find "$REPORT_DIR" -name "*.txt" -mtime +30 -exec gzip {} \;
find "$REPORT_DIR" -name "*.html" -mtime +30 -exec gzip {} \;

# Move archived reports to archive directory
mv "$REPORT_DIR"/*.gz "$ARCHIVE_DIR/" 2>/dev/null

echo "Log analysis completed for $DATE"
```

### Email Notification Setup

#### Email Configuration
```bash
# Configure logwatch email settings
# Edit /etc/logwatch/conf/logwatch.conf
# or create custom config file

# Sample configuration
cat > /etc/logwatch/conf/custom.conf << 'EOF'
# Email settings
MailTo = admin@example.com
MailFrom = logwatch@$(hostname)

# Detail level
Detail = High

# Range
Range = yesterday

# Output format
Output = mail

# Services to monitor
Service = All
# Service = -httpd  # Exclude httpd
# Service = sshd

# Log directory
LogDir = /var/log

# Hostname override
# Hostname = webserver-prod

# Numeric IPs
Numeric = yes

# Format
Format = text
EOF

# Use custom configuration
logwatch --config /etc/logwatch/conf/custom.conf
```

## Advanced Configuration

### Custom Service Scripts

#### Creating Custom Service
```bash
# Create custom service script
mkdir -p /etc/logwatch/scripts/services/

# Example custom application log analyzer
cat > /etc/logwatch/scripts/services/myapp << 'EOF'
#!/usr/bin/perl

use strict;
use Logwatch ':all';

my $debug = $ENV{'LOGWATCH_DEBUG'} || 0;

my (%start, %stop, %error);

while (defined(my $line = <STDIN>)) {
    chomp $line;

    if ($line =~ /(\w+ \d+ \d+:\d+:\d+) .* MyApplication started/) {
        $start{$1}++;
    } elsif ($line =~ /(\w+ \d+ \d+:\d+:\d+) .* MyApplication stopped/) {
        $stop{$1}++;
    } elsif ($line =~ /(\w+ \d+ \d+:\d+:\d+) .* ERROR: (.*)/) {
        $error{$2}++;
    }
}

print "\nMyApplication Summary:\n";
print "----------------------\n";

if (%start) {
    print "\nApplication Starts:\n";
    foreach my $time (sort keys %start) {
        print "  $time: $start{$time} times\n";
    }
}

if (%stop) {
    print "\nApplication Stops:\n";
    foreach my $time (sort keys %stop) {
        print "  $time: $stop{$1} times\n";
    }
}

if (%error) {
    print "\nError Summary:\n";
    foreach my $error (sort keys %error) {
        print "  $error: $error{$error} occurrences\n";
    }
}
EOF

chmod +x /etc/logwatch/scripts/services/myapp

# Test custom service
logwatch --service myapp --range today
```

#### Log File Configuration
```bash
# Configure log files for custom service
mkdir -p /etc/logwatch/conf/logfiles/

cat > /etc/logwatch/conf/logfiles/myapp.conf << 'EOF'
# MyApplication log file configuration
LogFile = /var/log/myapp/*.log
Archive = /var/log/myapp/myapp.log.*.gz

# Expand log entries
*ExpandRepeats
*OnlyHost
*ApplyStdDate
EOF

# Test custom log file configuration
logwatch --service myapp --detail high
```

### Performance Optimization

#### Optimizing Log Processing
```bash
# Process logs efficiently for large systems
# Use limited date ranges
logwatch --range today --detail low

# Exclude verbose services for performance
logwatch --service -httpd-access --service -nginx-access

# Process specific log directories only
logwatch --logdir /var/log/custom

# Use numeric IPs to avoid DNS lookups
logwatch --numeric

# Limit detail level for performance
logwatch --detail 3  # Lower detail for faster processing
```

#### Resource Management
```bash
# Monitor logwatch resource usage
/usr/bin/time -v logwatch --range week --detail high

# Process logs in parallel (custom script)
#!/bin/bash
# Parallel log processing for multiple services

services=("sshd" "httpd" "mysqld" "postfix")
date="today"

for service in "${services[@]}"; do
    (
        logwatch \
            --range "$date" \
            --service "$service" \
            --output file \
            --filename "/tmp/logwatch_${service}_$(date +%s).txt"
    ) &
done

# Wait for all background jobs to complete
wait

# Combine reports
cat /tmp/logwatch_*_$(date +%s).txt > /tmp/combined_report.txt

echo "Parallel processing completed"
```

## Troubleshooting

### Common Issues

#### Configuration Problems
```bash
# Check logwatch configuration
logwatch --usage

# Test with different output formats
logwatch --output stdout --detail low

# Verify service availability
logwatch --service-list

# Check log file permissions
ls -la /var/log/
ls -la /etc/logwatch/

# Debug mode
LOGWATCH_DEBUG=1 logwatch --range today --detail low
```

#### Service-Specific Issues
```bash
# Test individual services
logwatch --service sshd --detail high --output stdout

# Check service script syntax
perl -c /etc/logwatch/scripts/services/sshd

# Verify log file configuration
cat /etc/logwatch/conf/logfiles/sshd.conf

# Test with specific log files
logwatch --logdir /var/log/sshd --service sshd
```

#### Email Delivery Issues
```bash
# Test email configuration
echo "Test" | mail -s "Logwatch Test" admin@example.com

# Check mail logs
tail -f /var/log/mail.log

# Verify sendmail configuration
sendmail -bv admin@example.com

# Test with alternative mail command
logwatch --output mail --mailto test@example.com --detail low
```

### Debugging and Maintenance

#### Logwatch Debugging
```bash
# Enable debug mode
export LOGWATCH_DEBUG=1
logwatch --range today --detail low

# Check temporary files
ls -la /tmp/logwatch/
ls -la /var/cache/logwatch/

# Clean logwatch cache
rm -rf /var/cache/logwatch/*

# Rebuild logwatch configuration
logwatch --help | grep -i config
```

#### Performance Issues
```bash
# Monitor system resources during logwatch
top -p $(pgrep logwatch)
iostat -x 1
vmstat 1

# Check log file sizes
du -sh /var/log/*/
find /var/log -name "*.log" -size +100M

# Optimize for large log files
logwatch --range yesterday --detail low --numeric

# Process specific time periods only
logwatch --date "2024-01-15:2024-01-16"
```

## Related Commands

- [`journalctl`](/docs/commands/user-management/journalctl) - Systemd journal query tool
- [`logger`](/docs/commands/user-management/logger) - System logging utility
- [`logrotate`](/docs/commands/user-management/logrotate) - Log rotation utility
- [`tail`](/docs/commands/file-management/tail) - Display end of files
- [`grep`](/docs/commands/file-management/grep) - Pattern searching utility
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing
- [`sed`](/docs/commands/file-management/sed) - Stream editor
- [`cron`](/docs/commands/system-service/crontab) - Scheduled task execution
- [`mail`](/docs/commands/other/mail) - Send/receive email
- [`cat`](/docs/commands/file-management/cat) - Display file contents

## Best Practices

1. **Schedule regular reports** using cron for consistent monitoring
2. **Use appropriate detail levels** - low for daily, high for investigations
3. **Configure email alerts** for critical security events
4. **Archive historical reports** for trend analysis and compliance
5. **Customize service monitoring** based on your system's services
6. **Use numeric IPs** in security reports to avoid DNS delays
7. **Test configurations** before deploying to production
8. **Monitor logwatch performance** on systems with large log volumes
9. **Implement log rotation** to manage disk space usage
10. **Create custom service scripts** for application-specific monitoring

## Performance Tips

1. **Limit date ranges** for faster processing on systems with large logs
2. **Exclude verbose services** like web access logs for daily reports
3. **Use lower detail levels** for routine monitoring
4. **Process logs during off-peak hours** to minimize system impact
5. **Enable numeric IP resolution** to avoid DNS lookup delays
6. **Archive old log files** to maintain reasonable processing times
7. **Use parallel processing** for multiple services on multi-core systems
8. **Configure specific log directories** to avoid processing unrelated logs
9. **Monitor system resources** during logwatch execution
10. **Optimize service scripts** for custom applications

The `logwatch` command is an essential tool for system administrators, providing comprehensive log analysis and monitoring capabilities. Its modular architecture, extensive customization options, and flexible output formats make it ideal for maintaining system security, performance monitoring, and compliance reporting across diverse Linux environments.