---
title: emacs - Emacs Text Editor
sidebar_label: emacs
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# emacs - Emacs Text Editor

The `emacs` command is a highly extensible, customizable, and powerful text editor developed by Richard Stallman for the GNU Project. Emacs is more than just a text editor; it's a complete working environment with capabilities for email, file management, programming, and much more. Built around an Emacs Lisp interpreter, Emacs offers unprecedented customization and extensibility, allowing users to transform it into virtually any kind of text-based application. It features comprehensive syntax highlighting, intelligent code completion, powerful search and replace capabilities, and an ecosystem of thousands of packages that extend its functionality.

## Basic Syntax

```bash
emacs [options] [filename...]
```

## Command Line Options

### Basic Options
- `+<number>` - Go to line number in first file
- `+<pattern>` - Go to first occurrence of pattern in first file
- `-q`, `--no-init-file` - Don't load initialization file (~/.emacs or ~/.emacs.d/init.el)
- `--no-desktop` - Don't load a saved desktop session
- `--no-site-file` - Don't load site-start.el site-wide initialization
- `--no-splash` - Don't display splash screen on startup
- `-u <user>`, `--user=<user>` - Load specified user's initialization file
- `--debug-init` - Enable Emacs Lisp debugger for initialization file errors

### Display and Interface Options
- `-nw`, `--no-window-system` - Use terminal instead of window system (GUI)
- `-t <device>`, `--terminal=<device>` - Use specified device for terminal output
- `-bg <color>`, `--background-color=<color>` - Set background color
- `-fg <color>`, `--foreground-color=<color>` - Set foreground color
- `-fn <font>`, `--font=<font>` - Set font (e.g., "Monospace 12")
- `-g <geometry>`, `--geometry=<geometry>` - Set window geometry (WIDTHxHEIGHT+X+Y)
- `-fs`, `--fullscreen` - Start in fullscreen mode
- `-mm`, `--maximized` - Start maximized

### File and Buffer Options
- `--find-file=<file>` - Visit specified file
- `--insert=<file>` - Insert contents of file into current buffer
- `-l <file>`, `--load=<file>` - Load Emacs Lisp code from file
- `-f <function>`, `--funcall=<function>` - Call specified Lisp function
- `--eval <expression>` - Evaluate Emacs Lisp expression

### Mode and Operation Options
- `--batch` - Run Emacs in batch mode (non-interactive, for scripting)
- `--daemon` - Start Emacs as a server daemon
- `--daemon=<name>` - Start named server daemon
- `--script <file>` - Run Emacs as script interpreter
- `--quick` - Start quickly, skipping much of the initialization

### Help and Information Options
- `--version` - Display version information and exit
- `--help` - Display help information and exit

## Emacs Keyboard Notation

Emacs uses special notation for keyboard shortcuts:
- `C-` - Control key
- `M-` - Meta key (usually Alt or Option)
- `S-` - Shift key
- `RET` - Return/Enter key
- `SPC` - Space bar
- `DEL` - Delete/Backspace key
- `ESC` - Escape key
- `TAB` - Tab key

## Essential Keyboard Commands

### Basic File Operations

```elisp
C-x C-f    # Find file (open)
C-x C-s    # Save current buffer
C-x C-w    # Write file (save as)
C-x C-v    # Find alternate file (replace current)
C-x i      # Insert file contents at cursor
C-x C-c    # Exit Emacs (with confirmation)
C-x C-q    # Toggle read-only mode
```

### Movement and Navigation

```elisp
;; Character and line movement
C-f        # Move forward one character
C-b        # Move backward one character
C-p        # Move to previous line
C-n        # Move to next line

;; Word movement
M-f        # Move forward one word
M-b        # Move backward one word

;; Line boundaries
C-a        # Move to beginning of line
C-e        # Move to end of line

;; Buffer navigation
M-<        # Move to beginning of buffer
M->        # Move to end of buffer
M-g g      # Go to line number (prompts)
M-g M-g    # Go to line number (alternative)

;; Screen navigation
C-v        # Scroll forward one screen
M-v        # Scroll backward one screen
M-r        # Move cursor to middle of screen
C-l        # Re-center screen around cursor (repeat to cycle positions)
```

### Text Editing and Manipulation

```elisp
;; Deletion
C-d        # Delete character at cursor
DEL        # Delete character before cursor (Backspace)
M-d        # Delete word from cursor forward
M-DEL      # Delete word from cursor backward
C-k        # Kill (cut) from cursor to end of line
M-k        # Kill sentence from cursor forward
C-w        # Kill region (cut selected text)
M-w        # Copy region (save in kill ring)

;; Yanking (pasting)
C-y        # Yank (paste) most recent killed text
M-y        # Cycle through kill ring after yank (alternative pastes)

;; Insertion and case changes
M-c        # Capitalize word from cursor
M-u        # Uppercase word from cursor
M-l        # Lowercase word from cursor
M-t        # Transpose two characters
C-t        # Transpose two words

;; Text manipulation
M-x transpose-lines    # Swap current line with previous
M-x delete-region      # Delete selected region
M-x copy-region-as-kill # Copy region to kill ring
```

