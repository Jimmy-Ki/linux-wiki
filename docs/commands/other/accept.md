---
title: accept - Accept Print Jobs for Destinations
sidebar_label: accept
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# accept - Accept Print Jobs for Destinations

The `accept` command is a CUPS (Common UNIX Printing System) utility that instructs the printing system to accept print jobs for specified destinations. It's part of the printer management toolkit that allows administrators to control the flow of print jobs to printers and printer classes. The command works by enabling job submission to specific printers or printer classes that might have been previously configured to reject jobs. This is essential for printer maintenance, load balancing, and managing print queues in enterprise environments.

The `accept` command is typically used in conjunction with its counterpart `reject`, as well as `cupsenable`/`cupsdisable` for comprehensive printer queue management. While `accept/reject` control whether jobs can be submitted to a queue, `enable/disable` control whether the printer is actually processing those jobs.

## Basic Syntax

```bash
accept [OPTIONS] destination(s)
```

## Common Options

### Connection Options
- `-E` - Forces encryption when connecting to the server
- `-U username` - Sets the username for authentication
- `-h hostname[:port]` - Specify alternate CUPS server

### Target Specification
- `destination(s)` - Printer or class names to accept jobs for

## Usage Examples

### Basic Printer Queue Management

#### Accepting Jobs for Single Printer
```bash
# Accept jobs for a specific printer
accept LaserJet

# Accept jobs for multiple printers
accept LaserJet DeskJet OfficePrinter

# Accept jobs with admin authentication
accept -U admin -h printserver:631 ColorPrinter
```

#### Accepting Jobs for Printer Classes
```bash
# Accept jobs for printer class
accept OfficePrinters

# Accept jobs for multiple classes
accept OfficePrinters ColorPrinters AccountingPrinters
```

### Server Connection Management

#### Remote Server Management
```bash
# Accept jobs on remote CUPS server
accept -h printserver.company.com Printer1

# Accept jobs on remote server with specific port
accept -h 192.168.1.100:631 NetworkPrinter

# Accept jobs with forced encryption
accept -E -h secure.printserver.com SecurePrinter
```

#### Authentication Scenarios
```bash
# Accept with specific username
accept -U root MarketingPrinter

# Accept with encrypted connection
accept -E -U printadmin HR_Printer

# Accept on remote server with authentication
accept -U admin -h remote.company.com RemotePrinter
```

### Printer Maintenance Workflow

#### Maintenance Sequence
```bash
#!/bin/bash
# Printer maintenance workflow

PRINTER="OfficeLaser"
ADMIN_USER="printadmin"

echo "Starting maintenance for $PRINTER"

# Step 1: Stop accepting new jobs
reject -r "Scheduled maintenance" $PRINTER

# Step 2: Wait for current jobs to complete
while [ $(lpstat -o -P $PRINTER | wc -l) -gt 0 ]; do
    echo "Waiting for jobs to complete..."
    sleep 30
done

# Step 3: Disable printer for maintenance
cupsdisable $PRINTER

echo "Maintenance completed. Resuming normal operation..."

# Step 4: Re-enable printer
cupsenable $PRINTER

# Step 5: Start accepting jobs again
accept $PRINTER

echo "$PRINTER is back online and accepting jobs"
```

#### Bulk Operations
```bash
#!/bin/bash
# Accept jobs for all printers in a department

DEPT_PRINTERS="dept1-printer dept2-printer dept3-printer"
SERVER="printserver.company.com"

for printer in $DEPT_PRINTERS; do
    echo "Accepting jobs for $printer..."
    accept -h $SERVER $printer

    if [ $? -eq 0 ]; then
        echo "Successfully enabled job acceptance for $printer"
    else
        echo "Failed to enable job acceptance for $printer"
    fi
done
```

## Practical Examples

### System Administration

