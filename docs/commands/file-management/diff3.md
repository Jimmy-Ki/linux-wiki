---
title: diff3 - Compare three files line by line
sidebar_label: diff3
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# diff3 - Compare three files line by line

The `diff3` command is a powerful three-way file comparison and merging tool that compares three files line by line and shows the differences between them. It's particularly useful in version control systems and collaborative development scenarios where you need to merge changes from multiple sources. Diff3 can automatically merge non-conflicting changes and clearly highlight conflicts that require manual resolution. The tool is the foundation for many modern merge systems and provides detailed reports showing where files differ and what changes need to be reconciled.

## Basic Syntax

```bash
diff3 [OPTIONS] MINE OLDER YOURS
```

## Common Options

### Output Format Options
- `-e` - Output an ed-script for merging YOURS into OLDER to create MINE
- `-3` - Output changes for YOURS and OLDER, but treat changes in MINE as conflicts
- `-x` - Output changes for YOURS and OLDER, ignoring MINE entirely
- `-X` - Output changes where MINE and YOURS both differ from OLDER
- `-i` - Append 'w' and 'q' commands to ed-script output
- `-m` - Output merged file instead of ed-script
- `-L LABEL` - Use LABEL instead of file name for conflict markers
- `-T` - Make tabs line up with tabs in input files
- `--diff-program=PROGRAM` - Use PROGRAM to compare files

### Conflict Resolution
- `-A` - Like `-e`, but also overlaps non-conflicting changes
- `-E` - Like `-e`, but bracket conflicts with `<<<<<<<`, `=======`, and `>>>>>>>`
- `--show-overlap` - List overlapping hunks in conflict format

### Output Control
- `--horizon-lines=NUM` - Keep NUM lines of matched context
- `--label=LABEL` - Use LABEL instead of file name in output

### Information
- `-v, --version` - Show version information
- `--help` - Display help information

## Usage Examples

### Basic Three-Way Comparison

#### Simple Comparison
```bash
# Basic three-way diff comparison
diff3 file1.txt file2.txt file3.txt

# Compare with descriptive labels
diff3 -L "my changes" -L "original" -L "your changes" mine.txt base.txt yours.txt

# Show only conflicts
diff3 --show-overlap file1 file2 file3
```

#### Understanding diff3 Output
```bash
# diff3 output format:
# ====1        - Differences only in file 1
# ====2        - Differences only in file 2
# ====3        - Differences only in file 3
# ====1,2      - Differences between file 1 and 2, file 3 matches older
# ====1,3      - Differences between file 1 and 3, file 2 matches older
# ====2,3      - Differences between file 2 and 3, file 1 matches older
# ====1,2,3    - All three files differ from each other
```

### Merging Operations

#### Create Merged Output
```bash
# Merge files automatically where possible
diff3 -m mine.txt older.txt yours.txt > merged.txt

# Merge with conflict markers for manual resolution
diff3 -E -m mine.txt older.txt yours.txt > with_conflicts.txt

# Merge with overlapping changes included
diff3 -A -m mine.txt older.txt yours.txt > full_merge.txt
```

#### Generate Edit Scripts
```bash
# Create ed-script to apply changes
diff3 -e mine.txt older.txt yours.txt > merge.ed

# Create ed-script with save and quit commands
diff3 -i -e mine.txt older.txt yours.txt > complete.ed

# Apply the ed-script
ed - mine.txt < merge.ed
```

### Advanced Merging Strategies

#### Conflict-Free Merging
```bash
# Show only successful merges (no conflicts)
diff3 -3 -m mine.txt older.txt yours.txt > clean_merge.txt

# Ignore mine completely, show only differences between others
diff3 -x mine.txt older.txt yours.txt > others_diff.txt

# Show conflicts only
diff3 -A -m mine.txt older.txt yours.txt | grep -A5 -B5 "<<<<<<<"
```

#### Custom Labels for Better Context
```bash
# Use descriptive labels for better merge reports
diff3 -L "Current Branch" -L "Common Ancestor" -L "Feature Branch" \
    current.txt ancestor.txt feature.txt

# Use timestamps as labels
diff3 -L "$(date)" -L "base" -L "new_version" file1 file2 file3
```

