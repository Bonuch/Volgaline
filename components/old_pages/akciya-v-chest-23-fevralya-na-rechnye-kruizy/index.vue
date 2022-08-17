<template>
    <div class="page-inner page-akcii-na-navigacii">
        <div class="page-akcii-na-navigacii-banner pt-6 pb-32 text-white">
            <div class="wrapper pl-64 3xl:pl-10 sm:pl-4">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" :white="true" class="mb-14"/>
            </div>

            <div class="wrapper px-64 3xl:px-10 tablet:px-10 sm:px-4 sm:mb-4">
                <h1 class="page-inner-h1 leading-tight text-white mb-10 sm:mb-5 sm:bg-blue-900 sm:bg-opacity-70 rounded-sm sm:p-2">
                    <span class="block">
                        <span class="bg-white sm:bg-opacity-0 sm:text-white text-red-500 rounded-sm sm:rounded-none px-2 sm:px-0">Скидка 23%</span>
                        в честь
                    </span>
                    <span class="block">
                        Дня защитника Отечества
                    </span>
                </h1>
                <p class="subtitle-banner m-0 text-22 sm:text-sm font-medium mob:text-lg text-black-900 2xl:full sm:font-bold bg-white rounded-sm py-5 px-7">И это ещё не всё, <span class="text-red-500">дарим + 3% скидку</span>
                    нашим постоянным клиентам</p>
            </div>
        </div>

        <div class="page-inner__content">
            <section class="mb-9" style="display: none">
                <div class="wrapper wrapper-1410">
                    <p class="mb-4  text-30 leading-snug lg:text-22 text-center sm:text-left font-bold sm:text-base">
                        Только в феврале максимальная выгода на покупку речного круиза
                    </p>
                    <p class="mb-4 text-30 leading-snug lg:text-22 text-center sm:text-left sm:text-base text-red-500">
                        Скидки:
                    </p>
                    <p class="mb-4 text-30 leading-snug lg:text-22 text-center sm:text-left sm:text-base">
                        <span class="text-red-500">23%</span> (в честь праздника) + <span class="text-red-500">3%</span> (постоянным клиентам) + <span class="text-red-500">20%</span> (Государственый Кешбэк) = <span class="text-red-500">46%</span>
                    </p>
                    <p class="mb-4 text-30 leading-snug lg:text-22 text-center sm:text-left sm:text-base">
                    </p>
                </div>
            </section>

            <section class="section-happyness py-20 mb-23 bg-gray-50 sm:py-0 sm:bg-white">
                <div class="wrapper wrapper-1410 overflow-hidden sm:pt-10 sm:pb-11 sm:mb-0 sm:bg-gray-50">
                    <h2 class="section-happyness-title">С Вас хорошее настроение, а&nbsp;с&nbsp;нас:</h2>

                    <template v-if="isMobileScreen">
                        <client-only>
                            <BaseMobileSlider
                                :pagination="false"
                                :buttons="true"
                            >
                                <div
                                    v-for="(item) in list"
                                    :key="item.id"
                                    class="swiper-slide px-14"
                                >
                                    <div
                                        class="section-happyness-ball mx-auto">
                                        {{ item.number }}
                                    </div>
                                    <div class="section-happyness-text"
                                         v-html="item.desc"></div>
                                </div>
                            </BaseMobileSlider>
                        </client-only>
                    </template>

                    <div v-else class="section-happyness-list flex flex-wrap -mx-7">
                        <div
                            v-for="(item) in list"
                            :key="item.id"
                            class="w-1/4 px-7 mb-16 xl:w-1/2"
                        >
                            <div
                                class="section-happyness-ball"
                            >
                                {{ item.number }}
                            </div>
                            <div class="section-happyness-text" v-html="item.desc"></div>
                        </div>
                    </div>
                </div>

                <div class="wrapper wrapper-1410">
                    <div
                        class="py-14 px-16 mb-14 bg-white text-black-900 text-2xl leading-snug font-medium rounded-lg text-center lg:px-0 tablet:pt-10 tablet:pb-14 tablet:mb-0 mob:text-xl"
                    >
                        Успейте воспользоваться нашими акциями и&nbsp;запланируйте интересный отпуск в&nbsp;августе
                        уже&nbsp;сейчас!
                    </div>

                    <div class="warning-block overflow-hidden">
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
            </section>

            <div class="page-inner-search-wrapper wrapper wrapper-1410">
                <h2>Круизы со скидкой на навигацию 2022</h2>

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
import {mapGetters, mapActions} from 'vuex';
import {seoHelper, fetchSearchResult} from '@/mixins/content-helpers';
import { sfmQueryHasProp, sfmPrepearFormData } from '../../../helpers/search';
import Breadcrumbs from '@/components/base/Breadcrumbs';
import CruiseSectionList from '@/components/cruise-section/CruiseSectionList';
import BaseMobileSlider from '@/components/base/BaseMobileSlider';
import CruiseBannerCard from '@/components/front-banners/CruiseBannerCard';

const pageTitle = 'Скидка 23% в честь дня защитника отечества';
const metaKeywords = 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы';
const metaDescription = 'Компания «Волга Лайн» организует акции на навигации 2022';

const cruiseQuery =  {
    ships: '52,53', // свирский, бшк
    departure_date_from: '01.06.2022',
    departure_date_to: '31.08.2022',
    duration: '1,2,3,4,5,6,7',
    order: 'asc',
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
                { hid: "title", name: "title", content: this.getPageTitle() },
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
                {hid: 'og:title', property: 'og:title', content: pageTitle},
                {hid: 'og:type', property: 'og:type', content: 'website'},
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: metaDescription,
                },
                {hid: 'og:url', property: 'og:url', content: this.getPageUrl},
                {hid: 'og:image', property: 'og:image', content: this.getOgImage()},
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
                    number: 1,
                    desc: `Уютные и современные каюты, оснащенные всем необходимым,`,
                },
                {
                    id: 2,
                    number: 2,
                    desc: `Интересные развлечения на борту во время круиза,`,
                },
                {
                    id: 3,
                    number: 3,
                    desc: `Насыщенная экскурсионная программа в пунктах назначения,`,
                },
                {
                    id: 4,
                    number: 4,
                    desc: `А главное – яркие эмоции и незабываемые впечатления.`,
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
    async asyncData({$axios, $dayjs}) {
        let cruises = [],
            fsrContent = [],
            fsrContentMeta = {};
        // TODO ?
        // try {
        //     const {data} = await $axios.get('/akcii-23-fevralya');
        // } catch (ex) {
        //     console.log('cant find promo ships: ' + ex);
        // }

        try {
            const queryParams = sfmPrepearFormData(cruiseQuery, $dayjs);
            const {data} = await $axios.get('/cruise/search', {params: queryParams});
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

.page-akcii-na-navigacii {
    &-banner {
        background: #6CE7A4 url('/frontend/static/images/inner/23-fevralya.jpg') no-repeat center top / cover;
    }

    .page-inner-h1 {
        max-width: 900px;
        @apply normal-case text-60 xl:text-40 lg:text-36 sm:text-30 font-medium sm:font-bold;
    }

    .title-max-size {
        max-width: 890px;
    }

    .desc-max-size {
        max-width: 1050px;
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

    &::v-deep {
        .page-inner-search-wrapper {
            .cruise-section-list .wrapper {
                padding: 0;
            }
        }
    }
}

.subtitle-banner{
    max-width: 490px;
}

@screen sm {
    .page-akcii-na-navigacii {
        &-banner {
            background: url('/frontend/static/images/inner/23-fevralya-mob.jpg') no-repeat center top / cover;
        }
    }
}
</style>
