---
title: make - GNU Build Automation Tool
sidebar_label: make
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# make - GNU Build Automation Tool

The `make` command is GNU's build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles. Make determines which pieces of a large program need to be recompiled and issues commands to recompile them. This manual describes GNU make, which was implemented by Richard Stallman and Roland McGrath. Development with make enables efficient dependency tracking, incremental builds, and automated compilation workflows for projects of any size.

## Basic Syntax

```bash
make [options] [target] ...
```

## Common Options

### Basic Options
- `-h, --help` - Print help message and exit
- `-v, --version` - Print version information and exit
- `-f \<makefile\>, --file=\<makefile\>, --makefile=\<makefile\>` - Use specified file as a makefile
- `-C \<directory\>, --directory=\<directory\>` - Change to directory `\<directory\>` before reading makefiles
- `-j [jobs], --jobs[=jobs]` - Specify number of jobs to run simultaneously
- `-k, --keep-going` - Continue as much as possible after an error
- `-n, --just-print, --dry-run, --recon` - Print the commands but don't execute them

### Output Control
- `-s, --silent, --quiet` - Don't echo commands
- `-S, --no-keep-going, --stop` - Turns off -k
- `-t, --touch` - Touch targets instead of remaking them
- `-q, --question` - Run no commands; exit status shows if up to date
- `-W \\ <file\\>, --what-if=\\ <file\\>, --new-file=\\ <file\\>, --assume-new=\\ <file\\>` - Consider \<file\> to be very new
- `-o \\ <file\\>, --old-file=\\ <file\\>, --assume-old=\\ <file\\>` - Consider \<file\> to be very old and do not remake it

### Debugging Options
- `-d, --debug` - Print lots of debugging information
- `-p, --print-data-base` - Print make's internal database
- `--debug[=FLAGS]` - Print various types of debugging information
- `-i, --ignore-errors` - Ignore all errors in commands
- `-l, --load-average[=N]` - Don't start multiple jobs unless load is below N

### Environment Options
- `-e, --environment-overrides` - Environment variables override makefiles
- `-E <filename>, --environment-overrides=<filename>` - File to read environment from

### Special Targets
- `-B, --always-make` - Unconditionally make all targets
- `-r, --no-builtin-rules` - Disable the built-in implicit rules
- `-R, --no-builtin-variables` - Disable the built-in variable settings
- `-I <directory>, --include-dir=<directory>` - Search `<directory>` for included makefiles

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
	$(CC) $(CFLAGS) -c $< -o $@

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
# Simple assignment (recursive)
CC = gcc

# Immediate assignment (simple)
CFLAGS := -Wall -g

# Conditional assignment
DEBUG ?= yes

# Append
CFLAGS += -O2

# Shell assignment
TIMESTAMP = $(shell date)

# Substitution
OBJECTS = $(SOURCES:.c=.o)

# Multi-line variable
HEADER = /*
 * Program header
 * Generated automatically
 */
```

### Automatic Variables
```makefile
target: dependencies
	command $@    # $@ = target name
	command $<    # $< = first dependency
	command $^    # $^ = all dependencies
	command $?    # $? = dependencies newer than target
	command $*    # $* = stem matched in pattern rule
	command $+    # $+ = all dependencies with duplicates
	command $|    # $| = order-only dependencies
```

## Usage Examples

### Basic Compilation

#### Simple C Program
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

.PHONY: all clean
```

```bash
# Build the program
make

# Clean build artifacts
make clean

# Build with specific target
make all

# Build with verbose output
make --debug=v

# Dry run to see what would be built
make -n
```

#### Multi-file Project
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
	$(CC) $(CFLAGS) -c $< -o $@

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

#### Static and Shared Libraries
```makefile
# Compiler and archiver
CC = gcc
AR = ar
ARFLAGS = rcs

# Static library
STATIC_LIB = libmylib.a
STATIC_OBJS = utils.o helpers.o
STATIC_CFLAGS = -Wall -g

# Shared library
SHARED_LIB = libmylib.so
SHARED_OBJS = utils.o helpers.o
SHARED_CFLAGS = -Wall -g -fPIC
SHARED_LDFLAGS = -shared

# Build static library
$(STATIC_LIB): $(STATIC_OBJS)
	$(AR) $(ARFLAGS) $@ $^

# Build shared library
$(SHARED_LIB): $(SHARED_OBJS)
	$(CC) $(SHARED_LDFLAGS) -o $@ $^

# Compile static objects
%.o: %.c
	$(CC) $(STATIC_CFLAGS) -c $< -o $@

# Compile shared objects
$(SHARED_OBJS): CFLAGS += $(SHARED_CFLAGS)

# Install libraries
install-static: $(STATIC_LIB)
	install -d /usr/local/lib
	install -m 644 $(STATIC_LIB) /usr/local/lib/

install-shared: $(SHARED_LIB)
	install -d /usr/local/lib
	install -m 755 $(SHARED_LIB) /usr/local/lib/
	ldconfig

install: install-static install-shared
	install -d /usr/local/include
	install -m 644 include/*.h /usr/local/include/

uninstall:
	rm -f /usr/local/lib/$(STATIC_LIB)
	rm -f /usr/local/lib/$(SHARED_LIB)

.PHONY: install-static install-shared install uninstall
```

