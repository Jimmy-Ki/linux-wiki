---
title: lvresize - Resize logical volume
sidebar_label: lvresize
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lvresize - Resize logical volume

The `lvresize` command is a powerful LVM (Logical Volume Manager) utility that allows administrators to resize logical volumes dynamically without requiring system downtime. It provides flexible storage management by enabling both expansion and reduction of logical volumes, supporting various sizing specifications, and offering options for automatic filesystem resizing. This tool is essential for storage administrators who need to adapt storage allocations to changing requirements, optimize disk space utilization, and maintain system availability during storage operations.

## Basic Syntax

```bash
lvresize [OPTIONS] LogicalVolume[Path] [PhysicalVolumePath...]
lvresize [OPTIONS] -l [+|-]LogicalExtentsNumber LogicalVolume[Path]
lvresize [OPTIONS] -L [+|-]Size[Units] LogicalVolume[Path]
```

## Common Options

### Sizing Options
- `-L, --size Size[Units]` - Set or change logical volume size
- `-l, --extents [+|-]Number[%{VG|PVS|FREE|ORIGIN}]` - Set or change number of logical extents
- `--sizeopt [+|-]Number[%{VG|PVS|FREE|ORIGIN}]` - Advanced size options

### Resize Type Options
- `--resizefs` - Resize filesystem together with logical volume
- `--alloc AllocationPolicy` - Allocation policy (contiguous, cling, inherit, normal, anywhere)
- `--type SegmentType` - Volume segment type

### Reporting Options
- `-r, --resizefs` - Resize underlying filesystem automatically
- `-n, --nofsck` - Don't perform filesystem checks
- `--noudevsync` - Disable udev synchronization

### Verification Options
- `--test` - Test run without making changes
- `-d, --debug` - Enable debug output
- `-v, --verbose` - Provide verbose output
- `-y, --yes` - Answer yes to all prompts

### Physical Volume Options
- `--mirrors Mirrors` - Specify number of mirrors
- `--alloc contiguous|cling|inherit|normal|anywhere` - Allocation policy
- `--minor Minor` - Set the minor number

## Usage Examples

### Basic Volume Resizing

#### Expanding Logical Volumes
```bash
# Extend logical volume by 10GB
lvresize -L +10G /dev/vg_name/lv_name

# Extend logical volume to specific size (50GB)
lvresize -L 50G /dev/vg_name/lv_name

# Extend by percentage of volume group (20% of VG)
lvresize -l +20%VG /dev/vg_name/lv_name

# Extend by percentage of free space (50% of free)
lvresize -l +50%FREE /dev/vg_name/lv_name

# Extend by number of logical extents (+100 extents)
lvresize -l +100 /dev/vg_name/lv_name
```

#### Reducing Logical Volumes
```bash
# Reduce logical volume by 5GB (requires filesystem resize first)
lvresize -L -5G /dev/vg_name/lv_name

# Reduce to specific size (30GB)
lvresize -L 30G /dev/vg_name/lv_name

# Reduce by number of extents (-50 extents)
lvresize -l -50 /dev/vg_name/lv_name

# Reduce by percentage (reduce to 60% of current size)
lvresize -l 60%LV /dev/vg_name/lv_name
```

### Filesystem Integration

#### Automatic Filesystem Resizing
```bash
# Resize volume and filesystem automatically
lvresize -L +10G -r /dev/vg_name/lv_name

# Resize ext4 filesystem and volume together
lvresize -L 20G -r /dev/vg00/root

# Resize XFS filesystem (only expansion supported)
lvresize -L +5G -r /dev/vg01/home
```

#### Manual Filesystem Management
```bash
# Resize volume first
lvresize -L +10G /dev/vg_name/lv_name

# Then resize filesystem manually
resize2fs /dev/vg_name/lv_name  # For ext2/ext3/ext4
xfs_growfs /mount/point        # For XFS

# For reduction, resize filesystem first
resize2fs /dev/vg_name/lv_name 30G
lvresize -L 30G /dev/vg_name/lv_name
```

### Advanced LVM Operations

