<template>
    <div
        class="cruise-deck-scheme"
        :class="{ 'overflow-hidden': !hasSvgScheme }"
        v-click-outside="closeTooltip"
    >
        <DeckMarking class="cruise-deck-scheme-mobile hidden w-7/12 py-7 pl-7 4xl:w-full 4xl:pl-0 tablet:block " />
        <div
            class="cruise-deck-scheme-wrapper mx-auto px-23 bg-gray-40 rounded-xl border border-gray-70 border-b-0 xxl:rounded-none lg:px-10 tablet:bg-red-500 tablet:px-0 tablet:max-w-sm tablet:mx-auto tablet:border-b tablet:mb-6"
            :class="{'rounded-b-none': showCabinToggler && cabinTypes && cabinTypes.length > 0}"
        >
            <div class="cruise-deck-scheme__heading flex justify-between">
                <template v-if='hasSvgScheme'>
                    <div class='flex flex-1-1 py-7 border-r border-gray-70 4xl:border-r-0 4xl:w-full tablet:px-5 tablet:py-5'>
                        <div class='mr-7 tablet:w-full tablet:flex tablet:items-center tablet:justify-center tablet:mr-0 tablet:text-base mob:block'>
                            <div class='mb-2 text-xl leading-snug font-medium text-red-500 tablet:mb-0 tablet:text-base tablet:leading-snug tablet:text-center tablet:mb-0 tablet:text-white mob:w-full mob:mb-0'>
                                {{ name }}
                            </div>
                            <div
                                v-if="hasAvailabilityList"
                                class="tablet:w-1/2 tablet:text-right mob:w-full mob:text-left tablet:hidden"
                                :class="['text-sm leading-snug', getCabinTextColor(availability.free)]"
                            >
                                Свободных кают: {{ hasFreeCabins ? availability.free : 'Нет' }}
                            </div>
                        </div>

                        <div v-if="hasAvailabilityList" class='flex items-center tablet:hidden'>
                            <div class='flex items-center justify-center px-2 py-1 mr-3 bg-gray-100 text-lg leading-none text-white rounded-sm xs:mr-2 xs:text-sm xs:leading-none'>
                                {{ availability.sold }}
                            </div>

                            <span class='text-base text-gray-300 xs:text-sm'>Занятые каюты</span>
                        </div>
                    </div>

                    <DeckMarking class="w-7/12 py-7 pl-7 4xl:w-full 4xl:pl-0 tablet:hidden" />
                </template>

                <template v-else>
                    <div class='flex py-7 tablet:py-5 4xl:w-full tablet:justify-center xs:block xs:px-4'>
                        <div class='mr-7 text-xl tablet:text-base tablet:font-bold leading-snug font-medium text-red-500 tablet:flex tablet:justify-center tablet:mr-1 tablet:text-white tablet:mr-0 xs:mb-2'>
                            <div class='mb-0 tablet:mr-2'>{{ name }}</div>
                            <p class='hidden tablet:block mb-0'>палуба</p>
                        </div>

                        <template v-if="hasAvailabilityList" >
                            <div class='flex items-center mr-7 xs:mr-0 xs:mb-2 tablet:hidden'>
                                <div
                                    class='flex items-center justify-center px-2 py-1 mr-3 bg-green-400 text-lg leading-none text-white rounded-sm xs:mr-2 xs:text-sm xs:leading-none'
                                >
                                    {{ availability.free }}
                                </div>

                                <span class='text-base text-gray-300 xs:text-sm'>Свободные каюты</span>
                            </div>

                            <div class='flex items-center tablet:hidden'>
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

            <div class="cruise-deck-scheme__content mt-14 xl:mt-9 sm:mt-8 tablet:hidden">
                <div
                    v-if='hasSvgScheme'
                    class='scheme-wrap relative'
                    :class="{ 'scheme-wrap-interactive': isTablet && interactive }"
                >
                    <div
                        class='w-full scheme-wrap-container'
                        :class="{ 'hidden': isTablet && interactive }"
                        v-html="schemeSvg"
                    ></div>

                    <div
                        v-show="!isTablet"
                        class='scheme-tooltip'
                        :style="{
                            left: tooltipCoords.left,
                            top: tooltipCoords.top,
                            visibility: (tooltipIsVisible ? 'visible' : 'hidden'),
                            opacity: (tooltipIsVisible ? '1' : '0'),
                        }"
                    >
                        <span
                            class="tooltip-floating-point"
                            :style="{
                            left: tooltipCoords,
                            top: tooltipCoords.positionTooltipTop,
                            bottom: tooltipCoords.positionTooltipBottom,
                              }"
                        ></span>
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

                        <template v-if="tooltipInfo && Object.keys(tooltipInfo).length > 0"
                        >
                            <h3 class="m-0 mb-1 text-18 font-normal leading-snug relative z-10">
                                <template v-if="tooltipInfo.title">Каюта № {{ tooltipInfo.title }}</template>
                            </h3>
                            <p class="m-0 mb-2 text-sm leading-snug relative z-10">
                                <template v-if="tooltipInfo.category">{{ tooltipInfo.category }}</template>
                            </p>
                            <p class="m-0 mb-3 text-base leading-1-1 font-medium text-red-400 relative z-10">
                                <template v-if="tooltipInfo.price">от {{ tooltipInfo.price | formatPrice }}/чел.</template>
                            </p>
                        </template>
                        <button
                            class="button py-2 px-5 bg-green-400 text-base text-white font-bold border-0 relative z-10"
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

            <div v-if="showCabinToggler" class="pb-12 text-center">
                <div class='text-xl text-red-500 font-medium leading-1-2'>Выберите тип каюты:</div>

                <div class="deck-view-type-controls flex justify-end">
                    <button
                        class="deck-view-type-control"
                        :class="{ 'active': getActiveCabinsViewType('grid') }"
                        type="button"
                        title="Вид отображения кают - список"
                        @click="updateCabinsViewType('grid')"
                    >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H3.75V3.75H0V0ZM8.75 0H12.5V3.75H8.75V0ZM17.5 0H21.25V3.75H17.5V0ZM0 8.75H3.75V12.5H0V8.75ZM8.75 8.75H12.5V12.5H8.75V8.75ZM17.5 8.75H21.25V12.5H17.5V8.75ZM0 17.5H3.75V21.25H0V17.5ZM8.75 17.5H12.5V21.25H8.75V17.5ZM17.5 17.5H21.25V21.25H17.5V17.5Z"/>
                        </svg>
                    </button>
                    <button
                        class="deck-view-type-control"
                        :class="{ 'active': getActiveCabinsViewType('table') }"
                        type="button"
                        title="Вид отображения кают - таблица"
                        @click="updateCabinsViewType('table')"
                    >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H21.25V2.5H0V0ZM0 6.25H21.25V8.75H0V6.25ZM0 12.5H21.25V15H0V12.5ZM0 18.75H21.25V21.25H0V18.75Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="schemeSvg && schemeSvg.length > 0"
            class="hidden wrapper my-10 overflow-y-auto tablet:block"
            v-html="schemeSvg"
        ></div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import DeckMarking from './DeckMarking';
