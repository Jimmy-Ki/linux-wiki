---
title: cancel - Cancel print jobs
sidebar_label: cancel
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cancel - Cancel print jobs

The `cancel` command is a Unix/Linux utility for canceling print jobs that have been submitted to a printer or print queue. It allows users and administrators to manage print jobs by removing them from the print queue before they are processed or while they are being printed. The command works with various printing systems including LPD (Line Printer Daemon) and CUPS (Common Unix Printing System), making it an essential tool for print management in Unix-like environments.

## Basic Syntax

```bash
cancel [OPTIONS] [DESTINATION [JOB-IDS...]]
cancel [OPTIONS] [PRINTER]
cancel [OPTIONS] [JOB-ID]
```

## Common Options

### Job Selection
- `-a` - Cancel all jobs on the specified destination
- `-u USERNAME` - Cancel all jobs for the specified user
- `-h HOSTNAME` - Specify remote host (for network printing)
- `-P PRINTER` - Specify printer name (alternative syntax)

### Output Options
- `-v, --verbose` - Provide detailed output about the cancellation process
- `-q, --quiet` - Suppress normal output messages
- `-s, --silent` - Suppress all output messages

### Time Control
- `-t TIMEOUT` - Set timeout for job cancellation
- `-i INTERVAL` - Set retry interval for stubborn jobs

### Authentication (CUPS)
- `-U USERNAME` - Specify username for authentication
- `-P PASSWORD` - Specify password for authentication (insecure)

## Usage Examples

### Basic Print Job Management

#### Canceling Specific Jobs
```bash
# Cancel a specific job by ID
cancel 123

# Cancel multiple jobs at once
cancel 123 124 125

# Cancel job on specific printer
cancel -P laserjet 123

# Cancel job with verbose output
cancel -v 123

# Cancel job quietly
cancel -q 123
```

#### Canceling Jobs on Specific Printers
```bash
# Cancel all jobs on a specific printer
cancel laserjet

# Cancel all jobs on printer using -P flag
cancel -P office_printer

# Cancel jobs on network printer
cancel -h printserver.company.com -P main_printer

# Cancel all jobs with detailed output
cancel -v -a -P color_printer
```

#### User-Specific Job Management
```bash
# Cancel all jobs for current user
cancel -u $(whoami)

# Cancel all jobs for specific user
cancel -u john.doe

# Cancel user's jobs on specific printer
cancel -u mary -P department_printer

# Cancel jobs with authentication for CUPS
cancel -U admin -u guest -P secure_printer
```

### Advanced Print Queue Management

#### Mass Operations
```bash
# Cancel ALL print jobs system-wide (requires root)
sudo cancel -a

# Cancel all jobs for multiple users
cancel -u user1 -u user2 -u user3

# Cancel jobs on multiple printers
cancel printer1 printer2 printer3

# Cancel jobs with retry mechanism
cancel -t 30 -i 5 -P problematic_printer
```

#### Network Printing Management
```bash
# Cancel job on remote CUPS server
cancel -h cups.example.com -P remote_printer 456

# Cancel with authentication on remote server
cancel -h print.corp.com -U admin -P main_printer -a

# Cancel jobs across multiple print servers
cancel -h server1.example.com -P printer1
cancel -h server2.example.com -P printer2

# Cancel with custom timeout for slow networks
cancel -h slow-printer.lan -t 60 789
```

### System Administration

#### Printer Maintenance
```bash
# Cancel all jobs before printer maintenance
sudo cancel -a -P maintenance_printer

# Clear print queue after paper jam
cancel -a -P jammed_printer

# Cancel old jobs (older than 1 day)
lpstat -o | grep "$(date -d '1 day ago' '+%b %d')" | awk '{print $1}' | xargs cancel

# Cancel jobs during printer relocation
for printer in printer1 printer2 printer3; do
    cancel -a -P $printer
done
```

#### User Management and Troubleshooting
```bash
# Check jobs before canceling
lpstat -u john.doe
cancel -u john.doe

# Cancel jobs with verification
jobs=$(lpstat -u $(whoami) | awk '{print $1}')
echo "Found jobs: $jobs"
echo "Canceling..."
cancel $jobs

# Monitor and auto-cancel problematic jobs
while lpstat -P problem_printer | grep -q "processing"; do
    cancel -a -P problem_printer
    sleep 10
done
```

## Practical Examples

### Print Server Administration

