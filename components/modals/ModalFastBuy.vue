<template>
    <form method="post" class="modal-call" @submit.prevent="onSubmit">
        <Preloader v-if="loading"/>

        <template v-if="!messageSent">
            <h3 class="page-inner-h1 leading-1-1 mb-8">Быстрый заказ</h3>

            <div class="modal-item">
                <label for="modal-name" class="label">Ваше имя: <sup class="">*</sup></label>
                <input
                    type="text"
                    name="name"
                    id="modal-name"
                    class="input"
                    required
                    autocomplete="off"
                    placeholder="Введите имя"
                    v-model="name"
                >
            </div>

            <div class="modal-item">
                <label for="modal-phone" class="label">Ваш телефон: <sup class="">*</sup></label>
                <PhoneComponent
                    id="modal-phone"
                    required
                    v-model="phone"
                />
            </div>

            <div class="modal-item">
                <BaseCheckbox
                    id="modal-privacy"
                    name="privacy"
                    label="Я согласен с <a href='/privacy' target='_blank'>условиями обработки</a> персональных данных"
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
                    :class="{'opacity-75 pointer-events-none': !privacy}"
                    :disabled="!privacy"
                >
                    Отправить
                </button>
            </div>
        </template>

        <p v-else class="p-10">
            Спасибо за быстрый заказ, в скором времени с вами свяжется наш менеджер.
        </p>
    </form>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex";
    import Preloader from "@/components/base/Preloader";
    import BaseCheckbox from "@/components/base/BaseCheckbox";
    import PhoneComponent from '../base/PhoneComponent';

    export default {
        name: "ModalFastBuy",
        components: { PhoneComponent, BaseCheckbox, Preloader },
        data() {
            return {
                loading: false,
                name: null,
                phone: null,
                privacy: true,
                messageSent: false,
            };
        },
        computed: {
            ...mapGetters({
                getFastBuyData: "cart/getFastBuyData",
            }),
        },
        methods: {
            ...mapMutations({
                setFastBuyData: "cart/setFastBuyData",
            }),
            async onSubmit() {
                try {
                    this.loading = true;
                    const formData = {
                        name: this.name,
                        phone: this.phone,
                        cruiseID: this.getFastBuyData,
                    };
                    const res = await this.$axios.post('/quick-cruise-order-form', { formData });
                    this.resetFields();

                    // глобальный event для метрик
                    const eventDetail = {
                        ...formData,
                        formTitle: 'Форма: Быстрый заказ со страницы круиза',
                        url: this.$route.path
                    };
                    window.dispatchEvent(
                        new CustomEvent('ModalFastBuyFormSent', { detail: eventDetail })
                    );
                    window.dispatchEvent(
                        new CustomEvent('AnyFormSent', { detail: eventDetail })
                    );

                    this.loading = false;
                    this.messageSent = true;
                } catch (e) {
                    this.loading = false;
                    console.log(`cant send data: ${e}`);
                }
            },
            resetFields() {
                this.name = null;
                this.phone = null;
            },
        },
        beforeDestroy() {
            this.setFastBuyData(null);
        },
    };
</script>

<style scoped></style>
