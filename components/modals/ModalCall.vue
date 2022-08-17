<template>
    <form method="post" class="modal-call" @submit.prevent="onSubmit">
        <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex">
            <Preloader class="m-auto"/>
        </div>

        <template v-if="!messageSended">
            <div class="modal-item wrapper-w-254">
                <Logo/>
            </div>


            <h3 class="page-inner-h1 normal-case font-normal text-black-400 text-30 tablet:text-2xl sm:text-xl text-center leading-1-1 mb-8">Заказать обратный звонок <br> "Волга Лайн"</h3>

<!--            <p class="text-center text-xl font-normal mb-8">Заказжите обратный звонок менеджера компании "Волга&nbsp;Лайн"</p>-->

            <div class="modal-item max-w-sm mx-auto">
                <input
                    type="text"
                    name="name"
                    id="modal-name"
                    class="input text-base py-4 px-5 bg-white border-gray-400 border text-black-400"
                    required
                    autocomplete="off"
                    placeholder="Ваше имя"
                    v-model="name"
                    :disabled="disabled"
                >
            </div>

            <div class="phone-style-callback modal-item max-w-sm my-0 mx-auto">
                <PhoneComponent
                    id="modal-phone"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    v-model="phone"
                    class=""
                />
            </div>

            <ErrorField v-if="errors" :text="errors[0]" class="modal-item" />

            <div class="modal-submit-wrap max-w-sm mx-auto mt-9">
                <button
                    type="submit"
                    class="button modal-submit w-full"
                    :class="{ 'disabled': disabled }"
                    :disabled="disabled"
                >
                    Перезвоните мне
                </button>
            </div>

            <div class="modal-item max-w-sm mx-auto mt-4">
<!--                <BaseCheckbox-->
<!--                    id="modal-privacy"-->
<!--                    name="privacy"-->
<!--                    label="Я согласен с <a href='/privacy' target='_blank'>условиями обработки</a> персональных данных"-->
<!--                    :labelSelectors="['pl-8 text-lg font-medium', {'text-red-400': !privacy}]"-->
<!--                    :markSelectors="['w-6 h-6 text-gray-300 border border-gray-300', {'border-red-400': !privacy}]"-->
<!--                    required="true"-->
<!--                    :custom-val="privacy"-->
<!--                    v-model="privacy"-->
<!--                    :disabled="loading"-->
<!--                />-->
                <p class="text-sm text-normal">Нажимая на "Перезвоните мне" вы соглашаетесь на обработку ваших <a class="underline" href='/privacy' target='_blank'>персональных данных</a></p>
            </div>

        </template>

        <p v-else class="p-10">
            Спасибо за обращение, в скором времени с вами свяжется наш менеджер, а пока вы можете посмотреть
            <a href="/rechnye-kruizy" class="link-inline" @click.prevent="onLinkClick">наши круизы</a>
        </p>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';
    import { parsePhoneMixin } from "~/mixins/content-helpers";
    import Preloader from "@/components/base/Preloader";
    import BaseCheckbox from "@/components/base/BaseCheckbox";
    import ErrorField from "@/components/base/ErrorField";
    import PhoneComponent from '../base/PhoneComponent';
    import Logo from "@/components/base/Logo";

    export default {
        name: "ModalCall",
        components: {Logo, PhoneComponent, ErrorField, BaseCheckbox, Preloader },
        mixins: [parsePhoneMixin],
        data() {
            return {
                loading: false,
                name: null,
                phone: null,
                privacy: true,
                errors: null,
                messageSended: false,
                placeholder: 'Ваш номер телефона',
            };
        },
        computed: {
            disabled() {
                return !this.privacy || this.loading;
            },
        },
        methods: {
            ...mapActions({
                'closeModal': 'modals/closeModal',
            }),
            async onSubmit() {
                try {
                    this.errors = null;
                    this.loading = true;
                    const formData = {
                        name: this.name,
                        phone: this.chParsePhone(this.phone),
                        formTitle: 'Форма: Заказ обратного звонка'
                    };
                    const { data } = await this.$axios.post('/callback-form', { ...formData });

                    // глобальный event для метрик
                    const eventDetail = { ...formData, url: this.$route.path };
                    window.dispatchEvent(
                        new CustomEvent('CallbackFormSent', { detail: eventDetail })
                    );
                    window.dispatchEvent(
                        new CustomEvent('AnyFormSent', { detail: eventDetail })
                    );

                    this.resetFields();
                    this.loading = false;
                    this.messageSended = true;
                } catch (ex) {
                    console.log('cant send data: ' + ex);
                    this.loading = false;
                    this.errors = ["Что-то пошло не так, попробуйте еще раз"];
                }
            },
            resetFields() {
                this.name = null;
                this.phone = null;
            },
            onLinkClick() {
                this.closeModal();
                this.$router.push('/rechnye-kruizy');
            },
        },
    };
</script>

<style scoped lang="scss">
.wrapper-w-254 {
    max-width: 254px;
    margin: 0 auto 40px;
}
.phone-style-callback {
    &::v-deep {
        .input {
            @apply text-sm bg-white border-gray-400 border text-black-400 py-4 px-5;
        }
    }
}
input {

    &::placeholder {
        @apply text-black-400 text-base font-normal;
    }
}
</style>
