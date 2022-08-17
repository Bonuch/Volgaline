<template>
    <div class="insta__list flex flex-wrap -mx-4 overflow-hidden sm:mx-0 sm:mb-0 sm:justify-between">
        <div
            v-for="(item, itemIdx) in images"
            :key="itemIdx"
            :title="item.title"
            class="insta__item relative block flex-1 h-0 mx-4"
        >
            <a
                v-if="item.link"
                :href="item.link"
                class="absolute top-0 w-full h-full"
                target="_blank"
            >
                <img
                    v-if="item.image" class="absolute top-0 w-full h-full rounded-sm object-cover"
                    :src="item.image"
                    alt="#"
                >
            </a>

            <template v-else>
                <img
                    v-if="item.image"
                    class="absolute top-0 w-full h-full rounded-sm object-cover"
                    :src="item.image"
                    alt="#"
                >
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InstaList",
        props: {
            images: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .insta {
        &__item {
            padding-bottom: 25%;
        }
    }

    @media all and (max-width: 1100px) {
        .insta {
            @apply mb-5;

            &__item {
                flex: 0 1 calc(50% - 41px);
                padding-bottom: 46%;
                @apply mb-10;
            }
        }
    }

    @screen sm {
        .insta {
            &__list {
                .insta__item {
                    &:first-child {
                        flex: 0 1 100%;
                        padding-bottom: 100%;
                        margin: 0 auto 16px;
                    }

                    &:last-child {
                        display: none;
                    }
                }
            }

            &__item {
                flex: 0 1 calc(50% - 8px);
                margin: 0;
            }
        }
    }
</style>
