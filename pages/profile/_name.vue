<template>
    <div class="page-inner pt-6">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset" />

            <div class="mx-12 xl:mx-0">
                <h1
                    v-if="title"
                    class="pb-5 m-0 mb-3 text-44 uppercase border-b border-gray-50 xl:text-36 xl:mb-5 sm:text-30 mob:text-26"
                >
                    {{ title }}
                </h1>

                <div
                    v-if="getUser && Object.keys(getUser).length > 0"
                    class="flex items-start mb-14 text-lg font-medium lg:block lg:p-10 lg:mb-5 lg:bg-gray-50 lg:rounded-sm md:p-8 sm:p-4 mob:text-sm"
                >
                    <p v-if="getFullName" class="m-0 mr-32 xl:mr-10 lg:mr-0 lg:mb-1">
                        <b class="text-xl mob:text-base">{{getFullName}}</b>
                    </p>

                    <p v-if="getUser.email" class="m-0 mr-32 xl:mr-10 lg:mr-0 lg:mb-1">
                        <span class="text-gray-300 mr-3">E-mail:</span>
                        <b class="text-xl mob:text-base">
                            {{ getUser.email }}
                        </b>
                    </p>

                    <p v-if="getUser.phone" class="m-0">
                        <span class="text-gray-300 mr-3">Телефон:</span>
                        <b class="text-xl mob:text-base">{{ chFormatPhone(getUser.phone) }}</b>
                    </p>
                </div>
            </div>
        </div>

        <div class="tabs-list flex mb-12 lg:hidden">
            <nuxt-link
                type="button"
                v-for="(tabItem, tabIdx) in tabsList"
                :key="tabIdx"
                :to='"/profile/" + tabItem.content'
                class="text-center tabs-list__item custom-transition flex-auto p-6 bg-gray-50 text-black-400 text-lg font-bold uppercase border-t-4 border-b-4 border-gray-50 overflow-hidden xl:text-base xl:p-4 xl:normal-case"
                :class="{'tabs-list__item--active': currentTab.value === tabItem.value}"
            >
                {{ tabItem.name }}
            </nuxt-link>
        </div>

        <div class="tabs-content mb-24 lg:mb-15">
            <div class="wrapper">
                <div class="lg:hidden" v-if="!isMobileScreen">
                    <component
                        :is="currentTab.value"
                        :content="tabsContent[currentTab.content]"
                    />
                </div>

                <div class="mobile-tabs" v-else>
                    <div
                        v-for="(tabItem, tabIdx) in tabsList"
                        :key="tabIdx"
                        class="mobile-tabs__item hidden lg:block"
                    >
                        <nuxt-link
                            type="button"
                            class="mobile-tab custom-transition flex items-center justify-between w-full py-4 px-5 bg-gray-50 text-black-400 text-lg font-bold uppercase border border-gray-50 sm:text-base mob:normal-case"
                            :class="{'mobile-tab--active': getActiveTab(tabItem.value)}"
                            :to='currentTab.content'
                            @click="onMobileTabClick(tabItem)"
                        >
                            <span>{{ tabItem.name }}</span>

                            <svg
                                class="fill-current"
                                :class="{'transform rotate-180': getActiveTab(tabItem.value)}"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    class="fill-current"
                                    fill-rule="evenodd" clip-rule="evenodd"
                                    d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                                    fill="#5A6472"
                                />
                            </svg>
                        </nuxt-link>

                        <template v-if="getActiveTab(tabItem.value)">
                            <component
                                :is="currentTab.value"
                                :content="tabsContent[currentTab.content]"
                                class="tab-scroll-to"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { seoHelper, parsePhoneMixin } from "~/mixins/content-helpers";
import Breadcrumbs from "@/components/base/Breadcrumbs";
import TabPersonal from "@/components/profile/tabs/TabPersonal";

