<template>
    <div class="page-inner page-ships pt-6">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
            <h1 v-if="title" class="page-inner-h1 page-inner-h1--offset mb-10">{{ title }}</h1>

            <ShipHeading
                :sort-list="sortList"
                :deck-types="deckTypes"
                v-on:on-ship-search-by-name="(shipName) => onShipSearchByName(shipName)"
            />

            <div :class="{ 'disabled': fsrLoading }">
                <div
                    v-if="fsrContent && fsrContent.length > 0"
                    class="columns-list columns-list-2cols tablet:mb-10"
                >
                    <div
                        v-for="(item, idx) in fsrContent"
                        :key="`ship-${idx}`"
                        class="columns-list__item"
                    >
                        <div
                            class="excursion-card image-dark-gradient"
                            :style="`backgroundImage: url(${getImage(item.image_url)})`"
                        >
                            <div class="excursion-card__content">
                                <h3
                                    v-show="item.title"
                                    class="excursion-card__name"
                                >
                                    <nuxt-link :to="getLink(item.slug)">{{ item.title }}</nuxt-link>
                                </h3>

                                <nuxt-link
                                    :to="getLink(item.slug)"
                                    class="button excursion-card__link excursion-card__link--offset"
                                >
                                    Подробнее
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>

                <p v-else>Ничего не найдено</p>

                <button
                    v-if="fsrShowMoreVisibility"
                    type="button"
                    class="button button-transparent button-show-more"
                    @click="fsrOnSearchMoreClick('/ships')"
                >
                    Показать еще
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { seoHelper, fetchSearchResult } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import WantForm from "@/components/front/WantForm";
    import ShipHeading from "@/components/ships/ShipHeading";

    export default {
        components: { ShipHeading, WantForm, Breadcrumbs },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: this.getPageTitle(),
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Выберите теплоход для речных путешествий по Россия - мы собрали для Вас популярные речные теплоходы' },
                    { hid: "description", name: 'description', content: 'Выберите теплоход для речных путешествий по Россия - мы собрали для Вас популярные речные теплоходы' },
                    { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                    { hid: "og:type", property: "og:type", content: 'website' },
                    { hid: "og:description", property: "og:description", content: "Выберите теплоход для речных путешествий по Россия - мы собрали для Вас популярные речные теплоходы" },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: "Каталог теплоходов",
                breadcrumbs: [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: "Каталог теплоходов",
                        link: "",
                    },
                ],
                sortList: [
                    {
                        name: "title",
                        title: "Алфавиту",
                        value: "desc",
                    },
                ],
                deckTypes: [
                    {
                        id: 1,
                        name: "Одна палуба",
                        value: 1,
                    },
                    {
                        id: 2,
                        name: "Две палубы",
                        value: 2,
                    },
                    {
                        id: 3,
                        name: "Три палубы",
                        value: 3,
                    },
                    {
                        id: 4,
                        name: "Четыре палубы",
                        value: 4,
                    },
                ],
            };
        },
        computed: {
            ...mapGetters({
                "windowWidth": "getWindowWidth",
            }),
            isMobileScreen() {
                return this.windowWidth < 1025;
            },
            getImage() {
                return (photo) => photo ? photo : "/images/ships/1.jpg";
            },
            getLink() {
                return (slug) => `/ships-catalog/${slug}`;
            }
        },
        methods: {
            async onShipSearchByName(name) {
                await this.fsrSearch("/ships", { search: name });
            },
        },
        jsonld() {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                "name": this.getPageTitle(),
                "image": this.getOgImage(),
                "keywords": 'Выберите теплоход для речных путешествий по Россия - мы собрали для Вас популярные речные теплоходы',
                "description": 'Выберите теплоход для речных путешествий по Россия - мы собрали для Вас популярные речные теплоходы',
                "url": this.getPageUrl,
            };
        },
        async asyncData({ $axios }) {
            let fsrContent = [];
            let fsrContentMeta = {};

            try {
                const { data } = await $axios.get("/ships");
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
        async beforeRouteUpdate(to, from, next) {
            await this.fsrSearch("/ships", to.query);
            next();
        },
    };
</script>

<style></style>