#### Daily Print Queue Cleanup
```bash
#!/bin/bash
# Daily print queue maintenance script

LOG_FILE="/var/log/print_cleanup.log"
DATE=$(date +%Y-%m-%d)

echo "[$DATE] Starting print queue cleanup" >> $LOG_FILE

# Cancel stuck jobs older than 24 hours
OLD_JOBS=$(lpstat -o | awk '$3 < "'$(date -d '1 day ago' '+%b %d')'" {print $1}')

if [ ! -z "$OLD_JOBS" ]; then
    echo "[$DATE] Canceling old jobs: $OLD_JOBS" >> $LOG_FILE
    cancel $OLD_JOBS
else
    echo "[$DATE] No old jobs found" >> $LOG_FILE
fi

# Clear queues on maintenance printers
MAINTENANCE_PRINTERS=("printer_maint1" "printer_maint2")
for printer in "${MAINTENANCE_PRINTERS[@]}"; do
    if lpstat -P $printer | grep -q "active"; then
        echo "[$DATE] Clearing maintenance printer: $printer" >> $LOG_FILE
        cancel -a -P $printer
    fi
done

echo "[$DATE] Print queue cleanup completed" >> $LOG_FILE
```

#### User Print Job Monitoring
```bash
#!/bin/bash
# Monitor user print jobs and provide notifications

TARGET_USER="$1"
MAX_JOBS=10

if [ -z "$TARGET_USER" ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

# Check current job count
JOB_COUNT=$(lpstat -u $TARGET_USER | wc -l)

if [ $JOB_COUNT -gt $MAX_JOBS ]; then
    echo "Warning: User $TARGET_USER has $JOB_COUNT active print jobs"
    echo "Job details:"
    lpstat -u $TARGET_USER
    echo ""
    echo "Would you like to cancel some jobs? (y/n)"
    read response

    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Enter job IDs to cancel (space-separated):"
        read job_ids
        cancel $job_ids
    fi
else
    echo "User $TARGET_USER has $JOB_COUNT print jobs (within limit)"
fi
```

#### Automated Job Cleanup
```bash
#!/bin/bash
# Automated cleanup of problematic print jobs

PROBLEM_PATTERNS=("stuck" "error" "filter" "held")

for pattern in "${PROBLEM_PATTERNS[@]}"; do
    # Find jobs with problematic status
    jobs=$(lpstat -o | grep -i "$pattern" | awk '{print $1}')

    if [ ! -z "$jobs" ]; then
        echo "Found $pattern jobs: $jobs"
        echo "Canceling these jobs..."
        cancel $jobs

        # Wait and verify
        sleep 5
        remaining=$(lpstat -o | grep -i "$pattern" | wc -l)
        echo "$remaining $pattern jobs remaining"
    fi
done
```

### Development and Testing

#### Print Job Testing Framework
```bash
#!/bin/bash
# Test script for print job management

TEST_PRINTER="test_printer"
TEST_USER="testuser"

echo "Testing print job cancellation..."

# Create test job
echo "Test document" | lpr -P $TEST_PRINTER
sleep 2

# Get job ID
job_id=$(lpstat -u $TEST_USER | tail -1 | awk '{print $1}')

if [ ! -z "$job_id" ]; then
    echo "Created test job: $job_id"

    # Test cancellation
    cancel $job_id

    # Verify cancellation
    sleep 2
    if lpstat -u $TEST_USER | grep -q "$job_id"; then
        echo "ERROR: Job $job_id was not canceled"
        exit 1
    else
        echo "SUCCESS: Job $job_id was canceled"
    fi
else
    echo "ERROR: Could not create test job"
    exit 1
fi
```

#### Batch Job Processing
```bash
#!/bin/bash
# Process multiple print jobs efficiently

JOB_LIST_FILE="jobs_to_cancel.txt"
if [ ! -f "$JOB_LIST_FILE" ]; then
    echo "Error: Job list file not found"
    exit 1
fi

echo "Processing jobs from $JOB_LIST_FILE"

while IFS= read -r job_id; do
    if [ ! -z "$job_id" ]; then
        echo "Canceling job: $job_id"
        cancel -v $job_id

        # Check result
        if [ $? -eq 0 ]; then
            echo "✓ Job $job_id canceled successfully"
        else
            echo "✗ Failed to cancel job $job_id"
        fi
    fi
done < "$JOB_LIST_FILE"
```

## Advanced Usage

### CUPS-Specific Features

