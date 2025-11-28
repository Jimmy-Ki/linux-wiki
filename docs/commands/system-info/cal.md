---
title: cal - Display calendar
sidebar_label: cal
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cal - Display calendar

The `cal` command displays a simple calendar and provides various options to view calendars for different months, years, and Julian/Gregorian calendar systems. It's a versatile utility that can display the current month, specific months, entire years, and even handle historical date calculations with the Gregorian calendar reform. The command is particularly useful for date planning, historical research, and understanding calendar transitions between different eras.

## Basic Syntax

```bash
cal [OPTIONS] [[MONTH] YEAR]
cal [OPTIONS] [YEAR]
```

## Common Options

### Display Options
- `-1, --one` - Show only current month (default behavior)
- `-3, --three` - Show previous, current, and next month
- `-s, --sunday` - Sunday as first day of week (default)
- `-m, --monday` - Monday as first day of week
- `-j, --julian` - Display Julian days (days numbered from January 1)
- `-y, --year` - Display entire calendar year
- `-n, --months N` - Show N months (starting with current)

### Calendar Systems
- `--reform` - Show Gregorian calendar reform dates
- `--iso` - ISO week numbers

### Information
- `-h, --help` - Display help information
- `-V, --version` - Show version information

## Usage Examples

### Basic Calendar Operations

#### Displaying Current Month
```bash
# Display current month (default behavior)
cal

# Explicitly show only current month
cal -1

# Show with Sunday as first day
cal -s

# Show with Monday as first day
cal -m
```

#### Displaying Specific Months and Years
```bash
# Display specific month and year
cal 12 2024

# Display entire year
cal 2024

# Display year with Julian days
cal -j 2024

# Display current year
cal -y

# Display three months (prev, current, next)
cal -3
```

#### Multiple Months Display
```bash
# Show next 3 months including current
cal -n 3

# Show next 6 months
cal -n 6

# Show current year with Monday as first day
cal -m -y
```

### Julian Calendar Operations

#### Julian Day Display
```bash
# Show current month with Julian days
cal -j

# Show specific month with Julian days
cal -j 6 2024

# Show entire year with Julian days
cal -j -y 2024
```

#### Calendar Reform Information
```bash
# Show Gregorian calendar reform information
cal --reform

# Display historical calendar transition dates
cal 9 1752
```

## Practical Examples

### Date Planning and Management

#### Work Schedule Planning
```bash
# Display three-month view for quarterly planning
cal -3

# Show current quarter with Monday as first day (work week)
cal -m -n 3

# Display year with week numbers for project planning
cal -y --iso
```

#### Holiday and Event Planning
```bash
# Show December for holiday planning
cal 12

# Display summer months for vacation planning
cal -n 3 6

# Show leap year February
cal 2 2024
```

### Historical and Research Applications

#### Historical Date Calculations
```bash
# Show calendar during Gregorian reform
cal 9 1752

# Display century years for historical research
cal 1900

# Show Julian calendar for ancient dates
cal -j 1582
```

#### Date Validation and Verification
```bash
# Check if a specific date exists
cal 2 2024  # Leap year check

# Verify day of week for historical dates
cal 7 20 1969  # Moon landing

# Show calendar for birth dates
cal 6 1985
```

### System Administration

#### Log Analysis and Time Management
```bash
# Quick date reference for log analysis
cal -3

# Show current date context
cal

# Display month overview for system maintenance scheduling
cal -m
```

#### Backup and Maintenance Planning
```bash
# Plan monthly backups
cal -n 2

# Show end-of-year maintenance window
cal 12

# Display quarterly maintenance periods
cal -n 3 1  # Q1
cal -n 3 4  # Q2
cal -n 3 7  # Q3
cal -n 3 10 # Q4
```

### Development and Programming

#### Date Function Testing
```bash
# Verify date calculations
cal -j

# Test month boundaries
cal 1 2000  # Y2K verification
cal 2 2000  # Leap year verification

# Display calendar for unit testing date functions
cal 12 1999
```

#### Application Development
```bash
# Generate calendar data for applications
cal -y > yearly_calendar.txt

# Create month data for calendar widgets
cal -m 6 > june_calendar.txt

# Export Julian days for scientific applications
cal -j -y > julian_calendar.txt
```

