---
title: ag - The Silver Searcher
sidebar_label: ag
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ag - The Silver Searcher

The `ag` command (The Silver Searcher) is a high-performance code searching tool that provides extremely fast searching through source code and other text files. It's designed as a faster alternative to `ack`, with similar syntax but significantly improved performance. The Silver Searcher automatically ignores files listed in your `.gitignore` files, skips binary files, and excludes files from common version control systems. It features intelligent file type detection, syntax highlighting for matches, and parallel processing to deliver search results in milliseconds even on large codebases.

## Basic Syntax

```bash
ag [OPTIONS] PATTERN [PATH...]
ag [OPTIONS] --search-files PATTERN [PATH...]
```

## Search Patterns

### Basic Patterns
- **Literal text**: `ag "function test"`
- **Regular expressions**: `ag "func.*test"`
- **Word boundaries**: `ag "\bfunc\b"`
- **Case-sensitive**: `ag --case-sensitive "Function"`

### Pattern Modifiers
- `-i, --ignore-case` - Case insensitive search
- `-s, --case-sensitive` - Case sensitive search
- `--literal` - Treat pattern as literal string
- `-w, --word-regexp` - Match whole words only

## Common Options

### Search Options
- `-i, --ignore-case` - Match case insensitively
- `-s, --case-sensitive` - Match case sensitively
- `-w, --word-regexp` - Match only whole words
- `--literal` - Treat pattern as literal string
- `-Q, --literal` - Quote all metacharacters
- `-F, --fixed-strings` - Treat pattern as fixed string

### File Selection
- `-G, --file-search-regex PATTERN` - Search only files matching PATTERN
- `--ignore` - Ignore files/directories matching pattern
- `--ignore-dir` - Ignore directories
- `-g, --filename-pattern` - Print filenames matching pattern
- `-a, --text` - Search all text files
- `-u, --unrestricted` - Search all files (ignore .gitignore, etc.)

### Output Control
- `--color` - Highlight matches
- `--no-color` - Don't highlight matches
- `--noheading` - Don't print file headings
- `--no-numbers` - Don't print line numbers
- `--count` - Only print count of matching lines per file
- `-l, --files-with-matches` - Only print filenames containing matches
- `-L, --files-without-matches` - Only print filenames without matches
- `-o, --only-matching` - Print only the matched part of lines
- `--print-long-lines` - Don't truncate long lines
- `-c, --count` - Print count of matches per file
- `--max-count NUM` - Stop searching after NUM matches

### Context Control
- `-A, --after NUM` - Show NUM lines after match
- `-B, --before NUM` - Show NUM lines before match
- `-C, --context NUM` - Show NUM lines before and after match
- `--passthru` - Print all lines, highlighting matches
- `--match` - Print only lines that match

### File Types
- `--list-file-types` - List supported file types
- `--file-type TYPE` - Search only files of type TYPE
- `--python`, `--java`, `--ruby`, etc. - Search specific file types

### Performance Options
- `-j, --threads NUM` - Use NUM threads for searching
- `--depth NUM` - Search up to NUM directory levels deep
- `--follow` - Follow symlinks
- `--silent` - Suppress all output except errors

## Usage Examples

### Basic Searching

#### Simple Text Search
```bash
# Search for a string
ag "function main"

# Search with case insensitivity
ag -i "error message"

# Search for whole words only
ag -w "test"

# Search for exact string (no regex)
ag --literal "func[i].test"
```

#### Pattern Searching
```bash
# Search using regular expressions
ag "func.*test.*error"

# Search for lines starting with specific pattern
ag "^import.*react"

# Search for email addresses
ag "\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"

# Search for function definitions
ag "function\s+\w+\s*\("
```

### File and Directory Targeting

#### Search in Specific Locations
```bash
# Search in specific directory
ag "database" src/

# Search in multiple directories
ag "config" src/ config/

# Search in current directory only
ag --depth 1 "main"

# Search recursively with depth limit
ag --depth 3 "class"
```

#### File Type Filtering
```bash
# Search only Python files
ag --python "import"

# Search only JavaScript files
ag --javascript "function"

# Search only in specific file extensions
ag -G "*.py" "class"

# Search multiple file types
ag --python --java "import"
```

### Advanced Pattern Matching

#### Complex Regular Expressions
```bash
# Search for function calls with parameters
ag "\w+\([^)]*\)"

# Search for CSS selectors
ag "[.#]?[\w-]+\s*\{"

# Search for XML/HTML tags
ag "<[^>]+>.*?</[^>]+>"

# Search for URLs
ag "https?://[^\s]+"

# Search for variable assignments
ag "\$\w+\s*=\s*[^;]+"
```

