<template>
    <div class="cruises-by-month relative ">
        <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex">
            <Preloader class="m-auto"/>
        </div>

        <div class="cruise-line-table cruise-line-table--front-page xxl:hidden wrapper wrapper-1410">
            <div
                class="month-cruise-search mb-10"
            >
                <ul class="month-cruise-search-wrap flex flex-wrap items-center justify-between xl:justify-around m-0">
                    <li
                        v-for="(item, idx) in monthsSeasons"
                        :key="`month-cruise-search-${idx}`"
                        class="month-cruise-search-item xs:w-full"
                    >
                        <button
                            class="month-cruise-search-link py-3.5 border border-gray-90 rounded flex items-center justify-center custom-transition text-base font-medium extra:text-sm capitalize"
                            :class="{ 'active': idx === 0}"
                            @click="getCruises(item, $event)"
                        >
                            {{item.title}}
                        </button>
                    </li>
                </ul>
            </div>

            <template v-if="cruises && cruises.length > 0">
                <div class="cruise-line-table__row cruise-line-table__heading mb-0">
                    <div
                        class="cruise-line-table__item text-gray-300 text-sm pb-4 pt-0"
                        v-for="(headingItem, headingIdx) in headings"
                        :key="headingIdx"
                    >
                        {{ headingItem }}
                    </div>
                </div>
                <div class="cruise-line-table__body">
                    <CruiseLineItem
                        v-for="(cruiseItem) in cruises"
                        :key="`cruise-line-${cruiseItem.id}`"
                        :item="cruiseItem"
                        :front-page="true"
                    />
                </div>
            </template>
            <template v-else>
                <div>
                    <p class="font-medium text-red-500">В этом месяце круизы отсутствуют</p>
                </div>
            </template>
        </div>

        <div class="hidden xxl:flex sm:w-full mb-5 wrapper wrapper-1410">
            <div class="w-1/2 tablet:w-full">
                <v-select
                    class="custom-select custom-select-price custom-slider-front"
                    label="title"
                    :searchable="false"
                    :placeholder="'Выберите месяц'"
                    :options="monthsSeasons"
                    v-model="monthSelect"
                    @input="getCruises"
                >
                    <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24755 3.9395C2.65806 3.57004 3.29035 3.60331 3.65981 4.01382L7.10193 7.8384L10.5441 4.01383C10.9135 3.60331 11.5458 3.57004 11.9563 3.9395C12.3668 4.30895 12.4001 4.94124 12.0306 5.35175L7.84522 10.0022C7.65558 10.2129 7.38542 10.3333 7.10193 10.3333C6.81844 10.3333 6.54828 10.2129 6.35864 10.0022L2.17322 5.35175C1.80376 4.94124 1.83704 4.30895 2.24755 3.9395Z" fill="#1D1F20"/>
                        </svg>
                    </span>
                    </template>
                </v-select>
            </div>
        </div>


        <div class="hidden xxl:block wrapper wrapper-1410 tablet:pr-0">
            <template v-if="cruises && cruises.length > 0">
                <div class="swiper-container pb-10">
                    <div class="swiper-wrapper">
                        <CruiseMobileItem
                            v-for="(cruiseItem) in cruises"
                            :key="`cruise-mobile-item-${cruiseItem.id}`"
                            :item="cruiseItem"
                            class="swiper-slide"
                        />
                    </div>
                    <div class="base-mobile-slider-swiper-pagination round-pagination swiper-pagination-clickable swiper-pagination-bullets mx-auto w-full"></div>
                </div>
            </template>
            <template v-else>
                <div>
                    <p class="font-medium text-red-500">В этом месяце круизы отсутствуют</p>
                </div>
            </template>
        </div>

        <div
            class="w-full flex justify-center wrapper wrapper-1410"

        >
            <button
                type="button"
                class="button mt-10 font-normal px-8 py-2 sm:flex-100 sm:bg-white sm:border sm:border-red-500 sm:text-red-500"
                @click="onShowMoreClick"
            >
               Показать ещё
            </button>
        </div>
    </div>
</template>

