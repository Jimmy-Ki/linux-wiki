---
title: dumpkeys - 键盘映射表转储工具
sidebar_label: dumpkeys
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dumpkeys - 键盘映射表转储工具

The `dumpkeys` command is a Linux utility that dumps the kernel keyboard translation table, allowing users to examine the current keyboard mapping configuration. This utility is part of the kbd package and reads the keyboard translation table from the kernel, outputting it in a format that can be loaded back using `loadkeys`. The command is particularly useful for debugging keyboard mapping issues, saving current keyboard configurations for backup purposes, or examining how keys are being interpreted by the Linux console system.

## 基本语法

```bash
dumpkeys [选项]
```

## 常用选项

### 输出格式选项
- `-C`, --console=DEV` - 指定控制台设备 (默认为 /dev/tty)
- `-c`, --charset=CHARSET` - 指定字符集 (latin1, latin2, etc.)
- `-f`, --full-table` - 输出完整的键盘映射表
- `-n`, --numeric` - 使用数值而不是键名
- `-s`, --short-info` - 输出简短信息
- `-t`, --table-only` - 只输出键盘映射表

### 输出控制选项
- `-1`, --separate-lines` - 每个键占一行
- `-S`, --shape=S` - 指定输出形状 (0=默认, 1=标准, 2=压缩)
- `-k`, --keys-only` - 只输出键映射信息
- `-p`, --full-paths` - 显示完整路径

### 信息选项
- `-i`, --info` - 显示键盘映射信息
- `-l`, --long-info` - 显示详细键盘映射信息
- `-v`, --verbose` - 详细输出模式
- `-V`, --version` - 显示版本信息
- `-h`, --help` - 显示帮助信息

### 组合键选项
- `-N`, --no-defaults` - 不显示默认键绑定的映射
- `-e`, --compose` - 输出组合键信息

## 使用示例

### 基本键映射查看

#### 查看当前键盘映射
```bash
# 显示当前键盘映射表
dumpkeys

# 输出完整的键盘映射信息
dumpkeys -f

# 使用数值格式输出
dumpkeys -n

# 显示键盘映射信息
dumpkeys -i
```

#### 指定控制台设备
```bash
# 查看特定控制台的键盘映射
dumpkeys -C /dev/tty1

# 查看当前终端的键盘映射
dumpkeys -C /dev/tty
```

### 格式化输出

#### 不同输出格式
```bash
# 简短格式输出
dumpkeys -s

# 每个键单独一行显示
dumpkeys -1

# 只输出键映射信息
dumpkeys -k

# 标准形状输出
dumpkeys -S1

# 压缩格式输出
dumpkeys -S2
```

#### 字符集相关
```bash
# 使用 Latin1 字符集
dumpkeys -c latin1

# 使用 Latin2 字符集
dumpkeys -c latin2

# 只输出键盘映射表
dumpkeys -t
```

### 键盘映射备份与恢复

#### 备份当前键盘映射
```bash
# 备份当前键盘映射到文件
dumpkeys -f > my_keymap.map

# 备份简化的键盘映射
dumpkeys -s > simple_keymap.map

# 创建数值格式的备份
dumpkeys -n > numeric_keymap.map

# 备份特定控制台的映射
dumpkeys -C /dev/tty1 > tty1_keymap.map
```

#### 与 loadkeys 配合使用
```bash
# 备份当前键盘映射
dumpkeys > current_keymap

# 稍后恢复键盘映射
sudo loadkeys current_keymap

# 备份并压缩映射文件
dumpkeys | gzip > keymap_backup.gz

# 解压并恢复映射
gunzip -c keymap_backup.gz | sudo loadkeys
```

### 调试和故障排除

#### 检查键盘问题
```bash
# 查看详细的键盘映射信息
dumpkeys -l

# 检查组合键设置
dumpkeys -e

# 查看不包含默认映射的设置
dumpkeys -N

# 详细模式检查问题
dumpkeys -v
```

#### 特定键值检查
```bash
# 查看功能键映射
dumpkeys | grep -E "(F[1-9]|F10|F11|F12)"

# 查看控制键映射
dumpkeys | grep -E "(Control|Ctrl)"

# 查看修改键映射
dumpkeys | grep -E "(Alt|Shift|CapsLock)"

# 查看数字键盘映射
dumpkeys | grep -E "(KP_|NumLock)"
```

## 实际应用场景

### 系统管理场景

#### 键盘布局备份
```bash
#!/bin/bash
# 键盘映射备份脚本

BACKUP_DIR="/root/keyboard_backups"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 备份当前键盘映射
dumpkeys -f > "$BACKUP_DIR/keymap_full_$DATE.map"
dumpkeys -s > "$BACKUP_DIR/keymap_simple_$DATE.map"
dumpkeys -i > "$BACKUP_DIR/keymap_info_$DATE.txt"

echo "键盘映射已备份到 $BACKUP_DIR"
```

#### 多用户环境键盘配置
```bash
#!/bin/bash
# 为不同用户设置不同的键盘映射

