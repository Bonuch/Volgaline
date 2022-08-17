<template>
    <div class="page-inner page-news-detail pb-24 md:pb-15">
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
                class="wrapper wrapper-1410"
            >
<!--                <p v-if="content.updated_at" class="flex flex-wrap text-base xs:text-sm">-->
<!--                    <span class="mr-5">{{ getDateFormatted(content.updated_at) }}</span>-->
<!--                    <span class="text-gray-300">{{ dayjsGetTimeFormatted(content.updated_at) }}</span>-->
<!--                </p>-->

                <div v-if="content.full_text" class="page-ekskursii-detail-desc mb-20" v-html="content.full_text"></div>
            </div>

            <div v-else class="wrapper mb-20">
                <p>Отсутствует описание новости</p>
            </div>

            <section v-if="news && news.length > 0">
                <div class="wrapper">
                    <div class="title-offset title-heading">
                        <h2 class="section-title">Другие новости</h2>
                        <nuxt-link to="/news" class="link-inline text-lg font-medium text-red-400">
                            К списку новостей
                        </nuxt-link>
                    </div>

                    <div class="columns-list columns-list-3cols">
                        <div
                            v-for="(item) in news"
                            :key="item.id"
                            class="columns-list__item"
                        >
                            <NewsBlockItem :item="item" class="h-full" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import { seoHelper, dayjsHelpers } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import NewsBlockItem from "@/components/news/NewsBlockItem";
    import TopBanner from "@/components/inner/TopBanner";

    export default {
        components: { TopBanner, NewsBlockItem, Breadcrumbs },
        mixins: [seoHelper, dayjsHelpers],
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
            };
        },
        async asyncData({ $axios, params, error }) {
            const newsId = decodeURI(params.id);
            let title = "";
            let content = {};
            let breadcrumbs = [];
            let news = [];
            let topBannerContent = {};

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
                  image: content && content.image ? content.image : "/images/inner/news-detail-bg.jpg",
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
            };
        },
    };
</script>

<style scoped lang="scss">
.page-ekskursii-detail-desc {
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
