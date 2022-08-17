<template>
    <div class="page-inner page-choose-cabin pt-6 pb-28 xl:pb-20 md:pb-12 bg-white">
        <div class="wrapper wrapper-1740">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-6"/>
            <h1 v-if="title" class="hidden">{{ title }}</h1>
        </div>

        <template v-if="choicesData">
            <section class="mb-15 pb-15 tablet:mb-10 tablet:pb-10 border-b border-gray-60">
                <div class="wrapper wrapper-1410 cabin-scheme-size">
                    <div class="flex justify-between items-center gap-2.5">
                        <div v-if="previewCabin" class="mb-10 max-w-sm tablet:mb-0 pl-7 pt-5 pr-16 pb-6 md:pb-0 md:pl-0 rounded bg-blue-300 md:bg-transparent bg-opacity-5">
                            <p class='font-medium text-3xl text-black-400 mb-5 tablet:mb-2'>Вы бронируете:</p>
                            <h2 v-if="previewCabin.title"
                                class="page-inner-h1 text-30 text-blue-900 normal-case font-medium mb-3 tablet:mb-2">
                                Каюта&nbsp;№&nbsp;{{ previewCabin.title }}
                            </h2>
                            <p
                                v-if="previewCabin.type"
                                class="m-0 text-xs text-red-500 font-medium  uppercase leading-snug"
                            >
                                {{ previewCabin.type }}
                            </p>
                            <p class="text-22 text-green-700 font-medium mt-8 mb-0 tablet:mt-5"
                               v-for="(item, indexIdx) in cruisePrices.price.slice(0,1)" :key="indexIdx"
                            >от {{ item.prices.adult | formatPrice }}/чел.</p>
                        </div>

                        <div class="flex flex-col">
                            <ChooseCabinDeckScheme
                                v-if="choicesData.deck && Object.keys(choicesData.deck).length > 0"
                                class="w-full mb-10 xl:mb-5 tablet:hidden"
                                :name="choicesData.deck.title"
                                :availability="choicesData.deck.count"
                                :scheme="choicesData.deck.image_1410_1180"
                                :schemeSvg="choicesData.deck.scheme_svg_code"
                                :cabin-types="[]"
                                :cabins="choicesData.cabins"
                                @on-svg-cabin-click="handleSvgCabinClick"
                            />
                            <div class="flex justify-start items-center tablet:hidden">
                                <div class="flex flex-col mr-8 xl:mr-4 pb-3">
                                    <p v-if="choicesData.shipName" class="text-xl text-black-400 mb-0">{{ choicesData.shipName }}</p>
                                    <p class="text-xs text-gray-300 mb-0">{{ previewCabin.type }}</p>
                                </div>
                                <div class='flex flex-wrap'>
                                    <div class="chosen-cabin-dec flex items-center text-sm text-gray-300 pr-7 xl:pr-3 pb-3 tablet:pr-3">Выбранная вами каюта</div>
                                    <div class="free-cabin-dec flex items-center text-sm text-gray-300 pr-7 xl:pr-3 pb-3 tablet:pr-3">Свободные каюты</div>
                                    <div class="booked-cabin-dec flex items-center text-sm text-gray-300 pb-3">Занятые каюты</div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <div class="wrapper wrapper-1410">
                <div class="page-with-sidebar">
                    <div class="page-with-sidebar__left">

                        <div class="flex flex-col">
                            <h3 class="text-2xl font-medium">Описание каюты</h3>
                            <ChoosedCabin
                                v-if="previewCabin && Object.keys(previewCabin).length > 0"
                                :cabin="previewCabin"
                            />
                        </div>

                        <ClientOnly>
                            <ValidationObserver
                                ref="observer"
                                tag="form"
                                method="post"
                                class="booking-form "
                                :class="{ 'disabled': addingToCart }"
                                @submit.prevent="onFormSubmit"
                            >
                                <div class='hidden md:block'>
                                    <h3 class="text-2xl font-medium page-choose-cabin__h3">Информация о круизе</h3>

                                    <template v-if="getCartItems && getCartItems.length > 0">
                                        <TotalItem
                                            v-for="(cartItem, cartItemIdx) in getCartItems"
                                            :key="`total-item-${cartItemIdx}`"
                                            :count="cartItemIdx"
                                            :cart-item="cartItem"
                                        />
                                    </template>

                                    <div
                                        v-if="cmCruiseTariffPrice(this.prices) > 0
                                        || cmExcursionsPrice(this.getSelectedEx) > 0"
                                        class="md:hidden block mt-8 md:mt-4 border rounded border-gray-50 py-10 md:py-6 px-7 md:px-5"
                                    >

                                        <div class="mb-12 border-b border-gray-50">
                                            <div
                                                v-for="(totalPrice, totalPriceIdx) in cmTotalPrices(this.prices, this.getSelectedEx).slice(2,3)"
                                                :key="`totalPrice-${totalPriceIdx}`"
                                                class="flex items-center justify-between md:flex-col mb-1 last:m-0 font-medium"
                                            >
                                            <span class="text-4xl md:text-2xl md:mr-auto font-medium">
                                                Стоимость круиза
                                            </span>
                                                <span class="text-4xl md:text-2xl md:mr-auto font-medium">
                                                {{ formattedPrice(totalPrice.value) }}
                                            </span>
                                            </div>
                                            <div class='mt-5 mb-7'>
                                                <p class="m-0 font-normal text-13 text-red-400 leading-5">
                                                    Цены указаны без учета скидок и&nbsp;спецпредложений. Актуальную цену Вам озвучит менеджер! Скидки до&nbsp;21%
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            class="booking-form__buttons flex flex-wrap mt-6 justify-between xxl:gap-2"
                                            :class="{ 'relative': addingToCart }"
                                        >
                                            <div
                                                v-if="addingToCart"
                                                class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
                                            >
                                                <Preloader />
                                            </div>

                                            <button
                                                type="button"
                                                class="booking-form__button button button-large font-medium w-full max-w-xs xxl:max-w-none xl:max-w-xs tabletLg:max-w-none !text-15 bg-green-700 mr-2 xxl:mr-0 md:w-full tablet:ml-auto"
                                                :class="{'opacity-50 pointer-events-none': !canGoToOrdering}"
                                                :disabled="disableButtons"
                                                @click="goToOrdering"
                                            >
                                                Перейти к оформлению
                                            </button>

                                            <button
                                                type="submit"
                                                class="booking-form__button button button-bordered font-medium !text-15 button-large xxl:w-full xl:w-auto md:leading-5 tabletLg:w-full"
                                                :disabled="disableButtons"
                                            >
                                                Добавить в корзину и продолжить выбор круизов
                                            </button>

                                        </div>
                                    </div>
                                    <p v-else class="leading-none m-0">Корзина пуста</p>
                                </div>

                                <div class='py-4 px-7 md:px-0 rounded bg-blue-300 md:bg-transparent bg-opacity-5'>
                                    <div
                                        v-if="choicesData.cabins"
                                        class="mb-8 md:mb-4 hidden"
                                        :class="{ 'hidden tablet:block': choicesData.deck && choicesData.deck.scheme_svg_code }"
                                    >
                                        <h3 class="page-choose-cabin__h3 h3">
                                            Выберите одну из свободных кают <sup class="text-red-400">*</sup>
                                        </h3>

                                        <p v-if="hasSharing" class="flex items-center">
                                            <span class="w-5 h-5 mr-2 bg-blue-900 rounded-sm"></span>
                                            <span class="text-lg text-gray-300">Каюты с подселением</span>
                                        </p>

                                        <ValidationProvider tag="div" name="Cabin" rules="required" v-slot="{ errors }">
                                            <input type="text" class="hidden" v-model="cabinID"/>
                                            <div class="flex flex-wrap">
                                                <ChooseRadio
                                                    v-for="item in choicesData.cabins"
                                                    :key="item.cabin_id"
                                                    :id="`cabin-number-${item.number}`"
                                                    name="cabinID"
                                                    :label="item.number"
                                                    :value="item"
                                                    class="mb-6 mr-4 last:mr-0"
                                                    :labelClasses="[{'text-blue-900 border-blue-900': item.sharing}, 'base-radio__label--fluid p-4']"
                                                    @input="onChooseCabin"
                                                />
                                            </div>

                                            <ErrorField
                                                v-if="errors && Object.keys(errors).length > 0"
                                                :text="errors[0]"
                                                class="w-64 justify-center text-center"
                                            />
                                        </ValidationProvider>
                                    </div>

                                    <div
                                        v-if="places && places.length > 0"
                                        class="mb-4 choose-place "
                                    >
                                        <h3 class="page-choose-cabin__h3 text-2xl font-medium ">
                                            Выберите размещение
                                        </h3>

                                        <ValidationProvider tag="div" name="Places" rules="required" v-slot="{ errors }">
                                            <input type="text" class="hidden" v-model="place"/>
                                            <div
                                                class="flex flex-wrap"
                                                :class="{ 'opacity-50 pointer-events-none': !cabinID }"
                                            >
                                                <ChooseRadio
                                                    v-for="(item) in places"
                                                    :key="`places-id-${item.id}`"
                                                    :id="`places-id-${item.id}`"
                                                    name="places"
                                                    :label="item.label"
                                                    :value="item"
                                                    label-classes="base-radio__label--blue"
                                                    class="mb-6 mr-4 last:mr-0"
                                                    @input="onChoosePlace"
                                                />
                                            </div>

                                            <ErrorField
                                                v-if="errors && Object.keys(errors).length > 0"
                                                :text="errors[0]"
                                                class="w-64 justify-center text-center"
                                            />
                                        </ValidationProvider>
                                    </div>

                                    <div
                                        v-if="selectedCabin && selectedCabin.sharing"
                                        class="mb-8 md:mb-6 choose-place"
                                    >
                                        <h3 class="page-choose-cabin__h3 h3">
                                            Выберите место <sup class="text-red-400">*</sup>
                                        </h3>

                                        <ValidationProvider
                                            tag="div"
                                            name="Positions"
                                            :rules="`required|length:${numberSeats}`"
                                            v-slot="{ errors }"
                                        >
                                            <input type="text" class="hidden" v-model="positions"/>

                                            <div
                                                class="flex flex-wrap justify-between"
                                                :class="{ 'opacity-50 pointer-events-none': !cabinID }"
                                            >
                                                <ChooseSelect
                                                    v-for="(item, idx) in numberSeats"
                                                    :key="`place-position-id-${idx}`"
                                                    :id="`place-position-id-${idx}`"
                                                    :name="`place-position-id-${idx}`"
                                                    :prices="selectedCabin.positions"
                                                    :idx="idx"
                                                    class="price-input"
                                                    v-on:on-price-change="onChoosePosition"
                                                />
                                            </div>

                                            <ErrorField
                                                v-if="errors && Object.keys(errors).length > 0"
                                                :text="errors[0]"
                                                class="w-64 justify-center text-center"
                                            />
                                        </ValidationProvider>
                                    </div>

                                    <div v-if="touristTariffs && touristTariffs.length > 0" class="">
                                        <h3 class="page-choose-cabin__h3 h3 text-2xl font-normal normal pt-7 border-t border-gray-60">
                                            Выберите тариф
                                        </h3>

                                        <ValidationProvider
                                            name="Prices"
                                            :rules="`required|length:${numberSeats}`"
                                            tag="div"
                                            v-slot="{ errors }"
                                        >
                                            <input type="text" class="hidden" v-model="prices"/>

                                            <div :class="{ 'opacity-50 pointer-events-none': !cabinID }">
                                                <ChoosePrice
                                                    v-for="(item, idx) in numberSeats"
                                                    :key="`passenger-price-${idx}`"
                                                    :id="`passenger-price-${idx}`"
                                                    :name="`passenger-price-${idx}`"
                                                    :prices="touristTariffs"
                                                    :idx="idx"
                                                    class="price-input"
                                                    @on-price-change="onPriceChange"
                                                />

                                                <div
                                                    v-if="places && places.length > 0"
                                                    class="price-input price-input-numeric input border input--gray py-3 flex items-center justify-between mob:flex-col mob:items-center mob:text-center"
                                                >
                                                    <div
                                                        class="price-input-numeric__text mr-3 text-lg font-bold leading-1-1 sm:text-base mob:mb-3"
                                                    >
                                                        Ребенок без&nbsp;места, без&nbsp;питания&nbsp;-&nbsp;Бесплатно<br/>
                                                        (доступно мест&nbsp;-&nbsp;
                                                        {{ availableKidsPlaces(numberSeats) }})
                                                    </div>

                                                    <NumericControls
                                                        class="price-input-numeric__controls sm:py-2 sm:text-base"
                                                        :total="Number(numberSeats)"
                                                        @on-numeric-value-change="onKidsSelect"
                                                    />
                                                </div>
                                            </div>

                                            <ErrorField
                                                v-if="errors && Object.keys(errors).length > 0"
                                                :text="errors[0]"
                                                class="w-64 justify-center text-center"
                                            />
                                        </ValidationProvider>
                                    </div>

                                    <div v-if="choicesData.days && choicesData.days.length > 0">
                                        <h3 class="page-choose-cabin__h3 h3">Дополнительные услуги</h3>
                                        <div>
                                            <button
                                                type="button"
                                                class="flex items-center justify-between w-full py-8 px-5 pr-7 bg-gray-50 text-base text-gray-300 rounded-sm overflow-hidden"
                                                :class="{ 'rounded-b-none': showExcursions, 'opacity-50 pointer-events-none': !cabinID }"
                                                @click="showExcursions = !showExcursions"
                                            >
                                                <span>Выбрать экскурсии</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="19"
                                                    viewBox="0 0 18 19"
                                                    fill="none"
                                                    class="fill-current"
                                                    :class="{ 'transition transform rotate-180': showExcursions }"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                                                        fill="#5A6472"
                                                    />
                                                </svg>
                                            </button>

                                            <transition name="excursions">
                                                <div
                                                    v-if="showExcursions && choicesData.days"
                                                    class="p-5 border border-t-0 border-gray-50 rounded-sm"
                                                    :class="{ 'rounded-t-none': showExcursions }"
                                                >
                                                    <ChooseCabinExcursion
                                                        v-for="(item, idx) in choicesData.days"
                                                        :key="idx"
                                                        :item="item"
                                                        :total-tourists="numberSeats"
                                                        class="page-choose-cabin__excursion-item"
                                                    />
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    v-if="cmCruiseTariffPrice(this.prices) > 0
                                        || cmExcursionsPrice(this.getSelectedEx) > 0"
                                    class="mt-8 md:mt-4 border rounded border-gray-50 py-10 md:py-6 px-7 md:px-5"
                                >

                                    <div class="mb-12 border-b border-gray-50">
                                        <div
                                            v-for="(totalPrice, totalPriceIdx) in cmTotalPrices(this.prices, this.getSelectedEx).slice(2,3)"
                                            :key="`totalPrice-${totalPriceIdx}`"
                                            class="flex items-center justify-between md:flex-col mb-1 last:m-0 font-medium"
                                        >
                                            <span class="text-4xl md:text-2xl md:mr-auto font-medium">
                                                Стоимость круиза
                                            </span>
                                            <span class="text-4xl md:text-2xl md:mr-auto font-medium">
                                                {{ formattedPrice(totalPrice.value) }}
                                            </span>
                                        </div>
                                        <div class='mt-5 mb-7'>
                                            <p class="m-0 font-normal text-13 text-red-400 leading-5">
                                                Цены указаны без учета скидок и&nbsp;спецпредложений. Актуальную цену Вам озвучит менеджер! Скидки до&nbsp;21%
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        class="booking-form__buttons flex flex-wrap mt-6 justify-between xxl:gap-2"
                                        :class="{ 'relative': addingToCart }"
                                    >
                                        <div
                                            v-if="addingToCart"
                                            class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
                                        >
                                            <Preloader />
                                        </div>

                                        <button
                                            type="button"
                                            class="booking-form__button button button-large font-medium w-full max-w-xs xxl:max-w-none xl:max-w-xs tabletLg:max-w-none !text-15 bg-green-700 mr-2 xxl:mr-0 md:w-full tablet:ml-auto"
                                            @click="goToOrdering"

                                        >
                                            Перейти к оформлению
                                        </button>

                                        <button
                                            type="submit"
                                            class="booking-form__button button button-bordered font-medium !text-15 button-large xxl:w-full xl:w-auto md:leading-5 tabletLg:w-full"
                                            :disabled="disableButtons"
                                        >
                                            Добавить в корзину и продолжить выбор круизов
                                        </button>

                                    </div>
                                </div>
                            </ValidationObserver>
                        </ClientOnly>
                    </div>

                    <aside class="block md:hidden page-with-sidebar__right">
                        <h3 class="text-2xl font-medium page-choose-cabin__h3">Информация о круизе</h3>

                        <template v-if="getCartItems && getCartItems.length > 0">
                            <TotalItem
                                v-for="(cartItem, cartItemIdx) in getCartItems"
                                :key="`total-item-${cartItemIdx}`"
                                :count="cartItemIdx"
                                :cart-item="cartItem"
                            />
                        </template>

                        <div
                            v-if="cmCruiseTariffPrice(this.prices) > 0
                                        || cmExcursionsPrice(this.getSelectedEx) > 0"
                            class="mt-8 md:mt-4 py-10 md:py-6 px-7 md:px-5"
                        >

                            <div class="hidden mb-12 border-b border-gray-50">
                                <h2 class='text-blue-900 text-lg font-medium'>Стоимость круиза</h2>
                                <div
                                    v-for="(totalPrice, totalPriceIdx) in cmTotalPrices(this.prices, this.getSelectedEx).slice(1,2)"
                                    :key="`totalPrice-${totalPriceIdx}`"
                                    class="flex items-center justify-between md:flex-col mb-1 last:m-0 font-medium"
                                >
                                            <span class="text-15 font-normal">
                                                {{ totalPrice.name }}
                                            </span>
                                    <span class="text-15 font-normal">
                                                {{ formattedPrice(totalPrice.value) }}
                                            </span>
                                </div>
                                <div class='mt-5 mb-7'>
                                    <p class="m-0 font-normal text-13 text-red-400 leading-5">
                                        Цены указаны без учета скидок и&nbsp;спецпредложений. Актуальную цену Вам озвучит менеджер! Скидки до&nbsp;21%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </template>

        <div v-else class="wrapper wrapper-1410">
            <p>Не удалось загрузить каюты, попробуйте перезагрузить страницу.</p>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {groupCruiseExcursionsByDay} from "@/helpers/helpers";
