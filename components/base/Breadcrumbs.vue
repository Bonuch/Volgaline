<template>
    <nav class="breadcrumbs">
        <ul
            class="breadcrumbs__list m-0 p-0 flex items-center text-lg tablet:hidden"
            itemscope itemtype="https://schema.org/BreadcrumbList"
        >
            <li
                v-for="(item, idx) in breadcrumbs"
                :key="idx"
                class="breadcrumbs__item m-0 p-0"
                itemprop="itemListElement" itemscope
                itemtype="https://schema.org/ListItem"
            >
                <nuxt-link
                    v-if="item.link"
                    :to="item.link"
                    class="breadcrumbs__link flex items-center"
                    itemprop="item"
                >
                    <span
                        v-if="item.title"
                        class="link-inline"
                        :class="{ 'text-white': white }"
                        itemprop="name"
                    >
                        {{ getTitle(item.title) }}
                    </span>
                    <span class="mx-1 text-base" :class="{ 'text-white': white, 'text-gray-260': !white }">/</span>
                    <meta itemprop="position" :content="idx + 1" />
                </nuxt-link>

                <template v-else>
                    <span
                        class="breadcrumbs__text"
                        :class="{ 'text-gray-250': white, 'text-gray-260': !white }"
                        itemprop="name"
                    >
                        {{ getTitle(item.title) }}
                    </span>

                    <meta itemprop="position" :content="idx + 1" />
                </template>
            </li>
        </ul>

        <LinkBack class="hidden tablet:block" />
    </nav>
</template>

<script>
    import LinkBack from "./LinkBack";
    export default {
        name: "Breadcrumbs",
        components: { LinkBack },
        props: {
            breadcrumbs: {
                type: Array,
                required: true,
            },
            white: Boolean,
        },
        jsonld() {
            const items = this.breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@id': item.link,
                    name: item.title,
                },
            }));
            return {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items,
            };
        },
        computed: {
            getTitle() {
                return (title) => title.length > 60 ? title.slice(0, 56) + '...' : title;
            },
        },
    };
</script>

<style></style>
