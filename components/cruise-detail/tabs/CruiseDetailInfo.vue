<template>
<div class="cruise-detail-tab-content cruise-detail-info">
    <div class="wrapper">


        <template v-if="shipId && ourShip">
            <div class="mt-10">
                <h3 class="cruise-detail-tab-content__title">
                    Действующие акции на теплоходе
                </h3>

                <div v-if="exclusive" class="flex flex-wrap overflow-x-hidden -mx-4">
                    <ExclusiveCard
                        v-for="(item) in exclusive"
                        :key="item.id"
                        :item="item"
                        class="akcii-na-teplokhode w-1/3 px-4 xl:mb-10 xl:w-1/2 tablet:w-full"
                    />
                </div>
            </div>

            <div
                v-if="directionTitle"
                class="border-b border-gray-50 pb-10 mt-18"
            >
                <h3 class="cruise-detail-tab-content__title">Маршрут круиза</h3>

                <div class='flex items-start tablet:flex-wrap'>
                    <div class="cruise-detail-info-direction-item cruise-detail-info-direction-content">
                        <p class="m-0">{{ directionTitle }}</p>
                    </div>

                    <div class="cruise-detail-info-direction-item cruise-detail-info-direction-buttons">
                        <button
                            type="button"
                            class="button px-4 py-3 text-base font-medium"
                            @click="(e) => onLinkClick(e)"
                        >
                            Подробный маршрут по&nbsp;дням
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="discounts && discounts.length > 0" class="mt-10">
                <h3 class="cruise-detail-tab-content__title">
                    Cкидки и&nbsp;акции на&nbsp;теплоходе - «{{ title.title }}»
                </h3>

                <div class="cruise-detail-info-discounts swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            v-for="(item) in discounts"
                            :key="item.id"
                            v-show="item.title && item.title.length > 2"
                            class="swiper-slide cruise-detail-info-discounts-item"
                        >
                            <p v-if="item.title && item.title.length > 3">{{ item.title }}</p>
                            <p v-else v-html='item.text'></p>
                            <div v-if="item.subtitle" class="flex items-center justify-center mt-auto text-red-600">- {{ item.subtitle }}
                                <span class="font-medium">{{ item.text }}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="cruise-detail-info-discounts-btn swiper-button swiper-button-prev"
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
                        class="cruise-detail-info-discounts-btn swiper-button swiper-button-next"
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

<!--            <div class="mt-20 -mb-5 overflow-hidden">-->
<!--                <h3 class="cruise-detail-tab-content__title">-->
<!--                    Что включено в&nbsp;круиз-->
<!--                </h3>-->

<!--                <client-only>-->
<!--                    <div class="cruise-detail-info-stuffs flex flex-wrap -mx-4 mob:mx-0">-->
<!--                        <div-->
<!--                            v-for="(item) in stuffs"-->
<!--                            :key="item.id"-->
<!--                            class="w-1/6 px-4 mb-5 xl:w-1/4 tablet:w-1/3 xs:w-1/2 mob:w-full mob:px-0"-->
<!--                        >-->
<!--                            <div-->
<!--                                class="cruise-detail-info-stuffs-item flex flex-col py-4 px-5 image-dark-gradient rounded-sm overflow-hidden sm:px-4"-->
<!--                                :style="`backgroundImage: url(${item.image})`"-->
<!--                            >-->
<!--                        <span-->
<!--                            v-if="item.title"-->
<!--                            class="relative z-1 mt-auto text-lg leading-snug text-white font-medium sm:text-base"-->
<!--                        >-->
<!--                            {{ item.title }}-->
<!--                        </span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </client-only>-->
<!--            </div>-->
        </template>

        <template v-if="content">
            <h3 class="cruise-detail-tab-content__title pt-14">Информация о круизе</h3>
            <div class="cruise-detail-info-block leading-normal text-base text-black-400" v-html="content"></div>
        </template>

    </div>
</div>
</template>

<script>
    import Swiper from 'swiper/bundle';
    import BaseMobileSlider from '../../base/BaseMobileSlider';
    import CruiseBannerCard from '../../front-banners/CruiseBannerCard';
    import SliderPreloader from '../../front-banners/SliderPreloader';

