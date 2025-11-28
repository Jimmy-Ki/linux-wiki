---
title: batch - Execute commands when system load permits
sidebar_label: batch
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# batch - Execute commands when system load permits

The `batch` command is a Unix/Linux utility that executes commands when the system load level permits. It reads commands from standard input or a file and queues them for execution when the system load average drops below a specified threshold (typically 1.5 or 0.8 depending on the system). Unlike `at`, which executes commands at a specific time, `batch` waits for optimal system conditions before running the jobs, making it ideal for resource-intensive tasks that shouldn't interfere with interactive work.

## Basic Syntax

```bash
batch [OPTIONS] [TIME]
```

## Common Options

### Time Specification
- `-t TIME`, `--time TIME` - Specify when job becomes runnable
- `-q QUEUE`, `--queue QUEUE` - Specify the queue (default: b)
- `-f FILE`, `--file FILE` - Read commands from file instead of stdin

### Information Options
- `-l`, `--list` - List jobs in queue
- `-d`, `--delete` - Delete specific job
- `-c`, `--cat` - Show job contents

### General Options
- `-V`, `--version` - Display version information
- `-h`, --help` - Display help information
- `-m`, `--mail` - Send mail when job completes
- `-v`, `--verbose` - Verbose output

## Usage Examples

### Basic Batch Operations

#### Interactive Batch Jobs
```bash
# Start interactive batch session
batch

# Start batch with specific time window
batch -t now + 1 hour

# Start batch for specific queue
batch -q b

# Batch with verbose output
batch -v

# Send email notification on completion
batch -m
```

#### File-based Batch Jobs
```bash
# Execute commands from file
batch -f script.sh

# Execute commands with specific queue
batch -q c -f backup_commands.txt

# Execute with mail notification
batch -m -f maintenance_jobs.txt
```

### Job Management

#### Viewing and Managing Jobs
```bash
# List all batch jobs
batch -l

# Show job details with contents
batch -c 123

# Delete specific job
batch -d 456

# List jobs in specific queue
atq -q b

# Show detailed job information
at -c 789
```

## Practical Examples

### System Administration

#### System Maintenance Tasks
```bash
# Interactive system maintenance
batch << EOF
# System update and cleanup
apt-get update && apt-get -y upgrade
apt-get autoremove -y
apt-get autoclean

# Log rotation
find /var/log -name "*.log.*" -mtime +30 -delete

# System health check
df -h
free -m
uptime
EOF

# File-based maintenance script
batch -f /etc/maintenance/daily_tasks.sh

# Nightly backup with email notification
batch -m -t 02:00 << EOF
# Backup important directories
tar -czf /backup/home_$(date +%Y%m%d).tar.gz /home
tar -czf /backup/etc_$(date +%Y%m%d).tar.gz /etc

# Verify backup integrity
tar -tzf /backup/home_$(date +%Y%m%d).tar.gz | wc -l
EOF
```

#### Resource-Intensive Processing
```bash
# Database maintenance
batch << EOF
# Database optimization
mysql -u root -p -e "OPTIMIZE TABLE database_name.table1"
mysql -u root -p -e "ANALYZE TABLE database_name.table2"

# Create database backup
mysqldump -u root -p --all-databases > /backup/db_$(date +%Y%m%d).sql
gzip /backup/db_$(date +%Y%m%d).sql
EOF

# Log analysis and processing
batch << EOF
# Process large log files
find /var/log -name "access.log*" -exec gzip {} \;
find /var/log -name "error.log*" -exec gzip {} \;

# Generate reports
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr > /reports/ip_stats_$(date +%Y%m%d).txt
EOF
```

### Development Workflow

#### Build and Compilation Tasks
```bash
# Large project compilation
batch << EOF
# Clean and rebuild project
make clean
make -j$(nproc)

# Run tests
make test

# Generate documentation
make docs

# Create distribution package
make dist
EOF

# Multiple project builds
batch << EOF
# Build project A
cd /opt/project_a
npm run build
npm run test

# Build project B
cd /opt/project_b
make clean && make

# Build project C
cd /opt/project_c
cargo build --release
cargo test
EOF
```

#### Data Processing Scripts
```bash
# Data analysis pipeline
batch -m << EOF
# Data extraction
python extract_data.py --source /data/raw --output /data/processed

# Data transformation
Rscript transform_data.R /data/processed /data/clean

