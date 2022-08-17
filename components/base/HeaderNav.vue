<template>
    <nav
        v-show="getMainNav && getMainNav.length > 0"
        class="header-navigation"
    >
        <ul class="header-navigation__list flex items-center h-full m-0">
            <li
                v-for="(navItem) in getMainNav"
                :key="navItem.id"
                class="header-navigation__item h-full"
                :class="{ 'hovered': isHovered(navItem.id) }"
                @mouseenter="handleMouseenter(navItem.id)"
                @mouseleave="handleMouseLeave"
            >
                <nuxt-link
                    v-if="navItem.title && navItem.url"
                    :to="navItem.url"
                    custom
                    v-slot="{ href, isActive, isExactActive }"
                >
                    <a
                        :href="href"
                        class="flex items-center w-full h-full"
                        :class="[isActive && 'nuxt-link-active', isExactActive && 'nuxt-link-exact-active']"
                        :title="navItem.title"
                        @click.prevent="handleLinkClick(navItem.url)"
                    >
                        <span class="text-base text-black-500 font-normal 2xl:text-sm">
                            {{ navItem.title }}
                        </span>

                        <svg
                            v-if="hasSublist(navItem)"
                            width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="header-navigation-icon w-3 h-3 ml-3"
                        >
                            <path
                                class="fill-current"
                                fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.831044 0.270595C1.24155 -0.0988636 1.87384 -0.0655856 2.2433 0.344924L5.08751 3.50515L7.93172 0.344925C8.30118 -0.0655855 8.93347 -0.0988635 9.34397 0.270595C9.75449 0.640054 9.78776 1.27234 9.4183 1.68285L5.8308 5.66896C5.64116 5.87968 5.371 6 5.08751 6C4.80402 6 4.53386 5.87968 4.34422 5.66896L0.756715 1.68285C0.387255 1.27234 0.420534 0.640054 0.831044 0.270595Z"
                            />
                        </svg>
                    </a>
                </nuxt-link>

                <HeaderNavSublist
                    v-if="hasSublist(navItem)"
                    :list="navItem.list"
                    @on-link-click="handleLinkClick"
                />
            </li>
        </ul>
    </nav>
</template>

<script>
    import {mapGetters} from "vuex";
    import HeaderNavSublist from "./HeaderNavSublist";

    export default {
        name: "HeaderNav",
        components: {HeaderNavSublist},
        data() {
            return {
                hoveredItemId: null,
            }
        },
        computed: {
            ...mapGetters(["getMainNav"]),
        },
        methods: {
            handleLinkClick(url) {
                this.closeMenu();
                this.$router.push(url);
            },
            handleMouseenter(id) {
                this.hoveredItemId = id;
            },
            handleMouseLeave() {
                this.closeMenu();
            },
            closeMenu() {
                this.hoveredItemId = null;
            },
            isHovered(id) {
                return id === this.hoveredItemId;
            },
            hasSublist(navItem) {
                return navItem.list && navItem.list.length > 0;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @keyframes slide-in-top {
        0% {
            transform: translateY(-20px);
            visibility: hidden;
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            visibility: visible;
            opacity: 1;
        }
    }

    .header-navigation {
        a,
        &::v-deep a {
            &:hover,
            &:focus {
                @apply text-red-500;
            }
        }

        .nuxt-link-exact-active,
        &::v-deep .nuxt-link-exact-active {
            pointer-events: none;
            @apply text-red-500;

            & > span {
                color: inherit;
            }

            .link-inline {
                color: inherit;
                @apply border-0;
            }
        }

        &__item {
            margin: 0 35px 0 0;

            & > a {
                padding: 0 7px;
            }

            &.hovered {
                & > ul {
                    animation: slide-in-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    /*visibility: visible;*/
                    /*opacity: 1;*/
                }
            }

            &:last-of-type {
                margin-right: -10px;
            }
        }
    }

    @media all and (max-width: 1800px) {
        .header-navigation {
            &__item {
                margin-right: 20px;

                &:last-of-type {
                    margin-right: -10px;
                }
            }
        }
    }

    @media all and (max-width: 1350px) {
        .header-navigation {
            &__item {
                margin-right: 7px;

                &:last-of-type {
                    margin-right: -10px;
                }
            }
        }
    }

    @screen extra {
        .header-navigation {
            &__item {
                margin: 0 25px 0 0;
            }
        }
    }

    @screen xxl {
        .header-navigation {
            &__item {
                margin: 0 10px 0 0;
            }
        }
    }

</style>
