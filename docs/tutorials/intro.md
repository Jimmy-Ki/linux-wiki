# Linux Wiki - Contribution Guide & Usage Instructions

Welcome to Linux Wiki! This is an open-source Linux command reference and learning platform, designed to provide comprehensive and accurate Linux command and concept documentation for users of all skill levels.

## 📖 About This Wiki

Our mission is to create the most comprehensive and user-friendly Linux learning resource:

- **🔍 Smart Search**: Search by command names and descriptions with intelligent ranking that shows the most relevant results first
- **📚 Comprehensive Coverage**: Cover commands for file management, text processing, system information, process management, networking, and more
- **🎯 Practical Focus**: Each command includes real usage examples and best practices
- **🌐 English & Chinese Support**: Clear and accessible documentation in multiple languages

## 🚀 Quick Start

### For Learners

1. **Use Search Function**: Enter command names or function descriptions in the search box on the homepage or navbar
2. **Browse Command Categories**: Systematically learn by browsing related commands by category
3. **View Practical Examples**: Each command page contains practical usage cases
4. **Learn Best Practices**: Understand correct usage methods and important considerations

### For Contributors

We welcome all forms of contributions! Whether you're fixing spelling errors, adding new commands, or improving existing content, every contribution is valuable.

## 🤝 How to Contribute

### Contribution Methods

#### 1. Add New Commands

To add new commands, follow these steps:

```bash
# 1. Fork this repository
git clone https://github.com/jimmy-ki/linux-wiki.git

# 2. Create a new markdown file in the appropriate category directory
cd docs/commands/category-name/
touch new-command.md
```

Command documentation should follow this structure:
```markdown
---
title: Command Name
description: Brief description
category: Category Name
tags: [relevant tags]
---

# Command Name

## Syntax
```bash
command syntax
```

## Parameters
- param1: Description
- param2: Description

## Usage Examples
### Example 1: Basic Usage
```bash
actual command example
```

### Example 2: Advanced Usage
```bash
advanced command example
```

## Notes
- Important considerations when using the command
- Best practice recommendations
```

#### 2. Improve Existing Content

- **Fix Errors**: Found incorrect information? Please submit corrections
- **Add Examples**: Add more practical examples to commands
- **Update Information**: Ensure information is consistent with latest versions
- **Improve Clarity**: Make explanations clearer and more understandable

#### 3. Report Issues

When you find problems, please submit an issue on GitHub:
- 📝 **Content Errors**: Inaccurate command descriptions
- 🔗 **Broken Links**: Page links that don't work
- 💻 **Technical Issues**: Website functionality problems
- 🎨 **UI Improvements**: User experience optimization suggestions

### Contribution Guidelines

#### Content Standards

1. **Accuracy First**: Ensure all technical information is accurate and reliable
2. **Practical Focus**: Emphasize information needed for real-world applications
3. **Clear Language**: Use standard technical terminology and clear explanations
4. **Consistent Format**: Follow established documentation format and structure

#### Commit Standards

Commit messages should clearly describe changes:
- `feat: Add grep command documentation`
- `fix: Correct ls command parameter description`
- `docs: Update SSH connection examples`
- `style: Standardize command example format`

#### Review Process

1. **Fork Repository**: Create your own copy
2. **Create Branch**: `git checkout -b feature/your-feature`
3. **Commit Changes**: `git commit -m 'Describe your changes'`
4. **Push Branch**: `git push origin feature/your-feature`
5. **Create Pull Request**: Submit merge request

## 📋 Areas Needing Help

### Priority Contribution Areas

- **🔥 Basic Commands**: Detailed documentation for `cd`, `ls`, `mkdir`, `rm`, etc.
- **📝 Text Processing**: Advanced usage of `sed`, `awk`, `grep`, etc.
- **🌐 Network Tools**: Configuration and usage of `curl`, `wget`, `ssh`, etc.
- **⚡ System Monitoring**: Usage guides for `top`, `htop`, `iostat`, etc.
- **🔧 System Administration**: Tools like `systemd`, `cron`, `logrotate`, etc.

### Quality Improvements

- **Example Validation**: Test and verify all command examples for correctness
- **Format Standardization**: Ensure all pages follow unified formatting standards
- **Cross-references**: Add mutual reference links between related commands
- **Performance Optimization**: Improve search and page loading performance

## 🏆 Contributor Recognition

We value every contributor's effort:

- **Contributor List**: All contributors will be listed on the project homepage
- **Commit History**: Your contributions will be permanently preserved in Git history
- **Community Impact**: Your work will help thousands of Linux learners
- **Skill Enhancement**: Improve your Linux skills and collaboration abilities through contributions

## 📞 Contact Us

Have questions or suggestions? Contact us through:

- **GitHub Issues**: Submit technical issues and feature suggestions
- **Pull Requests**: Contribute code and documentation directly
- **Community Discussions**: Participate in project-related technical discussions

## 🙏 Acknowledgments

Thanks to all developers and users who contribute to the Linux open-source community. It is your efforts that have made Linux the powerful and elegant operating system it is today.

---

**Start Contributing**: Choose an area that interests you, or start by fixing a small error. Every contribution helps build better Linux learning resources!

*Remember: In the open-source world, every contribution has value. Regardless of size, your participation is making the Linux community better.*