<template>
    <div
        class="about flex xxl:flex-wrap border border-gray-90 rounded-sm overflow-hidden"
    >
        <div
            v-for="(item, idx) in aboutArr"
            :key="idx"
            class="about__item flex flex-col justify-start xxl:w-1/3 sm:w-1/2"
        >
            <div v-if="item.count" class="about__count pb-4 text-40 leading-none tablet:text-36 text-blue-700 tablet:font-medium">{{ item.count }}</div>
            <div v-if="item.text" class="about__text leading-tight font-medium tablet:text-sm">{{ item.text }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AboutCount",
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

        .about__item {
            @apply border-r border-gray-90  px-11 tablet:px-5 py-8 text-center xl:py-5 sm:text-xs;

            &:last-child {
                @apply border-none;
            }
        }

        &__count {

        }
    }
    @screen xxl {
        .about {
            .about__item {
                &:nth-child(1) {
                    @apply border-b border-gray-90 ;
                }

                &:nth-child(2) {
                    @apply border-b border-gray-90 ;
                }

                &:nth-child(3) {
                    @apply border-r-0 border-b border-gray-90 ;
                }
            }
        }
    }

    @screen sm {
        .about {
            @apply border-none;

            .about__item {
                @apply mb-4  ;

                &:nth-child(2n - 1) {
                    width: calc(50% - 8px);
                    border: 1px solid;
                    @apply mr-2 border-gray-90;
                }

                &:nth-child(2n) {
                    width: calc(50% - 8px);
                    border: 1px solid;
                    @apply ml-2 border-gray-90;
                }
            }
        }
    }

    @media all and (max-width: 390px) {

        .about-cruises {
            &__content {
                font-size: 16px;
            }
        }
    }
</style>
