<template>
    <div
        class="search relative z-20 w-full"
        :class="{'search--expanded': isExpanded}"
    >
        <SearchSmall
            v-if="!isExpanded"
            :class="{ 'search-form--bordered': bordered }"
            @on-submit="handleSubmit"
            v-model="clearSearchParams"
            :routeHasSearchParams="routeHasSearchParams"
            @openFullSearch="toggleExpand"
            @clearSearch="onClearClick"
        />

        <SearchBig
            v-else
            :class="{ 'search-form--bordered': bordered }"
            :show-expand-button="showExpandButton"
            @on-submit="handleSubmit"
            v-model="clearSearchParams"
            :routeHasSearchParams="routeHasSearchParams"
            @hideSearch="toggleExpand"
            @clearSearch="onClearClick"
        />

        <div class="mt-1"><sup>*</sup>Актуальную стоимость и наличие мест просим уточнять у менеджеров компании</div>

        <div class="search-actions absolute xl:hidden w-full flex items-center justify-end text-base xl:justify-center mob:text-xs"
             :class="{'hidden': isExpanded}">
            <button
                v-if="routeHasSearchParams"
                type="button" class="flex items-center mr-4 text-white"
                @click="onClearClick"
            >
                <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.001 512.001"
                    class="mr-1 fill-current"
                >
                    <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                    L284.286,256.002z"></path>
                </svg>

                <span class="link-inline">Очистить поиск</span>
            </button>

            <button
                type="button"
                class="search-expand-btn"
                @click="toggleExpand"
            >
                    <span>Расширенный поиск</span>
            </button>
        </div>
    </div>
</template>

<script>
    import SearchSmall from "./SearchSmall";
    import SearchBig from "./SearchBig";
    import { sfmQueryHasProp, sfmQueryNames } from '@/helpers/search';

    export default {
        name: "SearchComponent",
        components: {
            SearchSmall,
            SearchBig,
        },
        props: {
            expanded: {
                type: Boolean,
            },
            showExpandButton: {
                type: Boolean,
                default: true,
            },
            bordered: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isExpanded: this.expanded,
                clearSearchParams: false,
            };
        },
        methods: {
            onClearClick() {
                let query = JSON.parse(JSON.stringify(this.$route.query));
                this.clearSearchParams = true;

                for (let i = 0; i < sfmQueryNames.length; i++) {
                    if (query.hasOwnProperty(sfmQueryNames[i])) {
                        delete query[sfmQueryNames[i]];
                    }
                }

                this.$router.push({ query });
            },
            toggleExpand() {
                this.isExpanded = !this.isExpanded;
            },
            handleSubmit(formData) {
                this.$emit('on-submit', formData);
            },
        },
        computed: {
            routeHasSearchParams() {
                const query = this.$route.query;
                return query && Object.keys(query).length > 0 && sfmQueryHasProp(query);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .search {
        max-width: 1410px;
        width: 100%;

        &--absolute {
            position: absolute;
            z-index: 2;
            left: 50%;
            bottom: 108px;
            transform: translateX(-50%);
        }

        &.search--expanded {
            &.search--absolute {
                bottom: 27px;
            }
        }

        &-actions {
            right: 0px;
            top: 100px;

            .search-expand-btn {
                width: 194px;
                @apply text-red-500 text-sm font-normal button bg-white;
            }
        }
    }

    @screen xl {
        .search {
            max-width: calc(884px + 60px);

            &-actions {
                right: 50%;
                transform: translateX(50%);
            }
        }
    }
</style>
