---
title: curl-config - Get information about a libcurl installation
sidebar_label: curl-config
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# curl-config - Get information about a libcurl installation

The `curl-config` command is a utility tool that provides information about the installed libcurl library configuration and compilation parameters. It's particularly useful for developers who need to compile applications that link against libcurl, as it provides the exact compiler flags, library paths, and feature support information needed for proper compilation. The tool helps ensure compatibility between your application and the installed libcurl version by displaying version information, supported protocols, SSL backends, and other critical configuration details.

## Basic Syntax

```bash
curl-config [OPTION]
```

## Common Options

### Version Information
- `--version` - Output libcurl version information
- `--vernum` - Output version as hexadecimal number
- `--checkfor [version]` - Check if libcurl meets minimum version requirement

### Compilation Information
- `--cflags` - Pre-processor and compiler flags
- `--libs` - Library linking information for dynamic linking
- `--static-libs` - Library linking information for static linking
- `--cc` - Compiler used to build libcurl

### Path and Configuration
- `--prefix` - Installation prefix directory
- `--ca` - CA bundle install path
- `--configure` - Arguments given to configure during build

### Feature Information
- `--features` - List enabled features
- `--protocols` - List supported protocols
- `--ssl-backends` - List SSL backends
- `--built-shared` - Check if built as shared library

### Help
- `--help` - Display help and exit

## Usage Examples

### Basic Version and Feature Queries

#### Version Information
```bash
# Get libcurl version
curl-config --version

# Get version as hexadecimal number
curl-config --vernum

# Check for minimum version requirement
curl-config --checkfor 7.64.0

# Check if version supports specific features
if curl-config --checkfor 7.64.0; then
    echo "libcurl version is sufficient"
else
    echo "libcurl version is too old"
fi
```

#### Feature and Protocol Support
```bash
# List all enabled features
curl-config --features

# List all supported protocols
curl-config --protocols

# List SSL backends
curl-config --ssl-backends

# Check if SSL support is enabled
curl-config --features | grep -i ssl

# Check if HTTP/2 support is available
curl-config --features | grep -i http2

# Check if IPv6 support is enabled
curl-config --features | grep -i ipv6

# Check if specific protocol is supported
curl-config --protocols | grep -i https
```

### Compilation and Linking

#### Basic Compilation
```bash
# Get compiler flags
curl-config --cflags

# Get library linking flags
curl-config --libs

# Get static library linking flags
curl-config --static-libs

# Get compiler used to build libcurl
curl-config --cc

# Complete compilation command
curl-config --cc --cflags
```

#### Compiling Applications
```bash
# Compile a simple application using libcurl
gcc $(curl-config --cflags) -o myapp myapp.c $(curl-config --libs)

# Compile with static linking
gcc $(curl-config --cflags) -o myapp_static myapp.c $(curl-config --static-libs)

# Compile with specific optimization flags
gcc -O2 $(curl-config --cflags) -o optimized_app app.c $(curl-config --libs)

# Compile with debug information
gcc -g $(curl-config --cflags) -o debug_app debug.c $(curl-config --libs)
```

### Makefile Integration

#### Basic Makefile
```makefile
CC = gcc
CFLAGS = -Wall -Wextra -O2
LIBCURL_FLAGS = $(shell curl-config --cflags)
LIBCURL_LIBS = $(shell curl-config --libs)

TARGET = myapp
SOURCE = myapp.c

all: $(TARGET)

$(TARGET): $(SOURCE)
	$(CC) $(CFLAGS) $(LIBCURL_FLAGS) -o $@ $< $(LIBCURL_LIBS)

clean:
	rm -f $(TARGET)

.PHONY: all clean
```

