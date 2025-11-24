---
title: pip - Python Package Installer
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pip - Python Package Installer

The `pip` command is the standard package manager for Python programming language. It allows users to install and manage software packages written in Python from the Python Package Index (PyPI) and other package indexes. Pip provides essential functionality for Python development, including package installation, upgrades, removal, and dependency management.

## Basic Syntax

```bash
pip <command> [options] [package_name]
```

## Common Options

### General Options
- `-h, --help` - Show help
- `--version` - Show pip version
- `-v, --verbose` - Increase verbosity
- `-q, --quiet` - Decrease verbosity
- `--log <path>` - Path to a verbose appending log
- `--proxy <proxy>` - Specify proxy in form [user:passwd@]proxy.server:port
- `--retries <retries>` - Maximum number of retries each connection should attempt
- `--timeout <sec>` - Set the socket timeout
- `--exists-action <action>` - Default action when a path already exists

### Package Options
- `--require-virtualenv` - Allow pip only in a virtual environment
- `--isolated` - Run pip in isolated mode
- `--python <python>` - Use specified Python interpreter
- `--no-input` - Disable input prompt

### SSL and Trust Options
- `--cert <path>` - Path to PEM-encoded CA certificate bundle
- `--client-cert <path>` - Path to SSL client certificate
- `--trusted-host <hostname>` - Mark host as trusted, even with invalid certificate
- `--no-cache-dir` - Disable cache

## Usage Examples

### Package Installation

```bash
# Install a package
pip install package_name

# Install specific version
pip install package_name==1.2.3

# Install minimum version
pip install "package_name>=1.0"

# Install version range
pip install "package_name>=1.0,<2.0"

# Install latest compatible version
pip install "package_name~=1.2"

# Install from requirements file
pip install -r requirements.txt

# Install from URL
pip install https://github.com/user/repo/archive/master.zip

# Install from local directory
pip install /path/to/package

# Install in development mode
pip install -e .

# Install with dependencies only
pip install --only-binary :all: package_name

# Install without dependencies
pip install --no-deps package_name

# Install without prompts
pip install -y package_name

# Install from VCS (Git, Mercurial, Subversion)
pip install git+https://github.com/user/repo.git
pip install hg+https://hg.example.com/repo
pip install svn+https://svn.example.com/repo
```

### Package Management

```bash
# Upgrade a package
pip install --upgrade package_name
pip install -U package_name

# Upgrade to specific version
pip install --upgrade package_name==1.5.0

# Force reinstall package
pip install --force-reinstall package_name

# Uninstall a package
pip uninstall package_name

# Uninstall without confirmation
pip uninstall -y package_name

# Uninstall multiple packages
pip uninstall package1 package2 package3

# Check for package updates
pip list --outdated

# Upgrade all packages
pip list --outdated --format=freeze | cut -d= -f1 | xargs -n1 pip install -U

# Install dependencies only
pip install --only-deps package_name
```

### Package Information and Search

```bash
# Show package information
pip show package_name

# Show package files
pip show -f package_name

# List installed packages
pip list

# List installed packages with versions
pip list --format=freeze

# List outdated packages
pip list --outdated

# List upgradable packages
pip list --uptodate

# Search for packages
pip search search_term

# Check package compatibility
pip check

# Show package dependencies
pip show package_name | grep "Requires"

# Verify package installation
pip show package_name | grep "Location"
```

### Requirements File Management

```bash
# Create requirements file
pip freeze > requirements.txt

# Install from requirements file
pip install -r requirements.txt

# Create requirements without versions
pip freeze --exclude-editable | cut -d= -f1 > requirements.txt

# Create requirements with comments
pip freeze --requirement requirements.txt

# Check requirements file
pip check -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt

# Install from requirements with constraints
pip install -r requirements.txt -c constraints.txt

# Generate requirements for specific package
pip freeze --requirement package_name > package_requirements.txt
```

### Virtual Environment Operations

```bash
# Create virtual environment
python -m venv myenv

# Activate virtual environment (Linux/macOS)
source myenv/bin/activate

# Activate virtual environment (Windows)
myenv\Scripts\activate

# Deactivate virtual environment
deactivate

# Install packages in virtual environment
pip install package_name

# Create requirements from virtual environment
pip freeze > requirements.txt

# Install in virtual environment with specific Python
python3.9 -m venv myenv
source myenv/bin/activate
pip install package_name
```

### Configuration Options

```bash
# Configure pip with custom index URL
pip config set global.index-url https://pypi.org/simple

# Configure multiple index URLs
pip config set global.extra-index-url https://example.com/simple

# Configure proxy
pip config set global.proxy http://user:password@proxy.server:port

# Configure timeout
pip config set global.timeout 60

# Configure cache directory
pip config set global.cache-dir /path/to/cache

# Configure to use only trusted hosts
pip config set global.trusted-host pypi.org

# Show current configuration
pip config list

# Show configuration values
pip config get global.index-url

# Edit configuration file
pip config edit
```

## Practical Examples

### Project Setup and Development

