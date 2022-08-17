<template>
    <form method="post" class="agents-form relative"
          :class="{ 'disabled': loading }"
          @submit.prevent="onSubmit">
        <div v-if="loading" class="absolute z-1 left-0 top-0 w-full h-full flex items-center justify-center preloader">
            <Preloader />
        </div>
        <div class="flex flex-wrap -mx-5 overflow-hidden lg:mx-0">
            <div
                v-for="(value, key) in formSchema"
                :key="key"
                class="agents-form__item px-5 mb-5 first:mb-10 lg:px-0 lg:first:mb-5"
                :class="value.size"
            >
                <label :for="key" class="label">
                    {{value.label}} <sup v-if="value.required">*</sup>
                </label>

                <input
                    :type="value.type"
                    :id="key" :name="key"
                    class="input"
                    :required="value.required"
                    autocomplete="off"
                    v-model="agent[key]"
                >

                <ErrorField v-if="errors && errors[key]" :text="errors[key]"/>
            </div>

            <div class="px-5 w-full sm:px-0">
                <p class="text-lg sm:text-base"><sup class="text-red-400">*</sup> - обязательные поля</p>

                <slot name="button">
                    <button type="submit" class="button text-xl mob:text-lg">Сформировать договор</button>
                </slot>
            </div>
        </div>
    </form>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
    import Preloader from "@/components/base/Preloader";
    import ErrorField from "@/components/base/ErrorField";


    export default {
        name: "AgentsForm",
        components: { Preloader,ErrorField },
        props: {
            formSchema: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                loading: false,
                agent: {
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    phone: '',
                    email: '',

                },
                errors: {},
            };
        },

        methods: {
            ...mapMutations({
                setUser: "users/setUser",
            }),
            ...mapActions({
                openModal: 'modals/openModal',
            }),
            async onSubmit() {
                const fields = {};
                this.loading = true;
                try {
                    const res = await this.$axios.post('/contract', this.agent);
                    //
                    // let blob = new Blob([res.data], { type: 'application/pdf' })
                    // let link = document.createElement('a')
                    // link.href = window.URL.createObjectURL(blob)
                    // link.download = 'test.pdf'
                    // link.click()
                    // this.setUser(res.data);
                } catch (e) {
                    this.openModal({
                        name: 'ModalRegistration'
                    });
                    console.log("cant update user data: " + e);
                }

                this.loading = false;
            },
            fillFormOnInit() {
                if (this.getUser && Object.keys(this.getUser).length > 0) {
                    this.agent.first_name = this.getUser.first_name ? this.getUser.first_name : "";
                    this.agent.middle_name = this.getUser.middle_name ? this.getUser.middle_name : "";
                    this.agent.last_name = this.getUser.last_name ? this.getUser.last_name : "";
                    this.agent.phone = this.getUser.phone ? this.getUser.phone : "";
                    this.agent.email = this.getUser.email ? this.getUser.email : "";
                    let profile = this.getUser.profile;

                    for (const field in profile) {
                        this.$set(this.agent,field,profile[field]);
                    }
                }
            },
        },
        computed: {
            ...mapGetters({
                getUser: "users/getUser",
            }),
        },
        watch:{
            getUser:function (){
                this.fillFormOnInit();
            }
        },
        mounted() {
            this.fillFormOnInit();
        },
    };
</script>

<style scoped>
    .preloader{
        top: 12%;
    }
</style>
