import {defineConfig} from 'vitepress'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-Hans',
    title: 'Onerway API',
    description: "Onerway面向商户开发者的接口文档",
    base: '/apis/',
    cleanUrls: false,
    ignoreDeadLinks: true,
    metaChunk: true,

    head: [
        ['link', {rel: 'icon', href: '/apis/favicon.ico'}],
        ['link', {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''}],
        ['link', {href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet'}],
        ['meta', {name: 'og:type', content: 'website'}],
        ['meta', {name: 'og:locale', content: 'zh-CN'}],
    ],

    locales: {
        root: {
            lang: 'zh-Hans',
            label: '简体中文',
        },
    },

    markdown: {
        lineNumbers: true,
        config: (md) => {

        },
        theme: {
            light: 'one-light',
            dark: 'dark-plus',
        }
    },

    themeConfig: {
        logo: '/onerway.png',
        siteTitle: '',

        // https://vitepress.dev/reference/default-theme-config


        sidebar: [
            {
                text: '',
                items: [
                    {text: 'Overview', link: '/index'},
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
                            {text: '订阅支付', link: '/api-cashier-sub'},
                            {text: '授权支付', link: '/api-cashier-auth'},
                        ],
                        collapsed: true,
                    },
                    {
                        text: 'SDK支付',
                        items: [
                            {text: '接入流程', link: '/sdk-flow'},
                            {
                                text: '下单',
                                link: '/sdk-do-transaction',
                                items: [
                                    {
                                        text: '绑卡下单',
                                        link: '/sdk-bind'
                                    },
                                    {
                                        text: '订阅下单',
                                        link: '/sdk-subscription'
                                    },
                                    {
                                        text: '预授权下单',
                                        link: '/sdk-auth'
                                    },
                                    {
                                        text: '更新订单',
                                        link: '/sdk-update-order'
                                    }
                                ]
                            },
                            {
                                text: 'WebSDK',
                                link: '/sdk-pay',
                                items: [
                                    {
                                        text: '绑卡支付',
                                        link: '/sdk-pay-bind'
                                    },
                                    {
                                        text: '订阅支付',
                                        link: '/sdk-pay-subscribe'
                                    },
                                    {
                                        text: '预授权扣款',
                                        link: '/sdk-pay-auth'
                                    },
                                    {
                                        text: 'ApplePay',
                                        link: '/sdk-pay-apple'
                                    },
                                    {
                                        text: 'GooglePay',
                                        link: '/sdk-pay-google'
                                    },
                                ]
                            },
                            // {text: 'JS', link: '/js-sdk'},
                            {
                                text: 'Android', link: '/android-sdk', items: [
                                    {
                                        text: 'GooglePay',
                                        link: '/android-google-pay'
                                    }
                                ]
                            },
                            {text: 'IOS', link: '/ios-sdk'},
                        ],
                        collapsed: true,
                    },
                    {
                        text: '两方支付',
                        items: [
                            {text: '两方支付', link: '/api-direct'},
                            {text: '绑卡支付', link: '/api-direct-bind-card'},
                            {text: 'Token支付', link: '/api-direct-token'},
                            {text: '订阅支付', link: '/api-direct-sub'},
                            // {text: '分期付款', link: '/installment'},
                            {text: '授权支付', link: '/api-direct-auth'},
                            {text: '授权请款', link: '/api-direct-auth-capture'},
                            {text: '授权撤销', link: '/api-direct-auth-reverse'},
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
                    {text: '获取绑定Token列表', link: '/api-direct-token-list'},
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

        search: {
            provider: 'local',
        },

        externalLinkIcon: true,
    },

    vite: {
        plugins: [Components()],
        ssr: {
            noExternal: ['naive-ui', 'date-fns', 'vueuc']
        }
    },

    postRender(context) {
        const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
        const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
        const style = styleRegex.exec(context.content)?.[1]
        const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
        if (vitepressPath && style) {
            fileAndStyles[vitepressPath] = style
        }
        context.content = context.content.replace(styleRegex, '')
        context.content = context.content.replace(vitepressPathRegex, '')
    },

    transformHtml(code, id) {
        const html = id.split('/').pop()
        if (!html) return
        const style = fileAndStyles[`/${html}`]
        if (style) {
            return code.replace(/<\/head>/, style + '</head>')
        }
    },

    lastUpdated: true,
})
