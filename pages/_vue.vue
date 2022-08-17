<template>
    <div class=''>
        <PageComponent
            :breadcrumbs='breadcrumbs'
            :content='content'
            :title='title'
            :discountShips='discountShips'
        />
    </div>
</template>

<script>
    import { seoHelper } from "~/mixins/content-helpers";
    import PageComponent from '@/components/base/PageComponent';

    export default {
        components: { PageComponent },
        mixins: [seoHelper],
        layout:'without-form',
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
        data() {
            return {
                title: "",
                content: {},
                breadcrumbs: [],
                discountShips:[],
            };
        },
        async asyncData({ route, $axios, error }) {
            let title = "";
            let content = {};
            let breadcrumbs = [];
            let discountShips = [];

            try {
                const { data } = await $axios.get(route.path);

                // эта заглушка нужна для роутов типа ships, отдается массив с кораблями, но по факту сама страница не нужна.
                if (!data.content) {
                    error({ statusCode: 404, message: "cant fetch content" });
                    return null;
                }

                for (const [key, val] of Object.entries(data.content)) {
                    content[key] = val;
                }

                title = content.title;

                breadcrumbs = [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 3,
                        title,
                        link: "",
                    },
                ];
            } catch (ex) {
                console.log("cant fetch content: " + ex);

                if (ex.response && ex.response.status === 404 ) {
                    error({ statusCode: 404, message: "cant fetch content" });
                } else {
                    return null;
                }
            }

            try {
                const { data } = await $axios.get('/front-page/content');

                discountShips = data.discount_ships;
            } catch (ex) {
                console.log('cant fetch front page: ' + ex);
            }

            return {
                breadcrumbs,
                title,
                content,
                discountShips
            };
        },
    };
</script>

<style></style>
