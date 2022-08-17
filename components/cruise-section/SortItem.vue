<template>
    <button
        type="button"
        class="inner-cruises-sort__item flex items-center"
        :class="{ 'text-black-400': getQueryItem }"
        :title="getItemOrder"
        @click="onItemClick"
    >
        <span>
            <span v-if="item.title" class="inner-cruises-sort__item-link">{{ item.title }}</span>
        </span>

        <svg
            width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="fill-current"
            :class="{'transform rotate-180': $route.query.order === 'desc' && item.name === getQueryItem}"
        >
            <path d="M9 8L4.5 12.5H13.5L9 8Z" fill="#A6AEBA"/>
        </svg>
    </button>
</template>

<script>
    export default {
        name: "SortItem",
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        computed: {
            getItemOrder() {
                return this.$route.query && this.$route.query.order && this.$route.query.order === "desc" ? "по возрастанию" : "по убыванию";
            },
            getQueryItem() {
                return this.$route.query && this.$route.query.sort ? this.$route.query.sort : null;
            },
        },
        methods: {
            onItemClick() {
                let query = {};
                let queryOrder = "";

                if (this.$route.query && this.$route.query.order) {
                    queryOrder = this.$route.query.order === "asc" ? "desc" : "asc";
                } else {
                    queryOrder = this.item.value === "asc" ? "desc" : "asc";
                }

                const currentQuery = {
                    sort: this.item.name,
                    order: queryOrder,
                };

                if (this.$route.query && Object.keys(this.$route.query).length > 0) {
                    query = Object.assign({}, this.$route.query, currentQuery);
                } else {
                    query = currentQuery;
                }

                this.$emit("on-close-dropdown", true);
                this.$router.push({ query });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .inner-cruises-sort {
        .inner-cruises-sort__item:first-child {
            margin-right: 18px;
        }

        &__item {
            span {
                flex: 1;
                margin-right: 0.5rem;
            }

            svg {
                fill: currentColor;

                path {
                    fill: currentColor;
                }
            }

            &-link {
                display: inline-block;
                border-bottom: 1px dashed;
                transition: all .3s var(--custom-transition);

                &:hover,
                &:focus {
                    border-bottom-color: transparent;
                }
            }
        }
    }
</style>
