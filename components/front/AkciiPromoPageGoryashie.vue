<template>
    <div>
        <div class="header-cruise py-12 flex flex-col items-start mb-10 relative bg-no-repeat bg-center bg-cover">
            <picture
                v-if="akciiData && akciiData.image"
                class="w-full h-full absolute left-0 top-0 z-0"
            >
                <source
                    v-if="akciiData.mobile_image"
                    media="(max-width: 480px)"
                    :srcset="akciiData.mobile_image"
                >
                <img class="object-cover w-full h-full" :alt="akciiData.title" :src="akciiData.image">
            </picture>
            <div class="w-full wrapper wrapper-1410 mt-10 z-10">
                <div class="header-title__container">
                    <div
                        v-if="akciiData && akciiData.intro_text"
                        class="header-cruise-title header-cruise-title__span m-0 font-normal text-2xl font-normal"
                        v-html="akciiData.intro_text"
                    >
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="akciiData && akciiData.full_text"
            class="wrapper wrapper-1410"
        >
            <div class="desc akcii-detyam__list" v-html="akciiData.full_text"></div>
        </div>

        <div class="page-inner__content cruise-detail__content pb-10">
            <CruiseSectionList
                v-if="getNewArr && getNewArr.length > 0"
                class="bg-white"
                :cruises="getNewArr"
                :sort-list="sortList"
                :view-controls="viewControls"
                :headings="headings"
                :show-pagination-button='false'
            />
            <div v-else class="wrapper wrapper-1410 mt-8 xl:p-8">
                <p class="p-2 m-0 mb-3 text-center font-medium">
                    Результаты отсутствуют, попробуйте задать другие параметры поиска.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import CruiseSectionList from "@/components/cruise-section/CruiseSectionList";
import {seoHelper, fetchSearchResult} from "@/mixins/content-helpers";
import {sfmPrepearFormData, sfmQueryHasProp} from "../../helpers/search";

const cruiseQueryMamin =  {
    ships: '52', // Александр Свирский
    departure_date_from: getCorrectDate("17.06.2022", "26.06.2022"),
    departure_date_to: '26.06.2022',
    limit: 100,
};
const cruiseQueryMaminSeptember =  {
    ships: '53', // Башкортостан
    departure_date_from: getCorrectDate("18.06.2022", "30.06.2022"),
    departure_date_to: '30.06.2022',
    limit: 100,
};
function getCorrectDate(dateToCompare, dateToCompareEnd) {
    const date = new Date().toLocaleDateString('ru', {year:"numeric", month:"numeric", day:"numeric"});
    if (date > dateToCompare && date <= dateToCompareEnd) {
        return date
    }
}

