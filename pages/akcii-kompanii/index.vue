<template>
    <div class="page-inner page-news pt-6">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
            <h1 v-if="title" class="page-inner-h1 mb-10">{{ title }}</h1>
        </div>
        <div class="page-inner__content">
            <div class="wrapper wrapper-1410">
                <template v-if="promoBanners && promoBanners.length > 0">
                    <section
                        class="mb-8"
                        v-if="promoBanners && promoBanners.length > 0"
                    >
                        <div class="wrapper p-0">
                            <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                                <div class="banner-akcii mb-12">
                                    <BannerSoloveckieOstrova :item="promoBanners[0]"/>
                                </div>
                            </LazyHydrate>
                        </div>
                    </section>
                </template>
                <section
                    v-if="promoFull && promoFull.length > 0"
                    class="directions-section mb-20"
                >
                    <div class="wrapper wrapper-1410 2xl:justify-center lg:flex-nowrap lg:flex-col lg:items-center flex flex-wrap p-0"
                         style="gap: 2rem;">
                        <div
                            v-for="(item) in promoFull"
                            :key="item.id"
                            class="discounts-promotions-slide rounded-sm max-w-md"
                        >
                            <div class="absolute top-0 flex">
                                <div v-if="item.hot" class="excursion-card__decor">
                                    <svg
                                        class="discounts-promotions__icon"
                                        width="18"
                                        height="24"
                                        viewBox="0 0 18 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.58709 23.9564C4.83399 24.1079 5.12295 23.8357 4.97984 23.5833C4.60395 22.9156 4.39071 22.1469 4.39071 21.3249C4.39071 19.5856 5.35299 18.1941 6.76972 17.2683C8.02371 16.4491 7.68148 15.3915 7.88905 14.1319C8.01249 13.3856 8.47818 12.7067 8.86814 12.255C9.02524 12.0727 9.31981 12.1597 9.35908 12.3953C9.58912 13.8092 11.4239 16.2163 12.4815 17.7873C13.699 19.5996 13.6205 21.1959 13.6121 21.3165C13.6121 21.3221 13.6121 21.3277 13.6121 21.3334C13.6093 22.1497 13.3961 22.9156 13.0229 23.5777C12.8799 23.8302 13.1688 24.1051 13.4157 23.9508C15.3626 22.7473 16.7653 20.7611 17.2339 18.5195C17.607 16.7353 17.3966 14.8921 16.7934 13.1864C16.4371 12.1793 15.9462 11.2227 15.3486 10.3361C13.4157 7.46061 10.052 3.05329 9.64807 0.475154C9.57232 0.00104085 8.97196 -0.167283 8.66056 0.197419C8.65495 0.20303 8.08265 0.834246 7.72359 1.53279C7.4178 2.13034 7.16809 2.75595 7.02504 3.40961C6.75572 4.64118 6.80341 5.95972 7.11201 7.18007C7.21303 7.57843 7.34205 7.96839 7.49918 8.34711C7.65065 8.71182 7.81336 9.07933 7.84141 9.47769C7.88633 10.2211 7.21303 10.8636 6.48363 10.8636C5.82997 10.8636 5.28849 10.4708 5.14822 9.73018C5.11175 9.53941 4.89857 9.43845 4.73025 9.53663C2.24746 10.9982 0.581055 13.6998 0.581055 16.7886C0.586581 19.8184 2.18566 22.4751 4.58709 23.9564Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div class="discounts-promotions-image">
                                <nuxt-link :to="{
                                path: item.link? item.link: '',
                            }" :title="item.title">
                                    <img :src="item.image" :alt="item.title" width="450" height="158"
                                         class="object-cover max-h-40">
                                </nuxt-link>
                            </div>

                            <div
                                class="discounts-promotions-content flex flex-col border border-t-0 rounded-b py-5 min-h-25 px-7 border-grey-80 h-25"
                            >
                                <h3 v-if="item.title"
                                    class="line-clamp-2 text-blue-700 text-lg font-medium h-auto mb-0">
                                    <nuxt-link :to="{
                                    path: item.link? item.link: '',
                            }">
                                        {{ item.title }}

                                    </nuxt-link>
                                </h3>
