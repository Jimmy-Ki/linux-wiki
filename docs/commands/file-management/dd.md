---
title: dd - Data Duplicator and File Converter
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dd - Data Duplicator and File Converter

The `dd` command is a powerful utility for converting and copying files at the block level. It's commonly used for creating exact disk images, backing up entire partitions or drives, performing data recovery, and testing storage devices. Unlike standard copy commands, `dd` operates at a low level, making it ideal for bit-for-bit duplication and working with raw devices.

## Basic Syntax

```bash
dd [OPTIONS]
```

## Common Options

### Input and Output
- `if=FILE` - Input file (default: stdin)
- `of=FILE` - Output file (default: stdout)
- `ibs=BYTES` - Read BYTES bytes at a time (default: 512)
- `obs=BYTES` - Write BYTES bytes at a time (default: 512)
- `bs=BYTES` - Read and write BYTES bytes at once (overrides ibs and obs)
- `cbs=BYTES` - Convert BYTES bytes at a time

### Data Processing
- `count=BLOCKS` - Copy only BLOCKS blocks
- `skip=BLOCKS` - Skip BLOCKS blocks from input file
- `seek=BLOCKS` - Skip BLOCKS blocks from output file
- `conv=CONV` - Convert file format (see conversion options)

### Conversion Options
- `ascii` - Convert EBCDIC to ASCII
- `ebcdic` - Convert ASCII to EBCDIC
- `ibm` - Convert ASCII to alternate EBCDIC
- `block` - Pad newline-terminated records to cbs-size
- `unblock` - Replace trailing spaces in cbs-size records with newline
- `lcase` - Convert uppercase letters to lowercase
- `ucase` - Convert lowercase letters to uppercase
- `swab` - Swap every pair of input bytes
- `noerror` - Continue after read errors
- `notrunc` - Do not truncate output file
- `sync` - Pad every input block with NULs to ibs-size

### Performance Flags
- `iflag=FLAG` - Access input file with FLAG (can be repeated)
- `oflag=FLAG` - Access output file with FLAG (can be repeated)
- `status=LEVEL` - Level of information to stderr (none, noxfer, progress)

## Usage Examples

### Basic File Operations
```bash
# Copy a file
dd if=input.txt of=output.txt

# Create a file with specific size filled with zeros
dd if=/dev/zero of=empty_file.img bs=1M count=100

# Copy first 1MB of a file
dd if=large_file.bin of=first_mb.bin bs=1M count=1

# Skip first 512 bytes and copy next 1024 bytes
dd if=data.bin of=partial_data.bin bs=512 skip=1 count=2
```

### Disk and Partition Operations
```bash
# Backup entire disk to image file
dd if=/dev/sda of=/backup/disk_image.img bs=4M

# Backup specific partition
dd if=/dev/sda1 of=/backup/sda1_backup.img bs=4M

# Restore disk from image
dd if=/backup/disk_image.img of=/dev/sda bs=4M

# Clone disk to disk (be extremely careful!)
dd if=/dev/sda of=/dev/sdb bs=4M

# Create backup of MBR (Master Boot Record)
dd if=/dev/sda of=mbr_backup.img bs=512 count=1

# Restore MBR from backup
dd if=mbr_backup.img of=/dev/sda bs=512 count=1
```

### Data Recovery and Forensics
```bash
# Create disk image with error handling for damaged drives
dd if=/dev/sdb of=recovery_image.img bs=4M conv=noerror,sync

# Skip bad sectors and continue copying
dd if=/dev/sdb of=partial_recovery.img bs=512 conv=noerror,sync

# Create sector-by-sector image for forensics
dd if=/dev/sda of=forensic_image.dd bs=512 conv=noerror,sync

# Extract specific sector range
dd if=disk_image.img of=sector_extract.bin bs=512 skip=1000 count=100
```

### Performance Testing
```bash
# Test write speed
dd if=/dev/zero of=test_write.img bs=1G count=1 oflag=direct

# Test read speed
dd if=test_read.img of=/dev/null bs=1G iflag=direct

# Test both read and write speed
dd if=/dev/zero of=rw_test.img bs=1M count=1024 conv=fdatasync

# Test disk performance with different block sizes
for bs in 512 1k 4k 8k 16k 32k 64k 128k 256k 512k 1M; do
    echo "Testing with block size: $bs"
    dd if=/dev/zero of=test_$bs bs=$bs count=1024 oflag=direct 2>&1 | grep -E "copied|bytes"
done
```