import DeckMarkingMobile from './DeckMarkingMobile';

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
        name: 'CruiseDetailDeckScheme',
        components: {DeckMarkingMobile, DeckMarking },
        model: {
            prop: 'cabinsViewType',
            event: 'on-cabins-view-type-change'
        },
        props: {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Object,
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
                    left: 0,
                    top: 0,
                },
                tooltipInfo: {},
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
                let res = 1.4;

                if (this.getWindowWidth < 641) {
                    res = 2.2;
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
            svgSchemeInit() {
                const $cabinSvgItems = this.$el.querySelectorAll('.scheme-block');
                if ($cabinSvgItems && $cabinSvgItems.length > 0) {
                    $cabinSvgItems.forEach($cabinSvgItem => {
                        // красим g блоки с каютами в зависимости от статуса каюты
                        const number = $cabinSvgItem.dataset.cabin;
                        // сначала перекрашиваем все блоки в серый и делаем их не доступными,
                        // т.к не все схемы корректно размечены или синхронизированы с бэком
                        this.cabinTypes.forEach(cabinType => {
                            cabinType.cabins.forEach(cabin => {
                                $cabinSvgItem.classList.add('disabled');
                            });
                        });

                        // добавляем нужный статус и цвет по размерности каюты на схеме
                        this.cabinTypes.forEach(cabinType => {
                            cabinType.cabins.forEach(cabin => {
                                if (cabin.number == number) {
                                    const color = getColorByCabinNumberSeats(cabin.number_seats);
                                    $cabinSvgItem.classList.remove('disabled');
                                    $cabinSvgItem.classList.add(cabin.status, color);
                                }
                            });
                        });

                        // подкидываем события
                        $cabinSvgItem.addEventListener('click', this.onSvgSchemeClick);
                        $cabinSvgItem.addEventListener('mouseenter', this.onSvgSchemeClick);
                        $cabinSvgItem.addEventListener("mouseleave", this.onSvgSchemeLeave);
                        $cabinSvgItem.addEventListener('mouseenter', this.highlightCabinsByType);
                    });
                }
            },
            onSvgSchemeClick(e) {
                const tagName = e.target.tagName.toLowerCase();
                const $cabinGroupElement = (tagName === 'g') ? e.target : e.target.parentElement;
                if (!this.isTablet && $cabinGroupElement) {
                    this.updateAndShowTooltip($cabinGroupElement);
                } else {
                    this.$emit('on-svg-cabin-click', $cabinGroupElement.dataset.cabin);
                }
            },
            highlightCabinsByType(e) {
                e.stopPropagation();
                const tagName = e.target.tagName.toLowerCase();
                const $cabinGroupElement = (tagName === 'g') ? e.target : e.target.parentElement;
                const currentCategory = this.getCurrentCategory($cabinGroupElement);
                if (!currentCategory)  return;
                currentCategory.cabins.forEach(cabin => {
                    const cabinNode = document.querySelector('[data-cabin="' + cabin.number + '"]');
                    if (cabinNode) cabinNode.classList.add('nested');
                });
            },
            onSvgSchemeLeave(e) {
                e.stopPropagation();
                const $cabinSvgItems = this.$el.querySelectorAll('.scheme-block');
                if (!$cabinSvgItems || $cabinSvgItems.length === 0)  return;
                $cabinSvgItems.forEach($cabinSvgItem => {
                    $cabinSvgItem.classList.remove('nested');
                });
            },
            getCurrentCategory($cabinGroupElement) {
                const cabinNumber = $cabinGroupElement.dataset.cabin;
                for (let i = 0; i < this.cabinTypes.length; i++) {
                    const cabinType = this.cabinTypes[i];
                    const selectedCabins = cabinType.cabins.filter(item => (item.number == cabinNumber));
                    const hasCabin = selectedCabins.length > 0;
                    if (hasCabin) {
                        return cabinType;
                    }
                }
                return false;
            },
            findCategoryLowestPrice (currentCategory) {
                let lowestPrice = 0;
                if (currentCategory) {
                    const tariffs = currentCategory.tariffs_prices;
                    if (tariffs && tariffs.length > 0) {
                        lowestPrice = tariffs[0].prices.adult;
                        tariffs.forEach(tariffItem => {
                            if (tariffItem.prices.adult < lowestPrice && tariffItem.prices.adult !== 0) {
                                lowestPrice = tariffItem.prices.adult;
                            }
                        });
                    }
                }
                return lowestPrice;
            },
            updateAndShowTooltip($cabinGroupElement) {
                // обновляем информацию в tooltip
                const currentCategory = this.getCurrentCategory($cabinGroupElement);
                if (!currentCategory)  return;
                this.tooltipInfo = {
                    title: $cabinGroupElement.dataset.cabin,
                    category: currentCategory.title,
                    price: this.findCategoryLowestPrice(currentCategory)
                };
                // даем окну отрендериться с новыми данными, чтобы изменился размер и его можно было прочитать
                this.$nextTick(() => {
                    // позиционируем и отображаем
                    const $schemeWrap = this.$el.querySelector('.scheme-wrap');
                    const $tooltip = this.$el.querySelector('.scheme-tooltip');
                    const svgCoordinates = $schemeWrap.getBoundingClientRect();
                    const $cabinSvgBkg = $cabinGroupElement.querySelector('.scheme-block-bg');
                    const cabinCoordinates = $cabinSvgBkg.getBoundingClientRect();
                    const height = Math.floor(cabinCoordinates.y - svgCoordinates.y)
                    if (cabinCoordinates.top <= 300 || height > 50) {
                        const left = Math.floor(cabinCoordinates.left - svgCoordinates.x - 52 + ($cabinSvgBkg.getBoundingClientRect().width / 2)) + 'px';
                        const top = Math.floor((cabinCoordinates.y - svgCoordinates.y + 225) - 174) + 'px';
                        const positionTooltipTop = Math.floor(3) + 'px';
                        this.tooltipCoords = { left, top, positionTooltipTop };
                    } else {
                        const left = Math.floor(cabinCoordinates.left - svgCoordinates.x - 52 + ($cabinSvgBkg.getBoundingClientRect().width / 2)) + 'px';
                        const top = Math.floor((cabinCoordinates.y - svgCoordinates.y - 5) - $tooltip.offsetHeight - 8) + 'px';
                        const positionTooltipBottom = Math.floor(3) + 'px';
                        this.tooltipCoords = { left, top, positionTooltipBottom  };
                    }

                    this.tooltipIsVisible = true;
                });

            },
            closeTooltip() {
                if (this.tooltipIsVisible) this.tooltipIsVisible = false;
            },
            handleToggleSchemeSvg() {
                this.setSvgSchemeSize();
            },
            updateCabinsViewType(type) {
                const view = this.$attrs.cabinsViewType && this.$attrs.cabinsViewType === type ? null : type;
                this.$emit('on-cabins-view-type-change', view);
            },
            setSvgSchemeSize() {
                const container = this.$el.querySelector('.scheme-wrap-container-mobile');
                if (container && this.isTablet) {
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
            getCabinTextColor(cabinsNumber) {
                return (cabinsNumber > 1) ? 'text-green-400' : 'text-red-500';
            },
        },
        async mounted() {
            await this.$nextTick();
            if (this.interactive) this.svgSchemeInit();
        },
        watch: {
            getWindowWidth(width) {
                if (width <= 860 && this.getActiveCabinsViewType('grid')) {
                    this.updateCabinsViewType('table');
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-deck-scheme {
        &-wrapper {
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

        .tooltip-floating-point {
            position: absolute;
            //bottom: 3px;
            left: 12px;
            width: 80px;
            height: 80px;
            transform: rotate(45deg);
            border-radius: 10px;
            background-color: #FFFFFF;
            z-index: 1;
        }

        .scheme-tooltip {
            position: absolute;
            max-width: 250px;
            background-color: #FFFFFF;
            border: 1px solid #EFEFEF;
            border-radius: 10px;
            box-shadow: 0px 4px 50px rgba(72, 72, 72, 0.25);
            @apply p-5;
            z-index: 2;
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
            max-width: 164px;
            @apply w-full h-full px-4 py-2 bg-transparent text-black-400 text-sm leading-snug font-bold border border-gray-260 rounded-sm;

            &:focus {
                @apply text-blue-400 border-blue-400;
            }

            &--active,
            &:hover {
                @apply text-blue-300 border-blue-300;
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

                &.disabled,
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

    .deck-view-type-control {
        margin-right: 20px;

        &:hover,
        &:focus {
            @apply text-orange-400;
        }

        &:last-of-type {
            margin-right: 0;
        }

        &.active {
            pointer-events: none;
            @apply text-red-400;
        }

        svg path {
            transition: all .3s ease;
            fill: currentColor;
        }
    }

    .cruise-deck-scheme-mobile {
        &::v-deep {
            .cruise-deck-scheme-marking-list {
                @apply sm:flex flex-wrap items-start;
            }
            .cruise-deck-scheme-marking-item {
                width: unset;
                margin-right: 33px;
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-start !important;
                &:last-child {
                    margin-right: 0;
                }
            }
            .cruise-deck-scheme-marking-block {
                margin: 0 0 16px 0 !important;
            }
            .cruise-deck-scheme-marking-text {
                font-size: 14px !important;
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

    @media all and (min-width: 861px) {
        .cruise-deck-scheme {
            .scheme-wrap-container {
                height: initial !important;
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
            left: -40px;
            right: -40px;
        }
    }

    @screen tablet {
        .cruise-deck-scheme {
            &::v-deep {
                .cruise-deck-scheme-marking-mobile {
                    display: block;
                }

                .cruise-deck-scheme-marking {
                    &-title {
                        width: 100%;
                        margin-bottom: 20px;
                        text-align: center;
                    }

                    &-list {
                        justify-content: center;
                    }

                    &-item {
                        display: block;
                        text-align: center;
                    }

                    &-block {
                        margin: 0 auto 6px;
                    }
                }
            }
        }

        .cruise-deck-scheme-wrapper {
            box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
            border-radius: 80px;
        }

        .cruise-deck-scheme-wrapper .cruise-deck-scheme__heading:after {
            content: none;
            left: 0;
            right: 0;
        }

        .scheme-wrap-interactive {
            &::v-deep {
                svg {
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    top: 47%;
                    transform: rotate(90deg) scale(1.4) translateX(0);
                    transition: opacity 0.2s ease;

                    &.active {
                        opacity: 1;
                    }
                }
            }
        }
    }

    @screen sm {
        .scheme-wrap-interactive {
            &::v-deep {
                svg {
                    transform: rotate(90deg) scale(2.2) translateX(0);
                }
            }
        }
    }

    @screen xxs {
        .cruise-deck-scheme-mobile {
            &::v-deep {
                .cruise-deck-scheme-marking-item {
                    margin-right: 8px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
                .cruise-deck-scheme-marking-text {
                    font-size: 12px !important;
                }
            }

        }
    }

    @screen mob {
        .cruise-deck-scheme {
            &-wrapper {
                padding: 0 10px;
            }

            &-mobile-toggler {
                max-width: 100%;
            }
        }
    }
</style>
