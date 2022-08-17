<template>
    <div class="total-item-cabin flex items-start text-base font-medium text-gray-300 sm:text-sm">
        <div class="flex-1-1 mr-3">
            <p
                class=" m-0 mb-4 font-normal leading-1-1 sm:text-base"
            >
                    <span class="text-lg font-medium text-blue-900 mb-1" v-if="cabinItem.name">Каюта: № {{ cabinItem.name }}</span>
                <template v-if="cabinItem.category">
                    <br>
                    <span class="text-sm text-black-400">{{ cabinItem.category }}</span>
                </template>
            </p>

            <div class="flex items-center flex-wrap">
                <p v-if="cabinItem.passengers" class="total-item-cabin-passengers m-0 text-sm font-normal">
                    {{ cabinItem.passengers }} - местное,&#160;
                </p>
                <p v-if="cabinItem.kids" class="total-item-cabin-kids lowercase m-0 text-sm font-normal">
                    {{ cabinItem.kids }} - {{ kidsFormatted(cabinItem.kids) }},&#160;
                </p>
                <p
                    v-if="cabinItem.deck"
                    class="total-item-cabin-deck m-0 lowercase text-sm font-normal"
                    :class="{'mb-1': hasPassengersInfo}"
                >
                    {{ cabinItem.deck }}
                </p>
            </div>

            <template v-if="hasPassengersInfo">
                <h3 class="text-base mb-1">Туристы:</h3>
                <div
                    v-for="(touristItem, touristIdx) in cabinItem.passengersInfo"
                    :key="`cabin-item-tourist-${touristIdx}`"
                    class="mb-2 last:mb-0"
                >
                    <div class="flex items-center justify-between font-medium text-base leading-1-1 xs:block sm:text-sm">
                        <div
                            v-if="touristItem.name"
                            class="w-1/2 truncate xs:w-full"
                        >
                            {{ touristItem.name }}
                        </div>

                        <div
                            v-if="touristItem.document_number"
                            class="w-1/3 text-right truncate xs:w-auto"
                        >
                            {{ touristItem.document_number }}
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <button
            v-if="mayRemove"
            type="button"
            class="total-item-cabin-remove custom-transition flex items-center w-3 text-base text-red-400 ml-auto mt-4 hover:text-blue-300"
            title="удалить каюту из круиза"
            @click="() => $emit('on-cabin-remove', { cruiseId: this.cruiseId, cabinId: this.cabinItem.id })"
        >
            <svg
                class="fill-current"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="fill-current"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.2071 2.20711C11.5976 1.81658 11.5976 1.18342 11.2071 0.792893C10.8166 0.402369 10.1834 0.402369 9.79289 0.792893L6 4.58579L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792893 0.792893C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L4.58579 6L0.792893 9.79289C0.402369 10.1834 0.402369 10.8166 0.792893 11.2071C1.18342 11.5976 1.81658 11.5976 2.20711 11.2071L6 7.41421L9.79289 11.2071C10.1834 11.5976 10.8166 11.5976 11.2071 11.2071C11.5976 10.8166 11.5976 10.1834 11.2071 9.79289L7.41421 6L11.2071 2.20711Z"
                    fill="#DA3E34"
                />
            </svg>
        </button>
    </div>
</template>

<script>
import { setCase } from "@/helpers/text";

export default {
    name: "TotalItemCabin",
    props: {
        cabinItem: {
            type: Object,
            required: true,
        },
        cruiseId: {
            type: [String, Number],
            required: true,
        },
        mayRemove: {
            type: Boolean,
        },
    },
    computed: {
        kidsFormatted() {
            return (kidsNumber) => setCase(Number(kidsNumber), ["ребёнок", "ребёнка", "детей"], "<");
        },
        hasPassengersInfo() {
            return this.cabinItem.passengersInfo && this.cabinItem.passengersInfo.length > 0;
        },
    },
};
</script>

<style></style>
