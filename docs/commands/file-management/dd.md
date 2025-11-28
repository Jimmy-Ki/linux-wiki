---
title: dd - Data Duplicator and File Converter
sidebar_label: dd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dd - Data Duplicator and File Converter

The `dd` command is a powerful and versatile utility for converting and copying files at the block level. Operating at the lowest level of data transfer, `dd` performs raw, bit-for-bit duplication of data streams, making it an essential tool for system administrators, data recovery specialists, and storage management professionals. Unlike standard file copy commands, `dd` can work directly with block devices, making it ideal for creating exact disk images, backing up entire partitions or drives, performing data recovery operations, and testing storage device performance. The command's name stands for "data definition" and its flexibility allows for precise control over block sizes, data conversion, and error handling, making it indispensable for forensic analysis, system cloning, and low-level data manipulation tasks.

## Basic Syntax

```bash
dd [OPTIONS]
```

## Input and Output Options

### File Specifications
- `if=FILE` - Input file (default: stdin)
- `of=FILE` - Output file (default: stdout)
- `ibs=BYTES` - Read BYTES bytes at a time (default: 512)
- `obs=BYTES` - Write BYTES bytes at a time (default: 512)
- `bs=BYTES` - Read and write BYTES bytes at once (overrides ibs and obs)
- `cbs=BYTES` - Convert BYTES bytes at a time

### Data Control
- `count=BLOCKS` - Copy only BLOCKS blocks
- `skip=BLOCKS` - Skip BLOCKS blocks from input file
- `seek=BLOCKS` - Skip BLOCKS blocks from output file
- `conv=CONV` - Convert file format (comma-separated list)

## Conversion Options

### Character Set Conversion
- `ascii` - Convert EBCDIC to ASCII
- `ebcdic` - Convert ASCII to EBCDIC
- `ibm` - Convert ASCII to alternate EBCDIC

### Case Conversion
- `lcase` - Convert uppercase letters to lowercase
- `ucase` - Convert lowercase letters to uppercase

### Byte Manipulation
- `swab` - Swap every pair of input bytes
- `block` - Pad newline-terminated records to cbs-size
- `unblock` - Replace trailing spaces in cbs-size records with newline

### Error Handling
- `noerror` - Continue after read errors
- `notrunc` - Do not truncate output file
- `sync` - Pad every input block with NULs to ibs-size

### Additional Flags
- `fdatasync` - Physically write output file data before finishing
- `fsync` - Physically write output file data and metadata before finishing

## Performance and I/O Flags

### Input Flags (iflag)
- `direct` - Use direct I/O for data (bypass cache)
- `directory` - Fail unless a directory
- `dsync` - Use synchronized I/O for data
- `sync` - Use synchronized I/O for data and metadata
- `fullblock` - Accumulate full blocks of input
- `nonblock` - Use non-blocking I/O
- `noatime` - Do not update access time
- `noctty` - Do not assign controlling terminal from file
- `nofollow` - Do not follow symlinks
- `count_bytes` - Treat count=N as bytes

### Output Flags (oflag)
- `append` - Append mode (makes sense only for stdout)
- `direct` - Use direct I/O for data
- `dsync` - Use synchronized I/O for data
- `sync` - Use synchronized I/O for data and metadata
- `nonblock` - Use non-blocking I/O
- `noatime` - Do not update access time
- `noctty` - Do not assign controlling terminal from file
- `nofollow` - Do not follow symlinks
- `seek_bytes` - Treat seek=N as bytes

### Status Options
- `status=none` - Do not output the transfer status
- `status=noxfer` - Do not output the final transfer statistics
- `status=progress` - Show ongoing progress statistics

## Block Size Specifications

### Size Multipliers
- `c=1`, `w=2`, `b=512` (default)
- `kB=1000`, `K=1024`
- `MB=1000*1000`, `M=1024*1024`
- `GB=1000^3`, `G=1024^3`
- `TB`, `T`, `PB`, `P`, `EB`, `E`, `ZB`, `Z`, `YB`, `Y` (powers of 2 or 10)

### Examples
```bash
bs=1M      # 1 megabyte (1,048,576 bytes)
bs=4k      # 4 kilobytes (4,096 bytes)
bs=64K     # 64 kilobytes (65,536 bytes)
bs=1000    # 1000 bytes
bs=512b    # 512 blocks (512 * 512 = 262,144 bytes)
```

## Usage Examples

### Basic File Operations

#### Simple File Copying
```bash
# Copy a file (equivalent to cp)
dd if=input.txt of=output.txt

# Create a file with specific size filled with zeros
dd if=/dev/zero of=empty_file.img bs=1M count=100

# Create a file filled with random data
dd if=/dev/urandom of=random_file.bin bs=1M count=10

# Copy first 1MB of a file
dd if=large_file.bin of=first_mb.bin bs=1M count=1

# Skip first 512 bytes and copy next 1024 bytes
dd if=data.bin of=partial_data.bin bs=512 skip=1 count=2

# Copy from standard input to file
echo "Hello World" | dd of=output.txt
```

#### File Size and Performance Operations
```bash
# Create a 100MB file for testing
dd if=/dev/zero of=test_file bs=1M count=100

# Create file with exact size (using bytes)
dd if=/dev/zero of=exact_size.dat bs=1024 count=1024  # 1MB

# Create large sparse file (if supported by filesystem)
dd of=sparse_file bs=1 seek=10G count=0

# Copy with different block sizes
dd if=input.dat of=output.dat ibs=4096 obs=8192

# Test copy speed with timing
time dd if=/dev/zero of=speed_test bs=1M count=1000
```

