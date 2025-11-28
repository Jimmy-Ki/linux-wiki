---
title: iptables-save - Save iptables firewall rules
sidebar_label: iptables-save
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# iptables-save - Save iptables firewall rules

The `iptables-save` command is a critical Linux utility for extracting and saving iptables firewall rules from the kernel. It outputs all current iptables rules in a format that can be easily parsed, modified, and restored using `iptables-restore`. This command is essential for firewall configuration backup, disaster recovery, system migrations, and automated rule deployment. The output format is standardized and includes all tables (filter, nat, mangle, raw, security) with their respective chains and rules, complete with comments, counters, and packet/byte statistics.

## Basic Syntax

```bash
iptables-save [OPTIONS]
```

## Common Options

### Output Control
- `-c, --counters` - Include current packet and byte counters in output
- `-t, --table <TABLE>` - Specify a single table to dump (filter, nat, mangle, raw, security)
- `-M, --modprobe <COMMAND>` - Specify modprobe command to load modules

### Information
- `-h, --help` - Display help message and usage information
- `-V, --version` - Show version information

## Table Types

### Built-in Tables
- **filter** - Default packet filtering table (INPUT, FORWARD, OUTPUT chains)
- **nat** - Network Address Translation table (PREROUTING, INPUT, OUTPUT, POSTROUTING)
- **mangle** - Packet modification table (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING)
- **raw** - Connection tracking bypass table (PREROUTING, OUTPUT)
- **security** - SELinux/MAC context table (INPUT, FORWARD, OUTPUT)

## Usage Examples

### Basic Rule Export

#### Complete Firewall Backup
```bash
# Save all iptables rules to file
iptables-save > /etc/iptables/rules.v4

# Save with timestamps for backup tracking
iptables-save > /backup/iptables_$(date +%Y%m%d_%H%M%S).rules

# Save all tables with counters included
iptables-save -c > /etc/iptables/rules_with_counters.v4

# Create compressed backup
iptables-save | gzip > /backup/iptables_$(date +%Y%m%d).rules.gz
```

#### Single Table Export
```bash
# Export only filter table rules
iptables-save -t filter > filter_rules.txt

# Export NAT table rules
iptables-save -t nat > nat_rules.txt

# Export mangle table rules
iptables-save -t mangle > mangle_rules.txt

# Export raw table rules
iptables-save -t raw > raw_rules.txt

# Export security table rules
iptables-save -t security > security_rules.txt
```

### Advanced Export Operations

#### Selective Rule Export
```bash
# Export filter table with counters for traffic analysis
iptables-save -t filter -c > filter_with_counters.rules

# Export all tables but filter out specific chains
iptables-save | grep -v "^:LOG" > rules_without_logging.rules

# Export rules and add custom header
echo "# Firewall rules backup - $(date)" > rules_backup.rules
iptables-save >> rules_backup.rules

# Export and format for easier reading
iptables-save | sed 's/^/\n/' | head -20
```

#### Automated Backup Strategies
```bash
# Daily backup with rotation
#!/bin/bash
BACKUP_DIR="/backup/iptables"
DATE=$(date +%Y%m%d)
mkdir -p "$BACKUP_DIR"

# Save current rules
iptables-save > "$BACKUP_DIR/rules_$DATE.v4"

# Keep only last 7 days
find "$BACKUP_DIR" -name "rules_*.v4" -mtime +7 -delete

# Create monthly archive
if [ $(date +%d) = "01" ]; then
    tar czf "$BACKUP_DIR/monthly_$DATE.tar.gz" "$BACKUP_DIR"/rules_*.v4
fi
```

## Practical Examples

### System Administration

#### Firewall Migration
```bash
# Export rules from old server
iptables-save > old_server_rules.v4

# Copy to new server
scp old_server_rules.v4 newserver:/tmp/

# Import on new server (after verification)
ssh newserver "iptables-restore < /tmp/old_server_rules.v4"

# Verify rules are applied
ssh newserver "iptables -L -n -v"
```

