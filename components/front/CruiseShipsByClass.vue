<template>
    <div class="cruise-ships-by-class relative wrapper wrapper-1410 overflow-hidden">
        <div v-if="loading" class="absolute z-10 left-0 top-0 w-full h-full bg-white bg-opacity-50 flex">
            <Preloader class="m-auto"/>
        </div>

        <div class="cruise-ships pt-10 overflow-hidden">
            <div class="mb-10 flex items-center justify-between">
                <div class="w-[calc(100%-104px)]">
                    <div class="xl:hidden flex justify-between items-center">
                        <div
                            class="ship-classes-search"
                            v-if="shipClasses && shipClasses.length > 0"
                        >
                            <ul class="ship-classes-search-wrap flex flex-wrap items-center xl:justify-around m-0">
                                <li
                                    v-for="(item, idx) in shipClasses"
                                    :key="`shipClasses-${item.id}`"
                                    class="ship-classes-search-item xs:w-full mb-0"
                                >
                                    <button
                                        type="button"
                                        class="ship-classes-search-link py-3.5 border border-gray-90 rounded flex items-center justify-center custom-transition text-base font-medium extra:text-sm"
                                        :class="{ 'active': idx === 0}"
                                        @click="getShipsByClass(item, $event)"
                                    >
                                        {{item.title}}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="hidden xl:flex">
                        <div class="w-1/2 tablet:w-full">
                            <v-select
                                class="custom-select custom-select-price custom-slider-front"
                                label="title"
                                :searchable="false"
                                placeholder="Выберите тип теплохода"
                                :options="shipClasses"
                                v-model="classSelect"
                                @input="getShipsByClass"
                            >
                                <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24755 3.9395C2.65806 3.57004 3.29035 3.60331 3.65981 4.01382L7.10193 7.8384L10.5441 4.01383C10.9135 3.60331 11.5458 3.57004 11.9563 3.9395C12.3668 4.30895 12.4001 4.94124 12.0306 5.35175L7.84522 10.0022C7.65558 10.2129 7.38542 10.3333 7.10193 10.3333C6.81844 10.3333 6.54828 10.2129 6.35864 10.0022L2.17322 5.35175C1.80376 4.94124 1.83704 4.30895 2.24755 3.9395Z" fill="#1D1F20"/>
                        </svg>
                    </span>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>

                <div class="cruise-ships-by-class-buttons">
                    <button
                        type="button"
                        class="swiper-button swiper-button-prev m-0 flex items-center justify-center text-white bg-blue-300"
                    >
                        <svg width="12" height="19" viewBox="0 0 12 19" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                fill="white"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        class="swiper-button swiper-button-next m-0 flex items-center justify-center text-white bg-blue-300"
                    >
                        <svg class="transform rotate-180" width="12" height="19" viewBox="0 0 12 19" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.4588 0.662088C12.1977 1.48311 12.1312 2.74769 11.3102 3.48661L4.98969 9.17502L11.3102 14.8634C12.1312 15.6023 12.1977 16.8669 11.4588 17.6879C10.7199 18.509 9.45531 18.5755 8.63429 17.8366L0.66207 10.6616C0.240643 10.2823 0 9.74199 0 9.17502C0 8.60804 0.240643 8.06771 0.66207 7.68843L8.63429 0.513429C9.45531 -0.225489 10.7199 -0.158932 11.4588 0.662088Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="swiper-container pb-9">
                <div class="swiper-wrapper">
                    <div
                        v-for="(shipClass, IndexIdx) in ships"
                        :key="IndexIdx"
                        class="swiper-slide cruise-ships-slide overflow-hidden custom-transition rounded-sm hover:bg-blue-50"
                    >
                        <span class='text-base font-bold text-blue-250 mb-2.5'>{{IndexIdx}}</span>
                        <ShipTable :itemShip="shipClass"/>
                    </div>
                </div>


            </div>
            <div v-if="ships && Object.keys(ships) < 1" class="px-5 text-red-700">
                <p>Корабли данного класса отсутствуют</p>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper/bundle";
import ShipTable from '@/components/front/ShipTable';

