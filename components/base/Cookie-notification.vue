<template>
    <div v-show="isOpen" class="cookie-notification">
        <div class="cookie-notification-wrapper sm:flex-col">
            <p class="cookie-notification-text">
                Мы используем cookies для улучшения работы сайта, анализа трафика и персонализации.
                Используя сайт или кликая на Я согласен, вы соглашаетесь с
                нашей политикой использования cookies. Вы можете прочитать нашу политику
                <a href="/privacy" target="_blank">здесь</a>
            </p>

            <button class="cookie-notification-button button btn"
                    @click="onCloseClick">
                <span class="button__text">Я согласен</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Cookie-notification",
        data() {
            return {
                isOpen: false,
            };
        },
        computed: {
            getDomain() {
                return process.env.BASE_URL;
            },
        },
        methods: {
            onCloseClick() {
                this.isOpen = false;
                // 2592000000 - 1 месяц
                this.setWithExpiry("cookie-agreed", 1, 2592000000);
            },
            setWithExpiry(key, value, ttl) {
                const now = new Date();
                const item = {
                    value: value,
                    expiry: now.getTime() + ttl,
                };
                localStorage.setItem(key, JSON.stringify(item));
            },
            getWithExpiry() {
                const itemStr = localStorage.getItem("cookie-agreed");

                if (!itemStr) {
                    return null;
                }

                const item = JSON.parse(itemStr);
                const now = new Date();

                if (now.getTime() > item.expiry) {
                    localStorage.removeItem("cookie-agreed");
                    return null;
                }
                return item.value;
            },
            getCookieAgreed() {
                return !this.getWithExpiry() ? this.isOpen = true : this.isOpen = false;
            },
        },
        beforeMount() {
            this.getCookieAgreed();
        },
    };
</script>

<style lang="scss" scoped>
    .cookie-notification {
        position: fixed;
        height: initial;
        z-index: 30;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2),
        0 0 2px 0 rgba(0,0,0,0.1);
        @apply text-sm text-black-400 leading-1-1;

        &-wrapper {
            padding: 14px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 1100px;
        }

        &-text {
            font-size: 14px;
            line-height: 1.43;
            color: #777;
        }

        a {
            display: inline;
            color: #36b;
            text-decoration: underline;
            cursor: pointer;

            &:hover,
            &:focus {
                border-bottom-color: transparent;
            }
        }

        p {
            margin: 0;
        }

        &-button {
            padding: 10px 12px;
            border-radius: 20px;
            line-height: 20px;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            min-width:100px;
            white-space:nowrap;
            justify-content:center;
            align-items:center;
            margin:5px 3px;
            cursor:pointer;
            @apply sm:w-full my-2;
        }
    }

    @media (max-width: 768px) {
        .cookie-notification {
            &-text {
                max-width: initial;
                flex: 1;
                font-size: 12px;
            }
        }
    }

    @media (max-width: 640px) {
        .cookie-notification {
            padding: 10px;
        }
    }

    @media (max-width: 480px) {
        .cookie-notification {
            padding: 10px;
        }
    }
</style>
