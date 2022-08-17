<template>
    <div
        class="about pt-18 pb-24 px-12 bg-no-repeat bg-top bg-center bg-cover rounded-sm overflow-hidden lg:pb-14 md:justify-start sm:pt-10 sm:px-4 sm:pb-8 sm:bg-blue-900"
    >
        <h3 class="page-inner-h1 mb-16 text-white sm:mb-8">О нас в цифрах</h3>

        <div class="about__list flex flex-wrap items-start justify-between -mx-8 px-3 lg:justify-start">
            <div
                v-for="(item, idx) in aboutArr"
                :key="idx"
                class="about__item flex flex-col justify-end w-1/5 px-8 text-white font-bold lg:w-1/3 lg:mb-6 sm:w-1/2 mob:w-full"
            >
                <div v-if="item.count" class="about__count relative pb-5 mb-7 text-70 leading-none sm:text-60 sm:mb-5">
                    {{ item.count }}
                </div>

                <div
                    v-if="item.text"
                    class="about__text text-22 2xl:text-xl xxl:text-lg lg:text-22 sm:text-xl"
                    v-html="item.text"
                >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AboutCountInner",
        props: {
            aboutArr: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .about {
        background-image: url("~/assets/images/about-bg.jpg");

        h3 {
            text-transform: initial;
            line-height: 1.4;
        }

        &__count {
            &:before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 30px;
                height: 6px;
                @apply bg-blue-300;
            }
        }
    }

    @screen sm {
        .about {
            background-image: url("~/assets/images/about-bg-mobile.png");

            .page-inner-h1 {
                text-transform: uppercase;
            }
        }
    }
</style>
