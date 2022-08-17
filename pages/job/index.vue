<template>
    <div class="page-inner page-news pt-6">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
            <h1 v-if="title" class="page-inner-h1 page-inner-h1--offset mb-10">{{ title }}</h1>

            <div class="page-inner__content mb-16 xl:mb-10">
                <template v-if="fsrContent && fsrContent.length > 0">
                    <JobCard
                        v-for="(item, itemIdx) in fsrContent"
                        :key="itemIdx"
                        :job-item="item"
                        class="columns-list__item"
                    />
                </template>

                <p v-else>Вакансий в данный момент нет</p>

                <button
                    v-if="fsrShowMoreVisibility"
                    type="button"
                    class="button button-transparent button-show-more"
                    @click="fsrOnSearchMoreClick('/vacancies')"
                >
                    Показать еще
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { seoHelper, fetchSearchResult } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import JobCard from "@/components/inner/JobCard";
    import WantForm from "@/components/front/WantForm";

    const pageTitle = "Вакансии";
    const seoTitle = 'Вакансии круизной компании "Волга Лайн"';

    export default {
        components: { WantForm, JobCard, Breadcrumbs },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: this.titlePage,
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Вакансии в круизной судоходной компании «Волгалайн»' },
                    { hid: "description", name: 'description', content: 'Актуальные вакансии в круизной компании "Волга Лайн" это - стабильная заработная плата, работа в молодом современном коллективе, возможность приобретения круизов для себя и своих близких со значительной скидкой' },
                    { hid: "og:title", property: "og:title", content: this.titleSeo },
                    { hid: "og:type", property: "og:type", content: 'website' },
                    { hid: "og:description", property: "og:description", content: this.description },
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
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: pageTitle,
                        link: "",
                    },
                ],
                content: [],
            };
        },
        jsonld() {
           if (this.fsrContent && Object.keys(this.fsrContent).length > 0) {
               return {
                   '@context': 'https://schema.org',
                   '@type': 'WebPage',
                   "name": this.getPageTitle(),
                   "image": this.getOgImage(),
                   "keywords": 'Вакансии в круизной судоходной компании «Волгалайн»',
                   "description": 'Вакансии в круизной судоходной компании «Волгалайн»',
                   "url": this.getPageUrl,
               };
           } else {
               return null;
           }
        },
        async asyncData({ $axios }) {
            let fsrContent = [];
            let fsrContentMeta = {};
            let titleSeo = 'Вакансии круизной компании "Волга Лайн"';
            let description = 'Актуальные вакансии в круизной компании "Волга Лайн" это - стабильная заработная плата, работа в молодом современном коллективе, возможность приобретения круизов для себя и своих близких со значительной скидкой';

            try {
                const { data } = await $axios.get('/vacancies');
                fsrContent = data.data;
                fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch jobs: ' + ex);
                return null;
            }

            return {
                fsrContent,
                fsrContentMeta,
                titleSeo,
                description,
            };
        },
    };
</script>

<style></style>
