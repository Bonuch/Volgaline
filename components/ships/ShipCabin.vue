<template>
    <div class="ship-cabin room h-full flex flex-start rounded-sm overflow-hidden xxl:flex-wrap">
        <template v-if="room.gallery && room.gallery.length > 0">
            <a
                class="room__image image-loop-hover relative rounded-sm overflow-hidden"
                href="#"
                @click.prevent="onImageClick"
            >
                <img
                    width="380"
                    height="380"
                    :src="room.gallery[0]['image_380_380']"
                    :alt="room.type"
                    class="w-full h-full object-cover"
                >

<!--                <span class="m-0 z-2 absolute bottom-0 left-5 right-0 flex items-center justify-between">-->
<!--                    <svg-->
<!--                        class="room__image-icon my-4 mr-7"-->
<!--                        width="44" height="44"-->
<!--                        viewBox="0 0 77 76" fill="none"-->
<!--                        xmlns="http://www.w3.org/2000/svg"-->
<!--                    >-->
<!--                        <path-->
<!--                            fill-rule="evenodd" clip-rule="evenodd"-->
<!--                            d="M34.0938 5.24854C18.4399 5.24854 5.75 17.9385 5.75 33.5923C5.75 49.2461 18.4399 61.936 34.0938 61.936C41.8983 61.936 48.9662 58.7816 54.0919 53.6782C54.1056 53.6638 54.1194 53.6497 54.1335 53.6356C54.1476 53.6214 54.1619 53.6075 54.1763 53.5937C59.2817 48.4678 62.4375 41.3986 62.4375 33.5923C62.4375 17.9385 49.7476 5.24854 34.0938 5.24854ZM59.3715 55.3381C64.3985 49.4999 67.4375 41.901 67.4375 33.5923C67.4375 15.177 52.509 0.248535 34.0938 0.248535C15.6785 0.248535 0.75 15.177 0.75 33.5923C0.75 52.0075 15.6785 66.936 34.0938 66.936C42.4006 66.936 49.998 63.8984 55.8357 58.8733L71.979 75.0167C72.9553 75.993 74.5382 75.993 75.5145 75.0167C76.4909 74.0404 76.4909 72.4574 75.5145 71.4811L59.3715 55.3381ZM36.5938 21.8437C36.5938 20.463 35.4745 19.3437 34.0938 19.3437C32.713 19.3437 31.5938 20.463 31.5938 21.8437V31.0937H22.3438C20.963 31.0937 19.8438 32.213 19.8438 33.5937C19.8438 34.9744 20.963 36.0937 22.3438 36.0937H31.5938V45.3437C31.5938 46.7244 32.713 47.8437 34.0938 47.8437C35.4745 47.8437 36.5938 46.7244 36.5938 45.3437V36.0937H45.8438C47.2245 36.0937 48.3438 34.9744 48.3438 33.5937C48.3438 32.213 47.2245 31.0937 45.8438 31.0937H36.5938V21.8437Z"-->
<!--                            fill="white"-->
<!--                        />-->
<!--                    </svg>-->

<!--                    <strong-->
<!--                        v-if="imagesCount > 0"-->
<!--                        class="room__image-count flex items-center justify-center bg-blue-900 bg-opacity-75 text-26 font-bold text-white tablet:text-2xl mob:text-xl"-->
<!--                    >-->
<!--                        + {{ imagesCount }}-->
<!--                    </strong>-->
<!--                </span>-->
            </a>

            <div class="room-lightgallery hidden">
                <a
                    v-for="(item, idx) in room.gallery"
                    :key="idx"
                    :href="item.image_900_600"
                >
                    <img :src="item.image_380_380" :alt="room.type">
                </a>
            </div>
        </template>

        <div class="room__content p-10 xl:px-0 md:py-8 sm:py-4">
            <h3
                v-if="room.type && room.type"
                class="room__content-item text-26 tablet:text-2xl mob:text-xl"
            >
                {{ room.type }}
            </h3>
            <p class="room__content-item text-gray-300 sm:text-sm">Информация о каюте:</p>
            <p v-if="room.deck" class="room__content-item sm:text-sm">Палуба - {{ room.deck }}</p>
            <ReadMore
                v-if="room.desc"
                class="room__content-item text-lg leading-snug tablet:text-base leading-snug"
                :desc="room.desc"
            />
            <p v-else class="room__content-item text-lg tablet:text-base">Нет описания</p>
        </div>
    </div>
</template>

<script>
    import ReadMore from '@/components/base/readmore/ReadMore';

    export default {
        name: "ShipCabin",
        components: { ReadMore },
        props: {
            room: {
                type: Object,
                required: true,
            },
        },
        computed: {
            imagesCount() {
                return (this.room.gallery && this.room.gallery.length - 1 > 0) ? this.room.gallery.length - 1 : 0;
            },
        },
        methods: {
            onImageClick() {
                const $el = this.$el;
                const galleryWrap = $el.querySelector('.room-lightgallery');
                if ($el && galleryWrap) {
                    const link = galleryWrap.querySelector('a:first-child > img');
                    if (link) link.click();
                }
            },
            initLightgallery() {
                const $el = this.$el;
                const galleryWrap = $el.querySelector('.room-lightgallery');
                if ($el && galleryWrap) {
                    window.lightGallery(galleryWrap, { download: false });
                }
            },
        },
        mounted() {
            this.initLightgallery();
        },
    };
</script>

<style lang="scss" scoped>
    .room {
        &__image {
            flex: 0 1 47.8%;
            align-self: flex-start;

            &:after {
                content: '';
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: all .3s var(--custom-transition);
                @apply bg-black-400 bg-opacity-25;
            }

            &:hover {
                &:after {
                    opacity: 1;
                }
            }

            img {
                position: relative;
                z-index: 0;
            }

            &-count {
                width: 76px;
                height: 76px;
            }
        }

        &__content {
            flex: 1;

            &-item {
                line-height: 1.2;
                margin: 0 0 6px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    @screen xxl {
        .room {
            @apply p-4 pb-0 border-2 border-gray-50 rounded-sm;

            &__content,
            &__image {
                flex: 0 1 100%;
            }

            &__image {
                max-width: 380px;
            }
        }
    }

    @screen xs {
        .room {
            &__image {
                flex: 0 1 100%;
            }
        }
    }
</style>
