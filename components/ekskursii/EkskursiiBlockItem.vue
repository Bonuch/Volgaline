<template>
    <article
        class="news-block-item flex flex-col justify-start p-10 border border-gray-50 rounded-sm overflow-hidden md:p-8 sm:p-5 mob:p-4"
    >
        <h3 v-if="item.title" class="m-0 mb-2 text-22 font-medium xs:text-xl">
            <nuxt-link :to="getSlug" :title="item.title">
                {{ item.title }}
            </nuxt-link>
        </h3>
        <div class="mt-auto">
            <p v-if="item.updated_at" class="flex flex-wrap">
                <span class="text-base mr-5 xs:text-sm">
                    {{ getDateFormatted(item.updated_at) }}
                </span>
                <span class="text-base text-gray-300 xs:text-sm">
                    {{ dayjsGetTimeFormatted(item.updated_at) }}
                </span>
            </p>
            <div v-if="item.intro_text" class="mb-6 line-clamp-3 text-lg xs:text-base h-auto" v-html="item.intro_text"></div>
            <p class="m-0 mt-auto">
                <nuxt-link
                    :to="getSlug"
                    :title="item.title"
                    class="link-inline text-red-400 text-lg"
                >
                    Подробнее
                </nuxt-link>
            </p>
        </div>
    </article>
</template>

<script>
    import { dayjsHelpers } from '@/mixins/content-helpers';

    export default {
        name: 'EkskursiiBlockItem',
        mixins: [dayjsHelpers],
        props: {
            item: {
                type: Object,
                required: true
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

<style scoped></style>