#### Thinly Provisioned Volumes
```bash
# Resize thin pool
lvresize -L 100G /dev/vg_name/thinpool

# Resize thin logical volume
lvresize -L +20G /dev/vg_name/thin_volume

# Resize thin pool with automatic metadata resize
lvresize --poolmetadatasize +1G /dev/vg_name/thinpool
```

#### Mirrored Volumes
```bash
# Resize mirrored volume
lvresize -L +10G --mirrors 1 /dev/vg_name/mirrored_lv

# Resize and maintain mirror consistency
lvresize -L 50G --mirrors 2 /dev/vg_name/highly_available_lv

# Resize with specific allocation policy
lvresize -L +20G --alloc contiguous /dev/vg_name/lv_name
```

#### Snapshots
```bash
# Resize snapshot volume
lvresize -L +5G /dev/vg_name/snapshot_lv

# Resize snapshot origin volume
lvresize -L +15G /dev/vg_name/origin_lv
```

## Practical Examples

### System Administration

#### Database Storage Management
```bash
# Extend Oracle database storage
lvresize -L +100G -r /dev/vg_oracle/data

# Resize MySQL partition with minimal downtime
lvresize -L +50G -r /dev/vg_mysql/mysql_data

# Adjust PostgreSQL tablespace
lvresize -L +75G /dev/vg_pgsql/pg_tablespace
resize2fs /dev/vg_pgsql/pg_tablespace
```

#### Virtual Machine Storage
```bash
# Extend KVM VM disk
lvresize -L +200G /dev/vg_vms/vm01_disk

# Resize VM disk with automatic filesystem update
lvresize -L 500G -r /dev/vg_vms/vm02_system

# Expand LVM inside guest (prepare for VM operations)
lvresize -L +50G /dev/vg_templates/template_disk
```

#### Log and Temporary Storage
```bash
# Extend log partition during high activity
lvresize -L +20G -r /dev/vg_system/var_log

# Resize temporary storage for batch processing
lvresize -l +30%FREE /dev/vg_system/tmp

# Adjust backup storage
lvresize -L +500G /dev/vg_backup/backup_storage
```

### Storage Optimization

#### Space Reclamation
```bash
# Reclaim unused space from overprovisioned volume
lvresize -L -100G /dev/vg_data/unused_volume

# Optimize volume group space distribution
lvresize -l 80%VG /dev/vg_data/main_volume

# Balance free space across volumes
lvresize -L +50G /dev/vg_data/vol1
lvresize -L -50G /dev/vg_data/vol2
```

#### Performance Optimization
```bash
# Create contiguous layout for better performance
lvresize -L +100G --alloc contiguous /dev/vg_db/performance_lv

# Resize with specific segment type
lvresize -L +50G --type striped /dev/vg_app/stripe_volume

# Optimize allocation for SSD storage
lvresize -L +200G --alloc anywhere /dev/vg_ssd/cache_volume
```

## Advanced Usage

### Volume Group Management

#### Using Specific Physical Volumes
```bash
# Extend using specific PVs
lvresize -L +50G /dev/vg_data/lv01 /dev/sdb1 /dev/sdc1

# Resize using remaining space on specific PVs
lvresize -l 100%PVS /dev/vg_test/lv_test /dev/sdd1

# Create contiguous allocation across PVs
lvresize -L +100G --alloc contiguous /dev/vg_prod/lv_app /dev/nvme0n1
```

#### Multi-Path Storage
```bash
# Resize multipath volume
lvresize -L +200G /dev/mapper/vg_data-mpath_lv

# Resize with specific multipath device
lvresize -L +100G /dev/vg_data/mpath_volume /dev/mapper/mpatha
```

### Testing and Verification

#### Dry Run Operations
```bash
# Test resize without making changes
lvresize --test -L +50G /dev/vg_data/lv_test

# Verify size calculations
lvresize --test -l +20%VG /dev/vg_system/root

# Check allocation feasibility
lvresize --test --alloc contiguous -L +10G /dev/vg_app/performance_lv
```

#### Validation and Safety Checks
```bash
# Run with verbose output for monitoring
lvresize -v -L +25G /dev/vg_data/lv_extended

# Perform resize with confirmation prompts (default behavior)
lvresize -L +10G /dev/vg_prod/database_lv

# Enable debug output for troubleshooting
lvresize -d -l +100 /dev/vg_test/test_volume
```

