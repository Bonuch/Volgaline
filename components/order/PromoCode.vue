<template>
    <form class="promocode relative pt-7 mb-4 w-full lg:pt-0" @submit.prevent="handleSubmit">
        <div v-if="loading" class="absolute z-1 left-0 top-0 w-full h-full flex items-center justify-center preloader">
            <Preloader/>
        </div>

        <div
            class="flex flex-wrap justify-between xs:flex-col"
            :class="{ 'disabled': loading }"
        >
            <div class="flex flex-col w-1/2 px-5 lg:w-full lg:px-0">
                <div class="block font-normal text-base mb-5">Введите промокод для скидки:</div>
                <div v-if="promocode" class="flex xs:hidden justify-between items-center px-5 xs:px-0">
                    <div class='flex'>
                        <img src="~/assets/images/icons/promocode.png" alt="promocode" class="mr-3">
                        <div class="mr-3 text-sm font-normal">
                            <span>{{ promocode.title }} - <span class='text-green-700'>Купон применен</span></span>
                        </div>
                    </div>

                    <a
                        v-if="promocode && Object.keys(promocode).length > 0"
                        href="#"
                        class="flex items-center "
                        title="удалить промокод"
                        @click="handleRemovePromocode"
                    >
                        <span class='pr-2.5'>Удалить</span>
                        <svg class="fill-current" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7.07031" width="2" height="10" rx="1" transform="rotate(45 7.07031 0)" fill="#5A6472"/>
                            <rect y="1.41406" width="2" height="10" rx="1" transform="rotate(-45 0 1.41406)" fill="#5A6472"/>
                        </svg>

                    </a>
                </div>
            </div>

            <div class="w-1/2 px-5 lg:w-full lg:px-0">
                <div class="relative">
                    <input
                        id="promocode"
                        type="text"
                        name="promocode"
                        class="promocode-input input text-base py-5 px-5 bg-white border-gray-50 border text-black-400"
                        placeholder="промокод"
                        required
                        autocomplete="off"
                        :disabled="promocode && Object.keys(promocode).length > 0"
                        v-model="code"
                    >

                    <button
                        type="submit" class="promocode-submit absolute"
                    >
                        <svg class="fill-current custom-transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.823 240.823">
                            <path d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
                            l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
                            C187.881,124.315,187.881,116.495,183.189,111.816z"
                            />
                        </svg>
                    </button>
                </div>

                <div v-if="errorMessage" class="text-base text-red-400">
                    {{ errorMessage }}
                </div>
            </div>

            <div v-if="promocode" class="hidden xs:flex justify-between items-center px-5 xs:px-0">
                <div class='flex'>
                    <img src="~/assets/images/icons/promocode.png" alt="promocode" class="mr-3">
                    <div class="mr-3 text-sm font-normal">
                        <span>{{ promocode.title }} - <span class='text-green-700'>Купон применен</span></span>
                    </div>
                </div>

                <a
                    v-if="promocode && Object.keys(promocode).length > 0"
                    href="#"
                    class="flex items-center"
                    title="удалить промокод"
                    @click="handleRemovePromocode"
                >
                    <span class='pr-2.5'>Удалить</span>
                    <svg class="fill-current" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7.07031" width="2" height="10" rx="1" transform="rotate(45 7.07031 0)" fill="#5A6472"/>
                        <rect y="1.41406" width="2" height="10" rx="1" transform="rotate(-45 0 1.41406)" fill="#5A6472"/>
                    </svg>

                </a>
            </div>
        </div>
    </form>
</template>

<script>
import {mapMutations, mapActions} from "vuex";

export default {
    name: 'PromoCode',
    components: {
        Preloader: () => import('@/components/base/Preloader'),
    },
    data() {
        return {
            loading: false,
            code: null,
            promocode: null,
            errorMessage: null,
        };
    },
    methods: {
        ...mapMutations({
            setCartItems: "cart/setCartItems",
            setTotalPrices: "cart/setTotalPrices",
            setPromocode: "cart/setPromocode",
        }),
        ...mapActions({
            fetchCartItems: "cart/fetchCartItems",
        }),
        async handleSubmit() {
            try {
                this.errorMessage = null;
                this.loading = true;
                const { data } = await this.$axios.get(`/cart/add-promocode/${this.code}`);

                this.setCartItems(data.cart.items);
                this.setTotalPrices(data.cart.total);

                this.promocode = data.promocode;
                this.setPromocode(this.promocode?.code);
                this.$cookies.set('promocode', this.promocode?.code, {
                    maxAge: 60 * 60,
                });
                this.loading = false;
            } catch (ex) {
                console.log('cant get promocode: ' + ex);
                this.setPromocode(null);
                this.$cookies.remove('promocode');
                this.loading = false;
                this.errorMessage = ex?.response?.data?.message ? ex.response.data.message : 'Что то пошло не так, попробуйте позже';
            }
        },
        async handleRemovePromocode(e) {
            e.preventDefault();
            this.loading = true;
            this.code = null;
            this.promocode = null;
            await this.fetchCartItems();
            this.setPromocode(null);
            this.$cookies.remove('promocode');
            this.loading = false;
        },
    },
    mounted() {
        const cookiePromocode = this.$cookies.get('promocode');
        if (cookiePromocode) this.code = cookiePromocode;
    },
    async beforeDestroy() {
        this.setPromocode(null);
        await this.fetchCartItems();
    },
};
</script>

<style lang="scss" scoped>
.promocode {
    &-input {
        &::placeholder {
            font-weight: 400;
        }
    }

    &-submit {
        box-sizing: content-box;
        top: 50%;
        right: 18px;
        width: 10px;
        height: 10px;
        padding: 10px;
        transform: translateY(-50%);
        @apply border border-green-700 rounded-sm;

        svg {
            transition: all .3s ease;

            path {
                fill: currentColor;
                @apply text-green-700;
            }
        }

        &:hover,
        &:focus,
        &:active {
            @apply bg-green-700;

            svg {
                path {
                    fill: #fff;
                }
            }
        }
    }
}
</style>
