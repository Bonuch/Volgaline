<template>
    <article class="exclusive-card relative">
        <div
            v-if="item.image_450_240 && item.image_450_240.length > 0"
            class="exclusive-card-image exclusive-card-image__240 aspect-w-16 rounded-sm tablet:rounded-b-none overflow-hidden xl:aspect-w-16 xl:aspect-h-9 lg:aspect-w-12 lg:aspect-h-6 xs:max-h-40 xs:aspect-w-10 xs:aspect-h-4">
            <picture>
                <source media="(max-width: 480px)" :srcset="item.mobile_image_uncropped">
                <img
                    class="w-full h-full xs:max-h-40 object-center object-cover"
                    :src="item.image_450_240"
                    :alt="item.title"
                />
            </picture>
        </div>
        <div
            v-else
            class="exclusive-card-image exclusive-card-image__158 aspect-w-16 rounded-sm tablet:rounded-b-none overflow-hidden">
            <picture>
                <source media="(max-width: 480px)" :srcset="item.mobile_image_uncropped">
                <img
                    class="w-full h-full object-center object-cover"
                    :src="item.image"
                    :alt="item.title"
                />
            </picture>
        </div>

        <div class="exclusive-card-content absolute top-0 z-2 flex flex-col items-start h-full px-7 pt-8 pb-8 xs:px-4 xs:pt-4">
            <div
                v-if="item.subtitle"
                class="badge inline-block mb-auto py-2.5 text-xs font-medium leading-1-1 text-left uppercase"
            >
                {{ item.subtitle }}
            </div>
            <p v-if="item.title"
                class="block exclusive-card-title w-full pt-3 px-0 m-0 font-medium text-white text-lg leading-tight lg:text-base lg:leading-tight tablet:hidden mt-auto"
            >
                {{ item.title }}
            </p>
            <nuxt-link
                v-if="item.link"
                :to="item.link"
                class="exclusive-card-link"
                :title="item.title"
            >
            &nbsp;
            </nuxt-link>
        </div>
        <div class="tablet:border border-gray-80 rounded-sm rounded-t-none sm:flex-auto">
            <p v-if="item.title"
               class="hidden exclusive-card-title w-full px-5 py-5 m-0 font-normal text-blue-700 text-lg leading-tight lg:text-base lg:leading-tight tablet:block"
            >
                {{ item.title }}
            </p>
        </div>
    </article>
</template>

<script>
    export default {
        name: 'ExclusiveCard',
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .exclusive-card {
        $root: #{&};

        &.exclusive {
            @apply tablet:w-full;

            #{$root}-content {
                width: 100%;
            }
        }

        &:hover {
            img {
                transform: scale(1.01);
            }
        }

        &-image {


            &:before {
                z-index: 1;
            }
            &__240 {
                height: 240px;
            }
            &__158 {
                height: 158px;
            }
        }

        &-content {
            width: calc(100% - 32px);
        }

        &::v-deep {
            a {
                &:hover,
                &:focus {
                    @apply text-yellow-400;
                }
            }
        }
        &-link {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
        }
        .badge {
            max-width: calc(100% - 32px);
        }
    }

    @screen lg {
        .exclusive-card {
            &-content {
                width: 100%;
            }
        }
    }

    @screen sm {
        .exclusive-card {
            &.exclusive {
                @apply flex flex-col;
                width: 83.333%;
            }
        }
    }
</style>