### Mark, Region, and Selection

```elisp
C-SPC      # Set mark at cursor position
C-x C-x    # Exchange point and mark (toggle selection)
C-x h      # Mark entire buffer (select all)
C-x C-p    # Mark page (paragraph)
M-@        # Mark word
M-h        # Mark paragraph
C-u C-SPC  # Jump to previous mark position
```

### Search and Replace

```elisp
;; Incremental search
C-s        # Incremental search forward
C-r        # Incremental search backward
C-M-s      # Incremental regex search forward
C-M-r      # Incremental regex search backward

;; Non-incremental search
M-s w      # Word search
M-s o      # Occur (show all lines matching pattern)
M-s h r    # Highlight regex
M-s h l    # Highlight lines matching regex

;; Replace operations
M-%        # Query replace (interactive replace)
C-M-%      # Query replace with regex patterns
M-x replace-string    # Replace all occurrences
M-x replace-regexp    # Replace all using regex

;; Search within selection
M-x isearch-forward-regexp
M-x isearch-backward-regexp
```

### Buffer Management

```elisp
C-x b      # Switch to buffer (with completion)
C-x C-b    # List all buffers
C-x k      # Kill (close) current buffer
C-x s      # Save some buffers (asks for each)
C-x C-q    # Toggle read-only mode
C-x C-l    # Change buffer's default directory
M-x revert-buffer    # Revert buffer to file contents
M-x rename-buffer    # Rename current buffer
```

### Window and Frame Management

```elisp
;; Window splitting
C-x 2      # Split window horizontally
C-x 3      # Split window vertically
C-x 1      # Delete other windows (keep only current)
C-x 0      # Delete current window
C-x o      # Switch to other window

;; Window resizing
C-x ^      # Grow window vertically
C-x }      # Grow window horizontally
C-x {      # Shrink window horizontally
C-x -      # Shrink window if larger than buffer
C-x +      # Balance window sizes

;; Frame operations (GUI windows)
C-x 5 2    # Create new frame
C-x 5 1    # Delete other frames
C-x 5 0    # Delete current frame
C-x 5 o    # Select other frame
C-x 5 f    # Find file in new frame
C-x 5 b    # Switch buffer in new frame
```

### Undo and Redo

```elisp
C-x u      # Undo last change
C-_        # Undo (alternative binding)
C-g        # Cancel current command/operation
M-x undo-only       # Undo but don't move through redo history
M-x redo            # Redo undone changes
M-x revert-buffer   # Revert buffer to saved file contents
```

### Indentation and Formatting

```elisp
TAB        # Indent line appropriately for current mode
C-M-\      # Indent region appropriately
C-j        # Newline and indent (electric line feed)
M-x indent-region    # Indent selected region
M-x indent-for-tab-command  # Smart indentation
M-x format-paragraph        # Format paragraph
M-x fill-region            # Fill and justify region
C-x TAB    # Indent region rigidly (with prefix arg for columns)
```

### Registers and Bookmarks

```elisp
;; Registers (text storage locations)
C-x r s    # Save region to register
C-x r i    # Insert register contents at cursor
C-x r SPC  # Save point (cursor position) to register
C-x r j    # Jump to register position
C-x r w    # Save window configuration to register
C-x r f    # Save frame configuration to register

;; Bookmarks (named positions in files)
C-x r m    # Set bookmark at current position
C-x r b    # Jump to bookmark
C-x r l    # List all bookmarks
C-x r d    # Delete bookmark
M-x bookmark-save        # Save bookmarks to file
M-x bookmark-load        # Load bookmarks from file
```

### Rectangle Operations

```elisp
C-x r k    # Kill rectangle (cut rectangular region)
C-x r y    # Yank rectangle (paste)
C-x r o    # Open rectangle (insert whitespace to clear area)
C-x r c    # Clear rectangle (replace with whitespace)
C-x r t    # String rectangle (prefix each line with string)
C-x r d    # Delete rectangle
```

### Programming Support

```elisp
;; Tags navigation (requires TAGS file)
M-.        # Find tag (jump to definition)
M-,        # Pop tag mark (return to previous position)
M-*        # Pop tag mark automatically
M-x tags-search      # Search all tagged files
M-x tags-query-replace  # Replace in all tagged files
M-x visit-tags-table  # Load tags table

;; Compilation and building
M-x compile        # Run compilation command
M-x recompile      # Re-run last compilation
C-x `              # Go to next error location
M-x next-error     # Go to next compilation error
M-x previous-error # Go to previous compilation error

