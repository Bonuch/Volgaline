<template>
    <div class="modal-login">
        <Preloader v-if="loading"/>

        <template v-else>
            <form class="wrapper-1060" enctype="multipart/form-data" @submit.prevent="onSubmit">
                <h3 class="h3 modal-subtitle">Возник вопрос?</h3>
                <div v-if="errors && errors.subject">
                    <ErrorField v-for="(item, idx) in errors.subject" :key="idx" :text="item"/>
                </div>
                <div class="mb-5 relative">
                    <input class="input" v-model="subject" type="text" autocomplete='off' name="subject" placeholder="Задайте вопрос">

                </div>
                <div v-if="errors && errors.message">
                    <ErrorField v-for="(item, idx) in errors.message" :key="idx" :text="item"/>
                </div>
                <textarea
                    name="textMessage"
                    class="textarea tab-ƒmessages-detail__textarea mb-5"
                    placeholder="Опишите вопрос"
                    v-model="textMessage"
                ></textarea>

                <div class="mb-10">
                    <BaseDropFiles v-if="files" :files="files" v-on:on-remove-file-from-files="onRemoveFileFromFiles" />

                    <div class="flex sm:flex-col sm:items-start">
                        <BaseDropFile
                            id="modal-file"
                            class="sm:mb-3 xs:w-full"
                            v-on:on-file-change="onFileChange"
                        />

                        <button
                            type="submit"
                            class="button mr-auto bg-blue-300 text-xl border-2 border-blue-300 hover:bg-transparent hover:text-blue-300 hover:border-blue-300 xs:w-full"
                        >
                            Отправить
                        </button>
                    </div>
                    <p class='text-sm mt-3 mb-1'>поддерживаемый тип файлов: jpg, jpeg, png, pdf, doc, docx, xls, xlsx</p>
                    <p class='text-sm mb-0'>файл не должен превышать 2мб</p>
                </div>
            </form>
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import Preloader from "@/components/base/Preloader";
    import BaseCheckbox from "@/components/base/BaseCheckbox";
    import BaseDropFile from "@/components/base/BaseDropFile";
    import BaseDropFiles from "@/components/base/BaseDropFiles";
    import ErrorField from "../base/ErrorField";

    export default {
        name: "ModalSupport",
        components: {ErrorField, BaseDropFiles, BaseDropFile, BaseCheckbox, Preloader },
        data() {
            return {
                loading: false,
                subject: null,
                textMessage: null,
                files: null,
                errors: {},
            };
        },
        computed: {
            ...mapGetters({
                callback: "modals/getModalCb"
            })
        },
        methods: {
            ...mapActions({
                openModal: "modals/openModal",
                closeModal: "modals/closeModal",
            }),
            async onSubmit() {
                try {
                    this.loading = true;

                    // const formData = {
                    //     subject: this.subject,
                    //     message: this.textMessage,
                    //     files: this.files,
                    // };

                    const formData = new FormData();
                    formData.append('subject', this.subject);
                    formData.append('message', this.textMessage);
                    if (this.files) {
                        for (const file of this.files) {
                            formData.append('files[]', file)
                        }
                    }
                    const res = await this.$axios.post('/tickets/create', formData);
                    this.resetFields();
                    this.loading = false;
                    this.callback();
                    this.closeModal();
                } catch (ex) {
                    if (ex && ex.response && ex.response.status === 422 && ex.response.data) {
                        this.errors = ex.response.data.errors
                    }
                    this.loading = false;
                    console.log('cant send data: ' + ex);
                }
            },
            resetFields() {
                this.textMessage = null;
                this.errors = {};
            },
            onFileChange(files) {
                if (this.files && this.files.length > 0) {
                    this.files = [...this.files, ...files];
                } else {
                    this.files = files;
                }
            },
            onRemoveFileFromFiles(idx) {
                this.files.splice(idx, 1);
            }
        },
    };
</script>

<style scoped></style>
