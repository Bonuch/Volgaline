<template>
    <nav
        v-if="getQuickCruiseSearchNav && getQuickCruiseSearchNav.length > 0"
        class="quick-cruise-search"
    >
        <ul class="quick-cruise-search-wrap flex flex-wrap items-center justify-between xl:justify-around md:justify-start m-0 md:py-5 md:flex-nowrap md:overflow-x-auto md:items-baseline">
            <li
                v-for="(navItem) in getQuickCruiseSearchNav"
                :key="navItem.id"
                class="quick-cruise-search-item xs:w-full"
            >
                <nuxt-link
                    v-if="navItem.title && navItem.url"
                    :to="navItem.url"
                    class="quick-cruise-search-link py-3.5 border border-gray-90 rounded flex items-center justify-center custom-transition"
                    :title="navItem.title"
                >
                    <span class="text-base font-medium extra:text-sm">
                        {{ navItem.title }}
                    </span>
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "MenuQuickCruiseSearch",
    computed: {
        ...mapGetters(["getQuickCruiseSearchNav"]),
    },
}
</script>

<style lang="scss" scoped>
    .quick-cruise-search {
        &-link {
            min-width: 210px;
            box-shadow: 0 4px 35px rgba(36, 58, 101, 0.1);

            &:hover,
            &:focus,
            &:active {
                @apply text-red-500 border-red-500;
            }
        }
    }
    @screen md {
        .quick-cruise-search {
            &-wrap {
                & li {
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            &-link {
                min-width: 177px;
            }
        }
        ::-webkit-scrollbar {
            width: 0;  /* remove scrollbar space */
            background: transparent;  /* optional: just make scrollbar invisible */
        }
}
</style>
