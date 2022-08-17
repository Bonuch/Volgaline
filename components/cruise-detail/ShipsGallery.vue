<template>
    <div class="ships-gallery swiper-container">
        <div class="swiper-wrapper">
            <slot name="link" :gallery="gallery" :getAlt="getAlt">
                <a
                    v-for="(item, idx) in gallery"
                    :key="idx"
                    :href="item.image_900_600"
                    class="swiper-slide"
                >
                    <img :src="item.image_706_445" :alt="getAlt(item.title)" class="w-full h-full object-cover"/>
                </a>
            </slot>
        </div>

        <button
            type="button"
            class="ships-gallery__btn swiper-button swiper-button-prev"
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
            class="ships-gallery__btn swiper-button swiper-button-next"
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
</template>

<script>
    import Swiper from "swiper/bundle";

    export default {
        name: "ShipsGallery",
        props: {
            gallery: {
                type: Array,
                required: true,
            },
            shipName: {
                type: String,
            },
        },
        methods: {
            initLightgallery() {
                const $el = this.$el;
                const galleryWrap = $el.querySelector(".swiper-wrapper");

                if ($el && galleryWrap) {
                    window.lightGallery(galleryWrap, { download: false });
                }
            },

            initSwiper() {
                const $el = this.$el;

                if ($el) {
                    const bannersSwiper = new Swiper($el, {
                        slidesPerView: 1,
                        loop: true,
                        navigation: {
                            prevEl: `.ships-gallery__btn.swiper-button-prev`,
                            nextEl: `.ships-gallery__btn.swiper-button-next`,
                        },
                    });
                }
            },
            getAlt(alt) {
                return alt ? alt : `Тх - ${this.shipName}`;
            },
        },
        mounted() {
            this.initSwiper();
            this.initLightgallery();
        },
    };
</script>

<style lang="scss" scoped>
    .ships-gallery {
        &::v-deep {
            .swiper-slide {
                height: auto;
                max-height: 445px;
            }

            .swiper-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                top: 50%;
                margin: 0;
                color: #fff;
                transform: translateY(-50%);
                transition: all .3s var(--custom-transition);
                @apply bg-blue-300 rounded-sm;

                &:before,
                &:after {
                    display: none;
                }

                &:hover {
                    @apply bg-orange-400;
                }

                &-prev {
                    left: 1rem;
                }

                &-next {
                    right: 1rem;
                }

                svg {
                    width: 24px;
                    height: 24px;
                    fill: #fff;
                }
            }
        }
    }

    @screen sm {
        .ships-gallery {
            &::v-deep {
                .swiper-slide {
                    max-height: 320px;
                }
            }
        }
    }

    @screen xs {
        .ships-gallery {
            &::v-deep {
                .swiper-slide {
                    max-height: 260px;
                }
            }
        }
    }

    @screen xxs {
        .ships-gallery {
            &::v-deep {
                .swiper-slide {
                    max-height: 180px;
                }
            }
        }
    }
</style>
