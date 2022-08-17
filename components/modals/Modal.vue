<template>
    <transition name="modal">
        <div
            v-if="getModalStatus"
            class="modal"
            :class="getModalCustomClass"
            @mousedown.self="closeModal"
        >
            <div
                class="modal-content"
                :class="{'modal-content--full': getModalSize === 'full'}"
            >
                <button
                    type="button"
                    class="absolute z-1 right-10 top-8 w-4 h-4 text-black-200 custom-transition hover:text-blue-400 tablet:right-3 tablet:top-4"
                    @click="closeModal"
                >
                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill-current"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M16.708 2.7032C17.0985 2.31268 17.0985 1.67951 16.708 1.28899C16.3174 0.898463 15.6843 0.898463 15.2937 1.28899L8.50043 8.08231L1.70711 1.28899C1.31658 0.898463 0.683417 0.898463 0.292893 1.28899C-0.0976311 1.67951 -0.0976311 2.31268 0.292893 2.7032L7.08621 9.49652L0.292893 16.2898C-0.0976311 16.6804 -0.0976311 17.3135 0.292893 17.7041C0.683417 18.0946 1.31658 18.0946 1.70711 17.7041L8.50043 10.9107L15.2937 17.7041C15.6843 18.0946 16.3174 18.0946 16.708 17.7041C17.0985 17.3135 17.0985 16.6804 16.708 16.2898L9.91464 9.49652L16.708 2.7032Z"
                              fill="#1D1F20"/>
                    </svg>

                </button>

                <div class="modal-container">
                    <component v-if="getModalName" :is="getModalName" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Modal",
    components: {
        ModalCall: () => import('@/components/modals/ModalCall'),
        ModalAdministration: () => import('@/components/modals/ModalAdministration'),
        ModalFastBuySuccess: () => import('@/components/modals/ModalFastBuySuccess'),
        ModalFilter: () => import('@/components/modals/ModalFilter'),
        ModalPickExcursion: () => import('@/components/modals/modal-pick-excursion/ModalPickExcursion'),
        ModalHistoryDetail: () => import('@/components/modals/ModalHistoryDetail'),
        ModalSupport: () => import('@/components/modals/ModalSupport'),
        ModalReview: () => import('@/components/modals/ModalReview'),
        ModalExcursions: () => import('@/components/modals/ModalExcursions'),
        ModalFastBuy: () => import('@/components/modals/ModalFastBuy'),
        ModalRegistration: () => import('@/components/modals/ModalRegistration'),
        ModalOrder: () => import('@/components/modals/ModalOrder'),
        ModalActionConfirmation: () => import('@/components/modals/ModalActionConfirmation'),
        ModalSuccess: () => import('@/components/modals/ModalSuccess'),
        ModalError: () => import('@/components/modals/ModalError'),
    },
    computed: {
        ...mapGetters({
            getModalName: "modals/getModalName",
            getModalSize: "modals/getModalSize",
            getModalStatus: "modals/getModalStatus",
            getModalCustomClass: "modals/getModalCustomClass",
        }),
    },
    methods: {
        ...mapActions({
            closeModal: "modals/closeModal",
        }),
    },
    created() {
        let onModalPressEsc = new KeyboardEvent("keydown", { "key": 27 });

        const closeModalOnEsc = (e) => {
            if (this.getModalStatus) {
                if (e.key === "Escape" || e.key === "Esc") {
                    this.closeModal(null);
                }
            }
        };

        document.addEventListener("keydown", closeModalOnEsc, false);
        document.dispatchEvent(onModalPressEsc);

        this.$once("hook:destroyed", () => {
            document.removeEventListener("keydown", closeModalOnEsc);
        });
    },
};
</script>

<style lang="scss" scoped>
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes bounce-in-fwd {
    0% {
        transform: scale(0);
        animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        transform: scale(1);
        animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        transform: scale(0.7);
        animation-timing-function: ease-in;
    }
    72% {
        transform: scale(1);
        animation-timing-function: ease-out;
    }
    81% {
        transform: scale(0.84);
        animation-timing-function: ease-in;
    }
    89% {
        transform: scale(1);
        animation-timing-function: ease-out;
    }
    95% {
        transform: scale(0.95);
        animation-timing-function: ease-in;
    }
    100% {
        transform: scale(1);
        animation-timing-function: ease-out;
    }
}

.modal-enter-active {
    animation: fade-in 0.45s var(--custom-transition) both;
}

.modal-leave-active {
    animation: fade-in 0.3s ease forwards reverse;
}
</style>