USER_KEYMAP_DIR="/etc/keymaps"
DEFAULT_KEYMAP="$USER_KEYMAP_DIR/default.map"

# 创建默认键盘映射
if [ ! -f "$DEFAULT_KEYMAP" ]; then
    dumpkeys > "$DEFAULT_KEYMAP"
fi

# 为特定用户设置自定义映射
if [ "$USER" = "developer" ]; then
    loadkeys "$USER_KEYMAP_DIR/developer.map" 2>/dev/null || loadkeys "$DEFAULT_KEYMAP"
fi
```

#### 系统维护键盘检查
```bash
#!/bin/bash
# 系统键盘配置检查脚本

echo "=== 键盘配置检查报告 ==="
echo "检查时间: $(date)"
echo

# 检查键盘映射信息
echo "1. 键盘映射信息:"
dumpkeys -i | head -10
echo

# 检查字符集
echo "2. 当前字符集:"
dumpkeys -i | grep charset
echo

# 检查功能键
echo "3. 功能键映射:"
dumpkeys | grep -E "F[1-9]" | head -5
echo

# 检查组合键
echo "4. 组合键设置:"
dumpkeys -e | head -5
```

### 开发工作流

#### 键盘映射开发
```bash
#!/bin/bash
# 键盘映射开发环境设置

DEV_KEYMAP_DIR="$HOME/dev/keymaps"
CURRENT_MAP="$DEV_KEYMAP_DIR/current.map"
CUSTOM_MAP="$DEV_KEYMAP_DIR/custom.map"

# 创建开发目录
mkdir -p "$DEV_KEYMAP_DIR"

# 备份当前映射
dumpkeys > "$CURRENT_MAP"

# 创建基于当前映射的自定义映射
cp "$CURRENT_MAP" "$CUSTOM_MAP"

echo "键盘映射开发环境已设置"
echo "当前映射: $CURRENT_MAP"
echo "自定义映射: $CUSTOM_MAP"
```

#### 键盘映射测试
```bash
#!/bin/bash
# 键盘映射测试脚本

TEST_KEYMAP="$1"

if [ -z "$TEST_KEYMAP" ]; then
    echo "用法: $0 <keymap_file>"
    exit 1
fi

# 备份当前映射
dumpkeys > /tmp/backup_keymap.map

# 应用测试映射
if loadkeys "$TEST_KEYMAP"; then
    echo "键盘映射测试中... (按任意键恢复)"
    read -n 1

    # 恢复原始映射
    loadkeys /tmp/backup_keymap.map
    echo "已恢复原始键盘映射"
else
    echo "键盘映射文件无效"
fi

# 清理临时文件
rm -f /tmp/backup_keymap.map
```

### 调试和故障排除场景

#### 键盘问题诊断
```bash
#!/bin/bash
# 键盘问题诊断工具

echo "=== 键盘诊断工具 ==="
echo

# 检查键盘映射文件
echo "1. 键盘映射文件位置:"
find /usr/share/keymaps -name "*.map" 2>/dev/null | head -5
echo

# 检查当前键盘映射状态
echo "2. 当前键盘映射状态:"
dumpkeys -i | head -10
echo

# 检查可能的键盘映射问题
echo "3. 键盘映射问题检查:"
echo "   - 检查是否有重复的键映射:"
dumpkeys | cut -d'=' -f1 | sort | uniq -d | head -5
echo

# 检查特殊键
echo "4. 特殊键映射检查:"
for key in "Control" "Alt" "Shift" "CapsLock"; do
    echo "   $key 键映射:"
    dumpkeys | grep "$key" | head -2
done
```

## 高级用法

### 键盘映射分析

#### 键映射统计分析
```bash
#!/bin/bash
# 键盘映射统计分析

echo "=== 键盘映射统计分析 ==="
echo

# 统计键映射数量
TOTAL_KEYS=$(dumpkeys -t | grep -c "=")
echo "总键映射数量: $TOTAL_KEYS"

# 统计功能键数量
FUNC_KEYS=$(dumpkeys -t | grep -c "F[0-9]")
echo "功能键数量: $FUNC_KEYS"

# 统计修改键数量
MOD_KEYS=$(dumpkeys -t | grep -c -E "(Control|Alt|Shift)")
echo "修改键数量: $MOD_KEYS"

# 统计未定义的键
UNDEFINED_KEYS=$(dumpkeys -t | grep -c "nul")
echo "未定义键数量: $UNDEFINED_KEYS"
```

#### 键盘映射比较
```bash
#!/bin/bash
# 比较两个键盘映射文件

MAP1="$1"
MAP2="$2"

if [ -z "$MAP1" ] || [ -z "$MAP2" ]; then
    echo "用法: $0 <keymap1> <keymap2>"
    exit 1
fi

echo "比较键盘映射文件: $MAP1 vs $MAP2"
echo

# 比较键映射差异
echo "键映射差异:"
diff "$MAP1" "$MAP2" | grep -E "^[<>]" | head -10
echo

