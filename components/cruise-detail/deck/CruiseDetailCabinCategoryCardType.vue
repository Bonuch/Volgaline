<template>
    <div class="cabin-category-card flex tablet:flex-col border border-gray-70 tablet:bg-gray-700 tablet:border-0 tablet:rounded-xl tablet:mb-5"
         v-click-outside="closeTooltip"
    >
        <div class='cabin-category-card-heading py-5 px-8 tablet:flex tablet:flex-col-reverse tablet:flex-start tablet:px-5 mob:px-4 relative border-r border-gray-60 tablet:border-none w-[calc(33.3%-50px)] tablet:w-full'>
            <div
                v-if="cabin.photos && cabin.photos.length > 0"
                class="cabin-category-card-heading-image hidden tablet:block"
            >
                <a
                    href="#"
                    class="aspect-w-1 aspect-h-1 block bg-gray-200 image-loop-hover image-loop-hover--small overflow-hidden tablet:rounded-md"
                    @click.prevent="onImageClick"
                >
                    <img
                        :src="getGalleryImage(cabin.photos[0])"
                        :alt="cabin.title"
                        class="w-full h-full object-cover"
                        width='74'
                        height='74'
                    >
                </a>
            </div>

            <div class="tablet:flex-1-1 tablet:flex tablet:flex-col tablet:mb-7">
                <div
                    v-if="cabin.photos && cabin.photos.length > 0"
                    class="cabin-category-card-gallery flex flex-wrap -mx-1 mb-4 overflow-hidden tablet:hidden"
                >
                    <div
                        v-for="(cabinGalleryItem, idx) in cabin.photos"
                        :key="`cabins-gallery-item-${idx}`"
                        :data-src="cabinGalleryItem.full"
                        class="w-1/2 px-1"
                        :class="{ 'hidden': idx > 3 }"
                    >
                        <a
                            :href="getGalleryImage(cabinGalleryItem)"
                            class="aspect-w-2 aspect-h-1 block bg-gray-200 image-loop-hover image-loop-hover--small overflow-hidden"
                        >
                            <img
                                :src="getGalleryImage(cabinGalleryItem)"
                                :alt="cabin.title"
                                class="w-full h-full object-cover"
                                width='60'
                                height='60'
                            >
                        </a>
                    </div>
                </div>
                <h3 v-if="cabin.title" class=" m-0 mb-3 text-black-400 text-base cabin-category-card-title h-auto line-clamp-4 tablet:text-black-400 tablet:mb-5 tablet:text-blue-700 tablet:order-4">
                    {{ cabin.title }}
                </h3>
                <div v-if="deck.title" class="hidden mb-2 text-sm leading-tight cabin-category-card-subtitle cabin-category-card-subtitle-h tablet:block tablet:mb-2 tablet:text-xs tablet:font-medium tablet:order-1">{{ deck.title }}</div>
                <div v-if='cabin.desc'
                     class='cabin-category-card-desc word-wrap text-sm leading-snug h-auto tablet:text-xs tablet:font-medium tablet:order-5'
                     v-html='cabin.desc'
                     :class="{ 'hidden': descHidden }"
                ></div>

                <div class="hidden items-center mb-5 tablet:order-4 text-xs text-red-500 tablet:flex">
                    <button
                        v-if="showDescToggler"
                        type="button"
                        class=" button readmore-link cabin-desc-btn text-xs text-red-500"
                        :title="getReadMoreText + ' ' + cabin.desc"
                        @click="onReadMoreClick"
                    >
                        {{ getReadMoreText }}
                    </button>
                    <div class='p-0 pl-2.5'>
                        <svg
                            class='custom-transition'
                            :class="{'transform rotate-180': !descHidden}"
                            width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path class='fill-current'
                                  d='M9.58565 1.46852C9.84441 1.14508 9.79197 0.673106 9.46852 0.414349C9.14507 0.155592 8.67311 0.208033 8.41435 0.531479L9.58565 1.46852ZM5 6L4.41435 6.46852C4.55668 6.64643 4.77216 6.75 5 6.75C5.22784 6.75 5.44332 6.64643 5.58565 6.46852L5 6ZM1.58565 0.531479C1.32689 0.208032 0.854925 0.155591 0.531479 0.414348C0.208032 0.673106 0.155591 1.14507 0.414348 1.46852L1.58565 0.531479ZM8.41435 0.531479L4.41435 5.53148L5.58565 6.46852L9.58565 1.46852L8.41435 0.531479ZM5.58565 5.53148L1.58565 0.531479L0.414348 1.46852L4.41435 6.46852L5.58565 5.53148Z'
                                  fill='#5A6472' />
                        </svg>
                    </div>
                </div>


                <div class="tablet:hidden">
                    <popper trigger="click"
                            class="w-full"
                            :options="{
                           placement: 'auto',

                   }">
                        <div class="scheme-tooltip">
                            <h3 v-if="cabin.title"
                                class="m-0 mb-3 text-blue-700 text-lg cabin-category-card-title cabin-category-card-title-h h-auto line-clamp-3 tablet:text-black-400 relative z-10">
                                {{ cabin.title }}
                            </h3>
                            <div v-if='cabin.desc'
                                 class='word-wrap text-sm leading-snug h-auto tablet:hidden relative z-10'
                                 v-html='cabin.desc'></div>
                            <div class="popper__arrow"></div>
                        </div>
                        <button
                            slot="reference"
                            type="button"
                            class="text-blue-700 text-sm border-b border-blue-700 border-dotted"
                        >Подробнее
                        </button>

                    </popper>
                </div>
                <div class="mt-auto text-red-500 text-sm leading-tight hidden tablet:block tablet:mb-4 tablet:text-xs tablet:order-2">
                    <template v-if='getFreeCabins.length > 0'>Свободных кают - {{ getFreeCabins.length }}</template>
                    <template v-else>
                        <span class='text-red-500'>Нет свободных кают</span>
                    </template>
                </div>
                <div class="hidden tablet:flex items-center mb-4 tablet:order-3">
                    <div
                        class='cruise-deck-scheme-marking-block'
                        :class="getDeckMarkingColor"
                    >
                    </div>
                    <div
                        class="text-black-900 text-xs font-normal"
                        v-for="(item, indexIdx) in cabin.cabins.slice(0,1)"
                        :key="indexIdx"
                    >
                        {{item.number_seats}}-местные каюты
                    </div>
                </div>
            </div>
        </div>

