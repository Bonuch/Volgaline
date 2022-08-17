<template>
    <div class="flex flex-wrap -mx-5 overflow-hidden xl:mx-0 xl:overflow-visible">
        <div
            class="px-5 w-full mb-4 xl:w-full xl:px-0"
            v-for="(orderItem, orderIdx) in order.items"
            :key="orderIdx"
        >
            <CruisesOrderForAgent
                :order-item="orderItem"
                :count="orderIdx"
                class="h-full"
                :can-change="canChange"
                @updateTourist="updateTourist"
            />
        </div>
        <div
            class="px-5 flex justify-end w-full xl:px-0"
            v-if="canChange"
        >
            <button
                class="button sm:flex-100"
                @click="updateOrder()"
            >
                Сохранить изменения
            </button>
        </div>
    </div>
</template>

<script>
import CruisesOrderForAgent from "./CruisesOrderForAgent";
import {mapActions} from "vuex";

export default {
    name: "OrderForAgent",
    components: {CruisesOrderForAgent},
    data() {
        return {
            form: {
                passengers: {}
            },
        };
    },
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    computed: {
        canChange(){
            return this.order.agentCanChange;
        }
    },
    methods: {
        ...mapActions({
            openModal: "modals/openModal",
        }),
        updateTourist(data){
            this.form.passengers[data.idPassenger] = data.passenger;
        },
        async updateOrder(){
            try {
                const { data } = await this.$axios.post(`/profile/orders/agent-update`, {
                    order_id: this.order.order_id,
                    passengers: this.form.passengers
                });

                this.openModal({
                    name: 'ModalSuccess',
                    size: 'small',
                    message: 'Информация о пассажирах заказа успешно обновлена'
                })
            } catch (ex) {
                console.log('cant fetch update order : ' + ex);
                return null;
            }
        }
    }
}
</script>

<style scoped></style>