export default {
    name: "CruiseShipsByClass",
    components: {
        ShipTable,
        Preloader: () => import("@/components/base/Preloader")
    },
    props: {
      ships: {
          required: true
      },
    },
    data() {
        return {
            shipClasses: [
                {
                    id: 1,
                    title: 'Эконом'
                },
                {
                    id: 4,
                    title: 'Стандарт'
                },
                {
                    id: 2,
                    title: 'Комфорт'
                },
                {
                    id: 5,
                    title: 'Премиум'
                },
                {
                    id: 3,
                    title: 'Люкс'
                },
            ],
            bannersSwiper: null,
            classSelect: {
                id: 1,
                title: 'Эконом'
            },
            loading: false
        };
    },
    methods: {
        async getShipsByClass( item, event = null) {
            this.loading = true;

            try{
                const { data } = await this.$axios.get(`/ships-by-class?class_id=${item.id}`);

                this.$emit('shipsByClasses', data);

                this.$nextTick(() => {
                    this.bannersSwiper.update();
                    if(event) this.changeTab(event.target);
                });
            } catch (ex) {
                console.log('cant fetch ships by class: ' + ex);
            }

            this.loading = false;
        },
        initSwiper() {
            const $el = this.$el;
            const container = $el.querySelector('.swiper-container');
            const pagination = $el.querySelector('.round-pagination');
            const buttons = $el.querySelectorAll('.swiper-button');
            let prev = buttons[0];
            let next = buttons[1];

            if ($el) {
                const bannersSwiper = new Swiper(container, {
                    slidesPerView: "auto",
                    autoHeight: false,
                    navigation: {
                        prevEl: prev,
                        nextEl: next,
                    },
                    pagination: {
                        el: pagination,
                        clickable: true,
                    },
                    breakpoints: {
                        641: {
                            slidesPerView: 2,
                            slidesPerColumn: 1,
                            slidesPerGroup : 2,
                            spaceBetween: 20,
                        },
                        861: {
                            slidesPerView: 3,
                            slidesPerColumn: 1,
                            slidesPerGroup : 3,
                            spaceBetween: 20,
                        },
                        1281: {
                            slidesPerView: 4,
                            slidesPerColumn: 1,
                            slidesPerGroup : 4,
                            spaceBetween: 20,
                        },
                    },
                });

                this.bannersSwiper = bannersSwiper;
            }
        },
        changeTab(tab){
            const $el = this.$el;
            const tabs = $el.querySelectorAll('.ship-classes-search-link');

            tabs.forEach( item => {
                item.classList.remove('active');
            });

            tab.classList.add('active');

            const wrapper = $el.querySelector('.swiper-wrapper');
            wrapper.style.transform = 'translate3d(0px, 0px, 0px)';
        }
    },
    mounted() {
        this.initSwiper();
    },
};
</script>

<style lang="scss" scoped>

.swiper-wrapper {
    flex-direction: row !important;
}

.custom-slider-front {
    height: 56px;
    @apply bg-gray-120 text-black-400 rounded-sm;
}

.ship-classes-search {
    &-item {
        @apply pr-5;
    }

    &-link {
        box-shadow: 0 4px 35px rgba(36, 58, 101, 0.1);
        cursor: pointer;
        @apply rounded-sm px-4 py-3;

        &:hover,
        &:focus,
        &:active {
            @apply bg-blue-50;
        }
    }

    .active {
        @apply bg-blue-300 text-white;
    }
}

.cruise-ships {
    &-by-class-buttons {
        display: flex;
        align-items: center;
    }

    &::v-deep {
        .swiper-container {
            overflow: visible !important;
        }

        .swiper-slide {
            height: auto;
            display: flex;
            flex-direction: column;
            padding: 4px;
            margin-bottom: 15px;
        }

        .swiper-button {
            position: static;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            transition: all .3s var(--custom-transition);
            @apply rounded-sm;

            &:hover,
            &:focus {
                @apply bg-orange-400;
            }

            svg {
                width: 7px;
                height: 14px;
            }

            &:before,
            &:after {
                display: none;
            }

            &-prev {
                margin-right: 24px;
            }
        }
    }

    &-image {
        mix-blend-mode: normal;

        img {
            max-height: 158px;
        }
    }

    &-content {
        flex: 1;
        border: 1px solid #E1E1E1;
        border-top: 0;
        @apply px-8 py-5;

        p {
            font-size: 17px;
        }
    }
}

@screen md {
    .cruise-ships {
        &-image {
            overflow: hidden;
            max-height: 374px;

            img {
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

@screen sm {
    .cruise-ships {
        &-image {
            img {
                min-height: 370px;
            }
        }

        .swiper-slide {
            width: 63%;
            margin-right: 20px;
        }
    }
}

@screen sm {
    .cruise-ships {
        &-image {
            img {
                min-height: 0;
            }
        }
    }
}
</style>
