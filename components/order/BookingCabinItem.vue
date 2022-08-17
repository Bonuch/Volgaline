<template>
    <div class="order-cabin-item">
        <div
            class="py-4 px-5 flex flex-wrap items-center justify-between border-t-2 border-b-2 border-gray-50 md:block"
        >
            <div class="w-full flex items-center">
                <div class="flex-1-1 mr-8">
                    <div class="mb-4 font-bold text-lg text-blue-900">
                        <span v-if="cabinItem.name" class="sm:block">Каюта № {{ cabinItem.name }}</span>
                        <span v-if="cabinItem.category" class="ml-3 sm:block sm:ml-0">{{ cabinItem.category }}</span>
                    </div>

                    <div class="flex flex-wrap items-center text-base font-medium text-gray-300 md:block sm:text-sm">
                        <div class="mr-10">
                            <template v-if="cabinItem.deck">{{ cabinItem.deck }}</template>
                        </div>

                        <div v-if="cabinItem.passengers" class="mr-10">
                            {{ cabinItem.passengers }} местное размещение
                        </div>

                        <div v-if="cabinItem.kids">
                            {{ getKidsFormatted(cabinItem.kids) }}
                        </div>
                    </div>
                </div>

                <div
                    class="w-8 h-8 flex items-center justify-center ml-auto rounded-full overflow-hidden text-white"
                    :class="{'bg-green-400': isCabinTouristsFilled, 'bg-gray-50': !isCabinTouristsFilled}"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            class="fill-current"
                            fill-rule="evenodd" clip-rule="evenodd"
                            d="M14.5607 3.43936C15.1465 4.02516 15.1464 4.97491 14.5606 5.56068L7.56064 12.5604C6.97486 13.1461 6.02517 13.1461 5.43939 12.5604L1.93939 9.06071C1.35357 8.47495 1.35353 7.5252 1.93929 6.93939C2.52505 6.35357 3.4748 6.35353 4.06061 6.93929L6.49998 9.37844L12.4394 3.43932C13.0252 2.85354 13.9749 2.85356 14.5607 3.43936Z"
                            fill="#A6AEBA"
                        />
                    </svg>
                </div>
            </div>

            <div class="text-right">
                <template v-if="touristPrices && touristPrices.length > 0">
                    <div
                        v-for="(priceItem, priceIdx) in getPrices(touristPrices)"
                        :key="priceIdx"
                        class="flex items-center justify-between font-medium"
                    >
                        <span v-if="priceItem.name" class="text-base mr-10 sm:text-sm">{{ priceItem.name }}</span>
                        <span v-if="priceItem.value" class="text-lg sm:text-base">{{ priceItem.value }}</span>
                    </div>
                </template>
            </div>
        </div>

        <client-only>
            <OrderTourist
                class="tourist-item border-b border-dashed border-gray-50 last:border-0"
                v-for="(tourist, touristIdx) in cabinItem.passengers"
                :key="touristIdx"
                :idx="touristIdx"
                :price="cabinItem['touristPrices'][touristIdx]"
                :value="tourists[touristIdx]"
                v-on:input="onTouristChange"
            />
        </client-only>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import { setCase } from "@/helpers/text";
    import OrderTourist from "./OrderTourist";

    function isTouristFilled(tourist) {
        let res = true;

        if (tourist && Object.keys(tourist).length > 0) {
            const values = Object.values(tourist);

            for (let i = 0; i < values.length; i++) {
                if (!values[i] || values[i] === "") {
                    res = false;
                    break;
                }
            }
        } else {
            res = false;
        }

        return res;
    }

    export default {
        name: "BookingCabinItem",
        components: { OrderTourist },
        props: {
            cruiseId: {
                type: Number,
                required: true,
            },
            cabinItem: {
                type: Object,
                required: true,
            },
            touristPrices: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                tourists: [],
            };
        },
        computed: {
            getPrices() {
                return prices => {
                    return prices.filter(price => price.name !== "Экскурсии:" && price.name !== "Страховка:");
                };
            },
            getKidsFormatted() {
                return kids => kids + " " + setCase(kids, ["ребёнок", "ребёнка", "детей"]);
            },
            isCabinTouristsFilled() {
                let res = true;

                for (let i = 0; i < this.tourists.length; i++) {
                    if (!isTouristFilled(this.tourists[i])) {
                        res = false;
                        break;
                    }
                }

                return res;
            },
        },
        methods: {
            ...mapActions({
                updateBookingItems: "cart/updateBookingItems",
            }),
            onTouristChange({ idx, val }) {
                this.$set(this.tourists, idx, val);
                this.updateBookingItems({
                    cruiseId: this.cruiseId,
                    cabinId: this.cabinItem.id,
                    passengers: this.tourists.slice(),
                });
            },
        },
    };
</script>

<style></style>
