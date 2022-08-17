<template>
    <div class=''>
    <div class="flex items-center mb-10 relative">
        <div class='flex items-center xs:flex-wrap'>
            <h3 class="h3 m-0 mr-4 md:text-2xl mob:text-xl xs:mb-3">Быстрое оформление круиза</h3>
                <popper
                    trigger="click"
                    class='mr-2'
                    style='height: 25px;'
                    :options="{ placement: 'auto' }"
                >
                    <div class="tooltip">
                        <p class='text-base m-0 font-medium text-black-400 relative z-10'>Чтобы забронировать круиз, Вы можете воспользоваться помощью нашего менеджера</p>
                        <div class="popper__arrow"></div>
                    </div>
                    <button
                        slot="reference"
                        type="button"
                    >
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0625 6.77084C14.0625 7.07987 13.9709 7.38196 13.7992 7.63892C13.6275 7.89587 13.3835 8.09614 13.0979 8.2144C12.8124 8.33266 12.4983 8.3636 12.1952 8.30331C11.8921 8.24302 11.6137 8.09421 11.3951 7.87569C11.1766 7.65717 11.0278 7.37876 10.9675 7.07567C10.9072 6.77257 10.9382 6.4584 11.0564 6.17289C11.1747 5.88738 11.375 5.64336 11.6319 5.47167C11.8889 5.29998 12.191 5.20834 12.5 5.20834C12.9144 5.20834 13.3118 5.37296 13.6049 5.66598C13.8979 5.95901 14.0625 6.35644 14.0625 6.77084ZM25 12.5C25 10.0277 24.2669 7.61099 22.8934 5.55538C21.5199 3.49976 19.5676 1.89761 17.2835 0.951511C14.9995 0.00541607 12.4861 -0.242126 10.0614 0.24019C7.63661 0.722505 5.40933 1.91301 3.66117 3.66117C1.91301 5.40933 0.722505 7.63661 0.24019 10.0614C-0.242126 12.4861 0.00541607 14.9995 0.951511 17.2835C1.89761 19.5676 3.49976 21.5199 5.55538 22.8934C7.61099 24.2669 10.0277 25 12.5 25H25V12.5ZM22.9167 12.5V22.9167H12.5C10.4398 22.9167 8.42583 22.3057 6.71281 21.1611C4.9998 20.0165 3.66467 18.3897 2.87626 16.4863C2.08785 14.5829 1.88156 12.4884 2.28349 10.4678C2.68542 8.44718 3.67751 6.5911 5.13431 5.13431C6.5911 3.67751 8.44718 2.68542 10.4678 2.28349C12.4884 1.88156 14.5829 2.08785 16.4863 2.87626C18.3897 3.66467 20.0165 4.9998 21.1611 6.71281C22.3057 8.42583 22.9167 10.4398 22.9167 12.5ZM14.5833 12.5C14.5833 11.9475 14.3638 11.4176 13.9731 11.0269C13.5824 10.6362 13.0525 10.4167 12.5 10.4167H10.4167V12.5H12.5V19.7917H14.5833V12.5Z" fill="#BC002D"/>
                    </svg>
                    </button>
                </popper>
        </div>

        <div
            class="w-8 h-8 flex items-center justify-center ml-auto rounded-full overflow-hidden text-white"
            :class="{'bg-green-400': isFilled, 'bg-gray-50': !isFilled}"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    class="fill-current"
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M14.5607 3.43936C15.1465 4.02516 15.1464 4.97491 14.5606 5.56068L7.56064 12.5604C6.97486 13.1461 6.02517 13.1461 5.43939 12.5604L1.93939 9.06071C1.35357 8.47495 1.35353 7.5252 1.93929 6.93939C2.52505 6.35357 3.4748 6.35353 4.06061 6.93929L6.49998 9.37844L12.4394 3.43932C13.0252 2.85354 13.9749 2.85356 14.5607 3.43936Z"
                    fill="#A6AEBA"
                />
            </svg>
        </div>
    </div>
    <ValidationObserver
        ref="cart-fastbuy-observer"
        tag="form"
        method="post"
        class="cart-fastbuy"
        @submit.prevent="onFastBuySubmit"
    >
        <div
            class="pt-10 pb-11 px-8 border-2 border-gray-50 rounded-sm md:p-8 sm:p-4"
            :class="{'disabled relative': loading}"
        >
            <div v-if="loading" class="absolute z-1 left-0 top-0 w-full h-full flex items-center justify-center">
                <Preloader/>
            </div>

            <div class="flex items-center mb-5">
                <h3 v-if="isManager" class="h3 m-0 mr-4 md:text-2xl mob:text-xl">Менеджер</h3>
                <h3 v-if="isAgent" class="h3 m-0 mr-4 md:text-2xl mob:text-xl">Агент</h3>
                <span v-if="getUser && getUser.name">{{ getUser.name }}</span>
            </div>

            <div class="flex flex-wrap -mx-5 overflow-hidden lg:mx-0">
                <ValidationProvider slim name="fastbuyName" rules="required" v-slot="{ errors }">
                    <div class="cart-fastbuy__item">
                        <label for="fast-name" class="label">{{ isAgentOrManager ? 'Полное имя' : 'Имя' }} <sup class="">*</sup></label>
                        <input
                            type="text"
                            name="name"
                            id="fast-name"
                            class="input bg-transparent border border-gray-50"
                            required
                            :disabled="disabledAttr"
                            autocomplete="off"
                            :placeholder="isAgentOrManager ? 'ФИО' : 'Ваше имя'"
                            @input="onInput"
                            v-model="localCustomer.name"
                        >
                        <ErrorField
                            v-if="errors && Object.keys(errors).length > 0"
                            :text="errors[0]"
                            class="justify-center text-center"
                        />
                    </div>
                </ValidationProvider>

                <ValidationProvider
                    slim
                    name="fastbuyPhone"
                    mode="eager"
                    rules="required|phone"
                    v-slot="{ errors }"
                >
                    <div class="cart-fastbuy__item">
                        <label for="fast-phone" class="label">Телефон <sup class="">*</sup></label>

                            <div class='phone-field-white'>
                            <PhoneComponent
                                name="phone"
                                id="fast-phone"
                                :disabled="disabledAttr"
                                required
                                v-model="localCustomer.phone"
                                @input="onInput"
                            />
                            </div>
                            <ErrorField
                                v-if="errors && Object.keys(errors).length > 0"
                                :text="errors[0]"
                                class="justify-center text-center"
                            />


                    </div>
                </ValidationProvider>

                <PromoCode />