### Recovery and Maintenance

#### Emergency Resizing
```bash
# Emergency volume extension with minimal options
lvresize -f -L +1G /dev/vg_emergency/critical_volume

# Quick resize during system maintenance window
lvresize -y -r -L +50G /dev/vg_maintenance/maintenance_volume

# Resize with udev synchronization disabled (rare cases)
lvresize --noudevsync -L +10G /dev/vg_special/special_case
```

#### Maintenance Mode Operations
```bash
# Resize volumes in maintenance mode
lvresize --monitor y -L +100G /dev/vg_maintenance/backup_target

# Batch resize multiple volumes
for lv in /dev/vg_batch/*; do
    lvresize -L +20G -r "$lv"
done
```

## Integration and Automation

### Shell Scripting

#### Automated Storage Management
```bash
#!/bin/bash
# Automatic volume resizing based on thresholds

LV_PATH="/dev/vg_data/application_lv"
THRESHOLD=85  # Usage percentage
INCREMENT="10G"

# Check current usage
USAGE=$(df -h "$LV_PATH" | awk 'NR==2 {print $5}' | sed 's/%//')

if [ "$USAGE" -gt "$THRESHOLD" ]; then
    echo "Usage at ${USAGE}%, extending by ${INCREMENT}"
    lvresize -L "+$INCREMENT" -r "$LV_PATH"
    echo "Volume resize completed"
else
    echo "Usage at ${USAGE}%, no resize needed"
fi
```

#### Volume Group Balancing Script
```bash
#!/bin/bash
# Balance free space across volumes in a volume group

VG_NAME="vg_data"
MIN_FREE="10G"  # Minimum free space per volume

# Get list of logical volumes
lvs --noheadings -o lv_name "$VG_NAME" | while read -r lv_name; do
    lv_path="/dev/$VG_NAME/$lv_name"
    free_space=$(vgs --noheadings --units g -o vg_free "$VG_NAME" | tr -d ' g')

    if (( $(echo "$free_space > 10" | bc -l) )); then
        echo "Extending $lv_name by ${MIN_FREE}"
        lvresize -L "+$MIN_FREE" -r "$lv_path"
    fi
done
```

#### Monitoring Integration
```bash
#!/bin/bash
# Monitor and resize based on application requirements

APP_MOUNT="/app/data"
LV_PATH="/dev/vg_app/app_data"
MAX_SIZE="500G"
INCREMENT="50G"

while true; do
    # Get current volume size
    current_size=$(lvs --noheadings --units g -o lv_size "$LV_PATH" | tr -d ' g')

    # Check if application needs more space
    app_space_needed=$(du -s "$APP_MOUNT" | awk '{print $1}')
    app_space_gb=$((app_space_needed / 1024 / 1024))
    usage_percent=$((app_space_gb * 100 / current_size))

    if [ "$usage_percent" -gt 80 ] && [ "$current_size" -lt 500 ]; then
        echo "Application at ${usage_percent}% usage, extending volume"
        lvresize -L "+$INCREMENT" -r "$LV_PATH"
    fi

    sleep 300  # Check every 5 minutes
done
```

## Troubleshooting

### Common Issues

#### Insufficient Space
```bash
# Check available space in volume group
vgs vg_name

# Check physical volume usage
pvs

# Find volumes that can be reduced
lvs --noheadings -o lv_name,lv_size,vg_name

# Extend volume group if needed
vgextend vg_name /dev/new_device
```

#### Filesystem Resize Failures
```bash
# Check filesystem type
blkid /dev/vg_name/lv_name

# Run filesystem check before resize
fsck -f /dev/vg_name/lv_name

# Mount status check
mount | grep /dev/vg_name/lv_name

# For XFS: check if mounted (XFS can only expand when mounted)
xfs_info /mount/point

# For ext4: check if unmounted for reduction
umount /dev/vg_name/lv_name
resize2fs /dev/vg_name/lv_name new_size
lvresize -L new_size /dev/vg_name/lv_name
mount /dev/vg_name/lv_name /mount/point
```

