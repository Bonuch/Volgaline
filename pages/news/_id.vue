<template>
    <div class="page-inner page-news-detail pb-24 md:pb-15">
        <TopBannerBlogNews
            v-if="getImageForTopBanner && Object.keys(getImageForTopBanner).length > 0"
            :item='content.views_counter'
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
            </div>

            <div v-else class="wrapper mb-20">
                <p>Отсутствует описание новости</p>
            </div>

<!--            <section v-if="news && news.length > 0">-->
<!--                <div class="wrapper">-->
<!--                    <div class="title-offset title-heading">-->
<!--                        <h2 class="section-title">Другие новости</h2>-->
<!--                        <nuxt-link to="/news" class="link-inline text-lg font-medium text-red-400">-->
<!--                            К списку новостей-->
<!--                        </nuxt-link>-->
<!--                    </div>-->

<!--                    <div class="columns-list columns-list-3cols">-->
<!--                        <div-->
<!--                            v-for="(item) in news"-->
<!--                            :key="item.id"-->
<!--                            class="columns-list__item"-->
<!--                        >-->
<!--                            <NewsBlockItem :item="item" class="h-full" />-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </section>-->

            <div class="page-inner__content cruise-detail__content pb-10">
                <CruiseSectionList
                    v-if="fsrContent && fsrContent.length > 0"
                    class="pt-20 bg-white xl:pt-10"
                    :cruises="fsrContent"
                    :sort-list="sortList"
                    :view-controls="viewControls"
                    :headings="headings"
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
    import NewsBlockItem from "@/components/news/NewsBlockItem";
    import TopBannerBlogNews from "@/components/inner/TopBannerBlogNews";
    import CruiseSectionList from "@/components/cruise-section/CruiseSectionList";
    import {sfmPrepearFormData, sfmQueryHasProp} from '../../helpers/search';

    export default {
        components: { TopBannerBlogNews, NewsBlockItem, Breadcrumbs, CruiseSectionList },
        mixins: [seoHelper, dayjsHelpers, fetchSearchResult],
        layout: 'without-form',
        head() {
            return {
                title: this.title,
                meta: [
                    { hid: "keywords", name: "keywords", content: this.getSeoField('keywords', 'Волгалайн: Новости «Волгалайн». Речные круизы в России - «Волгалайн»') },
                    { hid: "description", name: 'description', content: this.getSeoField('description', 'Волгалайн: Новости «Волгалайн». Речные круизы в России - «Волгалайн»') },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                    { hid: "og:description", property: "og:description", content: this.getSeoField('description', 'Волгалайн: Новости «Волгалайн». Речные круизы в России - «Волгалайн»') },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: "Новость",
                content: {},
                breadcrumbs: [],
                news: [],
                fsrContent: [],
                fsrContentMeta: {},
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
        computed: {
            getImageForTopBanner(){
                this.topBannerContent.image = this.getWindowWidth > 640? this.content.image_1920_530: this.content.image_420_520;
                return this.topBannerContent;
            },
            getDateForTopBanner() {
                this.topBannerContent.updated_at
            }
        },
        async asyncData({ $axios, params, error, query, $dayjs }) {
            const newsId = decodeURI(params.id);
            let title = "";
            let content = {};
            let breadcrumbs = [];
            let news = [];
            let topBannerContent = {};
            let fsrContentMeta = {};
            let fsrContent = {};

            try {
                const { data } = await $axios.get(`/${newsId}`);

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
                        title: "Новости",
                        link: "/news",
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
                    error({ statusCode: 404, message: "cant fetch news" });
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

            try {
                const { data } = await $axios.get(`/news-latest/${content.id}`);
                news = data.data;
            } catch (ex) {
                console.log('cant fetch news latest: ' + ex);
            }

            return {
                breadcrumbs,
                title,
                content,
                topBannerContent,
                news,
                fsrContent,
                fsrContentMeta,
            };
        },
        async beforeRouteUpdate(to, from, next) {
            const params = sfmPrepearFormData(to.query, this.$dayjs);
            if (params && Object.keys(params).length > 0) {
                // подгрузка параметров поиска в поисковую форму
                if (sfmQueryHasProp(params)) {
                    await this.fetchSelectedOptions(params);
                }

                // подгрузка отсортированных круизов
                if (sfmQueryHasProp(params, ['sort', 'order']) || params['modal-filter']) {
                    const params = sfmPrepearFormData(to.query, this.$dayjs);
                    await this.fsrSearch('/cruise/search', params);
                }
            } else {
                this.setSelectedOptions(null);
            }

            next();
        },
        methods: {
            async onClearQueryParamsClick() {
                const params = sfmPrepearFormData(this.$route.query, this.$dayjs);
                await this.fsrSearch("/cruise/search", params);
            },
        }
    };
</script>

<style scoped lang="scss">
.page-news-detail-desc {
    &::v-deep {
        & tr {
            text-align: center;
        }
        & td {
            padding-right: 10px;
            text-align: center;
            @apply border border-gray-70;
            &:last-child {
                padding-right: 0;
            }
        }
    }
}
</style>
