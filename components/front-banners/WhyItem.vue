<template>
    <div
        class="why relative w-1/2 px-5 mb-10"
        :class="{'why--first': item.position && item.position === 1}"
    >
        <div v-if="item.position && item.position === 1" class="why__item why__background">
            <div class="w-1/2 flex items-center justify-center">
                <h3 class="why__title pl-13 text-42 leading-tight font-bold uppercase">Почему с нами отдыхают</h3>
            </div>

            <div class="why__item w-1/2 why__substrate bg-cover bg-no-repeat bg-center" :style="`background-image: url(${item.image})`">
                <h3 v-if="item.title" class="relative z-1 font-bold text-30 text-white m-0 mt-auto" v-html="item.title"></h3>
            </div>
        </div>

        <div v-else class="why__item why__background why__substrate" :style="`background-image: url(${item.image})`">
            <h3 v-if="item.title" class="why__title relative z-1 font-bold text-30 text-white m-0 mt-auto" v-html="item.title"></h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WhyItem",
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .why {
        padding-bottom: 23.1%;

        &--first {
            & > .why__item {
                @apply p-0 flex-row;
            }
        }

        &__item {
            @apply relative p-13 flex flex-col h-full bg-cover bg-no-repeat bg-center rounded-sm overflow-hidden;
        }

        &__background {
            width: calc(100% - 2.5rem);
            @apply absolute top-0 left-5 right-5;
        }

        &__substrate {
            &:before {
                content: '';
                background: var(--custom-gray-gradient);
                z-index: 0;
                @apply absolute left-0 top-0 w-full h-full;
            }
        }
    }

    @screen extra {
        .why {
            &--first {
                .why__title {
                    @apply text-30;
                }
            }

            &__item {
                @apply p-8;
            }
        }
    }

    @media all and (max-width: 1440px) {
        .why {
            &--first {
                .why__title {
                    @apply text-26;
                }
            }

            &__item {
                @apply p-4;
            }
        }
    }

    @screen xl {
        .why {
            width: 100%;
            padding-bottom: 42.35%;

            &--first {
                .why__title {
                    @apply px-4;
                }
            }

            &__item {
                @apply p-13;
            }
        }
    }
</style>
