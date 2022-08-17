<template>
    <div class="choosed-cabin h-full flex flex-wrap rounded-sm overflow-hidden  mb-15 md:pb-7 md:mb-7">
        <template v-if="cabin.gallery && cabin.gallery.length > 0">

                <a
                    class="choosed-cabin__image relative rounded-sm overflow-hidden"
                    href="#"
                    @click.prevent="onImageClick"
                >
                    <img :src="getImage" :alt="getTitle" class="w-full h-full object-cover">

                    <span class="m-0 z-2 absolute bottom-0 left-5 right-0 flex items-center justify-between">
                    <svg
                        class="choosed-cabin__image-icon my-4 mr-7"
                        width="44" height="44"
                        viewBox="0 0 77 76" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd" clip-rule="evenodd"
                            d="M34.0938 5.24854C18.4399 5.24854 5.75 17.9385 5.75 33.5923C5.75 49.2461 18.4399 61.936 34.0938 61.936C41.8983 61.936 48.9662 58.7816 54.0919 53.6782C54.1056 53.6638 54.1194 53.6497 54.1335 53.6356C54.1476 53.6214 54.1619 53.6075 54.1763 53.5937C59.2817 48.4678 62.4375 41.3986 62.4375 33.5923C62.4375 17.9385 49.7476 5.24854 34.0938 5.24854ZM59.3715 55.3381C64.3985 49.4999 67.4375 41.901 67.4375 33.5923C67.4375 15.177 52.509 0.248535 34.0938 0.248535C15.6785 0.248535 0.75 15.177 0.75 33.5923C0.75 52.0075 15.6785 66.936 34.0938 66.936C42.4006 66.936 49.998 63.8984 55.8357 58.8733L71.979 75.0167C72.9553 75.993 74.5382 75.993 75.5145 75.0167C76.4909 74.0404 76.4909 72.4574 75.5145 71.4811L59.3715 55.3381ZM36.5938 21.8437C36.5938 20.463 35.4745 19.3437 34.0938 19.3437C32.713 19.3437 31.5938 20.463 31.5938 21.8437V31.0937H22.3438C20.963 31.0937 19.8438 32.213 19.8438 33.5937C19.8438 34.9744 20.963 36.0937 22.3438 36.0937H31.5938V45.3437C31.5938 46.7244 32.713 47.8437 34.0938 47.8437C35.4745 47.8437 36.5938 46.7244 36.5938 45.3437V36.0937H45.8438C47.2245 36.0937 48.3438 34.9744 48.3438 33.5937C48.3438 32.213 47.2245 31.0937 45.8438 31.0937H36.5938V21.8437Z"
                            fill="white"
                        />
                    </svg>

                    <strong
                        v-if="imagesCount > 0"
                        class="choosed-cabin__image-count flex items-center justify-center bg-blue-900 bg-opacity-75 text-26 font-bold text-white tablet:text-2xl mob:text-xl"
                    >
                        + {{ imagesCount }}
                    </strong>
                </span>
                </a>


            <div class="choosed-cabin-lightgallery hidden">
                <a
                    v-for="(item, idx) in cabin.gallery"
                    :key="idx"
                    :href="item.image_900_600? item.image_900_600: item.image_url"
                >
                    <img :src="item.image_900_600? item.image_900_600: item.image_url" :alt="getTitle">
                </a>
            </div>
        </template>

        <div class="choosed-cabin__content">

            <template v-if="cabin.desc">
                <strong class="mb-2 block text-lg leading-1-2 font-medium uppercase">Описание</strong>
                <div
                    v-if="cabin.desc"
                    id="readmore-desc"
                    class="choosed-cabin-item m-0 word-wrap text-base font-normal leading-snug tablet:leading-snug"
                    :class="{ 'line-clamp-6 sm:line-clamp-3': descHidden }"
                    :style="{height: dynamicTextHeight}"
                    v-html="cabin.desc"
                ></div>
            </template>

            <button
                v-if="showDescToggler"
                type="button"
                class="button readmore-link cabin-desc-btn"
                :title="getReadMoreText + ' ' + cabin.title"
                @click="onReadMoreClick"
            >
                {{ getReadMoreText }}
            </button>

<!--            <h3-->
<!--                v-if="cabin.title"-->
<!--                class="choosed-cabin__content-item text-26 tablet:text-2xl mob:text-xl"-->
<!--            >-->
<!--                {{ getTitle }}-->
<!--            </h3>-->
<!--            <p v-if="cabin.type" class="choosed-cabin-item sm:text-sm">{{ cabin.type }}</p>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChoosedCabin",
        props: {
            cabin: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                descHidden: true,
                staticTextHeight: null,
                dynamicTextHeight: null,
            };
        },
        computed: {
            imagesCount() {
                return this.cabin.gallery && this.cabin.gallery.length - 1 > 0 ? this.cabin.gallery.length - 1 : 0;
            },
            getTitle() {
                return `Каюта № ${this.cabin.title}`;
            },
            showDescToggler() {
                return this.cabin.desc && this.cabin.desc.length > 60;
            },
            getReadMoreText() {
                return this.descHidden ? 'Показать описание' : 'Скрыть описание';
            },
            getImage(){
                const gallery = Object.values(this.cabin.gallery);
                return this.cabin.main_photo? this.cabin.main_photo: gallery[0];
            }

        },
        methods: {
            onImageClick() {
                const $el = this.$el;
                const galleryWrap = $el.querySelector(".choosed-cabin-lightgallery");

                if ($el && galleryWrap) {
                    const link = galleryWrap.querySelector("a:first-child > img");
                    if (link) link.click();
                }
            },
            initLightgallery() {
                const $el = this.$el;
                const galleryWrap = $el.querySelector(".choosed-cabin-lightgallery");

                if ($el && galleryWrap) {
                    window.lightGallery(galleryWrap, { download: false });
                }
            },
            onReadMoreClick() {
                this.descHidden = !this.descHidden;
                this.dynamicTextHeight = this.descHidden? this.staticTextHeight: 'auto';
            },
        },
        mounted() {
            this.initLightgallery();
            const $readMore = this.$el.querySelector('#readmore-desc');
            if ($readMore) {
                this.staticTextHeight = `${$readMore.clientHeight}px`;
                this.dynamicTextHeight = `${$readMore.clientHeight}px`;
            }
        },
    };
</script>

<style lang="scss" scoped>
    .choosed-cabin {
        &__image {
            flex: 0 1 37.2%;
            max-height: 360px;
            margin-right: 76px;

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

    @screen tablet {
        .choosed-cabin {
            &__image {
                margin-right: 3%;
            }
        }
    }

    @screen md {
        .choosed-cabin {
            &__image {
                flex: 0 1 100%;
                margin-right: 0;
                margin-bottom: 16px;
            }
        }
    }
</style>
