---
title: lvdisplay - Display information about logical volumes
sidebar_label: lvdisplay
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lvdisplay - Display information about logical volumes

The `lvdisplay` command displays information about logical volumes in a volume group. It's part of the Linux LVM (Logical Volume Manager) suite and provides detailed attributes of logical volumes including size, layout, and current status. This command is essential for system administrators managing storage systems, monitoring disk usage, and troubleshooting LVM-related issues. It helps visualize the structure of logical volumes, their allocation, and mapping to physical extents.

## Basic Syntax

```bash
lvdisplay [OPTIONS] [LogicalVolumePath...]
```

## Common Options

### Display Options
- `-a, --all` - Display all logical volumes (including internal, hidden, and snapshot volumes)
- `-c, --colon` - Generate output in colon-separated format for scripts
- `-C, --columns` - Display output in columnar format
- `-m, --maps` - Display mapping of logical volumes to physical volumes
- `--options` - Specify which fields to display
- `--separator` - Specify separator for output
- `--unbuffered` - Produce output immediately without buffering

### Selection Options
- `-S, --select` - Select logical volumes based on criteria
- `--configreport` - Configure report settings
- `--ignorelockingfailure` - Continue despite locking failures
- `--partial` - Display partial information if some devices missing

### Format Options
- `--units` - Specify units for size display (k, K, m, M, g, G, t, T, etc.)
- `--nosuffix` - Remove units suffix from output
- `--nameprefixes` - Add field name prefixes in colon output
- `--rows` - Display output in row format
- `--aligned` - Align column output

### LVM Options
- `--profile` - Use specific configuration profile
- `--reportformat` - Specify report format (basic, json)
- `--verbose` - Enable verbose output
- `--debug` - Enable debug information
- `--help` - Display help information
- `--version` - Show version information

## Usage Examples

### Basic Logical Volume Display

#### Displaying All Logical Volumes
```bash
# Display all logical volumes in system
lvdisplay

# Display all volumes including hidden ones
lvdisplay -a

# Display in columnar format
lvdisplay -C

# Display with specific units
lvdisplay --units G

# Display without unit suffixes
lvdisplay --nosuffix
```

#### Displaying Specific Logical Volumes
```bash
# Display specific logical volume
lvdisplay /dev/vg_name/lv_name

# Display multiple logical volumes
lvdisplay /dev/vg_name/lv1 /dev/vg_name/lv2

# Display volumes matching pattern
lvdisplay /dev/vg_name/*

# Display using VG and LV names
lvdisplay vg_name/lv_name
```

### Advanced Display Options

#### Columnar Output Format
```bash
# Basic columnar display
lvdisplay -C

# Custom fields display
lvdisplay -C -o lv_name,lv_size,lv_attr,vg_name

# Display with alignment
lvdisplay -C --aligned

# Display specific fields
lvdisplay -C --options lv_name,lv_size,lv_path,seg_count

# JSON format output
lvdisplay --reportformat json
```

#### Mapping Information
```bash
# Display mapping to physical volumes
lvdisplay -m

# Display mapping for specific LV
lvdisplay -m /dev/vg_name/lv_name

# Show detailed layout
lvdisplay -m -a

# Display in columnar format with mapping
lvdisplay -C -m
```

#### Colon-separated Format
```bash
# Generate colon-separated output
lvdisplay -c

# Add name prefixes
lvdisplay -c --nameprefixes

# Custom separator
lvdisplay -c --separator "|"

# Unbuffered output for scripts
lvdisplay -c --unbuffered
```

### Selection and Filtering

#### Selecting by Criteria
```bash
# Select volumes by size
lvdisplay -S 'lv_size > 10g'

# Select volumes by attribute
lvdisplay -S 'lv_attr =~ ^.*wi.*$'  # Inactive volumes

# Select volumes by name pattern
lvdisplay -S 'lv_name =~ data.*'

# Select volumes by volume group
lvdisplay -S 'vg_name=systemvg'

# Multiple selection criteria
lvdisplay -S 'lv_size > 5g && lv_attr =~ ^.*-.*$'
```