;; Debugging integration
M-x gdb           # Start GDB debugger
M-x jdb           # Start JDB debugger (Java)
M-x pdb           # Start PDB debugger (Python)
```

### Version Control Integration (VC Mode)

```elisp
C-x v v    # Next version control action (commit, add, etc.)
C-x v =    # Compare with file version
C-x v d    # Directory status (show VC status)
C-x v l    # Print log of changes
C-x v i    # Register file for version control
C-x v +    # Update file from repository
C-x v u    # Revert buffer to last checked-in version
C-x v ~    # Check out previous revision
C-x v C-h  # VC help
```

## Usage Examples

### Basic File Operations

```bash
# Open a single file
emacs myfile.txt

# Open file at specific line number
emacs +50 program.py

# Open file at first occurrence of pattern
emacs +"function main" script.js

# Open multiple files
emacs file1.txt file2.txt file3.txt

# Open in terminal mode (no GUI)
emacs -nw config.conf

# Open without loading personal configuration
emacs -q emergency_edit.txt

# Open and evaluate Lisp expression
emacs --eval "(progn (find-file \"notes.txt\") (text-mode))"
```

### Quick Editing and Scripting

```bash
# Start Emacs quickly without customization
emacs -q --no-splash quick_edit.txt

# Run specific function on startup
emacs --eval "(progn (toggle-read-only) (goto-line 100))" file.txt

# Batch mode processing (non-interactive)
emacs --batch --eval "(progn (find-file \"input.txt\") (replace-string \"old\" \"new\") (save-buffer))"

# Load and execute Lisp script
emacs --batch -l myscript.el

# Run Emacs as script interpreter
emacs --script process-file.el input.txt output.txt
```

### Server Mode for Fast Editing

```bash
# Start Emacs server daemon
emacs --daemon

# Start named server daemon
emacs --daemon=myproject

# Connect to running server (GUI)
emacsclient filename.txt

# Create new frame with server
emacsclient -c filename.txt

# Edit in terminal with server
emacsclient -t filename.txt

# Connect to specific server
emacsclient -s myproject filename.txt

# Evaluate expression on server
emacsclient --eval "(message \"Hello from server\")"

# Stop server daemon
emacsclient --eval "(kill-emacs)"
```

### Programming and Development

```bash
# Open project directory in Dired mode
emacs /path/to/project/

# Open specific file in read-only mode
emacs +1000 -nw --eval "(toggle-read-only)" /var/log/syslog

# Start Emacs with specific major mode
emacs --eval "(python-mode)" myscript.py

# Open file with specific encoding
emacs --eval "(set-buffer-file-coding-system 'utf-8-unix)" international.txt

# Compare two files
emacs file1.txt file2.txt

# Open file with line numbers enabled
emacs --eval "(global-linum-mode 1)" code.c
```

### Configuration and Customization

```bash
# Test configuration without affecting personal setup
emacs -q -l test-config.el

# Load specific theme
emacs --eval "(load-theme 'wombat t)" file.txt

# Start with specific window size
emacs -g 80x24+100+100 file.txt

# Start maximized with specific font
emacs --maximized --font="Monospace 14" code.py

# Start in fullscreen mode
emacs --fullscreen -nw terminal-app.conf
```

## Advanced Features and Modes

### Major Modes

Emacs automatically selects appropriate major modes based on file extensions or content:

```elisp
;; Text and Document modes
M-x text-mode           # Plain text editing
M-x latex-mode          # LaTeX document editing
M-x texinfo-mode        # Texinfo documentation
M-x org-mode            # Org-mode for notes, documents, planning
M-x markdown-mode       # Markdown formatting

;; Programming languages
M-x python-mode         # Python programming
M-x ruby-mode           # Ruby programming
M-x perl-mode           # Perl programming
M-x c-mode              # C programming
M-x c++-mode            # C++ programming
M-x java-mode           # Java programming
M-x javascript-mode     # JavaScript programming
M-x html-mode           # HTML editing
M-x css-mode            # CSS stylesheet editing
M-x php-mode            # PHP programming
M-x go-mode             # Go programming
M-x rust-mode           # Rust programming
M-x scala-mode          # Scala programming

;; Configuration and data files
M-x conf-mode           # Configuration files
M-x json-mode           # JSON files
M-x xml-mode            # XML files
M-x yaml-mode           # YAML files

;; Specialized modes
M-x shell-script-mode   # Shell script editing
M-x makefile-mode       # Makefile editing
M-x sql-mode            # SQL editing
M-x diff-mode           # File differences
M-x dired-mode          # Directory editing
```

### Minor Modes

```elisp
;; Interface enhancements
M-x auto-fill-mode      # Automatic line wrapping
M-x line-number-mode    # Show line numbers in mode line
M-x column-number-mode  # Show column numbers in mode line
M-x global-linum-mode   # Global line numbers
M-x visual-line-mode    # Visual line wrapping (word wrap)
M-x whitespace-mode     # Show whitespace characters
M-x show-paren-mode     # Highlight matching parentheses
M-x hl-line-mode        # Highlight current line

