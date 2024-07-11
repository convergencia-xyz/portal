import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Configuration } from 'webpack';


//https://stackoverflow.com/questions/60783595/is-there-a-way-to-have-two-docs-in-docusaurus-2

const config: Config = {
  title: 'CONVERGENCIA.XYZ',
  tagline: 'Banco de conhecimento da comunidade do Centro de Informática da UFPB',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://convergencia.xyz/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'convergencia-xyz', // Usually your GitHub org/user name.
  projectName: 'portal', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/convergencia-xyz/portal',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/convergencia-xyz/portal',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [



    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guias',
        path: 'content/guias',
        routeBasePath: 'guias',
        sidebarPath: 'sidebars.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'comunidade',
        path: 'content/comunidade',
        routeBasePath: 'comunidade',
        sidebarPath: 'sidebars.ts',
      },
    ]
  ],
  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'CONVERGENCIA.XYZ',
      items: [
        /*        
                {
                  type: 'docSidebar',
                  sidebarId: 'tutorialSidebar',
                  position: 'left',
                  label: 'Tutorial',
                },
                {to: '/blog', label: 'Blog', position: 'left'},
        */
        {
          to: '/guias/',    // ./docs/Intro.md
          label: 'Guias',
          position: 'left',
          activeBaseRegex: `/guias/`,
        },
        {
          to: '/comunidade/',    // ./docs/Intro.md
          label: 'Comunidade',
          position: 'left',
          activeBaseRegex: `/comunidade/`,
        },
        {
          href: 'https://github.com/convergencia-xyz/portal',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projetos',
          items: [
            { label: 'Code Sandbox', to: '/' },
            { label: 'Fluxograma', to: '/' },
            { label: 'Mobilidade Urbana', to: '/' },
          ],
        },
        {
          title: 'Contato',
          items: [
            {
              label: 'CONVERGENCIA.XYZ',
              href: '/',
            },
            {
              label: 'Centro de Informática - UFPB',
              href: '/',
            },
            {
              label: 'UFPB',
              href: '/',
            },

          ],
        },
        {
          title: 'Mais',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/convergencia-xyz/portal',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <b>CONVERGENCIA.XYZ</b>. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
