---
title: atrm - Delete jobs queued by at
sidebar_label: atrm
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# atrm - Delete jobs queued by at

The `atrm` command is a utility for removing jobs that have been scheduled with the `at` command. It is part of the `at` suite of tools that allow users to schedule commands and scripts to be executed at a later time. The `atrm` command provides a simple way to delete pending jobs from the at queue before they are executed, giving administrators and users control over their scheduled tasks.

The command works by removing job files from the at spool directory (`/var/spool/at` or `/var/spool/cron/atjobs` on most systems) and updating the job queue accordingly. It can delete single jobs, multiple jobs, or even all jobs belonging to a specific user, making it an essential tool for managing scheduled tasks in Linux environments.

## Basic Syntax

```bash
atrm [OPTIONS] JOB [JOB...]
```

## Common Options

### Job Selection
- `-i, --interactive` - Prompt before deleting each job
- `-a, --all` - Delete all jobs belonging to the current user
- `-q QUEUE, --queue=QUEUE` - Specify the queue (a, b, c...). Default is 'a'

### User Options
- `-V, --version` - Display version information
- `-h, --help` - Display help message

## Usage Examples

### Basic Job Management

#### Viewing Jobs Before Deletion
```bash
# List all pending jobs
atq

# List jobs with detailed information
atq -v

# List jobs for specific user
atq username

# View job details before deletion
at -c job_number
```

#### Deleting Single Jobs
```bash
# Delete job with ID 5
atrm 5

# Delete job with ID 12 (requires confirmation)
atrm -i 12

# Delete job from specific queue
atrm -q b 8
```

#### Deleting Multiple Jobs
```bash
# Delete multiple jobs at once
atrm 5 7 12 15

# Delete a range of jobs
atrm 5 6 7 8 9

# Delete jobs with confirmation for each
atrm -i 3 7 11
```

#### Deleting All Jobs
```bash
# Delete all jobs for current user
atrm -a

# Delete all jobs with confirmation
atrm -a -i

# Delete all jobs from specific queue
atrm -a -q b
```

### Administrative Usage

#### Deleting Jobs as Root
```bash
# List all jobs from all users (as root)
atq -a

# Delete job for specific user (as root)
atrm 5  # Using job number

# Delete all jobs for specific user (as root)
su - username -c "atrm -a"

# Delete job from any user when root
atrm 5  # Job number visible to all users for root
```

#### Managing System-wide Jobs
```bash
# Remove all pending system jobs
atrm -a

# Check for stuck jobs and remove them
atq
atrm $(atq | awk '{print $1}')

# Clean up old jobs from specific queue
atrm -a -q b
```

### Advanced Usage

#### Script-based Job Management
```bash
#!/bin/bash
# Delete jobs older than 7 days

# Get job details and filter by date
for job in $(atq | awk '{print $1}'); do
    job_time=$(at -c "$job" | grep "date" | head -1)
    # Add logic to check if job is older than 7 days
    # atrm "$job" if condition is met
done
```

#### Interactive Job Management
```bash
# Interactive job deletion with details
atrm -i $(atq | awk '{print $1}')

# Delete jobs matching specific pattern
atq | grep "backup" | awk '{print $1}' | xargs atrm

# Delete jobs from specific user (as root)
atq | grep "username" | awk '{print $1}' | xargs atrm
```

## Practical Examples

### System Administration

#### Scheduled Task Cleanup
```bash
# Daily cleanup of failed or outdated jobs
#!/bin/bash
# Cleanup script for at jobs

# List all jobs
atq > /tmp/current_jobs.txt

# Remove jobs that are stuck (older than 24 hours)
while read job; do
    job_id=$(echo "$job" | awk '{print $1}')
    # Check job creation time and remove if old
    atrm "$job_id"
done < /tmp/current_jobs.txt

# Remove temporary file
rm /tmp/current_jobs.txt
```

#### Maintenance Window Management
```bash
# Remove all maintenance jobs before emergency maintenance
atrm -a

# Create new emergency maintenance job
echo "emergency_shutdown.sh" | at now + 5 minutes

# Remove conflicting jobs
atq | grep -E "(backup|update|reboot)" | awk '{print $1}' | xargs atrm
```

#### User Job Management
```bash
# Script to manage user jobs
#!/bin/bash
# User job cleanup utility

USER=$1
if [ -z "$USER" ]; then
    USER=$(whoami)
fi

echo "Jobs for user $USER:"
atq | grep "$USER"

echo "Delete all jobs for $USER? (y/n)"
read answer
if [ "$answer" = "y" ]; then
    su - "$USER" -c "atrm -a"
    echo "All jobs deleted for $USER"
fi
```

### Development Workflow

#### Test Environment Management
```bash
# Clean up test jobs
atrm -a

# Schedule new test jobs
echo "run_tests.sh" | at now + 1 hour
echo "deploy_test.sh" | at now + 2 hours

# Remove specific test jobs if needed
atrm $(atq | grep "test" | awk '{print $1}')
```

#### Build Job Management
```bash
# Remove failed build jobs
atq | grep "build" | grep "failed" | awk '{print $1}' | xargs atrm

# Cancel pending builds before code freeze
atrm $(atq | grep "deploy" | awk '{print $1}')

# Keep only critical jobs
critical_jobs=$(atq | grep -E "(security|backup)" | awk '{print $1}')
atrm -a
echo "$critical_jobs" | xargs -I {} atrm {}
```

### Backup and Recovery

