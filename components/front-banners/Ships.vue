<template>
    <div class="ships swiper-container h-full">
        <div class="swiper-wrapper h-full">
            <div
                v-for="(item) in items"
                :key="item.id"
                class="bg-blue-400 swiper-slide ships__slide relative flex flex-col items-end h-full px-2 pb-2 bg-center bg-no-repeat bg-cover rounded-sm overflow-hidden"
            >
                <div v-if="item.image" class="ships__image absolute left-0 top-0 w-full h-full md:aspect-w-16 md:aspect-h-9 sm:aspect-h-10 xs:aspect-h-2 xs:aspect-w-2">
                    <picture>
                        <source media="(max-width: 420px)" :srcset="item.mobile_image"/>
                        <img :src="item.image" :alt="item.title" class="w-full h-full object-cover"/>
                    </picture>
                </div>

                <div
                    class="ships__content relative z-2 flex items-center justify-between p-5 pb-4 md:py-4 md:px-6 mt-auto rounded-sm overflow-hidden"
                >
                    <div class="ships__text flex-1-1">
                        <div class="text-sm">Теплоход</div>
                        <p v-if="item.title" class="m-0 mt-1 mb-3.5 md:mb-1">
                            <NuxtLink
                                :to="getLink(item)"
                                class="ships__link inline-block text-xl font-medium hover:text-orange-100"
                            >
                                {{item.title}}
                            </NuxtLink>
                        </p>

                        <NuxtLink to="/populyarnye-kruiznye-teplohody" class="link-inline-icon" :prefetch="false">
                            <span class="text-sm">Все теплоходы</span>
                            <svg
                                width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068
                                        c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557
                                        l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104
                                        c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z"
                                />
                            </svg>
                        </NuxtLink>
                    </div>

                    <div class="ships__controls flex items-center mt-3 ml-12">
                        <button type="button" class="ships__btn swiper-button swiper-button-prev mr-3">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0603 11.7522C10.4297 11.3417 10.3964 10.7094 9.98593 10.3399L6.16135 6.89783L9.98593 3.4557C10.3964 3.08624 10.4297 2.45395 10.0603 2.04344C9.6908 1.63293 9.05851 1.59966 8.648 1.96912L3.99754 6.15453C3.78683 6.34417 3.6665 6.61434 3.6665 6.89783C3.6665 7.18131 3.78683 7.45148 3.99754 7.64112L8.648 11.8265C9.05851 12.196 9.6908 12.1627 10.0603 11.7522Z" fill="#0C73FE"/>
                            </svg>
                        </button>

                        <button type="button" class="ships__btn swiper-button swiper-button-next">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.93974 11.7522C3.57028 11.3417 3.60356 10.7094 4.01407 10.3399L7.83865 6.89783L4.01407 3.4557C3.60356 3.08624 3.57028 2.45395 3.93974 2.04344C4.3092 1.63293 4.94149 1.59966 5.352 1.96912L10.0025 6.15453C10.2132 6.34417 10.3335 6.61434 10.3335 6.89783C10.3335 7.18131 10.2132 7.45148 10.0025 7.64112L5.352 11.8265C4.94149 12.196 4.3092 12.1627 3.93974 11.7522Z" fill="#0C73FE"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="ships__controls ships__controls--mobile flex items-center mt-3">
                    <button type="button" class="ships__btn swiper-button swiper-button-prev mr-3">
                        <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9588 3.66209C18.6977 4.48311 18.6312 5.74769 17.8102 6.48661L11.4897 12.175L17.8102 17.8634C18.6312 18.6023 18.6977 19.8669 17.9588 20.6879C17.2199 21.509 15.9553 21.5755 15.1343 20.8366L7.16207 13.6616C6.74064 13.2823 6.5 12.742 6.5 12.175C6.5 11.608 6.74064 11.0677 7.16207 10.6884L15.1343 3.51343C15.9553 2.77451 17.2199 2.84107 17.9588 3.66209Z" fill="#0C73FE"/>
                        </svg>
                    </button>
                    <button type="button" class="ships__btn swiper-button swiper-button-next">
                        <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.01343 3.66209C7.75235 2.84107 9.01693 2.77451 9.83795 3.51343L17.8102 10.6884C18.2316 11.0677 18.4722 11.608 18.4722 12.175C18.4722 12.742 18.2316 13.2823 17.8102 13.6616L9.83795 20.8366C9.01693 21.5755 7.75235 21.509 7.01343 20.6879C6.27451 19.8669 6.34107 18.6023 7.16209 17.8634L13.4825 12.175L7.16209 6.48661C6.34107 5.74769 6.27451 4.48311 7.01343 3.66209Z" fill="#0C73FE"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper/bundle";

    export default {
        name: "Ships",
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        computed: {
           getLink() {
               return (item) => `/populyarnye-kruiznye-teplohody/${item.slug}`;
           },
        },
        methods: {
            initSwiper() {
                const gallery = this.$el;
                if (gallery) {
                    const bannersSwiper = new Swiper(gallery, {
                        slidesPerView: 1,
                        effect: "fade",
                        navigation: {
                            prevEl: `.ships__btn.swiper-button-prev`,
                            nextEl: `.ships__btn.swiper-button-next`,
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
    .ships {
        &__slide {
            height: 320px;
        }

        &__content {
            @apply bg-white text-blue-900 md:text-white;
        }

        &__controls {
            &--mobile {
                display: none;
            }
        }

        .link-inline-icon > span {
            border: none;
        }

        &::v-deep {
            a {
                &:hover,
                &:focus {
                    @apply text-orange-400;
                }
            }

            .swiper-button {
                position: static;
                transition: all .3s var(--custom-transition);
                @apply flex items-center justify-center text-blue-300;

                &:before,
                &:after {
                    display: none;
                }

                &:hover {
                    @apply bg-white;
                }

                svg {
                    width: 14px;
                    height: 14px;
                    fill: currentColor;
                }
            }
        }
    }

    @media all and (max-width: 1536px) {
        .ships {
            &__link {
                @apply text-28;
            }
        }
    }

    @media all and (max-width: 768px) {
        .ships {
            &__slide {
                height: auto;
                min-height: auto;
                padding: 0;
                background: none !important;
            }

            &__image {
                display: block;
            }

            &__content {
                width: 100%;
                height: 100%;
                margin: 0;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                @apply bg-blue-900;
            }

            &__controls {
                z-index: 1;
                display: none;
                position: absolute;
                top: 50%;
                width: 100%;
                margin: 0;
                justify-content: space-between;
                flex-wrap: nowrap;
                transform: translateY(-50%);

                &--mobile {
                    display: flex;
                }
            }

            .swiper-button {
                width: 50px;
                height: 50px;
                @apply bg-white rounded;
            }

            .swiper-button-prev {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            .swiper-button-next {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }

    @media all and (max-width: 480px) {
        .ships {
            &__image {
                @apply aspect-w-1 aspect-h-1;
            }
        }
    }
</style>