export default {
    name: "CruiseDetailInfo",
    components: {
        SliderPreloader, CruiseBannerCard, BaseMobileSlider,
        ExclusiveCard: () => import('@/components/front-banners/ExclusiveCard'),
    },
    props: {
        content: {
            type: null,
        },
        directionTitle: {
            type: null,
        },
        shipId: {
            type: null,
        },
        discounts: {
            type: null,
        },
        exclusive: {
            type: null,
        },
        title: {
            type: null,
        },
    },
    data() {
        return {
            stuffs: [
                {
                    id: 1,
                    title: 'Завтрак, обед и ужин',
                    image: '/images/cruise-detail/included-stuffs/1.jpg',
                },
                {
                    id: 2,
                    title: 'Зарядка и йога',
                    image: '/images/cruise-detail/included-stuffs/2.jpg',
                },
                {
                    id: 3,
                    title: 'Живая музыка',
                    image: '/images/cruise-detail/included-stuffs/3.jpg',
                },
                {
                    id: 4,
                    title: 'Бесплатный Wi-Fi',
                    image: '/images/cruise-detail/included-stuffs/4.jpg',
                },
                {
                    id: 5,
                    title: 'Детская анимация',
                    image: '/images/cruise-detail/included-stuffs/5.jpg',
                },
                {
                    id: 6,
                    title: 'Дискотека',
                    image: '/images/cruise-detail/included-stuffs/6.jpg',
                },
            ],
        };
    },
    methods: {
        onLinkClick(e) {
            e.preventDefault();
            this.scrollToSection();
        },
        scrollToSection(link) {
            const footer = document.querySelector('.footer');
            const section = document.querySelector('#cruise-detail-section-roads');

            if (section && footer) {
                const windowYOffset = window.pageYOffset;
                const footerCoord = footer.getBoundingClientRect().top;

                if (windowYOffset > 290 || windowYOffset <= footerCoord) {
                    // const tabsListHeight = getOffsetHeight() {
                    //     const $elHeight = this.$el.offsetHeight;
                    //     const headerHeight = document.querySelector('.header').offsetHeight;
                    //     return $elHeight + headerHeight;
                    // },
                    const y = section.getBoundingClientRect().top + windowYOffset - 10;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            } else {
                return false;
            }
        },
        initDiscountsSwiper() {
            const $el = this.$el;
            const el = $el.querySelector('.cruise-detail-info-discounts');

            if ($el && el) {
                const bannersSwiper = new Swiper(el, {
                    slidesPerView: 5,
                    spaceBetween: 30,
                    navigation: {
                        prevEl: `.cruise-detail-info-discounts-btn.swiper-button-prev`,
                        nextEl: `.cruise-detail-info-discounts-btn.swiper-button-next`,
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        860: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1280: {
                            slidesPerView: 5,
                        },
                    },
                });
            }
        },
    },
    computed: {
        ourShip() {
            return this.shipId === 52 || this.shipId === 53 || this.shipId === 54;
        },
    },
    async mounted() {
        await this.$nextTick();
        if (this.discounts && this.discounts.length > 0) this.initDiscountsSwiper();
    },
};
</script>

<style lang="scss" scoped>
    .cruise-detail-info {
        &-direction-content {
            flex: 1;
            margin-right: 14.9%;
        }

        &-direction-buttons {
            flex: 0 1 270px;

            .button {
                width: 100%;
            }
        }

        &-discounts {
            min-height: 94px;
            padding: 25px;
            margin: -25px;

            &-item {
                display: flex;
                flex-direction: column;
                height: auto;
                box-shadow: 0 4px 35px rgba(36, 58, 101, 0.1);
                @apply p-4 text-center text-base leading-snug text-black-900 border border-gray-50 rounded-sm;
            }
        }

        &-stuffs {
            &-item {
                min-height: 170px;
                background-position: center top;
                background-repeat: no-repeat;
                background-size: cover;
            }
        }

        &::v-deep {
            .swiper-button {
                width: 30px;
                height: 30px;
                top: 50%;
                transform: translateY(-50%);
                margin-top: 0 !important;
                transition: all .3s var(--custom-transition);
                @apply bg-blue-300;

                &:before,
                &:after {
                    display: none;
                }

                &:hover {
                    @apply bg-yellow-400;
                }

                &-prev {
                    left: 10px;
                }

                &-next {
                    right: 10px;
                }

                svg {
                    width: 14px;
                    height: 14px;
                    fill: #fff;
                }
            }
        }

        &-block {
            ::v-deep p{
                margin-bottom: 0;
            }
        }
    }

    @screen tablet {
        .cruise-detail-info {
            &-direction-content {
                flex: 0 1 100%;
                margin-right: 0;
                margin-bottom: 20px;
            }

            &-direction-buttons {
                flex: 0 1 270px;

                .button {
                    width: 100%;
                }
            }
        }
    }

    @screen sm {
        .cruise-detail-info {
            &-discounts {
                padding: 0;
                margin: 0;
                box-shadow: 0 4px 35px rgba(36, 58, 101, 0.1);
                @apply border border-gray-50 rounded-sm;

                &-item {
                    box-shadow: none;
                    border: 0;
                    border-radius: 0;
                }
            }

            &::v-deep {
                .swiper-button {
                    &-prev {
                        left: 10px;
                    }

                    &-next {
                        right: 10px;
                    }
                }
            }
        }
    }

    .akcii-na-teplokhode {
        &::v-deep {
            .exclusive-card-title {
                font-size: 16px !important;
                width: 67%;
            }
        }
    }
</style>
