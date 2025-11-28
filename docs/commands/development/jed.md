---
title: jed - JED Editor
sidebar_label: jed
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# jed - JED Editor

The `jed` command is a powerful, extensible text editor developed by John E. Davis using the S-Lang library. It was specifically designed for editing source code and provides excellent syntax highlighting, customizable key bindings, and support for multiple emulation modes including Emacs, WordStar, and Brief. JED is particularly popular among programmers for its efficiency, lightweight design, and extensibility through S-Lang scripting. It offers features like automatic indentation, bracket matching, and extensive mode support for various programming languages.

## Basic Syntax

```bash
jed [options] [filename...]
```

## Command Line Options

### Display Options
- `-2` - Display two editing windows (split screen)
- `-batch` - Run in batch mode (non-interactive)
- `-g <line>` - Go to specified line number
- `-t <title>` - Set window title
- `-name <name>` - Set editor name

### File Options
- `-f <function>` - Execute specified S-Lang function
- `-i <file>` - Load specified file into buffer
- `-l <file>` - Load S-Lang script file
- `-n` - Don't load .jedrc configuration file
- `-s <string>` - Search for specified string on startup

### Mode Options
- `--emacs` - Start in Emacs emulation mode (default)
- `--brief` - Start in Brief emulation mode
- `--wordstar` - Start in WordStar emulation mode
- `--no-mode` - Disable syntax highlighting

### Configuration Options
- `--config-file <file>` - Use specific configuration file
- `--no-site-file` - Don't load site-wide configuration
- `--no-abb` - Don't load abbreviation files

### Help and Information
- `--version` - Display version information
- `--help` - Display help information
- `--show-version` - Show detailed version information

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
Ctrl+X Ctrl+F# Find file (Emacs style)
Ctrl+X Ctrl+S# Save file (Emacs style)
Ctrl+X Ctrl+C# Exit (Emacs style)
```

### Cursor Movement

```bash
# Character movement
Ctrl+F      # Move forward one character
Ctrl+B      # Move backward one character

# Line movement
Ctrl+N      # Move to next line
Ctrl+P      # Move to previous line
Ctrl+A      # Move to beginning of line
Ctrl+E      # Move to end of line

# Word movement
Alt+F       # Move forward one word
Alt+B       # Move backward one word

# Buffer movement
Alt+<       # Move to beginning of buffer
Alt+>       # Move to end of buffer

# Screen movement
Ctrl+V      # Scroll forward one page
Alt+V       # Scroll backward one page
Ctrl+L      # Refresh screen
Alt+L       # Recenter window
```

### Editing Commands

```bash
# Deletion
Ctrl+D      # Delete character at cursor
Backspace   # Delete character before cursor
Alt+D       # Delete word
Ctrl+K      # Delete to end of line
Ctrl+Y      # Delete previous character (alternate)

# Region operations
Ctrl+W      # Cut region
Alt+W       # Copy region
Ctrl+Y      # Paste (yank)
Alt+Y       # Cycle through kill ring
Ctrl+X Ctrl+Y# Paste from specific kill ring entry

# Insertion
Ctrl+J      # Insert newline and indent
Ctrl+O      # Insert blank line
Ctrl+T      # Transpose characters
```

### Search and Replace

```bash
# Search
Ctrl+S      # Incremental search forward
Ctrl+R      # Incremental search backward
Alt+S       # Regular expression search forward
Alt+R       # Regular expression search backward

# Replace
Alt+%       # Query replace
Ctrl+X Alt+R# Replace string
Ctrl+X Ctrl+R# Replace string (Emacs style)