#### Configuration Management
```bash
# Create version-controlled firewall rules
mkdir -p /etc/iptables/versions
iptables-save > /etc/iptables/versions/rules_$(date +%Y%m%d_%H%M%S).v4

# Create symlink to current version
ln -sf /etc/iptables/versions/rules_$(date +%Y%m%d_%H%M%S).v4 /etc/iptables/rules.v4

# Compare with previous version
diff /etc/iptables/rules.v4 /etc/iptables/versions/rules_previous.v4
```

#### Rule Analysis and Auditing
```bash
# Export rules for security audit
iptables-save -c > security_audit_rules.v4

# Analyze rule counts and statistics
iptables-save -c | grep -E "^\[.*\]" | awk '{print $2, $3}' > rule_statistics.txt

# Count rules per table
iptables-save | grep "^*" | wc -l  # Number of tables
iptables-save | grep "^:" | wc -l  # Number of chains

# Find rules with specific targets
iptables-save | grep -E "(DROP|REJECT|ACCEPT)" > action_rules.txt
```

### Network Security

#### Incident Response
```bash
# Save current rules before changes during incident
iptables-save > /tmp/rules_before_incident.v4

# Apply emergency rules (block malicious IP)
iptables -I INPUT -s 192.168.1.100 -j DROP

# Save updated rules
iptables-save > /tmp/rules_during_incident.v4

# Compare changes
diff /tmp/rules_before_incident.v4 /tmp/rules_during_incident.v4
```

#### Compliance and Documentation
```bash
# Generate firewall documentation
cat > firewall_documentation_$(date +%Y%m).md << EOF
# Firewall Configuration Documentation

Generated on: $(date)
System: $(hostname)

## Current Rules
\`\`\`bash
$(iptables-save -c)
\`\`\`

## Rule Analysis
- Total chains: $(iptables-save | grep "^:" | wc -l)
- Total rules: $(iptables-save | grep -E "^-A" | wc -l)
- Tables configured: $(iptables-save | grep "^*" | wc -l)

EOF
```

### Development and Testing

#### Rule Development Workflow
```bash
# Save production rules before testing
iptables-save > /tmp/production_rules.v4

# Create test ruleset
cat > test_rules.txt << EOF
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -p tcp --dport 8080 -j ACCEPT
-A INPUT -p tcp --dport 8443 -j ACCEPT
COMMIT
EOF

# Apply test rules
iptables-restore < test_rules.txt

# Test application functionality
# ... run tests ...

# Restore production rules
iptables-restore < /tmp/production_rules.v4
```

## Advanced Usage

### Custom Export Formats

#### Enhanced Export Script
```bash
#!/bin/bash
# Enhanced iptables rules export with metadata

OUTPUT_FILE="$1"
if [ -z "$OUTPUT_FILE" ]; then
    OUTPUT_FILE="/tmp/iptables_export_$(date +%Y%m%d_%H%M%S).v4"
fi

{
    echo "# iptables rules export"
    echo "# Generated on: $(date)"
    echo "# System: $(hostname)"
    echo "# Kernel: $(uname -r)"
    echo "# iptables version: $(iptables --version)"
    echo ""

    # Export rules with counters
    echo "# Current rules with counters:"
    iptables-save -c

    echo ""
    echo "# Rule statistics:"
    echo "# Total chains: $(iptables-save | grep "^:" | wc -l)"
    echo "# Total rules: $(iptables-save | grep -E "^-A" | wc -l)"

} > "$OUTPUT_FILE"

echo "Rules exported to: $OUTPUT_FILE"
```

#### Filtered Export
```bash
# Export only active rules (exclude empty counters)
iptables-save -c | awk '/\[.*:[1-9]/ || /^\\*/ || /^:/' > active_rules.txt

# Export only specific chain rules
iptables-save | sed -n '/^\\*filter/,/^COMMIT/p' > filter_table_only.txt

# Export rules without counters for clean configuration
iptables-save | sed 's/ \\[.*:.*\\]//' > clean_rules.txt
```

### Integration with Automation

