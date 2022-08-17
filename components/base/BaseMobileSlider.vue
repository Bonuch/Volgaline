<template>
    <div
        class="base-mobile-slider relative overflow-hidden wrapper wrapper-1410 tablet:pr-0"
        :class="{ 'pb-9': pagination }"
    >
        <div class="swiper-wrapper">
            <slot></slot>
        </div>

        <div v-show="buttons">
            <button
                type="button"
                class="swiper-button sm:hidden swiper-button-prev m-0 flex items-center justify-center text-white bg-blue-300 rounded-sm"
            >
                <svg width="12" height="19" viewBox="0 0 12 19" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                        fill="white"
                    />
                </svg>
            </button>

            <button
                type="button"
                class="swiper-button sm:hidden swiper-button-next m-0 flex items-center justify-center text-white bg-blue-300 rounded-sm"
            >
                <svg class="transform rotate-180" width="12" height="19" viewBox="0 0 12 19" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>

        <div v-show="pagination"
             class="base-mobile-slider-swiper-pagination round-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle';

    export default {
        name: 'BaseMobileSlider',
        props: {
            buttons: Boolean,
            pagination: Boolean,
        },
        methods: {
            initSwiper() {
                const $el = this.$el;
                const pagination = $el.querySelector('.base-mobile-slider-swiper-pagination');
                const buttons = $el.querySelectorAll('.swiper-button');
                let prev = buttons[0];
                let next = buttons[1];

                if ($el) {
                    const bannersSwiper = new Swiper($el, {
                        slidesPerView: "auto",
                        spaceBetween: 30,
                        pagination: {
                            el: pagination,
                            clickable: true,
                        },
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
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
    .base-mobile-slider {
        &.exclusive {
            @apply sm:pr-4;

            .swiper-wrapper {
                @apply mb-5 items-stretch;
            }

            .swiper-slide {
                height: auto;
            }

            .base-mobile-slider-swiper-pagination {
                @apply relative;
            }
        }

        .swiper-container {
            width: 100%;
            height: 100%;
        }

        &::v-deep {
            .swiper-button {
                width: 50px;
                height: 50px;
                top: 50%;
                transform: translateY(-50%);
                margin-top: 0 !important;
                transition: all .3s var(--custom-transition);

                &:before,
                &:after {
                    display: none;
                }

                &:hover {
                    @apply bg-orange-400;
                }

                &-prev {
                    left: 0;
                }

                &-next {
                    right: 0;
                }

                svg {
                    width: 24px;
                    height: 24px;
                    fill: #fff;
                }
            }
        }
    }

    @screen xs {
        .base-mobile-slider {
            &::v-deep {
                .swiper-button {
                    top: 44%;
                }
            }
        }
    }

    @media all and (max-width: 400px) {
        .base-mobile-slider {
            &::v-deep {
                .swiper-button {
                    width: 40px;
                    height: 40px;

                    svg {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }
</style>