#### Backup Job Management
```bash
# Remove old backup jobs
atrm $(atq | grep "old_backup" | awk '{print $1}')

# Reschedule backup jobs
echo "backup_system.sh" | at 2am tomorrow
echo "backup_database.sh" | at 3am tomorrow

# Remove conflicting backup jobs
atrm $(atq | grep -E "(backup.*running|backup.*stuck)" | awk '{print $1}')
```

#### Disaster Recovery Planning
```bash
# Clear all scheduled jobs during disaster recovery
atrm -a

# Schedule emergency recovery tasks
echo "emergency_recovery.sh" | at now
echo "system_check.sh" | at now + 30 minutes

# Maintain only critical system jobs
atrm $(atq | grep -v "critical" | awk '{print $1}')
```

## Advanced Usage

### Job Queue Analysis

#### Job Statistics
```bash
# Count jobs by user
atq | awk '{print $2}' | sort | uniq -c

# Count jobs by queue
atq | awk '{print $1}' | cut -c1 | sort | uniq -c

# Find oldest jobs
atq | sort -k6,6 -k7,7

# Show job density by time
atq | awk '{print $6,$7}' | sort | uniq -c
```

#### Job Monitoring
```bash
# Monitor job queue changes
watch -n 60 'atq | wc -l'

# Alert if too many jobs are queued
if [ $(atq | wc -l) -gt 100 ]; then
    echo "Warning: Too many jobs in queue"
    atq | mail -s "Job queue alert" admin@example.com
fi
```

### Integration with Other Tools

#### Cron Integration
```bash
# Daily job cleanup via cron
0 3 * * * /usr/local/bin/cleanup_at_jobs.sh

# Weekly job analysis
0 6 * * 0 atq > /var/log/at_jobs_weekly.log && \
    echo "Weekly job report generated" | mail -s "AT Job Report" admin@example.com
```

#### System Monitoring Integration
```bash
# Nagios check for job queue
#!/bin/bash
job_count=$(atq | wc -l)
if [ $job_count -gt 50 ]; then
    echo "CRITICAL: Too many jobs in queue: $job_count"
    exit 2
elif [ $job_count -gt 20 ]; then
    echo "WARNING: Many jobs in queue: $job_count"
    exit 1
else
    echo "OK: Job queue normal: $job_count jobs"
    exit 0
fi
```

## Troubleshooting

### Common Issues

#### Permission Denied Errors
```bash
# Problem: Can't delete jobs as regular user
# Solution: Check job ownership
atq
ls -la /var/spool/at/*

# Delete only your own jobs
atrm $(atq | grep "$(whoami)" | awk '{print $1}')

# For system-wide deletion, use sudo
sudo atrm -a
```

#### Job Still Shows After Deletion
```bash
# Problem: Job still appears in atq after deletion
# Solution: Force refresh of queue
atrm 5
atq
sudo systemctl restart atd

# Check for stuck lock files
sudo rm -f /var/spool/at/.SEQ
sudo systemctl restart atd
```

#### Unable to Delete Specific Jobs
```bash
# Problem: Job deletion fails
# Solution: Check job status and permissions
at -c 5  # View job details

# Check if job is currently running
ps aux | grep at

# Force deletion if job is stuck
sudo rm -f /var/spool/at/a00005c015e3
```

#### Service Issues
```bash
# Problem: atd service not running
# Solution: Start the service
sudo systemctl status atd
sudo systemctl start atd
sudo systemctl enable atd

# Check service logs
sudo journalctl -u atd -f
```

### Debugging Techniques

#### Job Inspection
```bash
# View detailed job information before deletion
at -c 123

# Check job file directly
cat /var/spool/at/a000123c015e3

# Monitor job directory
sudo watch -n 1 'ls -la /var/spool/at/'
```

#### Queue Analysis
```bash
# Analyze job patterns
atq | awk '{print $NF}' | sort | uniq -c | sort -nr

# Find problematic jobs
atq | grep -E "(error|fail|stuck)"

# Check job queue integrity
sudo atd -d  # Debug mode
```

## Related Commands

- [`at`](/docs/commands/system-services/at) - Schedule commands to be executed at a later time
- [`atq`](/docs/commands/other/atq) - List jobs queued by at
- [`batch`](/docs/commands/system-services/batch) - Execute commands when system load permits
- [`crontab`](/docs/commands/system-services/crontab) - Schedule periodic commands
- [`cron`](/docs/commands/system-services/cron) - Daemon to execute scheduled commands

## Best Practices

1. **Always check job list** before deletion with `atq` to avoid mistakes
2. **Use interactive mode** (`-i`) when deleting important jobs
3. **Verify job ownership** - users can only delete their own jobs
4. **Document job management** processes for system administration
5. **Regular cleanup** of old or completed jobs to maintain system efficiency
6. **Test deletions** in development environments before production
7. **Backup job information** before mass deletions
8. **Use appropriate permissions** - avoid using root unless necessary
9. **Monitor job queue** size to prevent system overload
10. **Integrate with monitoring** systems for job queue management

## Performance Tips

1. **Batch deletions** are more efficient than individual deletions
2. **Use queue-specific deletions** to target specific job types
3. **Schedule regular cleanup** during low-usage periods
4. **Monitor system load** when managing large numbers of jobs
5. **Use scripting** for repetitive job management tasks
6. **Optimize job scheduling** to reduce the need for frequent deletions
7. **Implement job lifecycle policies** to automate cleanup
8. **Track deletion patterns** to identify scheduling improvements

The `atrm` command is an essential tool for managing scheduled tasks in Linux environments. It provides the flexibility and control needed to maintain efficient job queues, prevent task conflicts, and ensure that scheduled operations align with current system requirements and administrative policies.