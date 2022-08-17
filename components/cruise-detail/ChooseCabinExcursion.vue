<template>
    <div
        v-if="hasExcursions"
        class="choose-cabin-excursion flex items-center md:flex-col mb-2 last:mb-0"
    >
        <div class="md:flex md:items-center md:justify-between md:mb-3">
            <h3 class="min-w-20 text-lg m-0 mr-4 md:mr-3">{{ item.day }} День</h3>

            <span
                v-if="hasSelectedExcursions(item.id)"
                class="text-lg font-bold text-blue-900 hidden md:block"
            >
                Выбрано экскурсий: {{ getSelectedExcursions(item.id).length }}
            </span>
        </div>

        <div class="flex items-center md:flex-col">
            <span
                class="choose-cabin-excursion__count custom-transition min-w-64 py-3 px-4 text-blue-300 text-center text-lg font-bold border-2 border-blue-300 rounded-sm overflow-hidden rounded-r-none md:w-full md:flex md:items-center md:justify-center md:rounded-b-none"
            >
               {{ item.list.length }} <span class="md:ml-2">{{ getExcursionsName }}</span>
            </span>

            <button
                type="button"
                class="custom-transition w-56 py-3 px-4 mr-4 bg-blue-900 text-white text-center text-lg font-bold border-2 border-l-0 border-blue-900 rounded-sm overflow-hidden rounded-l-none hover:bg-white hover:text-blue-900 md:mr-0 md:w-full md:rounded-t-none md:rounded-b"
                @click="onCallExcursionClick"
            >
                Выбрать экскурсию
            </button>
        </div>

        <div class="flex flex-wrap items-center flex-initial">
            <span
                v-if="hasSelectedExcursions(item.id)"
                class="text-lg font-bold text-blue-900 w-full md:hidden"
            >
                Выбрано экскурсий: {{ getSelectedExcursions(item.id).length }}
            </span>

            <BaseButtonCancel
                v-if="hasSelectedExcursions(item.id)"
                @click="onRemoveSelectedExcursions"
                class="text-base ml-0 2xl:w-full md:text-lg md:mt-6"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from "vuex";
    import { setCase } from "@/helpers/text";
    import BaseButtonCancel from "@/components/base/BaseButtonCancel";
    import NumericControls from "@/components/base/NumericControls";

    export default {
        name: "ChooseCabinExcursion",
        components: { NumericControls, BaseButtonCancel },
        props: {
            item: {
                type: Object,
                required: true,
            },
            totalTourists: {
                type: Number,
                required: true,
            },
        },
        computed: {
            ...mapGetters({
                getSelectedEx: "excursions/getSelected",
            }),
            hasExcursions() {
                return this.item.list && this.item.list.length > 0;
            },
            getExcursionsName() {
                return setCase(Number(this.item.list.length), ["доступная экскурсия", "доступные экскурсии", "доступных экскурсий"], "<");
            },
            getSelectedExcursions() {
                return (dayID) => {
                    let res = [];

                    if (this.getSelectedEx && this.getSelectedEx.length > 0) {
                        const copy = JSON.parse(JSON.stringify(this.getSelectedEx));
                        const idx = copy.findIndex(item => item.id === dayID);

                        if (idx !== -1) {
                            res = copy[idx]["list"];
                        }
                    }

                    return res;
                };
            },
            hasSelectedExcursions() {
                return (id) => this.getSelectedExcursions(id) && this.getSelectedExcursions(id).length > 0;
            },
        },
        methods: {
            ...mapMutations({
                setExcursions: "excursions/setExcursions",
            }),
            ...mapActions({
                openModal: "modals/openModal",
                removeSelectedGroup: "excursions/removeSelectedGroup",
            }),
            onCallExcursionClick() {
                this.openModal({
                    name: "ModalPickExcursion",
                    size: "full",
                });

                this.item.list = this.item.list.map(listItem => {
                    listItem.tourists = this.totalTourists;
                    return listItem;
                });

                this.setExcursions({
                    dayID: this.item.id,
                    list: this.item.list,
                });
            },
            onRemoveSelectedExcursions() {
                this.removeSelectedGroup(this.item.id);
            },
        },
    };
</script>

<style lang="scss" scoped>
    /*@media all and (max-width: 1800px) {*/
        .choose-cabin-excursion {
            &__count {
                min-width: 56px;
                max-width: 56px;

                span {
                    display: none;
                }
            }
        }
    /*}*/

    @screen md {
        .choose-cabin-excursion {
            max-width: 330px;
            margin-left: auto;
            margin-right: auto;

            & > * {
                width: 100%;
            }

            &__count {
                min-width: auto;
                max-width: 100%;

                span {
                    display: flex;
                }
            }
        }
    }
</style>
