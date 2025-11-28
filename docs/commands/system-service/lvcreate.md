---
title: lvcreate - Create Logical Volume
sidebar_label: lvcreate
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lvcreate - Create Logical Volume

The `lvcreate` command is a powerful LVM (Logical Volume Manager) utility that creates logical volumes from volume groups. It provides flexible storage management by allowing administrators to create, resize, and manage storage volumes dynamically without repartitioning disks. LVM enables advanced features like snapshotting, mirroring, striping, and thin provisioning, making it essential for modern Linux storage management and enterprise environments.

## Basic Syntax

```bash
lvcreate [OPTIONS] VOLUME_GROUP [NAME]
```

## Common Options

### Size Options
- `-L, --size SIZE` - Size of the logical volume (e.g., 10G, 500M, 1T)
- `-l, --extents NUMBER[%VG|%PVS|%ORIGIN]` - Size in extents or percentage
- `--virtualsize SIZE` - Create virtual (thin) volume of specified size

### Volume Group Options
- `-n, --name NAME` - Name for the logical volume
- `-a, --activate y|n` - Auto-activate the logical volume

### Layout Options
- `-m, --mirrors NUMBER` - Create mirrored volume
- `-i, --stripes NUMBER` - Create striped volume
- `-I, --stripesize SIZE` - Stripe size for striped volumes
- `--type TYPE` - Volume type (linear, striped, mirror, raid, thin, cache)

### Thin Provisioning
- `--thinpool` - Create thin pool volume
- `--virtualsize` - Virtual size for thin volumes
- `-T, --thin` - Create thin volume in thin pool
- `--poolmetadata SIZE` - Size of thin pool metadata

### Snapshot Options
- `-s, --snapshot` - Create snapshot
- `-c, --chunksize SIZE` - Chunk size for snapshots

### Performance and Optimization
- `-r, --readahead SECTORS` - Set read ahead sectors
- `--contiguous y|n` - Allocate contiguous extents

### Information and Control
- `-v, --verbose` - Verbose output
- `-d, --debug` - Debug output
- `-h, --help` - Display help information
- `--version` - Show version information

## Usage Examples

### Basic Volume Creation

#### Creating Simple Volumes
```bash
# Create 10GB linear volume
lvcreate -L 10G -n data_vol vg0

# Create volume using extents
lvcreate -l 100%FREE -n backup_vol vg0

# Create volume using percentage of VG
lvcreate -l 50%VG -n database_vol vg0

# Create 5GB volume with automatic activation
lvcreate -L 5G -n temp_vol vg0 -a y

# Create volume with verbose output
lvcreate -L 20G -n storage_vol vg0 -v
```

#### Volume Size Calculations
```bash
# Create volume using all remaining space
lvcreate -l 100%FREE -n archive_vol vg0

# Create volume using 75% of VG
lvcreate -l 75%VG -n user_data vg0

# Create volume using specific number of extents
lvcreate -l 250 -n test_vol vg0

# Create volume with percentage of physical volumes
lvcreate -l 25%PVS -n apps_vol vg0
```

### Advanced Volume Types

#### Striped Volumes
```bash
# Create 2-way striped volume
lvcreate -L 100G -i 2 -n striped_vol vg0

# Create 4-way striped volume with 64K stripe size
lvcreate -L 500G -i 4 -I 64K -n high_perf_vol vg0

# Create striped volume with specific PVs
lvcreate -L 50G -i 2 -n stripe_test vg0 /dev/sdb1 /dev/sdc1
```

#### Mirrored Volumes
```bash
# Create 2-way mirror
lvcreate -L 20G -m 1 -n mirror_vol vg0

# Create 3-way mirror (1 original + 2 copies)
lvcreate -L 50G -m 2 -n critical_vol vg0

# Create mirror without initial synchronization
lvcreate -L 30G -m 1 --nosync -n fast_mirror vg0

# Create mirror with specific mirror log type
lvcreate -L 10G -m 1 --mirrorlog mirrored -n log_mirror vg0
```

