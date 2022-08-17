<template>
    <div class='cruise-detail-road cruise-detail-tab-content__wrap flex flex-wrap relative z-0 sm:border-0 sm:bg-transparent sm:first:pt-0 sm:last:pb-0'>
        <div class='cruise-detail-road__time flex flex-col mr-7 bg-gray-50 rounded-sm sm:hidden'>
            <div
                v-if='item.day'
                class='cruise-detail-road__day flex items-center p-5 bg-blue-900 text-white text-xl leading-snug font-medium uppercase'
            >
                {{ item.day }} День
                <div
                    v-for="(promoItem, promoIdx) in getFirstPart"
                    v-show="promoItem.title === 'fire'"
                    :key="promoIdx"
                    class="ml-2"
                >
                    <span class=""><img src="@/static/images/flame/flame.png" alt="fire"></span>
                </div>
            </div>

            <div class='p-5'>
                <template v-if='item.arrival_date_time'>
                    <div class='cruise-section-item-subtitle'>Дата прибытия:</div>
                    <div class='text-base font-medium text-black-900'>
                        {{ getDateFormatted(item.arrival_date_time) }}
                    </div>

                    <div class='cruise-section-item-subtitle mt-4'>Время прибытия:</div>
                    <div class='text-base font-medium text-black-900'>
                        {{ dayjsGetTimeFormatted(item.arrival_date_time) }}
                    </div>
                </template>

                <template v-if='item.departure_date_time'>
                    <div class='cruise-section-item-subtitle mt-4'>Дата отправления:</div>
                    <div class='text-base font-medium text-black-900'>
                        {{ getDateFormatted(item.departure_date_time) }}
                    </div>

                    <div class='cruise-section-item-subtitle mt-4'>Время отправления:</div>
                    <div class='text-base font-medium text-black-900'>
                        {{ dayjsGetTimeFormatted(item.departure_date_time) }}
                    </div>
                </template>
            </div>
        </div>

        <a
            href='#'
            class='cruise-detail-road__time cruise-detail-road__time bg-gray-50 rounded-t-sm hidden'
            @click.prevent='showDropdown = !showDropdown'
        >
            <div class='flex flex-wrap items-center'>
                <div
                    v-if='item.day'
                    class='min-w-36 flex items-center p-4 bg-blue-900 text-center text-white text-26 font-bold rounded-sm mob:text-xl mob:min-w-24 mob:px-2'
                >
                    <span class='mr-4'>{{ item.day }}</span> День
                </div>

                <template v-if='item.arrival_date_time'>
                    <div class='px-4 mr-auto mob:px-2'>
                        <div v-if='item.arrival_date_time' class='text-base font-bold'>
                            {{ getMobileDateFormatted(item.arrival_date_time) }}
                        </div>
                        <div
                            v-if='item.arrival_date_time'
                            class='text-sm text-gray-300'
                        >
                            {{ dayjsGetDayFormatted(item.arrival_date_time) }}
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class='px-4 mr-auto mob:px-2'>
                        <div v-if='item.departure_date_time' class='text-base font-bold'>
                            {{ getMobileDateFormatted(item.departure_date_time) }}
                        </div>
                        <div
                            v-if='item.departure_date_time'
                            class='text-sm text-gray-300'
                        >
                            {{ dayjsGetDayFormatted(item.departure_date_time) }}
                        </div>
                    </div>
                </template>

                <div class='pl-2 pr-6 text-gray-200 mob:pl-0'>
                    <svg
                        class='custom-transition'
                        :class="{'transform rotate-180': showDropdown}"
                        width='18'
                        height='19'
                        viewBox='0 0 18 19'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            class='fill-current'
                            fill-rule='evenodd' clip-rule='evenodd'
                            d='M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z'
                            fill='#5A6472'
                        />
                    </svg>
                </div>
            </div>
        </a>

        <template>

            <div class='cruise-detail-road__image-wrap sm:hidden'>
                <a
                    v-if='item.title'
                    :href='getImage'
                    class='cruise-detail-road__image image-loop-hover'
                >
                    <img :src='getImage' :alt='item.title' width='330' height='276' class='w-full h-full object-cover'>
                </a>
            </div>

            <div class='cruise-detail-road__content pt-5 sm:hidden'>
                <h3 v-if='item.title' class='cruise-detail-tab-content__title m-0 mb-4 sm:hidden'>{{ item.title }}</h3>
                <ReadMore
                    v-if="item.desc"
                    class="text-lg sm:text-base"
                    :desc="item.desc"
                    readmore-button-selectors="text-white border-white hover:text-blue-400 focus:text-blue-400 active:text-blue-400"
                />
            </div>

            <div class='flex'>
                <div class='cruise-detail-road__image-wrap hidden sm:flex'>
                    <a
                        v-if='item.title'
                        :href='getImage'
                        class='cruise-detail-road__image image-loop-hover'
                    >
                        <img :src='getImage' :alt='item.title' width='100' height='100'
                             class='object-cover rounded-full relative z-10'>
                    </a>
                </div>

                <div class='hidden sm:flex flex-col ml-7 mob:ml-3'>
                    <div class="flex items-center">
                        <h3 v-if='item.title' class='cruise-detail-tab-content__title text-xl m-0 mb-2.5'>{{ item.title }}</h3>
                        <div
                            v-for="(promoItem, promoIdx) in getFirstPart"
                            v-show="promoItem.title === 'fire'"
                            :key="promoIdx"
                            class="ml-2 mb-2"
                        >
                            <span class=""><img src="@/static/images/flame/flame.png" alt="fire"></span>
                        </div>
                    </div>

                    <div class='flex items-center'>
                        <div
                            v-if='item.day'
                            class='flex items-center text-blue-700 text-base font-medium'
                        >
                            <span class=''>{{ item.day }} День</span>
                        </div>
                        <template v-if='item.arrival_date_time'>
                            <div class='px-4 mr-auto mob:px-2'>
                                <div v-if='item.arrival_date_time' class='text-sm font-normal text-gray-300'>
                                    {{ getMobileDateFormatted(item.arrival_date_time) }}
                                </div>
                            </div>
                        </template>
                    </div>
                    <a
                        href='#'
                        @click.prevent='showDropdown = !showDropdown'
                        class='flex items-center text-xs font-medium text-red-500 mt-2.5'
                    >
                        <p class='mb-0 border-b border-dotted border-red-500'>Подробное описание</p>
                        <div class='p-0 pl-2.5'>
                            <svg
                                class='custom-transition'
                                :class="{'transform rotate-180': showDropdown}"
                                width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path class='fill-current'
                                      d='M9.58565 1.46852C9.84441 1.14508 9.79197 0.673106 9.46852 0.414349C9.14507 0.155592 8.67311 0.208033 8.41435 0.531479L9.58565 1.46852ZM5 6L4.41435 6.46852C4.55668 6.64643 4.77216 6.75 5 6.75C5.22784 6.75 5.44332 6.64643 5.58565 6.46852L5 6ZM1.58565 0.531479C1.32689 0.208032 0.854925 0.155591 0.531479 0.414348C0.208032 0.673106 0.155591 1.14507 0.414348 1.46852L1.58565 0.531479ZM8.41435 0.531479L4.41435 5.53148L5.58565 6.46852L9.58565 1.46852L8.41435 0.531479ZM5.58565 5.53148L1.58565 0.531479L0.414348 1.46852L4.41435 6.46852L5.58565 5.53148Z'
                                      fill='#5A6472' />
                            </svg>
                        </div>
                    </a>
                    <div
                        class=''
                        v-if='showDropdown'
                    >
                        <div v-if='item.desc' v-html='item.desc' class='hidden-desc text-xs font-medium leading-normal mt-4'></div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { dayjsHelpers } from '@/mixins/content-helpers';