<!--                                <p v-if="item.text" class="line-clamp-3 font-medium mb-0 leading-5 mt-2">-->
<!--                                    {{ item.subtitle }}</p>-->
                            </div>
                        </div>
                    </div>
                </section>

                <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                    <SubscribeEmailForm/>
                </LazyHydrate>

                <section v-if="promoPreview && promoPreview.length > 0" class="wrapper promo-section mb-14 mt-10 p-0">
                    <div class="section-heading">
                        <div class="title-heading">
                            <h2 class="section-title text-2xl font-medium">Постоянные скидки от «Волга&nbsp;Лайн»</h2>
                        </div>

                        <div class="columns-list columns-list-3cols promo-previews-list ml-0 mr-0">
                            <article
                                v-for="(item, itemIdx) in promoPreview"
                                :key="itemIdx"
                                class="columns-list__item relative"
                            >
                                <a :href="item.link" target="_blank" class=""><img v-if="item.image" :src="item.image" alt="Халва" class="columns-list__item-img absolute"></a>
                                <div
                                    class="columns-list__item-title flex flex-col items-start justify-between h-full p-7 rounded-sm overflow-hidden xs:flex-col xs:text-center mob:p-4 border border-grey-80 rounded"
                                >
                                    <div
                                        v-if="item.subtitle"
                                        class="flex items-center justify-end mb-2.5 text-5xl xl:text-26 mob:text-xl leading-none font-medium text-center overflow-hidden xl:text-4xl xs:mt-3 text-red-500"
                                    >
                                        {{ item.subtitle }}
                                        <span class="text-3xl font-medium">{{ item.text }}</span>
                                    </div>


                                    <div class="flex-1-1 m-0">
                                        <h3 v-if="item.title && item.title.length > 3" class="m-0 font-normal text-lg xl:text-base">
                                            {{ item.title }}
                                        </h3>
                                        <h3 v-else class="m-0 font-normal text-lg xl:text-base" v-html="item.text"></h3>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import {seoHelper} from "~/mixins/content-helpers";
import Breadcrumbs from "@/components/base/Breadcrumbs";
import Promo from "@/components/front-banners/Promo";
import LazyHydrate from 'vue-lazy-hydration';

