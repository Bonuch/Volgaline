<template>
    <div class="cruise-section-item flex flex-start text-black-900 border border-gray-50 rounded-sm overflow-hidden xl:flex-wrap">
        <div class="cruise-section-item__bg-wrap cruise-section-item-block relative self-start">
            <nuxt-link :to="getSlug" class="absolute left-0 top-0 z-1 h-full w-full">
                <img
                    width="240"
                    height="248"
                    class="h-full w-full object-cover"
                    :src="item.image_240_250" :alt="`Речной тур `+ item.title"
                >
            </nuxt-link>

            <div class="mx-3">
                <CruisePromo
                    v-if="item.offers && item.offers.length > 0"
                    :promo="item.offers"
                    class="cruise-section-promo z-2 -mx-3"
                />
            </div>
        </div>
        <div class="cruise-section-item__content cruise-section-item-block pt-3">
            <div v-if="item.title" class="text-xl leading-snug font-medium m-0 mb-4 h-auto line-clamp-3">
                <nuxt-link :to="getSlug" class="text-blue-600 hover:text-black-400">{{ item.title }}</nuxt-link>
            </div>

            <div class="mb-4">
                <span class="cruise-section-item-subtitle">Дата отправления и прибытия:</span>

                <div class="cruise-section-item__duration flex items-center gap-2 flex-wrap-reverse">
                    <span v-if="isNew(item.departure_date_time, $dayjs)" class="badge badge-small py-1">New</span>
                    <div class="flex items-center">
                        <div>
                            {{ getDateFormatted(item.departure_date_time) }}
                        </div>

                        <div class="cruise-section-item__duration w-3 mx-1 border-b-2 border-black-900"></div>

                        <div>
                            {{ getDateFormatted(item.arrival_date_time) }}
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="item.direction_title">
                <span class="cruise-section-item-subtitle">Ваш круизный маршрут:</span>
                <p class="m-0 font-medium line-clamp-2">{{ item.direction_title }}</p>
            </div>
        </div>

        <div class="cruise-section-item-block cruise-section-item__info">
            <div class="mb-5">
                <span class="cruise-section-item-subtitle">Теплоход:</span>
                <span>{{ item.ship }}</span>
            </div>

            <div v-if="item.duration_days" class="mb-5">
                <span class="cruise-section-item-subtitle">Продолжительность:</span>
                <span>{{ daysAndNights }}</span>
            </div>
            <div v-if="ourShip" class="cruise-section-item-included-stuffs">
                <span class="cruise-section-item-subtitle">На теплоходе имеется:</span>

                <div class="flex items-center">
                    <div
                        v-for="(item, idx) in stuffs"
                        :key="idx"
                        class="cruise-section-item-included-stuffs-item relative mr-5 last:mr-0"
                    >
                        <BaseIcon
                            view-box="0 0 24 24"
                            width="24px"
                            height="24px"
                            class="cruise-section-item-included-stuffs-icon"
                            selectors="m-auto fill-current"
                        >
                            <component :is="item.icon"></component>
                        </BaseIcon>

                        <div class="cruise-section-item-included-stuffs-tooltip">
                            <div v-html="item.content"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="searchShip" class="cruise-section-item-included-stuffs">
                <span class="cruise-section-item-subtitle">На теплоходе имеется:</span>

                <div class="flex items-center">
                    <div
                        v-for="(item, idx) in stuffsAlex"
                        :key="idx"
                        class="cruise-section-item-included-stuffs-item relative mr-5 last:mr-0"
                    >
                        <BaseIcon
                            view-box="0 0 24 24"
                            width="24px"
                            height="24px"
                            class="cruise-section-item-included-stuffs-icon"
                            selectors="m-auto fill-current"
                        >
                            <component :is="item.icon"></component>
                        </BaseIcon>

                        <div class="cruise-section-item-included-stuffs-tooltip">
                            <div v-html="item.content"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="item.includedStuffs && item.includedStuffs.length > 0">
                <span class="cruise-section-item-subtitle">На теплоходе имеется:</span>

                <div class="flex items-center">
                    <img
                        v-for="(imgItem, imgKey) in item.includedStuffs"
                        :key="imgKey"
                        :src="imgItem.image_url"
                        alt="#"
                        width="24"
                        height="24"
                        :title="imgItem.title"
                        class="mr-5 last:mr-0"
                    >
                </div>
            </div>
        </div>

        <div class="cruise-section-item__controls cruise-section-item-block">
            <div
                class="cruise-section-item__rooms text-xs font-medium uppercase mb-4"
                :class="getCabinTextColor(item.free_cabins)"
            >
                {{ getCabinsNumberText }}
            </div>

            <div
                v-if="item.discount_price"
                 class="cruise-section-item__price-old m-0 mb-1"
            >
                <span class="cruise-section-item-subtitle">Цена:</span>
                <div
                    v-if="item.price"
                    class="cruise-section-item__price m-0 mt-3 mb-2 text-16 leading-none font-medium text-red-500 line-through"
                >
                    от {{ item.price | formatPrice }} /чел
                </div>
                <span class="block mb-5 text-green-700 text-xl leading-snug font-medium">{{ getFormatedPricePerPerson(item.discount_price) }}</span>
            </div>



            <div class="cruise-section-item__buttons">
                <nuxt-link
                    :to="getSlug"
                    class="button text-base py-3 px-7"
                    :class="{ 'disabled': cabinsEmpty }"
                >
                    Подробнее
                </nuxt-link>

                <button
                    v-if="false"
                    type="button"
                    class="cruise-section-item-buy button button-large button-transparent flex justify-center w-full items-center text-xl"
                    :class="{ 'disabled': cabinsEmpty }"
                    @click="onFastBuyClick(item.id)"
                >
                    <svg class="mr-3 fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            class="fill-current"
                            fill-rule="evenodd" clip-rule="evenodd"
                            d="M4 0H3L3 1L3 23V24H4H7.55059H8.06474L8.36389 23.5818C9.24078 22.3561 10.7752 21.5 12.5 21.5C14.2338 21.5 15.8151 22.3634 16.6867 23.5818L16.9858 24H17.5H21H22V23V1V0H21H17.5H16.9859L16.6867 0.418163C15.8151 1.63655 14.2338 2.5 12.5 2.5C10.7662 2.5 9.18494 1.63655 8.31331 0.418164L8.01415 0H7.5H4ZM5 15L5 2H7.01295C8.29895 3.51558 10.3236 4.5 12.5 4.5C14.6764 4.5 16.701 3.51558 17.9871 2H20L20 15H19.0625V17H20L20 22H17.987C16.701 20.4844 14.6764 19.5 12.5 19.5C10.316 19.5 8.33713 20.4899 7.0626 22H5L5 17H5.9375V15H5ZM15.3125 17H17.1875V15H15.3125V17ZM11.5625 17H13.4375V15H11.5625V17ZM7.8125 17L9.6875 17V15H7.8125V17ZM16 9H9V7H16V9ZM10 13H15V11H10V13Z"
                            fill="#1D1F20"
                        />
                    </svg>

                    <span>Быстрый заказ</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { setCase } from '../../helpers/text';
    import { mapActions } from "vuex";
    import { dayjsHelpers, cruiseCabinsHelper } from "@/mixins/content-helpers";
    import CruisePromo from "./CruisePromo";
    import BaseIcon from '@/components/base/BaseIcon';
    import DinnerIcon from '@/components/icons/included-stuffs/DinnerIcon';
    import LockIcon from '@/components/icons/included-stuffs/LockIcon';
    import ManIcon from '@/components/icons/included-stuffs/ManIcon';
    import TvIcon from '@/components/icons/included-stuffs/TvIcon';
    import WifiIcon from '@/components/icons/included-stuffs/WifiIcon';
    import WindowIcon from '@/components/icons/included-stuffs/WindowIcon';
    import { isNew } from '@/helpers/cruises';

    export default {
        name: "CruiseListItem",
        components: { WindowIcon, WifiIcon, TvIcon, ManIcon, LockIcon, DinnerIcon, BaseIcon, CruisePromo },
        mixins: [dayjsHelpers, cruiseCabinsHelper],
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                stuffs: [
                    {
                        icon: 'TvIcon',
                        content: 'Телевизор',
                    },
                    {
                        icon: 'DinnerIcon',
                        content: 'Завтрак, обед и ужин',
                    },
                    {
                        icon: 'LockIcon',
                        content: 'Камеры хранения',
                    },
                    {
                        icon: 'WifiIcon',
                        content: 'Бесплатный Wi-Fi',
                    },
                    {
                        icon: 'WindowIcon',
                        content: 'Каюта с балконом',
                    },
                    {
                        icon: 'ManIcon',
                        content: 'Занятия йогой',
                    },
                ],
                stuffsAlex: [
                    {
                        icon: 'DinnerIcon',
                        content: 'Завтрак, обед и ужин',
                    },
                    {
                        icon: 'LockIcon',
                        content: 'Камеры хранения',
                    },
                    {
                        icon: 'WifiIcon',
                        content: 'Бесплатный Wi-Fi',
                    },
                    {
                        icon: 'ManIcon',
                        content: 'Занятия йогой',
                    },
                ],
            };
        },
        computed: {
            ourShip() {
                return this.item.shipId === 53 || this.item.shipId === 54;
            },
            searchShip() {
               return this.item.shipId === 52;
            },
        },
        methods: {
            ...mapActions({
                onFastBuyClick: "cart/onFastBuyClick",
            }),
            isNew,
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-section-item {
        &:hover {
            transition: box-shadow 0.25s ease;
            box-shadow: 0 4px 50px rgba(72, 72, 72, 0.15);
        }

        &-block {
            flex: 0 1 25.5%;
            @apply py-4 px-7 text-base border-r border-gray-50 last:border-0;
        }

        &__bg-wrap {
            flex: 0 1 240px;
            padding: 16px;
            height: 248px;
        }

        &__content {
            flex: 1;
        }

        &__controls {
            min-width: 240px;
        }

        &__gallery {
            position: absolute;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            &:before {
                content: '';
                background: var(--custom-gray-gradient);
                z-index: 0;
                @apply absolute left-0 top-0 w-full h-full;
            }
        }

        &-subtitle {
            &-stuffs {
                @apply mb-3;
            }
        }

        &__duration {
            font-weight: 500;
            @apply text-base leading-snug;
        }

        &-included-stuffs {
            @apply text-gray-300;
            transition: all .25s ease;
            cursor: pointer;

            .cruise-section-item-subtitle {
                @apply mb-3;
            }

            &-item {
                &:first-child {
                    .cruise-section-item-included-stuffs-tooltip {
                        left: 50%;
                    }
                }
                &:last-child {
                    .cruise-section-item-included-stuffs-tooltip {
                        left: calc(50% + 20px);
                    }
                }
            }

            &-icon {
                &:focus,
                &:active,
                &:hover {
                    @apply text-blue-300;

                    & + .cruise-section-item-included-stuffs-tooltip {
                        visibility: visible;
                        animation: fade-in-block 0.3s var(--custom-transition) both;
                    }
                }
            }

            &-tooltip {
                position: absolute;
                top: calc(-100% - 50px);
                left: calc(50% + 30px);
                transform: translateX(-50%);
                width: max-content;
                padding: 16px 20px;
                color: #fff;
                box-shadow: 0 4px 50px rgba(72, 72, 72, 0.25);
                border-radius: 10px;
                visibility: hidden;
                opacity: 0;
                @apply bg-blue-300;

                &:after {
                    content: "";
                    position: absolute;
                    top: 99%;
                    left: 24%;
                    width: 38px;
                    height: 10px;
                    background: url('~/assets/images/tooltip-triangle.svg') no-repeat center / cover;
                }
            }
        }

        &-buy {
            &:hover,
            &:focus {
                @apply bg-green-400 text-white border-green-400;
            }
        }

        &::v-deep {
            .cruise-section-item-included-stuffs-icon {
                path {
                    fill: currentColor;
                }
            }
        }
    }

    @screen xl {
        .cruise-section-item {
            &-block {
                flex: 0 1 50%;
            }

            &__bg-wrap {
                order: 1;
            }

            &__content {
                order: 2;
                @apply border-b border-gray-50 border-r-0;
            }

            &__info {
                order: 4;
                @apply border-r-0;
            }

            &__controls {
                order: 3;
                border-right-width: 1px !important;
                @apply border-gray-50;
            }
        }
    }
</style>
