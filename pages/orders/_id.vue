<template>
    <div class="page-inner page-cart pt-6">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset" />

            <div class="page-with-sidebar">
                <div class="page-with-sidebar__left">
                    <h1 v-if="title" class="page-inner-h1 page-inner-h1--offset w-full mb-8">
                        {{ title }}
                        <span class="text-lg">{{subTitle}}</span>
                    </h1>

                    <template v-if="hasOrder">
                        <div class="flex flex-wrap -mx-5 overflow-hidden xl:mx-0 xl:overflow-visible">
                            <div
                                class="px-5 w-1/2 mb-4 xl:w-full xl:px-0"
                                v-for="(orderItem, orderIdx) in order"
                                :key="orderIdx"
                            >
                                <CruisesOrder
                                    :order-item="orderItem"
                                    :count="orderIdx"
                                    class="h-full"
                                />
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <p>Заказ не удалось загрузить.</p>
                        <p>
                            Попробуйте обновить страницу или позвоните нам по телефону
                            <a href="tel:74994041803" class="link-inline">7 (499) 404-18-03</a>.
                        </p>
                    </template>
                </div>

                <aside v-if="hasOrder && status === 1 && !paymentType" class="page-with-sidebar__right">
                    <TotalPrices
                        :total="total"
                        :radio-list="paymentList"
                        :loading="loading"
                        v-on:on-payment-change="onPaymentSelect"
                        v-on:on-button-click="onMainFormSubmit"
                    >
                        <template v-slot:button>Оплатить</template>
                    </TotalPrices>

                    <div class="mt-6">
                        <p class="px-2 font-medium text-center sm:text-base mob:text-sm">
                            <nuxt-link to="/contacts" target="_blank">
                                Вы можете оплатить сейчас или у&nbsp;нас в&nbsp;офисе по&nbsp;адресу г.&nbsp;Москва,
                                ул.&nbsp;Маросейка 3/13, 1&nbsp;этаж, офис&nbsp;
                            </nuxt-link>
                        </p>
                    </div>
                </aside>
                <aside v-if="hasOrder && status === 1 && paymentType" class="page-with-sidebar__right">
                    <div class="font-bold">
                        <p>Благодарим за ваш заказ!</p>
                        <p v-if="!paymentType">В скором времени с вами свяжется наш менеджер.</p>
                    </div>
                    <div>&nbsp;</div>
                    <div v-if="paymentType > 1" class="font-medium">
                        <p>Выбранный метод оплаты:</p>
                        <p><strong>{{paymentTypeName}}</strong></p>
                    </div>
                    <TotalPrices
                        v-if="paymentType === 1"
                        :total="total"
                        :radio-list="paymentList.filter(v => (v.id === 1))"
                        :loading="loading"
                        v-on:on-payment-change="onPaymentSelect"
                        v-on:on-button-click="onMainFormSubmit"
                    >
                        <template v-slot:button>Оплатить</template>
                    </TotalPrices>
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
import { seoHelper } from "~/mixins/content-helpers";
import Breadcrumbs from "@/components/base/Breadcrumbs";
import TotalPrices from "@/components/order/TotalPrices";
import CruisesOrder from "@/components/order/CruisesOrder";

export default {
    components: { CruisesOrder, TotalPrices, Breadcrumbs },
    middleware: "auth",
    mixins: [seoHelper],
    layout: 'without-form',
    head() {
        return {
            title: this.title,
            loading: false
        };
    },
    data() {
        return {
            loading: false,
            title: "Заказ №",
            subTitle: "",
            paymentType: null,
            breadcrumbs: [],
            payment: null,
            paymentList: [
            ],
            orderId: null,
            order: null,
            status: null,
            total: null,
        };
    },
    computed: {
        hasOrder() {
            return this.order && this.order.length > 0;
        },
        paymentTypeName()
        {
            return this.getPaymentName(this.paymentType);
        }
    },
    methods: {
        getPaymentName(paymentType)
        {
            const type = this.paymentList.find((value, index) => (paymentType === value.id));
            return type ? type.name : '---';
        },
        async onMainFormSubmit() {
            this.loading = true;
            // если выбранный метод не онлайн оплата, то просто отправляем в битрикс инфу в сделку
            // если выбранный метод онлайн оплаты, то сначала запрашиваем платежную ссылку
            try {
                const checkoutParams = {
                    order_id: this.orderId,
                    payment_type: this.payment
                };
                let checkoutUrl = '/booking/checkout';
                if (this.$route.query && this.$route.query.did && this.$route.query.gateway) {
                    checkoutUrl = '/direct-link/checkout';
                    checkoutParams.deal_id = this.$route.query.did;
                    checkoutParams.gateway = this.$route.query.gateway;
                    checkoutParams.amount = this.total.total;
                }

                const response = await this.$axios.post(checkoutUrl, checkoutParams);
                this.loading = false;
                if (response.data.status === 'success') {
                    if (response.data.route) {
                        await this.$router.push(response.data.route);
                        return;
                    }
                    // если пришла платежная ссылка, редиректим на нее
                    if (response.data.redirect) {
                        window.location.href = response.data.redirect; // TODO это небезопасно, нужно редиректить через дополнительный апри роут
                        this.loading = true;
                        return;
                    }
                    if (response.data.reload) {
                        this.status = 1;
                        this.paymentType = this.payment;
                        this.subTitle = '(ОЖИДАЕТ ОПЛАТЫ)';
                        return;
                    }
                }
                return alert(response.data.message);
            } catch (ex) {
                return alert(ex.message);
            }
        },
        onPaymentSelect(payment) {
            this.payment = payment;
        },
    },
    async created() {
        this.onPaymentSelect(1);
    },
    async asyncData({ $axios, params, route }) {
        const orderId = decodeURI(params.id);
        let orderUrl = `/profile/orders/${orderId}`;
        if (route.query && route.query.did && route.query.gateway) {
            orderUrl = `/direct-link/order?orderId=${orderId}&gateway=${route.query.gateway}&dealId=${route.query.did}`;
        }
        let title = '';
        let order, status, total, paymentType, subTitle = '';
        let paymentList = [];

        try {
            const { data } = await $axios.get(`/cart/get-payment-types/${orderId}`);
            paymentList = data;
        } catch (ex) {
            console.log(ex);
        }
        try {
            const { data } = await $axios.get(orderUrl);
            order = data.data.items;
            status = data.data.status;
            total = data.data.total;
            paymentType = data.data.pay_type;
            title = `Заказ № ${orderId}`;
            if (paymentType) {
                if (status === 1) {
                    subTitle = '(Ожидает оплаты)';
                } else if (status === 2) {
                    subTitle = '(Оплачено)';
                } else if (status === 3) {
                    subTitle = '(Отменено)';
                } else if (status === 4) {
                    subTitle = '(Возврат средств)';
                }
            }
        } catch (ex) {
            console.log("cant fetch order list: " + ex);
        }

        return {
            paymentList,
            orderId,
            order,
            paymentType,
            status,
            total,
            title,
            subTitle,
            payment: 1,
            breadcrumbs: [
                {
                    id: 1,
                    title: "Главная",
                    link: "/",
                },
                {
                    id: 3,
                    title,
                    link: null,
                },
            ]
        };
    }
};
</script>

<style></style>