## Advanced Usage

### Calendar System Configurations

#### Week Start Day Customization
```bash
# Set Monday as first day for European style
cal -m

# Set Sunday as first day for American style
cal -s

# Create custom calendar views
alias cal-euro='cal -m'
alias cal-us='cal -s'
```

#### Extended Calendar Views
```bash
# Show half-year view
cal -n 6

# Display school year (Sep-Aug)
cal -n 12 9

# Show fiscal year (Jul-Jun)
cal -n 12 7
```

### Date Range Calculations

#### Business Day Calculations
```bash
# Show work week context
cal -m

# Display weekend context
cal -s

# Plan business quarters
cal -n 3 1  # Q1 business days
```

#### Event Timeline Planning
```bash
# Show event planning horizon
cal -n 4

# Display semester calendar
cal -n 5 8  # Fall semester

# Show academic year
cal -n 9 9  # Academic year start
```

### Automation and Scripting

#### Calendar Script Integration
```bash
#!/bin/bash
# Calendar-based reminder system

CURRENT_MONTH=$(date +%m)
CURRENT_YEAR=$(date +%Y)

# Show current month context
echo "Current month:"
cal $CURRENT_MONTH $CURRENT_YEAR

# Show upcoming 3 months
echo -e "\nUpcoming months:"
cal -n 3

# Check for special dates
if [ $(date +%d) -eq 1 ]; then
    echo "Happy first day of the month!"
    cal -3
fi
```

#### Log File Organization
```bash
#!/bin/bash
# Monthly log rotation planning

TARGET_YEAR=2024

for month in {1..12}; do
    echo "Planning logs for $month/$TARGET_YEAR:"
    cal $month $TARGET_YEAR
    echo "Weekend backup schedule:"
    # Add weekend detection logic here
done
```

### Cultural and Regional Calendars

#### International Calendar Support
```bash
# European style calendar (Monday first)
cal -m

# American style calendar (Sunday first)
cal -s

# ISO week numbering
cal --iso -y
```

#### Special Date Displays
```bash
# Show Friday the 13th occurrences
for month in {1..12}; do
    if cal $month 2023 | grep -q "13.*F"; then
        echo "Friday the 13th in month $month"
        cal $month 2023
    fi
done
```

## Integration and Automation

### Shell Functions and Aliases

#### Custom Calendar Functions
```bash
# Function to show work week calendar
workweek() {
    cal -m -3
}

# Function to show weekend-focused calendar
weekends() {
    cal -s -3
}

# Function to show academic calendar
academic() {
    CURRENT_MONTH=$(date +%m)
    if [ $CURRENT_MONTH -ge 8 ]; then
        cal -n 5 $CURRENT_MONTH
    else
        cal -n 5 8
    fi
}

# Function for project planning
project_timeline() {
    echo "Project timeline - Next 6 months:"
    cal -n 6
    echo "Week numbers included:"
    cal --iso -n 6
}
```

#### Calendar Reminders
```bash
# Birthday reminder function
birthday_reminder() {
    BIRTHDAY_MONTH=$1
    BIRTHDAY_DAY=$2
    CURRENT_YEAR=$(date +%Y)

    echo "Birthday countdown for $BIRTHDAY_DAY/$BIRTHDAY_MONTH:"
    cal $BIRTHDAY_MONTH $CURRENT_YEAR
}

# Anniversary reminder function
anniversary_countdown() {
    ANNIVERSARY_MONTH=$1
    ANNIVERSARY_DAY=$2
    YEARS=$3

    echo "$YEARS year anniversary:"
    cal $ANNIVERSARY_MONTH $(($(date +%Y) - $YEARS))
}
```

### System Integration Scripts

#### Backup Scheduling Script
```bash
#!/bin/bash
# Automated backup calendar generator

BACKUP_MONTHS=("Jan" "Feb" "Mar" "Apr" "May" "Jun")
CURRENT_YEAR=$(date +%Y)

echo "Backup Schedule for $CURRENT_YEAR:"
for i in "${!BACKUP_MONTHS[@]}"; do
    MONTH=$((i + 1))
    echo "${BACKUP_MONTHS[$i]} Backup Calendar:"
    cal $MONTH $CURRENT_YEAR
    echo "Backup dates: First Sunday of month"
done
```

