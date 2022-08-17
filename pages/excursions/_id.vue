<template>
    <div class="page-inner page-excursion pb-24">
        <TopBanner
            v-if="topBannerContent && Object.keys(topBannerContent).length > 0"
            :title="title"
            :breadcrumbs="breadcrumbs"
            :top-banner-content="topBannerContent"
            class="mb-20 lg:mb-14"
        />

        <div class="page-inner__content">
            <div
                v-if="content && Object.keys(content).length > 0"
                class="wrapper"
            >
                <div v-if="content.description" class="mb-20 custom-table"  v-html="content.description"></div>

                <section v-if="content.photos">
                    <div class="title-offset title-heading">
                        <h3 class="section-title">Фотографии</h3>
                    </div>

                    <div class="excursions-list columns-list columns-list-3cols">
                        <div
                            v-for="(item) in content.photos"
                            :key="item.id"
                            :data-src="item.image"
                            class="columns-list__item"
                        >
                            <a
                                class="excursion-card image-loop-hover"
                                :href="item.image"
                                :style="`backgroundImage: url(${item.image})`"
                            >
                                <img :src="item.image" alt="#" class="hidden">
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <div v-else class="wrapper">
                <p>Отсутствует описание экскурсии</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { seoHelper, htmlHelper } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import TopBanner from "@/components/inner/TopBanner";

    export default {
        components: { TopBanner, Breadcrumbs },
        mixins: [seoHelper, htmlHelper],
        layout: 'without-form',
        head() {
            return {
                title: this.title,
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Волгалайн: Экскурсии «Волгалайн». Речные круизы в России - «Волгалайн»' },
                    { hid: "description", name: 'description', content: this.strippedContent(this.getShortDesc) },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                    { hid: "og:description", property: "og:description", content: this.strippedContent(this.getShortDesc) },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: "Экскурсия",
                topBannerContent: null,
                content: {},
                breadcrumbs: [],
            };
        },
        computed: {
            getShortDesc() {
                return this.content && this.content.description ? this.content.description.slice(0, 140) : null;
            },
        },
        methods: {
            initLightgallery() {
                const $el = this.$el;
                let list = $el.querySelector(".excursions-list");

                if ($el && list) {
                    window.lightGallery(list, { download: false });
                }
            },
        },
        mounted() {
            this.initLightgallery();
        },
        async asyncData({ $axios, params, error }) {
            const contentID = decodeURI(params.id);
            let title = "Экскурсия";
            let content = {};
            let topBannerContent = {};
            let breadcrumbs = [];

            try {
                const { data } = await $axios.get(`/excursions/${contentID}`);
                content = data.data;
                title = content.title;
                breadcrumbs = [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: "Экскурсии",
                        link: "/excursions",
                    },
                    {
                        id: 3,
                        title,
                        link: "",
                    },
                ];

                topBannerContent = {
                    image: content.url ? content.url : "/images/inner/excursions-bg.jpg",
                    content: "",
                };

            } catch (ex) {
                console.log("cant fetch excursion: " + ex);
                if (ex.response.status === 404 ) {
                    error({ statusCode: 404, message: "cant fetch excursion" });
                } else {
                    return null;
                }
            }

            return {
                breadcrumbs,
                title,
                content,
                topBannerContent,
            };
        },
    };
</script>

<style scoped>
    .custom-table::v-deep table{
        @apply min-w-full leading-normal;
    }
    .custom-table::v-deep td{
        @apply p-2 border-b border-gray-200;
    }
    .custom-table::v-deep h2{
        @apply text-26 font-semibold;
    }

</style>