function buildTabList(role) {
    let dataTabRole = {};

    switch (role) {
        case 'agent':
            dataTabRole.title = "Кабинет агента";
            dataTabRole.tabsList = [
                // {
                //     name: "Статистика продаж",
                //     value: "TabSells",
                //     content: "sells",
                // },
                {
                    name: "История Заказов",
                    value: "TabHistory",
                    content: "history",
                },
                {
                    name: "Обращения",
                    value: "TabMessages",
                    content: "messages",
                },
                {
                    name: "Данные агента",
                    value: "TabAgent",
                    content: "agentPersonal",
                },
            ];
            break;
        case 'manager':
            dataTabRole.title = "Кабинет Менеджера";
            dataTabRole.tabsList = [
                {
                    name: "История Заказов",
                    value: "TabHistory",
                    content: "history",
                },
                {
                    name: "Обращения",
                    value: "TabMessages",
                    content: "messages",
                },
                {
                    name: "Профайл",
                    value: "TabPersonal",
                    content: "personal",
                },
            ];
            break;
        default:
            dataTabRole.title = "Кабинет туриста";
            dataTabRole.tabsList = [
                {
                    name: "История Заказов",
                    value: "TabHistory",
                    content: "history",
                },
                {
                    name: "Обращения",
                    value: "TabMessages",
                    content: "messages",
                },
                {
                    name: "Персональные данные",
                    value: "TabPersonal",
                    content: "personal",
                },
            ];
            break;
    }

    return dataTabRole;
}

