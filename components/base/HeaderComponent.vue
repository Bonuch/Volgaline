<template>
    <header class="header relative bg-white text-black-400 text-center" :class="{ 'sm:header--fixed': false }">
        <div class="wrapper relative flex items-center flex-wrap sm:px-4 lg:px-6">
            <Hamburger class="header-hamburger mr-5 hidden xl:block"/>

            <Logo class="header-logo xl:hidden"/>
            <MiddleLogo class="hidden ml-0 mr-auto hidden xl:block"/>

            <HeaderNav class="header-nav mx-auto self-stretch xl:hidden"/>

            <div class="header-phone-wrapper flex items-center">
                <a
                    v-if="whatsappNumber"
                    :href="whatsappNumber"
                    rel="nofollow"
                    target="_blank"
                    class="block xxs:w-5 xxs:h-5"
                >
                    <svg class="xxs:w-5 xxs:h-5" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 26L2.236 19.2924C1.10141 17.3841 0.448276 15.1571 0.448276 12.7759C0.448276 5.72 6.16828 0 13.2241 0C20.28 0 26 5.72 26 12.7759C26 19.8317 20.28 25.5517 13.2241 25.5517C11.0773 25.5517 9.05562 25.0196 7.28 24.0845L0 26Z" fill="#4FCB66"/>
                        <path d="M21.3749 17.0273C20.785 15.9124 18.6095 14.6375 18.6095 14.6375C18.1173 14.3569 17.5233 14.3255 17.2427 14.8258C17.2427 14.8258 16.5358 15.6735 16.356 15.7954C15.5348 16.3517 14.774 16.3302 14.0062 15.5623L12.2216 13.7777L10.437 11.9932C9.66908 11.2253 9.64757 10.4645 10.2039 9.6433C10.3258 9.46354 11.1735 8.75661 11.1735 8.75661C11.6738 8.47554 11.6424 7.88202 11.3618 7.38981C11.3618 7.38981 10.0869 5.21433 8.97201 4.6244C8.49774 4.37336 7.91543 4.46123 7.53619 4.84047L6.74812 5.62854C4.24808 8.12857 5.47905 10.9509 7.97908 13.451L10.2639 15.7358L12.5488 18.0207C15.0488 20.5207 17.8712 21.7517 20.3712 19.2516L21.1593 18.4636C21.5385 18.0834 21.6259 17.5011 21.3749 17.0273Z" fill="white"/>
                    </svg>
                </a>

                <div class="header-phone-block sm:flex sm:items-center">
                    <a
                        v-if="phoneNumberFiltered"
                        :href="`tel:${phoneNumberFiltered}`"
                        rel="nofollow"
                        class="header-phone text-black-500 font-bold text-lg xxl:text-base"
                    >
                        {{ phoneNumber }}
                    </a>

                    <p v-if="workTime" class="date-work sm:pl-5 mob:hidden xxl:text-sm">{{ workTime }}</p>
                </div>

            </div>

            <button
                type="button"
                title="Заказать звонок"
                class="header-call button bg-red-500 text-lg uppercase font-bold extra:hidden"
                @click="onCallClick"
            >
                Заказать звонок
            </button>

            <div class="flex items-center">
                <button
                    type="button"
                    title="Заказать звонок"
                    class="header-call-icon header-icon button button-transparent hidden extra:block text-red-500 rounded-full border-none"
                    @click="onCallClick"
                >
                    <svg class="icon icon--big" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 8.65625 3 C 8.132813 3 7.617188 3.1875 7.1875 3.53125 L 7.125 3.5625 L 7.09375 3.59375 L 3.96875 6.8125 L 4 6.84375 C 3.035156 7.734375 2.738281 9.066406 3.15625 10.21875 C 3.160156 10.226563 3.152344 10.242188 3.15625 10.25 C 4.003906 12.675781 6.171875 17.359375 10.40625 21.59375 C 14.65625 25.84375 19.402344 27.925781 21.75 28.84375 L 21.78125 28.84375 C 22.996094 29.25 24.3125 28.960938 25.25 28.15625 L 28.40625 25 C 29.234375 24.171875 29.234375 22.734375 28.40625 21.90625 L 24.34375 17.84375 L 24.3125 17.78125 C 23.484375 16.953125 22.015625 16.953125 21.1875 17.78125 L 19.1875 19.78125 C 18.464844 19.433594 16.742188 18.542969 15.09375 16.96875 C 13.457031 15.40625 12.621094 13.609375 12.3125 12.90625 L 14.3125 10.90625 C 15.152344 10.066406 15.167969 8.667969 14.28125 7.84375 L 14.3125 7.8125 L 14.21875 7.71875 L 10.21875 3.59375 L 10.1875 3.5625 L 10.125 3.53125 C 9.695313 3.1875 9.179688 3 8.65625 3 Z M 8.65625 5 C 8.730469 5 8.804688 5.035156 8.875 5.09375 L 12.875 9.1875 L 12.96875 9.28125 C 12.960938 9.273438 13.027344 9.378906 12.90625 9.5 L 10.40625 12 L 9.9375 12.4375 L 10.15625 13.0625 C 10.15625 13.0625 11.304688 16.136719 13.71875 18.4375 L 13.9375 18.625 C 16.261719 20.746094 19 21.90625 19 21.90625 L 19.625 22.1875 L 22.59375 19.21875 C 22.765625 19.046875 22.734375 19.046875 22.90625 19.21875 L 27 23.3125 C 27.171875 23.484375 27.171875 23.421875 27 23.59375 L 23.9375 26.65625 C 23.476563 27.050781 22.988281 27.132813 22.40625 26.9375 C 20.140625 26.046875 15.738281 24.113281 11.8125 20.1875 C 7.855469 16.230469 5.789063 11.742188 5.03125 9.5625 C 4.878906 9.15625 4.988281 8.554688 5.34375 8.25 L 5.40625 8.1875 L 8.4375 5.09375 C 8.507813 5.035156 8.582031 5 8.65625 5 Z"
                            class='fill-current'
                        />
                    </svg>
                </button>

                <nuxt-link
                    to="/cart"
                    class="header-cart header-icon"
                    title="Корзина"
                >
                    <span v-if="cartHasItems" class="header-cart-counter">{{getCartItems.length}}</span>

                    <svg class="icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34.0695 6.1155C33.6476 5.60916 33.1193 5.20193 32.5223 4.92272C31.9253 4.64352 31.2741 4.4992 30.615 4.5H6.363L6.3 3.9735C6.17107 2.87913 5.64508 1.8701 4.82173 1.13772C3.99839 0.405335 2.93494 0.00051269 1.833 0L1.5 0C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5C0 1.89782 0.158035 2.27936 0.43934 2.56066C0.720644 2.84196 1.10218 3 1.5 3H1.833C2.2004 3.00005 2.55501 3.13493 2.82956 3.37907C3.10411 3.62321 3.27951 3.95962 3.3225 4.3245L5.3865 21.8745C5.60078 23.6997 6.47772 25.3827 7.85086 26.604C9.22401 27.8254 10.9978 28.5 12.8355 28.5H28.5C28.8978 28.5 29.2794 28.342 29.5607 28.0607C29.842 27.7794 30 27.3978 30 27C30 26.6022 29.842 26.2206 29.5607 25.9393C29.2794 25.658 28.8978 25.5 28.5 25.5H12.8355C11.9071 25.4974 11.0022 25.2077 10.2449 24.6706C9.48761 24.1335 8.91497 23.3753 8.6055 22.5H26.4855C28.2439 22.5001 29.9465 21.8823 31.2957 20.7547C32.645 19.627 33.5551 18.061 33.867 16.3305L35.0445 9.7995C35.162 9.15151 35.1356 8.4856 34.9671 7.84896C34.7986 7.21231 34.4922 6.62052 34.0695 6.1155ZM32.1 9.267L30.921 15.798C30.7337 16.8375 30.1867 17.778 29.3758 18.4548C28.5649 19.1316 27.5417 19.5016 26.4855 19.5H8.1285L6.717 7.5H30.615C30.8353 7.49868 31.0533 7.54593 31.2533 7.63838C31.4533 7.73083 31.6305 7.86622 31.7723 8.03491C31.9141 8.2036 32.0169 8.40146 32.0736 8.61441C32.1302 8.82735 32.1392 9.05017 32.1 9.267Z"
                              fill="#0C73FE"/>
                        <path d="M10.5002 36.001C12.1571 36.001 13.5002 34.6578 13.5002 33.001C13.5002 31.3441 12.1571 30.001 10.5002 30.001C8.84339 30.001 7.50024 31.3441 7.50024 33.001C7.50024 34.6578 8.84339 36.001 10.5002 36.001Z"
                              fill="#0C73FE"/>
                        <path d="M25.5 36.001C27.1568 36.001 28.5 34.6578 28.5 33.001C28.5 31.3441 27.1568 30.001 25.5 30.001C23.8431 30.001 22.5 31.3441 22.5 33.001C22.5 34.6578 23.8431 36.001 25.5 36.001Z"
                              fill="#0C73FE"/>
                    </svg>
                </nuxt-link>

                <div
                    class="header-user flex items-center"
                    v-click-outside="onUserClickOutside"
                >
                    <template v-if="getUser && Object.keys(getUser).length > 0">
                        <button
                            type="button"
                            class="header-user__item header-icon"
                            title="Профиль"
                            @click="showUserDropdown = !showUserDropdown"
                        >
                            <svg v-if="isManager" width="36" height="36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                                <path d="M335.6,541.4c54.8,75.3,138.8,81.1,163.2,81.1h2.3c24.4,0,108.4-5.8,163.2-81.1c21.6-29.6,43.5-83.3,53.1-108c32.5-38.8,44.8-75.6,36.6-109.6c-4.1-17.1-13.4-32.1-26.1-43.1c5.1-41.2,4.8-87.8-10.1-128.7c-21.2-58.1-59.5-99.2-113.8-122c-42.7-18-83.3-19.9-98.7-19.9h-2.3c-1.2,0-2.2,0-3.1,0c-0.8,0-1.9,0-3.1,0h-2.3c-15.4,0-56,1.9-98.7,19.9c-54.3,22.8-92.6,63.9-113.8,122c-14.9,41-15.2,87.6-10.1,128.7c-12.7,11-22,26-26.1,43.1c-8.2,34,4.1,70.8,36.6,109.6C292.1,458.1,314.1,511.8,335.6,541.4z M317.3,323.9c17.8-6.7,29.7,19.8,34,31.6c-4.9-15.2-18.4-60.5-20.6-108.1c16-22.4,47.9-59.8,85.8-65.9c0,0,81.8,97.9,250.1,96c-4.8,35.6-13.9,66.1-17.8,78.1c4.3-11.8,16.3-38.3,34-31.6c10.7,4,28.8,25.4-18.7,77.5c0,0-27.1,73.6-49.2,103.9c-32.6,44.7-83.2,55.9-113.7,55.9c-0.3,0-0.7,0-1.1-0.1c-0.5,0-0.9,0.1-1.1,0.1c-30.5,0-81.1-11.2-113.7-55.9c-22.1-30.3-49.2-103.9-49.2-103.9C288.4,349.4,306.5,327.9,317.3,323.9z"/>
                                <path d="M562.3,684.2l-28.4-31H500h-33.8l-28.4,31c0,0,16.2,34.6,42.6,48.1L437.7,840c0,0,31.2,44.4,62.3,55.9c31.1-11.4,62.3-55.9,62.3-55.9l-42.6-107.7C546,718.8,562.3,684.2,562.3,684.2z"/>
                                <path d="M943.2,766.1C891.6,700,661.7,653.1,661.7,653.1C692.1,827.9,500,934.2,500,934.2S307.9,827.9,338.3,653.1c0,0-229.9,46.8-281.5,112.9c-54.7,70-48.3,139.1-44.2,168c4.1,28.9,11.2,46.4,57.8,56h859.2c46.7-9.6,53.8-27.1,57.8-56C991.5,905.2,997.9,836.1,943.2,766.1z"/>
                            </svg>

                            <svg v-else width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 18C19.78 18 21.5201 17.4722 23.0001 16.4832C24.4802 15.4943 25.6337 14.0887 26.3149 12.4442C26.9961 10.7996 27.1743 8.99002 26.8271 7.24419C26.4798 5.49836 25.6226 3.89472 24.364 2.63604C23.1053 1.37737 21.5016 0.520204 19.7558 0.172937C18.01 -0.17433 16.2004 0.00389957 14.5558 0.685088C12.9113 1.36628 11.5057 2.51983 10.5168 3.99987C9.52784 5.47991 9 7.21997 9 9C9.00238 11.3862 9.95136 13.674 11.6387 15.3613C13.326 17.0486 15.6138 17.9976 18 18ZM18 3C19.1867 3 20.3467 3.3519 21.3334 4.01119C22.3201 4.67047 23.0892 5.60755 23.5433 6.7039C23.9974 7.80026 24.1162 9.00666 23.8847 10.1705C23.6532 11.3344 23.0818 12.4035 22.2426 13.2426C21.4035 14.0818 20.3344 14.6532 19.1705 14.8847C18.0067 15.1162 16.8003 14.9974 15.7039 14.5433C14.6075 14.0892 13.6705 13.3201 13.0112 12.3334C12.3519 11.3467 12 10.1867 12 9C12 7.40871 12.6321 5.88258 13.7574 4.75736C14.8826 3.63215 16.4087 3 18 3V3Z"
                                      fill="#0C73FE"/>
                                <path d="M18 21.001C14.4208 21.0049 10.9893 22.4285 8.45844 24.9594C5.92756 27.4903 4.50397 30.9218 4.5 34.501C4.5 34.8988 4.65804 35.2803 4.93934 35.5616C5.22064 35.8429 5.60218 36.001 6 36.001C6.39782 36.001 6.77936 35.8429 7.06066 35.5616C7.34196 35.2803 7.5 34.8988 7.5 34.501C7.5 31.7162 8.60625 29.0455 10.5754 27.0764C12.5445 25.1072 15.2152 24.001 18 24.001C20.7848 24.001 23.4555 25.1072 25.4246 27.0764C27.3938 29.0455 28.5 31.7162 28.5 34.501C28.5 34.8988 28.658 35.2803 28.9393 35.5616C29.2206 35.8429 29.6022 36.001 30 36.001C30.3978 36.001 30.7794 35.8429 31.0607 35.5616C31.342 35.2803 31.5 34.8988 31.5 34.501C31.496 30.9218 30.0724 27.4903 27.5416 24.9594C25.0107 22.4285 21.5792 21.0049 18 21.001V21.001Z"
                                      fill="#0C73FE"/>
                            </svg>
                        </button>

                        <UserDropdown v-show="showUserDropdown" @on-close="onCloseUserDropdown"/>
                    </template>

                    <button v-else class="header-user__item header-icon" type="button" title="Профиль" @click="onUserClick">
                        <svg class="icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 18C19.78 18 21.5201 17.4722 23.0001 16.4832C24.4802 15.4943 25.6337 14.0887 26.3149 12.4442C26.9961 10.7996 27.1743 8.99002 26.8271 7.24419C26.4798 5.49836 25.6226 3.89472 24.364 2.63604C23.1053 1.37737 21.5016 0.520204 19.7558 0.172937C18.01 -0.17433 16.2004 0.00389957 14.5558 0.685088C12.9113 1.36628 11.5057 2.51983 10.5168 3.99987C9.52784 5.47991 9 7.21997 9 9C9.00238 11.3862 9.95136 13.674 11.6387 15.3613C13.326 17.0486 15.6138 17.9976 18 18ZM18 3C19.1867 3 20.3467 3.3519 21.3334 4.01119C22.3201 4.67047 23.0892 5.60755 23.5433 6.7039C23.9974 7.80026 24.1162 9.00666 23.8847 10.1705C23.6532 11.3344 23.0818 12.4035 22.2426 13.2426C21.4035 14.0818 20.3344 14.6532 19.1705 14.8847C18.0067 15.1162 16.8003 14.9974 15.7039 14.5433C14.6075 14.0892 13.6705 13.3201 13.0112 12.3334C12.3519 11.3467 12 10.1867 12 9C12 7.40871 12.6321 5.88258 13.7574 4.75736C14.8826 3.63215 16.4087 3 18 3V3Z"
                                  fill="#0C73FE"/>
                            <path d="M18 21.001C14.4208 21.0049 10.9893 22.4285 8.45844 24.9594C5.92756 27.4903 4.50397 30.9218 4.5 34.501C4.5 34.8988 4.65804 35.2803 4.93934 35.5616C5.22064 35.8429 5.60218 36.001 6 36.001C6.39782 36.001 6.77936 35.8429 7.06066 35.5616C7.34196 35.2803 7.5 34.8988 7.5 34.501C7.5 31.7162 8.60625 29.0455 10.5754 27.0764C12.5445 25.1072 15.2152 24.001 18 24.001C20.7848 24.001 23.4555 25.1072 25.4246 27.0764C27.3938 29.0455 28.5 31.7162 28.5 34.501C28.5 34.8988 28.658 35.2803 28.9393 35.5616C29.2206 35.8429 29.6022 36.001 30 36.001C30.3978 36.001 30.7794 35.8429 31.0607 35.5616C31.342 35.2803 31.5 34.8988 31.5 34.501C31.496 30.9218 30.0724 27.4903 27.5416 24.9594C25.0107 22.4285 21.5792 21.0049 18 21.001V21.001Z"
                                  fill="#0C73FE"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Logo from './Logo';
