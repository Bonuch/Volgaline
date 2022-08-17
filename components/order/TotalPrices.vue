<template>
    <div class="total-prices px-9 py-6 bg-blue-900 text-white text-base font-medium rounded overflow-hidden sm:text-sm">
        <template v-if="loading">
            <div class="absolute z-1 left-0 top-0 w-full h-full flex items-center justify-center">
                <Preloader />
            </div>
        </template>

        <div :class="{ 'relative overflow-hidden disabled': loading }">
            <template v-if="getPrice">
                <p
                    v-if="getPrice.tariffs"
                    class="total-prices__item flex items-center justify-between m-0 mb-2"
                >
                    <span class="total-prices__name text-base font-medium">Стоимость:</span>
                    <span class="total-prices__value text-base font-medium">{{ getPrice.tariffs | formatPrice }}</span>
                </p>

                <p
                    v-if="getPrice.excursions"
                    class="total-prices__item flex items-center justify-between m-0 mb-2"
                >
                    <span class="total-prices__name text-base font-medium">Экскурсии:</span>
                    <span class="total-prices__value text-base font-medium">{{ getPrice.excursions | formatPrice }}</span>
                </p>

                <p
                    v-if="getPrice.discount"
                    class="total-prices__item flex items-center justify-between m-0 mb-2"
                >
                    <span class="total-prices__name text-base font-medium">Скидка:</span>
                    <span class="total-prices__value text-base font-medium">{{ getPrice.discount | formatPrice }}</span>
                </p>

                <p
                    v-if="getPrice.total"
                    class="total-prices__item flex items-center justify-between m-0 mb-2 mt-8 total-prices__item--last font-medium"
                >
                    <span class="total-prices__name text-base font-medium">{{ totalPriceTitle }}</span>
                    <span class="total-prices__value text-base font-medium">{{ getPrice.total | formatPrice }}</span>
                </p>
            </template>

            <div
                v-if="radioList && radioList.length > 0"
                class="mt-4 mb-1"
            >
                <BaseRadio
                    v-for="(item, idx) in radioList"
                    :key="idx"
                    :id="`price-id-${item.id}`"
                    name="radioList"
                    main-classes="base-radio-white"
                    :label="item.name"
                    :value="item.id"
                    :checked="item.checked"
                    @input="onChoosePayment"
                    class="mb-2 last:mb-0"
                />
            </div>

            <button
                type="button"
                class="total-prices-button button w-full py-4 mt-4 text-xl leading-none text-center"
                @click="onButtonClick"
            >
                <slot name="button">
                    <span class="text-base font-medium">Перейти к&nbsp;оформлению</span>
                </slot>
            </button>

<!--            <button-->
<!--                type="button"-->
<!--                class="total-prices-button-gray button w-full py-4 mt-4 text-xl leading-none text-center"-->
<!--                @click="onButtonClick"-->
<!--            >-->
<!--                <slot name="button">-->
<!--                    <span class="text-base text-blue-900 font-medium">Оформить в 1 клик</span>-->
<!--                </slot>-->
<!--            </button>-->
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseRadio from "@/components/base/BaseRadio";
import Preloader from "@/components/base/Preloader";

export default {
    name: "TotalPrices",
    components: {Preloader, BaseRadio },
    props: {
        totalPriceTitle: {
            type: String,
            default: 'Итоговая цена:',
        },
        radioList: {
            type: Array,
        },
        total: {
            type: Object,
        },
        loading: {
            type: Boolean,
        },
    },
    computed: {
        ...mapGetters({
            getTotalPrices: "cart/getTotalPrices",
        }),
        getPrice() {
            if (this.total && Object.keys(this.total).length > 0) {
                return this.total;
            } else if (this.getTotalPrices && Object.keys(this.getTotalPrices).length > 0) {
                return this.getTotalPrices;
            } else {
                return null;
            }
        }
    },
    methods: {
        onButtonClick() {
            this.$emit("on-button-click", true);
        },
        onChoosePayment(paymentType) {
            this.$emit("on-payment-change", paymentType);
        },
    }
};
</script>

<style lang="scss" scoped>
.total-prices {
    &__item--last {
        .total-prices__name {
            @apply text-xl mob:text-lg;
        }

        .total-prices__value {
            @apply text-xl mob:text-lg;
        }
    }

    &--gray {
        @apply bg-gray-50 text-black-400;

        .total-prices-button {
            @apply bg-green-700;

            &:hover,
            &:focus,
            &:active {
                @apply bg-red-400;
            }
        }

        .total-prices-button-gray {
            @apply bg-gray-50 border border-blue-900 rounded;

            &:hover,
            &:focus,
            &:active {
                @apply bg-red-400;
            }
        }
    }
}
</style>