#### Advanced Filtering
```bash
# Display snapshots only
lvdisplay -S 'lv_attr =~ ^.*s.*$'

# Display thin volumes
lvdisplay -S 'lv_attr =~ ^.*V.*$' -a

# Display cached volumes
lvdisplay -S 'lv_attr =~ ^.*C.*$'

# Display volumes with specific tags
lvdisplay -S 'lv_tags =~ backup'

# Display volumes by device path
lvdisplay -S 'lv_path =~ /dev/mapper/.*'
```

## Practical Examples

### System Administration

#### Storage Monitoring
```bash
# Display all volumes with human-readable sizes
lvdisplay --units h

# Show volume usage summary
lvdisplay -C -o lv_name,lv_size,vg_name,data_percent,metadata_percent

# Monitor thin pool usage
lvdisplay -S 'lv_attr =~ ^.*t.*$' -C -o lv_name,lv_size,data_percent,metadata_percent

# Check for snapshots
lvdisplay -S 'lv_attr =~ ^.*s.*$' -C

# Display volumes by size in GB
lvdisplay -C -o lv_name,lv_size --units g --nosuffix
```

#### Volume Group Management
```bash
# Display all volumes in a specific VG
lvdisplay vg_name/*

# Show VG volume summary
lvdisplay -C -o lv_name,lv_size,vg_name -S 'vg_name=appvg'

# Check available space in VG
lvdisplay -C -o vg_name,lv_count,lv_size --units g

# Display volumes sorted by size
lvdisplay -C -o lv_name,lv_size -S 'lv_size' --units g
```

#### Backup and Recovery
```bash
# Display backup-related volumes
lvdisplay -S 'lv_name =~ backup' -C -o lv_name,lv_size,lv_path

# Show snapshot information
lvdisplay -S 'lv_attr =~ ^.*s.*$' -m

# Display volumes needing backup
lvdisplay -S 'lv_tags =~ backup_required' -C

# Show backup volumes by date
lvdisplay -S 'lv_name =~ backup_202[0-9]' -C -o lv_name,lv_size
```

### Storage Troubleshooting

#### Identifying Issues
```bash
# Display inactive volumes
lvdisplay -S 'lv_attr =~ ^.*i.*$' -C

# Show volumes with errors
lvdisplay -S 'lv_attr =~ ^.*e.*$' -a

# Display volumes with missing devices
lvdisplay --partial

# Show thin pools with high usage
lvdisplay -S 'lv_attr =~ ^.*t.*$ && data_percent > 80' -C

# Display cached volumes and cache status
lvdisplay -S 'lv_attr =~ ^.*C.*$' -m
```

#### Performance Analysis
```bash
# Display volumes with striping
lvdisplay -S 'lv_attr =~ ^.*i.*$' -m

# Show mirror volumes
lvdisplay -S 'lv_attr =~ ^.*m.*$' -m

# Display RAID volumes
lvdisplay -S 'lv_attr =~ ^.*r.*$' -m

# Show volumes with specific layouts
lvdisplay -m | grep -E "(striped|mirrored|raid)"
```

## Advanced Usage

### Script Integration

#### Automated Reporting
```bash
#!/bin/bash
# Generate LVM inventory report

echo "=== Logical Volume Inventory ==="
echo "Date: $(date)"
echo ""

# Summary of all volumes
echo "Summary:"
lvdisplay -C -o lv_name,lv_size,vg_name,lv_attr --units g

echo ""
echo "Detailed Information:"
lvdisplay -m -a --units g

echo ""
echo "Large Volumes (>10GB):"
lvdisplay -S 'lv_size > 10g' -C -o lv_name,lv_size,vg_name --units g

echo ""
echo "Thin Pools:"
lvdisplay -S 'lv_attr =~ ^.*t.*$' -C -o lv_name,lv_size,data_percent,metadata_percent
```

#### Monitoring Script
```bash
#!/bin/bash
# LVM health monitoring

THRESHOLD=80

# Check thin pool usage
echo "Checking thin pool usage..."
lvdisplay -S 'lv_attr =~ ^.*t.*$' -C -o lv_name,data_percent,metadata_percent | \
while read line; do
    name=$(echo $line | awk '{print $1}')
    data=$(echo $line | awk '{print $2}')
    meta=$(echo $line | awk '{print $3}')

    data_num=${data%\%}
    meta_num=${meta%\%}

    if (( $(echo "$data_num > $THRESHOLD" | bc -l) )); then
        echo "WARNING: Thin pool $name data usage: $data%"
    fi

    if (( $(echo "$meta_num > $THRESHOLD" | bc -l) )); then
        echo "WARNING: Thin pool $name metadata usage: $meta%"
    fi
done
```

