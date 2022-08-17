<template>
    <div class="page-inner page-partners pt-6">
        <div class="wrapper wrapper-1410">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>
        </div>

        <div class="wrapper wrapper-1410">
            <h1 v-if="title" class="page-inner-h1 normal-case mb-12 font-bold sm:mb-10">{{ title }}</h1>
        </div>

        <div class="wrapper wrapper-1410 overflow-hidden pb-12 xl:pb-0">
            <div class="partners">
                <div class="partners-item">
                    <a class="partners-image" href="https://mosgortur.ru" target="_blank" rel="nofollow noopener"
                       title="Мосгортур"
                    >
                        <img src="~/assets/images/partners/mosgortyr.png" alt="Мосгортур">
                    </a>

                    <div class="partners-description">
                        <p>
                            Государственное автономное учреждение культуры города Москвы «Московское агентство
                            организации отдыха и туризма» (ГАУК «МОСГОРТУР») занимается организацией детского отдыха и
                            оздоровления и является крупнейшим организатором отдыха для детей льготных категорий,
                            определенных постановлением Правительства Москвы No 56-ПП.
                        </p>
                    </div>
                </div>

                <div class="partners-item">
                    <a class="partners-image" href="https://welcome.moscow" target="_blank" rel="nofollow noopener"
                       title="Развитие туризма и гостеприимства Москвы">
                        <img src="~/assets/images/partners/office.png" alt="Развитие туризма и гостеприимства Москвы">
                    </a>

                    <div class="partners-description">
                        <p>
                            Мы реализуем имиджевые и маркетинговые проекты по продвижению Москвы как туристского и
                            культурного центра, воплощаем инициативы по продвижению туристского потенциала столицы в России
                            и за рубежом, а также инфраструктурные проекты. Все это способствует росту потока туристов и
                            вклада отрасли туризма и сферы услуг в экономику города.
                        </p>

                        <p>
                            Учредителем АНО «Проектный офис по развитию туризма и гостеприимства Москвы» является
                            Правительство Москвы.
                        </p>
                    </div>
                </div>

                <div class="partners-item">
                    <a class="partners-image" href="https://www.mos.ru/tourism" target="_blank" rel="nofollow noopener"
                       title="Комитет по туризму города Москвы">
                        <img src="~/assets/images/partners/tyrizm.png" alt="Комитет по туризму города Москвы">
                    </a>

                    <div class="partners-description">
                        <p>
                            Комитет по туризму города Москвы формирует сильный бренд и создает положительный имидж столицы
                            как туристского центра в России и на международной арене. Это воплощается через законодательные
                            инициативы, конгрессно-выставочную деятельность, событийные и имиджевые проекты в сфере туризма.
                        </p>
                    </div>
                </div>

                <div class="partners-item">
                    <a class="partners-image" href="https://soyuzveteranov.ru" target="_blank" rel="nofollow noopener"
                       title="Российский союз ветеранов"
                    >
                        <img src="~/assets/images/partners/veterans.png" alt="Российский союз ветеранов">
                    </a>

                    <div class="partners-description">
                        <p>
                            29 сентября 1956 года образован Советский комитет ветеранов войны (СКВВ). Организация
                            фронтовиков была создана для объединения усилий по укреплению связей с международными и
                            зарубежными национальными организациями, борющимися против угрозы войны. СКВВ решал социальные
                            проблемы ветеранов и вопросы героико-патриотического воспитания молодежи.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {seoHelper} from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";

    export default {
        components: {Breadcrumbs},
        mixins: [seoHelper],
        head() {
            return {
                title: this.getPageTitle(),
                meta: [
                    {
                        hid: "keywords",
                        name: "keywords",
                        content: this.getSeoField('keywords', 'Партнеры Волгалайн')
                    },
                    {
                        hid: "description",
                        name: 'description',
                        content: this.getSeoField('description', 'Партнеры Волгалайн')
                    },
                    {hid: "og:title", property: "og:title", content: this.title},
                    {hid: "og:type", property: "og:type", content: this.getSeoType('article')},
                    {
                        hid: "og:description",
                        property: "og:description",
                        content: this.getSeoField('description', 'Партнеры Волгалайн')
                    },
                    {hid: "og:url", property: "og:url", content: this.getPageUrl},
                    {hid: "og:image", property: "og:image", content: this.getOgImage()},
                ],
            };
        },
        data() {
            return {
                title: "Наши партнеры",
                breadcrumbs: [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: 'Наши партнеры',
                        link: "",
                    },
                ],
            };
        },
    };

</script>

<style lang="scss" scoped>
    .partners {
        &-item {
            padding: 70px 0;
            @apply flex items-start border-b border-gray-60 first:pt-0 last:pb-0 last:border-b-0;
        }

        &-image {
            @apply w-72 mr-16;
        }

        &-description {
            flex: 1;

            p {
                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
    }

    @screen tablet {
        .partners {
            &-item {
                display: block;
                padding-top: 0;
                padding-bottom: 80px;
                border: 0;

                &:last-of-type {
                    padding-bottom: 0;
                }
            }

            &-image {
                display: block;
                margin-bottom: 34px;
                margin-right: 0;
            }
        }
    }

    @screen mob {
        .partners {
            &-description {
                @apply text-base;
            }
        }
    }
</style>