import {formatCurrency} from "@/helpers/text";
import {seoHelper} from "@/mixins/content-helpers";
import {cartMixin} from "@/mixins/cart-mixin";
import Breadcrumbs from "@/components/base/Breadcrumbs";
import ChooseCabinDeckScheme from '@/components/cruise-detail/deck/ChooseCabinDeckScheme';
import ChoosePrice from "@/components/base/ChoosePrice";
import NumericControls from "@/components/base/NumericControls";
import ChooseCabinExcursion from "@/components/cruise-detail/ChooseCabinExcursion";
import TotalItem from '@/components/order/TotalItem';
import TotalPrices from "@/components/order/TotalPrices";
import ChooseRadio from "@/components/base/ChooseRadio";
import ErrorField from "@/components/base/ErrorField";
import ChooseSelect from "@/components/base/ChooseSelect";
import Preloader from "@/components/base/Preloader";
import ChoosedCabin from '@/components/choose-cabin/ChoosedCabin';

export default {
        components: {
            TotalItem,
            ChoosedCabin,
            ChooseCabinDeckScheme,
            Preloader,
            ChooseSelect,
            ErrorField,
            ChooseRadio,
            TotalPrices,
            ChooseCabinExcursion,
            NumericControls,
            ChoosePrice,
            Breadcrumbs,
        },
        mixins: [seoHelper, cartMixin],
        layout: 'without-form',
        head() {
            return {
                title: this.title,
                meta: [
                    // страница выбора кают должна быть запрещена для индексирования, так как создается куча дублей и мешает продвигать сайт
                    { hid: "robots", name: 'robots', content: 'noindex' }
                ],

            };
        },
        data() {
            return {
                title: null,
                breadcrumbs: [],
                choicesData: null,
                places: [
                    {
                        id: 1,
                        label: "1-местное",
                        value: 1,
                    },
                ],
                touristTariffs: [],
                showExcursions: false,
                addingToCart: false,

                cabinID: null, // id каюты для валидации формы
                selectedCabin: null, // каюта
                place: null, // место
                numberSeats: 1, // количество туристов
                prices: [], // цены туристов
                positions: [], // положение для места с подселением
                kids: null, // количество детей
            };
        },
        computed: {
            ...mapGetters({
                getCartItem: "cart/getCartItem",
                getCartItems: "cart/getCartItems",
                getSelectedEx: "excursions/getSelected",
                isLogged: "users/isLogged",
                getModalCb: "modals/getModalCb",
                getCartOperationFinished: "cart/getOperationFinished",
            }),
            canGoToOrdering() {
                return this.getCartItems && this.getCartItems.length > 0;
            },
            prepearedChoisedData() {
                return {
                    cruise_id: this.cruiseID,
                    cabin_id: this.cabinID,
                    passengers: this.prices,
                    children: this.kids,
                    excursions: this.getPrepareExcursions,
                    sharing: this.selectedCabin.sharing || null,
                    positions: this.positions,
                };
            },
            /**
             * есть ли места для подселения
             */
            hasSharing() {
                const filtered = this.choicesData.cabins.filter(cabin => cabin.sharing);
                return filtered.length > 0;
            },
            availableKidsPlaces() {
                return (total) => Number(total) - Number(this.kids);
            },
            /**
             * Приводим экскурсии к виду [ { key: val, etc... } ] из [ { id: 1, list: [excursions] } ]
             * @returns {array|null}
             */
            getPrepareExcursions() {
                let res = [];

                if (this.getSelectedEx && this.getSelectedEx.length > 0) {
                    this.getSelectedEx.forEach(ex => {
                        res = (res.length > 0) ? [...res, ...ex.list] : ex.list;
                    });
                }

                return res.length > 0 ? res : [];
            },
            formattedPrice() {
                return (price) => formatCurrency(price);
            },
            disableButtons() {
                return this.addingToCart ? "disabled": null;
            }
        },
        methods: {
            ...mapActions({
                addItemToCart: "cart/addItemToCart",
                updateCartItem: "cart/updateCartItem",
                updateCartItemOperationFinished: "cart/updateOperationFinished",
                dispatchSelectedExcursions: "excursions/dispatchSelectedExcursions",
                openModal: "modals/openModal",
            }),
            async validateFormFields() {
                const formObserver = this.$refs.observer;
                const isValid = await formObserver.validate();

                if (!isValid) {
                    const yOffset = document.querySelector(".header").offsetHeight + 20;
                    const y = formObserver.$el.getBoundingClientRect().top + window.pageYOffset - yOffset;

                    window.scrollTo({ top: y, behavior: "smooth" });
                    throw new Error("form validation failed");
                }
            },
            async goToOrdering() {
                await this.onFormSubmit();
                await this.$router.push({ path: "/ordering" });
            },
            async onFormSubmit() {
                this.addingToCart = true;

                try {
                    // валидация полей формы
                    await this.validateFormFields();
                    // Вход пользователя
                    // if (!this.isLogged) {
                    //     await this.updateCartItemOperationFinished(false);
                    //     await this.updateCartItem(this.prepearedChoisedData);
                    //     await this.openModal({ name: "ModalRegistration", cb: "addItemToCart" });
                    // } else {
                        await this.addItemToCart(this.prepearedChoisedData);
                    // }

                    if (!!this.getCartOperationFinished) {
                        await this.dispatchSelectedExcursions([]);
                        await this.updateCartItemOperationFinished(false);
                        this.addingToCart = false;
                    }
                } catch (e) {
                    this.addingToCart = false;
                    this.updateCartItemOperationFinished(false);
                    console.log("cant submit form: " + e);
                }
            },
            // Выбор каюты
            onChooseCabin(cabinItem) {
                const svgCabins = document.querySelectorAll('.scheme-block');

                this.$cookies.remove('selectedCabin');

                if (svgCabins && svgCabins.length > 0) {
                    svgCabins.forEach(scheme => {
                        if (scheme.dataset.cabin == cabinItem.number) {
                            scheme.classList.add('active');
                        } else {
                            scheme.classList.remove('active');
                        }
                    });
                }
                // reset
                this.kids = 0;

                // set
                this.selectedCabin = cabinItem;
                this.$set(this.previewCabin, 'title', this.selectedCabin.number);
                // this.$set(this.cruisePrices, 'price', this.selectedCabin.number);
                this.cabinID = cabinItem.cabin_id; // для валидации
                this.places = this.buildPlaces(cabinItem.seats);
                this.$cookies.set('selectedCabin', cabinItem.number, {
                    maxAge: 60 * 60,
                });
                // this.mergePrices(cabinItem.tariffs_prices);
            },
            // Выбор размещения
            onChoosePlace(placeItem) {
                this.kids = 0;
                this.numberSeats = placeItem.value;
                this.place = placeItem.value;

                const tariffs_prices = this.selectedCabin.tariffs_prices.find(tp => tp.number_seats === placeItem.value);
                this.mergePrices(tariffs_prices.prices);

                // при смене размещения изменяем цену
                if (this.prices && this.prices.length > 0) {
                    this.prices = this.prices.slice(0, placeItem.value);
                }
            },
            // Выбор позиции для подселения
            onChoosePosition({ val, idx }) {
                if (!!val) {
                    this.$set(this.positions, idx, val);
                } else {
                    this.positions.splice(idx, 1);
                }
            },
            // Выбор цены
            onPriceChange({ val, idx }) {
                if (!!val) {
                    this.$set(this.prices, idx, val);
                } else {
                    this.prices.splice(idx, 1);
                }
            },
            onKidsSelect(val) {
                this.kids = val;
            },
            buildPlaces(seats) {
                const places = [];
                let i = 0;

                while (i < seats) {
                    const value = i + 1;
                    places.push({ id: value, label: `${value}-местное`, value });
                    i++;
                }

                return places;
            },
            mergePrices(cabinTariffs) {
                const copy = [...this.choicesData.tariffs];
                this.touristTariffs = copy.map(copyItem => {
                    copyItem.price = cabinTariffs[copyItem.type];

                    return copyItem;
                });
            },
            resetFields() {
                this.cabinID = null;
                this.selectedCabin = null;
                this.place = null;
                this.numberSeats = 1;
                this.prices = [];
                this.positions = [];
                this.kids = null;
                this.showExcursions = false;
            },
            handleSvgCabinClick(cabin_number) {
                const $el = this.$el;

                // чистим active
                $el.querySelectorAll('g[data-cabin]').forEach( item => {
                    item.classList.remove('active');
                });

                // подкидываем svg->g активный класс
                const schemeButton = $el.querySelector(`[data-cabin="${cabin_number}"]`);
                if (schemeButton) schemeButton.classList.add('active');

                // выбираем текущую каюту
                const selectedCabinInput = $el.querySelector(`#cabin-number-${cabin_number}`);
                if (selectedCabinInput) {
                    selectedCabinInput.click();
                }
            },
            async chooseSelectedCabinOnInit() {
                await this.$nextTick();
                const $el = this.$el;
                const selectedCabin = this.$cookies.get('selectedCabin');
                const selectedCabinInput = $el.querySelector(`#cabin-number-${selectedCabin}`);

                // выбираем каюту из кук
                if (selectedCabin && selectedCabinInput) {
                    selectedCabinInput.click();
                } else {
                    if (this.choicesData && this.choicesData.cabins && this.choicesData.cabins.length > 0) {
                        const cabinNumber = this.choicesData.cabins[0]['number'];
                        const selectedCabinInput = $el.querySelector(`#cabin-number-${cabinNumber}`);
                        if (selectedCabinInput) selectedCabinInput.click();
                    }
                }
            }
        },
        mounted() {
            this.chooseSelectedCabinOnInit();
        },
        async asyncData({ params, $axios }) {
            const [cruiseID, deckID, cabinCategoryID] = params.id.split("-");
            const title = "Выбор каюты";
            let choicesData = null;
            let breadcrumbs = [];
            let previewCabin = {};
            let cruisePrices = {};

            try {
                const { data } = await $axios.get(`/cruise/${cruiseID}/${deckID}/${cabinCategoryID}`);
                choicesData = data.data;

                breadcrumbs = [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 4,
                        title: "Речные круизы",
                        link: "/rechnye-kruizy",
                    },
                    {
                        id: 2,
                        title: choicesData.cruiseName ? choicesData.cruiseName : "Название круиза",
                        link: `/rechnye-kruizy/${choicesData.cruiseSlug}`,
                    },
                    {
                        id: 3,
                        title,
                        link: "",
                    },
                ];

                if (choicesData.cabinType) {
                    const cabinType = choicesData.cabinType;

                    previewCabin = {
                        title: '',
                        type: cabinType.title,
                        desc: cabinType.desc,
                        gallery: cabinType.photos,
                        main_photo: cabinType.main_photo,
                    }
                }

                if (choicesData.cabins) {
                    for (let item in choicesData.cabins){
                        const getPrice = choicesData.cabins[item]
                        cruisePrices = {
                            price: getPrice.tariffs_prices,
                        }
                    }
                }

                if (choicesData.excursions.length > 0) {
                    choicesData.days = groupCruiseExcursionsByDay(choicesData.excursions);
                }

            } catch (e) {
                console.log("cant fetch choices data: " + e);
            }

            return {
                title,
                breadcrumbs,
                choicesData,
                previewCabin,
                cruisePrices,
                cruiseID: Number(cruiseID),
                cabinCategoryID: Number(cabinCategoryID),
                deckID: Number(deckID),
            };
        },
    };
