// https://vitepress.dev/guide/custom-theme
import {defineComponent, h, nextTick, onMounted, watch, inject} from 'vue'
import {Theme, useRoute} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import Home from "../../components/home-page/Home.vue";
import './style.css'
import './custom.css'
import './my-font.css'
import mediumZoom from "medium-zoom"
import ElementPlus, {ElCollapseTransition} from 'element-plus'
import {TopRight} from "@element-plus/icons-vue";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import CustomTable from "../../components/element-ui/CustomTable.vue";
import CustomPopover from "../../components/element-ui/CustomPopover.vue";
import CMExample from "../../components/CMExample.vue";
import CMNote from "../../components/CMNote.vue";
import { NConfigProvider } from 'naive-ui'
import { setup } from '@css-render/vue3-ssr'

const { Layout } = DefaultTheme

const CssRenderStyle = defineComponent({
    setup () {
        const collect = inject('css-render-collect')
        return {
            style: collect()
        }
    },
    render () {
        return h('css-render-style', {
            innerHTML: this.style
        })
    }
})

const VitepressPath = defineComponent({
    setup () {
        const route = useRoute()
        return () => {
            return h('vitepress-path', null, [route.path])
        }
    }
})

const NaiveUIProvider = defineComponent({
    render () {
        return h(
            NConfigProvider,
            { abstract: true, inlineThemeDisabled: true },
            {
                default: () => [
                    h(Layout, null, { default: this.$slots.default?.() }),
                    import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
                ]
            }
        )
    }
})

export default {
    extends: DefaultTheme,
    // 原版
    // Layout: () => {
    //     return h(DefaultTheme.Layout, null, {
    //         // https://vitepress.dev/guide/extending-default-theme#layout-slots
    //         // 'home-hero-after': () => h(Home),
    //     })
    // },

    // naive-ui
    Layout: NaiveUIProvider,
    enhanceApp({app, router, siteData}) {
        // ...
        app.use(ElementPlus)
        app.component('TopRight', TopRight);
        app.component('CustomTable', CustomTable)
        app.component('CustomPopover', CustomPopover)
        app.component('CMExample', CMExample)
        app.component('CMNote', CMNote)
        if (import.meta.env.SSR) {
            const { collect } = setup(app)
            app.provide('css-render-collect', collect)
        }
    },
    setup() {
        const route = useRoute();
        const initZoom = () => {
            mediumZoom('.main img', {
                background: "rgba(0,0,0,0.13)",
                container: document.body,
            });
        }
        onMounted(() => {
            initZoom();
        })
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        )
    },
} satisfies Theme
