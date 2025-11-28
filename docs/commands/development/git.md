---
title: git - Distributed Version Control System
sidebar_label: git
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# git - Distributed Version Control System

The `git` command is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals. Git was created by Linus Torvalds in 2005 for development of the Linux kernel and has since become the world's most widely used version control system. Git excels at handling everything from small to very large projects with speed, data integrity, and support for distributed, non-linear workflows.

Git's distributed nature gives every developer a full copy of the entire project history, making most operations faster and allowing offline work. Its branching model is lightweight and powerful, enabling easy creation, merging, and management of development lines. Git's data model ensures the cryptographic integrity of your entire history, with SHA-1 checksums for every object, making it virtually impossible to lose data or introduce corruption undetected.

## Basic Syntax

```bash
git [--version] [--help] [-C <path>] [-c <name>=<value>]
    [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
    [-p|--paginate|-P|--no-pager] [--no-replace-objects] [--bare]
    [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
    <command> [<args>]
```

## Common Commands

### Repository Setup and Configuration
- `init` - Create an empty Git repository
- `clone` - Clone a repository into a new directory
- `config` - Get and set repository or global options

### Basic Snapshotting
- `add` - Add file contents to the index
- `status` - Show the working tree status
- `commit` - Record changes to the repository
- `diff` - Show changes between commits, commit and working tree, etc
- `reset` - Reset current HEAD to the specified state
- `rm` - Remove files from the working tree and from the index

### Branching and Merging
- `branch` - List, create, or delete branches
- `checkout` - Switch branches or restore working tree files
- `merge` - Join two or more development histories together
- `log` - Show commit logs
- `tag` - Create, list, delete or verify a tag object signed with GPG

### Sharing and Updating
- `fetch` - Download objects and refs from another repository
- `pull` - Fetch from and integrate with another repository or a local branch
- `push` - Update remote refs along with associated objects
- `remote` - Manage set of tracked repositories

### Inspection and Comparison
- `show` - Show various types of objects
- `log` - Show commit logs
- `diff` - Show changes between commits, commit and working tree, etc
- `grep` - Print lines matching a pattern

### Patching
- `apply` - Apply a patch to files and/or to the index
- `cherry-pick` - Apply the changes introduced by some existing commits
- `revert` - Revert some existing commits

## Common Options

### Global Options
- `--version` - Print git version and exit
- `--help` - Print help and exit
- `-C <path>` - Run command in specified directory
- `-c <name>=<value>` - Set configuration parameter
- `--exec-path[=<path>]` - Get/set path to git executables
- `--html-path` - Print path to HTML documentation
- `--man-path` - Print manpage path
- `--info-path` - Print info path

### Repository Options
- `--git-dir=<path>` - Set repository directory
- `--work-tree=<path>` - Set working tree
- `--namespace=<name>` - Set namespace

### Output Options
- `-p, --paginate` - Pipe output into PAGER
- `-P, --no-pager` - Don't pipe output into PAGER
- `--no-replace-objects` - Don't use replacement refs
- `--bare` - Treat repository as bare repository

### Common Git Command Options

#### Git Add Options
- `-A, --all` - Add changes from all tracked and untracked files
- `--patch` - Interactively add hunks from diff
- `--dry-run` - Don't actually add the file(s), just show if they exist
- `--ignore-errors` - Skip adding files with errors
- `--chmod=<+x|-x>` - Change file modes in the working tree

#### Git Commit Options
- `-m <msg>` - Use the given <msg> as the commit message
- `-a, --all` - Commit all modified and deleted files
- `--amend` - Replace the tip of the current branch with a new commit
- `--no-edit` - Use the existing commit message without editing
- `--allow-empty` - Allow recording an empty commit
- `-S, --gpg-sign[=<keyid>]` - GPG-sign the commit

#### Git Push Options
- `-u, --set-upstream` - Set upstream tracking branch
- `-f, --force` - Force update of remote branch
- `--force-with-lease` - Force update, but reject if remote diverged
- `--all` - Push all branches
- `--tags` - Push all tags
- `--prune` - Remove remote branches that don't exist locally

#### Git Pull Options
- `--rebase` - Rebase instead of merge
- `--no-rebase` - Don't rebase, default merge
- `--ff-only` - Fast-forward only
- `--no-ff` - No fast-forward, always create merge commit
- `--commit` - Perform the merge and commit the result

## Configuration

### Global Configuration
```bash
# Set user identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "vim"

# Set default branch name
git config --global init.defaultBranch "main"

# Set credential helper
git config --global credential.helper store

# Set color output
git config --global color.ui auto

# Set default push behavior
git config --global push.default simple

# List configuration
git config --list
git config --global --list
```

### Local Configuration
```bash
# Set project-specific configuration
git config user.name "Project Name"
git config user.email "project@example.com"

# Set remote URLs
git config remote.origin.url https://github.com/user/repo.git
git config remote.origin.pushurl git@github.com:user/repo.git

# Set aliases
git config alias.st status
git config alias.co checkout
git config alias.br branch
git config alias.ci commit
git config alias.unstage 'reset HEAD --'
git config alias.last 'log -1 HEAD'
git config alias.visual '!gitk'
```

## Repository Operations

### Initialization
```bash
# Initialize new repository
git init
git init myproject
git init --bare myproject.git

# Clone existing repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git myproject
git clone git@github.com:user/repo.git
git clone --depth 1 https://github.com/user/repo.git  # Shallow clone

# Clone specific branch
git clone --branch develop https://github.com/user/repo.git
git clone -b feature-branch https://github.com/user/repo.git
```

### Adding Files
```bash
# Add files to staging area
git add file.txt
git add *.c
git add src/
git add .

# Add all changes including deletions
git add -A
git add --all

# Interactive staging
git add -i
git add -p  # Patch mode

# Add with verbose output
git add -v file.txt

# Add ignoring file mode changes
git add --chmod=+x script.sh
```