import ReadMore from '@/components/base/readmore/ReadMore';

export default {
    name: 'CruiseDetailRoad',
    components: {
        ReadMore
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        promo: {
            type: Array,
            required: true,
        },
    },
    mixins: [dayjsHelpers],
    data() {
        return {
            showDropdown: true,
        };
    },
    computed: {
        ...mapGetters(['getWindowWidth']),
        getImage() {
            let image = this.item.image_494_394 ? this.item.image_494_394 : this.item.image_url;
            if (this.getWindowWidth < 640) image = this.item.image_350_350 ? this.item.image_350_350 : this.item.image_url;
            return image ? image : '/images/cruise-detail/excursions/1.jpg';
        },
        getFirstPart() {
            return this.longPromo ? this.promo.slice(0, this.getSlicedNumber) : this.promo;
        },
    },
    methods: {
        ...mapMutations({
            setExcursions: 'excursions/setExcursions',
        }),
        ...mapActions({
            openModal: 'modals/openModal',
        }),
        initLightgallery() {
            const $el = this.$el;

            if ($el) {
                const galleryWrap = $el.querySelector('.cruise-detail-road__image-wrap');

                if (galleryWrap) {
                    window.lightGallery(galleryWrap, { download: false });
                }
            }
        },
        onCallExcursionClick() {
            this.openModal({
                name: 'ModalExcursions',
                size: 'full',
            });
            this.setExcursions({
                city: this.item.name,
                day: this.item.day,
                list: this.item.excursions,
            });
        },
        hideContent() {
            const $el = this.$el;
            const width = document.documentElement.clientWidth;

            if ($el && width < 641) {
                this.showDropdown = false;
            }
        },
        toggleContent(val) {
            val >= 640 ? this.showDropdown = true : this.showDropdown = false;
        },
    },
    watch: {
        getWindowWidth(val) {
            this.toggleContent(val); // Следим за шириной экрана и переключаем состояние контента
        },
    },
    mounted() {
        this.initLightgallery();
        this.hideContent(); // прячем контент < 641
    },
};
</script>

<style lang='scss' scoped>
.cruise-content {
    &-enter-active {
        animation: .3s custom-slide-in-top both;
    }

    &-leave-active {
        animation: .3s custom-slide-in-top reverse;
    }
}

.hidden-desc {
    max-width: 246px;
}

.cruise-detail-road {
    &__time {
        flex: 0 1 210px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        overflow: hidden;
    }

    &__image-wrap {
        flex: 0 1 330px;
        height: 276px;
        margin-right: 30px;
        overflow: hidden;
        @apply rounded-sm;

        a {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    &__content {
        flex: 1;
        &::v-deep {
            .readmore-link {
                @apply text-blue-300 hover:text-red-400;
            }
        }
    }

    &__excursion-btn {
        span {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            overflow: hidden;
        }

        button {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            overflow: hidden;
        }
    }
}

@screen xl {
    .cruise-detail-road {
        &__content {
            flex: 0 1 100%;
        }

        &__image-wrap {
            flex: 1;
            margin-right: 0;
        }
    }
}

@screen sm {
    .cruise-detail-road {
        &:after {
            content: "";
            position: absolute;
            left: 70px;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.1);
            z-index: 5;
        }

        &__time {
            flex: 0 1 100%;
            @apply rounded-none rounded-t-sm;
        }

        &__image-wrap {
            @apply rounded-sm h-auto;
        }
    }

    .cruise-detail-tab-content__title {
        @apply text-lg;
    }
}
</style>