import Hamburger from './Hamburger';
import HeaderNav from './HeaderNav';
import MiniLogo from './MiniLogo';
import MiddleLogo from './MiddleLogo';
import { parsePhoneMixin } from '@/mixins/content-helpers';
import UserDropdown from './UserDropdown';

export default {
    name: 'HeaderComponent',
    components: { UserDropdown, MiddleLogo, MiniLogo, HeaderNav, Hamburger, Logo },
    mixins: [parsePhoneMixin],
    data() {
        return {
            showUserDropdown: false,
            headerIsFixed: false,
        };
    },
    computed: {
        ...mapGetters({
            getSettingsByName: 'getSettingsByName',
            getWindowWidth: 'getWindowWidth',
            getUser: 'users/getUser',
            getCartItems: 'cart/getCartItems',
        }),
        isMobileScreen() {
            return this.getWindowWidth < 1801;
        },
        cartHasItems() {
            return this.getCartItems && this.getCartItems.length > 0;
        },
        isInner() {
            return this.$route.path !== '/';
        },
        phoneNumber() {
            return this.getSettingsByName('phone', 'value');
        },
        phoneNumberFiltered() {
            return this.getSettingsByName('phone', 'value_2');
        },
        whatsappNumber() {
            return this.getSettingsByName('whatsapp_number', 'value_2');
        },
        workTime() {
            return this.getSettingsByName('work_time', 'value');
        },
        isManager() {
            return this.getUser && this.getUser.role && this.getUser.role === "manager";
        },
    },
    methods: {
        ...mapActions({
            openModal: 'modals/openModal',
        }),
        onUserClick() {
            this.openModal({ name: 'ModalRegistration', customClass: "modal-custom" });
        },
        setHeaderHeight() {
            const $el = this.$el;
            const root = document.documentElement;

            if ($el && root) {
                const height = $el.offsetHeight - 5; // 5 пикселей отступа, чтобы менюшка не проскакивала при ховере
                root.style.setProperty('--header-height', height + 'px');
            }
        },
        onCallClick() {
            this.openModal({ name: 'ModalCall' });
        },
        onUserClickOutside() {
            this.showUserDropdown = false;
        },
        onCloseUserDropdown() {
            this.showUserDropdown = false;
        },
    },
    mounted() {
        this.setHeaderHeight();

        window.addEventListener('scroll', (e) => {

            if (pageYOffset > 90 && !this.headerIsFixed) this.headerIsFixed = true;
            if (pageYOffset < 90 && this.headerIsFixed) this.headerIsFixed = false;
        });
    },
};
</script>

