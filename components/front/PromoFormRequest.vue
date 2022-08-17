<template>
    <div
        class="want-form wrapper-1410 relative py-12 text-white md:py-10">
        <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex"
             :class="[bgColor, {'disabled': loading}]">
            <Preloader class="m-auto"/>
        </div>
        <div class="wrapper flex items-center justify-between xl:flex-col">
            <div class="flex items-start flex-col xl:block md:px-6 xs:px-0">
                <h2 class="m-0 text-25 mr-12 mb-5 md:text-20" style="color: #1D1F20;">{{ title }}</h2>

                <p class="text-16 mb-12" style="color: #1D1F20; max-width: 535px;">Оставьте номер телефона, наш менеджер свяжется с Вами
                    в течении одного часа</p>

                <form
                    class="nested-form relative flex-1 custom-transition border border-transparent"
                    :class="{'border-black-400': formIsActive}"
                    @submit.prevent="onWantFormSubmit"
                >
                    <template v-if="!messageSended">
                        <PhoneComponent
                            name="phone"
                            class="nested-form__input nested-form__item nested-form__submit"
                            required
                            placeholder=" "
                            :disabled="loading"
                            @focus="formIsActive = true"
                            @blur="formIsActive = false"
                            v-model="phone"
                        />

                        <ErrorField v-if="errors" :text="errors[0]" class="modal-item want-form-error"/>

                        <button type="submit" class="nested-form__submit button" :disabled="loading">
                            Отправить
                        </button>
                    </template>

                    <p v-else class="text-black-400">
                        Спасибо за обращение, в скором времени с вами свяжется наш менеджер, а пока вы можете посмотреть
                        <nuxt-link to="/rechnye-kruizy" class="link-inline">наши круизы</nuxt-link>
                        .
                    </p>
                </form>

                <span class="block text-14 text-black-400 xl:mt-4 xl:text-center"> Нажимая на "Отправить" вы соглашаетесь на обработку ваших
                    <a href="/polzovatelskoe-soglashenie" class="link-inline" target="_blank">
                       персональных данных
                    </a>
                </span>

            </div>
            <img src="/images/msk-spb/msk-spb.png" alt="msk-spb" class="xl:mt-6">
        </div>
    </div>
</template>

<script>
import Preloader from "@/components/base/Preloader";
import ErrorField from "@/components/base/ErrorField";
import PhoneComponent from '../base/PhoneComponent';

export default {
    name: "PromoFormRequest",
    components: {PhoneComponent, ErrorField, Preloader},
    props: {
        title: {
            type: String,
            default: "Хочу в круиз",
        },
        bgColor: {
            type: String,
            default: "bg-violet-50",
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
                const {data} = await this.$axios.post('/callback-form', {...formData});

                // глобальный event для метрик
                const eventDetail = {...formData, url: this.$route.path};
                window.dispatchEvent(
                    new CustomEvent('IWantToCruiseFormSent', {detail: eventDetail})
                );
                window.dispatchEvent(
                    new CustomEvent('AnyFormSent', {detail: eventDetail})
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
    computed: {
        getSiteDomain() {
            return process.env.SITE_URL;
        },
    }
};
</script>

<style lang="scss" scoped>
.want-form {
    background-color: #F5F3FE;

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
    max-width: 1300px;
}

.nested-form__submit.button {
    margin-left: 0 !important;
}

.nested-form {
    padding: 0;
    background-color: transparent;

    &__input {
        border: 1px solid #BFC6CF;
        border-radius: 4px;
        min-width: 375px;
    }

    &__submit::v-deep {
        margin-left: 0px;
    }

}

@screen xl {
    .want-form {
        h2 {
            @apply text-30;
        }

        .nested-form {
            flex-wrap: wrap;
        }

        .nested-form {
            &__input {
                min-width: auto;
                text-align: center;
                margin-bottom: 1rem;
            }
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

    .nested-form {
        padding: 0;
    }

    .nested-form__submit.button {
        margin-left: 0 !important;
    }
}

@screen xs {
    .want-form {
        h2 {
            @apply text-30;
        }
    }

    .nested-form {
        &__input {
            min-width: auto;
        }
    }
}
</style>