#### Conditional Compilation
```makefile
# Debug/Release modes
DEBUG ?= 0
OPTIMIZE ?= 2

ifeq ($(DEBUG), 1)
    CFLAGS = -g -O0 -DDEBUG -Wall -Wextra
    BUILD_DIR = debug
else
    CFLAGS = -O$(OPTIMIZE) -DNDEBUG -Wall
    BUILD_DIR = release
endif

TARGET = program
SOURCES = main.c utils.c helpers.c
OBJECTS = $(SOURCES:%.c=$(BUILD_DIR)/%.o)

# Create build directory
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Compile objects
$(BUILD_DIR)/%.o: %.c | $(BUILD_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

# Link executable
$(BUILD_DIR)/$(TARGET): $(OBJECTS)
	$(CC) $(CFLAGS) -o $@ $^

# Build targets
debug: DEBUG = 1
debug: $(BUILD_DIR)/$(TARGET)

release: DEBUG = 0
release: $(BUILD_DIR)/$(TARGET)

all: $(BUILD_DIR)/$(TARGET)

.PHONY: debug release all
```

### Advanced Makefile Features

#### Pattern Rules
```makefile
# Generic pattern rule
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# More specific pattern rule for debug builds
debug/%.o: %.c
	$(CC) -g -O0 -DDEBUG -c $< -o $@

# Optimized build pattern
release/%.o: %.c
	$(CC) -O3 -DNDEBUG -c $< -o $@

# Pattern rule with header dependencies
%.o: %.c %.h
	$(CC) $(CFLAGS) -c $< -o $@

# Multiple patterns
%.o: %.c | $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@
```

#### Conditional Processing
```makefile
# Check operating system
UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Linux)
    LDFLAGS = -lm -lrt
    PLATFORM_SPECIFIC = linux_specific.c
endif
ifeq ($(UNAME_S),Darwin)
    LDFLAGS = -lm
    PLATFORM_SPECIFIC = macos_specific.c
endif

# Check for compiler
ifeq ($(CC),gcc)
    CFLAGS += -fopenmp
    OPENMP_LIBS = -lgomp
else ifeq ($(CC),clang)
    CFLAGS += -fopenmp=libomp
    OPENMP_LIBS = -lomp
endif

# Check for optional dependencies
ifeq ($(wildcard /usr/include/openssl/ssl.h),)
    $(warning OpenSSL not found, SSL support disabled)
else
    CFLAGS += -DUSE_SSL
    LDFLAGS += -lssl -lcrypto
    SSL_SOURCES = ssl_utils.c
endif

# Feature flags
ENABLE_GUI ?= no
ifeq ($(ENABLE_GUI),yes)
    CFLAGS += -DENABLE_GUI $(shell pkg-config --cflags gtk+-3.0)
    LDFLAGS += $(shell pkg-config --libs gtk+-3.0)
    GUI_SOURCES = gui_main.c gui_window.c
endif
```

#### Function Usage
```makefile
# String functions
SOURCES = main.c utils.c helpers.c
OBJECTS = $(SOURCES:.c=.o)
BASENAMES = $(basename $(SOURCES))
DIRNAMES = $(dir $(SOURCES))
FILENAMES = $(notdir $(SOURCES))

# Substitution and filtering
PROG_SRCS = $(filter %.c, $(SOURCES))
PROG_OBJS = $(patsubst %.c,%.o,$(PROG_SRCS))

# Foreach function
SRC_DIRS = src lib tests
INC_DIRS = $(addprefix -I,$(SRC_DIRS))

# Shell commands
GIT_HASH = $(shell git rev-parse HEAD 2>/dev/null || echo "unknown")
BUILD_TIME = $(shell date +%Y-%m-%d_%H:%M:%S)
HOSTNAME = $(shell hostname)

# Conditional functions
ifeq ($(shell which gcc),)
    $(error GCC not found, please install GCC)
endif

# Advanced string manipulation
VERSION = 1.2.3
MAJOR_VERSION = $(firstword $(subst ., ,$(VERSION)))
MINOR_VERSION = $(word 2,$(subst ., ,$(VERSION)))
PATCH_VERSION = $(word 3,$(subst ., ,$(VERSION)))

# File existence checks
HAS_CONFIG = $(if $(wildcard config.h),yes,no)
ifeq ($(HAS_CONFIG),no)
    $(warning config.h not found, using defaults)
endif
```

#### Multiple Makefiles
```makefile
# Include other makefiles
include config.mk
include rules.mk

# Conditional inclusion (won't error if file doesn't exist)
-include local.mk

# Export/Unexport variables to sub-makes
export CC CFLAGS LDFLAGS
unexport SECRET_KEY DEBUG_KEY

# Include path for additional makefiles
MAKEFLAGS += --include-dir=mkfiles

# Conditional includes based on configuration
ifeq ($(USE_CUSTOM_RULES),yes)
    include custom_rules.mk
endif
```

## Special Targets

#### Phony Targets
```makefile
.PHONY: all clean install test distclean help debug release docs

all: $(TARGET)

clean:
	rm -f $(OBJECTS) $(TARGET) $(DEPFILES)

install: $(TARGET)
	install -d $(DESTDIR)/usr/local/bin
	install -m 755 $(TARGET) $(DESTDIR)/usr/local/bin/

test:
	./run_tests.sh

distclean: clean
	rm -f config.log config.status config.h
	rm -rf autom4te.cache

docs:
	doxygen Doxyfile

help:
	@echo "Targets:"
	@echo "  all       - Build the program"
	@echo "  clean     - Remove build artifacts"
	@echo "  install   - Install the program"
	@echo "  test      - Run tests"
	@echo "  docs      - Generate documentation"
	@echo "  debug     - Build with debug information"
	@echo "  release   - Build optimized version"
	@echo "  help      - Show this help"
```

