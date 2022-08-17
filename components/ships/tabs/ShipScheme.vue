<template>
    <div class="ship-scheme cruise-detail-tab-content">
        <div class="wrapper">
            <h3 class="cruise-detail-tab-content__title">Схема теплохода</h3>
        </div>

        <template v-if="content && content.length > 0">
            <CruiseDeckScheme
                v-for="(item, idx) in content"
                :key="idx"
                :detail="true"
                :name="item.title"
                :cabin-types="getCabinTypes"
                :scheme="item.scheme_url"
                :scheme-full="item.scheme_url"
                :scheme-svg="item.scheme_svg_code"
                :cabins="item.cabins"
                class="cruise-deck-scheme-wrapper--ships"
            />
        </template>

        <p v-else>Схема отсутсвует.</p>
    </div>
</template>

<script>
    import CruiseDeckScheme from "@/components/cruise-detail/deck/CruiseDeckScheme";
    export default {
        name: "ShipScheme",
        components: { CruiseDeckScheme },
        props: {
            content: {
                type: null,
                required: true,
            },
            cabinTypes: {
                type: Array,
                default: null,
            },
        },
        computed: {
            getCabinTypes() {
                return this.cabinTypes ? this.cabinTypes : [];
            },
        }
    };
</script>

<style></style>