#### Print Server Setup
```bash
#!/bin/bash
# Initial print server setup

PRINT_SERVER="company-print-server"
ADMIN_USER="root"

# Create printer classes
lpadmin -p BlackWhite -c OfficePrinters
lpadmin -p ColorPrinter -c OfficePrinters

# Enable and accept jobs for all printers
for printer in BlackWhite ColorPrinter; do
    cupsenable -h $PRINT_SERVER $printer
    accept -U $ADMIN_USER -h $PRINT_SERVER $printer
    echo "Enabled and accepting jobs for $printer"
done
```

#### Emergency Printer Management
```bash
#!/bin/bash
# Emergency printer recovery

FAILED_PRINTER="MainOffice"
BACKUP_PRINTER="BackupPrinter"
LOG_FILE="/var/log/printermanagement.log"

log_message() {
    echo "$(date): $1" >> $LOG_FILE
}

log_message "Emergency: $FAILED_PRINTER reported as failed"

# Immediately stop accepting jobs for failed printer
reject -r "Printer failure - redirecting to backup" $FAILED_PRINTER
log_message "Rejected jobs on $FAILED_PRINTER"

# Disable the failed printer
cupsdisable $FAILED_PRINTER
log_message "Disabled $FAILED_PRINTER"

# Enable backup printer
cupsenable $BACKUP_PRINTER
accept $BACKUP_PRINTER
log_message "Enabled backup printer $BACKUP_PRINTER"
```

#### Printer Load Balancing
```bash
#!/bin/bash
# Dynamic printer load balancing

OFFICE_PRINTERS="printer1 printer2 printer3"
THRESHOLD=10  # Maximum jobs per printer

check_printer_load() {
    local printer=$1
    local job_count=$(lpstat -o -P $printer 2>/dev/null | wc -l)
    echo $job_count
}

balance_printers() {
    for printer in $OFFICE_PRINTERS; do
        local job_count=$(check_printer_load $printer)

        if [ $job_count -ge $THRESHOLD ]; then
            echo "High load on $printer ($job_count jobs). Rejecting new jobs..."
            reject -r "Load balancing - too many jobs" $printer
        else
            echo "Normal load on $printer ($job_count jobs). Accepting jobs..."
            accept $printer
        fi
    done
}

# Run load balancing
while true; do
    balance_printers
    sleep 60  # Check every minute
done
```

### Network Environment Management

#### Multi-Site Printer Management
```bash
#!/bin/bash
# Multi-site printer management

declare -A SITES=(
    ["NY"]="ny-print.company.com"
    ["LA"]="la-print.company.com"
    ["CHI"]="chi-print.company.com"
)

declare -A SITE_PRINTERS=(
    ["NY"]="ny-laser ny-color ny-wide"
    ["LA"]="la-hplaser la-colorplot la-photos"
    ["CHI"]="chi-main chi-floor1 chi-floor2"
)

accept_jobs_for_site() {
    local site=$1
    local server=${SITES[$site]}
    local printers=${SITE_PRINTERS[$site]}

    echo "Accepting jobs for $site site ($server)..."

    for printer in $printers; do
        accept -h $server $printer
        if [ $? -eq 0 ]; then
            echo "✓ $printer on $site is accepting jobs"
        else
            echo "✗ Failed to enable $printer on $site"
        fi
    done
}

# Accept jobs for all sites
for site in "${!SITES[@]}"; do
    accept_jobs_for_site $site
done
```

#### Remote Office Printer Deployment
```bash
#!/bin/bash
# Deploy printer configurations to remote offices

REMOTE_OFFICES=(
    "office1:192.168.1.100"
    "office2:192.168.2.100"
    "office3:192.168.3.100"
)

setup_remote_printer() {
    local office=$1
    local server=$2

    echo "Setting up printers for $office ($server)..."

    # Accept jobs for standard printers
    accept -h $server "Office-Laser"
    accept -h $server "Office-Color"
    accept -h $server "Office-Scanner"

    # Verify configuration
    if lpstat -h $server -a | grep -q "accepting requests"; then
        echo "✓ $office printers configured successfully"
        return 0
    else
        echo "✗ $office printer configuration failed"
        return 1
    fi
}

# Configure all remote offices
for office_info in "${REMOTE_OFFICES[@]}"; do
    IFS=':' read -r office server <<< "$office_info"
    setup_remote_printer "$office" "$server"
done
```

