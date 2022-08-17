<template>
    <div
        class="order-total-item overflow-hidden"
        :class="{ 'relative': loading }"
    >
        <div
            v-if="loading"
            class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
        >
            <Preloader class="z-2" />
        </div>

        <div :class="{'disabled': loading}">
            <div class="order-total-item__item order-total-item__info relative border border-gray-50 border-b-0 rounded-t ">

                <div class="" v-if="getDiscountsType && getDiscountsType.length > 0"></div>
                <div class="mb-5">
                    <span
                        class="uppercase text-xs font-medium px-2.5 py-2 text-white bg-green-700 rounded"
                        v-for="(item, indexIdx) in cartItem.discounts"
                        :key="indexIdx"
                    >
                        Купон применен - {{ item.discount }}<span class="capitalize">{{getDiscountsType}}</span></span>
                </div>

                <span class="text-xs text-gray-300 font-normal uppercase">Круиз:</span>
                <h3
                    v-if="cartItem.name"
                    class="m-0 mt-2 mb-3 text-lg font-medium leading-1-2 text-blue-900 sm:mb-1 sm:text-base sm:leading-none"
                >
                    <nuxt-link :to='getCruiseSlug'>{{ cartItem.name }}</nuxt-link>
                </h3>

                <div class="flex flex-col justify-start  mb-4 text-base sm:text-sm sm:mb-6">
                    <span class="text-xs text-gray-300 font-normal uppercase">Дата:</span>
                    <div class="mt-2 flex justify-start items-center">
                        <div v-if="cartItem.departure_date_time">
                        {{ getMobileDateFormatted(cartItem.departure_date_time) }}
                    </div>

                        <div class="mx-2">&mdash;</div>

                        <div  v-if='cartItem.arrival_date_time' class="mr-5">
                            {{ getMobileDateFormatted(cartItem.arrival_date_time) }}
                        </div>

                        <div v-if="cartItem.duration_days">
                            <span>({{ cartItem.duration_days }}</span>
                            <span>{{ getDaysFormatted(cartItem.duration_days) }})</span>
                        </div>
                    </div>
                </div>

                <div v-if="cartItem.road" class="mb-7 font-medium text-base sm:mb-5 sm:text-sm">
                    <span class="text-xs text-gray-300 font-normal uppercase">Маршрут:</span>
                    <p class="mt-2 sm:text-base font-normal">{{ cartItem.road }}</p>
                </div>

                <div v-if="cartItem.ship" class="flex items-center text-gray-300 ">
                    <svg
                        class="sm:w-6 sm:h-6"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            class="fill-current"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21.8664 2.95588C22.4749 2.14451 23.43 1.66699 24.4442 1.66699C26.2238 1.66699 27.6664 3.10963 27.6664 4.88921V5.33366C27.6664 7.3587 26.0248 9.00033 23.9997 9.00033H22.6664C22.1141 9.00033 21.6664 8.55261 21.6664 8.00033C21.6664 7.44804 22.1141 7.00033 22.6664 7.00033H23.9997C24.9202 7.00033 25.6664 6.25413 25.6664 5.33366V4.88921C25.6664 4.2142 25.1192 3.66699 24.4442 3.66699C24.0595 3.66699 23.6972 3.84812 23.4664 4.15588L23.1074 4.63451C22.3052 5.70415 21.0462 6.33366 19.7091 6.33366H18.6664C18.1141 6.33366 17.6664 5.88594 17.6664 5.33366C17.6664 4.78137 18.1141 4.33366 18.6664 4.33366H19.7091C20.4167 4.33366 21.0829 4.00054 21.5074 3.43451L21.8664 2.95588ZM13.7177 7.6841C13.8538 7.27576 14.236 7.00033 14.6664 7.00033H17.3331C17.7635 7.00033 18.1456 7.27576 18.2817 7.6841L19.457 11.2098L22.8287 12.3337H26.6664C27.2187 12.3337 27.6664 12.7814 27.6664 13.3337C27.6664 13.8859 27.2187 14.3337 26.6664 14.3337H23.9472L24.7805 17.667H25.385C26.1736 17.667 26.8784 18.159 27.1504 18.8992C28.3312 22.1136 26.7209 25.6817 23.5293 26.9229L22.5125 27.3183C23.1252 27.2926 23.7429 27.4206 24.3062 27.7022C24.8708 27.9845 25.5465 27.9236 26.0515 27.5448L26.0664 27.5337C26.5082 27.2023 27.135 27.2918 27.4664 27.7337C27.7978 28.1755 27.7082 28.8023 27.2664 29.1337L27.2515 29.1448C26.1405 29.9781 24.654 30.1121 23.4118 29.491C22.9425 29.2564 22.3903 29.2564 21.921 29.491C20.6788 30.1121 19.1923 29.9781 18.0813 29.1448L18.0812 29.1448L18.0664 29.1336C18.0126 29.0933 17.964 29.0486 17.9208 29.0003H14.0787C14.0355 29.0486 13.9869 29.0933 13.9331 29.1336L13.9182 29.1448L13.9182 29.1448C12.8071 29.9781 11.3206 30.1121 10.0784 29.491C9.60921 29.2564 9.05692 29.2564 8.58771 29.491C7.3455 30.1121 5.85899 29.9781 4.74793 29.1448L4.74789 29.1448L4.73303 29.1336C4.29121 28.8022 4.2017 28.1754 4.5331 27.7336C4.86449 27.2918 5.4913 27.2023 5.93311 27.5337L5.94793 27.5448C5.94794 27.5448 5.94795 27.5448 5.94797 27.5448C6.45299 27.9236 7.12866 27.9845 7.69328 27.7022C8.25655 27.4205 8.87424 27.2926 9.48695 27.3183L8.47016 26.9229C5.27855 25.6817 3.66829 22.1136 4.8491 18.8992C5.12102 18.159 5.82586 17.667 6.61444 17.667H7.21896L8.05229 14.3337H5.33307C4.78078 14.3337 4.33307 13.8859 4.33307 13.3337C4.33307 12.7814 4.78078 12.3337 5.33307 12.3337H9.17079L12.5425 11.2098L13.7177 7.6841ZM13.4953 13.0003L10.1701 14.1088L9.28051 17.667H10.5433L15.7572 16.3635C15.9164 16.3237 16.083 16.3237 16.2423 16.3635L21.4562 17.667H22.719L21.8294 14.1088L18.5041 13.0003H13.4953ZM17.279 11.0003L16.6123 9.00033H15.3872L14.7205 11.0003H17.279ZM20.3331 19.4478L15.9997 18.3644L11.6664 19.4478V21.3337C11.6664 21.8859 11.2187 22.3337 10.6664 22.3337C10.1141 22.3337 9.6664 21.8859 9.6664 21.3337V19.667H7.99973H6.69856C5.94766 21.8378 7.04505 24.2228 9.19506 25.0589L14.1873 27.0003H17.8121L22.8044 25.0589C24.9544 24.2228 26.0518 21.8378 25.3009 19.667H23.9997H22.3331V21.3337C22.3331 21.8859 21.8854 22.3337 21.3331 22.3337C20.7808 22.3337 20.3331 21.8859 20.3331 21.3337V19.4478Z"
                            fill="#fff"
                        />
                    </svg>
                    <span class="ml-3 text-red-500 text-base font-medium">{{ cartItem.ship }}</span>
                </div>
            </div>

            <div
                v-if="cartItem.cabins && cartItem.cabins.length > 0"
                class="order-total-item__item border border-t-0 border-gray-50"
            >
                <TotalItemCabin
                    v-for="(cabinItem, cabinItemIdx) in cartItem.cabins"
                    class="mb-7 last:mb-0"
                    :key="`total-cabin-item-${cabinItemIdx}`"
                    :cabin-item="cabinItem"
                    :cruise-id="cartItem.cruiseID"
                    :may-remove="canRemoveCabins"
                    v-on:on-cabin-remove="onCabinRemove"
                />
                <button
                    v-if="canRemoveItemFromCart && inCart"
                    type="button"
                    class="custom-transition flex items-center px-4 py-2.5 border border-red-500 rounded text-sm text-red-500 mt-4 hover:border-blue-300 hover:text-blue-300"
                    title="удалить круиз из корзины"
                    @click="onRemoveItemFromCartClick"
                >
                    <span class="pr-3">Удалить этот круиз из заказа</span>
                    <svg class="fill-current" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7.07031" width="2" height="10" rx="1" transform="rotate(45 7.07031 0)" fill="#BC002D"/>
                        <rect y="1.41406" width="2" height="10" rx="1" transform="rotate(-45 0 1.41406)" fill="#BC002D"/>
                    </svg>
                </button>
            </div>

            <div class="order-total-item__item order-total-item__prices mb-15 border border-t-0 border-gray-50 border-b-0 rounded-b">
                <template
                    v-if="cmCruiseTariffPrice(this.getCabinPrices.cruisePrices) > 0 || cmExcursionsPrice(this.getCabinPrices.exPrices) > 0"
                >
                    <p class="text-lg text-blue-900 font-medium">Стоимось круиза</p>
