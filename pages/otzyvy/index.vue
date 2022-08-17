<template>
    <div class="page-inner page-reviews pt-6">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-14"/>
        </div>

        <div class="wrapper wrapper-1410">
            <div class="page-with-sidebar">
                <div class="page-with-sidebar__left">
                    <div class="mb-5">
                        <h1 v-if="title" class="page-inner-h1 mb-6 leading-1-2">{{ title }}</h1>

                        <div
                            v-if="reviewYears && reviewYears.length > 0"
                            class="flex flex-wrap"
                        >
                            <nuxt-link
                                v-for="(item) in reviewYears"
                                :key="item.id"
                                :to="item.link"
                                class="review-badge py-2 px-4 mb-2 mr-4 text-lg leading-none font-medium border border-gray-50 rounded-sm custom-transition"
                            >
                                <template v-if="title">{{ item.title }}</template>
                            </nuxt-link>
                        </div>
                    </div>

                    <div
                        v-if="reviewPhotos && reviewPhotos.length > 0"
                        class="review-photos py-10 px-11 mb-23 bg-gray-50 rounded-sm xl:bg-white xl:p-0 xl:pb-7 xl:mb-7 xl:border-b xl:border-gray-50"
                    >
                        <p class="mb-9 text-black-900 text-lg sm:font-medium sm:mb-6">Фотографии добавленные пользователями</p>

                        <div class="review-photos-list flex flex-wrap mt-auto -mx-2 tablet:-mx-1 overflow-hidden">
                            <div
                                v-for="(reviewGalleryItem, idx) in reviewPhotos"
                                :key="`review-gallery-item-${idx}`"
                                :data-src="reviewGalleryItem.full"
                                class="w-1/9 px-2 tablet:w-1/5 tablet:px-1 mob:w-1/3 mob:mb-2"
                                :class="{ 'hidden': idx > 8 || (idx > 4 && isTablet) || (idx > 2 && isMobile) }"
                            >
                                <a
                                    :href="reviewGalleryItem.image_900_600"
                                    class="review-photos-image aspect-w-1 aspect-h-1 block bg-gray-200 image-loop-hover image-loop-hover--small overflow-hidden rounded-sm"
                                >
                                    <img
                                        :src="reviewGalleryItem.image_170_170"
                                        :alt="reviewGalleryItem.title"
                                        class="w-full h-full object-cover"
                                    >
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="mobile-buttons hidden mb-14 xl:block">
                        <button
                            type="button"
                            class="button page-reviews-button"
                            @click="handleSendReview"
                        >
                            Оставить отзыв
                        </button>

                        <button
                            type="button"
                            class="button page-reviews-button bg-gray-50 text-black-400"
                            @click="handleSendMessage"
                        >
                            Написать руководству
                        </button>
                    </div>

                    <div class="relative">
                        <div v-show="fsrLoading" class="absolute z-1 left-0 top-0 w-full h-full flex items-center justify-center">
                            <Preloader />
                        </div>

                        <ReviewList
                            :content="fsrContent"
                            :class="{ 'disabled': fsrLoading }"
                            :show-review-btn="false"
                        />

                        <button
                            v-if="fsrShowMoreVisibility"
                            type="button"
                            class="button button button-transparent button-show-more mt-10 xs:mt-4"
                            @click="fsrOnSearchMoreClick('/reviews', getRouteQuery)"
                        >
                            Показать еще
                        </button>
                    </div>
                </div>

                <div class="page-with-sidebar__right xl:hidden">
                    <button
                        type="button"
                        class="button page-reviews-button"
                        @click="handleSendReview"
                    >
                        Оставить отзыв
                    </button>

                    <button
                        type="button"
                        class="button page-reviews-button bg-gray-50 text-black-400"
                        @click="handleSendMessage"
                    >
                        Написать руководству
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { seoHelper, fetchSearchResult } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";

    const pageTitle = "Отзывы";

    function buildYears() {
        const yearStart = 2018;
        const currentYear = new Date().getFullYear();
        const arr = [];

        for (let i = 0; i <= currentYear - yearStart; i++) {
            const title = currentYear - i;

            arr.push({
                id: i + 1,
                title: title,
                link: `/otzyvy/${title}`,
            });
        }
        arr.push({
            id: 0,
            title: 'Все',
            link: '/otzyvy',
        });
        arr.reverse();

        return arr;
    }

    export default {
        components: {
            ReviewList: () => import("@/components/inner/reviews/ReviewList"),
            Preloader: () => import("@/components/base/Preloader"),
            WantForm: () => import("@/components/front/WantForm"),
            Breadcrumbs
        },
        mixins: [seoHelper, fetchSearchResult],
        head() {
            return {
                title: this.getSeoField('title', 'Отзывы о навигации'),
                meta: [
                    { hid: "keywords", name: "keywords", content: 'Волгалайн: Отзывы о навигации «Волгалайн». Речные круизы в России - «Волгалайн»' },
                    { hid: "description", name: 'description', content: this.getSeoField('description', 'Волгалайн: Отзывы о навигации «Волгалайн». Речные круизы в России - «Волгалайн»') },
                    { hid: "og:title", property: "og:title", content: this.getSeoField('title', 'Отзывы о навигации') },
                    { hid: "og:type", property: "og:type", content: 'website' },
                    { hid: "og:description", property: "og:description", content: "Волгалайн: Отзывы о навигации «Волгалайн». Речные круизы в России - «Волгалайн»" },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: "Отзывы о навигации",
                reviewYears: [],
                reviewPhotos: [],
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
                '@type': 'WebPage',
                "name": this.getPageTitle(),
                "image": this.getOgImage(),
                "keywords": 'Волгалайн: Отзывы «Волгалайн». Речные круизы в России - «Волгалайн»',
                "description": 'Волгалайн: Отзывы «Волгалайн». Речные круизы в России - «Волгалайн»',
                "url": this.getPageUrl,
            };
        },
        computed: {
            ...mapGetters({
                'getWindowWidth': 'getWindowWidth',
            }),
            isTablet() {
                return this.getWindowWidth < 861 && this.getWindowWidth > 390;
            },
            isMobile() {
                return this.getWindowWidth < 391;
            },
            getRouteQuery() {
                return this.$route.params.year ? Object.assign({}, this.$route.query, { year: this.$route.params.year }) : this.$route.query;
            },
        },
        methods: {
            initLightgallery() {
                const $el = this.$el;

                if ($el) {
                    const galleryWrap = $el.querySelector(".review-photos-list");

                    if (galleryWrap) {
                        window.lightGallery(galleryWrap, { download: false, selector: 'a' });
                    }
                }
            },
            async fetchReviews() {
                this.fsrLoading = true;
                const params = this.$route.params;
                const year = params && params.year ? params.year : null;

                if (year) {
                    this.breadcrumbs = [
                        {
                            id: 1,
                            title: 'Главная',
                            link: '/',
                        },
                        {
                            id: 2,
                            title: 'Отзывы',
                            link: '/otzyvy',
                        },
                        {
                            id: 3,
                            title: `Отзывы за ${year} год`,
                            link: "",
                        },
                    ];
                }

                try {
                    let data = null;

                    if (year) {
                        let res = await this.$axios.get('/reviews', { params: { year } });
                        data = res.data;
                    } else {
                        let res = await this.$axios.get('/reviews');
                        data = res.data;
                    }

                    this.fsrContent = data.data;
                    this.fsrContentMeta = data.meta;
                    this.fsrLoading = false;
                } catch (ex) {
                    this.fsrLoading = false;
                    console.log("cant fetch reviews: " + ex);
                }
            },
            handleSendReview() {
                this.$store.dispatch('modals/openModal', {
                    name: "ModalReview",
                });
            },
            handleSendMessage() {
                this.$store.dispatch('modals/openModal', {
                    name: "ModalAdministration",
                });
            },
        },
        async asyncData({ $axios, route }) {
            let content = {};
            let title = 'Отзывы о навигации';
            let reviewPhotos = [];
            const reviewYears = buildYears();

            try {
                const { data } = await $axios.get('/review-photos');
                reviewPhotos = data.data;
            } catch (ex) {
                console.log("cant fetch review photos: " + ex);
            }

            try {
                const { data } = await $axios.get(decodeURI(route.path));
                for (const [key, val] of Object.entries(data.content)) {
                    content[key] = val;
                }
                if (content.title) {
                    title = content.title;
                }
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
            }

            return {
                reviewYears,
                reviewPhotos,
                content,
                title,
            };
        },
        async fetch() {
            await this.fetchReviews();
        },
        mounted() {
            this.initLightgallery();
        },
        async beforeRouteUpdate(to, from, next) {
            await this.fetchReviews();
            next();
        }
    };
</script>

<style lang="scss" scoped>
    .page-reviews {
        .page-with-sidebar__right {
            top: 120px;
        }

        &-button {
            display: block;
            width: 100%;
            @apply py-3 mb-5 font-medium text-lg last:mb-0 xl:mx-auto;
        }

        &::v-deep {
            .cruise-detail-tab-content__title {
                display: none;
            }

            .cruise-detail-tab-content > .wrapper {
                max-width: 100%;
                padding: 0;
                margin: 0;
            }
        }
    }

    .review-badge {
        min-width: 80px;
        text-align: center;

        &:hover,
        &:focus {
            @apply bg-blue-400 text-white border-blue-400;
        }

        &.nuxt-link-exact-active {
            @apply bg-blue-900 text-white border-blue-900;
        }
    }
</style>
