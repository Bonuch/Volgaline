<template>
    <div class='page-inner' :class="{'pt-6': !hasImage}">

        <Breadcrumbs
            v-if='breadcrumbs'
            :breadcrumbs='breadcrumbs'
            class='wrapper wrapper-1410 my-7 page-inner__breadcrumbs--small-offset'
        />
            <div
                v-if='hasImage'
                class='page-inner__heading page-inner-bg-gradient sm:hidden'
                :style='`backgroundImage: url(${content.image})`'
            >
                <div class='wrapper wrapper-1410 page-inner-bg-gradient-content'>
                    <div class='max-w-xl'>
                        <div
                            v-if='content && content.intro_text'
                            class='wrapper-1220'
                            v-html='content.intro_text'></div>
                    </div>
                </div>
            </div>

            <div class='wrapper wrapper-1410 page-inner-bg-gradient-content mb-9 hidden sm:block'>
                <div class='max-w-sm'>
                    <div
                        v-if='content && content.intro_text'
                        class='wrapper-1220'
                        v-html='content.intro_text'></div>
                </div>
            </div>

            <div
                v-if='hasImageMob'
                class='page-inner__heading object-cover bg-100% h-60 bg-no-repeat mb-17 hidden sm:block'
                :style='`backgroundImage: url(${content.mobile_image})`'
            >

            </div>

            <div v-else class='wrapper wrapper-1220'>
                <Breadcrumbs v-if='breadcrumbs' :breadcrumbs='breadcrumbs'
                             class='page-inner__breadcrumbs--small-offset' />

                <h1 v-if='title' class='page-inner-h1 page-inner-h1--offset mb-10'>
                    <wbr>
                    {{ title }}
                    <wbr>
                </h1>
            </div>

            <div
                class='mb-30 tablet:mb-18 overflow-hidden'
            >
                <h2 class='wrapper wrapper-1410 text-40 sm:text-2xl font-medium mb-15 sm:mb-7'><span class='text-red-500'>Повышенная агентская комиссия до 14%</span><br>
                    на 3 собственных теплохода</h2>
                <template v-if='discountShips && discountShips.length > 0'>
                    <LazyHydrate :when-visible="{ rootMargin: '140px' }">
                        <div class='mb-4 wrapper wrapper-1410 tablet:pr-0'>
                            <DiscountShips :arr='discountShips' />
                        </div>
                    </LazyHydrate>
                </template>
            </div>

            <div
                class='wrapper pt-20 pb-16 tablet:!py-15 mt-30 tablet:!mt-18 px-auto bg-blue-70'
            >
                <div class='wrapper wrapper-1410'>
                    <h2 class='text-64 tablet:text-40 font-medium text-blue-60 mb-15 sm:mb-12'>Наши преимущества:</h2>
                    <div
                        class='mb-25 last:mb-0 tablet:mb-20'
                        v-for='(item, indexIdx) in benefitsItems'
                        :key='indexIdx'
                    >
                        <h2 class='text-black-400 text-36 tablet:text-2xl font-normal tablet:font-medium mb-10 sm:mb-8'>
                            {{ item.title }}</h2>
                        <div class='flex tabletLg:flex-wrap'>
                            <div
                                class='agents-block-content w-1/3 xl:w-1/2 mr-7 mb-7 tablet:mb-5 last:mb-0 last:mr-0 px-7 py-10 bg-white'
                                v-for='(info, indexIdm) in item.infoBlocks'
                                :key='indexIdm'
                            >
                                <img :src='info.img' :alt='info.title' class='mb-6'>
                                <p class='text-2xl tablet:text-xl text-black-400 font-medium mb-5 tablet:mb-4' v-html='info.title'></p>
                                <p class='text-base text-black-400 font-normal mb-0'>{{ info.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <AgentsFormRequest/>
    </div>
</template>

<script>
import { seoHelper, fetchSearchResult } from '~/mixins/content-helpers';
import Breadcrumbs from '@/components/base/Breadcrumbs';
import WantForm from '@/components/front/WantForm';
import LazyHydrate from 'vue-lazy-hydration';
import AgentsFormRequest from "@/components/front/AgentsFormRequest";

export default {
    name: 'SotrudnichestvoDlyaAgentskihProdazh',
    components: {
        AgentsFormRequest,
        WantForm,
        Breadcrumbs,
        LazyHydrate,
        DiscountShips: () => import('@/components/front-banners/DiscountShips'),
    },
    mixins: [seoHelper, fetchSearchResult],
    layout: 'without-form',
    head() {
        return {
            title: this.getSeoField('title'),
            meta: [
                { hid: "keywords", name: "keywords", content: this.getSeoField('keywords') },
                { hid: "description", name: 'description', content: this.getSeoField('description') },
                { hid: "og:title", property: "og:title", content: this.getSeoField('title') },
                { hid: "og:type", property: "og:type", content: 'website' },
                { hid: "og:url", property: "og:url", content: this.getPageUrl },
                { hid: "og:image", property: "og:image", content: this.getOgImage() },
            ],
        };
    },
    data() {
        return {
            benefitsItems: [
                {
                    title: 'Мотивация на продажи',
                    infoBlocks: [
                        {
                            img: require("@/assets/images/icons/agents/earnings.svg"),
                            title: 'Прогрессивная комиссия для агентств',
                            desc: 'Чем активнее ведутся агентские продажи речных туров, тем выше будет ваша комиссия!',
                        },
                        {
                            img: require("@/assets/images/icons/agents/gift.svg"),
                            title: 'Рекламные <br>туры</br>',
                            desc: 'Мы проводим в начале и конце навигации рекламные круизы для наших агентов',
                        },
                        {
                            img: require("@/assets/images/icons/agents/credit-card.svg"),
                            title: 'Удобная система взаиморасчетов',
                            desc: 'Принимаем наличные и безналичные виды оплаты',
                        },

                    ],
                },
                {
                    title: 'Информационное сопровождение',
                    infoBlocks: [
                        {
                            img: require("@/assets/images/icons/agents/following.svg"),
                            title: 'Персональный <br>менеджер</br>',
                            desc: 'Вы будете в курсе реализации своих круизов и своевременно получите полную информацию о количестве туристов, перечислениях оплат и других важных моментах.',
                        },
                        {
                            img: require("@/assets/images/icons/agents/magic-wand.svg"),
                            title: 'Любые ваши вопросы будут оперативно решены',
                            desc: 'Достаточно просто связаться в нашей службой поддержки по телефону или через форму обратной связи.',
                        },
                        {
                            img: require("@/assets/images/icons/agents/document-signed.svg"),
                            title: 'Полный пакет закрывающих документов',
                            desc: 'Сотрудничая с агентами, мы тщательно подготавливаем документацию и закрываем ее в нужные сроки.',
                        },

                    ],
                },
                {
                    title: 'Технические настройки взаимодействия',
                    infoBlocks: [
                        {
                            img: require("@/assets/images/icons/agents/computer.svg"),
                            title: 'Интеграция по API с нашим сайтом для загрузки круизов на ваш сайт',
                            desc: 'Вы будете видеть все актуальные предложения, как только на сайт будут загружаться новые туры.',
                        },
                        {
                            img: require("@/assets/images/icons/agents/data-transfer.svg"),
                            title: 'Интеграция нашего iFrame на сайт агентства',
                            desc: 'С помощью специального контейнера, установленного на сайт, ваши туристы получат полную информацию о круизах в режиме реального времени.',
                        },
                        {
                            img: require("@/assets/images/icons/agents/lock.svg"),
                            title: 'Запуск системы online-бронирования',
                            desc: 'В системе можно бронировать Александр Свирский, Башкортостан, Мамин Сибиряк и партнерские теплоходы по запросу.',
                        },

                    ],
                },

            ],
            discountShips: [],
            content: {},
            breadcrumbs: [],
            title: '',
        };
    },

    computed: {
        hasImage() {
            return this.content && this.content.image;
        },
        hasImageMob() {
            return this.content && this.content.mobile_image;
        },
        getBannerContent() {
            return {
                title: this.content.title,
                content: this.content.intro_text,
                image: this.content.image,
            };
        },
    },
    async asyncData({ $axios }) {
        let title = '';
        let content = {};
        let breadcrumbs = [];
        let discountShips = [];

        try {
            const { data } = await $axios.get('/front-page/content');
            discountShips = data.discount_ships
        } catch (ex) {
            console.log('cant fetch front page: ' + ex);
        }
        try {
            const { data } = await $axios.get('/sotrudnichestvo-dlya-agentskih-prodazh');

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
            discountShips,
            breadcrumbs,
            content,
            title,
        };
    },
};
</script>

<style scoped lang='scss'>
.agents-block-content {
    height: 360px;
    box-shadow: 0px 4px 35px rgba(36, 58, 101, 0.1);
    border-radius: 20px;
    @media (max-width: 1088px) {
        width: 100%;
        @apply mr-4 py-7;
    }
}

.page-inner-bg-gradient:after {
    background: linear-gradient(270deg, rgba(11, 62, 131, 0) 40%, #ffffff 120%);;
}

@screen tabletLg {
    .agents-block-content {
        height: 100%;
    }
}
</style>
