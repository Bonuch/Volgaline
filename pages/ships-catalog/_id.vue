<template>
    <div class="page-inner page-ship">
        <template v-if="content && Object.keys(content).length > 0">
            <div class="cruise-detail__bg relative z-3 pt-6 pb-24 mb-6 page-inner-bg-gradient md:pb-7">
                <img class="cruise-detail-ship__image" :src="getBg" :alt="`Тх - ${content.title}`">
                <div class="wrapper wrapper-1740 relative z-1">
                    <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-11" />

                    <div class="cruise-detail__heading">
                        <h1
                            v-if="title"
                            class="text-50 leading-1-1 m-0 mb-24 uppercase 2xl:text-44 2xl:mb-16 xl:mb-5 xl:text-36 sm:text-30 mob:text-26"
                        >
                            "{{ title }}"
                        </h1>

                        <template v-if="hasGallery">
                            <div class="cruise-detail-ship__gallery mb-12 md:hidden">
                                <a
                                    v-for="(item, idx) in content.photo"
                                    :key="`ships-gallery-${idx}`"
                                    :href="item.image_900_600"
                                    class="cruise-detail-ship__gallery-item image-loop-hover rounded-sm overflow-hidden"
                                    :class="{ 'hidden': idx > 2 }"
                                >
                                    <img :src="item.image_210_115" :alt="getAlt(item.title)" class="w-full h-full object-cover" />
                                </a>
                            </div>

                            <ClientOnly>
                                <ShipsGallery
                                    v-if="isMdScreen"
                                    :gallery="content.photo"
                                    :ship-name="content.title"
                                    class="my-8"
                                />
                            </ClientOnly>
                        </template>




                        <div class="cruise-detail-ship__info">
                            <ReadMore
                                v-if="content.desc"
                                class="text-lg sm:text-base"
                                :desc="content.desc"
                                readmore-button-selectors="text-white border-white hover:text-blue-400 focus:text-blue-400 active:text-blue-400"
                                :readmore-button-title="`теплохода ${title}`"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrapper wrapper-1740">
                <TabsListHeadingWithScroll
                    v-if="tabsList && tabsList.length > 0"
                    :tabs-list="tabsList"
                />
            </div>

            <!--Схема теплохода-->
            <div
                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"
                id="cruise-detail-section-scheme"
            >
                <ShipScheme
                    :cabin-types="content.cabinTypes"
                    :content="content.decks"
                />
            </div>

            <!--Каюты-->
            <div
                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"
                id="cruise-detail-section-cabins"
            >
                <ShipCabins :content="content.cabins"/>
            </div>

            <!--Команда-->
            <div
                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"
                id="cruise-detail-section-shipTeam"
            >
                <ShipTeam :content="content.team" />
            </div>

            <!--Круизы-->
            <div
                class="page-inner__content cruise-detail__content pt-20 sm:pt-14"
                id="cruise-detail-section-shipCruises"
            >
                <ShipCruises
                    :content="cruises"
                    :section-link="getSectionLink"
                    :loading="cruisesLoading"
                />
            </div>

            <!--Отзывы-->
            <div
                class="page-inner__content cruise-detail__content pt-20 pb-24 sm:py-14"
                id="cruise-detail-section-reviews"
            >
                <CruiseDetailReviews :content="content.reviews" />
            </div>
        </template>

        <template v-else>
            <div class="wrapper wrapper-1740">
                <p>Описание отсутствует</p>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { seoHelper } from "~/mixins/content-helpers";
import Breadcrumbs from "@/components/base/Breadcrumbs";
import WantForm from "@/components/front/WantForm";
import TabsListHeadingWithScroll from "@/components/cruise-detail/tabs/TabsListHeadingWithScroll";
import ShipsGallery from "@/components/cruise-detail/ShipsGallery";

import ShipScheme from "@/components/ships/tabs/ShipScheme";
import ShipCabins from "@/components/ships/tabs/ShipCabins";
import ShipTeam from "@/components/ships/tabs/ShipTeam";
import ShipCruises from "@/components/ships/tabs/ShipCruises";
import CruiseDetailReviews from "@/components/cruise-detail/tabs/CruiseDetailReviews";
import ReadMore from '@/components/base/readmore/ReadMore';

