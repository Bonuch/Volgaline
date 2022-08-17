<template>
    <div class="modal-history-detail">
        <div class="flex justify-between flex-wrap">
            <h3 v-if="getModalContent && getModalContent.id" class="h3 mr-2 sm:mr-0 sm:mb-2">Заказ номер {{getModalContent.id}}</h3>
            <span v-if="getModalContent && getModalContent.status_title" class="italic sm:mb-4">
                ({{getModalContent.status_title}})
            </span>
        </div>
        <template v-if="hasOrder">
            <OrderForAgent
                v-if="isAgent"
                :order="order"
            />
            <Order
                v-else
                :order="order"
            />
        </template>

    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import TotalItem from "../order/TotalItem";
    import Order from "@/components/order/Order";
    import OrderForAgent from "@/components/order/OrderForAgent";

    export default {
        name: "ModalHistoryDetail",
        components: { TotalItem, Order, OrderForAgent},
        data() {
            return {
                order: null,
            };
        },
        async created() {
            this.fetchData();
        },
        computed: {
            ...mapGetters({
                getModalContent: "modals/getModalContent",
                getUser: "users/getUser",
            }),
            hasOrder() {
                return this.order && this.order.items.length > 0;
            },
            isAgent() {
                return this.getUser.role === 'agent';
            },
        },
        methods: {
            async fetchData() {
                this.loading = true;

                try {
                    const { data } = await this.$axios.get(`/profile/orders/${this.getModalContent.id}`);
                    this.order = data.data;
                } catch (ex) {
                    console.log(ex);
                }

            }
        },
    };
</script>

<style scoped></style>
