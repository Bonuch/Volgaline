<template>
    <div class="review-list-item text-lg xs:text-base">
        <div class="flex flex-col overflow-hidden">
            <div class="flex flex-wrap items-center justify-between mb-4">
                <div class="flex items-start mr-4 sm:w-full sm:flex-wrap sm:mr-2 sm:mb-2">
                    <div class="mt-1 mr-5 mob:mr-3" :class="{'review-name__wrap': longName}">
                        <h3 v-if="reviewItem.name" class="truncate m-0 text-26 xs:text-2xl">{{ reviewItem.name }}</h3>
                    </div>

                    <BadgeRating
                        v-if="reviewItem.score_in_points"
                        :count="reviewItem.score_in_points"
                        class="text-base xs:text-sm"
                    />
                </div>

                <span
                    v-if="reviewItem.review_date"
                    class="text-base text-gray-500 sm:font-medium sm:w-full"
                >
                    {{ getMobileDateFormatted(reviewItem.review_date) }}
                </span>
            </div>

            <div class="mb-12 xs:mb-8">
                <div v-if="reviewItem.cruise_name" class="mb-3">
                    <p class="m-0 font-bold">Название круиза:</p>
                    <p class="m-0 text-blue-500">{{ reviewItem.cruise_name }}</p>
                </div>

                <div v-if="reviewItem.ship">
                    <p class="m-0 font-bold">Теплоход:</p>
                    <p class="m-0 text-blue-500"><a :href="`/ships-catalog/${reviewItem.ship.slug}`">{{ reviewItem.ship.name }}</a></p>
                </div>
            </div>

            <ReadMore
                v-if="reviewItem.desc"
                class="review-description"
                :desc="reviewItem.desc"
            />

            <div
                v-if="hasGalleryItems"
                class="review-list-item__gallery flex flex-wrap mt-10 -mx-5 overflow-hidden tablet:-mx-1"
            >
                <div
                    v-for="(reviewGalleryItem, reviewGalleryIdx) in reviewItem.photos"
                    :key="reviewGalleryIdx"
                    :data-src="reviewGalleryItem.full"
                    class="review-list-item__gallery-item w-1/7 px-5 tablet:w-1/5 tablet:px-1 mob:w-1/3 mob:mb-2"
                    :class="{
                        'hidden': Number(reviewGalleryIdx) > galleryItemsNumber - 1,
                        'review-list-item__gallery-item--show-more': isShowMoreBlock(reviewGalleryIdx)
                    }"
                >
                    <a
                        :href="reviewGalleryItem.image_900_600"
                        class="review-list-item__gallery-wrap block aspect-w-1 aspect-h-1 image-loop-hover image-loop-hover--small bg-gray-50 rounded-sm overflow-hidden"
                    >
                        <span
                            class="flex items-center justify-center w-full h-full text-2xl font-bold"
                            :class="{'hidden': !isShowMoreBlock(reviewGalleryIdx)}"
                        >
                            + {{ reviewItem.photos.length - galleryItemsNumber }}
                        </span>

                        <img :src="reviewGalleryItem.image_170_170" :alt="`Отзыв от ${reviewItem.name}`" class="w-full h-full object-cover">
                    </a>
                </div>
            </div>

            <div
                v-if="reviewItem.response"
                class="review-response p-7 mt-12 bg-blue-900 text-white rounded-sm xl:bg-gray-50 xl:text-black-400 xl:mt-7 mob:p-4"
            >
                <h4 class="m-0 mb-3 text-xl font-bold xl:text-blue-900 xl:font-medium mob:text-lg">Администрация “Волгалайн”</h4>
                <p class="m-0 text-base leading-snug">{{ reviewItem.response }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import BadgeRating from "@/components/base/BadgeRating";
    import { dayjsHelpers } from "@/mixins/content-helpers";
    import ReadMore from '@/components/base/readmore/ReadMore';

    export default {
        name: "ReviewListItem",
        components: { ReadMore, BadgeRating },
        mixins: [dayjsHelpers],
        props: {
            reviewItem: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                galleryItemsNumber: 5,
                slicedGallery: [],
            };
        },
        methods: {
            initLightgallery() {
                const $el = this.$el;

                if ($el) {
                    const galleryWrap = $el.querySelector(".review-list-item__gallery");

                    if (galleryWrap) {
                        window.lightGallery(galleryWrap, { download: false, selector: 'a' });
                    }
                }
            },
            calculateGalleryItemsNumber(width) {
                let number = 3;

                if (width > 480 && width < 640) {
                    number = 5;
                } else if (width >= 640) {
                    number = 7;
                }

                this.galleryItemsNumber = number;
            },
        },
        computed: {
            ...mapGetters(["getWindowWidth"]),
            longName() {
                return this.reviewItem.name && this.reviewItem.name.length >= 18;
            },
            hasGalleryItems() {
                return this.reviewItem.photos && this.reviewItem.photos.length > 0;
            },
            isShowMoreBlock() {
                return (idx) => this.reviewItem.photos.length > this.galleryItemsNumber && idx === this.galleryItemsNumber - 1;
            },
        },
        mounted() {
            this.initLightgallery();
        },
        watch: {
            getWindowWidth(width) {
                this.calculateGalleryItemsNumber(width);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .review {
        .review-description {
            &::v-deep {
                p {
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                }
            }
        }

        &::v-deep {
            .badge-rating {
                padding: 10px 8px 11px 13px;
            }
        }
    }

    .review-list-item__gallery {
        &-item {
            &--show-more {
                .review-list-item__gallery-wrap {
                    @apply bg-blue-900 bg-opacity-75 text-white;
                }

                img {
                    display: none;
                }
            }
        }
    }

    .review-response{
        h4{
            margin-bottom: 14px;
        }
    }
    @screen sm {
        .review-name__wrap {
            max-width: calc(100% - 88px);
        }
    }

    @screen mob {
        .review-name__wrap {
            max-width: calc(100% - 110px);
        }
    }
</style>
