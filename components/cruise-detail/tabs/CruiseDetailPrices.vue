<template>
    <div class="cruise-detail-tab-content cruise-detail-prices overflow-hidden">
        <div class="wrapper">
            <h3 class="cruise-detail-tab-content__title mb-10">Схемы и цены кают теплохода {{ shipTitle ? `«${shipTitle}»` : '' }}</h3>
        </div>

        <template v-if="decks && decks.length > 0">
            <CruiseDetailDeck
                v-for="(deckItem) in decks"
                :key="`cruise-detail-deck-${deckItem.id}`"
                :deck="deckItem"
                class="cruise-detail-prices__item sm:mb-5 last:mb-0 xs:last:mb-0"
            />
        </template>
    </div>
</template>

<script>
    import CruiseDetailDeck from "@/components/cruise-detail/deck/CruiseDetailDeck";

    export default {
        name: "CruiseDetailPrices",
        components: { CruiseDetailDeck },
        props: {
            decks: {
                type: Array,
                required: true,
            },
            shipTitle: {
                type: String,
                required: false,
                default: ''
            },
        },
    };
</script>

<style lang='scss' scoped>
    .cruise-detail-prices {
        &::v-deep {
            .cruise-deck-scheme {
                padding: 0;
                margin: 0;

                &__content {
                    padding: 0;
                    margin: 0;
                    @apply pt-14 pb-10;
                }
            }
        }
    }

    @screen tablet {
        .cruise-detail-prices {
            &::v-deep {
                .cruise-deck-scheme {
                    &__content {
                        padding: 0;
                    }
                }
            }
        }
    }
</style>