<!--        <div class='h-1 w-full border-b border-gray-70'></div>-->

<!--        <div class='flex-1-1 flex py-5 px-8 overflow-hidden tablet:pb-7 tablet:px-5 mob:px-4'>-->
            <div class='text-base leading-1-1 tablet:hidden py-5 px-8 tablet:pb-7 tablet:px-5 mob:px-4 border-r border-gray-60 w-[calc(33.3%+25px)] tablet:w-full'>
                <template v-if='getFreeCabins.length > 0'>
                    <div class='mb-4 text-base cabin-category-card-subtitle font-medium tablet:font-normal'>Свободные каюты:</div>
                    <div class='flex flex-wrap -mx-1.5'>

                        <template
                            v-for='(freeCabin, freeCabinIdx) in cabin.cabins'
                        >
                            <button v-if="freeCabin.status === 'free'"
                                    :key="freeCabinIdx"
                                    type="button"
                                    class="cabin-category-card-cabin text-white py-1.5 px-1.5 ml-1.5 mb-3 text-base leading-none font-medium border border-gray-100 rounded-sm"
                                    :class="getColorByCabinNumberSeats(freeCabin)"
                                    @click="handleChooseCabinClick(freeCabin.number)"
                            >
                                {{ freeCabin.number }}
                            </button>

                            <div
                                v-else
                                :key='freeCabinIdx'
                                class='cabin-category-card-cabin disabled py-1.5 px-1.5 mx-1.5 mb-3 text-green-600 text-base leading-none font-medium border border-gray-100 rounded-sm'
                            >
                                {{ freeCabin.number }}
                            </div>
                        </template>

                    </div>
                </template>

                <template v-else>
                    <div class='cabin-category-card-subtitle mb-4 text-base text-red-500'>Нет свободных кают</div>
                    <div class='flex flex-wrap -mx-1.5'>
                        <div
                            v-for='(freeCabin, freeCabinIdx) in cabin.cabins'
                            :key='freeCabinIdx'
                            class='cabin-category-card-cabin disabled py-1.5 px-1.5 mx-1.5 mb-3 text-green-600 text-base leading-none font-medium border border-gray-100 rounded-sm'
                        >
                            {{ freeCabin.number }}
                        </div>
                    </div>
                </template>
            </div>

            <div class='py-5 px-8 tablet:pb-7 tablet:px-5 mob:px-4 w-[calc(33.3%+25px)] tablet:w-full'>
                <template v-if="getPrices">
                    <div class="cruise-detail-cabin-card-type">
                        <div class='mb-4 text-base cabin-category-card-subtitle hidden tablet:block tablet:mb-3 tablet:text-xs tablet:font-medium'>Размещение</div>

                        <div
                            v-for="(price, priceIdx) in getPrices"
                            :key="priceIdx"
                            class='flex items-center justify-between mb-3 last:mb-0'
                        >
                            <span class='w-24 mr-3 text-sm leading-tight tablet:text-xs sm:w-1/2'>{{ price.number_seats }}-местное размещение: </span>
                            <span v-if="price.prices && price.prices.adult" class='text-base leading-tight font-medium tablet:text-xs tablet:leading-tight'>
                            от {{ price.prices.adult | formatPrice }}
                        </span>
                        </div>

                        <p class='items-center mt-7 text-sm text-gray-300 tablet:hidden'>
                            Стоимость за&nbsp;человека в&nbsp;зависимости от&nbsp;количества человек в&nbsp;каюте.
                        </p>
                    </div>

                </template>

                <nuxt-link
                    class="cabin-category-card-booking button hidden w-full py-3 px-3 mt-4 bg-transparent text-red-500 text-base leading-1-1 font-medium border border-red-500 rounded-sm tablet:block"
                    :class="{ 'disabled': !hasFreeCabins }"
                    :disabled="!hasFreeCabins"
                    :to="{ path: getSlug }"
                >
                    Выбрать каюту
                </nuxt-link>
            </div>

