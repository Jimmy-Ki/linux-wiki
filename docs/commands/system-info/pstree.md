---
title: pstree - Process Tree
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pstree - Process Tree

The `pstree` command displays running processes as a tree structure, showing the parent-child relationships between processes. It provides a visual representation of the process hierarchy, making it easier to understand how processes are related and organized.

## Basic Syntax

```bash
pstree [OPTIONS] [PID|USER]
```

## Common Options

### Display Options
- `-a, --arguments` - Show command line arguments
- `-c, --compact` - Don't compact identical subtrees
- `-h, --highlight-all` - Highlight current process and ancestors
- `-H PID` - Highlight specific process and ancestors
- `-l, --long` - Don't truncate long lines
- `-n, --numeric-sort` - Sort output numerically
- `-p, --show-pids` - Show PIDs
- `-u, --uid-changes` - Show uid transitions
- `-U, --unicode` - Use Unicode box drawing characters

### Selection Options
- `-A, --ascii` - Use ASCII characters for tree
- `-G, --vt100` - Use VT100 line drawing characters
- `-Z, --contexts` - Show security contexts

### Color Options
- `-C, --color` - Color processes by name
- `--color=always` - Always colorize output

## Usage Examples

### Basic Process Tree
```bash
# Show complete process tree
pstree

# Show process tree for specific user
pstree username

# Show process tree starting from specific PID
pstree 1234
```

### Detailed View with PIDs
```bash
# Show PIDs
pstree -p

# Show command arguments
pstree -a

# Show both PIDs and arguments
pstree -ap

# Show uid changes
pstree -u
```

## Practical Examples

### Process Hierarchy Analysis
```bash
#!/bin/bash
# Analyze process hierarchy for a specific process

PROCESS_NAME="$1"
if [ -z "$PROCESS_NAME" ]; then
    echo "Usage: $0 <process_name>"
    exit 1
fi

echo "Process hierarchy analysis for: $PROCESS_NAME"
echo "============================================="

# Find main process
MAIN_PID=$(pgrep -o "$PROCESS_NAME")
if [ -z "$MAIN_PID" ]; then
    echo "Process '$PROCESS_NAME' not found"
    exit 1
fi

echo "Main process PID: $MAIN_PID"

# Show process tree from main process
echo -e "\nProcess tree:"
pstree -p "$MAIN_PID"

# Show complete tree with highlighting
echo -e "\nComplete process tree with $PROCESS_NAME highlighted:"
pstree -H "$MAIN_PID" -p
```

### Service Family Analysis
```bash
#!/bin/bash
# Analyze all processes related to a service

SERVICE="$1"
if [ -z "$SERVICE" ]; then
    echo "Usage: $0 <service_name>"
    exit 1
fi

echo "Service analysis for: $SERVICE"
echo "============================"

# Find all related processes
PIDS=$(pgrep "$SERVICE")
if [ -z "$PIDS" ]; then
    echo "No processes found for service: $SERVICE"
    exit 1
fi

echo "Related PIDs: $PIDS"

# Show each process in tree context
echo -e "\nProcess tree context:"
for pid in $PIDS; do
    echo -e "\nProcess $pid:"
    pstree -p -H "$pid" "$pid"
done

# Show parent relationships
echo -e "\nParent processes:"
for pid in $PIDS; do
    ppid=$(ps -p "$pid" -o ppid= | tr -d ' ')
    parent_name=$(ps -p "$ppid" -o comm=)
    echo "$pid -> $ppid ($parent_name)"
done
```

### Zombie Process Detection
```bash
#!/bin/bash
# Find and analyze zombie processes

echo "Zombie Process Detection"
echo "======================="

# Find zombie processes in process tree
ZOMBIES=$(pstree -p | grep "<zombie>")

if [ -n "$ZOMBIES" ]; then
    echo "Zombie processes found:"
    echo "$ZOMBIES"

    # Extract zombie PIDs
    ZOMBIE_PIDS=$(pstree -p | grep "<zombie>" | grep -o '([0-9]\+)' | tr -d '()')
    echo -e "\nZombie PIDs: $ZOMBIE_PIDS"

    # Find parent processes
    echo -e "\nParent processes of zombies:"
    for pid in $ZOMBIE_PIDS; do
        if [ -d "/proc/$pid" ]; then
            ppid=$(ps -p "$pid" -o ppid= | tr -d ' ')
            parent_name=$(ps -p "$ppid" -o comm=)
            echo "Zombie $pid has parent $ppid ($parent_name)"
        fi
    done
else
    echo "No zombie processes detected"
fi
```

### Process Group Analysis
```bash
#!/bin/bash
# Analyze processes by group

echo "Process Group Analysis"
echo "====================="

# Show process tree with user context
echo -e "\nProcess tree with user context:"
pstree -u

# Show processes by user
echo -e "\nProcesses by user:"
ps -eo pid,user,comm | awk '{users[$2]++; procs[$2,$3]++}
END {
    for (user in users) {
        print "User:", user, "Total processes:", users[user]
        for (key in procs) {
            split(key, arr, SUBSEP)
            if (arr[1] == user) {
                print "  ", arr[2], procs[key]
            }
        }
    }
}' | sort
```

### Startup Process Analysis
```bash
#!/bin/bash
# Analyze system startup process hierarchy

echo "System Startup Process Analysis"
echo "=============================="

# Show init process hierarchy
echo -e "\nInit process hierarchy (PID 1):"
pstree -p -H 1 1

# Show system services
echo -e "\nSystem service processes:"
systemctl list-units --type=service --state=running | head -10

# Find processes with no parent (orphans)
echo -e "\nOrphan processes:"
ps -eo pid,ppid,comm | awk '$2==1 && $1!=1 {print "PID:", $1, "Command:", $3}'

# Show longest-running processes
echo -e "\nLongest-running processes:"
ps -eo pid,lstart,comm | sort -k2 | head -10
```

