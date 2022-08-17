<template>
    <div class="banner flex tablet:flex-wrap">
        <div class="banner--wrapper-image tablet:flex-100 relative overflow-hidden">
                <picture>
                    <img
                        class="w-full h-full object-cover rounded-l tablet:rounded-t tablet:rounded-b-none absolute z-1 left-0 top-0 h-full image-dark-gradient"
                        :src="item.image"
                        :alt='item.title'
                    />
                </picture>
        </div>
        <div class="banner--content flex-1 tablet:flex-100 px-15 sm:px-4 py-8 border border-l-0 border-gray-60 tablet:border-l tablet:border-t-0 rounded tablet:rounded-t-none">
            <div
                v-if="item.subtitle"
                class="badge inline-block mb-auto py-2.5 text-xs font-medium leading-1-1 text-left uppercase"
            >
                {{ item.subtitle }}
            </div>
            <p class="banner--content__title text-35 font-normal w-9/12 xxl:w-full xxl:text-28 leading-snug m-0 pt-8 pb-2 tablet:pt-2 sm:text-lg mob:text-sm">
                {{item.title}}
            </p>
            <!-- <p class="text-base text-black-400 tablet:hidden">Максимальные скидки на круизы 2022 года</p> -->
            <p class="text-base text-black-400 hidden tablet:block">Получите удовольствие в двойне</p>
            <div class="banner--content__text text-base mb-9 sm:mb-5 sm:text-center sm:text-xs">{{item.text}}</div>
            <nuxt-link
                v-if="item.link && item.title"
                :to="item.link"
                class="button py-2 px-5 font-medium bg-transparent text-red-500 border border-red-500 rounded sm:w-full hover:border-blue-500"
                :title="item.title"
            >
                Подробнее
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "BannerSoloveckieOstrova",
    props: {
        item: {
            type: Object,
            required: true
        },
    },
}
</script>

<style lang="scss" scoped>
    .banner {
        &--wrapper-image{
            width: 690px;
            height: 370px;
         }
    }
    @screen xl {
        .banner {
            &--wrapper-image{
                width: 400px;
            }
        }
    }
    @screen tablet {
        .banner {
            &--wrapper-image{
                height: 215px;
                width: 100%;
            }
        }
    }
</style>
