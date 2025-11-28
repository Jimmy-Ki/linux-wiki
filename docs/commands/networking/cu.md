---
title: cu - Call Up Another System
sidebar_label: cu
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cu - Call Up Another System

The `cu` command (Call Up) is a Unix/Linux utility used to establish connections with remote systems over serial lines, modems, or direct connections. It functions as a dial-in terminal that allows users to connect to other computers, network devices, or systems via telephone lines or serial ports. The cu command is part of the UUCP (Unix-to-Unix Copy) system and provides both interactive terminal sessions and simple file transfer capabilities without error checking.

## Basic Syntax

```bash
cu [options] [system | phone | "dir"]
```

## Command Line Options

### Connection Options

| Option | Long Option | Description |
|--------|-------------|-------------|
| `-a port` | `--port port` | Use named port for connection |
| `-l line` | `--line line` | Use named device (e.g., ttyS0, ttyUSB0) |
| `-s speed` | `--speed speed`<br>`--baud speed`<br>`-#` | Set connection speed/baud rate |
| `-c phone` | `--phone phone` | Phone number to call |
| `-z system` | `--system system` | System name to call from UUCP config |
| `-n` | `--prompt` | Prompt for phone number |

### Terminal Options

| Option | Long Option | Description |
|--------|-------------|-------------|
| `-E char` | `--escape char` | Set escape character (default: ~) |
| `-h` | `--halfduplex` | Enable local echo (half duplex) |
| `--nostop` | | Turn off XON/XOFF flow control |
| `-t` | `--mapcr` | Map carriage return to CR/LF |

### Parity Options

| Option | Long Option | Description |
|--------|-------------|-------------|
| `-e` | | Set even parity |
| `-o` | | Set odd parity |
| `--parity={odd,even,none}` | | Set specific parity mode |

### Debug and Configuration

| Option | Long Option | Description |
|--------|-------------|-------------|
| `-d` | | Set maximum debugging level |
| `-x debug` | `--debug debug` | Set specific debugging type |
| `-I file` | `--config file` | Specify configuration file |
| `-v` | `--version` | Display version information |
| `--help` | | Display help information |

## In-Session Commands

Once connected, cu recognizes several commands that begin with the escape character (default: `~`). These commands must be at the beginning of a line.

### Connection Control

| Command | Description |
|---------|-------------|
| `~.` | Terminate the conversation and exit cu |
| `~^Z` | Suspend cu (only works with ~escape char) |
| `~%break` | Send break signal to remote system |
| `~%debug` | Toggle debug mode |

### Local Shell Commands

| Command | Description |
|---------|-------------|
| `~!command` | Execute local shell command |
| `~!` | Start local shell |
| `~$command` | Execute command, send output to remote |
| `~%cd directory` | Change local directory |
| `~%old` | Toggle between old/new cu protocols |

### File Transfer

| Command | Description |
|---------|-------------|
| `~%put file [remotefile]` | Send file to remote system |
| `~%take file [localfile]` | Receive file from remote system |
| `~%baud rate` | Change transmission rate |

## Usage Examples

### Basic Connection Examples

#### Direct Serial Connection
```bash
# Connect to device on specified serial port
cu -l /dev/ttyS0 -s 9600

# Connect with specific line and speed
cu -l ttyUSB0 -s 115200

# Direct connection to port (requires write access)
cu -l /dev/ttyS0 dir
```

#### Modem Connection
```bash
# Connect via modem to phone number
cu -s 115200 -l /dev/ttyS0 5551234567

# Using phone option explicitly
cu -c 5557654321 -s 9600 -l /dev/ttyS0

# Prompt for phone number
cu -n -l /dev/ttyS0 -s 9600
```

#### System Connection (UUCP)
```bash
# Connect to system defined in UUCP config
cu -z remotehost

# Connect to system with numeric name
cu --system 1234host

# Use specific port from config
cu -p modemport remotehost
```

### Advanced Configuration Examples

#### Custom Escape Character
```bash
# Use Ctrl-A as escape character
cu -E ^A -l /dev/ttyS0 remotehost

# Use different escape character
cu -E '#' -l /dev/ttyS0 -s 9600 remotehost
```

#### Parity Settings
```bash
# Connect with even parity
cu -e -l /dev/ttyS0 -s 9600 remotehost

# Connect with odd parity
cu -o -l /dev/ttyS0 -s 9600 remotehost

# No parity
cu --parity=none -l /dev/ttyS0 -s 9600
```

### File Transfer Examples

