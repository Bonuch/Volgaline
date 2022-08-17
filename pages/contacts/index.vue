<template>
    <div class="page-inner page-contacts pt-6">
        <div class="hidden p-14 mr-20"></div>
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
            <h1 v-if="title" class="page-inner-h1 page-inner-h1--offset mb-10">{{ content.head }}</h1>
        </div>

        <div class="wrapper">
            <div class="contacts-list flex flex-wrap justify-between xl:justify-start mb-8 font-medium tablet:block">
                <div class="mr-4 tablet:mb-2">
                    <h4 class="text-lg sm:text-base">Телефон:</h4>
                    <a
                        v-if="phoneNumberFiltered"
                        :href="`tel:${phoneNumberFiltered}`"
                        class="flex items-center text-22 font-bold sm:text-xl"
                    >
                        <svg
                            class="mr-2 text-red-400" width="24" height="24" viewBox="0 0 30 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                class="fill-current"
                                fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.20711 1.79289C2.81658 1.40237 2.18342 1.40237 1.79289 1.79289C1.40237 2.18342 1.40237 2.81658 1.79289 3.20711L7.58579 9H3.75C3.19772 9 2.75 9.44772 2.75 10C2.75 10.5523 3.19772 11 3.75 11H10C10.5523 11 11 10.5523 11 10V3.75C11 3.19772 10.5523 2.75 10 2.75C9.44772 2.75 9 3.19772 9 3.75V7.58579L3.20711 1.79289ZM20.8333 14.4099L18.905 11.4635L21.2277 6.04393C22.3225 6.19724 23.3269 6.73774 24.0583 7.56842C24.8018 8.41303 25.2121 9.49972 25.2121 10.625C25.2121 14.5867 23.6384 18.386 20.837 21.1874C18.0357 23.9887 14.2363 25.5624 10.2747 25.5625L13.0763 20.5699L14.0093 21.1921L14.012 21.1939C14.2891 21.3802 14.6097 21.4913 14.9426 21.5165C15.2767 21.5418 15.6115 21.4796 15.9142 21.3362L15.9213 21.3328L15.9213 21.3328C18.1154 20.2719 19.89 18.5054 20.9609 16.3161L20.0625 15.8767L20.9642 16.3092C21.1085 16.0083 21.1723 15.6752 21.1494 15.3423C21.1265 15.0104 21.0182 14.6901 20.835 14.4125L20.8333 14.4099ZM13.0762 20.5699L13.0763 20.5699L14.0579 18.8207L15.0937 19.5113C16.8506 18.6501 18.2742 17.233 19.1433 15.4799L17.4147 12.8387L21.2277 6.04393L17.4147 12.8387L17.2132 12.5307C17.0382 12.2634 16.9321 11.9569 16.9042 11.6386C16.8764 11.3204 16.9276 11.0001 17.0535 10.7065L19.4066 5.21592L19.4073 5.21418C19.5714 4.82896 19.8561 4.50736 20.2186 4.29771C20.5816 4.08776 21.0031 4.00147 21.4194 4.05183L21.426 4.05268C23.0248 4.257 24.4943 5.03707 25.5594 6.24684C26.6245 7.45661 27.212 9.01311 27.2121 10.6249V10.625C27.2121 15.1171 25.4276 19.4252 22.2512 22.6016C19.0748 25.778 14.7667 27.5625 10.2746 27.5625H10.2746C8.66277 27.5624 7.10627 26.9748 5.8965 25.9097C4.68673 24.8447 3.90665 23.3752 3.70234 21.7764L3.70231 21.7764L3.70151 21.7697C3.65113 21.3534 3.73742 20.932 3.94738 20.5689C4.15696 20.2065 4.47843 19.9219 4.86349 19.7578L4.86561 19.7569L10.3514 17.4059C10.6476 17.2789 10.9709 17.2279 11.2918 17.2574C11.6128 17.2868 11.9213 17.3959 12.1895 17.5748L14.0579 18.8206L13.0762 20.5699ZM13.0762 20.5699L11.1081 19.2575L5.69359 21.578C5.8469 22.6728 6.3874 23.6773 7.21808 24.4086C8.06268 25.1522 9.14935 25.5624 10.2746 25.5625L13.0762 20.5699ZM17.4147 12.8387L14.0579 18.8206L14.0579 18.8207L17.4147 12.8387L17.4147 12.8387Z"
                                fill="white"
                            />
                        </svg>

                        <span>{{ phoneNumber }}</span>
                    </a>
                </div>

                <div class="mr-4 tablet:mb-2">
                    <h4 class="text-lg sm:text-base">Почта:</h4>
                    <a
                        v-if="officeEMail"
                        :href="'mailto:' + officeEMail"
                        class="flex items-center"
                    >
                        <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 15.7495C14.0711 15.7495 15.75 14.0706 15.75 11.9995C15.75 9.92844 14.0711 8.24951 12 8.24951C9.92893 8.24951 8.25 9.92844 8.25 11.9995C8.25 14.0706 9.92893 15.7495 12 15.7495Z"
                                stroke="#DA3E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                            <path
                                d="M16.976 19.4997C15.3051 20.6086 13.3118 21.1278 11.3122 20.9748C9.31273 20.8218 7.42155 20.0055 5.93881 18.6553C4.45607 17.3052 3.46668 15.4985 3.12763 13.522C2.78859 11.5455 3.11931 9.51242 4.06732 7.74529C5.01532 5.97816 6.52632 4.57822 8.36055 3.76762C10.1948 2.95702 12.2472 2.78217 14.1921 3.27083C16.137 3.75949 17.863 4.88366 19.0963 6.46497C20.3295 8.04628 20.9994 9.99415 20.9996 11.9995C20.9996 14.0706 20.2496 15.7495 18.3746 15.7495C16.4996 15.7495 15.7496 14.0706 15.7496 11.9995V8"
                                stroke="#DA3E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                        </svg>

                        <span>{{ officeEMail }}</span>
                    </a>
                </div>

                <div class="mr-4 tablet:mb-2">
                    <h4 class="text-lg sm:text-base">Офис продаж:</h4>

                    <div class="flex items-center mb-1">
                        <svg
                            class="mr-2" width="30" height="23" viewBox="0 0 30 23" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 21.875L19.8746 13.4546L21.8984 19.1578H20.2643V21.6674H30V19.1578H28.1418L21.1484 0.875L15 12.1315L8.85164 0.875L1.85822 19.1578H0V21.6674H9.7357V19.1578H8.10155L10.1254 13.4546L15 21.875Z"
                                fill="#DA3E34"
                            />
                        </svg>
                        <span>{{ metroName }}</span>
                    </div>

                    <div class="mb-4 flex items-center">
                        <svg
                            class="mr-2" width="30" height="30" viewBox="0 0 24 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 13.4199C13.6569 13.4199 15 12.0768 15 10.4199C15 8.76307 13.6569 7.41992 12 7.41992C10.3431 7.41992 9 8.76307 9 10.4199C9 12.0768 10.3431 13.4199 12 13.4199Z"
                                stroke="#DA3E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                            <path
                                d="M19.5 10.4199C19.5 17.1699 12 22.4199 12 22.4199C12 22.4199 4.5 17.1699 4.5 10.4199C4.5 8.4308 5.29018 6.52314 6.6967 5.11662C8.10322 3.7101 10.0109 2.91992 12 2.91992C13.9891 2.91992 15.8968 3.7101 17.3033 5.11662C18.7098 6.52314 19.5 8.4308 19.5 10.4199V10.4199Z"
                                stroke="#DA3E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                        </svg>

                        <span>{{ officeAddress }}</span>
                    </div>

                </div>

                <div class="mr-4 tablet:mb-2">
                    <h4 class="text-lg sm:text-base">Отдел Маркетинга:</h4>
                    <a
                        v-if="marketingEMail"
                        :href="'mailto:' + marketingEMail"
                        class="flex items-center"
                    >
                        <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 15.7495C14.0711 15.7495 15.75 14.0706 15.75 11.9995C15.75 9.92844 14.0711 8.24951 12 8.24951C9.92893 8.24951 8.25 9.92844 8.25 11.9995C8.25 14.0706 9.92893 15.7495 12 15.7495Z"
                                stroke="#DA3E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                            <path
                                d="M16.976 19.4997C15.3051 20.6086 13.3118 21.1278 11.3122 20.9748C9.31273 20.8218 7.42155 20.0055 5.93881 18.6553C4.45607 17.3052 3.46668 15.4985 3.12763 13.522C2.78859 11.5455 3.11931 9.51242 4.06732 7.74529C5.01532 5.97816 6.52632 4.57822 8.36055 3.76762C10.1948 2.95702 12.2472 2.78217 14.1921 3.27083C16.137 3.75949 17.863 4.88366 19.0963 6.46497C20.3295 8.04628 20.9994 9.99415 20.9996 11.9995C20.9996 14.0706 20.2496 15.7495 18.3746 15.7495C16.4996 15.7495 15.7496 14.0706 15.7496 11.9995V8"
                                stroke="#DA3E34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            />
                        </svg>
                        <span>{{ marketingEMail }}</span>
                    </a>
                </div>

                <div class="social">
                    <h4 class="text-lg sm:text-base">Наши соцсети: </h4>
                    <div v-if="getSocials && getSocials.length > 0" class="flex items-center justify-between">
                        <SocialItem
                            v-for="(item) in getSocials"
                            :key="item.id"
                            :item="item"
                            class="text-blue-900 hover:text-orange-400"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="content && content.intro_text"
            class="contacts-map__card p-24 bg-blue-900 bg-opacity-75 text-white hidden xl:block tablet:p-10 md:p-8 sm:px-4"
            v-html="content.intro_text"
        >
        </div>

        <ClientOnly>
            <div
                class="wrapper-1920 mx-auto aspect-w-13 aspect-h-4 mb-10 tablet:aspect-h-6 sm:tablet:aspect-h-8 xs:tablet:aspect-h-10 mob:tablet:aspect-h-12"
            >
                <client-only>
                    <ContactsMap
                        v-if="getMap && Object.keys(getMap).length > 0"
                        :coords="getMap.coords"
                        :vectors="getMap.vector"
                        :desc="getMap.desc"
                    />
                </client-only>

                <div
                    v-if="content && content.intro_text"
                    class="contacts-map__card p-24 bg-blue-900 bg-opacity-75 text-white extra:p-12 xl:hidden"
                    v-html="content.intro_text"
                >
                </div>
            </div>
        </ClientOnly>

        <div v-if="content && content.full_text" v-html="content.full_text"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { seoHelper, parsePhoneMixin } from '~/mixins/content-helpers';
    import Breadcrumbs from '@/components/base/Breadcrumbs';
    import WantForm from '@/components/front/WantForm';
    import SocialItem from '@/components/base/SocialItem';
    import ContactsMap from '@/components/inner/ContactsMap';
    import InstaList from '@/components/front/InstaList';

    const pageTitle = "КОНТАКТЫ ВОЛГА ЛАЙН";
    const seoTitle = 'Контакты круизной компании "Волга Лайн"';

    export default {
        components: { InstaList, ContactsMap, SocialItem, WantForm, Breadcrumbs },
        mixins: [seoHelper, parsePhoneMixin],
        head() {
            return {
                title: this.getSeoField('title', this.titlePage),
                meta: [
                    {
                        hid: "keywords",
                        name: "keywords",
                        content: this.getSeoField('keywords', 'круизы по рекам, отдых на корабле, отдых на пароходе, отдых на теплоходе, речные круизы, речные туры, теплоходные туры, тур по волге, тур по реке, туры выходного дня из москвы, туры на корабле, туры на пароходе, туры на теплоходе, туры по оке')
                    },
                    {
                        hid: "description",
                        name: 'description',
                        content: this.getSeoField('description', 'Наш офис продаж находится по адресу: г. Москва, ул. Маросейка, 3/13. Станция метро "Китай-город"')
                    },
                    { hid: "og:title", property: "og:title", content: this.titleSeo },
                    { hid: "og:type", property: "og:type", content: this.getSeoType('article') },
                    {
                        hid: "og:description",
                        property: "og:description",
                        content: this.description
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
                content: {},
            };
        },
        computed: {
            ...mapGetters([
                'getSettingsByName',
                'getSocials',
                'getMap',
            ]),
            phoneNumber() {
                return this.getSettingsByName('phone', 'value');
            },
            phoneNumberFiltered() {
                return this.getSettingsByName('phone', 'value_2');
            },
            whatsappNumber() {
                return this.getSettingsByName('whatsapp_number', 'value');
            },
            metroName() {
                return this.getSettingsByName('sales_office', 'value');
            },
            officeAddress() {
                return this.getSettingsByName('sales_office', 'value_2');
            },
            officeEMail() {
                return this.getSettingsByName('email', 'value');
            },
            marketingEMail() {
                return this.getSettingsByName('email_marketing', 'value');
            }
        },
        async asyncData({ $axios }) {
            let content = {};
            let breadcrumbs = {};
            let title = 'Контакты';
            let titleSeo = 'Контакты круизной компании "Волга Лайн"';
            let description = 'Наш офис продаж находится по адресу: г. Москва, ул. Маросейка, 3/13. Станция метро "Китай-город"';

            try {
                const { data } = await $axios.get('/contacts');
                for (const [key, val] of Object.entries(data.content)) {
                    content[key] = val;
                }
            } catch (ex) {
                console.log('cant fetch content: ' + ex);
            }

            if (content.title) title = content.title;

            breadcrumbs = [
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

            return {
                content,
                title,
                breadcrumbs,
                titleSeo,
                description,
            };
        },
    };
</script>

<style lang="scss" scoped>
    .contacts-list {
        max-width: 100%;

        & > * {
            @apply mb-4;
        }
    }

    .social {
        max-width: 190px;
    }

    .contacts-map__card {
        max-width: 580px;
    }

    @screen xl {
        .contacts-map__card {
            max-width: 100%;
        }
    }
</style>
