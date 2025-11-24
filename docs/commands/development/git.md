---
title: git - Distributed Version Control System
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# git - Distributed Version Control System

The `git` command is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals. Git was created by Linus Torvalds in 2005 for development of the Linux kernel and has since become the world's most widely used version control system.

## Basic Syntax

```bash
git [--version] [--help] [-C <path>] [-c <name>=<value>]
    [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
    [-p|--paginate|-P|--no-pager] [--no-replace-objects] [--bare]
    [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
    <command> [<args>]
```

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

## Advanced Operations

### Bisect for Bug Finding
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

## Best Practices

1. **Write meaningful commit messages**: Use present tense, be descriptive, explain why
2. **Commit often**: Small, focused commits are easier to review and revert
3. **Use branches**: Isolate features, fixes, and experiments
4. **Pull before push**: Avoid conflicts by staying up-to-date
5. **Use .gitignore**: Exclude build artifacts and temporary files
6. **Sign commits**: Use GPG signing for security in critical projects
7. **Review before merging**: Always review changes before integration
8. **Backup repositories**: Use remote repositories as backups
9. **Use descriptive branch names**: Feature branches should be descriptive
10. **Keep repository clean**: Regular maintenance improves performance

## Troubleshooting

### Common Issues
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Recover deleted branch
git reflog
git checkout -b recovered-branch <commit-hash>

# Fix untracked files
git clean -fd

# Resolve merge conflicts
git add resolved-files
git commit

# Fix detached HEAD
git checkout main
git merge <commit-hash>
```

### Performance Optimization
```bash
# Garbage collection
git gc --aggressive

# Check repository integrity
git fsck

# Pack loose objects
git repack -a -d

# Optimize repository size
git prune
```

The `git` command is a powerful and flexible version control system essential for modern software development. Mastering Git enables efficient collaboration, version tracking, and project management for software projects of any scale.