```bash
# Create new Python project
mkdir myproject
cd myproject
python -m venv venv
source venv/bin/activate

# Install development tools
pip install --upgrade pip setuptools wheel
pip install pytest black flake8 mypy

# Install project in development mode
pip install -e .

# Create requirements files
pip freeze > requirements.txt
pip freeze > requirements-dev.txt

# Install production dependencies
pip install -r requirements.txt
```

### Dependency Management

```bash
# Install specific version with dependencies
pip install "django>=3.0,<4.0"

# Install with optional dependencies
pip install "package[extra1,extra2]"

# Install from URL with specific version
pip install git+https://github.com/user/repo.git@v1.0#egg=package

# Install from local tarball
pip install /path/to/package.tar.gz

# Install from wheel file
pip install package.whl

# Install with constraints file
pip install -r requirements.txt -c constraints.txt

# Check dependency conflicts
pip check
```

### Package Maintenance

```bash
# Upgrade pip itself
pip install --upgrade pip

# Clean pip cache
pip cache purge

# Show cache information
pip cache info

# List cached files
pip cache list

# Remove specific cached package
pip cache remove package_name

# Upgrade all outdated packages
for package in $(pip list --outdated --format=freeze | cut -d= -f1); do
    pip install --upgrade "$package"
done

# Check for security vulnerabilities
pip install safety
safety check
```

### Advanced Installation Scenarios

```bash
# Install from Git with specific branch
pip install git+https://github.com/user/repo.git@branch#egg=package

# Install from Git with subdirectory
pip install git+https://github.com/user/repo.git@subdirectory=folder#egg=package

# Install from private repository
pip install git+https://username:password@github.com/user/repo.git

# Install from Mercurial
pip install hg+https://hg.example.com/repo#egg=package

# Install from Subversion
pip install svn+https://svn.example.com/repo#egg=package

# Install with build requirements
pip install --build /tmp/build package_name

# Install with custom compiler flags
pip install --global-option build_ext --global-option --debug package_name
```

### Docker and Container Usage

```bash
# Dockerfile example
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install requirements
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .
CMD ["python", "app.py"]
```

### CI/CD Integration

```bash
# GitHub Actions example
name: Python Package

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.8, 3.9, "3.10"]

    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: ${{ matrix.python-version }}
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest
    - name: Test
      run: |
        pytest
```

### Package Verification and Security

```bash
# Verify package installation
pip show package_name

# Check package integrity
pip install --require-hashes -r requirements.txt

# Install from verified source
pip install --trusted-host pypi.org --trusted-host pypi.python.org package_name

# Check for known vulnerabilities
pip install pip-audit
pip-audit

# Generate hash values for requirements
pip hash package_name.whl
pip hash package_name.tar.gz

# Install with hash verification
pip install --require-hashes -r requirements.txt
```

### Performance Optimization

```bash
# Use parallel downloads (pip 20.3+)
pip install --use-deprecated=legacy-resolver package_name

# Use faster index mirror
pip install -i https://pypi.doubanio.com/simple/ package_name

# Disable cache for CI environments
pip install --no-cache-dir package_name

# Use precompiled wheels only
pip install --only-binary :all: package_name

# Compile wheels for faster installation
pip wheel --wheel-dir=/tmp/wheels -r requirements.txt
pip install --no-index --find-links=/tmp/wheels -r requirements.txt
```

## Related Commands

- `python -m venv` - Create virtual environments
- `python -m pip` - Alternative way to run pip
- `pip-tools` - Tools for maintaining requirements files
- `pip-compile` - Compile requirements files
- `pip-sync` - Sync installed packages with requirements
- `pipdeptree` - Show dependency tree
- `safety` - Check for security vulnerabilities
- `bandit` - Find security issues in Python code
- `black` - Code formatter
- `flake8` - Code linter
- `mypy` - Static type checker

## Best Practices

### Virtual Environments
1. Always use virtual environments for Python projects
2. Create separate environments for different projects
3. Use consistent Python versions across development and production
4. Include virtual environment activation in project documentation
5. Keep requirements files up to date

### Dependency Management
1. Pin exact versions for production deployments
2. Use version ranges for development dependencies
3. Regularly update dependencies for security patches
4. Use requirements files for reproducible builds
5. Separate development and production dependencies

### Security Considerations
1. Use `pip install --require-hashes` for security-critical applications
2. Regularly check for security vulnerabilities with tools like `safety`
3. Only install packages from trusted sources
4. Verify package signatures when available
5. Keep pip and setuptools updated

### Performance Optimization
1. Use precompiled wheels when available
2. Configure appropriate index mirrors for faster downloads
3. Use pip cache effectively for development environments
4. Disable cache in CI/CD pipelines
5. Consider using `pip-tools` for better dependency management

### Project Structure
1. Include `requirements.txt` and `requirements-dev.txt` in version control
2. Add `.venv` and `__pycache__` to `.gitignore`
3. Document environment setup in README files
4. Use consistent naming conventions for virtual environments
5. Include Python version information in project metadata

The `pip` package manager provides essential functionality for Python development, enabling efficient package management, dependency resolution, and project isolation through virtual environments. Proper usage of pip and related tools ensures reproducible, secure, and maintainable Python projects.