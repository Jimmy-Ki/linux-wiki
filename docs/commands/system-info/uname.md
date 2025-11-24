---
title: uname - Display system information
slug: uname
tags: [system-info, linux-commands]
sidebar_label: uname
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# uname - Display system information

The `uname` command displays basic system information including the kernel name, hostname, kernel release, kernel version, hardware architecture, and processor type.

## Syntax

```bash
uname [OPTION]
```

## Common Options

- `-a`, `--all`: Print all information
- `-s`, `--kernel-name`: Print the kernel name
- `-n`, `--nodename`: Print the network node hostname
- `-r`, `--kernel-release`: Print the kernel release
- `-v`, `--kernel-version`: Print the kernel version
- `-m`, `--machine`: Print the machine hardware name
- `-p`, `--processor`: Print the processor type
- `-i`, `--hardware-platform`: Print the hardware platform
- `-o`, `--operating-system`: Print the operating system

## Usage Examples

### Basic System Information
```bash
# Display kernel name
uname
# Output: Linux

# Display all system information
uname -a
# Output: Linux hostname 5.15.0-52-generic #58-Ubuntu SMP Thu Oct 13 08:03:55 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
```

### Specific Information
```bash
# Display kernel version
uname -r
# Output: 5.15.0-52-generic

# Display hardware architecture
uname -m
# Output: x86_64

# Display hostname
uname -n
# Output: hostname

# Display operating system
uname -o
# Output: GNU/Linux
```

### Script Usage
```bash
# Check if system is 64-bit
if [ "$(uname -m)" = "x86_64" ]; then
    echo "64-bit system"
fi

# Get system information for logging
echo "System: $(uname -sr)" >> system.log
```

## Best Practices

1. **Use `-a` for comprehensive information** when troubleshooting or documenting system specs
2. **Use specific options** in scripts when you need only particular information
3. **Combine with other commands** for system profiling:
   ```bash
   uname -a && lscpu && free -h
   ```
4. **Use in compatibility checks** before installing software:
   ```bash
   # Check architecture before downloading packages
   ARCH=$(uname -m)
   wget "https://example.com/package-${ARCH}.tar.gz"
   ```

## Related Commands

- `hostname`: Display or set system hostname
- `lscpu`: Display CPU architecture information
- `free`: Display memory usage
- `df`: Display disk space usage
- `arch`: Display machine hardware name

## Troubleshooting

### Common Issues

1. **Missing expected information**: Some options may not be available on all systems
2. **Different output format**: Output format may vary between Unix/Linux systems
3. **Permission denied**: Usually doesn't require special permissions

### Tips

- Use `uname -a` for quick system identification
- The `uname` output is useful for bug reports and support requests
- In scripts, use specific options rather than parsing `-a` output when possible