<!--                <div class="cart-fastbuy__item">-->
<!--                    <label for="fast-email" class="label">Почта:</label>-->
<!--                    <input-->
<!--                        type="email"-->
<!--                        name="email"-->
<!--                        id="fast-email"-->
<!--                        class="input"-->
<!--                        :disabled="disabledAttr"-->
<!--                        :placeholder="isAgentOrManager ? 'Почта' : 'Ваша почта'"-->
<!--                        autocomplete="off"-->
<!--                        @input="onInput"-->
<!--                        v-model="localCustomer.email"-->
<!--                    >-->
<!--                    <ErrorField-->
<!--                        v-if="errors && Object.keys(errors).length > 0"-->
<!--                        :text="errors[0]"-->
<!--                        class="justify-center text-center"-->
<!--                    />-->
<!--                </div>-->
            </div>

            <ErrorField v-if="errors && errors.length > 0" class="mb-2" :text="errors[0]"/>

            <div class="flex flex-wrap items-center justify-between text-gray-300 px-6 py-7 bg-green-700 bg-opacity-10 rounded-sm sm:block xs:flex-col">
                <div v-if="isAgentOrManager" class="flex items-center text-base w-full mb-4 sm:text-sm text-red-500">
                    <svg class="w-5 h-5 mr-3" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0625 6.77084C14.0625 7.07987 13.9709 7.38196 13.7992 7.63892C13.6275 7.89587 13.3835 8.09614 13.0979 8.2144C12.8124 8.33266 12.4983 8.3636 12.1952 8.30331C11.8921 8.24302 11.6137 8.09421 11.3951 7.87569C11.1766 7.65717 11.0278 7.37876 10.9675 7.07567C10.9072 6.77257 10.9382 6.4584 11.0564 6.17289C11.1747 5.88738 11.375 5.64336 11.6319 5.47167C11.8889 5.29998 12.191 5.20834 12.5 5.20834C12.9144 5.20834 13.3118 5.37296 13.6049 5.66598C13.8979 5.95901 14.0625 6.35644 14.0625 6.77084ZM25 12.5C25 10.0277 24.2669 7.61099 22.8934 5.55538C21.5199 3.49976 19.5676 1.89761 17.2835 0.951511C14.9995 0.00541607 12.4861 -0.242126 10.0614 0.24019C7.63661 0.722505 5.40933 1.91301 3.66117 3.66117C1.91301 5.40933 0.722505 7.63661 0.24019 10.0614C-0.242126 12.4861 0.00541607 14.9995 0.951511 17.2835C1.89761 19.5676 3.49976 21.5199 5.55538 22.8934C7.61099 24.2669 10.0277 25 12.5 25H25V12.5ZM22.9167 12.5V22.9167H12.5C10.4398 22.9167 8.42583 22.3057 6.71281 21.1611C4.9998 20.0165 3.66467 18.3897 2.87626 16.4863C2.08785 14.5829 1.88156 12.4884 2.28349 10.4678C2.68542 8.44718 3.67751 6.5911 5.13431 5.13431C6.5911 3.67751 8.44718 2.68542 10.4678 2.28349C12.4884 1.88156 14.5829 2.08785 16.4863 2.87626C18.3897 3.66467 20.0165 4.9998 21.1611 6.71281C22.3057 8.42583 22.9167 10.4398 22.9167 12.5ZM14.5833 12.5C14.5833 11.9475 14.3638 11.4176 13.9731 11.0269C13.5824 10.6362 13.0525 10.4167 12.5 10.4167H10.4167V12.5H12.5V19.7917H14.5833V12.5Z" fill="#BC002D"></path></svg>
                    <span class="flex-1-1">
                        В этих полях нужно ввести данные покупателя, а не свои личные!
                    </span>
                </div>

                <div class="text-base flex-1 mr-10 tablet:mr-0 tablet:mb-4 sm:text-sm xs:mb-2">
                    <p class="font-bold text-2xl text-black-900 mb-1">Сделайте быструю бронь</p>
                    <p class="text-black-900 mb-0">Можно не заполнять информацию о туристах, если воспользоваться кнопкой быстрого заказа. Наш менеджер сделает это за Вас.</p>
                </div>

                <button
                    type="submit"
                    class="w-52 button button-transparent border-0 text-xl text-white tablet:w-full"
                    :class="{
                        'bg-green-700': !formFilled,
                        'bg-blue-300': formFilled
                    }"
                    :disabled="disabledAttr"
                >
                    Оформить
                </button>
            </div>
        </div>
    </ValidationObserver>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { parsePhoneMixin } from "@/mixins/content-helpers";
    import Preloader from "@/components/base/Preloader";
    import ErrorField from "@/components/base/ErrorField";
    import PhoneComponent from '@/components/base/PhoneComponent';
    import PromoCode from "@/components/order/PromoCode";
    import Tooltip from '@/components/tooltip/Tooltip';
    import { poperHelpers } from "@/mixins/poper-helper";
    import Popper from 'vue-popperjs';

    function CustomError(name, message) {
        this.name = name || 'CustomError';
        this.message = message || 'Сообщение по умолчанию';
        this.stack = (new Error()).stack;
    }

    function customerValidate(customer) {
        let res = false;

        if (Object.keys(customer).length > 0) {

            for (const [k, value] of Object.entries(customer)) {
                if (k === 'email') continue; // поле не обязательное

                if (!!value) {
                    res = true;
                } else {
                    res = false;
                    break;
                }
            }
        }

        return res;
    }

    export default {
        name: "FastBuyForm",
        components: { PhoneComponent, ErrorField, Preloader, PromoCode, Tooltip, 'popper': Popper },
        mixins: [parsePhoneMixin, poperHelpers],
        data() {
            return {
                loading: false,
                errors: [],
                localCustomer: {
                    name: null,
                    phone: null,
                    email: null,
                },
                isFilled: false,
            };
        },
        computed: {
            ...mapGetters({
                getUser: "users/getUser",
                isLogged: "users/isLogged",
                getCartItems: "cart/getCartItems",
            }),
            prepearedCustomer() {
                return Object.assign({}, this.localCustomer, {
                    phone: this.chParsePhone(this.localCustomer.phone)
                });
            },
            getUserField() {
                return (field) => this.getUser && this.getUser[field] ? this.getUser[field] : null;
            },
            isAgentOrManager() {
                return (this.getUser?.role === 'manager' || this.getUser?.role === 'agent');
            },
            isManager() {
                return (this.getUser?.role === 'manager');
            },
            isAgent() {
                return (this.getUser?.role === 'agent');
            },
            formFilled() {
                return this.localCustomer.name && this.localCustomer.phone;
            },
            disabledAttr() {
                return this.loading || this.bookingFinished ? "disabled" : null;
            },
        },
        methods: {
            ...mapActions({
                fetchCartItems: 'cart/fetchCartItems',
                clearBookingItems: "cart/clearBookingItems",
                getTotalPrices: "cart/getTotalPrices",
            }),
            async onFastBuySubmit() {
                this.errors = null;
                this.loading = true;

                try {
                    await this.validateFormFields();
                    await this.submitForm();
                } catch (ex) {
                    this.loading = false;
                    this.errors = [ex?.message];
                    console.log(ex?.name);
                }
            },
            async submitForm() {
                try {
                    const formData = {
                        formTitle: 'Быстрый заказ (без ввода данных туристов)',
                        customer: this.prepearedCustomer,
                        cruises: this.$store.getters["cart/getBookingItems"],
                    };

                    // запоминаем данные корзины для события OrderIsCreated
                    const _orderItems = [...this.getCartItems];
                    const _totalPrice = 0 + this.getTotalPrices;

                    const { data } = await this.$axios.post("/booking/quick-order", formData);
                    this.$emit("on-fast-buy", data);
                    await this.fetchCartItems();
                    this.clearBookingItems(); // чищу бронь
                    this.loading = false;

                    // глобальный event для метрик
                    const eventDetail = { ...formData, url: this.$route.path };
                    window.dispatchEvent(
                        new CustomEvent('OrderFormSent', { detail: eventDetail })
                    );
                    window.dispatchEvent(
                        new CustomEvent('AnyFormSent', { detail: eventDetail })
                    );
                    window && window.dispatchEvent(
                        new CustomEvent('OrderIsCreated', { detail: { order: _orderItems, price: _totalPrice, result: { order_id: data.order_id } } })
                    );

                } catch (ex) {
                    throw new CustomError("Ошибка быстрого заказа", "Что то пошло не так, попробуте позже.");
                }
            },
            async validateFormFields() {
                const formObserver = this.$refs["cart-fastbuy-observer"];
                const isValid = await formObserver.validate();

                if (!isValid) {
                    const yOffset = document.querySelector(".header").offsetHeight + 20;
                    const y = formObserver.$el.getBoundingClientRect().top + window.pageYOffset - yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                    throw new CustomError("Ошибка валидации быстрого оформления заказа", "Введите правильные данные");
                }
            },
            fillUserFields() {
                if (this.isLogged && !this.isAgentOrManager) {
                    this.localCustomer.name = this.getUserField('name');
                    this.localCustomer.phone = this.getUserField('phone');
                    this.localCustomer.email = this.getUserField('email');
                }
            },
            onInput() {
                this.isFilled = customerValidate(this.localCustomer);
                this.$emit("on-customer-change", {
                    customer: this.prepearedCustomer,
                    filled: this.isFilled,
                });
            },
        },
        mounted() {
            this.fillUserFields();
        },
    };
