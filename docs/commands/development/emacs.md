---
title: emacs - Emacs Text Editor
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# emacs - Emacs Text Editor

The `emacs` command is a highly extensible, customizable, and powerful text editor developed by Richard Stallman for the GNU Project. Emacs is more than just a text editor; it's a complete working environment with capabilities for email, file management, programming, and much more.

## Basic Syntax

```bash
emacs [options] [filename...]
```

## Common Options

### Basic Options

- `+<number>` - Go to line number in first file
- `-q`, `--no-init-file` - Don't load initialization file
- `--no-desktop` - Don't load a saved desktop
- `--no-site-file` - Don't load site-start.el
- `--no-splash` - Don't display splash screen
- `-u <user>`, `--user=<user>` - Load user's initialization file
- `--debug-init` - Enable Emacs Lisp debugger for init file

### Display Options

- `-nw`, `--no-window-system` - Use terminal instead of window system
- `-t <device>`, `--terminal=<device>` - Use device for terminal output
- `-bg <color>`, `--background-color=<color>` - Set background color
- `-fg <color>`, `--foreground-color=<color>` - Set foreground color
- `-fn <font>`, `--font=<font>` - Set font
- `-g <geometry>`, `--geometry=<geometry>` - Set window geometry

### File Handling

- `-t ``, `--terminal=`` - Use file as terminal
- `-f <function>`, `--funcall=<function>` - Call Lisp function
- `-l ``, `--load=`` - Load Lisp code file
- `--insert=`` - Insert contents of file into buffer

### Mode Options

- `--batch` - Run Emacs in batch mode (non-interactive)
- `--daemon` - Start Emacs as a server daemon
- `--debug-init` - Debug initialization file

### Help and Information

- `--version` - Display version information
- `--help` - Display help and exit

## Emacs Keyboard Notation

Emacs uses a special notation for keyboard shortcuts:
- `C-` - Control key
- `M-` - Meta key (usually Alt)
- `S-` - Shift key
- `RET` - Return/Enter key
- `SPC` - Space bar
- `DEL` - Delete key
- `ESC` - Escape key

## Essential Commands

### Basic File Operations

```elisp
C-x C-f    # Find file (open)
C-x C-s    # Save file
C-x C-w    # Write file (save as)
C-x C-v    # Find alternate file
C-x i      # Insert file
C-x C-c    # Exit Emacs
```

### Basic Movement

```elisp
C-f        # Move forward one character
C-b        # Move backward one character
C-p        # Move to previous line
C-n        # Move to next line
M-f        # Move forward one word
M-b        # Move backward one word
C-a        # Move to beginning of line
C-e        # Move to end of line
M-<        # Move to beginning of buffer
M->        # Move to end of buffer
```

### Navigation

```elisp
C-v        # Scroll forward one screen
M-v        # Scroll backward one screen
M-r        # Move to middle of screen
C-l        # Re-center screen around cursor
M-g g      # Go to line number
M-g M-g    # Go to line number (alternative)
```

### Editing

```elisp
C-d        # Delete character at cursor
DEL        # Delete character before cursor
M-d        # Delete word
M-DEL      # Delete word backward
C-k        # Kill (cut) to end of line
M-k        # Kill sentence
C-y        # Yank (paste)
M-y        # Cycle through kill ring after yank
```

### Mark and Region

```elisp
C-SPC      # Set mark
C-x C-x    # Exchange point and mark
C-w        # Kill region (cut)
M-w        # Copy region
C-x h      # Mark whole buffer
```

### Search and Replace

```elisp
C-s        # Incremental search forward
C-r        # Incremental search backward
M-%        # Query replace
C-M-%      # Query replace regex
C-M-s      # Incremental regex search forward
C-M-r      # Incremental regex search backward
```

### Buffers

```elisp
C-x b      # Switch buffer
C-x C-b    # List buffers
C-x k      # Kill buffer
C-x s      # Save some buffers
C-x C-q    # Toggle read-only mode
```

### Windows

```elisp
C-x 2      # Split window horizontally
C-x 3      # Split window vertically
C-x 1      # Delete other windows
C-x 0      # Delete current window
C-x o      # Switch to other window
C-x ^      # Grow window
C-x {      # Shrink window horizontally
C-x }      # Grow window horizontally
```

### Frames

```elisp
C-x 5 2    # Create new frame
C-x 5 1    # Delete other frames
C-x 5 0    # Delete current frame
C-x 5 o    # Select other frame
```

### Undo/Redo

```elisp
C-x u      # Undo
C-_        # Undo (alternative)
C-g        # Cancel current command
M-x revert-buffer    # Revert buffer to file contents
```

### Capitalization

```elisp
M-c        # Capitalize word
M-u        # Uppercase word
M-l        # Lowercase word
M-x capitalize-region  # Capitalize region
M-x upcase-region     # Uppercase region
M-x downcase-region    # Lowercase region
```

### Indentation

```elisp
TAB        # Indent line appropriately
C-M-\      # Indent region appropriately
M-x indent-region    # Indent region
M-x indent-for-tab-command  # Smart indentation
```

## Usage Examples

### Basic File Editing

```bash
# Open a file
emacs myfile.txt