#### Advanced Makefile with Version Check
```makefile
CC = gcc
CFLAGS = -Wall -Wextra -O2
LIBCURL_FLAGS = $(shell curl-config --cflags)
LIBCURL_LIBS = $(shell curl-config --libs)
LIBCURL_VERSION = $(shell curl-config --version)
MIN_VERSION = 7.64.0

TARGET = advanced_app
SOURCES = main.c network.c utils.c

# Check libcurl version
version-check:
	@if ! curl-config --checkfor $(MIN_VERSION); then \
		echo "Error: libcurl version $(MIN_VERSION) or higher required"; \
		echo "Found: $(LIBCURL_VERSION)"; \
		exit 1; \
	fi

all: version-check $(TARGET)

$(TARGET): $(SOURCES)
	$(CC) $(CFLAGS) $(LIBCURL_FLAGS) -o $@ $^ $(LIBCURL_LIBS)

clean:
	rm -f $(TARGET)

install: $(TARGET)
	install -m 755 $(TARGET) /usr/local/bin/

.PHONY: all clean install version-check
```

## Practical Examples

### Development Environment Setup

#### Project Configuration Script
```bash
#!/bin/bash
# setup-curl-project.sh - Configure development environment for curl-based project

set -e

# Get libcurl information
CURL_VERSION=$(curl-config --version)
CURL_PREFIX=$(curl-config --prefix)
CURL_CFLAGS=$(curl-config --cflags)
CURL_LIBS=$(curl-config --libs)
CURL_FEATURES=$(curl-config --features)
CURL_PROTOCOLS=$(curl-config --protocols)

echo "=== libcurl Configuration ==="
echo "Version: $CURL_VERSION"
echo "Prefix: $CURL_PREFIX"
echo "Compiler flags: $CURL_CFLAGS"
echo "Libraries: $CURL_LIBS"
echo ""

echo "=== Enabled Features ==="
echo "$CURL_FEATURES" | sed 's/^/  /'
echo ""

echo "=== Supported Protocols ==="
echo "$CURL_PROTOCOLS" | sed 's/^/  /'
echo ""

# Create build configuration file
cat > build.conf << EOF
# Auto-generated libcurl configuration
CURL_VERSION=$CURL_VERSION
CURL_CFLAGS=$CURL_CFLAGS
CURL_LIBS=$CURL_LIBS
CURL_PREFIX=$CURL_PREFIX
EOF

echo "Configuration saved to build.conf"
```

#### Cross-Platform Build Script
```bash
#!/bin/bash
# build.sh - Cross-platform build script using curl-config

TARGET_NAME="http_client"
SOURCE_FILE="http_client.c"
STATIC_BUILD=${STATIC_BUILD:-0}

# Detect system
OS=$(uname -s)
case $OS in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:$OS"
esac

echo "Building on: $MACHINE"

# Get compiler information
CC=$(curl-config --cc)
CFLAGS=$(curl-config --cflags)

# Choose linking method based on build type
if [ $STATIC_BUILD -eq 1 ]; then
    LIBS=$(curl-config --static-libs)
    echo "Using static linking"
else
    LIBS=$(curl-config --libs)
    echo "Using dynamic linking"
fi

# Add platform-specific flags
case $MACHINE in
    Linux*)
        CFLAGS="$CFLAGS -pthread"
        ;;
    Mac*)
        CFLAGS="$CFLAGS -mmacosx-version-min=10.12"
        ;;
esac

# Compile
echo "Compiling $SOURCE_FILE..."
$CC $CFLAGS -o $TARGET_NAME $SOURCE_FILE $LIBS

if [ $? -eq 0 ]; then
    echo "Build successful: $TARGET_NAME"
else
    echo "Build failed"
    exit 1
fi
```

### Application Development

