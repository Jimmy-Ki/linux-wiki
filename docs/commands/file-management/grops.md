---
title: grops - GNU roff PostScript 输出驱动程序
sidebar_label: grops
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# grops - GNU roff PostScript 输出驱动程序

`grops` 是 GNU roff (groff) 文档格式化系统的 PostScript 输出驱动程序。它将 groff 处理器生成的中间输出转换为高质量、可打印的 PostScript 格式文档。grops 是整个 groff 生态系统中的重要组件，专门用于生成专业级的文档输出，支持复杂的排版、字体处理、图形元素和颜色。作为文档发布和打印的标准工具，grops 广泛应用于技术手册、学术论文、书籍和其他专业文档的最终输出处理。

## 基本语法

```bash
grops [选项] [文件]
```

## 常用命令选项

### 输出控制选项

| 选项 | 描述 |
|------|------|
| `-b` | 设置页面底部边距 |
| `-c` | 创建彩色 PostScript 输出 |
| `-F` | 指定字体目录路径 |
| `-l` | 设置页面左边距 |
| `-n` | 不生成分页符（连续输出） |
| `-o` | 设置输出文件名 |
| `-p` | 设置纸张尺寸（如 a4, letter, legal） |
| `-r` | 设置页面右边距 |
| `-t` | 设置页面顶部边距 |
| `-w` | 设置页面宽度 |

### 字体和编码选项

| 选项 | 描述 |
|------|------|
| `-f` | 指定默认字体 |
| `-m` | 指定宏文件 |
| `-V` | 显示版本信息后退出 |
| `-v` | 启用详细输出模式 |

### 高级输出选项

| 选项 | 描述 |
|------|------|
| `-g` | 设置灰度级别 |
| `-P` | 传递选项给打印机 |
| `-T` | 指定设备类型（postscript） |
| `-Z` | 压缩 PostScript 输出 |

## 使用示例

### 基本转换操作

#### 基本文档转换
```bash
# 将 roff 格式文件转换为 PostScript
grops document.roff > document.ps

# 使用 groff 处理后直接输出到 grops
groff -mandoc file.1 | grops > file.ps

# 转换并直接打印
groff -man manual.1 | grops | lpr
```

#### 处理不同文档格式
```bash
# 处理 me 宏包文档
groff -me document.me | grops > document.ps

# 处理 ms 宏包文档
groff -ms report.ms | grops > report.ps

# 处理 mm 宏包文档
groff -mm memo.mm | grops > memo.ps
```

### 页面格式和布局

#### 设置页面尺寸和边距
```bash
# 使用 A4 纸张
grops -pa4 document.roff > a4_document.ps

# 使用 Letter 纸张
grops -pletter document.roff > letter_document.ps

# 设置自定义边距
grops -l1.5in -r1.5in -t1in -b1in document.roff > custom_margin.ps

# 设置页面尺寸（单位：英寸）
grops -p8.5x11in document.roff > us_letter.ps
```

#### 多列和复杂布局
```bash
# 生成两列文档
groff -ms -nLL=2 document.ms | grops > two_column.ps

# 设置行间距
groff -p11 -r8 document.t | grops > custom_spacing.ps

# 使用自定义宏定义复杂布局
groff -m custom_macros document.roff | grops > complex_layout.ps
```

### 字体和样式处理

#### 字体配置和替换
```bash
# 指定默认字体
grops -fTimes document.roff > times_document.ps

# 使用 Helvetica 字体
grops -fHelvetica document.roff > helvetica_document.ps

# 使用 Courier 字体
grops -fCourier document.roff > courier_document.ps

# 指定字体目录
grops -F/usr/share/groff/current/font document.roff > custom_font.ps
```

#### 字体编码和特殊字符
```bash
# 使用 Latin1 编码
groff -mlatin1 document | grops > latin1.ps

# 处理 UTF-8 文档
groff -Kutf8 document | grops > utf8_document.ps

# 包含特殊字符的文档
groff -Tps -mhtml document | grops > special_chars.ps
```

### 颜色和图形处理

#### 彩色文档生成
```bash
# 生成彩色 PostScript
grops -c document.roff > color_document.ps

# 设置灰度级别
grops -g0.5 document.roff > grayscale.ps

# 彩色图表文档
groff -m tmac.color document | grops -c > color_charts.ps
```