## Practical Examples

### Version Control Workflows

#### Git-style Three-Way Merge
```bash
# Simulate Git merge scenario
# mine = current branch version
# older = common ancestor (merge base)
# yours = branch being merged

diff3 -m current_branch.txt merge_base.txt feature_branch.txt > merge_result.txt

# Create merge with standard conflict markers
diff3 -E -m current_branch.txt merge_base.txt feature_branch.txt > with_conflicts.txt

# Manual merge conflict resolution:
# 1. Run diff3 to identify conflicts
# 2. Edit merged file manually
# 3. Test the result
# 4. Commit the final merged version
```

#### Collaborative Document Editing
```bash
# Scenario: Multiple people editing same document
# Original document was shared, now we have three versions

diff3 -L "John's edits" -L "Original" -L "Mary's edits" \
    john_version.txt original.txt mary_version.txt > combined_edits.txt

# Find overlapping changes that need discussion
diff3 -A john_version.txt original.txt mary_version.txt | grep "====1,2,3"
```

#### Configuration File Management
```bash
# Merge configuration changes
# mine = local modifications
# older = upstream original
# yours = new upstream version

diff3 -m local.conf upstream.conf new_upstream.conf > merged.conf

# Create backup before merge
cp local.conf local.conf.backup
diff3 -m local.conf upstream.conf new_upstream.conf > local.conf.new

# Compare original and new versions
diff local.conf.local.conf.new local.conf
```

### Software Development

#### Code Review Integration
```bash
# Compare developer's changes with reviewer's suggestions
# mine = developer's code
# older = original code
# yours = reviewer's suggested changes

diff3 -m dev_code.c original.c reviewer_suggestions.c > reviewed_code.c

# Generate merge report for review meeting
diff3 -L "Developer" -L "Original" -L "Reviewer" \
    dev_code.c original.c reviewer_suggestions.c > merge_report.txt
```

#### Patch Application and Resolution
```bash
# Apply a patch that conflicts with local changes
# Create three-way merge scenario
cp original_file.c older_file.c
cp modified_file.c mine_file.c
cp patch_applied_file.c yours_file.c

# Merge patch with local changes
diff3 -m mine_file.c older_file.c yours_file.c > final_file.c

# Check for unresolved conflicts
grep "<<<<<<<" final_file.c
```

#### Testing Framework Integration
```bash
# Compare test results from different environments
# mine = current test results
# older = baseline results
# yours = expected results

diff3 -m current_results.txt baseline.txt expected.txt > test_analysis.txt

# Identify failing tests specifically
diff3 current_results.txt baseline.txt expected.txt | grep "FAIL"
```

### Documentation and Content Management

#### Multi-Author Document Merging
```bash
# Merge chapters from multiple authors
diff3 -L "Chapter by Author A" -L "Original Draft" -L "Chapter by Author B" \
    author_a_chapter.txt draft.txt author_b_chapter.txt > merged_chapter.txt

# Create comprehensive change log
diff3 author_a_chapter.txt draft.txt author_b_chapter.txt > changes.log
```

#### Translation Workflows
```bash
# Merge translation updates
# mine = current translation
# older = previous translation
# yours = updated source text

diff3 -m current_translation.po previous_translation.po updated_source.pot > new_translation.po

# Find untranslated or changed segments
diff3 current_translation.po previous_translation.po updated_source.pot | grep "msgid"
```

## Advanced Usage

### Complex Merge Scenarios

#### Multi-Step Merging
```bash
# Merge multiple branches step by step
# First merge branch1 and branch2
diff3 -m branch1.txt base.txt branch2.txt > temp_merge.txt

# Then merge the result with branch3
diff3 -m temp_merge.txt base.txt branch3.txt > final_merge.txt

# Clean up temporary file
rm temp_merge.txt
```

#### Custom Conflict Resolution Scripts
```bash
#!/bin/bash
# Automated merge with custom conflict handling

FILE1=$1
FILE2=$2
FILE3=$3
OUTPUT=$4

# Perform merge
diff3 -m "$FILE1" "$FILE2" "$FILE3" > "$OUTPUT"

# Check for conflicts
if grep -q "<<<<<<<" "$OUTPUT"; then
    echo "Conflicts found in $OUTPUT"
    echo "Manual resolution required"

    # Log conflicts for later review
    echo "$(date): Merge conflicts in $OUTPUT" >> merge_conflicts.log
    grep -n "<<<<<<<" "$OUTPUT" >> merge_conflicts.log

    exit 1
else
    echo "Clean merge completed"
    exit 0
fi
```

