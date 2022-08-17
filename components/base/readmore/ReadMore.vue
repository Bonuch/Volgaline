<template>
    <div class="readmore">
        <template v-if="isChrome">
            <ReadMoreClamp
                :desc="getDesc"
                :desc-selectors="descSelectors"
                :desc-clamp-selectors="descClampSelectors"
                :readmore-button-selectors="readmoreButtonSelectors"
                :readmore-button-title-open="readmoreButtonTitleOpen"
                :readmore-button-title-close="readmoreButtonTitleOpen"
            />
        </template>
        <template v-else>
            <ReadMoreHeight
                :desc="getDesc"
                :desc-selectors="descSelectors"
                :desc-clamp-selectors="descClampSelectors"
                :readmore-button-selectors="readmoreButtonSelectors"
                :readmore-button-title-open="readmoreButtonTitleOpen"
                :readmore-button-title-close="readmoreButtonTitleOpen"
            />
        </template>
    </div>
</template>

<script>
    import ReadMoreClamp from './ReadMoreClamp';
    import ReadMoreHeight from './ReadMoreHeight';

    let isChrome = false;
    if (process.client) {
        const checkBrowser = (function() {
            const test = function(regexp) {
                return regexp.test(window.navigator.userAgent);
            };
            switch (true) {
                case test(/edg/i):
                    return 'Microsoft Edge';
                case test(/trident/i):
                    return 'Microsoft Internet Explorer';
                case test(/firefox|fxios/i):
                    return 'Mozilla Firefox';
                case test(/opr\//i):
                    return 'Opera';
                case test(/ucbrowser/i):
                    return 'UC Browser';
                case test(/samsungbrowser/i):
                    return 'Samsung Browser';
                case test(/chrome|chromium|crios/i):
                    return 'chrome';
                case test(/safari/i):
                    return 'safari';
                default:
                    return 'Other';
            }
        })();

        isChrome = checkBrowser === 'chrome';
    }

    export default {
        name: 'ReadMore',
        components: { ReadMoreHeight, ReadMoreClamp },
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
                isChrome,
            };
        },
        computed: {
            getDesc() {
                return this.desc; // remove style from html
                // return replace('/(<[^>]+) style=".*?"/i', '$1', this.desc);
            },
        }
    };
</script>

<style lang="scss" scoped>

</style>
