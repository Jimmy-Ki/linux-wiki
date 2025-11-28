---
title: lvextend - Extend logical volume
sidebar_label: lvextend
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lvextend - Extend logical volume

The `lvextend` command is a powerful LVM (Logical Volume Manager) utility that allows system administrators to extend the size of logical volumes dynamically without downtime. It enables flexible storage management by allocating additional space from volume groups to existing logical volumes, supporting online resizing of file systems, and providing various allocation policies for optimal performance. This command is essential for growing storage partitions, handling increasing data requirements, and maintaining system availability during storage expansion operations.

## Basic Syntax

```bash
lvextend [options] LogicalVolumePath [PhysicalVolumePath...]
lvextend [options] -l +LE_count LogicalVolumePath
lvextend [options] -L +Size LogicalVolumePath
```

## Common Options

### Size Specification
- `-L [+|-]Size[k|K|m|M|g|G|t|T|p|P|e|E]` - Change or set the logical volume size
- `-l [+|-]LE_count` - Change or set the logical volume size in logical extents
- `--size [+|-]Size` - Same as -L, long form option

### Allocation Policies
- `--alloc contiguous` - Use contiguous allocation
- `--alloc cling` - Try to place new extents near existing ones
- `--alloc normal` - Normal allocation policy
- `--alloc anywhere` - Allocate anywhere without constraints
- `--alloc inherit` - Inherit allocation policy from volume group

### File System Options
- `--resizefs` - Resize file system together with logical volume
- `-r, --resizefs` - Resize underlying file system automatically
- `--fs ignore` - Ignore file system during operation

### Metadata and Integrity
- `--noudevsync` - Disable udev synchronization
- `--atomic` - Use atomic extension operation
- `--poolmetadata` - Specify pool metadata size
- `--poolmetadatasize [+|-]Size` - Change or set pool metadata size

### Reporting and Verbose Options
- `-v, --verbose` - Provide verbose output
- `--noheadings` - Suppress headings in reports
- `--separator Separator` - Use custom separator for output
- `--units [kKmMgGtTpPeE]` - Display output in specified units
- `--nosuffix` - Remove suffix from output sizes

## Usage Examples

### Basic Volume Extension

#### Extending by Size
```bash
# Extend logical volume by 10GB
lvextend -L +10G /dev/vg_name/lv_name

# Extend to specific size (50GB total)
lvextend -L 50G /dev/vg_name/lv_name

# Extend by 500MB
lvextend -L +500M /dev/vg_name/lv_name

# Extend by 2TB
lvextend -L +2T /dev/vg_name/lv_name

# Extend to 100GB from current size
lvextend -L 100G /dev/vg_name/lv_name
```

#### Extending by Logical Extents
```bash
# Extend by 2560 logical extents (assuming 4MB each = 10GB)
lvextend -l +2560 /dev/vg_name/lv_name

# Extend to specific number of extents
lvextend -l 12800 /dev/vg_name/lv_name

# Use percentage of volume group
lvextend -l +50%VG /dev/vg_name/lv_name

# Use all remaining free space
lvextend -l +100%FREE /dev/vg_name/lv_name
```

### File System Integration

#### Automatic File System Resize
```bash
# Extend LV and resize filesystem (ext4, xfs, btrfs supported)
lvextend -r -L +20G /dev/vg_name/lv_name

# Extend to maximum available size with filesystem resize
lvextend -r -l +100%FREE /dev/vg_name/lv_name

# Extend and resize XFS filesystem
lvextend -r -L +15G /dev/mapper/vg_name-lv_name

# Extend and resize ext4 filesystem
lvextend -r -L +5G /dev/vg_name/home
```

#### Manual File System Operations
```bash
# Extend LV only (manual filesystem resize required)
lvextend -L +10G /dev/vg_name/lv_name

# Resize ext4 filesystem after LV extension
resize2fs /dev/vg_name/lv_name

# Resize XFS filesystem after LV extension
xfs_growfs /mount/point

# Resize Btrfs filesystem after LV extension
btrfs filesystem resize +10G /mount/point
```

### Advanced Allocation Strategies

#### Contiguous Allocation
```bash
# Extend with contiguous allocation (better performance)
lvextend --alloc contiguous -L +5G /dev/vg_name/lv_name

# Force contiguous allocation for database volumes
lvextend -C y -L +50G /dev/vg_name/database_lv

# Try contiguous but fall back to normal if not possible
lvextend --alloc cling -L +10G /dev/vg_name/lv_name
```

