<template>
    <div class="promo" :class="{'promo--big': item.index === 1}">
        <a
            v-if="item.link"
            :href="item.link"
            class="promo__wrap absolute left-4 right-4 top-0 flex flex-col items-start h-full p-7 text-white rounded-sm overflow-hidden"
        >
            <div class="promo__image absolute z-1 left-0 top-0 w-full h-full image-dark-gradient overflow-hidden">
                <picture>
                    <source media="(max-width: 420px)" :srcset="item.mobile_image">
                    <img
                        class="w-full h-full object-cover"
                        :src="item.image"
                        :alt='item.title'
                    />
                </picture>
            </div>

            <div class="hidden promo__title"></div>
            <div class="z-2 relative" v-html="item.text"></div>
        </a>
    </div>
</template>

<script>
import { dayjsHelpers } from "@/mixins/content-helpers";

export default {
    name: "Promo",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    mixins: [dayjsHelpers],
    computed: {
        getTitle() {
            return (title) => {
                if (title) {
                    const splited = title.split(' ');

                    if (splited && splited.length > 0) {
                        const wrapped = splited.map(splitedItem => `<span>${splitedItem}</span>`);
                        return wrapped.join(' ');
                    }
                } else {
                    return '';
                }
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.promo {
    padding-bottom: calc(33.3333% - 32px);
    @apply relative h-0 px-4 w-1/3 overflow-hidden;

    &__image {
        &:hover,
        &:focus {
            img {
                transform: scale(1.01);
            }
        }
    }

    &__image {
        &:before {
            z-index: 1;
        }

        img {
            transition: all var(--custom-transition) .3s;
        }
    }

    &__badge {
        width: fit-content;
    }

    &--inner {
        .promo__wrap {
            left: 0;
            right: 0;
            width: 100% !important;
            border-radius: 4px;
        }
    }
}

@media all and (min-width: 1281px) {
    .promo {
        &--big {
            width: 100%;
            padding-bottom: 35.5%;
            @apply mb-10;

            &::v-deep {
                .promo__title {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin: 0;
                    font-size: 80px;
                    line-height: 0.95;
                    font-weight: 700;
                    color: #fff;

                    //span {
                    //    padding: 9px 24px 9px 20px;
                    //    background-color: rgba(11, 62, 131, 0.7);
                    //    border-top-right-radius: 4px;
                    //    border-bottom-right-radius: 4px;
                    //
                    //    &:first-child {
                    //        border-top-left-radius: 4px;
                    //    }
                    //
                    //    &:last-child {
                    //        border-bottom-left-radius: 4px;
                    //    }
                    //}
                }

                .promo__text {
                    font-weight: 500;
                    font-size: 30px;
                    line-height: 50px;
                    padding: 30px 18px 22px 28px;
                    background-color: rgba(11, 62, 131, 0.7);
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    @apply text-yellow-400;
                }
            }

            .promo__wrap {
                width: calc(100% - 2rem);
                @apply pt-16 pb-24 px-12;

                &:before {
                    display: none;
                }

                &:after {
                    content: '';
                    background: rgba(191, 198, 207, 0.2) radial-gradient(94.78% 94.81% at 71.56% 42.78%, rgba(2, 54, 101, 0.46) 86.64%, rgba(144, 189, 230, 0) 100%);
                    z-index: 0;
                    @apply absolute left-0 top-0 w-full h-full;
                }
            }

            .badge {
                text-align: center;
                @apply text-lg;
            }
        }
    }
}

@screen extra {
    .promo__wrap {
        @apply p-4;
    }
}

@screen xl {
    .promo {
        width: 50%;
        padding-bottom: calc(50% - 32px);
        @apply mb-10;
    }

    .promo--inner {
        width: 100%;
    }
}

@screen lg {
    .promo {
        padding-bottom: 42.85%;
        padding-left: 0;
        padding-right: 0;
        margin-bottom: 0;

        &__wrap {
            left: 0;
            right: 0;
        }

        &--inner {
            @apply mb-10;
        }
    }
}

@screen tablet {
    .promo {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 56.25%;

        &:last-of-type {
            margin-bottom: 0;
        }

        &__wrap {
            width: 100%;
            left: 0;
        }
    }
}

@screen sm {
    .promo {
        padding-bottom: 84%;
    }
}

@screen xs {
    .promo {
        padding-bottom: 118%;

        &__prices {
            width: 100%;
            justify-content: space-between;
        }

        &--inner {
            margin-bottom: 1rem;

            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }
}

@screen mob {
    .promo {
        padding-bottom: 100%;

        &__wrap {
            @apply px-10;
        }

        &__title {
            @apply text-xl;
        }
    }
}
</style>
