<template>
    <div class="page-inner page-directions pt-6 pb-24">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
            <h1 v-if="title" class="page-inner-h1 page-inner-h1--offset mb-10">{{ title }}</h1>

            <div
                v-if="fsrContent && fsrContent.length > 0"
                class="columns-list columns-list-2cols mb-10"
                :class="{'disabled': fsrLoading}"
            >
                <div
                    v-for="(item) in fsrContent"
                    :key="item.id"
                    class="columns-list__item"
                >
                    <div
                        class="image-dark-gradient excursion-card"
                        :style="`background-image: url(${item.image})`"
                    >
                        <div
                            class="excursion-card__content">
                            <div class="absolute top-0 flex">
                                <div v-if="item.hot" class="excursion-card__decor">
                                    <svg
                                        class="directions__icon"
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

                            <h3 v-if="item.title" class="excursion-card__name" v-html="item.title"></h3>
                            <div v-if="item.duration" class="flex items-center mb-2 text-white">
                                <svg
                                    class="w-6 h-6 mr-3 fill-current" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7 2V4H9V2H11V4H13V2H15V4H17V2H19V4H21H22V5V21V22H21H3H2V21V5V4H3H5V2H7ZM17 6V7H19V6H20V20H4V6H5V7H7V6H9V7H11V6H13V7H15V6H17ZM5 11H8V9H5V11ZM9 11H12V9H9V11ZM13 11H16V9H13V11ZM5 15H7V13H5V15ZM9 15H11V13H9V15ZM13 15H15V13H13V15ZM17 15H19V13H17V15ZM5 19H7V17H5V19ZM9 19H11V17H9V19ZM13 19H15V17H13V19ZM17 19H19V17H17V19Z"
                                        fill="#EAEEF4"
                                    />
                                </svg>
                                <span class="text-lg">{{ item.duration }}</span>
                            </div>
                            <div class="w-full flex flex-wrap items-center justify-between">
                                <div
                                    v-if="item.price"
                                    class="excursion-card__price"
                                >
                                    {{ item.price | formatPrice }}
                                </div>

                                <nuxt-link
                                    :to="{
                                        path: '/rechnye-kruizy',
                                        query: {
                                            direction: item.id
                                        }
                                    }"
                                    class="button text-lg py-3 px-6"
                                >
                                    Подробнее
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p v-else>Популярных направлений в данный момент - нет.</p>

            <button
                v-if="fsrShowMoreVisibility"
                type="button"
                class="button button-transparent button-show-more"
                @click="fsrOnSearchMoreClick('/directions-popular')"
            >
                Показать еще
            </button>
        </div>
    </div>
</template>

<script>
    import { seoHelper, fetchSearchResult } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";

    const pageTitle = "Популярные направления";

    export default {
        components: { Breadcrumbs },
        mixins: [seoHelper, fetchSearchResult],
        layout: 'without-form',
        head() {
            return {
                title: this.title,
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Волгалайн: Направления «Волгалайн». Речные круизы в России - «Волгалайн». Cписок популярных речных направлений Волгалайн' },
                    { hid: "description", name: 'description', content: 'Волгалайн: Направления «Волгалайн». Речные круизы в России - «Волгалайн». Cписок популярных речных направлений Волгалайн' },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: 'website' },
                    { hid: "og:description", property: "og:description", content: "Волгалайн: Направления «Волгалайн». Речные круизы в России - «Волгалайн». Cписок популярных речных направлений Волгалайн" },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: pageTitle,
                content: [],
                breadcrumbs: [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: pageTitle,
                        link: "",
                    },
                ],
            };
        },
        jsonld() {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                "name": this.getPageTitle(),
                "image": this.getOgImage(),
                "keywords": 'Волгалайн: Популярные направления «Волгалайн». Речные круизы в России - «Волгалайн». Cписок популярных речных направлений Волгалайн',
                "description": 'Волгалайн: Популярные направления «Волгалайн». Речные круизы в России - «Волгалайн». Cписок популярных речных направлений Волгалайн',
                "url": this.getPageUrl,
            };
        },
        async asyncData({ $axios }) {
            let fsrContent = [];
            let fsrContentMeta = {};

            try {
                const { data } = await $axios.get("/directions-popular");
                fsrContent = data.data;
                fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
                return null;
            }

            return {
                fsrContent,
                fsrContentMeta
            };
        },
    };
</script>

<style></style>