#### Thin Pool Operations
```bash
# Extend thin pool logical volume
lvextend -L +20G /dev/vg_name/thin_pool

# Extend thin pool metadata
lvextend --poolmetadatasize +2G /dev/vg_name/thin_pool

# Extend thin logical volume
lvextend -L +10G /dev/vg_name/thin_lv

# Extend thin pool and resize all thin volumes
lvextend --poolmetadatasize +1G -L +50G /dev/vg_name/thin_pool
```

#### Specific Physical Volume Usage
```bash
# Extend using specific physical volume
lvextend -L +10G /dev/vg_name/lv_name /dev/sdb1

# Extend using multiple specific physical volumes
lvextend -L +20G /dev/vg_name/lv_name /dev/sdb1 /dev/sdc1

# Extend avoiding specific physical volumes
lvextend --alloc anywhere -L +10G /dev/vg_name/lv_name
```

## Practical Examples

### System Administration

#### Database Storage Expansion
```bash
# Extend Oracle data files logical volume
lvextend -r -L +100G /dev/vg_oracle/oradata

# Extend PostgreSQL tablespace
lvextend -r -L +50G /dev/vg_data/pg_tablespace

# Extend MySQL data directory with contiguous allocation
lvextend --alloc contiguous -r -L +200G /dev/vg_mysql/mysql_data

# Extend MongoDB data volume
lvextend -r -l +50%FREE /dev/vg_mongodb/mongo_data
```

#### Virtual Machine Storage Management
```bash
# Extend KVM virtual disk logical volume
lvextend -L +50G /dev/vg_kvm/vm_disk01

# Extend and resize for running VM (online extension)
lvextend -r -L +30G /dev/vg_vms/vm_centos7

# Extend multiple VM disks
for vm in vm01 vm02 vm03; do
    lvextend -r -L +20G /dev/vg_vms/${vm}_disk
done

# Extend Docker thin pool for container storage
lvextend -r -l +100%FREE /dev/vg_docker/docker_pool
```

#### Log and Backup Storage Expansion
```bash
# Extend application logs volume
lvextend -r -L +25G /dev/vg_logs/app_logs

# Extend backup storage to accommodate more retention
lvextend -r -L +500G /dev/vg_backup/backup01

# Extend syslog storage
lvextend -r --alloc contiguous -L +10G /dev/vg_system/var_log

# Extend archive storage for long-term retention
lvextend -l +50%VG /dev/vg_archive/yearly_archive
```

### Multi-Environment Scenarios

#### Development Environment Scaling
```bash
# Extend developer home directories
lvextend -r -L +10G /dev/vg_dev/dev_home

# Extend build storage for CI/CD pipelines
lvextend -r -L +100G /dev/vg_build/build_artifacts

# Extend test data volumes
lvextend -r --alloc cling -L +50G /dev/vg_test/test_data

# Extend development database storage
lvextend -r -L +30G /dev/vg_devdb/dev_db
```

#### Production Capacity Planning
```bash
# Extend web server storage for growing content
lvextend -r -L +200G /dev/vg_web/www_content

# Extend media storage for video processing
lvextend -r --alloc contiguous -L +1T /dev/vg_media/video_storage

# Extend cache volumes for better performance
lvextend -r --alloc cling -l +75%FREE /dev/vg_cache/cache01

# Extend analytics data warehouse
lvextend -r -L +2T /dev/vg_analytics/data_warehouse
```

### High Availability and Clustering

#### Shared Storage Extension
```bash
# Extend shared cluster storage (GFS2/OCFS2)
lvextend -r -L +100G /dev/vg_shared/cluster_fs

# Extend quorum disk for cluster management
lvextend -r -L +5G /dev/vg_cluster/quorum_disk

# Extend heartbeat storage
lvextend -r --alloc contiguous -L +2G /dev/vg_cluster/heartbeat

# Extend shared application data
lvextend -r -l +25%VG /dev/vg_shared/app_data
```

#### Disaster Recovery Storage
```bash
# Extend DR backup storage
lvextend -r -L +500G /dev/vg_dr/backup_target

# Extend replication storage
lvextend -r --alloc cling -L +200G /dev/vg_replication/repl_data

# Extend snapshot storage for point-in-time recovery
lvextend -r -L +50G /dev/vg_snapshots/snap_storage

# Extend archive storage for compliance
lvextend -r -L +1T /dev/vg_compliance/compliance_archive
```

## Advanced Usage

### Performance Optimization