#### RAID Volumes
```bash
# Create RAID1 (mirror)
lvcreate --type raid1 -L 10G -n raid1_vol vg0

# Create RAID5
lvcreate --type raid5 -L 100G -i 3 -n raid5_vol vg0

# Create RAID6
lvcreate --type raid6 -L 200G -i 4 -n raid6_vol vg0

# Create RAID10
lvcreate --type raid10 -L 50G -i 2 -m 1 -n raid10_vol vg0

# Create RAID0 (stripe)
lvcreate --type raid0 -L 100G -i 4 -n raid0_vol vg0
```

### Thin Provisioning

#### Thin Pool Creation
```bash
# Create thin pool of 1TB
lvcreate -L 1T -T vg0/thinpool

# Create thin pool with metadata size
lvcreate -L 500G --poolmetadatasize 2G -T vg0/thinpool

# Create thin pool with chunk size
lvcreate -L 2T -T vg0/thinpool -c 1M

# Create thin pool using percentage
lvcreate -l 80%VG -T vg0/thinpool
```

#### Thin Volume Creation
```bash
# Create 100GB thin volume
lvcreate -V 100G -T vg0/thinpool -n thin_vol

# Create 500GB virtual size thin volume
lvcreate -V 500G --thinpool vg0/thinpool -n db_volume

# Create thin volume with specific pool
lvcreate -V 200G --thinpool vg0/mythinpool -n app_volume

# Create multiple thin volumes
lvcreate -V 50G -T vg0/thinpool -n vol1
lvcreate -V 75G -T vg0/thinpool -n vol2
lvcreate -V 100G -T vg0/thinpool -n vol3
```

### Snapshot Management

#### Creating Snapshots
```bash
# Create snapshot of volume
lvcreate -L 5G -s -n data_snap vg0/data_vol

# Create snapshot with specific size
lvcreate -L 10G -s -n backup_snap vg0/important_vol

# Create snapshot with chunk size
lvcreate -L 20G -s -c 256K -n db_snap vg0/database_vol

# Create thin snapshot (requires thin pool)
lvcreate -s -n thin_snap vg0/thin_vol
```

#### Snapshot Operations
```bash
# Create snapshot for backup
lvcreate -L 50G -s -n backup_snapshot vg0/production_vol

# Create snapshot for testing
lvcreate -L 30G -s -n test_snapshot vg0/stable_vol

# Create multiple snapshots
for i in {1..5}; do
    lvcreate -L 10G -s -n "snap_$i" vg0/source_vol
done
```

### Performance Optimization

#### Read Ahead and Contiguous Allocation
```bash
# Create volume with custom read ahead
lvcreate -L 100G -r 1024 -n fast_vol vg0

# Create contiguous volume for better performance
lvcreate -L 50G --contiguous y -n contig_vol vg0

# Create volume with auto read ahead
lvcreate -L 200G -r auto -n auto_vol vg0

# Create volume with no read ahead
lvcreate -L 75G -r none -n noread_vol vg0
```

#### High-Performance Volumes
```bash
# Create optimized database volume
lvcreate -L 500G -i 4 -I 64K -r auto -n db_vol vg0

# Create high-performance cache volume
lvcreate -L 100G -i 8 -I 32K -n cache_vol vg0

# Create volume for virtual machines
lvcreate -L 200G -T vg0/thinpool -n vm_pool -c 1M
```

## Practical Examples

### System Administration

#### Database Storage
```bash
# Create storage for PostgreSQL
lvcreate -L 200G -n pg_data vg0
lvcreate -L 50G -n pg_wal vg0
mkfs.ext4 /dev/vg0/pg_data
mkfs.ext4 /dev/vg0/pg_wal

# Create RAID10 for critical database
lvcreate --type raid10 -L 500G -i 2 -m 1 -n mysql_data vg0

# Create thin pool for multiple databases
lvcreate -L 2T -T vg0/db_thinpool -c 1M
lvcreate -V 300G -T vg0/db_thinpool -n mysql_data
lvcreate -V 200G -T vg0/db_thinpool -n postgresql_data
lvcreate -V 150G -T vg0/db_thinpool -n mongodb_data
```

#### Virtual Machine Storage
```bash
# Create storage for VMs with snapshots
lvcreate -L 100G -n vm_base vg0
lvcreate -L 20G -s -n vm1_snapshot vg0/vm_base
lvcreate -L 20G -s -n vm2_snapshot vg0/vm_base

# Create thin pool for dynamic VM storage
lvcreate -L 1T -T vg0/vm_thinpool
lvcreate -V 100G -T vg0/vm_thinpool -n vm1_disk
lvcreate -V 80G -T vg0/vm_thinpool -n vm2_disk
lvcreate -V 150G -T vg0/vm_thinpool -n vm3_disk

# Create mirrored VM storage
lvcreate -L 500G -m 1 -n vm_mirror vg0
```

