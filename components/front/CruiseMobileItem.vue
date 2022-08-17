<template>
    <div class="cruise-mobile-section-item flex flex-col text-base leading-snug text-black-900 border border-gray-50 rounded-sm tablet:!w-[calc(100%-65px)]">

        <div class="cruise-mobile-section-item__content text-black-400 font-medium flex flex-col flex-1-1 p-7 extra:px-5 sm:pb-6">

            <div class="flex-1-1 flex flex-col pb-5">
                <div v-if="item.direction_title" class="cruise-mobile-section-item__content-part">
                    <div class="cruise-mobile-section-item-subtitle">Направление</div>
                    <nuxt-link :to="getSlug">
                        <span class='m-0 direction-title__intro line-clamp-3 text-blue-700'>
                            {{ item.direction_title }}
                        </span>
                    </nuxt-link>

                </div>

                <div
                    v-if="item.departure_date_time && item.arrival_date_time"
                    class="cruise-mobile-section-item__content-part"
                >
                    <div class="cruise-mobile-section-item-subtitle">Дата</div>

                    <div class="justify-start">

                        <div class="flex mob:flex-col">
                            <div>
                                <span class="mr-2">
                                    {{ getMobileDateFormatted(item.departure_date_time) }}
                                </span>

                                <span class="text-gray-300">
                                    {{ dayjsGetTimeFormatted(item.departure_date_time) }}
                                </span>
                            </div>

                            <span class="mx-4 mob:hidden">-</span>

                            <div>
                               <span class="mr-2">
                                {{ getMobileDateFormatted(item.arrival_date_time) }}
                                </span>

                                <span class="text-gray-300">
                                    {{ dayjsGetTimeFormatted(item.arrival_date_time) }}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                <div v-if="item.ship" class="cruise-mobile-section-item__content-part">
                    <div class="cruise-mobile-section-item-subtitle">Теплоход</div>
                    <span>{{ item.ship }}</span>
                </div>

                <div v-if="item.free_cabins" class="cruise-mobile-section-item__content-part">
                    <div class="cruise-mobile-section-item-subtitle">Каюты</div>
                    <span>{{ item.free_cabins }}</span>
                </div>

                <div v-if="item.duration_days" class="cruise-mobile-section-item__content-part">
                    <div class="cruise-mobile-section-item-subtitle">Дни</div>
                    <span>{{ daysAndNights }}</span>
                </div>
            </div>

            <div class="mb-5 border-b border-gray-50 -mx-7 extra:-mx-5"></div>

            <div class="flex items-center justify-between">
                <div class="cruise-mobile-section-item__prices flex-1-1 flex flex-col mb-0">
                    <div v-if="item.discount_price" class="my-auto text-lg leading-none font-semibold">
                        {{ getFormatedPricePerPerson(item.discount_price) }}
                    </div>
                    <div v-if="item.price" class="mt-2 text-sm font-medium text-gray-300">
                        {{ item.price | formatPrice }}
                    </div>
                </div>

                <div class="cruise-mobile-section-item__controls">
                    <nuxt-link
                        :to="getSlug"
                        class="cruise-mobile-section-item__buy button bg-transparent text-red-500 border border-red-500"
                    >
                        <span>Подробнее</span>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dayjsHelpers } from '@/mixins/content-helpers';
import { cruiseCabinsHelper } from '@/mixins/content-helpers';

export default {
    name: 'CruiseMobileItem',
    mixins: [dayjsHelpers, cruiseCabinsHelper],
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.cruise-mobile-section-item {

    &:hover {
        transition: box-shadow 0.25s ease;
        box-shadow: 4px 4px 20px rgba(72, 72, 72, 0.15);
    }

    .cruise-mobile-section-item__content-part{
        @apply mb-2.5;
    }

    &-subtitle {
        @apply text-xs text-gray-300 font-normal mb-1;
    }

    &__bg-wrap {
        height: 160px;
    }

    &__info {
        @apply mb-3 text-lg font-medium text-gray-490;
    }

    .button {
        @apply text-center text-base leading-none py-4 px-4;

        &.cruise-mobile-section-item__toggler {
            @apply py-4;
        }
    }

    .cruise-mobile-section-item__buy {
        &:hover,
        &:focus {
            @apply bg-blue-700 text-white;
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
}

</style>