#### Default Goal
```makefile
# Set default goal
.DEFAULT_GOAL := all

# Or explicitly set as first rule
all: program
	@echo "Building complete"

program: main.o utils.o helpers.o
	$(CC) -o $@ $^

# Alternative default with prerequisites
.DEFAULT_GOAL := release

release: $(TARGET)
	@echo "Release build completed"
```

#### Suffix Rules (deprecated but still supported)
```makefile
.SUFFIXES: .c .o .cpp .cc

# C source files
.c.o:
	$(CC) $(CFLAGS) -c $< -o $@

# C++ source files
.cpp.o:
	$(CXX) $(CXXFLAGS) -c $< -o $@

.cc.o:
	$(CXX) $(CXXFLAGS) -c $< -o $@
```

## Practical Examples

### Complex Project Structure

#### Multi-Module Application
```makefile
# Project structure:
# src/
#   ├── core/
#   │   ├── main.c
#   │   ├── utils.c
#   │   └── memory.c
#   ├── modules/
#   │   ├── network.c
#   │   ├── database.c
#   │   └── ui.c
#   ├── tests/
#   │   ├── test_main.c
#   │   └── test_utils.c
#   └── third_party/
#       └── external_lib.c
# include/
#   ├── core.h
#   ├── modules.h
#   └── config.h

# Configuration
CC = gcc
CXX = g++
CFLAGS = -Wall -Wextra -std=c11 -I./include
CXXFLAGS = -Wall -Wextra -std=c++11 -I./include
LDFLAGS = -lm -lpthread

# Source directories
SRC_DIRS = src/core src/modules src/third_party
TEST_DIR = src/tests
INC_DIR = include

# Find source files
C_SOURCES = $(shell find $(SRC_DIRS) -name "*.c")
CXX_SOURCES = $(shell find $(SRC_DIRS) -name "*.cpp")
ALL_SOURCES = $(C_SOURCES) $(CXX_SOURCES)

# Object files
C_OBJECTS = $(C_SOURCES:%.c=%.o)
CXX_OBJECTS = $(CXX_SOURCES:%.cpp=%.o)
ALL_OBJECTS = $(C_OBJECTS) $(CXX_OBJECTS)

# Test files
TEST_SOURCES = $(shell find $(TEST_DIR) -name "*.c")
TEST_OBJECTS = $(TEST_SOURCES:%.c=%.o)

# Targets
TARGET = myapp
TEST_TARGET = test_runner
STATIC_LIB = libmyapp.a
SHARED_LIB = libmyapp.so

# Build rules
$(TARGET): $(ALL_OBJECTS)
	$(CXX) $^ -o $@ $(LDFLAGS)

$(STATIC_LIB): $(ALL_OBJECTS)
	$(AR) rcs $@ $^

$(SHARED_LIB): $(ALL_OBJECTS)
	$(CXX) -shared -o $@ $^

$(TEST_TARGET): $(TEST_OBJECTS) $(filter-out src/core/main.o,$(ALL_OBJECTS))
	$(CXX) $^ -o $@ $(LDFLAGS)

# Compilation rules
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Dependency generation
-include $(ALL_OBJECTS:.o=.d)
%.d: %.c
	$(CC) $(CFLAGS) -MM -MT $(@:.d=.o) $< > $@

%.d: %.cpp
	$(CXX) $(CXXFLAGS) -MM -MT $(@:.d=.o) $< > $@

# Targets
.PHONY: all clean test install debug release docs static shared

all: $(TARGET)

static: $(STATIC_LIB)

shared: $(SHARED_LIB)

test: $(TEST_TARGET)
	./$(TEST_TARGET)

debug: CFLAGS += -g -DDEBUG -fsanitize=address
debug: CXXFLAGS += -g -DDEBUG -fsanitize=address
debug: LDFLAGS += -fsanitize=address
debug: $(TARGET)

release: CFLAGS += -O3 -DNDEBUG -flto
release: CXXFLAGS += -O3 -DNDEBUG -flto
release: LDFLAGS += -flto
release: $(TARGET)

install: $(TARGET)
	install -d $(DESTDIR)/usr/local/bin
	install -m 755 $(TARGET) $(DESTDIR)/usr/local/bin/
	install -d $(DESTDIR)/usr/local/lib
	install -m 644 $(STATIC_LIB) $(DESTDIR)/usr/local/lib/
	install -m 755 $(SHARED_LIB) $(DESTDIR)/usr/local/lib/
	install -d $(DESTDIR)/usr/local/include
	install -m 644 include/*.h $(DESTDIR)/usr/local/include/

clean:
	find . -name "*.o" -delete
	find . -name "*.d" -delete
	rm -f $(TARGET) $(TEST_TARGET) $(STATIC_LIB) $(SHARED_LIB)

docs:
	doxygen Doxyfile

# Help target
help:
	@echo "Available targets:"
	@echo "  all      - Build the application"
	@echo "  static   - Build static library"
	@echo "  shared   - Build shared library"
	@echo "  test     - Build and run tests"
	@echo "  debug    - Build with debug information"
	@echo "  release  - Build optimized version"
	@echo "  install  - Install to system"
	@echo "  clean    - Remove build artifacts"
	@echo "  docs     - Generate documentation"
	@echo "  help     - Show this help"
```

