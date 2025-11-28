---
title: isoformat - ISO 9660 Filesystem Creation and Formatting Tool
sidebar_label: isoformat
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# isoformat - ISO 9660 Filesystem Creation and Formatting Tool

The `isoformat` command is a comprehensive tool for creating ISO 9660 filesystem images, which are standardized optical disc formats used for CD-ROM, DVD, and Blu-ray media. This tool supports various filesystem extensions including Joliet for Unicode filenames, Rock Ridge for Unix-style permissions, and HFS for Macintosh compatibility. It's commonly used for creating bootable installation media, software distribution images, data backups, and archival storage of directory structures.

## Basic Syntax

```bash
isoformat [OPTIONS] -o output_image.iso source_directory
isoformat [OPTIONS] source_files... output_image.iso
```

## Common Command Modes

- **Default Mode** - Create basic ISO 9660 filesystem
- **Joliet Extension** - Enable long Unicode filenames
- **Rock Ridge Extension** - Preserve Unix permissions and attributes
- **HFS Hybrid** - Create hybrid ISO/HFS filesystem
- **Bootable Mode** - Create El Torito bootable images

## Core Options

### Output Control
- `-o FILE` - Specify output ISO image filename
- `-V VOLID` - Set volume ID (32 characters max)
- `-v` - Verbose output (show progress)
- `-quiet` - Suppress non-error messages
- `-print-size` - Print estimated filesystem size

### Filesystem Options
- `-J` - Enable Joliet extensions (Unicode support)
- `-R` or `-r` - Enable Rock Ridge extensions
- `-hfs` - Create HFS hybrid filesystem
- `-UDF` - Enable UDF filesystem support
- `-allow-lowercase` - Allow lowercase filenames
- `-allow-multidot` - Allow multiple dots in filenames

### File Selection
- `-graft-points` - Enable graft points for directory mapping
- `-path-list FILE` - Read source paths from file
- `-exclude-list FILE` - Exclude files listed in file
- `-m GLOB` - Exclude files matching glob pattern
- `-x DIR` - Exclude directory from image

## Usage Examples

### Basic ISO Creation

#### Simple Directory ISO
```bash
# Create basic ISO from directory
isoformat -o data.iso /home/user/documents/

# Create ISO with custom volume name
isoformat -V "MyData" -o backup.iso /backup/files/

# Create ISO with specific files
isoformat -o project.iso file1.txt file2.pdf program.exe
```

#### Verbose Output and Progress
```bash
# Create ISO with detailed progress
isoformat -v -o large.iso /huge/directory/

# Show estimated size before creation
isoformat -print-size -o test.iso /source/
```

### Extended Filesystem Features

#### Joliet Extensions (Unicode Support)
```bash
# Create ISO with Unicode filename support
isoformat -J -o unicode.iso /multilingual/files/

# Combine Joliet with Rock Ridge
isoformat -J -r -o extended.iso /source/directory/

# Create ISO for Windows compatibility
isoformat -J -allow-lowercase -allow-multidot -o windows.iso /files/
```

#### Rock Ridge Extensions (Unix Features)
```bash
# Preserve Unix permissions and symbolic links
isoformat -r -o unix_backup.iso /home/user/

# Create ISO with ownership preserved
isoformat -r -o system.iso /etc /var /home

# Use Rock Ridge with specific UID/GID
isoformat -r -uid 1000 -gid 1000 -o user_backup.iso /home/user/
```

#### HFS Hybrid Creation
```bash
# Create Mac/PC hybrid ISO
isoformat -hfs -o hybrid.iso /shared/files/

# Create ISO with HFS and Joliet
isoformat -hfs -J -o universal.iso /cross_platform/
```

### Bootable ISO Creation

#### El Torito Bootable Images
```bash
# Create bootable ISO with boot image
isoformat -b boot.img -o bootable.iso /installation/files/

# Create bootable ISO with boot catalog
isoformat -b boot.img -c boot.cat -o system.iso /boot/directory/

# Create no-emulation bootable ISO
isoformat -b boot.bin -no-emul-boot -boot-load-size 4 -o installer.iso /install/files/

# Create bootable ISO with boot info table
isoformat -b isolinux.bin -c boot.cat -no-emul-boot -boot-load-size 4 -boot-info-table -o live.iso /live/files/
```

#### UEFI Boot Support
```bash
# Create dual BIOS/UEFI bootable ISO
isoformat -b bios_boot.img -eltorito-alt-boot -e efi_boot.img -no-emul-boot -o dual_boot.iso /system/

# Create UEFI-only bootable ISO
isoformat -e efi_boot.img -no-emul-boot -o uefi.iso /uefi/files/
```