#### Lock and Permission Issues
```bash
# Check for active processes using the volume
lsof /dev/vg_name/lv_name
fuser -mv /dev/vg_name/lv_name

# Check LVM locks
lvdisplay -a | grep "LV Status"

# Force resize if necessary (use with caution)
lvresize -f -L +10G /dev/vg_name/lv_name
```

#### Volume Group Fragmentation
```bash
# Check volume group fragmentation
vgdisplay -v vg_name

# Check allocation policy
lvs -a -o +devices

# Defragment by creating new volume and copying data
lvcreate -L 50G -n temp_lv vg_name
dd if=/dev/vg_data/fragmented_lv of=/dev/vg_data/temp_lv
lvremove -f /dev/vg_data/fragmented_lv
lvrename vg_data temp_lv fragmented_lv
```

### Recovery Procedures

#### Failed Resize Recovery
```bash
# Check volume metadata consistency
vgck vg_name

# Repair volume group metadata
vgcfgrestore vg_name

# Check logical volume consistency
lvconvert --repair /dev/vg_name/damaged_lv

# Restore from backup if necessary
vgcfgrestore -f /etc/lvm/backup/vg_name vg_name
```

#### Incomplete Operation Recovery
```bash
# Check volume status
lvs -a -o +devices

# Activate volume if inactive
lvchange -ay /dev/vg_name/inactive_lv

# Sync with udev if needed
vgscan --mknodes

# Refresh device mapper
dmsetup mknodes
```

## Related Commands

- [`lvcreate`](/docs/commands/system-service/lvcreate) - Create logical volumes
- [`lvextend`](/docs/commands/system-service/lvextend) - Extend logical volumes
- [`lvreduce`](/docs/commands/system-service/lvreduce) - Reduce logical volumes
- [`lvremove`](/docs/commands/system-service/lvremove) - Remove logical volumes
- [`lvdisplay`](/docs/commands/system-service/lvdisplay) - Display logical volume information
- [`lvscan`](/docs/commands/system-service/lvscan) - Scan for logical volumes
- [`vgcreate`](/docs/commands/system-service/vgcreate) - Create volume groups
- [`vgextend`](/docs/commands/system-service/vgextend) - Extend volume groups
- [`vgdisplay`](/docs/commands/system-service/vgdisplay) - Display volume group information
- [`pvcreate`](/docs/commands/system-service/pvcreate) - Create physical volumes
- [`pvdisplay`](/docs/commands/system-service/pvdisplay) - Display physical volume information
- [`resize2fs`](/docs/commands/filesystem/resize2fs) - Resize ext2/ext3/ext4 filesystems
- [`xfs_growfs`](/docs/commands/filesystem/xfs_growfs) - Grow XFS filesystems
- [`fdisk`](/docs/commands/system-service/fdisk) - Partition table manipulator
- [`parted`](/docs/commands/system-service/parted) - Partition manipulation utility

## Best Practices

1. **Always backup data** before reducing logical volumes
2. **Use `--test` option** first to verify resize operations
3. **Check filesystem compatibility** - XFS only supports expansion
4. **Monitor disk usage** to prevent space exhaustion
5. **Document resize operations** for audit and recovery purposes
6. **Schedule maintenance windows** for critical storage changes
7. **Test in non-production environments** before production deployment
8. **Use `-r` flag** for automatic filesystem resizing when possible
9. **Verify volume group space** before extending volumes
10. **Check for fragmentation** when performance is critical

## Performance Tips

1. **Use contiguous allocation** (--alloc contiguous) for better performance
2. **Avoid frequent resizing** as it can cause fragmentation
3. **Use appropriate allocation policies** based on storage type
4. **Consider SSD-specific settings** for SSD-based storage
5. **Monitor I/O during resize operations** on production systems
6. **Use striped volumes** for high-performance requirements
7. **Resize during low-usage periods** to minimize impact
8. **Batch multiple resize operations** when possible
9. **Use appropriate extent sizes** when creating volume groups
10. **Plan storage hierarchies** to minimize resize needs

The `lvresize` command is an essential tool for dynamic storage management in Linux environments. Its ability to resize logical volumes without downtime makes it invaluable for maintaining system availability while adapting to changing storage requirements. When used properly with proper planning and backup strategies, it provides flexible and efficient storage management capabilities for enterprise environments.