### Configuration Management

#### Configurable Build System
```makefile
# config.mk (can be generated by configure script)
CC = gcc
CFLAGS = -Wall -g
LDFLAGS = -lm
PREFIX = /usr/local
ENABLE_FEATURE_X = yes
USE_SSL = no
GUI_BACKEND = gtk
BUILD_TESTS = yes

# Main Makefile
include config.mk

# Conditional features
ifeq ($(ENABLE_FEATURE_X),yes)
    CFLAGS += -DENABLE_FEATURE_X
    SOURCES += feature_x.c feature_x_impl.c
    HEADERS += feature_x.h
endif

ifeq ($(USE_SSL),yes)
    CFLAGS += -DUSE_SSL
    LDFLAGS += -lssl -lcrypto
    SSL_SOURCES = ssl_utils.c ssl_client.c
    SOURCES += $(SSL_SOURCES)
endif

# GUI backend selection
ifeq ($(GUI_BACKEND),gtk)
    CFLAGS += $(shell pkg-config --cflags gtk+-3.0)
    LDFLAGS += $(shell pkg-config --libs gtk+-3.0)
    GUI_SOURCES = gtk_main.c gtk_window.c gtk_widgets.c
else ifeq ($(GUI_BACKEND),qt)
    CFLAGS += $(shell pkg-config --cflags Qt5Widgets)
    LDFLAGS += $(shell pkg-config --libs Qt5Widgets)
    GUI_SOURCES = qt_main.cpp qt_window.cpp qt_widgets.cpp
endif

# Test building
ifeq ($(BUILD_TESTS),yes)
    TEST_SOURCES = tests/test_suite.c tests/test_utils.c
    TEST_TARGET = test_runner
endif

# Installation paths
INSTALL_BIN = $(DESTDIR)$(PREFIX)/bin
INSTALL_LIB = $(DESTDIR)$(PREFIX)/lib
INSTALL_INCLUDE = $(DESTDIR)$(PREFIX)/include
INSTALL_MAN = $(DESTDIR)$(PREFIX)/share/man/man1
INSTALL_DOC = $(DESTDIR)$(PREFIX)/share/doc/$(TARGET)

# Installation rules
install: $(TARGET)
	install -d $(INSTALL_BIN)
	install -m 755 $(TARGET) $(INSTALL_BIN)/
ifneq ($(STATIC_LIB),)
	install -d $(INSTALL_LIB)
	install -m 644 $(STATIC_LIB) $(INSTALL_LIB)/
endif
	install -d $(INSTALL_INCLUDE)
	install -m 644 include/*.h $(INSTALL_INCLUDE)/
	install -d $(INSTALL_MAN)
	install -m 644 docs/$(TARGET).1 $(INSTALL_MAN)/
	install -d $(INSTALL_DOC)
	install -m 644 README.md LICENSE CHANGELOG.md $(INSTALL_DOC)/

uninstall:
	rm -f $(INSTALL_BIN)/$(TARGET)
	rm -f $(INSTALL_LIB)/$(STATIC_LIB)
	rm -rf $(INSTALL_INCLUDE)
	rm -f $(INSTALL_MAN)/$(TARGET).1
	rm -rf $(INSTALL_DOC)

# Configuration validation
validate-config:
ifeq ($(wildcard config.mk),)
	$(error config.mk not found. Please run ./configure first)
endif
	@echo "Configuration validated successfully"

.PHONY: install uninstall validate-config
```

### Documentation Generation

#### Automated Documentation
```makefile
# Documentation targets
DOCDIR = docs
SRCDIR = src
WWWDIR = www

# Doxygen documentation
docs: $(DOCDIR)
	doxygen Doxyfile

$(DOCDIR):
	mkdir -p $(DOCDIR)

# README generation
README.md: $(SRCDIR)/*.c
	@echo "# $(TARGET)" > README.md
	@echo "Build date: $$(date)" >> README.md
	@echo "Version: $(VERSION)" >> README.md
	@echo "" >> README.md
	@echo "## Source Files" >> README.md
	@for file in $(SRCDIR)/*.c; do \
		echo "- \`$$file\`" >> README.md; \
	done
	@echo "" >> README.md
	@echo "## Build Instructions" >> README.md
	@echo "\`\`\`bash" >> README.md
	@echo "make" >> README.md
	@echo "\`\`\`" >> README.md

# Manual pages
manpages: man/$(TARGET).1
	gzip -c man/$(TARGET).1 > man/$(TARGET).1.gz

man/$(TARGET).1: $(TARGET)
	help2man -n "$(TARGET) - application description" ./$< > $@

# API documentation with pandoc
api-docs: $(DOCDIR)
	@echo "# API Documentation" > $(DOCDIR)/API.md
	@echo "Generated on $$(date)" >> $(DOCDIR)/API.md
	@for header in include/*.h; do \
		echo "## $$header" >> $(DOCDIR)/API.md; \
		echo "\`\`\`c" >> $(DOCDIR)/API.md; \
		cat $$header >> $(DOCDIR)/API.md; \
		echo "\`\`\`" >> $(DOCDIR)/API.md; \
		echo "" >> $(DOCDIR)/API.md; \
	done

# Website generation
website: $(WWWDIR)
	cp -r $(DOCDIR)/* $(WWWDIR)/
	@echo "Website updated in $(WWWDIR)/"

$(WWWDIR):
	mkdir -p $(WWWDIR)

# Clean documentation
clean-docs:
	rm -rf $(DOCDIR) $(WWWDIR)
	rm -f README.md man/$(TARGET).1.gz

.PHONY: docs manpages api-docs website clean-docs
```

