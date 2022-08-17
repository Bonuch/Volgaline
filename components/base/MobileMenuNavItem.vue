<template>
    <li class="mobile-menu-nav-item m-0 text-base uppercase border-b border-gray-250 last:border-0">
        <template v-if="item.list && item.list.length > 0">
            <p class="px-4 py-5 m-0 flex items-center justify-between" :class="{'bg-gray-50': sublistActive}">
                <template v-if="item.url">
                    <template v-if="item.target === '_blank'">
                        <a
                            class="flex-1 text-black-400 hover:text-blue-400"
                            :class="{'order-2 ml-5': sublistActive}"
                            :href="item.url"
                            target="_blank"
                        >
                            <span v-if="item.title">{{ item.title }}</span>
                        </a>
                    </template>

                    <template v-else>
                        <nuxt-link
                            class="flex-1 text-black-400 hover:text-blue-400"
                            :class="{'order-2 ml-5': sublistActive}"
                            :to="item.url"
                            @click.native="onLinkClick"
                        >
                            <span v-if="item.title">{{ item.title }}</span>
                        </nuxt-link>
                    </template>
                </template>

                <span
                    v-else
                    class="flex-1 text-black-400 hover:text-blue-400"
                    :class="{'order-2 ml-5': sublistActive}"
                    @click="sublistActive = !sublistActive"
                >
                    {{ item.title }}
                </span>

                <button
                    type="button"
                    class="w-10 h-6 text-gray-300"
                    :class="{'transform rotate-180': sublistActive}"
                    @click="sublistActive = !sublistActive"
                >
                    <svg
                        class="w-full h-full fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd" clip-rule="evenodd"
                            d="M6.51343 3.66209C7.25235 2.84107 8.51693 2.77451 9.33795 3.51343L17.3102 10.6884C17.7316 11.0677 17.9722 11.608 17.9722 12.175C17.9722 12.742 17.7316 13.2823 17.3102 13.6616L9.33795 20.8366C8.51693 21.5755 7.25235 21.509 6.51343 20.6879C5.77451 19.8669 5.84107 18.6023 6.66209 17.8634L12.9825 12.175L6.66209 6.48661C5.84107 5.74769 5.77451 4.48311 6.51343 3.66209Z"
                            fill="#5A6472"
                        />
                    </svg>
                </button>
            </p>

            <transition name="mobile-menu-sublist">
                <ul v-if="sublistActive" class="m-0 p-0">
                    <MobileMenuNavItem
                        v-for="subItem in item.list"
                        :key="subItem.id"
                        :item="subItem"
                        class="mobile-menu-nav-item--sub"
                        :class="{'border-t border-gray-250': sublistActive}"
                    />
                </ul>
            </transition>
        </template>

        <template v-else-if="item.url">
            <template v-if="item.target === '_blank'">
                <a
                    class="block px-4 py-5 text-black-400 hover:text-blue-400"
                    :href="item.url"
                    target="_blank"
                >
                    <span v-if="item.title">{{ item.title }}</span>
                </a>
            </template>

            <template v-else>
                <nuxt-link
                    class="block px-4 py-5 text-black-400 hover:text-blue-400 flex flex-wrap gap-x-4"
                    :to="item.url"
                    @click.native="onLinkClick"
                >
                    <span v-if="item.title">{{ item.title }}</span>
                    <span v-if="isNewRK2023(item.title)" class="text-green-500">NEW</span>
                </nuxt-link>
            </template>
        </template>
    </li>
</template>

<script>
import { mapActions } from "vuex";
import { isNewRK2023 } from '@/helpers/text';

export default {
    name: "MobileMenuNavItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            sublistActive: false,
        };
    },
    methods: {
        ...mapActions(["closeMobileMenu"]),
        isNewRK2023,
        onLinkClick() {
            this.closeMobileMenu();
            this.$router.push(this.item.url);
        },
    },
};
</script>

<style lang="scss" scoped>
@keyframes slide-in-top {
    0% {
        transform: translateY(-10px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.mobile-menu-sublist-enter-active {
    animation: slide-in-top 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.mobile-menu-sublist-leave-active {
    animation: slide-in-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

.mobile-menu-nav-item {
    &--sub {
        @apply normal-case text-lg font-medium;

        & > p {
            font-weight: 700;
        }
    }


    a.nuxt-link-exact-active {
        span {
            @apply text-orange-400;
        }
    }
}
</style>
