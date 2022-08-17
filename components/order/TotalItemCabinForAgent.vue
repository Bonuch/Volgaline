<template>
    <div class="total-item-cabin flex items-start text-base font-medium text-gray-300 sm:text-sm">
        <div class="flex-1-1 mr-3">
            <p
                class="total-item-cabin-title m-0 mb-3 text-lg font-bold leading-1-1 text-blue-900 sm:text-base"
            >
                <span v-if="cabinItem.name">Каюта: № {{ cabinItem.name }}</span>
                <template v-if="cabinItem.category">
                    <br>
                    <span>{{ cabinItem.category }}</span>
                </template>
            </p>

            <p v-if="cabinItem.passengers" class="total-item-cabin-passengers m-0 mb-1">
                {{ cabinItem.passengers }} - местное
            </p>

            <p v-if="cabinItem.kids" class="total-item-cabin-kids m-0 mb-1">
                {{ cabinItem.kids }} - {{ kidsFormatted(cabinItem.kids) }}
            </p>

            <p
                v-if="cabinItem.deck"
                class="total-item-cabin-deck m-0"
                :class="{'mb-1': hasPassengersInfo}"
            >
                {{ cabinItem.deck }}
            </p>

            <template v-if="hasPassengersInfo">
                <h3 class="text-base mb-1">Туристы:</h3>
                <div
                    v-for="(touristItem, touristId) in passengers"
                    :key="`cabin-item-tourist-${touristId}`"
                    class="mb-2 last:mb-0 w-1/2 tablet:w-2/3 sm:w-full"
                    :class="{ 'disabled': !canChange}"
                >
                    <h4>ID {{touristId}}</h4>

                    <div class="tourist-update-field flex items-end">
                        <label class="label">Фамилия</label>
                        <input
                            type="text"
                            name="first_name"
                            class="input p-2 text-sm"
                            autocomplete="off"
                            v-model="passengers[touristId]['first_name']"
                            @input="(e) => updateTourist(touristId)"
                        >
                    </div>

                    <div class="tourist-update-field flex items-end">
                        <label class="label">Имя</label>
                        <input
                            type="text"
                            name="last_name"
                            class="input p-2 text-sm"
                            autocomplete="off"
                            v-model="passengers[touristId]['last_name']"
                            @input="(e) => updateTourist(touristId)"
                        >
                    </div>

                    <div class="tourist-update-field flex items-end">
                        <label class="label">Отчество</label>
                        <input
                            type="text"
                            name="middle_name"
                            class="input p-2 text-sm"
                            autocomplete="off"
                            v-model="passengers[touristId]['middle_name']"
                            @input="(e) => updateTourist(touristId)"
                        >
                    </div>

                    <div class="tourist-update-field flex items-end">
                        <label class="label">Серия-Номер документа</label>
                        <input
                            type="text"
                            name="document_number"
                            class="input"
                            v-mask="'####-######'"
                            autocomplete="off"
                            v-model="passengers[touristId]['document_number']"
                            @input="(e) => updateTourist(touristId)"
                        >
                    </div>

                    <div class="tourist-update-field flex items-end">
                        <label class="label">Номер телефона</label>
                        <input
                            type="text"
                            name="phone"
                            class="input"
                            autocomplete="off"
                            v-mask="'+7 (###) ###-##-##'"
                            v-model="passengers[touristId]['phone']"
                            @input="(e) => updateTourist(touristId)"
                        >
                    </div>
                    <div class="tourist-update-field flex items-end">
                        <label class="label">Дата рождения</label>
                        <client-only>
                            <v-date-picker
                                locale="ru"
                                :popover="{ visibility: 'focus' }"
                                :masks="{ input: ['DD/MM/YYYY']}"
                                :max-date="maxDate"
                                v-model="passengers[touristId]['birth_date']"
                                @input="(date) => onChooseBirthDate(date, touristId)"
                            >
                                <template v-slot="{ inputValue, inputEvents }">
                                    <input
                                        name="birth_date"
                                        class="input"
                                        placeholder="дд/мм/год"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                    />
                                </template>
                            </v-date-picker>
                        </client-only>
                    </div>

                    <div class="tourist-update-field flex items-center">
                        <label class="label">Пол</label>

                        <BaseRadio
                            v-for="(item, idx) in gender"
                            :key="idx"
                            :id="`tourist-gender-id-${_uid}-${idx}-${touristId}`"
                            :name="`tourist-gender-${_uid}-${touristId}`"
                            required
                            main-classes="base-radio-blue"
                            :label="item.name"
                            :value="item.id"
                            :checked="passengers[touristId]['gender'] === item.id"
                            @input="onChooseGender(touristId, item.id)"
                            class="last:mb-0 flex"
                        />
                    </div>

                </div>
            </template>
        </div>

        <button
            v-if="false"
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
import BaseRadio from "@/components/base/BaseRadio";
import PhoneComponent from '../base/PhoneComponent';
import { parsePhoneMixin } from "@/mixins/content-helpers";

export default {
    name: "TotalItemCabinForAgent",
    components: { BaseRadio, PhoneComponent},
    mixins: [parsePhoneMixin],
    data() {
        return {
            maxDate: new Date(),
            passengers: {},
            gender: [
                {
                    id: 1,
                    name: "Мужчина",
                },
                {
                    id: 2,
                    name: "Женщина",
                },
            ],
            test: null,
        };
    },
    props: {
        cabinItem: {
            type: Object,
            required: true,
        },
        canChange: {
            type: Boolean,
            required: true,
        }
    },
    created() {
        this.createFormPassengers();
    },
    computed: {
        kidsFormatted() {
            return (kidsNumber) => setCase(Number(kidsNumber), ["ребёнок", "ребёнка", "детей"], "<");
        },
        hasPassengersInfo() {
            return this.cabinItem.passengersInfo && this.cabinItem.passengersInfo.length > 0;
        },
    },
    methods: {
        updateTourist(idTourist) {
            this.$emit("updateTourist", {
                idPassenger: idTourist,
                passenger: this.passengers[idTourist]
            });
        },
        onChooseGender(idTourist, val) {
            this.passengers[idTourist]['gender'] = val;
            this.updateTourist(idTourist);
        },
        onChooseBirthDate(date, idTourist) {
            this.passengers[idTourist]['birth_date'] = date ? this.$dayjs(date).format("YYYY-MM-DD") : null;
            this.updateTourist(idTourist);
        },
        createFormPassengers() {
            const passengers = this.cabinItem.passengersInfo;

            passengers.forEach(passenger => {
                this.$set(this.passengers, passenger.id, {});

                for (const key in passenger) {
                    if(key !== 'id' && key !== 'name'){
                        this.$set(this.passengers[passenger.id], key, passenger[key]);
                    }
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
    .tourist-update-field {
        @apply mb-4 justify-between;
    }

    .input {
        background: none;
        border: none;
        border-bottom: 1px solid;
        padding: 0 8px;
        border-radius: 0;
        @apply border-blue-900 text-sm w-1/2 tablet:w-full;

        &:focus {
            @apply border-orange-500;
        }

        &::placeholder {
           @apply text-sm;
        }
    }

    .label {
        @apply m-0 mr-4;
    }
</style>