## Parallel Builds and Performance

### Job Control
```bash
# Use all available CPU cores
make -j$(nproc)

# Use specific number of jobs
make -j4
make -j8

# Use jobserver for recursive makes
make -j --jobserver-auth=3,4

# Limit based on system load
make --load-average=2.0
make -j4 --load-average=1.5

# One job per directory (for complex projects)
make -j1 --directory=subdir1 &
make -j1 --directory=subdir2 &
make -j1 --directory=subdir3 &
wait

# Combined parallel and load control
make -j8 --max-load=4.0
```

### Recursive Make
```makefile
# Top-level Makefile
SUBDIRS = lib src utils tests
SUBMAKE = $(MAKE) -C

# Build all subdirectories
all: $(SUBDIRS)

$(SUBDIRS):
	$(SUBMAKE) $@

# Clean all subdirectories
clean:
	@for dir in $(SUBDIRS); do \
		echo "Cleaning $$dir"; \
		$(SUBMAKE) -C $$dir clean; \
	done

# Parallel recursive make
parallel:
	@for dir in $(SUBDIRS); do \
		$(SUBMAKE) -C $$dir & \
	done
	@wait

# Install all components
install:
	@for dir in $(SUBDIRS); do \
		$(SUBMAKE) -C $$dir install; \
	done

.PHONY: all clean parallel install $(SUBDIRS)
```

### Advanced Performance Techniques

#### Smart Dependency Tracking
```makefile
# Fast dependency generation
CC = gcc
DEPFLAGS = -MT $@ -MMD -MP -MF $(@:.o=.d)

# Include dependency files (only if they exist)
DEPFILES = $(OBJECTS:.o=.d)
-include $(DEPFILES)

# Compile with dependency generation
%.o: %.c
	$(CC) $(CFLAGS) $(DEPFLAGS) -c $< -o $@

# Alternative: use external dependency tracker
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
	$(CC) $(CFLAGS) -MM $< > $(@:.o=.d)

# Clean dependencies only
clean-deps:
	rm -f $(DEPFILES)

.PHONY: clean-deps
```

#### Incremental Builds
```makefile
# Timestamp files for tracking
BUILD_STAMP = .build_stamp
CONFIG_STAMP = .config_stamp

# Force rebuild if configuration changed
$(BUILD_STAMP): $(CONFIG_STAMP)
	@touch $@

# Configuration check
$(CONFIG_STAMP): config.mk
	@echo "Configuration updated"
	@touch $@

# Build depends on timestamp
$(TARGET): $(OBJECTS) $(BUILD_STAMP)
	$(CC) $(LDFLAGS) -o $@ $(OBJECTS)

# Force rebuild
force-rebuild:
	@rm -f $(BUILD_STAMP)
	@$(MAKE) all

.PHONY: force-rebuild
```

## Advanced Features and Techniques

### Template Expansion and Metaprogramming
```makefile
# Template for multiple programs
PROGRAMS = client server daemon

# Define program template
define PROGRAM_template
$(1)_SRCS = src/$(1).c src/comm.c src/utils.c
$(1)_OBJS = $$($(1)_SRCS:.c=.o)
$(1)_DEPS = $$($(1)_OBJS:.o=.d)

# Build rule for each program
$(1): $$($(1)_OBJS)
	$(CC) $$^ -o $$@ $(LDFLAGS)

# Install rule for each program
install-$(1): $(1)
	install -m 755 $$< $(DESTDIR)/usr/local/bin/

# Clean rule for each program
clean-$(1):
	rm -f $$($(1)_OBJS) $$($(1)_DEPS) $(1)

endef

# Generate rules for each program
$(foreach prog,$(PROGRAMS),$(eval $(call PROGRAM_template,$(prog))))

# Aggregate targets
all: $(PROGRAMS)

install: $(addprefix install-,$(PROGRAMS))

clean: $(addprefix clean-,$(PROGRAMS))

.PHONY: all install clean $(addprefix install-,$(PROGRAMS)) $(addprefix clean-,$(PROGRAMS))
```