### Advanced File Selection and Filtering

#### Graft Points and Directory Mapping
```bash
# Map directories to different locations in ISO
isoformat -o mapped.iso /src/dir1=/target/dir1 /src/dir2=/target/dir2

# Create custom directory structure
isoformat -graft-points -o custom.iso \
    /documents=/home/user/docs \
    /photos=/media/pictures \
    /software=/usr/local/bin/tools
```

#### File Exclusion and Inclusion
```bash
# Exclude temporary files
isoformat -o clean.iso /source/ -x "*.tmp" -x "*.log" -x "cache/"

# Exclude directories
isoformat -o filtered.iso /project/ -x ".git" -x "node_modules" -x "build/"

# Use exclusion list file
echo "*.bak
*.temp
cache/
.git/" > exclude.txt
isoformat -exclude-list exclude.txt -o archive.iso /project/

# Include specific file types only
find /source -name "*.pdf" -o -name "*.doc" | isoformat -path-list - -o documents.iso
```

#### File Attribute Control
```bash
# Hide files from Joliet but keep in Rock Ridge
isoformat -J -r -hide-joliet *.iso -o mixed.iso /source/

# Set file permissions in ISO
isoformat -r -chmod 755 /bin/* -o exec.iso /programs/

# Set file timestamps
isoformat -date "20240101000000" -o dated.iso /archive/
```

### Specialized ISO Types

#### Software Distribution ISO
```bash
# Create software distribution ISO
isoformat -J -r -V "MySoftware v1.0" -o software_v1.0.iso \
    /build/release/ \
    -graft-points \
    /README=README.md \
    /LICENSE=LICENSE.txt \
    /docs=/documentation/ \
    /bin=/build/binaries/

# Create portable application ISO
isoformat -J -r -o portable_app.iso \
    -graft-points \
    /app=/application/ \
    /data=/config/ \
    /autorun.inf=autorun.inf
```

#### System Backup ISO
```bash
# Create system backup with permissions
isoformat -r -uid 0 -gid 0 -o system_backup.iso \
    /etc /var/log /home /usr/local

# Create incremental backup (compare with previous)
isoformat -r -o backup_$(date +%Y%m%d).iso /home/user/

# Create compressed backup structure
tar -czf - /important/data/ | isoformat -o backup.iso -gzip -
```

#### Multimedia Archive ISO
```bash
# Create photo archive ISO
isoformat -J -r -V "Photo Archive 2024" -o photos_2024.iso \
    /media/pictures/2024/

# Create music collection ISO
isoformat -J -V "Music Collection" -o music.iso \
    /media/music/ -x "*.m3u" -x "thumbs.db"

# Create video backup ISO with UDF
isoformat -J -UDF -V "Video Archive" -o videos.iso /media/videos/
```

## Practical Examples

### System Administration

#### Installation Media Creation
```bash
# Create Linux distribution ISO
isoformat -J -r -V "LinuxCustom" -o linux_custom.iso \
    /path/to/distro/files/ \
    -b isolinux.bin -c boot.cat \
    -no-emul-boot -boot-load-size 4 -boot-info-table

# Create Windows PE ISO
isoformat -J -V "WinPE" -o winpe.iso \
    /winpe/sources/ \
    -b etfsboot.com -no-emul-boot

# Create rescue disk ISO
isoformat -J -r -V "RescueDisk" -o rescue.iso \
    /rescue/files/ \
    -b memdisk -c boot.cat \
    -no-emul-boot -boot-load-size 4
```

#### Network Boot Images
```bash
# Create PXE boot ISO
isoformat -J -r -o pxe_boot.iso /tftpboot/ \
    -b pxelinux.0 -c boot.cat \
    -no-emul-boot -boot-load-size 4

# Create diskless client ISO
isoformat -J -r -V "DisklessClient" -o diskless.iso \
    /netboot/client/ \
    -b kernel -c boot.cat \
    -no-emul-boot -boot-load-size 4
```

### Development Workflow

#### Application Distribution
```bash
# Create cross-platform application ISO
isoformat -J -r -hfs -o app_crossplatform.iso \
    -graft-points \
    /windows=/build/windows/ \
    /linux=/build/linux/ \
    /macos=/build/macos/ \
    /docs=/documentation/ \
    /examples=/sample_code/

# Create source code archive ISO
isoformat -J -r -V "SourceCode_v2.1" -o source_v2.1.iso \
    /src/ \
    -exclude-list exclude_dev.txt \
    -graft-points \
    /README=README.md \
    /CHANGELOG=CHANGELOG.md \
    /LICENSE=LICENSE.txt
```

