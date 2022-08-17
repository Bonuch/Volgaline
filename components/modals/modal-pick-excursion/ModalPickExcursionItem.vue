<template>
    <div
        class="modal-excursions__item flex flex-wrap items-start pb-5 mb-5 border-b border-gray-50 last:p-0 last:m-0 last:border-0"
    >
        <div class="modal-excursions__left relative">
            <div class="modal-excursions__image">
                <img
                    :src="exItem.urt"
                    :alt="exItem.title"
                    class="w-full h-full object-cover mb-4 rounded-sm overflow-hidden"
                >
                <div
                    class="absolute left-3 top-3 badge inline-block bg-blue-900 text-white font-medium text-center"
                >
                    {{ formattedPrice(this.exItem.price) }}
                </div>
            </div>

            <div
                class="modal-excursions__total tablet:hidden"
            >
                <div class="flex items-center mb-2">
                    <span class="mr-3">Туристов: </span>

                    <NumericControls
                        class="price-input-numeric__controls sm:py-2 sm:text-base"
                        :class="{'opacity-50 pointer-events-none': isSelectedExcursion}"
                        :min-value="1"
                        :initialVal="Number(exItem.tourists)"
                        :total="Number(exItem.tourists)"
                        v-on:on-numeric-value-change="(val) => this.number_person = val"
                    />
                </div>

                <div>Итого: {{ formattedPrice(getTotalPrice) }}</div>
            </div>
        </div>

        <div class="modal-excursions__content">
            <h4 v-if="exItem.title" class="m-0 mb-3 text-22 font-bold sm:text-xl mob:text-lg">
                {{ exItem.title }}
            </h4>

            <div v-if="exItem.start_time || exItem.end_time" class="time w-full text-base mb-2">
                <div v-if="exItem.start_time" class="start-time"><span class="font-medium">Время начала:</span> {{getTime(exItem.start_time)}}</div>
                <div v-if="exItem.end_time" class="end-time"><span class="font-medium">Время окончания:</span> {{getTime(exItem.end_time)}}</div>
            </div>

            <div v-if="exItem.short_desc" class="modal-excursions__desc text-base mob:text-sm"
                 v-html="exItem.short_desc"></div>

            <div
                class="modal-excursions__total hidden items-center justify-between mt-10 tablet:flex xxs:flex-col"
            >
                <div class="flex items-center xxs:mb-2">
                    <span class="mr-3">Туристов: </span>

                    <NumericControls
                        class="price-input-numeric__controls sm:py-2 sm:text-base"
                        :min-value="1"
                        :initialVal="Number(exItem.tourists)"
                        :total="Number(exItem.tourists)"
                        v-on:on-numeric-value-change="(val) => this.number_person = val"
                    />
                </div>

                <div>Итого: {{ formattedPrice(this.getTotalPrice) }}</div>
            </div>

            <div
                class="mt-10 flex flex-wrap xs:block tablet:mt-4"
            >
                <button
                    type="button"
                    class="button button-transparent xs:w-full xs:mb-3 xs:justify-center"
                    :class="{
                                'flex items-center button-transparent--gray-260 mr-10 pointer-events-none': isSelectedExcursion,
                                'button-transparent--blue-300': !isSelectedExcursion,
                            }"
                    @click="onSelectExcursion"
                >
                    <template v-if="isSelectedExcursion">
                        <svg
                            width="16" height="16"
                            viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-2"
                        >
                            <path
                                class="fill-current"
                                fill-rule="evenodd" clip-rule="evenodd"
                                d="M14.5607 3.43936C15.1465 4.02516 15.1464 4.97491 14.5606 5.56068L7.56064 12.5604C6.97486 13.1461 6.02517 13.1461 5.43939 12.5604L1.93939 9.06071C1.35357 8.47495 1.35353 7.5252 1.93929 6.93939C2.52505 6.35357 3.4748 6.35353 4.06061 6.93929L6.49998 9.37844L12.4394 3.43932C13.0252 2.85354 13.9749 2.85356 14.5607 3.43936Z"
                                fill="#A6AEBA"
                            />
                        </svg>

                        <span>Выбрано</span>
                    </template>

                    <span v-else>Выбрать экскурсию</span>
                </button>

                <BaseButtonCancel
                    v-if="isSelectedExcursion"
                    class="xs:w-full xs:justify-center"
                    @click="onRemoveExcursion"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { formatCurrency } from "@/helpers/text";
    import BaseButtonCancel from "@/components/base/BaseButtonCancel";
    import NumericControls from "@/components/base/NumericControls";

    export default {
        name: "ModalPickExcursionItem",
        components: { NumericControls, BaseButtonCancel },
        props: {
            exItem: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                number_person: 0,
            };
        },
        computed: {
            ...mapGetters({
                getExcursions: "excursions/getExcursions",
                getSelectedEx: "excursions/getSelected",
            }),
            formattedPrice() {
                return price => formatCurrency(price);
            },
            isSelectedExcursion() {
                let res = false;

                if (this.getSelectedEx && this.getSelectedEx.length > 0) {
                    const idx = this.getSelectedEx.findIndex(item => item.id === this.getExcursions.dayID);

                    if (idx !== -1) {
                        res = this.getSelectedEx[idx]["list"].findIndex(item => item.id === this.exItem.id) !== -1;
                    }
                }

                return res;
            },
            getTotalPrice() {
                return this.exItem.price ? Number(this.number_person) * Number(this.exItem.price) : 0;
            },
        },
        methods: {
            ...mapActions({
                closeModal: "modals/closeModal",
                addSelectedExcursion: "excursions/addSelectedExcursion",
                removeSelectedExcursion: "excursions/removeSelectedExcursion",
            }),
            onSelectExcursion() {
                const newItem = { ...this.exItem, ...{ price: this.getTotalPrice } };

                this.addSelectedExcursion({
                    dayID: this.getExcursions.dayID,
                    excursion: {
                        number_person: this.number_person,
                        ...newItem,
                    },
                });
            },
            onRemoveExcursion() {
                this.removeSelectedExcursion({
                    dayID: this.getExcursions.dayID,
                    itemID: this.exItem.id,
                });
            },
            getTime(date) {
                const dateObject = new Date(date);
                let m = dateObject.getMinutes(),
                h = dateObject.getHours();
                h = h < 10 ? ('0' + h) : h;
                m = m < 10 ? ('0' + m) : m;
                return `${h}:${m}`;
            }
        },
        mounted() {
            this.number_person = this.exItem.tourists;
        },
    };
</script>

<style lang="scss" scoped>
    .modal-excursions {
        &__left {
            flex: 0 1 240px;
            margin-right: 40px;
        }

        &__content {
            flex: 1;
        }
    }

    @screen tablet {
        .modal-excursions {
            &__left {
                flex: 0 1 100%;
                margin-right: 0;
                margin-bottom: 20px;
            }
        }
    }
</style>
