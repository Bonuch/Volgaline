<template>
    <div class='tab-messages profile-tabs-content'>
        <template v-if='list'>
            <button
                type='button'
                class='button flex items-center mb-5 bg-blue-300 text-xl hover:bg-red-400 xs:w-full xs:justify-center mob:text-lg'
                @click='onCallSupportClick'
            >
                <svg
                    class='mr-3' width='24' height='24' viewBox ='0 0 24 24' fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        class='fill-current'
                        fill-rule='evenodd' clip-rule='evenodd'
                        d='M14 3.75C14 2.64543 13.1046 1.75 12 1.75C10.8954 1.75 10 2.64543 10 3.75V10H3.75C2.64543 10 1.75 10.8954 1.75 12C1.75 13.1046 2.64543 14 3.75 14H10V20.25C10 21.3546 10.8954 22.25 12 22.25C13.1046 22.25 14 21.3546 14 20.25V14H20.25C21.3546 14 22.25 13.1046 22.25 12C22.25 10.8954 21.3546 10 20.25 10H14V3.75Z'
                        fill='white'
                    />
                </svg>

                <span>Новое обращение</span>
            </button>

            <div class='tab-messages-table' v-if='fsrContent.length > 0'>
                <div class='tab-messages__row tab-messages__heading mb-3'>
                    <div
                        class='tab-messages__col py-3'
                        v-for='(headingItem, headingIdx) in headings'
                        :key='headingIdx'
                    >
                        {{ headingItem }}
                    </div>
                </div>

                <div class='tab-messages__body mb-8'>
                    <MessageTableRow
                        v-for='cruiseItem in fsrContent'
                        :key='cruiseItem.id'
                        :item='cruiseItem'
                        v-on:on-row-click='onRowClick'
                    />
                </div>

                <button
                    v-if='fsrShowMoreVisibility'
                    type='button'
                    class='button button-transparent button-show-more'
                    @click="fsrOnSearchMoreClick('/tickets')"
                >
                    Показать еще
                </button>
            </div>

            <div v-else-if='fsrLoading' class='z-1 left-0 top-0 w-full h-full flex items-center justify-center'>
                <Preloader />
            </div>

            <div class='tab-messages-table' v-else>
                <h2 class='text-center'>Нет сообщений</h2>
            </div>


        </template>

        <template v-else>
            <div v-if='detailMessage && Object.keys(detailMessage).length > 0'>
                <div
                    class='tab-messages-detail__heading flex flex-wrap items-center justify-between mb-10 xl:justify-start md:text-sm mob:block'
                >
                    <h3
                        v-if='detailMessage.subject'
                        class='h3 m-0 mr-auto xl:w-full xl:mr-0 xl:mb-3 md:text-26 mob:text-xl'
                    >
                        {{ detailMessage.subject }}
                    </h3>

                    <div v-if='detailMessage.status' class='mr-24 xl:mr-8 mob:mr-0 mob:mb-2'>
                        <b class='mr-5 xs:mr-4'>Статус:</b>
                        <span class='text-gray-300'>{{ detailMessage.status_label }}</span>
                    </div>

                    <div v-if='detailMessage.created'>
                        <b class='mr-5 xs:mr-4'>Создано:</b>
                        <span class='text-gray-300'>{{ formattedDate }}</span>
                    </div>

                    <button
                        v-if='detailMessage.status !== 2'
                        type='submit'
                        class='button md:mb-3 md:mt-3 md:w-full ml-3 md:ml-0 bg-red-500 text-xs border-2 border-red-500 hover:bg-transparent hover:text-red-500 hover:border-red-500 xs:w-full focus:bg-transparent focus:text-red-500'
                        @click.prevent='closeTicket'
                    >
                        Закрыть обращение
                    </button>

                </div>

                <form class='tab-messages-detail__controls wrapper-1060' @submit.prevent='onSendMessageClick'>
                    <textarea
                        name='textMessage'
                        class='textarea tab-messages-detail__textarea mb-5'
                        placeholder='Введите ваше сообщение'
                        v-model='textMessage'
                        required
                    ></textarea>

                    <div class='mb-10'>
                        <BaseDropFiles
                            v-if='files'
                            :files='files'
                            v-on:on-remove-file-from-files='onRemoveFileFromFiles'
                        />

                        <div class='flex md:flex-col md:items-start'>
                            <button
                                type='button'
                                class='button md:mb-3 md:w-full mr-auto bg-blue-300 text-xl border-2 border-blue-300 hover:bg-transparent hover:text-blue-300 hover:border-blue-300 xs:w-full'
                                @click='list = true'
                            >
                                К обращениям
                            </button>

                            <BaseDropFile
                                id='message-file'
                                class='md:mb-3 xs:w-full md:w-full'
                                v-on:on-file-change='onFileChange'
                            />

                            <button
                                type='submit'
                                class='button md:w-full bg-blue-300 text-xl border-2 border-blue-300 hover:bg-transparent hover:text-blue-300 hover:border-blue-300 md:mb-3 xs:w-full'
                            >
                                Отправить
                            </button>


                        </div>
                    </div>
                </form>

                <template v-if='detailMessage.messages && detailMessage.messages.length > 0'>
                    <ChatItem
                        v-for='(mesItem, idx) in detailMessage.messages'
                        :key='idx'
                        :mes-item='mesItem'
                        @downloadFile='downloadFile'
                        class='mb-6 last:m-0'
                    />
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MessageTableRow from '../MessageTableRow';
import ChatItem from '../ChatItem';
import BaseDropFiles from '../../base/BaseDropFiles';
import BaseDropFile from '../../base/BaseDropFile';
import Preloader from '../../base/Preloader';
import { fetchSearchResult } from '../../../mixins/content-helpers';

