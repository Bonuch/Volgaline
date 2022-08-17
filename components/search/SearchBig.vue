<template>
    <div class="search-form search-big rounded">
        <div class="search-form__wrap search-form__wrap--top rounded-t">
            <div class="search-form__item search-form__date-departure search-form__item--centered search-form__item--divider rounded-tl">
                <client-only>
                    <v-date-picker
                        class="custom-datepicker--popover-bottom custom-datepicker--with-separate-header custom-datepicker--with-input-full-date"
                        locale="ru"
                        :min-date="new Date()"
                        :popover="{ visibility: 'focus' }"
                        :masks="{ input: ['DD.MM.YYYY']}"
                        is-range
                        @input="onSelect"
                        @popoverDidShow="rotateSearchDropdownIcon(true)"
                        @popoverDidHide="rotateBackSearchDropdownIcon(false)"
                        v-model="formData.departureDate"
                    >
                        <template #header-title="slotProps">
                            <div
                                class="relative w-full h-full"
                                @click.stop=""
                            >
                                <div class="header-input-full-date flex items-center">
                                    <span>c</span>
                                    <input
                                        type="text"
                                        v-mask="'D#.M#.####'"
                                        v-model="clientDepartureDate.start"
                                        @input="alternativeDateInput($event,'start')"
                                    >
                                    <span>по</span>
                                    <input
                                        type="text"
                                        v-mask="'D#.M#.####'"
                                        v-model="clientDepartureDate.end"
                                        @input="alternativeDateInput($event,'end')"
                                    >
                                </div>
                            </div>
                            <div class="flex items-center justify-center w-full text-xs pt-8 pb-1">
                                <div class="flex items-center mr-2 p-2 border border-gray-50 rounded-sm">
                                    <span class="mr-1">{{ slotProps.monthLabel }}</span>
                                    <svg
                                        class="text-gray-300 fill-current"
                                        width="12" height="12" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            class="fill-current"
                                            fill-rule="evenodd" clip-rule="evenodd"
                                            d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                                        />
                                    </svg>
                                </div>

                                <div class="flex items-center p-2 border border-gray-50 rounded-sm">
                                    <span class="mr-1">{{ slotProps.yearLabel }}</span>
                                    <svg
                                        class="text-gray-300 fill-current"
                                        width="12" height="12" viewBox="0 0 18 19" fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            class="fill-current"
                                            fill-rule="evenodd" clip-rule="evenodd"
                                            d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </template>

                        <template v-slot="{ inputValue, togglePopover }">
                            <div class="search-form__date-picker"
                                 :class="{'search-form__date-picker--active':  Object.keys(formData.departureDate).length > 1}"
                                 @click="togglePopover()">
                                <div class="flex-1-1">
                                    <label
                                        class="search-form__label"
                                        :class="{'search-form__label--active': Object.keys(formData.departureDate).length > 1,
                                                'search-form__label--active-red': showCalendar}"
                                    >
                                        Дата отправления
                                    </label>

                                    <input v-if="Object.keys(formData.departureDate).length > 1"
                                        id="departureDate"
                                        class="search-form__date-input"
                                        :class="{'hidden': !formData.departureDate}"
                                           :value="`с ${getMobileDateFormatted(formData.departureDate.start)} по ${getMobileDateFormatted(formData.departureDate.end)} гг`"
                                        readonly
                                    />
                                </div>

                                <svg
                                    v-if="Object.keys(formData.departureDate).length < 2"
                                    class="search-dropdown-icon"
                                    :class="{'search-dropdown-icon__turn-over': showCalendar}"
                                    width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24804 3.93974C2.65855 3.57028 3.29084 3.60356 3.66029 4.01407L7.10242 7.83865L10.5445 4.01407C10.914 3.60356 11.5463 3.57028 11.9568 3.93974C12.3673 4.3092 12.4006 4.94149 12.0311 5.352L7.84571 10.0025C7.65607 10.2132 7.3859 10.3335 7.10242 10.3335C6.81893 10.3335 6.54877 10.2132 6.35912 10.0025L2.17371 5.352C1.80425 4.94149 1.83753 4.3092 2.24804 3.93974Z" fill="#1D1F20"/>
                                </svg>

                                <button
                                    type="button"
                                    class="w-4 h-4"
                                    v-if="Object.keys(formData.departureDate).length > 1"
                                    @click="resetDepartureDate"
                                >
                                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            class="fill-current custom-transition"
                                            fill-rule="evenodd" clip-rule="evenodd"
                                            d="M11.2071 2.20711C11.5976 1.81658 11.5976 1.18342 11.2071 0.792893C10.8166 0.402369 10.1834 0.402369 9.79289 0.792893L6 4.58579L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792893 0.792893C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L4.58579 6L0.792893 9.79289C0.402369 10.1834 0.402369 10.8166 0.792893 11.2071C1.18342 11.5976 1.81658 11.5976 2.20711 11.2071L6 7.41421L9.79289 11.2071C10.1834 11.5976 10.8166 11.5976 11.2071 11.2071C11.5976 10.8166 11.5976 10.1834 11.2071 9.79289L7.41421 6L11.2071 2.20711Z"
                                            fill="#DA3E34"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </template>
                    </v-date-picker>
                </client-only>
            </div>

            <div class="search-form__item search-form__item--centered search-form__item--divider search-form__departure-point">
                <ClientOnly>
                    <SearchDropdown
                        v-if="getFilteredOptions && getFilteredOptions.departure_points"
                        :options="getFilteredOptions.departure_points"
                        label="Место отправления"
                        :lineClampWords="['город', 'города', 'городов']"
                        option-label="title"
                        :searchable="true"
                        @input="onSelect"
                        v-model="formData.departure_points"
                    />
                </ClientOnly>
            </div>


            <div class="search-form__item search-form__item--centered search-form__duration">
                <ClientOnly>
                    <SearchDropdown
                        v-if="getFilteredOptions && getFilteredOptions.duration"
                        :options="getFilteredOptions.duration"
                        label="Продолжительность"
                        :lineClampWords="['продолжительность', 'продолжительности', 'продолжительностей']"
                        option-label="title"
                        comparison-type="intersection"
                        @input="onSelect"
                        v-model="formData.duration"
                    />
                </ClientOnly>
            </div>

            <div class="search-form__item search-form__item--centered search-form__item--divider search-form__ship">
                <ClientOnly>
                    <SearchDropdown
                        v-if="getFilteredOptions && getFilteredOptions.route_points"
                        :options="getFilteredOptions.route_points"
                        label="Город на маршруте"
                        :lineClampWords="['город', 'города', 'городов']"
                        option-label="title"
                        :searchable="true"
                        @input="onSelect"
                        v-model="formData.route_points"
                    />
                </ClientOnly>
            </div>

            <button type="button" class="button search-form__btn search-form__btn--desktop" @click="onSubmit">
                Найти круиз
            </button>
        </div>

        <div class="search-form__wrap search-form__wrap--bottom bg-white border-t border-gray-80 rounded-b">
            <div class="search-form__item search-form__price-range relative bg-white rounded-bl search-form__price">
                <ClientOnly>
                    <div class="flex pt-4 pl-8 2xl:pl-2 xl:pl-0 pb-7 xl:justify-center">

                        <div class="flex items-end mr-6 xl:mr-4 2xl:mr-2">
                            <span class="font-medium">Цена</span>
                        </div>

                        <div class='search-form__price-range-item mr-4 xl:mr-4 2xl:mr-2'>
                            <input
                                id='priceFrom'
                                placeholder="От"
                                type='text'
                                class='text-22 2xl:text-lg'
                                autocomplete='off'
                                @input='(e) => handleRangeSliderInput(e)'
                                @blur='(e) => handleRangeSliderBlur(e)'
                            />
                        </div>

                        <div class='search-form__price-range-item'>
                            <input
                                id='priceTo'
                                placeholder="До"
                                type='text'
                                class='text-22 2xl:text-lg'
                                autocomplete='off'
                                @input='(e) => handleRangeSliderInput(e, 1)'
                                @blur='(e) => handleRangeSliderBlur(e, 1)'
                            />
                        </div>
                    </div>

                    <vue-slider
                        class="custom-range-slider"
                        :min="priceRangeMin"
                        :max="priceRangeMax"
                        :min-range="10"
                        :interval="100"
                        tooltip="none"
                        :use-keyboard="true"
                        :dotSize="24"
                        :height="8"
                        @change="onRangeChange"
                        v-model="formData.priceRange"
                    ></vue-slider>
                </ClientOnly>
            </div>

            <div class="search-form__item search-form__item--centered search-form__ship-bottom-search">
                <ClientOnly>
                    <SearchDropdown
                        v-if="getFilteredOptions && getFilteredOptions.ships"
                        :options="getFilteredOptions.ships"
                        label="Теплоход"
                        :lineClampWords="['теплоход', 'теплохода', 'теплоходов']"
                        :placeholder-search="'Поиск теплохода'"
                        option-label="title"
                        :searchable="true"
                        :paint-disabled-options="false"
                        @input="onSelect"
                        v-model="formData.ships"
                    />
                </ClientOnly>
            </div>

            <div class="search-form__item search-form__item--centered search-form__type-accommodation">
                <ClientOnly>
                    <SearchDropdown
                        v-if="getFilteredOptions && getFilteredOptions.numberOfSeats"
                        :options="getFilteredOptions.numberOfSeats"
                        label="Тип размещения"
                        :lineClampWords="['тип', 'типа', 'типов']"
                        option-label="title"
                        @input="onSelect"
                        v-model="formData.number_seats"
                    />
                </ClientOnly>
            </div>

            <div class="search-form__item search-form__special-offer search-form__item--centered">
                <ClientOnly>
                    <SearchDropdown
                        v-if="getFilteredOptions && getFilteredOptions.specialOffers"
                        :options="getFilteredOptions.specialOffers"
                        label="Спецпредложения"
                        :lineClampWords="['предложение', 'предложения', 'предложений']"
                        option-label="title"
                        :searchable="true"
                        @input="onSelect"
                        v-model="formData.special_offers"
                    />
                </ClientOnly>
            </div>

            <button type="button" class="button search-form__btn hidden xl:block" @click="onSubmit">
                Найти круиз
            </button>

            <div class="flex items-center align-center text-sm justify-end flex-1 xl:pt-1.5">
                <button
                    type="button" class="flex items-center mr-4"
                    v-if="routeHasSearchParams"
                    @click="clearSearch"
                >
                    <span class="text-gray-300 mr-1">Очистить поиск</span>

                    <svg
                        width="7"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512.001 512.001"
                        class="relative"
                        color="#5A6472"
                    >
                        <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                    L284.286,256.002z"></path>
                    </svg>
                </button>

                <button
                    v-if="!modalMode"
                    type="button" class="flex items-center mr-6 text-white"
                    @click="hideSearch"
                >
                    <span class="text-red-500">Скрыть поиск</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce';
    import "vue-slider-component/theme/default.css";
    import { sfmPrepearFormData } from '@/helpers/search';
    import { searchFormMixin } from "@/mixins/search-form-mixin";
    import { poperHelpers } from "@/mixins/poper-helper";
    import { formatCurrency } from '@/helpers/text';
    import { dayjsHelpers} from "@/mixins/content-helpers";

    export default {
        name: "SearchBig",
        components: {
            VueSlider: () => process.client ? (import("vue-slider-component/dist/vue-slider-component.umd.min")) : "",
            SearchDropdown: () =>import("@/components/base/SearchDropdown"),
            BaseCheckbox: () => import("@/components/base/BaseCheckbox"),
        },
        mixins: [searchFormMixin, poperHelpers, dayjsHelpers],
        props: {
            showExpandButton: {
                type: Boolean,
                default: true,
            },
            value: {
                type: Boolean,
            },
            routeHasSearchParams: {
                type: Boolean,
                required: true
            },
            modalMode: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                formData: {
                    departureDate: {},
                    duration: null,
                    departure_points: null,
                    arrival_points: null,
                    route_points: null,
                    ships: null,
                    number_seats: null,
                    special_offers: null,
                    is_weekend: false,
                    priceRange: [0, 300000],
                },
                priceRangeMin: 0,
                priceRangeMax: 300000,
                showCalendar: false,
                clientDepartureDate: {},
                firstActionPriceInput: [false, false]
            };
        },
        methods: {
            onSubmit() {
                if(this.formData.departureDate && Object.keys(this.formData.departureDate).length < 2) this.formData.departureDate = null;

                const preparedData = sfmPrepearFormData(this.formData, this.$dayjs);
                if(!this.formData.departureDate) this.formData.departureDate = {};

                this.$emit("on-search-big-submit", true); // emit for modal
                this.$emit('on-submit', preparedData);
            },
            isValidInput(val) {
                const re = /^\d+$/;
                return re.test(val);
            },
            rangeSliderInit() {
                this.priceRangeMin = this.formData.priceRange[0];
                this.priceRangeMax = this.formData.priceRange[1];
            },
            onRangeChange: debounce(function(val) {
                this.$el.querySelector('#priceFrom').value = formatCurrency(this.formData.priceRange[0]);
                this.$el.querySelector('#priceTo').value = formatCurrency(this.formData.priceRange[1]);

                this.formData.priceRange = val;
                this.onSelect();
            }, 500),
            handleRangeSliderInput(e, index = 0) {
                let val = this.getPrice(e.target.value, index);

                e.target.value = formatCurrency(val);
                if (index === 0 && val > this.formData.priceRange[1]) {
                    // не обновляем комонент, если мин цена выше максимальной
                } else if (index === 1 && val < this.formData.priceRange[0]){
                    // не обновляем комонент, если мин цена выше максимальной
                } else {
                    this.$set(this.formData.priceRange, index, val);
                }
            },
            handleRangeSliderBlur(e, index = 0) {
                let val = this.getPrice(e.target.value, index);

                e.target.value = formatCurrency(val);
               if (index === 1 && val <= this.formData.priceRange[0]) {
                    // если макс цена ниже минимальной
                    const val = Number(this.formData.priceRange[0]) + 1;
                    this.$set(this.formData.priceRange, index, val);
                } else if (index === 0 && val >= this.formData.priceRange[1]) {
                    // если мин цена выше максимальной
                    const val = Number(this.formData.priceRange[1]) - 1;
                    this.$set(this.formData.priceRange, index, val);
                } else {
                    this.$set(this.formData.priceRange, index, val);
                }

                this.onSelect();
            },
            resetDepartureDate() {
                this.$set(this.formData, "departureDate", {});
                this.clientDepartureDate = {};

                const query = sfmPrepearFormData(this.formData, this.$dayjs);
                this.$router.push({ query });
            },
            rotateSearchDropdownIcon(showCalendar) {
                this.showCalendar = showCalendar;
            },
            rotateBackSearchDropdownIcon(showCalendar) {
                this.showCalendar = showCalendar;
            },
            hideSearch(){
                this.$emit('hideSearch')
            },
            clearSearch(){
                this.$emit('clearSearch')
            },
            alternativeDateInput($event,datePoint){
                const input = $event.target.value;
                if (input.length !== 10) return null;

                let date = input.split('.');
                date = date.reverse();
                date = date.join('-');
                this.formData.departureDate[datePoint] = this.dayjsGetISO(date);
            },
            getPrice(val, index) {
                if (val.search('₽') === -1 && this.firstActionPriceInput[index]){
                    val = val.slice(0, -2);
                } else {
                    this.firstActionPriceInput[index] = true;
                }

                val = Number(val.replace(/[^0-9]/g,''));
                if (val > 1500000) val = 1500000;
                if (val < 0) val = 0;

                return val;
            }
        },
        beforeMount() {
            this.rangeSliderInit();
        },
    };
</script>

<style>
.search-expand-btn {
    width: 194px;
    box-shadow: 0px 4px 35px rgba(36, 58, 101, 0.1);
    @apply text-red-500 text-sm font-normal button bg-white border border-gray-90;
}
</style>
