<template>
    <div class="page-inner cruise-detail">
        <template v-if="cruiseData && Object.keys(cruiseData).length > 0">
            <div
                class="cruise-detail__bg relative z-3 pt-6 pb-14 mb-6 page-inner-bg-gradient md:pb-7"
                :style="`backgroundImage: url(${getCruiseImage})`"
            >
                <div class="wrapper wrapper-1740 relative z-1">
                    <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-7 text-white"/>

                    <div class='cruise-detail__heading text-xl leading-snug font-medium'>
                        <CruisePromo
                            v-if='cruiseData.offers && cruiseData.offers.length > 0'
                            :promo='cruiseData.offers'
                            class='cruise-detail__promo ml-0 mr-0 mb-7'
                        />

                        <div class='mb-6'>
                            <span class='cruise-section-item-subtitle text-yellow-350'>Название круиза:</span>
                            <h1
                                v-if='cruiseData && cruiseData.title'
                                class='text-30 leading-snug m-0 mb-5 mob:text-26'
                            >
                                {{ cruiseData.title }} <span class='hidden'>на теплоходе {{ getDateFormatted(cruiseData.departure_date_time) + getDateFormatted(cruiseData.arrival_date_time) }}</span>
                            </h1>
                        </div>

                        <div
                            v-if='cruiseData.departure_date_time && cruiseData.arrival_date_time'
                            class='cruise-detail__durations mb-6'
                        >
                            <span
                                class='cruise-section-item-subtitle text-yellow-350'>Дата отправления и прибытия:</span>
                            <div class='flex justify-start items-center'>
                                <div>{{ getDateFormatted(cruiseData.departure_date_time) }}</div>
                                <div class='w-4 border-b border-white mx-3'></div>
                                <div>{{ getDateFormatted(cruiseData.arrival_date_time) }}</div>
                            </div>
                        </div>

                        <div v-if='cruiseData.duration_days' class='mb-6'>
                            <div class='cruise-section-item-subtitle text-yellow-350'>Продолжительность:</div>
                            <span>{{ daysAndNights }}</span>
                        </div>

                        <div v-if='cruiseData.ship && cruiseData.ship.title' class='mb-6'>
                            <div class='cruise-section-item-subtitle text-yellow-350'>Теплоход:</div>
                            <nuxt-link :to='`/ships-catalog/${cruiseData.ship.slug}`'>{{ cruiseData.ship.title }}
                            </nuxt-link>
                        </div>

                        <div>
                            <div class='cruise-section-item-subtitle text-yellow-350'>Цена:</div>
                            <div
                                v-if='cruiseData.price'
                                class='cruise-section-item__price-old mb-2 text-sm font-medium line-through'
                            >
                                {{ getPrice(cruiseData.price) }}
                            </div>

                            <div class="flex items-center relative">
                                <div
                                    v-if='cruiseData.discount_price'
                                    class='cruise-section-item__price m-0'
                                >
                                    от {{ getPrice(cruiseData.discount_price) }}
                                </div>
                                <span
                                    v-if="isHotCruise"
                                    class="ml-4"
                                >
                                    <span class=""><img src="@/static/images/flame/flame-big.png" alt="fire"></span>
                                </span>
                            </div>

                        </div>

                        <button
                            v-if='false'
                            type='button'
                            class='button w-fit flex justify-center items-center px-4 py-5 text-xl sm:w-full'
                            :class="{'disabled': !cruiseData.free_cabins}"
                            @click='onFastBuyClick(cruiseData.id)'
                        >
                            <svg
                                class='mr-3 fill-current' width='24' height='24' viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    class='fill-current'
                                    fill-rule='evenodd' clip-rule='evenodd'
                                    d='M4 0H3L3 1L3 23V24H4H7.55059H8.06474L8.36389 23.5818C9.24078 22.3561 10.7752 21.5 12.5 21.5C14.2338 21.5 15.8151 22.3634 16.6867 23.5818L16.9858 24H17.5H21H22V23V1V0H21H17.5H16.9859L16.6867 0.418163C15.8151 1.63655 14.2338 2.5 12.5 2.5C10.7662 2.5 9.18494 1.63655 8.31331 0.418164L8.01415 0H7.5H4ZM5 15L5 2H7.01295C8.29895 3.51558 10.3236 4.5 12.5 4.5C14.6764 4.5 16.701 3.51558 17.9871 2H20L20 15H19.0625V17H20L20 22H17.987C16.701 20.4844 14.6764 19.5 12.5 19.5C10.316 19.5 8.33713 20.4899 7.0626 22H5L5 17H5.9375V15H5ZM15.3125 17H17.1875V15H15.3125V17ZM11.5625 17H13.4375V15H11.5625V17ZM7.8125 17L9.6875 17V15H7.8125V17ZM16 9H9V7H16V9ZM10 13H15V11H10V13Z'
                                    fill='#1D1F20'
                                />
                            </svg>

                            <span>Быстрый заказ</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="wrapper wrapper-1740">
                <TabsListHeadingWithScroll :tabs-list="tabsList"/>
            </div>

            <!--cruise-detail__content-scroll-to-->
            <!--Информация-->
            <div
                class="page-inner__content cruise-detail__content pt-12"
                id="cruise-detail-section-info"
            >
                <Info
                    v-if="cruiseData.direction_title || cruiseData.desc"
                    :direction-title="cruiseData.direction_title"
                    :content="cruiseData.description"
                    :ship-id="cruiseData.ship.id"
                    :discounts='discounts'
                    :exclusive="exclusive"
                    :title="cruiseData.ship"
                />

                <CruiseDetailIncludedStuff
                    v-if="
                        cruiseData.price_cabins &&
                        cruiseData.price_cabins.includedStuffs &&
                        cruiseData.price_cabins.includedStuffs.length > 0
                    "
                    :stuffs="cruiseData.price_cabins.includedStuffs"
                    class="pt-20 sm:pt-16"
                />
            </div>

            <!--Теплоход-->
            <div
                v-if="cruiseData.ship && Object.keys(cruiseData.ship).length > 0"
                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"
                id="cruise-detail-section-ships"
            >
                <div class="wrapper wrapper-1410 sm:px-0">
                    <Ships :content="cruiseData.ship"/>
                </div>
            </div>

            <!--Цены на каюты-->
            <div
                v-if="cruiseData.price_cabins && Object.keys(cruiseData.price_cabins).length > 0"
                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"
                id="cruise-detail-section-prices"
            >
                <Prices :decks="cruiseData.price_cabins.decks" :shipTitle="cruiseData.ship.title"/>

            </div>

            <div class='pt-20 sm:pt-14'>
                <CruiseDetailForm />
            </div>

            <!--Экскурсии по дням-->
            <div
                v-if="cruiseData.routes_by_day && cruiseData.routes_by_day.length > 0"
                class="page-inner__content cruise-detail__content pt-20 sm:pt-0"
                id="cruise-detail-section-roads"
            >
                <Roads
                    :content="cruiseData.routes_by_day"
                    :promo='cruiseData.offers'
                />
            </div>

            <!--Экскурсии-->
