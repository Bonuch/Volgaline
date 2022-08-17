<template>
    <div
        v-click-outside="clickOutsideHandler"
        class="search-dropdown relative"
        :class="{ 'search-dropdown--opened': isOpened, 'search-dropdown--filled': hasSelected }"
        tabindex="1"
    >
        <div
            class="search-dropdown-title flex items-center justify-between"
            role="button"
            @click="toggleShow"
        >
            <span
                class="search-dropdown-label search-form__label"
                :class="{'search-form__label--active': hasSelected}"
            >
                {{ label }}
            </span>

            <span
                id="list-selected"
                class="search-dropdown-label search-form__label--show-selected flex flex-1-1 text-lg leading-none 2xl:text-base 2xl:leading-none overflow-hidden"
                :class="{'search-dropdown-filled': hasSelected} "
            >
                <template v-if="hasSelected">

                        <div
                            v-for="(item, itemIDx) in getSelectedOptions"
                            class="item-list-selected flex whitespace-nowrap"
                            :key="itemIDx"
                        >
                            <span>{{item.title}}</span>
                            <button
                                type="button"
                                class="mr-4 ml-1"
                                @click.stop="removeOption(item.id)"
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.90145 7.72272L6.2498 5.07107L8.90145 2.41942C9.04876 2.2721 9.04876 1.97748 8.90145 1.83016L8.3122 1.24091C8.14647 1.07518 7.87025 1.09359 7.72294 1.24091L5.07129 3.89256L2.41964 1.24091C2.25391 1.07518 1.9777 1.09359 1.83038 1.24091L1.24113 1.83016C1.0754 1.99589 1.0754 2.25369 1.24113 2.41942L3.89278 5.07107L1.24113 7.72272C1.0754 7.88845 1.0754 8.14625 1.24113 8.31197L1.83038 8.90123C1.9777 9.04854 2.25391 9.06696 2.41964 8.90123L5.07129 6.24958L7.72294 8.90123C7.87025 9.04854 8.14647 9.06696 8.31219 8.90123L8.90145 8.31197C9.04876 8.16466 9.04876 7.87003 8.90145 7.72272Z" fill="#BC002D"/>
                                </svg>
                            </button>
                        </div>

                    <div class="item-list-selected flex whitespace-nowrap hidden text-xs items-end">
                        <span>...и ещё {{countHiddenListItems}} {{getCountHiddenListItems}}</span>
                    </div>

                </template>
            </span>

            <button
                type="button"
                class="search-dropdown-icon"
            >
                <slot name="icon">
                    <svg
                        class="search-dropdown-icon-down"
                        :class="{'search-dropdown-icon__turn-over': isOpened}"
                        width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24804 3.93974C2.65855 3.57028 3.29084 3.60356 3.66029 4.01407L7.10242 7.83865L10.5445 4.01407C10.914 3.60356 11.5463 3.57028 11.9568 3.93974C12.3673 4.3092 12.4006 4.94149 12.0311 5.352L7.84571 10.0025C7.65607 10.2132 7.3859 10.3335 7.10242 10.3335C6.81893 10.3335 6.54877 10.2132 6.35912 10.0025L2.17371 5.352C1.80425 4.94149 1.83753 4.3092 2.24804 3.93974Z" fill="#1D1F20"/>
                    </svg>
                </slot>
            </button>
        </div>

        <div
            v-show="isOpened"
            class="search-dropdown-content"
        >
            <div class="search-dropdown-scroll">
                <transition name="dropdown">
                    <div class="search-dropdown-options">
                        <div class="search-dropdown-input--wrapper"
                             v-show="isOpened && searchable">
                            <span>
                                <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7963 10.7693L8.69173 8.59078C9.47651 7.67998 9.96403 6.47385 9.96403 5.15693C9.96403 2.31385 7.72866 0 4.98202 0C2.23537 0 0 2.31385 0 5.15693C0 8.00001 2.23537 10.3139 4.98202 10.3139C5.95706 10.3139 6.86067 10.0184 7.62165 9.52616L9.80946 11.7908C9.94025 11.9262 10.1186 12 10.297 12C10.4753 12 10.6537 11.9262 10.7845 11.7908C11.0698 11.5077 11.0698 11.0523 10.7964 10.7692L10.7963 10.7693ZM1.39114 5.15695C1.39114 3.11385 2.99636 1.44002 4.98199 1.44002C6.96762 1.44002 8.56096 3.11387 8.56096 5.15695C8.56096 7.20005 6.95573 8.87388 4.98199 8.87388C3.00825 8.87388 1.39114 7.21229 1.39114 5.15695Z" fill="#5A6472"/>
                                </svg>
                            </span>
                            <input
                                type="text"
                                :placeholder="placeholderSearch"
                                class="flex-1-1 input p-0 leading-none"
                                v-model="searched"
                            >
                        </div>
                        <div
                            v-for="(option, index) in sortedSelectedOptions"
                            :key="index"
                            class="search-dropdown-option"
                            :class="{
                            'search-dropdown-option--active': selectedOption(option),
                            'search-dropdown-option--disabled': option.disabled && paintDisabledOptions
                          }"
                            @click="onOptionSelect(option)"
                        >

                            <span class="search-dropdown-option-square">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.66235 8C3.40981 8 3.15727 7.89533 2.96449 7.68475L0.289177 4.76256C-0.0963923 4.34141 -0.0963923 3.6592 0.289177 3.23928C0.674746 2.81813 1.2982 2.8169 1.68377 3.23805L3.66235 5.39922L8.31623 0.315862C8.7018 -0.105287 9.32525 -0.105287 9.71082 0.315862C10.0964 0.737012 10.0964 1.41923 9.71082 1.84038L4.3602 7.68475C4.16742 7.89533 3.91488 8 3.66235 8Z" fill="#BC002D"/>
                                </svg>
                            </span>

                            <span
                                v-if="option[optionLabel]"
                                class="search-dropdown-option-title"
                            >
                                {{ option[optionLabel] }}
                            </span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import { inArray, sliceSelectedOptions, hasSelectedItem } from '@/helpers/helpers';
    import { setCase } from '@/helpers/text';

    export default {
        name: 'SearchDropdown',
        props: {
            /**
             * Опции
             */
            options: {
                type: Array,
                require: true,
            },
            /**
             * Тайтл для опции
             */
            optionLabel: String,
            /**
             * Тайтл для лейбла
             */
            label: {
                type: String,
                required: true,
            },
            /**
             * Значение
             */
            value: {
                type: null,
            },
            /**
             * Ключ значения
             */
            valueName: {
                type: String,
                default: 'id',
            },
            /**
             * Ключ по которому идет сравнение
             */
            comparisonValue: {
                type: String,
                default: 'id',
            },
            /**
             * Тип справнения, по дефолту defaultComparison
             */
            comparisonType: {
                type: String,
            },
            /**
             * Выбранные опции
             */
            selected: [],
            /**
             * Не рабочий коллбэк, не используем его
             */
            reduce: {
                type: Function,
                default: option => option,
            },
            /**
             * Можно ли искать
             */
            searchable: {
                type: Boolean,
                default: false,
            },
            /**
             * Плейсхолдер для поиска
             */
            placeholderSearch: {
                type: String,
            },
            /**
             * Склонение сокращений
             */
            lineClampWords: {
                type: Array,
                require: true,
            },
            /**
             * Покраска блока с неактуальными опциями
             */
            paintDisabledOptions: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                isOpened: false,
                searched: null,
                selectedList: [],
                countHiddenListItems: 0
            };
        },
        computed: {
            selectedCount() {
                return this.value && this.value.length ? this.value.length : 0;
            },
            getSelectedOptions() {
                return this.value;
            },
            getCountHiddenListItems() {
                return setCase(this.countHiddenListItems, this.lineClampWords);
            },
            hasSelected() {
                return this.value && this.value.length > 0;
            },
            sortedSelectedOptions() {
                const options = this.searchable && this.searched && this.searched.length ? this.filteredOptions : this.options;

                if (this.hasSelected) {
                    const slicedOptions = sliceSelectedOptions(options, this.value);
                    return [...this.value, ...slicedOptions];
                } else {
                    return options;
                }
            },
            selectedOption() {
                return (option) => inArray(this.value, option, this.valueName);
            },
            filteredOptions() {
                const res = this.options.filter(item => {
                    return item.title.toLowerCase().indexOf(this.searched.toLowerCase()) > -1;
                });

                return res.length > 0 ? res : [];
            },
        },
        methods: {
            toggleShow(e) {
                const target = e.target;
                const targetClasses = [...target.classList];

                // игнорируем клики по поисковому инпуту
                if (!target.classList.contains('search-dropdown-input')) {
                    this.isOpened = !this.isOpened;
                }

                // подкидываем фокус на инпут
                if (this.isOpened) {
                    const input = this.$el.querySelector('.search-dropdown-input');

                    setTimeout(() => {
                        if (this.$el && input) {
                            input.focus();
                        }
                    }, 100);
                }
            },
            clickOutsideHandler() {
                this.searched = null;
                this.isOpened = false;
            },
            onOptionSelect(option) {
                if (this.hasSelected) {
                    if (this.selectedOption(option)) {
                        const filtered = this.value.filter(item => item[this.valueName] !== option[this.valueName]);
                        this.updateValue(filtered);
                    } else {
                        this.updateValue([...this.value, option]);
                    }
                } else {
                    this.updateValue([option]);
                }
            },
            updateValue(value) {
                // не придумал как добавить колбэк, поэтому данные обрабатываю перед отправкой формы тут helpers/search.js
                // if (value !== null) {
                //     if (Array.isArray(value)) {
                //         value = value.map(val => this.reduce(val));
                //     } else {
                //         value = this.reduce(value);
                //     }
                // }

                this.$emit('input', value);
            },
            fillSelectedOnInit() {
                if (this.value && this.options && this.options.length > 0) {
                    let selected = null;

                    if (this.comparisonType === 'intersection') {
                        selected = this.intersectionComparison();
                    } else {
                        selected = this.defaultComparison();
                    }

                    selected && selected.length > 0 ? this.$emit('input', selected) : this.$emit('input', selected);
                }
            },
            defaultComparison() {
                const selected = [];

                this.options.forEach(option => {
                    for (let i = 0; i < this.value.length; i++) {
                        const val = this.value[i];

                        if (option[this.comparisonValue] === Number(val) && !hasSelectedItem(selected, option)) {
                            selected.push(option);
                        }
                    }
                });

                return selected;
            },
            intersectionComparison() {
                let valueArr = this.value.map(item => Number(item));
                let selected = [];

                for (let i = 0; i < this.options.length; i++) {
                    const option = this.options[i];
                    const intersection = option.value.filter(x => valueArr.includes(x));
                    if (intersection.length > 0 && !hasSelectedItem(selected, option)) {
                        selected.push(option);
                    }
                }

                return selected;
            },
            removeOption(idOption){
                const value = this.value.filter(item => {
                    return item.id !== idOption;
                });

                this.updateValue(value);
            },
            showOptionListSelected(){
                const selectedList = this.$el.querySelector('#list-selected');
                const widthSelectedList = selectedList.offsetWidth - 4;
                let selectedListItems = selectedList.querySelectorAll('.item-list-selected');
                const lineClamp = selectedListItems[selectedListItems.length -1];
                if(lineClamp) lineClamp.classList.remove('hidden');

                this.selectedList = [];
                let countShow = 0;
                let widthSelectedListItems = 0;

                let i = 1;
                selectedListItems.forEach( ( item) => {
                    widthSelectedListItems = widthSelectedListItems + item.offsetWidth;

                    if(i !== selectedListItems.length) {
                        if (i === 1 || widthSelectedListItems + lineClamp.offsetWidth  < widthSelectedList) {
                            countShow++;
                        } else {
                            item.parentNode.removeChild(item);
                        }
                    }

                    i++;
                });

                const countHiddenItems  = this.selectedCount - countShow;
                if(countHiddenItems === 0 && lineClamp) lineClamp.classList.add('hidden');

                this.countHiddenListItems = countHiddenItems;
            }
        },
        watch: {
            value: async function (newVal, oldVal) {
                await this.$nextTick();
                this.showOptionListSelected();
            }
        },
        async mounted() {
            this.fillSelectedOnInit();
            await this.$nextTick();
            this.showOptionListSelected();

        },
    };
