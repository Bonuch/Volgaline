<template>
    <div class="cruise-detail-tab-content cruise-detail-roads">
        <div class="cruise-deck-scheme-wrapper relative">
            <div class="flex items-center">
                <h3 class="cruise-detail-tab-content__title">{{title}}</h3>
                <span
                    v-for="(promoItem, promoIdx) in getFirstPart"
                    v-show="promoItem.title === 'fire'"
                    :key="promoIdx"
                    class="ml-4 mb-5"
                >
                    <span class=""><img src="@/static/images/flame/flame.png" alt="fire"></span>
                </span>
            </div>


            <div class="cruise-detail-roads__content">
                <template v-if="content && Object.keys(content).length > 0">
                    <CruiseDetailRoad
                        v-for="(roadItem) in content"
                        :key="roadItem.id"
                        :item="roadItem"
                        :promo="promo"
                        class="mb-7 last:m-0"
                    />
                </template>

                <p v-else>Эксурсии отсутсвуют</p>
            </div>
        </div>
    </div>
</template>

<script>
    import CruiseDetailRoad from "./CruiseDetailRoad";

    export default {
        name: "CruiseDetailRoads",
        components: { CruiseDetailRoad },
        props: {
            content: {
                type: null,
            },
            title:{
                default:'Круизный маршрут по дням',
            },
            promo: {
                type: Array,
                required: true,
            },
        },
        computed: {
            getFirstPart() {
                return this.longPromo ? this.promo.slice(0, this.getSlicedNumber) : this.promo;
            },
        }
    };
</script>

<style></style>
