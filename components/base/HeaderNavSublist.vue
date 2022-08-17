<template>
    <ul
        class="header-navigation-sublist z-1 flex flex-wrap m-0 p-0"
    >
        <li
            v-for="(child) in list"
            :key="child.id"
            class="header-navigation-sublist__item m-0"
        >
            <div v-if="child.title" class="text-22 font-bold text-black-400 m-0 mb-2">
                <template v-if="child.url">
                    <template v-if="child.target === '_blank'">
                        <a :href="child.url" :title="child.title" target="_blank">{{ child.title }}</a>
                    </template>
                    <template v-else>
                        <nuxt-link
                            :to="child.url"
                            custom
                            v-slot="{ href, isActive, isExactActive }"
                        >
                            <a
                                :href="href"
                                :class="[isActive && 'nuxt-link-active', isExactActive && 'nuxt-link-exact-active']"
                                class='flex flex-wrap gap-x-4'
                                :title="child.title"
                                @click.prevent="handleLinkClick(child.url)"
                            >
                                {{ child.title }}
                                <span v-if="isNewRK2023(child.title)" class="text-green-500">NEW</span>
                            </a>
                        </nuxt-link>
                        <span class='tag-new hidden text-green-900 text-xs'>new</span>
                    </template>
                </template>
                <span v-else>{{ child.title }}</span>
            </div>

            <template v-if="child.list && child.list.length > 0">
                <p
                    v-for="(childItem) in getList(child.list)"
                    :key="childItem.id"
                    class="m-0 mb-2"
                >
                    <template v-if="childItem.target === '_blank'">
                        <a v-if="childItem.title && childItem.url" :href="childItem.url" :title="childItem.title" target="_blank">
                                <span
                                    class="header-navigation-sublist-text text-black-400 text-lg font-medium hover:text-red-500 custom-transition"
                                >
                                    {{ childItem.title }}
                                </span>
                        </a>
                    </template>

                    <template v-else>
                        <nuxt-link
                            v-if="childItem.title && childItem.url"
                            :to="childItem.url"
                            custom
                            v-slot="{ href, isActive, isExactActive }"
                        >
                            <a
                                :href="href"
                                :class="[isActive && 'nuxt-link-active', isExactActive && 'nuxt-link-exact-active']"
                                :title="childItem.title"
                                @click.prevent="handleLinkClick(childItem.url)"
                            >
                                <span
                                    class="header-navigation-sublist-text text-black-400 text-lg font-medium hover:text-red-500 custom-transition"
                                >
                                    {{ childItem.title }}
                                </span>
                            </a>
                        </nuxt-link>
                    </template>
                </p>
            </template>

            <p v-if="manyListItems(child.list)" class="m-0 mt-4">
                <a :href="child.url" class="link-inline text-red-400 border-blue-300">
                    Смотреть всё
                </a>
            </p>
        </li>
    </ul>
</template>

<script>
    import { isNewRK2023 } from '@/helpers/text';

    const listLength = 11;

    export default {
        name: "HeaderNavSublist",
        props: {
            list: {
                type: Array,
                required: true,
            },
        },
        computed: {
            manyListItems() {
                return (list) => list && list.length > listLength;
            },
            getList() {
                return (list) => this.manyListItems(list) ? list.slice(0, listLength) : list;
            },
        },
        methods: {
            isNewRK2023,
            handleLinkClick(url) {
                this.$emit("on-link-click", url);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .header-navigation-sublist {
        position: absolute;
        width: 100%;
        left: 0;
        top: var(--header-height);
        background-color: #fff;
        box-shadow: var(--modal-box-shadow);
        border-radius: 4px;
        opacity: 0;
        visibility: hidden;

        &__item {
            width: calc(33.3333% - var(--sublist-margin));
            margin-right: var(--sublist-margin);
            padding-right: 10px;
            text-align: left;
            position: relative;

            &:nth-child(1) {
                @apply pl-10 pt-10 pb-11 2xl:pt-8;
            }

            &:nth-child(2) {
                @apply pr-10 pt-10 pb-11 2xl:pt-8;
            }

            &:nth-child(3) {
                @apply pr-10 pt-10 pb-11 2xl:pt-8;
                margin-right: 0;

                &:after {
                    width: 0;
                }
            }

            &:nth-child(4) {
                @apply pl-10 pt-1 2xl:pt-1 absolute whitespace-nowrap;
                & h4 {
                    @apply flex items-start gap-1;
                    .tag-new {
                        @apply block;
                    }
                }
            }

            &:after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;
                width: 1px;
                background-color: #E1E1E1;
            }

            &:last-of-type {
                margin-right: 0;

                &:after {
                    width: 0;
                }
            }
        }
    }

    @media all and (max-width: 1440px) {
        .header-navigation-sublist {
            h4 {
                min-height: 53px;
            }
        }
    }
</style>