### Committing Changes
```bash
# Commit staged changes
git commit
git commit -m "Commit message"
git commit -m "Commit message" file1.txt file2.txt

# Commit with all changes
git commit -am "Commit message"  # Add and commit

# Empty commit
git commit --allow-empty -m "Initial commit"

# Edit last commit message
git commit --amend
git commit --amend -m "New message"

# Author and committer information
git commit --author="Name <email@example.com>"
git commit --date="2023-01-01T12:00:00"

# Sign commit
git commit -S -m "Signed commit"
```

### Status and Information
```bash
# Show repository status
git status
git status --short
git status --branch
git status --porcelain

# Show commit history
git log
git log --oneline
git log --graph --oneline --decorate
git log --stat
git log --patch
git log --grep="keyword"
git log --author="author name"
git log --since="2023-01-01"
git log --until="2023-12-31"

# Show commit details
git show
git show HEAD
git show HEAD~2
git show <commit-hash>
git show --stat HEAD
git show --name-only HEAD
```

## Branching and Merging

### Branch Operations
```bash
# List branches
git branch
git branch -r    # Remote branches
git branch -a    # All branches
git branch -v    # With last commit info

# Create branches
git branch feature-branch
git branch feature-branch HEAD~5

# Switch branches
git checkout feature-branch
git switch feature-branch

# Create and switch branch
git checkout -b new-feature
git switch -c new-feature

# Delete branches
git branch -d feature-branch     # Safe delete
git branch -D feature-branch     # Force delete
git push origin --delete feature-branch  # Delete remote branch

# Rename branches
git branch -m old-name new-name
git branch -M old-name new-name  # Force rename
```

### Merging
```bash
# Merge branches
git merge feature-branch
git merge feature-branch --no-ff  # No fast-forward
git merge --no-commit feature-branch

# Merge strategies
git merge -s recursive feature-branch
git merge -s ours feature-branch
git merge -s theirs feature-branch

# Abort merge
git merge --abort

# Continue merge after conflicts
git add resolved-files
git commit

# Merge with custom message
git merge feature-branch -m "Merge feature"
```

### Rebasing
```bash
# Rebase current branch
git rebase main
git rebase --interactive HEAD~3
git rebase --onto main branch1 branch2

# Continue rebase after conflicts
git add resolved-files
git rebase --continue

# Abort rebase
git rebase --abort

# Rebase without fast-forward
git rebase --no-ff main
```

## Remote Operations

### Remote Management
```bash
# List remotes
git remote
git remote -v

# Add remotes
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git

# Remove remotes
git remote remove origin
git remote rm origin

# Rename remotes
git remote rename origin upstream

# Update remote URLs
git remote set-url origin https://github.com/user/newrepo.git
git remote set-url --push origin git@github.com:user/newrepo.git
```

### Fetching and Pulling
```bash
# Fetch from remotes
git fetch
git fetch origin
git fetch --all
git fetch --prune

# Pull changes
git pull
git pull origin main
git pull --rebase
git pull --no-rebase

# Fetch specific branch
git fetch origin feature-branch
git fetch origin feature-branch:local-branch

# Fetch with prune
git fetch --prune origin
```

### Pushing Changes
```bash
# Push changes
git push
git push origin main
git push origin feature-branch

# Push with upstream tracking
git push --set-upstream origin feature-branch
git push -u origin feature-branch

# Force push
git push --force
git push -f
git push --force-with-lease

# Push all branches
git push --all

# Push tags
git push --tags
git push origin --tags

# Delete remote branch
git push origin --delete feature-branch
git push origin :feature-branch
```

## History and Comparison

### Viewing History
```bash
# Show commit history with formatting
git log --pretty=format:"%h - %an, %ar : %s"
git log --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset"

# Show file history
git log --follow file.txt
git log --patch -- file.txt
git log --stat -- file.txt

# Show changes between commits
git diff
git diff --staged
git diff HEAD
git diff commit1 commit2

# Show word differences
git diff --word-diff
git diff --color-words

# Show differences in specific file
git diff file.txt
git diff HEAD~1 file.txt
git diff branch1..branch2 file.txt
```

### Blame and Annotate
```bash
# Show blame information
git blame file.txt
git blame -L 10,20 file.txt
git blame --show-email file.txt
git blame -C file.txt  # Track copied lines

# Annotate with date
git annotate file.txt
```

## Tagging

### Tag Operations
```bash
# Create tags
git tag v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git tag -s v1.0.0 -m "Signed tag"

# Create lightweight tag
git tag lightweight-tag

# Create annotated tag with specific commit
git tag v1.0.0 <commit-hash>

# List tags
git tag
git tag -l "v*"
git tag -n  # With messages

# Show tag details
git show v1.0.0
git tag -v v1.0.0  # Verify signed tag

# Push tags
git push origin v1.0.0
git push origin --tags
git push --tags

# Delete tags
git tag -d v1.0.0
git push origin --delete v1.0.0
```

## Stashing

### Stash Operations
```bash
# Stash changes
git stash
git stash push -m "Work in progress"
git stash push -- file.txt  # Stash specific file

# List stashes
git stash list

# Apply stashed changes
git stash apply
git stash apply stash@{1}
git stash pop  # Apply and remove

# Drop stash
git stash drop
git stash drop stash@{1}

# Clear all stashes
git stash clear

# Create branch from stash
git stash branch new-branch stash@{1}
```

## Undoing Changes

### Reset and Revert
```bash
# Reset working directory
git reset --hard HEAD
git reset --soft HEAD~1
git reset --mixed HEAD~1  # Default

# Reset specific file
git reset HEAD file.txt
git checkout -- file.txt

# Revert commits
git revert HEAD
git revert HEAD~3
git revert --no-commit HEAD~2..HEAD

# Cherry-pick commits
git cherry-pick <commit-hash>
git cherry-pick <commit1> <commit2>
git cherry-pick --no-commit <commit-hash>
```