export default {
    components: {
        LazyHydrate,
        Breadcrumbs,
        Promo,
        WantForm: () => import("@/components/front/WantForm"),
        JobCard: () => import("@/components/inner/JobCard"),
        DiscountsAndPromotions: () => import('@/components/front-banners/DiscountsAndPromotions'),
        DiscountShips: () => import('@/components/front-banners/DiscountShips'),
        BannerSoloveckieOstrova: () => import('@/components/front-banners/BannerSoloveckieOstrova'),
        SubscribeEmailForm: () => import('@/components/front/SubscribeEmailForm'),
    },
    mixins: [seoHelper],
    head() {
        return {
            title: this.getSeoField('title', 'Акции'),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.getSeoField('keywords', 'круизы по рекам, отдых на корабле, отдых на пароходе, отдых на теплоходе, речные круизы, речные туры, теплоходные туры, тур по волге, тур по реке, туры выходного дня из москвы, туры на корабле, туры на пароходе, туры на теплоходе, туры по оке')
                },
                {
                    hid: "description",
                    name: 'description',
                    content: this.getSeoField('description', 'Акции на речные круизы и туры со скидкой от 20 до 40%  от компании &quot;Волга Лайн&quot;. Скидки на туры выходного дня, криузы от 3 дней и выше. Звоните!')
                },
                {hid: "og:title", property: "og:title", content: this.getPageTitle()},
                {hid: "og:type", property: "og:type", content: this.getSeoType('article')},
                {
                    hid: "og:description",
                    property: "og:description",
                    content: this.getSeoField('description', 'Акции на речные круизы и туры со скидкой от 20 до 40%  от компании &quot;Волга Лайн&quot;. Скидки на туры выходного дня, криузы от 3 дней и выше. Звоните!')
                },
                {hid: "og:url", property: "og:url", content: this.getPageUrl},
                {hid: "og:image", property: "og:image", content: this.getOgImage()},
            ],
        };
    },
    data() {
        return {
            title: null,
            breadcrumbs: [],
            promoBanners: [],
            promoFull: [],
            promoPreview: [],
            excursionsPromoArr: [
                //     {
                //         "id": 1,
                //         "title": "С 7.03 по 15.03 при 100% оплате - экскурсии в подарок!",
                //         "subtitle": null,
                //         "index": 1,
                //         "text": `
                //             <div class="promo__badge badge py-3 mb-6 text-base font-medium leading-1-1 text-left w-fit">Экскурсии в&nbsp;подарок</div>
                //             <h3 class="promo__title m-0 text-30 font-bold text-white">
                //                 <span class="xl:hidden py-2 pr-6 pl-5 bg-blue-900 bg-opacity-70 rounded-tr-sm rounded-br-sm first:rounded-tl-sm last:rounded-bl-sm">С 7.03 по 15.03</span>
                //                 <span class="xl:hidden py-2 pr-6 pl-5 bg-blue-900 bg-opacity-70 rounded-tr-sm rounded-br-sm first:rounded-tl-sm last:rounded-bl-sm">при 100% оплате -</span>
                //                 <span class="xl:hidden py-2 pr-6 pl-5 bg-blue-900 bg-opacity-70 rounded-tr-sm rounded-br-sm first:rounded-tl-sm last:rounded-bl-sm">экскурсии в подарок!</span>
                //                 <span class="hidden xl:visible xl:block">С 7.03 по 15.03</span>
                //                 <span class="hidden xl:visible xl:block">при 100% оплате -</span>
                //                 <span class="hidden xl:visible xl:block">экскурсии в подарок!</span>
                //             </h3>
                //         `,
                //         "text_filtered": null,
                //         "button": 0,
                //         "link": "/rechnye-kruizy/",
                //         "date": null,
                //         "big_image": "/images/inner/excursion-discount-desktop.jpg",
                //         "image": "/images/inner/excursion-discount-desktop.jpg",
                //         "mobile_image": "/images/inner/excursion-discount-mobile.jpg",
                //     }
            ],
        };
    },
    async asyncData({$axios, route}) {
        let promoBanners = [];
        let promoFull = [];
        let promoPreview = [];
        let content = {};
        let title = 'Акции';
        let breadcrumbs = [];

        try {
            const {data} = await $axios.get(decodeURI(route.path));
            for (const [key, val] of Object.entries(data.content)) {
                content[key] = val;
            }
        } catch (ex) {
            console.log('cant fetch content: ' + ex);
        }

        if (content.title) title = content.title;

        breadcrumbs = [
            {
                id: 1,
                title: "Главная",
                link: "/",
            },
            {
                id: 2,
                title: title,
                link: "",
            },
        ];

        try {
            const {data} = await $axios.get('/banners/banner-akcii');
            promoBanners = [data.data[0]];
        } catch (ex) {
            console.log("cant fetch promo front: " + ex);
        }

        try {
            const {data} = await $axios.get('/banners/discounts-on-promo');
            promoFull = data.data;
        } catch (ex) {
            console.log("cant discounts-on-promo: " + ex);
        }

        try {
            const {data} = await $axios.get('/banners/discounts-2-on-promo');
            promoPreview = data.data;
        } catch (ex) {
            console.log("cant fetch discounts-2-on-promo: " + ex);
        }

        return {
            promoBanners,
            promoFull,
            promoPreview,
            content,
            title,
            breadcrumbs,
        };
    },
};
</script>

<style lang="scss" scoped>
.promo-section {
    h2 {
        text-transform: none;
        @apply mb-5 ;
    }
}

.banner-akcii::v-deep .banner--content__title {
    @apply w-11/12 text-red-500;
}

.columns-list {
    gap: 2rem;
}

.columns-list__item {
    padding-left: 0;
    padding-right: 0;
    max-width: 446px;
    width: 100%;
    min-height: 177px;
    margin-bottom: 0;
}

.columns-list__item {
    &:last-child {
        div {
            border: none;
        }
        .columns-list__item-img {
            @apply w-full;
        }
    }
}

@media (max-width: 1503px) {
    .columns-list {
        @apply columns-list-2cols;
    }
    .columns-list__item {
        max-width: 48% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-bottom: 0 !important;
        @apply pr-0 pl-0;
    }
}
@media (max-width: 903px) {
    .columns-list__item {
        max-width: 100% !important;
        width: 100% !important;
    }
}
@screen lg {
    .promo-previews-list {
        margin-left: 0;
        margin-right: 0;

        .columns-list__item {
            max-width: 100%;
            padding-left: 0;
            padding-right: 0;
            margin-bottom: 1rem;
        }
    }
}
</style>
