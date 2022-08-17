<template>
    <div class="page-inner page-error pt-6 pb-24 md:pb-16">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>

            <div class="page-error__content flex flex-col items-center text-center">
                <img class="mb-10 sm:max-w-64 sm:mx-auto" src="~/assets/images/inner/image-404.png" alt="404">

                <h1 class="m-0 mb-2 text-50 leading-1-1 font-medium xl:text-44 md:text-30 mob:text-26">
                    <template v-if="isDevMode">
                        <span v-if="error.statusCode === 404">Страница не&nbsp;найдена!</span>
                        <span v-else>{{ error.statusCode }}</span>
                    </template>

                    <template v-else>Страница не&nbsp;найдена!</template>
                </h1>

                <p class="m-0 mb-6 text-22 sm:text-xl mob:text-lg">Страница, на которую вы пытаетесь попасть, не&nbsp;существует.</p>
                <p class="m-0 mb-4 text-sm">Вы можете вернуться на&nbsp;следующие страницы:</p>

                <div class="flex items-center justify-center">
                    <nuxt-link class="link-inline mr-10 text-red-400 text-lg mob:text-base" to="/">Главная страница</nuxt-link>
                    <nuxt-link class="link-inline text-red-400 text-lg mob:text-base" to="/contacts">Контакты</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from "@/components/base/Breadcrumbs";

    export default {
        name: "error.vue",
        components: { Breadcrumbs },
        props: ["error"],
        layout: "default",
        data() {
            return {
                breadcrumbs: [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 2,
                        title: "404",
                        link: "",
                    },
                ],
            };
        },
        computed: {
            isDevMode() {
                return process.env.NODE_ENV === "development";
            },
        },
    };
</script>

<style lang="scss" scoped>
    .page-error__content {
        max-width: 662px;
        margin: 0 auto;
    }
</style>
