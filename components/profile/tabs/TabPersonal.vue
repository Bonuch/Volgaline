<template>
    <div class="tab-personal profile-tabs-content">
        <ValidationObserver
            ref="profile-observer"
            tag="form"
            method="post"
            class="tab-personal-form"
            :class="{'disabled': loading}"
            @submit.prevent="onSubmit"
        >
            <div v-if="loading" class="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                <Preloader />
            </div>

            <div class="tab-personal-form__item tab-personal-form__name flex flex-wrap -mx-5 overflow-hidden lg:mx-0 lg:block">
                <div class="tab-personal-form__item w-1/3 px-5 lg:w-full lg:px-0">
                    <label for="personal-last_name" class="label">Фамилия</label>
                    <input
                        type="text"
                        id="personal-last_name"
                        name="name"
                        class="input"
                        autocomplete="off"
                        :disabled="disabledAttr"
                        v-model="customer.last_name"
                        >
                </div>
                <div class="tab-personal-form__item w-1/3 px-5 lg:w-full lg:px-0">
                    <label for="personal-first_name" class="label">Имя</label>
                    <input
                        type="text"
                        id="personal-first_name"
                        name="name"
                        class="input"
                        autocomplete="off"
                        :disabled="disabledAttr"
                        v-model="customer.first_name"
                    >
                </div>
                <div class="tab-personal-form__item w-1/3 px-5 lg:w-full lg:px-0">
                    <label for="personal-middle_name" class="label">Отчество</label>
                    <input
                        type="text"
                        id="personal-middle_name"
                        name="name"
                        class="input"
                        autocomplete="off"
                        :disabled="disabledAttr"
                        v-model="customer.middle_name"
                    >
                </div>
            </div>

            <div class="flex flex-wrap -mx-5 overflow-hidden lg:mx-0 lg:block">
                <ValidationProvider
                    slim
                    name="personalPhone"
                    rules="required|phone"
                    v-slot="{ errors }"
                >
                    <div class="tab-personal-form__item w-1/3 px-5 lg:w-full lg:px-0">
                        <label for="personal-phone" class="label">Телефон <sup>*</sup></label>

                        <PhoneComponent
                            id="personal-phone"
                            required
                            :disabled="disabledAttr"
                            v-model="customer.phone"
                        />
                        <ErrorField
                            v-if="errors && Object.keys(errors).length > 0"
                            :text="errors[0]"
                            class="justify-center text-center"
                        />
                    </div>
                </ValidationProvider>

                <div class="tab-personal-form__item w-1/3 px-5 lg:w-full lg:px-0">
                    <label for="personal-email" class="label">E-mail</label>
                    <input
                        type="text"
                        name="email"
                        id="personal-email"
                        class="input"
                        :disabled="disabledAttr"
                        placeholder="Ваша почта"
                        autocomplete="off"
                        v-model="customer.email"
                    >
                </div>

                <div class="tab-personal-form__item w-1/3 px-5 lg:w-full lg:px-0">
                    <label for="personal-born" class="label">День рождения</label>
                    <client-only>
                        <v-date-picker
                            class="w-full"
                            locale="ru"
                            :masks="{ input: ['DD/MM/YYYY']}"
                            v-model="customer.birth_date"
                        >
                            <template v-slot="{ inputValue, togglePopover }">
                                <input
                                    id="personal-born"
                                    class="input"
                                    :disabled="disabledAttr"
                                    :value="inputValue"
                                    autocomplete="off"
                                    @click="togglePopover"
                                />
                            </template>
                        </v-date-picker>
                    </client-only>
                </div>
            </div>

            <p v-if="!isManager" class="tab-personal-form__item text-lg md:text-base">
                <sup class="text-red-400">*</sup> - обязательные поля
            </p>

            <div
                v-if="formErrors && formErrors.length > 0"
                class="tab-personal-form__item"
                v-for="(item, idx) in formErrors"
                :key="idx"
            >
                <ErrorField
                    :text="item[0]"
                    class="inline-flex"
                />
            </div>

            <div class="flex flex-wrap items-center justify-between sm:flex-col">
                <button v-if="!isManager" type="submit" class="personal-submit button text-xl bg-blue-300 sm:mb-4 mob:text-lg">
                    Сохранить изменения
                </button>

                <button
                    type="button"
                    class="button button-transparent button-transparent--blue-300 text-xl mob:text-lg"
                    @click="onLogout"
                >
                    Выйти
                </button>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Preloader from "@/components/base/Preloader";
