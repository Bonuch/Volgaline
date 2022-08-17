<template>
    <div class="agents-form-request pt-11 pb-16 lg:pt-10 sm:mb-20 sm:pb-0">
        <div class="wrapper-1036 px-4 mx-auto">
            <div class="py-8 px-6 mb-8 h3 text-center border-2 border-red-400 rounded-sm lg:text-2xl xs:text-xl">
                Контактный телефон для&nbsp;агенств <span class="mx-1 md:hidden"></span> +7&nbsp;495&nbsp;023&nbsp;-&nbsp;93&nbsp;-&nbsp;05
            </div>
        </div>

        <div class='cruise-detail-form rounded-sm lg:mx-4'>
            <div class='wrapper wrapper-1410 rounded-sm'>
                <div class='cruise-detail-form-content'>
                    <p class='cruise-detail-tab-content__title font-bold sm:font-medium sm:text-2xl mb-5 sm:mb-4'>
                        Оставьте заявку на&nbsp;сотрудничество
                    </p>
                    <p class='m-0 mb-10 text-base leading-snug sm:mb-8'>
                        Оставьте номер телефона и&nbsp;получите консультацию и&nbsp;подборку
                        от&nbsp;экспертов Волга Лайн
                    </p>

                    <form
                        class='cruise-detail-form-form relative'
                        @submit.prevent='onWantFormSubmit'
                    >
                        <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex">
                            <Preloader class="m-auto"/>
                        </div>

                        <div v-if='!messageSended'>
                            <div class='flex flex-col mb-10 xs:block xs:mb-6'>

                                <input
                                    type='text'
                                    name='organisation'
                                    required
                                    :disabled='loading'
                                    placeholder='Название Агенства'
                                    class='input py-4 px-6 bg-white border border-gray-100 text-black-400 text-base mb-2.5'
                                    v-model='name_agency'
                                >
                                <input
                                    type='text'
                                    name='person'
                                    required
                                    :disabled='loading'
                                    placeholder='Контактное лицо (ФИО)'
                                    class='input py-4 px-6 bg-white border border-gray-100 text-black-400 text-base mb-2.5'
                                    v-model='full_name'
                                >

                                <input
                                    name='text'
                                    class='input py-4 px-6 bg-white border border-gray-100 text-black-400 text-base mb-2.5'
                                    required
                                    :disabled='loading'
                                    placeholder='Телефон или почта'
                                    v-model='contact'
                                    minlength="7"
                                />

                                <ErrorField v-if='errors && errors.length > 0' :text='errors[0]' class='modal-item text-sm want-form-error' />

                                <div class="mb-8"></div>

                                <button
                                    type='submit'
                                    class='button px-16 text-base font-medium xs:w-full xs:px-4'
                                    :disabled='loading'
                                >
                                    Отправить
                                </button>
                            </div>

                            <p class='m-0 text-sm leading-snug'>
                                Нажимая на&nbsp;"Отправить" вы&nbsp;соглашаетесь на&nbsp;обработку ваших <a href="/privacy" class="link-inline" target="_blank">персональных данных</a>
                            </p>
                        </div>

                        <p v-else class='text-sm text-black-400'>
                            Спасибо за обращение, в&nbsp;скором времени с&nbsp;вами свяжется наш менеджер.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AgentsFormRequest',
    components: {
        Preloader: () => import("@/components/base/Preloader"),
        ErrorField: () => import("@/components/base/ErrorField"),
    },
    data() {
        return {
            loading: false,
            contact: "",
            name_agency: "",
            full_name: "",
            messageSended: false,
            errors: null,
        };
    },
    methods: {
        async onWantFormSubmit() {
            this.loading = true;

            try {
                const formData = {
                    contact: this.contact,
                    name_agency: this.name_agency,
                    full_name: this.full_name,
                };
                const { data } = await this.$axios.post('/request-cooperation', { ...formData });

                // глобальный event для метрик
                const eventDetail = { ...formData, url: this.$route.path };
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
    & > .wrapper {
        background: #f2f7fb url('~assets/images/inner/agents-form.jpg') no-repeat center / cover;
    }

    &-content {
        max-width: 480px;
    }
    &-form {
        max-width: 480px;
    }
}
.input::placeholder {
    @apply font-normal text-base;
}
.cruise-detail-form-content {
    @apply py-11;
}
@screen lg {
    .cruise-deck-scheme-wrapper {
        @apply px-0;
    }
    .cruise-detail-form {
        &-content {
            max-width: 100%;
        }
        &-form {
            max-width: 100%;
        }
    }

}
</style>
