---
title: jed - JED Editor
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# jed - JED Editor

The `jed` command is a powerful, extensible text editor developed by John E. Davis using the S-Lang library. It was specifically designed for editing source code and provides excellent syntax highlighting, customizable key bindings, and support for multiple emulation modes including Emacs, WordStar, and Brief. JED is particularly popular among programmers for its efficiency and extensibility.

## Basic Syntax

```bash
jed [options] [filename...]
```

## Common Options

### Display Options

- `-2` - Display two editing windows (split screen)
- `-batch` - Run in batch mode (non-interactive)
- `-g <line>` - Go to specified line number
- `-t <title>` - Set window title

### File Options

- `-f <function>` - Execute specified S-Lang function
- `-i `` - Load specified file into buffer
- `-n` - Don't load .jedrc configuration file
- `-s <string>` - Search for specified string on startup

### Mode Options

- `--emacs` - Start in Emacs emulation mode
- `--brief` - Start in Brief emulation mode
- `--wordstar` - Start in WordStar emulation mode

### Help and Information

- `--version` - Display version information
- `--help` - Display help information

## Keyboard Shortcuts

### Basic File Operations

```bash
Ctrl+X S    # Save buffer
Ctrl+X W    # Write buffer to new file
Ctrl+X C    # Save buffer and exit
Ctrl+X Q    # Quit without saving
Ctrl+X F    # Find file
Ctrl+X I    # Insert file
Ctrl+X K    # Kill buffer
```

### Cursor Movement

```bash
Ctrl+F      # Move forward one character
Ctrl+B      # Move backward one character
Ctrl+N      # Move to next line
Ctrl+P      # Move to previous line
Ctrl+A      # Move to beginning of line
Ctrl+E      # Move to end of line
Alt+<       # Move to beginning of buffer
Alt+>       # Move to end of buffer
```

### Screen Navigation

```bash
Ctrl+V      # Scroll forward one page
Alt+V       # Scroll backward one page
Ctrl+L      # Refresh screen
Alt+L       # Recenter window
```

### Editing Commands

```bash
Ctrl+D      # Delete character at cursor
Backspace   # Delete character before cursor
Alt+D       # Delete word
Ctrl+K      # Delete to end of line
Ctrl+W      # Cut region
Alt+W       # Copy region
Ctrl+Y      # Paste (yank)
Alt+Y       # Cycle through kill ring
```

### Search and Replace

```bash
Ctrl+S      # Incremental search forward
Ctrl+R      # Incremental search backward
Alt+%       # Query replace
Ctrl+X Alt+R# Replace string
```

### Buffer Management

```bash
Ctrl+X B    # Switch buffer
Ctrl+X Ctrl+B# List buffers
Ctrl+X K    # Kill current buffer
```

### Window Management

```bash
Ctrl+X 1    # Delete other windows
Ctrl+X 2    # Split window horizontally
Ctrl+X 3    # Split window vertically
Ctrl+X O    # Switch to other window
```

### Undo/Redo

```bash
Ctrl+_      # Undo
Ctrl+G      # Abort current command
```

## Emulation Modes

JED can emulate other popular editors:

### Emacs Mode (Default)

```bash
# Start in Emacs mode (default)
jed source.c

# Emacs-style key bindings
Ctrl+X C-f  # Find file
Ctrl+X C-s  # Save file
Ctrl+X C-c  # Exit
```

### Brief Mode

```bash
# Start in Brief emulation
jed --brief file.txt

# Brief-style commands
F2          # Save file
F3          # Quit
F5          # Find
F6          # Replace
```

### WordStar Mode

```bash
# Start in WordStar emulation
jed --wordstar document.txt

# WordStar-style commands
Ctrl+K D    # Save
Ctrl+K X    # Save and exit
Ctrl+K Q    # Quit
```

## Usage Examples

### Basic File Editing

```bash
# Edit a single file
jed source.c

# Edit file at specific line
jed -g 50 source.c

# Edit without loading configuration
jed -n config.txt

# Search for string on startup
jed -s "function" source.c
```

### Split Screen Editing

```bash
# Start with two windows
jed -2 main.c

# Switch between windows
Ctrl+X O

# Open another file in second window
Ctrl+X F
Enter filename
```

### Programming

```bash
# Edit C file with syntax highlighting
jed program.c

# Edit multiple source files
jed main.c utils.c header.h

# Execute custom function on startup
jed -f "goto-line 50" source.c
```

### Batch Processing

```bash
# Run JED script in batch mode
jed -batch -f "replace_all" input.txt

# Execute S-Lang function
jed -batch -f "compile_file" source.c
```

## Advanced Features

### Syntax Highlighting

JED provides comprehensive syntax highlighting for many languages:

```bash
# Supported languages include:
C, C++, Java, Python, Perl, PHP, JavaScript, HTML, CSS, XML, LaTeX, etc.

# Automatic syntax detection based on file extension
jed script.py      # Python syntax highlighting
jed style.css      # CSS syntax highlighting
jed index.html     # HTML syntax highlighting
```

### Custom Key Bindings

```bash
# Define custom key bindings in .jedrc
setkey("save_buffer", "^X^S");
setkey("quit_jed", "^X^Q");

# Define function keys
setkey("find_file", "^P");
setkey("save_buffer", "^S");
```

### Macros and Functions

```bash
# Define custom functions
define hello_world()
{
    message("Hello, World!");
}

# Execute custom function
Ctrl+X U hello_world
```

### Templates and Snippets

```bash
# Define code templates
define c_template()
{
    insert("#include <stdio.h>\n\n");
    insert("int main()\n");
    insert("{\n");
    insert("    return 0;\n");
    insert("}\n");
}

