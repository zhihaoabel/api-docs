import {defineConfig} from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-Hans',
    title: 'Onerway API',
    description: "Onerway面向商户开发者的接口文档",

    head: [
        ['link', {rel: 'icon', href: '/american-express.svg'}],
        ['link', {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''}],
        ['link', {href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet'}],
        ['meta', {name: 'theme-color', content: '#5f67ee'}],
        ['meta', {name: 'og:type', content: 'website'}],
        ['meta', {name: 'og:locale', content: 'zh-CN'}],
        ['meta', {name: 'og:site_name', content: 'VitePress'}],
    ],

    locales: {
        root: {
            lang: 'zh-Hans',
            label: '简体中文',
        },
        en: {
            lang: 'en',
            label: 'English',
            link: '/en'
        },
    },

    markdown: {
        lineNumbers: true,
    },

    themeConfig: {
        logo: '/american-express.svg',
        siteTitle: 'Onerway',

        // i18nRouting: true,

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: '参考',
                items: [
                    {text: 'Overview', link: '/overview'},
                    {text: '签名', link: '/sign'},
                    {text: 'Onerway APIs', link: '/api-examples'},
                    {text: 'SDK', link: '/js-sdk',},
                    {text: '收银台支付', link: '/public/api-Cashier'},
                ],
            },
        ],

        sidebar: {
            '/': [
                {
                    text: '',
                    items: [
                        {text: 'Overview', link: '/overview'},
                        {text: '签名', link: '/sign'},
                        {text: 'Onerway APIs', link: '/api-examples'},
                        {
                            text: 'SDK',
                            items: [
                                {text: 'JS', link: '/js-sdk'},
                                {text: 'Android', link: '/android-sdk'},
                                {text: 'IOS', link: '/ios-sdk'},
                            ],
                        },
                        {text: '收银台支付',  items: [
                          {text: '收银台', link: '/public/api-Cashier'},
                          {text: '本地支付', link: '/public/api-Cashier-Lpms'},
                          {text: '聚合收银台', link: '/public/api-Cashier-All'},
                          {text: '订阅', link: '/public/api-Cashier-sub'},
                        ],
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

    vite: {
        plugins: [AutoImport(), Components()],
    },

    lastUpdated: true,
})
