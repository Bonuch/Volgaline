<template>
    <v-select
        class="choose-select custom-select custom-select-modal custom-select--white"
        :label="labelField"
        :reduce="item => item"
        :searchable="false"
        :options="prices"
        v-model="price"
    >
        <template #search="{ attributes, events }">
            <label
                :for="id"
                class="search-form__label"
                :class="{'search-form__label--active': price}"
            >
                Пассажир {{ idx + 1 }}
            </label>

            <input
                :id="id"
                :name="name"
                class="vs__search"
                v-bind="attributes"
                v-on="events"
            >
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
    export default {
        name: "ChooseSelect",
        props: {
            id: {
                type: [String, Number],
                required: true,
            },
            labelField: {
                type: String,
            },
            name: {
                type: String,
                required: true,
            },
            tariff: {
                type: Object,
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
        watch: {
            price: function(val) {
                this.$emit("on-price-change", { val, idx: this.idx });
            },
        },
    };
</script>

<style></style>