<script>
    import CruiseLineItem from "@/components/cruise-section/CruiseLineItem";
    import CruiseMobileItem from "@/components/front/CruiseMobileItem";
    import {  sfmPrepearFormData } from '@/helpers/search';
    import Swiper from "swiper/bundle";
    import {dayjsHelpers} from "@/mixins/content-helpers";
    import Preloader from "@/components/base/Preloader";
    import {mapGetters} from "vuex";

    export default {
        name: "CruisesByMonth",
        components: {CruiseLineItem, CruiseMobileItem, Preloader},
        mixins: [dayjsHelpers],
        props: {
            cruises: {
                type: Array,
                required: true
            },
            showMoreVisible: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                headings: [
                    'Дата отправления и прибытия',
                    'Дней',
                    'Маршрут',
                    'Теплоход',
                    'Количество кают',
                    'Цена от',
                    '',
                ],
                monthsSeasons: [],
                monthSelect: null,
                loading: false
            }
        },
        computed: {
            ...mapGetters({
                getInnerCruisesOrientation: "getInnerCruisesOrientation",
                getWindowWidth: "getWindowWidth",
            }),
        },
        methods: {
            async getCruises(item, event = null) {
                this.loading = true;

                try{
                    const queryParams = sfmPrepearFormData({departureDate: item.date}, this.$dayjs);

                    const { data } = await this.$axios.get("/cruise/search", { params: queryParams });

                    this.$emit('cruisesByMonths', data.data);
                    this.$nextTick(() => {
                        this.bannersSwiper.update();
                        if(event) this.changeTab(event.target);

                    });
                }catch (ex) {
                    console.log('cant fetch cruises by month: ' + ex);
                }

                this.loading = false;
            },
            initSwiper() {
                const $el = this.$el;
                const container = $el.querySelector('.swiper-container');
                const pagination = $el.querySelector('.round-pagination');
                const buttons = $el.querySelectorAll('.swiper-button');
                let prev = buttons[0];
                let next = buttons[1];

                if ($el) {
                    const bannersSwiper = new Swiper(container, {
                        slidesPerView: "auto",
                        spaceBetween: 30,
                        autoHeight: false,
                        lazy: true,
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
                        },
                        pagination: {
                            el: pagination,
                            clickable: true,
                        },
                        breakpoints: {
                            769: {
                                slidesPerView: "auto",
                                spaceBetween: 50,
                            },
                            1281: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        },
                    });

                    this.bannersSwiper = bannersSwiper;
                }
            },
            createMonthTabs() {
                const amountMonth = 10;
                const currentDate = new Date;

                let currentYear = currentDate.getFullYear();
                let currentMonth = currentDate.getMonth() + 1;
                currentMonth = currentMonth >= 4 || currentMonth <= 10? currentMonth: 4;

                const currentDay = this.$dayjs().format('DD');

                let i = 0;
                while (i < amountMonth) {

                    if(currentMonth >= 12) {
                        currentYear++;
                        currentMonth = 4;
                    }

                    const currentMonthOutStart = currentMonth < 10? `0${currentMonth}`: currentMonth;
                    const currentMonthOutEnd = currentMonth + 1 < 10? `0${currentMonth + 1}`: currentMonth + 1;

                    let month = {
                        title: `${this.dayjsGetMonth(`${currentYear}-${currentMonthOutStart}-01T00:00:00.000Z`)} ${currentYear}`,
                        date: {
                            'start': `${currentYear}-${currentMonthOutStart}-01T00:00:00.000Z`,
                            'end': `${currentYear}-${currentMonthOutEnd}-01T00:00:00.000Z`,
                        }
                    }

                    if(`${currentYear}-${currentMonthOutStart}` === this.$dayjs().format('YYYY-MM')){
                        month.date.start = `${currentYear}-${currentMonthOutStart}-${currentDay}T00:00:00.000Z`;
                    }

                    this.monthsSeasons.push(month);
                    currentMonth++
                    i++;
                }

                this.monthSelect = this.monthsSeasons[0];
            },
            changeTab(tab){
                const $el = this.$el;
                const tabs = $el.querySelectorAll('.month-cruise-search-link');

                tabs.forEach( item => {
                    item.classList.remove('active');
                });

                tab.classList.add('active');
            },
            onShowMoreClick() {
                this.$emit("on-show-more-click", true);
            },
        },
        created() {
            this.createMonthTabs();
        },
        mounted() {
            this.initSwiper();
        },
    }

</script>

<style lang="scss" scoped>

.custom-slider-front {
    height: 60px;
    @apply bg-gray-120 text-black-400 rounded-sm;
}

.cruises-by-month{
    .month-cruise-search {
        &-link {
            box-shadow: 0 4px 35px rgba(36, 58, 101, 0.1);
            cursor: pointer;
            @apply rounded-sm px-4 py-3;

            &:hover,
            &:focus,
            &:active {
                @apply bg-blue-50;
            }
        }
    }

    .active {
        @apply bg-blue-300 text-white;

        &:hover,
        &:focus,
        &:active {
            @apply bg-blue-300 text-white;
        }
    }

    &::v-deep {
        .swiper-slide {
            display: flex;
            flex-direction: column;
            height: auto;
        }

        .round-pagination {
            bottom: -30px;
        }
    }
}

</style>
