require("dotenv").config();
import { sortRoutes } from '@nuxt/utils';
import { join } from 'path';

export default {
    server: {
        port: 8083,
        host: "0.0.0.0"
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "Речные круизы из Москвы по Волге и Оке на теплоходе",
        htmlAttrs: {
            lang: "ru",
        },
        // https://vue-meta.nuxtjs.org/api/#metainfo-properties
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "wmail-verification", content: "070bb2fd2b2ad1d91dc8a1b6777d5711" },
            { name: "google-site-verification", content: "HLmm3T0qVXZrUfJfduCmyHx2mCreqM2JAhRqgP11054" },
            { name: "msapplication-TileColor", content: "#ffffff" },
            {
                hid: "msapplication-TileImage",
                name: "msapplication-TileImage",
                content: "/ms-icon-144x144.png",
            },
            { name: "theme-color", content: "#ffffff" },
            { hid: "og:type", property: "og:type", content: "website" },
            { hid: "og:locale", property: "og:locale", content: "ru_RU" },
            { hid: "twitter:card", name: "twitter:card", content: "summary" },
        ],
        link: [
            { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
            { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
            { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
            { rel: "manifest", href: "/site.webmanifest" },
            { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
            { rel: "msapplication-TileColor", content: "#da532c" },
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "~/components/reworked/vue-select/src/scss/vue-select.scss",
        "swiper/swiper-bundle.css",
    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        // { src: '~/middleware/client-router-regexp', ssr: true },
        { src: "@/plugins/axios.js" },
        { src: "~/plugins/jsonld" },
        { src: "~plugins/filters.js" },
        { src: "~plugins/vue-click-outside.js", ssr: false },
        { src: "~plugins/v-calendar-plugin.js", ssr: false },
        { src: "~plugins/vue-select-plugin.js", ssr: false },
        { src: "~plugins/vue-lightgallery-plugin.js", ssr: false },
        { src: "~plugins/lg-thumb-plugin.js", ssr: false },
        { src: "~plugins/vee-validate.js", ssr: false },
        { src: "~plugins/v-mask.js", ssr: false },
        { src: "~plugins/yandex-map.js", ssr: false },
        { src: "@/plugins/ssr-cookie-proxy.js", mode: 'server' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    serverMiddleware: [
        "~/middleware/logger",
    ],

    redirect: [
        { from: '^/cashback', to: '/akcii-kompanii', statusCode: 301 },
    ],

    router: {
        extendRoutes(routes, resolve) {
            routes.push({
                path: '/rechnye-kruizy/:slug/vibor-kayutu/:id',
                component: resolve(__dirname, 'pages/choose-cabin/_id.vue'),
                chunkNames: 'pages/rechnye-kruizy/_slug/vibor-kayutu/_id',
            });
            routes.push({
                path: '/kruizy-vyhodnogo-dnya-iz-moskvy',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/kruizy-vyhodnogo-dnya-iz-moskvy',
            });
            routes.push({
                path: '/rechnye-kruizy-na-teplohode-ot-7-dnej',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/rechnye-kruizy-na-teplohode-ot-7-dnej',
            });
            routes.push({
                path: '/rechnye-kruizy-na-teplohode-ot-10-dnej-i-bolshe/',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/rechnye-kruizy-na-teplohode-ot-10-dnej-i-bolshe/',
            });
            routes.push({
                path: '/vesennie-rechnye-kruizy-na-teplohode',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/vesennie-rechnye-kruizy-na-teplohode',
            });
            routes.push({
                path: '/letnie-rechnye-kruizy',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/letnie-rechnye-kruizy',
            });
            routes.push({
                path: '/osennie-rechnye-kruizy',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/osennie-rechnye-kruizy',
            });
            routes.push({
                path: '/dva-kruiza-po-cene-odnogo',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/dva-kruiza-po-cene-odnogo',
            });
            routes.push({
                path: '/rechnye-kruizy-*',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/rechnye-kruizy-*',
            });
            routes.push({
                path: '/akcii-molodozhenam',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-molodozhenam',
            });
            routes.push({
                path: '/akcii-detyam',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-detyam',
            });
            routes.push({
                path: '/akcii-postoyannym-kliyentam',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-postoyannym-kliyentam',
            });
            routes.push({
                path: '/akcii-dva-po-tsene-odnogo',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-dva-po-tsene-odnogo',
            });
            routes.push({
                path: '/akcii-v-chest-otkritiya-navigatsii',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-v-chest-otkritiya-navigatsii',
            });
            routes.push({
                path: '/akcii-v-chest-9-may',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-v-chest-9-may',
            });
             routes.push({
                path: '/kruiz-po-oke-so-skidkoj-35',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-kruiz-po-oke',
            });
             routes.push({
                path: '/kruiz-po-volge-so-skidkoj-35',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/akcii-kruiz-po-volge',
            });
            routes.push({
                path: '/kruiz-v-diveevo-so-skidkoj-35',
                component: resolve(__dirname, 'components/front/AkciiPromoPage.vue'),
                chunkNames: 'pages/kruiz-v-diveevo-so-skidkoj-35',
            });
            routes.push({
                path: '/akcii-cashback',
                component: resolve(__dirname, 'components/front/AkciiPromoPageCashback.vue'),
                chunkNames: 'pages/akcii-cashback',
            });
            routes.push({
                path: '/akcii-5-dnei-rechnoi-kruiz',
                component: resolve(__dirname, 'components/front/AkciiPromoPageSort.vue'),
                chunkNames: 'pages/akcii-5-dnei-rechnoi-kruiz',
            });
            // todo временная акция
            routes.push({
                path: '/moskva-sankt-peterburg-moskva--na-volne-vpechatlenij',
                component: resolve(__dirname, 'components/front/CruisesPromoPage.vue'),
                chunkNames: 'pages/moskva-sankt-peterburg-moskva--na-volne-vpechatlenij',
            });

            routes.push({
                path: '/otzyvy/:year',
                component: resolve(__dirname, 'pages/otzyvy/index.vue'),
                chunkNames: 'pages/otzyvy/_year',
            });

            sortRoutes(routes);
        }
    },

    buildModules: [
        "@nuxtjs/eslint-module",
        "@nuxtjs/tailwindcss",
        "nuxt-font-loader",
    ],

    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/dotenv",
        "@nuxtjs/dayjs",
        "cookie-universal-nuxt",
        "nuxt-precompress",
        "nuxt-lazy-load",
        '@nuxtjs/redirect-module',
        'vue-social-sharing/nuxt',
    ],

    fontLoader: {
        url: {
            local: "/fonts/golostext/golostext.css"
        },
        preload: {
            local: {
                hid: 'golostext-preload'
            }
        },
        noscript: {
            local: {
                hid: 'golostext-noscript'
            }
        }
    },

    nuxtPrecompress: {
        test: /\.(js|css|html|txt|xml|svg)$/,
    },

    dayjs: {
        locales: ["ru"],
        defaultLocale: "ru",
        plugins: [],
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: "#30BE19" },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: process.env.API_BASE_URL,
        browserBaseURL: process.env.API_BROWSER_BASE_URL,
        withCredentials: true,
    },

    tailwindcss: {
        cssPath: "~/assets/scss/tailwind.scss",
        configPath: "tailwind.config.js",
        exposeConfig: false,
        viewer: false,
        config: {},
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true,
                preserveLineBreaks: false,
                collapseWhitespace: true
            }
        },
        extractCSS: {
            ignoreOrder: true,
        },
        // группировка, закомментить если разбиваем на более мелкие чанки
        // optimization: {
        //     splitChunks: {
        //         cacheGroups: {
        //             styles: {
        //                 name: 'styles',
        //                 test: /\.(scss|css|vue)$/,
        //                 chunks: 'all',
        //                 enforce: true,
        //             }
        //         }
        //     },
        // },
        postcss: {
            order: "presetEnvAndCssnanoLast",
            plugins: {
                tailwindcss: join(__dirname, 'tailwind.config.js'),
                autoprefixer: {},
                cssnano:
                    process.env.NODE_ENV === "production"
                        ? {
                            preset: [
                                "default",
                                {
                                    discardComments: {
                                        removeAll: true,
                                    },
                                },
                            ],
                        }
                        : false, // disable cssnano when not in production
            },
        },
        transpile: [
            'vee-validate/dist/rules',
        ],
        /*
        ** You can extend webpack config here
        */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/,
                });
            }
        },
        babel: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        "loose": true,
                        "shippedProposals": true,
                    },
                ],
            ],
        },
    },

    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type);
            }
        }
    },

    env: {
        NODE_ENV: process.env.NODE_ENV,
        BASE_URL: process.env.BASE_URL,
        API_BASE_URL: process.env.API_BASE_URL,
        API_BROWSER_BASE_URL: process.env.API_BROWSER_BASE_URL,
        YANDEX_API_KEY: process.env.YANDEX_API_KEY,
    },
};