</script>

<style lang="scss" scoped>
    .dropdown-enter-active {
        animation: 0.25s ease custom-slide-in-top both;
    }

    .dropdown-leave-active {
        animation: 0.15s ease custom-slide-in-top reverse;
    }

    .search-dropdown {
        height: 100%;
        padding: 10px 18px 10px 28px;

        &-title {
            position: relative;
            left: 0;
            height: 100%;
        }

        .search-form__label {
            position: relative;
            top: auto;
            transform: none;

            &--show-selected {
                @apply text-sm pt-8 pl-1 font-semibold xl:pt-0 xl:pl-0;
            }

            &__label--active {
                @apply xl:text-xs;
            }
        }

        &-input--wrapper {
            @apply px-7 relative mb-4;

            span {
                top: 17px;
                left: 38px;
                @apply absolute;
            }

            input {
                padding: 6px 4px;
                height: 45px;
                @apply pl-7 pr-1 py-2 border border-gray-80 text-sm text-gray-300 font-normal rounded;

                &::placeholder {
                    @apply text-sm text-gray-300 font-normal;
                }
            }
        }

        &-scroll {
            overflow-x: hidden;
            overflow-y: auto;
            max-height: 296px;
            height: auto;

            &::-webkit-scrollbar {
                width: 6px;
                @apply bg-gray-90 overflow-hidden;
            }

            &::-webkit-scrollbar-thumb {
                width: 100%;
                height: 30px;
                @apply bg-gray-240;
            }
        }

        &-content {
            position: absolute;
            z-index: 7;
            left: -1px;
            top: 101%;
            width: calc(100% + 2px);
            box-shadow: var(--modal-box-shadow);
            @apply border border-t-0 pt-6 pb-7 pr-2.5 bg-white text-black-400 border-gray-80;
        }

        &-option {
            position: relative;
            display: flex;
            align-items: center;
            transition: all 0.3s var(--custom-transition);
            cursor: pointer;
            @apply py-2 px-7 text-black-400 text-sm border-gray-300;

            &:hover,
            &:focus {
                .search-dropdown-option-square {
                    @apply border-red-500;
                }
            }

            &-square {
                width: 20px;
                height: 20px;
                @apply flex justify-center items-center border border-gray-80 rounded mr-3;

                svg {
                    @apply hidden;
                }
            }

            &--disabled {
                @apply bg-gray-50 text-gray-300;
            }

            &--active {
                .search-dropdown-option-square {
                    @apply border-red-500;

                    svg {
                        @apply inline;
                    }
                }
            }
        }

        &-option-icon {
            display: none;
            width: 20px;
            height: 20px;
            margin-left: 12px;
        }

        &--opened {
            .search-form__label {
                position: absolute;
                transform: translateY(-14px) translateX(4px);
                @apply leading-none text-xs text-gray-200 font-medium uppercase;
            }
        }

        &--filled {
            .search-form__label {
                position: absolute;
                transform: translateY(-14px) translateX(4px);
                @apply leading-none text-xs text-gray-200 font-medium uppercase;
            }
        }
    }

    @screen xl {
        .search-dropdown {
            padding: 18px 20px 18px 20px;

            &-title {
                min-height: 24px;
            }

            &-input {
                padding-top: 0;
            }

            &--opened {
                padding: 28px 20px 8px 25px;

                .search-form__label {
                    transform: translateY(-26px);
                    @apply text-xs;
                }

                .search-dropdown-icon {
                    @apply relative bottom-2.5;
                }
            }

            &--filled {
                padding: 28px 20px 8px 25px;

                .search-form__label {
                    transform: translateY(-20px);
                    @apply text-xs;
                }

                .search-dropdown-icon {
                    @apply relative bottom-2.5;
                }
            }
        }
    }
</style>
