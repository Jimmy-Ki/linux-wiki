---
title: lvreduce - Reduce logical volume
sidebar_label: lvreduce
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lvreduce - Reduce logical volume

The `lvreduce` command is a powerful LVM (Logical Volume Manager) utility that reduces the size of logical volumes, freeing up space that can be reallocated to other volumes or returned to the volume group. This command is essential for storage management, allowing administrators to shrink logical volumes when storage requirements change. LV reduction requires careful planning to ensure data integrity, as it typically involves shrinking the filesystem first, then reducing the logical volume. The command supports various reduction methods, automatic filesystem resizing, and provides safety checks to prevent data loss.

## Basic Syntax

```bash
lvreduce [OPTIONS] --size -Size[L|UNIT] LogicalVolume[Path]
lvreduce [OPTIONS] -L [-]Size[l|UNIT] LogicalVolume[Path]
lvreduce [OPTIONS] --extents -Number[PERCENT] LogicalVolume[Path]
```

## Common Options

### Size Specification
- `-L, --size [-]Size[l|UNIT]` - Reduce logical volume to specified size
- `-l, --extents [-]Number[PERCENT]` - Reduce by number of logical extents
- `--size` - Alternate form of -L option

### Filesystem Options
- `-r, --resizefs` - Resize underlying filesystem automatically
- `-n, --nofsck` - Don't perform filesystem check before reducing
- `-f, --force` - Force reduction without confirmation prompts

### Safety and Verification
- `--test` - Run in test mode, show what would be done
- `-v, --verbose` - Provide detailed output during operation
- `-y, --yes` - Answer yes to all prompts automatically

### Volume Group Options
- `--poolmetadatasize` - Specify size for thin pool metadata
- `--poolmetadataspare` - Enable/disable pool metadata spare

### General Options
- `-h, --help` - Display help information
- `-V, --version` - Show version information
- `--noudevsync` - Disable udev synchronization

## Usage Examples

### Basic Volume Reduction

#### Reducing by Size
```bash
# Reduce logical volume to 10GB
lvreduce -L 10G /dev/vg_name/lv_name

# Reduce by 5GB (subtractive)
lvreduce -L -5G /dev/vg_name/lv_name

# Reduce to 500MB
lvreduce -L 500M /dev/vg_name/lv_name

# Reduce to specific size in terabytes
lvreduce -L 2T /dev/vg_name/lv_name
```

#### Reducing by Extents
```bash
# Reduce by 100 logical extents
lvreduce -l -100 /dev/vg_name/lv_name

# Reduce to 500 extents
lvreduce -l 500 /dev/vg_name/lv_name

# Reduce by 25% of current size
lvreduce -l -25%LV /dev/vg_name/lv_name

# Reduce to 50% of original size
lvreduce -l 50%ORIGIN /dev/vg_name/lv_name
```

### Automatic Filesystem Reduction

#### Safe Filesystem Resize
```bash
# Reduce volume and filesystem together
lvreduce -r -L 5G /dev/vg_name/lv_name

# Reduce with automatic filesystem check
lvreduce -r -f -L 10G /dev/vg_name/lv_name

# Reduce ext4 filesystem with automatic resize
lvreduce -r -L 20G /dev/vg_name/data_volume

# Reduce XFS filesystem (requires different approach)
umount /dev/vg_name/lv_name
lvreduce -L 10G /dev/vg_name/lv_name
mkfs.xfs -f /dev/vg_name/lv_name
mount /dev/vg_name/lv_name /mountpoint
```

### Testing and Verification

#### Test Mode Operations
```bash
# Test reduction without making changes
lvreduce --test -L 10G /dev/vg_name/lv_name

# Test filesystem reduction
lvreduce --test -r -L 5G /dev/vg_name/lv_name

# Verbose test output
lvreduce --test -v -l -100 /dev/vg_name/lv_name
```

## Practical Examples

### System Administration

