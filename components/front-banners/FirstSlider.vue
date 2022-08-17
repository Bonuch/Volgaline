<template>
    <div
        class="main-slider swiper-container w-full bg-blue-400 text-white overflow-hidden"
        :class="{ 'main-slider-desktop': !isMobile, 'main-slider-mobile': isMobile }"
    >
        <div class="swiper-wrapper">
            <template v-for="(item) in sliderItems">
                <a
                    v-if="item.link && !hasButton(item)"
                    :key="item.id"
                    :href="item.link"
                    class="swiper-slide main-slider__slide h-full z-1 pb-28 xl:pb-4 sm:pb-0"
                >
                    <picture class="absolute z-0 left-0 top-0 w-full h-full">
                        <source media="(max-width: 640px)" :srcset="item.mobile_image"/>
                        <source media="(max-width: 1280px)" :srcset="item.tablet_image"/>
                        <img width="1920" height="700" :src="item.image" :alt="item.title" class="w-full h-full object-cover"/>
                    </picture>

                    <div class="relative z-2 main-slider__wrapper pt-36 pl-44 pb-14 xl:h-full xl:pt-24 xl:pb-4 xl:pl-0 lg:pt-16 tablet:px-7 sm:pt-13 sm:px-4 mob:pt-5" v-html="item.text">
                    </div>
                </a>

                <div
                    v-else
                    :key="item.id"
                    class="swiper-slide main-slider__slide h-full z-1 pb-28 xl:pb-4"
                >
                    <picture class="absolute z-0 left-0 top-0 w-full h-full">
                        <source media="(max-width: 640px)" :srcset="item.mobile_image"/>
                        <source media="(max-width: 1280px)" :srcset="item.tablet_image"/>
                        <img width="1920" height="700" :src="item.image" :alt="item.title" class="w-full h-full object-cover"/>
                    </picture>

                    <div class="relative z-2 main-slider__wrapper pt-36 pl-44 pb-14 xl:h-full xl:pt-24 xl:pb-4 xl:pl-0 lg:pt-16 lg:px-7 sm:pt-13 sm:px-4 mob:pt-5" v-html="item.text">
                    </div>
                </div>
            </template>
        </div>

        <div v-show="!isMobile" class="main-slider-swiper-pagination"></div>
        <div v-show="isMobile" class="main-slider-swiper-pagination round-pagination round-pagination--white"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle';
    import debounce from 'lodash/debounce';

    let mainSliderSwiper = null;

    function getDirection() {
        return window.innerWidth < 640 ? 'horizontal' : 'vertical';
    }

    export default {
        name: "FirstSlider",
        props: {
            sliderItems: {
                type: Array,
                default: [],
            },
            isMobile: {
                type: Boolean,
            },
        },
        computed: {
            hasSlideText() {
                return (text) => {
                    return text && (text.replace(/<[^>]*>?/gm, '').split(' ').join('') !== '');
                };
            },
            getSlideText() {
                return (text) => {
                    return text ? text.replace(/<p>/gm, '<span>').replace(/<\/p>/gm, '</span>') : '';
                };
            },
            hasButton() {
                return (item) => {
                    return (item.button);
                };
            },
        },
        methods: {
            initSwiper() {
                const $el = this.$el;
                const pagination = ".main-slider-swiper-pagination";

                if ($el) {
                    mainSliderSwiper = new Swiper($el, {
                        direction: getDirection(),
                        slidesPerView: 1,
                        pagination: {
                            el: pagination,
                            clickable: true,
                        },
                        on: {
                            resize: debounce(function() {
                                mainSliderSwiper.changeDirection(getDirection(), true);
                            }, 300),
                        }
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
    .main-slider-desktop {
        .swiper-container {
            width: 100%;
            height: 100%;
        }

        .main-slider__wrapper {
            max-width: 1780px;
            margin: 0 auto;
        }

        .main-slider__link {
            max-width: 258px;
        }

        &::v-deep {
            a {
                color: #fff;
            }

            .main-slider-swiper-pagination {
                z-index: 1;
                position: absolute;
                top: 43%;
                right: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transform: translateY(-50%);
            }

            .swiper-pagination-bullet {
                opacity: 1;
                width: 10px;
                height: 10px;
                margin: 0 0 50px;
                background-color: transparent;
                border: 2px solid #fff;
                border-radius: 50%;
                transition: width, height .3s var(--custom-transition);

                &:last-of-type {
                    margin-bottom: 0;
                }

                &-active {
                    width: 10px;
                    height: 20px;
                    background-color: #fff;
                    border: 0;
                    border-radius: 30px;
                }
            }
        }
    }

    @screen xl {
        .main-slider-desktop {
            .main-slider__wrapper {
                max-width: 900px;
                margin: 0 auto;
            }

            &::v-deep {
                .swiper-pagination-bullet {
                    margin-bottom: 34px;
                }
            }
        }
    }

    @screen lg {
        .main-slider-desktop {
            height: 465px;
        }
    }

    @screen sm {
        .main-slider {
            &__slide {
                height: auto;
                min-height: 210px;
                padding-bottom: 20px;
            }

            .round-pagination {
                z-index: 1;
                position: absolute;
                left: 50% !important;
                bottom: 34px !important;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: translateX(-50%);
            }

            &::v-deep {
                a {
                    color: #fff;
                }
            }
        }
    }


    @screen xs {
        .main-slider {
            &::v-deep {
                .main-slider-swiper-pagination {
                    bottom: 37px;
                }
            }
        }
    }
</style>
