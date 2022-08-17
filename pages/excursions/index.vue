<template>
    <div class="page-inner page-excursions pt-12 xl:pt-4">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset xl:mb-10 mb-13"/>
            <h1 v-if="title" class="page-inner-h1 page-inner-h1 xl:text-30 xl:mb-10 mb-15">{{ title }}</h1>
        </div>

        <div class="wrapper wrapper-1410">
            <div
                v-if="fsrContent && fsrContent.length > 0"
                class="excursion-list flex flex-wrap -mx-4 overflow-hidden"
            >

                <article
                    v-for="(item, idx) in fsrContent"
                    :key="idx"
                    class="card w-1/3 xl:w-1/2 sm:w-full px-4 overflow-hidden relative xl:mb-11 mb-18"
                >

                    <img
                        v-if="item.urt || item.image_450_220"
                        class="card__img"
                        :src="item.image_450_220? item.image_450_220: item.urt"
                        :alt="item.title"
                    >

                    <h3
                        class="card__title"
                        v-if="item.title"
                    >
                        <nuxt-link
                            :to="`/excursions/${item.id}`"
                            :title="item.title"
                        >
                            {{ item.title }}
                        </nuxt-link>
                    </h3>

                    <div class="mt-auto">
                        <div
                            v-if="item.short_desc"
                            v-html="item.short_desc"
                            class="card__short_desc"
                        ></div>

                        <nuxt-link
                            :to="`/excursions/${item.id}`"
                            class="card__link"
                            :title="item.title"
                        >
                            Читать подробнее
                        </nuxt-link>
                    </div>
                </article>
            </div>

            <p v-else>На данном теплоходе вы сможете приобрести экскурсии на борту у директора круиза.</p>

            <button
                v-if="fsrShowMoreVisibility"
                type="button"
                class="button button-transparent button-show-more"
                @click="fsrOnSearchMoreClick('/excursions')"
            >
                Показать еще
            </button>
        </div>
    </div>
</template>

<script>
    import { seoHelper, fetchSearchResult } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import WantForm from '@/components/front/WantForm';

    const pageTitle = "Каталог экскурсий";

    export default {
        components: { WantForm, Breadcrumbs },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: this.getPageTitle(),
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Виды и описание экскурсионных программ на маршрутах. Осуществите тур по городам России с комфортом и незабываемой атмосферой речных путешествий вместе с «Волгалайн»' },
                    { hid: "description", name: 'description', content: 'Виды и описание экскурсионных программ на маршрутах. Осуществите тур по городам России с комфортом и незабываемой атмосферой речных путешествий вместе с «Волгалайн»' },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: 'article' },
                    { hid: "og:description", property: "og:description", content: "Виды и описание экскурсионных программ на маршрутах. Осуществите тур по городам России с комфортом и незабываемой атмосферой речных путешествий вместе с «Волгалайн»" },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: pageTitle,
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
                '@type': 'article',
                'name': this.getPageTitle(),
                'image': this.getOgImage(),
                'keywords': 'Виды и описание экскурсионных программ на маршрутах. Осуществите тур по городам России с комфортом и незабываемой атмосферой речных путешествий вместе с «Волгалайн»',
                'description': 'Виды и описание экскурсионных программ на маршрутах. Осуществите тур по городам России с комфортом и незабываемой атмосферой речных путешествий вместе с «Волгалайн»',
                'url': this.getPageUrl,
            };
        },
        async asyncData({ $axios }) {
            let fsrContent = [];
            let fsrContentMeta = {};

            try {
                // const { data } = await $axios.get('/excursions?provider_id=1');
                const { data } = await $axios.get('/excursions');
                fsrContent = data.data;
                fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch excursions: ' + ex);
                return null;
            }

            return {
                fsrContent,
                fsrContentMeta,
            };
        },
    };
</script>

<style></style>
