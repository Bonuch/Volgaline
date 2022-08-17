<template>
    <div
        class="cruise-deck-scheme"
        :class="{ 'overflow-hidden': !hasSvgScheme }"
        v-click-outside="closeTooltip"
    >
        <div
            class="cruise-deck-scheme-wrapper bg-gray-40 rounded-xl xxl:rounded-none"
            :class="{'rounded-b-none': getActiveCabinsViewType('list')}"
        >
            <div class="cruise-deck-scheme__heading flex justify-between">
                <template v-if='hasSvgScheme'>
                    <div class='flex flex-1-1 py-7 border-r border-gray-70 4xl:border-r-0 4xl:w-full xs:block xs:pb-0'>
                        <div class='mr-7 xs:mr-0 xs:mb-2'>
                            <div class='mb-2 text-xl leading-snug font-medium'>{{ name }}</div>
                            <div
                                v-if="hasAvailabilityList"
                                :class="['text-sm leading-snug', getCabinTextColor(availability.free)]"
                            >
                                Свободных кают: {{ hasFreeCabins ? availability.free : 'Нет' }}
                            </div>
                        </div>

                        <div v-if="hasAvailabilityList" class='flex items-center'>
                            <div class='flex items-center justify-center px-2 py-1 mr-3 bg-gray-100 text-lg leading-none text-white rounded-sm xs:mr-2 xs:text-sm xs:leading-none'>
                                {{ availability.sold }}
                            </div>

                            <span class='text-base text-gray-300 xs:text-sm'>Занятые каюты</span>
                        </div>
                    </div>

                    <div class='w-7/12 flex items-center py-7 pl-7 4xl:w-full 4xl:pl-0 sm:flex-wrap xs:pt-5'>
                        <div class='w-28 mr-7 text-lg leading-tight xl:text-base xl:leading-snug sm:w-full sm:m-0 sm:mb-5'>
                            Маркировка кают
                        </div>

                        <div class="flex items-center sm:block">
                            <div class='cruise-deck-scheme-marking-item'>
                                <div class='cruise-deck-scheme-marking-block bg-orange-500'></div>
                                <div class='cruise-deck-scheme-marking-text'>1-местные</div>
                            </div>

                            <div class='cruise-deck-scheme-marking-item'>
                                <div class='cruise-deck-scheme-marking-block bg-blue-700'></div>
                                <div class='cruise-deck-scheme-marking-text'>2-местные</div>
                            </div>

                            <div class='cruise-deck-scheme-marking-item'>
                                <div class='cruise-deck-scheme-marking-block bg-red-600'></div>
                                <div class='cruise-deck-scheme-marking-text'>3-местные</div>
                            </div>

                            <div class='cruise-deck-scheme-marking-item'>
                                <div class='cruise-deck-scheme-marking-block bg-black-300'></div>
                                <div class='cruise-deck-scheme-marking-text'>4-местные</div>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div class='flex py-7 4xl:w-full xs:block xs:pb-0'>
                        <div class='mr-7 text-xl leading-snug font-medium xs:mr-0 xs:mb-2'>{{ name }}</div>

                        <template v-if="hasAvailabilityList">
                            <div class='flex items-center mr-7 xs:mr-0 xs:mb-2'>
                                <div
                                    class='flex items-center justify-center px-2 py-1 mr-3 bg-green-400 text-lg leading-none text-white rounded-sm xs:mr-2 xs:text-sm xs:leading-none'
                                >
                                    {{ availability.free }}
                                </div>

                                <span class='text-base text-gray-300 xs:text-sm'>Свободные каюты</span>
                            </div>

                            <div class='flex items-center'>
                                <div
                                    class='flex items-center justify-center px-2 py-1 mr-3 bg-gray-100 text-lg leading-none text-white rounded-sm xs:mr-2 xs:text-sm xs:leading-none'
                                >
                                    {{ availability.sold }}
                                </div>

                                <span class='text-base text-gray-300 xs:text-sm'>Занятые каюты</span>
                            </div>
                        </template>
                    </div>
                </template>
            </div>

            <div class="cruise-deck-scheme__content mt-14 xl:mt-9 sm:mt-8">
                <div
                    v-if='hasSvgScheme'
                    class='scheme-wrap relative'
                    :class="{ 'scheme-wrap-interactive': isTablet && interactive }"
                >
                    <div v-if="isTablet && interactive" class="mt-5 pb-7">
                        <button
                            type="button"
                            class="button cruise-deck-scheme-mobile-toggler"
                            :class="{ 'cruise-deck-scheme-mobile-toggler--active': getActiveCabinsViewType('scheme') }"
                            @click="handleToggleSchemeSvg"
                        >
                            Показать каюты - схемой
                        </button>

                        <button
                            v-if='cabinTypes && cabinTypes.length > 0'
                            type="button"
                            class="button cruise-deck-scheme-mobile-toggler"
                            :class="{ 'cruise-deck-scheme-mobile-toggler--active': getActiveCabinsViewType('list') }"
                            @click="handleCabinsToggle"
                        >
                            Показать каюты - списком
                        </button>
                    </div>

                    <div
                        class='w-full scheme-wrap-container'
                        :class="{ 'hidden': isTablet && !getActiveCabinsViewType('scheme') && interactive }"
                        v-html="schemeSvg"
                    ></div>

                    <div
                        v-show="tooltipIsVisible && !isTablet"
                        class='scheme-tooltip'
                        :style='{ left: tooltipCoords.x, top: tooltipCoords.y }'
                    >
                        <button
                            type="button"
                            class="absolute z-1 right-2 top-2 w-4 h-4 text-gray-200 custom-transition hover:text-blue-400"
                            @click="closeTooltip"
                        >
                            <svg
                                class="w-full h-full fill-current"
                                width="16" height="16" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    class="fill-current"
                                    fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.2071 2.20711C11.5976 1.81658 11.5976 1.18342 11.2071 0.792893C10.8166 0.402369 10.1834 0.402369 9.79289 0.792893L6 4.58579L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792893 0.792893C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L4.58579 6L0.792893 9.79289C0.402369 10.1834 0.402369 10.8166 0.792893 11.2071C1.18342 11.5976 1.81658 11.5976 2.20711 11.2071L6 7.41421L9.79289 11.2071C10.1834 11.5976 10.8166 11.5976 11.2071 11.2071C11.5976 10.8166 11.5976 10.1834 11.2071 9.79289L7.41421 6L11.2071 2.20711Z"
                                    fill="#DA3E34"
                                />
                            </svg>
                        </button>

                        <template v-if="tooltipInfo && Object.keys(tooltipInfo).length > 0">
                            <h3 class="m-0 mb-1 text-xl leading-snug uppercase">
                                <template v-if="tooltipInfo.title">Каюта № {{ tooltipInfo.title }}</template>
                            </h3>
                            <p class="m-0 mb-2 text-sm leading-snug">
                                <template v-if="tooltipInfo.category">{{ tooltipInfo.category }}</template>
                            </p>
                            <p class="m-0 mb-3 text-base leading-1-1 font-medium text-red-400">
                                <template v-if="tooltipInfo.price">от {{ tooltipInfo.price | formatPrice }}</template>
                            </p>
                        </template>

                        <button
                            class="button py-2 px-5 bg-green-400 text-base text-white font-bold border-0"
                            @click="handleChooseCabinClick"
                        >
                            Выбрать каюту
                        </button>
                    </div>
                </div>

                <div
                    v-else-if="scheme"
                    class="flex justify-center mt-6"
                >
                    <img :src="scheme" alt="Изображение схемы палубы" class="sm:hidden">

                    <div class="scheme-detail-image hidden sm:block">
                        <a :href="scheme" target='_blank' rel='nofollow' class="relative block">
                            <img :src="scheme" alt="Изображение схемы палубы">

                            <span
                                class="absolute left-0 top-0 w-full h-full flex items-center justify-center text-center text-black-400 text-sm"
                            >
                                <b class="p-2 bg-white text-black-400 border">Увеличить изображение</b>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <div v-if="showCabinToggler && cabinTypes && cabinTypes.length > 0" class="text-center pb-10">
                <button
                    type="button"
                    class="button cruise-deck-scheme-cabins-toggler"
                    :class="{ 'cruise-deck-scheme-cabins-toggler--active': getActiveCabinsViewType('list') }"
                    @click="handleCabinsToggle"
                >
                    <span>Показать каюты - списком</span>

                    <svg
                        width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        :class="{ 'rotate-180': !getActiveCabinsViewType('list') }"
                    >
                        <path
                            d="M6.40987 15.9998L17.5899 15.9998C17.7876 15.999 17.9807 15.9396 18.1447 15.829C18.3087 15.7184 18.4362 15.5617 18.5111 15.3787C18.5861 15.1957 18.605 14.9945 18.5656 14.8007C18.5263 14.6069 18.4303 14.4291 18.2899 14.2899L12.7099 8.70986C12.6169 8.61613 12.5063 8.54174 12.3844 8.49097C12.2626 8.4402 12.1319 8.41406 11.9999 8.41406C11.8679 8.41406 11.7372 8.4402 11.6153 8.49097C11.4934 8.54174 11.3828 8.61613 11.2899 8.70986L5.70987 14.2899C5.56945 14.4291 5.47348 14.6069 5.43409 14.8007C5.39471 14.9945 5.41368 15.1957 5.4886 15.3787C5.56353 15.5617 5.69104 15.7184 5.85503 15.829C6.01901 15.9396 6.2121 15.999 6.40987 15.9998Z"
                            fill="none"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

