<template>
    <div class="base-checkbox relative items-center" :class="groupSelectors">
        <input
            type="checkbox"
            :id="id"
            class="base-checkbox__input"
            :value="customVal"
            :checked="customVal"
            v-on="listeners"
            v-bind="$attrs"
        />

        <span
            class="base-checkbox__mark custom-transition absolute top-1/2 left-0 w-6 h-6 flex items-center justify-center bg-white rounded-sm transform -translate-y-1/2"
            :class="markSelectors"
        >
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1" fill="none">
                <path
                    class="fill-current"
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M14.5607 3.93985C15.1465 4.52565 15.1464 5.4754 14.5606 6.06117L7.56064 13.0609C6.97486 13.6466 6.02517 13.6466 5.43939 13.0609L1.93939 9.5612C1.35357 8.97544 1.35353 8.02569 1.93929 7.43988C2.52505 6.85406 3.4748 6.85402 4.06061 7.43978L6.49998 9.87893L12.4394 3.9398C13.0252 3.35403 13.9749 3.35405 14.5607 3.93985Z"
                />
                </mask>
                <path
                    class="fill-current"
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M14.5607 3.93985C15.1465 4.52565 15.1464 5.4754 14.5606 6.06117L7.56064 13.0609C6.97486 13.6466 6.02517 13.6466 5.43939 13.0609L1.93939 9.5612C1.35357 8.97544 1.35353 8.02569 1.93929 7.43988C2.52505 6.85406 3.4748 6.85402 4.06061 7.43978L6.49998 9.87893L12.4394 3.9398C13.0252 3.35403 13.9749 3.35405 14.5607 3.93985Z"
                    fill="#0C73FE"
                />
            </svg>
        </span>

        <label
            v-if="label"
            :for="id"
            class="base-checkbox__label custom-transition relative block z-1 pl-8 text-base font-medium cursor-pointer"
            :class="labelSelectors"
            v-html="label"
        ></label>
    </div>
</template>

<script>
    export default {
        name: "BaseCheckbox",
        inheritAttrs: false,
        props: {
            id: {
                type: String,
                required: true,
            },
            label: String,
            groupSelectors: [String, Array],
            labelSelectors: [String, Array, Object],
            markSelectors: [String, Array],
            customVal: {
                type: Boolean,
            },
        },
        computed: {
            listeners() {
                return Object.assign({},
                    this.$listeners,
                    { input: (event) => this.updateValue(event) },
                );
            },
        },
        methods: {
            updateValue() {
                this.$emit("input", !this.customVal);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .base-checkbox {
        &:hover,
        &:focus {
            .base-checkbox__label {
                //@apply text-black-400;
            }

            .base-checkbox__mark {
                //@apply border-success;
            }
        }

        &__input {
            display: none;

            &:checked {
                & ~ .base-checkbox__mark {
                    svg {
                        opacity: 1;
                    }
                }

                & ~ .base-checkbox__label {
                    //@apply text-gray-100;
                }
            }
        }

        &__mark {
            &--top {
                @apply top-0 translate-y-0;
            }

            svg {
                opacity: 0;
            }
        }

        &::v-deep {
            a {
                @apply text-red-400;

                &:hover,
                &:focus {
                    @apply text-blue-400;
                }
            }
        }
    }
</style>
