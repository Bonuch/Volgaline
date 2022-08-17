    <template>
    <div class="app-layout">
        <div class="global-wrapper">
            <div
                v-if="getHeaderNotification"
                class="header-notification py-3 bg-green-800 text-white"
            >
                <div v-html="getHeaderNotification"></div>
            </div>

            <HeaderComponent/>
            <main :class="{'main-inner': this.$route.path !== '/'}">
                <Nuxt/>
            </main>
        </div>

        <LazyHydrate :when-visible="{ rootMargin: '140px' }">
            <FooterComponent/>
        </LazyHydrate>

        <ClientOnly>
            <transition name="mobile-menu">
                <MobileMenu v-if="getMobileMenuActivity" :class="{'menu--active': getMobileMenuActivity}"/>
            </transition>

            <LazyHydrate when-visible>
                <Modal />
            </LazyHydrate>
        </ClientOnly>

<!--        <div-->
<!--            class="wrapper wrapper-1410 flex items-center justify-center text-base leading-1-2 font-medium tablet:text-xs"-->
<!--        >-->
<!--            <div class="flex items-center">-->
<!--                <span class="mr-2">20% кешбэк с картой</span>-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="14" viewBox="0 0 51 14" fill="none" class="tablet:w-10">-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7429 2.66361e-07V0.00611379C13.7366 0.00611379 11.7508 2.33212e-07 11.2213 1.84017C10.7358 3.5275 9.36786 8.18601 9.33004 8.31439H8.95179C8.95179 8.31439 7.55229 3.55196 7.06057 1.83406C6.53103 -0.00611331 4.53894 2.66361e-07 4.53894 2.66361e-07H0V14H4.53894V5.68558H4.72806H4.91718L7.5649 14H10.7169L13.3646 5.69169H13.7429V14H18.2818V2.66361e-07H13.7429Z" fill="white"/>-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.3226 0C30.3226 0 28.9924 0.116157 28.3683 1.46725L25.1533 8.31439H24.775V0H20.2361V14H24.5229C24.5229 14 25.9161 13.8777 26.5402 12.5327L29.6922 5.68558H30.0704V14H34.6094V0H30.3226Z" fill="white"/>-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M36.6267 6.35815V14.0001H41.1656V9.53719H46.0828C48.2262 9.53719 50.0418 8.21055 50.7163 6.35815H36.6267Z" fill="white"/>-->
<!--                    <path fill-rule="evenodd" clip-rule="evenodd" d="M46.0828 0H35.99C36.4943 2.6655 38.5558 4.80523 41.2224 5.50217C41.8276 5.66112 42.4643 5.74671 43.1199 5.74671H50.8991C50.9685 5.42881 51 5.10479 51 4.76855C51 2.13362 48.7999 0 46.0828 0Z" fill="white"/>-->
<!--                </svg>-->
<!--                <span class="hidden ml-4 tablet:block xs:hidden">с 15 марта по 30 апреля</span>-->
<!--            </div>-->

<!--            <div class="w-1 h-1 mx-7 bg-white rounded-full tablet:hidden"></div>-->

<!--            <div class="tablet:hidden">-->
<!--                Акция действует с 15 марта по 30 апреля-->
<!--            </div>-->

<!--            <div class="w-1 h-1 mx-7 bg-white rounded-full xxl:hidden"></div>-->

<!--            <div class="xxl:hidden">-->
<!--                Успейте в путешествие по максимально выгодным условиям-->
<!--            </div>-->

<!--            <a-->
<!--                href="/cashback"-->
<!--                class="header-notification-btn ml-10"-->
<!--                title='Кешбэк 20% от Ростуризма и карты "Мир" на теплоходные круизы'-->
<!--            >-->
<!--                Подробнее-->
<!--            </a>-->
<!--        </div>-->
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { resizeHelper } from "@/mixins/resize-helper";
    import HeaderComponent from "@/components/base/HeaderComponent";
    import LazyHydrate from 'vue-lazy-hydration';

    export default {
        name: "withoutForm",
        mixins: [resizeHelper],
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
            LazyHydrate,
            Modal: () => import('@/components/modals/Modal'),
            WantForm: () => import('@/components/front/WantForm'),
            MobileMenu: () => import('@/components/base/MobileMenu'),
            FooterComponent: () => import('@/components/base/FooterComponent'),
            HeaderComponent
        },
        computed: {
            ...mapGetters(["getMobileMenuActivity", "getHeaderNotification"]),
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
        },
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