<!--TODO: убрали экскурсии по просьбе клиента      -->

<!--            <div-->
<!--                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"-->
<!--                id="cruise-detail-section-excursions"-->
<!--            >-->
<!--                <Excursions :content="cruiseData.excursions"/>-->
<!--                <div class="wrapper wrapper-1410">-->
<!--                    <p>Извините, детальная информация по экскурсиям отсутствует.</p>-->
<!--                </div>-->
<!--            </div>-->

            <!--Отзывы-->
            <div
                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"
                id="cruise-detail-section-reviews"
            >
                <Reviews :content="cruiseData.reviews"/>
            </div>

            <section
                v-if="directionsList && directionsList.length > 0"
                class="directions-section pt-20 pb-5"
            >
                <div class="wrapper wrapper-1410">
                    <div class="title-offset title-heading">
                        <h2 class="section-title text-25 font-medium normal-case">Популярные направления</h2>
                    </div>

                    <ClientOnly>
                        <Directions :arr="directionsList"
                        class="directions-cruise"
                        />

                        <template #placeholder>
                            <SliderPreloader :responsive="true" class="directions-preloader"/>
                        </template>
                    </ClientOnly>
                </div>
            </section>
        </template>

        <div class="wrapper wrapper-1410" v-else>
            <p>Нет данных для круиза</p>
        </div>
    </div>
</template>

