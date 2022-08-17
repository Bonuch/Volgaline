<template>
    <div class="directions">
        <div class="swiper-container sm:hidden">
            <div class="swiper-wrapper">
                <div
                    v-for="(item) in arr"
                    :key="item.id"
                    class="swiper-slide directions-slide rounded-sm overflow-hidden"
                >
                    <div class="absolute top-0 flex">
                        <div v-if="item.hot" class="excursion-card__decor">
                            <svg
                                class="directions__icon"
                                width="18"
                                height="24"
                                viewBox="0 0 18 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.58709 23.9564C4.83399 24.1079 5.12295 23.8357 4.97984 23.5833C4.60395 22.9156 4.39071 22.1469 4.39071 21.3249C4.39071 19.5856 5.35299 18.1941 6.76972 17.2683C8.02371 16.4491 7.68148 15.3915 7.88905 14.1319C8.01249 13.3856 8.47818 12.7067 8.86814 12.255C9.02524 12.0727 9.31981 12.1597 9.35908 12.3953C9.58912 13.8092 11.4239 16.2163 12.4815 17.7873C13.699 19.5996 13.6205 21.1959 13.6121 21.3165C13.6121 21.3221 13.6121 21.3277 13.6121 21.3334C13.6093 22.1497 13.3961 22.9156 13.0229 23.5777C12.8799 23.8302 13.1688 24.1051 13.4157 23.9508C15.3626 22.7473 16.7653 20.7611 17.2339 18.5195C17.607 16.7353 17.3966 14.8921 16.7934 13.1864C16.4371 12.1793 15.9462 11.2227 15.3486 10.3361C13.4157 7.46061 10.052 3.05329 9.64807 0.475154C9.57232 0.00104085 8.97196 -0.167283 8.66056 0.197419C8.65495 0.20303 8.08265 0.834246 7.72359 1.53279C7.4178 2.13034 7.16809 2.75595 7.02504 3.40961C6.75572 4.64118 6.80341 5.95972 7.11201 7.18007C7.21303 7.57843 7.34205 7.96839 7.49918 8.34711C7.65065 8.71182 7.81336 9.07933 7.84141 9.47769C7.88633 10.2211 7.21303 10.8636 6.48363 10.8636C5.82997 10.8636 5.28849 10.4708 5.14822 9.73018C5.11175 9.53941 4.89857 9.43845 4.73025 9.53663C2.24746 10.9982 0.581055 13.6998 0.581055 16.7886C0.586581 19.8184 2.18566 22.4751 4.58709 23.9564Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>

                    <div class="directions-image">
                        <nuxt-link
                            v-if="item.link"
                            :to="item.link"
                            :title="item.title"
                        >
                            <img :data-src="item.image" :alt="item.title" width="450" height="158" class="swiper-lazy w-full">
                        </nuxt-link>

                        <div
                            v-else
                            :title="item.title"
                        >
                            <img :data-src="item.image" :alt="item.title" width="450" height="158" class="swiper-lazy w-full">
                        </div>
                    </div>

                    <div class="directions-content flex justify-between items-center rounded-b sm:flex-wrap">
                        <p v-if="item.title" class="line-clamp-2 text-blue-600 text-lg font-medium mb-0 sm:mb-4 sm:flex-100">{{ item.title }}</p>

                        <nuxt-link
                            v-if="item.link && item.title"
                            :to="item.link"
                            class="button py-2 px-5 font-medium bg-transparent text-red-500 border border-red-500 rounded sm:flex-100 hover:border-blue-500"
                            :title="item.title"
                        >
                            Подробнее
                        </nuxt-link>
                    </div>

                    <div class="swiper-lazy-preloader"></div>
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

            <div class="round-pagination"></div>
        </div>

        <div class="hidden sm:block">
            <div
                v-for="(item) in arr"
                :key="`mobile-direction-${item.id}`"
                class="flex border-b border-gray-60 py-5 last:border-none"
            >
                <div class="mr-7" v-if="item.mobile_image">
                    <img class="radial-img" :src="item.mobile_image" :alt="item.title">
                </div>
                <div class="flex flex-col justify-center">
                    <div class="mb-1 text-blue-700 font-medium">{{item.title}}</div>
                    <nuxt-link
                        :to="item.link"
                        class="font-semibold bg-transparent text-red-500 text-left text-sm"
                    >
                        Подробнее
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper/bundle";

    export default {
        name: "Directions",
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
                const pagination = $el.querySelector('.round-pagination');
                const buttons = $el.querySelectorAll('.swiper-button');
                let prev = buttons[0];
                let next = buttons[1];

                if ($el) {
                    const bannersSwiper = new Swiper(container, {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        autoHeight: false,
                        lazy: true,
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
                        },
                        pagination: {
                            el: pagination,
                            clickable: true,
                        },
                        breakpoints: {
                            769: {
                                slidesPerView: 2,
                            },
                            1281: {
                                slidesPerView: 3,
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
    .directions {

        .radial-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }

        &-image {
            mix-blend-mode: normal;

            img {
                max-height: 158px;
            }
        }

        &-content {
            flex: 1;
            margin-bottom: 1px;
            border: 1px solid #E1E1E1;
            border-top: 0;
            @apply px-8 py-7;
        }

        &::v-deep {
            .swiper-container {
                @apply px-6 -mx-6 sm:px-0 sm:-mx-0 pb-9;

                .swiper-slide {
                    height: auto;
                    display: flex;
                    flex-direction: column;
                }

                .swiper-button {
                    width: 30px;
                    height: 30px;
                    @apply absolute flex items-center justify-center rounded hover:bg-orange-400;

                    svg {
                        width: 7px;
                        height: 14px;
                    }

                    &::after {
                        content: '';
                    }

                    &-next {
                        @apply top-1/2 right-3;
                    }

                    &-prev {
                        @apply top-1/2 left-3;
                    }
                }
            }
        }
    }

    @screen md {
        .directions {
            &-image {
                overflow: hidden;
                max-height: 374px;

                img {
                    height: 100%;
                    object-fit: cover;
                }
            }

            &::v-deep {
                .swiper-button {
                    top: 45%;
                }
            }
        }
    }

    @media all and (max-width: 400px) {
        .directions {
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