#### Volume Discovery
```bash
#!/bin/bash
# Discover and categorize volumes

echo "Volume Categories:"
echo ""

echo "Root Volumes:"
lvdisplay -C -o lv_name,lv_size -S 'lv_name =~ root|system' --units g

echo ""
echo "Data Volumes:"
lvdisplay -C -o lv_name,lv_size -S 'lv_name =~ data|home' --units g

echo ""
echo "Swap Volumes:"
lvdisplay -C -o lv_name,lv_size -S 'lv_name =~ swap' --units g

echo ""
echo "Snapshot Volumes:"
lvdisplay -S 'lv_attr =~ ^.*s.*$' -C -o lv_name,lv_size,origin --units g
```

### JSON and Automation

#### JSON Output Processing
```bash
# Export volume information as JSON
lvdisplay --reportformat json > volume_inventory.json

# Process with jq
lvdisplay --reportformat json | jq '.report[0].lv[] | select(.lv_size > "10.00g") | {name: .lv_name, size: .lv_size}'

# Generate CSV from JSON
lvdisplay --reportformat json | jq -r '.report[0].lv[] | [.lv_name, .lv_size, .vg_name] | @csv'
```

#### Integration with Monitoring Tools
```bash
# Generate metrics for monitoring
lvdisplay -C --separator "," --nosuffix --units m | \
while IFS=',' read -r name size vg attr path; do
    echo "lv_size_bytes{lv_name=\"$name\",vg_name=\"$vg\"} $((size * 1024 * 1024))"
done

# Export to Prometheus format
echo "# HELP lv_size_bytes Logical volume size in bytes"
echo "# TYPE lv_size_bytes gauge"
lvdisplay -C --separator "|" --nosuffix --units b | \
while IFS='|' read -r name size vg; do
    echo "lv_size_bytes{lv_name=\"$name\",vg_name=\"$vg\"} $size"
done
```

## Special Operations

### Working with Different Volume Types

#### Thin Volumes
```bash
# Display thin volumes
lvdisplay -S 'lv_attr =~ ^.*V.*$' -a

# Show thin pool details
lvdisplay -S 'lv_attr =~ ^.*t.*$' -m

# Display thin volume origins
lvdisplay -S 'lv_attr =~ ^.*o.*$' -C -o lv_name,origin

# Show thin provisioning status
lvdisplay -S 'lv_attr =~ ^.*T.*$' -C -o lv_name,lv_size,data_percent,metadata_percent
```

#### Snapshot Volumes
```bash
# Display all snapshots
lvdisplay -S 'lv_attr =~ ^.*s.*$' -C

# Show snapshot details with origin
lvdisplay -S 'lv_attr =~ ^.*s.*$' -m

# Display snapshot merge status
lvdisplay -S 'lv_attr =~ ^.*m.*$' -C

# Show snapshot percentage used
lvdisplay -S 'lv_attr =~ ^.*s.*$' -C -o lv_name,lv_size,snap_percent
```

#### Cached Volumes
```bash
# Display cached volumes
lvdisplay -S 'lv_attr =~ ^.*C.*$' -m

# Show cache pool details
lvdisplay -S 'lv_attr =~ ^.*c.*$' -C

# Display cache statistics
lvdisplay -S 'lv_name =~ cache' -m

# Show cache policy information
lvdisplay -m | grep -A 5 -B 5 cache
```

### Performance Monitoring

#### Volume Performance Metrics
```bash
# Display volumes by size (sorted)
lvdisplay -C -o lv_name,lv_size --units g | sort -k2 -n

# Show volume utilization
lvdisplay -C -o lv_name,lv_size,data_percent --units g

# Monitor volume growth
echo "Current volume sizes:"
lvdisplay -C -o lv_name,lv_size --units g

# Store for comparison
lvdisplay -C -o lv_name,lv_size --units g > /tmp/volume_sizes_$(date +%Y%m%d)
```

