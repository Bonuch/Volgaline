<template>
    <div class="page-inner page-agents">
        <PageComponent
            :breadcrumbs="breadcrumbs"
            :content="content"
            :title="title"
        >
            <template v-slot:afterContent>
                <div class="wrapper">
                    <div class="title-offset title-heading">
                        <h2 class="section-title">Сформировать агентский договор<br> и начать работу</h2>
                    </div>

                    <AgentsForm :form-schema="formSchema" class="mb-24 lg:mb-16 tablet:hidden"/>
                    <AgentsForm :form-schema="formSchemaMobile" class="hidden mb-16 tablet:block"/>

                    <div class="columns-list columns-list-2cols -mb-10 tablet:-mb-4">
                        <div class="columns-list__item">
                            <h3 class="text-26 md:text-xl xs:text-lg">
                                Перечень документов, необходимых от Агента для заключения агентского договора:
                            </h3>
                            <ul>
                                <li>
                                    Свидетельство о государственной регистрации юридического лица (индивидуального
                                    предпринимателя);
                                </li>
                                <li>
                                    Свидетельство о постановке на учет юридического лица (индивидуального предпринимателя) в
                                    налоговом органе;
                                </li>
                                <li>
                                    Первая и последняя страница Устава со штампом налогового органа, изменения в Устав;
                                </li>
                                <li>
                                    (при наличии) Уведомление о возможности применения упрощенной системы налогообложения;
                                </li>
                            </ul>
                        </div>

                        <div class="columns-list__item">
                            <h3 class="text-26 md:text-xl xs:text-lg">Порядок и сроки бронирования:</h3>
                            <ul>
                                <li>
                                    Бронирование осуществляется на срок 3 рабочих дня (в зависимости от круиза и каюты);
                                </li>
                                <li>
                                    В течение этого срока необходимо произвести полную оплату или предоплату (не менее 50%
                                    от полной стоимости тура без учета действующих скидок). В противном случае бронь
                                    аннулируется;
                                </li>
                                <li>
                                    Бронирование туров агентствами производится онлайн на сайте volgaline.com;
                                </li>
                                <li>
                                    Для бронирования туров необходимо заключить агентский договор.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
        </PageComponent>
    </div>
</template>

