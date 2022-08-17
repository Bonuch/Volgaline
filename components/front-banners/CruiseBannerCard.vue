<template>
    <nuxt-link
        v-if="item.link"
        :to="item.link"
        :title="item.title"
    >
        <article class="cruise-banner-card relative">
            <div class="cruise-banner-card-image aspect-w-16 image-dark-gradient rounded-sm overflow-hidden xl:aspect-w-16 xl:aspect-h-9 lg:aspect-w-12 lg:aspect-h-7 sm:aspect-w-1 sm:aspect-h-1">
                <img
                    v-if="item.image"
                    class="w-full h-full object-center object-cover"
                    :src="item.image"
                    alt="#"
                />
            </div>

            <div class="cruise-banner-card-content z-2 flex flex-col justify-end items-start h-full py-5 px-7 sm:px-9">
                <template v-if="item.title">

                        <slot name="title" :item="item">
                            <div class="cruise-banner-card-title m-0 pb-7 text-white text-30 leading-tight uppercase xs:text-26 xs:normal-case xs:leading-tight">
                                {{ item.title }}
                            </div>
                        </slot>

                </template>
            </div>
        </article>
    </nuxt-link>
</template>

<script>
    export default {
        name: 'CruiseBannerCard',
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-banner-card {
        &-image {
            height: 240px;
            &:before {
                z-index: 1;
            }
        }

        &-content {
            position: absolute;
            top: 0;
            width: 100%;
        }
    }

    @screen sm {
        .cruise-banner-card {
            &-content {
                width: 100%;
            }
        }
    }
</style>
