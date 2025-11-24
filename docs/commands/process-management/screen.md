---
title: screen - Terminal multiplexer
slug: screen
tags: [process-management, linux-commands]
sidebar_label: screen
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# screen - Terminal multiplexer

The `screen` command is a full-screen window manager that multiplexes a physical terminal between several processes. It allows you to create multiple terminal sessions within a single window and detach/reattach sessions, making it ideal for remote work and long-running processes.

## Syntax

```bash
screen [OPTIONS] [CMD [ARGS]]
```

## Common Options

### Screen Management
- `-ls`, `-list`: List running screens
- `-r`: Reattach to a detached screen
- `-R`: Reattach or create new screen
- `-d`: Detach the running screen
- `-dm`: Start screen in detached mode
- `-D`: Detach and logout remote
- `-x`: Attach to a not detached screen

### Screen Creation
- `-S NAME`: Specify screen name
- `-t TITLE`: Set window title
- `-A`: Adapt window sizes
- `-h NUM`: Set scrollback buffer size
- `-Ln`: Define login screen

### Session Control
- `-X`: Execute command in running screen
- `-Q`: Quiet mode
- `-v`: Display version information
- `-wipe`: Mark dead screens for deletion

## Usage Examples

### Basic Screen Usage
```bash
# Start a new screen session
screen

# Start screen with a specific command
screen vim myfile.txt

# Start screen with name
screen -S mysession

# Start screen in detached mode
screen -dm -S mysession /path/to/script.sh
```

### Session Management
```bash
# List all screen sessions
screen -ls
# Output:
# There are screens on:
#        1234.pts-0.hostname  (Detached)
#        5678.pts-1.hostname  (Attached)
# 2 Sockets in /var/run/screen/S-username.

# Reattach to a specific session
screen -r 1234.pts-0.hostname
# Or by name
screen -r mysession

# Detach from current session
# Inside screen: Ctrl+A, then d

# Reattach to the most recently detached screen
screen -r

# Attach to a screen that's already attached elsewhere
screen -x sessionname
```

### Detached Processes
```bash
# Start long-running process in detached screen
screen -dm -S backup rsync -av /src/ /dst/

# Check if screen is running
screen -ls | grep backup

# Reattach to see progress
screen -r backup
```

### Screen Creation Options
```bash
# Start screen with specific window title
screen -t "Development"

# Start screen with large scrollback buffer
screen -h 5000

# Create login screen
screen -Ln

# Start multiple screens
screen -dmS session1 command1
screen -dmS session2 command2
```

### Command Execution
```bash
# Execute command in running screen
screen -S mysession -X stuff "echo 'Hello World'^M"

# Create new window in running screen
screen -S mysession -X screen

# Kill screen session
screen -S mysession -X quit

# Rename window
screen -S mysession -X title "New Title"
```

### Screen Scripting
```bash
# Start screen with specific commands
screen -dmS myscreen bash -c 'command1; command2; exec bash'

# Run script in screen
screen -dm -S scriptscreen /path/to/long_running_script.sh

# Multiple commands in sequence
screen -dmS multiscreen bash -c 'cd /path && ./script.sh && tail -f logfile.log'
```

## Screen Commands (Ctrl+A prefix)

### Window Management
- `Ctrl+A c`: Create new window
- `Ctrl+A n`: Next window
- `Ctrl+A p`: Previous window
- `Ctrl+A 0-9`: Go to window number
- `Ctrl+A "`: List windows
- `Ctrl+A A`: Rename current window
- `Ctrl+A k`: Kill current window
- `Ctrl+A \`: Kill all windows and quit

### Session Control
- `Ctrl+A d`: Detach from session
- `Ctrl+A D D`: Detach and log out
- `Ctrl+A x`: Lock session
- `Ctrl+A s`: Suspend session

### Copy and Paste
- `Ctrl+A [`: Enter copy mode
- `Ctrl+A ]`: Paste buffer
- `Ctrl+A >`: Write paste buffer to file
- `Ctrl+A <`: Read file into paste buffer

### Screen Logging
- `Ctrl+A H`: Begin/stop logging to file
- `Ctrl+A hardcopy`: Save window contents to file

### Splitting
- `Ctrl+A S`: Split screen horizontally
- `Ctrl+A |`: Split screen vertically
- `Ctrl+A Tab`: Switch between regions
- `Ctrl+A X`: Remove current region
- `Ctrl+A Q`: Close all regions except current

## Configuration File (~/.screenrc)

### Basic Configuration
```bash
# Disable startup message
startup_message off