#### Backup and Archive Storage
```bash
# Create backup volumes with time-based names
DATE=$(date +%Y%m%d)
lvcreate -L 2T -n "backup_$DATE" vg0
lvcreate -L 500G -n "archive_$DATE" vg0

# Create snapshot-based backup system
lvcreate -L 1T -n production_data vg0
lvcreate -L 100G -s -n "daily_backup_$(date +%Y%m%d)" vg0/production_data

# Create volume for log archives
lvcreate -L 200G -n log_archive vg0
mkfs.ext4 /dev/vg0/log_archive
```

### Development and Testing

#### Development Environment Setup
```bash
# Create volumes for different development environments
lvcreate -L 50G -n dev_env vg0
lvcreate -L 30G -n test_env vg0
lvcreate -L 100G -n staging_env vg0

# Create snapshot of stable environment
lvcreate -L 40G -n stable_env vg0
lvcreate -L 10G -s -n dev_snapshot vg0/stable_env

# Create thin volumes for dynamic testing
lvcreate -L 500G -T vg0/test_thinpool
for i in {1..10}; do
    lvcreate -V 20G -T vg0/test_thinpool -n "test_env_$i"
done
```

#### Performance Testing
```bash
# Create striped volumes for I/O testing
lvcreate -L 100G -i 4 -I 64K -n test_stripe_4k vg0
lvcreate -L 100G -i 4 -I 128K -n test_stripe_128k vg0
lvcreate -L 100G -i 8 -I 32K -n test_stripe_8way vg0

# Create RAID volumes for comparison
lvcreate --type raid0 -L 100G -i 4 -n test_raid0 vg0
lvcreate --type raid10 -L 100G -i 2 -m 1 -n test_raid10 vg0
lvcreate --type raid5 -L 100G -i 3 -n test_raid5 vg0

# Create mirrored volumes for testing
lvcreate -L 50G -m 1 -n test_mirror_2way vg0
lvcreate -L 50G -m 2 -n test_mirror_3way vg0
```

### Enterprise Storage Solutions

#### High-Availability Setup
```bash
# Create mirrored critical volumes
lvcreate -L 100G -m 1 -n critical_data vg0
lvcreate -L 50G -m 2 -n ultra_critical vg0

# Create RAID10 for high performance and reliability
lvcreate --type raid10 -L 1T -i 4 -m 1 -n enterprise_data vg0

# Create active-passive storage pair
lvcreate -L 500G -n active_storage vg0
lvcreate -L 500G -n passive_storage vg0
```

#### Multi-Tenant Storage
```bash
# Create storage departments
lvcreate -L 200G -n hr_storage vg0
lvcreate -L 300G -n finance_storage vg0
lvcreate -L 150G -n dev_storage vg0

# Create thin pool for flexible allocation
lvcreate -L 2T -T vg0/tenant_thinpool
lvcreate -V 100G -T vg0/tenant_thinpool -n tenant1
lvcreate -V 200G -T vg0/tenant_thinpool -n tenant2
lvcreate -V 150G -T vg0/tenant_thinpool -n tenant3
```

## Advanced Usage

### Complex Volume Configurations

#### Multi-Level Storage
```bash
# Create cache setup
lvcreate -L 100G -n cache_pool vg0
lvcreate -L 1T -n origin_vol vg0

# Create tiered storage
lvcreate -L 500G -i 4 -I 64K -n fast_tier vg0
lvcreate -L 2T -n slow_tier vg0

# Create hybrid storage setup
lvcreate -L 200G -T vg0/hybrid_pool -c 1M
lvcreate -V 50G -T vg0/hybrid_pool -n fast_volume
lvcreate -V 500G -T vg0/hybrid_pool -n bulk_volume
```

