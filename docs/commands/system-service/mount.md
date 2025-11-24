---
title: mount Command
description: Mounts filesystems and devices, making them accessible within the Linux directory tree.
categories:
  - system-administration
  - filesystem
tags:
  - filesystem
  - storage
  - mount
  - devices
toc: true
---

# mount Command

The `mount` command attaches filesystems to the Linux directory tree, making files and directories accessible. It's essential for accessing storage devices, network shares, and special filesystems.

## Syntax

```bash
mount [options] device directory
mount [options] | directory | device
mount -a [options]
```

## Basic Usage

**Mount a device:**
```bash
mount /dev/sda1 /mnt/data
```

**Mount with specific options:**
```bash
mount -o ro /dev/sda1 /mnt/data
```

**Mount all filesystems from /etc/fstab:**
```bash
mount -a
```

## Common Filesystem Types

| Type | Description | Example |
|------|-------------|---------|
| `ext4` | Linux Extended Filesystem 4 | `mount -t ext4 /dev/sda1 /mnt` |
| `xfs` | XFS Filesystem | `mount -t xfs /dev/sda1 /mnt` |
| `ntfs` | Windows NTFS | `mount -t ntfs /dev/sda1 /mnt` |
| `vfat` | FAT32/VFAT | `mount -t vfat /dev/sda1 /mnt` |
| `iso9660` | CD/DVD ISO | `mount -t iso9660 /dev/cdrom /mnt` |
| `nfs` | Network File System | `mount -t nfs server:/share /mnt` |
| `cifs` | Windows/Samba Share | `mount -t cifs //server/share /mnt` |
| `tmpfs` | Temporary Filesystem | `mount -t tmpfs tmpfs /tmp` |
| `proc` | Process Information | `mount -t proc proc /proc` |
| `sysfs` | System Information | `mount -t sysfs sysfs /sys` |

## Mount Options

### Read/Write Options

| Option | Description |
|--------|-------------|
| `ro` | Read-only |
| `rw` | Read-write (default) |
| `sync` | Synchronous I/O |
| `async` | Asynchronous I/O (default) |
| `remount` | Remount with different options |

### Filesystem Behavior

| Option | Description |
|--------|-------------|
| `atime` | Update access time on read (default) |
| `noatime` | Don't update access time |
| `relatime` | Update access time relative to modification |
| `nodiratime` | Don't update directory access time |

### User and Security Options

| Option | Description |
|--------|-------------|
| `user` | Allow any user to mount/unmount |
| `users` | Allow any user to mount, any user to unmount |
| `nouser` | Only root can mount (default) |
| `exec` | Allow execution of binaries (default) |
| `noexec` | Don't allow execution of binaries |
| `suid` | Honor setuid and setgid bits (default) |
| `nosuid` | Ignore setuid and setgid bits |
| `dev` | Honor device files (default) |
| `nodev` | Ignore device files |

### Performance Options

| Option | Description |
|--------|-------------|
| `defaults` | Default options: rw, suid, dev, exec, auto, nouser, async |
| `auto` | Mount automatically at boot |
| `noauto` | Don't mount automatically |
| `noatime` | Improve performance by not updating access time |

## Usage Examples

### Basic Mounting

**Mount hard disk partition:**
```bash
mount /dev/sdb1 /mnt/backup
```

**Mount USB drive:**
```bash
mount /dev/sdb1 /media/usb
```

**Mount with read-only access:**
```bash
mount -o ro /dev/sdb1 /mnt/readonly
```

**Mount with specific user:**
```bash
mount -o uid=1000,gid=1000 /dev/sdb1 /mnt/userdata
```

### Special Mounts

**Mount ISO image:**
```bash
mount -o loop image.iso /mnt/cdrom
```

**Mount swap file as loop device:**
```bash
mount -o loop /swapfile /mnt/swap
```

**Mount tmpfs in memory:**
```bash
mount -t tmpfs -o size=1G tmpfs /tmp
```

**Mount with specific filesystem type:**
```bash
mount -t ext4 /dev/sda1 /mnt/data
```

### Network Mounts

**Mount NFS share:**
```bash
mount -t nfs server:/path/to/share /mnt/nfs
```

**Mount NFS with options:**
```bash
mount -t nfs -o rsize=8192,wsize=8192 server:/share /mnt/nfs
```

**Mount Windows/Samba share:**
```bash
mount -t cifs //server/share /mnt/smb -o username=user,password=pass
```

**Mount WebDAV share:**
```bash
mount -t davfs https://webdav.example.com /mnt/webdav
```

### Remounting

**Remount as read-only:**
```bash
mount -o remount,ro /mnt/data
```

