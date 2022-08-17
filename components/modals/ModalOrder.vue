<template>
    <div class="modal-order">
        <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex">
            <Preloader class="m-auto"/>
        </div>

        <h3 v-if="getModalMessage && getModalMessage.title" class="page-inner-h1 leading-1-1 mb-8">
            {{ getModalMessage.title }}
        </h3>
        <p v-if="getModalMessage && getModalMessage.message">{{ getModalMessage.message }}</p>
        <div class="modal-submit-wrap">
            <button type="button" class="button modal-submit" @click="onModalClose">Хорошо</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { parsePhoneMixin } from "@/mixins/content-helpers";
    import Preloader from "@/components/base/Preloader";
    import BaseCheckbox from "@/components/base/BaseCheckbox";
    import ErrorField from "@/components/base/ErrorField";

    export default {
        name: "ModalOrder",
        components: { ErrorField, BaseCheckbox, Preloader },
        mixins: [parsePhoneMixin],
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapGetters({
                getModalMessage: "modals/getModalMessage",
            }),
        },
        methods: {
            ...mapActions({
                closeModal: "modals/closeModal",
                updateModalMessage: "modals/updateModalMessage",
            }),
            onModalClose() {
                this.updateModalMessage(null);
                this.closeModal();
            }
        },
    };
</script>

<style></style>
