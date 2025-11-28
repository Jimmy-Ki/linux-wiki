---
title: elm - Terminal-based email client
sidebar_label: elm
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# elm - Terminal-based email client

The `elm` command is a classic terminal-based email client for Unix-like systems, designed to provide efficient email management through a simple text-based interface. Elm (Electronic Mail) was one of the earliest popular email clients for UNIX, featuring a menu-driven interface, powerful filtering capabilities, and support for multiple mailboxes. It is particularly useful for system administrators and users who prefer lightweight, keyboard-driven email management without the overhead of graphical clients.

## Basic Syntax

```bash
elm [OPTIONS] [FOLDER]
```

## Main Menu Commands

### Navigation
- `↑` or `k` - Move cursor up
- `↓` or `j` - Move cursor down
- `→` or `l` - View current message
- `←` or `h` - Return to index
- `Space` or `n` - Next page
- `-` or `p` - Previous page
- `Home` or `g` - Go to first message
- `End` or `G` - Go to last message

### Message Operations
- `Enter` or `m` - Read current message
- `d` - Delete current message
- `u` - Undelete current message
- `r` - Reply to current message
- `f` - Forward current message
- `b` - Bounce message (remail without editing)
- `s` - Save message to folder
- `c` - Copy message to folder
- `e` - Edit current message
- `p` - Print current message

### Folder and Mailbox Operations
- `c` or `C` - Change to another folder
- `t` - Tag/untag current message
- `;` - Perform operation on tagged messages
- `= or $` - Synchronize mailbox
- `!` - Shell escape
- `?` - Help screen

## Command Line Options

### Basic Options
- `-f FOLDER` - Specify mailbox folder to open
- `-h` - Display help information
- `-v` - Show version information
- `-z` - Exit immediately if no new mail

### Configuration Options
- `-i FILE` - Specify alternate configuration file
- `-k` - Read only mailbox (no modifications)
- `-A` - Use arrow keys for navigation
- `-M` - Enable mouse support (if compiled)

### Display Options
- `-s` - Show summary of new messages
- `-n` - Display message numbers
- `-N` - Show only new messages
- `-r` - Use remote mailbox (POP/IMAP)

### Editing Options
- `-e EDITOR` - Specify editor for composing messages
- `-s SUBJECT` - Set subject for new message
- `-t TO` - Set recipient for new message

## Configuration Files

### Main Configuration (~/.elm/elmrc)
```bash
# Basic settings
host = mail.example.com
user = username
realname = "Your Name"
from = "username@example.com"

# Mailbox locations
maildir = /var/spool/mail/username
sentmail = ~/Mail/sent

# Display options
sortby = date
headers = THCC Subject From Date

# Editor configuration
editor = /usr/bin/vi
visual = /usr/bin/vi
alteditor = /usr/bin/emacs

# Remote mail settings
pop = mail.example.com
popuser = username
poppass = password
```

### Mailbox Aliases (~/.elm/aliases)
```bash
# Personal aliases
friend: friend@example.com
work: work@example.com

# Group aliases
team: user1@example.com,user2@example.com,user3@example.com
family: mom@example.com,dad@example.com

# Mailing list aliases
dev-team: dev-team@example.com
announce: announce@example.com
```

## Usage Examples

### Basic Email Operations

#### Reading Mail
```bash
# Start elm and open default mailbox
elm

# Open specific mailbox folder
elm -f ~/Mail/projects

# Check for new mail only
elm -z

# Read mail in read-only mode
elm -k

# Show only new messages
elm -N
```

#### Sending Email
```bash
# Start composing new message
elm -s "Meeting Tomorrow" boss@example.com

# Send message with attachment (requires additional tools)
uuencode document.txt document.txt | elm -s "Document Attached" user@example.com

# Send message to multiple recipients
elm -s "Team Update" team@example.com,user@example.com

# Compose message with specific editor
EDITOR=emacs elm -s "Report" manager@example.com
```

### Advanced Mail Management

#### Message Filtering and Organization
```bash
# Set up automatic mail filtering (in .elm/elmrc)
filter = "~/Mail/filter.rul"

# Create filter rules file (filter.rul)
if (subject contains "urgent") then save "~/Mail/urgent"
if (from contains "boss") then save "~/Mail/boss"
if (subject contains "spam") then delete
```