#### Configuration Management Integration
```bash
# Ansible-compatible rule export
#!/bin/bash
# Export rules in YAML format for configuration management

echo "---"
echo "iptables_rules:"
iptables-save | while read line; do
    if [[ $line =~ ^\* ]]; then
        table=${line#*}
        echo "  $table:"
    elif [[ $line =~ ^: ]]; then
        chain=$(echo $line | cut -d' ' -f1)
        policy=$(echo $line | cut -d' ' -f2)
        echo "    $chain:"
        echo "      policy: $policy"
    elif [[ $line =~ ^-A ]]; then
        echo "      - rule: \"$line\""
    fi
done
```

#### Monitoring Integration
```bash
# Export rules for monitoring systems
#!/bin/bash

RULES_FILE="/var/log/iptables_monitoring/rules_$(date +%Y%m%d_%H%M%S).txt"
mkdir -p "$(dirname "$RULES_FILE")"

{
    echo "=== IPTABLES MONITORING EXPORT ==="
    echo "Timestamp: $(date)"
    echo "Hostname: $(hostname)"
    echo "Uptime: $(uptime)"
    echo ""
    echo "=== ACTIVE RULES ==="
    iptables-save -c
    echo ""
    echo "=== CONNECTION COUNTS ==="
    cat /proc/net/nf_conntrack | wc -l
    echo "Active connections: $(cat /proc/net/nf_conntrack | wc -l)"

} > "$RULES_FILE"

# Send to monitoring system
curl -X POST -H "Content-Type: text/plain" \
     --data-binary @"$RULES_FILE" \
     "https://monitoring.example.com/api/firewall-rules"
```

## Integration and Automation

### Shell Scripts

#### Comprehensive Backup Script
```bash
#!/bin/bash
# Comprehensive iptables backup and verification script

BACKUP_DIR="/backup/iptables"
CONFIG_DIR="/etc/iptables"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create directories
mkdir -p "$BACKUP_DIR" "$CONFIG_DIR"

# Function to export and verify rules
export_and_verify() {
    local table="$1"
    local output_file="$2"

    echo "Exporting $table table rules..."

    if [ "$table" = "all" ]; then
        iptables-save -c > "$output_file"
    else
        iptables-save -t "$table" -c > "$output_file"
    fi

    # Verify export was successful
    if [ $? -eq 0 ] && [ -s "$output_file" ]; then
        echo "✓ Successfully exported $table rules"
        return 0
    else
        echo "✗ Failed to export $table rules"
        return 1
    fi
}

# Export all tables
export_and_verify "all" "$BACKUP_DIR/all_tables_$DATE.v4"

# Export individual tables for granular backup
for table in filter nat mangle raw security; do
    export_and_verify "$table" "$BACKUP_DIR/${table}_table_$DATE.v4"
done

# Create current active configuration
iptables-save > "$CONFIG_DIR/rules.v4"

# Generate checksum for integrity verification
cd "$BACKUP_DIR"
sha256sum all_tables_$DATE.v4 > all_tables_$DATE.v4.sha256

# Cleanup old backups
find "$BACKUP_DIR" -name "*.v4" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "*.sha256" -mtime +$RETENTION_DAYS -delete

echo "Backup completed successfully!"
echo "Latest backup: all_tables_$DATE.v4"
echo "Checksum available: all_tables_$DATE.v4.sha256"
```

#### Rule Validation Script
```bash
#!/bin/bash
# Validate iptables rules before deployment

RULES_FILE="$1"

if [ ! -f "$RULES_FILE" ]; then
    echo "Error: Rules file not found: $RULES_FILE"
    exit 1
fi

# Create temporary chain for testing
TEST_CHAIN="TEST_VALIDATE_$$"

# Add test chain to rules file
TEMP_RULES="/tmp/rules_with_test_$$.v4"
cp "$RULES_FILE" "$TEMP_RULES"

# Add test chain at the beginning of filter table
sed -i "/^\\*filter/a\\
:$TEST_CHAIN - [0:0]\\
-A $TEST_CHAIN -j DROP" "$TEMP_RULES"

# Test rule syntax
if iptables-restore --test < "$TEMP_RULES"; then
    echo "✓ Rules syntax is valid"

    # Test rule application (dry run)
    echo "Testing rule application..."
    if iptables-restore < "$TEMP_RULES"; then
        echo "✓ Rules applied successfully"

        # Clean up test chain
        iptables -X "$TEST_CHAIN" 2>/dev/null || true

        echo "✓ Validation passed - rules are ready for deployment"
        exit 0
    else
        echo "✗ Failed to apply rules"
        exit 1
    fi
else
    echo "✗ Invalid rules syntax"
    exit 1
fi

# Cleanup
rm -f "$TEMP_RULES"
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied errors
# Solution: Use sudo or run as root
sudo iptables-save > /etc/iptables/rules.v4

# Check if iptables modules are loaded
lsmod | grep ip_tables
sudo modprobe ip_tables

# Verify iptables is accessible
which iptables
sudo iptables --version
```

