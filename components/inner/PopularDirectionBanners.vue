<template>
    <div class="popular-direction-banners">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div
                    v-for="(item) in arr"
                    :key="item.id"
                    class="swiper-slide"
                >
                    <article class="image-dark-gradient h-full rounded-sm overflow-hidden">
                        <div class="popular-direction-banners-image h-full">
                            <img :src="item.image" :alt="item.title" class="w-full">
                        </div>

                        <div
                            class="popular-direction-banners-content absolute left-0 top-0 h-full flex flex-col justify-end py-5 px-7 text-white"
                        >
                                <slot name="link" :item="item">
                                    <nuxt-link
                                        v-if="item.title"
                                        :to="item.link"
                                        :title="item.title"
                                        class="m-0 text-26 font-bold leading-1-1 line-clamp-2 h-auto"
                                    >
                                        {{ item.title }}
                                    </nuxt-link>
                                </slot>
                        </div>
                    </article>
                </div>
            </div>

            <button
                type="button"
                class="directions__btn swiper-button swiper-button-prev m-0 flex items-center justify-center text-white bg-blue-300"
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
                class="directions__btn swiper-button swiper-button-next m-0 flex items-center justify-center text-white bg-blue-300"
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

            <!--            <div class="round-pagination"></div>-->
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle';

    export default {
        name: 'PopularDirectionBanners',
        props: {
            arr: {
                type: Array,
                default: [],
            },
        },
        methods: {
            initSwiper() {
                const $el = this.$el;
                const container = $el.querySelector('.swiper-container');
                // const pagination = $el.querySelector('.round-pagination');
                const buttons = $el.querySelectorAll('.swiper-button');
                let prev = buttons[0];
                let next = buttons[1];

                if ($el) {
                    const bannersSwiper = new Swiper(container, {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        autoHeight: false,
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
                        },
                        // pagination: {
                        //     el: pagination,
                        //     clickable: true,
                        // },
                        breakpoints: {
                            769: {
                                slidesPerView: 2,
                            },
                            1281: {
                                slidesPerView: 4,
                            },
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
    .popular-direction-banners {
        &-image {
            mix-blend-mode: normal;

            img {
                width: 100%;
                height: 230px;
                object-fit: cover;
            }
        }

        &-content {
        }

        &::v-deep {
            a {
                color: #fff;

                &:hover,
                &:focus {
                    @apply text-yellow-400;
                }
            }

            .swiper-slide {
                display: flex;
                flex-direction: column;
                height: auto;
            }

            .swiper-button {
                width: 50px;
                height: 50px;
                top: 50%;
                margin: 0;
                transform: translateY(-50%);
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

    @screen md {
        .popular-direction-banners {
            &::v-deep {
                .swiper-button {
                    top: 45%;
                }
            }
        }
    }

    @screen sm {
        .popular-direction-banners {
            &-image {
                mix-blend-mode: normal;

                img {
                    height: 100%;
                    min-height: 380px;
                }
            }
        }
    }

    @media all and (max-width: 400px) {
        .popular-direction-banners {
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
