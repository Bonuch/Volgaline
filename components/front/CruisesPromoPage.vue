<template>
    <div>
        <div class="header-cruise py-12 flex items-end justify-end mb-10 relative bg-no-repeat bg-center bg-cover">
            <picture
                v-if="cruiseData && cruiseData.image"
                class="w-full h-full absolute left-0 top-0 z-0"
            >
                <source
                    v-if="cruiseData.mobile_image"
                    media="(max-width: 1460px)"
                    :srcset="cruiseData.mobile_image"
                >
                <img class="object-cover w-full h-full" :alt="cruiseData.title" :src="cruiseData.image">
            </picture>
            <div class="wrapper-bg text-white">
                <div class="header-title__container">
                    <h1
                        v-if="cruiseData && cruiseData.title"
                        class="header-cruise-title m-0 font-bold text-4xl md:text-2xl"
                    >
                        {{cruiseData.title}}
                    </h1>
                </div>
            </div>
        </div>

        <div
            v-if="cruiseData && cruiseData.intro_text"
            class="wrapper wrapper-1410 text-center py-10"
        >
            <div class="title-intro-text" v-html="cruiseData.intro_text"></div>
        </div>

        <div v-if="showSearch" class="mb-14 wrapper wrapper-1410">
            <h2 class="text-36 mb-7">Подберите свой круиз сами</h2>

            <div class="relative z-1 p-4 -mx-4 bg-blue-900 rounded-2xl hidden xl:block">
                <button
                    type="button"
                    class="flex items-center justify-center w-full p-3 bg-white text-black-400 text-center text-base font-medium rounded-sm custom-transition hover:text-blue-400"
                    @click="openModal({ name: 'ModalFilter' })"
                >
                    <svg
                        class="mr-1 fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            class="fill-current" fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.9375 2.81249C4.93749 2.2602 4.48977 1.81249 3.93749 1.8125C3.3852 1.81251 2.93749 2.26023 2.9375 2.81251L2.93756 8.5625H2.25C1.69772 8.5625 1.25 9.01022 1.25 9.5625C1.25 10.1148 1.69772 10.5625 2.25 10.5625H3.93758H5.625C6.17729 10.5625 6.625 10.1148 6.625 9.5625C6.625 9.01022 6.17729 8.5625 5.625 8.5625H4.93756L4.9375 2.81249ZM14.0626 1.8125C14.6149 1.8125 15.0626 2.26022 15.0626 2.81251L15.0625 10.8125H15.75C16.3023 10.8125 16.75 11.2602 16.75 11.8125C16.75 12.3648 16.3023 12.8125 15.75 12.8125H14.0625H12.375C11.8227 12.8125 11.375 12.3648 11.375 11.8125C11.375 11.2602 11.8227 10.8125 12.375 10.8125H13.0625L13.0626 2.81249C13.0626 2.26021 13.5103 1.8125 14.0626 1.8125ZM9.00002 1.8125C9.5523 1.8125 10 2.26022 10 2.8125L10 5.1875H10.6875C11.2398 5.1875 11.6875 5.63522 11.6875 6.1875C11.6875 6.73978 11.2398 7.1875 10.6875 7.1875H9H7.3125C6.76022 7.1875 6.3125 6.73978 6.3125 6.1875C6.3125 5.63522 6.76022 5.1875 7.3125 5.1875H8L8.00002 2.8125C8.00002 2.26021 8.44773 1.8125 9.00002 1.8125ZM9 7.4375C9.55228 7.4375 10 7.88521 10 8.4375L10 15.1875C10 15.7398 9.5523 16.1875 9.00002 16.1875C8.44773 16.1875 8.00002 15.7398 8.00002 15.1875L8 8.4375C8 7.88522 8.44771 7.4375 9 7.4375ZM15.0625 14.0624C15.0625 13.5101 14.6147 13.0625 14.0624 13.0625C13.5101 13.0625 13.0625 13.5103 13.0625 14.0626L13.0626 15.1876C13.0626 15.7399 13.5104 16.1875 14.0626 16.1875C14.6149 16.1875 15.0626 15.7397 15.0626 15.1874L15.0625 14.0624ZM3.9376 10.8125C4.48988 10.8125 4.93759 11.2602 4.93757 11.8125L4.9375 15.1875C4.93749 15.7398 4.48976 16.1875 3.93748 16.1875C3.38519 16.1875 2.93749 15.7398 2.9375 15.1875L2.93757 11.8125C2.93759 11.2602 3.38531 10.8125 3.9376 10.8125Z"
                            fill="white"
                        />
                    </svg>

                    <span class="link-inline">Показать фильтры</span>
                </button>
            </div>

            <SearchComponent
                v-if="isWideScreen"
                class="mx-auto"
                :expanded="true"
                :show-expand-button="false"
                :bordered="true"
                @on-submit="handleSearchSubmit"
            />
        </div>

        <div class="page-inner__content cruise-detail__content pb-10">
            <CruiseSectionList
                v-if="fsrContent && fsrContent.length > 0"
                class="bg-white"
                :cruises="fsrContent"
                :show-more-visible="fsrShowMoreVisibility"
                @on-show-more-click="fsrOnSearchMoreClick('/cruise/search', cruiseQuery)"
            />
            <div v-else class="wrapper wrapper-1410 mt-8 xl:p-8">
                <p class="p-2 m-0 mb-3 text-center font-medium">
                    Результаты отсутствуют, попробуйте задать другие параметры поиска.
                </p>
            </div>
        </div>

        <div
            v-if="cruiseData && cruiseData.full_text"
            class="wrapper wrapper-1410"
        >
            <div class="desc" v-html="cruiseData.full_text"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { seoHelper, fetchSearchResult } from '@/mixins/content-helpers';