#### HTTP Client Application
```c
// http_client.c - Example HTTP client using libcurl

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

struct MemoryStruct {
    char *memory;
    size_t size;
};

static size_t WriteMemoryCallback(void *contents, size_t size, size_t nmemb, void *userp) {
    size_t realsize = size * nmemb;
    struct MemoryStruct *mem = (struct MemoryStruct *)userp;

    char *ptr = realloc(mem->memory, mem->size + realsize + 1);
    if(ptr == NULL) {
        printf("not enough memory (realloc returned NULL)\n");
        return 0;
    }

    mem->memory = ptr;
    memcpy(&(mem->memory[mem->size]), contents, realsize);
    mem->size += realsize;
    mem->memory[mem->size] = 0;

    return realsize;
}

int main(int argc, char *argv[]) {
    if(argc != 2) {
        fprintf(stderr, "Usage: %s <URL>\n", argv[0]);
        return 1;
    }

    CURL *curl_handle;
    CURLcode res;

    struct MemoryStruct chunk;
    chunk.memory = malloc(1);
    chunk.size = 0;

    curl_global_init(CURL_GLOBAL_ALL);
    curl_handle = curl_easy_init();

    curl_easy_setopt(curl_handle, CURLOPT_URL, argv[1]);
    curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
    curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, (void *)&chunk);
    curl_easy_setopt(curl_handle, CURLOPT_USERAGENT, "libcurl-agent/1.0");

    res = curl_easy_perform(curl_handle);

    if(res != CURLE_OK) {
        fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
    } else {
        printf("Response size: %zu bytes\n", chunk.size);
        printf("First 100 characters: %.*s\n",
               chunk.size < 100 ? (int)chunk.size : 100, chunk.memory);
    }

    curl_easy_cleanup(curl_handle);
    free(chunk.memory);
    curl_global_init(CURL_GLOBAL_DEFAULT);

    return 0;
}
```

#### Build Script for HTTP Client
```bash
#!/bin/bash
# build_http_client.sh

echo "Building HTTP client application..."

# Check libcurl features
FEATURES=$(curl-config --features)
PROTOCOLS=$(curl-config --protocols)

echo "libcurl features:"
echo "$FEATURES"
echo ""
echo "Supported protocols:"
echo "$PROTOCOLS"
echo ""

# Build application
gcc -Wall -Wextra -O2 $(curl-config --cflags) -o http_client http_client.c $(curl-config --libs)

if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "Usage: ./http_client https://example.com"
else
    echo "Build failed!"
    exit 1
fi
```

### Package Management

#### Debian/Ubuntu Package Development
```bash
#!/bin/bash
# debian_rules_helper.sh - Helper for debian/rules files

# Get libcurl development package info
PKGCONFIG_PATH=$(pkg-config --variable pc_path libcurl 2>/dev/null || echo "")

# Generate debian/rules variables
cat << EOF
# Auto-generated by curl-config
CURL_VERSION := $(shell curl-config --version)
CURL_CFLAGS := $(shell curl-config --cflags)
CURL_LIBS := $(shell curl-config --libs)
CURL_PREFIX := $(shell curl-config --prefix)

# Check for required features
HAS_SSL := $(shell curl-config --features | grep -c SSL || echo 0)
HAS_HTTP2 := $(shell curl-config --features | grep -c HTTP2 || echo 0)

ifeq ($(HAS_SSL),0)
$(warning SSL support not available in libcurl)
endif

ifeq ($(HAS_HTTP2),0)
$(warning HTTP/2 support not available in libcurl)
endif
EOF
```

#### RPM Spec File Generator
```bash
#!/bin/bash
# generate_rpm_spec.sh - Generate RPM spec file using curl-config

PACKAGE_NAME="my-curl-app"
VERSION="1.0.0"
RELEASE="1"

# Get libcurl information
CURL_VERSION=$(curl-config --version | cut -d' ' -f2)
CURL_PREFIX=$(curl-config --prefix)
CURL_FEATURES=$(curl-config --features | tr '\n' ' ')

cat << EOF
Name:           $PACKAGE_NAME
Version:        $VERSION
Release:        $RELEASE%{?dist}
Summary:        Application using libcurl $CURL_VERSION

License:        MIT
URL:            https://example.com
Source0:        %{name}-%{version}.tar.gz

BuildRequires:  libcurl-devel
Requires:       libcurl

%description
Application built with libcurl $CURL_VERSION
Features: $CURL_FEATURES

%prep
%autosetup

%build
gcc \$(curl-config --cflags) -o %{name} %{name}.c \$(curl-config --libs)

%install
install -D -m 755 %{name} %{buildroot}%{_bindir}/%{name}

%files
%{_bindir}/%{name}
%doc README.md

%changelog
* $(date +'%a %b %d %Y') Packager <packager@example.com> - $VERSION-$RELEASE
- Initial package using libcurl $CURL_VERSION
EOF
```