### Performance Optimization

#### Large File Merging
```bash
# Merge large files with context control
diff3 --horizon-lines=50 -m large_file1.txt large_file_base.txt large_file2.txt > large_merged.txt

# Process files in chunks for very large files
split -l 10000 huge_file1.txt chunk1_
split -l 10000 huge_file2.txt chunk2_
split -l 10000 huge_file_base.txt chunk_base_

# Merge chunks in parallel (simplified example)
for i in chunk1_*; do
    diff3 -m "$i" "chunk_base_${i#chunk1_}" "chunk2_${i#chunk1_}" >> merged_chunks.txt
done
```

### Integration with Other Tools

#### Diff3 with Git
```bash
# Use diff3 as Git merge tool
git config merge.tool diff3
git config mergetool.diff3.cmd 'diff3 -m $LOCAL $BASE $REMOTE > $MERGED'

# Or use for specific merges
git merge-recursive --diff3 algorithm base ours theirs
```

#### Integration with Version Control Systems
```bash
# SVN-style merge visualization
svn merge --diff3-cmd diff3 branch1_url branch2_url working_copy

# Custom merge driver for other VCS
# In .hg/hgrc (Mercurial):
# [merge-tools]
# diff3.executable = /usr/bin/diff3
# diff3.args = -m $local $base $other $output
```

## Troubleshooting

### Common Issues

#### File Encoding Problems
```bash
# Handle different file encodings
# Convert files to UTF-8 before merging
iconv -f latin1 -t utf8 file1.txt > file1_utf8.txt
iconv -f latin1 -t utf8 file2.txt > file2_utf8.txt
iconv -f latin1 -t utf8 file3.txt > file3_utf8.txt

diff3 -m file1_utf8.txt file2_utf8.txt file3_utf8.txt > merged_utf8.txt
```

#### Line Ending Differences
```bash
# Normalize line endings before merging
dos2unix file1.txt file2.txt file3.txt

# Or handle in diff3 call
diff3 --strip-trailing-cr -m file1.txt file2.txt file3.txt > merged.txt
```

#### Permission Issues
```bash
# Check file permissions before merging
ls -la file1.txt file2.txt file3.txt

# Make files writable if needed
chmod +w file1.txt file2.txt file3.txt

# Perform merge as different user if necessary
sudo -u username diff3 -m file1.txt file2.txt file3.txt > merged.txt
```

#### Memory Issues with Large Files
```bash
# Use streaming approach for very large files
# Process files in smaller chunks
awk 'NR%10000==1{print "===Chunk", (NR-1)/10000+1==="}1' large_file1.txt

# Or use split approach
split -l 50000 large_file1.txt temp1_
split -l 50000 large_file2.txt temp2_
split -l 50000 large_file3.txt temp3_

# Merge chunks individually
for i in temp1_a*; do
    base_file="temp3_${i#temp1_a}"
    other_file="temp2_${i#temp1_a}"
    diff3 -m "$i" "$base_file" "$other_file" >> final_merge.txt
done
```

### Debugging Merge Conflicts

#### Analyzing Conflicts
```bash
# Create detailed conflict report
diff3 -A -m file1 file2 file3 > conflict_report.txt

# Extract only conflict sections
awk '/^<<<<<<</{flag=1} flag{print} /^>>>>>>/{flag=0}' conflict_report.txt

# Count conflicts
grep -c "<<<<<<<" merged_file.txt
```

#### Conflict Resolution Strategies
```bash
# Strategy 1: Accept mine (current changes)
sed '/^<<<<<<</,/^=======$/d; /^>>>>>>$/,/^=======/d' merged_file.txt

# Strategy 2: Accept theirs (incoming changes)
sed '/^<<<<<<<$/,/^=======$/d; /^>>>>>>$/,/^=======/d' merged_file.txt

# Strategy 3: Manual resolution with editor
vim merged_file.txt
# Use vimdiff for visual comparison
vimdiff -g file1 file2 file3
```