<!--        </div>-->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { poperHelpers } from "@/mixins/poper-helper";
import Tooltip from "@/components/tooltip/Tooltip";
import Popper from 'vue-popperjs';

export default {
    name: 'CruiseDetailCabinCategoryCardType',
    components: {Tooltip, 'popper': Popper},
    mixins: [poperHelpers],
    data() {
        return {
            isShow: false,
            descHidden: true,
        }
    },
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
    computed: {
        ...mapGetters({
            getCruiseID: 'cart/getCruiseID',
        }),
        hasFreeCabins() {
            return this.cabin.free_cabins && this.cabin.free_cabins >= 1;
        },
        getSlug() {
            return `/rechnye-kruizy/${this.$route.params.id}/vibor-kayutu/${this.getCruiseID}-${this.deck.id}-${this.cabin.id}`;
        },
        getDeckMarkingColor() {
            let color = '';

            const number = this.cabin.cabins.map(cabin => {
                return cabin.number_seats
            });
            for (let i = 1; i < number.length; i++) {
                if(number[i] === 1) {
                    color = 'bg-orange-500';
                } else if (number[i] === 2) {
                    color = 'bg-blue-700';
                } else if (number[i] === 3) {
                    color = 'bg-red-600';
                }else {
                    color = 'bg-black-300';
                }
            }
            return color;
        },
        getFreeCabins() {
            let res = [];

            if (this.cabin.cabins && this.cabin.cabins.length > 0) {
                this.cabin.cabins.forEach(cabin => {
                    if (cabin.status === 'free') {
                        res.push(cabin.number);
                    }
                });
            }

            return res;
        },
        getPrices() {
            return this.cabin.tariffs_prices && this.cabin.tariffs_prices.length > 0 ? this.cabin.tariffs_prices.reverse() : null
        },
        getReadMoreText() {
            return this.descHidden ? 'Подробное описание каюты' : 'Скрыть описание';
        },
        showDescToggler() {
            return this.cabin.desc && this.cabin.desc.length > 60;
        },
    },
    methods: {
        toggleTooltip() {
            this.isShow = !this.isShow
        },
        closeTooltip() {
            this.isShow = false
        },
        initLightgallery() {
            const galleryWrap = this.getGalleryDOM();

            if (galleryWrap) {
                window.lightGallery(galleryWrap, { download: false, selector: 'a' });
            }
        },
        getColorByCabinNumberSeats(cabin) {
            let color = 'bg-orange-500';
            switch (cabin.number_seats) {
                case 2:
                    color = 'bg-blue-700';
                    break;
                case 3:
                    color = 'bg-red-600';
                    break;
                case 4:
                    color = 'bg-black-300';
                    break;
            }
            return { [color]: true };
        },
        handleChooseCabinClick(cabin) {
            this.$emit('on-choose-cabin-click', cabin);
        },
        getGalleryImage(item) {
            return item.image_900_600 ? item.image_900_600: item.image_url;
        },
        onImageClick() {
            const gallery = this.getGalleryDOM();

            if (gallery) {
                const img = gallery.querySelector('a:first-child > img');
                if (img) img.click();
            }
        },
        getGalleryDOM() {
            const $el = this.$el;
            const gallery = $el.querySelector('.cabin-category-card-gallery');
            return gallery || null;
        },
        changeColorCabin() {
            const $el = this.$el
            const color = $el.querySelector('.cabin-category-card-cabin');
            let cabin = cabin.cabins.number_seats;

            if( cabin.length === 1 ) {
                color.addClass('.bg-black-900')
            }
            if( cabin.length === 2 ) {
                color.addClass('.bg-red-400')
            }
            if( cabin.length === 3 ) {
                color.addClass('.bg-green-900')
            }
            if( cabin.length === 4 ) {
                color.addClass('.bg-black-900')
            }
        },
        onReadMoreClick() {
            this.descHidden = !this.descHidden;
            this.dynamicTextHeight = this.descHidden? this.staticTextHeight: 'auto';
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
.cruise-detail-cabin-card-type {
    max-width: 281px;
    margin: 0 auto;
}

.scheme-tooltip {
    position: absolute;
    max-width: 900px;
    width: 900px;
    background-color: #FFFFFF;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    box-shadow: 0px 4px 50px rgba(72, 72, 72, 0.25);
    padding: 15px 20px 50px;
    z-index: 2;
}

.scheme-tooltip[x-placement^="top"] .popper__arrow {
    border-width: 20px 45px 0 45px;
    border-radius: 10px;
    border-color: #ffffff transparent transparent transparent;
    left: calc(50% - 50px);
    bottom: -15px;
    margin-top: 0;
    margin-bottom: 0;
}
.scheme-tooltip[x-placement^="bottom"] .popper__arrow {
    border-width: 0 45px 20px 45px;
    border-radius: 10px;
    border-color: transparent transparent #ffffff transparent;
    left: calc(50% - 50px);
    top: -15px;
    margin-top: 0;
    margin-bottom: 0;
}
.scheme-tooltip[x-placement^="right"] .popper__arrow {
    border-width: 45px 20px 45px 0;
    border-radius: 10px;
    border-color: transparent #ffffff transparent transparent;
    left: -15px;
    top: 26%;
    margin-top: 0;
    margin-bottom: 0;
}
.scheme-tooltip[x-placement^="left"] .popper__arrow {
    border-width: 45px 0 45px 20px;
    border-radius: 10px;
    border-color: transparent transparent transparent #ffffff;
    right: -15px;
    top: 29%;
    margin-top: 0;
    margin-bottom: 0;
}
.scheme-tooltip[x-placement^="top"] {
    top: -20px !important;
}
.scheme-tooltip[x-placement^="bottom"] {
    top: 20px !important;
}
.scheme-tooltip[x-placement^="right"] {
    left: 20px !important;
}
.scheme-tooltip[x-placement^="left"] {
    left: -20px !important;
}

.popper__arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
}

.cabin-category-card {
    &-heading {
        min-height: 58px;

        &-image {
            width: 74px;
        }
    }

    &-cabin {
        min-width: 34px;
        text-align: center;
        transition: all .25s var(--custom-transition);

        &:hover,
        &:focus {
            @apply bg-green-600 text-white;
        }

        &.disabled {
            @apply text-gray-300;
        }
    }

    &-title {
        @apply leading-1-1 font-medium;
        //min-height: 3.8rem;
        &-h {
            min-height: 0;
        }
    }
    &-booking {
        &:hover,
        &:focus {
            @apply text-blue-300 border-blue-300;
        }
    }
}

.readmore-link {
    border-bottom: 1px dashed #BC002D;
    transition:  0.3s;
    &:hover {
        border-bottom: none;
        transition:  0.3s;
    }
    &:focus {
        @apply text-red-500;
    }
}

.cabin-desc-btn {
    max-width: 168px;
}

.cruise-deck-scheme-marking-block {
    width: 20px;
    height: 20px;
    @apply rounded-sm mr-2.5;
}

@screen xxl {
    .scheme-tooltip {
        position: absolute;
        width: 700px;
        background-color: #FFFFFF;
        border: 1px solid #EFEFEF;
        border-radius: 10px;
        box-shadow: 0px 4px 50px rgba(72, 72, 72, 0.25);
        padding: 15px 20px 50px;
        z-index: 2;
    }
}

@screen tablet {
    .cruise-detail-cabin-card-type {
        margin: 0;
        max-width: 100%;
    }
    .cabin-category-card {
        &-title {
            min-height: 1rem;
        }
        &-heading {
            &-image {
                width: 80px;
            }
        }
        &-subtitle {
            &-h {
                min-height: 0;
            }
        }
    }
}
</style>
