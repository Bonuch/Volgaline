<template>
    <div class="cruise-section-item flex flex-col text-base leading-snug text-black-900 border border-gray-50 rounded-sm">
        <div class="cruise-section-item__bg-wrap block relative flex-initial py-6 px-5 overflow-hidden">
            <div class="absolute left-0 top-0 z-1 h-full w-full cruise-section-item__image">
                <nuxt-link :to="getSlug">
                    <img
                        class="h-full w-full object-cover rounded-t-sm"
                        :src="item.image_450_250"
                        :alt="item.title"
                        width="450"
                        height="160"
                    >
                </nuxt-link>
            </div>

            <div class="relative z-2 mx-5">
                <CruisePromo
                    v-if="item.offers && item.offers.length > 0"
                    :promo="item.offers"
                    class="cruise-section-promo z-2"
                />
            </div>
        </div>

        <div class="cruise-section-item__content flex flex-col flex-1-1 p-7 extra:px-5 sm:pb-6">
            <div v-if="item.title" class="mb-5">
                <div class="cruise-section-item-subtitle">Название круиза:</div>
                <h3 class="text-lg leading-snug font-medium m-0 line-clamp-3 sm:text-lg h-auto">
                    <nuxt-link :to="getSlug" class="text-blue-600 hover:text-black-400">{{ item.title }}</nuxt-link>
                </h3>
            </div>

            <div class="flex-1-1 flex flex-col">
                <div v-if="item.direction_title" class="mb-5">
                    <div class="cruise-section-item-subtitle">Ваш круизный маршрут:</div>
                    <p class='m-0 direction-title__intro line-clamp-3'>
                        {{ item.direction_title }}
                    </p>
                </div>

                <div v-if="item.ship" class="mt-auto mb-6">
                    <div class="cruise-section-item-subtitle">Теплоход:</div>
                    <span>{{ item.ship }}</span>
                </div>

                <div v-if="item.duration_days" class="mb-5">
                    <div class="cruise-section-item-subtitle">Продолжительность:</div>
                    <span>{{ daysAndNights }}</span>
                </div>

                <div
                    v-if="item.departure_date_time && item.arrival_date_time"
                    class="mb-6"
                >
                    <div class="cruise-section-item-subtitle">Дата отправления и прибытия</div>

                    <div
                        class="cruise-section-item__duration flex justify-start items-center flex-wrap-reverse gap-2"
                    >
                        <span v-if='isNew(item.departure_date_time, $dayjs)' class='badge badge-small py-1'>New</span>
                        <div class='flex items-center'>
                            <div>{{ getDateFormatted(item.departure_date_time) }}</div>
                            <div class="mx-3">&mdash;</div>
                            <div>{{ getDateFormatted(item.arrival_date_time) }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cruise-section-item__prices mb-5 hidden md:block">
                <div class="cruise-section-item-subtitle">Цена:</div>
                <div v-if="item.discount_price" class="my-auto text-xl leading-none font-medium">
                    {{ getFormatedPricePerPerson(item.discount_price) }}
                </div>
                <div v-if="item.price" class="mt-2 text-sm font-medium text-gray-300 line-through">
                    {{ item.price | formatPrice }}
                </div>
            </div>

            <div :class="['mb-5', getCabinTextColor(item.free_cabins)]">
                {{ getCabinsNumberText }}
            </div>

            <div class="mb-7 border-b border-gray-50 -mx-7 extra:-mx-5"></div>

<!--            <button-->
<!--                v-show="isMd && !showInfo"-->
<!--                type="button"-->
<!--                class="cruise-section-item__toggler button mb-7 bg-transparent text-black-400 border-2 border-gray-600"-->
<!--                @click="showInfo = true"-->
<!--            >-->
<!--                Раскрыть информацию-->
<!--            </button>-->

            <div class="flex items-center lg:block">
                <div
                    v-if="item.discount_price"
                    class="cruise-section-item__price-old flex-1-1 flex flex-col lg:mb-5 md:hidden"
                >
                    <span class="cruise-section-item-subtitle">Цена:</span>
                    <span class="block text-green-700 text-xl mb-1 leading-snug font-medium">{{ getFormatedPricePerPerson(item.discount_price) }}</span>
                    <div v-if="item.price" class="cruise-section-item__price m-0 mb-2 text-16 leading-none font-medium text-red-500 line-through">
                        от {{ item.price | formatPrice }} /чел
                    </div>
                </div>

                <div class="cruise-section-item__controls">
                    <nuxt-link
                        :to="getSlug"
                        class="button w-full"
                        :class="{ 'disabled': cabinsEmpty }"
                    >
                        <span>Подробнее</span>
                    </nuxt-link>

                    <button
                        v-if="false"
                        type="button"
                        class="cruise-section-item__buy button w-full bg-transparent text-black-400 border-2 border-gray-600"
                        :class="{ 'disabled': cabinsEmpty }"
                        :disabled="cabinsEmpty"
                        @click="onFastBuyClick(item.id)"
                    >
                        <span>Быстрый заказ</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { dayjsHelpers } from '@/mixins/content-helpers';
    import { cruiseCabinsHelper } from '@/mixins/content-helpers';
    import { mapActions } from 'vuex';
    import CruisePromo from './CruisePromo';
    import { isNew } from '@/helpers/cruises';

    export default {
        name: 'CruiseGridItem',
        components: { CruisePromo },
        mixins: [dayjsHelpers, cruiseCabinsHelper],
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                directionTitleIsLong: false,
            };
        },
        computed: {
            isMd() {
                return this.$store.getters.getWindowWidth < 769;
            },
            getDepartureDate() {
                let dateFormat = 'DD MMMM YYYY';
                const departure_date = this.item.departure_date_time;
                const arrival_date = this.item.arrival_date_time;

                // год отправки совпадает с прибытием
                if (this.$dayjs(departure_date).format('YYYY') === this.$dayjs(arrival_date).format('YYYY')) {
                    dateFormat = 'DD MMMM';
                }

                return this.$dayjs(departure_date).format(dateFormat);
            },
        },
        methods: {
            ...mapActions({
                onFastBuyClick: 'cart/onFastBuyClick',
            }),
            isNew,
            // showFullDirectionTitle() {
            // убрал тоглер для длинных названий направления
            //     :class="{ 'direction-title--long': !isMd && directionTitleIsLong }"
            //     <button
            //             v-if='!isMd && directionTitleIsLong'
            //             type='button'
            //             class='link-inline link-inline--dashed relative z-2 text-blue-300 text-medium'
            //             @click='showFullDirectionTitle'
            //     >
            //         Посмотреть полный список
            //     </button>
            //
            //     return this.directionTitleIsLong = false;
            // },
            checkDirectionTitleLength() {
                this.directionTitleIsLong = this.item.direction_title && this.item.direction_title.length > 96;
            },
        },
        mounted() {
            this.checkDirectionTitleLength();
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-section-item {
        &:hover {
            transition: box-shadow 0.25s ease;
            box-shadow: 4px 4px 20px rgba(72, 72, 72, 0.15);
        }

        &__bg-wrap {
            height: 160px;
        }

        &__info {
            @apply mb-3 text-lg font-medium text-gray-490;
        }

        .button {
            @apply text-center text-base leading-none py-5 px-6 lg:px-3;

            &.cruise-section-item__toggler {
                @apply py-4;
            }
        }

        .cruise-section-item__buy {
            &:hover,
            &:focus {
                @apply bg-green-400 text-white;
            }
        }

        .direction-title {
            &--long {
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 16px;
                    width: 100%;
                    height: 70px;
                    background: linear-gradient(178.5deg, rgba(255, 255, 255, 0) -22.7%, #FFFFFF 78.2%);
                }

                & > p {
                    @apply line-clamp-3;
                }

                .link-inline {
                    font-size: 15px;
                }
            }
        }

        &__controls {
            flex: 0 1 176px;
        }
    }

    @screen lg {
        .cruise-section-item {

        }
    }
</style>