function getColorByCabinNumberSeats(seats) {
    let res = 'text-orange-500';

    switch (seats) {
        case 2:
            res = 'text-blue-700';
            break;
        case 3:
            res = 'text-red-600';
            break;
        case 4:
            res = 'text-black-300';
            break;
    }

    return res;
}

export default {
    name: 'CruiseDeckScheme',
    model: {
        prop: 'cabinsViewType',
        event: 'on-cabins-view-type-change'
    },
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
        scheme: {
            type: String,
        },
        schemeFull: {
            type: String,
        },
        schemeSvg: {
            type: String,
        },
        interactive: {
            type: Boolean,
        },
    },
    data() {
        return {
            tooltipIsVisible: false,
            tooltipCoords: {
                x: 0,
                y: 0,
            },
            tooltipInfo: {},
            currentCategory: null,
        };
    },
    computed: {
        ...mapGetters({
            'getWindowWidth': 'getWindowWidth',
        }),
        hasSvgScheme() {
            return !!this.schemeSvg;
        },
        hasAvailabilityList() {
            return this.availability && Object.keys(this.availability).length > 0;
        },
        hasFreeCabins() {
            return this.availability.free && this.availability.free > 0;
        },
        hasCabinTypes() {
            return this.cabinTypes && this.cabinTypes.length > 0;
        },
        showCabinToggler() {
            return this.hasCabinTypes && this.hasSvgScheme && this.getWindowWidth > 861 && this.interactive;
        },
        isTablet() {
            return this.getWindowWidth < 861;
        },
        getSvgScale() {
            let res = 2.4;

            if (this.getWindowWidth > 641) {
                res = 1.4;
            }

            return res;
        },
        getActiveCabinsViewType() {
            return (view) => { return this.$attrs.cabinsViewType === view };
        },
    },
    methods: {
        handleChooseCabinClick() {
            this.$emit('on-svg-cabin-click', this.tooltipInfo.title);
        },
        onSvgSchemeClick(e) {
            const schemeBlock = e.target.parentElement;
            const cabin_number = schemeBlock.dataset.cabin;

            if (!this.isTablet) {
                this.updateTooltipInfo(cabin_number);
                this.showTooltip(e);
            } else {
                this.$emit('on-svg-cabin-click', cabin_number);
            }
        },
        onSvgSchemeEnter(e) {
            e.stopPropagation();

            const target = e.target;
            const cabin_number = target.dataset.cabin;

            for (let i = 0; i < this.cabinTypes.length; i++) {
                const cabinType = this.cabinTypes[i];
                const selectedCabins = cabinType.cabins.filter(item => item.number == cabin_number);
                const hasCabin = selectedCabins.length > 0;

                if (hasCabin) {
                    this.currentCategory = cabinType;
                    cabinType.cabins.forEach(cabin => {
                        const cabinNode = document.querySelector('[data-cabin="' + cabin.number + '"]');
                        if (cabinNode) cabinNode.classList.add('nested');
                    });

                    break;
                }
            }
        },
        onSvgSchemeLeave(e) {
            e.stopPropagation();
            this.removeSelectors();
        },
        svgSchemeInit() {
            const $el = this.$el;
            const schemes = $el.querySelectorAll('.scheme-block');

            if ($el && schemes && schemes.length > 0) {
                schemes.forEach(scheme => {
                    // красим g блоки с каютами в зависимости от статуса каюты
                    const number = scheme.dataset.cabin;

                    this.cabinTypes.forEach(cabinType => {
                        cabinType.cabins.forEach(cabin => {
                            if (cabin.number == number) {
                                const color = getColorByCabinNumberSeats(cabin.number_seats);
                                scheme.classList.add(cabin.status, color);
                            }
                        });
                    });

                    // подкидываем события
                    scheme.addEventListener('click', this.onSvgSchemeClick);
                    scheme.addEventListener("mouseleave", this.onSvgSchemeLeave);
                    scheme.addEventListener('mouseenter', this.onSvgSchemeEnter);
                });
            }
        },
        removeSelectors(selectors = ['nested']) {
            const $el = this.$el;
            const schemes = $el.querySelectorAll('.scheme-block');

            if ($el && schemes && schemes.length > 0) {
                schemes.forEach(scheme => {
                    selectors.forEach(selector => scheme.classList.remove(selector));
                });
            }
        },
        updateTooltipCoords(x, y = 0) {
            this.$set(this.tooltipCoords, 'x', x);
            this.$set(this.tooltipCoords, 'y', y);
        },
        updateTooltipInfo(cabin_number) {
            this.$set(this.tooltipInfo, 'title', cabin_number);
            this.$set(this.tooltipInfo, 'category', this.currentCategory.title);
            this.$set(this.tooltipInfo, 'price', this.currentCategory.price_adult);
        },
        showTooltip(e) {
            const tooltip = this.$el.querySelector('.scheme-tooltip');
            const tooltipHeight = tooltip.offsetHeight;
            const tooltipOffset = e.offsetY - tooltipHeight - 20;
            this.updateTooltipCoords(e.offsetX + 'px', tooltipOffset + 'px');
            this.tooltipIsVisible = true;
        },
        closeTooltip() {
            if (this.tooltipIsVisible) this.tooltipIsVisible = false;
        },
        handleCabinsToggle() {
            this.toggleCabinsViewType('list');
            if (this.isTablet) this.removeActiveClassFromSvgScheme();
        },
        handleToggleSchemeSvg() {
            this.toggleCabinsViewType('scheme');
            this.setSvgSchemeSize();
        },
        toggleCabinsViewType(type) {
            const view = this.$attrs.cabinsViewType && this.$attrs.cabinsViewType === type ? null : type;
            this.$emit('on-cabins-view-type-change', view);
        },
        setSvgSchemeSize() {
            const container = this.$el.querySelector('.scheme-wrap-container');

            if (container) {
                // ждем отрисовки контейнера, чтобы высчитать пропорцию для svg
                setTimeout(() => {
                    const svg = container.querySelector('svg');
                    const height = container.offsetWidth * this.getSvgScale; // get w from attribute and * transform: scale(2.4)
                    container.style.height = height + 'px';
                    const svgHasClass = svg.classList.contains('active');
                    svgHasClass ? svg.classList.remove('active') : svg.classList.add('active');
                }, 200);
            }
        },
        removeActiveClassFromSvgScheme() {
            const container = this.$el.querySelector('.scheme-wrap-container');
            const svg = container.querySelector('svg');
            if (container && svg) svg.classList.remove('active');
        },
        getCabinTextColor(cabinsNumber) {
            let color = 'text-red-500';

            if (cabinsNumber > 1) {
                color = 'text-green-400';
            }

            return color;
        },
    },
    async mounted() {
        if (this.interactive) this.svgSchemeInit();
    },
};
</script>

