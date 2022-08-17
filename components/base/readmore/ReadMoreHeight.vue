<template>
    <div class="readmore-height">
        <div
            class="readmore-desc relative word-wrap overflow-hidden"
            :class="[descSelectors, { 'readmore-desc--opened': !descHidden }, { 'readmore-desc--closed': descHidden }, { 'has-overflow': descHasOverflow }]"
            v-html="desc"
        ></div>

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
        name: 'ReadMoreHeight',
        props: {
            desc: {
                type: null,
            },
            descSelectors: {
                type: null,
                default: '',
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
                descHeight: 0,
                descHasOverflow: false,
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
        },
        mounted() {
            const desc = this.$el.querySelector('.readmore-desc');

            if (desc) {
                const columns = 5;
                const lh = window.getComputedStyle(desc).lineHeight;
                const maxHeight = (parseInt(lh, 10) * columns);
                const hasOverflow = desc.clientHeight > maxHeight;

                if (hasOverflow) {
                    desc.style.height = maxHeight + 'px';
                    this.descHasOverflow = true;
                    this.showDescToggler = true;
                    this.descHidden = true;
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .readmore-height {
        .readmore-desc {
            &.has-overflow {
                &:after {
                    content: "";
                    text-align: right;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 70%;
                    height: 1.2em;
                    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
                }
            }

            &.readmore-desc--opened {
                transition: height .3s ease;
                height: auto !important;

                &:after {
                    display: none !important;
                }
            }

            &.readmore-desc--closed {
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
</style>