#### Sending Files
```bash
# Connect first, then send file
cu -l /dev/ttyS0 -s 9600 remotehost
# Once connected:
~%put localfile.txt remotefile.txt
~%put config.conf

# Send multiple files
~%put data1.txt
~%put data2.txt
~%put data3.txt
```

#### Receiving Files
```bash
# Connect first, then receive file
cu -l /dev/ttyS0 -s 9600 remotehost
# Once connected:
~%take remotefile.txt localfile.txt
~%take backup.tar.gz

# Receive with same name
~%take document.pdf
```

### In-Session Command Examples

#### Local Shell Integration
```bash
# Connected to remote system
~!ls -la                    # List local files
~!ps aux                    # Show local processes
~!                          # Start local shell
exit                        # Return to cu session

~$date                      # Send local date to remote
~$hostname                  # Send local hostname to remote
```

#### Directory Management
```bash
~%cd /tmp                   # Change local directory
~%cd ~/documents            # Change to local home dir
~%put report.txt            # Send from current local dir
```

#### Connection Management
```bash
~%break                     # Send break signal
~%debug                     # Toggle debugging
~.                          # Exit cu
```

## Real-World Applications

### Network Device Management

#### Router/Switch Configuration
```bash
# Connect to Cisco router via console
cu -l /dev/ttyUSB0 -s 9600
# Access router CLI for configuration

# Connect to network switch
cu -l /dev/ttyS1 -s 19200 switch01
# Configure switch settings
```

#### Embedded System Debugging
```bash
# Connect to embedded device
cu -l /dev/ttyACM0 -s 115200
# Debug embedded Linux system

# Connect to Arduino/ESP32
cu -l /dev/ttyUSB0 -s 115200
# Monitor serial output
```

### Industrial Equipment

#### PLC and SCADA Systems
```bash
# Connect to industrial controller
cu -l /dev/ttyS2 -s 38400 -e
# Even parity for industrial equipment

# Monitor SCADA terminal
cu -h -l /dev/ttyS0 -s 9600 plc01
# Half duplex for legacy equipment
```

#### Modem-Based Systems
```bash
# Dial-up connection to remote site
cu -s 57600 -l /dev/ttyS0 18005551234

# Connect to alarm system
cu -c 5558765432 -s 1200 -o -l /dev/ttyS0
# Odd parity for alarm systems
```

### System Administration

#### Remote Server Console
```bash
# IPMI serial over LAN connection
cu -l /dev/ttyS0 -s 115200 server_console

# KVM over serial
cu -z kvm_host --port kvm_port
```

#### Legacy System Support
```bash
# Connect to legacy Unix system
cu -s 2400 -e -o legacy_unix

# AS/400 or mainframe connection
cu -l /dev/ttyS8 -s 19200 -h as400_system
```

## Advanced Usage and Techniques

### Automation Scripts

#### Batch File Transfers
```bash
#!/bin/bash
# auto_transfer.sh - Automated file transfer script

REMOTE_HOST="sensor01"
DEVICE="/dev/ttyUSB0"
SPEED="9600"

# Connect and send configuration
(
    echo "~%put sensor.conf"
    echo "~%take data.log"
    echo "~."
    sleep 2
) | cu -l $DEVICE -s $SPEED $REMOTE_HOST

echo "Transfer completed"
```

#### Monitoring Script
```bash
#!/bin/bash
# monitor_device.sh - Monitor remote device output

cu -l /dev/ttyACM0 -s 115200 sensor02 | \
while read line; do
    echo "$(date): $line"
    # Log monitoring data with timestamp
done
```

### Connection Profiles

#### UUCP Configuration
```bash
# /etc/uucp/config - Main UUCP configuration

# System definitions
system router01 {
    phone 5551234567
    port modem1
    speed 115200
    chat "" ATZ OK ATDT\T CONNECT
}

system switch02 {
    phone 5559876543
    port serial2
    speed 19200
    chat "" ATZ OK ATDT\T CONNECT
}

# Port definitions
port modem1 {
    type modem
    device /dev/ttyS0
    speed 115200
    dialer hayes
}

port serial2 {
    type direct
    device /dev/ttyUSB0
    speed 19200
}
```

#### Custom cu Wrapper
```bash
#!/bin/bash
# mycu - Enhanced cu wrapper with profiles

case "$1" in
    "router")
        cu -l /dev/ttyUSB0 -s 115200 router01
        ;;
    "switch")
        cu -l /dev/ttyS1 -s 19200 -e switch02
        ;;
    "sensor")
        cu -l /dev/ttyACM0 -s 9600 sensor_array
        ;;
    *)
        echo "Usage: $0 {router|switch|sensor}"
        exit 1
        ;;
esac
```