# Open file at specific line
emacs +50 program.py

# Open multiple files
emacs file1.txt file2.txt file3.txt

# Open in terminal mode
emacs -nw config.conf
```

### Quick Editing

```bash
# Start without loading init file (faster startup)
emacs -q quick_edit.txt

# Run specific Lisp function on startup
emacs --eval "(progn (find-file \"test.txt\") (goto-line 100))"
```

### Server Mode

```bash
# Start Emacs server daemon
emacs --daemon

# Connect to running server
emacsclient filename.txt

# Create new frame with server
emacsclient -c filename.txt

# Edit in terminal with server
emacsclient -t filename.txt
```

### Batch Processing

```bash
# Run Lisp script in batch mode
emacs --batch --eval "(progn (find-file \"input.txt\") (replace-string \"old\" \"new\") (save-buffer))"

# Evaluate Lisp expression
emacs --batch --eval "(print (+ 2 2))"
```

## Advanced Features

### Major Modes

Emacs automatically selects appropriate major modes based on file extension:

```elisp
M-x text-mode           # Plain text editing
M-x python-mode         # Python programming
M-x c-mode              # C programming
M-x java-mode           # Java programming
M-x html-mode           # HTML editing
M-x latex-mode          # LaTeX editing
M-x org-mode            # Org-mode for note-taking
```

### Minor Modes

```elisp
M-x auto-fill-mode      # Automatic line wrapping
M-x line-number-mode    # Show line numbers
M-x column-number-mode  # Show column numbers
M-x global-linum-mode   # Global line numbers
M-x flyspell-mode       # Spell checking on the fly
M-x visual-line-mode    # Visual line wrapping
M-x whitespace-mode     # Show whitespace
```

### File Management

```elisp
C-x d      # Dired mode (directory editor)
C-x C-f    # Open file with completion
C-x C-d    # List directory
C-x C-l    # Load directory
```

### Bookmarks

```elisp
C-x r m    # Set bookmark
C-x r b    # Jump to bookmark
C-x r l    # List bookmarks
C-x r d    # Delete bookmark
```

### Registers

```elisp
C-x r s    # Save region to register
C-x r i    # Insert register contents
C-x r <spc># Save point to register
C-x r j    # Jump to register position
C-x r w    # Save window configuration to register
```

### Rectangle Operations

```elisp
C-x r k    # Kill rectangle
C-x r y    # Yank rectangle
C-x r o    # Open rectangle (insert whitespace)
C-x r c    # Clear rectangle
C-x r t    # String rectangle (prefix each line)
```

### Tags Navigation

```elisp
M-.        # Find tag (jump to definition)
M-,        # Pop tag mark
M-x tags-search      # Search all tagged files
M-x tags-query-replace  # Replace in tagged files
```

### Version Control

```elisp
C-x v v    # Version control next action
C-x v =    # Compare with file version
C-x v d    # Directory status
C-x v l    # Print log
C-x v i    # Register file for version control
```

## Configuration

### Basic .emacs Configuration

```elisp
;; ~/.emacs or ~/.emacs.d/init.el

;; Disable splash screen
(setq inhibit-splash-screen t)

;; Enable line numbers
(global-linum-mode 1)

;; Enable column numbers
(column-number-mode 1)

;; Set tab width
(setq tab-width 4)
(setq-default indent-tabs-mode nil)

;; Enable syntax highlighting
(global-font-lock-mode t)