<script>
    import { formatCurrency, setCase } from '@/helpers/text';
    import { mapActions, mapGetters } from 'vuex';
    import { seoHelper, dayjsHelpers, htmlHelper } from '@/mixins/content-helpers';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import TabsListHeadingWithScroll from '@/components/cruise-detail/tabs/TabsListHeadingWithScroll';
    import CruiseDetailGallery from '@/components/cruise-detail/CruiseDetailGallery';
    import SliderPreloader from '@/components/front-banners/SliderPreloader';

    import Prices from '@/components/cruise-detail/tabs/CruiseDetailPrices';

    export default {
        name: 'index',
        components: {
            Breadcrumbs,
            TabsListHeadingWithScroll,
            SliderPreloader,
            CruiseDetailGallery,
            Prices,
            CruiseDetailIncludedStuff: () => import('@/components/cruise-detail/tabs/CruiseDetailIncludedStuff'),
            Info: () => import('@/components/cruise-detail/tabs/CruiseDetailInfo'),
            CruiseDetailForm: () => import('@/components/cruise-detail/CruiseDetailForm'),
            Directions: () => import('@/components/front-banners/Directions'),
            CruisePromo: () => import('@/components/cruise-section/CruisePromo'),
            Ships: () => import('@/components/cruise-detail/tabs/CruiseDetailShip'),
            Excursions: () => import('@/components/cruise-detail/tabs/CruiseDetailExcursions'),
            Reviews: () => import('@/components/cruise-detail/tabs/CruiseDetailReviews'),
            Roads: () => import('@/components/cruise-detail/tabs/CruiseDetailRoads'),
        },
        mixins: [ seoHelper, dayjsHelpers, htmlHelper ],
        head() {
            return {
                title: this.cruiseTitle,
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы' },
                    { hid: "description", name: 'description', content: this.metaDescription },
                    { hid: "og:title", property: "og:title", content: this.cruiseTitle },
                    { hid: "og:type", property: "og:type", content: 'website' },
                    { hid: "og:description", property: "og:description", content: "Компания «Волга Лайн» организует речные круизы на теплоходе по России. Предлагаем интересные и необычные маршруты. Экскурсии в каждом городе" },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                cruiseData: {},
                directionsList: [],
                breadcrumbs: [],
                tabsList: [
                    {
                        name: 'Общая информация о круизе',
                        link: 'info',
                        content: 'infoTab',
                    },
                    {
                        name: 'Теплоход',
                        link: 'ships',
                        content: 'shipTab',
                    },
                    {
                        name: 'Цены/Каюты',
                        link: 'prices',
                        content: 'pricesTab',
                    },
                    {
                        name: 'Маршрут по дням',
                        link: 'roads',
                        content: 'roadsTab',
                    },
                    //TODO: убрали экскурсии по просьбе клиента
                    // {
                    //     name: 'Экскурсии',
                    //     link: 'excursions',
                    //     content: 'excursionsTab',
                    // },
                    {
                        name: 'Отзывы',
                        link: 'reviews',
                        content: 'reviewsTab',
                    },
                ],
                exclusive: null,
            };
        },
        computed: {
            ...mapGetters({
                getWindowWidth: 'getWindowWidth',
            }),
            getCruiseImage() {
                const mobile_image = this.cruiseData.mobile_image? this.cruiseData.mobile_image: this.cruiseData.image_420_520;
                const image = this.getWindowWidth < 640 && mobile_image? mobile_image: this.cruiseData.image;
                return this.cruiseData && image ? image : this.cruiseData.ship.image_url;
            },
            getPrice() {
                return (price) => formatCurrency(price) + '/чел.';
            },
            cruiseTitle() {
                const date = this.getDateFormatted(this.cruiseData.departure_date_time);
                const shipName = this.cruiseData.ship && this.cruiseData.ship.title ? this.cruiseData.ship.title : null;
                const direction = this.cruiseData.direction_title; //.replace(/-/g, '–');
                return `Круиз на теплоходе ${shipName} – ${date} года – маршрут речного круиза ${direction}`;
            },
            metaDescription() {
                const date = this.getDateFormatted(this.cruiseData.departure_date_time);
                const shipName = this.cruiseData.ship && this.cruiseData.ship.title ? this.cruiseData.ship.title : null;
                const direction = this.cruiseData.direction_title; //.replace(/-/g, '–');
                return `Речной круиз от компании «Волга Лайн» – более 15 акций на речные туры – маршрут круиза – ${direction} ${shipName} ${date} года`;
            },
            daysAndNights() {
                // 10 дней / 9 ночей
                const days = this.cruiseData.duration_days.days;
                const nights = this.cruiseData.duration_days.nights;
                const daysText = setCase(days, ["день", "дня", "дней"]);
                const daysFormatted = `${days} ${daysText}`;

                if (nights > 0) {
                    const nightsText = setCase(nights, ["ночь", "ночи", "ночей"]);
                    return `${daysFormatted} / ${nights} ${nightsText}`;
                }

                return daysFormatted;
            },
            /**
             * Горящий тур (в админке спец предложение -> fire)
             */
            isHotCruise() {
                let res = false;
                const offers = this.cruiseData?.offers;

                if (offers) {
                    const filtered = offers.filter(item => item.title.toLowerCase() === "fire");
                    res = filtered.length > 0;
                }

                return res;
            },
        },
        mounted() {
            window && window.dispatchEvent(
                new CustomEvent('CruiseDetailPage', { detail: this.cruiseData })
            );
        },
        methods: {
            ...mapActions({
                onFastBuyClick: 'cart/onFastBuyClick',
            }),
        },
        jsonld() {
            if (this.cruiseData && Object.keys(this.cruiseData).length > 0) {
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    'name': this.cruiseData.title,
                    'image': this.getCruiseImage,
                    'description': this.cruiseData.desc,
                    'url': this.getPageUrl,
                    'offers': {
                        '@type': 'Offer',
                        'price': this.cruiseData.price,
                    },
                };
            } else {
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    "headline": this.getPageTitle(),
                    "image": this.getOgImage(),
                    "keywords": this.getSeoField('keywords'),
                    "description": this.getSeoField('description'),
                    "url": this.getPageUrl,
                    "datePublished": this.getSeoDatePublished(),
                };
            }
        },
        async asyncData({ $axios, params, store, error }) {
            const slug = encodeURI(params.id);
            let cruiseData = {};
            let directionsList = [];
            let discounts = [];
            let title = 'Речной круиз';
            let breadcrumbs = [
                {
                    id: 1,
                    title: 'Главная',
                    link: '/',
                },
                {
                    id: 2,
                    title: 'Круизы по рекам России',
                    link: '/rechnye-kruizy',
                },
                {
                    id: 3,
                    title: 'Речной круиз',
                    link: null,
                },
            ];
            let exclusive = [];

            try {
                const { data } = await $axios.get(`/cruise/${slug}`);
                cruiseData = data.data;
                title = cruiseData.title;
                store.commit('cart/setCruiseID', cruiseData.id);
                store.commit('cart/setCruiseSlug', cruiseData.slug);
                breadcrumbs = [
                    {
                        id: 1,
                        title: 'Главная',
                        link: '/',
                    },
                    {
                        id: 2,
                        title: 'Круизы по рекам России',
                        link: '/rechnye-kruizy',
                    },
                    {
                        id: 3,
                        title: cruiseData.title ? cruiseData.title.replace(/(<([^>]+)>)/gi, '') : '',
                        link: null,
                    },
                ];
            } catch (ex) {
                cruiseData = null;
                console.log('cant fetch content: ' + ex);
                if (ex.response.status === 404) {
                    console.log({ statusCode: ex.response.status, message: 'Page not found' });
                    error({ statusCode: 404, message: "cant fetch content" });
                } else {
                    return null;
                }
            }

            try {
                const { data } = await $axios.get('/directions-front-popular');
                directionsList = data.data;
            } catch (ex) {
                console.log('cant fetch popular directions: ' + ex);
            }

            try {
                const { data } = await $axios.get('/banners/discounts-2-on-promo');
                discounts = data.data;
            } catch (ex) {
                console.log('cant fetch discounts cruise info: ' + ex);
            }

            try {
                const { data } = await $axios.get('/banners/aksii-na-teplokhode');
                exclusive = data.data;
            } catch (ex) {
                console.log('cant fetch discounts cruise info: ' + ex);
            }

            return {
                cruiseData,
                directionsList,
                discounts,
                breadcrumbs,
                title,
                exclusive,
            };
        },
    };
</script>

<style lang='scss' scoped>
.cruise-detail {
    .cruise-detail-form,
    .cruise-detail-roads {
        max-width: 1410px;
        margin: 0 auto;
    }

    .cruise-detail-roads {
        @apply py-10 bg-gray-40 rounded-sm;
    }
}
@screen sm {
    .cruise-detail{
        .cruise-detail-roads {
            @apply bg-transparent;
        }
    }

}
</style>
