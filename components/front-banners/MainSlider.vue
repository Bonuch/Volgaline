<template>
    <div class="main-slider swiper-container w-full bg-blue-400 text-white overflow-hidden">
        <div class="swiper-wrapper">
            <template v-for="(item, idx) in sliderItems">
                <a
                    v-if="item.link"
                    :href="item.link"
                    :key="idx"
                    class="swiper-slide main-slider__slide h-full z-1"
                >
                    <img width="640" height="376" :data-src="item.mobile_image" :alt="item.title" class="swiper-lazy absolute z-0 left-0 top-0 w-full h-full object-cover"/>
                    <div class="relative z-1 main-slider__wrapper pt-36 pl-44 pb-14 xl:pb-4 xl:h-full xl:pl-0 tablet:pl-7 tabletLg:pl-7 tabletLg:pr-7 tabletLg:m-0 xl:pt-24 lg:pt-16 sm:pt-13 z-2 relative mob:pt-5" v-html="item.text">
                    </div>
                    <div class="swiper-lazy-preloader"></div>
                </a>
                <div v-else :key="item.id"
                    class="swiper-slide main-slider__slide h-full z-1"
                >
                    <img width="640" height="376" :data-src="item.mobile_image" :alt="item.title" class="swiper-lazy absolute z-0 left-0 top-0 w-full h-full object-cover"/>
                    <div class="relative z-1 main-slider__wrapper pt-36 pl-44 pb-14 xl:pb-4 xl:h-full xl:pl-0 tablet:pl-7 sm:pl-4 xl:pt-24 lg:pt-16 sm:pt-13 z-2 relative mob:pt-5" v-html="item.text">
                    </div>
                    <div class="swiper-lazy-preloader"></div>
                </div>
            </template>
        </div>

        <div class="main-slider-swiper-pagination main-slider-mobile-pagination round-pagination round-pagination--white"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle';
    import { mapGetters } from "vuex";

export default {
    name: "MainSlider",
    props: {
        sliderItems: {
            type: Array,
            default: [],
        },
    },
    computed: {
        ...mapGetters([
            'getWindowWidth',
        ]),
        hasSlideText() {
            return (text) => {
                return text && (text.replace(/<[^>]*>?/gm, '').split(' ').join('') !== '');
            };
        },
        getSlideText() {
            return (text) => {
                return text ? text.replace(/<p>/gm, '<span>').replace(/<\/p>/gm, '</span>')  : '';
            };
        },
        hasButton() {
            return (item) => {
                return (item.button && item.button.split(' ').join('') !== '');
            };
        },
    },
    methods: {
        initSwiper() {
            const $el = this.$el;

            if ($el) {
                const pagination = $el.querySelector('.main-slider-mobile-pagination');
                const bannersSwiper = new Swiper($el, {
                    slidesPerView: 1,
                    lazy: true,
                    pagination: {
                        el: pagination,
                        clickable: true,
                    },
                });
            }
        },
    },
    mounted() {
        this.initSwiper();
    },
};
</script>

<style lang="scss" scoped>
.main-slider {
    &__slide {
        height: auto;
        min-height: 210px;
        padding-bottom: 20px;
    }

    .round-pagination {
        bottom: 34px !important;
    }

    &::v-deep {
        a {
            color: #fff;
        }
    }
}

@screen xs {
    .main-slider {
        &::v-deep {
            h3 {
                span {
                    //padding: 6px 8px;
                }
            }

            .main-slider-swiper-pagination {
                bottom: 37px;
            }
        }
    }
}
</style>