# Generate reports
python generate_reports.py --input /data/clean --output /reports
EOF

# Image processing batch
batch << EOF
# Process image files
for image in /uploads/*.jpg; do
    convert "$image" -resize 800x600 "/processed/$(basename "$image")"
    convert "$image" -thumbnail 200x150 "/thumbnails/$(basename "$image")"
done

# Create gallery index
ls /processed/*.jpg > /gallery/image_list.txt
EOF
```

### Backup and Archiving

#### Automated Backup Procedures
```bash
# Comprehensive system backup
batch -m << EOF
# Create backup directories
mkdir -p /backup/$(date +%Y%m%d)

# Backup user data
rsync -av --delete /home/ /backup/$(date +%Y%m%d)/home/

# Backup system configuration
rsync -av --delete /etc/ /backup/$(date +%Y%m%d)/etc/

# Backup databases
mysqldump --all-databases | gzip > /backup/$(date +%Y%m%d)/mysql_backup.sql.gz

# Create backup log
echo "Backup completed: $(date)" >> /var/log/backup.log
du -sh /backup/$(date +%Y%m%d)/ >> /var/log/backup.log
EOF

# Incremental backup setup
batch << EOF
# Weekly full backup
if [ $(date +%u) -eq 1 ]; then
    tar -czf /backup/full_$(date +%Y%m%d).tar.gz /important/data/
else
    # Daily incremental backup
    find /important/data -mtime -1 -print0 | tar -czf /backup/incremental_$(date +%Y%m%d).tar.gz --null -T -
fi
EOF
```

#### Log Management
```bash
# Log archiving and cleanup
batch << EOF
# Archive old logs
find /var/log -name "*.log" -mtime +7 -exec gzip {} \;

# Move archived logs
find /var/log -name "*.log.gz" -mtime +30 -exec mv {} /archive/logs/ \;

# Clean very old logs
find /archive/logs -name "*.log.gz" -mtime +365 -delete

# Generate log statistics
ls -lh /var/log/*.log | awk '{print $5, $9}' > /reports/log_sizes_$(date +%Y%m%d).txt
EOF
```

## Advanced Usage

### Load Management

#### Custom Load Thresholds
```bash
# Check current system load
uptime

# Monitor load averages
watch -n 5 'cat /proc/loadavg'

# Batch with custom queue (different load thresholds)
batch -q b << EOF
# Low priority job (load threshold: 1.5)
echo "This runs when load < 1.5"
EOF

batch -q c << EOF
# Very low priority job (load threshold: 0.8)
echo "This runs only when system is very idle"
EOF
```

#### Queue Management
```bash
# List jobs by queue
atq | grep "^b"    # Batch queue
atq | grep "^c"    # Low priority queue

# Move jobs between queues (delete and reschedule)
JOB_ID=$(atq | grep "script.sh" | awk '{print $1}')
at -d $JOB_ID
batch -q c -f script.sh

# Monitor queue status
watch -n 10 'atq'
```

### Integration with Cron

#### Hybrid Scheduling
```bash
# Cron job that schedules batch jobs
# Add to crontab: 0 2 * * * /usr/local/bin/schedule_maintenance.sh

#!/bin/bash
# schedule_maintenance.sh

# Schedule batch jobs during nightly maintenance window
batch -t 02:30 << 'EOF'
# System updates
apt-get update && apt-get -y upgrade

# Log rotation
logrotate -f /etc/logrotate.conf

# Disk cleanup
find /tmp -type f -mtime +7 -delete
EOF

batch -t 03:00 << 'EOF'
# Database maintenance
mysqldump --all-databases | gzip > /backup/daily_db.sql.gz

# Optimize databases
mysql -e "OPTIMIZE TABLE database_name.*"
EOF
```

#### Load-Based Automation
```bash
# Monitor and schedule based on system conditions
#!/bin/bash
# load_based_scheduler.sh

CURRENT_LOAD=$(cat /proc/loadavg | cut -d' ' -f1)
THRESHOLD=1.0

if (( $(echo "$CURRENT_LOAD < $THRESHOLD" | bc -l) )); then
    batch << EOF
    # System is idle, run maintenance tasks
    updatedb
    apt-get update

    # Process queued files
    find /var/spool/processing -type f -exec process_file {} \;
EOF
fi
```

## Automation and Scripting

### Complex Batch Workflows

#### Multi-Stage Processing
```bash
#!/bin/bash
# complex_workflow.sh

# Stage 1: Data collection
cat << 'EOF' > /tmp/stage1.sh
# Collect data from various sources
curl -s "http://api.example.com/data" > /tmp/data1.json
wget -q "http://data.example.com/dataset.csv" -O /tmp/dataset.csv
find /data/raw -name "*.txt" -exec cat {} \; > /tmp/text_data.txt
EOF

# Stage 2: Data processing
cat << 'EOF' > /tmp/stage2.sh
# Process collected data
python process_json.py /tmp/data1.json > /tmp/processed1.txt
Rscript process_csv.R /tmp/dataset.csv /tmp/processed2.csv
sort /tmp/text_data.txt | uniq > /tmp/processed3.txt
EOF

# Stage 3: Report generation
cat << 'EOF' > /tmp/stage3.sh
# Generate final reports
python generate_report.py --inputs /tmp/processed* --output /reports/final_report.pdf
cp /tmp/processed* /archive/$(date +%Y%m%d)/
EOF

# Schedule stages in sequence
batch -f /tmp/stage1.sh
batch -t "now + 30 minutes" -f /tmp/stage2.sh
batch -t "now + 1 hour" -f /tmp/stage3.sh
```

#### Dependency Management
```bash
#!/bin/bash
# dependency_manager.sh

# Function to wait for job completion
wait_for_job() {
    local job_id=$1
    while atq | grep -q "^$job_id"; do
        sleep 30
    done
}

# Schedule initial job
JOB1=$(batch << 'EOF'
# Data download
wget -r -np -nH --cut-dirs=1 -A "*.csv" "http://data.example.com/daily/"
EOF | awk '{print $2}')

# Schedule dependent job
batch -t "now + 1 hour" << EOF
# Data processing (runs after download completes)
wait_for_job $JOB1
python process_daily_data.py /data/daily/*.csv
EOF
```

### Error Handling and Recovery

#### Robust Batch Scripts
```bash
#!/bin/bash
# robust_batch.sh

# Error handling function
handle_error() {
    local exit_code=$1
    local job_name=$2

    if [ $exit_code -ne 0 ]; then
        echo "Error in $job_name (exit code: $exit_code)" | mail -s "Batch Job Failed" admin@example.com
        exit $exit_code
    fi
}

# Create batch job with error handling
cat << 'EOF' > /tmp/safe_job.sh
#!/bin/bash

# Set error handling
set -e
trap 'handle_error $? "backup_job"' ERR

# Backup with validation
tar -czf /backup/system_$(date +%Y%m%d).tar.gz /etc /home
handle_error $? "backup_creation"

# Verify backup
tar -tzf /backup/system_$(date +%Y%m%d).tar.gz > /dev/null
handle_error $? "backup_verification"

# Clean old backups
find /backup -name "system_*.tar.gz" -mtime +7 -delete
handle_error $? "cleanup"

echo "Backup completed successfully"
EOF

chmod +x /tmp/safe_job.sh
batch -f /tmp/safe_job.sh
```

#### Logging and Monitoring
```bash
#!/bin/bash
# batch_monitor.sh

LOG_FILE="/var/log/batch_jobs.log"
LOCK_FILE="/var/run/batch_monitor.lock"

# Function to log with timestamp
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

# Monitor batch jobs
monitor_batch_jobs() {
    log_message "Starting batch job monitoring"

    while true; do
        JOB_COUNT=$(atq | wc -l)

        if [ $JOB_COUNT -gt 0 ]; then
            log_message "Jobs in queue: $JOB_COUNT"
            atq >> $LOG_FILE
        fi

        # Check for stuck jobs (older than 24 hours)
        atq | awk '{print $2}' | while read job_time; do
            job_timestamp=$(date -d "$job_time" +%s)
            current_timestamp=$(date +%s)
            age=$((current_timestamp - job_timestamp))

            if [ $age -gt 86400 ]; then  # 24 hours
                log_message "WARNING: Job older than 24 hours detected: $job_time"
            fi
        done

        sleep 300  # Check every 5 minutes
    done
}

# Start monitoring in background
if [ ! -f $LOCK_FILE ]; then
    touch $LOCK_FILE
    monitor_batch_jobs &
    echo $! > /var/run/batch_monitor.pid
fi
```

## Troubleshooting

### Common Issues

#### Jobs Not Executing
```bash
# Check if batch daemon is running
systemctl status atd

# Start atd service if not running
sudo systemctl start atd
sudo systemctl enable atd

# Check system load
cat /proc/loadavg
uptime

# Check if load threshold is too high
# Adjust by using different queue
batch -q b << EOF
echo "This will run with lower load threshold"
EOF
```

#### Permission Issues
```bash
# Check if user can use batch
echo $USER | sudo tee /etc/at.allow

# Check at.deny file
cat /etc/at.deny

# Verify batch command accessibility
which batch
ls -la $(which batch)
```

#### Job Queue Problems
```bash
# Check queue status
atq

# Clear stuck jobs
atq | awk '{print $1}' | xargs -r at -d

# Restart atd service
sudo systemctl restart atd

# Check system logs for batch errors
sudo journalctl -u atd -f
```

#### Email Notification Issues
```bash
# Test mail configuration
echo "Test" | mail -s "Test email" $USER

# Check mail configuration
cat /etc/mail.rc
which mail

# Configure mail for batch notifications
export MAILTO=admin@example.com
batch -m << EOF
echo "Job completed at $(date)"
EOF
```

### Debugging Batch Jobs

#### Job Inspection
```bash
# Create test job
JOB_ID=$(batch << 'EOF'
echo "Starting job at $(date)"
sleep 300
echo "Job completed at $(date)"
EOF | awk '{print $1}')

# View job details
at -c $JOB_ID

# Monitor job execution
watch -n 5 'atq'

# Check job output
# Jobs output is mailed to user; check mail
mail
```

#### Logging and Troubleshooting
```bash
# Create job with detailed logging
batch << 'EOF'
#!/bin/bash
exec > /tmp/batch_debug.log 2>&1

echo "Job started at $(date)"
echo "User: $USER"
echo "Working directory: $(pwd)"
echo "Environment variables:"
env

echo "Job execution..."
# Your commands here

echo "Job completed at $(date)"
EOF

# Monitor log file
tail -f /tmp/batch_debug.log
```

## Related Commands

- [`at`](/docs/commands/system-service/at) - Schedule commands to be executed once at a future time
- [`atq`](/docs/commands/system-service/atq) - List the user's pending jobs
- [`atrm`](/docs/commands/system-service/atrm) - Delete jobs, identified by their job number
- [`cron`](/docs/commands/system-service/cron) - Daemon to execute scheduled commands
- [`crontab`](/docs/commands/system-service/crontab) - Maintain crontab files for individual users
- [`nice`](/docs/commands/system-information/nice) - Run a program with modified scheduling priority
- [`nohup`](/docs/commands/system-information/nohup) - Run a command immune to hangups
- [`renice`](/docs/commands/system-information/renice) - Alter priority of running processes

## Best Practices

1. **Use batch for resource-intensive tasks** that shouldn't interfere with interactive work
2. **Monitor system load** to understand when batch jobs are likely to execute
3. **Use appropriate queues** (b, c, etc.) based on priority requirements
4. **Implement proper error handling** in batch scripts to handle failures gracefully
5. **Use logging** to track job execution and debug issues
6. **Test jobs interactively** before scheduling them as batch jobs
7. **Use email notifications** (-m) for important jobs that require confirmation
8. **Clean up temporary files** and manage disk space in batch jobs
9. **Consider system maintenance windows** when scheduling critical batch jobs
10. **Use absolute paths** in batch scripts to avoid path-related issues

## Performance Tips

1. **Group related commands** into single batch jobs to minimize overhead
2. **Use appropriate I/O redirection** to handle large amounts of output
3. **Schedule I/O-intensive jobs** during low-usage periods
4. **Monitor system resources** to identify optimal batch scheduling times
5. **Use compression** for large files to reduce I/O and storage requirements
6. **Parallelize independent tasks** within batch jobs when possible
7. **Clean up intermediate files** to conserve disk space during long-running jobs
8. **Use checkpoints** in very long jobs to enable resuming from interruption
9. **Optimize database queries** and operations used in batch jobs
10. **Consider using `nice`** within batch jobs for additional process control

The `batch` command is an essential tool for system administrators and developers who need to run resource-intensive tasks without impacting system performance. Its intelligent load-based scheduling makes it ideal for maintenance, backup, data processing, and other background tasks that can wait for optimal system conditions.