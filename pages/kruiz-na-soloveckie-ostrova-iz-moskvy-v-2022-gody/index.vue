<template>
    <div class="page-inner page-solovki">
        <div class="bg-solovki pt-6 pb-11 mb-20 text-white md:pb-6 sm:mb-7">
            <div class="wrapper text-white">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-16 sm:mb-10"/>

                <div class="px-14 sm:px-0">
                    <div class="bg-text mb-10">
                        <h1 class="title-solov page-inner-h1 leading-snug text-white mb-9 sm:mb-5">{{ title }}</h1>
                        <p class="bg-text-description m-0 text-22 leading-snug font-medium">
                            Приглашаем в увлекательное путешествие из Москвы на Соловецкие острова.
                            Открыто бронирование на 2022 год – лучшие каюты на теплоходе «Мамин-Сибиряк» ждут вас!
                        </p>
                    </div>

                    <!--div class="flex sm:flex-col">
                        <button
                            type="button"
                            class="button p-6 mr-7 text-center text-xl leading-none sm:px-6 sm:mb-4 sm:w-full sm:text-lg"
                            @click="onBookingClick('cruises')"
                        >
                            Забронировать
                        </button>

                        <div class="callback">
                            <a
                                href="tel:74994041803"
                                class="button-whats button py-5 px-8 text-xl flex justify-center bg-green-500 text-center sm:px-6 sm:text-lg mob:text-base"
                                rel="nofollow"
                            >
                                <svg class="mr-3" width="30" height="30" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 30L2.58 22.2605C1.27086 20.0586 0.517241 17.489 0.517241 14.7414C0.517241 6.6 7.11724 0 15.2586 0C23.4 0 30 6.6 30 14.7414C30 22.8828 23.4 29.4828 15.2586 29.4828C12.7816 29.4828 10.4488 28.8688 8.4 27.7898L0 30Z"
                                        fill="white"/>
                                    <path
                                        class="fill-current"
                                        d="M24.6598 19.6475C23.9791 18.3611 21.4689 16.89 21.4689 16.89C20.901 16.5663 20.2156 16.53 19.8918 17.1073C19.8918 17.1073 19.0762 18.0854 18.8687 18.2261C17.9212 18.868 17.0434 18.8431 16.1574 17.9571L14.0982 15.898L12.0391 13.8388C11.153 12.9528 11.1282 12.075 11.7701 11.1275C11.9108 10.92 12.8889 10.1044 12.8889 10.1044C13.4662 9.78005 13.4299 9.09522 13.1062 8.52729C13.1062 8.52729 11.6351 6.01712 10.3487 5.33643C9.8015 5.04677 9.1296 5.14815 8.69201 5.58574L7.7827 6.49505C4.89805 9.3797 6.31839 12.6363 9.20305 15.5209L11.8394 18.1573L14.4758 20.7937C17.3605 23.6783 20.617 25.0987 23.5017 22.214L24.411 21.3047C24.8486 20.8661 24.9494 20.1942 24.6598 19.6475Z"
                                    />
                                </svg>

                                <span>Или напишите нам на Whatsapp</span>
                            </a>
                        </div>
                    </div-->
                </div>
            </div>
        </div>

        <div class="wrapper wrapper-1410 mb-14 overflow-hidden">
            <div class="flex flex-wrap -mx-4 md:flex-col lg:flex-row">
                <div
                    v-for="(item, idx) in advantagesList"
                    :key="idx"
                    class="w-1/3 px-4 mb-8 xl:w-1/2 md:w-full"
                >
                    <div class="h-full py-10 px-6 border border-gray-100 md:p-6">
                        <h3 class="cart-title text-blue-700 text-36 leading-1-1 mb-8 lg:text-2xl md:mb-2"
                            v-html="item.title"></h3>
                        <div class="text-xl text-black-900 lg:text-lg" v-html="item.desc"></div>
                    </div>
                </div>
            </div>
        </div>

        <section class="map mb-23 pt-20 pb-23 sm:pt-12 sm:pb-14 sm:mb-14">
            <div class="wrapper wrapper-1410">
                <div class="map-desc mb-23 sm:mb-7">
                    <h2 class="map-desc__title uppercase mb-6 sm:normal-case">Почему стоит побывать<br>на Соловецких островах</h2>
                    <p class="map-desc__subtitle">Соловецкий архипелаг – крупнейший на Белом
                        море, состоящий из 6 больших и около 100 маленьких островов всего в 160 км от Северного
                        Полярного круга.</p>
                    <p class="map-desc__subtitle">Такое расположение сказывается на
                        своеобразности природных локаций с уникальной экосистемой, до которых практически не дотянулась
                        цивилизация.</p>
                    <p class="map-desc__subtitle">Это охраняемая заповедная зона, которой
                        присвоен статус государственного историко-архитектурного и природного музея-заповедника. </p>
                </div>

                <div class="map-slider">
                    <h3 class="slider-title map-desc mb-10 uppercase sm:normal-case">
                        Побывать на Соловках однозначно стоит каждому
                        туристу, и вот для чего:
                    </h3>

                    <div class="map-slider__items swiper-container">
                        <div class="swiper-wrapper">
                            <div
                                class="swiper-slide slider-item"
                                v-for="(item,index) of slider_items"
                                :key="index"
                            >
                                <div class="map-slider__item flex flex-col rounded-sm overflow-hidden">
                                    <img :src="item.url_img" :alt="item.alt">
                                    <p class="map-slider__item--desc flex-1-1 p-5 m-0 bg-white text-xl leading-normal font-medium sm:py-3 sm:px-2 sm:text-lg">
                                        {{ item.text }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            class="swiper-button swiper-button-prev m-0 flex items-center justify-center text-white bg-blue-300"
                        >
                            <svg width="12" height="19" viewBox="0 0 12 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                    fill="white"
                                />
                            </svg>
                        </button>

                        <button
                            type="button"
                            class="swiper-button swiper-button-next m-0 flex items-center justify-center text-white bg-blue-300"
                        >
                            <svg class="transform rotate-180" width="12" height="19" viewBox="0 0 12 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <div class="wrapper wrapper-1410 mb-16 font-medium text-40 leading-snug sm:text-2xl">
            <p class="m-0">
                Соловецкие острова – удивительный край, в котором мы предлагаем побывать и вам. В 2022 году наш речной
                круиз пройдет по маршруту, который затронет сразу несколько городов.
            </p>
        </div>

        <FrontForm title="Оставьте заявку в этой<br>форме и мы подберем круиз!" bg-color="bg-blue-300"/>

        <div
            v-if="cruiseRoutes && cruiseRoutes.length > 0"
            class="cruise-detail__content mb-23 pt-25 pb-32 bg-gray-50 sm:py-14 sm:mb-0"
        >
            <div class="wrapper-1410 mx-auto">
                <Roads title="О нашем речном круизе" :content="cruiseRoutes"/>
            </div>
        </div>

        <div class="wrapper wrapper-1410 mb-23 sm:px-0 sm:mb-14">
            <div class="ship rounded-sm overflow-hidden sm:rounded-none">
                <div class="ship-text text-white mb-15">
                    <h2 class="title-solov page-inner-h1 leading-snug text-white mb-6">
                        На чем пойдем на Соловки?
                    </h2>
                    <p class='m-0 text-2xl leading-normal font-medium'>
                        Мы предлагаем отправиться в прямые рейсы на Соловецкие острова из Москвы. Путешествие пройдет на
                        теплоходе «Мамин-Сибиряк», рассчитанном на 60 посадочных мест.
                    </p>
                </div>

                <div class="ship-slider swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="ship-cart swiper-slide py-5">
                            Компактный, уютный, сохранивший в оформлении атмосферу ретро-стиля, он идеально подходит для
                            круиза в самые отдаленные уголки России.
                        </div>
                        <div
                            class="ship-cart swiper-slide py-5 px-6">
                            На двухпалубном судне есть все необходимое для комфортного времяпровождения:
                            ресторан и бар, салон
                            отдыха, медицинский пункт.
                        </div>
                        <div
                            class="ship-cart swiper-slide py-5 px-6">
                            В каждой каюте кроме спальных мест на одного, двоих или троих гостей имеются телевизор,
                            холодильник, душ, туалет и умывальник.
                        </div>
                    </div>

                    <div class="ship-button">
                        <button
                            type="button"
                            class="swiper-button swiper-button-prev m-0 flex items-center justify-center text-white bg-blue-300"
                        >
                            <svg width="12" height="19" viewBox="0 0 12 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                    fill="white"
                                />
                            </svg>
                        </button>

                        <button
                            type="button"
                            class="swiper-button swiper-button-next m-0 flex items-center justify-center text-white bg-blue-300"
                        >
                            <svg class="transform rotate-180" width="12" height="19" viewBox="0 0 12 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="cruiseCabinPhotos && cruiseCabinPhotos.length > 0" class="mb-24 gallery wrapper wrapper-1410 sm:mb-14">
            <h3 class="title-solov page-inner-h1 leading-snug mb-12">Фотографии кают</h3>

             <div class="cruise-detail-gallery swiper-container">
                    <div class="swiper-wrapper cruise-detail-lightgallery-wrap">
                        <a
                            v-for="(item, itemIdx) in cruiseCabinPhotos"
                            :key="`cruise-detail-gallery-item-${itemIdx}`"
                            class="swiper-slide cruise-detail-gallery__slide rounded-sm overflow-hidden image-loop-hover"
                            :href="item.image_900_600"
                        >
                            <img :src="item.image_330_270" :alt="title">
                        </a>
                    </div>

                    <button
                        type="button"
                        class="cruise-detail-gallery__btn swiper-button swiper-button-prev"
                    >
                        <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                fill="white"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        class="cruise-detail-gallery__btn swiper-button swiper-button-next"
                    >
                        <svg class="transform rotate-180" width="12" height="19" viewBox="0 0 12 19" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
        </div>

        <div class="bg-desc bg-blue-300 mb-23 sm:mb-14">
            <div class="wrapper wrapper-1410 py-14 sm:py-10 md:py-10">
                <p class="text-center text-white font-medium text-2xl">
                    Уже открыто бронирование на 2022 год, поэтому у вас есть прекрасная возможность забронировать лучшие
                    каюты на наших суднах. В рейсы отправится теплоход «Мамин-Сибиряк», Предоставляем скидки при раннем
                    бронировании!
                </p>
            </div>
        </div>

        <div id="cruises" class="wrapper wrapper-1410">
            <h2 class="page-inner-h1 leading-snug mb-12">
                Все круизы на соловецкие острова
            </h2>

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

            <p v-else class="m-0">Круизы по данному направлению отсутствуют</p>
        </div>
        <div v-if="full_text" class="desc-seo wrapper wrapper-1410 mt-10" v-html="full_text"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle';
    import { seoHelper, fetchSearchResult } from '@/mixins/content-helpers';
    import { sfmQueryHasProp, sfmPrepearFormData } from '../../helpers/search';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import FrontForm from '@/components/front/FrontForm';
    import CruiseDetailGallery from '@/components/cruise-detail/CruiseDetailGallery';
    import Roads from '@/components/cruise-detail/tabs/CruiseDetailRoads';
    import CruiseSectionList from '@/components/cruise-section/CruiseSectionList';

    const pageTitle = 'Круиз на Соловецкие острова из Москвы в 2022 году';
    const seoTitle = 'Речные круизы 2021 г на Соловецкие острова из Москвы - расписание и цены';
    const metaKeywords = 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы';
    const metaDescription = 'Компания «Волга Лайн» организует речные круизы на Соловецкие острова в 2022 году. Прямой рейс на теплоходе из Москвы на Соловки без пересадок';

    const cruiseQuery =  {
        departure_points: 7, // москва
        route_points: 348, // id соловков
        ships: 54, // мамин сибиряк
        departure_date_from: '01.01.2022',
    };

    export default {
        components: {
            CruiseSectionList,
            Breadcrumbs,
            FrontForm,
            Roads,
            CruiseDetailGallery,
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
                    { hid: 'og:title', property: 'og:title', content: seoTitle },
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
        jsonld() {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                'headline': seoTitle,
                'image': this.getOgImage(),
                'keywords': metaKeywords,
                'description': metaDescription,
                'url': this.getPageUrl,
            };
        },
        data() {
            return {
                cruiseQuery,
                title: pageTitle,
                cruiseRoutes: [],
                cruiseCabinPhotos: [],
                full_text:'',
                slider_items: [
                    {
                        url_img: '/images/solovki/1.png',
                        text: 'Охватить сразу пять рек (Волга, Шексна, Ковжа, Вытегра, Нева), три озера (Ладожское, Онежское и Белое) и три канала всего за одно путешествие.',
                        alt: 'Карта навигации',
                    },
                    {
                        url_img: '/images/solovki/slider__img__2.png',
                        text: 'Поклониться православным реликвиям Соловецкого монастыря, куда ежегодно приезжает до 20 тыс. паломников..',
                        alt: 'Соловецкие иконы',
                    },
                    {
                        url_img: '/images/solovki/slider__img__3.png',
                        text: 'Увидеть невероятных белух прямо с берега на единственном в мире месте – Белужьем мысу. Главное – не шуметь и не пугать этих удивительных морских обитателей!',
                        alt: 'Белуха - Белужий мыс',
                    },
                    {
                        url_img: '/images/solovki/slider__img__4.png',
                        text: 'Взобраться на Секирную гору и поразиться фантастическим видам на остров и Белое море с высоты.',
                        alt: 'Секирная гора',
                    },
                    {
                        url_img: '/images/solovki/slider__img__5.png',
                        text: 'Лабиринты большого заяцкого острова',
                        alt: 'Лабиринты большого заяцкого острова',
                    },
                ],
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
                advantagesList: [
                    {
                        title: 'Раннее<br>бронирование - 7%',
                        desc: 'Наша круизная компания открывает раннее бронирование на 2022 год на самое популярное туристическое направление — легендарные Соловецкие острова.',
                    },
                    {
                        title: 'Путешествие<br> за 12 дней',
                        desc: 'Мы предлагаем путешествие по самому короткому круизному маршруту, который займет всего 12 дней туда и обратно. Круиз начинается в Москве.',
                    },
                    {
                        title: 'Места «силы» с<br> стойкости духа',
                        desc: 'Окажетесь в удивительном крае, который порадует загадочными лабиринтами, историями о племенах карел и саамов, рассказами о православных подвижниках и заключенных лагерей.',
                    },
                ],
            };
        },
        methods: {
            initSwiperMap() {
                const $el = this.$el;
                const el = $el.querySelector('.ship-slider');
                const buttons = $el.querySelectorAll('.swiper-button');
                let prev = buttons[2];
                let next = buttons[3];

                if ($el && el) {
                    const bannersSwiper = new Swiper(el, {
                        spaceBetween: 20,
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
                        },
                        breakpoints: {
                            1024: {
                                slidesPerView: 1,
                            },
                            1025: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        },
                    });
                }
            },
            initSwiper() {
                const $el = this.$el;
                const el = $el.querySelector('.map-slider__items');
                const buttons = $el.querySelectorAll('.swiper-button');
                let prev = buttons[0];
                let next = buttons[1];

                if ($el && el) {
                    const bannersSwiper = new Swiper(el, {
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
                        },
                        breakpoints: {
                            320: {
                                slidesPerView: 1.5,
                                spaceBetween: 40,
                            },
                            767: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        },
                    });
                }
            },
            onBookingClick(block) {
                const $el = this.$el;
                const el = $el.querySelector(`#${block}`);

                if ($el && el) {
                    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
                }
            },
            initGallerySwiper() {
                const $el = this.$el;
                const el = $el.querySelector('.cruise-detail-gallery');

                if ($el && el) {
                    const bannersSwiper = new Swiper(el, {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        navigation: {
                            prevEl: `.cruise-detail-gallery__btn.swiper-button-prev`,
                            nextEl: `.cruise-detail-gallery__btn.swiper-button-next`,
                        },
                        breakpoints: {
                            641: {
                                slidesPerView: 2,
                            },
                            993: {
                                slidesPerView: 4,
                            },
                        },
                    });
                }
            },
            initGalleryLightgallery() {
                const $el = this.$el;

                if ($el) {
                    const galleryWrap = $el.querySelector(".cruise-detail-lightgallery-wrap");
                    if (galleryWrap) window.lightGallery(galleryWrap, { download: false });
                }
            },

        },
        mounted() {
            this.initSwiper();
            this.initSwiperMap();
            this.initGallerySwiper();
            this.initGalleryLightgallery();
        },
        async asyncData({ $axios, $dayjs }) {
            let cruiseRoutes = [],
                cruiseCabinPhotos = {},
                fsrContent = [],
                fsrContentMeta = {},
                full_text = '';
            const FirstCruise =  $axios.get(`/getFirstCruiseByDirection/19257`);
            const queryParams = sfmPrepearFormData(cruiseQuery, $dayjs);
            const search = $axios.get('/cruise/search', { params: queryParams });
            const text = $axios.get('kruiz-na-soloveckie-ostrova-iz-moskvy-v-2022-gody');
            try {
                let cruiseData = await FirstCruise;
                cruiseData = cruiseData.data.data;
                cruiseRoutes = cruiseData.routes_by_day;
                cruiseCabinPhotos = cruiseData.ship.photo;
            } catch (ex) {
                console.log('cant fetch cruise direction: ' + ex);
            }

            try {
                const response = await search;
                fsrContent = response.data.data;
                fsrContentMeta = response.data.meta;
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
            }

            try{
                full_text = await  text;
                full_text = full_text.data.content.full_text
            }catch (e){
                console.log('full-text error');
            }

            return {
                cruiseRoutes,
                cruiseCabinPhotos,
                fsrContent,
                fsrContentMeta,
                full_text
            };
        },
        async beforeRouteUpdate(to, from, next) {
            const query = Object.assign({}, to.query, this.cruiseQuery); // к мете страницы подкидываем квери соловков
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
    .page-solovki {
        &::v-deep {
            .cruise-detail-tab-content__title {
                padding: 0;
            }

            .cruise-section-list .wrapper {
                padding: 0;
            }
        }

        .button-whats {
            svg {
                @apply text-green-500;
            }

            &:hover,
            &:focus {
                @apply bg-blue-300 text-white;

                svg {
                    @apply text-blue-300;
                }
            }
        }

        .cruise-detail-gallery {
            &__slide {
                height: 270px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

        .swiper-button {
            z-index: 1;
            width: 50px;
            height: 50px;
            top: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            margin: 0;
            transform: translateY(-50%);
            transition: all .3s var(--custom-transition);
            @apply bg-blue-300 rounded-sm;

            &:before,
            &:after {
                display: none;
            }

            &:hover {
                @apply bg-orange-400;
            }

            &-prev {
                left: 0;
            }

            &-next {
                right: 0;
            }

            svg {
                width: 24px;
                height: 24px;
                fill: #fff;
            }
        }

        .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
            pointer-events: auto;
        }
    }

    .bg-solovki {
        background: linear-gradient(270deg, rgba(11, 62, 131, 0) 31.74%, #0B3E83 80.96%), url("/images/solovki/bg_solovki.png");
    }

    .bg-text {
        max-width: 850px;
    }

    .title-solov {
        max-width: 800px;
    }

    .map-slider__item img {
        max-width: 100%;
        width: 100%;
        height: 370px;
        object-fit: cover;
    }

    .slider-item {
        height: auto;
    }

    .map-slider__item {
        height: 100%;
    }

    .ship-button {
        display: none;
    }

    .cart-title {
        color: #0F6CAA;
        font-weight: bold;
    }

    .map {
        background: #BADFF4 url('/images/solovki/bg-map.jpg') no-repeat center / cover;
        border: none !important;
    }

    .map-desc {
        max-width: 800px;

        &__subtitle {
            @apply text-black-400 mb-5 text-lg last:mb-0;
        }
    }

    .map-desc__title {
        font-size: 3rem;
        line-height: 3.7rem;
    }

    .slider-title {
        font-size: 2.025rem;
        line-height: 2.6rem;
    }
    .desc-seo{
        border:1px solid #D7D7D7;
        padding: 40px 50px 50px;
    }
    .cruise-detail-tab-content__title {
        padding: 0;
    }

    .ship {
        padding: 90px 72px 48px;
        background: linear-gradient(270deg, rgba(11, 62, 131, 0) -7.48%, #0B3E83 77.82%), url('/images/solovki/shop-sibiryak.png') right no-repeat;
    }

    .ship-text {
        max-width: 450px;
    }

    .ship-cart {
        max-width: 390px;
        @apply px-6 bg-white text-lg font-medium rounded-lg md:mr-0 mr-5 lg:p-18 lg:text-center sm:py-3;
    }

    .swiper-slide {
        height: initial;
    }

    @screen lg {
        .ship-button {
            display: block;
        }
        .ship-cart {
            max-width: 100%;
            margin-right: 0;
        }
    }

    @screen md {
        .map-desc__title {
            font-size: 30px;
            line-height: 40px;
        }
        .slider-title {
            font-size: 27px;
            line-height: 40px;
        }

        .ship {
            padding: 60px 16px 42px;

            &-cart {
                display: flex;
                min-height: 240px;
                justify-content: center;
                align-items: center;
            }
        }
    }

    @screen sm {
        .ship {
            background: linear-gradient(270deg, rgba(11, 62, 131, 0) -21.48%, #0B3E83 60.82%), url("/images/solovki/ship-mobile.png") right no-repeat;
        }
        .page-solovki {
            background: linear-gradient(270deg, rgba(11, 62, 131, 0) -23.26%, #0B3E83 89.96%), url('/images/solovki/bg-mobile.png') / cover;
        }
        .title-solov {
            font-size: 30px;
            line-height: 37px;
        }
        .bg-text-description {
            font-size: 22px;
            line-height: 30px;
        }
        .form-text {
            line-height: 35px;
        }
    }

    @screen xs {
        .map-slider__item img {
            height: 260px;
        }
    }
</style>