import { sfmPrepearFormData, sfmQueryHasProp } from '@/helpers/search';
import { findSeoFieldByCode, findSearchParamsFromSeoFileds } from '@/helpers/cruises';
import CruiseSectionList from '@/components/cruise-section/CruiseSectionList';
import SearchComponent from '@/components/search/SearchComponent';

export default {
    name: "CruisesPromoPage",
    mixins: [seoHelper, fetchSearchResult],
    components: {
        SearchComponent,
        CruiseSectionList
    },
    head() {
        return {
            title: this.getSeoField('title'),
            meta: [
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.getSeoField('keywords', 'Речные круизы, круизы на теплоходах, речная навигация, речное путешествие, речные туры, теплоходы, пароходы')
                },
                {
                    hid: "description",
                    name: 'description',
                    content: this.getSeoField('description', 'Речные круизы от компании «Волга Лайн» по всей России на речную навигацию 2021 и 2022 года. Действуют сезонные скидки до 20% на речные круизы 2022 года')
                },
                { hid: "og:title", property: "og:title", content: this.getPageTitle() },
                { hid: "og:type", property: "og:type", content: this.getSeoType('website') },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: this.getSeoField('description', 'Речные круизы от компании «Волга Лайн» по всей России на речную навигацию 2021 и 2022 года. Действуют сезонные скидки до 20% на речные круизы 2022 года')
                },
                { hid: "og:url", property: "og:url", content: this.getPageUrl },
                { hid: "og:image", property: "og:image", content: this.getOgImage() },
            ],
        };
    },
    data(){
        return{
            title: "",
            content: {},
            cruiseQuery:{},
            cruiseData:{},
            fsrContent:[],
            params:{},
            fsrContentMeta:{},
            showSearch: false,
        }
    },
    jsonld() {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            "headline": this.getPageTitle(),
            "image": this.getOgImage(),
            "keywords": this.getSeoField('keywords'),
            "description": this.getSeoField('description'),
            "url": this.getPageUrl,
        };
    },
    computed: {
        ...mapGetters(['getWindowWidth']),
        isWideScreen() {
            return this.getWindowWidth > 1280;
        },
        isMobileScreen() {
            return this.getWindowWidth < 1025;
        },
    },
    methods: {
        ...mapActions({
            openModal: 'modals/openModal',
            'fetchAllOptions': 'search/fetchAllOptions',
            'fetchSelectedOptions': 'search/fetchSelectedOptions',
        }),
        ...mapMutations({
            'setSelectedOptions': 'search/setSelectedOptions',
        }),
        async handleSearchSubmit(formData) {
            await this.fsrSearch("/cruise/search", formData);
        },
        async onClearQueryParamsClick() {
            const params = sfmPrepearFormData(this.$route.query, this.$dayjs);
            await this.fsrSearch("/cruise/search", params);
        },
    },
    async fetch() {
        // подтягиваем опции только при включенном поиске
        if (this.showSearch) {
            const params = sfmPrepearFormData(this.$route.query, this.$dayjs);
            await this.fetchAllOptions();

            if (params && Object.keys(params).length > 0 && sfmQueryHasProp(params)) {
                await this.fetchSelectedOptions(params);
            } else {
                this.setSelectedOptions(null);
            }
        }
    },
    async asyncData( context ) {
        let params = {};
        let title = '';
        let content = {};
        let cruiseData = {};
        let cruiseQuery = {};
        let fsrContentMeta = {};
        let fsrContent = {};
        let showSearch = false;

        try {
            const {data} = await context.$axios.get(context.route.path);
            cruiseData = data.content;
            for (const [key, val] of Object.entries(data.content)) {
                content[key] = val;
            }

            title = content.title;

            if (cruiseData.seo) {
                const searchField = findSeoFieldByCode(cruiseData.seo, 'search');
                showSearch = searchField?.value ? searchField.value : false;

                cruiseQuery = findSearchParamsFromSeoFileds(cruiseData.seo);
                params = sfmPrepearFormData(cruiseQuery, context.$dayjs);
            }
        } catch (ex) {
            console.log("cant fetch cruise data: " + ex);

            if (ex?.response?.status === 404 ) {
                context.error({ statusCode: 404, message: 'cant fetch content' });
            } else {
                context.error({ statusCode: 500, message: 'Ошибка' });
            }

            return;
        }

        try {
            const { data } = await context.$axios.get('/cruise/search', { params });
            fsrContent = data.data;
            fsrContentMeta = data.meta;
        } catch (ex) {
            console.log('cant fetch cruises list ' + ex);
        }

        return {
            cruiseQuery,
            title,
            content,
            cruiseData,
            params,
            showSearch,
            fsrContentMeta,
            fsrContent
        }
    },
    async beforeRouteUpdate(to, from, next) {
        const query = Object.assign({}, to.query, this.cruiseQuery); // к мете страницы подкидываем квери страницы
        const params = sfmPrepearFormData(query, this.$dayjs);

        if (params && Object.keys(params).length > 0) {
            // подгрузка опций поиска
            if (sfmQueryHasProp(params) && this.showSearch) {
                await this.fetchSelectedOptions(params);
            }

            // подгрузка отсортированных круизов
            if (sfmQueryHasProp(params, ['sort', 'order']) || params['modal-filter']) {
                await this.fsrSearch('/cruise/search', params);
            }
        } else {
            this.setSelectedOptions(null);
        }

        next();
    },
}
</script>

