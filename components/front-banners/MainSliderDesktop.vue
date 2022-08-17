<template>
    <div class="main-slider-desktop main-slider swiper-container w-full bg-blue-400 text-white overflow-hidden">
        <div class="swiper-wrapper">
            <template v-for="(item, idx) in sliderItems"  >
                <a
                    v-if="item.link && !hasButton(item)"
                    :key="item.id"
                    :href="item.link"
                    class="swiper-slide 1 main-slider__slide h-full z-1 pb-28 xl:pb-4"
                >
                    <picture class="absolute z-0 left-0 top-0 w-full h-full">
                        <source media="(max-width: 1280px)" :data-srcset="item.tablet_image"/>
                        <img width="1920" height="700" :data-src="item.image" :alt="item.title" class="swiper-lazy w-full h-full object-cover"/>
                    </picture>

                    <div class="relative z-1 main-slider__wrapper pt-36 pl-44 pb-14 xl:pb-4 xl:h-full xl:pl-0 tablet:pl-7 sm:pl-4 xl:pt-24 lg:pt-16 sm:pt-13 z-2 relative" v-html="item.text">
                    </div>
                    <div class="swiper-lazy-preloader"></div>
                </a>

                <div
                    v-else
                    :key="item.id"
                    class="swiper-slide main-slider__slide h-full z-1 pb-28 xl:pb-4"
                >
                    <img
                        :data-src="item.image"
                        :alt="`Слайд #${idx}`"
                        class="swiper-lazy absolute z-0 left-0 top-0 w-full h-full object-cover"
                        width="1920"
                        height="700"
                    >
                    <div class="relative z-1 main-slider__wrapper pt-36 pl-44 pb-14 xl:pb-4 xl:h-full xl:pl-0 tablet:pl-7 sm:pl-4 xl:pt-24 lg:pt-16 sm:pt-13 z-2 relative" v-html="item.text">
                    </div>
                    <div class="swiper-lazy-preloader"></div>
                </div>
            </template>
        </div>

        <div class="main-slider-swiper-pagination main-slider-desktop-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle';

    export default {
        name: "MainSliderDesktop",
        props: {
            sliderItems: {
                type: Array,
                default: [],
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

                if ($el) {
                    const bannersSwiper = new Swiper($el, {
                        direction: "vertical",
                        slidesPerView: 1,
                        lazy: true,
                        pagination: {
                            el: ".main-slider-desktop-pagination",
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
        .swiper-container {
            width: 100%;
            height: 100%;
        }

        &__wrapper {
            max-width: 1780px;
            margin: 0 auto;
        }

        &__link {
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

    @screen tabletLg {

        .main-slider__wrapper {
            margin: 0 !important;
            padding-left: 30px;
            padding-right: 30px;
        }
    }

    @screen xl {
        .main-slider {
            &__wrapper {
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
        .main-slider {
            height: 465px;
        }
    }
</style>