#### Empty or Incomplete Output
```bash
# Check if any rules exist
iptables -L
sudo iptables-save | wc -l

# Verify specific tables exist
sudo iptables-save -t filter
sudo iptables-save -t nat

# Check kernel netfilter support
grep CONFIG_NETFILTER /boot/config-$(uname -r)
```

#### Module Dependencies
```bash
# Load required modules
sudo modprobe ip_tables
sudo modprobe iptable_filter
sudo modprobe iptable_nat
sudo modprobe iptable_mangle
sudo modprobe iptable_raw

# Check loaded modules
lsmod | grep iptable

# Make modules persistent
echo "ip_tables" >> /etc/modules-load.d/iptables.conf
echo "iptable_filter" >> /etc/modules-load.d/iptables.conf
```

#### Output Format Issues
```bash
# Verify output format is correct
sudo iptables-save | head -10

# Check for corrupted output
sudo iptables-save | grep -E "^\\*|^:|^-[AID]|^COMMIT"

# Test restore capability
sudo iptables-save > /tmp/test_restore.v4
sudo iptables-restore --test < /tmp/test_restore.v4
```

## Related Commands

- [`iptables`](/docs/commands/network/iptables) - Administer iptables firewall rules
- [`iptables-restore`](/docs/commands/network/iptables-restore) - Restore iptables firewall rules
- [`ip6tables-save`](/docs/commands/network/ip6tables-save) - Save IPv6 firewall rules
- [`ip6tables-restore`](/docs/commands/network/ip6tables-restore) - Restore IPv6 firewall rules
- [`firewall-cmd`](/docs/commands/network/firewall-cmd) - Firewalld dynamic firewall manager
- [`ufw`](/docs/commands/network/ufw) - Uncomplicated Firewall frontend
- [`netfilter-persistent`](/docs/commands/system/netfilter-persistent) - Persistent netfilter rules loader

## Best Practices

1. **Regular backups**: Schedule automatic backups of firewall rules
2. **Version control**: Store rule files in version control systems
3. **Test before deployment**: Always validate rules before production deployment
4. **Document changes**: Maintain changelog for firewall modifications
5. **Use counters**: Include counters for traffic analysis and troubleshooting
6. **Secure storage**: Protect backup files with appropriate permissions
7. **Multiple locations**: Store backups in multiple locations for disaster recovery
8. **Integrity verification**: Use checksums to verify backup integrity
9. **Table-specific backups**: Export individual tables for granular recovery
10. **Automation**: Integrate with configuration management systems

## Performance Tips

1. **Exclude counters** for faster exports when not needed
2. **Table-specific exports** reduce overhead when only certain tables are needed
3. **Compress backups** for storage efficiency
4. **Schedule during low traffic** to minimize impact
5. **Use incremental backups** for large rule sets
6. **Parallel exports** of different tables when possible
7. **Cache exports** for frequently accessed rule sets
8. **Optimize storage** with deduplication for similar rule sets
9. **Batch operations** when managing multiple systems
10. **Network storage** for centralized backup management

The `iptables-save` command is an essential tool for Linux firewall management, providing reliable backup, migration, and documentation capabilities for netfilter-based firewalls. Its standardized output format and integration with the broader iptables ecosystem make it indispensable for network security administration and disaster recovery planning.