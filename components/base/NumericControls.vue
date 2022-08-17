<template>
    <div class="numeric-controls flex items-center justify-center py-4 px-3 bg-gray-250 rounded-sm overflow-hidden">
        <button type="button" class="numeric-controls__item" @click="changeValue('decrement')">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.5 8.99609C1.5 8.44381 1.94772 7.99609 2.5 7.99609H13.5C14.0523 7.99609 14.5 8.44381 14.5 8.99609C14.5 9.54838 14.0523 9.99609 13.5 9.99609H2.5C1.94772 9.99609 1.5 9.54838 1.5 8.99609Z"
                    fill="#1D1F20"
                />
            </svg>
        </button>

        <span class="numeric-controls__item mx-1 text-base">{{ value }}</span>

        <button type="button" class="numeric-controls__item" @click="changeValue('increment')">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 3.49609C9 2.94381 8.55228 2.49609 8 2.49609C7.44772 2.49609 7 2.94381 7 3.49609V7.99609H2.5C1.94772 7.99609 1.5 8.44381 1.5 8.99609C1.5 9.54838 1.94772 9.99609 2.5 9.99609H7V14.4961C7 15.0484 7.44772 15.4961 8 15.4961C8.55228 15.4961 9 15.0484 9 14.4961V9.99609H13.5C14.0523 9.99609 14.5 9.54838 14.5 8.99609C14.5 8.44381 14.0523 7.99609 13.5 7.99609H9V3.49609Z"
                    fill="#1D1F20"
                />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "NumericControls",
    props: {
        total: {
            type: Number,
            required: true,
        },
        minValue: {
            type: Number,
            default: 0,
        },
        initialVal: {
            type: Number,
        }
    },
    data() {
        return {
            value: 0,
        };
    },
    methods: {
        changeValue(action) {
            if (action === "increment" && this.value < this.total) {
                this.value++;
            } else if (action === "decrement" && this.value > this.minValue) {
                this.value--;
            }

            this.emitValueUpdate();
        },
        emitValueUpdate() {
            this.$emit("on-numeric-value-change", this.value);
        },
    },
    watch: {
        total(newVal) {
            if (this.value > newVal) {
                this.value = newVal;
                this.emitValueUpdate();
            }
        }
    },
    mounted() {
        this.value = !!this.initialVal ? this.initialVal : this.minValue;
    }
};
</script>

<style lang="scss" scoped>
.numeric-controls {
    &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 1;
    }
}
</style>
