<template>
    <div class="page-inner page-cart pt-6">
        <div class="wrapper">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>

            <div>
                <h1>Заказ успешно завершен!</h1>
                <p>Спасибо за ваш заказ!</p>
                <p>В скором времени с вами свяжется наш менеджер.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { seoHelper } from "~/mixins/content-helpers";
    import Breadcrumbs from "@/components/base/Breadcrumbs";

    export default {
        components: { Breadcrumbs },
        middleware: "auth",
        mixins: [seoHelper],
        layout: 'without-form',
        head() {
            return {
                title: this.title,
            };
        },
        data() {
            return {
                title: "Заказ завершен",
                breadcrumbs: [
                    {
                        id: 1,
                        title: "Главная",
                        link: "/",
                    },
                    {
                        id: 3,
                        title: "Заказ завершен",
                        link: null,
                    },
                ],
            };
        },
    };
</script>

<style></style>
