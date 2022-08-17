<template>
    <div class="order-tourist py-10 mx-10 md:py-8 md:mx-8 sm:p-4 sm:mx-0">
        <div class="flex flex-wrap justify-between mb-10 md:items-start">
            <div class="flex flex-wrap items-center md:w-1/2 mob:w-full mob:mb-2">
                <h3 class="h3 mb-0 mr-10 md:w-full md:mr-0 md:mb-2 md:pr-4 sm:text-2xl mob:text-xl">
                   Пассажир {{ idx + 1 }}
                </h3>

                <span
                    v-if="price && price.price"
                    class="badge bg-blue-900 text-white md:inline"
                >
                    {{ price.price | formatPrice }}
                </span>

                <!--                <div class="w-full mt-4">-->
                <!--                    <BaseCheckbox-->
                <!--                        id="companion"-->
                <!--                        name="companion"-->
                <!--                        label="Добавить попутчика"-->
                <!--                        :labelSelectors="['inline-block pl-8 font-medium leading-none']"-->
                <!--                        :markSelectors="['w-6 h-6 text-gray-300 border border-gray-300']"-->
                <!--                        required="true"-->
                <!--                        :custom-val="tourist.companion"-->
                <!--                        v-model="tourist.companion"-->
                <!--                    />-->
                <!--                </div>-->
            </div>

            <div class="md:w-1/2 md:flex mob:w-full mob:block">
                <BaseDropdownWithSelect
                    v-if="dropDown && dropDown.length > 0"
                    :drop-down="dropDown"
                    list-classes="base-dropdown__list--right"
                    class="md:ml-auto mob:ml-0"
                    v-on:on-select-item="onFillFromDropdown"
                />
            </div>
        </div>

        <div class="order-tourist__list flex flex-wrap -mx-5 -mb-10">
            <div class="order-tourist__item order-tourist__surname w-1/3 xxl:w-full">
                <label class="label">Фамилия <sup>*</sup></label>
                <input
                    type="text"
                    name="first_name"
                    class="input"
                    required
                    autocomplete="off"
                    :value="tourist.first_name"
                    @input="(e) => onInput(e, 'first_name')"
                >
            </div>

            <div class="order-tourist__item order-tourist__name w-1/3 xxl:w-full">
                <label class="label">Имя <sup>*</sup></label>
                <input
                    type="text"
                    name="last_name"
                    class="input"
                    required
                    autocomplete="off"
                    :value="tourist.last_name"
                    @input="(e) => onInput(e, 'last_name')"
                >
            </div>

            <div class="order-tourist__item order-tourist__patronymic w-1/3 xxl:w-full">
                <label class="label">Отчество <sup>*</sup></label>
                <input
                    type="text"
                    name="middle_name"
                    class="input"
                    required
                    autocomplete="off"
                    :value="tourist.middle_name"
                    @input="(e) => onInput(e, 'middle_name')"
                >
            </div>

            <div class="order-tourist__item w-1/2 md:w-full">
                <label class="label">Документ: <sup>*</sup></label>

                <ClientOnly>
                    <v-select
                        class="custom-select custom-select-modal"
                        label="name"
                        :reduce="item => item.name"
                        :options="documents"
                        v-model="document"
                    >
                        <template #open-indicator="{ attributes }">
                           <span v-bind="attributes">
                               <svg
                                   width="18" height="19" viewBox="0 0 18 19" fill="none"
                                   xmlns="http://www.w3.org/2000/svg"
                               >
                                   <path
                                       fill-rule="evenodd" clip-rule="evenodd"
                                       d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                                       fill="#5A6472"
                                   />
                               </svg>
                           </span>
                        </template>

                        <template #no-options="{ search, searching, loading }">
                            Нет совпадений
                        </template>
                    </v-select>
                </ClientOnly>
            </div>

            <div class="order-tourist__item flex flex-wrap w-1/2 md:w-full">
                <div v-if="isPassportSelected" class="w-24 mr-4">
                    <label class="label">Серия <sup>*</sup></label>

                    <input
                        type="text"
                        name="document-seria"
                        class="input"
                        required
                        autocomplete="off"
                        :maxlength="4"
                        :value="tourist.document_seria"
                        @input="onDocumentSeriaChange"
                    >
                </div>

                <div class="flex-1-1" :class="{'w-full': !isPassportSelected}">
                    <label class="label">Номер документа <sup>*</sup></label>

                    <input
                        type="text"
                        name="document-number"
                        class="input"
                        required
                        autocomplete="off"
                        :value="tourist.document_number"
                        @input="onDocumentNumberChange"
                    >
                </div>
            </div>

            <div class="order-tourist__item flex flex-wrap justify-between extra:w-full extra:justify-start mob:block">
                <div class="order-tourist__birthday mr-4 mob:mr-0 mob:mb-10">
                    <label class="label">Дата рождения: <sup>*</sup></label>
                    <client-only>
                        <v-date-picker
                            locale="ru"
                            is-required
                            :popover="{ visibility: 'focus' }"
                            :masks="{ input: ['DD/MM/YYYY']}"
                            :max-date="maxDate"
                            v-model="tourist.birth_date"
                            @input="onBirthDatePick"
                        >
                            <template v-slot="{ inputValue, inputEvents }">
                                <input
                                    class="input"
                                    placeholder="дд/мм/год"
                                    required
                                    :value="inputValue"
                                    v-on="inputEvents"
                                />
                            </template>
                        </v-date-picker>
                    </client-only>
                </div>

                <div class="order-tourist__item">
                    <label class="label">Пол <sup>*</sup></label>

                    <BaseRadio
                        v-for="(item, idx) in gender"
                        :key="idx"
                        :id="`tourist-gender-id-${_uid}-${idx}`"
                        :name="`tourist-gender-${_uid}`"
                        required
                        main-classes="base-radio-blue"
                        :label="item.name"
                        :value="item.id"
                        @input="onChooseGender"
                        class="mb-2 last:mb-0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseRadio from "@/components/base/BaseRadio";
