<template>
    <div class="modal-success">
        <p class="w-full h-full py-10 pb-6 flex items-center justify-center font-medium text-center">
            {{ getModalMessage }}
        </p>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ModalSuccess",
        computed: {
            ...mapGetters({
                getModalMessage: "modals/getModalMessage"
            })
        },
    };
</script>

<style scoped></style>