### Disk and Partition Operations

#### Complete Disk Backup and Restore
```bash
# Backup entire disk to image file
dd if=/dev/sda of=/backup/disk_image.img bs=4M status=progress

# Backup with compression
dd if=/dev/sda bs=4M | gzip -c > /backup/disk_image.img.gz

# Backup specific partition
dd if=/dev/sda1 of=/backup/sda1_backup.img bs=4M status=progress

# Restore disk from image
dd if=/backup/disk_image.img of=/dev/sda bs=4M status=progress

# Restore from compressed backup
gunzip -c /backup/disk_image.img.gz | dd of=/dev/sda bs=4M status=progress

# Clone disk to disk (be extremely careful!)
dd if=/dev/sda of=/dev/sdb bs=4M status=progress

# Clone with verification
dd if=/dev/sda of=/dev/sdb bs=4M status=progress && \
echo "Clone completed successfully"
```

#### Boot Sector and Partition Table Operations
```bash
# Create backup of MBR (Master Boot Record)
dd if=/dev/sda of=mbr_backup.img bs=512 count=1

# Create backup of GPT header (first 34 sectors)
dd if=/dev/sda of=gpt_header.img bs=512 count=34

# Restore MBR from backup
dd if=mbr_backup.img of=/dev/sda bs=512 count=1

# Backup only partition table (first sector without bootloader)
dd if=/dev/sda of=partition_table.img bs=512 count=1 skip=1

# Wipe first 1MB of disk (removes partition table and bootloader)
dd if=/dev/zero of=/dev/sda bs=1M count=1

# Create backup of entire disk including empty space
dd if=/dev/sda of=full_disk_backup.img bs=4M conv=noerror,sync status=progress
```

### Data Recovery and Forensics

#### Error Handling and Recovery Operations
```bash
# Create disk image with error handling for damaged drives
dd if=/dev/sdb of=recovery_image.img bs=4M conv=noerror,sync status=progress

# Skip bad sectors and continue copying with smaller blocks
dd if=/dev/sdb of=partial_recovery.img bs=512 conv=noerror,sync status=progress

# Create sector-by-sector image for forensics with maximum error recovery
dd if=/dev/sda of=forensic_image.dd bs=512 conv=noerror,sync status=progress

# Create raw image with error logging
dd if=/dev/sdb of=recovery.img bs=4M conv=noerror,sync 2>recovery_errors.log

# Extract specific sector range from image
dd if=disk_image.img of=sector_extract.bin bs=512 skip=1000 count=100

# Create image from specific partition with error recovery
dd if=/dev/sda1 of=partition_recovery.img bs=4M conv=noerror,sync status=progress

# Multiple passes for stubborn bad sectors
dd if=/dev/sdb of=recovery_pass1.img bs=512 conv=noerror,sync skip=0
dd if=/dev/sdb of=recovery_pass2.img bs=1024 conv=noerror,sync skip=0
```

#### Advanced Forensic Techniques
```bash
# Create image with hash verification
dd if=/dev/sda of=evidence.dd bs=512 conv=noerror,sync && \
md5sum evidence.dd > evidence.dd.md5

# Compress forensic image with integrity preservation
dd if=/dev/sda bs=4M | pv -s $(blockdev --getsize64 /dev/sda) | \
gzip -c > forensic_image.dd.gz

# Split large forensic image into manageable chunks
dd if=/dev/sda bs=4M | split -b 4G - forensic_image.part

# Create image with multiple block sizes for different recovery scenarios
dd if=/dev/sdb of=image_512b.img bs=512 conv=noerror,sync
dd if=/dev/sdb of=image_4k.img bs=4k conv=noerror,sync
dd if=/dev/sdb of=image_1M.img bs=1M conv=noerror,sync

# Recover from specific physical sectors
dd if=/dev/sdb of=sector_range.img bs=512 skip=2048 count=1024 conv=noerror,sync
```

### Performance Testing

#### Basic Performance Benchmarks
```bash
# Test write speed with direct I/O
dd if=/dev/zero of=test_write.img bs=1G count=1 oflag=direct status=progress

# Test read speed with direct I/O
dd if=test_read.img of=/dev/null bs=1G iflag=direct status=progress

# Test both read and write speed with data sync
dd if=/dev/zero of=rw_test.img bs=1M count=1024 conv=fdatasync status=progress

# Test cached vs uncached performance
echo "Cached write:"
dd if=/dev/zero of=cached_test.img bs=1M count=1024

echo "Uncached write:"
dd if=/dev/zero of=uncached_test.img bs=1M count=1024 oflag=direct
```

#### Comprehensive Block Size Testing
```bash
# Test disk performance with different block sizes
for bs in 512 1k 4k 8k 16k 32k 64k 128k 256k 512k 1M 4M 8M; do
    echo "=== Testing block size: $bs ==="
    echo "Write test:"
    dd if=/dev/zero of=test_write_$bs bs=$bs count=1024 oflag=direct status=progress 2>&1 | \
        grep -E "copied|bytes|GB/s|MB/s"

    echo "Read test:"
    dd if=test_write_$bs of=/dev/null bs=$bs iflag=direct status=progress 2>&1 | \
        grep -E "copied|bytes|GB/s|MB/s"

    rm -f test_write_$bs
    echo ""
done
```

