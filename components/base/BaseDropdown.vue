<template>
    <div
        class="base-dropdown relative z-4"
         v-click-outside="onCloseDropdown"
         v-if="dropDown && dropDown.length > 1"
    >
        <button
            type="button"
            :class="{'base-dropdown__button--active': showDropdown}"
            @click="onDropdownButtonClick"
        >
            <slot name="button" :show-dropdown="showDropdown">
                <div
                    class="flex items-center justify-center p-2 bg-transparent text-white border-2 border-current rounded-sm custom-transition hover:bg-yellow-400 hover:border-yellow-400 hover:text-black-400"
                    :class="{'bg-yellow-400 text-black-400 border-yellow-400': showDropdown}"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            class="fill-current"
                            fill-rule="evenodd" clip-rule="evenodd"
                            d="M14 3.75C14 2.64543 13.1046 1.75 12 1.75C10.8954 1.75 10 2.64543 10 3.75V10H3.75C2.64543 10 1.75 10.8954 1.75 12C1.75 13.1046 2.64543 14 3.75 14H10V20.25C10 21.3546 10.8954 22.25 12 22.25C13.1046 22.25 14 21.3546 14 20.25V14H20.25C21.3546 14 22.25 13.1046 22.25 12C22.25 10.8954 21.3546 10 20.25 10H14V3.75Z"
                        />
                    </svg>
                </div>
            </slot>
        </button>

        <transition name="fill-dropdown">
            <div
                v-if="showDropdown"
                class="base-dropdown__list absolute left-0 top-full py-6 px-5 bg-white text-black-400 rounded-sm"
                :class="listClasses"
            >
                <div
                    v-for="(dropItem, dropIdx) in dropDown"
                    :key="dropIdx"
                    :class="['base-dropdown__list-item mb-4 last:mb-0', listItemClasses]"
                >
<!--                    :class="listItemClasses"-->

                    <slot name="drop-item" :item="dropItem">
                        <div
                            class="base-dropdown__list-text inline-block max-w-full text-lg font-medium border-b border-dashed truncate md:text-base"
                        >
                            {{ dropItem }}
                        </div>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "BaseDropdown",
    props: {
        dropDown: {
            type: Array,
            required: true,
        },
        listClasses: {
            type: null,
        },
        listItemClasses: {
            type: null,
        },
    },
    data() {
        return {
            showDropdown: false,
        };
    },
    methods: {
        onDropdownButtonClick() {
            this.showDropdown = !this.showDropdown;
        },
        onCloseDropdown() {
            this.showDropdown = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.fill-dropdown-enter-active {
    animation: custom-slide-in-top 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.fill-dropdown-leave-active {
    animation: custom-slide-in-top 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

.base-dropdown {
    &__button {
        &--active,
        &:hover {
            @apply text-blue-900;
        }
    }

    &__list {
        box-shadow: 0 10px 25px rgba(22, 51, 86, 0.2);

        &-top-1 {
            top: calc(100% + 7px);
        }

        &--right {
            left: auto;
            right: 0;
        }

        &--p-0 {
            padding: 0;
        }

        &-text {
            border: none;
        }

        &-item {
            &--mb-2 {
                @apply mb-2;
            }
        }
    }
}
</style>
