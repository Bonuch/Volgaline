<template>
    <div class="promo" :class="{'promo--big': item.index === 1}">
        <div
            class="promo__content absolute left-5 right-5 top-0 flex flex-col items-start h-full p-13 bg-no-repeat bg-center bg-cover text-white rounded-sm overflow-hidden"
            :style="`background-image: url(${getImage})`"
        >
            <div class="promo__dates relative z-1 flex mt-auto mb-3 text-white text-lg font-bold">
                <template v-if="item.date">
                    <span class="px-4 py-1 border-2 border-white capitalize">{{ dayjsGetMonth(item.date) }}</span>
                    <span class="px-4 py-1 bg-orange-400">{{ dayjsGetYear(item.date) }}</span>
                </template>
            </div>

            <h3
                v-if="item.title"
                class="promo__title relative z-1 text-30 leading-1-1 font-bold text-white uppercase"
                v-html="item.title"
            ></h3>

            <div
                v-if="item.text || item.button"
                class="promo__prices relative z-1 inline-flex bg-red-400 px-5 py-6 rounded-sm"
                :class="{'flex items-center': item.text && item.button}"
            >
                <span v-if="item.text" class="promo__old-price text-22 font-medium line-through mr-7">
                    {{ item.text }}
                </span>
                <span
                    v-if="item.button"
                    class="promo__new-price text-30 font-bold"
                >
                    {{ item.button }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import {dayjsHelpers} from "@/mixins/content-helpers";

export default {
    name: "PromoOld",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    mixins: [dayjsHelpers],
    computed: {
        getImage() {
            return this.item.image ? this.item.image : "";
        },
    },
};
</script>

<style lang="scss" scoped>
.promo {
    padding-bottom: 31.85%;
    @apply relative h-0 px-5 w-1/3 overflow-hidden;

    &--inner {
        .promo__content {
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 0;
        }
    }

    &__content {
        width: calc(100% - 2.5rem);

        &:before {
            content: '';
            background: var(--custom-gray-gradient);
            z-index: 0;
            @apply absolute left-0 top-0 w-full h-full;
        }
    }

    &__title {
        max-width: 970px;
    }
}

@media all and (min-width: 1281px) {
    .promo {
        &--big {
            width: 100%;
            padding-bottom: 35.5%;
            @apply mb-10;

            .promo__title {
                @apply text-60;
            }

            .promo__content {
                @apply pb-24;
            }
        }
    }
}

@media all and (min-width: 1536px) {
    .promo--big .promo__title {
        @apply text-80;
    }
}

@screen extra {
    .promo__content {
        @apply p-4;
    }

    .promo {
        &__old-price {
            @apply text-lg leading-none;
        }

        &__new-price {
            @apply text-26 leading-none;
        }
    }
}

@screen 2xl {
    .promo {
        &__old-price {
            @apply text-lg leading-none;
        }

        &__new-price {
            @apply text-22 leading-none;
        }
    }
}

@screen xl {
    .promo {
        width: 50%;
        @apply mb-10;
    }

    .promo--inner {
        width: 100%;
    }
}

@screen lg {
    .promo {
        padding-bottom: 42.85%;
    }
}

@screen tablet {
    .promo {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 56.85%;

        &:last-of-type {
            margin-bottom: 0;
        }

        &__content {
            width: 100%;
            left: 0;
        }

        &__old-price {
            @apply text-base;
        }
    }
}

@screen xs {
    .promo {
        padding-bottom: 100%;
        margin-bottom: 1rem;

        &:last-of-type {
            margin-bottom: 0;
        }

        &__prices {
            width: 100%;
            justify-content: space-between;
        }

        &__old-price {
            margin-right: 10px;
        }
    }
}

@screen mob {
    .promo {
        &__title {
            @apply text-26;
        }

        &__prices {
            justify-content: center;
        }

        &__old-price {
            display: none;
        }

        &__new-price {
            text-align: center;
        }
    }
}
</style>