## Troubleshooting and Common Issues

### Connection Problems

#### Permission Denied
```bash
# Error: cu: /dev/ttyS0: Permission denied
# Solution: Add user to dialout group
sudo usermod -a -G dialout $USER
# Log out and back in

# Alternative: Use sudo
sudo cu -l /dev/ttyS0 -s 9600 remotehost
```

#### Device Busy
```bash
# Error: cu: /dev/ttyS0: Device busy
# Solution: Find and kill processes using the device
sudo fuser -k /dev/ttyS0
# Or check what's using it
sudo lsof /dev/ttyS0
```

#### No Carrier Detection
```bash
# Error: cu: No carrier
# Solution: Check modem configuration
cu -d -l /dev/ttyS0 -s 9600  # Debug mode
# Verify modem responds to AT commands
cu -l /dev/ttyS0
ATZ        # Should respond with OK
```

### Speed and Flow Control

#### Garbled Output
```bash
# Problem: Garbled text or unreadable output
# Solution: Match correct baud rate and parity
cu -l /dev/ttyS0 -s 9600 -e      # Try even parity
cu -l /dev/ttyS0 -s 19200 -o     # Try odd parity
cu -l /dev/ttyS0 -s 115200 --parity=none
```

#### Flow Control Issues
```bash
# Problem: Data loss or hanging
# Solution: Disable software flow control
cu --nostop -l /dev/ttyS0 -s 115200

# Or enable hardware flow control
cu -l /dev/ttyS0 -s 115200 remotehost
# May need stty configuration
```

### File Transfer Issues

#### Transfer Failures
```bash
# Problem: File transfer incomplete
# Solution: Use smaller blocks or slower speed
cu -l /dev/ttyS0 -s 1200 remotehost
~%put large_file.txt

# Or try different protocol
cu -l /dev/ttyS0 remotehost
~%old    # Switch to old protocol
~%put file.txt
```

#### Permission Issues
```bash
# Problem: Cannot write file locally
# Solution: Check local directory permissions
~%cd /tmp               # Use writable directory
~%take remote_file.txt

# Or specify full path
~%take remote_file.txt /home/user/downloads/local_file.txt
```

## Security Considerations

### Network Security

#### Sensitive Data Transmission
```bash
# Avoid sending sensitive data over unencrypted connections
# Use SSH instead when available:
ssh remotehost "cat sensitive_file"

# If cu must be used, encrypt data first
gpg -c sensitive_file
cu remotehost
~%put sensitive_file.gpg
```

#### Authentication Security
```bash
# Avoid storing phone numbers in scripts
# Use environment variables instead
export REMOTE_PHONE="5551234567"
cu -c $REMOTE_PHONE -l /dev/ttyS0

# Limit file access permissions
chmod 600 /etc/uucp/config
```

### System Security

#### Access Control
```bash
# Restrict cu access to specific users
# Create dialout group and control membership
sudo groupadd dialout
sudo usermod -a -G dialout operator1
sudo usermod -a -G dialout operator2

# Set device permissions
sudo chown root:dialout /dev/ttyS*
sudo chmod 660 /dev/ttyS*
```

#### Audit Logging
```bash
# Enable logging for cu connections
# Add to syslog configuration
echo "cu.* /var/log/cu.log" | sudo tee -a /etc/rsyslog.d/cu.conf

# Monitor cu usage
sudo tail -f /var/log/cu.log
```

## Performance Optimization

### Connection Speed

#### Baud Rate Optimization
```bash
# Test different speeds for optimal performance
for speed in 9600 19200 38400 57600 115200; do
    echo "Testing $speed baud..."
    cu -l /dev/ttyS0 -s $speed test_device
    # Test file transfer speed
done
```

#### Hardware Flow Control
```bash
# Enable hardware flow control for better performance
# Configure serial port before cu
sudo stty -F /dev/ttyS0 crtscts
cu -l /dev/ttyS0 -s 115200 remotehost
```

### File Transfer Efficiency

#### Batch Operations
```bash
# Send multiple files efficiently
# Create a tar archive first
tar -czf files.tar.gz file1.txt file2.txt file3.txt

# Send single archive instead of multiple files
cu -l /dev/ttyS0 remotehost
~%put files.tar.gz
```

#### Compression for Slow Links
```bash
# Compress files before transfer over slow connections
gzip -9 large_document.txt
cu -l /dev/ttyS0 -s 2400 remotehost
~%put large_document.txt.gz
```

## Integration with Other Tools

### Shell Integration

