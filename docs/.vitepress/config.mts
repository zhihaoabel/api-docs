import {defineConfig} from 'vitepress'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-Hans',
    title: 'Onerway API',
    description: "Onerway面向商户开发者的接口文档",
    base: '/apis',
    cleanUrls: false,
    ignoreDeadLinks: true,

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
        html: true,
        breaks: true,
        config: (md) => {

        }
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
                    {text: 'Overview', link: 'index.html'},
                    {text: '签名', link: 'sign.html'},
                    {text: 'SDK', link: 'js-sdk.html',},
                    {text: '收银台支付', link: 'api-cashier.html'},
                ],
            },
        ],

        sidebar: [
            {
                text: '',
                items: [
                    {text: 'Overview', link: 'index.html'},
                    {text: '签名', link: 'sign.html'},
                ],
            },
            {
                text: '支付产品',
                items: [
                    {
                        text: '收银台支付',
                        items: [
                            {text: '收银台', link: 'api-cashier.html'},
                            {text: '聚合收银台', link: 'api-aggregate-cashier.html'},
                            {text: '订阅', link: 'api-cashier-sub.html'},
                        ],
                        collapsed: true,
                    },
                    {
                        text: 'SDK支付',
                        items: [
                            {text: '接入流程', link: 'sdk-flow.html'},
                            {
                                text: '下单',
                                link: 'sdk-do-transaction.html',
                                items: [
                                    {
                                        text: '绑卡支付',
                                        link: 'sdk-bind.html'
                                    },
                                    {
                                        text: '订阅支付',
                                        link: 'sdk-subscription.html'
                                    },
                                    {
                                        text: '更新订单',
                                        link: 'sdk-update-order.html'
                                    }
                                ]
                            },
                            {
                                text: 'WebSDK',
                                link: 'sdk-pay',
                                items: [
                                    {
                                        text: '绑卡支付',
                                        link: 'sdk-pay-bind.html'
                                    },
                                    {
                                        text: '订阅支付',
                                        link: 'sdk-pay-subscribe.html'
                                    },
                                    {
                                        text: 'ApplePay',
                                        link: 'sdk-pay-apple.html'
                                    },
                                    {
                                        text: 'GooglePay',
                                        link: 'sdk-pay-google.html'
                                    },
                                ]
                            },
                            {text: 'JS', link: 'js-sdk.html'},
                            {text: 'Android', link: 'android-sdk.html'},
                            {text: 'IOS', link: 'ios-sdk.html'},
                        ],
                        collapsed: true,
                    },
                    {
                        text: '两方支付',
                        items: [
                            {text: '两方支付', link: 'api-direct.html'},
                            {text: '绑卡支付', link: 'api-direct-bind-card.html'},
                            {text: 'Token支付', link: 'api-direct-token.html'},
                            {text: '订阅支付', link: 'api-direct-sub.html'},
                            // {text: '分期付款', link: '/installment'},
                            {text: '授权请款', link: 'api-direct-auth-capture.html'},
                            {text: '授权撤销', link: 'api-direct-auth-reverse.html'},
                            {text: '本地支付', link: 'api-direct-lpms.html'},
                        ],
                        collapsed: true,
                    },

                ],
            },
            {
                text: '交易查询',
                items: [
                    {text: '交易订单查询', link: 'api-order-inquiry.html'},
                    {text: '查询拒付单', link: 'api-chargeback-query.html'},
                    {text: '获取绑定Token列表', link: 'api-direct-token-list.html'},
                ],
                collapsed: true,
            },
            {
                text: '取消交易',
                items: [
                    {text: '申请取消交易', link: 'api-cancel-transaction.html'},
                    {text: '取消订阅合同', link: 'api-cancel-sub.html'},
                ],
                collapsed: true,
            },
            {
                text: '申请退款',
                items: [
                    {text: '申请退款', link: 'refund.html'},
                ],
                collapsed: true,
            },
            {
                text: '文件下载',
                items: [
                    {text: '下载结算文件', link: 'file.html'},
                ],
                collapsed: true,
            },
            {
                text: '通知',
                link: 'notify.html',
            },
            {
                text: '枚举',
                link: 'enums.html',
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
        plugins: [Components()],
    },

    lastUpdated: true,
})
