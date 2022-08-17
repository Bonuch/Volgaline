<template>
    <div class="page-front">
        <div class="page-front-slider relative z-10 mb-20 tablet:mb-14">
            <template v-if="hasMainSlider">
                <client-only>
                    <FirstSlider :slider-items="sliderItems" :is-mobile="isMobileScreen" />

                    <template #placeholder>
                        <SliderPreloader class="main-slider-preloader"/>
                    </template>
                </client-only>

                <!--стили для баннера в админке-->
                <div class="hidden sm:hidden text-black-900 text-22 lg:text-lg mb-8 lg:mb-6 py-2 px-5 lg:px-8
                 inline-block rounded-sm py-2 pr-6 pl-5 bg-blue-900 bg-opacity-70 rounded-tr-sm first:rounded-tl-sm
                 last:rounded-bl-sm mb-10 mob:mb-4 lg:mb-8 sm:mb-5 font-bold text-80 xl:text-60 lg:text-44 md:text-38 sm:text-28 mob:text-22
                  flex flex-col items-start relative overflow-hidden leading-none xs:text-center pl-5 sm:w-1/3 sm:w-full text-purple-500 sm:text-25
                    md:text-40 pl-64 pl-40 lg:pl-10 md:pl-0 xl:pl-0 text-60 xl:text-44 lg:text-40 md:text-30 sm:pl-2
                    text-white text-36 xl:text-25 tablet:text-lg mb-14 lg:mb-16 px-5 lg:px-8 tablet:pl-5 block sm:pl-2
                    lg:hidden py-3 px-4 ml-2 font-normal button lg:inline-block sm:hidden py-4 px-5 ml-2 tablet:ml-0 font-normal
                    pb-4 pl-5 pr-3 bg-green-200 rounded-br-sm rounded-bl-sm xl:hidden pt-4 pb-3  pr-3 pl-5 rounded-tl-sm -mb-0.5
                    mb-6 mob:mb-4 lg:mb-8 sm:mb-5 font-medium text-36 tablet:text-25 sm:text-lg text-black-900 items-start
                    text-50 mb-8 sm:mb-5 px-5 sm:px-2 inline-block tablet:text-30
                    sm:block pt-4 sm:pt-0  pr-3 pl-5 rounded-tl-sm -mb-0.5
                     py-0 pr-8 pl-5 -mb-0.5 xl:pb-4 sm:pb-0 pr-3  rounded-bl-sm
                    bg-yellow-400 text-black-900 text-xs mb-5 lg:mb-6 py-2 px-3.5 inline-block rounded-sm uppercase pl-2 pt-7 sm:pt-0
                    text-black-900 w-5/12 3xl:w-3/4 sm:w-full leading-normal mb-10 mob:mb-4 lg:mb-8 sm:mb-5 font-semibold xl:text-44 lg:text-40
                    md:text-30 sm:text-28 mob:text-22 flex-col items-start mb-40 mt-20 mb-40 w-3/4 mx-auto mb-20 text-green-900 italic xs:text-22 tabletLg:pl-0
                    xs:max-w-73 lg:mb-18 tabletLg:pl-7 tabletLg:pr-7 tabletLg:m-0 min-h-0 bottom-12 bg-blue-50 text-green-700 max-w-sm text-red-700 leading-1.2 leading-1.9 text-yellow-500
                    bg-yellow-500 header-info bg-red-700 xs:text-black-400 xs:max-h-40 tablet:bg-gray-700 bg-gray-700 text-green-600 aspect-w-15.5 text-13 text-15 sm: sm:flex-col-reverse
                    h-25 leading-1-5 max-h-80 sm:max-w-xs xs:w-1/2 xs:max-w-none sm:leading-1-2 xs:leading-1-2 xxs:text-lg xxs:text-2xl
                    xs:flex-col xs:object-cover text-40 bg-100% xxs:mt-0 xxs:text-white"></div>
            </template>

            <SearchComponent
                class="page-front-search search--absolute"
                @on-submit="handleSearch"
            />
        </div>

        <section class="sm:hidden">
            <div class="wrapper wrapper-1410 mb-12">
                <div class="pb-8 border-b border-gray-60">
                    <h1 class="text-36 font-medium">Речные круизы из Москвы</h1>
                </div>
            </div>
        </section>

        <section
            v-if="getQuickCruiseSearchNav && getQuickCruiseSearchNav.length > 0"
            class="directions-section mb-20 md:mb-10"
        >
            <div class="wrapper wrapper-1410">
                <div class="title-offset title-heading">
                    <h2 class="section-title">Воспользуйтесь быстрым поиском круизов</h2>
                </div>

                <MenuQuickCruiseSearch/>
            </div>
        </section>

        <section
            v-if="exclusive && exclusive.length > 0"
            class="mb-20 tablet:pt-0 tablet:mb-10"
        >
            <div class="overflow-x-hidden">
                <div class="title-offset wrapper wrapper-1410">
                    <h2 class="section-title">Эксклюзив от «Волга&nbsp;Лайн»</h2>
                </div>

                <template v-if="isMobileScreen">
                    <client-only>
                        <BaseMobileSlider
                            :pagination="true"
                            :buttons="true"
                            class='exclusive'
                        >
                            <ExclusiveCard
                                v-for="(item) in exclusive"
                                :key="item.id"
                                :item="item"
                                class="swiper-slide exclusive"
                            />
                        </BaseMobileSlider>
                    </client-only>
                </template>

                <div v-else class="wrapper wrapper-1410 overflow-hidden">
                    <div class="flex flex-wrap -m-3.75 overflow-hidden">
                        <div
                            v-for="(item) in exclusive"
                            :key="item.id"
                            class="p-3.75 w-1/3 xl:w-1/2 tablet:w-full"
                        >
                            <ExclusiveCard :item="item" class="exclusive"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            v-if="directionsList && directionsList.length > 0"
            class="directions-section mb-10"
        >
            <div class="wrapper wrapper-1410">
                <div class="title-offset title-heading">
                    <h2 class="section-title sm:mb-0">Популярные направления из Москвы</h2>
                    <p class="title-heading-link m-0 sm:hidden">
                        <NuxtLink class="link-inline text-lg font-medium text-red-400 sm:hidden" to="/popular-directions"
                                  title="Все направления">
                            Все направления
                        </NuxtLink>
                    </p>
                </div>

                <ClientOnly>
                    <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                        <Directions :arr="directionsList"/>
                    </LazyHydrate>

                    <template #placeholder>
                        <SliderPreloader :responsive="true" class="directions-preloader"/>
                    </template>
                </ClientOnly>

                <div class="hidden sm:block">
                    <nuxt-link
                        to="/popular-directions"
                        class="button mt-10 font-normal px-8 py-2 w-full bg-white border border-red-500 text-red-500 rounded-sm"
                    >
                        Все направления
                    </nuxt-link>
                </div>

            </div>
        </section>

        <section
            v-if="bannerSoloveckieOstrova && bannerSoloveckieOstrova.length > 0"
            class="mb-8"
        >
            <div class="wrapper wrapper-1410">
                <div class="title-offset title-heading">
                    <h2 class="section-title">Акционные теплоходы и направления</h2>
                </div>
                <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                    <div class="mb-12">
                        <BannerSoloveckieOstrova :item="bannerSoloveckieOstrova[0]"/>
                    </div>
                </LazyHydrate>
            </div>
        </section>

        <section v-if="discountShips && discountShips.length > 0" class="mb-7">
            <div class="wrapper wrapper-1410">
                <h2 class="section-title mb-7 !text-lg">Теплоходы с максимальными скидками на круизы 2022 года</h2>
            </div>

            <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                <div class="mb-4 wrapper wrapper-1410">
                    <DiscountShips :arr="discountShips"/>
                </div>
            </LazyHydrate>
        </section>

        <section class="partners py-20 border-t border-gray-60 sm:py-16">
            <div class="wrapper wrapper-1410">
                <div class="title-offset title-heading">
                    <h2 class="section-title">Наши партнеры</h2>
                    <p class="title-heading-link m-0 sm:hidden">
                        <nuxt-link
                            class="link-inline text-lg font-medium text-red-400 sm:hidden" to="/partners"
                            title="Наши партнеры"
                        >
                            Подробнее
                        </nuxt-link>
                    </p>
                </div>

                <div class="partners-list-wrap">
                    <div class="partners-list flex items-center justify-between">
                        <div class="partners-item">
                            <img src="~/assets/images/partners/mosgortyr.png" alt="Мосгортур">
                        </div>
                        <div class="partners-item">
                            <img src="~/assets/images/partners/office.png" alt="Развитие туризма и гостеприимства Москвы">
                        </div>
                        <div class="partners-item">
                            <img src="~/assets/images/partners/tyrizm.png" alt="Комитет по туризму города Москвы">
                        </div>
                        <div class="partners-item">
                            <img src="~/assets/images/partners/veterans.png" alt="Российский союз ветеранов">
                        </div>
                    </div>
                </div>

                <nuxt-link to="/partners" class="button hidden mt-4 font-normal px-8 py-2 w-full bg-white border border-red-500 text-red-500 rounded-sm sm:block" title="Подробнее о партнерах">
                    Подробнее о партнерах
                </nuxt-link>
            </div>
        </section>

        <section class="cruises-city mb-20 sm:mb-15 border-t border-b border-gray-60 py-20 lg:py-15 sm:py-10">
            <div class="wrapper wrapper-1410">
                <div class="title-offset title-heading m-0">
                    <h2 class="section-title mb-0">Популярные направления по России</h2>
                </div>
                <div class="cruises-city-wrap">

                    <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                        <div class="cruises-city-list">
                            <div
                                v-for="(item, itemIdx) in cruise_city"
                                :key="itemIdx"
                                class="cruises-city-item mr-10 w-full pb-1 last:pb-0"
                            >
                                <strong
                                    v-if="item.title"
                                    class="cruises-city-title mb-4 text-base text-blue-250 font-semibold inline-block"
                                >
                                    {{ item.title }}
                                </strong>

                                <template v-if="item.items && item.items.length > 0">
                                    <nuxt-link
                                        v-for="(subItem, subIdx) in item.items"
                                        :key="subIdx"
                                        class="cruises-city-link block pb-2.5 text-base"
                                        :title="subItem.title"
                                        :to="`/${subItem.link}`"
                                    >
                                        {{ subItem.title }}
                                    </nuxt-link>
                                </template>
                            </div>
                        </div>
                    </LazyHydrate>
                </div>
            </div>
        </section>

        <section
            v-if="shipsByClass && shipsByClass.length > 0"
            class="about-section mb-18 sm:mb-15 border-b border-gray-60 pb-12 lg:pb-10 sm:pb-8"
        >
            <div class="wrapper wrapper-1410">
                <h2 class="section-title mb-0">Круизные теплоходы</h2>
            </div>

            <client-only>
                <CruiseShipsByClass
                    :ships="shipClassId"
                    @shipsByClasses="updateShipsByClasses"
                />
            </client-only>
        </section>

        <section class="about-section mb-18 sm:mb-12 sm:mb-4 border-b sm:border-none border-gray-60 pb-20 lg:pb-15 sm:pb-8">
            <div class="wrapper wrapper-1410">
                <div class="title-offset title-heading">
                    <h2 class="section-title">О нас в цифрах</h2>
                </div>

                <div class="about-section__item about-section__wrap flex flex-wrap overflow-hidden">
                    <div class="about-section__item about-section__counter flex flex-wrap w-full overflow-hidden">
                        <LazyHydrate never>
                            <AboutCount :about-arr="getAboutArrReverse"/>
                        </LazyHydrate>
                    </div>
                </div>
            </div>
        </section>

        <section class="cruises-section mb-18 tablet:mb-20">
            <div class="" :class="{ 'disabled': fsrLoading }">
                <div class="title-offset wrapper wrapper-1410">
                    <h2 class="section-title">Круизы по месяцам</h2>
                </div>
                <CruisesByMonth
                    :cruises="fsrContent"
                    :show-more-visible="fsrShowMoreVisibility"
                    @cruisesByMonths="updateCruisesByMonths"
                    @on-show-more-click="fsrOnSearchMoreClick('/cruise/search')"
                />
            </div>
        </section>

        <section class="mb-20">
            <div class="wrapper wrapper-1410">
                <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                    <CruiseDetailForm/>
                </LazyHydrate>
            </div>
        </section>

        <section v-if="reviews && reviews.length > 0" class="insta mb-20">
            <div class="wrapper wrapper-1410">
                <div class="title-offset justify-betweens title-heading flex flex-wrap">
                    <h2 class="section-title">Отзывы наших туристов</h2>
                    <div class="sm:hidden">
                        <nuxt-link
                            to="/otzyvy"
                            class="button px-7 py-2 text-base font-medium lg:mb-4 xs:w-full"
                            title="Читать все отзывы наших туристов"
                        >
                            Читать все отзывы
                        </nuxt-link>
                    </div>
                </div>
            </div>

            <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                <Reviews
                    v-if="reviews && reviews.length > 0"
                    :content="reviews"
                    :title-on="false"
                />
            </LazyHydrate>

            <div class="wrapper hidden sm:block">
                <nuxt-link
                    to="/otzyvy"
                    class="button mt-10 font-normal px-8 py-2 w-full bg-white border border-red-500 text-red-500 rounded-sm"
                    title="Читать все отзывы наших туристов"
                >
                    Читать все отзывы
                </nuxt-link>
            </div>
        </section>

        <section v-if="seoMainpageText && Object.keys(seoMainpageText).length > 0"
                 class="section-offset mb-44 sm:mb-20 about-cruises">
            <div class="wrapper wrapper-1410">
                <div
                    v-if="seoMainpageText.title"
                    class="title-offset title-heading mb-7"
                >
                    <h2 class="section-title">{{ seoMainpageText.title }}</h2>
                </div>
                <div class="about-cruises__list flex overflow-hidden">
                    <ReadMoreGradient
                        v-if="seoMainpageText.text"
                        class=""
                        :desc="seoMainpageText.text"
                        :maxHeight="185"
                    />
                </div>
            </div>
        </section>

        <script>
            window.advcake_data.push({
                pageType: 1,
                user: null//{email: 'md5(user@email.ru)'}
            });
        </script>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {sfmPrepearFormData, sfmQueryHasProp} from '../helpers/search';