## Usage Examples

### Basic Repository Operations

#### Initialization and Setup
```bash
# Initialize new repository
git init
git init myproject
git init --bare myproject.git

# Clone existing repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git myproject
git clone git@github.com:user/repo.git
git clone --depth 1 https://github.com/user/repo.git  # Shallow clone

# Clone specific branch
git clone --branch develop https://github.com/user/repo.git
git clone -b feature-branch https://github.com/user/repo.git

# Clone with specific depth (shallow clone)
git clone --depth 10 https://github.com/user/repo.git
git clone --single-branch --branch main https://github.com/user/repo.git

# Initialize with custom directory
mkdir my-project && cd my-project
git init
git remote add origin https://github.com/user/my-project.git
```

#### Basic File Operations
```bash
# Add files to staging area
git add file.txt
git add *.c
git add src/
git add .

# Add all changes including deletions
git add -A
git add --all

# Interactive staging
git add -i
git add -p  # Patch mode

# Add with verbose output
git add -v file.txt

# Add ignoring file mode changes
git add --chmod=+x script.sh

# Check status
git status
git status --short
git status --branch
git status --porcelain

# Remove files
git rm file.txt
git rm -r directory/
git rm --cached file.txt  # Remove from index only
git rm --ignore-unmatched file.txt

# Move/rename files
git mv old.txt new.txt
git mv file.txt directory/
```

#### Committing Changes
```bash
# Commit staged changes
git commit
git commit -m "Commit message"
git commit -m "Commit message" file1.txt file2.txt

# Commit with all changes
git commit -am "Commit message"  # Add and commit

# Empty commit
git commit --allow-empty -m "Initial commit"

# Edit last commit message
git commit --amend
git commit --amend -m "New message"

# Author and committer information
git commit --author="Name <email@example.com>"
git commit --date="2023-01-01T12:00:00"

# Sign commit
git commit -S -m "Signed commit"

# Interactive commit staging
git commit -i  # Interactive add
git commit --interactive

# Commit specific files from staging
git commit --only file1.txt file2.txt
```

### Branching and Merging

#### Branch Management
```bash
# List branches
git branch
git branch -r    # Remote branches
git branch -a    # All branches
git branch -v    # With last commit info
git branch --merged  # Merged branches only
git branch --no-merged  # Unmerged branches only

# Create branches
git branch feature-branch
git branch feature-branch HEAD~5
git branch feature-branch main

# Switch branches
git checkout feature-branch
git switch feature-branch
git checkout -b new-feature  # Create and switch
git switch -c new-feature

# Create and switch branch
git checkout -b new-feature
git switch -c new-feature

# Rename branches
git branch -m old-name new-name
git branch -M old-name new-name  # Force rename

# Delete branches
git branch -d feature-branch     # Safe delete
git branch -D feature-branch     # Force delete
git push origin --delete feature-branch  # Delete remote branch
git push origin :feature-branch  # Alternative delete

# Track remote branch
git checkout -b local-branch origin/remote-branch
git branch --set-upstream-to=origin/main main
```

#### Advanced Branching
```bash
# Create branch from specific commit
git branch hotfix abc123

# List branches with detailed info
git branch -vv
git branch --list --format='%(refname:short) %(upstream) %(committerdate:short) %(subject)'

# Move/rename branch safely
git branch -m old-branch new-branch
git push origin :old-branch new-branch

# Compare branches
git diff main..feature
git log main..feature
git log --oneline --graph --decorate main..feature

# Find branch containing specific commit
git branch --contains abc123
git branch --no-contains abc123

# Branch from tag
git checkout -b v1.0-maint v1.0.0
```

#### Merging Operations
```bash
# Merge branches
git merge feature-branch
git merge feature-branch --no-ff  # No fast-forward
git merge --no-commit feature-branch
git merge --squash feature-branch

# Merge strategies
git merge -s recursive feature-branch
git merge -s ours feature-branch
git merge -s theirs feature-branch
git merge -s resolve feature-branch
git merge -s subtree feature-branch

# Abort merge
git merge --abort

# Continue merge after conflicts
git add resolved-files
git commit

# Merge with custom message
git merge feature-branch -m "Merge feature branch"

# Merge multiple branches
git merge feature1 feature2 feature3

# Fast-forward merge only
git merge --ff-only feature-branch
git merge --ff-only origin/main

# Merge with verification
git merge --verify-signatures feature-branch

# Strategic merges
git merge --strategy-option ours feature-branch
git merge -X theirs feature-branch
git merge -X patience feature-branch
```

#### Rebasing
```bash
# Rebase current branch
git rebase main
git rebase --interactive HEAD~3
git rebase --onto main branch1 branch2

# Interactive rebase
git rebase -i HEAD~3  # Edit last 3 commits
git rebase -i --autosquash HEAD~5

# Rebase options
git rebase --preserve-merges main
git rebase --interactive --rebase-merges main
git rebase --committer-date-is-author-date main

# Continue rebase after conflicts
git add resolved-files
git rebase --continue

# Skip current commit during rebase
git rebase --skip

# Abort rebase
git rebase --abort

# Rebase without fast-forward
git rebase --no-ff main

# Rebase with strategy
git rebase -s recursive -X patience main
git rebase -X ours main

# Rebase onto specific commit
git rebase --onto new-base old-base branch
git rebase --onto main HEAD~2 feature-branch
```

### Remote Operations

#### Remote Management
```bash
# List remotes
git remote
git remote -v
git remote show origin

# Add remotes
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git
git remote add fork git@github.com:forker/repo.git

# Remove remotes
git remote remove origin
git remote rm origin

# Rename remotes
git remote rename origin upstream

# Update remote URLs
git remote set-url origin https://github.com/user/newrepo.git
git remote set-url --push origin git@github.com:user/newrepo.git
git remote set-url origin --add https://mirror.example.com/repo.git

# Remote pruning
git remote prune origin
git remote prune --dry-run origin
```