export default {
    name: 'TabMessages',
    components: { BaseDropFile, BaseDropFiles, ChatItem, MessageTableRow, Preloader },
    // props: {
    //     content: {
    //         type: Array,
    //         required: true,
    //     },
    // },
    mixins: [fetchSearchResult],
    data() {
        return {
            textMessage: null,
            list: true,
            detailMessage: {},
            headings: [
                'Тема',
                'Статус',
                'Создано',
                '',
            ],
            isLoading: false,
            content: [],
            files: null,
        };
    },
    computed: {
        ...mapGetters(['users/getUserDetailContent']),
        formattedDate() {
            return this.$dayjs(this.detailMessage.created).locale('ru').format('DD.MM.YYYY HH:mm');
        },
    },
    methods: {
        ...mapActions({
            openModal: 'modals/openModal',
        }),
        onCallSupportClick() {
            this.openModal({
                name: 'ModalSupport',
                cb: this.messageSent,
            });
        },

        messageSent() {
            this.fetchTicketList();
        },

        async onRowClick(id) {
            await this.fetchDetail(id);
            this.list = false;
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
        },

        async onSendMessageClick() {
            await this.sendNewMessage();
            // собираем поля и посылаем на сервер
        },

        async sendNewMessage() {
            const form = new FormData();
            if (this.files && Array.isArray(this.files)) {
                for (const file of this.files) {
                    form.append('files[]', file);
                }
            }

            if (!this.textMessage) {
                return;
            }

            form.append('message', this.textMessage);

            try {
                await this.$axios.post(`/ticket/${this.detailMessage.id}/message/add`, form);
                await this.fetchDetail(this.detailMessage.id);
                this.resetDetailMessageForm();
            } catch (e) {
                console.log('sorry cant send data: ', e);
            }
        },

        resetDetailMessageForm() {
            this.textMessage = null,
                this.files = null;
        },

        async fetchTicketList() {
            this.fsrLoading = true;
            // this.isLoading = true;
            try {
                const { data } = await this.$axios.get('/tickets');
                if (data && data.data && Array.isArray(data.data)) {
                    this.fsrContent = data.data;
                    this.fsrContentMeta = data.meta;
                }
            } catch (e) {
                console.log('error fetch data: ', e);
            }
            this.fsrLoading = false;
        },
        async fetchDetail(id) {
            try {
                this.detailMessage = (await this.$axios.get(`/ticket/${id}`)).data.data;
            } catch (e) {
                console.log('cant fetch detail data: ', e);
            }
        },
        async downloadFile(fileObject) {
            if (!fileObject.path) {
                return console.log('sorry cant download file: filepath not found');
            }
            try {
                const path = fileObject.path;
                const { data } = await this.$axios.get(`/ticket/${this.detailMessage.id}/file/${path}`, {
                    responseType: 'arraybuffer',
                });
                const blob = new Blob([data]);
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', fileObject.name);
                link.click();
                URL.revokeObjectURL(link.href);
            } catch (e) {
                console.log('sorry cant download file: ', e);
            }
        },

        async closeTicket() {
            try {
                await this.$axios.patch(`/ticket/${this.detailMessage.id}/close`)
                await this.fetchTicketList()
                this.list = true
            } catch (e) {
                console.log('Sorry cant fetch: ', e);
            }
        },
    },
    async created() {
        await this.fetchTicketList();
    },
};
</script>

<style lang='scss' scoped>
.tab-messages {
    &__row {
        display: flex;
        align-items: center;
        width: 100%;
        text-align: left;
    }

    &__heading {
        @apply text-sm text-gray-300;
    }

    &__body {
        .tab-messages__row {
            @apply border-t border-b border-gray-50;

            &:last-of-type {
                padding-bottom: 0;
                border-bottom: 0;
            }
        }
    }

    &::v-deep {
        .base-drop-file-label {
            justify-content: center;
        }

        .tab-messages__col {
            @apply py-4;

            &:nth-child(1) {
                flex: 1;
                margin-right: auto;
            }

            &:nth-child(2) {
                flex: 0 1 80px;
                @apply mr-32;
            }

            &:nth-child(3) {
                flex: 0 1 110px;
                @apply mr-5;
            }

            &:nth-child(4) {
                flex: 0 1 50px;
            }
        }
    }
}

@screen md {
    .tab-messages {
        &::v-deep {
            .base-drop-file-label {
                margin-right: 0;
            }
            .tab-messages__col {
                &:nth-child(1) {
                    @apply mr-4;
                }

                &:nth-child(2) {
                    display: none;
                }

                &:nth-child(3) {
                    flex-basis: 96px;
                }
            }
        }
    }
}

@screen mob {
    .tab-messages {
        &__heading {
            display: none;
        }

        &::v-deep {
            .tab-messages__col {
                &:nth-child(1) {
                    flex: 0 1 100%;
                    margin: 0;
                }

                &:nth-child(3),
                &:nth-child(4) {
                    display: none;
                }
            }
        }
    }
}
</style>
