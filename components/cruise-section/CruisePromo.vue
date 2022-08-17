<template>
    <div class="cruise-promo relative flex items-center flex-wrap -mx-5 lg:mx-0">
        <span
            v-for="(promoItem, promoIdx) in getFirstPart"
            v-show="promoItem.title !== 'fire'"
            :key="promoIdx"
            class="badge badge-small mb-2 mr-3 last:mr-0 relative overflow-visible"
            :style="{ 'background-color': promoItem.color }"
        >
             <span
                 v-if="promoItem.tooltip"
                 class="badge-tooltip absolute z-10 py-2 px-3 text-white bg-gray-900 rounded-xl hidden shadow-sm dark:bg-gray-700">
                {{ promoItem.tooltip }}
            </span>
            <span class="">{{ promoItem.title }}</span>
        </span>
        <BaseDropdown
            :drop-down="getLastPart"
            list-classes="base-dropdown__list-top-1 base-dropdown__list--right bg-transparent px-0 py-0"
            list-item-classes="base-dropdown__list-item--mb-2"
            class="static"
        >
            <template #button="{ showDropdown }">
                <div
                    class="flex p-1 bg-yellow-400 text-black-400 border-2 border-yellow-400 rounded-full custom-transition hover:border-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="m-auto custom-transition"
                        width="18"
                        height="19"
                        viewBox="0 0 515.555 515.555"
                    >
                        <path
                            class="fill-current"
                            d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                        />
                        <path
                            class="fill-current"
                            d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                        />
                        <path
                            class="fill-current"
                            d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                        />
                    </svg>
                </div>
            </template>

            <template #drop-item="slotProps">
                <span class="badge badge-small relative overflow-visible" :class="{'hidden': slotProps.item.title === 'fire'}" :style="{'background-color': slotProps.item.color}">
                     <span
                         v-if="slotProps.item.tooltip"
                         class="badge-tooltip absolute z-10 py-2 px-3 text-white bg-gray-900 rounded-xl hidden shadow-sm dark:bg-gray-700">
                        {{ slotProps.item.tooltip }}
                    </span>
                    {{ slotProps.item.title }}
                </span>
            </template>
        </BaseDropdown>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseDropdown from "@/components/base/BaseDropdown";

export default {
    name: "CruisePromo",
    components: { BaseDropdown },
    props: {
        promo: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapGetters(["getWindowWidth"]),
        is1600() {
            return this.getWindowWidth < 1601;
        },
        longPromo() {
            return this.promo.length > 1;
        },
        getFirstPart() {
            return this.longPromo ? this.promo.slice(0, this.getSlicedNumber) : this.promo;
        },
        getLastPart() {
            return this.longPromo ? this.promo.slice(this.getSlicedNumber) : [];
        },
        getSlicedNumber() {
            return this.is1600 ? 1 : 2;
        },
    },
};
</script>

<style lang="scss" scoped>
    .cruise-promo {
        .badge {
            cursor: pointer;

            .badge-tooltip {
                font-size: 12px;
                font-weight: 300;
                left: 0;
                top: 120%;
                min-width: 240px;
                text-transform: none;
            }

            &:hover {
                .badge-tooltip {
                    @apply block;
                }
            }
        }

        &::v-deep {
            .base-dropdown__list {
                min-width: 198px;
            }
        }
    }

    @media all and (max-width: 1600px) {
        .cruise-promo {
            .badge {
                margin-bottom: 0;
            }
        }
    }

    @screen lg {
        .cruise-promo {
            .badge {
                .badge-tooltip {
                    left: 0;
                    top: 120%;
                }
            }
        }
    }
</style>
