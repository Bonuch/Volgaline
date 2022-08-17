<template>
    <div class="page-inner page-cart pt-6">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="mb-8"/>

            <h1 v-if="title" class="page-inner-h1 mb-23 tablet:mb-10">
                {{ title }}
            </h1>

            <div class="page-with-sidebar">
                <div class="page-with-sidebar__left">
                    <client-only>
                        <FastBuyForm
                            v-if="hasCartItems"
                            class="page-cart__item"
                            @on-fast-buy="onFastBuyTrigger"
                        />
                    </client-only>

                    <div class='flex items-center mb-10 md:mb-5 relative'>
                        <h3 class="h3 m-0 pr-4 md:text-2xl mob:text-xl">Онлайн - бронирование круиза</h3>

                        <Popper
                            trigger="click"
                            class='mr-2'
                            style='height: 25px;'
                            :options="{ placement: 'auto' }"
                        >
                            <div class="tooltip">
                                <p class='text-base m-0 font-medium text-black-400 relative z-10'>Забронируйте круиз самостоятельно</p>
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
                        </Popper>
                    </div>

                    <form
                        v-if="hasCartItems && showForm"
                        method="post"
                        ref="bookingForm"
                        @submit.prevent="onBookingFormSubmit"
                    >
                        <div class="page-cart__list">
                            <div
                                v-for="(item) in getCartItems"
                                :key="item.id"
                                class="page-cart__item"
                            >
                                <BookingItem :cart-item="item"/>
                            </div>
                        </div>

                        <client-only>
                            <CustomerInfo
                                v-if="hasCartItems"
                                id="customer-info"
                                @on-customer-change="onCustomerChange"
                            />
                        </client-only>

                        <div class="hidden">
                            <button
                                id="booking-form-submit-button"
                                type="submit"
                                class="button button-bordered button-large xs:w-full"
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </form>

                    <p v-else>
                        Закажите круиз
                        <nuxt-link to="/rechnye-kruizy" class="text-blue-400 link-inline">тут</nuxt-link>
                    </p>
                </div>

                <aside class="page-with-sidebar__right">
                    <h3 class='text-2xl font-medium text-black-400'>Ваш круиз</h3>
                    <template v-if="hasCartItems">
                        <div
                            class="mb-5 hidden"
                            v-if="getDiscountType"
                        >
                            <span class="uppercase text-xs font-medium px-2.5 py-2 text-white bg-green-700 rounded">Купон применен - 15%</span>
                        </div>

                        <TotalItem
                            v-for="(cartItem, cartItemIdx) in getCartItems"
                            :key="cartItemIdx"
                            :cart-item="cartItem"
                            :count="cartItemIdx"
                        />

                        <TotalPrices
                            class='total-prices--gray rounded-none'
                            @on-button-click="onAsideBookingSubmitClick"
                        >
                            <template v-slot:button>Оформить заказ</template>
                        </TotalPrices>


                        <div class="py-4 px-5 font-medium bg-red-400 text-base leading-snug text-white mob:text-sm">
                            <h4 class="mb-1 uppercase">Внимание</h4>
                            <p class="m-0 mb-2">
                                Цены указаны без учета скидок и&nbsp;спецпредложений.<br>
                                Актуальную цену Вам озвучит менеджер!
                            </p>
                            <p class="m-0">Скидки до&nbsp;25%</p>
                        </div>
                    </template>

                    <p v-else>Корзина пуста</p>
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { seoHelper } from "~/mixins/content-helpers";
    import { poperHelpers } from "@/mixins/poper-helper";
    import Breadcrumbs from "@/components/base/Breadcrumbs";
    import TotalItem from "@/components/order/TotalItem";
    import TotalPrices from "@/components/order/TotalPrices";
    import FastBuyForm from "@/components/order/FastBuyForm";
    import CustomerInfo from "@/components/order/CustomerInfo";
    import BookingItem from "@/components/order/BookingItem";
    import BaseCheckbox from "@/components/base/BaseCheckbox";
    import Tooltip from '@/components/tooltip/Tooltip';
    import Popper from 'vue-popperjs';

    const pageTitle = "Бронирование круиза";

    export default {
        components: { BaseCheckbox, BookingItem, FastBuyForm, TotalPrices, TotalItem, Breadcrumbs, Tooltip, Popper, CustomerInfo },
        middleware: "auth",
        mixins: [seoHelper, poperHelpers],
        layout: 'without-form',
        head() {
            return {
                title: this.title,
            };
        },
        data() {
            return {
                title: pageTitle,
                breadcrumbs: [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 3,
                        title: pageTitle,
                        link: null,
                    },
                ],
                showForm: true,
                fastBuyFilled: false,
                errors: null,
                isShow: false,
                customer: {
                    name: null,
                    phone: null,
                    email: null,
                },

            };
        },
        computed: {
            ...mapGetters({
                getTotalPrices: "cart/getTotalPrices",
                getCartItems: "cart/getCartItems",
            }),
            hasCartItems() {
                return this.getCartItems && this.getCartItems.length > 0;
            },
            getDiscountType() {
                return this.getCartItems
            }
        },
        async created() {
            await this.fetchCartItems();
        },
        watch: {
            getCartItems: function(order) {
                window && window.dispatchEvent(
                    new CustomEvent('OrderingPage', { detail: { order, price: this.getTotalPrices } })
                );
            }
        },
        methods: {
            ...mapActions({
                openModal: "modals/openModal",
                updateModalMessage: "modals/updateModalMessage",
                updateCartItems: "cart/updateCartItems",
                clearBookingItems: "cart/clearBookingItems",
                fetchCartItems: 'cart/fetchCartItems',
            }),
            showTooltip() {
              this.isShow = !this.isShow
            },
            closeTooltip() {
                this.isShow = false
            },
            async onBookingFormSubmit() {
                // заполнена ли форма с данными заказчика из Fast buy form
                if (this.fastBuyFilled) {
                    const formData = {
                        formTitle: 'Заказ',
                        customer: this.customer,
                        cruises: this.$store.getters["cart/getBookingItems"],
                        "promo-code": this.$store.getters["cart/getPromocode"],
                    };

                    // запоминаем данные корзины для события OrderIsCreated
                    const _orderItems = [...this.getCartItems];
                    const _totalPrice = 0 + this.getTotalPrices;

                    try {
                        const { data } = await this.$axios.post("/booking/order", formData);
                        this.updateCartItems(null); // чищу корзину
                        this.clearBookingItems(); // чищу бронь
                        await this.fetchCartItems();

                        // глобальный event для метрик
                        const eventDetail = { ...formData, url: this.$route.path };
                        window && window.dispatchEvent(
                            new CustomEvent('OrderFormSent', { detail: eventDetail })
                        );
                        window && window.dispatchEvent(
                            new CustomEvent('AnyFormSent', { detail: eventDetail })
                        );
                        window && window.dispatchEvent(
                            new CustomEvent('OrderIsCreated', { detail: { order: _orderItems, price: _totalPrice, result: { order_id: data.order_id } } })
                        );

                        // на этой странице мы будем получать данные заказа по его id
                        await this.$router.push({ path: `/orders/${data.order_id}` });

                    } catch (ex) {
                        console.log("cant book order: " + ex);

                        if (ex.response.status === 400) {
                            this.updateModalMessage({
                                title: "Во время бронирования произошла ошибка",
                                message: ex.response.data.message,
                            });

                            this.openModal({ name: "ModalOrder" });
                        }
                    }
                } else {
                    this.scrollToCustomerInfo();
                }
            },
            onCustomerChange({customer, filled}) {
                this.customer = customer;
                this.fastBuyFilled = filled;
            },
            scrollToCustomerInfo(filled) {
                if (!filled) {
                    const section = document.getElementById("customer-info");

                    if (section) {
                        const y = section.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            onAsideBookingSubmitClick() {
                const button = this.$el.querySelector('#booking-form-submit-button');
                button.click();
            },
            onFastBuyTrigger(data) {
                this.showForm = false;

                // глобальный event для метрик
                const eventDetail = { order: this.getCartItems, price: this.getTotalPrices, result: data };
                window && window.dispatchEvent(
                    new CustomEvent('OrderIsCreated', { detail: eventDetail })
                );
                window && window.dispatchEvent(
                    new CustomEvent('OrderFormSent', { detail: eventDetail })
                );
                window && window.dispatchEvent(
                    new CustomEvent('AnyFormSent', { detail: eventDetail })
                );

                this.openModal({
                    name: 'ModalFastBuySuccess',
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    .page-cart {
        &__item {
            @apply pb-10 mb-10 border-b border-gray-50 last:pb-0 last:border-0;
        }
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
        border-width: 20px 20px 0 20px;
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
    .tooltip[x-placement^="top"] {
        top: -20px !important;
    }
    .tooltip[x-placement^="left"] {
        left: -20px !important;
    }
</style>
