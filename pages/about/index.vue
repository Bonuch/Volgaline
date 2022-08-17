<template>
    <div class="page-inner page-about pb-40 xl:pb-23 mob:pb-14">
        <div
            class="inner-cruises-top-banner relative mb-24 pt-6 pb-32 bg-no-repeat bg-center bg-cover xl:pb-24 md:mb-15"
            :style="`backgroundImage: url(${getBannerContent.image})`"
        >
            <div class="wrapper relative z-1">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs text-white mb-16 lg:mb-10"/>

                <div class="px-12 xl:px-0">
                    <h1
                        v-if="getBannerContent.title"
                        class="page-inner-h1 leading-snug text-white mb-8 xl:mb-5"
                        v-html="getBannerContent.title"
                    ></h1>
                    <div
                        v-if="getBannerContent.content"
                        v-html="getBannerContent.content"
                        class="inner-cruises-top-banner__content text-white text-22 leading-1-2 xl:text-lg xl:leading-snug lg:font-medium"
                    ></div>
                </div>
            </div>
        </div>

        <section class="promo-section mb-18 md:mb-14">
            <div class="wrapper wrapper-1410">
                <h2 class="page-inner-h1 mb-10 xl:mb-5">3 собственных теплохода:</h2>

                <template v-if="ships && ships.length > 0">
                    <template v-if="isMobileScreen">
                        <client-only>
                            <BaseMobileSlider
                                :pagination="true"
                                :buttons="true"
                            >
                                <CruiseBannerCard
                                    v-for="(item) in mappedShips"
                                    :key="item.id"
                                    :item="item"
                                    :title-with-link="true"
                                    class="swiper-slide"
                                >
                                    <template v-slot:title="{ item }">
                                        <h3
                                            v-if="item.title && item.link"
                                            class="cruise-banner-card-title m-0 mb-7 text-white text-30 leading-tight uppercase xs:text-26 xs:normal-case xs:leading-tight"
                                        >
                                            <nuxt-link :to="item.link">
                                                {{ item.title }}
                                            </nuxt-link>
                                        </h3>
                                    </template>
                                </CruiseBannerCard>
                            </BaseMobileSlider>
                        </client-only>
                    </template>

                    <div
                        v-else
                        class="flex flex-wrap overflow-x-hidden -mx-4 tablet:mx-0"
                    >
                        <CruiseBannerCard
                            v-for="(item) in mappedShips"
                            :key="item.id"
                            :item="item"
                            class="w-1/3 px-4 mb-5 xl:w-1/2 tablet:w-full tablet:px-0"
                        >
                            <template v-slot:title="{ item }">
                                <h3
                                    v-if="item.title && item.link"
                                    class="cruise-banner-card-title m-0 mb-7 text-white text-30 leading-tight uppercase xs:text-26 xs:normal-case xs:leading-tight"
                                >
                                    <nuxt-link :to="item.link">
                                        {{ item.title }}
                                    </nuxt-link>
                                </h3>
                            </template>
                        </CruiseBannerCard>
                    </div>
                </template>

                <p v-else>Теплоходов нет</p>
            </div>
        </section>

        <div class="wrapper wrapper-1410 mb-23 md:mb-15 md:p-0">
            <AboutCountInner
                v-if="aboutArr && aboutArr.length > 0"
                :about-arr="aboutArr"
                class="md:rounded-none"
            />
        </div>

        <LazyHydrate
            :when-visible="{ rootMargin: '140px' }">
            <SubscribeEmailForm class="about-subscribe-email-form-settings"/>
        </LazyHydrate>

        <section class="mt-23 md:mt-15 mb-23 md:mb-15">
            <div class="wrapper wrapper-1410">
                <h2 class="page-inner-h1 mb-10 xl:mb-5">Посмотрите видео о&nbsp;нашей компании</h2>
            </div>

            <div class="wrapper wrapper-1410 md:p-0">
                <div class="page-about-video">
                    <div class="page-about-video-play z-2" @click="handlePlayClick">
                        <div class="relative z-1">
                            <button
                                type="button"
                                title="Смотреть видео о нашей компании"
                                class="block w-40 h-40 mx-auto mb-16 tablet:mb-5 tablet:w-16 tablet:h-16"
                            >
                                <svg
                                    class="w-full h-full"
                                    width="162"
                                    height="162"
                                    viewBox="0 0 162 162"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="81" cy="81" r="81" fill="white"/>
                                    <path
                                        d="M110 79.268C111.333 80.0378 111.333 81.9622 110 82.7321L63.5 109.579C62.1667 110.349 60.5 109.386 60.5 107.847L60.5 54.1532C60.5 52.6136 62.1667 51.6514 63.5 52.4212L110 79.268Z"
                                        fill="#BC002D"
                                    />
                                </svg>
                            </button>

                            <img
                                class="page-about-video-img"
                                src="~/assets/images/inner/about-logo.png"
                                alt="Волга Лайн Круизная судоходная компания" width="450" height="105"
                            >
                        </div>
                    </div>

                    <client-only>
                        <youtube
                            v-if="isMounted"
                            class="page-about-video-frame absolute w-full h-full left-0 top-0 z-1"
                            ref="youtube"
                            :video-id="videoId"
                            :player-vars="playerVars"
                        ></youtube>
                    </client-only>
                </div>
            </div>
        </section>

        <div class="page-inner__content">
            <div class="wrapper wrapper-1410">
                <div v-if="content && content.full_text" v-html="content.full_text"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { seoHelper } from '~/mixins/content-helpers';
    import { getObjectProp } from '@/helpers/helpers';
    import TopBanner from '@/components/inner/TopBanner';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import LazyHydrate from 'vue-lazy-hydration';


    export default {
        components: {
            Breadcrumbs,
            TopBanner,
            LazyHydrate,
            Youtube: () => process.client ? (import("vue-youtube/src/vue-youtube")) : "",
            BaseMobileSlider: () => import("@/components/base/BaseMobileSlider"),
            CruiseBannerCard: () => import("@/components/front-banners/CruiseBannerCard"),
            AboutCountInner: () => import("@/components/inner/AboutCountInner"),
            SubscribeEmailForm: () => import('@/components/front/SubscribeEmailForm'),

        },
        mixins: [seoHelper],
        layout: 'without-form',
        head() {
            return {
                title: this.getSeoField('title', 'О компании'),
                meta: [
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: this.getSeoField('keywords', 'круизы по рекам, отдых на корабле, автобусные туры, жд туры, авиа, отдых на пароходе, отдых на теплоходе, речные круизы, речные туры, теплоходные туры, тур по волге, тур по реке, туры выходного дня из москвы, туры на корабле, туры на пароходе, туры на теплоходе, туры по оке'),
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.getSeoField('description', 'Мы – Ваш личный круизный эксперт.Как туроператор мы организуем речные круизы на собственных теплоходах, а также предлагаем туры на судах множества партнёров.'),
                    },
                    { hid: 'og:title', property: 'og:title', content: this.getPageTitle() },
                    { hid: 'og:type', property: 'og:type', content: this.getSeoType('article') },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: this.getSeoField('description', 'Мы – Ваш личный круизный эксперт.Как туроператор мы организуем речные круизы на собственных теплоходах, а также предлагаем туры на судах множества партнёров.'),
                    },
                    { hid: 'og:url', property: 'og:url', content: this.getPageUrl },
                    { hid: 'og:image', property: 'og:image', content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                isMounted: false,
                videoId: 'lvjBOY2PVjk',
                playerVars: {
                    'controls': 1,
                    'origin': process.env.BASE_URL,
                },
                title: 'О компании',
                breadcrumbs: [],
                content: {},
                aboutArr: [
                    {
                        id: 1,
                        count: 6,
                        text: 'Главных рек<br> России',
                    },
                    {
                        id: 2,
                        count: 90,
                        text: 'Красивейших<br> городов',
                    },
                    {
                        id: 3,
                        count: 250,
                        text: 'Экскурсионных<br> программ',
                    },
                    {
                        id: 4,
                        count: 17,
                        text: 'Лет речных<br> путешествий',
                    },
                    {
                        id: 5,
                        count: 26,
                        text: 'Комфортабельных<br> теплоходов',
                    },
                ],
                ships: [],
            };
        },
        computed: {
            ...mapGetters(['getWindowWidth']),
            isMobileScreen() {
                return this.getWindowWidth < 1025;
            },
            getBannerContent() {
                return {
                    title: 'Круизная судоходная компания "Волга Лайн"',
                    content: getObjectProp(this.content, 'intro_text'),
                    image: getObjectProp(this.content, 'image'),
                };
            },
            mappedShips() {
                return this.ships.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        link: item.slug ? `/populyarnye-kruiznye-teplohody/${item.slug}` : null,
                        image: item.image,
                    };
                });
            },
        },
        methods: {
            handlePlayClick() {
                const $el = this.$el;
                const playWrap = $el.querySelector('.page-about-video-play');

                if ($el && playWrap) {
                    playWrap.classList.add('page-about-video-play--hidden');
                    const player = this.$refs.youtube;

                    if (player) {
                        setTimeout(() => { player.player.playVideo() }, 50);
                    }
                }
            },
        },
        mounted() {
            this.isMounted = true;
        },
        async asyncData({ $axios }) {
            let title = 'О компании';
            let breadcrumbs = [];
            let ships = [];
            let content = {};

            try {
                const { data } = await $axios.get('/about');
                for (const [key, val] of Object.entries(data.content)) {
                    content[key] = val;
                }

                title = content.title;

                breadcrumbs = [
                    {
                        id: 1,
                        title: 'Главная',
                        link: '/',
                    },
                    {
                        id: 2,
                        title,
                        link: '',
                    },
                ];

            } catch (ex) {
                console.log('cant fetch content: ' + ex);
                return null;
            }

            try {
                const { data } = await $axios.get('/ships-promo-navigation');
                ships = data.data;
            } catch (ex) {
                console.log('cant find promo ships: ' + ex);
            }

            return {
                breadcrumbs,
                title,
                content,
                ships,
            };
        },
    };
