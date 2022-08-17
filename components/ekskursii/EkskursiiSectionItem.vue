<template>
    <article class="news-section-item flex flex-col rounded-2xl border border-gray-90 justify-start p-10 mx-4 my-5 tablet:mx-0 tablet:p-5">
        <h3 v-if="item.title" class="m-0 mb-7 md:mb-4 text-22 font-medium xs:text-xl">
            <nuxt-link :to="getSlug">
                {{ item.title }}
            </nuxt-link>
        </h3>
        <div class="aspect-w-16 aspect-h-11 mb-7 md:mb-4 tablet:aspect-h-8 sm:aspect-h-11 xs:aspect-w-4 xs:aspect-h-3 ">
            <nuxt-link :to="getSlug">
                <img
                    v-if="item.image"
                    :src="item.image"
                    alt="#"
                    class="absolute w-full h-full object-cover rounded-sm overflow-hidden rounded-xl"
                >
            </nuxt-link>
        </div>

        <div class="flex-1-1 flex flex-col">

            <p v-if="item.updated_at" class="flex flex-wrap mb-0">
                <span class="text-base text-gray-300 mr-5 xs:text-sm">
                    {{ getDateFormatted(item.updated_at) }}
                </span>
                <span class='flex items-center'>
                    <span class='mr-1.5'>
                        <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M7.5 15C6.01664 15 4.56659 14.5601 3.33323 13.736C2.09986 12.9119 1.13856 11.7406 0.570907 10.3701C0.00324964 8.99968 -0.145275 7.49168 0.144114 6.03683C0.433503 4.58197 1.14781 3.2456 2.1967 2.1967C3.2456 1.14781 4.58197 0.433503 6.03683 0.144114C7.49168 -0.145275 8.99968 0.00324964 10.3701 0.570907C11.7406 1.13856 12.9119 2.09986 13.736 3.33323C14.5601 4.56659 15 6.01664 15 7.5C14.9979 9.48847 14.207 11.3949 12.8009 12.8009C11.3949 14.207 9.48847 14.9979 7.5 15ZM7.5 1.25C6.26387 1.25 5.0555 1.61656 4.02769 2.30332C2.99988 2.99008 2.1988 3.96619 1.72576 5.10823C1.25271 6.25027 1.12894 7.50694 1.3701 8.71932C1.61125 9.9317 2.20651 11.0453 3.08059 11.9194C3.95466 12.7935 5.06831 13.3888 6.28069 13.6299C7.49307 13.8711 8.74974 13.7473 9.89177 13.2742C11.0338 12.8012 12.0099 12.0001 12.6967 10.9723C13.3834 9.94451 13.75 8.73614 13.75 7.5C13.7482 5.84296 13.0891 4.2543 11.9174 3.0826C10.7457 1.91089 9.15705 1.25182 7.5 1.25Z'
                        fill='#696969' />
                    <path d='M4.96586 9.74875L4.30273 8.68875L6.87398 7.07812V3.75H8.12398V7.77062L4.96586 9.74875Z' fill='#696969' />
                    </svg>
                    </span>
                    <span class='text-base text-gray-300 xs:text-sm'>{{ dayjsGetTimeFormatted(item.updated_at) }}</span>
                </span>
            </p>
            <div v-if="item.intro_text" class="mb-6 line-clamp-2 text-lg xs:text-base h-auto" v-html="item.intro_text_filtered"></div>
<!--            <p class="m-0 mt-auto">-->
<!--                <nuxt-link :to="getSlug" class="link-inline text-red-400 text-lg">-->
<!--                    Подробнее-->
<!--                </nuxt-link>-->
<!--            </p>-->
        </div>
    </article>
</template>

<script>
    import { dayjsHelpers } from '@/mixins/content-helpers';

    export default {
        name: 'EkskursiiSectionItem',
        mixins: [dayjsHelpers],
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        computed: {
            getSlug() {
                let slug = '/';

                if (this.item && this.item.slug) {
                    slug = `/ekskursii/${this.item.slug}`;
                }

                return slug;
            }
        }
    };
</script>

<style scoped lang="scss">
.news-section-item {
    min-width: 450px;
    box-shadow: 0px 4px 35px rgba(36, 58, 101, 0.1);
}
@screen tabletLg {
    .news-section-item {
        min-width: 250px;
        width: 100%;
    }
}
</style>