#### Sequential and Random Access Testing
```bash
# Sequential write test
echo "Sequential write test:"
dd if=/dev/zero of=sequential_test.img bs=1M count=1024 oflag=direct status=progress

# Random write test (simulated)
echo "Random write test:"
for i in {1..1024}; do
    dd if=/dev/zero of=random_test.img bs=1M seek=$i count=1 oflag=direct conv=notrunc 2>/dev/null
done

# Mixed read/write test
echo "Mixed read/write test:"
dd if=/dev/zero of=mixed_test.img bs=1M count=512 status=progress
dd if=mixed_test.img of=/dev/null bs=1M count=256 skip=256 status=progress

# Latency test with small blocks
echo "Latency test (small blocks):"
dd if=/dev/zero of=latency_test.img bs=4k count=65536 oflag=direct status=progress
```

### File System and Boot Operations

#### Disk Wiping and Security Operations
```bash
# Basic disk wipe with zeros
dd if=/dev/zero of=/dev/sda bs=1M status=progress

# Secure wipe with random data (better security)
dd if=/dev/urandom of=/dev/sda bs=1M status=progress

# Multi-pass secure wipe (DoD standard)
dd if=/dev/zero of=/dev/sda bs=1M status=progress
dd if=/dev/urandom of=/dev/sda bs=1M status=progress
dd if=/dev/zero of=/dev/sda bs=1M status=progress

# Quick wipe of first and last 1MB (removes partition table and metadata)
dd if=/dev/zero of=/dev/sda bs=1M count=1
dd if=/dev/zero of=/dev/sda bs=1M seek=$(($(blockdev --getsize64 /dev/sda) / 1048576 - 1))

# Wipe specific partition only
dd if=/dev/zero of=/dev/sda1 bs=1M status=progress
```

#### Bootable Media Creation
```bash
# Create bootable USB from ISO
dd if=ubuntu-22.04.iso of=/dev/sdb bs=4M status=progress conv=fdatasync

# Create bootable USB with progress and verification
dd if=fedora.iso of=/dev/sdc bs=4M status=progress conv=fdatasync && \
sync && \
echo "USB creation completed successfully"

# Create bootable USB from compressed image
gunzip -c archlinux.img.gz | dd of=/dev/sdb bs=4M status=progress

# Create bootable SD card for embedded systems
dd if=raspbian.img of=/dev/mmcblk0 bs=4M status=progress conv=fdatasync

# Verify USB checksum after writing
dd if=/dev/sdb bs=4M count=$(stat -c%s ubuntu-22.04.iso | awk '{print int($1/4194304)+1}') | \
md5sum
```

#### Swap File and Memory Management
```bash
# Create 4GB swap file
dd if=/dev/zero of=/swapfile bs=1G count=4 status=progress

# Set proper permissions and enable swap
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# Create large swap file for hibernation
dd if=/dev/zero of=/hibernation_swap bs=1G count=8 status=progress
chmod 600 /hibernation_swap
mkswap /hibernation_swap

# Create and activate multiple swap files
dd if=/dev/zero of=/swapfile1 bs=1G count=4 status=progress
dd if=/dev/zero of=/swapfile2 bs=1G count=2 status=progress
chmod 600 /swapfile*
mkswap /swapfile1
mkswap /swapfile2
swapon /swapfile1
swapon /swapfile2
```

#### Virtualization and Container Images
```bash
# Create blank disk image for virtualization
dd if=/dev/zero of=vm_disk.img bs=1G count=20 status=progress

# Create sparse disk image (saves space initially)
dd if=/dev/zero of=sparse_vm.img bs=1G seek=100 count=0

# Create disk image with partition table template
dd if=/dev/zero of=container.img bs=1G count=10 status=progress
echo "label: dos" | sfdisk container.img

# Create Docker-like layered image base
dd if=/dev/zero of=base_layer.img bs=1G count=5 status=progress
mkfs.ext4 base_layer.img
```

#### File System Testing and Development
```bash
# Create test filesystem for development
dd if=/dev/zero of=test_fs.img bs=1M count=100 status=progress
mkfs.ext4 test_fs.img
mkdir -p /mnt/test_fs
mount -o loop test_fs.img /mnt/test_fs

# Create filesystem with specific block size
dd if=/dev/zero of=custom_fs.img bs=4096 count=25600 status=progress
mkfs.ext4 -b 4096 custom_fs.img

# Test filesystem performance
dd if=/dev/zero of=fs_test.img bs=1M count=1000 status=progress
mkfs.ext4 fs_test.img
mount -o loop fs_test.img /mnt/test/
# Now run filesystem tests in /mnt/test/
```

### Data Conversion and Manipulation

#### Text Character Conversion
```bash
# Convert text to uppercase
dd if=input.txt of=upper.txt conv=ucase

# Convert text to lowercase
dd if=input.txt of=lower.txt conv=lcase

# Convert EBCDIC to ASCII (for mainframe data)
dd if=ebcdic_file.txt of=ascii_file.txt conv=ascii

# Convert ASCII to EBCDIC (for mainframe compatibility)
dd if=ascii_file.txt of=ebcdic_file.txt conv=ebcdic

# Convert ASCII to alternate EBCDIC (IBM format)
dd if=ascii_file.txt of=ibm_ebcdic.txt conv=ibm
```

