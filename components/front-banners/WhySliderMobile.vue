<template>
    <div class="why-slider-mobile swiper-container">
        <h2 class="section-title mb-10">Почему с нами отдыхают</h2>

        <div class="swiper-wrapper mb-10">
            <div
                v-for="(item) in sliderItems"
                :key="item.id"
                class="swiper-slide why-slider-mobile__slide rounded-sm"
                :style="`background-image: url(${item.image})`"
            >
                <div class="why-slider-mobile__wrap absolute z-1 left-0 top-0 w-full h-full flex flex-col p-13">
                    <h3
                        v-if="item.title"
                        class="why-slider-mobile__title mt-auto text-white text-30 leading-1-2 uppercase font-bold"
                        v-html="item.title"
                    ></h3>
                </div>
            </div>
        </div>

        <div class="why-slider-mobile-swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle';

    export default {
        name: "WhySliderMobile",
        props: {
            sliderItems: {
                type: Array,
                required: true,
            },
        },
        methods: {
            initSwiper() {
                const gallery = document.querySelector(".why-slider-mobile");

                if (gallery) {
                    const bannersSwiper = new Swiper(".why-slider-mobile", {
                        autoHeight: true,
                        slidesPerView: 1,
                        preloadImages: false,
                        lazy: true,
                        // autoplay: {
                        //     delay: 6000,
                        // },
                        pagination: {
                            el: ".why-slider-mobile-swiper-pagination",
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
    .why-slider-mobile {
        min-height: 380px;

        &__slide {
            position: relative;
            height: 0;
            background-repeat: no-repeat;
            background-position: top center;
            background-size: cover;
            overflow: hidden;

            &:before {
                content: '';
                background: var(--custom-gray-gradient);
                z-index: 0;
                @apply absolute left-0 top-0 w-full h-full;
            }
        }

        &::v-deep {
            .why-slider-mobile-swiper-pagination {
                z-index: 1;
                position: absolute;
                bottom: 14px;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;

                .swiper-pagination-bullet {
                    margin-right: 16px;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            .swiper-pagination-bullet {
                width: 12px;
                height: 12px;
                border: 0;
                border-radius: 50%;
                opacity: 0.6;
                transition: all .3s var(--custom-transition);
                @apply bg-gray-100;

                &-active {
                    width: 28px;
                    opacity: 1;
                    background-color: #fff;
                    border-radius: 30px;
                    @apply bg-blue-900;
                }
            }
        }
    }

    @media all and (max-width: 860px) {
        .why-slider-mobile {
            &__wrap {
                @apply p-4;
            }
        }
    }

    @screen sm {
        .why-slider-mobile {
            &__slide {
                padding-bottom: 100%;
            }
        }
    }

    @screen mob {
        .why-slider-mobile {
            &__title {
                @apply text-22;
            }
        }
    }
</style>