### Application Process Tree
```bash
#!/bin/bash
# Show complete process tree for an application

APP_NAME="$1"
if [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <application_name>"
    exit 1
fi

echo "Application Process Tree: $APP_NAME"
echo "================================="

# Find main process
MAIN_PID=$(pgrep -o "$APP_NAME")
if [ -z "$MAIN_PID" ]; then
    echo "Application '$APP_NAME' not running"
    exit 1
fi

echo "Main process: $APP_NAME (PID: $MAIN_PID)"

# Show complete tree with highlighting
echo -e "\nComplete process tree:"
pstree -a -p -H "$MAIN_PID"

# Show resource usage
echo -e "\nResource usage for $APP_NAME processes:"
ps -p $(pgrep -d, "$APP_NAME") -o pid,ppid,%cpu,%mem,cmd
```

## Advanced Usage

### Interactive Process Tree Explorer
```bash
#!/bin/bash
# Interactive process tree explorer

show_process_menu() {
    local pid="$1"
    local name=$(ps -p "$pid" -o comm=)

    clear
    echo "Process Explorer - PID: $pid ($name)"
    echo "==================================="

    echo -e "\n1. Show process tree"
    echo "2. Show process details"
    echo "3. Show children processes"
    echo "4. Kill process"
    echo "5. Go to parent"
    echo "6. Search for process"
    echo "7. Exit"

    echo -e "\nProcess tree (highlighting PID $pid):"
    pstree -p -H "$pid" "$pid"

    echo -e "\nEnter choice: "
    read choice

    case $choice in
        1) pstree -a -p -H "$pid" "$pid"; read -p "Press Enter to continue...";;
        2) ps -fp "$pid"; read -p "Press Enter to continue...";;
        3) pstree -p "$pid"; read -p "Press Enter to continue...";;
        4) echo "Kill process $pid? (y/N): "; read confirm;
           [ "$confirm" = "y" ] && kill "$pid" && echo "Process killed";;
        5) local ppid=$(ps -p "$pid" -o ppid= | tr -d ' ');
           [ "$ppid" != "0" ] && show_process_menu "$ppid";;
        6) echo "Enter process name or PID: "; read search;
           if [[ "$search" =~ ^[0-9]+$ ]]; then
               show_process_menu "$search";
           else
               local found_pid=$(pgrep -o "$search");
               [ -n "$found_pid" ] && show_process_menu "$found_pid";
           fi;;
        7) return 0;;
    esac

    show_process_menu "$pid"
}

# Start with init process
show_process_menu 1
```

### Process Evolution Tracking
```bash
#!/bin/bash
# Track process evolution over time

LOG_FILE="/tmp/pstree_changes.log"
INTERVAL=30
DURATION=300  # 5 minutes

echo "Process evolution tracker"
echo "========================"
echo "Logging changes every $INTERVAL seconds for $((DURATION/60)) minutes"
echo "Log file: $LOG_FILE"

# Record initial state
echo "$(date): Initial process tree" >> "$LOG_FILE"
pstree -p >> "$LOG_FILE"
echo "================================" >> "$LOG_FILE"

# Monitor changes
for ((i=1; i<=$DURATION/$INTERVAL; i++)); do
    sleep $INTERVAL

    echo "$(date): Check #$i" >> "$LOG_FILE"

    # Check for new processes
    CURRENT_PIDS=$(ps -eo pid=)
    if [ "$i" -eq 1 ]; then
        PREVIOUS_PIDS="$CURRENT_PIDS"
    fi

    NEW_PIDS=$(comm -13 <(echo "$PREVIOUS_PIDS" | sort) <(echo "$CURRENT_PIDS" | sort))
    if [ -n "$NEW_PIDS" ]; then
        echo "New processes: $NEW_PIDS" >> "$LOG_FILE"
        for pid in $NEW_PIDS; do
            if [ -d "/proc/$pid" ]; then
                name=$(ps -p "$pid" -o comm=)
                ppid=$(ps -p "$pid" -o ppid=)
                echo "  $pid: $name (parent: $ppid)" >> "$LOG_FILE"
            fi
        done
    fi

    # Check for ended processes
    ENDED_PIDS=$(comm -23 <(echo "$PREVIOUS_PIDS" | sort) <(echo "$CURRENT_PIDS" | sort))
    if [ -n "$ENDED_PIDS" ]; then
        echo "Ended processes: $ENDED_PIDS" >> "$LOG_FILE"
    fi

    PREVIOUS_PIDS="$CURRENT_PIDS"
    echo "================================" >> "$LOG_FILE"

    echo "Check #$i completed"
done

echo "Process tracking completed. Log saved to $LOG_FILE"
```

## Related Commands

- [`ps`](/docs/commands/process-management/ps) - Process status
- [`pgrep`](/docs/commands/process-management/pgrep) - Process grep
- [`pidof`](/docs/commands/process-management/pidof) - Find process ID
- [`top`](/docs/commands/process-management/top) - Dynamic process viewer
- [`htop`](/docs/commands/process-management/htop) - Interactive process viewer
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes

## Best Practices

1. **Use `-p` flag** to see PIDs for process identification
2. **Use `-H` flag** to highlight specific processes and their ancestors
3. **Use `-a` flag** to see full command line arguments
4. **Use `-u` flag** to track user ID changes in process tree
5. **Combine with grep** for searching specific processes in the tree
6. **Use in scripts** for process relationship analysis
7. **Monitor zombie processes** regularly using the process tree
8. **Use color options** for better visual distinction

The `pstree` command provides invaluable insights into process relationships and system structure, making it essential for system administration and debugging.