<template>
    <div class='flex rounded border border-gray-20 md:flex-col'>
        <div class="modal-registration p-15 md:px-4 md:pb-0 tablet:p-7">
            <div class="modal-item wrapper-223 mb-5 md:hidden">
                <Logo/>
            </div>

            <h3 class="page-inner-h1 text-36 font-medium normal-case leading-1-1 mt-5 mb-8 md:text-30">Вход в личный кабинет</h3>

            <template>
                <form class="form" @submit.prevent="onGetCodeSubmit">
                    <div class="modal-item mb-11 md:mb-9">
                        <label for="modal-phone" class="label font-medium text-15 mb-2.5">Номер телефона</label>
                        <PhoneComponent
                            id="modal-phone"
                            required
                            placeholder="+7 (###) ###-##-##"
                            v-model="phone"
                            ref="inputFocus"
                            :disabled="codeWaiting"
                            :class="{'mb-5': codeWaiting}"
                        />

                        <ErrorField
                            v-if="errors && errors.phone" :text="errors.phone"
                            class="modal-item"
                        />
                    </div>

                    <div v-if='!codeWaiting' class="mt-6 md:text-16">
                        <button
                            type="submit"
                            class="modal-submit modal-submit-150 w-full font-semibold button button-bordered button-transparent--blue-300 py-4"
                            :class="{'disabled': !privacy}"
                            :disabled="hasPrivacy"
                        >
                            Получить провeрочный код
                        </button>
                    </div>

                    <div v-if='!codeWaiting' class="mt-6 base-checkbox-sign-in">
                        <BaseCheckbox
                            id="cart-privacy"
                            name="privacy"
                            label="Я даю согласие на&nbsp;<a href='/privacy' target='_blank'>обработку персональных данных</a>"
                            :labelSelectors="['pl-8 text-xs font-medium pt-1', {'text-black-400': !privacy}]"
                            :markSelectors="['base-checkbox__mark--top w-6 h-6 text-blue-300 border-2 border-blue-300', {'border-black-400': !privacy}]"
                            required="true"
                            :custom-val="privacy"
                            v-model="privacy"
                        />
                    </div>
                </form>
            </template>

            <template v-if="codeWaiting">
                <form
                    class="modal-code"
                    :class="{ 'relative overflow-hidden': loading }"
                    @submit.prevent="onLoginSubmit"
                >
                    <template v-if="loading">
                        <div class="absolute z-1 left-0 top-0 w-full h-full flex items-center justify-center">
                            <Preloader />
                        </div>
                    </template>

                    <div :class="{ 'disabled': loading }">
                        <div class="modal-item ">
                            <label for="modal-code" class="label font-medium text-15">Введите проверочный код</label>
                            <input
                                type="text"
                                name="name"
                                id="modal-code"
                                required
                                :disabled="isLoading"
                                autocomplete="off"
                                placeholder="Введите код из смс"
                                v-model="code"
                                class='border border-gray-30 p-5 '
                            >
                            <ErrorField
                                v-if="errors && errors.message" :text="errors.message"
                                class="modal-item"
                            />
                        </div>

                        <!--                    <p v-if="successMessage">{{ successMessage }}</p>-->

                        <div class="modal-submit-wrap flex flex-col items-start xs:block md:mt-4">

                            <div class="xs:w-full flex flex-col items-start">
                                <transition name="timer">
                                    <div v-if="!canRequestSmsCode" class="text-sm mb-2.5">
                                        Проверочный код можно получить через
                                        <span class="w-10 inline-block">{{ formattedTimer }}</span>
                                    </div>
                                </transition>

                                <transition name="timer">
                                    <button
                                        type="button"
                                        class="text-sm font-normal border-b text-gray-300 hover:border-blue-300 hover:text-blue-300 mb-11"
                                        @click="onRepeatClick"
                                        :disabled="isLoading"
                                    >
                                        Отправить код повторно
                                    </button>
                                </transition>
                            </div>

                            <button
                                type="submit"
                                class="button button-bordered w-full button-transparent--blue-300 py-4 modal-submit-150 xs:w-full xs:mb-2"
                                :disabled="isLoading"
                            >
                                Продолжить
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </div>
        <div class='modal-registration border-l-2 p-15 tablet:p-7 border-gray-20 bg-gray-40 rounded-r-lg md:px-4 md:mx-4 md:mt-18 md:mb-4 md:border md:rounded md:border-gray-20'>
            <h3 class="page-inner-h1 text-30 font-medium normal-case leading-1-1 mb-5 md:mb-2.5">Преимущества
                личного&nbspкабинета</h3>
            <p class='text-15 font-normal text-black-400 mb-10 md:mb-7'>Используйте на 100% возможности сайта</p>
            <ul class='text-sm text-black-900 font-normal list-disc pl-5'>
                <li>Ослеживать статус заказа</li>
                <li>Общайтесь с тех. поддержкой сайта</li>
            </ul>
        </div>
    </div>

