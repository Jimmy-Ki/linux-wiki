---
title: make - GNU Build Automation Tool
sidebar_label: make
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# make - GNU Build Automation Tool

The `make` command is GNU's build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles. Make determines which pieces of a large program need to be recompiled and issues commands to recompile them. This manual describes GNU make, which was implemented by Richard Stallman and Roland McGrath.

## Basic Syntax

```bash
make [options] [target] ...
```

## Common Options

### Basic Options
- `-h, --help` - Print help message and exit
- `-v, --version` - Print version information and exit
```
- `-f ``<makefile>``, --file=``<makefile>``, --makefile=``<makefile>``` - Use specified file as a makefile
```
```
- `-C ``<dir>``, --directory=``<dir>``` - Change to directory ``<dir>`` before reading makefiles
```
- `-j [jobs], --jobs[=jobs]` - Specify number of jobs to run simultaneously
- `-k, --keep-going` - Continue as much as possible after an error
- `-n, --just-print, --dry-run, --recon` - Print the commands but don't execute them

### Output Control
- `-s, --silent, --quiet` - Don't echo commands
- `-S, --no-keep-going, --stop` - Turns off -k
- `-t, --touch` - Touch targets instead of remaking them
- `-q, --question` - Run no commands; exit status shows if up to date
- `-W `, --what-if=`, --new-file=`, --assume-new=`` - Consider ` to be very new
- `-o `, --old-file=`, --assume-old=`` - Consider ` to be very old and do not remake it

### Debugging Options
- `-d, --debug` - Print lots of debugging information
- `-p, --print-data-base` - Print make's internal database
- `--debug[=FLAGS]` - Print various types of debugging information
- `-i, --ignore-errors` - Ignore all errors in commands
- `-l, --load-average[=N]` - Don't start multiple jobs unless load is below N

### Environment Options
- `-e, --environment-overrides` - Environment variables override makefiles
```
- `-E ``<filename>``, --environment-overrides=``<filename>``` - File to read environment from
```

### Special Targets
- `-B, --always-make` - Unconditionally make all targets
- `-r, --no-builtin-rules` - Disable the built-in implicit rules
- `-R, --no-builtin-variables` - Disable the built-in variable settings
```
- `-I ``<dir>``, --include-dir=``<dir>``` - Search ``<dir>`` for included makefiles
```
- `-t, --touch` - Mark files as up to date without running commands

## Makefile Basics

### Basic Makefile Structure
```makefile
# Comments start with #

# Variables
CC = gcc
CFLAGS = -Wall -g
TARGET = program
SOURCES = main.c utils.c file.c

# Pattern rule
%.o: %.c
```
	$(CC) $(CFLAGS) -c $< -o $@
```

# Explicit rules
all: $(TARGET)

$(TARGET): $(SOURCES:.c=.o)
	$(CC) $(CFLAGS) -o $@ $^

clean:
	rm -f $(OBJECTS) $(TARGET)

.PHONY: all clean
```

### Variable Assignment
```makefile
# Simple assignment
CC = gcc

# Immediate assignment
CFLAGS := -Wall -g

# Conditional assignment
DEBUG ?= yes

# Append
CFLAGS += -O2

# Shell assignment
TIMESTAMP = $(shell date)

# Substitution
OBJECTS = $(SOURCES:.c=.o)
```

### Automatic Variables
```makefile
target: dependencies
	command $@    # $@ = target name
```
	command $<    # $< = first dependency
```
	command $^    # $^ = all dependencies
	command $?    # $? = dependencies newer than target
	command $*    # $* = stem matched in pattern rule
```

## Usage Examples

### Basic Compilation
```makefile
# Simple Makefile
CC = gcc
TARGET = hello
SOURCES = hello.c

all: $(TARGET)

$(TARGET): $(SOURCES)
	$(CC) -o $@ $^

clean:
	rm -f $(TARGET)
```

```bash
# Build the program
make

# Clean build artifacts
make clean