<style lang="scss" scoped>
.cruise-deck-scheme {
    &-wrapper {
        @apply mx-auto px-23 lg:px-10 md:px-8 sm:px-4;

        .cruise-deck-scheme__heading {
            position: relative;

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: -90px;
                right: -90px;
                height: 1px;
                @apply bg-gray-70;
            }
        }
    }

    &__title {
        flex: 1;
        line-height: 1.2;
        margin-bottom: 0;
    }

    .availability-list {
        max-width: 470px;
        margin-left: 40px;
    }

    &-marking {
        &-item {
            display: flex;
            align-items: center;
            @apply mr-5 last:mr-0 sm:w-full sm:m-0 sm:mb-3 sm:last:mb-0;
        }

        &-block {
            width: 24px;
            height: 24px;
            @apply mr-2 rounded-sm;
        }

        &-text {
            @apply text-gray-300 text-sm leading-none;
        }
    }

    .scheme-tooltip {
        position: absolute;
        max-width: 250px;
        background-color: #FFFFFF;
        border: 1px solid #EFEFEF;
        border-radius: 10px;
        box-shadow: 0px 4px 50px rgba(72, 72, 72, 0.25);
        @apply p-5 rounded-sm;
    }

    &-cabins-toggler,
    &-mobile-toggler {
        svg {
            width: 24px;
            height: 24px;
            margin-left: 16px;
            fill: currentColor;
            transition: all .25s ease;
        }

        path {
            fill: currentColor;
        }
    }

    &-cabins-toggler {
        @apply flex items-center pl-5 pr-4 py-2 mx-auto bg-blue-300 text-white text-base leading-tight font-medium;

        &:focus {
            @apply bg-blue-400 text-white;
        }

        &--active,
        &:hover {
            @apply bg-blue-900 text-white;
        }
    }

    &-mobile-toggler {
        @apply w-full px-4 py-2 mb-3 bg-transparent text-black-400 text-base leading-snug font-bold border rounded-sm last:mb-0;
        border-color: inherit;

        &:focus {
            @apply text-blue-400;
        }

        &--active,
        &:hover {
            @apply text-blue-300;
        }
    }

    &::v-deep {
        .scheme-wrap {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;

            svg {
                width: 100%;
                height: auto;
            }
        }

        .scheme-block {
            cursor: pointer;

            &.free,
            &.partially {
                .scheme-block-bg {
                    fill: currentColor;
                }
            }

            &.sold {
                pointer-events: none !important;

                .scheme-block-bg {
                    fill: currentColor;
                    color: #A6AEBA !important;
                }

                .scheme-block-border {
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

@media all and (min-width: 1281px) {
    .cruise-deck-scheme {
        .scheme-tooltip {
            min-width: 206px;
        }
    }
}

@media all and (max-width: 1700px) {
    .cruise-deck-scheme {
        padding-bottom: 20px;

        &__heading {
            flex-direction: column;
            align-items: center;

            &-title {
                margin-bottom: 24px;
            }
        }

        &__title {
            line-height: 1.2;
            margin-bottom: 2.5rem;
        }

        .availability-list {
            margin: 0 auto;
        }
    }

    .cabin-types {
        width: calc(100% - 32px);
    }
}

@screen lg {
    .cruise-deck-scheme {
        &__heading {
            align-items: flex-start;
        }

        .availability-list {
            margin-left: 0;
        }
    }

    .cruise-deck-scheme-wrapper .cruise-deck-scheme__heading:after {
        left: -32px;
        right: -32px;
    }
}

@screen tablet {
    .scheme-wrap-interactive {
        &::v-deep {
            svg {
                opacity: 0;
                position: absolute;
                left: 0;
                top: 50%;
                transform: rotate(90deg) scale(1.4) translateX(0);
                transition: opacity 0.2s ease;

                &.active {
                    opacity: 1;
                }
            }
        }
    }
}

@screen md {
    .cruise-deck-scheme-wrapper .cruise-deck-scheme__heading:after {
        left: -32px;
        right: -32px;
    }
}

@screen sm {
    .scheme-wrap-interactive {
        &::v-deep {
            svg {
                transform: rotate(90deg) scale(2.1) translateX(0);
            }
        }
    }

    .cruise-deck-scheme-wrapper .cruise-deck-scheme__heading:after {
        left: -16px;
        right: -16px;
    }
}

@screen mob {
    .cruise-deck-scheme {
        &-wrapper {
            padding: 0 10px;
        }
    }

    .cruise-deck-scheme-wrapper .cruise-deck-scheme__heading:after {
        left: -10px;
        right: -10px;
    }
}
</style>
