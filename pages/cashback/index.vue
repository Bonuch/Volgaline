<template>
    <div class="page-inner page-cashback pt-6">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-14"/>
            <h1 class="hidden">{{ title }}</h1>
        </div>

        <div class="inner-cruises-top-banner relative pt-6 pb-14 z-10 bg-no-repeat bg-center bg-cover mb-15 lg:mb-14">
            <picture class="w-full h-full absolute left-0 top-0 z-0">
                <source media="(max-width: 640px)" srcset="~/assets/images/inner/cashback/mob.jpg">
                <img class="object-cover w-full h-full" alt="info_1" src="~/assets/images/inner/cashback/desk.jpg">
            </picture>
            <div class="wrapper relative z-2">
                <div class="px-12 pt-16 xl:px-0">
                    <span class="text-white text-50 mb-8 sm:mb-5 px-5 sm:px-2 inline-block tablet:text-30">Уважаемые туристы!</span>
                    <h3 class="mb-6 mob:mb-4 lg:mb-8 sm:mb-5 font-medium text-36 tablet:text-25 sm:text-lg text-black-900 flex flex-col items-start relative overflow-hidden leading-none">
                        <span class="xl:hidden pt-4 pb-3  pr-3 pl-5 bg-green-200 rounded-tr-sm rounded-br-sm rounded-tl-sm -mb-0.5">Программа лояльности для держателей карт «Мир»</span>
                        <span class="xl:hidden pb-4 pl-5 pr-3 bg-green-200 rounded-tr-sm rounded-br-sm rounded-bl-sm"> закрывается досрочно!</span>

                        <span class="xl:block hidden sm:hidden pt-4 pb-3  pr-3 pl-5 bg-green-200 rounded-tr-sm rounded-br-sm rounded-tl-sm -mb-0.5">Программа лояльности для держателей </span>
                        <span class="xl:block hidden sm:hidden xl:pb-4 pl-5 pr-3 bg-green-200 rounded-tr-sm rounded-br-sm  rounded-bl-sm">карт «Мир» закрывается досрочно!</span>

                        <span class="sm:block hidden pt-4 sm:pt-0  pr-3 pl-5 bg-green-200 rounded-tr-sm rounded-tl-sm -mb-0.5">Программа лояльности </span>
                        <span class="sm:block hidden py-0 pr-8 pl-5 bg-green-200 -mb-0.5">для держателей карт </span>
                        <span class="sm:block hidden xl:pb-4 sm:pb-0 pl-5 pr-3 bg-green-200 rounded-tr-sm rounded-br-sm  rounded-bl-sm">«Мир» закрывается досрочно!</span>
                    </h3>
                    <span class="text-white text-36 xl:text-25 tablet:text-lg mb-14 lg:mb-16 px-5 lg:px-8 tablet:pl-5 block sm:pl-2">Успейте купить тур с КешБэком до 15 апреля 2022 года</span>

                </div>
            </div>
        </div>

        <div class="page-inner__content">

            <section class="cashback-info mb-20">
                <div class="wrapper wrapper-1410 text-center">
                    <h2>Путешествуй по России с кешбэком 20%</h2>
                    <p class="m-0 text-xl leading-snug">
                        С 15 марта по 15 апреля 2022 года получайте кешбэк 20% при оплате путешествия картой «Мир»,
                        зарегистрированной в Программе лояльности для держателей карт «Мир». Отправиться в путешествие
                        можно на 2 и более ночи с 15 марта по 30 июня включительно. Максимальный размер кешбэка за одну
                        операцию — 20 000 рублей.
                    </p>
                </div>
            </section>


            <section class="cashback-advantages mb-10">
                <div class="wrapper wrapper-1410 overflow-hidden">
                    <h2 class="text-center">Как это работает?</h2>

                    <div class="cashback-advantages-list flex flex-wrap -mx-6 sm:mx-0">
                        <div
                            v-for="advantage in advantages"
                            :key="advantage.id"
                            class="cashback-advantages-item w-1/4 px-3 mb-10 xl:w-1/2 xl:text-center sm:w-full sm:px-0"
                        >
                            <div class="h-full pt-10 pb-7 px-5 bg-blue-900 text-white rounded-sm">
                                <img class="cashback-advantages-icon block mx-auto mb-10" :src="advantage.icon" alt="#">
                                <div class="cashback-advantages-desc text-lg leading-snug"
                                     v-html="advantage.desc"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="wrapper wrapper-1060 overflow-hidden mb-20">
                <p class="block py-6 px-5 mb-10 text-2xl leading-snug font-medium text-center border border-gray-50 rounded-sm">
                    Количество операций по одной карте не ограничено,<br>
                    можно получить кешбэк несколько раз.
                </p>

                <div class="text-center text-xl leading-snug leading-snug">
                    <p class="font-medium">
                        Совершить покупки с кешбэком 20% Вы можете с 15 марта по 15 апреля 2022г.
                    </p>
                    <p>
                        С более подробной информацией об акции вы можете ознакомиться на
                        <a href="https://xn--b1afakdgpzinidi6e.xn--p1ai/" target="_blank" class="link-inline">мирпутешествий.рф</a>.
                    </p>
                    <p>
                        Соглашение с платежной системой «Мир» - <a href="https://privetmir.ru/russiatravel/rules.pdf"
                                                                   class="link-inline" target="_blank">ознакомиться</a>
                    </p>
                </div>

                <div class="text-center">
                    <a href="https://privetmir.ru/russiatravel/" class="button" target="_blank">
                        Зарегистрироваться
                    </a>
                </div>
            </div>

            <div class="page-inner-search-wrapper wrapper wrapper-1410">
                <h2 class="text-center">Круизы с кэшбэком</h2>

                <div :class="{ 'disabled': fsrLoading }">
                    <client-only>
                        <CruiseSectionList
                            v-if="fsrContent && fsrContent.length > 0"
                            class="bg-white"
                            :cruises="fsrContent"
                            :sort-list="sortList"
                            :view-controls="viewControls"
                            :headings="headings"
                            :show-more-visible="fsrShowMoreVisibility"
                            v-on:on-show-more-click="searchMore"
                        />
                    </client-only>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { seoHelper, fetchSearchResult } from '@/mixins/content-helpers';
    import { sfmPrepearFormData } from '@/helpers/search';
    import Breadcrumbs from '@/components/base/Breadcrumbs';

    const pageTitle = 'Кешбэк 20% от Ростуризма и карты "Мир" на теплоходные круизы';
    const metaKeywords = 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы';
    const metaDescription = 'Более 300 теплоходных туров по всей России со кешбэком 20%.  Акция продлится с 18 января по 15 апреля 2022 года. Отправиться в путешествие можно на 2 и более ночи.';

    const cruiseQuery =  {
        departure_date_from: '15.03.2022',
        departure_date_to: '30.06.2022',
        duration: '3,4,5,6,7',
        order: 'asc',
        ships: '52,53,54'
    };

    export default {
        components: {
            CruiseSectionList: () => import('@/components/cruise-section/CruiseSectionList'),
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
                advantages: [
                    {
                        id: 1,
                        desc: `Зарегистрируйте вашу карту «Мир» <a target="_blank" href="https://privetmir.ru/">банка-участника</a>
                            в Программе лояльности для держателей карт «Мир»
                            <span>со списком банков-участников можно ознакомиться <a href="https://privetmir.ru/bank/">по ссылке</a></span>`,
                        icon: '/images/inner/cashback/1.png',
                    },
                    {
                        id: 2,
                        desc: `Выберите проживание от 2 ночей в период с 15 марта по 30 июня включительно.`,
                        icon: '/images/inner/cashback/2.png',
                    },
                    {
                        id: 3,
                        desc: `С 00:01 мск 15 марта по 15 апреля включительно оплатите полную стоимость поездки зарегистрированной картой «Мир».`,
                        icon: '/images/inner/cashback/3.png',
                    },
                    {
                        id: 4,
                        desc: `Кешбэк в размере 20% от суммы бронирования, но не более 20 000 рублей за одну бронь, придет в срок до 5 рабочих дней с момента оплаты`,
                        icon: '/images/inner/cashback/4.png',
                    },
                ],
            };
        },
        computed: {
            ...mapGetters(['getWindowWidth']),
            isWideScreen() {
                return this.getWindowWidth > 1280;
            },
            isMobileScreen() {
                return this.getWindowWidth < 1025;
            },
        },
        methods: {
            ...mapActions({
                openModal: 'modals/openModal',
            }),
            searchMore()
            {
                this.fsrOnSearchMoreClick('/cruise/search', cruiseQuery);
            }
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
            const query = Object.assign({}, to.query, cruiseQuery); // к мете страницы подкидываем квери страницы
            const params = sfmPrepearFormData(query, this.$dayjs);
            await this.fsrSearch('/cruise/search', params);
            next();
        },
    };
</script>

<style lang="scss" scoped>
    .page-cashback {
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
            @apply mb-8 text-44 text-black-900 xl:text-36 sm:text-28 mob:text-2xl;
        }
    }

    .subtitle-banner{
        max-width: 490px;
    }
</style>
