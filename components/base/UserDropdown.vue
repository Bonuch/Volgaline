<template>
    <div class="user-dropdown absolute top-full right-0 py-5 px-7 bg-white text-black-400 text-left rounded-b-sm">
        <div class="mb-5">
            <button
                type="button"
                class="link-inline hover:text-orange-400 focus:text-orange-400"
                @click="onLinkClick(getLinkMainTabProfile)"
            >
                Профиль
            </button>
        </div>
        <div class="mb-5">
            <button
                type="button"
                class="link-inline hover:text-orange-400 focus:text-orange-400"
                @click="onLinkClick('/profile/history')"
            >
                История заказов
            </button>
        </div>
        <div class="mb-5">
            <button
                type="button"
                class="link-inline hover:text-orange-400 focus:text-orange-400"
                @click="onLinkClick('/profile/messages')"
            >
                Обращения
            </button>
        </div>
        <div class="">
            <button
                type="button"
                class="link-inline border-dashed hover:text-orange-400 focus:text-orange-400"
                @click="onLogout"
            >
                Выйти
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'UserDropdown',
        computed: {
            ...mapGetters({
                getUser: 'users/getUser'
            }),
            getLinkMainTabProfile(){
                return (this.getUser?.role === 'agent')? '/profile/agentPersonal': '/profile/personal';
            }
        },
        methods: {
            ...mapActions({
                logout: "users/logout",
                closeMobileMenu: "closeMobileMenu",
            }),
            async onLogout() {
                try {
                    await this.$axios.post("/logout");
                    await this.logout();
                    await this.closeMobileMenu();
                    await this.$router.push("/");
                } catch (ex) {
                    console.log("cant logout: " + ex);
                }
            },
            onLinkClick(url) {
                this.$emit('on-close', true);
                this.$router.push(url);
            },
        }
    };
</script>

<style lang="scss" scoped>
    .user-dropdown {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0 0 30px 10px rgba(16, 34, 48, 0.04);
    }
</style>