## Advanced Usage

### Integration with Monitoring Systems

#### Printer Health Monitoring
```bash
#!/bin/bash
# Printer health monitoring with automated recovery

PRINTERS="MainPrinter BackupPrinter ColorPrinter"
LOG_FILE="/var/log/printer_monitor.log"
ALERT_EMAIL="admin@company.com"

check_printer_status() {
    local printer=$1
    local status=$(lpstat -p $printer 2>/dev/null | grep -o "disabled\|enabled")
    local accepting=$(lpstat -a | grep "$printer" | grep -o "accepting\|rejecting")

    echo "$status:$accepting"
}

send_alert() {
    local message=$1
    echo "$message" | mail -s "Printer Alert" $ALERT_EMAIL
    echo "$(date): $message" >> $LOG_FILE
}

recover_printer() {
    local printer=$1

    echo "Attempting to recover $printer..." >> $LOG_FILE

    # Enable the printer
    cupsenable $printer

    # Accept jobs
    accept $printer

    sleep 5

    # Check recovery
    local status=$(check_printer_status $printer)
    if [[ "$status" == "enabled:accepting" ]]; then
        echo "Successfully recovered $printer" >> $LOG_FILE
        return 0
    else
        send_alert "Failed to recover $printer. Manual intervention required."
        return 1
    fi
}

# Main monitoring loop
while true; do
    for printer in $PRINTERS; do
        local status=$(check_printer_status $printer)

        if [[ "$status" != "enabled:accepting" ]]; then
            send_alert "$printer is not functioning properly ($status)"
            recover_printer $printer
        fi
    done

    sleep 300  # Check every 5 minutes
done
```

#### Print Queue Analysis and Optimization
```bash
#!/bin/bash
# Print queue analysis and optimization

analyze_print_queues() {
    echo "=== Print Queue Analysis ==="
    echo "Timestamp: $(date)"
    echo ""

    # Get all printers
    printers=$(lpstat -p | awk '{print $2}')

    for printer in $printers; do
        echo "Printer: $printer"

        # Check if accepting jobs
        if lpstat -a | grep -q "^$printer .* accepting"; then
            echo "  Status: Accepting jobs ✓"
        else
            echo "  Status: NOT accepting jobs ✗"
        fi

        # Check if enabled
        if lpstat -p $printer | grep -q "enabled"; then
            echo "  Enabled: Yes ✓"
        else
            echo "  Enabled: No ✗"
        fi

        # Count jobs in queue
        job_count=$(lpstat -o -P $printer 2>/dev/null | wc -l)
        echo "  Jobs in queue: $job_count"

        # Get printer info
        info=$(lpstat -v $printer 2>/dev/null | awk '{print $4}')
        echo "  Device: $info"

        echo ""
    done
}

optimize_printer_acceptance() {
    echo "=== Optimizing Printer Acceptance ==="

    printers=$(lpstat -p | awk '{print $2}')

    for printer in $printers; do
        local accepting=$(lpstat -a | grep "^$printer" | grep -c "accepting")
        local enabled=$(lpstat -p $printer | grep -c "enabled")

        if [ $accepting -eq 0 ] && [ $enabled -eq 1 ]; then
            echo "Enabling job acceptance for enabled printer: $printer"
            accept $printer
        fi
    done
}

# Run analysis
analyze_print_queues
optimize_printer_acceptance
```

### Security and Access Control

