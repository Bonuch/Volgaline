<template>
    <div class="page-inner page-news-detail pb-24 md:pb-15">
        <TopBannerBlogNews
            v-if="getImageForTopBanner && Object.keys(getImageForTopBanner).length > 0"
            :view-counter='content.views_counter'
            :title="title"
            :breadcrumbs="breadcrumbs"
            :top-banner-content="getImageForTopBanner"
            :top-banner-content-date="getDateForTopBanner"
            :page-slug="content.slug"
            class="mb-12"
        />
        <div class="page-inner__content mt-12 mx-10 md:mx-8 sm:mx-4">
            <div
                v-if="content && Object.keys(content).length > 0"
                class="wrapper wrapper-1410-f bg-blue-300 bg-opacity-5"
            >
                <div v-if="content.full_text" class="wrapper-690 mx-auto py-10" v-html="content.full_text"></div>

<!--                <section v-if="content.images && content.images.length > 0">-->
<!--                    <div class="title-offset title-heading">-->
<!--                        <h3 class="section-title">Фотографии</h3>-->
<!--                    </div>-->

<!--                    <div class="excursions-list columns-list columns-list-3cols">-->
<!--                        <div-->
<!--                            v-for="(item) in content.images"-->
<!--                            :key="item.id"-->
<!--                            :data-src="item.image_580_550"-->
<!--                            class="columns-list__item"-->
<!--                        >-->
<!--                            <a-->
<!--                                class="excursion-card image-loop-hover"-->
<!--                                :href="item.image_900_600"-->
<!--                                :style="`backgroundImage: url(${item.image_580_550})`"-->
<!--                            >-->
<!--                                <img :src="item.image_580_550" alt="#" class="hidden">-->
<!--                            </a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </section>-->
            </div>

            <div v-else class="wrapper mb-20">
                <p>Отсутствует описание</p>
            </div>

            <div class="page-inner__content cruise-detail__content pb-10">
                <CruiseSectionList
                    v-if="fsrContent && fsrContent.length > 0"
                    class="pt-20 bg-white xl:pt-10"
                    :cruises="fsrContent"
                    :show-more-visible="fsrShowMoreVisibility"
                    @on-clear-query-params-click="onClearQueryParamsClick"
                    @on-show-more-click="fsrOnSearchMoreClick('/cruise/search')"
                />

                <div v-else class="wrapper mt-24 xl:pt-16">
                    <p class="p-2 m-0 mb-3 text-center font-medium">
                        Результаты отсутствуют, попробуйте задать другие параметры поиска.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { seoHelper, dayjsHelpers, fetchSearchResult } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import TopBannerBlogNews from "@/components/inner/TopBannerBlogNews";
    import {mapGetters} from "vuex";
    import CruiseSectionList from "@/components/cruise-section/CruiseSectionList";
    import {sfmPrepearFormData, sfmQueryHasProp} from '../../helpers/search';

    export default {
        components: { TopBannerBlogNews, Breadcrumbs, CruiseSectionList },
        mixins: [seoHelper, dayjsHelpers, fetchSearchResult],
        layout: 'without-form',
        head() {
            return {
                title: this.title,
                meta: [
                    { hid: "keywords", name: "keywords", content: this.getSeoField('keywords', 'Волгалайн: Блог о круизах «Волгалайн». Речные круизы в России - «Волгалайн»') },
                    { hid: "description", name: 'description', content: this.getSeoField('description', 'Волгалайн: Статьи «Волгалайн». Речные круизы в России - «Волгалайн»') },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                    { hid: "og:description", property: "og:description", content: this.getSeoField('description', 'Волгалайн: Блог о круизах «Волгалайн». Речные круизы в России - «Волгалайн»') },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: "Статья",
                content: {},
                breadcrumbs: [],
                latest: [],
                fsrContent: [],
                fsrContentMeta: {},
                contentCounter: {},
            };
        },
        jsonld() {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                "headline": this.getPageTitle(),
                "image": this.getOgImage(),
                "keywords": this.getSeoField('keywords'),
                "description": this.getSeoField('description'),
                "url": this.getPageUrl,
            };
        },
        computed:{
            ...mapGetters({
                getWindowWidth: 'getWindowWidth',
            }),
            getImageForTopBanner(){
                this.topBannerContent.image = this.getWindowWidth > 640? this.content.image_1920_530: this.content.image_420_520;
                return this.topBannerContent;
            },
            getDateForTopBanner() {
                this.topBannerContent.updated_at
            },
        },
        async asyncData({ $axios, params, error, query, $dayjs}) {
            const postId = encodeURI(params.id);
            let title = "";
            let content = {};
            let breadcrumbs = [];
            let topBannerContent = {};
            let fsrContentMeta = {};
            let fsrContent = {};
            let contentCounter = {};
            try {
                const { data } = await $axios.get(`/${postId}`);
                for (const [key, val] of Object.entries(data.content)) {
                    content[key] = val;
                }

                title = content.title;
                breadcrumbs = [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: "Блог о круизах",
                        link: "/blog-o-kruizah",
                    },
                    {
                        id: 3,
                        title,
                        link: "",
                    },
                ];

                topBannerContent = {
                    content: "",
                };
            } catch (ex) {
                console.log("cant fetch content: " + ex);
                if (ex.response.status === 404 ) {
                    error({ statusCode: 404, message: "cant fetch blog article" });
                } else {
                    return null;
                }
            }

            try {
                const queryParams = sfmPrepearFormData(query, $dayjs);
                const {data} = await $axios.get('/cruise/search', {params: queryParams});
                fsrContent = data.data;
                fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
            }

            return {
                breadcrumbs,
                contentCounter,
                title,
                content,
                topBannerContent,
                fsrContent,
                fsrContentMeta,
            };
        },
        async beforeRouteUpdate(to, from, next) {
            const params = sfmPrepearFormData(to.query, this.$dayjs);
            if (params && Object.keys(params).length > 0) {
                // подгрузка отсортированных круизов
                if (sfmQueryHasProp(params, ['sort', 'order']) || params['modal-filter']) {
                    const params = sfmPrepearFormData(to.query, this.$dayjs);
                    await this.fsrSearch('/cruise/search', params);
                }
            }

            next();
        },
        methods: {
            initLightgallery() {
                const $el = this.$el;
                let list = $el.querySelector(".excursions-list");

                if ($el && list) {
                    window.lightGallery(list, { download: false });
                }
            },
            async onClearQueryParamsClick() {
                const params = sfmPrepearFormData(this.$route.query, this.$dayjs);
                await this.fsrSearch("/cruise/search", params);
            },
        },
        mounted() {
            this.initLightgallery();
        },
    };
</script>

<style></style>
