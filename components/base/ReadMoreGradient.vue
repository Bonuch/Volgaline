<template>
    <div class="readmore">
        <div
            class="readmore-desc word-wrap overflow-hidden"
            :class="{'readmore-desc__gradient': descHidden, 'readmore-desc--opened': !descHidden}"
            v-html="desc"></div>
        <button
            v-if="showDescToggler"
            type="button"
            class="button mt-10 font-normal px-8 py-2 sm:w-full sm:bg-white sm:border sm:border-red-500 sm:text-red-500 sm:rounded-sm"
            @click="handleReadmoreClick"
        >
            {{ getReadMoreText }}
        </button>
    </div>
</template>

<script>
    export default {
        name: 'ReadMoreGradient',
        props: {
            maxHeight: {
                type: Number,
            },
            desc: {
                type: null,
            },
            descSelectors: {
                type: null,
                default: '',
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
                return this.descHidden ? 'Читать полностью' : 'Скрыть описание';
            },
        },
        methods: {
            handleReadmoreClick() {
                this.descHidden = !this.descHidden;
            },
        },
        async mounted() {
            await this.$nextTick();

            const $el = this.$el;
            const el = $el.querySelector('.readmore-desc');

            const onHidden = this.maxHeight < el.clientHeight;
            this.showDescToggler = onHidden;
            this.descHidden = onHidden;

            if(onHidden) el.style.height = `${this.maxHeight}px`;
        },
    };
</script>

<style lang="scss" scoped>
    .readmore-desc {
        &--opened {
            height: auto !important;
        }

        &__gradient {
            @apply relative;

            &:after{
                content: '';
                background-image: linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0));
                @apply absolute top-0 left-0 w-full h-full;
            }
        }
    }
</style>
