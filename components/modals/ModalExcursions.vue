<template>
    <div class="modal-excursions">
        <h3 class="page-inner-h1 leading-1-1 mb-8 tablet:mb-3">Доступные экскурсии дня</h3>

        <div class="mb-10 tablet:mb-4">
            <p v-if="getExcursions.day" class="m-0 text-22 font-bold">
                <span>{{ getExcursions.day }}</span> День
            </p>
            <p v-if="getExcursions.title" class="m-0 text-gray-300 text-lg">{{ getExcursions.title }}</p>
        </div>

        <div v-if="getExcursions && getExcursions.list.length > 0" class="modal-excursions__list">
            <div
                v-for="(exItem, exIdx) in getExcursions.list"
                :key="exIdx"
                class="modal-excursions__item flex flex-wrap items-start pb-5 mb-5 border-b border-gray-50 last:p-0 last:m-0 last:border-0"
            >
                <div
                    v-if="exItem.title && exItem.urt"
                    class="modal-excursions__image rounded-sm overflow-hidden"
                >
                    <img :src="exItem.image_360_160? exItem.image_360_160: exItem.urt" :alt="exItem.title" class="w-full h-full object-cover">
                </div>

                <div class="modal-excursions__content">
                    <h4 v-if="exItem.title" class="m-0 mb-3 text-22 font-bold sm:text-xl mob:text-lg">{{ exItem.title }}</h4>
                    <div v-if="exItem.start_time || exItem.end_time" class="time w-full text-base mb-2">
                        <div v-if="exItem.start_time" class="start-time"><span class="font-medium">Время начала:</span> {{getTime(exItem.start_time)}}</div>
                        <div v-if="exItem.end_time" class="end-time"><span class="font-medium">Время окончания:</span> {{getTime(exItem.end_time)}}</div>
                    </div>
                    <div
                        v-if="exItem.short_desc" class="modal-excursions__desc text-lg sm:text-base mob:text-sm"
                        v-html="exItem.short_desc"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "ModalExcursions",
        components: {},
        data() {
            return {};
        },
        methods: {
            ...mapActions({
                closeModal: "modals/closeModal",
                addExcursion: "excursions/addExcursion",
                removeExcursion: "excursions/removeExcursion",
            }),
            onSelectExcursion(item) {
                this.addExcursion(item);
            },
            onRemoveExcursion(id) {
                this.removeExcursion(id);
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
        computed: {
            ...mapGetters({
                getExcursions: "excursions/getExcursions",
                getSelectedEx: "excursions/getSelected",
            }),
            isSelectedExcursion() {
                return (id) => {
                    if (this.getSelectedEx && this.getSelectedEx.length > 0) {
                        const idx = this.getSelectedEx.findIndex(item => item.id === id);
                        return idx !== -1;
                    }

                    return false;
                };
            },
        },
    };
</script>

<style lang="scss" scoped>
    .modal-excursions {
        &__image {
            flex: 0 1 240px;
            margin-right: 40px;
        }

        &__content {
            flex: 1;
        }
    }

    @screen tablet {
        .modal-excursions {
            &__image {
                flex: 0 1 100%;
                margin-right: 0;
                margin-bottom: 20px;
            }
        }
    }
</style>