## Advanced Usage

### Version Compatibility

#### Version Comparison Script
```bash
#!/bin/bash
# check_curl_version.sh - Check libcurl version compatibility

REQUIRED_VERSION="$1"
if [ -z "$REQUIRED_VERSION" ]; then
    echo "Usage: $0 <minimum-version>"
    echo "Example: $0 7.64.0"
    exit 1
fi

CURRENT_VERSION=$(curl-config --version | cut -d' ' -f2)
echo "Current libcurl version: $CURRENT_VERSION"
echo "Required minimum version: $REQUIRED_VERSION"

# Version comparison function
version_compare() {
    local version1=$1 version2=$2
    local IFS=.
    local ver1_array=($version1) ver2_array=($version2)

    for ((i = 0; i < 3; i++)); do
        local v1=${ver1_array[i]:-0}
        local v2=${ver2_array[i]:-0}

        if ((v1 > v2)); then
            return 0  # version1 > version2
        elif ((v1 < v2)); then
            return 1  # version1 < version2
        fi
    done
    return 0  # versions are equal
}

if version_compare "$CURRENT_VERSION" "$REQUIRED_VERSION"; then
    echo "✓ Version check passed"
    exit 0
else
    echo "✗ Version check failed - libcurl is too old"
    exit 1
fi
```

#### Feature Detection Script
```bash
#!/bin/bash
# detect_curl_features.sh - Detect and report libcurl capabilities

echo "=== libcurl Feature Detection ==="
echo ""

# Get version info
VERSION=$(curl-config --version)
VERNUM=$(curl-config --vernum)
echo "Version: $VERSION (0x$VERNUM)"
echo ""

# Check features
FEATURES=$(curl-config --features)
echo "=== Features ==="
if echo "$FEATURES" | grep -q "SSL"; then
    echo "✓ SSL/TLS support"
fi
if echo "$FEATURES" | grep -q "IPv6"; then
    echo "✓ IPv6 support"
fi
if echo "$FEATURES" | grep -q "libz"; then
    echo "✓ Compression support"
fi
if echo "$FEATURES" | grep -q "NTLM"; then
    echo "✓ NTLM authentication"
fi
if echo "$FEATURES" | grep -q "DEBUG"; then
    echo "✓ Debug build"
fi
if echo "$FEATURES" | grep -q "AsynchDNS"; then
    echo "✓ Asynchronous DNS"
fi
if echo "$FEATURES" | grep -q "SPNEGO"; then
    echo "✓ SPNEGO authentication"
fi
if echo "$FEATURES" | grep -q "Kerberos"; then
    echo "✓ Kerberos authentication"
fi
echo ""

# Check protocols
PROTOCOLS=$(curl-config --protocols)
echo "=== Supported Protocols ==="
for proto in HTTP HTTPS FTP FTPS FILE SFTP SCP TELNET LDAP LDAPS DICT TFTP IMAP IMAPS POP3 POP3S SMTP SMTPS RTSP RTMP; do
    if echo "$PROTOCOLS" | grep -q "$proto"; then
        echo "✓ $proto"
    fi
done
echo ""

# Check SSL backends
SSL_BACKENDS=$(curl-config --ssl-backends)
echo "=== SSL Backends ==="
if [ "$SSL_BACKENDS" = "no" ]; then
    echo "✗ No SSL support"
else
    echo "$SSL_BACKENDS" | tr ',' '\n' | sed 's/^/✓ /'
fi
echo ""

# Check build type
if curl-config --built-shared | grep -q "yes"; then
    echo "Build type: Shared library"
else
    echo "Build type: Static library"
fi

# Display paths
echo ""
echo "=== Installation Paths ==="
echo "Prefix: $(curl-config --prefix)"
echo "CA bundle: $(curl-config --ca)"
echo "Compiler: $(curl-config --cc)"
```

