<template>
    <div class="readmore-clamp" :class="{ 'readmore-clamp--opened': !descHidden }">
        <div
            class="readmore-desc word-wrap"
            :class="[descSelectors, { [descClampSelectors]: descHidden }]"
            v-html="desc"></div>


        <button
            v-if="showDescToggler"
            type="button"
            class="button readmore-link w-fit mt-2"
            :class="readmoreButtonSelectors"
            :title="`${getReadMoreText} ${readmoreButtonTitle}`"
            @click="handleReadmoreClick"
        >
            {{ getReadMoreText }}
        </button>
    </div>
</template>

<script>
    export default {
        name: 'ReadMoreClamp',
        props: {
            desc: {
                type: null,
            },
            descSelectors: {
                type: null,
            },
            descClampSelectors: {
                type: null,
                default: 'line-clamp-6 sm:line-clamp-5',
            },
            readmoreButtonTitle: {
                type: String,
                default: '',
            },
            readmoreButtonSelectors: {
                type: null,
            },
            readmoreButtonTitleOpen: {
                type: String,
                default: 'Показать описание',
            },
            readmoreButtonTitleClose: {
                type: String,
                default: 'Скрыть описание',
            },
        },
        data() {
            return {
                descHidden: true,
                showDescToggler: false,
            };
        },
        computed: {
            getReadMoreText() {
                return this.descHidden ? this.readmoreButtonTitleOpen : this.readmoreButtonTitleClose;
            },
        },
        methods: {
            handleReadmoreClick() {
                this.descHidden = !this.descHidden;
            },
            setDescVisibilityOninit(desc) {
                const hasOverflow = desc.scrollHeight > desc.clientHeight; // checking line clamp

                if (hasOverflow) {
                    this.showDescToggler = true;
                    this.descHidden = true;
                }
            },
        },
        mounted() {
            const $el = this.$el;
            const desc = $el.querySelector('.readmore-desc');

            if (desc) {
                this.setDescVisibilityOninit(desc);
            }
        },
    };
</script>

<style lang="scss" scoped>
    .readmore-clamp {
        .readmore-clamp {
            :not(.readmore-clamp--opened) {
                .readmore-desc {
                    &::v-deep {
                        p {
                            margin: 0;
                        }

                        ul, ol {
                            padding: 0;
                            margin: 0;

                            li {
                                padding: 0;
                                margin: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