export default {
    components: {
        ReadMore,
        TabsListHeadingWithScroll,
        ShipsGallery,
        CruiseDetailReviews,
        ShipCruises,
        ShipTeam,
        ShipCabins,
        ShipScheme,
        WantForm,
        Breadcrumbs,
    },
    mixins: [seoHelper],
    middleware({ redirect, params }) {
        const decodedSlug = decodeURI(params.id);
        redirect(301, `/populyarnye-kruiznye-teplohody/${decodedSlug}`);
    },
    head() {
        return {
            title: `Теплоход «${this.getContentTitle}»`,
            meta: [
                { hid: "keywords", name: "keywords", content: this.getSeoField('keywords', `Волгалайн: Теплоходы, речные круизы на теплоходах, речные круизы 2022 года`) },
                { hid: "description", name: 'description', content: `Теплоход «${this.getContentTitle}» - расписание и цены на ближайшие речные круизы` },
                { hid: "og:title", property: "og:title", content: `Теплоход «${this.getContentTitle}»` },
                { hid: "og:type", property: "og:type", content: 'website' },
                { hid: "og:description", property: "og:description", content: 'Волгалайн: Теплоходы, речные круизы на теплоходах' },
                { hid: "og:url", property: "og:url", content: this.getPageUrl },
                { hid: "og:image", property: "og:image", content: this.getOgImage("image_url") },
            ],
        };
    },
    data() {
        return {
            cruisesLoading: false,
            title: "",
            content: null,
            breadcrumbs: [],
            tabsList: [
                {
                    name: "Схема",
                    link: "scheme",
                    content: "schemeTab",
                    icon: "InfoIcon",
                },
                {
                    name: "Каюты",
                    link: "cabins",
                    content: "cabinTab",
                    icon: "PriceIcon",
                },
                {
                    name: "Команда",
                    link: "shipTeam",
                    content: "teamTab",
                    icon: "TeamIcon",
                },
                {
                    name: "Круизы",
                    link: "shipCruises",
                    content: "cruisesTab",
                    icon: "RoadIcon",
                },
                {
                    name: "Отзывы",
                    link: "reviews",
                    content: "reviewsTab",
                    icon: "ReviewIcon",
                },
            ],
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth"]),
        isMdScreen() {
            return this.getWindowWidth < 769;
        },
        getBg() {
            return this.content && this.content.image_url ? this.content.image_url : "/images/inner/about-bg.jpg";
        },
        hasGallery() {
            return this.content && this.content.photo.length > 0;
        },
        getSectionLink() {
            return this.content && this.content.id ? `/rechnye-kruizy?ships=${this.content.id}` : "/rechnye-kruizy";
        },
        getContentTitle() {
            return this.content && this.content.title ? this.content.title : 'Теплоход';
        },
    },
    methods: {
        initLightgallery() {
            const $el = this.$el;
            const galleryWrap = $el.querySelector(".cruise-detail-ship__gallery");

            if (galleryWrap) {
                window.lightGallery(galleryWrap, { download: false });
            }
        },
        getAlt(alt) {
            return alt ? alt : `Тх - ${this.content.title}`;
        },
    },
    mounted() {
        this.initLightgallery();
    },
    async asyncData({ $axios, params, redirect, error }) {
        const decodedSlug = decodeURI(params.id);
        let title = null;
        let content = {};
        let cruises = [];
        let breadcrumbs = [];

        try {
            const { data } = await $axios.get(`/ships/${decodedSlug}`);
            content = data.data;
            title = content.title;
            breadcrumbs = [
                {
                    id: 1,
                    title: "Главная",
                    link: "/",
                },
                {
                    id: 2,
                    title: "Каталог теплоходов",
                    link: "/ships-catalog",
                },
                {
                    id: 3,
                    title,
                    link: "",
                },
            ];
        } catch (ex) {
            if (ex?.response?.status === 404) {
                error({ statusCode: 404, message: "cant fetch content" });
            } else {
                return null;
            }
        }

        if (content && Object.keys(content).length > 0) {
            try {
                const { data } = await $axios.get("/cruise/search", {
                    params: {
                        ships: content.id,
                    }
                });
                cruises = data.data;
            } catch (ex) {
                console.log("cant fetch cruises: " + ex);
            }
        }

        return {
            breadcrumbs,
            title,
            content,
            cruises,
        };
    },
    async beforeRouteUpdate(to, from, next) {
        try {
            this.cruisesLoading = true;
            const query = Object.assign({}, to.query, { ships: this.content.id });
            const { data } = await this.$axios.get("/cruise/search", { params: query });
            this.cruises = data.data;
            this.cruisesLoading = false;
        } catch (e) {
            this.cruisesLoading = false;
            console.log("cant fetch cruises: " + e);
        }

        next();
    },
};
</script>

<style lang="scss" scoped>
    .page-ship {
        .cruise-detail__heading {
            max-width: 100%;
        }

        .cruise-detail-ship__info,
        .cruise-detail-ship__gallery {
            max-width: 860px;
        }

        .cruise-detail-ship__info {
            &::v-deep {
                .readmore-height .readmore-desc.has-overflow:after {
                    background: linear-gradient(to right, rgba(11, 62, 131, 0), rgba(11, 62, 131, 0.1) 50%);
                }
            }
        }
    }

@screen 2xl {
    .cruise-detail__bg {
        &:after {
            background: linear-gradient(270deg, rgba(11, 62, 131, 0) -30%, #0B3E83 100%);
        }
    }
}
</style>
