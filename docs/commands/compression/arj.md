---
title: arj Command
description: An archive manager for creating and managing .arj compressed files.
categories:
  - compression-archiving
tags:
  - compression
  - archive
  - arj
  - backup
toc: true
---

# arj Command

The `arj` command is an archive manager for creating and managing `.arj` format compressed files. ARJ (Archive by Robert Jung) was a popular compression format in the early 1990s.

## Syntax

```bash
arj [command] [options] <archive_name> [files...]
```

## Commands

| Command | Description |
|---------|-------------|
| `a` | Add files to archive |
| `c` | Comment archive |
| `d` | Delete files from archive |
| `e` | Extract files (without paths) |
| `f` | Freshen files in archive |
| `i` | Check integrity |
| `j` | Join archives |
| `l` | List archive contents |
| `m` | Move files to archive |
| `r` | Rename files in archive |
| `t` | Test archive integrity |
| `u` | Update files in archive |
| `v` | Verbose list archive contents |
| `x` | Extract files with paths |

## Common Options

| Option | Description |
|--------|-------------|
| `-g` | Garble files with password |
| `-m[0-4]` | Set compression method |
| `-p` | Set password |
| `-r` | Recurse subdirectories |
| `-v[ volumesize]` | Create volumes |
| `-y` | Assume yes for all queries |
| `-je` | Create self-extracting archive |

## Installation

### Ubuntu/Debian
```bash
sudo apt-get install arj
```

### CentOS/RHEL
```bash
sudo yum install arj
```

### Fedora
```bash
sudo dnf install arj
```

## Usage Examples

### Creating Archives

**Create a new archive:**
```bash
arj a archive.arj file1.txt file2.txt
```

**Create archive with subdirectories:**
```bash
arj a -r archive.arj /path/to/directory/
```

**Create password-protected archive:**
```bash
arj a -g archive.arj file1.txt
# You'll be prompted for password
```

### Extracting Archives

**Extract all files:**
```bash
arj x archive.arj
```

**Extract files without preserving directory structure:**
```bash
arj e archive.arj
```

**Extract with password:**
```bash
arj x -g archive.arj
# You'll be prompted for password
```

### Managing Archives

**List archive contents:**
```bash
arj l archive.arj
```

**Detailed list with paths:**
```bash
arj v archive.arj
```

**Test archive integrity:**
```bash
arj t archive.arj
```

**Delete files from archive:**
```bash
arj d archive.arj file1.txt
```

**Update files in archive:**
```bash
arj u archive.arj updated_file.txt
```

### Advanced Operations

**Create self-extracting archive:**
```bash
arj a -je archive.exe files/
```

**Create multi-volume archive:**
```bash
arj a -v1440k archive.arj large_file.dat
```

**Freshen existing archive (update newer files):**
```bash
arj f archive.arj
```

**Move files to archive (delete original):**
```bash
arj m archive.arj file.txt
```

## Compression Methods

| Method | Description |
|--------|-------------|
| `-m0` | No compression (store only) |
| `-m1` | Fastest compression |
| `-m2` | Good compression |
| `-m3` | Better compression |
| `-m4` | Best compression (slowest) |

## File Information Display

**Verbose output includes:**
- File name and size
- Date and time stamp
- Original size vs compressed size
- Compression ratio
- File attributes
- CRC value

## Limitations

- **Legacy format**: ARJ is a legacy format, not as widely supported as ZIP or 7z
- **File size limits**: Individual files limited to 2GB
- **Unicode support**: Limited Unicode filename support
- **Modern alternatives**: Consider using ZIP, 7z, or tar.gz for better compatibility

## Migration Tips

For new archives, consider using:
- **ZIP**: Maximum compatibility
- **7z**: Better compression ratio
- **tar.gz**: Standard Unix format
- **tar.xz**: Excellent compression for Unix systems

## Converting ARJ Archives

To convert ARJ to more modern formats:
```bash
# Extract ARJ
arj x old_archive.arj

# Create new archive in modern format
7z a new_archive.7z extracted_files/
```

---

*Content adapted from the linux-command project. Original content available at [https://github.com/jaywcjlove/linux-command](https://github.com/jaywcjlove/linux-command)*