#### Documentation Distribution
```bash
# Create technical documentation ISO
isoformat -J -r -V "TechDocs" -o techdocs.iso \
    /documentation/ \
    -graft-points \
    /index.html=index.html \
    /search=search.html \
    /help=/help_files/

# Create training materials ISO
isoformat -J -V "TrainingCourse" -o training.iso \
    -graft-points \
    /slides=/presentation_slides/ \
    /exercises=/lab_exercises/ \
    /resources=/additional_resources/ \
    /README=training_guide.txt
```

## Advanced Usage

### Performance Optimization

#### Memory and Buffer Management
```bash
# Use specific buffer size for large files
isoformat -b 32M -o large.iso /huge/files/

# Optimize for many small files
isoformat -sort sort_file.txt -o optimized.iso /many_files/

# Create ISO with streaming
tar -cf - /source/ | isoformat -o streamed.iso -
```

#### Parallel Processing
```bash
# Create multiple ISOs in parallel
for dir in /data/*/; do
    (isoformat -o "$(basename "$dir").iso" "$dir" &) &
done
wait

# Create ISO with background processing
isoformat -o background.iso /source/ &
progress_pid=$!
# Monitor progress here
wait $progress_pid
```

### Customization and Special Features

#### Custom File Ordering
```bash
# Sort files for optimal access
echo "/boot/kernel
/boot/initrd
/important/config
/data" > sort_order.txt
isoformat -sort sort_order.txt -o optimized.iso /system/
```

#### Volume Label and Metadata
```bash
# Create ISO with extended metadata
isoformat -V "Archive_2024_Q1" \
    -publisher "MyCompany" \
    -preparer "SystemAdmin" \
    -appid "BackupSystem v2.0" \
    -sysid "LINUX" \
    -o metadata.iso /backup/

# Create ISO with abstract and bibliographic files
isoformat -abstract abstract.txt -biblio biblio.txt -o documented.iso /data/
```

#### Custom Volume Attributes
```bash
# Set creation date and modification date
isoformat -date "20240101000000" -o dated.iso /archive/

# Create ISO with specific file system parameters
isoformat -iso-level 4 -o modern.iso /new_files/
```

## Integration and Automation

### Shell Scripts

#### Automated Backup Script
```bash
#!/bin/bash
# Automated ISO backup with rotation

BACKUP_DIR="/backups"
SOURCE_DIR="/important/data"
MAX_BACKUPS=7
DATE=$(date +%Y%m%d_%H%M%S)

# Create ISO backup
isoformat -J -r -V "Backup_$DATE" -o "$BACKUP_DIR/backup_$DATE.iso" "$SOURCE_DIR"

# Verify ISO creation
if [ $? -eq 0 ]; then
    echo "Backup created successfully: backup_$DATE.iso"

    # Clean up old backups
    cd "$BACKUP_DIR"
    ls -t backup_*.iso | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm
    echo "Old backups cleaned up"
else
    echo "Backup creation failed!"
    exit 1
fi
```

#### ISO Creation Pipeline
```bash
#!/bin/bash
# Pipeline for creating distribution ISO

SOURCE="/build/output"
OUTPUT="/distrib/app.iso"
TEMP_SORT="/tmp/sort_list.txt"

# Create file sorting list
echo "/application/" > "$TEMP_SORT"
echo "/data/" >> "$TEMP_SORT"
echo "/documentation/" >> "$TEMP_SORT"

# Create ISO with optimizations
isoformat -J -r \
    -V "MyApplication_v2.0" \
    -sort "$TEMP_SORT" \
    -b boot.img -c boot.cat \
    -no-emul-boot -boot-load-size 4 \
    -o "$OUTPUT" "$SOURCE"

# Verify and create checksum
if [ -f "$OUTPUT" ]; then
    sha256sum "$OUTPUT" > "${OUTPUT}.sha256"
    echo "ISO created and verified: $OUTPUT"
    ls -lh "$OUTPUT"
else
    echo "ISO creation failed!"
    exit 1
fi

rm "$TEMP_SORT"
```

### Makefile Integration
```makefile
# Makefile for ISO creation
SOURCE_DIR = ./src
OUTPUT_DIR = ./dist
ISO_NAME = application.iso

.PHONY: iso clean

iso:
	@mkdir -p $(OUTPUT_DIR)
	isoformat -J -r -V "MyApp" -o $(OUTPUT_DIR)/$(ISO_NAME) $(SOURCE_DIR)

clean:
	rm -f $(OUTPUT_DIR)/$(ISO_NAME)

help:
	@echo "Available targets:"
	@echo "  iso   - Create ISO image"
	@echo "  clean - Remove ISO image"
```

