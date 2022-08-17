<template>
    <div class="page-inner pt-6">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
        </div>

        <div class="wrapper wrapper-1410">
            <h1 v-if="title" class="page-inner-h1 normal-case mb-12 font-bold sm:mb-10">{{ title }}</h1>
        </div>

            <div class="wrapper wrapper-1410 overflow-hidden pb-12 xl:pb-0">

                    <ul class="page-info-tourist-list">

                        <li class="link-block">

                            <picture class="link-block_wrap-img image-dark-gradient">
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
                            <picture class="link-block_wrap-img image-dark-gradient">
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
                            <picture class="link-block_wrap-img image-dark-gradient">
                                <source media="(max-width: 640px)" srcset="/images/info/mobile_info_3.jpg">
                                <img class="link-block_img" alt="Необходимые документы" src="/images/info/info_3.jpg">
                            </picture>
                            <a class="link-block_wrap-title" href="/tourist-info/dokumenty-neobkhodimye-dlya-posadki-na-teplokhod">
                                <h3 class="link-block_title">
                                    Документы, необходимые для посадки на теплоход
                                </h3>
                            </a>
                        </li>
                        <li class="link-block">
                            <picture class="link-block_wrap-img image-dark-gradient">
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
                { hid: "description", name: 'description', content: this.getSeoField('description', 'Акции на речные круизы и туры со скидкой от 20 до 40%  от компании &quot;Волга Лайн&quot;. Скидки на туры выходного дня, криузы от 3 дней и выше. Звоните!') },
                { hid: "og:title", property: "og:title", content: this.title },
                { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                { hid: "og:description", property: "og:description", content: this.getSeoField('description', 'Акции на речные круизы и туры со скидкой от 20 до 40%  от компании &quot;Волга Лайн&quot;. Скидки на туры выходного дня, криузы от 3 дней и выше. Звоните!') },
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
                        link: "",
                    },
                ],
        };
    },
    async asyncData({ $axios, route }) {
    //     let promoBanners = [];
    //     let promoFull = [];
    //     let promoPreview = [];
    //     let content = {};
        let title = 'Информация для туристов';
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
            // breadcrumbs,
        };
    },
};

</script>

<style lang="scss" scoped>

</style>