#### Secure Printer Management
```bash
#!/bin/bash
# Secure printer management with authentication

SECURE_SERVER="secure-print.company.com"
CERT_FILE="/etc/certs/client.crt"
KEY_FILE="/etc/certs/client.key"

accept_jobs_secure() {
    local printer=$1
    local username=$2

    echo "Accepting jobs securely for $printer..."

    # Use encrypted connection with certificate authentication
    accept -E -U "$username" -h "$SECURE_SERVER" "$printer"

    if [ $? -eq 0 ]; then
        echo "✓ Successfully configured $printer with secure connection"
    else
        echo "✗ Failed to configure $printer securely"
        return 1
    fi
}

# Example: Configure secure printer access
accept_jobs_secure "FinancePrinter" "finance_admin"
accept_jobs_secure "LegalPrinter" "legal_admin"
```

#### Role-Based Printer Management
```bash
#!/bin/bash
# Role-based printer access management

declare -A USER_ROLES=(
    ["admin"]="AllPrinters"
    ["finance"]="FinancePrinters"
    ["hr"]="HRPrinters"
    ["it"]="ITPrinters"
)

declare -A ROLE_PRINTERS=(
    ["FinancePrinters"]="FinLaser FinColor FinScanner"
    ["HRPrinters"]="HRLaser HRScanner HRCopier"
    ["ITPrinters"]="ITLaser ITColor ITPlotter"
)

manage_printer_access() {
    local username=$1
    local role=$2

    echo "Managing printer access for $username (role: $role)"

    if [ "$role" = "admin" ]; then
        # Admin can manage all printers
        for printer in $(lpstat -p | awk '{print $2}'); do
            accept -U $username $printer
        done
    else
        # Other roles manage specific printer groups
        local printers=${ROLE_PRINTERS[$USER_ROLES[$role]]}

        if [ -n "$printers" ]; then
            for printer in $printers; do
                accept -U $username $printer
            done
        fi
    fi
}

# Usage examples
manage_printer_access "john.doe" "finance"
manage_printer_access "jane.smith" "admin"
```

## Integration and Automation

### Shell Scripts

#### Daily Printer Health Check Script
```bash
#!/bin/bash
# Daily printer health check and report

REPORT_FILE="/var/log/daily_printer_report.txt"
EMAIL_RECIPIENTS="admin@company.com support@company.com"

generate_report() {
    {
        echo "Daily Printer Health Report"
        echo "=========================="
        echo "Date: $(date)"
        echo "Server: $(hostname)"
        echo ""

        echo "Printer Status Summary:"
        echo "-----------------------"

        printers=$(lpstat -p | awk '{print $2}')

        accepting_count=0
        enabled_count=0
        total_count=0

        for printer in $printers; do
            total_count=$((total_count + 1))

            # Check acceptance status
            if lpstat -a | grep -q "^$printer .* accepting"; then
                accepting_count=$((accepting_count + 1))
                acceptance_status="✓ Accepting"
            else
                acceptance_status="✗ Not Accepting"
            fi

            # Check enabled status
            if lpstat -p $printer | grep -q "enabled"; then
                enabled_count=$((enabled_count + 1))
                enabled_status="✓ Enabled"
            else
                enabled_status="✗ Disabled"
            fi

            # Job count
            job_count=$(lpstat -o -P $printer 2>/dev/null | wc -l)

            printf "%-15s %s | %s | Jobs: %d\n" "$printer" "$acceptance_status" "$enabled_status" "$job_count"
        done

        echo ""
        echo "Summary:"
        echo "--------"
        echo "Total printers: $total_count"
        echo "Accepting jobs: $accepting_count"
        echo "Enabled: $enabled_count"
        echo "Acceptance rate: $((accepting_count * 100 / total_count))%"
        echo "Enable rate: $((enabled_count * 100 / total_count))%"

        echo ""
        echo "Recommendations:"
        echo "----------------"

        if [ $accepting_count -lt $total_count ]; then
            echo "- Some printers are not accepting jobs. Consider running recovery."
        fi

        if [ $enabled_count -lt $total_count ]; then
            echo "- Some printers are disabled. Check for maintenance requirements."
        fi

    } > $REPORT_FILE
}

# Generate and send report
generate_report

if command -v mail >/dev/null 2>&1; then
    mail -s "Daily Printer Health Report" $EMAIL_RECIPIENTS < $REPORT_FILE
    echo "Report sent to recipients"
else
    echo "Mail command not available. Report saved to $REPORT_FILE"
fi
```

