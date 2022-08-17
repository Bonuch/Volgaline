<template>
    <div class="cruise-deck-scheme">
        <div
            class="cruise-deck-scheme__heading flex flex-wrap items-center justify-center pt-8 hidden"
        >
            <div
                v-if="name"
                class="cruise-deck-scheme__title mr-7"
            >
                {{ name }}
            </div>

            <div
                v-if="availability && Object.keys(availability).length > 0"
                class="availability-list flex-wrap items-center 2xl:justify-center"
            >
                <template v-for="(avaItem, avaIdx) in Object.keys(availability)">
                    <div
                        v-if="avaItem !== 'partially'"
                        :key="`availability-list-item-${avaIdx}`"
                        class="availability-list-col flex items-center flex-initial"
                    >
                        <div
                            class="availability-list-item__count bg-green-400 text-white"
                            :class="getAvailabilityItemAdvanced(avaItem)['color']"
                        >
                            <span class="text-lg">{{ availability[avaItem] }}</span>
                        </div>

                        <div class="availability-list-item__text text-gray-300">
                            {{ getAvailabilityItemAdvanced(avaItem)['text'] }}
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="cruise-deck-scheme__content mt-14 xl:mt-9 sm:mt-8">
            <div
                v-if='schemeSvg'
                class='scheme-wrap relative'
            >
                <div class='w-full' v-html="schemeSvg"></div>
            </div>

            <div
                v-else-if="scheme"
                class="flex justify-center"
            >
                <img :src="scheme" alt="Изображение схемы палубы" class="sm:hidden">

                <div class="scheme-detail-image hidden sm:block">
                    <a :href="scheme" class="relative block">
                        <img :src="scheme" alt="Изображение схемы палубы">

                        <span
                            class="absolute left-0 top-0 w-full h-full flex items-center justify-center text-center text-black-400 text-sm"
                        >
                                <b class="p-2 bg-white text-black-400 rounded-sm">Увеличить изображение</b>
                            </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChooseCabinDeckScheme',
        props: {
            name: {
                type: String,
                required: true,
            },
            availability: {
                type: Object,
            },
            cabinTypes: {
                type: Array,
                required: true,
            },
            cabins: {
                type: Array,
                required: true,
            },
            scheme: {
                type: String,
            },
            schemeFull: {
                type: String,
            },
            schemeSvg: {
                type: String,
            },
        },
        data() {
            return {
                tooltipInfo: {},
            };
        },
        computed: {
            getAvailabilityItemAdvanced() {
                return (key) => {
                    let res = {};

                    switch (key) {
                        case 'free':
                            res.color = 'bg-green-400';
                            res.text = 'Свободные каюты';
                            break;
                        case 'sold':
                            res.color = 'bg-gray-200';
                            res.text = 'Проданные каюты';
                            break;
                    }

                    return res;
                };
            },
            getCabinColor() {
                return (colorName) => {
                    let res = '';

                    switch (colorName) {
                        case 1:
                            res = 'bg-yellow-400';
                            break;
                        case 2:
                            res = 'bg-blue-300';
                            break;
                        case 3:
                            res = 'bg-green-400';
                            break;
                        case 4:
                            res = 'bg-blue-200';
                            break;
                        case 5:
                            res = 'bg-green-300';
                            break;
                        default:
                            res = 'bg-blue-300';
                            break;
                    }

                    return res;
                };
            },
        },
        methods: {
            initLightgallery() {
                const $el = this.$el;

                if ($el) {
                    const galleryWrap = $el.querySelector('.scheme-detail-image');
                    if (galleryWrap) window.lightGallery(galleryWrap, { download: false });
                }
            },
            onSvgSchemeClick(e) {
                e.stopPropagation();
                const currentTarget = e.currentTarget;
                const cabin_number = currentTarget.dataset.cabin;
                this.$emit('on-svg-cabin-click', cabin_number);
            },
            onSvgSchemeEnter(e) {
                e.stopPropagation();
                this.removeNestedSelector();
                const target = e.target;
                const cabin_number = target.dataset.cabin;

                this.cabins.forEach(cabin => {
                    const cabinNode = document.querySelector('[data-cabin="' + cabin.number + '"]');
                    if (cabinNode) cabinNode.classList.add('nested');
                });
            },
            onSvgSchemeLeave(e) {
                e.stopPropagation();
                this.removeNestedSelector();
            },
            svgSchemeInit() {
                const $el = this.$el;
                const schemes = $el.querySelectorAll('.scheme-block');

                if ($el && schemes && schemes.length > 0) {
                    let cabins = [];
                    let schemeCabins = document.querySelectorAll('g[data-cabin]');

                    schemeCabins.forEach(item => {
                        let cabin = {};

                        cabin.number = item.getAttribute('data-cabin');
                        cabin.status = this.cabins.find(findedCabin => findedCabin.number == cabin.number) ? 'free' : 'sold';
                        cabins.push(cabin);
                    });

                    schemes.forEach(scheme => {
                        // красим g блоки с каютами в зависимости от статуса каюты
                        const number = scheme.dataset.cabin;

                        cabins.forEach(cabin => {
                            if (cabin.number == number) scheme.classList.add(cabin.status);
                        });

                        // подкидываем события
                        scheme.addEventListener('click', this.onSvgSchemeClick);
                        scheme.addEventListener('mouseleave', this.onSvgSchemeLeave);
                        scheme.addEventListener('mouseenter', this.onSvgSchemeEnter);
                    });
                }
            },
            removeNestedSelector() {
                const $el = this.$el;
                const schemes = $el.querySelectorAll('.scheme-block');

                if ($el && schemes && schemes.length > 0) {
                    schemes.forEach(scheme => {
                        scheme.classList.remove('nested');
                    });
                }
            },
        },
        mounted() {
            this.initLightgallery();
            this.svgSchemeInit();
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-deck-scheme {
        &__title {
            @apply text-30 leading-none font-bold uppercase;
        }

        .scheme-tooltip {
            position: absolute;
            max-width: 206px;
            background-color: #FFFFFF;
            border: 1px solid #EFEFEF;
            border-radius: 10px;
            box-shadow: 0px 4px 50px rgba(72, 72, 72, 0.25);
            @apply p-5 rounded-sm;
        }

        &::v-deep {
            .scheme-wrap {
                width: 100%;

                svg {
                    width: 100%;
                    height: auto;
                }
            }

            .scheme-block {
                cursor: pointer;

                &-bg {
                    /*transition: all .3s ease;*/
                }

                &.free,
                &.partially {
                    .scheme-block-bg {
                        fill: currentColor;
                        @apply text-green-400;
                    }
                }

                &.sold {
                    pointer-events: none !important;

                    .scheme-block-bg {
                        fill: currentColor;
                        color: #A6AEBA !important;
                    }

                    .scheme-block-border{
                        fill: currentColor;
                        color: #B7B7B7 !important;
                    }
                }

                &.active,
                &:hover {
                    .scheme-block-bg {
                        fill: currentColor;
                        color: #158ACA !important;
                    }

                    .scheme-block-border{
                        fill: currentColor;
                        color: #4f9ee5;
                    }

                    //@apply text-blue-900;
                }

                &.nested {

                    .scheme-block-border{
                        fill: currentColor;
                        color: #4f9ee5;
                    }
                }
            }
        }
    }
</style>