#### Multiple Mailbox Management
```bash
# Check mail in different mailboxes
elm -f ~/Mail/personal
elm -f ~/Mail/work
elm -f ~/Mail/projects

# Create symbolic links for easy access
ln -s ~/Mail/personal ~/mail.personal
elm -f ~/mail.personal

# Use mailbox aliases in configuration
mailbox personal = ~/Mail/personal
mailbox work = ~/Mail/work
mailbox projects = ~/Mail/projects
```

### Remote Mail Access

#### POP3 Mail Retrieval
```bash
# Configure POP3 access in ~/.elm/elmrc
pop = pop.example.com
popuser = username
poppass = password
popkeep = yes

# Retrieve mail from POP server
elm

# Check specific POP mailbox
elm -f pop:username@pop.example.com

# Retrieve and delete from server
elm -f pop:username@pop.example.com -D
```

#### IMAP Configuration
```bash
# IMAP configuration
imap = imap.example.com
imapuser = username
imappass = password
imapfolder = INBOX

# Connect to IMAP mailbox
elm -f imap:username@imap.example.com/INBOX
```

## Practical Examples

### System Administration

#### Automated Mail Monitoring
```bash
#!/bin/bash
# Monitor system mail for alerts
MONITOR_MAIL="/var/spool/mail/root"
ALERT_LOG="/var/log/mail_alert.log"

# Check for new system mail
if [ -s "$MONITOR_MAIL" ]; then
    echo "New system mail detected at $(date)" >> "$ALERT_LOG"

    # Check for critical messages
    if elm -f "$MONITOR_MAIL" | grep -q "ERROR\|CRITICAL\|ALERT"; then
        echo "Critical system mail found!" | \
        mail -s "System Alert" admin@example.com
    fi

    # Display summary
    elm -f "$MONITOR_MAIL" -s
fi
```

#### Log Mail Processing
```bash
#!/bin/bash
# Process log reports via email
LOG_DIR="/var/log"
REPORT_EMAIL="admin@example.com"

# Generate daily log report
{
    echo "Daily System Report - $(date)"
    echo "==============================="
    echo ""

    # Disk usage
    df -h
    echo ""

    # Memory usage
    free -m
    echo ""

    # Recent errors
    tail -20 /var/log/messages | grep -i error
} | elm -s "Daily System Report" "$REPORT_EMAIL"
```

### Development Workflow

#### Code Review Notifications
```bash
#!/bin/bash
# Automated code review email notifications
REPO_DIR="/home/user/projects/myapp"
TEAM_EMAIL="dev-team@example.com"

# Check for recent commits
cd "$REPO_DIR"
RECENT_COMMITS=$(git log --since="1 day ago" --oneline)

if [ -n "$RECENT_COMMITS" ]; then
    {
        echo "Recent Code Changes - $(date)"
        echo "================================"
        echo ""
        echo "$RECENT_COMMITS"
        echo ""
        echo "Please review the above changes."
    } | elm -s "Code Review Required" "$TEAM_EMAIL"
fi
```

#### Build Status Reports
```bash
#!/bin/bash
# Send build status notifications
PROJECT_DIR="/home/user/build"
STATUS_LOG="$PROJECT_DIR/build.log"
EMAIL="dev@example.com"

# Run build and capture output
cd "$PROJECT_DIR"
make clean > "$STATUS_LOG" 2>&1
make >> "$STATUS_LOG" 2>&1

# Check build result
if [ $? -eq 0 ]; then
    SUBJECT="Build SUCCESS - $(date +%Y%m%d_%H%M%S)"
else
    SUBJECT="Build FAILED - $(date +%Y%m%d_%H%M%S)"
fi

# Send build report
{
    echo "Build Status Report"
    echo "==================="
    echo "Project: $PROJECT_DIR"
    echo "Time: $(date)"
    echo "Status: $([ $? -eq 0 ] && echo "SUCCESS" || echo "FAILED")"
    echo ""
    echo "Build Log:"
    cat "$STATUS_LOG"
} | elm -s "$SUBJECT" "$EMAIL"
```

