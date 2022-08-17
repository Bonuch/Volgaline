<template>
    <div class="base-radio flex items-center">
        <input
            :id="id"
            type="radio"
            class="base-radio__input hidden"
            v-bind="$attrs"
            :value="value"
            v-on="listeners"
            :checked="radioValue"
        />
        <label
            :for="id"
            class="base-radio__label flex items-center justify-center w-12 h-12 mr-4 last:mr-0 bg-blue-50 text-green-400 border border-green-400 rounded-sm overflow-hidden cursor-pointer custom-transition"
            :class="[labelClasses]"
        >
            <span class="text-base leading-none font-normal">{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    name: "ChooseRadio",
    inheritAttrs: false,
    props: {
        label: [String, Number],
        labelClasses: [String, Array, Object],
        inputClasses: [String, Array, Object],
        id: String,
        value: null,
        radioValue: Boolean,
    },
    computed: {
        listeners() {
            return {
                ...this.$listeners,
                ...{ input: (event) => this.onInput(event) },
            };
        },
    },
    methods: {
        onInput() {
            this.$emit("input", this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
.base-radio {
    &__input {
        &:checked + .base-radio__label {
            @apply bg-blue-300 text-white border-blue-300;
        }
    }

    &__label {
        &:hover {
            @apply bg-green-400 text-white border-green-400;
        }

        &--blue {
            @apply w-32 border-blue-300 text-blue-300 hover:bg-green-400 hover:border-green-400;
        }

        &--large {
            @apply w-40;
        }

        &--fluid {
            @apply w-auto;
        }
    }
}
</style>