### Build System Integration

#### CMake Integration
```cmake
# CMakeLists.txt - CMake integration with curl-config

cmake_minimum_required(VERSION 3.10)
project(MyCurlApp)

# Find libcurl using curl-config
find_program(CURL_CONFIG curl-config)
if(NOT CURL_CONFIG)
    message(FATAL_ERROR "curl-config not found")
endif()

# Execute curl-config to get flags
execute_process(
    COMMAND ${CURL_CONFIG} --cflags
    OUTPUT_VARIABLE CURL_CFLAGS
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

execute_process(
    COMMAND ${CURL_CONFIG} --libs
    OUTPUT_VARIABLE CURL_LIBS
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

execute_process(
    COMMAND ${CURL_CONFIG} --version
    OUTPUT_VARIABLE CURL_VERSION
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

message(STATUS "Found libcurl: ${CURL_VERSION}")
message(STATUS "CFLAGS: ${CURL_CFLAGS}")
message(STATUS "LIBS: ${CURL_LIBS}")

# Create executable
add_executable(myapp main.c)

# Apply curl flags
separate_arguments(CURL_CFLAGS UNIX_COMMAND "${CURL_CFLAGS}")
target_compile_options(myapp PRIVATE ${CURL_CFLAGS})

separate_arguments(CURL_LIBS UNIX_COMMAND "${CURL_LIBS}")
target_link_libraries(myapp PRIVATE ${CURL_LIBS})

# Add compiler-specific options
if(CMAKE_C_COMPILER_ID STREQUAL "GNU" OR CMAKE_C_COMPILER_ID STREQUAL "Clang")
    target_compile_options(myapp PRIVATE -Wall -Wextra)
endif()
```

#### Autotools Integration
```m4
# configure.ac - Autoconf integration with curl-config

AC_INIT([my-curl-app], [1.0.0], [maintainer@example.com])

# Check for curl-config
AC_PATH_PROG([CURL_CONFIG], [curl-config], [no])
if test "$CURL_CONFIG" = "no"; then
    AC_MSG_ERROR([curl-config not found. Install libcurl development package.])
fi

# Get libcurl information
CURL_VERSION=$($CURL_CONFIG --version)
CURL_CFLAGS=$($CURL_CONFIG --cflags)
CURL_LIBS=$($CURL_CONFIG --libs)

AC_MSG_NOTICE([Using libcurl $CURL_VERSION])

# Check for minimum version
AS_IF([! $CURL_CONFIG --checkfor 7.40.0], [
    AC_MSG_ERROR([libcurl 7.40.0 or higher required])
])

# Check for required features
CURL_FEATURES=$($CURL_CONFIG --features)
AS_IF([echo "$CURL_FEATURES" | grep -qv "SSL"], [
    AC_MSG_ERROR([libcurl with SSL support required])
])

# Substitute variables
AC_SUBST([CURL_CFLAGS])
AC_SUBST([CURL_LIBS])

# Create output files
AC_CONFIG_FILES([Makefile])
AC_OUTPUT
```

```makefile
# Makefile.am - Automake integration

bin_PROGRAMS = myapp
myapp_SOURCES = main.c

AM_CPPFLAGS = @CURL_CFLAGS@
myapp_LDADD = @CURL_LIBS@

# Add warnings
AM_CPPFLAGS += -Wall -Wextra
```

