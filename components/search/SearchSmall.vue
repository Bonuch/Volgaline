<template>
    <form
        method="post"
        class="search-form search-from-small"
        @submit.prevent="onSubmit"
    >
        <div class="search-form__wrap rounded">
            <div class="search-form__item search-form__item--centered search-form__item--divider search-form__date-departure rounded-bl rounded-tl xl:rounded-t">
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
                            <div
                                class="search-form__date-picker"
                                :class="{'search-form__date-picker--active':  Object.keys(formData.departureDate).length > 1}"
                                @click="togglePopover()"
                            >
                                <div class="flex-1-1">
                                    <label
                                        class="search-form__label"
                                        id="search-form-label-date-picker"
                                        :class="{'search-form__label--active': Object.keys(formData.departureDate).length > 1,
                                                'search-form__label--active-red': showCalendar}"
                                    >
                                        Дата отправления
                                    </label>

                                    <input v-if="Object.keys(formData.departureDate).length > 1"
                                        class="search-form__date-input"
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
                        :placeholder-search="'Поиск города'"
                        @input="onSelect"
                        v-model="formData.departure_points"
                    />
                </ClientOnly>
            </div>

            <div class="search-form__item search-form__item--centered search-form__item--divider search-form__duration">
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
                        v-if="getFilteredOptions && getFilteredOptions.ships"
                        :options="getFilteredOptions.ships"
                        label="Теплоход"
                        :placeholder-search="'Поиск теплохода'"
                        option-label="title"
                        :lineClampWords="['теплоход', 'теплохода', 'теплоходов']"
                        :searchable="true"
                        :paint-disabled-options="false"
                        @input="onSelect"
                        v-model="formData.ships"
                    />
                </ClientOnly>
            </div>

            <button type="submit" class="button search-form__btn">Найти круиз</button>

            <div class="search-actions hidden xl:flex w-full mob:flex-wrap items-center justify-end text-base mob:text-xs px-5 pb-5">
                <button
                    type="button" class="flex items-center mr-4 xxs:mr-0 text-gray-300 mob:flex-100 mob:order-1"
                    v-if="routeHasSearchParams"
                    @click="clearSearch"
                >
                    <span class="mr-1.5 text-sm mob:mt-1">Очистить поиск</span>
                    <svg
                        width="7"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512.001 512.001"
                        class="xxs:hidden"
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
                    type="button"
                    class="search-expand-btn mob:flex-100"
                    @click="openFullSearch"
                >
                    <span>Расширенный поиск</span>
                </button>
            </div>

        </div>
    </form>
</template>

<script>
    import { sfmPrepearFormData } from '@/helpers/search';
    import { searchFormMixin } from "@/mixins/search-form-mixin";
    import { poperHelpers } from "@/mixins/poper-helper";
    import SearchDropdown from '@/components/base/SearchDropdown';
    import { dayjsHelpers} from "@/mixins/content-helpers";

    export default {
        name: "SearchSmall",
        components: { SearchDropdown },
        mixins: [searchFormMixin, poperHelpers, dayjsHelpers],
        props: {
            value: {
                type: Boolean,
            },
            routeHasSearchParams: {
                type: Boolean,
                required: true
            },
        },
        data() {
            return {
                formData: {
                    departureDate: {},
                    duration: null,
                    departure_points: null,
                    ships: null,
                },
                showCalendar: false,
                clientDepartureDate: {
                    start: null,
                    end: null
                }
            };
        },
        methods: {
            async onSubmit() {
                if(this.formData.departureDate && Object.keys(this.formData.departureDate).length < 2) this.formData.departureDate = null;

                const preparedData = sfmPrepearFormData(this.formData, this.$dayjs);
                if(!this.formData.departureDate) this.formData.departureDate = {};

                this.$emit('on-submit', preparedData);
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
            alternativeDateInput($event,datePoint){
                const input = $event.target.value;
                if (input.length !== 10) return null;

                let date = input.split('.');
                date = date.reverse();
                date = date.join('-');
                this.formData.departureDate[datePoint] = this.dayjsGetISO(date);
            },
            openFullSearch(){
                this.$emit('openFullSearch');
            },
            clearSearch(){
                this.$emit('clearSearch')
            },
        },
    };
</script>

<style lang="scss" scoped>
</style>
