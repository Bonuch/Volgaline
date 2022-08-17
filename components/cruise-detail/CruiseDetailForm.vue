<template>
    <div class='cruise-detail-form rounded-sm pt-11 pb-16'>
        <div class='cruise-deck-scheme-wrapper'>
            <div class='cruise-detail-form-content'>
                <p class='cruise-detail-tab-content__title font-bold mb-5'>
                    Сложно выбрать? Наш эксперт поможет Вам
                </p>
                <p class='m-0 mb-14 text-sm leading-snug xs:mb-8'>
                    Оставьте номер телефона и получите консультацию и подборку
                    от экспертов Волга Лайн
                </p>

                <form
                    class='cruise-detail-form-form'
                    @submit.prevent='onWantFormSubmit'
                >
                    <div v-if='!messageSended'>
                        <div class='flex mb-10 xs:block xs:mb-6'>
                            <PhoneComponent
                                name='phone'
                                class='input py-4 bg-white mr-4 text-base xs:mr-0 xs:mb-4'
                                required
                                :disabled='loading'
                                placeholder='+7 (999) 999 99 99'
                                v-model='phone'
                            />

                            <ErrorField v-if='errors' :text='errors[0]' class='modal-item text-sm want-form-error' />

                            <button
                                type='submit'
                                class='button px-16 text-base font-medium xs:w-full xs:px-4'
                                :disabled='loading'
                            >
                                Отправить
                            </button>
                        </div>

                        <p class='m-0 text-sm leading-snug'>
                            Нажимая на "Отправить" вы соглашаетесь <a href="/privacy" class="link-inline" target="_blank">на обработку ваших персональных данных</a>
                        </p>
                    </div>

                    <p v-else class='text-sm text-black-400'>
                        Спасибо за обращение, в скором времени с вами свяжется наш менеджер.
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import PhoneComponent from '../base/PhoneComponent';
import ErrorField from '../base/ErrorField';

export default {
    name: 'CruiseDetailForm',
    components: { ErrorField, PhoneComponent },
    data() {
        return {
            loading: false,
            phone: "",
            messageSended: false,
            errors: null,
        };
    },
    methods: {
        async onWantFormSubmit() {
            this.loading = true;

            try {
                const formData = {
                    formTitle: 'Форма: Сложно выбрать? Наш эксперт поможет Вам',
                    phone: this.phone,
                    name: this.phone
                };
                const { data } = await this.$axios.post('/callback-form', { ...formData });

                // глобальный event для метрик
                const eventDetail = { ...formData, url: this.$route.path };
                window.dispatchEvent(
                    new CustomEvent('ICannotChoose', { detail: eventDetail })
                );
                window.dispatchEvent(
                    new CustomEvent('AnyFormSent', { detail: eventDetail })
                );

                this.loading = false;
                this.messageSended = true;
            } catch (ex) {
                this.loading = false;
                this.errors = ["Что-то пошло не так, попробуйте еще раз"];
                console.log('cant send data: ' + ex);
            }
        },
    },
};
</script>

<style lang='scss' scoped>
.cruise-detail-form {
    background: #F5F3FE url('~assets/images/inner/cruise-detail-form.jpg') no-repeat right top;

    &-form {
        max-width: 600px;
    }
}

@screen lg {
    .cruise-detail-form {
        background-image: none;
    }
}
</style>