## Troubleshooting

### Common Issues

#### Filesystem Limitations
```bash
# ISO 9660 Level 1 limitations (8.3 filenames)
isoformat -iso-level 1 -o compatible.iso /old_system/

# ISO 9660 Level 2 (31 character filenames)
isoformat -iso-level 2 -o level2.iso /source/

# ISO 9660 Level 3 (no file size limit)
isoformat -iso-level 3 -o level3.iso /large_files/
```

#### Character Encoding Issues
```bash
# Specify input character set
isoformat -input-charset UTF-8 -J -o unicode.iso /unicode_files/

# Specify output character set
isoformat -output-charset UTF-8 -J -o output.iso /source/

# Use legacy character sets for compatibility
isoformat -input-charset ISO-8859-1 -J -o legacy.iso /old_files/
```

#### Boot Image Issues
```bash
# Create bootable ISO with proper boot image size
isoformat -b boot.img -boot-load-size 4 -no-emul-boot -o boot.iso /files/

# Fix boot image not found
isoformat -b isolinux.bin -c boot.cat -no-emul-boot -boot-info-table -o fixed.iso /files/

# Create BIOS-only bootable ISO
isoformat -b bios.img -no-emul-boot -o bios_only.iso /bios_files/
```

#### Large File and Directory Issues
```bash
# Handle files larger than 2GB
isoformat -iso-level 3 -o large_files.iso /huge_files/

# Handle deep directory structures
isoformat -r -deep-iso -o deep_structure.iso /very/deep/tree/

# Optimize for many small files
isoformat -sort small_files.txt -o many_small.iso /small_files/
```

### Verification and Testing

#### ISO Image Verification
```bash
# Check ISO integrity
isoinfo -d -i image.iso

# List ISO contents
isoinfo -l -i image.iso

# Extract files from ISO for verification
isoinfo -x "/path/to/file" -i image.iso > extracted_file

# Mount ISO for testing
mkdir -p /tmp/iso_test
mount -o loop image.iso /tmp/iso_test
ls -la /tmp/iso_test/
umount /tmp/iso_test
```

#### Boot Testing
```bash
# Test bootable ISO with QEMU
qemu-system-x86_64 -cdrom bootable.iso

# Test UEFI boot
qemu-system-x86_64 -bios /usr/share/ovmf/OVMF.fd -cdrom uefi.iso
```

## Related Commands

- [`mkisofs`](/docs/commands/other/mkisofs) - Original ISO 9660 filesystem creator
- [`genisoimage`](/docs/commands/other/genisoimage) - Enhanced ISO creation tool
- [`xorriso`](/docs/commands/other/xorriso) - ISO manipulation and burning tool
- [`xorrisofs`](/docs/commands/other/xorrisofs) - ISO 9660 Rock Ridge frontend
- [`isoinfo`](/docs/commands/other/isoinfo) - ISO 9660 image information utility
- [`cdrecord`](/docs/commands/other/cdrecord) - CD/DVD recording tool
- [`wodim`](/docs/commands/other/wodim) - Optical media burning utility
- [`growisofs`](/docs/commands/other/growisofs) - DVD/Blu-ray recording tool

## Best Practices

1. **Always use Joliet extensions** (-J) for cross-platform compatibility
2. **Use Rock Ridge extensions** (-r) when preserving Unix permissions
3. **Set appropriate volume labels** (-V) for easy identification
4. **Test bootable ISOs** in virtual machines before burning
5. **Verify ISO integrity** after creation using isoinfo
6. **Use exclusion patterns** to avoid including unnecessary files
7. **Sort files** for optimal access performance
8. **Consider file size limits** for target platform compatibility
9. **Use graft points** for custom directory structures
10. **Create checksums** of ISO files for integrity verification

## Performance Tips

1. **Level 3 ISO** provides best performance for large files
2. **File sorting** improves access time for frequently used files
3. **Buffer size** tuning helps with large file operations
4. **Parallel processing** for multiple ISO creation
5. **Exclude unnecessary files** to reduce creation time
6. **Use appropriate filesystem extensions** for your use case
7. **Memory allocation** affects performance with many small files
8. **Verbose output** helps identify bottlenecks in creation process

The `isoformat` command provides comprehensive ISO 9660 filesystem creation capabilities with extensive support for modern filesystem extensions, bootable images, and cross-platform compatibility. Its rich feature set makes it an essential tool for creating installation media, software distributions, system backups, and archival storage solutions.