#### 图形和绘图集成
```bash
# 包含 Pic 图形
groff -p document.pic | grops > graphics.ps

# 包含 Eqn 数学公式
groff -e equations | grops > math_formulas.ps

# 包含 Grap 图表
groff -G chart.grap | grops > charts.ps

# 组合多种图形元素
groff -p -e -G -Tps document | grops > mixed_graphics.ps
```

## 实际应用场景

### 技术文档生成

#### 手册页转换
```bash
# 将单个手册页转换为 PostScript
man -t ls | grops > ls_man.ps

# 批量转换手册页
for page in ls cat grep; do
    man -t $page | grops > ${page}_man.ps
done

# 创建手册页合集
{
    for page in ls cat grep sed awk; do
        man -t $page
    done
} | grops > unix_commands.ps
```

#### API 文档生成
```bash
# 从源码注释生成文档
doxygen -Tps project | grops > api_documentation.ps

# 生成函数参考手册
groff -mm api_ref.mm | grops > api_reference.ps

# 创建索引和目录
groff -mm -rHC project.mm | grops > indexed_document.ps
```

### 学术论文处理

#### 学术文档排版
```bash
# 处理 LaTeX 兼容的文档
groff -ms -rsC thesis.ms | grops > thesis.ps

# 生成论文格式文档
groff -me paper.me | grops -pa4 > paper.ps

# 包含引用和参考文献
groff -m biblio document.ms | grops > cited_paper.ps
```

#### 期刊和会议论文
```bash
# IEEE 格式论文
groff -m ieee paper.ms | grops > ieee_paper.ps

# ACM 格式论文
groff -m acm paper.ms | grops > acm_paper.ps

# 双栏会议论文格式
groff -ms -nLL=2 conference.ms | grops > conference_paper.ps
```

### 书籍和长文档处理

#### 书籍章节处理
```bash
# 处理单章节
groff -mm chapter01.mm | grops > chapter01.ps

# 合并多个章节
{
    cat chapter01.mm
    cat chapter02.mm
    cat chapter03.mm
} | groff -mm | grops > complete_book.ps

# 分页处理长文档
groff -mm -rC large_book.mm | grops > paginated_book.ps
```

#### 目录和索引生成
```bash
# 生成带目录的文档
groff -mm -rTC book.mm | grops > book_with_toc.ps

# 生成带索引的文档
groff -mm -rHC -rTC book.mm | grops > complete_book.ps

# 创建词汇表
groff -mm -rLG -rTC glossary.mm | grops > glossaried_doc.ps
```

## 高级用法

### 批量处理和自动化

#### 批量文档转换
```bash
#!/bin/bash
# 批量转换 roff 文档为 PostScript

for file in *.roff; do
    if [ -f "$file" ]; then
        ps_file="${file%.roff}.ps"
        echo "Converting $file to $ps_file..."
        grops "$file" > "$ps_file"

        # 验证转换结果
        if [ $? -eq 0 ]; then
            echo "Successfully converted $file"
        else
            echo "Failed to convert $file"
        fi
    fi
done
```

#### 文档处理管道
```bash
# 复杂的文档处理流程
cat source.roff | \
    groff -preconv -Kutf8 | \
    grops -c -pa4 | \
    gs -sDEVICE=pdfwrite -sOutputFile=document.pdf -

# 文档压缩和优化
grops document.roff | \
    gs -sDEVICE=pswrite -dNOCACHE -sOutputFile=document_opt.ps -

# 添加水印
grops document.roff | \
    gs -sDEVICE=pswrite -c "<</Watermark (CONFIDENTIAL)>> setpagedevice" -f - > watermarked.ps
```

### 打印优化

#### 打印机特定设置
```bash
# 针对特定打印机的优化
grops -P"-o sides=duplex" document.roff | lpr

# 设置打印质量
grops -P"-o resolution=600" document.roff | lpr

# 多份打印
grops document.roff | lpr -#5

# 双面打印
grops document.roff | lpr -o sides=two-sided-long-edge
```

#### 预览和校对
```bash
# 生成预览版本
groff -t document.roff | grops -n > preview.ps

# 生成校对标记版本
groff -m proofread document.roff | grops > proofread.ps

# 添加页码标记
groff -mm -rPM document.mm | grops > paginated.ps
```

### 跨平台兼容性

#### 不同系统兼容
```bash
# 生成 Windows 兼容的 PostScript
grops document.roff | \
    gs -sDEVICE=pswrite -dCompatibilityLevel=1.3 -sOutputFile=win_compatible.ps -

# 生成 Mac 兼容的输出
grops -fTimes document.roff > mac_compatible.ps

# 生成网络打印友好的版本
grops -dLevel2 document.roff > network_ready.ps
```

