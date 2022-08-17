<template>
    <div class="cruise-heading relative z-2 flex flex-wrap justify-between items-center mb-6">
        <div
            class="cruise-heading__item relative flex items-center text-gray-260 text-lg font-medium 2xl:mb-5 tablet:flex-col tablet:items-start"
        >
            <span class="text-black-400 mr-5 tablet:mr-0 tablet:mb-3">
                Сортировать по
            </span>

            <template v-if="sortList && sortList.length > 0">
                <SortItem
                    v-for="(sort, sortIdx) in sortList"
                    :key="sortIdx"
                    :item="sort"
                    class="sort-item text-gray-260 text-lg font-medium"
                />
            </template>

            <template v-if="deckTypes && deckTypes.length > 0">
                <client-only>
                    <v-select
                        id="deck-type"
                        class="custom-select custom-select--unsearchable custom-select-ships sort-item"
                        label="name"
                        :searchable="false"
                        :reduce="item => item.value"
                        :options="deckTypes"
                        @input="onSelectDeck"
                        v-model="deckCount"
                    >
                        <template #search="{ attributes, events }">
                            <label
                                for="deck-type"
                                :class="{'hidden': deckCount}"
                            >
                                Количество палуб
                            </label>

                            <input
                                class="vs__search"
                                v-bind="attributes"
                                v-on="events"
                            >
                        </template>

                        <template #open-indicator="{ attributes }">
                           <span v-bind="attributes">
                               <svg
                                   :class="{'text-black-400': deckCount}"
                                   width="18" height="19" viewBox="0 0 18 19" fill="none"
                                   xmlns="http://www.w3.org/2000/svg"
                               >
                                   <path class="fill-current" d="M9 8L4.5 12.5H13.5L9 8Z" fill="#A6AEBA"/>
                               </svg>
                           </span>
                        </template>

                        <template v-slot:option="option">
                            <span>{{ option.name }}</span>
                        </template>
                    </v-select>
                </client-only>
            </template>

            <button
                v-if="$route.query && Object.keys($route.query).length > 0"
                type="button"
                class="sort-item custom-transition hover:text-black-400"
                @click="onClearSortClick"
            >
                <svg
                    class="fill-current"
                    width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001"
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
        </div>

        <form
            class="cruise-heading__item search custom-transition flex p-1 bg-white border border-gray-250 rounded-extra"
            :class="{'search--active': formIsActive}"
            @submit.prevent="onSearchSubmit"
        >
            <input
                type="text"
                name="ship"
                class="search-input bg-transparent"
                placeholder="Поиск теплохода"
                autocomplete="off"
                @focus="formIsActive = true"
                @blur="formIsActive = false"
                v-model="shipName"
            >

            <button type="submit" class="button button-rounded">Найти</button>
        </form>
    </div>
</template>

<script>

    import SortItem from "@/components/cruise-section/SortItem";

    export default {
        name: "ShipHeading",
        components: { SortItem },
        props: {
            sortList: {
                type: Array,
                required: true,
            },
            deckTypes: {
                type: Array,
                required: true,
            },
            isMobileScreen: {
                type: Boolean,
            },
        },
        data() {
            return {
                formIsActive: false,
                name: null,
                deckCount: null,
                shipName: null,
            };
        },
        computed: {
            getPageQuery() {
                return this.$route.query;
            },
        },
        methods: {
            onSelectDeck(value) {
                this.$router.push({
                    query: {
                        ...this.getPageQuery,
                        count_decks: value,
                    },
                });
            },
            onSearchSubmit() {
                this.$emit("on-ship-search-by-name", this.shipName);
            },
            onClearSortClick() {
                this.resetFields();

                this.$router.push({ query: null });
            },
            resetFields() {
                this.name = null;
                this.deckCount = null;
                this.shipName = null;
            }
        },
    };
</script>

<style lang="scss" scoped>
    .search {
        &--active {
            @apply border-black-400;
        }
    }

    .search-input {
        @apply px-3 text-sm text-black-400;
    }

    .search-input::placeholder {
        @apply text-sm text-gray-200;
    }

    .cruise-heading {
        align-items: center;

        &__item {
            width: calc(50% - 20px);
        }

        .sort-item {
            @apply mr-5 last:mr-0;
        }
    }

    @screen 2xl {
        .cruise-heading {
            &__item {
                width: 100%;
            }
        }
    }

    @screen tablet {
        .cruise-heading {
            .sort-item {
                margin: 0 0 8px;
                @apply last:m-0;
            }
        }
    }
</style>
