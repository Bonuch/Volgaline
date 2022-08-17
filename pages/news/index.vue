<template>
    <div class="page-inner page-news pt-6 pb-24 md:pb-15">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
            <h1 v-if="title" class="text-50 sm:text-40 font-medium text-black-400 capitalize mb-11">{{ title }}</h1>

            <div
                v-if="fsrContent && fsrContent.length > 0"
                class="flex flex-col"
            >
                <NewsSectionItem
                    v-for="(item, itemIdx) in fsrContent"
                    :key="itemIdx"
                    :item="item"
                    class="columns-list__item mb-10"
                />
            </div>

            <p v-else>Нет опубликованных новостей.</p>

            <button
                v-if="fsrShowMoreVisibility"
                type="button"
                class="button button-transparent button-show-more"
                @click="fsrOnSearchMoreClick('/news')"
            >
                Показать еще
            </button>
        </div>
    </div>
</template>

<script>
    import { seoHelper, fetchSearchResult } from '~/mixins/content-helpers';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import NewsSectionItem from '@/components/news/NewsSectionItem';

    const pageTitle = "Новости";
    const seoTitle = 'Новости компании "Волга Лайн" о речных круизах, теплоходах, экскурсий';

    export default {
        components: { NewsSectionItem, Breadcrumbs },
        mixins: [seoHelper, fetchSearchResult],
        layout: 'without-form',
        head() {
            return {
                title: this.getSeoField('title', this.titlePage),
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Волгалайн: Новости «Волгалайн». Речные круизы в России - «Волгалайн»' },
                    { hid: "description", name: 'description', content: 'Новости о речных круизах, теплоходах, экскурсий, актуальных скидках и интересных маршрутов от кризной компании "Волга Лайн"' },
                    { hid: "og:title", property: "og:title", content: this.getSeoField('title', this.titlePage) },
                    { hid: "og:type", property: "og:type", content: 'website' },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: pageTitle,
                titlePage: seoTitle,
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
                content: [],
            };
        },
        async asyncData({ $axios }) {
            let fsrContent = [];
            let fsrContentMeta = {};
            let titleSeo = 'Новости компании "Волга Лайн" о речных круизах, теплоходах, экскурсий';

            try {
                const { data } = await $axios.get('/news');
                fsrContent = data.data;
                fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
                return null;
            }

            return {
                fsrContent,
                fsrContentMeta,
                titleSeo,
            };
        },
    };
</script>

<style lang="scss" scoped>
    @media all and (max-width: 860px) {
        .page-news {
            &::v-deep {
                .button-show-more {
                    @apply mt-16;
                }
            }
        }
    }
</style>
