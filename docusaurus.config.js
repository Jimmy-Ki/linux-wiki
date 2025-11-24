// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Linux Wiki - Complete Linux Command Reference & Knowledge Base',
  tagline: 'The Ultimate Linux Knowledge Base with 600+ Commands, Tutorials & Best Practices',
  favicon: 'img/linux.png',
  url: 'https://linux.wiki',
  baseUrl: '/',

  
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Jimmy-Ki', // Usually your GitHub org/user name.
  projectName: 'linux-wiki', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Jimmy-Ki/linux-wiki/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Jimmy-Ki/linux-wiki/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/linux-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },

      // SEO metadata
      metadata: [
        {name: 'keywords', content: 'Linux, Linux commands, command reference, system administration, shell scripting, Ubuntu, CentOS, Debian, Arch Linux, Linux tutorial, sysadmin, DevOps, CLI, terminal, bash, Linux distributions'},
        {name: 'description', content: 'Comprehensive Linux knowledge base with 600+ commands, tutorials, and best practices. Complete Linux command reference with examples, syntax, and usage guides for beginners and experts.'},
        {name: 'author', content: 'Jimmy Ki'},
        {name: 'robots', content: 'index, follow'},
        {name: 'googlebot', content: 'index, follow'},
        {name: 'bingbot', content: 'index, follow'},
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'Linux Wiki'},
        {property: 'og:title', content: 'Linux Wiki - Complete Linux Command Reference'},
        {property: 'og:description', content: 'Comprehensive Linux knowledge base with 600+ commands, tutorials, and best practices'},
        {property: 'og:image', content: 'https://linux.wiki/img/linux-social-card.jpg'},
        {property: 'og:url', content: 'https://linux.wiki'},
        {property: 'og:locale', content: 'en_US'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:title', content: 'Linux Wiki - Complete Linux Command Reference'},
        {name: 'twitter:description', content: 'Comprehensive Linux knowledge base with 600+ commands, tutorials, and best practices'},
        {name: 'twitter:image', content: 'https://linux.wiki/img/linux-social-card.jpg'},
        {name: 'twitter:creator', content: '@LinuxWiki'},
        {name: 'twitter:site', content: '@LinuxWiki'},
        {property: 'article:author', content: 'Jimmy Ki'},
        {property: 'article:section', content: 'Technology'},
        {property: 'article:tag', content: 'Linux'},
        {name: 'application-name', content: 'Linux Wiki'},
        {name: 'msapplication-TileColor', content: '#336791'},
        {name: 'theme-color', content: '#336791'},
        {name: 'manifest', content: '/manifest.json'},
        {name: 'google-adsense-account', content: 'ca-pub-1920044696501149'},
      ],
      navbar: {
        title: 'Linux Wiki',
        logo: {
          alt: 'Linux Wiki Logo',
          src: 'img/linux.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'commandsSidebar',
            position: 'left',
            label: 'Commands',
          },
          {
            type: 'docSidebar',
            sidebarId: 'distrosSidebar',
            position: 'left',
            label: 'Distributions',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialsSidebar',
            position: 'left',
            label: 'Tutorials',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/credits', label: 'Credits', position: 'right'},
          {
            href: 'https://github.com/Jimmy-Ki',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Linux Resources',
            items: [
              {
                label: 'Commands',
                to: '/docs/commands',
              },
              {
                label: 'Distributions',
                to: '/docs/distros',
              },
              {
                label: 'Tutorials',
                to: '/docs/tutorials',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Linux.org',
                href: 'https://www.linux.org/',
              },
              {
                label: 'Linux Foundation',
                href: 'https://www.linuxfoundation.org/',
              },
              {
                label: 'Reddit Linux',
                href: 'https://reddit.com/r/linux',
              },
              {
                label: 'CorleoM',
                href: 'https://corleom.com',
              },
            ],
          },
          {
            title: 'Sponsors',
            items: [
              {
                label: 'DigitalOcean',
                href: 'https://www.digitalocean.com/?refcode=9b80bafe43ef&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge',
                html: '<a href="https://www.digitalocean.com/?refcode=9b80bafe43ef&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" target="_blank" rel="noopener"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" style="height: 32px;" /></a>',
              },
              {
                label: 'Vultr',
                href: 'https://www.vultr.com/?ref=9832100-9J',
                html: '<a href="https://www.vultr.com/?ref=9832100-9J" target="_blank" rel="noopener"><img src="https://www.vultr.com/media/logo_onwhite.png" alt="Vultr" style="height: 32px;" /></a>',
              },
              {
                label: 'Setapp',
                href: 'https://go.setapp.com/invite/ajcaw4fb',
                html: '<a href="https://go.setapp.com/invite/ajcaw4fb" target="_blank" rel="noopener"><img src="https://cdn.setapp.com/master-7c09a14f402a20c2d99463402edf4b37320cf342-983/static/main/images/components/logo/setapp-icon.svg" alt="Setapp" style="height: 32px;" /></a>',
              },
              {
                label: 'Cloudflare',
                href: 'https://www.cloudflare.com/',
                html: '<a href="https://www.cloudflare.com/" target="_blank" rel="noopener"><img src="https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg" alt="Cloudflare" style="height: 32px;" /></a>',
              },
            ],
          },
          {
            title: 'Contribute',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Jimmy-Ki',
              },
              {
                label: 'Report Issues',
                href: 'https://github.com/Jimmy-Ki/linux-wiki/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Linux Wiki. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