# Use template
Ctrl+X U c_template
```

## Configuration

### .jedrc Configuration File

```bash
# ~/.jedrc - JED configuration file

# Set colors
set_color("normal", "white", "black");
set_color("keyword", "yellow", "black");
set_color("string", "green", "black");
set_color("comment", "cyan", "black");

# Set tab width
set_integer_variable("TAB", 4);

# Enable auto-indentation
set_integer_variable("AutoIndent", 1);

# Show line numbers
set_integer_variable("LineNumbers", 1);

# Set backup files
set_integer_variable("MakeBackups", 1);
```

### Language-Specific Settings

```bash
# C/C++ mode settings
define_mode("c_mode", "C");
set_mode_string("c_mode", "*.c", "*.h", "*.cpp", "*.hpp");

# Python mode settings
define_mode("python_mode", "Python");
set_mode_string("python_mode", "*.py", "*.pyw");

# HTML mode settings
define_mode("html_mode", "HTML");
set_mode_string("html_mode", "*.html", "*.htm");
```

### Custom Functions

```bash
# Custom function to insert date/time
define insert_date()
{
    str = strftime("%Y-%m-%d %H:%M:%S");
    insert(str);
}

# Custom function to create C header guard
define header_guard()
{
    filename = path_basename(bufname);
    guard = strup(strtrans(filename, ".-_", "___"));
    insert("#ifndef " + guard + "\n");
    insert("#define " + guard + "\n\n");
    insert("\n#endif /* " + guard + " */\n");
}
```

## Practical Examples

### C Programming

```bash
# Edit C source with syntax highlighting
jed main.c

# Use custom template
Ctrl+X U c_template

# Navigate to function
Alt+X goto-line
Enter line number

# Compile and run
Alt+X compile
!gcc -o program main.c
```

### Web Development

```bash
# Edit HTML file
jed index.html

# Syntax highlighting automatically enabled
<!-- HTML tags highlighted -->
/* CSS styles highlighted */

# Insert JavaScript template
Alt+X insert_js_template
```

### System Administration

```bash
# Edit configuration files
sudo jed /etc/ssh/sshd_config

# Edit with line numbers
Ctrl+X U set_line_numbers

# Search for specific directive
Ctrl+S
Port
Enter
```

### Documentation Writing

```bash
# Edit documentation
jed README.md

# Use text mode features
Ctrl+X U wrap_paragraph
```

## Advanced Usage

### Regular Expressions

```bash
# Search with regular expressions
Ctrl+R
^#.*$       # Find comment lines
function\(  # Find function definitions
```

### Buffer Management

```bash
# Work with multiple buffers
Ctrl+X C-f  # Open new file
Ctrl+X B    # Switch buffer
Ctrl+X Ctrl+B# List all buffers
Ctrl+X K    # Kill buffer
```

### Window Operations

```bash
# Split window management
jed -2 file1.txt file2.txt

# Resize windows
Alt+X enlarge_window
Alt+X shrink_window

# Jump between windows
Ctrl+X O
```

### Integration with External Tools

```bash
# Execute shell commands
Alt+!       # Shell command

# Run compiler
Alt+X compile
make

# Run debugger
Alt+X gdb
gdb ./program
```

## Scripting and Automation

### S-Lang Programming

```bash
# Define custom editing functions
define capitalize_words()
{
    push_mark();
    bol();
    while (not(eob()))
    {
        skip_word();
        capitalize_word();
        skip_chars(" \t");
    }
    pop_mark();
}
```

### Batch Mode Processing

```bash
#!/bin/bash
# Process multiple files with JED

for file in *.c; do
    jed -batch -f "auto_indent_mode" -f "save_buffer" "$file"
done
```

## Related Commands

- [`emacs`](/docs/commands/editors/emacs) - GNU Emacs (JED can emulate it)
- [`vi`](/docs/commands/editors/vi) - Visual editor
- [`vim`](/docs/commands/editors/vim) - Vi IMproved
- [`nano`](/docs/commands/editors/nano) - Nano editor
- [`joe`](/docs/commands/editors/joe) - Joe's Own Editor
- [`pico`](/docs/commands/editors/pico) - Pine composer

## Best Practices

1. **Configure .jedrc** for personalized workflow and key bindings
2. **Learn keyboard shortcuts** for efficient editing
3. **Use syntax highlighting** for better code readability
4. **Enable auto-indentation** for programming
5. **Use split windows** for comparing code sections
6. **Customize templates** for repetitive code patterns
7. **Learn S-Lang** for advanced customization
8. **Use batch mode** for automated file processing
9. **Enable line numbers** for debugging
10. **Use search and replace** efficiently for bulk changes

## Common Issues and Solutions

### Syntax Highlighting Problems

```bash
# Enable syntax highlighting manually
Alt+X syntax_mode
Enter language name

# Check mode assignment
Alt+X describe_mode
```

### Key Binding Conflicts

```bash
# Check current key binding
Alt+X describe_key
Press key

# Reset key bindings
Alt+X load_defaults
```

### Performance Issues

```bash
# Disable features for large files
jed -n large_file.txt

# Use batch mode for automation
jed -batch -f "process_file" input.txt
```

### Configuration Problems

```bash
# Test configuration without custom files
jed -n test.txt

# Check for syntax errors in .jedrc
jed -batch -f "load_file" ~/.jedrc
```

JED provides a powerful, programmable editing environment particularly well-suited for software development. Its combination of syntax highlighting, multiple emulation modes, and S-Lang scripting capabilities makes it a versatile choice for programmers who need an editor that can be extensively customized to match their preferred workflow. The ability to emulate other popular editors while maintaining its own powerful features makes JED an excellent choice for users transitioning between different editing environments.