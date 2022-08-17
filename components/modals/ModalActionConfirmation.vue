<template>
    <div class="modal-dialog relative">
        <div
            class='absolute left-0 top-0 w-full h-full flex items-center justify-center'
            v-if="loading"
        >
            <Preloader class='z-2' />
        </div>

        <div class="pt-10 pb-4"
            :class="{'disabled': loading}"
        >
            <p class="font-semibold mb-8">
                {{ getMessage }}
            </p>

            <div class="flex justify-between w-1/2 sm:w-full mx-auto">
                <button
                    @click="cancelOrder"
                    class="button py-2"
                >
                    да
                </button>

                <button
                    class="button py-2"
                    @click="closeModal"
                >
                    нет
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "ModalActionConfirmation",
        components: { Preloader: () => import("@/components/base/Preloader") },
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapGetters({
                callback: "modals/getModalCb",
                getMessage: "modals/getModalMessage"
            }),
        },
        methods: {
            ...mapActions({
                'closeModal': 'modals/closeModal',
            }),
            async cancelOrder() {
                this.loading = true;
                await this.callback();
                this.loading = false;
            }
        },
    };
</script>

<style></style>