### Built-in Functions Reference
```makefile
# File system functions
SRC_FILES = $(wildcard src/*.c)
ALL_HEADERS = $(wildcard include/**/*.h)
ALL_SUBDIRS = $(shell find . -type d -name "*test*")

# Path manipulation
RELATIVE_PATHS = $(notdir $(SOURCES))
ABSOLUTE_PATHS = $(addprefix $(CURDIR)/,$(SOURCES))
DIR_ONLY = $(dir src/core/main.c)        # returns "src/core/"
FILE_ONLY = $(notdir src/core/main.c)    # returns "main.c"

# String operations
VERSION = 1.2.3
MAJOR_VERSION = $(firstword $(subst ., ,$(VERSION)))
MINOR_VERSION = $(word 2,$(subst ., ,$(VERSION)))
PATCH_VERSION = $(word 3,$(subst ., ,$(VERSION)))

# List operations
FILTERED = $(filter %.c %.cpp,$(SOURCES))
FILTERED_OUT = $(filter-out test_%,$(SOURCES))
SORTED = $(sort $(SOURCES))
UNIQUE = $(sort $(LIST_WITH_DUPLICATES))

# Conditional functions
HAS_FEATURE = $(if $(wildcard feature.c),yes,no)
IS_DEBUG = $(if $(findstring debug,$(CFLAGS)),true,false)

# Arithmetic (using shell)
COUNT = $(shell echo $(words $(SOURCES)) | wc -w)
SUM = $(shell expr 1 + 2)

# Advanced filtering
TEST_FILES = $(filter $(addsuffix %,$(TEST_PATTERN)),$(SOURCES))
EXCLUDE_PATTERNS = %_test.c %_mock.c
MAIN_SOURCES = $(filter-out $(EXCLUDE_PATTERNS),$(SOURCES))

# Text replacement
REPLACED = $(patsubst %.c,%.o,$(SOURCES))
STRIPPED = $(basename main.c test.c)  # returns "main test"
WITH_SUFFIX = $(addsuffix .c,main test)  # returns "main.c test.c"

# Join and split
PATH_WITH_COLON = $(subst $(space),:,$(SRC_DIRS))
SPLIT_PATH = $(subst :,$(space),$(PATH_WITH_COLON))

# Call function for advanced operations
define func
$(1): $(2)
	@echo "Building $(1) from $(2)"
endef

$(eval $(call func,target1,source1.c source2.c))
$(eval $(call func,target2,source3.c source4.c))
```

### Advanced Variable Manipulation
```makefile
# Immediate vs deferred assignment
IMMEDIATE := $(shell date)
DEFERRED = $(shell date)

# Conditional assignment with complex conditions
ifeq ($(origin CC),undefined)
    CC = gcc
endif

# Override detection
ifneq ($(filter origin override,$(origin CFLAGS)),)
    $(warning CFLAGS was overridden)
endif

# Complex variable computation
ALL_FLAGS = $(CFLAGS) $(CPPFLAGS) $(TARGET_ARCH)
FINAL_FLAGS = $(strip $(ALL_FLAGS))

# Target-specific variables
debug: CFLAGS += -g -DDEBUG
release: CFLAGS += -O3 -DNDEBUG

# Pattern-specific variables
debug/%.o: CFLAGS += -g -O0
release/%.o: CFLAGS += -O3 -flto

# Environment variable handling
export BUILD_NUMBER ?= $(shell date +%Y%m%d)
export GIT_COMMIT ?= $(shell git rev-parse HEAD 2>/dev/null || echo "unknown")

# Command line variable override
CONFIG_FILE ?= config.default
include $(CONFIG_FILE)

# Variable debugging
debug-vars:
	@echo "CFLAGS = $(CFLAGS)"
	@echo "LDFLAGS = $(LDFLAGS)"
	@echo "SOURCES = $(SOURCES)"
	@echo "OBJECTS = $(OBJECTS)"
	@echo "origin of CFLAGS: $(origin CFLAGS)"
	@echo "flavor of CFLAGS: $(flavor CFLAGS)"

.PHONY: debug-vars
```

## Integration and Automation

### Continuous Integration Script
```bash
#!/bin/bash
# ci-build.sh - Continuous Integration Build Script

set -e  # Exit on any error

echo "Starting CI build..."

# Environment setup
export CC=${CC:-gcc}
export CXX=${CXX:-g++}
export MAKEFLAGS=${MAKEFLAGS:-"-j$(nproc)"}

# Configuration validation
if [ ! -f "Makefile" ]; then
    echo "Error: No Makefile found"
    exit 1
fi

# Clean build
echo "Cleaning previous builds..."
make clean

# Debug build
echo "Building debug version..."
make debug CFLAGS="-g -O0 -DDEBUG -Wall -Wextra"

# Run tests if available
if grep -q "test:" Makefile; then
    echo "Running tests..."
    make test
fi

# Release build
echo "Building release version..."
make clean
make release CFLAGS="-O3 -DNDEBUG -Wall"

# Static analysis (optional)
if command -v cppcheck >/dev/null 2>&1; then
    echo "Running static analysis..."
    cppcheck --enable=all src/ || true
fi

# Memory check (if debug build has address sanitizer)
if [ -f "./myapp" ]; then
    echo "Running memory check..."
    ./myapp --self-test || true
fi

echo "CI build completed successfully!"
```

