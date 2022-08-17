<template>
    <div class="cruise-detail-tab-content reviews-list">
        <div class="wrapper">
            <h3 class="cruise-detail-tab-content__title">Отзывы туристов</h3>

            <div
                v-if="content && content.length > 0"
                class="reviews-list__list"
            >
                <ReviewListItem
                    v-for="(reviewItem, idx) in content"
                    :key="`reviews-list__list-${idx}`"
                    class="pb-12 mb-12 text-lg border-b border-gray-50 last:pb-0 last:border-0 sm:pb-7 sm:mb-7 sm:last:mb-0 sm:last:pb-0"
                    :review-item="reviewItem"
                />
            </div>

            <p v-else>Ничего не найдено. Мы будем рады вашему отзыву!</p>

            <button
                v-if="showReviewBtn"
                type="button"
                class="reviews-list-btn button button-transparent py-5 text-xl text-blue-300 border-blue-300 xs:w-full"
                @click="callReview"
            >
                Оставить отзыв
            </button>
        </div>
    </div>
</template>

<script>
    import ReviewListItem from './ReviewListItem';

    export default {
        name: "ReviewList",
        components: { ReviewListItem },
        props: {
            content: {
                type: Array,
                default: [],
            },
            showReviewBtn: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            callReview() {
                this.$store.dispatch('modals/openModal', {
                    name: "ModalReview",
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .reviews-list {
        &-btn {
            &:hover {
                @apply bg-blue-300 text-white;
            }
        }
    }
</style>