import BaseCheckbox from "@/components/base/BaseCheckbox";
import BaseDropdownWithSelect from "@/components/base/BaseDropdownWithSelect";

export default {
    name: "OrderTourist",
    components: { BaseDropdownWithSelect, BaseCheckbox, BaseRadio },
    props: {
        value: {
            type: Object,
            default: () => {
                return {
                    type: null,
                    first_name: null,
                    last_name: null,
                    middle_name: null,
                    birth_date: null,
                    gender: null,
                    document_number: null,
                };
            },
        },
        idx: {
            type: Number,
            required: true,
        },
        price: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            maxDate: new Date(),
            errors: {},
            tourist: {
                first_name: null,
                last_name: null,
                middle_name: null,
                birth_date: null,
                document_seria: null,
                document_number: null,
            },
            document: "Паспорт РФ",
            documents: [
                {
                    id: 1,
                    name: "Паспорт РФ",
                },
                {
                    id: 2,
                    name: "Свидетельство о рождении",
                },
                {
                    id: 3,
                    name: "Иностранный документ",
                },
            ],
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
            dropDown: [
                // todo on tourist fill, set his data to Cookie
                // {
                //     first_name: "Христорождественский",
                //     last_name: "Кирил",
                //     middle_name: "Кирилович",
                //     short: "Христорождественский К. К.",
                // },
            ],
        };
    },
    computed: {
        getDocumentNumber() {
            let res = "";
            const seria = this.tourist.document_seria ? this.tourist.document_seria : "";
            const number = this.tourist.document_number ? this.tourist.document_number : "";

            if (this.document === "Паспорт РФ" && seria !== "" && number !== "") {
                res = `${seria} - ${number}`;
            } else {
                res = number;
            }

            return res;
        },
        isPassportSelected() {
            if (this.document && this.documents && this.documents.length > 0) {
                return this.document === this.documents[0]["name"];
            } else {
                return false;
            }
        },
    },
    methods: {
        onChooseGender(name) {
            const updated = this.updateTourist({gender: name});

            this.$emit("input", {
                idx: this.idx,
                val: updated,
            });
        },
        onBirthDatePick() {
            const updated = this.updateTourist({ birth_date: this.tourist.birth_date });

            this.$emit("input", {
                idx: this.idx,
                val: updated,
            });
        },
        onFillFromDropdown(item) {
            let updated = this.updateTourist({last_name: item.name});
            updated = this.updateTourist({first_name: item.surname});
            updated = this.updateTourist({middle_name: item.patronymic});

            this.$emit("input", {
                idx: this.idx,
                val: updated,
            });
        },
        fillOnInit() {
            const updated = this.updateTourist({type: this.price.type});
            this.$emit("input", {
                idx: this.idx,
                val: updated,
            });
        },
        onDocumentNumberChange(e) {
            this.tourist.document_number = e.target.value;
            const updated = this.updateTourist({document_number: this.getDocumentNumber});
            this.$emit("input", {
                idx: this.idx,
                val: updated,
            });
        },
        onDocumentSeriaChange(e) {
            this.tourist.document_seria = e.target.value;
            const updated = this.updateTourist({document_number: this.getDocumentNumber});
            this.$emit("input", {
                idx: this.idx,
                val: updated,
            });
        },
        onInput(e, key) {
            const val = e.target.value;
            this.$set(this.tourist, key, val);
            const newValue = { [key]: val };
            const updated = this.updateTourist(newValue);

            this.$emit("input", {
                idx: this.idx,
                val: updated,
            });
        },
        updateTourist(val) {
            return Object.keys(this.value).length > 0 ? Object.assign({}, this.value, val) : val;
        },
    },
    mounted() {
        this.fillOnInit();
    },
};
</script>

<style lang="scss" scoped>
.order-tourist {
    &__item {
        @apply px-5 mb-10;
    }

    &__birthday {
        max-width: 160px;
    }
}
</style>
