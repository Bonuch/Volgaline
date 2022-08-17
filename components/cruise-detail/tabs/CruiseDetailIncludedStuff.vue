<template>
    <div class="cruise-detail-included-stuff">
        <div class="wrapper wrapper-1410">
            <h3 class="cruise-detail-tab-content__title">В стоимость включено</h3>

            <div
                class="cruise-detail-info__content text-lg mb-2"
                :class="{'flex flex-wrap items-center': hasIcons(stuffs)}"
            >
                <div
                    v-for="(includedStuffItem, includedStuffIdx) in stuffs"
                    :key="`cruise-detail-info__content-${includedStuffIdx}`"
                    :class="{
                           'w-11 h-11 mr-10 last:mr-0 2xl:mr-6': includedStuffItem.image_url,
                           'mb-3 last:mb-0': !includedStuffItem.image_url
                    }"
                >
                    <template v-if="includedStuffItem.image_url">
                        <img
                            :src="includedStuffItem.image_url"
                            :alt="includedStuffItem.title"
                            :title="includedStuffItem.desc"
                            class="w-full h-full object-cover"
                        >
                    </template>

                    <template v-else>
                        <div class="cruise-detail-info-block leading-normal text-base text-black-400" v-if="includedStuffItem.desc" v-html="includedStuffItem.desc"></div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CruiseDetailIncludedStuff',
        props: {
            stuffs: {
                type: Array,
                required: true,
            },
        },
        computed: {
            hasIcons() {
                return (arr) => {
                    let res = false;

                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i]['image_url']) {
                            res = true;
                            break;
                        }
                    }

                    return res;
                };
            },
        },
    };
</script>

<style scoped lang="scss">
    .cruise-detail-info-block {
        &-block {
            ::v-deep p{
                margin-bottom: 0;
            }
        }
    }
</style>
