<template>
    <div
        class="cruise-line-item cruise-line-table__row relative custom-transition text-base extra:text-sm xl:text-xs hover:bg-gray-50">
        <div class="cruise-line-table__item text-sm xl:text-xs text-left">
            <p class="text-gray-300 mb-0 text-xs">Дата и время отправления</p>
            <template v-if="item.departure_date_time">
                <p class="m-0 ">
                    {{ getMobileDateFormatted(item.departure_date_time) }}
                    <span class="cruise-line-table__item-time text-gray-300">
                        {{ dayjsGetTimeFormatted(item.departure_date_time) }}
                    </span>
                </p>
            </template>
            <p class="text-gray-300 mb-0 text-xs mt-2">Дата и время прибытия</p>
            <template v-if="item.arrival_date_time">
                <p class="m-0">
                    {{ getMobileDateFormatted(item.arrival_date_time) }}
                    <span class="cruise-line-table__item-time text-gray-300">
                        {{ dayjsGetTimeFormatted(item.arrival_date_time) }}
                    </span>
                </p>
            </template>
            <span v-if='isNew(item.departure_date_time, $dayjs)' class='badge badge-xs mt-1 self-start'>New</span>
        </div>

        <div class="cruise-line-table__item">
            {{ daysAndNights }}
        </div>

        <div
            v-if="!frontPage"
            class="cruise-line-table__item text-left"
        >
            <nuxt-link :to="getSlug">
                {{ item.title }}
            </nuxt-link>
        </div>

        <div class="cruise-line-table__item text-left text-blue-400">
            <template v-if="item.direction_title">
                <nuxt-link :to='getSlug'>
                    <span>{{ item.direction_title }}</span>
                </nuxt-link>
            </template>
        </div>

        <div class="cruise-line-table__item text-left text-blue-400"
            :class="{ 'text-center': frontPage}"
        >
            <template v-if="item.ship && item.shipSlug">
                <nuxt-link :to="getShipLink()" no-prefetch>Т/х «{{ item.ship }}»</nuxt-link>
            </template>
        </div>

        <div
            v-if="!frontPage"
            class="cruise-line-table__item"
            :class="getCabinTextColor(item.free_cabins)"
        >
            {{ item.free_cabins }}
        </div>
        <div
            v-else
            class="cruise-line-table__item"
        >
            {{ item.free_cabins }}
        </div>

        <div class="cruise-line-table__item">
            <p class="m-0 text-xs text-red-400 line-through" v-if="item.price">{{ getFormatedPricePerPerson(item.price) }}</p>
            <p class="m-0 text-sm" v-if="item.discount_price">{{ getFormatedPricePerPerson(item.discount_price) }}</p>
        </div>

        <div class="cruise-line-table__item">
            <template v-if="!frontPage">
                <nuxt-link
                    class="block w-full mb-2 hover:text-red-400 custom-transition"
                    :class="{'disabled': cabinsEmpty}"
                    :to="getSlug"
                >
                    Выбрать каюты
                </nuxt-link>

                <button
                    type="button"
                    class="flex w-full items-center justify-center text-center custom-transition hover:text-red-400"
                    :class="{'disabled': cabinsEmpty}"
                    @click="onFastBuyClick(item.id)"
                >
                    <svg class="mr-1 fill-current" width="12" height="12" viewBox="0 0 24 24" fill="none"
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
            </template>

            <template>
                <nuxt-link
                    class="block w-full mb-2 text-red-500 font-medium hover:text-blue-700 custom-transition"
                    :class="{'disabled': cabinsEmpty}"
                    :to="getSlug"
                >
                    Подробнее
                </nuxt-link>
            </template>

        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { dayjsHelpers, cruiseCabinsHelper } from "@/mixins/content-helpers";
import { isNew } from '@/helpers/cruises';

export default {
    name: "CruiseLineItem",
    mixins: [dayjsHelpers, cruiseCabinsHelper],
    props: {
        item: {
            type: Object,
            required: true,
        },
        frontPage: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            hiddenFields: false,
        };
    },
    methods: {
        ...mapActions({
            onFastBuyClick: "cart/onFastBuyClick",
        }),
        isNew,
        getShipLink() {
            return `/populyarnye-kruiznye-teplohody/${this.item.shipSlug}`;
        },
    },
};
</script>

<style></style>
