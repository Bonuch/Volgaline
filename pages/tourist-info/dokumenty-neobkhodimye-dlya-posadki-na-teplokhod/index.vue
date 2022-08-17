<template>
    <div class="page-inner">
        <div class="inner-cruises-top-banner inner-page-banner__gradient relative pt-6 pb-14 z-10 bg-no-repeat bg-center bg-cover mb-15 lg:mb-14">
            <picture class="w-full h-full absolute left-0 top-0 z-0">
                <source media="(max-width: 640px)"srcset="/images/info/mobile_info_banner_3.jpg">
                <img class="object-cover w-full h-full" alt="info_1" src="/images/info/info_banner_3.jpg">
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

            <h2 class="text-30 xl:text-26 mb-9">
                При посадке на теплоход необходимо предоставить паспорт или свидетельство рождения для ребенка.
                Желательно иметь с собой на борту медицинский полис. Кроме документов, удостоверяющих личность, необходимы:
            </h2>

            <ul class="page-info-tourist-list-text">

                <li>
                    путевка
                </li>

                <li>
                    распечатанный посадочный талон
                </li>

                <li>
                    пенсионное удостоверение, если тур покупался со скидками для пенсионеров
                </li>

            </ul>

        </div>

        <div class="wrapper wrapper-1410 info-tourist-border-block">
            <p>
                При посадке на теплоходы нашей круизной компании («Свирский», «Башкортостан») можно предъявить электронный посадочный талон, не распечатывая его.
            </p>
        </div>


        <div class="wrapper wrapper-1410 pb-12 xl:pb-0">

            <h2 class="text-44 xl:text-28 mb-10">Ещё больше информации для Вас</h2>

            <ul class="page-info-tourist-list ">

                <li class="link-block">
                    <picture class="image-dark-gradient link-block_wrap-img">
                        <source media="(max-width: 640px)" srcset="/images/info/mobile_info_1.jpg">
                        <img class="link-block_img" alt="Антиковидные меры" src="/images/info/info_1.jpg">
                    </picture>
                    <a class="link-block_wrap-title" href="/tourist-info/antikovidnye-mery">
                        <h3 class="link-block_title">
                            Антиковидные меры
                        </h3>
                    </a>
                </li>
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
                { hid: "description", name: 'description', content: this.getSeoField('description', 'Перечень документов необходимых при посадке на теплоход - паспорт или свидетельство рождения для ребенка. Желательно иметь с собой на борту медицинский полис.') },
                { hid: "og:title", property: "og:title", content: this.title },
                { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                // { hid: "og:description", property: "og:description", content: this.description },
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
                    title: 'Документы, необходимые для посадки на теплоход',
                    link: "",
                },
            ],
        };
    },
    async asyncData({ $axios, route }) {
        //     let content = {};
        let title = 'Документы, необходимые для посадки на теплоход';
        let description = 'Перечень документов необходимых при посадке на теплоход - паспорт или свидетельство рождения для ребенка. Желательно иметь с собой на борту медицинский полис.';
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
    width: 50%;
}
</style>