<!--                    <div-->
<!--                        v-for="(totalPrice, totalPriceIdx) in cmTotalPrices(this.getCabinPrices.cruisePrices, this.getCabinPrices.exPrices)"-->
<!--                        :key="`cartItemPrice-${totalPriceIdx}`"-->
<!--                        class="flex items-center justify-between mb-1 last:m-0 font-medium"-->
<!--                    >-->
<!--                        <span class="text-base font-normal sm:text-sm">{{ totalPrice.name }}</span>-->
<!--                        <span class="text-base font-medium sm:text-sm">{{ totalPrice.value | formatPrice }}</span>-->
<!--                    </div>-->
                    <div class="flex items-center justify-between mb-1 last:m-0 font-medium">
                        <span class="text-base font-normal sm:text-sm">Стоимость</span>
                        <span class="text-base font-medium sm:text-sm">{{ cartItem.prices.passengers | formatPrice }}</span>
                    </div>
                    <div v-if="cartItem.prices.excursions > 0" class="flex items-center justify-between mb-1 last:m-0 font-medium">
                        <span class="text-base font-normal sm:text-sm">Экскурсии</span>
                        <span class="text-base font-medium sm:text-sm">{{ cartItem.prices.excursions | formatPrice }}</span>
                    </div>
                    <div v-if="cartItem.prices.discount > 0" class="flex items-center justify-between mb-1 last:m-0 font-medium">
                        <span class="text-base font-normal sm:text-sm">Скидка</span>
                        <span class="text-base font-medium sm:text-sm">{{ cartItem.prices.discount | formatPrice }}</span>
                    </div>
                    <div class="flex items-center justify-between mb-1 last:m-0 font-medium">
                        <span class="text-base font-normal sm:text-sm">Итого к оплате</span>
                        <span class="text-base font-medium sm:text-sm">{{ cartItem.prices.total | formatPrice }}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { dayjsHelpers } from "@/mixins/content-helpers";
