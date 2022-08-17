<template>
    <div class="modal-excursions">
        <h3 class="page-inner-h1 leading-1-1 mb-8 tablet:mb-3">Доступные экскурсии дня</h3>

        <div
            v-if="getExcursions && getExcursions.list.length > 0"
            class="modal-excursions__list"
        >
            <ModalPickExcursionItem
                v-for="(exItem) in getExcursions.list"
                :key="exItem.id"
                :ex-item="exItem"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import ModalPickExcursionItem from "./ModalPickExcursionItem";

    export default {
        name: "ModalPickExcursion",
        components: { ModalPickExcursionItem },
        computed: {
            ...mapGetters({
                getExcursions: "excursions/getExcursions",
            }),
        },
    };
</script>

<style></style>