# Search navigation
Ctrl+S Ctrl+S# Repeat last search
Ctrl+R Ctrl+R# Repeat last reverse search
```

### Buffer Management

```bash
Ctrl+X B    # Switch buffer
Ctrl+X Ctrl+B# List buffers
Ctrl+X K    # Kill current buffer
Ctrl+X Ctrl+K# Kill buffer (Emacs style)
Alt+X kill-buffer  # Kill named buffer
Alt+X list-buffers # List all buffers
```

### Window Management

```bash
Ctrl+X 1    # Delete other windows
Ctrl+X 2    # Split window horizontally
Ctrl+X 3    # Split window vertically
Ctrl+X O    # Switch to other window
Ctrl+X ^    # Enlarge window
Ctrl+X {    # Shrink window
Alt+X delete-other-windows # Delete other windows
Alt+X split-window-horizontally # Split horizontally
```

### Undo/Redo

```bash
Ctrl+_      # Undo (Ctrl+/)
Ctrl+X U    # Undo
Ctrl+G      # Abort current command
Ctrl+X Ctrl+U# Redo
Alt+X undo  # Undo command
Alt+X redo  # Redo command
```

### Programming Features

```bash
Alt+X auto-indent-mode # Toggle auto-indent
Alt+X c-mode # Enter C mode
Alt+X python-mode # Enter Python mode
Ctrl+C Ctrl+C# Comment region
Alt+;       # Comment line
Alt+X comment-region # Comment region
Alt+X uncomment-region # Uncomment region
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

# Edit with custom window title
jed -t "Main Program" main.c

# Load additional S-Lang script
jed -l myscript.sl main.c
```

### Split Screen Editing

```bash
# Start with two windows
jed -2 main.c

# Open two files in split view
jed -2 main.c header.h

# Switch between windows
Ctrl+X O

# Open another file in second window
Ctrl+X F
Enter filename

# Split current window horizontally
Ctrl+X 2

# Split current window vertically
Ctrl+X 3

# Delete other windows (focus on current)
Ctrl+X 1
```

### Programming Development

```bash
# Edit C file with syntax highlighting
jed program.c

# Edit multiple source files
jed main.c utils.c header.h

# Execute custom function on startup
jed -f "goto-line 50" source.c

# Start in specific mode
jed -f "python-mode" script.py

# Load project-specific configuration
jed -l project.sl main.c

# Edit with line numbers enabled
jed -f "set_line_numbers" source.c
```

### Batch Processing

```bash
# Run JED script in batch mode
jed -batch -f "replace_all" input.txt

# Execute S-Lang function on file
jed -batch -f "compile_file" source.c

# Process multiple files
jed -batch -f "auto_indent" *.c

# Run custom script
jed -batch -l process.sl data.txt

# Validate files without modifying
jed -batch -f "validate" *.py
```

## Advanced Features

### Syntax Highlighting

JED provides comprehensive syntax highlighting for many languages:

```bash
# Supported languages include:
C, C++, Java, Python, Perl, PHP, JavaScript, HTML, CSS, XML, LaTeX,
Shell scripts, SQL, Fortran, Pascal, Ruby, Go, Rust, etc.

# Automatic syntax detection based on file extension
jed script.py      # Python syntax highlighting
jed style.css      # CSS syntax highlighting
jed index.html     # HTML syntax highlighting
jed Makefile       # Makefile syntax highlighting

# Manual mode selection
Alt+X c-mode       # Enter C mode
Alt+X python-mode  # Enter Python mode
Alt+X html-mode    # Enter HTML mode
Alt+X shell-mode   # Enter Shell mode
```

### Custom Key Bindings

```bash
# Define custom key bindings in .jedrc
setkey("save_buffer", "^X^S");
setkey("quit_jed", "^X^Q");
setkey("find_file", "^P");
setkey("save_buffer", "^S");

# Define function keys
setkey("compile_program", "^Pf1");
setkey("run_program", "^Pf2");
setkey("debug_program", "^Pf3");

# Mode-specific bindings
define_mode_key("c_mode", "^Cc", "compile_c_program");
define_mode_key("python_mode", "^Cr", "run_python_script");
```

### Macros and Functions

```bash
# Define custom functions
define hello_world()
{
    message("Hello, World!");
}

# Define complex editing function
define insert_copyright()
{
    bol();
    insert("/* Copyright (C) " + strftime("%Y") + " */\n");
}

# Execute custom function
Ctrl+X U hello_world

# Record macro
Ctrl+X (    # Start recording
# Perform actions
Ctrl+X )    # Stop recording

# Execute last macro
Ctrl+X E
```

### Templates and Snippets

```bash
# Define C template
define c_template()
{
    insert("#include <stdio.h>\n\n");
    insert("int main(int argc, char *argv[])\n");
    insert("{\n");
    insert("    \n");
    insert("    return 0;\n");
    insert("}\n");
}

# Define Python template
define python_template()
{
    insert("#!/usr/bin/env python3\n");
    insert("\"\"\"\n");
    insert("Description: \n");
    insert("\"\"\"\n\n");
    insert("def main():\n");
    insert("    pass\n\n");
    insert("if __name__ == '__main__':\n");
    insert("    main()\n");
}

# Use template
Ctrl+X U c_template
Ctrl+X U python_template
```

## Configuration

### .jedrc Configuration File

```bash
# ~/.jedrc - JED configuration file

# Color scheme settings
set_color("normal", "white", "black");
set_color("keyword", "yellow", "black");
set_color("string", "green", "black");
set_color("comment", "cyan", "black");
set_color("number", "magenta", "black");
set_color("preprocessor", "brightcyan", "black");

# Editor behavior
set_integer_variable("TAB", 4);
set_integer_variable("AutoIndent", 1);
set_integer_variable("LineNumbers", 1);
set_integer_variable("MakeBackups", 1);
set_integer_variable("WrapMode", 1);

# Search settings
set_integer_variable("SearchCaseSensitive", 0);
set_integer_variable("SearchHighlight", 1);

# C/C++ specific settings
set_integer_variable("C_Use_Prefix", 1);
set_integer_variable("C_Indent_Comments", 1);

# Python specific settings
set_integer_variable("Python_Indent", 4);
set_integer_variable("Python_Comment_Column", 40);
```

### Language-Specific Settings

```bash
# C/C++ mode settings
define_mode("c_mode", "C");
set_mode_string("c_mode", "*.c", "*.h", "*.cpp", "*.hpp", "*.cc", "*.cxx");
set_mode_comment_start("c_mode", "/*");
set_mode_comment_end("c_mode", "*/");

# Python mode settings
define_mode("python_mode", "Python");
set_mode_string("python_mode", "*.py", "*.pyw");
set_mode_comment_start("python_mode", "#");

# HTML mode settings
define_mode("html_mode", "HTML");
set_mode_string("html_mode", "*.html", "*.htm", "*.xhtml");

# Shell mode settings
define_mode("sh_mode", "Shell");
set_mode_string("sh_mode", "*.sh", "*.bash", "*.zsh", "*.profile", ".bashrc");
```

### Custom Functions Library

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

# Function to wrap selection in HTML tags
define wrap_html_tag(tag)
{
    tag = tag or "div";
    push_mark();
    bol(); skip_white();
    insert("<" + tag + ">");
    pop_mark();
    push_mark();
    eol(); skip_white(-1);
    insert("</" + tag + ">");
    pop_mark();
}

# Function to format JSON
define format_json()
{
    push_mark();
    bob();
    while (not(eob()))
    {
        if (looking_at("{") or looking_at("\""))
        {
            indent_line();
            newline_and_indent();
        }
        skip_chars("{}");
    }
    pop_mark();
}
```

## Practical Examples

### C Programming Development

```bash
# Create new C project
jed -f "c_template" main.c

# Edit with auto-complete
jed source.c
Alt+X c-mode
Ctrl+X S     # Save
Alt+X compile
gcc -Wall -Wextra -o program main.c

# Debug with GDB integration
Alt+X gdb
gdb ./program
break main
run

# Use header guard template
Ctrl+X U header_guard

# Navigate function definitions
Alt+X c-goto-function
Alt+X c-goto-declaration
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

# Validate HTML
Alt+X html_validate

# Format CSS
Alt+X css_format

# Minify JavaScript (custom function)
Alt+X js_minify
```

### System Administration

```bash
# Edit configuration files with line numbers
sudo jed -f "set_line_numbers" /etc/ssh/sshd_config

# Edit multiple config files
jed /etc/nginx/nginx.conf /etc/php/php.ini /etc/mysql/my.cnf

# Search for specific directive
Ctrl+S
Port
Enter

# Validate configuration
Alt+X shell_command
sudo nginx -t

# Edit with backup protection
jed -f "enable_backups" /etc/important.conf
```

### Documentation Writing

```bash
# Edit documentation
jed README.md

# Use text mode features
Ctrl+X U wrap_paragraph

# Insert table of contents
Alt+X insert_toc

# Spell check
Alt+X ispell

# Export to HTML
Alt+X export_html
```

### Python Development

```bash
# Edit Python script
jed script.py
Alt+X python-mode

# Auto-indent according to PEP 8
Alt+X auto-indent-mode

# Run script
Alt+X shell_command
python3 script.py

# Check syntax
Alt+X python_check_syntax

# Format with Black
Alt+X shell_command
black script.py
```

## Advanced Usage

### Regular Expressions

```bash
# Search with regular expressions
Ctrl+R
^#.*$       # Find comment lines
function\(  # Find function definitions
\d{4}-\d{2}-\d{2}  # Find dates

# Replace with regex
Alt+%
^#(.*)$    # Replace comment lines
--- \1     # With prefix

# Complex regex operations
Alt+X replace_regex
pattern: \b([A-Z]+)\b
replacement: \L\1
```

### Buffer Management

```bash
# Work with multiple buffers
Ctrl+X C-f  # Open new file
Ctrl+X B    # Switch buffer
Ctrl+X Ctrl+B# List all buffers
Ctrl+X K    # Kill buffer

# Buffer navigation
Alt+X next-buffer
Alt+X previous-buffer

# Save all buffers
Alt+X save-all-buffers

# Close all buffers except current
Alt+X kill-other-buffers
```

### Window Operations

```bash
# Split window management
jed -2 file1.txt file2.txt

# Resize windows
Alt+X enlarge-window
Alt+X shrink-window
Alt+X balance-windows

# Jump between windows
Ctrl+X O

# Close specific window
Alt+X delete-window

# Switch to specific window
Alt+X select-window
```

### Integration with External Tools

```bash
# Execute shell commands
Alt+!       # Shell command

# Run compiler
Alt+X compile
make clean && make

# Run version control
Alt+X git-status
Alt+X git-add
Alt+X git-commit

# Run linter
Alt+X shell-command
pylint script.py
eslint app.js

# Integration with grep
Alt+X grep
pattern: function
files: *.c
```

### Project Management

```bash
# Project file browser
Alt+X dired
Alt+X tree-view

# Tag file navigation
Alt+X visit-tags-file
Alt+X find-tag

# Multiple file search and replace
Alt+X query-replace-regexp
files: *.py

# Project-wide compilation
Alt+X compile-project
make all
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

# Define complex text processing
define process_log_file()
{
    () = bob();
    while (not(eob()))
    {
        if (looking_at("ERROR"))
        {
            set_color("line", "brightred", "black");
            newline();
        }
        else if (looking_at("WARNING"))
        {
            set_color("line", "yellow", "black");
            newline();
        }
        else
        {
            newline();
        }
    }
}
```

### Batch Mode Processing

```bash
#!/bin/bash
# Process multiple files with JED

# Auto-indent all C files
for file in *.c; do
    echo "Processing $file..."
    jed -batch -f "auto_indent_mode" -f "save_buffer" "$file"
done

# Add copyright headers to all source files
for file in *.py; do
    jed -batch -f "add_copyright_header" -f "save_buffer" "$file"
done

# Validate configuration files
for config in /etc/*/*.conf; do
    jed -batch -f "validate_config" "$config"
done
```

### Custom S-Lang Scripts

```bash
# project.sl - Project-specific settings
% Load project configuration
load_file("project_config.sl");

% Set up build commands
define build_project()
{
    shell_cmd("make clean && make");
}

define run_tests()
{
    shell_cmd("make test");
}

define run_debug()
{
    shell_cmd("gdb ./debug/program");
}

% Custom key bindings
setkey("build_project", "^Pb");
setkey("run_tests", "^Pt");
setkey("run_debug", "^Pd");
```

## Performance and Optimization

### Large File Handling

```bash
# Disable features for large files
jed -n --no-mode large_file.txt

# Use batch mode for processing
jed -batch -f "process_large_file" huge.log

# Limit syntax highlighting
Alt+X limit_highlighting

# Use virtual editing mode
Alt+X virtual_edit_mode
```

### Memory Management

```bash
# Reduce memory usage
jed -n --no-backup file.txt

# Clear unused buffers
Alt+X clean-buffers

# Optimize for speed
Alt+X fast-mode
Alt+X no-syntax-highlighting

# Monitor memory usage
Alt+X show-memory-usage
```

## Integration with Version Control

### Git Integration

```bash
# Git status in JED
Alt+X git-status

# Stage files
Alt+X git-add

# Commit with message
Alt+X git-commit

# View diff
Alt+X git-diff

# Resolve merge conflicts
Alt+X git-merge-conflict
```

### SVN Integration

```bash
# SVN status
Alt+X svn-status

# Update from repository
Alt+X svn-update

# Commit changes
Alt+X svn-commit

# View history
Alt+X svn-log
```

## Related Commands

- [`emacs`](/docs/commands/editors/emacs) - GNU Emacs (JED can emulate it)
- [`vi`](/docs/commands/editors/vi) - Visual editor
- [`vim`](/docs/commands/editors/vim) - Vi IMproved
- [`nano`](/docs/commands/editors/nano) - Nano editor
- [`joe`](/docs/commands/editors/joe) - Joe's Own Editor
- [`pico`](/docs/commands/editors/pico) - Pine composer
- [`ed`](/docs/commands/editors/ed) - Standard Unix editor
- [`sed`](/docs/commands/text-processing/sed) - Stream editor

## Best Practices

1. **Configure .jedrc** for personalized workflow and key bindings
2. **Learn keyboard shortcuts** for efficient editing operations
3. **Use syntax highlighting** for better code readability and error detection
4. **Enable auto-indentation** for consistent code formatting
5. **Use split windows** for comparing code sections and references
6. **Customize templates** for repetitive code patterns and boilerplate
7. **Learn S-Lang** for advanced customization and automation
8. **Use batch mode** for automated file processing and transformations
9. **Enable line numbers** for debugging and code review
10. **Use search and replace** efficiently for bulk changes and refactoring
11. **Create project-specific configurations** for consistent development environment
12. **Utilize version control integration** for better workflow management
13. **Customize color schemes** for reduced eye strain and better visibility
14. **Use macros** for repetitive editing tasks and automation
15. **Regular backups of configuration** to preserve customizations

## Performance Tips

1. **Disable unnecessary features** when editing large files
2. **Use batch mode** for automated processing without GUI overhead
3. **Configure appropriate syntax highlighting** based on file types
4. **Optimize buffer management** by closing unused buffers
5. **Use split windows wisely** to avoid screen clutter
6. **Configure auto-indentation** appropriately for different languages
7. **Enable syntax checking** plugins for real-time error detection
8. **Use regular expressions** for complex search and replace operations
9. **Customize key bindings** for frequently used operations
10. **Optimize startup time** by loading only necessary configuration files

## Troubleshooting

### Common Issues

#### Syntax Highlighting Problems
```bash
# Enable syntax highlighting manually
Alt+X syntax_mode
Enter language name

# Check mode assignment
Alt+X describe_mode

# Force mode selection
Alt+X c-mode
Alt+X python-mode
Alt+X html-mode
```

#### Key Binding Conflicts
```bash
# Check current key binding
Alt+X describe_key
Press key sequence

# Reset key bindings
Alt+X load_defaults

# List all key bindings
Alt+X describe_bindings

# Debug key sequences
Alt+X keyboard-quit
```

#### Performance Issues
```bash
# Disable features for large files
jed -n --no-mode large_file.txt

# Use batch mode for automation
jed -batch -f "process_file" input.txt

# Clear unused buffers
Alt+X clean-buffers

# Optimize memory usage
Alt+X garbage-collect
```

#### Configuration Problems
```bash
# Test configuration without custom files
jed -n test.txt

# Check for syntax errors in .jedrc
jed -batch -f "load_file" ~/.jedrc

# Reload configuration
Alt+X load-user-init-file

# Check loaded modes
Alt+X list-modes
```

#### File Encoding Issues
```bash
# Set encoding explicitly
Alt+X set-encoding
utf-8

# Convert file encoding
Alt+X encode-file
utf-8

# Detect encoding
Alt+X detect-encoding
```

The `jed` command provides a powerful, programmable editing environment particularly well-suited for software development and text processing. Its combination of syntax highlighting, multiple emulation modes, and S-Lang scripting capabilities makes it a versatile choice for programmers who need an editor that can be extensively customized to match their preferred workflow. The ability to emulate other popular editors while maintaining its own powerful features makes JED an excellent choice for users transitioning between different editing environments or those who need a lightweight yet powerful text editor.