#### Snapshot Farming
```bash
# Create snapshot chain for incremental backups
lvcreate -L 1T -n source_data vg0
lvcreate -L 100G -s -n snap_1 vg0/source_data
lvcreate -L 100G -s -n snap_2 vg0/source_data
lvcreate -L 100G -s -n snap_3 vg0/source_data

# Create backup rotation system
for day in {Mon,Tue,Wed,Thu,Fri,Sat,Sun}; do
    lvcreate -L 50G -s -n "backup_$day" vg0/important_data
done
```

### Performance Tuning

#### Optimal Configuration for Different Workloads
```bash
# Database optimized (RAID10 with specific stripe)
lvcreate --type raid10 -L 500G -i 2 -m 1 -I 64K -n db_optimized vg0

# Web server optimized (striped for many small files)
lvcreate -L 200G -i 8 -I 32K -r 2048 -n web_server vg0

# Backup storage optimized (large contiguous)
lvcreate -L 5T --contiguous y -n backup_storage vg0

# Virtualization optimized (thin provisioning)
lvcreate -L 3T -T vg0/vm_pool -c 1M
```

#### Memory and Cache Optimization
```bash
# Create volume with specific read ahead for sequential I/O
lvcreate -L 1T -r 8192 -n sequential_io vg0

# Create volume for random I/O workloads
lvcreate -L 500G -r 256 -n random_io vg0

# Create volume with custom chunk size
lvcreate -L 2T -T vg0/chunk_pool -c 2M
```

## Integration and Automation

### Shell Scripts

#### Automated Volume Management Script
```bash
#!/bin/bash
# Automated LVM volume creation script

VG_NAME="vg0"
BASE_NAME="app_storage"
VOLUME_SIZE="100G"

create_application_volume() {
    local app_name=$1
    local size=${2:-$VOLUME_SIZE}
    local vol_name="${BASE_NAME}_${app_name}"

    echo "Creating volume: $vol_name with size: $size"
    lvcreate -L "$size" -n "$vol_name" "$VG_NAME"

    if [ $? -eq 0 ]; then
        echo "Volume $vol_name created successfully"
        mkfs.ext4 "/dev/$VG_NAME/$vol_name"
        mkdir -p "/mnt/$vol_name"
        echo "Filesystem created and mount point prepared"
    else
        echo "Failed to create volume $vol_name"
        return 1
    fi
}

# Create volumes for different applications
create_application_volume "database" "200G"
create_application_volume "logs" "50G"
create_application_volume "user_files" "300G"
```

#### Backup Automation Script
```bash
#!/bin/bash
# Automated snapshot backup system

VG_NAME="vg0"
SOURCE_VOL="production_data"
SNAPSHOT_SIZE="100G"
RETENTION_DAYS=7

create_snapshot() {
    local snap_name="snapshot_$(date +%Y%m%d_%H%M%S)"

    echo "Creating snapshot: $snap_name"
    lvcreate -L "$SNAPSHOT_SIZE" -s -n "$snap_name" "$VG_NAME/$SOURCE_VOL"

    if [ $? -eq 0 ]; then
        echo "Snapshot $snap_name created successfully"
        mount "/dev/$VG_NAME/$snap_name" "/mnt/snapshots/$snap_name"

        # Perform backup
        rsync -av "/mnt/snapshots/$snap_name/" "/backup/$(date +%Y%m%d)/"

        umount "/mnt/snapshots/$snap_name"
        echo "Backup completed for $snap_name"
    else
        echo "Failed to create snapshot"
        return 1
    fi
}

cleanup_old_snapshots() {
    echo "Cleaning up snapshots older than $RETENTION_DAYS days"

    lvdisplay -C -o lv_name "$VG_NAME" | grep "snapshot_" | while read snap_name; do
        # Check age and remove if older than retention period
        lvremove -f "$VG_NAME/$snap_name"
    done
}

# Execute backup and cleanup
create_snapshot
cleanup_old_snapshots
```