;; Set default font
(set-face-attribute 'default nil :font "Consolas 12")

;; Enable auto-fill-mode for text modes
(add-hook 'text-mode-hook 'turn-on-auto-fill)

;; Show matching parentheses
(show-paren-mode 1)

;; Enable ido mode for better file/buffer switching
(ido-mode 1)

;; Set theme
(load-theme 'wombat t)

;; Custom key bindings
(global-set-key (kbd "C-c w") 'save-buffer)
(global-set-key (kbd "C-c q") 'kill-buffer)
```

### Package Management

```elisp
;; Initialize package system
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(package-initialize)

;; Use-package for easier package management
(unless (package-installed-p 'use-package)
  (package-install 'use-package))
(require 'use-package)
```

### Language-Specific Configuration

```elisp
;; Python configuration
(use-package python-mode
  :config
  (setq python-indent-offset 4)
  (add-hook 'python-mode-hook (lambda () (electric-pair-local-mode 1))))

;; C/C++ configuration
(use-package cc-mode
  :config
  (setq c-default-style "linux"
        c-basic-offset 4))

;; JavaScript configuration
(use-package js-mode
  :config
  (setq js-indent-level 2))
```

## Org Mode Examples

### Basic Org Mode Usage

```elisp
;; Open Org mode file
emacs notes.org

;; Within Org mode:
TAB         # Cycle visibility
S-TAB       # Cycle global visibility
M-RET       # Insert heading
M-S-RET     # Insert TODO heading
C-c C-t     # Rotate TODO state
C-c C-s     # Schedule task
C-c C-d     # Set deadline
C-c C-c     # Set tags/properties
C-c C-e     # Export
```

### Org Mode Structure

```org
* Main heading
** Subheading 1
    - Bullet point 1
    - Bullet point 2
    1. Numbered item
    2. Another numbered item
** Subheading 2
    TODO [#A] Important task
    DEADLINE: <2024-01-01>
    :PROPERTIES:
    :EFFORT:   2:00
    :END:
```

## Practical Examples

### Programming Workflow

```bash
# Open project directory
emacs /path/to/project/

# Within Emacs:
C-x d      # Open Dired mode to browse files
RET        # Enter directory or open file

# Edit code:
M-x python-mode    # Switch to Python mode
C-c C-c            # Execute Python code buffer
C-M-x              # Execute current function
```

### Note Taking

```bash
# Open Org mode for notes
emacs -nw ~/notes.org

# Structure notes:
* Meeting Notes - 2024-01-01
** Attendees
   - John Doe
   - Jane Smith
** Topics
   - Project update
   - Budget review
** Action Items
   - [ ] Review budget report
   - [ ] Schedule follow-up meeting
```

### Email with Emacs

```elisp
;; Enable email configuration
M-x gnus          # Start news/email reader
M-x rmail         # Read email
M-x mail          # Compose email
```

### Version Control Integration

```elisp
;; Git operations
C-x v g           # View git status
C-x v =           # Compare with git version
C-x v l           # View git log
C-x v v           # Next version control action
```

## Shell Integration

### Running Shell Commands

```elisp
M-!               # Execute shell command
M-x shell         # Start shell buffer
M-x term          # Start terminal emulator
M-x eshell         # Start Emacs shell
C-u M-!           # Insert shell command output
```

### Compilation

```elisp
M-x compile       # Compile project
M-x recompile     # Re-run last compilation
M-x grep          # Run grep command
M-x rgrep         # Recursive grep
```

## Help and Documentation

```elisp
C-h ?             # Help overview
C-h t             # Tutorial
C-h k             # Describe key binding
C-h f             # Describe function
C-h v             # Describe variable
C-h w             # Where is key binding
C-h a             # Command apropos
C-h i             # Info manual
C-h r             # Emacs manual
```

## Related Commands

- [`vim`](/docs/commands/editors/vim) - Vi IMproved editor
- [`vi`](/docs/commands/editors/vi) - Visual editor
- [`nano`](/docs/commands/editors/nano) - Simple text editor
- [`ed`](/docs/commands/editors/ed) - Line-oriented editor
- [`emacsclient`](/docs/commands/editors/emacs) - Emacs client for server mode

## Best Practices

1. **Learn incremental search** with `C-s` for efficient navigation
2. **Use keyboard shortcuts** extensively to avoid mouse dependency
3. **Customize `.emacs`** gradually for personalized workflow
4. **Enable syntax highlighting** and appropriate major modes
5. **Learn register and bookmark commands** for efficient navigation
6. **Use version control integration** for development
7. **Master window and buffer management** for multitasking
8. **Explore package ecosystem** for extended functionality
9. **Use Org mode** for note-taking and project management
10. **Enable auto-save and backup** for data safety

## Common Issues and Solutions

### Slow Startup

```elisp
;; Add to .emacs for faster startup
(setq gc-cons-threshold 100000000)
(setq read-process-output-max (* 1024 1024))
```

### Font Issues

```elisp
;; Set font properly
(set-face-attribute 'default nil :font "Monospace 12")
(set-face-attribute 'font-lock-comment-face nil :slant 'italic)
```

### Backup File Management

```elisp
;; Control backup files
(setq backup-directory-alist `((".*" . ,temporary-file-directory)))
(setq auto-save-file-name-transforms `((".*" ,temporary-file-directory t)))
```

### Memory Usage

```elisp
;; Garbage collection tuning
(setq gc-cons-threshold 400000)
```

Emacs represents one of the most powerful and extensible text editing environments available. Its combination of thorough documentation, extensive customization options, and built-in functionality makes it suitable for everything from simple text editing to complete integrated development environments. While it has a steeper learning curve than simpler editors, mastering Emacs provides unmatched efficiency and flexibility for text manipulation and workflow automation.