#### Fetching Operations
```bash
# Fetch from remotes
git fetch
git fetch origin
git fetch --all
git fetch --prune
git fetch --multiple origin upstream

# Pull changes
git pull
git pull origin main
git pull --rebase
git pull --no-rebase

# Fetch specific branch
git fetch origin feature-branch
git fetch origin feature-branch:local-branch

# Fetch with prune
git fetch --prune origin

# Fetch specific tags
git fetch --tags
git fetch --no-tags origin

# Shallow fetching
git fetch --depth=1 origin
git fetch --deepen=1 origin
git fetch --unshallow origin

# Partial fetch
git fetch origin main:main --no-tags
git fetch origin +refs/pull/*/head:refs/remotes/origin/pr/*
```

#### Pushing Operations
```bash
# Push changes
git push
git push origin main
git push origin feature-branch

# Push with upstream tracking
git push --set-upstream origin feature-branch
git push -u origin feature-branch

# Force push
git push --force
git push -f
git push --force-with-lease
git push --force-if-includes

# Push all branches
git push --all
git push --all origin

# Push tags
git push --tags
git push origin --tags

# Push specific tags
git push origin v1.0.0
git push origin refs/tags/v1.0.0

# Delete remote branch
git push origin --delete feature-branch
git push origin :feature-branch

# Push with options
git push --dry-run origin main
git push --porcelain origin main
git push --quiet origin main
git push --verbose origin main

# Mirror push
git push --mirror origin

# Atomic push
git push --atomic origin main feature-branch
```

### History and Log Operations

#### Viewing History
```bash
# Show commit history
git log
git log --oneline
git log --graph --oneline --decorate
git log --stat
git log --patch
git log --grep="keyword"
git log --author="author name"
git log --since="2023-01-01"
git log --until="2023-12-31"

# Custom log formatting
git log --pretty=format:"%h - %an, %ar : %s"
git log --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset"

# Log filtering
git log --grep="fix" --oneline
git log --author="John" --since="1 month ago"
git log --file-change  # Show file changes
git log --follow -- file.txt

# Graph history
git log --graph --decorate --pretty=oneline
git log --graph --all --oneline
git log --graph --left-right main..feature

# Detailed commit info
git log -1  # Last commit details
git log -1 --stat  # With statistics
git log -1 --patch  # With diff
git log -1 --name-only  # Changed files only

# Range operations
git log HEAD~5..HEAD  # Last 5 commits
git log main..feature  # Commits in feature not in main
git log main...feature  # Commits in either but not both
```

#### Advanced Log Operations
```bash
# Log with specific formatting
git log --pretty=format:"%h %ad | %s%d [%an]" --date=short
git log --pretty=format:"%C(yellow)%h%Cred%d %Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset"

# Log with file content
git log -p  # With patches
git log --stat --summary
git log --name-status

# Search in commits
git log --grep="bug fix" --oneline
git log --grep="feature.*add" --oneline
git log --author="john" --grep="fix" --oneline

# Log by changes
git log -- src/  # Commits affecting src/
git log --since="2 weeks ago" --until="1 week ago"
git log --before="2023-01-01" --after="2022-12-01"

# Branch comparison
git log main..feature --stat
git log main...feature --oneline
git log --cherry-pick main..feature

# Interactive log viewing
git log --interactive
git log --patch --interactive

# Find commits by content
git log -S"function_name" --source --all
git log -G"regex_pattern" --oneline

# Commits by specific date
git log --after="2023-01-01" --before="2023-12-31"
git log --since="1 month ago" --until="2 weeks ago"
```

### Comparison and Diff Operations

#### File Differences
```bash
# Show differences
git diff
git diff --staged
git diff HEAD
git diff commit1 commit2

# Show word differences
git diff --word-diff
git diff --color-words
git diff --word-diff-regex="[a-zA-Z]+"

# Show differences in specific file
git diff file.txt
git diff HEAD~1 file.txt
git diff branch1..branch2 file.txt

# Diff with statistics
git diff --stat
git diff --stat --summary
git diff --numstat
git diff --shortstat

# Context control
git diff --context=3  # Show 3 lines context
git diff -U5  # Show 5 lines context

# Show changes between branches
git diff main..feature
git diff main...feature  # Symmetric difference
git diff --stat main..feature

# Ignore whitespace
git diff --ignore-space-change
git diff --ignore-all-space
git diff --ignore-space-at-eol

# Functional differences
git diff --function-context
git diff --minimal

# Diff with rename detection
git diff --detect-renames
git diff --rename-threshold=50%

# Combined diff for merges
git diff --cc
git diff -c
```

#### Advanced Comparison
```bash
# Compare commits
git diff HEAD~1 HEAD
git diff abc123 def456
git diff v1.0 v1.1

# Directory comparison
git diff --stat --src-prefix="old/" --dst-prefix="new/"
git diff --dirstat

# Binary files
git diff --binary
git diff --textconv

# Filter diffs
git diff --diff-filter=ACMRT  # Show only Add, Copy, Modify, Rename, Type-change
git diff --diff-filter=D  # Show only deleted files

# Ignore files
git diff -- . ':!*.log' ':!tmp/*'

# Patience diff algorithm
git diff --patience
git diff --histogram

# Diff with external tools
git diff --tool=vimdiff
git difftool --tool-meld

# Show only file names
git diff --name-only
git diff --name-status

# Commit ranges
git diff HEAD~5..HEAD
git diff main..feature -- src/
```

### Stashing Operations