## Troubleshooting

### Common Issues

#### Missing curl-config
```bash
# Problem: curl-config command not found
# Solution: Install libcurl development package

# Debian/Ubuntu
sudo apt-get install libcurl4-openssl-dev

# Red Hat/CentOS
sudo yum install libcurl-devel

# macOS with Homebrew
brew install curl

# Verify installation
which curl-config
curl-config --version
```

#### Version Mismatch
```bash
# Problem: Application requires newer libcurl version
# Solution: Check version and update if necessary

# Check current version
curl-config --version

# Check if version meets requirements
curl-config --checkfor 7.64.0

# If not, update libcurl development package
sudo apt-get update
sudo apt-get install libcurl4-openssl-dev
```

#### Missing Features
```bash
# Problem: Required feature not available
# Solution: Check what features are available and reinstall if needed

# Check available features
curl-config --features

# Check SSL backends
curl-config --ssl-backends

# If SSL support missing, install SSL-enabled version
sudo apt-get install libcurl4-openssl-dev  # OpenSSL
# or
sudo apt-get install libcurl4-gnutls-dev   # GnuTLS
```

#### Compilation Issues
```bash
# Problem: Compilation fails with missing headers
# Solution: Check include paths and install development package

# Check include path
curl-config --cflags

# Typical output: -I/usr/include/x86_64-linux-gnu

# Verify headers exist
ls /usr/include/x86_64-linux-gnu/curl/

# If headers missing, install development package
sudo apt-get install libcurl4-openssl-dev
```

#### Linking Issues
```bash
# Problem: Linking fails with undefined references
# Solution: Check library paths and linking flags

# Check library flags
curl-config --libs

# Typical output: -lcurl

# For static linking
curl-config --static-libs

# Check if libraries exist
find /usr -name "libcurl.*" 2>/dev/null

# Verify library version
ldconfig -p | grep libcurl
```

## Related Commands

- [`curl`](/docs/commands/network/curl) - Transfer data from or to a server
- [`wget`](/docs/commands/network/wget) - Network downloader
- [`pkg-config`](/docs/commands/development/pkg-config) - Get compiler and linker flags
- [`gcc`](/docs/commands/development/gcc) - GNU C compiler
- [`make`](/docs/commands/development/make) - Build automation tool
- [`cmake`](/docs/commands/development/cmake) - Cross-platform build system
- [`autoconf`](/docs/commands/development/autoconf) - Autoconf configuration tool
- [`pkg-config`](/docs/commands/development/pkg-config) - Package configuration tool

## Best Practices

1. **Always check version compatibility** before compiling applications
2. **Use curl-config in build scripts** to ensure correct compiler and linker flags
3. **Check required features** before assuming they're available
4. **Prefer dynamic linking** unless static linking is specifically needed
5. **Include error handling** for missing or incompatible libcurl installations
6. **Document required libcurl version** in your application's README
7. **Use version checking** in build scripts to fail early with clear error messages
8. **Test on multiple systems** to ensure portability
9. **Check SSL backend** if your application requires specific SSL implementation
10. **Keep build scripts updated** when libcurl requirements change

## Performance Tips

1. **Use curl-config once** and cache the results in build scripts
2. **Check feature availability** before attempting to use them in code
3. **Prefer dynamic linking** for smaller binary sizes
4. **Use static linking** only when deployment simplicity is critical
5. **Verify SSL backend** matches security requirements
6. **Test protocol support** for your specific use cases
7. **Monitor library version** updates for security patches
8. **Use appropriate optimization flags** based on your build type
9. **Consider cross-compilation** requirements for embedded systems
10. **Validate library paths** in automated build environments

The `curl-config` command is an essential tool for developers working with libcurl, providing critical information needed for proper compilation and linking of network-enabled applications. Its comprehensive feature detection and configuration reporting capabilities make it invaluable for building portable, compatible applications across different systems and libcurl installations.