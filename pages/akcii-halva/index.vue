<template>
    <div class="page-inner page-akcii-halva">
        <div class="page-akcii-halva-banner pt-6 pb-60 text-white sm:pb-40">
            <div class="wrapper">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" :white="true" class="mb-14 sm:mb-10"/>
            </div>

            <div class="wrapper px-23 tablet:px-10 sm:px-4 sm:mb-4">
                <h1 class="page-inner-h1 leading-snug text-white mb-10 sm:mb-5">
                    Карта рассрочки
                    «Халва»
                    Совкомбанка
                </h1>
                <p class="desc-max-size m-0 text-22 font-medium mob:text-lg">
                    Благодаря «Халве» Вы&nbsp;можете приобрести круиз в&nbsp;рассрочку до&nbsp;12 месяцев без&nbsp;переплаты.
                    Проценты мы&nbsp;заплатим за&nbsp;вас.
                </p>
            </div>
        </div>

        <div class="page-inner__content">
            <section class="section-happyness py-20 mb-23 bg-gray-50 sm:py-0 sm:bg-white">
                <div class="wrapper wrapper-1410 overflow-hidden sm:pt-10 sm:pb-11 sm:mb-0 sm:bg-gray-50">
                    <h2 class="h2">Преимущества «Халвы»</h2>
                    <p class="m-0 mb-12 desc-max-size text-xl leading-snug sm:text-lg sm:leading-snug">
                        Кто-то всегда должен платить. Но не&nbsp;всегда это&nbsp;должны делать Вы. С&nbsp;картой «Халва» это&nbsp;работает
                        так: банк получает вознаграждение от&nbsp;партнеров, партнёры – рост продаж, а&nbsp;Вы&nbsp;покупаете,
                        что&nbsp;хотите в&nbsp;рассрочку и без&nbsp;переплат. Выгодно всем!
                    </p>

                    <template v-if="isMobileScreen">
                        <client-only>
                            <BaseMobileSlider
                                :pagination="false"
                                :buttons="true"
                            >
                                <div
                                    v-for="(item) in list"
                                    :key="item.id"
                                    class="swiper-slide px-14 text-center"
                                >
                                    <div
                                        class="section-happyness-ball section-happyness-ball--big mx-auto"
                                        v-html="item.number"
                                    >
                                    </div>
                                    <div class="section-happyness-text"
                                         v-html="item.desc"></div>
                                </div>
                            </BaseMobileSlider>
                        </client-only>
                    </template>

                    <div v-else class="section-happyness-list flex flex-wrap -mx-5">
                        <div
                            v-for="(item) in list"
                            :key="item.id"
                            class="w-1/5 px-5 mb-16 xl:w-1/2 text-center"
                        >
                            <div
                                class="section-happyness-ball section-happyness-ball--big mx-auto"
                                v-html="item.number"
                            >
                            </div>
                            <div class="section-happyness-text" v-html="item.desc"></div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="page-inner-search-wrapper wrapper wrapper-1410">
                <h2>Выберите круизы с&nbsp;рассрочкой</h2>

                <div :class="{ 'disabled': fsrLoading }">
                    <CruiseSectionList
                        v-if="fsrContent && fsrContent.length > 0"
                        class="bg-white"
                        :cruises="fsrContent"
                        :sort-list="sortList"
                        :view-controls="viewControls"
                        :headings="headings"
                        :show-more-visible="fsrShowMoreVisibility"
                        @on-show-more-click="fsrOnSearchMoreClick('/cruise/search', cruiseQuery)"
                    />

                    <div v-else class="wrapper mt-24 xl:pt-16">
                        <p class="p-2 m-0 mb-3 text-center font-medium">
                            Результаты отсутствуют, попробуйте задать другие параметры поиска.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { seoHelper, fetchSearchResult } from '@/mixins/content-helpers';
    import { sfmQueryHasProp, sfmPrepearFormData } from '../../helpers/search';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import CruiseSectionList from '@/components/cruise-section/CruiseSectionList';
    import BaseMobileSlider from '@/components/base/BaseMobileSlider';
    import CruiseBannerCard from '@/components/front-banners/CruiseBannerCard';

    const pageTitle = 'Безпроцентная рассрочка на любой речной круиз по России в 2022 году';
    const metaKeywords = 'Безпроцентная рассрочка при покупке любого речного круиза - по карте Халва';
    const metaDescription = 'Безпроцентная рассрочка при покупке любого речного круиза - по карте Халва';

    const cruiseQuery = {
        ships: '52,53,54', // свирский, бшк, мамин сибиряк
        departure_date_from: '01.01.2022',
    };

    export default {
        components: {
            CruiseBannerCard,
            BaseMobileSlider,
            CruiseSectionList,
            Breadcrumbs,
        },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: pageTitle,
                meta: [
                    { hid: 'title', name: 'title', content: pageTitle },
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: metaKeywords,
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content: metaDescription,
                    },
                    { hid: 'og:title', property: 'og:title', content: pageTitle },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: metaDescription,
                    },
                    { hid: 'og:url', property: 'og:url', content: this.getPageUrl },
                    { hid: 'og:image', property: 'og:image', content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                sortList: [
                    {
                        name: 'departure_date_from',
                        title: 'Дате начала',
                        value: 'asc',
                    },
                    {
                        name: 'price',
                        title: 'Стоимости',
                        value: 'asc',
                    },
                    {
                        name: 'duration',
                        title: 'Продолжительности',
                        value: 'asc',
                    },
                ],
                viewControls: [
                    {
                        name: 'grid',
                        icon: 'GridIcon',
                    },
                    {
                        name: 'list',
                        icon: 'ListIcon',
                    },
                    {
                        name: 'line',
                        icon: 'LineIcon',
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

                title: pageTitle,
                content: {},
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
                list: [
                    {
                        id: 1,
                        number: '0%',
                        desc: `0% за пользование рассрочкой`,
                    },
                    {
                        id: 2,
                        number: 'КЭШБЭК',
                        desc: `За покупки своими деньгами в&nbsp;рассрочку`,
                    },
                    {
                        id: 3,
                        number: `350 000`,
                        desc: `Максимальный лимит до 350 тыс. руб.`,
                    },
                    {
                        id: 4,
                        number: `1080 <span class="ml-2 text-xl leading-none">дней</span>`,
                        desc: `Длительность льготного периода до&nbsp;1080 дней.`,
                    },
                    {
                        id: 5,
                        number: 'FREE',
                        desc: `Бесплатный выпуск и&nbsp;отсутствие годового обслуживания по&nbsp;карте`,
                    },
                ],
                cruiseQuery,
            };
        },
        computed: {
            ...mapGetters(['getWindowWidth']),
            isMobileScreen() {
                return this.getWindowWidth < 1025;
            },
            isWideScreen() {
                return this.getWindowWidth > 1280;
            },
        },
        methods: {
            ...mapActions({
                openModal: 'modals/openModal',
            }),
        },
        async asyncData({ $axios, $dayjs }) {
            let cruises = [],
                fsrContent = [],
                fsrContentMeta = {};

            try {
                const queryParams = sfmPrepearFormData(cruiseQuery, $dayjs);
                const { data } = await $axios.get('/cruise/search', { params: queryParams });
                fsrContent = data.data;
                fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
            }

            return {
                cruises,
                fsrContent,
                fsrContentMeta,
            };
        },
        async beforeRouteUpdate(to, from, next) {
            const query = Object.assign({}, to.query, this.cruiseQuery); // к мете страницы подкидываем квери страницы
            const params = sfmPrepearFormData(query, this.$dayjs);

            if (params && Object.keys(params).length > 0) {
                // подгрузка отсортированных круизов
                if (sfmQueryHasProp(params, ['sort', 'order'])) {
                    await this.fsrSearch('/cruise/search', params);
                }
            }

            next();
        },
    };
</script>

<style lang="scss" scoped>
    .page-inner__content {
        h2 {
            @apply mb-8 text-44 leading-snug text-black-900 xl:text-36 sm:text-28 sm:mb-4 mob:text-2xl;
        }
    }

    .page-akcii-halva {
        &-banner {
            background: url('/images/inner/halva.png') no-repeat right bottom;
            @apply bg-gray-200;
        }

        .page-inner-h1 {
            max-width: 540px;
        }

        .title-max-size {
            max-width: 890px;
        }

        .desc-max-size {
            max-width: 1050px;
        }

        &::v-deep {
            .page-inner-search-wrapper {
                .cruise-section-list .wrapper {
                    padding: 0;
                }
            }
        }
    }

    @screen xl {
        .page-akcii-halva {
            &-banner {
                position: relative;
                background-position: center bottom;

                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                }

                & > .wrapper {
                    position: relative;
                    z-index: 1;
                }
            }
        }
    }

    @screen sm {
        .page-akcii-halva {
            &-banner {
                background-position: center;
                background-size: contain;
            }
        }
    }
</style>
