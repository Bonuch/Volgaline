<template>
    <div class="footer-menu-item">
        <button
            v-if="item.title"
            type="button"
            class="footer-top__title"
            @click="listVisible = !listVisible"
        >
            <span>{{ item.title }}</span>

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.49607 6.01343C5.31709 5.27451 6.58167 5.34107 7.32059 6.16209L10.3132 9.48718L13.3057 6.16209C14.0447 5.34107 15.3092 5.27451 16.1303 6.01343C16.9513 6.75235 17.0178 8.01693 16.2789 8.83795L11.7998 13.8148C11.4205 14.2362 10.8801 14.4769 10.3132 14.4769C9.74619 14.4769 9.20586 14.2362 8.82658 13.8148L4.34741 8.83795C3.6085 8.01693 3.67505 6.75235 4.49607 6.01343Z"
                      fill="white" />
            </svg>
        </button>

        <ul
            v-if="item.list && item.list.length > 0"
            class="m-0 p-0"
            :class="{'footer-menu-item__list--visible': listVisible}"
        >
            <li
                v-for="(childItem) in item.list"
                :key="childItem.id"
                class="m-0 mb-1 p-0 text-sm text-blue-150"
            >
                <template v-if="childItem.url && childItem.title">
                    <a v-if="childItem.target === '_blank'" :href="childItem.url" target="_blank">
                        {{ childItem.title }}
                    </a>

                    <nuxt-link v-else :to="childItem.url">
                        {{ childItem.title }}
                    </nuxt-link>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "FooterMenuItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            listVisible: false,
        };
    },
};
</script>

<style lang="scss" scoped>
    .footer-top__title {
        pointer-events: none;
        @apply text-xl font-medium mb-6;

        svg {
            display: none;
        }
    }

    @media all and (max-width: 1100px) {
        ul {
            overflow: hidden;
            opacity: 0;
            height: 0;
            transition: all .3s var(--custom-transition);

            &.footer-menu-item__list--visible {
                opacity: 1;
                height: 100%;
            }
        }

        .footer-top__title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 0;
            pointer-events: auto;

            svg {
                display: block;
                width: 20px;
                height: 20px;
                fill: #fff;
            }
        }
    }
</style>