#### Stash Management
```bash
# Stash changes
git stash
git stash push -m "Work in progress"
git stash push -- file.txt  # Stash specific file
git stash push --keep-index  # Don't stash staged changes

# Stash with options
git stash save "Temporary work"
git stash push --include-untracked
git stash push --all  # Including ignored files

# List stashes
git stash list
git stash list --stat

# Apply stashed changes
git stash apply
git stash apply stash@{1}
git stash pop  # Apply and remove
git stash apply --index  # Restore staged state

# Show stash contents
git stash show
git stash show -p  # With patch
git stash show stash@{1}

# Drop stash
git stash drop
git stash drop stash@{1}

# Clear all stashes
git stash clear

# Create branch from stash
git stash branch new-branch stash@{1}

# Stash operations
git stash push -m "feature work" -- src/
git stash apply --index
git stash pop --quiet
```

#### Advanced Stashing
```bash
# Stash with untracked files
git stash push --include-untracked -m "with new files"
git stash push --all -m "including ignored files"

# Stash specific files
git stash push -m "config changes" -- config/
git stash push -m "script updates" -- script.sh

# Stash management
git stash store -m "stored stash" $(git stash create)
git stash create  # Create stash without applying

# Stash inspection
git stash show --stat
git stash show --include-untracked
git stash show stash@{1} -p

# Stash operations with messages
git stash push -m "Work on feature X"
git stash save "Quick fix for bug"

# Multiple stash applications
git stash apply && git stash drop
git stash pop --index

# Stash from specific files
git stash push -m "docs update" -- *.md
git stash push --keep-index -m "staged commit"
```

### Tagging Operations

#### Tag Management
```bash
# Create tags
git tag v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git tag -s v1.0.0 -m "Signed tag"
git tag -a v1.0.0 abc123 -m "Tag specific commit"

# Create lightweight tag
git tag lightweight-tag

# List tags
git tag
git tag -l "v*"
git tag -n  # With messages
git tag -v v1.0.0  # Verify signed tag

# Show tag details
git show v1.0.0
git tag -v v1.0.0  # Verify signed tag

# Push tags
git push origin v1.0.0
git push origin --tags
git push --tags
git push --follow-tags  # Push tags only if they point to commits

# Delete tags
git tag -d v1.0.0
git push origin --delete v1.0.0
git push origin :refs/tags/v1.0.0

# Tag operations
git tag -a v2.0.0 -m "Release version 2.0.0" HEAD
git tag -s v1.5.0 -m "Signed release" abc123

# Tag verification
git verify-tag v1.0.0
git tag -v v1.0.0
```

#### Advanced Tagging
```bash
# Annotated tags with detailed info
git tag -a v1.0.0 -m "Version 1.0.0

Release notes:
- Added new feature X
- Fixed bug Y
- Updated documentation"

# Tag with specific tagger info
GIT_COMMITTER_NAME="Release Bot" GIT_COMMITTER_EMAIL="bot@company.com" \
git tag -a v1.0.0 -m "Automated release"

# Batch tag operations
git tag -l "v1.*" | xargs git push origin --delete
git tag | grep "temp" | xargs git tag -d

# Tag management
git tag -f v1.0.0  # Force overwrite tag
git push --force origin v1.0.0

# Create tags from files
echo "v1.0.0" > .git/refs/tags/v1.0.0
git update-ref refs/tags/v1.0.0 abc123

# Tag with GPG
git tag -s v2.0.0 -m "Signed release 2.0"
git tag -u signing@key v1.0.0 -m "Signed with specific key"

# List tags by date
git tag --sort=-version:refname
git tag --sort=-creatordate
git tag --sort=-committerdate
```

### Advanced Operations

#### Bisect for Bug Finding
```bash
# Start bisect
git bisect start
git bisect bad    # Current version has bug
git bisect good <commit-hash>  # Known good commit

# After binary search, git will show the bad commit
git bisect reset  # Exit bisect mode

# Bisect automatically
git bisect start HEAD HEAD~10  # Search last 10 commits
git bisect run make test  # Run test command

# Bisect with script
git bisect start HEAD HEAD~20
git bisect run ./test_script.sh

# Visual bisect
git bisect visualize
git bisect view

# Bisect options
git bisect log
git bisect replay bisect-log
git bisect skip  # Skip current commit

# Bisect with specific range
git bisect start v2.0 v1.0
git bisect run ./test.sh
```

### Worktree Management
```bash
# Create worktree
git worktree add ../feature-branch feature-branch
git worktree add ../hotfix hotfix-branch

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../feature-branch
git prune worktree
```

### Submodules
```bash
# Add submodule
git submodule add https://github.com/user/submodule.git
git submodule add --branch main https://github.com/user/submodule.git

# Initialize and update submodules
git submodule init
git submodule update
git submodule update --init --recursive

# Clone with submodules
git clone --recursive https://github.com/user/repo.git

# Update submodules
git submodule update --remote
git submodule foreach git pull origin main
```

## Practical Examples

### System Administration

#### Git Server Administration
```bash
# Initialize bare repository for server
git init --bare /srv/git/project.git
git init --bare --shared /srv/git/team-project.git

# Set up Git daemon for anonymous access
git daemon --reuseaddr --base-path=/srv/git/ /srv/git/

# Configure repository permissions
chown -R git:git /srv/git/project.git
chmod -R 775 /srv/git/project.git

# Set up hooks for automatic deployment
mkdir -p /srv/git/project.git/hooks
cat > /srv/git/project.git/hooks/post-receive << 'EOF'
#!/bin/bash
cd /var/www/project
git --git-dir=/srv/git/project.git --work-tree=/var/www/project checkout -f
EOF
chmod +x /srv/git/project.git/hooks/post-receive

# Repository maintenance
git gc --aggressive
git fsck --full
git count-objects -v
```

