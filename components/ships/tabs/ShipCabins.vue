<template>
    <div class="ship-cabins cruise-detail-tab-content">
        <div class="wrapper">
            <h3 class="cruise-detail-tab-content__title">Каюты</h3>

            <client-only>
                <div
                    v-if="content && content.length > 0"
                    class="columns-list columns-list-2cols"
                >
                    <div
                        v-for="(item) in content"
                        :key="item.id"
                        class="columns-list__item"
                    >
                        <ShipCabin :room="item"/>
                    </div>
                </div>

                <p v-else>Каюты для теплохода не заполнены</p>
            </client-only>
        </div>
    </div>
</template>

<script>
    import ShipCabin from "@/components/ships/ShipCabin";

    export default {
        name: "ShipCabins",
        components: { ShipCabin },
        props: {
            content: {
                type: null,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .ship-cabins {
        .columns-list {
            .columns-list__item {
                &:nth-child(4n+3),
                &:nth-child(4n) {
                    .ship-cabin {
                        @apply bg-gray-50;

                        &::v-deep {
                            .readmore-height .readmore-desc.has-overflow:after {
                                background: linear-gradient(to right, rgba(234, 238, 244, 0), rgba(234, 238, 244, 1) 50%);
                            }
                        }
                    }
                }
            }
        }
    }
</style>


