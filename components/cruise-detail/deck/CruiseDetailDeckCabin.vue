<template>
    <div class="cabin">
        <div class="cabin__image-col deck-table__col">
            <a
                v-if="cabin.image_210_200"
                class="cabin__image image-loop-hover block w-full h-full relative"
                href="#"
                @click.prevent="onImageClick"
            >
                <img
                    :src="cabin.image_210_200"
                    :alt="`Каюта № ${cabin.title}`"
                    width='120'
                    height='154'
                    class="w-full h-full object-cover xs:rounded-sm"
                >
            </a>

            <div class="cabin-lightgallery hidden">
                <template v-if="cabin.photos && cabin.photos.length > 0">
                    <a
                        v-for="(item, idx) in cabin.photos"
                        :key="`cabin-lightgallery-${idx}`"
                        :href="item.image_900_600? item.image_900_600: item.image_url"
                    >
                        <img :src="item.image_900_600? item.image_900_600: item.image_url" :alt="`Каюта № ${cabin.title}`">
                    </a>
                </template>
            </div>
        </div>

        <div class="cabin__title deck-table__col">
            <h3 v-if="cabin.title" class="m-0 mb-1 text-base leading-snug font-medium">{{ cabin.title }}</h3>
            <div v-if='cabin.desc' class='word-wrap text-sm leading-snug line-clamp-3 h-auto' v-html='cabin.desc'></div>
        </div>

        <div class="cabin__price cabin__price-adult deck-table__col deck-table__col--flex ">
            <span class="cabin__info">Тариф</span>

            <div class="xs:w-full">
                <p v-if="cabin.price_adult">
                    <span class="cabin__price-text">Взрослый: </span><br>
                    <span>от {{ cabin.price_adult | formatPrice }}</span>
                </p>
                <p v-if="cabin.price_child">
                    <span class="cabin__price-text">Ребенок: </span><br>
                    <span>от {{ cabin.price_child | formatPrice }}</span>
                </p>
                <p v-if="cabin.price_pensioner">
                    <span class="cabin__price-text">Пенсионер: </span><br>
                    <span>от {{ cabin.price_pensioner | formatPrice }}</span>
                </p>
<!--                <p v-if="cabin.price_foreigner">-->
<!--                    <span class="cabin__price-text">Иностранец</span><br>-->
<!--                    <span>{{ getFormattedPrice(cabin.price_foreigner) }}</span>-->
<!--                </p>-->
            </div>
        </div>

        <div class="cabin__cabins deck-table__col deck-table__free-cabins text-center deck-table__col--flex ">
            <span class="cabin__info">Свободные № кают</span>
            <span :class="['text-base font-medium', getCabinTextColor]">{{ getFreeCabins }}</span>
        </div>

        <div class="cabin__controls deck-table__col xs:mt-1">
            <nuxt-link
                class="cabin-btn button mb-3 border-2 border-red-400"
                :class="{ 'disabled': !hasFreeCabins }"
                :disabled="!hasFreeCabins"
                :to="{ path: getSlug }"
            >
                Выбрать каюту
            </nuxt-link>

            <button
                type="button"
                class="cabin-btn button button-transparent border-2 border-gray-100"
                @click="onSchemeWatchClick"
            >
                Показать каюту на&nbsp;схеме
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'CruiseDetailDeckCabin',
        props: {
            cabin: {
                type: Object,
                required: true,
            },
            deck: {
                type: Object,
                required: true,
            },
            selectedInDeckCabin: null,
        },
        data() {
            return {
                isReady: false,
                descHidden: true,
            };
        },
        computed: {
            ...mapGetters({
                getCruiseID: 'cart/getCruiseID',
            }),
            imagesCount() {
                return this.cabin.photos && this.cabin.photos.length - 1 > 0 ? this.cabin.photos.length - 1 : 0;
            },
            showDescToggler() {
                return this.cabin.desc && this.cabin.desc.length > 60;
            },
            hasFreeCabins() {
                return this.cabin.free_cabins && this.cabin.free_cabins >= 1;
            },
            getSlug() {
                return `/rechnye-kruizy/${this.$route.params.id}/vibor-kayutu/${this.getCruiseID}-${this.deck.id}-${this.cabin.id}`;
            },
            getCabinTextColor() {
                let color = 'text-red-500';
                let cabins = this.cabin.free_cabins;

                if (cabins > 1) {
                    color = 'text-green-400';
                }

                return color;
            },
            getFreeCabins() {
                let res = [];

                if (this.cabin && this.cabin.cabins.length > 0) {
                    this.cabin.cabins.forEach(cabin => {
                        if (cabin.status === 'free') res.push(cabin.number);
                    });
                }

                return res.length > 0 ? res.join(', ') : 'Нет свободных кают';
            }
        },
        methods: {
            onImageClick() {
                const gallery = this.getGalleryDOM();

                if (gallery) {
                    const img = gallery.querySelector('a:first-child > img');
                    if (img) img.click();
                }
            },
            initLightgallery() {
                const gallery = this.getGalleryDOM();
                if (gallery) window.lightGallery(gallery, { download: false });
            },
            getGalleryDOM() {
                const $el = this.$el;
                const gallery = $el.querySelector('.cabin-lightgallery');
                return gallery || null;
            },
            onSchemeWatchClick() {
                this.$emit('on-watch-scheme-clicked', true);

                let freeCabins = [];
                let sectorCabins = document.querySelectorAll('g[data-cabin]');

                if (this.cabin && this.cabin.cabins.length > 0) {
                    this.cabin.cabins.forEach(cabin => {
                        if (cabin.status === 'free') freeCabins.push(cabin.number);
                    });
                }

                sectorCabins.forEach( element => {
                    element.classList.remove('active');

                        if(freeCabins.length > 0){
                            let numberCabin = element.getAttribute('data-cabin');
                            let freeCabin = freeCabins.find( item => item == numberCabin);

                            if(freeCabin) element.classList.add('active');
                        };
                });

            },
        },
        watch: {
            selectedInDeckCabin(val) {
                if (val) {
                    const cabins = this.cabin.cabins;
                    // приводить все к числу нельзя, тк иногда попадаются люксовые номера с номером ПЕТР ПЕРВЫЙ, ЕЛИЗАВЕТА и тд
                    const hasCabin = cabins.filter(item => item.number == val).length > 0;
                    if (hasCabin && this.hasFreeCabins) this.$router.push({ path: this.getSlug });
                }
            }
        },
        mounted() {
            this.initLightgallery();
        },
    };