import { cartMixin } from "@/mixins/cart-mixin";
import TotalItemCabin from "./TotalItemCabin";
import Preloader from "@/components/base/Preloader";

export default {
    name: "TotalItemNew",
    components: { Preloader, TotalItemCabin },
    mixins: [dayjsHelpers, cartMixin],
    props: {
        cartItem: {
            type: Object,
            required: true,
        },
        canRemoveItemFromCart: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapGetters({
            getCartItems: "cart/getCartItems",
        }),
        getDiscountsType() {
            const discount = this.getCartItems.map(discount => {
                return discount.discounts
            })
            const discountType = discount.map(discountType => {
                return discountType[0]
            })
            for(let disc in discountType) {
                const discountT = JSON.parse(JSON.stringify(discountType))
                for(let discs in discountT[0]) {
                    if(discountT[0].discount_type === 1) {
                        return '%'
                    }else if (discountT[0].discount_type === 2) {
                        return 'Руб.'
                    } else {
                        return
                    }
                }
            }
        },
        inCart() {
            return this.getCartItems && this.getCartItems.length > 0
                ? JSON.parse(JSON.stringify(this.getCartItems)).filter(copiedItem => copiedItem.id === this.cartItem.id)
                : false;
        },
        getCabinPrices() {
            let cruisePrices = [];
            let exPrices = [];

            this.cartItem.cabins.forEach((cabinItem) => {
                cruisePrices = [...cruisePrices, ...cabinItem.touristPrices];
                exPrices = [...exPrices, ...cabinItem.excursions];
            });

            return {
                cruisePrices,
                exPrices
            }
        },
        canRemoveCabins() {
            return this.cartItem.cabins.length > 1 && this.canRemoveItemFromCart;
        },
        getCruiseSlug() {
            return this.cartItem.cruiseSlug ? `/rechnye-kruizy/${this.cartItem.cruiseSlug}` : '/rechnye-kruizy';
        },
    },
    methods: {
        ...mapActions({
            removeItemFromCart: "cart/removeItemFromCart",
            removeCabinFromCartItem: "cart/removeCabinFromCartItem",
        }),
        async onRemoveItemFromCartClick() {
            this.loading = true;
            await this.removeItemFromCart(this.cartItem.cruiseID);
            this.loading = false;
        },
        async onCabinRemove({ cruiseId, cabinId }) {
            this.loading = true;
            await this.removeCabinFromCartItem({ cruiseId, cabinId });
            this.loading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.order-total-item {
    &__item {
        @apply p-7 border-b border-gray-50;
    }

    &::v-deep {
        .total-item-cabin {

            &-title {
                @apply mb-5 text-2xl font-normal text-blue-900;

                & > span {
                    &:last-of-type {
                        @apply text-xl leading-1-1;
                    }
                }
            }

            &-remove {
                margin-top: 10px;
            }
        }
    }
}

@screen sm {
    .order-total-item {
        &::v-deep {
            .total-item-cabin {
                &-title {
                    @apply mb-3 text-xl;
                }
            }
        }
    }
}

@screen xs {
    .order-total-item {
        &__tourist-tariff {
            width: fit-content;
        }
    }
}
</style>
