<template>
    <div class="page-inner">
        <div class="inner-cruises-top-banner inner-page-banner__gradient relative pt-6 pb-14 z-10 bg-no-repeat bg-center bg-cover mb-15 lg:mb-14">
            <picture class="w-full h-full absolute left-0 top-0 z-0">
                <source media="(max-width: 640px)"srcset="/images/info/mobile_info_banner_1.jpg">
                <img class="object-cover w-full h-full" alt="info_1" src="/images/info/info_banner_1.jpg">
            </picture>
            <div class="wrapper relative z-2">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset text-white xl:mb-10 mb-18"/>
                <div class="px-12 xl:px-0">
                    <h1 class="top-banner_title">{{ title }}</h1>
                </div>
            </div>
        </div>

<!--        <div class="page-inner__content">-->
<!--            <div v-if="content && content.full_text" v-html="content.full_text"></div>-->
<!--        </div>-->

        <div class="wrapper wrapper-1410 mb-20 xl:mb-10 page-info-tourist-list-text-wrap">

            <h2 class="text-30 xl:text-26 mb-9">С учетом рекомендаций Роспотребнадзора с целью снижения риска распространения коронавирусной
                инфекции на борту наших теплоходов уделяется пристальное внимание соблюдению санитарно-эпидемиологических требований:
            </h2>

            <ul class="page-info-tourist-list-text">

                <li>На борту установлены бесконтактные санитайзеры для дезинфекции рук,
                    в местах скопления людей работают бактерицидные лампы закрытого действия;
                </li>

                <li>
                    Дверные ручки, выключатели и иные поверхности, с которыми происходит постоянный контакт на борту,
                    обрабатываются дезинфицирующими средствами;
                </li>

                <li>
                    Услуги на борту большинства теплоходов можно оплатить бесконтактными способами - картой или переводом онлайн;
                </li>

                <li>
                    Все члены экипажа проходят ежедневный осмотр.
                </li>

            </ul>

        </div>

        <div class="wrapper wrapper-1410 info-tourist-border-block">
            <p>При посадке на теплоход обязательно измеряется температура каждого туриста.
                При наличии признаков заболеваний и повышенной температуры граждане не будут допускаться на борт.</p>
        </div>


        <div class="wrapper wrapper-1410 pb-12 xl:pb-0">

            <h2 class="text-44 xl:text-28 mb-10">Ещё больше информации для Вас</h2>

            <ul class="page-info-tourist-list ">

                <li class="link-block">
                    <picture class="image-dark-gradient link-block_wrap-img">
                        <source media="(max-width: 640px)" srcset="/images/info/mobile_info_2.jpg">
                        <img class="link-block_img" alt="Схема проезда" src="/images/info/info_2.jpg">
                    </picture>
                    <a class="link-block_wrap-title" href="/tourist-info/skhema-proezda-do-rechnogo-porta">
                        <h3 class="link-block_title">
                            Схема проезда до северного порта
                        </h3>
                    </a>
                </li>
                <li class="link-block">
                    <picture class="image-dark-gradient link-block_wrap-img">
                        <source media="(max-width: 640px)" srcset="/images/info/mobile_info_3.jpg">
                        <img class="link-block_img" alt="Документы необходимые" src="/images/info/info_3.jpg">
                    </picture>
                    <a class="link-block_wrap-title" href="/tourist-info/dokumenty-neobkhodimye-dlya-posadki-na-teplokhod">
                        <h3 class="link-block_title">
                            Документы необходимые для посадки на теплоход
                        </h3>
                    </a>
                </li>
                <li class="link-block">
                    <picture class="image-dark-gradient link-block_wrap-img">
                        <source media="(max-width: 640px)" srcset="/images/info/mobile_info_4.jpg">
                        <img class="link-block_img" alt="Что с собой можно взять" src="/images/info/info_4.jpg">
                    </picture>
                    <a class="link-block_wrap-title" href="/tourist-info/chto-s-soboy-mozhno-vzyat-na-teplokhod-chto-nelzya">
                        <h3 class="link-block_title">
                            Что с собой можно взять на теплоход, что нельзя
                        </h3>
                    </a>
                </li>
            </ul>

        </div>


    </div>
</template>

<script>
import { seoHelper } from "~/mixins/content-helpers";
import Breadcrumbs from "@/components/base/Breadcrumbs";

const seoDescription = 'Компания "Волга Лайн" заботится о своих пассажирах и соблюдает ряд антиковидных мер с учетом рекомендаций Роспотребнадзора';

export default {
    components: { Breadcrumbs },
    mixins: [seoHelper],
    head() {
        return {
            title: this.getPageTitle(),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.getSeoField('keywords', 'круизы по рекам, отдых на корабле, отдых на пароходе, отдых на теплоходе, речные круизы, речные туры, теплоходные туры, тур по волге, тур по реке, туры выходного дня из москвы, туры на корабле, туры на пароходе, туры на теплоходе, туры по оке')
                },
                { hid: "description", name: 'description', content: this.getSeoField('description', 'Компания "Волга Лайн" заботится о своих пассажирах и соблюдает ряд антиковидных мер с учетом рекомендаций Роспотребнадзора') },
                { hid: "og:title", property: "og:title", content: this.title },
                { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                // { hid: "og:description", property: "og:description", content: this.getSeoField('description', '') },
                { hid: "og:url", property: "og:url", content: this.getPageUrl },
                { hid: "og:image", property: "og:image", content: this.getOgImage() },
            ],
        };
    },
    data() {
        return {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    title: "Главная",
                    link: "/",
                },
                {
                    id: 2,
                    title: 'Информация для туристов',
                    link: "/tourist-info",
                },
                {
                    id: 3,
                    title: 'Антиковидные меры',
                    link: "",
                },
            ],
        };
    },
    async asyncData({ $axios, route }) {
        //     let content = {};
        let title = 'Соблюдение антиковидных мер на теплоходах "Волга Лайн"';
        let description = 'Компания "Волга Лайн" заботится о своих пассажирах и соблюдает ряд антиковидных мер с учетом рекомендаций Роспотребнадзора';
        //     let breadcrumbs = [];
        //
        //     try {
        //         const { data } = await $axios.get(decodeURI(route.path));
        //         for (const [key, val] of Object.entries(data.content)) {
        //             content[key] = val;
        //         }
        //     } catch (ex) {
        //         console.log('cant fetch content: ' + ex);
        //     }
        //
        //     if (content.title) title = content.title;
        //
        //     breadcrumbs =
        //
        //     try {
        //         const { data } = await $axios.get('/banners/promo-front');
        //         promoBanners = [data.data[0]];
        //     } catch (ex) {
        //         console.log("cant fetch promo front: " + ex);
        //     }
        //
        //     try {
        //         const { data } = await $axios.get('/banners/discounts-on-promo');
        //         promoFull = data.data;
        //     } catch (ex) {
        //         console.log("cant discounts-on-promo: " + ex);
        //     }
        //
        //     try {
        //         const { data } = await $axios.get('/banners/discounts-2-on-promo');
        //         promoPreview = data.data;
        //     } catch (ex) {
        //         console.log("cant fetch discounts-2-on-promo: " + ex);
        //     }
        //
        return {
            // promoBanners,
            // promoFull,
            // promoPreview,
            // content,
            title,
            description,
            // breadcrumbs,
        };
    },
};

</script>

<style lang="scss" scoped>
.top-banner_title {
    width: 52%;
}
</style>