### Automated Testing Framework
```makefile
# Testing framework integration
TEST_FRAMEWORK = unity
TEST_DIR = tests
SRC_DIR = src
BUILD_DIR = build

# Test sources
TEST_SOURCES = $(wildcard $(TEST_DIR)/*_test.c)
TEST_OBJECTS = $(TEST_SOURCES:$(TEST_DIR)/%.c=$(BUILD_DIR)/test_%.o)
SRC_OBJECTS = $(filter-out $(BUILD_DIR)/main.o,$(wildcard $(BUILD_DIR)/*.o))

# Test runner
TEST_RUNNER = $(BUILD_DIR)/test_runner

# Unity test framework setup
UNITY_DIR = vendor/unity
UNITY_SRC = $(UNITY_DIR)/src/unity.c
UNITY_OBJ = $(BUILD_DIR)/unity.o

# Build Unity
$(UNITY_OBJ): $(UNITY_SRC)
	$(CC) $(CFLAGS) -I$(UNITY_DIR)/src -c $< -o $@

# Build test objects
$(BUILD_DIR)/test_%.o: $(TEST_DIR)/%.c | $(BUILD_DIR)
	$(CC) $(CFLAGS) -I$(SRC_DIR) -I$(UNITY_DIR)/src -c $< -o $@

# Link test runner
$(TEST_RUNNER): $(TEST_OBJECTS) $(SRC_OBJECTS) $(UNITY_OBJ)
	$(CC) $^ -o $@ $(LDFLAGS)

# Run tests
test: $(TEST_RUNNER)
	@echo "Running unit tests..."
	./$(TEST_RUNNER)

# Test with coverage (requires gcov/lcov)
test-coverage: CFLAGS += --coverage
test-coverage: LDFLAGS += --coverage
test-coverage: clean $(TEST_RUNNER)
	@echo "Running tests with coverage..."
	./$(TEST_RUNNER)
	@echo "Generating coverage report..."
	gcov $(SRC_DIR)/*.c
	lcov --capture --directory . --output-file coverage.info
	genhtml coverage.info --output-directory coverage_html

# Continuous integration target
ci: clean debug test test-coverage

# Memory testing with valgrind
test-memory: $(TEST_RUNNER)
	@echo "Running memory tests..."
	valgrind --leak-check=full --error-exitcode=1 ./$(TEST_RUNNER)

# Performance testing
test-performance: $(TARGET)
	@echo "Running performance tests..."
	time ./$(TARGET) --benchmark

.PHONY: test test-coverage ci test-memory test-performance
```

### Integration with Build Tools
```makefile
# CMake integration
cmake-build:
	mkdir -p build
	cd build && cmake ..
	cd build && make -j$(nproc)

# Autotools integration
autogen:
	@if [ ! -f "configure" ]; then \
		autoreconf --install; \
	fi

configure: autogen
	./configure

make-dist: configure
	make dist

# Meson build system integration
meson-setup:
	meson setup builddir

meson-build: meson-setup
	meson compile -C builddir

# Docker build integration
docker-build:
	docker build -t $(TARGET):latest .

docker-run: docker-build
	docker run --rm $(TARGET):latest

# Cross-compilation support
cross-compile-arm:
	$(MAKE) CC=arm-linux-gnueabihf-gcc \
	         CXX=arm-linux-gnueabihf-g++ \
	         TARGET_ARCH=armv7l

cross-compile-windows:
	$(MAKE) CC=x86_64-w64-mingw32-gcc \
	         CXX=x86_64-w64-mingw32-g++ \
	         TARGET_ARCH=x86_64-w64-mingw32 \
	         EXE_SUFFIX=.exe

.PHONY: cmake-build autogen configure make-dist meson-setup meson-build \
        docker-build docker-run cross-compile-arm cross-compile-windows
```

## Troubleshooting

### Common Issues and Solutions

#### Makefile Not Found
```bash
# Check for makefile variants
ls -la Makefile makefile GNUmakefile

# Specify makefile explicitly
make -f mymakefile
make --file=custom.mk

# Check current directory
pwd
make -C /path/to/project
```

#### Permission Issues
```bash
# Check file permissions
ls -la Makefile
chmod +x Makefile  # if needed

# Check directory permissions
ls -ld .
chmod 755 .  # if needed

# Run with different user
sudo make install  # for system-wide installation
```

#### Parallel Build Failures
```bash
# Reduce parallelism
make -j1  # Single-threaded build
make -j2  # Limited parallelism

# Check for race conditions
make -j1  # If this works but parallel fails, there's a race condition

# Fix race conditions in Makefile
# Use order-only prerequisites or proper dependency tracking
```

#### Dependency Issues
```bash
# Check what's being rebuilt
make -n  # Dry run to see commands

# Debug dependencies
make -p | grep -A5 -B5 target_name

# Force rebuild
make -B target_name

# Check timestamps
stat source_file.c
stat target_file.o
```

#### Circular Dependencies
```bash
# Detect circular dependencies
make --debug=b | grep -i circular

# Common circular patterns to avoid:
# target1: target2
# target2: target1  # This creates a circle
```

### Performance Optimization Tips

#### Makefile Optimization
```makefile
# Use := for expensive operations
OBJECTS := $(wildcard *.c:.c=.o)  # Evaluated once
OBJECTS = $(wildcard *.c:.c=.o)   # Evaluated every time

# Minimize shell command usage
# Bad:
FILES = $(shell find . -name "*.c")

# Better:
FILES = $(wildcard *.c */*.c */*/*.c)

# Use built-in functions instead of shell
# Bad:
TIME = $(shell date +%s)

# Better:
TIME = $(date +%s)  # Used in rules where it's needed
```

#### Build Optimization
```bash
# Use ccache for faster rebuilds
export CC="ccache gcc"
export CXX="ccache g++"

# Use ramdisk for builds (Linux)
sudo mount -t tmpfs -o size=1G tmpfs /tmp/build
make

# Use faster linker
export LDFLAGS="-fuse-ld=gold"

# Optimize for your system
export CFLAGS="-march=native -mtune=native"
```

#### Memory Usage Optimization
```bash
# Limit memory usage during parallel builds
make -j4 --load-average=2.0

# Use 32-bit tools on 64-bit system (if memory constrained)
export CC="gcc -m32"
export CXX="g++ -m32"

# Monitor memory usage
/usr/bin/time -v make -j$(nproc)
```