#### Multiple Pattern Search
```bash
# Search for multiple patterns (using alternation)
ag "(error|exception|fail)"

# Search for patterns with specific context
ag "TODO|FIXME|HACK"

# Search for import statements in various languages
ag "(import|include|require|using)"
```

## Practical Examples

### Code Development Workflow

#### Finding Function Definitions
```bash
# Find all function definitions
ag "def\s+\w+\s*\(" --python
ag "function\s+\w+\s*\(" --javascript
ag "func\s+\w+\s*\(" --go

# Find class definitions
ag "class\s+\w+" --python
ag "class\s+\w+\s*{" --java --cpp

# Find method calls
ag "\.\s*\w+\s*\("

# Find variable declarations
ag "(var|let|const)\s+\w+"
```

#### Code Refactoring
```bash
# Find all occurrences of a function name
ag "old_function_name"

# Find and count usage of specific patterns
ag -c "console\.log" --javascript

# Find deprecated API usage
ag "deprecated_function"

# Search for TODO comments
ag "TODO|FIXME|HACK|XXX"

# Find unused imports (simple pattern)
ag "^import.*unused" --python
```

#### Debugging and Error Analysis
```bash
# Find error handling code
ag "catch|except|error|exception"

# Find debug statements
ag "console\.log|print.*debug|DEBUG"

# Find return statements
ag "return\s+[^;]+"

# Find conditional statements
ag "(if|when|case).*condition"
```

### Configuration and Environment Files

#### Search Configuration Files
```bash
# Search in config files
ag -G "*.{conf,config,yaml,yml,json}" "database"

# Search environment files
ag -G ".env*" "API_KEY"

# Search Docker files
ag -G "Dockerfile*" "FROM"

# Search package.json files
ag -G "package.json" "dependencies"
```

#### Version Control Integration
```bash
# Search ignoring .gitignore rules
ag -u "temp"

# Search only in tracked files
ag --git-ignore "feature"

# Find merge conflict markers
ag "<<<<<|=====|>>>>>"

# Search commit messages (if available)
ag "fix.*bug" .git/COMMIT_EDITMSG
```

### Documentation and Comments

#### Search Documentation
```bash
# Find documentation comments
ag "#.*TODO|//.*TODO|/\*.*TODO"

# Search README files
ag -G "README*" "installation"

# Find API documentation
ag "@param|@return|@throws"

# Search markdown files
ag -G "*.md" "usage"
```

#### Code Analysis
```bash
# Count lines of code by file type
ag -c --python "" | awk '{sum += $2} END {print "Python LOC:", sum}'

# Find all imports/dependencies
ag "^(import|include|require|using)" --python --java --cpp

# Analyze function complexity (simple count of lines)
ag -A 10 "def\s+\w+" --python

# Find potential security issues
ag "(eval|exec|system).*\(" --python
```

## Advanced Usage

### Output Formatting and Integration

#### Custom Output Formats
```bash
# Print only matching text
ag -o "error.*"

# Print with context
ag -C 3 "critical_error"

# Print filenames only
ag -l "test"

# Print count per file
ag -c "function"

# Print without line numbers
ag --no-numbers "pattern"
```

#### Integration with Other Tools
```bash
# Pipe results to less for pagination
ag "important" | less

# Count total matches across all files
ag -c "pattern" | awk '{sum += $2} END {print "Total:", sum}'

# Find unique patterns
ag -o "function\(\w+\)" | sort -u

# Search and open in editor
ag -l "function" | xargs vim

# Generate file list for further processing
ag -l "deprecated" > deprecated_files.txt
```

### Performance Optimization

#### Thread Management
```bash
# Use specific number of threads
ag -j 4 "pattern"  # Use 4 threads

# Auto-detect optimal threads
ag -j auto "pattern"

# Single thread (useful for debugging)
ag -j 1 "pattern"
```

#### Memory and Resource Management
```bash
# Limit search depth
ag --depth 3 "pattern"

# Follow symlinks if needed
ag --follow "pattern"

# Search only in specific directories to speed up
ag "pattern" src/lib/ only/

# Use file size limits (if supported)
ag --max-filesize 1M "pattern"
```

### Search Strategy Optimization

#### Efficient Pattern Design
```bash
# Use character classes for better performance
ag "[[:digit:]]+" instead of ag "\d+"

# Use word boundaries to reduce false positives
ag -w "test" instead of ag "test"

# Be specific with patterns
ag "function\s+\w+\s*\(" instead of ag "function"

# Use anchored patterns when appropriate
ag "^class\s+\w+" instead of ag "class\s+\w+"
```

#### Large Codebase Strategies
```bash
# Search specific directories first
ag "pattern" src/

# Use file type filtering
ag --python "import"

# Limit search scope
ag --depth 2 "pattern"

# Use multiple specific searches instead of one broad search
ag "error" logs/
ag "warning" src/
```