import ErrorField from "@/components/base/ErrorField";
import { parsePhoneMixin } from "@/mixins/content-helpers";
import PhoneComponent from '@/components/base/PhoneComponent';

export default {
    name: "TabPersonal",
    components: { PhoneComponent, ErrorField, Preloader },
    mixins: [parsePhoneMixin],
    data() {
        return {
            loading: false,
            formErrors: null,
            customer: {
                first_name: null,
                middle_name:null,
                last_name:null,
                phone: null,
                email: null,
                birth_date: null,
            },
        };
    },
    computed: {
        ...mapGetters({
            getUser: "users/getUser",
        }),
        disabledAttr() {
            return this.loading || this.bookingFinished || this.isManager ? "disabled" : null;
        },
        getFormattedDate() {
            return this.customer.birth_date ? this.$dayjs(this.customer.birth_date).format("YYYY-MM-DD") : null;
        },
        isManager() {
            return (this.getUser.role === 'manager');
        }
    },
    methods: {
        ...mapActions({
            logout: "users/logout",
            updateUser: "users/updateUser",
        }),
        async onLogout() {
            try {
                this.loading = true;
                const { data } = await this.$axios.post("/logout");
                this.loading = false;
                await this.logout();
                await this.$router.push("/");
            } catch (ex) {
                console.log("cant logout: " + ex);
                this.loading = false;
            }
        },
        async onSubmit() {
            await this.validateFormFields();
            this.loading = true;
            const formData = Object.assign({}, this.customer, {
                birth_date: this.getFormattedDate,
                phone: this.chParsePhone(this.customer.phone),
            });
            try {
                const { data } = await this.$axios.post("/profile/update", formData);
                await this.updateUser(data.data);
                this.formErrors = null;
                this.loading = false;
            } catch (ex) {
                console.log("cant update customer: " + ex);
                this.loading = false;

                if (ex.response.status === 422) {
                    this.formErrors = Object.values(ex.response.data.errors).map(val => val);
                } else {
                    this.formErrors = ['Что то пошло не так, попробуте позже.'];
                }
            }
        },
        async validateFormFields() {
            const formObserver = this.$refs["profile-observer"];
            const isValid = await formObserver.validate();

            if (!isValid) {
                const yOffset = document.querySelector(".header").offsetHeight + 20;
                const y = formObserver.$el.getBoundingClientRect().top + window.pageYOffset - yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });
                throw new Error("form validation failed");
            }
        },
        fillFormOnInit() {
            if (this.getUser && Object.keys(this.getUser).length > 0) {
                for (const [key, val] of Object.entries(this.getUser)) {
                    // исключаемые поля
                    if (key !== "role") {
                        this.customer[key] = val;
                    }
                }
            }
        },
    },
    mounted() {
        this.fillFormOnInit();
    },
};
</script>

<style lang="scss" scoped>
.tab-personal {
    &-form {
        max-width: 1220px;

        &__item {
            @apply mb-5;
        }

        &__name {
            @apply mb-10;
        }

        .label,
        .label sup {
            @apply text-lg;
        }
    }
}

.personal-submit {
    border: 2px solid transparent;

    &:hover,
    &:focus {
        @apply bg-transparent text-blue-300 border-blue-300;
    }
}

@screen lg {
    .tab-personal.profile-tabs-content {
        margin-bottom: 0;
    }
}
</style>
