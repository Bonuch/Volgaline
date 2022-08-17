<template>
    <div class="page-inner pt-13">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset mb-13"/>
            <h1 v-if="title" class="text-50 md:text-40 font-semibold mb-11">{{ title }}</h1>
        </div>

        <div class="wrapper wrapper-1410">

            <div
                v-if="fsrContent && fsrContent.length > 0"
                class="blog-list -mx-4 overflow-hidden"
            >

                <div
                    v-for="(item, idx) in fsrContent"
                    :key="idx"
                    class='mx-4'
                >
                    <article
                        class="card flex flex-col px-4 overflow-hidden mb-10"
                    >
                        <div class="card__wrap-content">
                            <h3
                                class="card__title mb-7 md:mb-4"
                                v-if="item.title && item.slug"
                            >
                                <nuxt-link
                                    :to="`/blog-o-kruizah/${item.slug}`"
                                    :title="item.title"
                                >
                                    {{item.title}}
                                </nuxt-link>
                            </h3>

                            <!--                            <div-->
                            <!--                                class="card__short_desc"-->
                            <!--                                v-if="item.intro_text"-->
                            <!--                                v-html="item.intro_text"-->
                            <!--                            ></div>-->

                            <!--                            <nuxt-link-->
                            <!--                                :to="`/blog-o-kruizah/${item.slug}`"-->
                            <!--                                :title="item.title"-->
                            <!--                                class="card__link button button-transparent&#45;&#45;blue-300 mt-auto bg-white uppercase border-2"-->
                            <!--                            >-->
                            <!--                                подробнее-->
                            <!--                            </nuxt-link>-->
                        </div>

                        <div class="card__wrap-img">
                            <nuxt-link
                                :to="`/blog-o-kruizah/${item.slug}`"
                                :title="item.title"
                            >
                                <img
                                    class="card__img"
                                    :src="item.image_450_305"
                                    :alt="item.title"
                                >
                            </nuxt-link>
                        </div>
                        <div class='flex flex-wrap mt-7 md:mt-4 mb-0 text-sm text-black-100 items-center'>
                            <div v-if='item.created_at' class="m-0 mr-5">
                                {{ getDateFormattedWithDot(item.created_at) }}
                            </div>
                            <div v-if="item.views_counter !== null" class="flex items-center">
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8806 5.454C15.2952 4.174 12.9999 0 7.99991 0C2.99991 0 0.704581 4.174 0.119247 5.454C0.040673 5.62553 0 5.81199 0 6.00067C0 6.18934 0.040673 6.3758 0.119247 6.54733C0.704581 7.826 2.99991 12 7.99991 12C12.9999 12 15.2952 7.826 15.8806 6.546C15.959 6.37466 15.9996 6.18843 15.9996 6C15.9996 5.81157 15.959 5.62534 15.8806 5.454ZM7.99991 10.6667C3.79525 10.6667 1.83325 7.08933 1.33325 6.00733C1.83325 4.91067 3.79525 1.33333 7.99991 1.33333C12.1946 1.33333 14.1572 4.89533 14.6666 6C14.1572 7.10467 12.1946 10.6667 7.99991 10.6667Z" fill="#696969"/>
                                    <path d="M8.0013 2.66748C7.34203 2.66748 6.69757 2.86298 6.1494 3.22925C5.60124 3.59552 5.174 4.11612 4.92171 4.7252C4.66941 5.33429 4.6034 6.00451 4.73202 6.65112C4.86064 7.29772 5.17811 7.89166 5.64428 8.35784C6.11046 8.82401 6.7044 9.14148 7.351 9.2701C7.99761 9.39872 8.66783 9.33271 9.27692 9.08041C9.886 8.82812 10.4066 8.40088 10.7729 7.85272C11.1391 7.30455 11.3346 6.66009 11.3346 6.00081C11.3336 5.11708 10.982 4.26985 10.3572 3.64496C9.73226 3.02007 8.88503 2.66854 8.0013 2.66748ZM8.0013 8.00082C7.60574 8.00082 7.21906 7.88352 6.89016 7.66375C6.56126 7.44399 6.30492 7.13163 6.15354 6.76618C6.00217 6.40073 5.96256 5.9986 6.03973 5.61063C6.1169 5.22267 6.30738 4.86631 6.58709 4.5866C6.86679 4.3069 7.22316 4.11641 7.61112 4.03924C7.99909 3.96207 8.40122 4.00168 8.76667 4.15305C9.13212 4.30443 9.44448 4.56078 9.66424 4.88967C9.88401 5.21857 10.0013 5.60525 10.0013 6.00081C10.0013 6.53125 9.79059 7.03996 9.41552 7.41503C9.04044 7.7901 8.53174 8.00082 8.0013 8.00082Z" fill="#696969"/>
                                </svg>
                                <span class="ml-1">{{item.views_counter}}</span>
                            </div>
                        </div>
                    </article>
                </div>

            </div>

            <p v-else>Постов о круизах в данный момент нет</p>

            <div class='button-mw-940'>
                <button
                    v-if='fsrShowMoreVisibility'
                    type='button'
                    class='button button-transparent button-show-more '
                    @click="fsrOnSearchMoreClick('/blog-o-kruizah')"
                >
                    Показать еще
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { seoHelper, fetchSearchResult } from "~/mixins/content-helpers";
import { dayjsHelpers } from '@/mixins/content-helpers';
import Breadcrumbs from "@/components/base/Breadcrumbs";
import WantForm from '@/components/front/WantForm';

const pageTitle = "Блог о круизах";
const seoTitle = 'Блог о речных круизах и путешествиях по рекам России на теплоходах';
const metaKeywords = 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы';
const metaDescription = 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы';

export default {
    components: { WantForm, Breadcrumbs },
    mixins: [seoHelper, fetchSearchResult, dayjsHelpers],
    head() {
        return {
            title: this.titlePage,
            meta: [
                { hid: "title", name: "keywords", content: this.getPageTitle() },
                // { hid: "title", name: "keywords", content: seoTitle },
                { hid: "keywords", name: "keywords", content: metaKeywords },
                { hid: "description", name: 'description', content: 'Виды и описание экскурсионных программ на маршрутах. Осуществите тур по городам России с комфортом и незабываемой атмосферой речных путешествий вместе с «Волгалайн»' },
                // { hid: "og:title", property: "og:title", content: seoTitle },
                { hid: "og:type", property: "og:type", content: 'website' },
                { hid: "og:description", property: "og:description", content: metaDescription },
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
        };
    },
    jsonld() {
        return {
            '@context': 'https://schema.org',
            '@type': 'website',
            'name': this.getPageTitle(),
            'image': this.getOgImage(),
            'headline': seoTitle,
            'keywords': metaKeywords,
            'description': metaDescription,
            'url': this.getPageUrl,
        };
    },
    async asyncData({ $axios }) {
        let fsrContent = [];
        let fsrContentMeta = {};

        try {
            const { data } = await $axios.get('/blog-o-kruizah');
            fsrContent = data.data;
            fsrContentMeta = data.meta;
        } catch (ex) {
            console.log('cant fetch blog items : ' + ex);
            return null;
        }

        return {
            fsrContent,
            fsrContentMeta,
        };
    },
};
</script>

<style scoped lang="scss">
.button-mw-940 {
 max-width: 940px;
}
</style>
