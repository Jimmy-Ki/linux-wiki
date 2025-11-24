# Linux Wiki 🐧

[![Deploy with Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Jimmy-Ki/linux-wiki)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> The Ultimate Linux Knowledge Base with 600+ Commands, Tutorials & Best Practices

## ✨ Features

### 📚 Comprehensive Content
- **600+ Linux Commands** - Detailed documentation with real-world examples
- **Step-by-Step Tutorials** - From beginner basics to advanced system administration
- **Distribution Guides** - Coverage of Ubuntu, CentOS, Debian, Arch Linux, and more
- **Best Practices** - Industry-standard recommendations and security guidelines

### 🔍 Smart Search System
- **Title-Priority Ranking** - Search results prioritize command names
- **Content-Based Matching** - Find commands by description and usage
- **Real-Time Suggestions** - Instant dropdown with live search results
- **Unified Search Logic** - Consistent experience across navbar and homepage

### 🎨 Modern UI/UX
- **Glass Morphism Design** - Beautiful Gaussian blur effects with transparency
- **Dark/Light Mode** - Automatic theme switching with system preferences
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Accessible Interface** - WCAG compliant with keyboard navigation support

### ⚡ Performance & SEO
- **Blazing Fast** - Built with Docusaurus for optimal performance
- **SEO Optimized** - Comprehensive metadata, sitemaps, and social media tags
- **Progressive Web App** - Install as a native app on supported devices
- **Analytics Ready** - Google AdSense integration for monetization

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jimmy-Ki/linux-wiki.git
   cd linux-wiki
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm build
```

The built files will be in the `build` directory.

## 📁 Project Structure

```
linux-wiki/
├── docs/                    # Documentation content
│   ├── commands/           # Linux command references (600+ files)
│   ├── distros/           # Linux distribution guides
│   └── tutorials/         # Step-by-step tutorials
├── src/                    # Source code
│   ├── components/        # React components
│   │   ├── AdSenseAd.js   # Google AdSense integration
│   │   ├── CommandSearch.jsx # Search functionality
│   │   └── HomepageFeatures.jsx # Homepage features
│   ├── css/              # Custom styling
│   ├── pages/            # Custom pages
│   └── theme/            # Docusaurus theme customization
├── static/               # Static assets (images, ads.txt, etc.)
├── blog/                 # Blog posts and announcements
└── docusaurus.config.js  # Main configuration file
```

## 🛠️ Technology Stack

- **Framework**: [Docusaurus v4](https://docusaurus.io/) - Modern documentation framework
- **Frontend**: React 18 with JavaScript/JSX
- **Styling**: CSS Modules with custom glass morphism effects
- **Build Tools**: Webpack, Babel, and modern JavaScript tooling
- **Deployment**: Cloudflare Pages (one-click deployment)
- **Analytics**: Google AdSense integration

## 🤝 Contributing

We welcome contributions of all kinds! Here's how you can help:

### 🐛 Report Issues
Found a bug or error? Please [open an issue](https://github.com/Jimmy-Ki/linux-wiki/issues).

### 📝 Improve Documentation
- Fix typos or grammatical errors
- Add missing command documentation
- Improve existing examples
- Update outdated information

### 🌍 Translate
Help make Linux Wiki accessible in other languages by contributing translations.

### 💡 Add Features
Suggest new features or implement improvements to the user experience.

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm test
   npm start
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## 📊 Content Organization

### Command Categories
Commands are organized into logical categories:
- **File Management** - `ls`, `cp`, `mv`, `rm`, `find`
- **Text Processing** - `grep`, `sed`, `awk`, `sort`
- **System Information** - `uname`, `top`, `ps`, `df`
- **Network Tools** - `curl`, `wget`, `ping`, `netstat`
- **User Management** - `useradd`, `sudo`, `chmod`
- **Package Management** - `apt`, `yum`, `dnf`, `pacman`
- **Development Tools** - `git`, `gcc`, `make`, `docker`

### Tutorial Topics
- Linux basics and filesystem navigation
- Shell scripting and automation
- System administration and security
- Network configuration and troubleshooting
- Development environment setup
- Performance monitoring and optimization

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. Click the "Deploy with Cloudflare Pages" button above
2. Connect your GitHub account
3. Select the `linux-wiki` repository
4. Configure build settings:
   - **Build command**: `npm build`
   - **Build output directory**: `build`
   - **Node.js version**: `20`

### Other Platforms

The site can be deployed to any static hosting platform:
- **Vercel**: `npm build` → Deploy `build/` directory
- **Netlify**: `npm build` → Deploy `build/` directory
- **GitHub Pages**: `npm build` → Deploy `build/` directory
- **AWS S3 + CloudFront**: `npm build` → Upload `build/` to S3

## 📈 SEO & Analytics

### Search Engine Optimization
- Comprehensive meta tags and Open Graph data
- XML sitemaps for all content
- Structured data for rich snippets
- Mobile-friendly responsive design
- Fast loading performance

### Google AdSense Integration
The site includes Google AdSense integration:
- Publisher ID: `ca-pub-1920044696501149`
- Automatic ad placement in development placeholders
- Production-only ad loading
- Responsive ad formats

### Webmaster Tools
- `robots.txt` for search engine crawling
- `ads.txt` for ad network verification
- `sitemap.xml` for content indexing
- `manifest.json` for PWA capabilities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Credits
- **Command Reference Foundation**: Based on [linux-command](https://github.com/jaywcjlove/linux-command) by jaywcjlove
- **Framework**: Built with [Docusaurus](https://docusaurus.io/) by Meta
- **Icons**: Custom Linux-themed icons and graphics

## 🙏 Acknowledgments

- The open-source community for making Linux knowledge accessible
- Contributors who help improve documentation and fix issues
- The [Linux Foundation](https://www.linuxfoundation.org/) for supporting Linux development
- All Linux distribution maintainers and developers

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Jimmy-Ki/linux-wiki/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Jimmy-Ki/linux-wiki/discussions)
- **Email**: manager_jmq@qq.com

---

<div align="center">
  <p>Made with ❤️ by the Linux community</p>
  <p>
    <a href="#top">Back to top</a>
  </p>
</div>