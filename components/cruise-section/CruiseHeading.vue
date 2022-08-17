<template>
    <div
        class="cruise-heading flex items-center"
    >
        <div
            class="relative z-3 flex items-center mr-auto"
            v-click-outside="onClickOutsideDropdown"
        >
            <span class="mr-7 sm:hidden">Сортировать</span>
            <img
                src="~assets/images/icons/sort-icon.png"
                alt="Сортировка"
                width="24"
                height="24"
                class="hidden mr-6 sm:block mob:w-4 mob:h-4 mob:mr-4"
            >

            <button
                type="button"
                class="cruise-heading-sort-item border border-gray-50 rounded-sm"
                @click="showSortList = !showSortList"
            >
                <span v-if="selected && selected.title" class="mr-4">
                    {{ selected.title }}
                </span>

                <svg
                    width="18" height="19" viewBox="0 0 18 19" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ 'rotate-180': selected && selected.value === 'asc' }"
                >
                    <path class="fill-current" d="M9 8L4.5 12.5H13.5L9 8Z" fill="#A6AEBA"/>
                </svg>
            </button>

            <button
                v-show="hasQuery"
                type="button"
                class="button bg-transparent p-0 m-0 ml-5 text-gray-300 hover:bg-transparent hover:text-black-400 focus:bg-transparent focus:text-black-400"
                title="очистить"
                @click="$router.push({ query: null })"
            >
                <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.001 512.001"
                    class="fill-current"
                >
                    <path
                        d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                        L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                        c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                        l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                        L284.286,256.002z"
                    />
                </svg>
            </button>

            <transition name="sort-list-anim">
                <div
                    v-show="showSortList && sortList.length > 0"
                    class="cruise-heading-sort-list w-full absolute top-full right-0 bg-white shadow rounded-sm"
                >
                    <button
                        v-for="(sort, sortIdx) in sortList"
                        :key="sortIdx"
                        type="button"
                        class="cruise-heading-sort-item w-full p-2 border-b border-gray-50 last:border-0"
                        :class="{ 'cruise-heading-sort-item--active': sort.title === selected.title && sort.value === selected.value }"
                        @click="handleSelectSortItem(sort)"
                    >
                        <span v-if="sort.title" class="inner-cruises-sort__item-link mr-auto text-base sm:text-sm mob:text-xs">
                            {{ sort.title }}
                        </span>

                        <svg
                            width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"
                            :class="{ 'rotate-180': sort.value === 'asc' }"
                        >
                            <path d="M9 8L4.5 12.5H13.5L9 8Z" fill="#A6AEBA"/>
                        </svg>
                    </button>
                </div>
            </transition>
        </div>

        <div class="flex items-center lg:hidden">
            <HeadingControl
                v-for="(controlItem, controlIdx) in viewControls"
                :key="controlIdx"
                :item="controlItem"
            />
        </div>
    </div>
</template>

<script>
    import { sfmPrepearFormData, sfmQueryHasProp } from '../../helpers/search';
    import SortItem from "./SortItem";
    import HeadingControl from "./HeadingControl";

    export default {
        name: "CruiseHeading",
        components: { HeadingControl, SortItem },
        props: {
            sortList: {
                type: Array,
                required: true,
            },
            viewControls: {
                type: Array,
                required: true,
            },
            selectedSort: {
                type: null,
            },
        },
        data() {
            return {
                showSortList: false,
                selected: null,
            };
        },
        computed: {
            hasQuery() {
                return this.$route.query && Object.keys(this.$route.query).length > 0;
            },
        },
        methods: {
            onClickOutsideDropdown() {
                this.showSortList = false;
            },
            setSelectedOnInit() {
                const query = this.$route.query;
                const params = sfmPrepearFormData(query, this.$dayjs);

                if (this.hasQuery && sfmQueryHasProp(params, ['sort', 'order'])) {
                    this.selected = this.findSelected(query.sort, query.order);
                    return;
                } else if (this.selectedSort) {
                    this.selected = this.selectedSort;
                    return;
                }

                this.selected = this.findSelected('price', 'asc');
            },
            handleSelectSortItem(item) {
                this.selected = item;
                this.pushQuery(item);
                this.showSortList = false;
            },
            findSelected(name, val) {
                const filtered = this.sortList.filter(sort => sort.name === name && sort.value === val);
                return filtered.length > 0 ? filtered[0] : null;
            },
            pushQuery(item) {
                let query = {};
                const currentQuery = {
                    sort: item.name,
                    order: item.value,
                };

                if (this.$route.query && Object.keys(this.$route.query).length > 0) {
                    query = Object.assign({}, this.$route.query, currentQuery);
                } else {
                    query = currentQuery;
                }

                this.$router.push({ query });
            },
        },
        created() {
            this.setSelectedOnInit();
        },
    };
</script>

<style lang="scss" scoped>
    .sort-list-anim-enter-active {
        animation: custom-slide-in-top 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    .sort-list-anim-leave-active {
        animation: custom-slide-in-top 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }

    .cruise-heading-sort {
        &-item {
            @apply flex items-center py-3 pl-5 pr-4 text-base leading-none text-black-400 sm:px-4 sm:text-sm mob:text-xs;

            &--active,
            &:hover,
            &:focus {
                transition: all .25s ease;
                @apply bg-blue-300 text-white;
            }

            svg {
                fill: currentColor;
            }
        }
    }
</style>
