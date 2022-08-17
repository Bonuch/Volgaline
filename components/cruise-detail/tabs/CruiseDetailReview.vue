<template>
    <div class="review cruise-detail-reviews__list-item text-lg bg-gray-40 border border-gray-60 rounded xs:text-base">
        <div class="review-wrap flex flex-col overflow-hidden">
            <div class="flex flex-wrap justify-between items-center px-23 tablet:px-12 md:px-4 pt-5">
                <div class="flex items-start mr-4 tablet:w-full tablet:flex-wrap tablet:mr-2 tablet:mb-2">
                    <div class="mt-1 mr-5 mob:mr-3" :class="{'review-name__wrap': longName}">
                        <p v-if="reviewItem.name" class="truncate font-medium m-0 text-xl xs:text-2xl">{{ reviewItem.name }}</p>
                    </div>
                </div>

                <span
                    v-if="reviewItem.review_date"
                    class="text-sm text-black-900 font-medium tablet:w-full"
                >
                    {{ getMobileDateFormatted(reviewItem.review_date) }}
                </span>
            </div>

            <div class="px-23 tablet:px-12 md:px-4 pt-5 pb-8">
              <div class="mb-6">
                  <div v-if="reviewItem.cruise_name">
                      <p class="m-0 text-sm text-black-900 mb-4"><span class="opacity-50">Название круиза:</span> <span class="text-blue-500">{{ reviewItem.cruise_name }}</span></p>
                  </div>

                  <div v-if="reviewItem.ship">
                      <p class="m-0 text-sm text-black-900"><span class="opacity-50">Теплоход:</span> <a :href="`/ships-catalog/${reviewItem.ship.slug}`" class="text-blue-500 border-b border-blue-500">{{ reviewItem.ship.name }}</a></p>
                  </div>
              </div>

              <div
                  v-if="reviewItem.desc"
                  class="review-description h-auto line-clamp-5"
                  v-html="reviewItem.desc"
              >
              </div>

              <div
                  v-if="hasGalleryItems"
                  class="cruise-detail-reviews__gallery flex flex-wrap mt-10 overflow-hidden tablet:-mx-1 tablet:hidden"
              >
                  <div
                      v-for="(reviewGalleryItem, reviewGalleryIdx) in reviewItem.photos"
                      :key="reviewGalleryIdx"
                      :data-src="reviewGalleryItem.full"
                      class="cruise-detail-reviews__gallery-item mr-3.5 tablet:mr-0"
                      :class="{
                          'hidden': Number(reviewGalleryIdx) > galleryItemsNumber - 1,
                          'cruise-detail-reviews__gallery-item--show-more': isShowMoreBlock(reviewGalleryIdx)
                      }"
                  >
                      <a
                          :href="reviewGalleryItem.image_900_600"
                          class="cruise-detail-reviews__gallery-wrap block image-loop-hover image-loop-hover--small bg-gray-50 overflow-hidden"
                      >
                          <span
                              class="flex items-center justify-center w-full h-full text-2xl font-bold"
                              :class="{'hidden': !isShowMoreBlock(reviewGalleryIdx)}"
                          >
                              + {{ reviewItem.photos.length - galleryItemsNumber }}
                          </span>

                          <img :src="reviewGalleryItem.image_90_75" :alt="`Отзыв от ${reviewItem.name}`" class="w-full h-full object-cover">
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
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BadgeRating from "@/components/base/BadgeRating";
import { dayjsHelpers } from "@/mixins/content-helpers";

export default {
    name: "CruiseDetailReview",
    components: { BadgeRating },
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
                const galleryWrap = $el.querySelector(".cruise-detail-reviews__gallery");

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
            @apply text-base leading-normal text-black-900 font-normal sm:text-sm;

            &::v-deep {
                span{
                  font-weight: 400 !important;
                }

                p {
                    @apply text-base leading-normal text-black-900 font-normal last:mb-0 sm:text-sm;
                }

                .readmore-link{
                    @apply text-blue-900 font-normal;
                }
            }
        }

        &::v-deep {
            .badge-rating {
                padding: 8px 6px 9px 11px;
            }
        }
    }

.cruise-detail-reviews__gallery {
    &-item {
        a {
            width: 60px;
            height: 60px;
            @apply rounded;

            img {
                @apply rounded;
            }
        }

        &--show-more {
            .cruise-detail-reviews__gallery-wrap {
                @apply bg-blue-900 bg-opacity-75 text-white;
            }

            img {
                width: 60px;
                height: 60px;

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

@screen tablet {
    .review-name__wrap {
        max-width: calc(100% - 88px);
    }

    .review {
        box-shadow: none;
    }
}

@screen mob {
    .review-name__wrap {
        max-width: calc(100% - 110px);
    }
}
</style>
