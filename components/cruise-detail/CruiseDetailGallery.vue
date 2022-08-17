<template>
    <div class="cruise-detail-gallery swiper-container">
        <div class="swiper-wrapper cruise-detail-lightgallery-wrap">
            <a
                v-for="(item, itemIdx) in gallery"
                :key="`cruise-detail-gallery-item-${itemIdx}`"
                class="swiper-slide cruise-detail-gallery__slide rounded-sm overflow-hidden image-loop-hover"
                :href="item.image_url"
            >
                <img :src="item.image_url" :alt="getImageTitle(item.title)">
            </a>
        </div>

        <button
            type="button"
            class="cruise-detail-gallery__btn swiper-button swiper-button-prev"
        >
            <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                    fill="white"
                />
            </svg>
        </button>

        <button
            type="button"
            class="cruise-detail-gallery__btn swiper-button swiper-button-next"
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
    import Swiper from 'swiper/bundle';

export default {
    name: "CruiseDetailGallery",
    props: {
        gallery: {
            type: Array,
            required: true,
        },
    },
    computed: {
        getImageTitle() {
            return (title) => title ? title : "#";
        }
    },
    methods: {
        initSwiper() {
            const $el = this.$el;

            if ($el) {
                const bannersSwiper = new Swiper($el, {
                    slidesPerView: 1,
                    spaceBetween: 40,
                    navigation: {
                        prevEl: `.cruise-detail-gallery__btn.swiper-button-prev`,
                        nextEl: `.cruise-detail-gallery__btn.swiper-button-next`,
                    },
                    breakpoints: {
                        641: {
                            slidesPerView: 2,
                        },
                        993: {
                            slidesPerView: 3,
                        },
                    },
                });
            }
        },
        initLightgallery() {
            const $el = this.$el;

            if ($el) {
                const galleryWrap = $el.querySelector(".cruise-detail-lightgallery-wrap");

                if (galleryWrap) {
                    window.lightGallery(galleryWrap, { download: false });
                }
            }
        },
    },
    mounted() {
        this.initSwiper();
        this.initLightgallery();
    },
};
</script>

<style lang="scss" scoped>
.cruise-detail-gallery {
    &__slide {
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .swiper-button {
        z-index: 1;
        width: 50px;
        height: 50px;
        top: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        margin: 0;
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

    .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
        pointer-events: auto;
    }
}
</style>
