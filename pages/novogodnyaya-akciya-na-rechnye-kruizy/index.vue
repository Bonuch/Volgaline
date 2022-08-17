<template>
    <div class="page-inner page-year-2022">
        <div class="page-inner-banner pt-6 pb-44 mb-23 text-white sm:mb-14">
            <div class="wrapper">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" :white="true" class="mb-14 sm:mb-10"/>
            </div>

            <div class="wrapper px-23 tablet:px-10 sm:px-4 sm:mb-0">
                <div class="mb-7 sm:mb-10">
                    <div class="relative w-fit">
                        <img src="~/assets/images/inner/percent-left.png" alt="#" class="percent percent-left">
                        <div class="badge badge-fit relative z-2 px-3 text-base font-medium uppercase">Новогодняя акция</div>
                        <img src="~/assets/images/inner/percent-right.png" alt="#" class="percent percent-right">
                    </div>
                </div>

                <h1 class="page-inner-h1 leading-snug text-white mb-4">
                    Скидка до&nbsp;27%* на&nbsp;речные круизы 2022 года
                </h1>
                <p class="m-0 text-22 font-medium mob:text-lg">* Срок акции с 15.12 до 07.01</p>
            </div>
        </div>

        <div class="page-inner__content">
            <section class="mb-23 sm:mb-14">
                <div class="wrapper wrapper-1410">
                    <h2 class="title-max-size">
                        Новогодняя акция от&nbsp;«Волга&nbsp;Лайн» - скидка до&nbsp;27% на&nbsp;круизы
                    </h2>
                    <div class="desc-block">
                        <p class="mb-5">
                            Совсем скоро наступит Новый год, и наша компания не могла оставить своих клиентов без
                            подарков к этому волшебному празднику. Предлагаем скидку на речные круизы 2022 года до 27%
                            при условии покупки тура с 15 декабря 2021.
                        </p>
                        <p class="mb-5">
                            Мы продумали лучшие направления для путешествий, после которых останутся только приятные
                            воспоминания и яркие впечатления. Наши теплоходы «Александр Свирский», «Башкортостан»,
                            «Мамин-Сибиряк» доставят Вас – от Москвы до Санкт-Петербурга, Казани и Перми и даже до
                            Соловецких островов.
                        </p>
                        <p class="m-0">
                            Покупайте выгодные речные туры уже сейчас!
                        </p>
                    </div>
                </div>
            </section>

            <div class="mb-23 sm:mb-14">
                <div class="wrapper wrapper-1410">
                    <div class="warning-block">
                        <div class="warning-block-left">
                            <p>
                                Внимание! Цены указаны без&nbsp;учета скидки.
                                Актуальную цену уточняйте у&nbsp;менеджеров
                                по&nbsp;телефону!
                            </p>
                        </div>

                        <div class="warning-block-right">
                            <div class="warning-block-phone">
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        class="fill-current"
                                        d="M34.9509 24.9426C32.6244 24.9426 30.34 24.5788 28.1753 23.8634C27.1146 23.5016 25.8106 23.8335 25.1632 24.4984L20.8905 27.7239C15.9354 25.0788 12.8831 22.0275 10.2742 17.1096L13.4047 12.9482C14.218 12.136 14.5098 10.9494 14.1602 9.83616C13.4418 7.66007 13.0768 5.3768 13.0768 3.0493C13.0769 1.3679 11.709 0 10.0277 0H3.0492C1.3679 0 0 1.3679 0 3.0492C0 22.3213 15.6788 38 34.9509 38C36.6322 38 38.0001 36.6321 38.0001 34.9508V27.9918C38 26.3105 36.6321 24.9426 34.9509 24.9426Z"
                                        fill="#006BAD"></path>
                                </svg>

                                <a href="tel:+74994606349" rel="nofollow">+7 (499) 460-63-49</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page-inner-search-wrapper wrapper wrapper-1410">
                <h2>Все круизы с&nbsp;новогодней скидкой 27%</h2>

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
    import { sfmQueryHasProp, sfmPrepearFormData } from '@/helpers/search';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import CruiseSectionList from '@/components/cruise-section/CruiseSectionList';

    const pageTitle = 'Скидка до 27% на речные круизы при условии покупки тура с 15 декабря';
    const metaKeywords = 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы';
    const metaDescription = 'Скидка до 27% на речные круизы при условии покупки тура с 15 декабря';

    const cruiseQuery =  {
        ships: '52,53,54', // свирский, бшк, мамин сибиряк
        departure_date_from: '01.01.2022',
    };

    export default {
        components: {
            CruiseSectionList,
            Breadcrumbs,
        },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: pageTitle,
                meta: [
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
            mapedShips() {
                return this.ships.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        link: item.slug,
                        image: item.image,
                    };
                });
            },
        },
        methods: {
            ...mapActions({
                openModal: 'modals/openModal',
            }),
        },
        async asyncData({ $axios, $dayjs }) {
            let fsrContent = [],
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
    .page-inner {
        .percent {
            position: absolute;
            z-index: 1;

            &-left {
                left: -41px;
                bottom: -33px;
            }

            &-right {
                right: -33px;
                top: -23px;
            }
        }

        &-banner {
            background: #DE2831 url('/images/inner/year-2022-bg.jpg') no-repeat center top / cover;
            color: #fff;
        }

        .page-inner-h1 {
            max-width: 676px;
        }

        .desc-block {
            p {
                @apply text-lg leading-normal sm:text-base sm:leading-relaxed;
            }
        }

        &::v-deep {
            .page-inner-search-wrapper {
                .cruise-section-list .wrapper {
                    padding: 0;
                }
            }
        }
    }

    .page-inner__content {
        h2 {
            @apply mb-8 text-44 leading-snug text-black-900 xl:text-36 sm:text-28 sm:mb-4 mob:text-2xl;
        }
    }

    @screen xs {
        .page-inner {
            &-banner {
                position: relative;
                padding-bottom: 77%;
                background-image: none;
                @apply bg-red-400;

                &:after {
                    content: '';
                    position: absolute;
                    z-index: 0;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 0;
                    padding-bottom: 77%;
                    background: url('/images/inner/year-2022-mob.png') no-repeat center -34px;
                }
            }
        }
    }
</style>