#### Storage Optimization
```bash
# Reclaim unused space from overprovisioned volumes
lvdisplay /dev/vg_name/lv_name  # Check current size
df -h /mountpoint              # Check filesystem usage
lvreduce -r -L 20G /dev/vg_name/lv_name  # Reduce safely

# Free up space for other volumes
lvreduce -L -50G /dev/vg_name/old_data
lvextend -L +50G /dev/vg_name/new_data

# Optimize thin pool sizes
lvreduce -L 100G /dev/vg_name/thinpool
```

#### Database Storage Management
```bash
# Reduce database volume after data cleanup
service mysql stop
lvreduce -r -L 200G /dev/vg_name/mysql_data
service mysql start

# Reduce temporary storage volumes
umount /dev/vg_name/temp_volume
lvreduce -L 50G /dev/vg_name/temp_volume
mkfs.ext4 /dev/vg_name/temp_volume
mount /dev/vg_name/temp_volume /mnt/temp
```

### Virtualization Management

#### Virtual Machine Volume Reduction
```bash
# Reduce VM disk after cleanup
virsh shutdown vm_name
lvreduce -r -L 100G /dev/vg_name/vm_disk
virsh start vm_name

# Reduce template volumes
lvreduce -L 30G /dev/vg_name/template_disk
virt-sparsify /dev/vg_name/template_disk /dev/vg_name/new_template
```

#### Container Storage Optimization
```bash
# Reduce Docker storage volume
docker stop $(docker ps -q)
lvreduce -r -L 500G /dev/vg_name/docker_data
docker start $(docker ps -a -q)

# Clean up and reduce container volumes
docker system prune -a
lvreduce -L 200G /dev/vg_name/containers
```

### Backup and Archive Management

#### Archive Volume Reduction
```bash
# Reduce backup volume after archiving old data
lvreduce -r -L 1T /dev/vg_name/backup_volume

# Reclaim space from compressed archives
lvreduce -L 500G /dev/vg_name/archive_storage
```

#### Log Management
```bash
# Reduce log volume after rotation
logrotate -f /etc/logrotate.conf
lvreduce -r -L 100G /dev/vg_name/log_volume

# Seasonal log storage reduction
lvreduce -L 50G /dev/vg_name/seasonal_logs
```

## Advanced Usage

### Thin Pool Management

#### Thin Pool Volume Reduction
```bash
# Reduce thin pool size
lvreduce -L 200G /dev/vg_name/thinpool

# Reduce thin pool metadata
lvreduce --poolmetadatasize 1G /dev/vg_name/thinpool

# Check thin pool usage before reduction
lvs -a -o +seg_monitor /dev/vg_name/thinpool
```

#### Snapshot Volume Management
```bash
# Reduce snapshot volume size
lvreduce -L 10G /dev/vg_name/snapshot_volume

# Merge snapshot and reduce
lvconvert --merge /dev/vg_name/snapshot_volume
lvreduce -L 50G /dev/vg_name/origin_volume
```

### Performance Optimization

#### Volume Alignment and Reduction
```bash
# Reduce with proper alignment
lvreduce -L 32G /dev/vg_name/aligned_volume

# Reduce for SSD optimization
lvreduce -L 64G /dev/vg_name/ssd_volume

# Verify reduction was successful
lvdisplay /dev/vg_name/lv_name
lvs /dev/vg_name/lv_name
```

### Automation Scripts

#### Volume Cleanup Script
```bash
#!/bin/bash
# Automatic volume cleanup script

VG_NAME="vg_data"
THRESHOLD=80

# Check volume usage
for LV in $(lvs --noheadings -o lv_name $VG_NAME); do
    USAGE=$(df -h "/dev/mapper/${VG_NAME}-${LV}" | awk 'NR==2 {print $5}' | sed 's/%//')

    if [ $USAGE -lt $THRESHOLD ]; then
        CURRENT_SIZE=$(lvs --noheadings --units g -o lv_size "/dev/$VG_NAME/$LV" | tr -d ' G')
        NEW_SIZE=$(echo "$CURRENT_SIZE * 0.8" | bc)

        echo "Reducing $LV from ${CURRENT_SIZE}G to ${NEW_SIZE}G"
        lvreduce -r -L "${NEW_SIZE}G" "/dev/$VG_NAME/$LV"
    fi
done
```

