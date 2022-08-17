<template>
    <div class="tab-history custom-table profile-tabs-content">
        <div class="custom-table__row custom-table__heading">
            <div
                class="custom-table__col "
                v-for="(headingItem, headingIdx) in headings"
                :key="headingIdx"
            >
                {{ headingItem }}
            </div>
        </div>

        <div class="custom-table__body mb-8">
            <HistoryTableRow
                v-for="(cruiseItem, cruiseIdx) in fsrContent"
                :key="cruiseIdx"
                :item="cruiseItem"
                @update-list-orders="fetch()"
            />
        </div>

        <button
            v-if="fsrShowMoreVisibility"
            type="button"
            class="button button-transparent button-show-more"
            @click="fsrOnSearchMoreClick('/profile/orders')"
        >
            Показать еще
        </button>
    </div>
</template>

<script>
import HistoryTableRow from "../HistoryTableRow";
import {fetchSearchResult} from '~/mixins/content-helpers';

export default {
    name: "TabHistory",
    components: { HistoryTableRow },
    mixins: [fetchSearchResult],
    props: {
        content: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            headings: [
                "ID",
                "Дата заказа",
                "Теплоход",
                "Название Круиза",
                "Дата начала и окончания",
                "Маршрут",
                "ФИО заказчика",
                "Цена от",
                "",
            ],
        };
    },
    methods: {
        async fetch() {
            try {
                const { data } = await this.$axios.get("/profile/orders");
                this.fsrContent = data.data;
                this.fsrContentMeta = data.meta;
            } catch (ex) {
                console.log('cant fetch orders: ' + ex);
            }
        }
    },
    async created() {
        await this.fetch();
    }
};
</script>

<style lang="scss" scoped>
.custom-table {
    &::v-deep {
        .custom-table__col {
            text-align: left;

            &:nth-child(1) {
                width: 110px;
            }

            &:nth-child(2) {
                width: 130px;
            }

            &:nth-child(3) {
                width: 180px;
            }

            &:nth-child(4) {
                width: 300px;
            }

            &:nth-child(5) {
                width: 180px;
            }

            &:nth-child(6) {
                width: 500px;
            }

            &:nth-child(7) {
                width: 200px;
            }

            &:nth-child(8) {
                width: 140px;
            }

        }
    }
}
</style>
