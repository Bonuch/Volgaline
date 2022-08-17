<template>
    <div class='page-inner page-news pt-6'>
        <div class='wrapper wrapper-1410'>
            <Breadcrumbs v-if='breadcrumbs' :breadcrumbs='breadcrumbs' class='page-inner__breadcrumbs--small-offset' />
            <h1 v-if='title' class='text-50 sm:text-40 xs:text-36 font-medium text-black-400 capitalize mb-13'>{{ title }}</h1>
            <div v-if='getBlogInfo' class='card-wrapper rounded-3xl border border-gray-90 p-10 xs:p-7 mb-15'>
                <h2 class='mb-10' v-if='getBlogInfo.title'>{{ getBlogInfo.title }}</h2>
                <div class='flex flex-wrap border-b border-gray-30 pb-14 mb-10'>
                    <div
                        class='card-block flex xs:flex-col card-wrapper-item odd:mr-5 xs:odd:mr-0'
                        v-for='(item, indexBlog) in getBlogContent'
                        :key='indexBlog'
                    >
                        <img :src='item.image' :alt='item.title' class='image-wrapper-w rounded-md mr-7 xs:mr-0 xs:object-cover'>
                        <div class='flex flex-col justify-center'>
                            <p class='text-base font-semibold mb-4' v-if='item.title'>
                                <nuxt-link :to="`/blog-o-kruizah/${item.slug}`">
                                    {{ item.title }}
                                </nuxt-link>
                            </p>
                            <div class='flex items-center'>
                                <div class='text-sm text-black-100 font-normal mr-5' v-if='item.created_at'>
                                    {{ getDateFormattedWithDot(item.created_at) }}
                                </div>
                                <div v-if='item.views_counter !== null' class='flex items-center'>
                                    <svg width='16' height='12' viewBox='0 0 16 12' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M15.8806 5.454C15.2952 4.174 12.9999 0 7.99991 0C2.99991 0 0.704581 4.174 0.119247 5.454C0.040673 5.62553 0 5.81199 0 6.00067C0 6.18934 0.040673 6.3758 0.119247 6.54733C0.704581 7.826 2.99991 12 7.99991 12C12.9999 12 15.2952 7.826 15.8806 6.546C15.959 6.37466 15.9996 6.18843 15.9996 6C15.9996 5.81157 15.959 5.62534 15.8806 5.454ZM7.99991 10.6667C3.79525 10.6667 1.83325 7.08933 1.33325 6.00733C1.83325 4.91067 3.79525 1.33333 7.99991 1.33333C12.1946 1.33333 14.1572 4.89533 14.6666 6C14.1572 7.10467 12.1946 10.6667 7.99991 10.6667Z'
                                            fill='#696969' />
                                        <path
                                            d='M8.0013 2.66748C7.34203 2.66748 6.69757 2.86298 6.1494 3.22925C5.60124 3.59552 5.174 4.11612 4.92171 4.7252C4.66941 5.33429 4.6034 6.00451 4.73202 6.65112C4.86064 7.29772 5.17811 7.89166 5.64428 8.35784C6.11046 8.82401 6.7044 9.14148 7.351 9.2701C7.99761 9.39872 8.66783 9.33271 9.27692 9.08041C9.886 8.82812 10.4066 8.40088 10.7729 7.85272C11.1391 7.30455 11.3346 6.66009 11.3346 6.00081C11.3336 5.11708 10.982 4.26985 10.3572 3.64496C9.73226 3.02007 8.88503 2.66854 8.0013 2.66748ZM8.0013 8.00082C7.60574 8.00082 7.21906 7.88352 6.89016 7.66375C6.56126 7.44399 6.30492 7.13163 6.15354 6.76618C6.00217 6.40073 5.96256 5.9986 6.03973 5.61063C6.1169 5.22267 6.30738 4.86631 6.58709 4.5866C6.86679 4.3069 7.22316 4.11641 7.61112 4.03924C7.99909 3.96207 8.40122 4.00168 8.76667 4.15305C9.13212 4.30443 9.44448 4.56078 9.66424 4.88967C9.88401 5.21857 10.0013 5.60525 10.0013 6.00081C10.0013 6.53125 9.79059 7.03996 9.41552 7.41503C9.04044 7.7901 8.53174 8.00082 8.0013 8.00082Z'
                                            fill='#696969' />
                                    </svg>
                                    <span
                                        class='ml-1 text-sm text-black-100 font-normal'>{{ item.views_counter }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link
                    class='button py-2 px-5 font-medium bg-transparent text-red-500 border border-red-500 rounded sm:flex-100 hover:border-blue-500'
                    :to='getBlogInfo.slug'
                >
                    Показать больше
                </nuxt-link>
            </div>

            <div v-if='promoBanners && promoBanners[0]' class='relative mb-15'>
                <div class='absolute z-20 mt-14 ml-16 tablet:ml-8 xs:ml-5 sm:mt-5 xs:mt-3'
                     v-html='promoBanners[0].text'></div>
                <img :src='promoBanners[0].image' :alt='promoBanners[0].title' class='relative z-10'>
            </div>

            <div v-if='getNewsInfo' class='card-wrapper rounded-3xl border border-gray-90 p-10 xs:p-7 mb-15'>
                <h2 class='mb-10' v-if='getNewsInfo.title'>{{ getNewsInfo.title }}</h2>
                <div class='flex flex-wrap border-b border-gray-30 pb-14 mb-10'>
                    <div
                        class='card-block-news flex card-wrapper-item  odd:mr-5'
                        v-for='(item, indexBlog) in getNewsContent'
                        :key='indexBlog'
                    >
                        <div class='flex flex-col'>
                            <p class='text-base font-semibold mb-4' v-if='item.title'>
                                <nuxt-link :to="`/news/${item.slug}`">
                                    {{ item.title }}
                                </nuxt-link>
                            </p>
                            <div class='flex items-center'>
                                <div class='text-sm text-black-100 font-normal mr-5' v-if='item.created_at'>
                                    {{ getDateFormattedWithDot(item.created_at) }}
                                </div>
                                <div v-if='item.views_counter !== null' class='flex items-center'>
                                    <svg width='16' height='12' viewBox='0 0 16 12' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M15.8806 5.454C15.2952 4.174 12.9999 0 7.99991 0C2.99991 0 0.704581 4.174 0.119247 5.454C0.040673 5.62553 0 5.81199 0 6.00067C0 6.18934 0.040673 6.3758 0.119247 6.54733C0.704581 7.826 2.99991 12 7.99991 12C12.9999 12 15.2952 7.826 15.8806 6.546C15.959 6.37466 15.9996 6.18843 15.9996 6C15.9996 5.81157 15.959 5.62534 15.8806 5.454ZM7.99991 10.6667C3.79525 10.6667 1.83325 7.08933 1.33325 6.00733C1.83325 4.91067 3.79525 1.33333 7.99991 1.33333C12.1946 1.33333 14.1572 4.89533 14.6666 6C14.1572 7.10467 12.1946 10.6667 7.99991 10.6667Z'
                                            fill='#696969' />
                                        <path
                                            d='M8.0013 2.66748C7.34203 2.66748 6.69757 2.86298 6.1494 3.22925C5.60124 3.59552 5.174 4.11612 4.92171 4.7252C4.66941 5.33429 4.6034 6.00451 4.73202 6.65112C4.86064 7.29772 5.17811 7.89166 5.64428 8.35784C6.11046 8.82401 6.7044 9.14148 7.351 9.2701C7.99761 9.39872 8.66783 9.33271 9.27692 9.08041C9.886 8.82812 10.4066 8.40088 10.7729 7.85272C11.1391 7.30455 11.3346 6.66009 11.3346 6.00081C11.3336 5.11708 10.982 4.26985 10.3572 3.64496C9.73226 3.02007 8.88503 2.66854 8.0013 2.66748ZM8.0013 8.00082C7.60574 8.00082 7.21906 7.88352 6.89016 7.66375C6.56126 7.44399 6.30492 7.13163 6.15354 6.76618C6.00217 6.40073 5.96256 5.9986 6.03973 5.61063C6.1169 5.22267 6.30738 4.86631 6.58709 4.5866C6.86679 4.3069 7.22316 4.11641 7.61112 4.03924C7.99909 3.96207 8.40122 4.00168 8.76667 4.15305C9.13212 4.30443 9.44448 4.56078 9.66424 4.88967C9.88401 5.21857 10.0013 5.60525 10.0013 6.00081C10.0013 6.53125 9.79059 7.03996 9.41552 7.41503C9.04044 7.7901 8.53174 8.00082 8.0013 8.00082Z'
                                            fill='#696969' />
                                    </svg>
                                    <span
                                        class='ml-1 text-sm text-black-100 font-normal'>{{ item.views_counter }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link
                    class='button py-2 px-5 font-medium bg-transparent text-red-500 border border-red-500 rounded sm:flex-100 hover:border-blue-500'
                    :to='getNewsInfo.slug'
                >
                    Список новостей
                </nuxt-link>
            </div>

            <div v-if='promoBanners && promoBanners[1]' class='relative mb-15'>
                <div class='absolute z-20 mt-20 ml-15 tabletLg:mt-15 tablet:ml-10 md:mt-10 xs:ml-5 xs:mt-3'
                     v-html='promoBanners[1].text'></div>
                <img :src='promoBanners[1].image' :alt='promoBanners[1].title' class='relative z-10'>
            </div>

            <div v-if='getExcursionsInfo' class='card-wrapper rounded-3xl border border-gray-90 p-10 xs:p-7 mb-15'>
                <h2 class='mb-10' v-if='getExcursionsInfo.title'>{{ getExcursionsInfo.title }}</h2>
                <div class='flex flex-wrap border-b border-gray-30 pb-14 mb-10'>
                    <div
                        class='card-block flex xs:flex-col card-wrapper-item odd:mr-5'
                        v-for='(item, indexBlog) in getExcursionsContent'
                        :key='indexBlog'
                    >
                        <img :src='item.image' :alt='item.title' class='image-wrapper-w rounded-md mr-7 xs:mr-0 xs:object-cover'>
                        <div class='flex flex-col justify-center'>
                            <p class='text-base font-semibold mb-4' v-if='item.title'>
                                <nuxt-link :to="`/ekskursii/${item.slug}`">
                                    {{ item.title }}
                                </nuxt-link>
                            </p>
                            <div class='flex items-center'>
                                <div class='text-sm text-black-100 font-normal mr-5' v-if='item.created_at'>
                                    {{ getDateFormatted(item.created_at) }}
                                </div>
                                <div v-if='item.views_counter !== null' class='flex items-center'>
                                    <svg width='15' height='15' viewBox='0 0 15 15' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M7.5 15C6.01664 15 4.56659 14.5601 3.33323 13.736C2.09986 12.9119 1.13856 11.7406 0.570907 10.3701C0.00324964 8.99968 -0.145275 7.49168 0.144114 6.03683C0.433503 4.58197 1.14781 3.2456 2.1967 2.1967C3.2456 1.14781 4.58197 0.433503 6.03683 0.144114C7.49168 -0.145275 8.99968 0.00324964 10.3701 0.570907C11.7406 1.13856 12.9119 2.09986 13.736 3.33323C14.5601 4.56659 15 6.01664 15 7.5C14.9979 9.48847 14.207 11.3949 12.8009 12.8009C11.3949 14.207 9.48847 14.9979 7.5 15ZM7.5 1.25C6.26387 1.25 5.0555 1.61656 4.02769 2.30332C2.99988 2.99008 2.1988 3.96619 1.72576 5.10823C1.25271 6.25027 1.12894 7.50694 1.3701 8.71932C1.61125 9.9317 2.20651 11.0453 3.08059 11.9194C3.95466 12.7935 5.06831 13.3888 6.28069 13.6299C7.49307 13.8711 8.74974 13.7473 9.89177 13.2742C11.0338 12.8012 12.0099 12.0001 12.6967 10.9723C13.3834 9.94451 13.75 8.73614 13.75 7.5C13.7482 5.84296 13.0891 4.2543 11.9174 3.0826C10.7457 1.91089 9.15705 1.25182 7.5 1.25Z'
                                            fill='#696969' />
                                        <path
                                            d='M4.96586 9.74875L4.30273 8.68875L6.87398 7.07812V3.75H8.12398V7.77062L4.96586 9.74875Z'
                                            fill='#696969' />
                                    </svg>
                                    <span
                                        class='ml-1 text-sm text-black-100 font-normal'>{{ dayjsGetTimeFormatted(item.created_at)
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link
                    class='button py-2 px-5 font-medium bg-transparent text-red-500 border border-red-500 rounded sm:flex-100 hover:border-blue-500'
                    :to='getBlogInfo.slug'
                >Все экскурсии
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { seoHelper, fetchSearchResult, dayjsHelpers } from '~/mixins/content-helpers';
import Breadcrumbs from '@/components/base/Breadcrumbs';
import NewsSectionItem from '@/components/news/NewsSectionItem';

const pageTitle = 'Новости, Экскурсии, Блог';
const seoTitle = 'Волгалайн: Самое интересное от "Волга Лайн"';

export default {
    components: { NewsSectionItem, Breadcrumbs },
    mixins: [seoHelper, fetchSearchResult, dayjsHelpers],
    head() {
        return {
            title: this.getSeoField('title', this.titlePage),
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'Волгалайн: Самое интересное от "Волга Лайн"',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Новости, Блог, Экскурсии речных круизов, актуальные скидки и интересные маршруты от круизной компании "Волга Лайн"',
                },
                { hid: 'og:title', property: 'og:title', content: this.getSeoField('title', this.titlePage) },
                { hid: 'og:type', property: 'og:type', content: 'website' },
                { hid: 'og:url', property: 'og:url', content: this.getPageUrl },
                { hid: 'og:image', property: 'og:image', content: this.getOgImage() },
            ],
        };
    },
    data() {
        return {
            title: pageTitle,
            titlePage: seoTitle,
            breadcrumbs: [
                {
                    id: 1,
                    title: 'Главная',
                    link: '/',
                },
                {
                    id: 2,
                    title: pageTitle,
                    link: '',
                },
            ],
            content: [],
            promoBanners: [],
        };
    },
    computed: {
        getBlogInfo() {
            return this.blogContent.category;
        },
        getBlogContent() {
            return this.blogContent.items;
        },
        getNewsInfo() {
            return this.newsContent.category;
        },
        getNewsContent() {
            return this.newsContent.items;
        },
        getExcursionsInfo() {
            return this.excursionsContent.category;
        },
        getExcursionsContent() {
            return this.excursionsContent.items;
        },
    },
    async asyncData({ $axios }) {
        let newsContent = [];
        let blogContent = [];
        let excursionsContent = [];
        let fsrContentMeta = {};
        let promoBanners = [];

        try {
            const { data } = await $axios.get('/samoe-interesnoe-ot-volga-lajn');
            newsContent = data.news;
            blogContent = data.blog;
            excursionsContent = data.excursions;
            fsrContentMeta = data.meta;
        } catch (ex) {
            console.log('cant fetch content: ' + ex);
            return null;
        }
        try {
            const { data } = await $axios.get('/banners/akcii-na-stranice-blog-novosti-i-ekskursii');
            promoBanners = data.data;

        } catch (ex) {
            console.log('cant fetch promo front: ' + ex);
        }
        return {
            promoBanners,
            newsContent,
            blogContent,
            excursionsContent,
            fsrContentMeta,
        };
    },
};
</script>

<style lang='scss' scoped>
.card-wrapper {
    max-width: 940px;
    box-shadow: 0px 4px 35px rgba(36, 58, 101, 0.1);
}

.image-wrapper-w {
    width: 100px;
    height: 100px;
}

.card-wrapper-item {
    max-width: 410px;
}

.card-block:not(:nth-last-child(-n+2)) {
    @apply border-b border-gray-30 mb-6 pb-6;
}

.card-block-news {
    @apply border-b border-gray-30 mb-6 pb-6;
    width: 420px;
}

.card-block-news:last-child {
    @apply border-b-0 mb-0 pb-0;
}

@screen lg {
    .card-wrapper-item {
        max-width: 100%;
        width: 100%;
    }

    .card-block:nth-last-child(2) {
        @apply border-b border-gray-30 mb-6 pb-6;
    }
}

@screen xs {
    .image-wrapper-w {
        width: 100%;
        height: 150px;
    }
}
</style>
