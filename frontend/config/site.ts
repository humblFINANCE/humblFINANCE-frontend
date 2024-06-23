export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'humblFINANCE',
  description: 'a new way for newbies to step into the world of finance',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Features',
      href: '/features',
    },
    {
      label: 'About Us',
      href: '/about-us',
    },
    {
      label: 'Investing Framework',
      href: '/investing-framework',
    },
    {
      label: 'Pricing',
      href: '/pricing',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/fractalFInance_',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}