# 统计差异
DIFF_COUNT=$(diff "$MAP1" "$MAP2" | grep -c "^[<>]")
echo "总差异数量: $DIFF_COUNT"
```

### 自定义键盘映射生成

#### 基于当前映射创建自定义映射
```bash
#!/bin/bash
# 创建自定义键盘映射

OUTPUT_FILE="$1"

if [ -z "$OUTPUT_FILE" ]; then
    echo "用法: $0 <output_keymap>"
    exit 1
fi

# 获取当前映射作为基础
dumpkeys > temp_current.map

# 添加自定义键映射（示例）
cat >> temp_current.map << 'EOF'

# 自定义键映射
# 将 CapsLock 映射为 Control
keycode 58 = Control

# 将右 Alt 映射为 Compose
keycode 108 = Compose
EOF

# 生成最终映射文件
mv temp_current.map "$OUTPUT_FILE"

echo "自定义键盘映射已创建: $OUTPUT_FILE"
```

## 故障排除

### 常见问题和解决方案

#### dumpkeys 命令不存在
```bash
# 检查 kbd 包是否安装
which dumpkeys

# 在 Debian/Ubuntu 系统安装 kbd 包
sudo apt-get install kbd

# 在 Red Hat/CentOS 系统
sudo yum install kbd

# 在 Arch Linux
sudo pacman -S kbd
```

#### 权限问题
```bash
# 使用 sudo 运行 dumpkeys
sudo dumpkeys

# 检查设备权限
ls -l /dev/tty*

# 将用户添加到 tty 组（如需要）
sudo usermod -a -G tty $USER
```

#### 字符集问题
```bash
# 检查系统字符集
locale

# 使用正确的字符集参数
dumpkeys -c $(locale | grep LC_CTYPE | cut -d'=' -f2)

# 使用 UTF-8 兼容的字符集
dumpkeys -c utf8
```

#### 键盘映射恢复失败
```bash
# 检查映射文件格式
file my_keymap.map

# 检查映射文件语法
loadkeys --help

# 使用绝对路径恢复
sudo loadkeys /full/path/to/keymap.map
```

### 调试技巧

#### 验证键盘映射文件
```bash
#!/bin/bash
# 验证键盘映射文件的有效性

KEYMAP_FILE="$1"

if [ -z "$KEYMAP_FILE" ]; then
    echo "用法: $0 <keymap_file>"
    exit 1
fi

echo "验证键盘映射文件: $KEYMAP_FILE"

# 检查文件是否存在
if [ ! -f "$KEYMAP_FILE" ]; then
    echo "错误: 文件不存在"
    exit 1
fi

# 检查文件格式
echo "文件格式:"
file "$KEYMAP_FILE"

# 检查基本语法
echo "键映射行数:"
grep -c "keycode" "$KEYMAP_FILE" 2>/dev/null || echo "0"

# 检查是否有语法错误
echo "语法检查:"
loadkeys --test "$KEYMAP_FILE" 2>&1 | head -5
```

## 相关命令

### 键盘相关工具
- `loadkeys` - 加载键盘映射到内核
- `showkey` - 显示按键码和扫描码
- `setleds` - 控制键盘LED状态
- `kbd_mode` - 报告或设置键盘模式

### 控制台工具
- `consolechars` - 控制台字体工具
- `setfont` - 设置控制台字体
- `stty` - 设置终端选项

### 系统信息工具
- `locale` - 显示系统地区设置
- `xev` - X11事件查看器（图形环境）
- `evtest` - Linux输入事件测试

## 最佳实践

### 键盘映射管理
1. **备份策略**: 在修改键盘映射前始终备份当前设置
2. **测试环境**: 在测试环境中验证自定义映射
3. **文档记录**: 记录自定义映射的修改原因和内容
4. **用户适配**: 考虑不同用户的键盘使用习惯

### 性能优化
1. **文件大小**: 保持键盘映射文件的简洁
2. **加载速度**: 避免过于复杂的键映射规则
3. **内存使用**: 合理定义键映射，避免不必要的重复

### 安全考虑
1. **权限管理**: 限制键盘映射文件的修改权限
2. **审核日志**: 记录键盘映射的修改操作
3. **系统完整性**: 确保键盘映射不破坏系统功能

## 性能提示

### 提高响应速度
- 使用 `-s` 选项获取简短格式的映射表
- 避免在脚本中频繁调用 dumpkeys
- 缓存键盘映射信息供重复使用

### 内存优化
- 使用 `-t` 选项只获取映射表，减少输出
- 对于大量键映射操作，考虑分批处理
- 及时清理临时文件

### 网络环境
- 在远程连接中使用 `-C` 选项指定正确的控制台
- 考虑网络延迟对键盘响应的影响
- 使用压缩传输键盘映射文件

---

**dumpkeys** 是 Linux 系统中管理键盘映射的核心工具，为系统管理员和开发者提供了强大的键盘配置和调试能力。通过合理使用 dumpkeys 及相关工具，可以有效地管理 Linux 系统的键盘行为，解决各种键盘相关的问题。