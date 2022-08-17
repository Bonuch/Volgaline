<template>
    <div class="page-inner page-news pt-6 pb-24 md:pb-15">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
            <h1 v-if="title" class="text-50 md:text-40 font-semibold capitalize mb-10">{{ title }}</h1>

            <div
                v-if="fsrContent && fsrContent.length > 0"
                class="columns-list columns-list-3cols"
            >
                <EkskursiiSectionItem
                    v-for="(item, itemIdx) in fsrContent"
                    :key="itemIdx"
                    :item="item"
                    class=""
                />
            </div>

            <p v-else>Нет опубликованных экскурсий.</p>

            <button
                v-if="fsrShowMoreVisibility"
                type="button"
                class="button button-transparent button-show-more mt-15"
                @click="fsrOnSearchMoreClick('/ekskursii')"
            >
                Показать еще
            </button>
        </div>
    </div>
</template>

<script>
    import { seoHelper, fetchSearchResult } from '~/mixins/content-helpers';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import EkskursiiSectionItem from '@/components/ekskursii/EkskursiiSectionItem';

    export default {
        components: { EkskursiiSectionItem, Breadcrumbs },
        mixins: [seoHelper, fetchSearchResult],
        layout: 'default',
        head() {
            return {
                title: this.getPageTitle(),
                meta: [
                    { hid: "keywords", name: "keywords", content: this.getSeoField('keywords', 'Экскурсии компании «Волгалайн»') },
                    { hid: "description", name: 'description', content: this.getSeoField('description', 'Экскурсии компании «Волгалайн»') },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                    { hid: "og:description", property: "og:description", content: this.getSeoField('description', 'Экскурсии компании «Волгалайн»') },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: 'Экскурсии',
                breadcrumbs: [
                    {
                        id: 1,
                        title: 'Главная',
                        link: '/',
                    },
                    {
                        id: 2,
                        title: 'Экскурсии',
                        link: '',
                    },
                ],
                content: [],
            };
        },
        async asyncData({ $axios }) {
            let fsrContent = [];
            let fsrContentMeta = {};

            try {
                const { data } = await $axios.get('/ekskursii', { params: { category_limit: 15 } });
                fsrContent = data.data;
                fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
                return null;
            }

            return {
                fsrContent,
                fsrContentMeta,
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