#### CUPS Class Management
```bash
# Cancel all jobs in a CUPS class
cancel -a -P office_class

# Cancel jobs on specific printer in a class
cancel -a -P class_laserjet1

# Manage jobs across printer classes
for class in office_class design_class production_class; do
    echo "Checking jobs in class: $class"
    cancel -v -a -P $class
done
```

#### CUPS Authentication and Security
```bash
# Cancel jobs with Kerberos authentication
export KRB5CCNAME=/tmp/krb5cc_$(id -u)
cancel -U $(whoami) -P secure_printer 123

# Use certificate-based authentication
cancel -h cups.example.com -U admin --client-cert /path/to/cert.pem 456

# Cancel with LDAP authentication
cancel -U ldapuser -P ldap_printer --auth-type Basic 789
```

### Print Queue Analysis

#### Job Statistics and Monitoring
```bash
#!/bin/bash
# Analyze print queue and generate statistics

echo "Print Queue Analysis Report"
echo "=========================="

# Total jobs in queue
total_jobs=$(lpstat -o | wc -l)
echo "Total jobs in queue: $total_jobs"

# Jobs by user
echo ""
echo "Jobs by user:"
lpstat -o | awk '{print $2}' | sort | uniq -c | sort -nr

# Jobs by printer
echo ""
echo "Jobs by printer:"
lpstat -o | awk '{print $4}' | sort | uniq -c | sort -nr

# Old jobs (older than 1 hour)
echo ""
echo "Jobs older than 1 hour:"
lpstat -o | awk '$3 < "'$(date -d '1 hour ago' '+%b %d')'" {print $1, $2, $3, $4}'

# Large jobs (>10MB)
echo ""
echo "Large print jobs:"
lpstat -o -l | grep -A 5 "size:" | grep -B 5 "size: *[0-9]*0{6,}"
```

#### Automated Job Management
```bash
#!/bin/bash
# Intelligent job management based on criteria

# Cancel jobs that have been queued for more than 2 hours
cutoff_time=$(date -d '2 hours ago' '+%Y-%m-%d %H:%M')
old_jobs=$(lpstat -o | awk '$4 == "'$(date '+%Y-%m-%d')'" && $3 < "'$(date -d '2 hours ago' '+%b %d %H:%M')'" {print $1}')

if [ ! -z "$old_jobs" ]; then
    echo "Canceling jobs older than 2 hours: $old_jobs"
    cancel $old_jobs
fi

# Cancel duplicate jobs from same user
for user in $(lpstat -o | awk '{print $2}' | sort | uniq); do
    user_jobs=$(lpstat -u $user | wc -l)
    if [ $user_jobs -gt 5 ]; then
        echo "User $user has $user_jobs jobs, canceling excess..."
        lpstat -u $user | tail -n +6 | awk '{print $1}' | xargs cancel
    fi
done
```

## Integration and Automation

### Shell Script Integration

#### Print Job Cleanup Service
```bash
#!/bin/bash
# System service for automatic print job management

CONFIG_FILE="/etc/print-cleanup.conf"
PID_FILE="/var/run/print-cleanup.pid"
LOG_FILE="/var/log/print-cleanup.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Function to cleanup jobs
cleanup_jobs() {
    log_message "Starting job cleanup"

    # Cancel stuck jobs
    stuck_jobs=$(lpstat -o | grep "stuck" | awk '{print $1}')
    if [ ! -z "$stuck_jobs" ]; then
        log_message "Canceling stuck jobs: $stuck_jobs"
        cancel $stuck_jobs
    fi

    # Cancel old jobs (configurable age)
    if [ -f "$CONFIG_FILE" ]; then
        source "$CONFIG_FILE"
        OLD_JOB_AGE=${OLD_JOB_AGE:-24} # Default 24 hours

        cutoff=$(date -d "$OLD_JOB_AGE hours ago" '+%b %d')
        old_jobs=$(lpstat -o | awk '$3 < "'$cutoff'" {print $1}')

        if [ ! -z "$old_jobs" ]; then
            log_message "Canceling old jobs: $old_jobs"
            cancel $old_jobs
        fi
    fi

    log_message "Job cleanup completed"
}

# Main service loop
if [ "$1" = "start" ]; then
    echo $$ > $PID_FILE
    log_message "Print cleanup service started"

    while true; do
        cleanup_jobs
        sleep 300 # Check every 5 minutes
    done
elif [ "$1" = "stop" ]; then
    if [ -f "$PID_FILE" ]; then
        kill $(cat $PID_FILE)
        rm $PID_FILE
        log_message "Print cleanup service stopped"
    fi
else
    echo "Usage: $0 {start|stop}"
fi
```