### File System and Boot Operations
```bash
# Wipe disk securely with zeros
dd if=/dev/zero of=/dev/sda bs=1M

# Wipe disk with random data (better security)
dd if=/dev/urandom of=/dev/sda bs=1M

# Create bootable USB from ISO
dd if=ubuntu-22.04.iso of=/dev/sdb bs=4M status=progress

# Create swap file
dd if=/dev/zero of=/swapfile bs=1G count=4
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# Create blank disk image for virtualization
dd if=/dev/zero of=vm_disk.img bs=1G count=20
```

### Data Conversion and Manipulation
```bash
# Convert text to uppercase
dd if=input.txt of=upper.txt conv=ucase

# Convert text to lowercase
dd if=input.txt of=lower.txt conv=lcase

# Convert DOS line endings to Unix
dd if=dos_file.txt of=unix_file.txt conv=unblock

# Convert Unix line endings to DOS
dd if=unix_file.txt of=dos_file.txt conv=block

# Swap byte order (for little-endian to big-endian conversion)
dd if=little_endian.bin of=big_endian.bin conv=swab
```

## Advanced Usage

### Multiple Block Size Operations
```bash
# Copy with different input and output block sizes
dd if=source.img of=dest.img ibs=1M obs=4k

# Create compressed disk image
dd if=/dev/sda bs=4M | gzip > /backup/compressed_disk.img.gz

# Restore from compressed image
gzip -dc /backup/compressed_disk.img.gz | dd of=/dev/sda bs=4M
```

### Progress Monitoring
```bash
# Show progress during operation (GNU dd)
dd if=/dev/sda of=backup.img bs=4M status=progress

# Monitor dd process from another terminal
while kill -USR1 $(pgrep ^dd$); do sleep 5; done

# Use pv for progress bar (requires pv package)
dd if=/dev/sda | pv -s $(blockdev --getsize64 /dev/sda) | dd of=backup.img
```

### Network Operations
```bash
# Send disk image over network
dd if=/dev/sda bs=4M | ssh backup-server "dd of=/backups/sda_backup.img"

# Receive disk image over network
ssh backup-server "dd if=/backups/sda_backup.img bs=4M" | dd of=/dev/sda

# Clone disk to remote machine
dd if=/dev/sda bs=4M | ssh remote-host "dd of=/dev/sdb bs=4M"

# Compress during network transfer
dd if=/dev/sda bs=4M | gzip | ssh backup-server "gunzip | dd of=/backups/disk.img"
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

## Safety Considerations

### Preventing Data Loss
```bash
# Always use dry-run with echo to verify command before execution
echo "dd if=/dev/sda of=/dev/sdb bs=4M"  # Check command first

# Use dd_rescue for better error handling
dd_rescue /dev/sda /backup/image.dd

# Use pv to monitor progress
dd if=/dev/sda | pv | dd of=/backup/image.dd
```

### Verification Commands
```bash
# Compare source and destination
cmp -l /dev/sda /backup/image.dd

# Generate checksums
md5sum /backup/image.dd > backup.md5
sha256sum /backup/image.dd > backup.sha256

# Verify checksum
md5sum -c backup.md5
```

## Related Commands

- [`pv`](/docs/commands/system-monitoring/pv) - Pipe viewer for monitoring data flow
- [`md5sum`](/docs/commands/system-info/md5sum) - Compute and check MD5 message digest
- [`sha256sum`](/docs/commands/system-info/sha256sum) - Compute and check SHA256 message digest
- [`hdparm`](/docs/commands/hardware/hdparm) - Get/set SATA device parameters
- [`fdisk`](/docs/commands/disk-management/fdisk) - Manipulate disk partition table
- [`parted`](/docs/commands/disk-management/parted) - Create and manipulate partition tables

## Best Practices

1. **Double-check source and destination** - dd doesn't ask for confirmation
2. **Use appropriate block sizes** - 4M is generally optimal for modern storage
3. **Include progress monitoring** - Use `status=progress` for long operations
4. **Handle errors gracefully** - Use `conv=noerror,sync` for damaged media
5. **Verify backups** - Always checksum and verify critical backups
6. **Test restore procedures** - Verify you can restore from backups regularly
7. **Use compression for network transfers** - Pipe through gzip for bandwidth efficiency
8. **Document operations** - Keep logs of dd operations for audit trails
9. **Consider safety tools** - Use dd_rescue for data recovery scenarios
10. **Monitor system resources** - dd can be I/O intensive, schedule accordingly

The `dd` command is a powerful but potentially dangerous tool that requires careful use. When used properly, it's invaluable for creating exact disk images, performing data recovery, and managing storage at the block level. Always exercise caution and verify commands before execution to prevent accidental data loss.