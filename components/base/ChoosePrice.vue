<template>
    <v-select
        class="custom-select custom-select--white custom-select-price"
        label="title"
        :reduce="item => item"
        :searchable="false"
        :options="prices"
        v-model="price"
    >
        <!-- :dropdown-should-open="() => true" open dropdown list for tests-->
        <template #search="{ attributes, events }">
            <label :for="id" class="label">
                <span class="w-3/4 text-gray-300 text-base xs:text-xs 2xl:w-10/12 sm:w-3/4 xxs:w-8/12">Пассажир {{ idx + 1 }}</span>
<!--                <span-->
<!--                    v-if="getBasePrice"-->
<!--                    class="flex-1-1 px-2 font-medium text-sm text-red-400 line-through"-->
<!--                >-->
<!--                    {{ getBasePrice }}-->
<!--                </span>-->
            </label>

            <input
                :id="id"
                :name="name"
                class="vs__search"
                v-bind="attributes"
                v-on="events"
            >
        </template>

        <template #selected-option="{ title, price }">
            <span class="w-3/4 text-blue-900 truncate text-lg xs:text-15 font-medium 2xl:w-10/12 sm:w-3/4 xxs:w-8/12">{{ title }}</span>
            <span class="flex-1-1 px-2 text-lg font-medium xs:text-15 text-right">{{ getPriceFormatted(price) }}</span>
        </template>

        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                        fill="#5A6472"
                    />
                </svg>
            </span>
        </template>
    </v-select>
</template>

<script>
import { formatCurrency } from "@/helpers/text";

export default {
    name: "ChoosePrice",
    props: {
        id: {
            type: [String, Number],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        prices: {
            type: Array,
            required: true,
        },
        idx: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            price: null,
        };
    },
    computed: {
        getCurrentTariff() {
            let tariff = null;

            if (this.price && Object.keys(this.price).length > 0) {
                const filtered = this.prices.filter(item => item.id === this.price.id);
                if (filtered.length > 0) tariff = filtered[0];
            }

            return tariff;
        },
        getBasePrice() {
            // пока не используем фейковую цену
            let res = null;

            if (this.getCurrentTariff) {
                const price = Number(this.getCurrentTariff.price);
                const percent = Number(this.getCurrentTariff.percent);
                if (percent > 0) res = formatCurrency(price + (price * (percent / 100)));
            }

            return res;
        },
        getPriceFormatted() {
            return (price) => formatCurrency(this.getCurrentTariff.price);
        },
    },
    watch: {
        price: function(val) {
            this.$emit("on-price-change", { val, idx: this.idx });
        },
    },
};
</script>

<style></style>