**Remount as read-write:**
```bash
mount -o remount,rw /mnt/data
```

**Remount with different options:**
```bash
mount -o remount,noatime /mnt/data
```

## /etc/fstab Configuration

**fstab format:**
```
device         mountpoint     fstype     options      dump  pass
/dev/sda1      /              ext4       defaults     0     1
/dev/sda2      /home          ext4       defaults     0     2
```

**Common fstab entries:**

**Standard Linux partition:**
```
/dev/sda1      /data          ext4       defaults,noatime 0 2
```

**Windows partition:**
```
/dev/sdb1      /windows       ntfs-3g    defaults,uid=1000,gid=1000 0 0
```

**USB drive:**
```
/dev/sdc1      /media/usb     vfat       defaults,user,utf8,uid=1000,gid=1000 0 0
```

**Network share:**
```
server:/share  /mnt/nfs       nfs        defaults 0 0
```

**Temporary filesystem:**
```
tmpfs          /tmp           tmpfs      defaults,size=2G 0 0
```

## Advanced Options

### Bind Mounts

**Create bind mount:**
```bash
mount --bind /source/path /dest/path
```

**Make bind mount read-only:**
```bash
mount --bind /source/path /dest/path -o ro
```

**Bind mount in fstab:**
```
/source/path   /dest/path     none       bind      0 0
```

### Overlay Mounts

**Create overlay filesystem:**
```bash
mount -t overlay overlay \
  -o lowerdir=/lower,upperdir=/upper,workdir=/work \
  /merged
```

### Mount by Label or UUID

**Mount by label:**
```bash
mount -L DATA /mnt/data
```

**Mount by UUID:**
```bash
mount -U 1234-5678 /mnt/data
```

**Find filesystem UUID:**
```bash
blkid /dev/sda1
ls -l /dev/disk/by-uuid/
```

## Troubleshooting

### Common Issues

**Device busy:**
```bash
# Find processes using the mount
lsof /mnt/data
fuser -m /mnt/data

# Force unmount (may cause data loss)
umount -l /mnt/data
```

**Permission denied:**
```bash
# Check mount point permissions
ls -la /mnt/data

# Mount with specific permissions
mount -o uid=1000,gid=1000 /dev/sdb1 /mnt/data
```

**Unknown filesystem type:**
```bash
# Install required filesystem drivers
sudo apt-get install ntfs-3g  # for NTFS
sudo apt-get install nfs-common  # for NFS
```

### Finding Mount Information

**List all mounts:**
```bash
mount
mount | grep /mnt
```

**Show mount details:**
```bash
findmnt /mnt/data
mount -l | grep /mnt/data
```

**Check available filesystems:**
```bash
cat /proc/filesystems
```

**List block devices:**
```bash
lsblk
fdisk -l
```

## Security Considerations

### Secure Mounting Options

**User data directory:**
```bash
mount -o noexec,nosuid,nodev /home/user
```

**Temporary directories:**
```bash
mount -o noexec,nosuid,nodev /tmp
mount -o noexec,nosuid,nodev /var/tmp
```

**Removable media:**
```bash
mount -o nosuid,nodev,noexec /media/usb
```

### Encryption and Security

**Encrypted filesystem:**
```bash
cryptsetup open /dev/sdb1 crypt_data
mount /dev/mapper/crypt_data /mnt/data
```

**Mount with nosuid for security:**
```bash
mount -o nosuid /dev/sdb1 /mnt/data
```

## Performance Optimization

### SSD Optimization

**Mount SSD with noatime:**
```
/dev/sda1      /              ext4       defaults,noatime,discard 0 1
```

**Disable journaling for performance:**
```bash
mount -o data=writeback /dev/sda1 /mnt/data
```

### Database Optimization

**Database data directory:**
```bash
mount -o noatime,nodiratime,data=writeback /var/lib/mysql
```

## Best Practices

1. **Always use /etc/fstab** for permanent mounts
2. **Test mounts first** before adding to fstab
3. **Use appropriate options** for security and performance
4. **Monitor mount usage** with `df -h` and `mount`
5. **Backup important data** before mounting
6. **Use UUIDs instead of device names** in fstab
7. **Test automatic mounts** after reboot

## Integration with systemd

**Mount unit files:**
```ini
[Unit]
Description=Data Mount
After=network.target

[Mount]
What=/dev/sdb1
Where=/mnt/data
Type=ext4
Options=defaults

[Install]
WantedBy=multi-user.target
```

**Enable mount unit:**
```bash
systemctl enable mnt-data.mount
systemctl start mnt-data.mount
```

---

*Content adapted from the linux-command project. Original content available at [https://github.com/jaywcjlove/linux-command](https://github.com/jaywcjlove/linux-command)*