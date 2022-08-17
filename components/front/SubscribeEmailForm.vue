<template>
    <div>
    <div class="wrapper-1410-w py-5 bg-gray-50 text-black-400 md:py-10">
        <div class="wrapper wrapper-1410 relative flex flex-wrap items-center justify-between xxl:justify-center about-px md:px-2">
            <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex">
                <Preloader class="m-auto"/>
            </div>
            <p class="mb-0 text-25 font-medium xxl:flex-100 xxl:text-center xxl:mb-4">Не пропустите скидки и лучшие предложения</p>

            <form
                class="flex flex-wrap"
                @submit.prevent="onSubmit"
            >
                <template v-if="!messageSended">
                    <input
                        type="email"
                        name="email"
                        placeholder="Введите Ваш e-mail"
                        required
                        :disabled="loading"
                        autocomplete="off"
                        @focus="formIsActive = true"
                        @blur="formIsActive = false"
                        v-model="email"
                    >

                    <ErrorField
                        v-if="errors"
                        :text="errors[0]"
                        class="modal-item want-form-error xxs:text-xs"
                    />

                    <button type="submit" class="button font-normal px-11 md:flex-100" :disabled="loading">
                        Подписаться на рассылку
                    </button>
                </template>

                <p v-else class="text-black-400">
                    Спасибо за обращение, в скором времени с вами свяжется наш менеджер, а пока вы можете посмотреть
                    <nuxt-link to="/rechnye-kruizy" class="link-inline">наши круизы</nuxt-link>
                    .
                </p>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
    import Preloader from '@/components/base/Preloader';
    import ErrorField from '../base/ErrorField';

    export default {
        name: 'SubscribeEmailForm',
        components: { ErrorField, Preloader },
        data() {
            return {
                formIsActive: false,
                email: '',
                loading: false,
                messageSended: false,
                errors: null,
            };
        },
        methods: {
            async onSubmit() {
                this.loading = true;

                try {
                    const { data } = await this.$axios.post('/subscribe-form', {
                        email: this.email,
                    });
                    if (!data.email) {
                        throw new Error('Не удалось отправить форму.');
                    }

                    // глобальный event для метрик
                    const eventDetail = {
                        email: this.email,
                        formTitle: 'Форма: Подписка на рассылку',
                        url: this.$route.path
                    };
                    window.dispatchEvent(
                        new CustomEvent('SubscribeLineFormSent', { detail: eventDetail })
                    );
                    window.dispatchEvent(
                        new CustomEvent('AnyFormSent', { detail: eventDetail })
                    );

                    this.loading = false;
                    this.messageSended = true;
                } catch (ex) {
                    this.loading = false;
                    this.errors = ['Что-то пошло не так, попробуйте еще раз'];
                    console.log('cant send data: ' + ex);
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    .want-form-error {
        position: absolute;
        left: 50%;
        bottom: 0;
        min-width: 340px;
        margin: 0;
        transform: translateX(-50%);
    }

    form {
        input {
            width: 375px;
            @apply border rounded p-4 pr-9 text-base mr-6 border-gray-100 md:flex-100 md:mr-0 md:mb-4;

            &::placeholder {
                @apply text-base font-normal text-black-400;
            }
        }
    }

    @screen xl {
        .nested-form__input {
            @apply mb-6;
        }
    }

    @media all and (max-width: 768px) {
        form {
            input {
                width: 100%;
            }
        }
    }

    @screen sm {
        .nested-form__submit {
            padding: 19px 10px;
        }
    }

    @media all and (max-width: 420px) {
        .want-form-error {
            min-width: auto;
            width: 100%;
        }
    }
</style>