#### Line Ending and Format Conversion
```bash
# Convert DOS line endings (CRLF) to Unix (LF)
dd if=dos_file.txt of=unix_file.txt conv=unblock cbs=80

# Convert Unix line endings to DOS format
dd if=unix_file.txt of=dos_file.txt conv=block cbs=80

# Remove carriage returns from text file
dd if=windows_file.txt of=unix_file.txt conv=block cbs=80

# Convert between different record formats
dd if=fixed_length.txt of=variable_length.txt conv=unblock cbs=132
```

#### Binary Data Manipulation
```bash
# Swap byte order (for little-endian to big-endian conversion)
dd if=little_endian.bin of=big_endian.bin conv=swab

# Create file with specific byte patterns
printf '\xDE\xAD\xBE\xEF' | dd of=pattern.bin

# Fill file with specific hex pattern
echo -ne '\xFF' | dd of=all_ff.bin bs=1 count=1 seek=1000 conv=notrunc

# Reverse byte order in binary data
dd if=data.bin of=reversed.bin conv=swab bs=2

# Create bootable image with custom bootloader
cat bootloader.bin | dd of=disk_image.img bs=512 count=1 conv=notrunc
```

#### Advanced Data Processing
```bash
# Extract every nth byte from file
dd if=data.bin of=sample.bin bs=1 skip=0 count=1
# Repeat with different skip values for sampling

# Merge multiple files into single stream
cat file1.bin file2.bin | dd of=combined.bin bs=1024

# Create interleaved data from multiple sources
paste <(dd if=file1.bin bs=1024) <(dd if=file2.bin bs=1024) | \
dd of=interleaved.bin

# Reverse file content byte by byte
dd if=input.bin of=reversed.bin bs=1 | \
tac | dd of=final_reversed.bin bs=1
```

## Advanced Usage

### Multiple Block Size Operations
```bash
# Copy with different input and output block sizes
dd if=source.img of=dest.img ibs=1M obs=4k status=progress

# Create compressed disk image
dd if=/dev/sda bs=4M status=progress | gzip > /backup/compressed_disk.img.gz

# Restore from compressed image
gzip -dc /backup/compressed_disk.img.gz | dd of=/dev/sda bs=4M status=progress

# Multi-stage processing with different block sizes
dd if=large_file.bin bs=1M | \
dd of=temp_file.bin bs=64k conv=notrunc | \
gzip -9 > final_compressed.gz

# Optimized copy for SSDs (align to erase block size)
dd if=/dev/sda of=/dev/sdb bs=4M conv=fdatasync status=progress

# Optimized copy for HDDs (larger blocks)
dd if=/dev/sda of=/dev/sdb bs=8M conv=fdatasync status=progress
```

### Progress Monitoring and Logging
```bash
# Show progress during operation (GNU dd)
dd if=/dev/sda of=backup.img bs=4M status=progress

# Monitor dd process from another terminal (traditional method)
while kill -USR1 $(pgrep ^dd$); do sleep 5; done

# Use pv for progress bar (requires pv package)
dd if=/dev/sda | pv -s $(blockdev --getsize64 /dev/sda) | dd of=backup.img

# Detailed logging with timestamps
dd if=/dev/sda of=backup.img bs=4M status=progress 2>&1 | \
ts '[%Y-%m-%d %H:%M:%S]' >> backup.log

# Monitor multiple dd processes
for pid in $(pgrep dd); do
    echo "Monitoring dd process $pid"
    while kill -USR0 $pid 2>/dev/null; do sleep 10; done
done
```

### Network Operations
```bash
# Send disk image over network
dd if=/dev/sda bs=4M status=progress | \
ssh backup-server "dd of=/backups/sda_backup.img bs=4M"

# Receive disk image over network
ssh backup-server "dd if=/backups/sda_backup.img bs=4M status=progress" | \
dd of=/dev/sda bs=4M

# Clone disk to remote machine with compression
dd if=/dev/sda bs=4M status=progress | \
gzip | ssh remote-host "gunzip | dd of=/dev/sdb bs=4M"

# Backup to network share with encryption
dd if=/dev/sda bs=4M status=progress | \
gpg -c - | ssh backup-server "cat > /backups/encrypted_backup.img.gpg"

# Multi-hop network transfer
dd if=/dev/sda bs=4M status=progress | \
ssh jump-server "ssh backup-server 'dd of=/backups/disk.img bs=4M'"

# Network backup with bandwidth limiting
dd if=/dev/sda bs=4M status=progress | \
pv -L 10m | ssh backup-server "dd of=/backups/limited_backup.img bs=4M"
```

## Practical Examples

### System Administration

#### Automated Backup Script
```bash
#!/bin/bash
# Automated disk backup script with verification

SOURCE_DISK="/dev/sda"
BACKUP_DIR="/backups/disk_images"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/disk_backup_$DATE.img"
LOG_FILE="/var/log/disk_backup.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1" >> "$LOG_FILE"
}

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Start backup
log_message "Starting disk backup of $SOURCE_DISK"

if dd if="$SOURCE_DISK" of="$BACKUP_FILE" bs=4M conv=noerror,sync status=progress 2>&1 | \
   tee -a "$LOG_FILE"; then

    log_message "Backup completed successfully: $BACKUP_FILE"

    # Calculate checksum for verification
    BACKUP_MD5=$(md5sum "$BACKUP_FILE" | cut -d' ' -f1)
    log_message "Backup MD5 checksum: $BACKUP_MD5"

    # Create backup metadata
    echo "Backup Details:" > "$BACKUP_FILE.info"
    echo "Source: $SOURCE_DISK" >> "$BACKUP_FILE.info"
    echo "Size: $(du -h "$BACKUP_FILE" | cut -f1)" >> "$BACKUP_FILE.info"
    echo "MD5: $BACKUP_MD5" >> "$BACKUP_FILE.info"
    echo "Date: $(date)" >> "$BACKUP_FILE.info"
    echo "Disk Model: $(hdparm -I "$SOURCE_DISK" | grep 'Model Number' | cut -d: -f2 | xargs)" >> "$BACKUP_FILE.info"

else
    log_message "ERROR: Backup failed"
    exit 1
fi
```

