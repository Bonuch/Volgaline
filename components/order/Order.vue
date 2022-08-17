<template>
    <div class="flex flex-wrap -mx-5 overflow-hidden xl:mx-0 xl:overflow-visible">
        <div
            class="px-5 w-full mb-4 xl:w-full xl:px-0"
            v-for="(orderItem, orderIdx) in order.items"
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

<script>
import CruisesOrder from "./CruisesOrder";

export default {
    name: "Order",
    components: {CruisesOrder},
    props: {
        order: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped></style>