</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { parsePhoneMixin } from "@/mixins/content-helpers";
    import BaseCheckbox from "@/components/base/BaseCheckbox";
    import ErrorField from "@/components/base/ErrorField";
    import Preloader from "@/components/base/Preloader";
    import PhoneComponent from '../base/PhoneComponent';
    import Logo from "@/components/base/Logo";


    const startTime = 60;
    const endTime = 0;

    export default {
        name: "ModalRegistration",
        components: { PhoneComponent, Preloader, ErrorField, BaseCheckbox, Logo },
        mixins: [parsePhoneMixin],
        data() {
            return {
                privacy: false,
                phone: null,
                code: null,
                codeWaiting: false,
                codeWaitingTimer: null,
                errors: {},
                timer: startTime,
                timerID: null,
                loading: false,
                successMessage: null,
            };
        },
        computed: {
            ...mapGetters({
                getModalCb: "modals/getModalCb",
                getCartItem: "cart/getCartItem",
            }),
            /**
             * Можно отправить смс с кодом повторно.
             * @boolean
             */
            canRequestSmsCode() {
                return this.timer <= endTime;
            },
            /**
             * Строка с временем в формате 00:00.
             * @string
             */
            formattedTimer() {
                return this.timer < 10 ? `00:0${this.timer}` : `00:${this.timer}`;
            },
            /**
             * Для disabled на форме во время загрузки
             */
            isLoading() {
                return this.loading ? "disabled" : null;
            },
            hasPrivacy() {
                return this.privacy ? null : "disabled";
            },
        },
        methods: {
            ...mapActions({
                openModal: "modals/openModal",
                closeModal: "modals/closeModal",
                updateModalCb: "modals/updateModalCb",
                updateUser: "users/updateUser",
                updateToken: "users/updateToken",
                addItemToCart: "cart/addItemToCart",
                fetchCartItems: "cart/fetchCartItems",
            }),
            /**
             * Post Запрос на получение кода из по телефону.
             */
            async onGetCodeSubmit() {
                try {
                    this.codeWaiting = true;
                    this.runTimer();
                    const phone = this.chParsePhone(this.phone);
                    const { data } = await this.$axios.post("/login", { phone });
                    this.successMessage = data;
                } catch (ex) {
                    this.codeWaiting = false;
                    console.log('cant get code: ' + ex);

                    if (ex.response.status === 404) {
                        this.errors = { phone: ex.response.data };
                    } else {
                        this.errors = { phone: "Что-то пошло не так, попробуйте позже" };
                    }
                }
            },
            /**
             * Post Запрос на логин по коду из смс, далее закидываем в стор данные пользователя.
             */
            async onLoginSubmit() {
                this.loading = true;

                try {
                    const { data } = await this.$axios.post("/verification", { code: this.code });
                    await this.updateUser(data.user);
                    await this.updateToken(data.token);

                    if (this.getModalCb && this.getModalCb === "addItemToCart") {
                        await this.addItemToCart(this.getCartItem);
                        // await this.updateModalCb(null); TODO Чистить стор после выполнения
                    } else {
                        await this.fetchCartItems();
                    }

                    // глобальный event для метрик
                    const eventDetail = {
                        name: data.user.name,
                        phone: data.user.phone,
                        url: this.$route.path
                    };
                    window.dispatchEvent(
                        new CustomEvent('LoginFormSent', { detail: eventDetail })
                    );
                    window.dispatchEvent(
                        new CustomEvent('AnyFormSent', { detail: eventDetail })
                    );

                    this.loading = false;
                    this.closeModal();
                } catch (e) {
                    console.log(e);
                    this.loading = false;
                    const errResponse = e.response;

                    if (errResponse.status === 422) {
                        this.errors.message = errResponse.data.errors.code[0];
                    } else if (errResponse.status === 404) {
                        this.errors.message = errResponse.data;
                    } else if (errResponse.status === 403) {
                        this.errors.message = "Отправьте код повторно"; // Срок кода истек
                    } else {
                        this.errors.message = "Что то пошло не так, попробуйте позже.";
                    }
                }
            },
            /**
             * Повторный запрос на получение кода из смс по телефону.
             */
            async onRepeatClick() {
                this.loading = true;
                this.stopTimer();
                this.timer = startTime;
                await this.onGetCodeSubmit();
                this.loading = false;
            },
            runTimer() {
                this.timerID = setInterval(() => {
                    this.timer--;
                }, 1000);
            },
            stopTimer() {
                clearInterval(this.timerID);
                this.timerID = null;
            },
        },
        watch: {
            timer(val) {
                if (val <= endTime) {
                    this.stopTimer();
                    this.timer = endTime;
                }
            },
        },
        mounted() {
            const inputFocus = this.$refs.inputFocus.$el;
            if (inputFocus) inputFocus.focus();
        },
        beforeDestroy() {
            this.stopTimer();
        },
    };
</script>

<style scoped lang='scss'>
    .timer-enter-active {
        animation: fade-in-block 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .wrapper-223 {
        max-width: 223px;
    }
    .modal-item {
        &::v-deep {
            .input {
                @apply bg-white border border-gray-30 py-4;
            }
        }
    }
    .base-checkbox-sign-in {
        &::v-deep {
            .base-checkbox__label a{
                @apply text-black-400 hover:text-blue-300 border-b hover:border-blue-300;
            }
        }
    }
    .modal-registration {
        max-width: 465px;
    }

    .modal-item {
        & input {
            @apply text-15 font-normal text-black-400;
            &::placeholder {
                @apply text-15 font-normal text-black-400;

            }
        }
    }
</style>
