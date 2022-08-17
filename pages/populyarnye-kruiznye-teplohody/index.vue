<template>
    <div class="page-inner page-ships-landing">
        <div
            class="inner-cruises-top-banner relative pt-6 pb-12 bg-no-repeat bg-center bg-cover mb-23"
            :class="{'inner-cruises-top-banner--about pb-32': $route.path === '/about'}"
            :style="`backgroundImage: url(${topBannerContent.image})`"
        >
            <div class="wrapper relative z-1">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-12 text-white"/>

                <div class="px-12 xl:px-0">
                    <h1
                        v-if="title"
                        class="page-ships-landing-title text-white text-44 leading-snug m-0 mb-10 uppercase xl:text-36 tablet:mb-0 tablet:text-30 mob:text-26"
                        v-html="getSplittedTitle(title)"
                    ></h1>
                    <div
                        v-if="topBannerContent.content"
                        v-html="topBannerContent.content"
                        class="inner-cruises-top-banner__content text-white text-22 leading-1-2 xl:text-lg xs:hidden"
                        :class="showDescription"
                    ></div>

                    <div
                        v-if="topBannerContent.content"
                        v-html="topBannerContent.content"
                        class="inner-cruises-top-banner__content inner-cruises-top-banner__content--mobile text-white leading-1-2 text-22 sm:text-xl hidden xs:block mob:text-lg"
                        :class="{'inner-cruises-top-banner__content--expanded': showDescription}"
                    ></div>

                    <button
                        v-if="topBannerContent.content"
                        type="button"
                        class="link-inline link-inline--dashed mt-4 text-white text-lg font-medium hidden xs:inline-block"
                        @click="showDescription = !showDescription"
                    >
                        <template v-if="!showDescription">Показать описание</template>
                        <template v-else>Скрыть описание</template>
                    </button>
                </div>
            </div>
        </div>

        <div class="wrapper wrapper-1410">
            <div
                v-if="fsrContent && fsrContent.length > 0"
                class="pb-12"
                :class="{ 'disabled': fsrLoading }"
            >
                <div
                    v-for="(cls) in shipClasses"
                    :key="cls.id"
                    class="mb-14 last:mb-0 tablet:mb-20 last:mb-0"
                >
                    <h2 class="flex flex-wrap items-end mb-16 text-2xl font-bold uppercase last:mb-0 tablet:text-xl">
                        <span class="leading-none tablet:w-full tablet:mb-4">класс теплохода</span>
                        <span class="mx-2 tablet:hidden">&mdash;</span>
                        <span
                            v-if="cls.title"
                            class="text-blue-300 text-44 tablet:w-full tablet:mb-5 tablet:text-36"
                        >
                                {{ cls.title }}
                            </span>
                        <Stars
                            :number="5"
                            :value="2 + cls.id"
                            class="ml-5 self-center tablet:w-full tablet:ml-0"
                            stars-classes="mr-1 last:mr-0"
                        />
                    </h2>

                    <div
                        v-for="(deck, deckIdx) in decksNumber"
                        :key="`ship-${deckIdx}`"
                        v-show="hasItemsByClass(fsrContent, deck.number ,cls.id)"
                    >
                        <h3 class="text-30 m-0 mb-10">{{ deck.title }}</h3>

                        <div class="columns-list columns-list-3cols tablet:mb-12">
                            <div
                                v-for="(group, groupIdx) in sortByFirstLetter(fsrContent, deck.number, cls.id)"
                                :key="`group-${groupIdx}`"
                                class="columns-list__item"
                            >
                                <h3
                                    v-if="group.group"
                                    class="cruises-city-title--square"
                                >
                                    {{ group.group }}
                                </h3>

                                <div v-if="group.items && group.items.length > 0" class="m-0">
                                    <p
                                        v-for="(subItem, subIdx) in group.items"
                                        :key="`sub-group-${subIdx}`"
                                        class="m-0 text-xl font-medium"
                                    >
                                        <nuxt-link
                                            :to="getLink(subItem.slug)"
                                            :title="subItem.title"
                                            class="inline-block mb-4"
                                        >
                                            Т/х «{{ subItem.title }}»
                                        </nuxt-link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p v-else>Ничего не найдено</p>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { seoHelper, fetchSearchResult } from '~/mixins/content-helpers';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import WantForm from '@/components/front/WantForm';
    import Stars from '@/components/base/Stars';
    import TopBanner from '@/components/inner/TopBanner';

    const pageTitle = 'Популярные круизные теплоходы';
    const metaKeywords = 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы';
    const metaDescription = 'Выберите теплоход для речных путешествий по Россия - мы собрали для Вас популярные речные теплоходы и разделили их на классы комфорта - эконом, стандарт, комфорт, премиум, люкс';

    function groupByFirstLetter(array, nameField = 'name') {
        let data = array.reduce((r, e) => {
            // get first letter of name of current element
            let group = e[nameField][0];
            // if there is no property in accumulator with this letter create it
            if (!r[group]) r[group] = { group, items: [e] };
            // if there is push current element to items array for that letter
            else r[group].items.push(e);
            // return accumulator
            return r;
        }, {});

        return Object.values(data);
    }

    export default {
        components: { TopBanner, WantForm, Breadcrumbs, Stars },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: this.getPageTitle(),
                meta: [
                    { hid: 'keywords', name: 'keywords', content: metaKeywords },
                    { hid: 'description', name: 'description', content: metaDescription },
                    { hid: 'og:title', property: 'og:title', content: this.getPageTitle() },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:description', property: 'og:description', content: metaDescription },
                    { hid: 'og:url', property: 'og:url', content: this.getPageUrl },
                    { hid: 'og:image', property: 'og:image', content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: pageTitle,
                breadcrumbs: [
                    {
                        id: 1,
                        title: 'Главная',
                        link: '/',
                    },
                    {
                        id: 2,
                        title: pageTitle,
                        link: '',
                    },
                ],
                fsrContentMeta: {},
                shipClasses: [],
                decksNumber: [
                    { number: 1, title: 'Однопалубный' },
                    { number: 2, title: 'Двухпалубный' },
                    { number: 3, title: 'Трехпалубный' },
                    { number: 4, title: 'Четырехпалубный' },
                    { number: 5, title: 'Пятипалубный' },
                ],
                topBannerContent: {
                    image: '/images/inner/about-bg.jpg',
                    content: '',
                },
            };
        },
        computed: {
            ...mapGetters({
                'windowWidth': 'getWindowWidth',
            }),
            getSplittedTitle() {
                return (title) => {
                    const splited = title.split(' ');

                    const wrapped = splited.map(splitedItem => `<span>${splitedItem}</span>`);
                    return wrapped.join(' ');
                };
            },
            isMobileScreen() {
                return this.windowWidth < 1025;
            },
            getImage() {
                return (photo) => photo ? photo : '/images/ships/1.jpg';
            },
            getLink() {
                return (slug) => `/populyarnye-kruiznye-teplohody/${slug}`;
            },
        },
        methods: {
            filterByClass(ships, decks, clsId) {
                return ships.filter(ship => (ship.ship_class === clsId && ship.decks_number === decks));
            },
            hasItemsByClass(ships, decks, clsId) {
                return !!ships.find(ship => (ship.ship_class === clsId && ship.decks_number === decks));
            },
            sortByFirstLetter(fsrContent, deckNumber, clsId) {
                let res = null;
                const filtered = this.filterByClass(fsrContent, deckNumber, clsId);

                if (filtered.length > 0) {
                    res = groupByFirstLetter(filtered, 'title');
                }

                return res;
            },
        },
        jsonld() {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                'name': this.getPageTitle(),
                'image': this.getOgImage(),
                'keywords': metaKeywords,
                'description': metaDescription,
                'url': this.getPageUrl,
            };
        },
        async asyncData({ $axios }) {
            let fsrContent = [];
            let fsrContentMeta = {};
            let shipClasses = [];

            try {
                const { data } = await $axios.get('/ships/popular-full-data', { params: { limit: 120 } });
                fsrContent = data.data;
                fsrContentMeta = data.meta;
                shipClasses = data.meta.ship_classes;
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
            }

            return {
                fsrContent,
                fsrContentMeta,
                shipClasses,
            };
        },
    };
</script>

<style lang="scss" scoped>
    .page-ships-landing {
        &-title {
            &::v-deep {
                span {
                    display: block;
                }
            }
        }

        .inner-cruises-top-banner {
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(270deg, rgba(11, 62, 131, 0) 10%, #0B3E83 100%);
            }
        }
    }

    @screen sm {
        .page-ships-landing {
            .inner-cruises-top-banner {
                &:after {
                    background: linear-gradient(270deg, rgba(11, 62, 131, 0) -30%, #0B3E83 100%);
                }
            }
        }
    }
</style>
