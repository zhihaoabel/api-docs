import {defineConfig} from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-Hans',
    title: 'Onerway API',
    description: "Onerway面向商户开发者的接口文档",
    base: '/apis',
    cleanUrls: true,

    head: [
        ['link', {rel: 'icon', href: '/apis/favicon.ico'}],
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
        logo: '/onerway.png',
        siteTitle: '',

        i18nRouting: true,

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: '参考',
                items: [
                    {text: 'Overview', link: '/index'},
                    {text: '签名', link: '/sign'},
                    {text: 'SDK', link: '/js-sdk',},
                    {text: '收银台支付', link: '/public/api-Cashier'},
                ],
            },
        ],

        sidebar: [
            {
                text: '',
                items: [
                    {text: '概述', link: '/index'},
                    {text: '签名', link: '/sign'},
                ],
            },
            {
                text: '支付产品',
                items: [
                    {
                        text: '收银台支付',
                        items: [
                            {text: '收银台', link: '/api-cashier'},
                            {text: '聚合收银台', link: '/api-aggregate-cashier'},
                            {text: '订阅', link: '/api-cashier-sub'},
                        ],
                        collapsed: true,
                    },
                    {
                        text: 'SDK支付',
                        items: [
                            {text: 'JS', link: '/js-sdk'},
                            {text: 'Android', link: '/android-sdk'},
                            {text: 'IOS', link: '/ios-sdk'},
                        ],
                        collapsed: true,
                    },
                    {
                        text: '两方支付',
                        items: [
                            {text: '分期', link: '/installment'},
                            {text: '两方支付', link: '/api-direct'},
                            {text: 'Token绑卡', link: '/api-direct-token'},
                            {text: '获取绑定Token列表', link: '/api-direct-token-list'},
                            {text: '订阅', link: '/api-direct-sub'},
                            {text: '预授权请款/撤销', link: '/api-direct-auth'},
                            {text: '本地支付', link: '/api-direct-lpms'},
                        ],
                        collapsed: true,
                    },

                ],
            },
            {
                text: '交易查询',
                items: [
                    {text: '交易订单查询', link: '/api-order-inquiry'},
                    {text: '查询拒付单', link: '/api-chargeback-query'},
                ],
                collapsed: true,
            },
            {
                text: '取消交易',
                items: [
                    {text: '申请取消交易', link: '/api-cancel-transaction'},
                    {text: '取消订阅合同', link: '/api-cancel-sub'},
                ],
                collapsed: true,
            },
            {
                text: '申请退款',
                items: [
                    {text: '申请退款', link: '/refund'},
                ],
                collapsed: true,
            },
            {
                text: '文件下载',
                items: [
                    {text: '下载结算文件', link: '/file'},
                ],
                collapsed: true,
            },
            {
                text: '通知',
                link: '/notify',
            },
            {
                text: '枚举',
                link: '/enums',
            },
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ],

        search: {
            provider: 'local',
        },

        returnToTopLabel: '返回顶部',

        externalLinkIcon: true,
    },

    vite: {
        plugins: [AutoImport(), Components()],
    },

    lastUpdated: true,
})