export default {
    name: "AkciiPromoPageGoryashie",
    mixins: [seoHelper, fetchSearchResult],
    components: {CruiseSectionList},
    head() {
        return {
            title: this.getPageTitle(),
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
                {hid: "og:title", property: "og:title", content: this.getPageTitle()},
                {hid: "og:type", property: "og:type", content: this.getSeoType('website')},
                {
                    hid: "og:description",
                    property: "og:description",
                    content: this.getSeoField('description', 'Речные круизы от компании «Волга Лайн» по всей России на речную навигацию 2021 и 2022 года. Действуют сезонные скидки до 20% на речные круизы 2022 года')
                },
                {hid: "og:url", property: "og:url", content: this.getPageUrl},
                {hid: "og:image", property: "og:image", content: this.getOgImage()},
            ],
        };
    },
    data() {
        return {
            title: "",
            content: {},
            cruiseQuery: {},
            cruiseQueryMamin,
            cruiseQueryMaminSeptember,
            akciiData: {},
            fsrContent: [],
            fsrContentAll: [],
            cruisesOnShipMaminSibiryak: [],
            cruisesOnShipMaminSibiryakInSeptember: [],
            fsrContentMerge: [],
            fsrContentSorted: [],
            timeArray: [],
            params: {},
            paramsMamin: {},
            paramsMaminSeptember: {},
            fsrContentMeta: {},
            sortList: [
                {
                    name: "departure_date_from",
                    title: "Дате начала",
                    value: "asc",
                },
                {
                    name: "price",
                    title: "Стоимости",
                    value: "asc",
                },
                {
                    name: "duration",
                    title: "Продолжительности",
                    value: "asc",
                },
            ],
            viewControls: [
                {
                    name: "grid",
                    icon: "GridIcon",
                },
                {
                    name: "list",
                    icon: "ListIcon",
                },
                {
                    name: "line",
                    icon: "LineIcon",
                },
            ],
            headings: [
                "Начало",
                "Окончание",
                "Дней",
                "Название Круиза",
                "Маршрут",
                "Теплоход",
                "Кают",
                "Цена от",
                "",
            ],
        }
    },
    computed: {
        getNewArr() {
            if(this.fsrContentAll && this.cruisesOnShipMaminSibiryakInSeptember && this.cruisesOnShipMaminSibiryak) {
                const mergedCruises = [...this.fsrContentAll, ...this.cruisesOnShipMaminSibiryakInSeptember, ...this.cruisesOnShipMaminSibiryak];
                return mergedCruises.sort(function(a, b) {
                    return new Date(a.departure_date_time) - new Date(b.departure_date_time)
                })
            }

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

    async asyncData(context) {
        let paramsAll = {};
        let paramsMamin = {};
        let paramsMaminSeptember = {};
        let title = '';
        let content = {};
        let akciiData = {};
        let cruiseQuery = {};
        let fsrContentMeta = {};
        let fsrContentAll = {};
        let cruisesOnShipMaminSibiryak = {};
        let cruisesOnShipMaminSibiryakInSeptember = {};
        let fsrContent = {};

        try {
            const {data} = await context.$axios.get(context.route.path);
            akciiData = data.content;
            for (const [key, val] of Object.entries(data.content)) {
                content[key] = val;
            }

            title = content.title;
            let queries = {};
            let query = akciiData.seo.find((el) => el.code === 'search_params').value;
            query = query.replace('?', "");
            query = query.split("&");
            query.forEach((el) => {
                let data = el.split('=');
                let key = data[0];
                let value = data[1];
                queries[key] = value
            })
            cruiseQuery = queries;
            queries.limit = 100;
            paramsAll = sfmPrepearFormData(queries, context.$dayjs);
        } catch (ex) {
            if (ex.response.status === 404) {
                context.error({statusCode: 404, message: "cant fetch content"})
            } else {
                context.error({statusCode: 500, message: "Ошибка"})
            }
            return
        }

        try {
            const {data} = await context.$axios.get('/cruise/search', {params: paramsAll});
            fsrContentAll = data.data;
            fsrContentMeta = data.meta;
        } catch (ex) {
            console.log("cant fetch cruises - " + ex)
        }

        try {
            paramsMamin = sfmPrepearFormData(cruiseQueryMamin, context.$dayjs);
            const {data} = await context.$axios.get('/cruise/search', {params: paramsMamin});
            cruisesOnShipMaminSibiryak = data.data;
        } catch (ex) {
            console.log("cruises - " + ex)
        }

        try {
            paramsMaminSeptember = sfmPrepearFormData(cruiseQueryMaminSeptember, context.$dayjs);
            const {data} = await context.$axios.get('/cruise/search', {params: paramsMaminSeptember});
            cruisesOnShipMaminSibiryakInSeptember = data.data;
        } catch (ex) {
            console.log("cruises - " + ex)
        }

        return {
            cruiseQuery,
            cruiseQueryMamin,
            cruiseQueryMaminSeptember,
            title,
            content,
            akciiData,
            paramsAll,
            paramsMamin,
            paramsMaminSeptember,
            fsrContentMeta,
            fsrContent,
            fsrContentAll,
            cruisesOnShipMaminSibiryak,
            cruisesOnShipMaminSibiryakInSeptember,
        }

    },
    async beforeRouteUpdate(to, from, next) {
        const query = Object.assign({}, to.query, this.cruiseQuery); // к мете страницы подкидываем квери страницы
        const queryMamin = Object.assign({}, to.query, this.cruiseQueryMamin); // к мете страницы подкидываем квери страницы
        const queryMaminSeptember = Object.assign({}, to.query, this.cruiseQueryMaminSeptember); // к мете страницы подкидываем квери страницы
        const params = sfmPrepearFormData(query, this.$dayjs);
        const paramsMamin = sfmPrepearFormData(queryMamin, this.$dayjs);
        const paramsMaminSeptember = sfmPrepearFormData(queryMaminSeptember, this.$dayjs);

        if (params && Object.keys(params).length > 0) {
            // подгрузка отсортированных круизов
            if (sfmQueryHasProp(params, ['sort', 'order'])) {
                await this.fsrSearch('/cruise/search', params);
            }
        }

        next();
    },
}
</script>

<style lang="scss" scoped>
.header-cruise {
    background-size: cover;
    min-height: 450px;
    background-repeat: no-repeat;
    background-position: center;
    @media (max-width: 900px) {
        min-height: unset;
    }
}

.header-cruise-title {
    height: 100%;
    line-height: 65px !important;

}

.wrapper-bg {
    background-color: rgba(19, 86, 167, 0.6);
    backdrop-filter: blur(17px);
}

.header-info {
    padding: 8px 10px;
}

.header-title__container {
    //max-width: 600px;
    //width: 100%;
    //margin-right: auto;
}

.title-intro-text {
    &::v-deep {
        h1 {
            @apply text-2xl mt-5 font-medium;
        }
    }
}

.akcii-detyam__list {
    &::v-deep {
        ul {
            @apply list-disc;
        }

        li {
            @apply text-lg ml-7;
        }
    }
}

</style>