#### Incremental Backup Strategy
```bash
#!/bin/bash
# Incremental backup using dd and rsync

SOURCE="/dev/sda1"
MOUNT_POINT="/mnt/source"
BACKUP_BASE="/backups/incremental"
CURRENT_BACKUP="$BACKUP_BASE/current"
DATE=$(date +%Y%m%d_%H%M%S)

# Mount source partition
mount "$SOURCE" "$MOUNT_POINT"

# Create full backup if none exists
if [ ! -d "$CURRENT_BACKUP" ]; then
    echo "Creating full backup..."
    mkdir -p "$CURRENT_BACKUP"
    rsync -aAXv "$MOUNT_POINT/" "$CURRENT_BACKUP/"
else
    # Create incremental backup
    echo "Creating incremental backup..."
    LINK_DEST="--link-dest=$CURRENT_BACKUP"
    INCREMENTAL_BACKUP="$BACKUP_BASE/incremental_$DATE"
    mkdir -p "$INCREMENTAL_BACKUP"
    rsync -aAXv $LINK_DEST "$MOUNT_POINT/" "$INCREMENTAL_BACKUP/"
fi

# Create disk image backup
dd if="$SOURCE" of="$BACKUP_BASE/partition_$DATE.img" bs=4M conv=noerror,sync status=progress

umount "$MOUNT_POINT"
echo "Backup completed successfully"
```

## Real-World Scenarios

### Development Workflow

#### Container Image Management
```bash
#!/bin/bash
# Container base image creation with dd

IMAGE_NAME="app-base"
IMAGE_SIZE="2G"
IMAGE_FILE="${IMAGE_NAME}.img"

# Create base image
dd if=/dev/zero of="$IMAGE_FILE" bs=1G count=2 status=progress

# Format and setup
mkfs.ext4 "$IMAGE_FILE"
mkdir -p "/mnt/$IMAGE_NAME"
mount -o loop "$IMAGE_FILE" "/mnt/$IMAGE_NAME"

# Install base packages
debootstrap --variant=minbase focal "/mnt/$IMAGE_NAME"

# Configure chroot environment
chroot "/mnt/$IMAGE_NAME" /bin/bash << 'EOF'
apt-get update
apt-get install -y curl wget vim
useradd -m -s /bin/bash appuser
EOF

# Cleanup
umount "/mnt/$IMAGE_NAME"
echo "Base container image created: $IMAGE_FILE"
```

#### Application Testing Environment
```bash
#!/bin/bash
# Create isolated test environment

TEST_IMG="test_environment.img"
TEST_SIZE="5G"

# Create test disk image
dd if=/dev/zero of="$TEST_IMG" bs=1G count=5 status=progress

# Create partition table
echo -e "n\np\n1\n\n\nt\n83\nw" | fdisk "$TEST_IMG"

# Setup loop device
LOOP_DEV=$(losetup -f --show -P "$TEST_IMG")
mkfs.ext4 "${LOOP_DEV}p1"

# Mount and configure
mkdir -p /mnt/test_env
mount "${LOOP_DEV}p1" /mnt/test_env

# Install test dependencies
cp -r /app/source /mnt/test_env/
chroot /mnt/test_env /app/source/scripts/setup_test.sh

# Cleanup
umount /mnt/test_env
losetup -d "$LOOP_DEV"

echo "Test environment prepared: $TEST_IMG"
```

## Practical Examples

### Automated Backup Script
```bash
#!/bin/bash
# Automated disk backup script with verification

SOURCE_DISK="/dev/sda"
BACKUP_DIR="/backups/disk_images"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/disk_backup_$DATE.img"
LOG_FILE="/var/log/disk_backup.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1" >> "$LOG_FILE"
}

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Start backup
log_message "Starting disk backup of $SOURCE_DISK"

if dd if="$SOURCE_DISK" of="$BACKUP_FILE" bs=4M conv=noerror,sync status=progress 2>&1 | \
   tee -a "$LOG_FILE"; then

    log_message "Backup completed successfully: $BACKUP_FILE"

    # Calculate checksum for verification
    BACKUP_MD5=$(md5sum "$BACKUP_FILE" | cut -d' ' -f1)
    log_message "Backup MD5 checksum: $BACKUP_MD5"

    # Create backup metadata
    echo "Backup Details:" > "$BACKUP_FILE.info"
    echo "Source: $SOURCE_DISK" >> "$BACKUP_FILE.info"
    echo "Size: $(du -h "$BACKUP_FILE" | cut -f1)" >> "$BACKUP_FILE.info"
    echo "MD5: $BACKUP_MD5" >> "$BACKUP_FILE.info"
    echo "Date: $(date)" >> "$BACKUP_FILE.info"
    echo "Disk Model: $(hdparm -I "$SOURCE_DISK" | grep 'Model Number' | cut -d: -f2 | xargs)" >> "$BACKUP_FILE.info"

else
    log_message "ERROR: Backup failed"
    exit 1
fi
```

