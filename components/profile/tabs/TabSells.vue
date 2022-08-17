<template>
    <div class="tab-sells profile-tabs-content">
        <div class="flex flex-wrap justify-between md:block">
<!--            <template v-if="content && content.length > 0">-->
<!--                <BarChart-->
<!--                    v-for="(item, idx) in content"-->
<!--                    :key="idx"-->
<!--                    :chart-data="item"-->
<!--                    :chartoptions="barChartOptions"-->
<!--                    :styles="chartStyles"-->
<!--                    class="md:mb-15 md:mx-auto md:last:mb-0"-->
<!--                />-->
<!--            </template>-->
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "TabSells",
    components: {
        // BarChart: () => import('../BarChart.vue'),
    },
    props: {
        content: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            barChartOptions: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                },
                responsive: true,
                maintainAspectRatio: true,
            },
        };
    },
    computed: {
        ...mapGetters([
            "getWindowWidth",
        ]),
        chartStyles() {
            const width = this.getWindowWidth > 768 ? "40%" : "90%";

            return {
                position: "relative",
                width,
            };
        },
    },
};
</script>

<style></style>
