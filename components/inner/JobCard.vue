<template>
    <article class="job-card flex flex-wrap">
        <div
            class="w-96 mr-10 xl:flex xl:flex-wrap xl:w-full xl:mr-0"
            @click="toggleContent"
        >
            <div
                class="job-card__heading p-12 mb-5 bg-gray-50 rounded-sm overflow-hidden xl:w-full xl:flex xl:flex-col xl:p-8 xl:text-center xs:p-6 xs:flex-row xs:text-left xs:flex-wrap"
            >
                <h2
                    v-if="jobItem.title"
                    class="job-card__title m-0 mb-4 text-30 leading-1-1 font-bold uppercase sm:text-2xl sm:normal-case sm:leading-none"
                >
                    {{ jobItem.title }}
                </h2>

                <p class="job-card__salary m-0 xs:mt-5">
                    <span class="block font-medium text-gray-300">Заработная плата:</span>
                    <span v-if="jobItem.salary" class="text-22 font-medium sm:text-xl">{{ jobItem.salary }}</span>
                </p>

                <svg
                    class="job-card__icon custom-transition hidden mt-4 mx-auto xl:block sm:w-6 sm:h-6 xs:w-5 xs:h-5"
                    :class="{'transform rotate-180': showContent}"
                    width="32"
                    height="32"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z"
                        fill="#5A6472"
                    />
                </svg>
            </div>

            <div v-if="jobItem.conditions" class="flex-1-1 mx-12 xl:hidden">
                <span class="block font-medium text-gray-300">Условия работы:</span>
                <div class="job-card-conditions__desc text-22 font-medium sm:text-xl" v-html="jobItem.conditions"></div>
            </div>
        </div>

        <div class="flex-1-1 job-card__content xl:hidden" :class="{'job-card__content--active': showContent}">
            <div v-if="jobItem.conditions" class="hidden xl:block mb-10">
                <span class="block font-medium text-gray-300">Условия работы:</span>
                <div class="job-card-conditions__desc text-22 font-medium sm:text-xl" v-html="jobItem.conditions"></div>
            </div>

            <div v-if="jobItem.desc" class="job-card__desc" v-html="jobItem.desc"></div>
        </div>
    </article>
</template>

<script>
    import { formatCurrency } from '@/helpers/text';

    export default {
        name: "JobCard",
        props: {
            jobItem: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                showContent: false,
            };
        },
        computed: {
          getPriceFormatted() {
              return price => formatCurrency(price);
          }
        },
        methods: {
            toggleContent() {
                this.showContent = !this.showContent;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .job-content {
        &-enter-active {
            animation: .3s custom-slide-in-top both;
        }

        &-leave-active {
            animation: .3s custom-slide-in-top reverse;
        }
    }

    .job-card {
        &__content {
            &--active {
                display: block;
            }
        }

        &::v-deep {
            ul {
                @apply m-0 mb-10;

                li {
                    @apply m-0 mb-2;
                }
            }

            .job-card__desc {
                @apply sm:text-base;

                h2 {
                    @apply m-0 mb-4 text-26 font-medium sm:text-2xl;
                }
            }

            .job-card-conditions__desc {
                p {
                    @apply mb-0;
                }
            }
        }
    }

    @screen xs {
        .job-card {
            &__heading {
                align-items: center;
            }

            &__title {
                max-width: calc(100% - 30px);
                width: 100%;
                order: 1;
                margin: 0;
            }

            &__salary {
                order: 3;

            }

            &__icon {
                order: 2;
                margin: 0 8px 0 0;
            }
        }
    }
</style>