### Email Automation

#### Mail Backup and Archiving
```bash
#!/bin/bash
# Backup and archive old mail
MAIL_DIR="/home/user/Mail"
ARCHIVE_DIR="/home/user/MailArchive"
DAYS_OLD=90

# Create archive directory if needed
mkdir -p "$ARCHIVE_DIR"

# Archive old messages
for folder in "$MAIL_DIR"/*; do
    if [ -f "$folder" ]; then
        folder_name=$(basename "$folder")
        archive_file="$ARCHIVE_DIR/${folder_name}_$(date +%Y%m%d).txt"

        # Create compressed archive
        elm -f "$folder" -A > "$archive_file"
        gzip "$archive_file"

        echo "Archived $folder_name to $archive_file.gz"
    fi
done
```

#### Mail Statistics and Analysis
```bash
#!/bin/bash
# Generate mail statistics
MAILBOX="/var/spool/mail/username"
STATS_FILE="/tmp/mail_stats.txt"

# Extract mail information
{
    echo "Mail Statistics Report - $(date)"
    echo "================================"
    echo ""

    # Total messages
    total=$(elm -f "$MAILBOX" -s | grep "messages" | awk '{print $1}')
    echo "Total Messages: $total"

    # Messages from each sender
    echo ""
    echo "Messages by Sender:"
    elm -f "$MAILBOX" -s | grep "From:" | \
        awk '{print $2}' | sort | uniq -c | sort -nr

    # Recent messages
    echo ""
    echo "Messages in Last 7 Days:"
    elm -f "$MAILBOX" -s | grep "$(date -d '7 days ago' '+%b %d')" | wc -l

} > "$STATS_FILE"

# Email statistics report
elm -s "Weekly Mail Statistics" user@example.com < "$STATS_FILE"
```

## Advanced Usage

### Custom Configuration

#### Keyboard Shortcuts Customization
```bash
# In ~/.elm/elmrc
# Custom key bindings
bind m = mail
bind r = reply
bind f = forward
bind d = delete
bind s = save
bind c = copy

# Custom macros
macro esc = "quit"
macro ctrl-d = "delete"
macro ctrl-r = "reply"
```

#### Display Customization
```bash
# Custom message display format
headers = From: Subject: Date: To: Cc:
sortby = threads
showto = yes
arrow = yes
autoconv = yes

# Custom colors (if supported)
color_normal = white black
color_header = cyan black
color_message = white black
color_status = blue white
```

### Mail Filtering Rules

#### Advanced Filtering
```bash
# In filter.rul file
if (subject contains "viagra") then delete
if (subject contains "free money") then delete
if (from contains "noreply") then save "~/Mail/bulk"
if (subject contains "urgent") then save "~/Mail/urgent"
if (to contains "dev-team") then save "~/Mail/dev"
if (subject contains "bug report") then save "~/Mail/bugs"
if (from contains "boss" and subject contains "project") then save "~/Mail/projects"
```

#### Conditional Actions
```bash
# Complex filtering rules
if (subject contains "meeting") and (date < tomorrow) then save "~/Mail/meetings"
if (from contains "client" and size > 100000) then save "~/Mail/client-large"
if (subject contains "deadline") and (subject contains "overdue") then save "~/Mail/urgent"
if (to contains "all" and subject contains "announcement") then save "~/Mail/announcements"
```

### Integration with Other Tools

#### Integration with Mail Sorting Tools
```bash
#!/bin/bash
# Use procmail for sorting, then view with elm
# ~/.procmailrc
:0:
* ^TO.*dev-team@example.com
Mail/dev

:0:
* ^Subject:.*Urgent
Mail/urgent

:0:
* ^From:.*boss@example.com
Mail/boss

# View sorted mail with elm
elm -f ~/Mail/dev
elm -f ~/Mail/urgent
elm -f ~/Mail/boss
```

#### Integration with External Editors
```bash
# Configure multiple editors for different purposes
# In ~/.elm/elmrc
editor = /usr/bin/vim
visual = /usr/bin/vim
alteditor = /usr/bin/emacs

# Use different editors based on context
if [ -n "$VISUAL" ]; then
    export EDITOR="$VISUAL"
fi

# Launch elm with custom editor settings
EDITOR="vim -c 'set spell'" elm
```

