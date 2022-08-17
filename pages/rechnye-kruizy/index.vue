<template>
    <div
        class="page-inner page-river-cruises"
        :class="{'xl:bg-white': hasTopBanner}"
    >
        <div v-if="hasTopBanner" class="pb-10 bg-gray-50 xl:pb-0 xl:rounded-b-2xl xl:overflow-hidden">
            <TopBanner
                :title="title"
                :breadcrumbs="breadcrumbs"
                :top-banner-content="getTopBanner"
                class="xl:pb-24 page-river-cruises-banner"
            />

            <SearchComponent
                v-if="isWideScreen"
                class="mt-10 mb-0 mx-auto"
                :expanded="true"
                :show-expand-button="false"
                @on-submit="handleSearchSubmit"
            />

            <div class="relative z-1 p-4 -mt-20 bg-blue-400 rounded-2xl hidden xl:block">
                <button
                    type="button"
                    class="flex items-center justify-center w-full p-3 bg-white text-black-400 text-center text-base font-medium rounded-sm custom-transition hover:text-blue-400"
                    @click="openModal({ name: 'ModalFilter' })"
                >
                    <svg
                        class="mr-1 fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            class="fill-current" fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.9375 2.81249C4.93749 2.2602 4.48977 1.81249 3.93749 1.8125C3.3852 1.81251 2.93749 2.26023 2.9375 2.81251L2.93756 8.5625H2.25C1.69772 8.5625 1.25 9.01022 1.25 9.5625C1.25 10.1148 1.69772 10.5625 2.25 10.5625H3.93758H5.625C6.17729 10.5625 6.625 10.1148 6.625 9.5625C6.625 9.01022 6.17729 8.5625 5.625 8.5625H4.93756L4.9375 2.81249ZM14.0626 1.8125C14.6149 1.8125 15.0626 2.26022 15.0626 2.81251L15.0625 10.8125H15.75C16.3023 10.8125 16.75 11.2602 16.75 11.8125C16.75 12.3648 16.3023 12.8125 15.75 12.8125H14.0625H12.375C11.8227 12.8125 11.375 12.3648 11.375 11.8125C11.375 11.2602 11.8227 10.8125 12.375 10.8125H13.0625L13.0626 2.81249C13.0626 2.26021 13.5103 1.8125 14.0626 1.8125ZM9.00002 1.8125C9.5523 1.8125 10 2.26022 10 2.8125L10 5.1875H10.6875C11.2398 5.1875 11.6875 5.63522 11.6875 6.1875C11.6875 6.73978 11.2398 7.1875 10.6875 7.1875H9H7.3125C6.76022 7.1875 6.3125 6.73978 6.3125 6.1875C6.3125 5.63522 6.76022 5.1875 7.3125 5.1875H8L8.00002 2.8125C8.00002 2.26021 8.44773 1.8125 9.00002 1.8125ZM9 7.4375C9.55228 7.4375 10 7.88521 10 8.4375L10 15.1875C10 15.7398 9.5523 16.1875 9.00002 16.1875C8.44773 16.1875 8.00002 15.7398 8.00002 15.1875L8 8.4375C8 7.88522 8.44771 7.4375 9 7.4375ZM15.0625 14.0624C15.0625 13.5101 14.6147 13.0625 14.0624 13.0625C13.5101 13.0625 13.0625 13.5103 13.0625 14.0626L13.0626 15.1876C13.0626 15.7399 13.5104 16.1875 14.0626 16.1875C14.6149 16.1875 15.0626 15.7397 15.0626 15.1874L15.0625 14.0624ZM3.9376 10.8125C4.48988 10.8125 4.93759 11.2602 4.93757 11.8125L4.9375 15.1875C4.93749 15.7398 4.48976 16.1875 3.93748 16.1875C3.38519 16.1875 2.93749 15.7398 2.9375 15.1875L2.93757 11.8125C2.93759 11.2602 3.38531 10.8125 3.9376 10.8125Z"
                            fill="white"
                        />
                    </svg>

                    <span class="link-inline ">Показать фильтры</span>
                </button>
            </div>
        </div>

        <div v-else class="pt-6 pb-10 bg-gray-50 xl:pb-0 xl:rounded-b-2xl xl:overflow-hidden">
            <div class="wrapper">
                <Breadcrumbs v-show="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-20 2xl:mb-16 xl:mb-12 sm:mb-10"/>
            </div>

            <div class="wrapper-1800 pb-8 xl:pb-0">
                <h1 class="px-5 text-44 leading-1-1 mb-8 m-0 uppercase xl:text-36 xl:mb-5 xl:px-0 mob:text-26">
                    {{ title }}
                </h1>

                <div class="relative z-1 p-4 -mx-4 bg-blue-900 rounded-2xl hidden xl:block">
                    <button
                        type="button"
                        class="flex items-center justify-center w-full p-3 bg-white text-black-400 text-center text-base font-medium rounded-sm custom-transition hover:text-blue-400"
                        @click="openModal({ name: 'ModalFilter' })"
                    >
                        <svg
                            class="mr-1 fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                class="fill-current" fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.9375 2.81249C4.93749 2.2602 4.48977 1.81249 3.93749 1.8125C3.3852 1.81251 2.93749 2.26023 2.9375 2.81251L2.93756 8.5625H2.25C1.69772 8.5625 1.25 9.01022 1.25 9.5625C1.25 10.1148 1.69772 10.5625 2.25 10.5625H3.93758H5.625C6.17729 10.5625 6.625 10.1148 6.625 9.5625C6.625 9.01022 6.17729 8.5625 5.625 8.5625H4.93756L4.9375 2.81249ZM14.0626 1.8125C14.6149 1.8125 15.0626 2.26022 15.0626 2.81251L15.0625 10.8125H15.75C16.3023 10.8125 16.75 11.2602 16.75 11.8125C16.75 12.3648 16.3023 12.8125 15.75 12.8125H14.0625H12.375C11.8227 12.8125 11.375 12.3648 11.375 11.8125C11.375 11.2602 11.8227 10.8125 12.375 10.8125H13.0625L13.0626 2.81249C13.0626 2.26021 13.5103 1.8125 14.0626 1.8125ZM9.00002 1.8125C9.5523 1.8125 10 2.26022 10 2.8125L10 5.1875H10.6875C11.2398 5.1875 11.6875 5.63522 11.6875 6.1875C11.6875 6.73978 11.2398 7.1875 10.6875 7.1875H9H7.3125C6.76022 7.1875 6.3125 6.73978 6.3125 6.1875C6.3125 5.63522 6.76022 5.1875 7.3125 5.1875H8L8.00002 2.8125C8.00002 2.26021 8.44773 1.8125 9.00002 1.8125ZM9 7.4375C9.55228 7.4375 10 7.88521 10 8.4375L10 15.1875C10 15.7398 9.5523 16.1875 9.00002 16.1875C8.44773 16.1875 8.00002 15.7398 8.00002 15.1875L8 8.4375C8 7.88522 8.44771 7.4375 9 7.4375ZM15.0625 14.0624C15.0625 13.5101 14.6147 13.0625 14.0624 13.0625C13.5101 13.0625 13.0625 13.5103 13.0625 14.0626L13.0626 15.1876C13.0626 15.7399 13.5104 16.1875 14.0626 16.1875C14.6149 16.1875 15.0626 15.7397 15.0626 15.1874L15.0625 14.0624ZM3.9376 10.8125C4.48988 10.8125 4.93759 11.2602 4.93757 11.8125L4.9375 15.1875C4.93749 15.7398 4.48976 16.1875 3.93748 16.1875C3.38519 16.1875 2.93749 15.7398 2.9375 15.1875L2.93757 11.8125C2.93759 11.2602 3.38531 10.8125 3.9376 10.8125Z"
                                fill="white"
                            />
                        </svg>

                        <span class="link-inline">Показать фильтры</span>
                    </button>
                </div>
            </div>

            <SearchComponent
                v-if="isWideScreen"
                class="mx-auto"
                :expanded="true"
                :show-expand-button="false"
                @on-submit="handleSearchSubmit"
            />
        </div>

        <div class="pb-3" :class="{ 'disabled': fsrLoading }">
            <CruiseSectionList
                v-if="fsrContent && fsrContent.length > 0"
                class="pt-20 bg-white xl:pt-10"
                :cruises="fsrContent"
                :sort-list="sortList"
                :view-controls="viewControls"
                :headings="headings"
                :show-more-visible="fsrShowMoreVisibility"
                @on-clear-query-params-click="onClearQueryParamsClick"
                @on-show-more-click="fsrOnSearchMoreClick('/cruise/search')"
            />

            <div v-else class="wrapper wrapper-1410 mt-24 xl:pt-16">
                <p class="p-2 m-0 mb-3 text-center font-medium">
                    Результаты отсутствуют, попробуйте задать другие параметры поиска.
                </p>
            </div>
        </div>

        <section
            v-if="seoMainpageText && seoMainpageText.length > 0"
            class="section-offset mt-20 mb-20 about-cruises"
        >
            <div class="wrapper wrapper-1410">
                <div
                    class="title-offset title-heading mb-7"
                >
                    <h2 v-if="seoMainpageText[0].title" class="section-title">{{ seoMainpageText[0].title }}</h2>
                </div>
                <div class="about-cruises__list flex overflow-hidden">
                    <ReadMoreGradient
                        v-if="seoMainpageText[0].text"
                        class=""
                        :desc="seoMainpageText[0].text"
                        :maxHeight="185"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import { sfmQueryHasProp, sfmPrepearFormData } from '../../helpers/search';
    import { seoHelper, fetchSearchResult } from "@/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import SearchComponent from "@/components/search/SearchComponent";
    import SortItem from "@/components/cruise-section/SortItem";
    import HeadingControl from "@/components/cruise-section/HeadingControl";
    import TopBanner from "@/components/inner/TopBanner";
    import CruiseSectionList from "@/components/cruise-section/CruiseSectionList";
    import WantForm from "@/components/front/WantForm";

    export default {
        components: {
            WantForm,
            CruiseSectionList,
            TopBanner,
            HeadingControl,
            SortItem,
            SearchComponent,
            Breadcrumbs,
            ReadMoreGradient: () => import('@/components/base/ReadMoreGradient'),
        },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: this.getSeoField('title', 'Круизы по рекам России 2022 года из Москвы на теплоходе'),
                meta: [
                    { hid: "keywords", name: "keywords", content: this.getSeoField('keywords', 'речные круизы, волга, ока, москва, казань') },
                    { hid: "description", name: 'description', content: this.getSeoField('description','Компания «Волга Лайн» организует речные круизы на теплоходе по России. Предлагаем интересные и необычные маршруты 2022 года. Экскурсии в каждом городе.') },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: 'website' },
                    { hid: "og:description", property: "og:description", content: "Компания «Волга Лайн» организует речные круизы на теплоходе по России. Предлагаем интересные и необычные маршруты 2022 года. Экскурсии в каждом городе." },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                content: null,
                title: null,
                topBannerContent: {},
                breadcrumbs: [],
                seoMainpageText: null,
                sortList: [
                    {
                        name: "price",
                        title: "По возрастанию стоимости",
                        value: "asc",
                    },
                    {
                        name: "price",
                        title: "По убыванию стоимости",
                        value: "desc",
                    },
                    {
                        name: "departure_date_from",
                        title: "По дате начала",
                        value: "asc",
                    },
                    {
                        name: "departure_date_from",
                        title: "По дате начала",
                        value: "desc",
                    },
                    {
                        name: "duration",
                        title: "По продолжительности",
                        value: "asc",
                    },
                    {
                        name: "duration",
                        title: "По продолжительности",
                        value: "desc",
                    },
                ],
                viewControls: [
                    {
                        name: "grid",
                        icon: "GridIcon",
                    },
                    {
                        name: "list",
                        icon: "ListIcon",
                    },
                    {
                        name: "line",
                        icon: "LineIcon",
                    },
                ],
                headings: [
                    'Дата',
                    'Дней',
                    'Название Круиза',
                    'Маршрут',
                    'Теплоход',
                    'Кают',
                    'Цена от',
                    '',
                ],
            };
        },
        watch: {
            fsrContent: function(cruises) {
                window && window.dispatchEvent(
                    new CustomEvent('CruisesSearchResult', { detail: cruises })
                );
            }
        },
        computed: {
            ...mapGetters(["getWindowWidth"]),
            isWideScreen() {
                return this.getWindowWidth > 1280;
            },
            hasTopBanner() {
                return this.getTopBanner && Object.keys(this.getTopBanner).length > 0;
            },
            jsonldMappedElements() {
                return elements => {
                    let res = [];

                    if (elements && elements.length > 0) {
                        res = elements.map(item => {
                            return {
                                '@type': 'Product',
                                'name': item.title,
                                'offers': {
                                    '@type': 'Offer',
                                    'price': item.price,
                                }
                            }
                        });
                    }

                    return res;
                }
            },
            getTopBanner() {
                if(!this.content || typeof this.content != 'object') return this.topBannerContent;

                const image_1920_530 = 'image_1920_530' in this.content? this.content.image_1920_530: null;
                const image_420_520 = 'image_420_520' in this.content? this.content.image_420_520: null;

                this.topBannerContent.image = this.getWindowWidth > 640? image_1920_530: image_420_520;
                return this.topBannerContent;
            }
        },
        mounted() {
            window && window.dispatchEvent(
                new CustomEvent('CruisesSearchResult', { detail: this.fsrContent })
            );
        },
        methods: {
            ...mapActions({
                openModal: "modals/openModal",
                'fetchAllOptions': 'search/fetchAllOptions',
                'fetchSelectedOptions': 'search/fetchSelectedOptions',
            }),
            ...mapMutations({
                'setSelectedOptions': 'search/setSelectedOptions',
            }),
            async handleSearchSubmit(formData) {
                await this.fsrSearch("/cruise/search", formData);
            },
            async onClearQueryParamsClick() {
                const params = sfmPrepearFormData(this.$route.query, this.$dayjs);
                await this.fsrSearch("/cruise/search", params);
            },
        },
        jsonld() {
            return {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                "url": this.getPageUrl,
                "numberOfItems": this.fsrContentMeta.total,
                "itemListElement": this.jsonldMappedElements,
            };
        },
        async asyncData({ $axios, query, $dayjs }) {
            let title = "Речные круизы по рекам России";
            let content = null;
            let breadcrumbs = [];
            let fsrContent = [];
            let fsrContentMeta = {};
            let topBannerContent = {};
            let seoMainpageText = null;

            try {
                const contentPromise = $axios.get('/rechnye-kruizy');
                let queryParams = sfmPrepearFormData(query, $dayjs);

                const { data } = await $axios.get("/cruise/search", { params: queryParams });
                fsrContent = data.data;
                fsrContentMeta = data.meta;

                const response = await contentPromise;
                if (response && response.data && response.data.content) {
                    content = response.data.content;
                    title = response.data.content.title;
                }
                topBannerContent = {
                    content: 'Круизы по&nbsp;рекам и&nbsp;озерам России – это прекрасная возможность совершить путешествие сразу в&nbsp;несколько городов, где&nbsp;вас ждут интересные экскурсии по&nbsp;историческим местам и&nbsp;достопримечательностям.',
                };

                breadcrumbs = [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title,
                        link: null,
                    },
                ];
            } catch (ex) {
                console.log(`cant fetch content ${ex}`);
                return null;
            }

            try {
                const {data} = await $axios.get('/banners/about-river-cruises');
                seoMainpageText = data.data;
            } catch (ex) {
                console.log('cant fetch front page: ' + ex);
            }

            return {
                title,
                content,
                breadcrumbs,
                topBannerContent,
                fsrContent,
                fsrContentMeta,
                seoMainpageText,
            };
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
            if (params && Object.keys(params).length > 0) {
                // подгрузка параметров поиска в поисковую форму
                if (sfmQueryHasProp(params)) {
                    await this.fetchSelectedOptions(params);
                }

                // подгрузка отсортированных круизов
                if (sfmQueryHasProp(params, ['sort', 'order']) || params['modal-filter']) {
                    const params = sfmPrepearFormData(to.query, this.$dayjs);
                    await this.fsrSearch('/cruise/search', params);
                }
            } else {
                this.setSelectedOptions(null);
            }

            next();
        }
    };
</script>

<style lang="scss" scoped>

    .about-cruises__list {
        &::v-deep {
            & p {
                font-size: 1rem;
                line-height: 1.5rem;
            }
            & li {
                font-size: 1rem;
                line-height: 1.5rem;
            }
        }
    }
    .section-title {
        @apply text-25 font-medium normal-case;
    }
    .page-river-cruises-banner {
        background-position: top center;
        padding-bottom: 154px;

        &::v-deep {
            .inner-cruises-top-banner__content {
                max-width: 734px;
                line-height: 1.3;
            }
        }
    }
</style>