#### 格式转换
```bash
# PostScript 到 PDF 转换
grops document.roff | gs -sDEVICE=pdfwrite -sOutputFile=document.pdf -

# PostScript 到图像转换
grops document.roff | gs -sDEVICE=jpeg -r300 -sOutputFile=page_%d.jpg -

# 生成 EPS 封装
grops -c figure.roff | gs -sDEVICE=epswrite -sOutputFile=figure.eps
```

## 故障排除

### 常见问题和解决方案

#### 字体相关问题
```bash
# 字体未找到错误
# 解决方案：指定正确的字体目录
grops -F/usr/share/fonts/type1 document.roff > output.ps

# 字体替换问题
# 解决方案：明确指定可用字体
grops -fHelvetica -fTimes document.roff > safe_font.ps

# 字体编码问题
# 解决方案：指定正确的编码
groff -mlatin1 document | grops > encoded.ps
```

#### 内存和性能问题
```bash
# 大文档处理内存不足
# 解决方案：分块处理
split -b 10M large_document.roff chunk_
for chunk in chunk_*; do
    grops "$chunk" > "${chunk}.ps"
done

# 处理速度慢
# 解决方案：简化文档或降低分辨率
groff -ms -rNOLIMIT document.ms | grops > optimized.ps
```

#### 输出质量问题
```bash
# 图形质量差
# 解决方案：增加分辨率设置
groff -Tps -X300 document | grops > high_quality.ps

# 颜色显示异常
# 解决方案：明确指定颜色模式
grops -c -g1.0 document.roff > full_color.ps

# 页面布局错乱
# 解决方案：检查页面设置
grops -pletter -l1in -r1in -t1in -b1in document.roff > fixed_layout.ps
```

## 相关命令

- [`groff`](/docs/commands/development/groff) - GNU 文档格式化系统
- [`troff`](/docs/commands/development/troff) - 传统的 roff 格式化器
- [`nroff`](/docs/commands/development/nroff) - 用于终端输出的 roff 格式化器
- [`grohtml`](/docs/commands/file-management/grohtml) - HTML 输出驱动程序
- [`grotty`](/docs/commands/file-management/grotty) - 终端输出驱动程序
- [`gxditview`](/docs/commands/file-management/gxditview) - X11 预览器
- [`lpr`](/docs/commands/system-services/lpr) - 打印命令
- [`gs`](/docs/commands/other-tools/gs) - Ghostscript 解释器
- [`ps2pdf`](/docs/commands/other-tools/ps2pdf) - PostScript 到 PDF 转换器

## 最佳实践

1. **选择合适的纸张尺寸**：根据文档用途选择 -pa4 或 -pletter 选项
2. **设置合理边距**：使用 -l、-r、-t、-b 选项设置适当的页面边距
3. **字体管理**：确保目标系统有所需字体，或使用标准字体避免兼容性问题
4. **编码处理**：明确指定文档编码以避免字符显示问题
5. **输出验证**：转换后检查 PostScript 文件的有效性
6. **批量处理**：对于大量文档，编写脚本进行批量转换
7. **内存优化**：处理大文档时注意内存使用，必要时分块处理
8. **打印优化**：根据打印机能力调整输出设置
9. **版本控制**：保存 groff 源文件而不仅仅是 PostScript 输出
10. **测试输出**：在大批量生产前先测试单页输出

## 性能优化建议

1. **字体缓存**：重复使用相同的字体以提高处理速度
2. **批量处理**：一次处理多个文件而非逐个转换
3. **内存管理**：处理大文档时监控内存使用情况
4. **输出优化**：使用 -Z 选项压缩输出文件
5. **并行处理**：在多核系统上并行处理独立文档
6. **预编译宏**：预编译常用宏文件以减少加载时间
7. **缓存结果**：缓存常用文档格式的转换结果
8. **简化文档**：移除不必要的格式和图形以提高处理速度
9. **分级质量**：根据最终用途选择合适的输出质量级别
10. **资源监控**：监控 CPU 和内存使用以优化处理参数

`grops` 命令是专业文档发布工作流中的关键工具，它将 groff 强大的排版能力与 PostScript 的高质量输出相结合，为用户提供了创建专业、可打印文档的完整解决方案。通过掌握 grops 的各种选项和最佳实践，用户可以生成符合最高质量标准的技术文档、学术论文、书籍和其他专业出版物。