### Disk Wiping Script
```bash
#!/bin/bash
# Secure disk wiping with multiple passes

DISK="$1"
PASSES=3

if [ -z "$DISK" ]; then
    echo "Usage: $0 <disk_device>"
    echo "Example: $0 /dev/sda"
    exit 1
fi

# Verify disk existence
if [ ! -b "$DISK" ]; then
    echo "Error: $DISK is not a block device"
    exit 1
fi

echo "WARNING: This will completely erase $DISK"
echo "All data will be permanently lost"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Operation cancelled"
    exit 0
fi

# Multiple pass wiping
for ((i=1; i<=PASSES; i++)); do
    echo "Pass $i of $PASSES - Wiping with zeros..."
    dd if=/dev/zero of="$DISK" bs=1M status=progress

    if [ $i -lt $PASSES ]; then
        echo "Pass $i completed. Starting next pass..."
    fi
done

# Final pass with random data for better security
echo "Final pass - Wiping with random data..."
dd if=/dev/urandom of="$DISK" bs=1M status=progress

echo "Disk wiping completed successfully"
```

### Bootable USB Creation Script
```bash
#!/bin/bash
# Create bootable USB from ISO file

ISO_FILE="$1"
USB_DEVICE="$2"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <iso_file> <usb_device>"
    echo "Example: $0 ubuntu.iso /dev/sdb"
    exit 1
fi

# Verify ISO file exists
if [ ! -f "$ISO_FILE" ]; then
    echo "Error: ISO file $ISO_FILE not found"
    exit 1
fi

# Verify USB device exists
if [ ! -b "$USB_DEVICE" ]; then
    echo "Error: USB device $USB_DEVICE not found"
    exit 1
fi

echo "Creating bootable USB from $ISO_FILE to $USB_DEVICE"
echo "This will erase all data on $USB_DEVICE"
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Operation cancelled"
    exit 0
fi

# Unmount USB device if mounted
umount "$USB_DEVICE"* 2>/dev/null

# Write ISO to USB
dd if="$ISO_FILE" of="$USB_DEVICE" bs=4M status=progress conv=fdatasync

# Sync filesystem
sync

echo "Bootable USB creation completed successfully"
echo "You can now use $USB_DEVICE to boot from"
```

### Performance Testing Suite
```bash
#!/bin/bash
# Comprehensive disk performance testing

TEST_FILE="dd_perf_test"
TEST_SIZES=("1M" "10M" "100M" "1G")
TEST_BLOCK_SIZES=("4k" "8k" "16k" "32k" "64k" "128k" "256k" "512k" "1M" "4M")

echo "Disk Performance Testing Suite"
echo "================================"

# Test different file sizes
echo -e "\nTesting different file sizes (1M block size):"
for size in "${TEST_SIZES[@]}"; do
    echo -e "\nFile size: $size"
    echo "Write speed:"
    dd if=/dev/zero of="$TEST_FILE" bs=1M count="${size%M}" oflag=direct 2>&1 | \
        grep -E "copied|bytes" | tail -1

    echo "Read speed:"
    dd if="$TEST_FILE" of=/dev/null bs=1M iflag=direct 2>&1 | \
        grep -E "copied|bytes" | tail -1

    rm -f "$TEST_FILE"
done

# Test different block sizes
echo -e "\n\nTesting different block sizes (100M file):"
for bs in "${TEST_BLOCK_SIZES[@]}"; do
    echo -e "\nBlock size: $bs"
    echo "Write speed:"
    dd if=/dev/zero of="$TEST_FILE" bs="$bs" count=100M oflag=direct 2>&1 | \
        grep -E "copied|bytes" | tail -1

    echo "Read speed:"
    dd if="$TEST_FILE" of=/dev/null bs="$bs" iflag=direct 2>&1 | \
        grep -E "copied|bytes" | tail -1

    rm -f "$TEST_FILE"
done

# Test sequential vs random access
echo -e "\n\nSequential vs Random Access Test:"
echo "Sequential write:"
dd if=/dev/zero of="$TEST_FILE" bs=1M count=100 oflag=direct 2>&1 | \
    grep -E "copied|bytes" | tail -1

echo "Random write simulation:"
for i in {1..100}; do
    dd if=/dev/zero of="$TEST_FILE" bs=1M seek=$i count=1 oflag=direct conv=notrunc 2>/dev/null
done

rm -f "$TEST_FILE"
echo -e "\nPerformance testing completed"
```

## Real-World Scenarios

### Emergency System Recovery
```bash
#!/bin/bash
# Emergency system recovery using dd

RECOVERY_IMAGE="/backup/system_recovery.img"
TARGET_DISK="/dev/sda"

echo "Emergency System Recovery"
echo "========================="
echo "This will restore the entire system from backup"
echo "Target disk: $TARGET_DISK"
echo "Backup image: $RECOVERY_IMAGE"

# Safety checks
if [ ! -f "$RECOVERY_IMAGE" ]; then
    echo "Error: Recovery image not found"
    exit 1
fi

if [ ! -b "$TARGET_DISK" ]; then
    echo "Error: Target disk not found"
    exit 1
fi

echo -e "\nDisk information:"
lsblk "$TARGET_DISK"

echo -e "\nLast chance! This will erase all data on $TARGET_DISK"
read -p "Type 'RECOVER' to proceed: " confirm

if [ "$confirm" != "RECOVER" ]; then
    echo "Recovery cancelled"
    exit 0
fi

# Perform recovery
echo "Starting system recovery..."
dd if="$RECOVERY_IMAGE" of="$TARGET_DISK" bs=4M status=progress conv=noerror,sync

# Sync filesystem
sync

echo "System recovery completed. Reboot the system."
```