#### Monitoring and Alerting Script
```bash
#!/bin/bash
# LVM volume monitoring script

VG_NAME="vg0"
WARNING_THRESHOLD=80
CRITICAL_THRESHOLD=90

check_volume_usage() {
    local vol_name=$1
    local usage=$(df -h "/dev/$VG_NAME/$vol_name" | awk 'NR==2 {print $5}' | sed 's/%//')

    if [ "$usage" -ge "$CRITICAL_THRESHOLD" ]; then
        echo "CRITICAL: Volume $vol_name is ${usage}% full"
        # Send alert
    elif [ "$usage" -ge "$WARNING_THRESHOLD" ]; then
        echo "WARNING: Volume $vol_name is ${usage}% full"
    else
        echo "OK: Volume $vol_name is ${usage}% full"
    fi
}

# Check all volumes in volume group
lvs "$VG_NAME" --noheadings -o lv_name | while read vol_name; do
    if [ -e "/dev/$VG_NAME/$vol_name" ]; then
        check_volume_usage "$vol_name"
    fi
done
```

## Troubleshooting

### Common Issues

#### Volume Creation Failures
```bash
# Insufficient space in volume group
# Solution: Check VG space and adjust size request
vgs vg0
lvcreate -l 50%FREE -n test_vol vg0

# Cannot allocate contiguous extents
# Solution: Defragment volume group or disable contiguous requirement
lvcreate -L 50G --contiguous n -n vol_name vg0

# Maximum number of volumes reached
# Solution: Check limit and remove unnecessary volumes
lvs --noheadings | wc -l
lvremove vg0/unused_volume
```

#### Performance Issues
```bash
# Poor performance on striped volumes
# Solution: Check stripe alignment and I/O patterns
lvs -a -o +devices,seg_monitor vg0
lvcreate -L 100G -i 4 -I 64K -n better_stripe vg0

# Slow backup creation
# Solution: Use snapshots instead of full copies
lvcreate -L 20G -s -n backup_snap vg0/source_vol

# Memory issues with thin provisioning
# Solution: Monitor and adjust metadata size
lvdisplay --units m vg0/thinpool
lvextend -L +1G vg0/thinpool_tmeta
```

#### Recovery and Repair
```bash
# Reactivate inactive volumes
lvchange -ay vg0/inactive_volume

# Repair mirrored volume
lvconvert --repair vg0/mirrored_vol

# Check volume consistency
lvck vg0/problematic_vol

# Rebuild missing mirror leg
lvconvert --mirrors 1 vg0/partial_mirror
```

## Related Commands

- [`lvs`](/docs/commands/system-service/lvs) - List logical volumes
- [`lvdisplay`](/docs/commands/system-service/lvdisplay) - Display logical volume information
- [`lvremove`](/docs/commands/system-service/lvremove) - Remove logical volumes
- [`lvextend`](/docs/commands/system-service/lvextend) - Extend logical volumes
- [`lvreduce`](/docs/commands/system-service/lvreduce) - Reduce logical volumes
- [`lvresize`](/docs/commands/system-service/lvresize) - Resize logical volumes
- [`lvchange`](/docs/commands/system-service/lvchange) - Change logical volume attributes
- [`vgcreate`](/docs/commands/system-service/vgcreate) - Create volume groups
- [`pvcreate`](/docs/commands/system-service/pvcreate) - Create physical volumes
- [`lvm`](/docs/commands/system-service/lvm) - LVM command interface

## Best Practices

1. **Always check available space** before creating volumes with `vgs`
2. **Use descriptive names** for easy volume identification
3. **Plan for growth** when sizing volumes, consider using percentages
4. **Use appropriate volume types** based on workload requirements
5. **Implement snapshot strategy** for backup and testing
6. **Monitor thin pool usage** to avoid overprovisioning issues
7. **Test volume creation** in development environments first
8. **Document volume purposes** and configurations
9. **Regular backup of metadata** and configurations
10. **Use RAID configurations** for critical data requiring redundancy

## Performance Tips

1. **Striped volumes** provide better performance for large sequential I/O
2. **RAID10** offers excellent performance and redundancy
3. **Thin provisioning** is ideal for dynamic workloads and overcommitment
4. **Appropriate stripe sizes** (64K-1M) based on workload characteristics
5. **Read-ahead settings** can improve sequential read performance
6. **Contiguous allocation** for volumes requiring predictable performance
7. **SSD optimization** with appropriate chunk sizes and alignment
8. **Memory considerations** for large metadata requirements

The `lvcreate` command is a fundamental component of Linux LVM, providing flexible and powerful storage management capabilities. Its extensive feature set including mirroring, striping, snapshots, and thin provisioning makes it indispensable for modern Linux storage infrastructure, from development environments to enterprise deployments.