### Debugging Makefiles

#### Verbose Output
```bash
# Show all commands
make --debug=v

# Show make database
make -p

# Show environment variables
make -e --print-data-base

# Show which directory make is running from
make -w
```

#### Tracing Execution
```bash
# Trace all rule evaluation
make --debug=basic

# Trace file considerations
make --debug=files

# Trace variable assignments
make --debug=variables

# Trace everything
make -d
```

#### Common Debugging Targets
```makefile
# Print all variables
print-vars:
	@$(foreach V,$(.VARIABLES),\
		$(info $(V) = $($(V))))

# Print specific variables
debug-info:
	@echo "TARGET = $(TARGET)"
	@echo "SOURCES = $(SOURCES)"
	@echo "OBJECTS = $(OBJECTS)"
	@echo "CFLAGS = $(CFLAGS)"
	@echo "LDFLAGS = $(LDFLAGS)"

# Check if files exist
check-files:
	@for file in $(SOURCES); do \
		if [ ! -f "$$file" ]; then \
			echo "Missing source: $$file"; \
		fi; \
	done

# Print include paths
print-includes:
	@echo "Include paths:"
	@echo $(CFLAGS) | tr ' ' '\n' | grep '^-I' | sed 's/^-I/  /'

.PHONY: print-vars debug-info check-files print-includes
```

## Related Commands

- [`gcc`](/docs/commands/development/gcc) - GNU Compiler Collection
- [`gdb`](/docs/commands/development/gdb) - GNU Debugger
- [`cmake`](/docs/commands/development/cmake) - Cross-platform build system
- [`autotools`](/docs/commands/development/autotools) - GNU Autotools suite
- [`ar`](/docs/commands/development/ar) - Archive utility for creating libraries
- [`ranlib`](/docs/commands/development/ranlib) - Generate index for archive
- [`ld`](/docs/commands/development/ld) - GNU Linker
- [`nm`](/docs/commands/development/nm) - Symbol table extraction
- [`strip`](/docs/commands/development/strip) - Strip symbols from objects
- [`pkg-config`](/docs/commands/development/pkg-config) - Package configuration helper
- [`gcc`](/docs/commands/development/gcc) - GNU C compiler
- [`g++`](/docs/commands/development/g++) - GNU C++ compiler
- [`ldd`](/docs/commands/development/ldd) - Print shared library dependencies
- [`objdump`](/docs/commands/development/objdump) - Display object file information
- [`readelf`](/docs/commands/development/readelf) - Display ELF file information

## Best Practices

1. **Use Variables Effectively**: Define CC, CFLAGS, LDFLAGS, and other options as variables at the top of the Makefile
2. **Include .PHONY Targets**: Mark targets that don't create files to avoid conflicts with files of the same name
3. **Generate Dependencies Automatically**: Use compiler flags like -MMD -MP to track header dependencies
4. **Use Pattern Rules**: Reduce duplication with generic compilation rules
5. **Always Provide Clean Targets**: Include clean and distclean targets to remove build artifacts
6. **Separate Build and Source**: Keep object files in separate directories to organize builds
7. **Enable Parallel Builds**: Use -j flag or $(MAKEFLAGS) for faster compilation on multi-core systems
8. **Include Help Target**: Provide documentation for available targets and usage
9. **Handle Installation Properly**: Support standard installation directories with DESTDIR and PREFIX
10. **Exclude Generated Files**: Keep .o files, executables, and other generated files out of version control
11. **Use Conditional Compilation**: Support debug/release builds and optional features
12. **Validate Configuration**: Check for required tools and dependencies early
13. **Document Dependencies**: Clearly document any external libraries or tools required
14. **Follow Conventions**: Use standard variable names (CC, CFLAGS, etc.) and target names
15. **Test Your Makefile**: Ensure the Makefile works from clean builds and incremental builds

## Performance Tips

1. **Parallel Compilation**: Use `make -j$(nproc)` to utilize all available CPU cores
2. **Dependency Caching**: Use ccache to cache compilation results and speed up rebuilds
3. **Incremental Builds**: Ensure dependency tracking works correctly to avoid unnecessary recompilation
4. **Smart File Organization**: Group related files and use efficient pattern rules
5. **Avoid Expensive Shell Commands**: Minimize use of $(shell) and wildcards in variable assignments
6. **Use := for Expensive Operations**: Assign variables with := to evaluate them only once
7. **Optimize Linker**: Use modern linkers like gold or lld for faster linking
8. **Build Directory**: Use separate build directories to avoid filesystem contention
9. **Memory Management**: Limit parallel jobs based on available memory with --load-average
10. **SSD Usage**: Build on SSD storage for significantly faster I/O operations
11. **Compiler Flags**: Use appropriate optimization flags for production vs. development
12. **Precompiled Headers**: Use precompiled headers for large projects with many headers
13. **Unity Builds**: Combine multiple source files for faster compilation (with caveats)
14. **Distributed Compilation**: Use distcc for distributed compilation across multiple machines
15. **Link-Time Optimization**: Use LTO for better optimization with acceptable build time increase

The `make` command is a powerful and flexible build automation tool essential for managing complex software projects. Mastering its features enables efficient compilation, dependency management, and streamlined build processes for software development of any scale, from simple single-file programs to large multi-module enterprise applications.