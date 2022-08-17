<template>
    <div
        class="inner-cruises-top-banner pt-6 pb-14 bg-no-repeat bg-center bg-cover"
        :class="{'inner-cruises-top-banner--about pb-32': $route.path === '/about'}"
        :style="`backgroundImage: url(${topBannerContent.image})`"
    >
        <div class="wrapper relative z-1">
            <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs text-white"/>

            <div class="px-12 xl:px-0">
                <h1
                    v-if="title"
                    class="text-white text-50 leading-1-2 m-0 mb-10 uppercase 2xl:text-44 xl:text-36 xl:mb-5 mob:text-26"
                    :class="{
                        'text-44': $route.path === '/about',
                        'pb-28 lg:pb-16': !topBannerContent.content
                     }"
                    v-html="title"
                ></h1>
                <div
                    v-if="topBannerContent.content"
                    v-html="topBannerContent.content"
                    class="inner-cruises-top-banner__content text-white text-22 leading-1-2 xl:text-lg xs:hidden"
                    :class="showDescription"
                ></div>

                <div
                    v-if="topBannerContent.content"
                    v-html="topBannerContent.content"
                    class="inner-cruises-top-banner__content inner-cruises-top-banner__content--mobile text-white leading-1-2 text-22 sm:text-xl hidden xs:block mob:text-lg"
                    :class="{'inner-cruises-top-banner__content--expanded': showDescription}"
                ></div>

                <button
                    v-if="topBannerContent.content"
                    type="button"
                    class="link-inline link-inline--dashed mt-4 text-white text-lg font-medium hidden xs:inline-block"
                    @click="showDescription = !showDescription"
                >
                    <template v-if="!showDescription">Показать описание</template>
                    <template v-else>Скрыть описание</template>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from "@/components/base/Breadcrumbs";

    export default {
        name: "TopBanner",
        components: { Breadcrumbs },
        props: {
            title: {
                type: String,
                required: true,
            },
            breadcrumbs: {
                type: Array,
                required: true,
            },
            topBannerContent: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                showDescription: false,
            };
        },
    };
</script>

<style lang="scss" scoped>
    .inner-cruises-top-banner {
        position: relative;

        &--about {
            h1 {
                max-width: 860px;
            }
        }

        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(270deg, rgba(11, 62, 131, 0) 10%, #0B3E83 100%);
        }

        &::v-deep {
            p {
                @apply m-0 mb-6 last:m-0 xl:mb-4;
            }
        }

        &__content {
            max-width: 1240px;

            &--mobile {
                position: relative;
                max-height: 156px;
                overflow: hidden;
                transition: height 0.3s var(--custom-transition);
            }

            &--expanded {
                max-height: 100%;
            }
        }
    }

    @screen sm {
        .inner-cruises-top-banner {
            &:after {
                background: linear-gradient(270deg, rgba(11, 62, 131, 0) -30%, #0B3E83 100%);
            }
        }
    }
</style>