#### Backup and Recovery
```bash
# Create backup repository
git clone --bare /path/to/repo /backup/repo.git

# Bundle repository for backup
git bundle create backup.bundle --all
git bundle verify backup.bundle

# Clone from bundle
git clone backup.bundle restored-repo

# Backup specific branch
git archive --format=tar.gz --output=backup.tar.gz main

# Recovery from reflog
git reflog
git checkout -b recovered-branch HEAD@{5}

# Find lost commits
git fsck --lost-found
git log --oneline --all --graph
```

### Development Workflow

#### Feature Branch Workflow
```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# Work on feature
git add auth-system/
git commit -m "Implement basic user authentication"

# Push feature branch
git push -u origin feature/user-authentication

# Update from main (incorporate changes)
git fetch origin
git rebase origin/main

# Resolve conflicts and continue
git add conflict-file
git rebase --continue

# Merge to main (pull request process)
git checkout main
git pull origin main
git merge --no-ff feature/user-authentication
git push origin main

# Clean up
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

#### Hotfix Workflow
```bash
# Create hotfix from tag
git checkout -b hotfix/critical-bug v1.2.0

# Apply fix
git add bug-fix.py
git commit -m "Fix critical security vulnerability"

# Test and tag
git tag -a v1.2.1 -m "Hotfix release 1.2.1"

# Merge to main and develop
git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.2.1

git checkout develop
git merge --no-ff hotfix/critical-bug

# Deploy
git push origin main v1.2.1
git push origin develop

# Clean up
git branch -d hotfix/critical-bug
```

#### Release Workflow
```bash
# Prepare release branch
git checkout develop
git checkout -b release/v2.0.0

# Bump version numbers
echo "2.0.0" > VERSION
git add VERSION
git commit -m "Bump version to 2.0.0"

# Final testing and fixes
git add bug-fixes/
git commit -m "Fix bugs found during release testing"

# Finish release
git checkout main
git merge --no-ff release/v2.0.0
git tag -a v2.0.0 -m "Release version 2.0.0"

git checkout develop
git merge --no-ff release/v2.0.0

# Deploy and announce
git push origin main v2.0.0
git push origin develop

# Clean up
git branch -d release/v2.0.0
```

### Code Review and Collaboration

#### Pull Request Management
```bash
# Submit pull request via CLI (GitHub CLI)
gh pr create --title "Add user authentication" --body "Implements OAuth2 login"

# View and review pull requests
gh pr list
gh pr view 123
gh pr review 123 --comment "Looks good, but needs tests"

# Merge pull request
gh pr merge 123 --merge
gh pr merge 123 --squash

# Request changes
gh pr review 123 --request-changes --body "Please add error handling"

# Update pull request with new commits
git add new-feature.py
git commit -m "Add missing error handling"
git push origin feature/authentication
```

#### Code Quality and Validation
```bash
# Pre-commit hooks setup
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Run tests
npm test

# Check code style
flake8 src/

# Security check
bandit -r src/

EOF
chmod +x .git/hooks/pre-commit

# Commit message validation
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/bash
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'
if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format"
    exit 1
fi
EOF
chmod +x .git/hooks/commit-msg
```

#### Team Collaboration
```bash
# Fork and contribute workflow
git clone https://github.com/original/repo.git
cd repo
git remote add fork https://github.com/username/repo.git
git remote -v

# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature and push to fork
git checkout -b feature/new-feature
git add feature.py
git commit -m "Add new feature"
git push fork feature/new-feature

# Create pull request (GitHub)
gh pr create --base main --head feature/new-feature

# Keep fork in sync
git fetch upstream
git rebase upstream/main
git push fork feature/new-feature --force-with-lease
```

### Automation and Scripting

#### Automated Deployment Script
```bash
#!/bin/bash
# deploy.sh - Automated deployment script

set -e

REPO_DIR="/var/www/app"
REMOTE_URL="https://github.com/user/app.git"
BACKUP_DIR="/backup/app-$(date +%Y%m%d-%H%M%S)"

echo "Starting deployment..."

# Backup current version
if [ -d "$REPO_DIR" ]; then
    cp -r "$REPO_DIR" "$BACKUP_DIR"
    echo "Backup created: $BACKUP_DIR"
fi

# Clone or update repository
if [ ! -d "$REPO_DIR" ]; then
    git clone "$REMOTE_URL" "$REPO_DIR"
    cd "$REPO_DIR"
else
    cd "$REPO_DIR"
    git fetch origin
    git reset --hard origin/main
fi

# Install dependencies
npm install

# Run tests
npm test

# Build application
npm run build

# Restart service
systemctl restart app

echo "Deployment completed successfully!"
```

#### Commit Statistics Script
```bash
#!/bin/bash
# git-stats.sh - Generate commit statistics

START_DATE="$1"
END_DATE="$2"

if [ -z "$START_DATE" ]; then
    START_DATE=$(date -d "1 month ago" +%Y-%m-%d)
fi

if [ -z "$END_DATE" ]; then
    END_DATE=$(date +%Y-%m-%d)
fi

echo "Git Statistics: $START_DATE to $END_DATE"
echo "=========================================="

# Total commits
TOTAL_COMMITS=$(git log --since="$START_DATE" --until="$END_DATE" --oneline | wc -l)
echo "Total commits: $TOTAL_COMMITS"

# Commits by author
echo -e "\nCommits by author:"
git shortlog --since="$START_DATE" --until="$END_DATE" --no-merges

# Files changed
echo -e "\nMost changed files:"
git log --since="$START_DATE" --until="$END_DATE" --name-only --pretty=format: | \
    sort | uniq -c | sort -nr | head -10

# Busiest days
echo -e "\nCommits per day:"
git log --since="$START_DATE" --until="$END_DATE" --format="%ad" --date=short | \
    sort | uniq -c | sort -nr
```

#### Repository Health Check
```bash
#!/bin/bash
# repo-health.sh - Check repository health

