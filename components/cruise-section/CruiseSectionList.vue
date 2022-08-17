<template>
    <div class="cruise-section-list inner-cruises">
        <div class="wrapper wrapper-1410">
            <CruiseHeading
                :sort-list="sortList"
                :view-controls="viewControls"
                class="mb-14 xl:mb-10 sm:mb-6"
            />

            <template v-if="!isMobileScreen">
                <template v-if="getInnerCruisesOrientation === 'list'">
                    <CruiseListItem
                        v-for="(cruiseItem) in cruises"
                        :key="`cruise-list-${cruiseItem.id}`"
                        :item="cruiseItem"
                        class="mb-10 last:mb-0"
                    />
                </template>

                <template v-else-if="getInnerCruisesOrientation === 'grid'">
                    <div class="inner-cruises-grid-list flex flex-wrap overflow-hidden">
                        <CruiseGridItem
                            v-for="(cruiseItem) in cruises"
                            :key="`cruise-grid-${cruiseItem.id}`"
                            :item="cruiseItem"
                            class="inner-cruises-grid-list__item"
                        />
                    </div>
                </template>

                <template v-else-if="getInnerCruisesOrientation === 'line'">
                    <div class="cruise-line-table">
                        <div class="cruise-line-table__row cruise-line-table__heading">
                            <div
                                class="cruise-line-table__item text-gray-300 text-sm"
                                v-for="(headingItem, headingIdx) in headings"
                                :key="headingIdx"
                            >
                                {{ headingItem }}
                            </div>
                        </div>

                        <div class="cruise-line-table__body">
                            <CruiseLineItem
                                v-for="(cruiseItem) in cruises"
                                :key="`cruise-line-${cruiseItem.id}`"
                                :item="cruiseItem"
                            />
                        </div>
                    </div>
                </template>
            </template>

            <template v-else>
                <div class="inner-cruises-grid-list flex flex-wrap overflow-hidden">
                    <CruiseGridItem
                        v-for="cruiseItem in cruises"
                        :key="`cruise-grid-${cruiseItem.id}`"
                        :item="cruiseItem"
                        class="inner-cruises-grid-list__item"
                    />
                </div>
            </template>

            <template v-if='showPaginationButton'>
                <div v-if="showMoreVisible" :class="{'mt-10': getInnerCruisesOrientation !== 'grid'}">
                    <button
                        type="button"
                        class="button button-transparent button-show-more"
                        @click="onShowMoreClick"
                    >
                        Показать еще
                    </button>
                </div>

                <NuxtLink
                    v-else-if="!showMoreVisible && sectionLink"
                    :to="sectionLink"
                    class="button button-transparent button-show-more text-center"
                    :class="{ 'mt-10': getInnerCruisesOrientation === 'line' && !isMobileScreen }"
                >
                    Перейти к полному списку
                </NuxtLink>
            </template>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import CruiseHeading from "./CruiseHeading";
    import CruiseListItem from "./CruiseListItem";
    import CruiseGridItem from "./CruiseGridItem";
    import CruiseLineItem from "./CruiseLineItem";

    export default {
        name: "CruiseSectionList",
        components: { CruiseLineItem, CruiseGridItem, CruiseListItem, CruiseHeading },
        props: {
            showPaginationButton: {
                type: Boolean,
                default: true,
            },
            cruises: {
                type: Array,
                required: true,
            },
            sortList: {
                type: Array,
                default() {
                    return [
                        {
                            name: "departure_date_from",
                            title: "Дате начала",
                            value: "asc",
                        },
                        {
                            name: "price",
                            title: "Стоимости",
                            value: "asc",
                        },
                        {
                            name: "duration",
                            title: "Продолжительности",
                            value: "asc",
                        },
                    ];
                }
            },
            viewControls: {
                type: Array,
                default() {
                    return [
                        {
                            name: "grid",
                            icon: "GridIcon",
                        },
                        {
                            name: "list",
                            icon: "ListIcon",
                        },
                        {
                            name: "line",
                            icon: "LineIcon",
                        },
                    ];
                }
            },
            headings: {
                type: Array,
                default() {
                    return [
                        "Начало",
                        "Окончание",
                        "Дней",
                        "Название Круиза",
                        "Маршрут",
                        "Теплоход",
                        "Кают",
                        "Цена от",
                        "",
                    ];
                }
            },
            showMoreVisible: {
                type: Boolean,
                default: true,
            },
            sectionLink: {
                type: String,
            }
        },
        computed: {
            ...mapGetters({
                getInnerCruisesOrientation: "getInnerCruisesOrientation",
                getWindowWidth: "getWindowWidth",
            }),
            isMobileScreen() {
                return this.getWindowWidth < 1025;
            },
        },
        methods: {
            onShowMoreClick() {
                this.$emit("on-show-more-click", true);

            },
        },
    };
</script>

<style lang="scss" scoped>
    .inner-cruises-grid-list {
        position: relative;
        width: calc(100% + 30px);
        left: -15px;

        &__item {
            width: calc(33.3333% - 30px);
            margin: 0 15px 50px;
        }
    }

    @media all and (min-width: 769px) {
        .inner-cruises-sort {
            &__button {
                pointer-events: none;
            }
        }
    }

    @media all and (max-width: 1440px) {
        .inner-cruises-grid-list {
            &__item {
                width: calc(50% - 30px);
            }
        }
    }

    @screen lg {
        .inner-cruises-grid-list {
            width: calc(100% + 20px);
            left: -10px;
            margin-bottom: 24px;

            &__item {
                width: calc(50% - 20px);
                margin: 0 10px 30px;
            }
        }
    }

    @screen md {
        .inner-cruises-grid-list {
            width: 100%;
            left: 0;

            &__item {
                width: 100%;
                margin: 0 0 30px;
            }
        }
    }
</style>