#### Scheduled Printer Maintenance Script
```bash
#!/bin/bash
# Scheduled printer maintenance

MAINTENANCE_LOG="/var/log/printer_maintenance.log"
BACKUP_DIR="/etc/cups/backup"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $MAINTENANCE_LOG
}

backup_printer_config() {
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="$BACKUP_DIR/printers_$timestamp.conf"

    mkdir -p $BACKUP_DIR

    # Backup current printer configurations
    lpstat -v > $backup_file
    log_message "Printer configuration backed up to $backup_file"
}

perform_maintenance() {
    local printer=$1
    log_message "Starting maintenance for $printer"

    # Stop accepting new jobs
    reject -r "Scheduled maintenance" $printer
    log_message "Rejected new jobs for $printer"

    # Wait for current jobs to complete
    while [ $(lpstat -o -P $printer 2>/dev/null | wc -l) -gt 0 ]; do
        log_message "Waiting for jobs to complete on $printer"
        sleep 30
    done

    log_message "All jobs completed for $printer"

    # Disable printer for maintenance
    cupsdisable $printer
    log_message "Disabled $printer for maintenance"

    # Simulate maintenance tasks
    sleep 60

    # Re-enable printer
    cupsenable $printer
    log_message "Re-enabled $printer"

    # Start accepting jobs again
    accept $printer
    log_message "Started accepting jobs for $printer"

    log_message "Maintenance completed for $printer"
}

# Main maintenance routine
backup_printer_config

# List of printers requiring maintenance
MAINTENANCE_PRINTERS="MainPrinter ColorPrinter"

for printer in $MAINTENANCE_PRINTERS; do
    perform_maintenance $printer
done

log_message "Scheduled maintenance completed"
```

## Troubleshooting

### Common Issues

#### Permission and Authentication Problems
```bash
# Check if user has sufficient privileges
lpstat -a

# Try with explicit authentication
accept -U root PrinterName

# Check CUPS server configuration
grep -i "systemgroup\|user" /etc/cups/cupsd.conf

# Test server connectivity
lpstat -h localhost:631 -a

# Reset CUPS configuration if needed
systemctl restart cups
```

#### Network Connection Issues
```bash
# Test network connectivity to CUPS server
telnet printserver.company.com 631

# Check firewall rules
iptables -L | grep 631
ufw status | grep 631

# Verify server status
lpstat -h remote-server -r

# Test with explicit server specification
accept -h 192.168.1.100:631 PrinterName

# Use encrypted connection if required
accept -E -h secure-printer.company.com PrinterName
```

#### Printer State Issues
```bash
# Check detailed printer status
lpstat -p -a

# Check why printer is rejecting jobs
lpstat -a PrinterName

# Enable printer if it's disabled
cupsenable PrinterName

# Check for error messages
journalctl -u cups | grep -i error

# Restart CUPS service
systemctl restart cups

# Verify printer accepts jobs after restart
lpstat -a | grep "accepting"
```

### Debug and Verification