export default {
    components: {
        Breadcrumbs,
        TabPersonal,
        TabAgent: () => import(/* webpackChunkName: "TabAgent" */ '@/components/profile/tabs/TabAgent'),
        TabSells: () => import(/* webpackChunkName: "TabSells" */ '@/components/profile/tabs/TabSells'),
        TabMessages: () => import(/* webpackChunkName: "TabMessages" */ '@/components/profile/tabs/TabMessages'),
        TabHistory: () => import(/* webpackChunkName: "TabHistory" */ '@/components/profile/tabs/TabHistory'),
    },
    middleware: "auth",
    mixins: [seoHelper, parsePhoneMixin],
    layout: 'without-form',
    head() {
        return {
            title: this.title,
        };
    },
    data() {
        return {
            title: "Кабинет туриста",
            content: {},
            tabs: [],
            breadcrumbs: [],
            tabsList: [],
            tabsContent: {},
            currentTab: {},
        };
    },
    computed: {
        ...mapGetters({
            getUser: "users/getUser",
            screenWidth: 'getWindowWidth',
        }),
        getFullName() {
            return this.getUser.name;
        },
        getActiveTab() {
            return (tabName) => this.currentTab.value === tabName;
        },
        isMobileScreen() {
            return this.screenWidth < 1025;
        },
    },
    methods: {
        ...mapMutations({
            setUser: "users/setUser",
        }),
        onMobileTabClick(tabItem) {
            this.currentTab = tabItem;
            this.scrollToTabContent();
        },
        scrollToTabContent() {
            const element = document.querySelector(".tab-scroll-to");
            const yOffset = -142;

            if (element) {
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            } else {
                return false;
            }
        },
    },
    async asyncData({ $axios, store, error, route }) {
        let tabsContent = {};
        let currentTab = {};

        const dataTabTitleByRole = buildTabList(store.getters["users/getUser"]["role"]);
        const title = dataTabTitleByRole.title;
        const tabsList = dataTabTitleByRole.tabsList;

        const breadcrumbs = [
            {
                id: 1,
                title: "Главная",
                link: "/",
            },
            {
                id: 2,
                title: title,
                link: "",
            },
        ];

        if (store.getters["users/getUser"] && store.getters["users/getUser"]["role"] === "agent") {
            tabsContent = {
                // графики
                sells: [
                    {
                        labels: [
                            "Январь",
                            "Февраль",
                            "Март",
                            "Апрель",
                            "Май",
                            "Июнь",
                            "Июль",
                            "Август",
                            "Сентябрь",
                            "Октябрь",
                            "Ноябрь",
                            "Декабрь",
                        ],
                        datasets: [
                            {
                                label: "Сумма продаж",
                                data: [0, 50000, 90000, 150000, 200000],
                                backgroundColor: [
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                ],
                                borderWidth: 1,
                                borderRadius: 4,
                            },
                        ],
                    },
                    {
                        labels: [
                            "Январь",
                            "Февраль",
                            "Март",
                            "Апрель",
                            "Май",
                            "Июнь",
                            "Июль",
                            "Август",
                            "Сентябрь",
                            "Октябрь",
                            "Ноябрь",
                            "Декабрь",
                        ],
                        datasets: [
                            {
                                label: "Сумма продаж",
                                data: [0, 50000, 90000, 150000, 200000],
                                backgroundColor: [
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                    "rgba(11, 62, 131,0.7)",
                                ],
                                borderWidth: 1,
                                borderRadius: 4,
                            },
                        ],
                    },
                ],
                // сообщения
                messages: [
                    {
                        id: 1,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 2,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 3,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 4,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 5,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                ],
                // данные агента
                agentPersonal: {
                    legalName: {
                        type: "text",
                        label: "Юридическое название",
                        required: true,
                        size: "w-full",
                        value: null,
                    },
                    genName: {
                        type: "text",
                        label: "ФИО генерального директора или ИП в родительном падеже",
                        required: true,
                        size: "w-full",
                        value: null,
                    },
                    ogrn: {
                        type: "text",
                        label: "ОГРН (ОГРНИП)",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    inn: {
                        type: "text",
                        label: "ИНН",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    kpp: {
                        type: "text",
                        label: "КПП",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    okved: {
                        type: "text",
                        label: "ОКВЭД",
                        required: true,
                        size: "w-1/2 lg:w-full",
                        value: null,
                    },
                    okato: {
                        type: "text",
                        label: "ОКАТО",
                        required: true,
                        size: "w-1/2 lg:w-full",
                        value: null,
                    },
                    legalAddress: {
                        type: "text",
                        label: "Юридический адрес",
                        required: true,
                        size: "w-full",
                        value: null,
                    },
                    currentAddress: {
                        type: "text",
                        label: "Фактический адрес",
                        required: true,
                        size: "w-full",
                        value: null,
                    },
                    bank: {
                        type: "text",
                        label: "Наименование банка",
                        required: true,
                        size: "w-full",
                        value: null,
                    },
                    bill: {
                        type: "text",
                        label: "Расчетный счёт",
                        required: true,
                        size: "w-1/2 lg:w-full",
                        value: null,
                    },
                    coreBill: {
                        type: "text",
                        label: "Корреспондентский счёт",
                        required: true,
                        size: "w-1/2 lg:w-full",
                        value: null,
                    },
                    bik: {
                        type: "text",
                        label: "БИК",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    phone: {
                        type: "phone",
                        label: "Телефон",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    email: {
                        type: "email",
                        label: "E-mail",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    site: {
                        type: "text",
                        label: "Сайт",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    signer: {
                        type: "text",
                        label: "Фамилия и инициалы подписанта",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                    job: {
                        type: "text",
                        label: "Должность",
                        required: true,
                        size: "w-1/3 lg:w-full",
                        value: null,
                    },
                },
            };
        } else {
            tabsContent = {
                // сообщения
                messages: [
                    {
                        id: 1,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 2,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 3,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 4,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                    {
                        id: 5,
                        name: "Название темы обращения",
                        status: "закрыт",
                        created: "20.03.2021 г.",
                        time: "9:00",
                        link: "/profile/messages/1",
                    },
                ],
            };
        }

        if (route.params.name) {
            currentTab = tabsList.find(item => item.content === route.params.name)
        } else {
            currentTab = tabsList.find(item => item.content === 'personal')
        }
        // тянем историю заказов
        try {
            const { data } = await $axios.get("/profile/orders");
            tabsContent.history = data.data;
        } catch (ex) {
            tabsContent.history = null;
            console.log("cant fetch customer orders: " + ex);
        }

        return {
            tabsContent,
            breadcrumbs,
            currentTab,
            tabsList,
            title
        };
    },
};
</script>

<style lang="scss" scoped>
.tabs-list {
    &__item {
        &:hover,
        &--active {
            @apply bg-white;
        }

        &:hover {
            color: #fff;
            @apply bg-blue-300 border-blue-300;
        }

        &--active {
            pointer-events: none;
        }
    }
}

.mobile-tabs {
    &__item {
        overflow: hidden;

        &:first-child {
            @apply rounded-t-sm;
        }

        &:last-child {
            @apply rounded-b-sm;
        }
    }
}

.mobile-tab {
    &--active {
        background-color: #fff;
        border-left: 0;
        border-right: 0;
        border-top: 0;
    }
}
</style>
