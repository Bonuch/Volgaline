<template>
    <div class="cruise-detail-tab-content cruise-detail-reviews">
        <div class="wrapper">
            <div
                v-if="titleOn"
                class="flex items-center justify-between pb-12"
            >
                <div>
                    <h3 class="text-25 m-0 font-medium">Отзывы туристов</h3>
                </div>

                <div v-if="showReviewBtn">
                    <button
                        type="button"
                        class="button px-5 py-2 text-base font-medium"
                        @click="callReview"
                    >
                        Оставить свой отзыв
                    </button>
                </div>
            </div>

            <div
                v-if="content && content.length > 0"
                class="cruise-detail-reviews__list"
            >
                <div class="cruise-detail-reviews__swiper-wrapper">
                    <div class="swiper-container p-8 -m-8 tablet:p-0 tablet:-m-0">
                        <div class="swiper-wrapper">
                            <CruiseDetailReview
                                v-for="(reviewItem, idx) in content"
                                :key="`cruise-detail-reviews__list-${idx}`"
                                class="text-lg last:pb-0 sm:last:mb-0 sm:last:pb-0 swiper-slide"
                                :review-item="reviewItem"
                            />
                        </div>

                        <button
                            type="button"
                            class="swiper-button swiper-button-prev m-0 flex items-center justify-center text-white bg-blue-300 top-1/2 left-4 rounded-sm tablet:hidden"
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
                            class="swiper-button swiper-button-next m-0 flex items-center justify-center text-white bg-blue-300 top-1/2 right-4 rounded-sm tablet:hidden"
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
                </div>
            </div>

            <p v-else>Ничего не найдено. Мы будем рады вашему отзыву!</p>
        </div>
    </div>
</template>

<script>
    import CruiseDetailReview from "./CruiseDetailReview";
    import Swiper from "swiper/bundle";

    export default {
        name: "CruiseDetailReviews",
        data() {
            return {
                activeIndexReview: 0,
            };
        },
        components: { CruiseDetailReview },
        props: {
            content: {
                type: Array,
                default: [],
            },
            showReviewBtn: {
                type: Boolean,
                default: true,
            },
            titleOn: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            callReview() {
                this.$store.dispatch('modals/openModal', {
                    name: "ModalReview",
                });
            },
            initSwiper() {
                const $el = this.$el;
                const container = $el.querySelector('.swiper-container');
                const pagination = $el.querySelector('.round-pagination');
                const buttons = $el.querySelectorAll('.swiper-button');
                let prev = buttons[0];
                let next = buttons[1];

                if ($el) {
                    const bannersSwiper = new Swiper(container, {
                        slidesPerView: "auto",
                        spaceBetween: 20,
                        autoHeight: false,
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
                        },
                        pagination: {
                            el: pagination,
                            clickable: true,
                        },
                        breakpoints: {
                            861: {
                                slidesPerView: 1,
                                spaceBetween: 100,
                            },
                        },
                    });
                }
            },
            getHeightReview() {
                const $el = this.$el;
                const reviews = $el.querySelectorAll('.cruise-detail-reviews__list-item');
                let height = 0;

                reviews.forEach(item => {
                    if (item.clientHeight > height) height = item.clientHeight;
                });

                reviews.forEach(item => {
                   item.style.height = `${height}px`;
                });
            }
        },
        mounted() {
            this.initSwiper();
            this.$nextTick();
            this.getHeightReview();
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-detail-reviews {
        &-btn {
            &:hover {
                @apply bg-blue-300 text-white;
            }
        }

        &__swiper-wrapper {
            @apply relative;
        }
    }

    .swiper-container {
        .swiper-button {
            position: absolute;
            width: 30px;
            height: 30px;

            &:hover,
            &:focus {
                @apply bg-orange-400;
            }

            svg {
                width: 7px;
                height: 14px;
            }

            &:before,
            &::after {
                display: none;
            }
        }
    }

    @screen tablet {
        .swiper-slide {
            max-width: 90%;
        }
    }
</style>