#### Volume Redistribution Script
```bash
#!/bin/bash
# Redistribute space between volumes

SOURCE_VG="vg_main"
TARGET_VG="vg_secondary"
SOURCE_LV="data_volume"
TARGET_LV="backup_volume"

# Calculate space to move
SPACE_TO_MOVE=100G

# Reduce source volume
lvreduce -r -L -$SPACE_TO_MOVE "/dev/$SOURCE_VG/$SOURCE_LV"

# Extend target volume
lvextend -L +$SPACE_TO_MOVE "/dev/$TARGET_VG/$TARGET_LV"
```

## Integration and Automation

### Shell Scripts

#### Automated Volume Management
```bash
#!/bin/bash
# Intelligent volume reduction based on usage patterns

check_and_reduce() {
    local vg=$1
    local lv=$2
    local threshold=$3

    local mount_point=$(findmnt -n -o TARGET "/dev/mapper/${vg}-${lv}" 2>/dev/null)
    if [ -z "$mount_point" ]; then
        echo "Volume /dev/$vg/$lv is not mounted"
        return 1
    fi

    local usage=$(df "$mount_point" | awk 'NR==2 {print $5}' | sed 's/%//')
    local current_size=$(lvs --noheadings --units g -o lv_size "/dev/$vg/$lv" | tr -d ' G')

    if [ "$usage" -lt "$threshold" ]; then
        local free_space=$(echo "scale=2; (100 - $usage) * $current_size / 100" | bc)
        local new_size=$(echo "$current_size - ($free_space / 2)" | bc)

        echo "Reducing /dev/$vg/$lv from ${current_size}G to ${new_size}G"
        lvreduce -r -v -L "${new_size}G" "/dev/$vg/$lv"

        if [ $? -eq 0 ]; then
            echo "Successfully reduced /dev/$vg/$lv"
            return 0
        else
            echo "Failed to reduce /dev/$vg/$lv"
            return 1
        fi
    else
        echo "Volume /dev/$vg/$lv usage is ${usage}%, skipping reduction"
        return 0
    fi
}

# Usage examples
check_and_reduce "vg_data" "archives" 30
check_and_reduce "vg_data" "logs" 40
```

#### Backup Before Reduction
```bash
#!/bin/bash
# Create backup before volume reduction

backup_and_reduce() {
    local vg=$1
    local lv=$2
    local new_size=$3
    local backup_dir="/backup/pre-reduction"

    mkdir -p "$backup_dir"

    # Create LVM snapshot
    local snapshot_name="${lv}_snap_$(date +%Y%m%d_%H%M%S)"
    lvcreate -L 10G -s -n "$snapshot_name" "/dev/$vg/$lv"

    if [ $? -eq 0 ]; then
        echo "Created snapshot: /dev/$vg/$snapshot_name"

        # Mount snapshot and backup critical data
        mkdir -p "/mnt/$snapshot_name"
        mount "/dev/$vg/$snapshot_name" "/mnt/$snapshot_name"

        # Backup configuration and critical files
        tar -czf "$backup_dir/${lv}_$(date +%Y%m%d_%H%M%S).tar.gz" \
            -C "/mnt/$snapshot_name" \
            --exclude='*.tmp' --exclude='*.log' --exclude='cache/*' \
            etc/ var/lib/ home/ 2>/dev/null

        umount "/mnt/$snapshot_name"
        rmdir "/mnt/$snapshot_name"

        # Perform the reduction
        lvreduce -r -L "$new_size" "/dev/$vg/$lv"

        if [ $? -eq 0 ]; then
            echo "Successfully reduced /dev/$vg/$lv, removing snapshot"
            lvremove -f "/dev/$vg/$snapshot_name"
        else
            echo "Reduction failed, keeping snapshot for recovery"
        fi
    else
        echo "Failed to create snapshot, proceeding without backup"
        lvreduce -r -L "$new_size" "/dev/$vg/$lv"
    fi
}
```