## Integration and Automation

### Shell Scripts and Workflows

#### Automated Code Analysis Script
```bash
#!/bin/bash
# Code quality analysis with ag

echo "=== Code Analysis Report ==="
echo

# Find potential issues
echo "1. TODO/FIXME comments:"
ag "TODO|FIXME|HACK" -c --no-filename | head -5

echo -e "\n2. Debug statements:"
ag "(console\.log|print.*debug|DEBUG)" -c --no-filename | head -5

echo -e "\n3. Function count:"
ag -c "def\s+\w+" --python | head -5

echo -e "\n4. Large files (potential refactoring targets):"
find . -name "*.py" -exec wc -l {} + | sort -n | tail -3
```

#### Search and Replace Workflow
```bash
#!/bin/bash
# Find and prepare for search-and-replace

PATTERN="old_function"
REPLACEMENT="new_function"

echo "Finding occurrences of $PATTERN:"
ag "$PATTERN" -n

echo -e "\nFiles that would be modified:"
ag -l "$PATTERN"

echo -e "\nPreview replacement (manual step needed):"
ag "$PATTERN" -C 1 | head -20
```

### IDE Integration

#### Vim Integration
```bash
# Search from Vim
:!ag "pattern" %

# Search and open results in quickfix list
:cexpr system('ag "pattern"')
:copen

# Search and jump to first result
:grep "pattern"
```

#### Emacs Integration
```bash
# Use ag as grep replacement
(setq grep-command "ag --nogroup --nocolor")

# Search with ag in Emacs
M-x grep RET ag pattern RET
```

## Troubleshooting

### Common Issues

#### Performance Issues
```bash
# Slow searches - limit scope
ag "pattern" specific/directory/

# Too many results - use more specific patterns
ag "specific_pattern" instead of ag "vague"

# Memory issues - reduce thread count
ag -j 2 "pattern"
```

#### Pattern Matching Issues
```bash
# No results found - check pattern escaping
ag --literal "special.*characters"

# Case sensitivity issues
ag -i "Pattern"  # Try case insensitive

# Pattern not working - test with simpler version
ag "simple_part_of_pattern"
```

#### File Selection Issues
```bash
# Wrong files being searched - check file types
ag --list-file-types

# Files being ignored - use unrestricted mode
ag -u "pattern"

# Specific directory ignored - check .gitignore
ag -u --ignore-dir "ignore_dir" "pattern"
```

### Debugging Searches

#### Understanding Search Behavior
```bash
# See which files would be searched
ag --debug "pattern" 2>&1 | grep "Searching"

# Test pattern matching
ag --print-long-lines "pattern"

# Check file type detection
ag --file-type python --debug "pattern"

# Verbose output for troubleshooting
ag -v "pattern"
```

## Related Commands

- [`grep`](/docs/commands/file-management/grep) - Traditional text search utility
- [`find`](/docs/commands/file-management/find) - Find files by various criteria
- [`ack`](/docs/commands/file-management/ack) - Alternative code search tool
- [`rg`](/docs/commands/file-management/rg) - Ripgrep - another fast search tool
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text processing
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language

## Best Practices

1. **Use specific patterns** instead of broad searches for better performance
2. **Leverage file type filtering** (`--python`, `--javascript`, etc.) to narrow search scope
3. **Use word boundaries** (`-w`) to avoid false positive matches
4. **Combine with other tools** in pipelines for complex analysis tasks
5. **Use context options** (`-C`, `-A`, `-B`) for better understanding of matches
6. **Consider using `-u` flag** when searching outside version-controlled directories
7. **Use `-j` to control thread usage** on systems with limited resources
8. **Employ `-l` or `-c`** for quick overviews before detailed searches
9. **Use regular expressions sparingly** - literal searches are faster
10. **Take advantage of `.gitignore`** awareness - it usually does the right thing

## Performance Tips

1. **The Silver Searcher is faster than ack** but slower than ripgrep in most cases
2. **File type filtering** significantly improves search performance
3. **Thread parallelization** provides speedup on multi-core systems
4. **Ignoring binary files** automatically saves significant time
5. **Shallow directory searches** (`--depth`) improve performance in deep directory trees
6. **Literal string searches** are much faster than regex searches
7. **First-time searches** are slower as ag builds its index
8. **SSD storage** dramatically improves search performance
9. **Sufficient RAM** helps with large codebase searches
10. **Avoid overly broad patterns** - be as specific as possible

The `ag` command is an essential tool for developers working with large codebases. Its combination of speed, intelligent defaults, and powerful pattern matching makes it ideal for code navigation, refactoring, debugging, and general text analysis tasks. The automatic exclusion of version-controlled files and binary files, along with syntax highlighting, provides a focused and readable search experience that enhances developer productivity.