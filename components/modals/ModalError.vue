<template>
    <div class="modal-error">
        <p class="w-full h-full py-10 pb-6 flex items-center justify-center font-medium text-center text-red-400">
            {{ getModalMessage }}
        </p>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'ModalError',
        computed: {
            ...mapGetters({
                getModalMessage: "modals/getModalMessage"
            })
        },
    };
</script>

<style scoped></style>