## Troubleshooting

### Common Issues

#### Locking Problems
```bash
# Continue despite locking failures
lvdisplay --ignorelockingfailure

# Check for stale locks
lvdisplay --configreport vg -o vg_name,vg_attr

# Display partial information
lvdisplay --partial
```

#### Device Issues
```bash
# Display volumes with missing devices
lvdisplay --partial

# Show volume status
lvdisplay -C -o lv_name,lv_attr

# Identify problematic volumes
lvdisplay -S 'lv_attr =~ ^.*p.*$' -C

# Check volume paths
lvdisplay -C -o lv_name,lv_path -S 'lv_path!=""'
```

#### Attribute Understanding
```bash
# Decode volume attributes
lvdisplay -C -o lv_name,lv_attr

# Explain attributes
# Volume attributes (from man page):
# 1st bit: Volume type (V=Virtual, M=Mirror, etc.)
# 2nd bit: Permissions (w=writeable, r=read-only)
# 3rd bit: Allocation policy (a=fixed, c=contiguous, l=linear, etc.)
# 4th bit: Fixed minor (m=major/minor fixed)
# 5th bit: State (a=active, s=suspended, i=inactive)
# 6th bit: Device open (o=open)
# 7th bit: Target type (m=mirror, r=raid, s=snapshot, etc.)

# Display volumes with specific attributes
lvdisplay -S 'lv_attr =~ ^.*a.*$' -C  # Active volumes
lvdisplay -S 'lv_attr =~ ^.*w.*$' -C  # Writable volumes
```

### Debug Information

#### Verbose Output
```bash
# Enable verbose mode
lvdisplay --verbose

# Debug mode for troubleshooting
lvdisplay --debug

# Show configuration profile
lvdisplay --profile LVM_SYSTEM_DIR

# Display with extensive information
lvdisplay -m -a --verbose
```

## Related Commands

- [`lvs`](/docs/commands/system-service/lvs) - List logical volumes in abbreviated form
- [`lvcreate`](/docs/commands/system-service/lvcreate) - Create logical volumes
- [`lvremove`](/docs/commands/system-service/lvremove) - Remove logical volumes
- [`lvresize`](/docs/commands/system-service/lvresize) - Resize logical volumes
- [`lvextend`](/docs/commands/system-service/lvextend) - Extend logical volumes
- [`lvreduce`](/docs/commands/system-service/lvreduce) - Reduce logical volumes
- [`vgdisplay`](/docs/commands/system-service/vgdisplay) - Display volume group information
- [`pvdisplay`](/docs/commands/system-service/pvdisplay) - Display physical volume information
- [`lsblk`](/docs/commands/system-service/lsblk) - List block devices
- [`df`](/docs/commands/file-system/df) - Display disk space usage

## Best Practices

1. **Use `-C` for scripts** - Columnar output is easier to parse programmatically
2. **Specify units explicitly** with `--units` for consistent script output
3. **Use `--nosuffix`** when parsing sizes in scripts to avoid unit conversion issues
4. **Monitor thin pools** regularly to prevent space exhaustion
5. **Check volume attributes** to understand volume types and states
6. **Use selection criteria** `-S` for filtering large environments
7. **Export in JSON format** for integration with modern monitoring tools
8. **Regularly audit snapshots** to prevent space issues
9. **Document volume layouts** with `-m` for disaster recovery
10. **Use profiles** for consistent configuration across systems

## Performance Tips

1. **Columnar output** (`-C`) is faster for large systems
2. **Specific field selection** with `-o` reduces processing time
3. **Use selection filters** to limit output to relevant volumes
4. **JSON output** is efficient for programmatic processing
5. **Avoid `-a`** unless you need internal/hidden volumes
6. **Use `--unbuffered`** for real-time monitoring scripts
7. **Cache results** for frequently accessed information
8. **Batch operations** when processing multiple volumes
9. **Use appropriate units** to avoid unnecessary conversions
10. **Limit mapping info** (`-m`) as it's resource-intensive

The `lvdisplay` command is an essential tool for LVM management, providing comprehensive visibility into logical volume configurations and usage. Its flexible output formats and selection capabilities make it invaluable for both interactive administration and automated storage management tasks.