import {seoHelper, fetchSearchResult} from '@/mixins/content-helpers';
import SearchComponent from '@/components/search/SearchComponent';
import LazyHydrate from 'vue-lazy-hydration';
import FirstSlider from "../components/front-banners/FirstSlider";

export default {
    name: "index",
    mixins: [seoHelper, fetchSearchResult],
    components: {
        FirstSlider,
        LazyHydrate,
        SearchComponent,
        MenuQuickCruiseSearch: () => import('@/components/front/MenuQuickCruiseSearch'),
        CruiseDetailForm: () => import('@/components/cruise-detail/CruiseDetailForm'),
        BaseMobileSlider: () => import('@/components/base/BaseMobileSlider'),
        ExclusiveCard: () => import('@/components/front-banners/ExclusiveCard'),
        SliderPreloader: () => import('@/components/front-banners/SliderPreloader'),
        DiscountsAndPromotions: () => import('@/components/front-banners/DiscountsAndPromotions'),
        Directions: () => import('@/components/front-banners/Directions'),
        DiscountShips: () => import('@/components/front-banners/DiscountShips'),
        BannerSoloveckieOstrova: () => import('@/components/front-banners/BannerSoloveckieOstrova'),
        AboutCount: () => import('@/components/front/AboutCount'),
        CruisesByMonth: () => import('@/components/front/CruisesByMonth'),
        CruiseShipsByClass: () => import('@/components/front/CruiseShipsByClass'),
        Reviews: () => import('@/components/cruise-detail/tabs/CruiseDetailReviews'),
        ReadMoreGradient: () => import('@/components/base/ReadMoreGradient'),
    },
    layout: 'without-form',
    head() {
        return {
            title: this.getSeoField( 'title', 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы'),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.getSeoField('keywords', 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы')
                },
                {
                    hid: "description",
                    name: 'description',
                    content: this.getSeoField('description', 'Речные круизы от компании «Волга Лайн» по всей России на речную навигацию 2021 и 2022 года. Действуют сезонные скидки до 20% на речные круизы 2022 года')
                },
                {hid: "og:title", property: "og:title", content: this.getPageTitle()},
                {hid: "og:type", property: "og:type", content: this.getSeoType('website')},
                {
                    hid: "og:description",
                    property: "og:description",
                    content: 'Речные круизы от компании «Волга Лайн» по всей России на речную навигацию 2021 и 2022 года. Действуют сезонные скидки до 20% на речные круизы 2022 года'
                },
                {hid: "og:url", property: "og:url", content: this.getPageUrl},
                {hid: "og:image", property: "og:image", content: this.getOgImage()},
            ],
        };
    },
    data() {
        return {
            sliderItems: [],
            shipsByClass: [],
            cruisesByMonths: [],
            shipClassId: [],
            fsrContent: [],
            directionsList: [],
            discountShips: [],
            bannerSoloveckieOstrova: [],
            cruise_city: [],
            aboutArr: [
                {
                    id: 0,
                    count: 6,
                    text: "Главных рек России",
                },
                {
                    id: 1,
                    count: 26,
                    text: "Комфортабельных теплоходов",
                },
                {
                    id: 2,
                    count: 250,
                    text: "Экскурсионных программ",
                },
                {
                    id: 3,
                    count: 17,
                    text: "Лет речных путешествий",
                },
                {
                    id: 4,
                    count: 90,
                    text: "Красивейших городов",
                },
                {
                    id: 5,
                    count: '>10',
                    text: "более 10 тысяч довольных клиентов",
                },
            ],
            reviews: [],
            seoMainpageText: null,
            exclusive: null,
            content: {},
        };
    },
    computed: {
        ...mapGetters({
            getWindowWidth: 'getWindowWidth',
            getUser: 'user/getUser',
            getQuickCruiseSearchNav: 'getQuickCruiseSearchNav'
        }),
        hasMainSlider() {
            return this.sliderItems && this.sliderItems.length > 0;
        },
        isMobileScreen() {
            return this.getWindowWidth < 640;
        },
        getAboutArrReverse() {
            return this.aboutArr.reverse();
        },
    },
    jsonld() {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            "name": this.getPageTitle(),
            "image": this.getOgImage(),
            "keywords": this.getSeoField('keywords'),
            "description": this.getSeoField('description'),
            "url": this.getPageUrl,
        };
    },
    methods: {
        ...mapActions({
            'fetchAllOptions': 'search/fetchAllOptions',
            'fetchSelectedOptions': 'search/fetchSelectedOptions',
        }),
        ...mapMutations({
            'setSelectedOptions': 'search/setSelectedOptions',
        }),
        handleSearch(formData) {
            this.$router.push({
                path: "/rechnye-kruizy",
                query: formData,
            });
        },
        updateShipsByClasses(ships){
            this.shipClassId = ships;
        },
        updateCruisesByMonths(cruises){
            this.fsrContent = cruises;
        },
        async getCruisesByFirstMonth(){
            const currentDate = new Date;

            const currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth() + 1;
            currentMonth = currentMonth >= 4 || currentMonth <= 10? currentMonth: 4;

            const currentDay = this.$dayjs().format('DD');

            const currentMonthOutStart = currentMonth < 10? `0${currentMonth}`: currentMonth;
            const currentMonthOutEnd = currentMonth + 1 < 10? `0${currentMonth + 1}`: currentMonth + 1;

            const date = {
                'start': `${currentYear}-${currentMonthOutStart}-${currentDay}T00:00:00.000Z`,
                'end': `${currentYear}-${currentMonthOutEnd}-01T00:00:00.000Z`,
            };

            try{
                const queryParams = sfmPrepearFormData({departureDate: date}, this.$dayjs);
                const { data } = await this.$axios.get("/cruise/search", { params: queryParams });

                this.fsrContent = data.data;
            }catch (ex) {
                console.log('cant fetch cruises by month: ' + ex);
            }
        },
        async onClearQueryParamsClick() {
            const params = sfmPrepearFormData(this.$route.query, this.$dayjs);
            await this.fsrSearch("/cruise/search", params);
        },
    },
    async fetch() {
        const params = sfmPrepearFormData(this.$route.query, this.$dayjs);
        await this.fetchAllOptions();

        if (params && Object.keys(params).length > 0 && sfmQueryHasProp(params)) {
            await this.fetchSelectedOptions(params);
        } else {
            this.setSelectedOptions(null);
        }
    },
    async beforeRouteUpdate(to, from, next) {
        const params = sfmPrepearFormData(to.query, this.$dayjs);
        if (params && Object.keys(params).length > 0 && sfmQueryHasProp(params)) {
            await this.fetchSelectedOptions(params);
        } else {
            this.setSelectedOptions(null);
        }

        next();
    },
    async asyncData({$axios, query, $dayjs}) {
        let shipsByClass = [],
            content = {},
            sliderItems = [],
            discountShips = [],
            bannerSoloveckieOstrova = [],
            reviews = [],
            seoMainpageText = null,
            exclusive = [],
            directionsList = [],
            cruise_city = [],
            shipClassId = [],
            preloadedImage = {
                image: null,
                tabletImage: null,
                mobImage: null,
            };

        try {
            const {data} = await $axios.get('/front-page/content');
            content = data.content;
            shipsByClass = data.ships;
            sliderItems = data.mainSlider;
            discountShips = data.discount_ships;
            bannerSoloveckieOstrova = data.soloveckie_ostrova;
            reviews = data.reviews;
            seoMainpageText = data.seoMainpageText;
            directionsList = data.popularDirections;
            exclusive = data.exclusive;

            if (sliderItems && sliderItems.length > 0) {
                preloadedImage.image = sliderItems[0]['image'];
                preloadedImage.tabletImage = sliderItems[0]['tablet_image'];
                preloadedImage.mobImage = sliderItems[0]['mobile_image'];
            }
        } catch (ex) {
            console.log('cant fetch front page: ' + ex);
        }
        try {
            let data = await $axios.get('/get-menu/cruise-menu');
            for (const dataKey in data.data) {
                let letter = data.data[dataKey].title;
                let obj = {title: letter};
                let items = [];

                for (const city in data.data[dataKey].children) {
                    let item = data.data[dataKey].children[city];
                    items.push({title: item.title, link: item.link})
                }
                obj.items = items;
                cruise_city.push(obj);
            }
        } catch (ex) {
            console.log('cant fetch front page cruise-menu: ' + ex);
        }
        try{
            const { data } = await $axios.get(`/ships-by-class?class_id=1`);
            shipClassId = data

        }catch (ex) {
            console.log('cant fetch ships by class: ' + ex);
        }
        return {
            shipsByClass,
            sliderItems,
            discountShips,
            bannerSoloveckieOstrova,
            reviews,
            seoMainpageText,
            directionsList,
            exclusive,
            content,
            cruise_city,
            shipClassId,

        };
    },

    created() {
        this.getCruisesByFirstMonth();
    }
};
</script>