</script>

<style lang="scss" scoped>
    .excursions-enter-active {
        animation: custom-slide-in-top 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    .excursions-leave-active {
        animation: custom-slide-in-top 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both reverse;
    }

    .price-input {
        width: 100%;
        @apply mb-4;

        &-numeric {
            &__controls {
                width: 116px;
            }
        }
    }

    .cabin-scheme-size {
        &::v-deep {
            .cruise-deck-scheme {
                max-width: 930px;
            }
        }
    }

    .page-choose-cabin {
        &__h3 {
            @apply mb-7;
        }

        .booking-form {
            &__button {
                min-width: 185px;
                @apply py-3 px-6 text-lg;
            }
        }
    }

    .chosen-cabin-dec {
        position: relative;
        &:before {
            content: "";
            margin-right: 10px;
            width: 25px;
            height: 25px;
            background: #218BC8;
            border-radius: 4px;
        }
    }

    .free-cabin-dec {
        position: relative;
        &:before {
            content: "";
            margin-right: 10px;
            width: 25px;
            height: 25px;
            background: #35C768;
            border-radius: 4px;
        }
    }
    .booked-cabin-dec {
        position: relative;
        &:before {
            content: "";
            margin-right: 10px;
            width: 25px;
            height: 25px;
            background: #B7B7B7;
            border-radius: 4px;
        }
    }

    @screen xl {
        .page-choose-cabin {
            .booking-form {
                &__button {
                    @apply text-xl;
                }
            }
        }
    }

    @screen tablet {
        .page-choose-cabin {
            .booking-form {
                &__button {
                    min-width: 224px;
                    @apply py-3 mb-3;
                }
            }
        }
    }

    @screen md {
        .page-choose-cabin {
            &__h3 {
                @apply mb-6 text-2xl;
            }

            &__excursion-item {
                @apply pb-5 mb-4 border-b border-gray-50;

                &:last-child {
                    border: 0;
                    padding-bottom: 0;
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