<script>
    import { seoHelper } from '~/mixins/content-helpers';
    import TopBanner from '@/components/inner/TopBanner';
    import AgentsForm from '@/components/profile/AgentsForm';
    import PageComponent from '@/components/base/PageComponent';
    import {mapActions} from "vuex";

    const pageTitle = "Агентам";
    const seoTitle = 'Сотрудничество по агентским продажам речных круизов';

    export default {
        components: { PageComponent, AgentsForm, TopBanner },
        mixins: [seoHelper],
        head() {
            return {
                title: this.titlePage,
                meta: [
                    { hid: "title", name: "keywords", content: this.getPageTitle() },
                    {
                        hid: "keywords",
                        name: "keywords",
                        content: this.getSeoField('keywords', 'Круизная компания &quot;Волга Лайн&quot; приглашает к взаимовыгодному сотрудничеству агентов. Мы открыты к сотрудничеству и приглашаем профессионалов туристического рынка.')
                    },
                    {
                        hid: "description",
                        name: 'description',
                        content: this.getSeoField('description', 'Круизная компания &quot;Волга Лайн&quot; приглашает к взаимовыгодному сотрудничеству агентов. Мы открыты к сотрудничеству и приглашаем профессионалов туристического рынка.')
                    },
                    { hid: "og:title", property: "og:title", content: this.titleSeo },
                    { hid: "og:type", property: "og:type", content: this.getSeoType('website') },
                    {
                        hid: "og:description",
                        property: "og:description",
                        content: this.getSeoField('description', 'Круизная компания &quot;Волга Лайн&quot; приглашает к взаимовыгодному сотрудничеству агентов. Мы открыты к сотрудничеству и приглашаем профессионалов туристического рынка.')
                    },
                    { hid: "og:url", property: "og:url", content: this.getPageUrl },
                    { hid: "og:image", property: "og:image", content: this.getOgImage() },
                ],
            };
        },
        data() {
            return {
                title: pageTitle,
                titlePage: seoTitle,
                breadcrumbs: [],
                formSchemaMobile: {
                    company: {
                        type: 'text',
                        label: 'Назание компании',
                        required: true,
                        size: 'w-full',
                        value: null,
                    },
                    name: {
                        type: 'text',
                        label: 'Имя',
                        required: true,
                        size: 'w-full',
                        value: null,
                    },
                    phone: {
                        type: 'phone',
                        label: 'Телефон',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                },
                formSchema: {
                    legalName: {
                        type: 'text',
                        label: 'Юридическое название',
                        required: true,
                        size: 'w-full',
                        value: null,
                    },
                    genName: {
                        type: 'text',
                        label: 'ФИО генерального директора или ИП в родительном падеже',
                        required: true,
                        size: 'w-full',
                        value: null,
                    },
                    ogrn: {
                        type: 'text',
                        label: 'ОГРН (ОГРНИП)',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    inn: {
                        type: 'text',
                        label: 'ИНН',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    kpp: {
                        type: 'text',
                        label: 'КПП',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    okved: {
                        type: 'text',
                        label: 'ОКВЭД',
                        required: true,
                        size: 'w-1/2 lg:w-full',
                        value: null,
                    },
                    okato: {
                        type: 'text',
                        label: 'ОКАТО',
                        required: true,
                        size: 'w-1/2 lg:w-full',
                        value: null,
                    },
                    legalAddress: {
                        type: 'text',
                        label: 'Юридический адрес',
                        required: true,
                        size: 'w-full',
                        value: null,
                    },
                    currentAddress: {
                        type: 'text',
                        label: 'Фактический адрес',
                        required: true,
                        size: 'w-full',
                        value: null,
                    },
                    bank: {
                        type: 'text',
                        label: 'Наименование банка',
                        required: true,
                        size: 'w-full',
                        value: null,
                    },
                    bill: {
                        type: 'text',
                        label: 'Расчетный счёт',
                        required: true,
                        size: 'w-1/2 lg:w-full',
                        value: null,
                    },
                    coreBill: {
                        type: 'text',
                        label: 'Корреспондентский счёт',
                        required: true,
                        size: 'w-1/2 lg:w-full',
                        value: null,
                    },
                    bik: {
                        type: 'text',
                        label: 'БИК',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    phone: {
                        type: 'phone',
                        label: 'Телефон',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    email: {
                        type: 'email',
                        label: 'E-mail',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    first_name: {
                        type: 'text',
                        label: 'Фамилия',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    middle_name: {
                        type: 'text',
                        label: 'Имя',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    last_name: {
                        type: 'text',
                        label: 'Отчество',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    site: {
                        type: 'text',
                        label: 'Сайт',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                    job: {
                        type: 'text',
                        label: 'Должность',
                        required: true,
                        size: 'w-1/3 lg:w-full',
                        value: null,
                    },
                },
                content: null,
            };
        },
        methods: {
            ...mapActions({
                openModal: 'modals/openModal',
            }),
            call() {
                this.openModal({
                    name: 'ModalRegistration'
                });
            }
        },
        async asyncData({ $axios }) {
            let title = '';
            let content = {};
            let breadcrumbs = [];
            let titleSeo = 'Сотрудничество по агентским продажам речных круизов';

            try {
                const { data } = await $axios.get('/agents');

                for (const [key, val] of Object.entries(data.content)) {
                    content[key] = val;
                }

                title = content.title;

                breadcrumbs = [
                    {
                        id: 1,
                        title: 'Главная',
                        link: '/',
                    },
                    {
                        id: 3,
                        title,
                        link: '',
                    },
                ];
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
                return null;
            }

            return {
                breadcrumbs,
                content,
                title,
                titleSeo,
            };
        },
    };
</script>

<style lang="scss" scoped>
    .page-agents {
        .h2 {
            max-width: 1124px;
        }
    }
</style>