#### Comprehensive Printer Status Check
```bash
#!/bin/bash
# Comprehensive printer diagnostic script

check_printer_health() {
    local printer=$1

    echo "=== Diagnostic for $printer ==="

    # Basic status
    echo "Printer Status:"
    lpstat -p $printer
    echo ""

    # Acceptance status
    echo "Job Acceptance Status:"
    lpstat -a | grep "^$printer"
    echo ""

    # Queue status
    echo "Current Job Queue:"
    lpstat -o -P $printer 2>/dev/null || echo "No jobs in queue"
    echo ""

    # Device information
    echo "Device Information:"
    lpstat -v $printer 2>/dev/null || echo "Device info not available"
    echo ""

    # Error messages
    echo "Recent Error Messages:"
    journalctl -u cups --since "1 hour ago" | grep -i "$printer" | grep -i error
    echo ""
}

# Run diagnostics for all printers
for printer in $(lpstat -p | awk '{print $2}'); do
    check_printer_health $printer
    echo "============================"
done
```

#### Connection and Authentication Testing
```bash
#!/bin/bash
# Test CUPS server connectivity and authentication

test_cups_connection() {
    local server=$1
    local username=$2

    echo "Testing connection to CUPS server: $server"

    # Test basic connectivity
    if lpstat -h $server -r >/dev/null 2>&1; then
        echo "✓ Server is reachable"
    else
        echo "✗ Server is not reachable"
        return 1
    fi

    # Test authentication
    if lpstat -h $server -U $username -a >/dev/null 2>&1; then
        echo "✓ Authentication successful for $username"
    else
        echo "✗ Authentication failed for $username"
        return 1
    fi

    # Test accept command
    if accept -h $server -U $username --help >/dev/null 2>&1; then
        echo "✓ Accept command is available"
    else
        echo "✗ Accept command failed"
        return 1
    fi

    echo "All tests passed for $server"
}

# Test various servers
test_cups_connection "localhost" "root"
test_cups_connection "printserver.company.com" "admin"
```

## Related Commands

- [`reject`](/docs/commands/other/reject) - Reject print jobs for destinations
- [`cupsenable`](/docs/commands/other/cupsenable) - Enable printers and classes
- [`cupsdisable`](/docs/commands/other/cupsdisable) - Disable printers and classes
- [`lpadmin`](/docs/commands/other/lpadmin) - Configure CUPS printers and classes
- [`lpstat`](/docs/commands/other/lpstat) - Print CUPS status information
- [`lp`](/docs/commands/other/lp) - Print files
- [`cancel`](/docs/commands/other/cancel) - Cancel print jobs
- [`lpc`](/docs/commands/other/lpc) - Line printer control program

## Best Practices

1. **Always verify printer state** before accepting jobs to ensure the printer is ready
2. **Use appropriate authentication** when managing printers on remote servers
3. **Document maintenance schedules** and coordinate job acceptance during operational hours
4. **Monitor printer queues** after accepting jobs to ensure proper processing
5. **Test configuration changes** in non-production environments first
6. **Use encryption** (-E) when managing printers over untrusted networks
7. **Implement monitoring** to automatically detect and resolve acceptance issues
8. **Backup configurations** before making bulk changes to printer settings
9. **Coordinate with users** when temporarily rejecting jobs for maintenance
10. **Log all management operations** for auditing and troubleshooting purposes

## Performance Tips

1. **Batch operations** when managing multiple printers to reduce server load
2. **Use printer classes** to manage groups of similar printers efficiently
3. **Implement job load balancing** across multiple printers for better throughput
4. **Schedule acceptance changes** during low-usage periods to minimize disruption
5. **Monitor system resources** during bulk printer configuration operations
6. **Use remote server specification** carefully to avoid unnecessary network latency
7. **Cache authentication credentials** securely for automated scripts
8. **Regular maintenance** of CUPS configuration to prevent acceptance issues
9. **Network optimization** when managing printers across WAN connections
10. **Implement timeout handling** in scripts to prevent hanging operations

The `accept` command is a fundamental tool for managing print job flow in CUPS environments. It provides administrators with granular control over job submission, enabling effective printer queue management, maintenance scheduling, and operational control in enterprise printing environments.