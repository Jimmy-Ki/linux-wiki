export const SEO_CONFIG = {
  siteUrl: 'https://linux.wiki',
  siteName: 'Linux Wiki',
  author: 'Linux Wiki',
  twitterHandle: '@linuxwiki',
  defaultLocale: 'en_US',

  // Default images (create these in static/images/)
  defaultImage: '/images/tools/og-default.png',
  gameImage: '/images/tools/og-game.png',
  calculatorImage: '/images/tools/og-calculator.png',

  // Tool-specific configurations
  tools: {
    '2048': {
      title: 'Play 2048 Game Online Free | Linux Wiki',
      description: 'Play the classic 2048 puzzle game online for free! Challenge yourself with smooth animations, keyboard controls, score tracking, and undo functionality. No download required.',
      keywords: '2048 game, puzzle game, online game, sliding puzzle, number game, brain game, free game, browser game, linux game',
      type: 'game',
      image: '/images/tools/2048-og.png'
    },

    'timezone': {
      title: 'Time Zone Converter - World Clock & Time Calculator | Linux Wiki',
      description: 'Convert time between different time zones instantly. Our free time zone converter supports all major cities worldwide with real-time updates and DST adjustments.',
      keywords: 'time zone converter, world clock, time conversion, timezone calculator, UTC converter, international time, clock, time difference',
      type: 'WebApplication',
      image: '/images/tools/timezone-og.png'
    },

    'calculator': {
      title: 'Scientific Calculator Online | Advanced Math Calculator | Linux Wiki',
      description: 'Free online scientific calculator with advanced functions, trigonometry, logarithms, memory operations, and calculation history. Perfect for students and professionals.',
      keywords: 'scientific calculator, online calculator, math calculator, advanced calculator, trigonometry calculator, engineering calculator, free calculator',
      type: 'WebApplication',
      image: '/images/tools/calculator-og.png'
    },

    'markdown': {
      title: 'Markdown Editor Online | Live Preview & Syntax Highlighting | Linux Wiki',
      description: 'Professional online Markdown editor with real-time preview, syntax highlighting, export options, and toolbar. Write documentation, notes, and README files effortlessly.',
      keywords: 'markdown editor, online markdown, markdown preview, markdown writer, documentation tool, markdown live preview, markdown converter',
      type: 'WebApplication',
      image: '/images/tools/markdown-og.png'
    },

    'linux-commands': {
      title: 'Linux Commands Generator | Shell Command Builder | Linux Wiki',
      description: 'Generate and customize Linux commands for system administration, networking, development, and more. Build complex commands with our interactive generator tool.',
      keywords: 'linux commands, shell commands, command generator, linux administration, command line, bash commands, linux tools, system admin',
      type: 'WebApplication',
      image: '/images/tools/linux-commands-og.png'
    }
  }
};

export default SEO_CONFIG;