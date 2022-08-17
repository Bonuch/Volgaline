<template>
    <div class="page-inner">
        <div class="bg-msk-spb pt-6 mb-20 text-black md:pb-6 sm:mb-7">
            <div class="wrapper-1410 text-black">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-16 sm:mb-10 px-14 sm:px-4"/>
                <div class="px-14 sm:px-4">
                    <div class="bg-text">
                        <h1 class="title-msk-spb page-inner-h1 text-black mb-9 sm:mb-5">{{ title }}</h1>
                        <div class="time-days flex justify-start">
                            <div class="time-days-wrapper">
                                <img src="@/static/images/msk-spb/sun.svg" alt="sun" class="time-days-wrapper__img">
                                <p class="time-days-wrapper__text">10 дней </p>
                            </div>
                            <div class="time-days-wrapper">
                                <img src="@/static/images/msk-spb/moon.svg" alt="moon" class="time-days-wrapper__img">
                                <p class="time-days-wrapper__text">9 ночей</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper-1410 mb-20 mt-20">
            <div class="px-14 lg:px-0 sm:px-0 flex justify-between items-center md:flex-col">
                <h2 class="about-text title-msk-spb__h2 page-inner-h3">
                    Речной круиз из&nbsp;Москвы в&nbsp;Санкт&nbsp;-&nbsp;Петербург
                    с&nbsp;насыщенной экскурсионной
                    программой в&nbsp;двух столицах
                </h2>
                <img src="@/static/images/msk-spb/spb-msk.png" alt="spb-msk" class="about-img">
            </div>
        </div>
        <MenuTabs/>
        <Accommodation/>
        <div class="wrapper-1410">
            <div class="included-cruise p-14 md:p-4">
                <h2 class="included-cruise__title mb-10">Что входит в стоимость круиза:</h2>
                <div class="included-cruise__block flex flex-wrap">
                    <div class="included-cruise__wrapper" v-for="(item, index) in included" :key="index">
                        <ul class="included-cruise__wrapper-items">{{ item.title }}
                            <li class="included-cruise__wrapper-item ml-6" v-for="(list, index) in item.list"
                                :key="index">{{ list.text }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <PromoFormRequest title="Оставьте завку на круиз прямо сейчас"/>
    </div>
</template>

<script>
import Breadcrumbs from "~/components/base/Breadcrumbs";
import MenuTabs from "~/components/tabs-msk-spb/MenuTabs";
import Accommodation from "~/components/accommodation/Accommodation";
import { seoHelper, fetchSearchResult } from "@/mixins/content-helpers";

const pageTitle = 'Москва - Санкт-Петербург: на волне впечатлений';

export default {
    name: "test",
    components: {
        Breadcrumbs,
        MenuTabs,
        Accommodation,
        PromoFormRequest: () => import("@/components/front/PromoFormRequest"),
    },
    mixins: [seoHelper, fetchSearchResult],
    layout: 'without-form',
    head() {
        return {
            title: this.getSeoField('title', 'Круиз Москва - Санкт-Петербург: на волне впечатлений с 12 по 21 июня'),
            meta: [
                { hid: "title", property: "title", content: this.getSeoField('title', 'Круиз Москва - Санкт-Петербург: на волне впечатлений с 12 по 21 июня') },
                { hid: "description", name: 'description', content: this.getSeoField('description','Речной круиз из Москвы в Санкт - Петербург с интересной экскурсионной программой в двух столицах от компании "Волга Лайн"') },
            ]
        }
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
            included: [
                {
                    title: 'За бортом', list: [
                        {text: 'Проживание в выбранном отеле с завтраком'},
                        {text: 'Транспортное(авто ) и экскурсионное обслуживание'},
                        {text: 'Услуги гида'},
                        {text: 'Путевая информация,'},
                        {text: 'Входные билеты'},
                        {text: 'Экскурсионная программа'},
                    ]
                },
                {
                    title: 'На борту', list: [
                        {text: 'Завтрак шведский стол, обед,ужин по меню'},
                        {text: 'Проживание в выбранной категории каюты'},
                        {text: 'Путевая информация'},
                        {text: 'Развлекательная программа на борту'},
                        {text: 'Экскурсионная программа входящая в тур'},
                    ]
                },
                {
                    title: 'За дополнительную плату', list: [
                        {text: 'Трансферы в г. Москва и Санкт-Петербург'},
                        {text: 'Дополнительные экскурсии'},
                    ]
                },
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.bg-msk-spb {
    background: url("/images/msk-spb/bg_msk_city.jpg") no-repeat center / cover;
    padding-bottom: 155px;
}

.wrapper-1410 {
    margin: 0 auto;
}

.title-msk-spb {
    max-width: 769px;
    font-weight: 400;
    line-height: 65px;
    @media (max-width: 1280px) {
        line-height: 37px;
    }
    @media (max-width: 640px) {
        line-height: 37px;
    }

    &__h2 {
        color: #1D1F20;
        font-style: normal;
        font-weight: 400;
        font-size: 35px;
        line-height: 45px;
        max-width: 711px;
        @media (max-width: 1280px) {
            font-size: 2rem;
        }
        @media (max-width: 640px) {
            font-size: 1.5rem;
        }
    }
}

.page-inner-h1 {
    font-size: 3.125rem;
    text-transform: none;
    @media (max-width: 1280px) {
        font-size: 2.25rem;
    }
    @media (max-width: 640px) {
        font-size: 1.875rem;
    }
}

.text-black {
    color: #000000;
}

.time-days {
    gap: 30px;

    &-wrapper {
        @apply flex justify-between gap-2.5 items-center;
        &__text {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 150%;
            @apply mb-0;
        }
    }
}

.included-cruise {
    &__title {
        font-style: normal;
        font-weight: 400;
        font-size: 35px;
        line-height: 45px;
    }
    &__block {
        gap: 30px;
    }
    &__wrapper {

        &-items {
            list-style-type: disc;
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 35px;
            color: #0053C2;
            //&:last-child {
            //    color: #BC002D;
            //}
        }

        &-item {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: #1D1F20;
        }
    }
}

</style>