# Set scrollback buffer
defscrollback 5000

# Enable visual bell
vbell on
vbell_msg "WUFF WUFF!"

# Set status bar
hardstatus alwayslastline
hardstatus string '%{= kG}[ %{G}%H %{g}][%= %{= kw}%?%-Lw%?%{r}(%{W}%n*%f%t%?(%u)%?%{r})%{w}%?%+Lw%?%?%= %{g}][%{B} %Y-%m-%d %{W} %c %{g}]'

# Enable 256 colors
termcapinfo xterm 'Co#256:AB=\E[48;5;%dm:AF=\E[38;5;%dm'
attrcolor b ".I"

# Set default shell
shell -/bin/bash

# Auto-detach on hangup
autodetach on
```

### Window Layouts
```bash
# Create initial windows
screen -t "shell" 1
screen -t "logs" 2 tail -f /var/log/syslog
screen -t "monitor" 3 top
screen -t "editor" 4 vim

# Select initial window
select 1
```

### Key Bindings
```bash
# Custom key bindings
bind ^k kill
bind ^U stuff "^U"
bind ^B stuff "^B"

# F1-F12 function keys
bindkey -k k1 select 1
bindkey -k k2 select 2
bindkey -k F1 select 1
bindkey -k F2 select 2

# Scroll with PageUp/PageDown
bindkey -k kp/ stuff "^U"
bindkey -k kp* stuff "^D"
```

## Best Practices

1. **Use descriptive names** for screen sessions
2. **Set appropriate scrollback** buffer size
3. **Use configuration file** for customizations
4. **Detach properly** using Ctrl+A d
5. **Clean up unused sessions**:
   ```bash
   # Kill dead screens
   screen -wipe
   ```
6. **Use for long-running processes**:
   ```bash
   # Start backup in screen
   screen -dm -S backup rsync -av /src/ /dst/
   ```

## Related Commands

- `tmux`: Terminal multiplexer (modern alternative)
- `nohup`: Run commands immune to hangups
- `disown`: Remove jobs from shell
- `bg/fg`: Background/foreground job control

## Troubleshooting

### Common Issues

1. **Cannot attach to screen**: Check if session exists
2. **Screen already attached**: Use `-x` to attach multi-display
3. **Dead screens**: Use `screen -wipe` to clean up
4. **Permission denied**: Check screen ownership

### Common Scenarios

```bash
# Recover from crashed connection
screen -D -r

# Kill stuck screen session
screen -X -S sessionname quit

# Force detach from elsewhere
screen -D sessionname

# Check screen logs
ls ~/.screen/logs/
```

### Script Examples
```bash
#!/bin/bash
# Screen session manager
screen_manager() {
    local action=$1
    local session_name=$2
    local command=$3

    case $action in
        "start")
            if [ -n "$session_name" ] && [ -n "$command" ]; then
                echo "Starting screen session: $session_name"
                screen -dm -S "$session_name" bash -c "$command; exec bash"
            elif [ -n "$session_name" ]; then
                echo "Starting screen session: $session_name"
                screen -S "$session_name"
            else
                screen
            fi
            ;;
        "list")
            screen -ls
            ;;
        "attach")
            if [ -n "$session_name" ]; then
                screen -r "$session_name"
            else
                screen -r
            fi
            ;;
        "detach")
            if [ -n "$session_name" ]; then
                screen -d "$session_name"
            else
                echo "Please specify session name to detach"
                return 1
            fi
            ;;
        "kill")
            if [ -n "$session_name" ]; then
                screen -X -S "$session_name" quit
            else
                echo "Please specify session name to kill"
                return 1
            fi
            ;;
        "wipe")
            screen -wipe
            ;;
        *)
            echo "Usage: $0 {start|list|attach|detach|kill|wipe} [session_name] [command]"
            return 1
            ;;
    esac
}