echo "Repository Health Check"
echo "======================"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: Uncommitted changes present"
    git status --porcelain
fi

# Check for large files
echo -e "\nLarge files (>1MB):"
git ls-files -z | xargs -0 du -h | awk '$1 ~ /M|G/ {print $2 " (" $1 ")"}'

# Check for binary files
echo -e "\nBinary files:"
git ls-files | file -f - | grep -v text | cut -d: -f1

# Repository size
REPO_SIZE=$(du -sh .git | cut -f1)
echo -e "\nGit repository size: $REPO_SIZE"

# Check for forgotten passwords/secrets
echo -e "\nPotential secrets in history:"
git log -p --all | grep -i "password\|secret\|key" | head -5

# Check branch hygiene
echo -e "\nMerged branches that can be deleted:"
git branch --merged | grep -v "\* main\|master\|develop"

# Check unpushed commits
echo -e "\nUnpushed commits:"
git log --oneline origin/main..main 2>/dev/null || echo "No unpushed commits"
```

### Performance and Optimization

#### Large File Management
```bash
# Check for large files in history
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
    sed -n 's/^blob //p' | sort -nr | head -10

# Set up Git LFS
git lfs install
git lfs track "*.psd"
git lfs track "*.zip"
git add .gitattributes
git commit -m "Configure Git LFS"

# Migrate existing large files to LFS
git lfs migrate import --include="*.psd,*.zip" --everything

# Clean up old large files
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch large-file.zip' --prune-empty --tag-name-filter cat -- --all
```

#### Repository Optimization
```bash
# Garbage collection
git gc
git gc --aggressive
git gc --prune=now

# Pack optimization
git repack -a -d --depth=250 --window=250

# Remove unreachable objects
git prune --expire=now

# Optimize repository for size
git repack -a -d --depth=50 --window=1
git prune

# Compress old objects
git repack -a -d
git gc --prune=now

# Check repository integrity
git fsck --full
git fsck --unreachable
git fsck --lost-found
```

## Advanced Operations

- [`gcc`](/docs/commands/development-tools/gcc) - GNU Compiler Collection
- [`make`](/docs/commands/development-tools/make) - Build automation tool
- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`vim`](/docs/commands/editors/vim) - Text editor with Git integration
- [`emacs`](/docs/commands/editors/emacs) - Text editor with Git integration
- [`ssh`](/docs/commands/networking/ssh) - Secure shell for Git over SSH
- [`curl`](/docs/commands/networking/curl) - For HTTP-based Git operations
- [`tar`](/docs/commands/archiving/tar) - Archive Git repositories
- [`diff`](/docs/commands/text-processing/diff) - Compare file differences
- [`patch`](/docs/commands/text-processing/patch) - Apply changes to files

## Troubleshooting

### Common Issues and Solutions

#### Commit Problems
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo multiple commits
git reset --hard HEAD~3

# Modify last commit message
git commit --amend
git commit --amend -m "New message"

# Add forgotten files to last commit
git add forgotten-file.txt
git commit --amend --no-edit
```

#### Branch and Merge Issues
```bash
# Recover deleted branch
git reflog
git checkout -b recovered-branch <commit-hash>

# Fix merge conflicts
git status
git add resolved-file.txt
git commit  # or git merge --continue

# Abort failed merge
git merge --abort

# Rebase conflicts
git add resolved-file
git rebase --continue
git rebase --abort  # To cancel rebase

# Fix detached HEAD
git checkout main
git merge <commit-hash>
git branch -m old-branch new-branch
```

#### Remote Issues
```bash
# Fix push rejected (non-fast-forward)
git pull --rebase origin main
git push origin main

# Force push with caution
git push --force-with-lease origin main

# Remove stale remote branches
git remote prune origin
git fetch --prune

# Sync fork with upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

#### Repository Corruption
```bash
# Check repository integrity
git fsck --full
git fsck --unreachable

# Fix broken repository
git gc --aggressive --prune=now
git repack -a -d

# Recover lost commits
git fsck --lost-found
git log --all --full-history -- <path>

# Reset to known good state
git reset --hard <known-good-commit>
```

#### Performance Issues
```bash
# Slow git status (too many files)
echo "*.log" >> .gitignore
git rm -r --cached *.log
git commit -m "Remove log files from tracking"

# Slow git operations (large repository)
git gc --aggressive
git repack -a -d
git prune --expire=now

# Large file issues
git lfs install
git lfs track "*.zip"
git add .gitattributes
git commit -m "Track large files with LFS"
```

#### Authentication Issues
```bash
# Cache credentials
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=3600'

# Configure SSH keys
ssh-keygen -t ed25519 -C "your_email@example.com"
ssh-add ~/.ssh/id_ed25519

# Test SSH connection
ssh -T git@github.com

# Update remote URL
git remote set-url origin git@github.com:user/repo.git
```

## Integration and Automation

### Git Hooks

#### Pre-commit Hook
```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run tests
npm test || exit 1

# Check code style
npm run lint || exit 1

# Security scan
npm audit || exit 1

# Prevent commits to main
if [ "$(git rev-parse --abbrev-ref HEAD)" = "main" ]; then
    echo "Direct commits to main are not allowed"
    exit 1
fi
```

#### Post-commit Hook
```bash
#!/bin/sh
# .git/hooks/post-commit

# Notify team
echo "New commit $(git rev-parse HEAD)" | mail -s "Git Update" team@company.com

# Update documentation
make docs
git add docs/
git commit -m "Update documentation [skip ci]"
```

#### Pre-push Hook
```bash
#!/bin/sh
# .git/hooks/pre-push

# Run full test suite
npm run test:full || exit 1

# Check for sensitive data
if git diff --cached --name-only | xargs grep -l "password\|secret"; then
    echo "Sensitive data detected!"
    exit 1
fi

