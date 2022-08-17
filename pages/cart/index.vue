<template>
    <div class='page-inner page-cart pt-6 mb-24 xs:mb-4'>
        <div class='wrapper wrapper-1410'>
            <Breadcrumbs v-if='breadcrumbs' :breadcrumbs='breadcrumbs' class='mb-8' />

            <h1 v-if='title' class='page-inner-h1 mb-12 sm:mb-11'>
                {{ title }}
            </h1>

            <template v-if='hasCartItems'>
                <TotalItemVertical
                    v-for='(cartItem, cartItemIdx) in getCartItems'
                    :key='cartItemIdx'
                    :cart-item='cartItem'
                    :count='cartItemIdx'
                    :vertical='true'
                    class='mb-14'
                />

                <TotalPrices
                    class='total-prices--detail total-prices--gray mb-12'
                    total-price-title="Итого к оплате:"
                    :class="{'opacity-50 pointer-events-none': !hasCartItems}"
                    v-on:on-button-click="goToOrdering"
                >
                    <template v-slot:button>Оформить заказ</template>
                </TotalPrices>
            </template>

            <p v-else>Корзина пуста</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { seoHelper } from '~/mixins/content-helpers';
import Breadcrumbs from '@/components/base/Breadcrumbs';
import TotalPrices from '@/components/order/TotalPrices';
import TotalItemVertical from '@/components/order/TotalItemVertical';

const pageTitle = 'Корзина';

export default {
    components: { TotalItemVertical, TotalPrices, Breadcrumbs },
    middleware: 'auth',
    mixins: [seoHelper],
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
                    title: 'Главная',
                    link: '/',
                },
                {
                    id: 2,
                    title: pageTitle,
                    link: null,
                },
            ],
            privacy: true,
        };
    },
    computed: {
        ...mapGetters({
            getCartItems: 'cart/getCartItems',
        }),
        hasCartItems() {
            return this.getCartItems && this.getCartItems.length > 0;
        },
    },
    async created() {
        await this.fetchCartItems();
    },
    methods: {
        ...mapActions({
            updateCartItems: 'cart/updateCartItems',
            fetchCartItems: 'cart/fetchCartItems',
        }),
        goToOrdering() {
            this.$router.push({ path: "/ordering" });
        },
    },
};
</script>

<style lang="scss" scoped>
    .cart-privacy {
        &::v-deep {
            .base-checkbox__label {
                @apply pl-8 text-lg font-medium sm:text-base;
            }

            .base-checkbox__mark--top {
                top: 4px;
            }
        }
    }
</style>
