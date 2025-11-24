---
title: apk - The `Apk` Command Is A Linux Utility For Apk Operations.
sidebar_label: apk
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._



# apk - The `Apk` Command Is A Linux Utility For Apk Operations.



## Overview

The `apk` command alpine linux package manager.

## Syntax

```bash
apk install xxx
apk search xxx # 支持正则
apk info xxx # 查看包的详细信息
apk show # list local package
# 卸载并删除 包
apk del openssh openntp vim
```

## Basic Usage Examples

```bash
# Basic usage
apk

# Get help
apk --help
```

## Common Options

- `-h, --help` - Display help information
- `-v, --version` - Show version information

## Tips

1. Always check the manual page: `man {command_name}`
2. Use `--help` option for quick reference

## Related Commands

- Check commands in the `other` category for related utilities