## Troubleshooting

### Common Issues

#### Mailbox Access Problems
```bash
# Permission denied errors
sudo chown username:mail /var/spool/mail/username
sudo chmod 660 /var/spool/mail/username

# Corrupted mailbox
elm -f /var/spool/mail/username -k  # Read-only mode
mv /var/spool/mail/username /var/spool/mail/username.bak
touch /var/spool/mail/username
chmod 660 /var/spool/mail/username

# Lock file issues
rm -f /var/spool/mail/username.lock
```

#### Configuration Issues
```bash
# Reset configuration
mv ~/.elm/elmrc ~/.elm/elmrc.bak
elm  # Will create new default config

# Test configuration syntax
elm -i /path/to/test_config

# Check mailbox format
file /var/spool/mail/username
```

#### Performance Issues
```bash
# Large mailbox handling
# Archive old messages
elm -f ~/Mail/archive

# Use mail splitting
mailsplit -s 1000 large_mailbox

# Optimize mailbox
elm -f mailbox -z  # Check new messages only
elm -f mailbox -n  # Show message numbers for navigation
```

### Debug and Diagnostic

#### Enable Debug Mode
```bash
# Run elm with debugging
ELM_DEBUG=1 elm
ELM_DEBUG=2 elm  # More verbose

# Check mailbox integrity
elm -f mailbox -k  # Read-only check

# Show configuration
elm -i ~/.elm/elmrc
```

#### Log Mail Operations
```bash
# Log elm activities
ELM_LOG=~/elm.log elm

# Log specific operations
elm -f mailbox 2>&1 | tee ~/elm_session.log
```

## Related Commands

- [`mail`](/docs/commands/other/mail) - Basic Unix mail command
- [`mailx`](/docs/commands/other/mailx) - Enhanced mail command
- [`mutt`](/docs/commands/development/mutt) - Advanced terminal email client
- [`pine`](/docs/commands/development/pine) - User-friendly terminal email client
- [`sendmail`](/docs/commands/other/sendmail) - Mail transfer agent
- [`postfix`](/docs/commands/network/postfix) - Mail server
- [`procmail`](/docs/commands/other/procmail) - Mail processing utility
- [`fetchmail`](/docs/commands/network/fetchmail) - Remote mail retrieval
- [`imapd`](/docs/commands/network/imapd) - IMAP server daemon

## Best Practices

1. **Regular mailbox maintenance** - Archive old messages to keep performance optimal
2. **Use aliases effectively** - Set up comprehensive address book entries
3. **Configure filters** - Automate message organization for better productivity
4. **Backup configuration** - Keep copies of .elm/elmrc and aliases files
5. **Secure remote access** - Use encrypted connections for POP/IMAP when possible
6. **Monitor mailbox size** - Prevent excessively large mailboxes
7. **Use read-only mode** - For checking mail without accidentally modifying
8. **Set up keyboard shortcuts** - Customize for efficient navigation
9. **Regular backups** - Archive important messages to prevent data loss
10. **Test configuration changes** - Validate new settings before regular use

## Performance Tips

1. **Keep mailboxes small** - Split large mailboxes into multiple folders
2. **Use filtering** - Automatically organize messages to reduce manual sorting
3. **Optimize display** - Limit headers shown for faster navigation
4. **Use read-only mode** - For frequent checking without modifications
5. **Archive regularly** - Move old messages to archive folders
6. **Configure efficient sorting** - Use date or thread sorting for quick access
7. **Minimize remote operations** - Use local caching for remote mailboxes
8. **Use custom bindings** - Set up frequently used operations as single keys
9. **Batch operations** - Tag multiple messages for bulk actions
10. **Monitor resources** - Check system load when processing large mailboxes

The `elm` command remains a valuable tool for efficient terminal-based email management, particularly in remote server environments and for users who prefer keyboard-driven interfaces. Its simplicity, speed, and configurability make it an excellent choice for system administrators and developers who need reliable email access without graphical overhead.