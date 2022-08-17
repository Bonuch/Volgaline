<template>
    <div class="modal-administration">
        <form
            class="relative wrapper-1060"
            :class="{ 'disabled': loading }"
            @submit.prevent="handleSubmit"
        >
            <div
                v-show="loading"
                class='z-1 absolute left-0 top-0 w-full h-full flex items-center justify-center'
            >
                <Preloader />
            </div>

            <h3 class="h3 modal-subtitle">Обращение к руководству</h3>

            <p class="mb-6 text-sm text-medium text-red-500">
                Обычно мы отвечаем в течении 24 часов, пожалуйста, дождитесь ответа.
            </p>

            <div class="relative">
                <label for="modal-message" class="label">Расскажите о Вашей проблеме и мы оперативно ее решим
                    <sup>*</sup></label>
                <textarea
                    id="modal-message"
                    name="message"
                    class="textarea mb-5"
                    placeholder="Опишите вопрос"
                    required
                    v-model="message"
                ></textarea>
            </div>
            <div v-if="errors && errors.message">
                <ErrorField v-for="(item, idx) in errors.message" :key="idx" :text="item"/>
            </div>

            <div class="mb-5">
                <label for="modal-contact" class="label">Как с Вами связаться? <sup>*</sup></label>
                <input
                    type="text"
                    name="contact"
                    id="modal-contact"
                    class="input bg-white border-gray-50"
                    autocomplete="off"
                    placeholder="Напишите в этом поле ваш номер или Email"
                    required
                    v-model="contact"
                >
            </div>
            <div v-if="errors && errors.contact">
                <ErrorField v-for="(item, idx) in errors.contact" :key="idx" :text="item"/>
            </div>

            <div class="modal-item">
                <BaseCheckbox
                    id="modal-privacy"
                    name="privacy"
                    label="Я согласен с <a href='/privacy' class='link-inline' target='_blank'>условиями обработки</a> персональных данных"
                    :labelSelectors="['pl-8 text-lg font-medium', {'text-red-400': !privacy}]"
                    :markSelectors="['w-6 h-6 text-gray-300 border border-gray-300', {'border-red-400': !privacy}]"
                    required="true"
                    :custom-val="privacy"
                    v-model="privacy"
                />
            </div>

            <div class="modal-submit-wrap">
                <button
                    type="submit"
                    class="button modal-submit"
                    :class="{ 'disabled': !privacy }"
                    :disabled="!privacy"
                >
                    Отправить
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Preloader from '@/components/base/Preloader';
    import BaseCheckbox from '@/components/base/BaseCheckbox';
    import ErrorField from '../base/ErrorField';

    export default {
        name: 'ModalAdministration',
        components: { ErrorField, BaseCheckbox, Preloader },
        data() {
            return {
                loading: false,
                contact: null,
                message: null,
                privacy: false,
                errors: {},
            };
        },
        methods: {
            ...mapActions({
                openModal: 'modals/openModal',
                closeModal: 'modals/closeModal',
            }),
            async handleSubmit() {
                try {
                    this.loading = true;
                    const formData = new FormData();
                    formData.append('contact', this.contact);
                    formData.append('message', this.message);
                    await this.$axios.post('/feedback-management-form', formData);
                    this.loading = false;
                    this.closeModal();
                } catch (ex) {
                    if (ex && ex.response && ex.response.data) {
                        this.errors = ex.response.data.errors;
                    }
                    this.loading = false;
                    console.log('cant send data: ' + ex);
                }
            },
        },
    };
</script>

<style scoped></style>
