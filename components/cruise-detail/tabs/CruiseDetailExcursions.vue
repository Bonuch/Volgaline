<template>
    <div class="cruise-detail-tab-content cruise-detail-excursions">
        <div class="wrapper">
            <h3 class="cruise-detail-tab-content__title">Экскурсии</h3>

            <div
                v-if="content && content.length > 0"
                class="cruise-detail-excursion swiper-container"
            >
                <div class="swiper-wrapper">
                    <div
                        v-for="(item, idx) in content"
                        :key="`cruise-detail-excursion-${idx}`"
                        class="swiper-slide image-dark-gradient excursion-card"
                        :style="`background-image: url(${item.urt})`"
                    >
                        <div
                            class="cruise-detail-excursion__content excursion-card__content"
                        >
                            <div v-if="item.day" class="badge excursion-card__badge">
                                <span>{{ item.day }}</span> День
                            </div>

                            <h3 v-if="item.title" class="excursion-card__name line-clamp-3 h-auto"
                                v-html="item.title"></h3>

                            <nuxt-link
                                :to="`excursions/${item.id}`"
                                class="button excursion-card__link excursion-card__link--offset"
                            >
                                Подробнее
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="cruise-detail-excursion__btn swiper-button swiper-button-prev m-0 flex items-center justify-center text-white bg-blue-300 rounded-sm overflow-hidden"
                >
                    <svg
                        width="12" height="19" viewBox="0 0 12 19" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                            fill="white"
                        />
                    </svg>
                </button>

                <button
                    type="button"
                    class="cruise-detail-excursion__btn swiper-button swiper-button-next m-0 flex items-center justify-center text-white bg-blue-300 rounded-sm overflow-hidden"
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

            <p v-else>На данном теплоходе вы сможете приобрести экскурсии на борту у директора круиза.</p>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper/bundle";

export default {
    name: "CruiseDetailExcursions",
    props: {
        content: {
            type: Array,
            required: true,
        },
    },
    methods: {
        initSwiper() {
            const $el = this.$el;
            const list = $el.querySelector(".cruise-detail-excursion");

            if ($el && list) {
                const bannersSwiper = new Swiper(list, {
                    slidesPerView: 1,
                    spaceBetween: 36,
                    autoHeight: true,
                    preloadImages: false,
                    lazy: true,
                    navigation: {
                        prevEl: `.cruise-detail-excursion__btn.swiper-button-prev`,
                        nextEl: `.cruise-detail-excursion__btn.swiper-button-next`,
                    },
                    breakpoints: {
                        861: {
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
.cruise-detail-excursion {
    &__content {
        @apply p-12 mob:py-6 mob:px-9;
    }

    &::v-deep {
        .swiper-button {
            width: 50px;
            height: 50px;
            top: 50%;
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

@media all and (max-width: 400px) {
    .cruise-detail-excursion {
        &::v-deep {
            .swiper-button {
                width: 40px;
                height: 40px;
                top: 30%;

                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
}
</style>