<style scoped>
.header-cruise{
    background-size: cover;
    min-height: 700px;
    background-repeat: no-repeat;
    background-position: center;
}
.header-cruise-title{
    height: 100%;
}
.wrapper-bg{
    background-color: rgba(19, 86, 167, 0.6);
    backdrop-filter:blur(17px);
}
.header-title__container{
    max-width: 1610px;
    width: 100%;
    margin-right: auto;
    padding: 16px 46px;
}
.desc{
    border:1px solid #D7D7D7;
    padding: 40px 50px 50px;
}
.desc::v-deep ul>li{
    margin-bottom: 0;
    font-weight: 400;
}

.desc::v-deep ul>li {
    position: relative;
}

.desc::v-deep ul>li::before{
    content: "";
    position: absolute;
    left: -16px;
    top: 11px;
    width: 6px;
    height: 6px;
    background-color: #000;
    border-radius: 50%;
}

.title-intro-text::v-deep h2{
    @apply text-5xl;
}

.title-intro-text::v-deep p{
    font-size: 18px;
}

@media (max-width: 750px) {
    .title-intro-text::v-deep strong{
        font-size: 24px;
        margin-bottom: 20px;
    }
    .title-intro-text::v-deep h2{
        line-height: 30px!important;
        margin-bottom: 20px!important;
    }
}
</style>