#### Job Alert System
```bash
#!/bin/bash
# Alert system for print job issues

ALERT_EMAIL="admin@company.com"
THRESHOLD_JOBS=20

# Check queue size
current_jobs=$(lpstat -o | wc -l)

if [ $current_jobs -gt $THRESHOLD_JOBS ]; then
    echo "Alert: Print queue has $current_jobs jobs (threshold: $THRESHOLD_JOBS)" | \
    mail -s "Print Queue Alert" $ALERT_EMAIL

    # Optionally cancel some jobs automatically
    lpstat -o | tail -n +$((THRESHOLD_JOBS - 5)) | awk '{print $1}' | xargs cancel
fi

# Check for problematic jobs
problem_jobs=$(lpstat -o | grep -i "error\|fail\|stuck" | wc -l)
if [ $problem_jobs -gt 0 ]; then
    echo "Alert: Found $problem_jobs problematic print jobs" | \
    mail -s "Print Job Problems" $ALERT_EMAIL
fi
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Check if you have permission to cancel jobs
lpstat -u $(whoami)

# Try with sudo for system-wide jobs
sudo cancel -a

# Check CUPS permissions
lpstat -u $(whoami) | head -5

# Verify user authentication
cancel -U $(whoami) -v job_id
```

#### Job Stubbornly Won't Cancel
```bash
# Try force cancel with timeout
cancel -t 60 job_id

# Restart CUPS service (last resort)
sudo systemctl restart cups

# Clear entire printer queue
sudo cancel -a -P problematic_printer

# Check job status before and after
lpstat -o job_id
cancel job_id
lpstat -o job_id  # Should show no output if successful
```

#### Network Printing Issues
```bash
# Test connectivity to print server
ping cups.example.com

# Check CUPS server status
curl -I http://cups.example.com:631/

# Try explicit host specification
cancel -h cups.example.com -P remote_printer job_id

# Use verbose mode for debugging
cancel -v -h cups.example.com -P remote_printer job_id

# Check if job exists on remote server
lpstat -h cups.example.com -o
```

## Related Commands

- [`lp`](/docs/commands/other/lp) - Submit print jobs
- [`lpr`](/docs/commands/other/lpr) - Print files
- [`lpq`](/docs/commands/other/lpq) - Show print queue status
- [`lprm`](/docs/commands/other/lprm) - Remove print jobs (alternative command)
- [`lpstat`](/docs/commands/other/lpstat) - Show print status information
- [`lpadmin`](/docs/commands/other/lpadmin) - Configure printers
- [`lpc`](/docs/commands/other/lpc) - Line printer control program
- [`enable`](/docs/commands/other/cupsenable) - Enable printers
- [`disable`](/docs/commands/other/cupsdisable) - Disable printers

## Best Practices

1. **Always check job status** before canceling to avoid mistakes
2. **Use specific job IDs** when possible instead of canceling all jobs
3. **Verify permissions** before attempting to cancel jobs belonging to other users
4. **Use verbose mode** (-v) for troubleshooting cancelation issues
5. **Test with small jobs** first when setting up automated cancellation scripts
6. **Log cancellation activities** for audit purposes in enterprise environments
7. **Check printer status** before mass cancellations during maintenance
8. **Notify users** before canceling their jobs in shared environments
9. **Use timeout values** for jobs that might be stuck in processing
10. **Regular cleanup** of old jobs prevents queue overflow and system issues

## Performance Tips

1. **Batch operations** are more efficient than individual job cancellations
2. **Network printing** may require longer timeouts for cancellation commands
3. **CUPS authentication** can slow down frequent cancel operations
4. **Large print queues** benefit from periodic cleanup rather than reactive cancellation
5. **Monitor queue size** to prevent performance degradation from overflow
6. **Use specific printers** rather than system-wide operations when possible
7. **Schedule maintenance** during low-usage periods to minimize disruption
8. **Implement automated cleanup** for consistently high-traffic print environments

The `cancel` command is an essential tool for print management in Unix/Linux environments, providing flexible and powerful capabilities for managing print queues across various printing systems. Its integration with both LPD and CUPS makes it suitable for diverse network printing environments, from small office setups to enterprise print servers.