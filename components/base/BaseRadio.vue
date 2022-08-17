<template>
    <div class="base-radio relative flex items-center" :class="mainClasses">
        <input
            :id="id"
            type="radio"
            class="base-radio__input"
            v-bind="$attrs"
            :value="value"
            :checked="checked"
            v-on="listeners"
        >

        <label
            :for="id"
            :class="[labelClasses]"
            class="base-radio__label flex items-center text-sm cursor-pointer"
        >
            <div
                class="base-radio__mark w-4 h-4 flex items-center justify-center mr-2 rounded-full border-white border-2 overflow-hidden custom-transition"
                :class="[inputClasses]"
            >
                <span class="block w-2 h-2 bg-transparent rounded-full overflow-hidden"></span>
            </div>

            <span>{{label}}</span>
        </label>
    </div>
</template>

<script>
    export default {
        name: "BaseRadio",
        inheritAttrs: false,
        props: {
            label: String,
            mainClasses: [String, Array, Object],
            labelClasses: [String, Array, Object],
            inputClasses: [String, Array, Object],
            id: String,
            value: null,
            checked: Boolean,
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
            position: absolute;
            width: 1px;
            height: 1px;
            left: 0;
            top: 0;
            opacity: 0;
            pointer-events: none;

            &:checked + .base-radio__label {
                @apply text-black-400;

                .base-radio__mark {
                    span {
                        @apply bg-blue-400;
                    }
                }
            }
        }

        &-blue {
            .base-radio__input {
                &:checked + .base-radio__label {
                    .base-radio__mark {
                        @apply bg-blue-300;

                        span {
                            background-color: #ffffff;
                        }
                    }
                }
            }

            .base-radio__mark {
                width: 16px;
                height: 16px;
                @apply border border-blue-300;

                span {
                    width: 8px;
                    height: 8px;
                    background-color: #fff;
                }
            }
        }

        &-white {
            .base-radio__input {
                &:checked + .base-radio__label {
                    @apply text-white;

                    .base-radio__mark {
                        @apply bg-blue-300;

                        span {
                            width: 8px;
                            height: 8px;
                            background-color: #fff;
                        }
                    }
                }
            }

            .base-radio__mark {
                width: 16px;
                height: 16px;
                @apply bg-white border border-blue-300;

                span {
                    width: 14px;
                    height: 14px;
                    background-color: #fff;
                }
            }
        }
    }
</style>
