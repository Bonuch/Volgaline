<template>
    <div class="app-layout">
        <div class="global-wrapper">
            <div
                v-if="getHeaderNotification"
                class="header-notification py-3 bg-red-400 text-white text-sm font-medium leading-none text-center uppercase lg:leading-1-2"
            >
                <div class="wrapper wrapper-1036" v-html="getHeaderNotification"></div>
            </div>

            <HeaderComponent/>
            <main :class="{'main-inner': this.$route.path !== '/'}">
                <Nuxt/>
            </main>
        </div>

        <div>
            <FooterComponent/>
        </div>

        <ClientOnly>
            <transition name="mobile-menu">
                <MobileMenu v-if="getMobileMenuActivity" :class="{'menu--active': getMobileMenuActivity}"/>
            </transition>

            <Modal />
        </ClientOnly>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { resizeHelper } from '@/mixins/resize-helper';
    import HeaderComponent from '@/components/base/HeaderComponent';
    import FooterComponent from '@/components/base/FooterComponent';

    export default {
        name: "publicAPI",
        mixins: [ resizeHelper ],
        head() {
            const instructions = {
                link: [
                    {
                        rel: 'canonical',
                        href: this.canonicalUrl,
                    }
                ],
                meta: [ ]
            };
            const noIndex = this.metaNoIndex;
            if (noIndex) {
                // это необходимо, чтобы запретить индексацию яндексом всякого рекламного мусора с query параметрами, которые на нашем сайте даже не используются
                instructions.meta.push(noIndex);
            }
            return instructions;
        },
        components: {
            Modal: () => import('@/components/modals/Modal'),
            WantForm: () => import('@/components/front/WantForm'),
            MobileMenu: () => import('@/components/base/MobileMenu'),
            FooterComponent,
            HeaderComponent
        },
        computed: {
            ...mapGetters(["getMobileMenuActivity", "getHeaderNotification", 'getSettingsByName']),
            metaNoIndex() {
                let hasQuery = (Object.keys(this.$route.query).length > 0);
                let path = this.$route.path;
                if (path.substring(0, 15) !== '/rechnye-kruizy') {
                    if (hasQuery) {
                        return { name: 'robots', content: 'none' }; // <meta name="robots" content="none"/>
                    }
                }
                return null;
            },
            canonicalUrl() {
                let path = this.$route.path;
                if (path.substring(0, 15) === '/rechnye-kruizy') {
                    return `${process.env.BASE_URL}${path}`;
                }
                if (path.substring(path.length - 1) === '/') {
                    path = path.substring(0, path.length - 1);
                }
                return `${process.env.BASE_URL}${path}`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes slide-in-left {
        0% {
            opacity: 0;
            width: 0;
        }
        100% {
            opacity: 1;
            width: 100%;
        }
    }

    .mobile-menu-enter-active {
        animation: fade 0.35s ease both;
    }

    .mobile-menu-leave-active {
        animation: fade 0.25s ease both reverse;
    }

    .menu {
        &--active {
            &::v-deep {
                .menu__wrap {
                    animation: slide-in-left 0.45s var(--custom-transition) both;
                    animation-delay: 0.25s;
                }

                .logo {
                    animation: fade 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    animation-delay: 0.65s;
                }
            }
        }
    }

    .header-notification::v-deep a {
        text-decoration: underline;
    }
    .header-notification::v-deep a:hover {
        color: #fff;
    }
</style>
