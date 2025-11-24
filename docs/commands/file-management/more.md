---
title: more - Display File Content Page by Page
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# more - Display File Content Page by Page

The `more` command displays file contents one screen at a time, allowing users to scroll through large files. It's an older pager with fewer features than `less` but is still available on most Unix-like systems and is simple to use.

## Basic Syntax

```bash
more [OPTIONS] [FILE]...
```

## Common Options

### Display Options
- `-d` - Display prompts and user instructions
- `-l` - Suppress form-feed after each page
- `-f` - Count logical lines rather than screen lines
- `-p` - Don't scroll, clear screen and display text
- `-c` - Clear screen before displaying pages
- `-s` - Squeeze multiple blank lines into single line
- `-u` - Suppress underlining

### Line Number Options
- `+NUM` - Start displaying at line number NUM
- `+/PATTERN` - Start displaying at line containing PATTERN

## Navigation Commands

### Movement
```bash
Space / f      # Forward one screen
Enter / j      # Forward one line
d              # Forward half screen
q / Q          # Quit more
b              # Backward one screen
=              # Display current line number
```

### Searching
```bash
/pattern       # Search forward for pattern
n              # Find next occurrence
'              # Go to previous marked line
```

## Usage Examples

### Basic File Viewing
```bash
# View a file page by page
more filename.txt

# View multiple files sequentially
more file1.txt file2.txt file3.txt

# View with user instructions
more -d filename.txt
```

### Starting Position Control
```bash
# Start at specific line number
more +50 filename.txt

# Start at specific pattern
more +/ERROR logfile.txt

# Start at line containing "function"
more +/"def " script.py
```

### Display Options
```bash
# Squeeze blank lines
more -s filename.txt

# Clear screen between pages
more -c filename.txt

# Count logical lines (don't wrap long lines)
more -f wide_file.txt
```

## Practical Examples

### Configuration Files
```bash
# View system configuration
more /etc/passwd
more /etc/group

# View application configuration
more config.ini
more settings.conf
```

### Log Files
```bash
# View log files (starting at recent entries)
more +10000 application.log

# Find specific error in log
more +/ERROR system.log
```

### Documentation
```bash
# View documentation files
more README.md
more INSTALL
more CHANGELOG
```

## Comparison with less

### more vs less
```bash
# more - basic pager, backward movement limited
more filename.txt

# less - more features, bidirectional navigation
less filename.txt
```

### Key Differences
- **more**: Only forward navigation, basic search
- **less**: Full bidirectional navigation, advanced features

When to use `more`:
- Simple file viewing needs
- Minimal resource usage
- Available on all Unix systems
- Learning basic pager concepts

## Interactive Features

### File Information
```bash
=             # Show current line number and position
Ctrl-L        # Redraw screen
Ctrl-G        # Show file information
```

### File Operations
```bash
:n            # Next file (when viewing multiple files)
:p            # Previous file
:f            # Show current filename
:q            # Quit
```

## Working with Multiple Files

### Sequential Viewing
```bash
# View files one after another
more *.txt

# Navigation between files
: n           # Next file
: p           # Previous file
```

### File Lists
```bash
# View files from list
more `find . -name "*.log"`

# View command output
ls -la | more
```

## Integration with Other Commands

### Pipes
```bash
# View command output page by page
ps aux | more
ls -la | more
find . -name "*.py" | more

# View long output
cat large_file.txt | more
```

### Redirection
```bash
# Save content while viewing
more file.txt | tee saved_content.txt

# Filter while viewing
more file.txt | grep "pattern"
```

## Environment Variables

### Customization
```bash
# Set default pager
export PAGER=more

# Custom prompt
export MORE='-d'

# Disable line wrapping
export MORE='-f'
```

## Advanced Usage

### Scripting
```bash
# Display file with custom header
echo "=== File Content ===" && more file.txt

# View file with instructions
more -d important_file.txt
```

### System Integration
```bash
# View man pages with more
export MANPAGER=more
man command

# View help output
command --help | more
```

## Limitations

### Known Restrictions
- Cannot move backward in file (except with 'b' in some versions)
- Limited search capabilities
- No line editing features
- No syntax highlighting
- Cannot handle multiple open files simultaneously

### Workarounds
```bash
# For backward navigation, use less instead
less filename.txt

# For search in both directions
less filename.txt

# For advanced features
vim filename.txt
```

## Related Commands

- [`less`](/docs/commands/text-processing/less) - More advanced pager with bidirectional navigation
- [`cat`](/docs/commands/text-processing/cat) - Display entire file
- [`head`](/docs/commands/text-processing/head) - Display beginning of file
- [`tail`](/docs/commands/text-processing/tail) - Display end of file
- [`pg`](/docs/commands/text-processing/pg) - Another pager utility

## Common Use Cases

1. **Simple file viewing** - Basic text file inspection
2. **Command output** - Paging through long command outputs
3. **Configuration review** - Reading configuration files
4. **Documentation** - Viewing README and help files
5. **Learning tool** - Introduction to paged viewing concepts

## Tips

1. **Use Space bar** to advance one screen
2. **Use Enter** for line-by-line navigation
3. **Use q** to quit quickly
4. **Use less** for more complex navigation needs
5. **Use pipes** to page command output

## Best Practices

### When to Choose more
- Simple file viewing requirements
- Minimal system resources available
- Teaching basic Unix concepts
- Consistent with traditional Unix workflows

### When to Choose less
- Need backward navigation
- Complex search requirements
- Multiple file viewing
- Advanced editing features

The `more` command, while simpler than `less`, provides fundamental paging capabilities and is useful for basic file viewing tasks. It's especially valuable in environments where minimal resource usage is important or when teaching basic Unix command-line concepts.