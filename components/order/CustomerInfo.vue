<template>
    <div class="customer-info">
        <div class="flex items-center mb-10 md:mb-5 xs:mb-3">
            <h3 class="h3 m-0 mr-4 md:text-2xl mob:text-xl xs:mb-3">Данные покупателя:</h3>

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
            ref="cart-customer-info-observer"
            tag="div"
            class="cart-fastbuy"
        >
            <div
                class="pt-10 pb-11 px-8 border-2 border-gray-50 rounded-sm md:p-8 sm:p-4"
                :class="{'disabled relative': loading}"
            >
                <div v-if="loading" class="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                    <Preloader/>
                </div>

                <div class="flex flex-wrap -mx-5 overflow-hidden lg:mx-0">
                    <ValidationProvider
                        slim
                        name="customerInfoName"
                        rules="required"
                        mode="aggressive"
                        v-slot="{ errors }"
                    >
                        <div class="cart-fastbuy__item">
                            <label for="customer-info-name" class="label">{{ isAgentOrManager ? 'Полное имя' : 'Имя' }} <sup class="">*</sup></label>
                            <input
                                type="text"
                                name="name"
                                id="customer-info-name"
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
                        name="customerInfoPhone"
                        mode="aggressive"
                        rules="required|phone|min:11"
                        v-slot="{ errors }"
                    >
                        <div class="cart-fastbuy__item">
                            <label for="customer-info-phone" class="label">Телефон <sup class="">*</sup></label>

                            <div class='phone-field-white'>
                                <PhoneComponent
                                    name="phone"
                                    id="customer-info-phone"
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

                    <PromoCode class="mb-0" />
                </div>

                <ErrorField v-if="errors && errors.length > 0" :text="errors[0]"/>
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
        name: "CustomerInfo",
        components: { PhoneComponent, ErrorField, Preloader, PromoCode, Tooltip, Popper },
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
                return (this.isManager || this.isAgent);
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
                return this.loading ? "disabled" : null;
            },
        },
        methods: {
            ...mapActions({
                fetchCartItems: 'cart/fetchCartItems',
                clearBookingItems: "cart/clearBookingItems",
                getTotalPrices: "cart/getTotalPrices",
            }),
            fillUserFields() {
                if (this.isLogged && !this.isAgentOrManager) {
                    this.localCustomer.name = this.getUserField('name');
                    this.localCustomer.phone = this.getUserField('phone');
                    this.localCustomer.email = this.getUserField('email');
                }
            },
            async onInput() {
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