#### Maintenance Planning Script
```bash
#!/bin/bash
# System maintenance calendar planner

echo "Quarterly Maintenance Calendar $CURRENT_YEAR:"
echo "Q1 (Jan-Mar):"
cal -n 3 1
echo "Q2 (Apr-Jun):"
cal -n 3 4
echo "Q3 (Jul-Sep):"
cal -n 3 7
echo "Q4 (Oct-Dec):"
cal -n 3 10
```

## Troubleshooting

### Common Issues

#### Display Problems
```bash
# Terminal not displaying calendar properly
# Solution: Check terminal encoding
export LANG=en_US.UTF-8
locale
cal

# Calendar showing wrong characters
# Solution: Use ASCII mode
LC_ALL=C cal

# Display width issues
# Solution: Use wider terminal or compact view
cal -y | head -20
```

#### Date and Locale Issues
```bash
# Wrong language display
# Solution: Set appropriate locale
export LANG=en_US.UTF-8
cal

# Date format confusion
# Solution: Use explicit month/year format
cal 12 2024

# Week start day confusion
# Solution: Explicitly specify week start
cal -s  # Sunday first
cal -m  # Monday first
```

#### Historical Calendar Issues
```bash
# Gregorian reform dates not showing
# Solution: Use reform option
cal --reform

# Julian days not displaying
# Solution: Use Julian option
cal -j

# Historical dates showing incorrectly
# Solution: Check year format (use 4-digit years)
cal 1752  # Show reform year
```

### Performance Issues

#### Large Calendar Displays
```bash
# Year display too wide
# Solution: Use pagination
cal -y | less

# Terminal scrolling issues
# Solution: Limit display range
cal -n 6

# Memory issues with large displays
# Solution: Use smaller chunks
for month in {1..12}; do
    echo "Month $month:"
    cal $month 2024
done
```

## Related Commands

- [`date`](/docs/commands/system-info/date) - Display or set date and time
- [`ncal`](/docs/commands/system-info/ncal) - Alternative calendar display
- [`uptime`](/docs/commands/system-info/uptime) - System uptime and current time
- [`timedatectl`](/docs/commands/system-info/timedatectl) - System time and date management
- [`date`](/docs/commands/system-info/date) - Date formatting and calculation
- [`printf`](/docs/commands/system-info/printf) - Format and print data (date formatting)

## Best Practices

1. **Use `-3` for context** when planning events across multiple months
2. **Specify week start day** (`-m` or `-s`) for consistent display
3. **Use 4-digit years** to avoid ambiguity (e.g., `cal 12 2024` instead of `cal 12 24`)
4. **Check leap years** with February display when planning date-sensitive events
5. **Use Julian days** (`-j`) for scientific calculations and day counting
6. **Validate dates** before using them in scripts by displaying the calendar
7. **Consider locale settings** when sharing calendar information internationally
8. **Use pagination** (`| less`) for large calendar displays like full years
9. **Plan around historical dates** with care, especially around 1752 Gregorian reform
10. **Test calendar displays** in different terminals when using in scripts

## Performance Tips

1. **Use specific month/year** rather than full year when possible
2. **Limit month count** with `-n` for better performance
3. **Avoid repeated calls** in scripts - store calendar output in variables
4. **Use appropriate terminal width** for optimal display
5. **Consider locale impact** on performance in international environments
6. **Cache calendar output** when using repeatedly in scripts
7. **Use `-1` for fastest display** when only current month is needed
8. **Minimize options** in automated scripts for better performance
9. **Test display width** before showing large calendars
10. **Use `cal --reform`** judiciously as it requires additional calculations

The `cal` command is a simple yet powerful utility for displaying calendar information. Its flexibility in showing different time periods, calendar systems, and week start configurations makes it invaluable for date planning, historical research, and system administration tasks. When integrated into scripts and combined with other date utilities, it becomes an essential tool for any Linux user's productivity toolkit.