<template>
    <div class="ship-cruises cruise-detail-tab-content">
        <div class="wrapper wrapper-1410">
            <h3 class="cruise-detail-tab-content__title">{{ this.title }}</h3>
        </div>

        <template v-if="loading">
            <div class="ship-cruises__preloader flex items-center justify-center">
                <Preloader />
            </div>
        </template>

        <template v-else>
            <CruiseSectionList
                v-if="content && content.length > 0"
                :cruises="content"
                :sort-list="sortList"
                :view-controls="viewControls"
                :headings="headings"
                :show-more-visible="false"
                :section-link="sectionLink"
            />

            <div v-else class="wrapper">
                <p>Круизов на данном теплоходе пока нет.</p>
            </div>
        </template>
    </div>
</template>

<script>
    import PersonCard from "@/components/ships/PersonCard";
    import CruiseSectionList from "@/components/cruise-section/CruiseSectionList";
    import Preloader from "@/components/base/Preloader";

    export default {
        name: "ShipCruises",
        components: { Preloader, CruiseSectionList, PersonCard },
        props: {
            content: {
                type: null,
                required: true,
            },
            sectionLink: {
                type: String,
            },
            loading: {
                type: Boolean,
            },
            title: {
                type: String,
                default: 'Ближайшие круизы'
            }
        },
        data() {
            return {
                sortList: [
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
                ],
                viewControls: [
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
                ],
                headings: [
                    "Начало",
                    "Окончание",
                    "Дней",
                    "Название Круиза",
                    "Маршрут",
                    "Теплоход",
                    "Кают",
                    "Цена от",
                    "",
                ],
            };
        },
    };
</script>

<style lang="scss">
    .ship-cabins {
        &__preloader {
            width: 100%;
            min-height: 300px;
        }
    }
</style>