</script>

<style lang="scss" scoped>
    .cart-fastbuy {
        &__item {
            @apply px-5 w-1/2 lg:w-full lg:px-0 lg:mb-10 lg:last:mb-0;
        }
    }
    .phone-field-white {
        &::v-deep {
            .input {
                @apply bg-transparent border border-gray-50;
            }
        }
    }
    .tooltip-position {
        right: -90px !important;
    }
    .tooltip {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: absolute;
        max-width: 446px;
        background-color: #FFFFFF;
        border: 1px solid #EFEFEF;
        border-radius: 10px;
        box-shadow: 0px 4px 50px rgba(72, 72, 72, 0.25);
        padding: 26px 20px;
        z-index: 2;
    }
    .popper__arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 5px;
    }
    .tooltip[x-placement^="top"] .popper__arrow {
        border-width: 20px 45px 0 45px;
        border-radius: 10px;
        border-color: #ffffff transparent transparent transparent;
        left: calc(50% - 25px);
        bottom: -15px;
        margin-top: 0;
        margin-bottom: 0;
    }
    .tooltip[x-placement^="bottom"] .popper__arrow {
        border-width: 0 20px 20px 20px;
        border-radius: 10px;
        border-color: transparent transparent #ffffff transparent;
        left: calc(50% - 25px);
        top: -12px;
        margin-top: 0;
        margin-bottom: 0;
    }
    .tooltip[x-placement^="right"] .popper__arrow {
        border-width: 20px 20px 20px 0;
        border-radius: 10px;
        border-color: transparent #ffffff transparent transparent;
        left: -15px;
        top: 26%;
        margin-top: 0;
        margin-bottom: 0;
    }
    .tooltip[x-placement^="left"] .popper__arrow {
        border-width: 20px 0 20px 20px;
        border-radius: 10px;
        border-color: transparent transparent transparent #ffffff;
        right: -15px;
        top: 29%;
        margin-top: 0;
        margin-bottom: 0;
    }
    .tooltip[x-placement^="bottom"] {
        top: 20px !important;
    }
    .tooltip[x-placement^="right"] {
        left: 20px !important;
    }
    .stooltip[x-placement^="top"] {
        top: -20px !important;
    }
    .stooltip[x-placement^="left"] {
        left: -20px !important;
    }
</style>
