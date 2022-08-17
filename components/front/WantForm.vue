<template>
    <div
        class="want-form relative py-12 text-white md:py-10"
        :class="[bgColor, {'disabled': loading}]"
    >
        <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex">
            <Preloader class="m-auto"/>
        </div>

        <div class="wrapper flex items-center justify-between xl:block md:px-6">
            <h2 class="m-0 text-44 text-white mr-12">{{ title }}</h2>

            <form
                class="nested-form relative flex-1 custom-transition border border-transparent"
                :class="{'border-black-400': formIsActive}"
                @submit.prevent="onWantFormSubmit"
            >
                <template v-if="!messageSended">
                    <PhoneComponent
                        name="phone"
                        class="nested-form__input nested-form__item"
                        required
                        placeholder="Введите номер телефона"
                        :disabled="loading"
                        @focus="formIsActive = true"
                        @blur="formIsActive = false"
                        v-model="phone"
                    />

                    <ErrorField v-if="errors" :text="errors[0]" class="modal-item want-form-error" />

                    <button type="submit" class="nested-form__submit button" :disabled="loading">
                        Заказать звонок
                    </button>
                </template>

                <p v-else class="text-black-400">
                    Спасибо за обращение, в скором времени с вами свяжется наш менеджер, а пока вы можете посмотреть
                    <nuxt-link to="/rechnye-kruizy" class="link-inline">наши круизы</nuxt-link>.
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import Preloader from "@/components/base/Preloader";
import ErrorField from "@/components/base/ErrorField";
import PhoneComponent from '../base/PhoneComponent';

export default {
    name: "WantForm",
    components: { PhoneComponent, ErrorField, Preloader },
    props: {
        title: {
            type: String,
            default: "Хочу в круиз",
        },
        bgColor: {
            type: String,
            default: "bg-blue-400",
        }
    },
    data() {
        return {
            loading: false,
            formIsActive: false,
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
                    formTitle: 'Форма: Хочу в круиз!',
                    phone: this.phone,
                    name: this.phone
                };
                const { data } = await this.$axios.post('/callback-form', { ...formData });

                // глобальный event для метрик
                const eventDetail = { ...formData, url: this.$route.path };
                window.dispatchEvent(
                    new CustomEvent('IWantToCruiseFormSent', { detail: eventDetail })
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
    watch: {
        formIsActive(val) {
            if (val) {
                this.errors = null;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.want-form {
    &--gray {
        @apply bg-gray-50;

        h2 {
            @apply text-black-400 leading-1-1 normal-case text-42 font-bold m-0 mr-12;
        }
    }

    &-error {
        position: absolute;
        left: 50%;
        bottom: 0;
        margin: 0;
        transform: translateX(-50%);
    }
}

.want-form .wrapper {
    max-width: 1190px;
}

@screen xl {
    .want-form {
        h2 {
            @apply text-42 m-0 mb-8 text-center;
        }

        .nested-form {
            flex-wrap: wrap;
        }

        .nested-form__input {
            text-align: center;
            margin-bottom: 1rem;
        }

        .nested-form__submit {
            margin-left: 0;
        }

        .nested-form__submit,
        .nested-form__input {
            flex: 0 1 100%;
        }

        &-error {
            top: 0;
            bottom: auto;
        }
    }
}
</style>