# Development environment starter
dev_environment() {
    local project=$1

    echo "Starting development environment for: $project"
    screen -dm -S "dev-$project"

    # Create windows for development
    screen -S "dev-$project" -X screen -t "editor"
    screen -S "dev-$project" -X screen -t "terminal"
    screen -S "dev-$project" -X screen -t "logs"
    screen -S "dev-$project" -X screen -t "server"

    # Setup windows
    screen -S "dev-$project" -p 0 -X stuff "cd ~/projects/$project^M"
    screen -S "dev-$project" -p 1 -X stuff "cd ~/projects/$project^M"
    screen -S "dev-$project" -p 2 -X stuff "cd ~/projects/$project && tail -f logs/app.log^M"
    screen -S "dev-$project" -p 3 -X stuff "cd ~/projects/$project && ./start_server.sh^M"

    echo "Development environment ready!"
    echo "Attach with: screen -r dev-$project"
}

# Automated backup system
backup_system() {
    local source=$1
    local destination=$2
    local session_name="backup-$(date +%Y%m%d-%H%M%S)"

    echo "Starting backup session: $session_name"
    screen -dm -S "$session_name" bash -c "
        echo 'Starting backup: $(date)'
        rsync -av --progress '$source' '$destination'
        echo 'Backup completed: $(date)'
        echo 'Press any key to exit...'
        read
    "

    echo "Backup running in screen session: $session_name"
    echo "Monitor with: screen -r $session_name"
}

# Usage
screen_manager start myproject "npm start && npm run dev"
dev_environment myproject
backup_system /home/user/documents /backup/documents
```

### Advanced Usage
```bash
# Multi-server management
multi_server_manager() {
    local servers="server1 server2 server3"
    local session_name="server-management"

    screen -dm -S "$session_name"

    for server in $servers; do
        screen -S "$session_name" -X screen -t "$server"
        screen -S "$session_name" -p "$server" -X stuff "ssh $server^M"
    done

    screen -S "$session_name" -X screen -t "monitor"
    screen -S "$session_name" -p "monitor" -X stuff "htop^M"

    echo "Server management session ready!"
    echo "Attach with: screen -r $session_name"
}

# Log monitoring station
log_monitor() {
    local logs="/var/log/syslog /var/log/auth.log /var/log/apache2/error.log"
    local session_name="log-monitor"

    screen -dm -S "$session_name"

    for log in $logs; do
        log_name=$(basename "$log")
        screen -S "$session_name" -X screen -t "$log_name"
        screen -S "$session_name" -p "$log_name" -X stuff "sudo tail -f $log^M"
    done

    screen -S "$session_name" -X select 1
    echo "Log monitoring session started!"
    echo "Attach with: screen -r $session_name"
}

# Persistent task runner
persistent_task_runner() {
    local task_script=$1
    local session_name="persistent-task"

    echo "Starting persistent task: $task_script"
    screen -dm -S "$session_name" bash -c "
        while true; do
            echo 'Running task: $(date)'
            $task_script
            echo 'Task completed, waiting 1 hour...'
            sleep 3600
        done
    "

    echo "Persistent task started in session: $session_name"
    echo "Monitor with: screen -r $session_name"
}

# Screen session backup
backup_screen_sessions() {
    local backup_dir="/tmp/screen_backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"

    echo "Backing up active screen sessions to $backup_dir"

    screen -ls | grep -E "^\s+[0-9]+" | while read line; do
        if [[ "$line" =~ ([0-9]+)\.(pts-[^[:space:]]+) ]]; then
            pid="${BASH_REMATCH[1]}"
            session="${BASH_REMATCH[2]}"

            echo "Backing up session $pid.$session"
            screen -S "$pid.$session" -X hardcopy "$backup_dir/session_$pid.$session.txt"
        fi
    done

    echo "Backup completed in $backup_dir"
}

# Usage
multi_server_manager
log_monitor
persistent_task_runner "/home/user/scripts/backup.sh"
backup_screen_sessions
```