## Troubleshooting

### Common Issues

#### Filesystem Resize Failures
```bash
# Check filesystem before reduction
e2fsck -f /dev/vg_name/lv_name

# Manually resize filesystem
resize2fs /dev/vg_name/lv_name 10G

# Then reduce the logical volume
lvreduce -L 10G /dev/vg_name/lv_name

# For XFS filesystem (cannot reduce)
xfs_info /dev/vg_name/lv_name
# Must backup, recreate with smaller size, restore
```

#### Volume Group Space Issues
```bash
# Check volume group space
vgs vg_name

# Check available extents
vgdisplay vg_name | grep "Free"

# Ensure sufficient space exists
lvreduce -l -100 /dev/vg_name/lv_name
```

#### Locking and Mount Issues
```bash
# Ensure volume is not in use
lsof /dev/vg_name/lv_name
fuser -mv /dev/vg_name/lv_name

# Unmount if necessary
umount /dev/vg_name/lv_name

# Check for active processes
ps aux | grep vg_name
```

#### Corruption and Recovery
```bash
# Check volume group metadata
vgck vg_name

# Verify logical volume integrity
lvdisplay -v /dev/vg_name/lv_name

# Repair if necessary
vgreduce --removemissing vg_name
```

## Related Commands

- [`lvcreate`](/docs/commands/system-service/lvcreate) - Create logical volumes
- [`lvextend`](/docs/commands/system-service/lvextend) - Extend logical volumes
- [`lvremove`](/docs/commands/system-service/lvremove) - Remove logical volumes
- [`lvresize`](/docs/commands/system-service/lvresize) - Resize logical volumes
- [`lvdisplay`](/docs/commands/system-service/lvdisplay) - Display logical volume information
- [`lvscan`](/docs/commands/system-service/lvscan) - Scan for logical volumes
- [`vgcreate`](/docs/commands/system-service/vgcreate) - Create volume groups
- [`vgextend`](/docs/commands/system-service/vgextend) - Extend volume groups
- [`pvcreate`](/docs/commands/system-service/pvcreate) - Create physical volumes
- [`lvs`](/docs/commands/system-service/lvs) - Report logical volume information
- [`vgs`](/docs/commands/system-service/vgs) - Report volume group information
- [`pvs`](/docs/commands/system-service/pvs) - Report physical volume information

## Best Practices

1. **Always backup data** before reducing logical volumes
2. **Use `-r, --resizefs`** for automatic filesystem resizing
3. **Run in test mode** first with `--test` to preview changes
4. **Check filesystem health** with `fsck` before reduction
5. **Ensure sufficient free space** exists for the new size
6. **Unmount filesystems** when possible to prevent corruption
7. **Monitor system load** during reduction operations
8. **Document all changes** for audit and recovery purposes
9. **Use snapshots** as a safety net before major reductions
10. **Verify results** after reduction with `lvdisplay` and `df`

## Performance Tips

1. **Schedule reductions** during low-usage periods to minimize impact
2. **Use appropriate extent sizes** when creating volumes for efficient reduction
3. **Consider thin provisioning** for flexible size management
4. **Monitor I/O performance** during and after reductions
5. **Batch multiple reductions** to minimize system disruption
6. **Use appropriate block sizes** for optimal performance
7. **Plan reductions** carefully to avoid fragmentation
8. **Consider volume stripping** for better performance on large volumes
9. **Regularly defragment** filesystems before reduction
10. **Monitor system resources** to prevent overload during operations

The `lvreduce` command is a critical tool for storage management in Linux systems using LVM. When used properly with proper planning and safety precautions, it enables efficient storage utilization and flexible resource allocation. Always prioritize data safety and system stability when performing volume reduction operations.