### Virtual Machine Management
```bash
#!/bin/bash
# VM disk image management with dd

VM_NAME="webserver"
VM_DISK_SIZE="20G"
VM_DISK_PATH="/var/lib/libvirt/images/${VM_NAME}.img"

# Create new VM disk
create_vm_disk() {
    echo "Creating $VM_DISK_SIZE disk image for $VM_NAME..."
    dd if=/dev/zero of="$VM_DISK_PATH" bs=1G count=20 status=progress
    sync
    echo "Disk image created: $VM_DISK_PATH"
}

# Clone VM disk
clone_vm_disk() {
    local source_vm="$1"
    local clone_vm="$2"
    local source_img="/var/lib/libvirt/images/${source_vm}.img"
    local clone_img="/var/lib/libvirt/images/${clone_vm}.img"

    if [ ! -f "$source_img" ]; then
        echo "Error: Source VM disk not found"
        return 1
    fi

    echo "Cloning $source_vm to $clone_vm..."
    dd if="$source_img" of="$clone_img" bs=4M status=progress conv=fsync
    echo "Clone completed: $clone_img"
}

# Resize VM disk
resize_vm_disk() {
    local vm_name="$1"
    local new_size="$2"
    local vm_img="/var/lib/libvirt/images/${vm_name}.img"

    if [ ! -f "$vm_img" ]; then
        echo "Error: VM disk not found"
        return 1
    fi

    echo "Resizing $vm_name disk to $new_size..."
    # Remove dd-based approach in favor of qemu-img for disk resizing
    # dd method kept for demonstration:
    dd if=/dev/zero of="$vm_img" bs=1G count="$new_size" oflag=append conv=notrunc
    sync
    echo "Disk resized to $new_size"
}

# Example usage
create_vm_disk
clone_vm_disk "webserver" "webserver-test"
```

## Block Size Reference

### Common Block Sizes and Their Uses

| Block Size | Use Case | Performance Impact |
|------------|----------|-------------------|
| 512 bytes | Default, compatibility | Slower for large files |
| 4 KB | Standard page size | Good balance |
| 8-16 KB | Small files | Better for small files |
| 64-128 KB | Medium files | Good general purpose |
| 1 MB | Large files, tapes | Faster for large transfers |
| 4 MB | Modern disks, ISOs | Optimal for many systems |

### Performance Considerations

```bash
# Optimal block size for SSDs (usually 4M)
dd if=/dev/sda of=/backup/ssd.img bs=4M

# For spinning disks (often 1M)
dd if=/dev/sda of=/backup/hdd.img bs=1M

# For tape drives (often 64K)
dd if=/dev/st0 of=tape_backup.img bs=64k

# For network transfers (smaller blocks)
dd if=/dev/sda | ssh backup "dd of=backup.img bs=1M"
```

## Troubleshooting

### Common Issues and Solutions

#### Permission and Access Problems
```bash
# Permission denied when accessing block devices
# Solution: Use sudo or proper permissions
sudo dd if=/dev/sda of=backup.img bs=4M status=progress

# Check device permissions
ls -l /dev/sda*

# Add user to disk group for persistent access
sudo usermod -a -G disk $USER
```

#### Performance Issues
```bash
# Slow copy operations
# Solution: Adjust block size and use direct I/O
dd if=/dev/sda of=backup.img bs=4M oflag=direct status=progress

# Cache flush issues
# Solution: Use proper sync flags
dd if=/dev/sda of=backup.img bs=4M conv=fdatasync status=progress

# Memory exhaustion with large files
# Solution: Use smaller block sizes
dd if=large_file.dat of=copy.dat bs=64K status=progress
```

#### Disk Space Issues
```bash
# Insufficient space for copy operation
# Solution: Check available space first
df -h /destination/path

# Compress during copy to save space
dd if=/dev/sda bs=4M status=progress | gzip -1 > compressed_backup.img.gz

# Split large files into chunks
dd if=/dev/sda bs=4M status=progress | split -b 2G - backup_chunk_
```

#### Error Handling
```bash
# Read errors on damaged media
# Solution: Use error recovery options
dd if=/dev/damaged of=recovery.img bs=512 conv=noerror,sync status=progress

# Write errors on destination
# Solution: Check destination integrity
dd if=/dev/sda of=test_file bs=1M count=1 && echo "Destination OK"

# Partial copy due to errors
# Solution: Resume from last known position
dd if=/dev/sda of=partial.img bs=4M skip=1000 status=progress

# Monitor for errors during operation
dd if=/dev/sda of=backup.img bs=4M conv=noerror,sync status=progress 2>error.log
```

### Performance Optimization

#### Block Size Tuning
```bash
# Function to find optimal block size
test_block_sizes() {
    local source="$1"
    local sizes=(512 1k 2k 4k 8k 16k 32k 64k 128k 256k 512k 1M 2M 4M 8M)

    echo "Testing block sizes for $source"

    for bs in "${sizes[@]}"; do
        echo -n "Block size $bs: "
        dd if="$source" of=/dev/null bs="$bs" count=1000 2>&1 | \
            grep -E "copied|bytes" | tail -1
    done
}

# Test optimal block size for SSD
test_block_sizes /dev/sda

# Test optimal block size for HDD
test_block_sizes /dev/sdb
```