;; Editing aids
M-x flyspell-mode       # Spell checking on the fly
M-x auto-complete-mode  # Intelligent completion
M-x company-mode        # Modern completion framework
M-x yasnippet-mode      # Template expansion
M-x multiple-cursors-mode # Multiple cursors editing

;; Version control
M-x global-git-commit-mode # Git commit integration
M-x magit-status       # Magit Git interface

;; Programming aids
M-x electric-pair-mode # Auto-close brackets/quotes
M-x electric-indent-mode # Smart indentation
M-x global-auto-revert-mode # Auto-update buffers when files change

;; Project management
M-x projectile-mode    # Project management
M-x treemacs-mode      # Project tree view
```

### File Management with Dired

```elisp
;; Basic Dired operations
C-x d      # Open Dired mode for directory
C-x C-d    # List directory contents
C-x C-l    # Load directory into Dired

;; Within Dired mode
RET        # Visit file or enter directory
+          # Create new directory
C          # Copy marked files
D          # Delete marked files
R          # Rename marked files
M          # Change file modes (permissions)
G          # Change file group
O          # Change file owner
S          # Symbolic link creation
X          # Shell command on marked files
Z          # Compress/Decompress marked files

;; Navigation
^          # Go to parent directory
M-<up>     # Go to parent directory
g          # Refresh directory listing
s          # Toggle sort mode
C-u s      # Change sort criteria

;; Marking operations
m          # Mark current file
u          # Unmark current file
d          # Mark for deletion
U          # Unmark all marked files
t          # Toggle marks
% m        # Mark files matching pattern
% g        # Mark files matching regex
* .        # Mark all executable files
* @        # Mark all symbolic links
* /        # Mark all directories
```

### Org Mode - Enhanced Note Taking

```elisp
;; Basic Org mode operations
TAB         # Cycle visibility of current subtree
S-TAB       # Cycle global visibility
M-RET       # Insert new heading
M-S-RET     # Insert new TODO heading
C-c C-t     # Rotate TODO state
C-c C-s     # Schedule task
C-c C-d     # Set deadline
C-c C-c     # Set tags/properties/execute code block
C-c C-e     # Export to various formats
C-c C-a     # Show agenda/dispatcher

;; Time and dates
C-u C-c C-t # Insert timestamp
C-c .       # Insert inactive timestamp
C-c !       # Insert time stamp

;; Links and navigation
C-c l       # Store link
C-c C-l     # Insert link
C-c C-o     # Follow link

;; Tables
C-c C-c     # Recalculate table
C-c +       # Sum column
C-c |       # Create/convert table

;; Source code blocks
C-c C-'     # Edit source code block
C-c C-v     # Execute source code block
```

### Email and News with Gnus

```elisp
;; Start email/news reader
M-x gnus          # Start Gnus news and email reader
M-x rmail         # Read email in Rmail mode
M-x mail          # Compose new email

;; Within Gnus
q          # Quit Gnus
g          # Check for new mail
SPACE      # Select article/group
RET        # Read article
f          # Followup to article
r          # Reply to article
c          # Catch up (mark all as read)
```

## Configuration Examples

### Basic ~/.emacs Configuration

```elisp
;; ~/.emacs or ~/.emacs.d/init.el

;; ==== Basic Interface Settings ====
;; Disable splash screen for faster startup
(setq inhibit-splash-screen t)
(setq inhibit-startup-message t)

;; Enable line numbers globally
(global-linum-mode 1)
(setq linum-format "%4d ")

;; Show column numbers in mode line
(column-number-mode 1)

