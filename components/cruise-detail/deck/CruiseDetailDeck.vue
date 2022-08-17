<template>
    <div class="deck mb-10 xs:mb-8 wrapper-1410-f relative">
        <CruiseDetailDeckScheme
            class="deck-scheme mb-14 rounded-b-0 tablet:mb-6"
            :name="deck.title"
            :availability="deck.count"
            :cabin-types="deck.category"
            :scheme="deck.image_1410_1180"
            :schemeFull="deck.image_1410_1180"
            :scheme-svg="deck.scheme_svg_code"
            :cabins="deck.cabins"
            :interactive="true"
            @on-svg-cabin-click="handleSvgCabinClick"
            v-model="cabinsViewType"
        />

        <template v-if="deck.category && deck.category.length > 0">
            <!--отображение карточкой-->
            <div
                v-if="cabinsViewType === 'grid'"
                class="deck-cabins-wrap flex flex-wrap border-t border-gray-70 tablet:border-0"
            >
                <CruiseDetailCabinCategoryCard
                    v-for="(item) in deck.category"
                    :key="`deck-cabins-card-${item.id}`"
                    class='w-1/4 cabin-card xl:w-1/3 tablet:w-1/2'
                    :cabin="item"
                    :deck="{ id: deck.id, title: deck.title }"
                    :selected-in-deck-cabin="selectedInDeckCabin"
                    @on-watch-scheme-clicked="handleWatchSchemeClick"
                    @on-choose-cabin-click="handleSvgCabinClick"
                />
            </div>

            <!--отображение однотипных кают-->
            <div
                v-if="cabinsViewType === 'table'"
                class="deck-cabins-wrap flex flex-col border-t border-gray-70 tablet:border-0"
            >
                <CruiseDetailCabinCategoryCardType
                    v-for="(item) in deck.category"
                    :key="`deck-cabins-card-${item.id}`"
                    class='cabin-card-type'
                    :cabin="item"
                    :deck="{ id: deck.id, title: deck.title }"
                    :selected-in-deck-cabin="selectedInDeckCabin"
                    @on-choose-cabin-click="handleSvgCabinClick"
                />
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import CruiseDetailCabinCategoryCard from './CruiseDetailCabinCategoryCard';
    import CruiseDetailCabinCategoryCardType from './CruiseDetailCabinCategoryCardType';
    import CruiseDetailDeckScheme from './CruiseDetailDeckScheme';

export default {
    name: "CruiseDetailDeck",
    components: { CruiseDetailDeckScheme, CruiseDetailCabinCategoryCard, CruiseDetailCabinCategoryCardType },
    props: {
        deck: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            heading: [
                "",
                "Размещение",
                "Тариф",
                "Свободные каюты",
                "",
            ],
            selectedInDeckCabin: null,
            cabinsViewType: 'grid', // grid, table
        };
    },
    computed: {
        ...mapGetters({
            'getWindowWidth': 'getWindowWidth',
        }),
        hasSvgScheme() {
            return this.deck && this.deck.scheme_svg_code;
        },
        showCabinToggler() {
            return this.hasSvgScheme && this.getWindowWidth > 861;
        },
    },
    methods: {
        handleWatchSchemeClick() {
            const $el = this.$el;
            const scheme = $el.querySelector(".deck-scheme");

            if ($el && scheme) {
                scheme.scrollIntoView({ block: "start", behavior: "smooth" });
            }
        },
        handleSvgCabinClick(val) {
            this.$cookies.set('selectedCabin', val, {
                maxAge: 60 * 60,
            });
            this.selectedInDeckCabin = val;
        },
    },
};
</script>

<style lang='scss' scoped>
    .deck-cabins-wrap {
        max-width: 1410px;
        margin: 0 auto;
    }

    .cabin-card {
        border-top: 0;
        border-right-width: 0;

        &:nth-of-type(4n),
        &:last-of-type {
            border-right-width: 1px;
        }
    }

    .cabin-card-type {
        border-top: 0;
    }

    @screen xl {
        .cabin-card {
            &:nth-of-type(4n) {
                border-right-width: 0;
            }

            &:nth-of-type(3n),
            &:last-of-type {
                border-right-width: 1px;
            }
        }
    }

    @screen tablet {
        .deck-cabins-wrap {
            padding: 0 16px;
        }

        .cabin-card {
            width: calc(50% - 8px);
            margin-right: 16px;
            margin-bottom: 16px;
            border: 0 !important;

            &:nth-of-type(2n) {
                margin-right: 0;
            }
        }
    }

    @screen sm {
        .cabin-card {
            width: 100%;
            margin: 0 auto 20px !important;

            &:last-of-type {
                margin-bottom: 0 !important;
            }
        }
    }
</style>