## Integration and Automation

### Shell Scripts

#### Automated Merge Script
```bash
#!/bin/bash
# Automated three-way merge with conflict handling

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/merge.log"

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

perform_merge() {
    local mine="$1"
    local older="$2"
    local yours="$3"
    local output="$4"

    log_message "Starting merge: $mine + $yours (base: $older)"

    # Backup original files
    cp "$mine" "${mine}.backup"
    cp "$older" "${older}.backup"
    cp "$yours" "${yours}.backup"

    # Perform merge
    if diff3 -m "$mine" "$older" "$yours" > "$output" 2>&1; then
        log_message "Merge completed successfully"
        return 0
    else
        log_message "Merge failed or has conflicts"

        # Check for conflicts
        if grep -q "<<<<<<<" "$output"; then
            log_message "Conflicts detected in $output"
            return 1
        else
            log_message "Merge failed due to other error"
            return 2
        fi
    fi
}

# Usage example
if [ $# -ne 4 ]; then
    echo "Usage: $0 <mine> <older> <yours> <output>"
    exit 1
fi

perform_merge "$1" "$2" "$3" "$4"
```

#### Batch Merge Processing
```bash
#!/bin/bash
# Process multiple three-way merges

MINE_DIR="mine_files"
OLDER_DIR="base_files"
YOURS_DIR="their_files"
OUTPUT_DIR="merged_files"

mkdir -p "$OUTPUT_DIR"

for mine_file in "$MINE_DIR"/*; do
    filename=$(basename "$mine_file")
    older_file="$OLDER_DIR/$filename"
    yours_file="$YOURS_DIR/$filename"
    output_file="$OUTPUT_DIR/$filename"

    if [ -f "$older_file" ] && [ -f "$yours_file" ]; then
        echo "Processing $filename..."

        if diff3 -m "$mine_file" "$older_file" "$yours_file" > "$output_file"; then
            echo "  ✓ Clean merge: $filename"
        else
            echo "  ⚠ Conflicts in: $filename"
            mv "$output_file" "${output_file}.conflicts"
        fi
    else
        echo "  ✗ Missing files for: $filename"
    fi
done
```

## Related Commands

- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`patch`](/docs/commands/file-management/patch) - Apply a diff file to an original
- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`comm`](/docs/commands/file-management/comm) - Compare sorted files line by line
- [`sdiff`](/docs/commands/file-management/sdiff) - Merge two files interactively
- [`merge`](/docs/commands/file-management/merge) - Three-way file merge
- [`git-merge`](/docs/commands/development/git) - Git merge command
- [`vimdiff`](/docs/commands/development/vim) - Visual diff with Vim

## Best Practices

1. **Use meaningful labels** with `-L` option for better conflict resolution context
2. **Always backup files** before performing automated merges
3. **Test merges thoroughly** after conflict resolution
4. **Use appropriate merge strategy** based on your workflow (-A, -E, -m, -3)
5. **Normalize line endings** and encodings before merging
6. **Review conflicts manually** rather than relying entirely on automatic resolution
7. **Document merge decisions** for future reference
8. **Use version control** to track merge history and enable rollbacks
9. **Validate merged files** for syntax and functionality
10. **Consider file sizes** and system resources when merging large files

## Performance Tips

1. **Use `--horizon-lines`** to limit context for large files
2. **Process large files in chunks** to avoid memory issues
3. **Normalize file formats** before merging to reduce conflicts
4. **Use streaming approaches** for very large files
5. **Parallelize independent merges** when processing multiple files
6. **Cache merge bases** when merging the same files repeatedly
7. **Optimize file I/O** by using fast storage for merge operations
8. **Monitor system resources** during large merge operations
9. **Consider using specialized tools** like Git for complex merge scenarios
10. **Prefer clean merges** over conflict-heavy ones when possible

The `diff3` command is an essential tool for three-way file comparison and merging, providing the foundation for version control systems and collaborative development workflows. Its ability to automatically merge non-conflicting changes while clearly identifying conflicts makes it invaluable for managing concurrent modifications to shared files and ensuring data integrity across multiple contributors.