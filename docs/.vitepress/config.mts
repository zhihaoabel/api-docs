import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Onerway API',
  description: "Onerway面向商户开发者的接口文档",

  head: [
    ['link', {rel: 'icon', href: '/american-express.svg'}],
    ['link', {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''}],
    ['link', {href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet'}],
    ['meta', {name: 'theme-color', content: '#5f67ee'}],
    ['meta', {name: 'og:type', content: 'website'}],
    ['meta', {name: 'og:locale', content: 'en'}],
    ['meta', {name: 'og:site_name', content: 'VitePress'}],
  ],

  locales: {
    root: {
      lang: 'en',
      label: 'English',
    },
    zh: {
      lang: 'zh-CN',
      link: '/cn',
      label: '简体中文',
    },
  },

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: '/american-express.svg',
    siteTitle: 'Onerway',

    i18nRouting: true,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '参考',
        items: [
          {text: 'Overview', link: '/overview'},
          {text: '签名', link: '/markdown-examples'},
          {text: 'Onerway APIs', link: '/api-examples'},
        ],
      },
    ],

    sidebar: {
      '/': [
        {
          text: '',
          items: [
            {text: 'Overview', link: '/overview'},
            {text: '签名', link: '/markdown-examples'},
            {text: 'Onerway APIs', link: '/api-examples'},
          ],
        },
      ],
    },

    socialLinks: [
      {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
    ],

    returnToTopLabel: '返回顶部',

    externalLinkIcon: true,
  },

  lastUpdated: true,
})