</script>

<style lang="scss" scoped>
    .page-about {
        .inner-cruises-top-banner {
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(270deg,rgba(11,62,131,.1) 31%,#0b3e83 60%);
            }
        }

        h1 {
            max-width: 864px;
        }

        .page-inner-h1 {
            @apply leading-tight;
        }

        &-video {
            position: relative;
            height: 0;
            padding-bottom: 47%;
            overflow: hidden;
            cursor: pointer;
            @apply rounded-sm md:rounded-none;

            iframe {
                width: 100%;
                height: 100%;
            }

            &-play {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-image: url('~/assets/images/inner/about-video.jpg');
                background-repeat: no-repeat;
                background-position: center top;
                background-size: cover;

                &--hidden {
                    visibility: hidden;
                    opacity: 0;
                    z-index: -1;
                }

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.93;
                    @apply bg-blue-900;
                }

                button {
                    &:hover {
                        svg {
                            @apply text-blue-900;
                        }
                    }
                }

                svg {
                    transition: all .3s ease;
                    fill: currentColor;
                    @apply text-red-500;

                    path {
                        fill: currentColor;
                    }
                }
            }
        }
    }

    .promo-section {
        &::v-deep {
            .cruise-banner-card-content {
                @apply py-8;
            }

            .cruise-banner-card-title {
                margin: 0;
                @apply leading-snug;
            }
        }
    }

    .promo-title {
        @apply mb-12;
    }

    .about-subscribe-email-form-settings {
        &::v-deep {
            .wrapper-1410-w {
                max-width: 1410px !important;
                padding: 20px 40px;
                margin: 0 auto;
            }

            .about-px {
                @apply px-0;
            }
        }
    }

    @screen lg {
        .page-about {
            .inner-cruises-top-banner {
                &:after {
                    background: linear-gradient(270deg,rgba(11,62,131,.34) 10%,#0b3e83 120%);
                }
            }
        }
    }

    @screen tablet {
        .page-about-video-img {
            max-width: 246px;
        }
    }

    @screen sm {
        .page-about-video {
            padding-bottom: 64%;
            min-height: 270px;
        }
    }
</style>