</script>

<style lang="scss" scoped>
    .cabin {
        &__image {
            &:after {
                content: '';
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                background-size: 40px;
                transition: all .25s ease;
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
        }

        &__price {
            @apply text-lg leading-none font-bold;

            &-text {
                @apply text-sm font-normal leading-snug;
            }

            &--old {
                @apply text-red-500 font-medium text-sm line-through;
            }

            p {
                margin: 0 0 8px;

                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }

        &-btn {
            @apply bg-red-500 py-3 px-4 w-full text-base leading-snug;
            border-color: inherit;

            &:hover,
            &:focus,
            &:active {
                @apply bg-blue-300;
            }

            &.button-transparent {
                @apply bg-transparent text-black-400;

                &:hover,
                &:focus,
                &:active {
                    @apply bg-blue-300 text-white border-blue-300;
                }
            }
        }

        &__info {
            @apply hidden mr-4 text-sm text-gray-300 font-normal xl:block;
        }
    }

    @screen xs {
        .cabin {
            padding: 0;
            border: 0;

            .cabin__image-col {
                flex: 0 1 130px !important;
                height: 130px;
                @apply mb-0 mr-7;
            }

            .cabin__title {
                width: calc(100% - 160px); // 130 + 30
                flex: 0 1 auto !important;
                padding: 0;
                margin: 0;
                align-self: center;
            }

            .cabin__deck {
                @apply mt-5;
            }

            &__info {
                @apply text-base text-gray-300 font-medium;
            }

            .cabin__price {
                .cabin__info {
                    display: none;
                    @apply text-sm leading-loose;
                }

                p {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    @apply mb-3 last:mb-0;

                    span {
                        @apply text-black-400 text-lg font-bold;

                        &:first-child {
                            @apply mr-4 text-base text-gray-300 font-medium;
                        }
                    }
                }

                br {
                    display: none;
                }
            }
        }
    }

    @screen mob {
        .cabin {
            .cabin__image-col {
                max-width: 100%;
                flex: 0 1 100% !important;
                height: auto;
                max-height: 355px;
                margin: 0 0 16px;
            }

            .cabin__title {
                width: 100%;
            }
        }
    }
</style>