#### System Resource Management
```bash
# Monitor system resources during dd operation
# Use ionice to prioritize I/O
ionice -c 1 -n 7 dd if=/dev/sda of=backup.img bs=4M status=progress

# Use nice to limit CPU usage
nice -n 19 dd if=/dev/sda of=backup.img bs=4M status=progress

# Limit memory usage
dd if=/dev/sda of=backup.img bs=64K status=progress

# Combine I/O and CPU limiting
ionice -c 3 nice -n 19 dd if=/dev/sda of=backup.img bs=4M status=progress
```

## Safety Considerations

### Preventing Data Loss
```bash
# Always use dry-run with echo to verify command before execution
echo "dd if=/dev/sda of=/dev/sdb bs=4M"  # Check command first

# Use confirmation prompts for destructive operations
read -p "This will overwrite /dev/sdb. Continue? (y/N): " confirm
if [ "$confirm" = "y" ]; then
    dd if=/dev/sda of=/dev/sdb bs=4M
fi

# Use dd_rescue for better error handling
dd_rescue /dev/sda /backup/image.dd

# Use pv to monitor progress and control flow
dd if=/dev/sda | pv -s $(blockdev --getsize64 /dev/sda) | dd of=/backup/image.dd
```

### Verification Commands
```bash
# Compare source and destination
cmp -l /dev/sda /backup/image.dd

# Generate checksums for verification
md5sum /backup/image.dd > backup.md5
sha256sum /backup/image.dd > backup.sha256

# Verify checksum after operation
md5sum -c backup.md5

# Compare with progress
dd if=/dev/sda of=test_copy.img bs=4M status=progress && \
cmp /dev/sda test_copy.img && echo "Copy verified successfully"
```

## Block Size Reference

### Common Block Sizes and Their Uses

| Block Size | Use Case | Performance Impact |
|------------|----------|-------------------|
| 512 bytes | Default, compatibility | Slower for large files |
| 4 KB | Standard page size | Good balance |
| 8-16 KB | Small files | Better for small files |
| 64-128 KB | Medium files | Good general purpose |
| 1 MB | Large files, tapes | Faster for large transfers |
| 4 MB | Modern disks, ISOs | Optimal for many systems |

### Performance Considerations

```bash
# Optimal block size for SSDs (usually 4M)
dd if=/dev/sda of=/backup/ssd.img bs=4M status=progress

# For spinning disks (often 1M)
dd if=/dev/sda of=/backup/hdd.img bs=1M status=progress

# For tape drives (often 64K)
dd if=/dev/st0 of=tape_backup.img bs=64k status=progress

# For network transfers (smaller blocks)
dd if=/dev/sda bs=4M status=progress | ssh backup "dd of=backup.img bs=1M"
```

## Related Commands

- [`pv`](/docs/commands/system-monitoring/pv) - Pipe viewer for monitoring data flow
- [`md5sum`](/docs/commands/system-info/md5sum) - Compute and check MD5 message digest
- [`sha256sum`](/docs/commands/system-info/sha256sum) - Compute and check SHA256 message digest
- [`hdparm`](/docs/commands/hardware/hdparm) - Get/set SATA device parameters
- [`fdisk`](/docs/commands/disk-management/fdisk) - Manipulate disk partition table
- [`parted`](/docs/commands/disk-management/parted) - Create and manipulate partition tables
- [`rsync`](/docs/commands/file-management/rsync) - Remote file copy tool
- [`cp`](/docs/commands/file-management/cp) - Copy files and directories
- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`split`](/docs/commands/file-management/split) - Split a file into pieces

## Best Practices

1. **Double-check source and destination** - dd doesn't ask for confirmation and can overwrite data permanently
2. **Use appropriate block sizes** - 4M is generally optimal for modern storage devices
3. **Include progress monitoring** - Use `status=progress` for long operations to track completion
4. **Handle errors gracefully** - Use `conv=noerror,sync` for damaged media to continue reading past bad sectors
5. **Verify backups** - Always checksum and verify critical backups after completion
6. **Test restore procedures** - Regularly verify you can restore from backups to ensure they're valid
7. **Use compression for network transfers** - Pipe through gzip for bandwidth efficiency
8. **Document operations** - Keep logs of dd operations for audit trails and troubleshooting
9. **Consider safety tools** - Use dd_rescue for data recovery scenarios instead of standard dd
10. **Monitor system resources** - dd can be I/O intensive, schedule operations during low-usage periods

## Performance Tips

1. **Direct I/O for raw device access** - Use `oflag=direct` and `iflag=direct` to bypass OS cache
2. **Block size optimization** - Test different block sizes (1M-8M) to find optimal performance for your hardware
3. **Parallel operations** - Use multiple dd processes for independent disk regions when possible
4. **CPU and I/O scheduling** - Use `ionice` and `nice` to prioritize dd operations appropriately
5. **Memory considerations** - Larger block sizes use more memory but improve throughput
6. **Network transfers** - Use compression and appropriate block sizes for network bandwidth optimization
7. **SSD optimization** - Align writes to SSD erase blocks (typically 4MB) for optimal performance
8. **RAID considerations** - Match block size to RAID stripe size for optimal performance

The `dd` command is a powerful but potentially dangerous tool that requires careful use. When used properly, it's invaluable for creating exact disk images, performing data recovery, and managing storage at the block level. Always exercise caution and verify commands before execution to prevent accidental data loss.