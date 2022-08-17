<template>
    <div class="base-dropdown relative z-4" v-click-outside="onCloseDropdown">
        <button
            type="button"
            class="button flex items-center p-2 text-red-400 bg-white font-medium border border-transparent"
            :class="{'base-dropdown__button--active': showDropdown}"
            @click="onDropdownButtonClick"
        >
            <span class="text-lg mr-2 mob:text-base">Заполнить из</span>

            <svg
                width="18" height="19" viewBox="0 0 18 19" fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="fill-current"
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                    fill="#5A6472"
                />
            </svg>
        </button>

        <transition name="fill-dropdown">
            <div
                v-if="showDropdown"
                :class="[
                        'base-dropdown__list absolute left-0 top-full w-80 py-10 px-5 bg-white text-black-400 rounded-sm mob:w-full mob:p-4',
                         listClasses
                    ]"
            >
                <div
                    v-for="(dropItem, dropIdx) in dropDown"
                    :key="dropIdx"
                    class="mb-4 last:mb-0"
                >
                    <button
                        type="button"
                        class="inline-block max-w-full text-lg font-medium border-b border-dashed truncate sm:text-base mob:text-sm"
                        @click="onSelectItem(dropItem)"
                    >
                        {{ dropItem.short }}
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "BaseDropdownWithSelect",
    props: {
        dropDown: {
            type: Array,
            required: true,
        },
        listClasses: {
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
            this.showDropdown = true;
        },
        onCloseDropdown() {
            this.showDropdown = false;
        },
        onSelectItem(item) {
            this.$emit("on-select-item", item);
            this.onCloseDropdown();
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
            @apply border-gray-50 bg-gray-50 text-gray-300;
        }
    }

    &__list {
        box-shadow: 0 10px 25px rgba(22, 51, 86, 0.2);

        &--right {
            left: auto;
            right: 0;
        }
    }
}
</style>
