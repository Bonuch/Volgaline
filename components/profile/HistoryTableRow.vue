<template>
    <div class="custom-table__row relative text-base hover:bg-gray-50 custom-transition extra:text-sm">
        <div class="custom-table__col">
            <p v-if="item.id">{{ item.id }}</p>
        </div>
        <div class="custom-table__col">
            <p v-if="item.created">{{ getMobileDateFormatted(item.created) }}</p>
        </div>

        <div class="custom-table__col">
            <div v-if="item.ships" v-html="item.ships"></div>
        </div>

        <div class="custom-table__col">
            <div v-if="item.names" v-html="item.names"></div>
        </div>

        <div class="custom-table__col text-sm">
            <div v-if="item.dates" v-html="item.dates"></div>
        </div>

        <div class="custom-table__col">
            <div v-if="item.roads" v-html="item.roads"></div>
        </div>

        <div class="custom-table__col">
            <p v-if="getUser && getUser.name">{{ getUser.name }}</p>
        </div>

        <div class="custom-table__col">
            <div v-if="item.amounts">
                <p
                    v-for="(price, priceIdx) in formatString(item.amounts, formatPrice)"
                    :key="priceIdx"
                >
                    {{ price }}
                </p>
            </div>
        </div>

        <div class="custom-table__col">

            <div v-if="item.status_title" class="flex mb-4 sm:hidden">
                <span
                    class="custom-transition font-semibold"
                >
                    {{item.status_title}}
                </span>
            </div>

            <button
                class="custom-transition text-red-400 hover:text-blue-300 mt-4 flex sm:justify-center"
                @click="openModal({
                    name: 'ModalHistoryDetail',
                    size: 'full',
                    content: item
                })">
                <span class="sm:hidden text-left font-semibold">
                    Подробнее
                </span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="hidden custom-transition sm:block"
                    width="18"
                    height="19"
                    viewBox="0 0 515.555 515.555"
                >
                    <path
                        class="fill-current"
                        d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                    />
                    <path
                        class="fill-current"
                        d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                    />
                    <path
                        class="fill-current"
                        d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                    />
                </svg>
            </button>

            <button
                @click="callCancelOrderModal"
                class="custom-transition text-red-400 hover:text-blue-300 mt-4 flex sm:justify-center"
                v-if="showButtonCancelOrder"
            >

                <span class="sm:hidden text-left font-semibold">Отменить заказ</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     viewBox="0 0 512.001 512.001"
                     class="hidden sm:block"
                     width="10"
                     height="10"
                     fill="#BC002D"
                >
                    <path
                        d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"
                    />
                </svg>

            </button>

        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {dayjsHelpers} from "@/mixins/content-helpers";
import {formatCurrency} from "@/helpers/text";

export default {
    name: "HistoryTableRow",
    mixins: [dayjsHelpers],
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            getUser: "users/getUser",
        }),
        formatString() {
            return (str, cb) => {
                const splitted = str.split(",");
                const mapped = splitted.map(splittedItem => {
                    return cb ? cb(splittedItem) : splittedItem;
                });
                return mapped;
            };
        },
        showButtonCancelOrder() {
            return this.item.possibility_cancel && this.getUser?.role === 'agent';
        },
    },
    methods: {
        ...mapActions({
            openModal: "modals/openModal",
            closeModal: 'modals/closeModal',
        }),
        formatPrice(splittedItem) {
            return formatCurrency(splittedItem);
        },
        async cancelStatus() {
            try {
                const { data } = await this.$axios.get(`/profile/orders/${this.item.id}/cancel`);
                this.closeModal();

                this.$emit('update-list-orders');
            } catch (ex) {
                console.log('cant fetch cancel order : ' + ex);
                return null;
            }
        },
        callCancelOrderModal() {
            this.openModal({
                name: 'ModalActionConfirmation',
                cb: this.cancelStatus,
                message: 'После отмены заказа его нельзя будет восстановить самостоятельно. Вы уверены?'
            });
        }
    },
};
</script>

<style></style>