;; Highlight matching parentheses
(show-paren-mode 1)
(setq show-paren-style 'parenthesis)

;; Highlight current line
(global-hl-line-mode 1)

;; Enable visual line mode (word wrap)
(global-visual-line-mode 1)

;; ==== Text and Editing Settings ====
;; Set default tab width
(setq tab-width 4)
(setq-default indent-tabs-mode nil)  ; Use spaces instead of tabs

;; Set fill column for text mode
(setq default-fill-column 80)

;; Enable auto-saving
(setq auto-save-default t)
(setq auto-save-interval 20)
(setq auto-save-timeout 30)

;; Enable backup files
(setq backup-by-copying t)
(setq delete-old-versions t
  kept-new-versions 6
  kept-old-versions 2
  version-control t)

;; Store backup files in dedicated directory
(setq backup-directory-alist
      `((".*" . ,temporary-file-directory)))
(setq auto-save-file-name-transforms
      `((".*" ,temporary-file-directory t)))

;; ==== Appearance and Themes ====
;; Set default font
(set-face-attribute 'default nil :font "Monospace 12")
(set-face-attribute 'font-lock-comment-face nil :slant 'italic)
(set-face-attribute 'font-lock-keyword-face nil :weight 'bold)

;; Enable syntax highlighting
(global-font-lock-mode t)
(setq font-lock-maximum-decoration t)

;; Load a theme (if available)
(when (fboundp 'load-theme)
  (load-theme 'wombat t))

;; ==== Interface Enhancements ====
;; Enableido mode for better file/buffer switching
(ido-mode 1)
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)

;; Enable menu bar, tool bar, and scroll bar
(menu-bar-mode 1)
(tool-bar-mode 1)
(scroll-bar-mode 1)

;; Show trailing whitespace
(setq show-trailing-whitespace t)

;; ==== Editing Enhancements ====
;; Enable electric pair mode for auto-closing brackets
(electric-pair-mode 1)

;; Enable electric indent mode
(electric-indent-mode 1)

;; Enable auto-revert for changed files
(global-auto-revert-mode 1)

;; Enable winner mode for window configuration undo
(winner-mode 1)

;; ==== Key Bindings ====
;; Custom key bindings
(global-set-key (kbd "C-c w") 'save-buffer)
(global-set-key (kbd "C-c q") 'kill-buffer)
(global-set-key (kbd "C-c k") 'kill-this-buffer)
(global-set-key (kbd "C-c n") 'next-buffer)
(global-set-key (kbd "C-c p") 'previous-buffer)

;; Better window navigation
(global-set-key (kbd "M-<left>") 'windmove-left)
(global-set-key (kbd "M-<right>") 'windmove-right)
(global-set-key (kbd "M-<up>") 'windmove-up)
(global-set-key (kbd "M-<down>") 'windmove-down)

;; ==== Mode-specific Settings ====
;; Text mode settings
(add-hook 'text-mode-hook 'turn-on-auto-fill)
(add-hook 'text-mode-hook 'visual-line-mode)

;; Programming mode settings
(add-hook 'prog-mode-hook
          (lambda ()
            (show-paren-mode 1)
            (linum-mode 1)))

;; ==== Package Management ====
;; Initialize package system
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("gnu" . "https://elpa.gnu.org/packages/"))
(package-initialize)

;; Install use-package if not present
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))
(require 'use-package)
(setq use-package-always-ensure t)

;; ==== Performance Settings ====
;; Increase garbage collection threshold for better performance
(setq gc-cons-threshold 100000000)
(setq read-process-output-max (* 1024 1024))  ; 1MB

;; Reduce message chatter
(setq inhibit-compacting-font-caches t)

;; ==== Miscellaneous ====
;; Answer y/n instead of yes/no
(defalias 'yes-or-no-p 'y-or-n-p)

;; Better frame title
(setq frame-title-format '("%b - Emacs"))

;; Custom message in scratch buffer
(setq initial-scratch-message
      ";; Welcome to Emacs!
;; This is the *scratch* buffer where you can type Lisp expressions.
;; C-j evaluates the expression before the cursor.
;;")
```

### Language-Specific Configuration

```elisp
;; ==== Python Configuration ====
(use-package python
  :config
  (setq python-indent-offset 4)
  (setq python-fill-docstring-style 'pep-257-nn)
  (add-hook 'python-mode-hook
            (lambda ()
              (electric-pair-local-mode 1)
              (setq tab-width 4))))

;; ==== C/C++ Configuration ====
(use-package cc-mode
  :config
  (setq c-default-style "linux"
        c-basic-offset 4
        c-indent-level 4
        c-argdecl-indent 4))

;; ==== JavaScript/Web Development ====
(use-package js-mode
  :config
  (setq js-indent-level 2)
  (setq js-chain-indent t))

(use-package web-mode
  :mode ("\\.html?\\'" "\\.css\\'" "\\.php\\'")
  :config
  (setq web-mode-markup-indent-offset 2)
  (setq web-mode-css-indent-offset 2)
  (setq web-mode-code-indent-offset 2))

;; ==== LaTeX Configuration ====
(use-package tex-mode
  :config
  (setq tex-mode-hook 'turn-on-auto-fill)
  (setq TeX-auto-save t)
  (setq TeX-parse-self t))

;; ==== Git Configuration ====
(use-package magit
  :bind (("C-x g" . magit-status))
  :config
  (setq magit-last-seen-setup-instructions "1.4.0"))

;; ==== Project Management ====
(use-package projectile
  :config
  (projectile-mode 1)
  (setq projectile-completion-system 'ido)
  (global-set-key (kbd "C-c p") 'projectile-command-map))

;; ==== Auto-completion ====
(use-package company
  :config
  (global-company-mode)
  (setq company-idle-delay 0.1)
  (setq company-minimum-prefix-length 1))

;; ==== Syntax Checking ====
(use-package flycheck
  :config
  (global-flycheck-mode))
```

### Advanced Customization

```lisp
;; ==== Custom Functions ====
;; Function to create a new frame with specific settings
(defun my-create-coding-frame ()
  "Create a new frame optimized for coding."
  (interactive)
  (select-frame (make-frame '((name . "coding")
                             (width . 120)
                             (height . 40)
                             (font . "Monospace 12"))))
  (linum-mode 1)
  (show-paren-mode 1))

;; Function to toggle distraction-free mode
(defun my-distraction-free ()
  "Toggle distraction-free writing mode."
  (interactive)
  (if (bound-and-true-p my-distraction-free-mode)
      (progn
        (setq my-distraction-free-mode nil)
        (menu-bar-mode 1)
        (tool-bar-mode 1)
        (scroll-bar-mode 1)
        (set-frame-parameter nil 'fullscreen nil))
    (setq my-distraction-free-mode t)
    (menu-bar-mode -1)
    (tool-bar-mode -1)
    (scroll-bar-mode -1)
    (set-frame-parameter nil 'fullscreen 'fullboth)))

;; ==== File Associations ====
;; Associate file extensions with modes
(add-to-list 'auto-mode-alist '("\\.py\\'" . python-mode))
(add-to-list 'auto-mode-alist '("\\.js\\'" . javascript-mode))
(add-to-list 'auto-mode-alist '("\\.json\\'" . json-mode))
(add-to-list 'auto-mode-alist '("\\.yml\\'" . yaml-mode))
(add-to-list 'auto-mode-alist '("\\.yaml\\'" . yaml-mode))
(add-to-list 'auto-mode-alist '("\\.md\\'" . markdown-mode))

;; ==== Custom Hooks ====
;; Custom function to run when any file is opened
(defun my-setup-file-hooks ()
  "Custom setup for opened files."
  (linum-mode 1)
  (setq show-trailing-whitespace t))

(add-hook 'find-file-hook 'my-setup-file-hooks)

;; ==== Performance Optimization ====
;; Set higher garbage collection threshold during startup
(setq gc-cons-threshold most-positive-fixnum)
(add-hook 'emacs-startup-hook
          (lambda () (setq gc-cons-threshold 16777216)))

;; Font compaction
(setq frame-inhibit-implied-resize t)

;; Native compilation settings (Emacs 28+)
(setq comp-deferred-compilation t)
(setq native-comp-deferred-compilation t)
```

## Practical Examples

### Programming Workflow

```bash
# Open project directory
emacs /path/to/myproject/

# Within Emacs workflow:
# 1. Open Dired to browse project files
C-x d
# Navigate to file and press RET to open

# 2. Open multiple related files
C-x C-f    # Open main file
C-x 2      # Split window horizontally
C-x C-f    # Open related file in lower window
C-x 3      # Split vertically for third file
C-x o      # Switch between windows

# 3. Navigate code efficiently
M-.        # Jump to function definition
M-,        # Return from definition
M-x imenu  # Navigate file's structure

# 4. Search across project
M-x find-name-dired    # Find files by name
M-x grep               # Search in files
M-x lgrep              # Recursive grep

# 5. Compile and debug
M-x compile    # Run make/build
C-x `          # Jump to errors
M-x gdb        # Start debugger
```

### Note Taking with Org Mode

```bash
# Open Org mode file for notes
emacs -nw ~/notes.org

# Structure within Org mode:
# * Meeting Notes - 2024-01-15
# ** Attendees
#    - John Smith (Project Manager)
#    - Jane Doe (Developer)
#    - Mike Johnson (Designer)
# ** Discussion Topics
#    - Project timeline review
#    - Budget allocation
#    - Resource planning
# ** Action Items
#    - TODO [#A] Review project timeline
#      DEADLINE: <2024-01-20>
#    - TODO [#B] Prepare budget report
#      SCHEDULED: <2024-01-17>
#    - TODO Schedule follow-up meeting with stakeholders
# ** Next Meeting
#    - Date: January 22, 2024
#    - Time: 2:00 PM
#    - Location: Conference Room B

# Within Org mode navigation:
TAB           # Cycle visibility of sections
M-RET         # Create new heading
S-TAB         # Cycle global visibility
C-c C-e       # Export to PDF, HTML, etc.
C-c C-a       # Open agenda/dispatcher
C-c C-s       # Schedule task
C-c C-d       # Set deadline
```

### System Administration

```bash
# Edit configuration files safely
emacs -nw /etc/ssh/sshd_config
# Use C-x C-q to toggle read-only mode
# Use C-x C-s to save changes (requires root)

# Monitor log files
emacs -nw +10000 /var/log/syslog
M-x auto-revert-mode    # Auto-update when file changes

# Compare configuration files
emacs /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
M-x ediff-files

# Edit multiple related files
emacs /etc/nginx/nginx.conf /etc/hosts /etc/resolv.conf
C-x 3    # Split vertically for side-by-side editing
```

### Research and Writing

```bash
# Start Emacs in distraction-free mode
emacs --fullscreen -nw --eval "(my-distraction-free)" research_paper.org

# Workflow for academic writing:
# 1. Outline structure
* Introduction
** Background
** Problem Statement
** Thesis Statement
* Literature Review
** Related Work
** Gaps in Research
* Methodology
** Approach
** Implementation
** Evaluation
* Results
** Experimental Setup
** Data Analysis
* Conclusion
** Summary
** Future Work

# 2. Use citations and references
C-c C-l    # Insert link/reference
C-c C-e    # Export to LaTeX/PDF

# 3. Track progress
C-c C-t    # Mark sections as TODO/DONE
```

### Git Workflow with Magit

```bash
# Start Emacs and open Magit status
emacs --eval "(magit-status)"

# Within Magit workflow:
# s          # Stage file
# u          # Unstage file
# c c        # Create commit
# c a        # Amend commit
# b b        # Checkout branch
# b c        # Create branch
# P p        # Push to remote
# F p        # Pull from remote
# l l        # Show log
# d d        # Show diff
# f f        # Fetch from remote
```

## Shell Integration and Automation

### Running Shell Commands in Emacs

```elisp
;; Execute shell command
M-!                # Execute shell command (async)
C-u M-!           # Execute and insert output

;; Shell buffers
M-x shell         # Start shell buffer
M-x eshell        # Start Emacs shell (pure Emacs Lisp)
M-x term          # Start terminal emulator
M-x ansi-term     # Start ANSI terminal

;; Compilation
M-x compile       # Compile project
M-x recompile     # Re-run last compilation
C-x `             # Go to next error
```

### Batch Processing Examples

```bash
# File processing script
emacs --batch --eval "
(progn
  (find-file \"input.txt\")
  (goto-char (point-min))
  (while (re-search-forward \"old_pattern\" nil t)
    (replace-match \"new_pattern\"))
  (save-buffer)
  (kill-buffer))"

# Multiple file processing
for file in *.txt; do
    emacs --batch --eval "
    (progn
      (find-file \"$file\")
      (goto-char (point-min))
      (while (re-search-forward \"TODO\" nil t)
        (replace-match \"DONE\"))
      (save-buffer)
      (kill-buffer))"
done

# Directory processing
emacs --batch --eval "
(progn
  (dired \"/path/to/directory/\")
  (dired-mark-files-regexp \"\\.txt$\")
  (dired-do-query-replace-regexp \"old\" \"new\"))"

# Export multiple Org files to PDF
for file in *.org; do
    emacs --batch --eval "
    (progn
      (find-file \"$file\")
      (org-latex-export-to-pdf)
      (kill-buffer))"
done
```

### Integration with External Tools

```bash
# Pipe external command output into Emacs
ls -la | emacs --batch --eval "(progn (switch-to-buffer \"ls-output\") (insert (with-temp-buffer (call-process-region nil nil \"cat\" t t) (buffer-string))))"

# Edit pipe content
echo "some text" | emacs --batch --eval "(progn (switch-to-buffer \"stdin\") (insert (with-temp-buffer (call-process-region nil nil \"cat\" t t) (buffer-string))) (global-set-key (kbd \"C-x C-c\") (lambda () (interactive) (print (buffer-string) (current-buffer)) (kill-emacs))))"

# Integration with find command
find . -name "*.py" -exec emacs --batch --eval "(progn (find-file \"{}\") (python-mode) (indent-region (point-min) (point-max) nil) (save-buffer) (kill-buffer))" \;
```

## Help and Learning Resources

### Built-in Help System

```elisp
;; Help commands
C-h ?             # Help overview (list of help commands)
C-h t             # Interactive tutorial
C-h k <key>       # Describe key binding
C-h f <function>  # Describe function
C-h v <variable>  # Describe variable
C-h w <command>   # Where is key binding
C-h a <pattern>   # Command apropos (find commands by name)
C-h m             # Describe current mode
C-h b             # Show all key bindings
C-h i             # Info documentation browser
C-h r             # Emacs manual (Info)
C-h C-l           # Find lost key bindings

;; Specialized help
C-h p             # Finder (browse packages)
C-h P <package>   # Describe package
C-h d <symbol>    # Describe symbol
C-h e             *Last message* buffer
C-h C-f           # Find function (by name)
C-h C-v           # Find variable (by name)
```

### Learning Resources in Emacs

```elisp
;; Tutorial and documentation
M-x help-with-tutorial      # Start interactive tutorial
M-x info-emacs-manual       # Read Emacs manual
M-x info                   # General Info browser
M-x view-emacs-FAQ          # Frequently Asked Questions
M-x view-emacs-problems     # Known problems
M-x view-emacs-debugging    # Debugging guide
M-x view-lossage            # Display recent input events
M-x view-echo-area-messages # Show recent messages
```

## Troubleshooting and Common Issues

### Startup Performance Issues

```elisp
;; Common causes and solutions:

;; 1. Slow initialization files
;; Solution: Profile startup time
emacs --debug-init
emacs -q --eval "(message \"Startup time: %s seconds\" (float-time (time-subtract after-init-time before-init-time)))"

;; 2. Too many packages
;; Solution: Use use-package with :defer t
(use-package heavy-package
  :defer t
  :commands (heavy-package-function))

;; 3. Garbage collection too frequent
;; Solution: Increase GC threshold
(setq gc-cons-threshold 100000000)
(setq gc-cons-percentage 0.6)

;; 4. Font loading issues
;; Solution: Pre-load fonts
(set-face-attribute 'default nil :font "Monospace 12")
```

### Memory Usage Optimization

```elisp
;; Reduce memory usage
(setq-default bidi-display-reordering nil)  ; Disable bidirectional text
(setq global-auto-revert-non-file-buffers nil)
(setq auto-revert-avoid-polling t)
(setq auto-revert-use-notify nil)

;; Garbage collection optimization
(setq gc-cons-threshold 16777216)  ; 16MB
(setq gc-cons-percentage 0.1)

;; Reduce backup memory usage
(setq delete-old-versions t
      kept-new-versions 3
      kept-old-versions 1)
```

### Common Command Problems

```elisp
;; 1. Keys not working as expected
;; Check with C-h k <key>
;; Override with global-set-key

;; 2. Mode not loading automatically
;; Add to auto-mode-alist
(add-to-list 'auto-mode-alist '("\\.ext\\'" . desired-mode))

;; 3. Indentation problems
;; Configure mode-specific settings
(add-hook 'python-mode-hook (lambda () (setq python-indent-offset 4)))

;; 4. File encoding issues
(setq-default buffer-file-coding-system 'utf-8-unix)
(prefer-coding-system 'utf-8)

;; 5. Package installation failures
;; Refresh package archives
M-x package-refresh-contents

;; 6. Terminal vs GUI differences
;; Check window-system variable
(if window-system
    (message "GUI mode")
  (message "Terminal mode"))
```

### Performance Monitoring

```elisp
;; Monitor Emacs performance
M-x profiler-start        # Start profiler (choose CPU, Memory, etc.)
M-x profiler-report       # Generate report
M-x profiler-stop         # Stop profiling

;; Garbage collection monitoring
M-x garbage-collect       # Force garbage collection
M-x memory-report         # Show memory usage report

;; Check timing
C-g ESC ESC               # Show key sequence execution time
```

## Related Commands

- [`vim`](/docs/commands/editors/vim) - Vi IMproved editor
- [`vi`](/docs/commands/editors/vi) - Visual editor
- [`nano`](/docs/commands/editors/nano) - Simple text editor
- [`ed`](/docs/commands/editors/ed) - Line-oriented editor
- [`emacsclient`](/docs/commands/editors/emacsclient) - Emacs client for server mode
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text transformation
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and text processing
- [`grep`](/docs/commands/file-management/grep) - Pattern searching
- `vimdiff` - Vim-based file comparison
- `diff` - File comparison utility
- `patch` - Apply changes to files
- `ediff` - Emacs-based file comparison

## Best Practices

1. **Learn keyboard shortcuts** extensively to maximize efficiency
2. **Customize incrementally** - start with basic configuration and expand gradually
3. **Use version control** for your configuration files (~/.emacs.d/)
4. **Enable syntax highlighting** and appropriate major modes for each file type
5. **Master window and buffer management** for effective multitasking
6. **Use projectile or similar** for project management
7. **Install essential packages** like magit (Git), company (completion), flycheck (linting)
8. **Learn Org mode** for note-taking, documentation, and planning
9. **Enable auto-save and backup** features for data safety
10. **Use server mode** (emacs --daemon) for faster file access
11. **Practice incremental search** (C-s, C-r) for efficient navigation
12. **Customize font and theme** for comfortable long-term usage
13. **Learn register and bookmark commands** for efficient navigation
14. **Use version control integration** for development workflows
15. **Regularly update packages** for new features and bug fixes

## Performance Tips

1. **Use daemon mode** (emacs --daemon) for faster startup times
2. **Optimize GC settings** based on available memory
3. **Load heavy packages on demand** using use-package :defer
4. **Disable unused features** for faster startup (e.g., tool-bar-mode)
5. **Use native compilation** (Emacs 28+) for faster Lisp execution
6. **Prefer built-in packages** over external alternatives for better integration
7. **Use ido-mode or ivy** for faster file/buffer switching
8. **Enable auto-revert-mode** for automatic buffer updates
9. **Configure backup files** to separate directory to avoid clutter
10. **Use appropriate fonts** and configure font rendering for better performance
11. **Limit active minor modes** to only those you regularly use
12. **Consider lighter alternatives** for heavy operations when performance is critical

Emacs represents one of the most powerful and extensible text editing environments ever created. Its combination of unparalleled customization options, extensive built-in functionality, and rich ecosystem of packages makes it suitable for everything from simple text editing to complete integrated development environments. While it has a steeper learning curve than simpler editors, mastering Emacs provides unmatched efficiency and flexibility for text manipulation, programming, and workflow automation. The philosophy of treating everything as text and providing consistent, discoverable interfaces makes Emacs a tool that grows with you throughout your entire computing career.