<style lang="scss" scoped>

.about-section {
    &__item {
        flex: 1;
    }

}

.about-cruises {
    &::v-deep {
        .about-cruises__item ul {
            margin-left: 30px;
        }
    }

    &__item {
        flex: 1;
    }

    &__image {
        max-width: 570px;
        min-height: 274px;
        margin-right: 30px;
    }

    &__content {
        line-height: 28px;
    }
}

.section-title {
    @apply text-25 font-medium normal-case;
}

.partners {
    &-item {
        @apply mr-7 last:mr-0;
    }
}

@screen xl {
    .page-front-search {
        position: relative !important;
        left: auto !important;
        bottom: auto !important;
        margin: -24px auto 64px;
        transform: none !important;
        opacity: 0;
        animation-delay: 0.3s;
        animation: 0.2s fade-in-block forwards;
        padding: 0 30px;
    }

    .about-section {
        &__wrap {
            margin: 0;
        }

        &__ships,
        &__counter {
            flex: 0 1 100%;
            padding: 0;
            margin: 0;
        }

        &__ships {
            max-width: 100%;
            margin: 0 0 16px;
        }
    }

    .insta__hashtags {
        padding: 0;
    }

    .about-cruises {
        &__list {
            flex-wrap: wrap;
            margin: 0;
        }

        &__item {
            flex: 0 1 100%;
        }

        &__image {
            max-width: 100%;
            max-height: 530px;
            margin-right: 0;
            margin-bottom: 40px;

            img {
                height: 100%;
            }
        }

        &__content {
            padding: 0;

            h2 {
                margin-bottom: 50px;
            }
        }
    }
}

@screen lg {
    .promo-section__list {
        .promo {
            width: calc(50% - 8px);
            margin-right: 16px;
            margin-bottom: 16px;

            &:nth-of-type(2n) {
                margin-right: 0;
            }
        }
    }
}

@screen tablet {
    .promo-section__list {
        margin: 0;
    }
}

@screen md {
    .partners {
        &-list-wrap {
            overflow-x: auto;
            padding-bottom: 34px;
        }

        &-list {
            min-width: 600px;
        }

        &-item {
            width: 140px;

            &:nth-of-type(1) {
                width: 164px;
            }

            &:nth-of-type(4) {
                width: 60px;
            }
        }
    }
}

@screen xs {
    .page-front-search {
        padding: 0 8px;
    }
}
</style>
