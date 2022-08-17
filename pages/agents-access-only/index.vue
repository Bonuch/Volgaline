<template>
    <div class="page-inner page-staff-access-only pt-6 pb-12">
        <div class="wrapper wrapper-1410">
            <h1 v-if="title" class="page-inner-h1 mb-10">
                {{ title }}
            </h1>

            <form v-if="!isLogged"
                class="manager-form"
                :class="{ 'relative overflow-hidden': loading }"
                method="post"
                @submit.prevent="handleLogin"
            >
                <template v-if="loading">
                    <div class="absolute z-1 left-0 top-0 w-full h-full flex items-center justify-center">
                        <Preloader />
                    </div>
                </template>

                <div :class="{ 'disabled': loading }">
                    <div class="mb-3">
                        <label for="email" class="label">Почта:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="input"
                            autocomplete="off"
                            required
                            v-model="managerForm.email"
                        >
                    </div>

                    <div class="mb-3">
                        <label for="password" class="label">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="input"
                            autocomplete="off"
                            required
                            v-model="managerForm.password"
                        >
                    </div>

                    <div class="mt-6">
                        <ErrorField
                            v-if="errors && errors.message"
                            :text="errors.message"
                            class="justify-center text-center"
                        />
                    </div>

                    <div class="mt-8">
                        <button type="submit" class="button">Войти</button>
                    </div>
                </div>
            </form>

            <div v-if="isLogged && !redirecting" class="mt-8">
                <p>Вы уже авторизованы.</p>
                <p>
                    Перейти в <nuxt-link to="/rechnye-kruizy" class="link-inline">поиск круизов</nuxt-link>.
                </p>
            </div>
            <div v-if="isLogged && redirecting" class="">Успешная авторизация, перенаправляем на страницу круизов...</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { seoHelper, parsePhoneMixin } from "~/mixins/content-helpers";
import ErrorField from "@/components/base/ErrorField";
import Preloader from "../../components/base/Preloader";

export default {
    components: {Preloader, ErrorField },
    mixins: [seoHelper, parsePhoneMixin],
    layout: 'without-form',
    head() {
        return {
            title: this.title,
            meta: [
                // эта страница должна быть запрещена для индексации
                { name: 'robots', content: 'none' }
            ]
        };
    },
    data() {
        return {
            title: "Вход для агентов",
            managerForm: {
                email: null,
                password: null,
            },
            errors: {},
            loading: false,
            redirecting: false
        };
    },
    computed: {
        ...mapGetters({
            screenWidth: 'getWindowWidth',
            isLogged: 'users/isLogged',
        }),
        isMobileScreen() {
            return this.screenWidth < 1025;
        },
    },
    methods: {
        async handleLogin() {
            this.loading = true;

            try {
                const { data } = await this.$axios.post('/login-agent', this.managerForm);
                await this.$store.dispatch('users/updateUser', (data.user));
                await this.$store.dispatch('users/updateToken', (data.token));
                this.loading = false;
                this.redirecting = true;
                await this.$router.push('/rechnye-kruizy');
            } catch (ex) {
                console.log('agent login error: ' + ex);
                this.loading = false;
                const errResponse = ex.response;

                if (errResponse && errResponse.data && errResponse.data.message) {
                    this.$set(this.errors, 'message', errResponse.data.message);
                } else {
                    this.$set(this.errors, 'message', "Что то пошло не так, попробуйте позже.");
                }
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.manager-form {
    max-width: 780px;
}
</style>