# Build with specific target
make all
```

### Multi-file Project
```makefile
CC = gcc
CFLAGS = -Wall -Wextra -std=c99
TARGET = myapp
SRCDIR = src
OBJDIR = obj
SOURCES = $(wildcard $(SRCDIR)/*.c)
OBJECTS = $(SOURCES:$(SRCDIR)/%.c=$(OBJDIR)/%.o)

# Create object directory
$(OBJDIR):
	mkdir -p $(OBJDIR)

# Build object files
$(OBJDIR)/%.o: $(SRCDIR)/%.c | $(OBJDIR)
```
	$(CC) $(CFLAGS) -c $< -o $@
```

# Link final executable
$(TARGET): $(OBJECTS)
	$(CC) $(CFLAGS) -o $@ $^

# Clean up
clean:
	rm -rf $(OBJDIR) $(TARGET)

# Create source distribution
dist:
	tar -czf $(TARGET).tar.gz $(SRCDIR)/*.c Makefile

.PHONY: all clean dist
```

### Library Creation
```makefile
# Static library
AR = ar
ARFLAGS = rcs
STATIC_LIB = libmylib.a
STATIC_OBJS = utils.o helpers.o

$(STATIC_LIB): $(STATIC_OBJS)
	$(AR) $(ARFLAGS) $@ $^

# Shared library
SHARED_LIB = libmylib.so
SHARED_OBJS = utils.o helpers.o
SHARED_FLAGS = -fPIC -shared

$(SHARED_LIB): $(SHARED_OBJS)
	$(CC) $(SHARED_FLAGS) -o $@ $^

# Install libraries
install-static: $(STATIC_LIB)
	cp $(STATIC_LIB) /usr/local/lib/

install-shared: $(SHARED_LIB)
	cp $(SHARED_LIB) /usr/local/lib/
	ldconfig

.PHONY: install-static install-shared
```

### Conditional Compilation
```makefile
# Debug/Release modes
DEBUG ?= 0

ifeq ($(DEBUG), 1)
    CFLAGS = -g -O0 -DDEBUG
    BUILD_DIR = debug
else
    CFLAGS = -O2 -DNDEBUG
    BUILD_DIR = release
endif

TARGET = program
SOURCES = main.c utils.c
OBJECTS = $(SOURCES:%.c=$(BUILD_DIR)/%.o)

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUILD_DIR)/%.o: %.c | $(BUILD_DIR)
```
	$(CC) $(CFLAGS) -c $< -o $@
```

$(BUILD_DIR)/$(TARGET): $(OBJECTS)
	$(CC) $(CFLAGS) -o $@ $^

debug: DEBUG = 1
debug: $(BUILD_DIR)/$(TARGET)

release: DEBUG = 0
release: $(BUILD_DIR)/$(TARGET)

.PHONY: debug release
```

## Advanced Makefile Features

### Pattern Rules
```makefile
# Generic pattern rule
%.o: %.c
```
	$(CC) $(CFLAGS) -c $< -o $@
```

# More specific pattern rule
debug/%.o: %.c
```
	$(CC) -g -O0 -c $< -o $@
```

release/%.o: %.c
```
	$(CC) -O2 -DNDEBUG -c $< -o $@
```

# Pattern rule with dependencies
%.o: %.c %.h
```
	$(CC) $(CFLAGS) -c $< -o $@
```
```

### Conditional Processing
```makefile
# Check operating system
UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Linux)
    LDFLAGS = -lm -lrt
endif
ifeq ($(UNAME_S),Darwin)
    LDFLAGS = -lm
endif

# Check for compiler
ifeq ($(CC),gcc)
    CFLAGS += -fopenmp
endif

# Check if file exists
ifeq ($(wildcard config.h),)
    CFLAGS += -DDEFAULT_CONFIG
else
    SOURCES += config.c
endif
```

### Function Usage
```makefile
# String functions
SOURCES = main.c utils.c helpers.c
OBJECTS = $(SOURCES:.c=.o)
BASENAMES = $(basename $(SOURCES))
DIRNAMES = $(dir $(SOURCES))
FILENAMES = $(notdir $(SOURCES))

# Substitution
PROG_SRCS = $(filter %.c, $(SOURCES))
PROG_OBJS = $(patsubst %.c,%.o,$(PROG_SRCS))

# Foreach function
SRC_DIRS = src lib tests
INC_DIRS = $(addprefix -I,$(SRC_DIRS))

# Shell commands
GIT_HASH = $(shell git rev-parse HEAD)
BUILD_TIME = $(shell date +%Y-%m-%d_%H:%M:%S)
```

### Multiple Makefiles
```makefile
# Include other makefiles
include config.mk
include rules.mk

# Conditional inclusion
-include local.mk    # Don't error if file doesn't exist

# Export/Unexport variables
export CC CFLAGS      # Available to sub-makes
unexport SECRET_KEY   # Don't export to sub-makes
```

## Special Targets

### Phony Targets
```makefile
.PHONY: all clean install test distclean help

all: $(TARGET)

clean:
	rm -f $(OBJECTS) $(TARGET)

install: $(TARGET)
	install $(TARGET) /usr/local/bin/

test:
	./run_tests.sh

distclean: clean
	rm -f config.log config.status

help:
	@echo "Targets:"
	@echo "  all     - Build the program"
	@echo "  clean   - Remove build artifacts"
	@echo "  install - Install the program"
	@echo "  test    - Run tests"
```

### Default Goal
```makefile
# Set default goal
.DEFAULT_GOAL := all

# Or explicitly set
all: program
	@echo "Building complete"

program: main.o utils.o
	$(CC) -o $@ $^
```

### Suffix Rules (deprecated but still supported)
```makefile
.SUFFIXES: .c .o

.c.o:
```
	$(CC) $(CFLAGS) -c $< -o $@
```
```

## Practical Examples

### Complex Project Structure
```makefile
# Project structure:
# src/
#   ├── core/
#   │   ├── main.c
#   │   └── utils.c
#   ├── modules/
#   │   ├── network.c
#   │   └── database.c
#   └── tests/
#       └── test_main.c
# include/
#   ├── core.h
#   └── modules.h

# Makefile
CC = gcc
CFLAGS = -Wall -Wextra -std=c11 -I./include
LDFLAGS = -lm -lpthread

# Source directories
SRC_DIRS = src/core src/modules
TEST_DIR = src/tests
INC_DIR = include

# Find source files
SOURCES = $(shell find $(SRC_DIRS) -name "*.c")
OBJECTS = $(SOURCES:%.c=%.o)

# Test files
TEST_SOURCES = $(shell find $(TEST_DIR) -name "*.c")
TEST_OBJECTS = $(TEST_SOURCES:%.c=%.o)

# Targets
TARGET = myapp
TEST_TARGET = test_runner

# Build rules
$(TARGET): $(OBJECTS)
	$(CC) $(OBJECTS) -o $@ $(LDFLAGS)

$(TEST_TARGET): $(TEST_OBJECTS) $(filter-out src/core/main.o,$(OBJECTS))
	$(CC) $^ -o $@ $(LDFLAGS)

# Compilation rule
%.o: %.c
```
	$(CC) $(CFLAGS) -c $< -o $@
```

# Dependencies
-include $(OBJECTS:.o=.d)
%.d: %.c
```
	$(CC) $(CFLAGS) -MM -MT $(@:.d=.o) $`< >` $@
```

# Targets
.PHONY: all clean test install debug release

all: $(TARGET)

test: $(TEST_TARGET)
	./$(TEST_TARGET)

debug: CFLAGS += -g -DDEBUG
debug: $(TARGET)

release: CFLAGS += -O2 -DNDEBUG
release: $(TARGET)

install: $(TARGET)
	install -m 755 $(TARGET) /usr/local/bin/

clean:
	find . -name "*.o" -delete
	find . -name "*.d" -delete
	rm -f $(TARGET) $(TEST_TARGET)

# Help target
help:
	@echo "Available targets:"
	@echo "  all     - Build the application"
	@echo "  test    - Build and run tests"
	@echo "  debug   - Build with debug information"
	@echo "  release - Build optimized version"
	@echo "  install - Install to system"
	@echo "  clean   - Remove build artifacts"
	@echo "  help    - Show this help"
```

### Configuration Management
```makefile
# config.mk (generated by configure script)
CC = gcc
CFLAGS = -Wall -g
LDFLAGS = -lm
PREFIX = /usr/local
ENABLE_FEATURE_X = yes
USE_SSL = no

# Makefile
include config.mk

# Conditional features
ifeq ($(ENABLE_FEATURE_X),yes)
    CFLAGS += -DENABLE_FEATURE_X
    SOURCES += feature_x.c
endif

ifeq ($(USE_SSL),yes)
    CFLAGS += -DUSE_SSL
    LDFLAGS += -lssl -lcrypto
endif

# Installation paths
INSTALL_BIN = $(DESTDIR)$(PREFIX)/bin
INSTALL_LIB = $(DESTDIR)$(PREFIX)/lib
INSTALL_INCLUDE = $(DESTDIR)$(PREFIX)/include

# Installation rules
install: $(TARGET)
	install -d $(INSTALL_BIN)
	install -m 755 $(TARGET) $(INSTALL_BIN)/
	install -d $(INSTALL_INCLUDE)
	install -m 644 include/*.h $(INSTALL_INCLUDE)/

uninstall:
	rm -f $(INSTALL_BIN)/$(TARGET)
	rm -f $(INSTALL_INCLUDE)/*.h

.PHONY: install uninstall
```

### Documentation Generation
```makefile
# Documentation targets
DOCDIR = docs
SRCDIR = src

# Doxygen documentation
docs:
	doxygen Doxyfile

# README generation
README.md: $(SRCDIR)/*.c
	@echo "# Project README" > README.md
	@echo "Build date: $$(date)" >> README.md
	@echo "" >> README.md
	@echo "## Source Files" >> README.md
	@for file in $(SRCDIR)/*.c; do \
		echo "- \`$$file\`" >> README.md; \
	done

# Manual pages
manpages: $(wildcard man/*.1)
	gzip -c man/*.1 > manpages.gz

.PHONY: docs README.md manpages
```

## Parallel Builds

### Job Control
```bash
# Use all available CPU cores
make -j$(nproc)

# Use specific number of jobs
make -j4

# Limit based on system load
make --load-average=2.0

# One job per directory (for complex projects)
make -j1 --directory=subdir1 &
make -j1 --directory=subdir2 &
make -j1 --directory=subdir3 &
wait
```

### Recursive Make
```makefile
# Top-level Makefile
SUBDIRS = lib src utils

all: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@

clean:
	for dir in $(SUBDIRS); do \
		$(MAKE) -C $$dir clean; \
	done

.PHONY: all clean $(SUBDIRS)
```

## Advanced Features

### Automatic Dependency Generation
```makefile
# Generate dependencies automatically
CC = gcc
DEPFLAGS = -MT $@ -MMD -MP -MF $(@:.o=.d)

%.o: %.c
```
	$(CC) $(CFLAGS) $(DEPFLAGS) -c $< -o $@
```

# Include dependency files
include $(OBJECTS:.o=.d)
```

### Template Expansion
```makefile
# Template for multiple programs
PROGRAMS = client server

define PROGRAM_template
$(1)_SRCS = src/$(1).c src/comm.c
$(1)_OBJS = $$($(1)_SRCS:.c=.o)
$(1): $$($(1)_OBJS)
	$(CC) $$^ -o $$@ $(LDFLAGS)
endef

$(foreach prog,$(PROGRAMS),$(eval $(call PROGRAM_template,$(prog))))

all: $(PROGRAMS)
```

### Built-in Functions
```makefile
# File system functions
SRC_FILES = $(wildcard src/*.c)
INC_FILES = $(wildcard include/*.h)

# Path manipulation
RELATIVE_PATHS = $(notdir $(SOURCES))
ABSOLUTE_PATHS = $(addprefix $(CURDIR)/,$(SOURCES))

# String operations
VERSION = 1.2.3
MAJOR_VERSION = $(firstword $(subst ., ,$(VERSION)))
MINOR_VERSION = $(word 2,$(subst ., ,$(VERSION)))

# Conditional functions
HAS_FEATURE = $(if $(wildcard feature.c),yes,no)
```

## Related Commands

- [`gcc`](/docs/commands/development-tools/gcc) - GNU Compiler Collection
- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`cmake`](/docs/commands/development-tools/cmake) - Cross-platform build system
- [`autotools`](/docs/commands/development-tools/autotools) - GNU Autotools suite
- [`ar`](/docs/commands/development-tools/ar) - Archive utility
- [`ranlib`](/docs/commands/development-tools/ranlib) - Generate index for archive
- [`ld`](/docs/commands/development-tools/ld) - GNU Linker
- [`nm`](/docs/commands/development-tools/nm) - Symbol table extraction
- [`strip`](/docs/commands/development-tools/strip) - Strip symbols from objects

## Best Practices

- 1. **Use variables**: Define CC, CFLAGS, and other options as variables
- 2. **Include .PHONY targets**: Mark targets that don't create files
- 3. **Generate dependencies automatically**: Use compiler flags to track header dependencies
- 4. **Use pattern rules**: Reduce duplication with generic rules
- 5. **Clean targets**: Always provide a clean target to remove build artifacts
- 6. **Separate build and source**: Keep object files in separate directories
- 7. **Use parallel builds**: Enable -j flag for faster compilation
- 8. **Include help target**: Provide documentation for available targets
- 9. **Handle installation**: Support standard installation directories
- 10. **Version control**: Exclude generated files from version control

## Troubleshooting

### Common Issues
```bash
# Make can't find include files
make -I/path/to/includes

# Permission denied on parallel builds
make -j1  # Use single thread

# Circular dependencies
# Check for rules that depend on themselves

# Makefile not found
make -f custom_makefile

# Commands not showing execution
make --debug=v  # Show verbose output
```

### Performance Tips
```bash
# Avoid expensive file system operations
# Use $(shell) sparingly

# Use := for expensive operations
# Use ?= for optional definitions

# Minimize recursive make calls
# Use include for shared rules
```

The `make` command is a powerful and flexible build automation tool essential for managing complex software projects. Mastering its features enables efficient compilation, dependency management, and streamlined build processes for software development of any scale.