#### Stripe and Mirror Configuration
```bash
# Extend striped logical volume for better I/O performance
lvextend -i 2 -I 64k -L +100G /dev/vg_performance/stripe_lv

# Extend mirrored logical volume for redundancy
lvextend -m 1 -L +50G /dev/vg_redundant/mirror_lv

# Extend RAID 5 logical volume
lvextend --type raid5 -L +200G /dev/vg_raid5/raid5_lv

# Extend RAID 10 logical volume for balanced performance
lvextend --type raid10 -L +300G /dev/vg_raid10/raid10_lv
```

#### Cache Configuration
```bash
# Extend fast cache volume for frequently accessed data
lvextend -r -L +50G /dev/vg_cache/fast_cache

# Extend cache origin volume
lvextend -L +200G /dev/vg_cache/cache_origin

# Extend writeback cache for improved write performance
lvextend --type cache-pool -L +100G /dev/vg_cache/writeback_cache

# Extend read cache for database workloads
lvextend --type cache -L +75G /dev/vg_dbcache/db_read_cache
```

### Monitoring and Verification

#### Pre-Extension Planning
```bash
# Display current logical volume information
lvdisplay /dev/vg_name/lv_name

# Check available space in volume group
vgdisplay vg_name

# Show free extents in volume group
vgdisplay --columns vg_name

# Analyze current allocation pattern
lvdisplay -m /dev/vg_name/lv_name

# Simulate extension without making changes
lvextend --test -L +10G /dev/vg_name/lv_name
```

#### Post-Extension Verification
```bash
# Verify logical volume extension
lvdisplay /dev/vg_name/lv_name

# Check file system size after extension
df -h /mount/point

# Verify file system integrity
fsck -n /dev/vg_name/lv_name

# Check LVM metadata consistency
vgck -v vg_name

# Display detailed allocation map
lvdisplay -m -v /dev/vg_name/lv_name
```

### Automation and Scripting

#### Automated Storage Management Script
```bash
#!/bin/bash
# Automated storage monitoring and extension

THRESHOLD=85  # Alert when usage exceeds 85%
EXTEND_SIZE="50G"  # Default extension size

# Check all logical volumes
for lv in $(lvs --noheadings -o lv_fullname); do
    # Get mount point and usage percentage
    mount_point=$(findmnt -n -o TARGET $lv 2>/dev/null)
    if [ -n "$mount_point" ]; then
        usage=$(df "$mount_point" | awk 'NR==2 {print $5}' | sed 's/%//')

        if [ "$usage" -ge "$THRESHOLD" ]; then
            echo "Alert: $lv usage at ${usage}% (mounted on $mount_point)"

            # Check if there's free space in volume group
            vg=$(echo $lv | cut -d'/' -f1-3 | sed 's/\/dev\///')
            free_space=$(vgdisplay $vg | grep "Free  PE" | awk '{print $5}')

            if [ "$free_space" -gt 0 ]; then
                echo "Extending $lv by $EXTEND_SIZE..."
                lvextend -r -L +$EXTEND_SIZE $lv
                echo "Extension completed successfully"
            else
                echo "No free space available in volume group $vg"
            fi
        fi
    fi
done
```

#### Batch Extension Script
```bash
#!/bin/bash
# Extend multiple logical volumes based on configuration

# Configuration file format: lv_path:extend_size
CONFIG_FILE="/etc/lvm/extend_config.conf"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Configuration file $CONFIG_FILE not found"
    exit 1
fi

while IFS=':' read -r lv_path extend_size; do
    # Skip comments and empty lines
    [[ $lv_path =~ ^[[:space:]]*# ]] && continue
    [ -z "$lv_path" ] && continue

    echo "Processing $lv_path..."

    # Verify logical volume exists
    if ! lvdisplay "$lv_path" >/dev/null 2>&1; then
        echo "Error: Logical volume $lv_path not found"
        continue
    fi

    # Extend logical volume
    if lvextend -r -L +$extend_size "$lv_path"; then
        echo "Successfully extended $lv_path by $extend_size"
    else
        echo "Failed to extend $lv_path"
    fi

done < "$CONFIG_FILE"
```

## Troubleshooting

### Common Issues

#### Insufficient Space Errors
```bash
# Check available space before extension
vgdisplay vg_name | grep "Free PE"

# Check total and used space
vgs --units g

# List all logical volumes with sizes
lvs --units g

# Find largest free contiguous space
pvdisplay --maps | grep -A 5 "Free"

# Extend volume group if needed
vgextend vg_name /dev/sdx1
```