<style lang="scss" scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 31;
    min-height: 90px;

    @apply border-b border-gray-50;

    &--fixed {
        .header-phone-wrapper {
            display: none;
        }
    }

    &-logo {
        width: 252px;
        height: 86px;
    }

    .logo {
        &::v-deep {
            svg {
                width: 100%;
                height: 100%;
            }
        }
    }

    &-phone{
        letter-spacing: 1px;
        @apply sm:text-base;

        &-wrapper{
            margin-right: 2.5%;
            @apply relative;
        }

        &-block{
            @apply pl-4;

            .date-work{
                font-size: 13px;
                font-weight: 400;
                line-height: 20px;
                @apply text-gray-200 sm:order-last sm:text-sm m-0;
            }
        }
    }

    &-phone,
    &-phone-icon {
        &:hover,
        &:focus {
            @apply text-orange-400;
        }
    }

    &-call {
        padding: 15px 22px;
        margin-right: 3.0%;

        &:hover,
        &:focus {
            @apply bg-orange-400;
        }
    }

    &-cart {
        @apply relative;

        &-counter{
            position: absolute;
            top: -5px;
            right: -10px;
            min-width: 24px;
            min-height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4px;
            font-weight: 500;
            border-radius: 100%;
            @apply text-base leading-none bg-red-500 text-white text-center;
        }

        &:hover,
        &:focus {
            .header-cart__text {
                border-bottom-color: transparent;
            }
        }

        &:hover,
        &:focus {
            @apply text-orange-400;

            svg {
                @apply text-orange-400;
            }
        }

        &__wrap {
            width: 40px;
            height: 40px;
        }

        &__icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        &__text {
            transition: all .3s var(--custom-transition);
        }
    }

    &-user {
        &__item {
            @apply text-red-500;

            &:hover {
                @apply text-orange-400;
            }
        }
    }

    &-cart,
    &-user {
        &:hover,
        &:focus {
            svg {
                @apply text-orange-400;
            }
        }

        svg {
            fill: currentColor;
            transition: all .3s var(--custom-transition);
            @apply text-blue-300;

            path {
                fill: currentColor;
            }
        }
    }

    &-icon {
        @apply p-2;

        &:not(:last-child) {
            @apply mr-11;
        }
    }
}