#### Command Pipelines
```bash
# Pipe command output to remote system
dmesg | cu -l /dev/ttyS0 remotehost
# Sends dmesg output to remote

# Receive remote data to local command
cu -l /dev/ttyS0 remotehost | tee remote_output.log
# Saves remote output to file
```

#### Expect Script Integration
```bash
#!/usr/bin/expect -f
# cu_expect.exp - Automated cu interaction

spawn cu -l /dev/ttyS0 -s 9600 remotehost
expect "Connected"

expect "~"
send "~%put config.conf\r"

expect "Transfer complete"
send "~.\r"

expect eof
```

### Monitoring and Logging

#### Session Recording
```bash
# Record cu sessions for documentation
script cu_session.log
cu -l /dev/ttyS0 -s 9600 remotehost
# Commands and output recorded to cu_session.log
exit
```

#### Real-time Monitoring
```bash
# Monitor remote device with logging
cu -l /dev/ttyACM0 -s 115200 sensor | \
while read line; do
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $line" >> sensor_log.log
done
```

## Best Practices

### Connection Management

#### Connection Scripts
```bash
#!/bin/bash
# connect_device.sh - Standardized connection script

DEVICE="$1"
SPEED="$2"
REMOTE="$3"

if [ $# -ne 3 ]; then
    echo "Usage: $0 <device> <speed> <remote>"
    exit 1
fi

# Check device permissions
if [ ! -w "$DEVICE" ]; then
    echo "Error: No write access to $DEVICE"
    echo "Try: sudo usermod -a -G dialout $USER"
    exit 1
fi

# Make connection with error handling
if ! cu -l "$DEVICE" -s "$SPEED" "$REMOTE"; then
    echo "Connection failed"
    exit 1
fi
```

#### Documentation
```bash
# Document connection parameters
cat > device_connections.txt << EOF
Router Console:
  Device: /dev/ttyUSB0
  Speed: 115200
  Parity: None
  Command: cu -l /dev/ttyUSB0 -s 115200 router01

Sensor Array:
  Device: /dev/ttyACM0
  Speed: 9600
  Parity: Even
  Command: cu -e -l /dev/ttyACM0 -s 9600 sensor01
EOF
```

### Error Handling

#### Robust Scripts
```bash
#!/bin/bash
# robust_connect.sh - Error-handling connection

connect_to_device() {
    local device="$1"
    local speed="$2"
    local remote="$3"
    local max_attempts=3
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        echo "Attempt $attempt of $max_attempts"

        if cu -l "$device" -s "$speed" "$remote"; then
            echo "Connection successful"
            return 0
        else
            echo "Connection failed, retrying..."
            sleep 2
            ((attempt++))
        fi
    done

    echo "All connection attempts failed"
    return 1
}

connect_to_device /dev/ttyS0 9600 remotehost
```

### Maintenance

#### Device Health Checks
```bash
#!/bin/bash
# check_serial_devices.sh - Verify serial device health

for device in /dev/ttyS* /dev/ttyUSB*; do
    if [ -e "$device" ]; then
        echo "Checking $device..."

        # Test device accessibility
        if stty -F "$device" >/dev/null 2>&1; then
            echo "  Device is accessible"

            # Show current settings
            stty -F "$device"
        else
            echo "  Device is not accessible"
        fi
    fi
done
```

## Related Commands

- **minicom** - More feature-rich serial communication program
- **picocom** - Minimal serial communication program
- **screen** - Terminal multiplexer with serial support
- **tip** - Another serial communication utility
- **kermit** - File transfer and serial communication program
- **sz/rz** - ZMODEM file transfer protocols
- **stty** - Serial terminal settings configuration
- **setserial** - Serial port configuration
- **dmesg** - Check kernel messages for serial devices
- **lspci** | **lsusb** - List serial hardware devices
- **chat** - Automated conversational script for modems

## Additional Resources

### Manual Pages
- `man cu` - Complete cu command reference
- `man uucp` - UUCP system overview
- `man stty` - Terminal settings configuration
- `man tty` - Terminal device information

### Configuration Files
- `/etc/uucp/config` - UUCP configuration
- `/etc/uucp/sys` - System definitions
- `/etc/uucp/port` - Port configurations
- `/etc/inittab` - Init configuration (legacy systems)

### Online Documentation
- [UUCP Documentation](https://www.gnu.org/software/uucp/uucp.html) - Official UUCP project
- [Serial Programming Guide](https://en.wikibooks.org/wiki/Serial_Programming) - Serial programming reference
- [Linux Serial HOWTO](https://www.tldp.org/HOWTO/Serial-HOWTO.html) - Serial setup guide