#### File System Resize Failures
```bash
# Check file system type
blkid /dev/vg_name/lv_name

# Manually resize ext2/ext3/ext4
resize2fs /dev/vg_name/lv_name

# Manually resize XFS (requires mount)
xfs_growfs /mount/point

# Manually resize Btrfs
btrfs filesystem resize max /mount/point

# Check file system consistency before resize
fsck -f /dev/vg_name/lv_name
```

#### Allocation Policy Conflicts
```bash
# Check current allocation policy
lvdisplay -m /dev/vg_name/lv_name

# Use normal allocation if contiguous fails
lvextend --alloc normal -L +10G /dev/vg_name/lv_name

# Try cling allocation for better performance
lvextend --alloc cling -L +10G /dev/vg_name/lv_name

# Use anywhere allocation as last resort
lvextend --alloc anywhere -L +10G /dev/vg_name/lv_name
```

#### Metadata Corruption Issues
```bash
# Check LVM metadata consistency
vgck -v vg_name

# Repair volume group metadata
vgcfgrestore -f /etc/lvm/backup/vg_name vg_name

# Check logical volume metadata
lvdisplay -m -v /dev/vg_name/lv_name

# Backup current metadata
vgcfgbackup -f /root/vg_backup_$(date +%Y%m%d) vg_name
```

### Performance Issues

#### Slow Extension Operations
```bash
# Use verbose mode to monitor progress
lvextend -v -L +100G /dev/vg_name/lv_name

# Disable udev synchronization for faster operation
lvextend --noudevsync -L +50G /dev/vg_name/lv_name

# Use atomic extension for better performance
lvextend --atomic -L +25G /dev/vg_name/lv_name

# Monitor I/O during extension
iostat -x 1 10
```

#### Fragmentation Issues
```bash
# Check current fragmentation
lvdisplay -m /dev/vg_name/lv_name | grep "LE"

# Defragment logical volume by recreating
lvcreate -L newSize -n new_lv vg_name
dd if=/dev/vg_name/old_lv of=/dev/vg_name/new_lv bs=1M
lvremove /dev/vg_name/old_lv
lvrename /dev/vg_name/new_lv old_lv

# Use contiguous allocation for better performance
lvextend --alloc contiguous -L +10G /dev/vg_name/lv_name
```

## Related Commands

- [`lvcreate`](/docs/commands/system-service/lvcreate) - Create logical volumes
- [`lvreduce`](/docs/commands/system-service/lvreduce) - Reduce logical volume size
- [`lvremove`](/docs/commands/system-service/lvremove) - Remove logical volumes
- [`lvresize`](/docs/commands/system-service/lvresize) - Resize logical volumes
- [`lvdisplay`](/docs/commands/system-service/lvdisplay) - Display logical volume information
- [`lvscan`](/docs/commands/system-service/lvscan) - Scan for logical volumes
- [`vgextend`](/docs/commands/system-service/vgextend) - Add physical volumes to volume group
- [`vgdisplay`](/docs/commands/system-service/vgdisplay) - Display volume group information
- [`pvdisplay`](/docs/commands/system-service/pvdisplay) - Display physical volume information
- [`resize2fs`](/docs/commands/filesystem/resize2fs) - Resize ext2/ext3/ext4 file systems
- [`xfs_growfs`](/docs/commands/filesystem/xfs_growfs) - Grow XFS file systems

## Best Practices

1. **Always backup data** before performing major LVM operations
2. **Check available space** in the volume group before extension
3. **Use automatic file system resizing** (-r flag) for online operations
4. **Monitor progress** with verbose mode for large extensions
5. **Test on non-production systems** before implementing in production
6. **Maintain free space** in volume groups for future extensions
7. **Document changes** for capacity planning and auditing
8. **Use appropriate allocation policies** for performance requirements
9. **Verify extensions** with file system checks after completion
10. **Schedule extensions** during maintenance windows for critical systems

## Performance Tips

1. **Contiguous allocation** provides better performance for sequential workloads
2. **Cling allocation** maintains locality for improved I/O patterns
3. **Stripe allocation** improves performance for parallel I/O operations
4. **Larger extension sizes** reduce metadata overhead for frequent growth
5. **Batch extensions** are more efficient than multiple small extensions
6. **SSD storage** benefits more from specific allocation patterns
7. **Monitor I/O load** during extensions to avoid performance impact
8. **Use appropriate extent sizes** based on workload characteristics
9. **Consider RAID configurations** for performance and redundancy
10. **Regular defragmentation** maintains optimal performance over time

The `lvextend` command is a fundamental tool for dynamic storage management in Linux environments. Its ability to extend logical volumes online, integrate with file systems, and support various allocation strategies makes it essential for managing growing storage requirements while maintaining system availability and performance.