.icon {
    width: 36px;
    height: 36px;

    &--big {
        width: 42px;
        height: 42px;
    }
}

@screen extra {
}

@screen 4xl {
    .header {
        &-icon {
            @apply p-1;

            &:not(:last-child) {
                @apply mr-3;
            }
        }
    }
}

@screen xxl {
    .header {
        &-phone {
            &-wrapper {
                @apply px-2;
                margin-right: 0;
            }
        }
    }

    .icon {
        width: 28px;
        height: 28px;

        &--big {
            width: 32px;
            height: 32px;
        }
    }
}

@screen xl {
    .header{
        min-height: 0;
        @apply py-2;

        &-icon {
            &:not(:last-child) {
                @apply mr-2;
            }
        }
    }

    .header-cart {
        margin-bottom: 0;
        height: auto;
    }
}

@screen tablet {
    .header {
        &-hamburger {
            margin-right: 3.7%;
        }

        //&-phone,
        &-call {
            display: none;
        }

        &-cart {
            margin-left: auto;

            &__text {
                display: none;
            }
        }
    }
}

@screen sm {
    .header {
        @apply py-0;

        .logo {
            width: 170px;
            @apply py-4;
        }

        &__phone {
            display: none;
        }

        &-cart {
            &-counter {

            }
        }

        &-phone{
            letter-spacing: 0;
            @apply mx-auto;

            &-wrapper{
                width: 100%;
                padding-right: 0;
                padding-left: 0;
                margin-right: 0;
                @apply order-last py-4;

                &:before{
                    content: '';
                    display: block;
                    width: calc(100% + 32px);
                    height: 1px;
                    position: absolute;
                    top:0;
                    right:-16px;
                    @apply bg-gray-50;
                }
            }

        }

        &-user,
        &-cart {
            svg {
                width: 28px;
                height: 28px;
            }
        }

        &-cart-counter {
            top: -9px;
        }
    }
}

@screen mob {
    .header {
        &-phone-wrapper {
            &:before {
                right:-10px;
                width: calc(100% + 20px);
            }
        }

        &-user,
        &-cart {
            svg {
                width: 20px;
                height: 20px;
            }
        }

        &-cart {
            @apply mr-4;
        }

        &-cart-counter {
            min-width: 20px;
            min-height: 20px;
            top: -12px;
            @apply text-sm leading-none;
        }

        .logo {
            width: 8.5rem;
        }

        &-icon {
            &:not(:last-child) {
                @apply mr-1;
            }
        }
    }

    .icon {
        width: 20px;
        height: 20px;

        &--big {
            width: 24px;
            height: 24px;
        }
    }
}
</style>