# Ensure no merge commits to main
if [ "$1" = "origin" ] && [ "$2" = "refs/heads/main" ]; then
    echo "Use pull requests for main branch"
    exit 1
fi
```

### CI/CD Integration

#### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Run tests
      run: npm test
    - name: Check code style
      run: npm run lint
    - name: Security audit
      run: npm audit
```

#### GitLab CI Configuration
```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm test
    - npm run lint

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  only:
    - main
  script:
    - echo "Deploying to production..."
    - deploy.sh
```

### Shell Integration

#### Git Prompt Configuration
```bash
# Add to ~/.bashrc
function parse_git_branch() {
    git branch 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\[\033[32m\]\u@\h\[\033[00m\]:\[\033[34m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\]\$ "
```

#### Git Aliases and Functions
```bash
# Useful aliases in ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --decorate
    unstage = reset HEAD --
    last = log -1 HEAD
    amend = commit --amend
    undo = reset --soft HEAD~1
    wip = commit -m "WIP"

# Shell functions
function git_cleanup() {
    git checkout main
    git pull
    git branch --merged | grep -v "\* main" | xargs -n 1 git branch -d
    git remote prune origin
}

function git_backup() {
    git archive --format=tar.gz --output="backup-$(date +%Y%m%d-%H%M%S).tar.gz" HEAD
}
```

## Best Practices

### Commit Practices
1. **Write meaningful commit messages**: Use present tense, be descriptive, explain why
2. **Follow commit message format**: `type(scope): description` (e.g., `feat(auth): add OAuth2`)
3. **Commit often**: Small, focused commits are easier to review and revert
4. **Atomic commits**: Each commit should contain one logical change
5. **Test before committing**: Ensure your changes work before pushing

### Branch Management
1. **Use branches**: Isolate features, fixes, and experiments
2. **Descriptive branch names**: `feature/user-auth`, `fix/login-bug`, `hotfix/security-patch`
3. **Keep main clean**: Main branch should always be deployable
4. **Regular cleanup**: Delete merged branches regularly
5. **Protected branches**: Prevent direct pushes to main/master

### Collaboration
1. **Pull before push**: Avoid conflicts by staying up-to-date
2. **Code review**: Always review changes before integration
3. **Pull requests**: Use PRs for all changes to main branches
4. **Descriptive PR titles**: Make PRs easy to understand at a glance
5. **Link issues**: Connect PRs to issue numbers for traceability

### Repository Management
1. **Use .gitignore**: Exclude build artifacts and temporary files
2. **Regular maintenance**: Run `git gc` and `git prune` periodically
3. **Backup strategies**: Use remotes and bundles for backups
4. **Sign commits**: Use GPG signing for security in critical projects
5. **Monitor repository size**: Keep an eye on large files and pack files

### Security
1. **Never commit secrets**: Use environment variables or secret managers
2. **Use SSH keys**: More secure than HTTPS with passwords
3. **Enable two-factor authentication**: On Git hosting platforms
4. **Audit commit history**: Check for accidental secret commits
5. **Signed tags**: Verify releases with GPG signatures

## Performance Tips

### Repository Optimization
1. **Git LFS for large files**: Prevent repository bloat with binary files
2. **Shallow clones**: Use `--depth` for large repositories when possible
3. **Sparse checkouts**: Only checkout needed directories
4. **Regular garbage collection**: Run `git gc` periodically
5. **Monitor repository size**: Use `git count-objects -v` to track size

### Command Performance
1. **Use Git status efficiently**: Avoid unnecessary file system operations
2. **Optimize .gitignore**: Proper ignore patterns speed up operations
3. **Avoid unnecessary history rewriting**: Large rewrites are expensive
4. **Use appropriate diff algorithms**: `--patience` or `--histogram` for complex diffs
5. **Limit log operations**: Use ranges and filters for large histories

### Network Performance
1. **Use SSH**: Generally faster than HTTPS for large repositories
2. **Clone with depth**: `git clone --depth=1` for recent history only
3. **Fetch selectively**: Only fetch needed branches and tags
4. **Use bundle for distribution**: Single file transfers for large repos
5. **Configure cache**: Increase Git's HTTP post buffer for large pushes

### Working with Large Repositories
1. **Git LFS**: Track large assets outside the repository
2. **Partial clone**: Fetch only needed objects on demand
3. **Sparse checkout**: Work with only needed directories
4. **Regular maintenance**: Keep repository clean and optimized
5. **Monitor performance**: Use `git gc --debug` to identify bottlenecks

## Related Commands

- [`gcc`](/docs/commands/development-tools/gcc) - GNU Compiler Collection
- [`make`](/docs/commands/development-tools/make) - Build automation tool
- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`vim`](/docs/commands/editors/vim) - Text editor with Git integration
- [`emacs`](/docs/commands/editors/emacs) - Text editor with Git integration
- [`ssh`](/docs/commands/networking/ssh) - Secure shell for Git over SSH
- [`curl`](/docs/commands/networking/curl) - For HTTP-based Git operations
- [`tar`](/docs/commands/archiving/tar) - Archive Git repositories
- [`diff`](/docs/commands/text-processing/diff) - Compare file differences
- [`patch`](/docs/commands/text-processing/patch) - Apply changes to files
- [`grep`](/docs/commands/text-processing/grep) - Search in files and commit history
- [`find`](/docs/commands/file-management/find) - Find files in repository
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`ls`](/docs/commands/file-management/ls) - List files and directories
- [`vimdiff`](/docs/commands/editors/vimdiff) - Visual diff tool for merge conflicts

The `git` command is a powerful and flexible version control system essential for modern software development. Mastering Git enables efficient collaboration, version tracking, and project management for software projects of any scale. With its distributed architecture, powerful branching model, and extensive tooling ecosystem, Git provides the foundation for modern development workflows, from open-source projects to enterprise applications.