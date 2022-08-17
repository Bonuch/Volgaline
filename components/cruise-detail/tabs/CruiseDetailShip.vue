<template>
    <div class="cruise-detail-tab-content cruise-detail-ship">
        <h3 class="cruise-detail-tab-content__title sm:px-4">
            Ваш теплоход
            <nuxt-link v-if="content.title" :to="getShipSlug(content.slug)">
                «{{ content.title }}»
            </nuxt-link>
        </h3>

        <div
            class="flex xl:flex-wrap md:hidden"
        >
            <div class='cruise-detail-ship-desc'>
                <ReadMore
                    v-if="content.desc"
                    class="ship-description text-base leading-normal word-wrap"
                    :desc="content.desc"
                    readmore-button-title-open="Подробнее о теплоходе"
                    readmore-button-title-close="Свернуть подробное описание"
                />
            </div>

            <div class="cruise-detail-ship-image">
                <img
                    class="w-full h-full object-fit rounded-sm"
                    :src="getImage"
                    :alt="`Тх - ${content.title}`"
                    width="810"
                    height="230"
                >
            </div>
        </div>

        <div class="hidden md:block">
            <ClientOnly>
                <ShipsGallery
                    v-if="isMdScreen && hasGallery"
                    :ship-name="content.title"
                    :gallery="content.photo"
                />
                <div v-else class="cruise-detail-ship-image">
                    <img
                        class="w-full h-full object-fit rounded-sm"
                        :src="getImage"
                        :alt="`Тх - ${content.title}`"
                        width="810"
                        height="400"
                    >
                </div>
            </ClientOnly>

            <div class="cruise-detail-ship__info py-8 bg-blue-900 text-white px-4 m-0">
                <h3 v-if="content.title" class="cruise-detail-ship__info-title">
                    <nuxt-link :to="getShipSlug(content.slug)">
                        {{ content.title }}
                    </nuxt-link>
                </h3>
                <div class='cruise-detail-ship__info-desc cruise-detail-ship__info-desc--mobile'>
                    <ReadMore
                        v-if="content.desc"
                        class="ship-description text-base leading-normal word-wrap"
                        :desc="content.desc"
                        :readmore-button-title-open="'Подробнее о теплоходе'"
                        :readmore-button-title-close="'Свернуть подробное описание'"
                    />
                </div>
            </div>
        </div>

        <div
            v-if="false"
            class="cruise-detail-ship__gallery w-full"
        >
            <a
                v-for="(item, idx) in content.photo"
                :key="`ships-gallery-${idx}`"
                :href="item.image_900_600"
                class="cruise-detail-ship__gallery-item h-28 image-loop-hover rounded-sm overflow-hidden"
                :class="{ 'hidden': idx > 2 }"
            >
                <img
                    :src="item.image_210_115"
                    :alt="`Тх - ${content.title}`"
                    class="w-full h-full object-cover"
                />
            </a>
        </div>

        <ShipTeam
            v-if="false"
            :content="content.team"
            class="mt-15"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ShipsGallery from '@/components/cruise-detail/ShipsGallery';
    import ShipTeam from '@/components/ships/tabs/ShipTeam';
    import ReadMore from '@/components/base/readmore/ReadMore';

    export default {
        name: 'CruiseDetailShip',
        components: { ShipTeam, ShipsGallery, ReadMore },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            ...mapGetters(['getWindowWidth']),
            isMdScreen() {
                return this.getWindowWidth < 769;
            },
            hasGallery() {
                return this.content.photo && this.content.photo.length > 0;
            },
            getImage() {
                const image = this.content?.image_810_400? this.content.image_810_400: this.content.image_url;
                return image? image: '/images/cruise-detail/ships/1.jpg';
            },
            getShipSlug() {
                return (slug) => `/ships-catalog/${slug}`;
            },
        },
        methods: {
            initLightgallery() {
                const $el = this.$el;
                const galleryWrap = $el.querySelector('.cruise-detail-ship__gallery');
                if ($el && galleryWrap) window.lightGallery(galleryWrap, { download: false });
            },
        },
        mounted() {
            this.initLightgallery();
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-detail-ship {
        &-desc {
            width: 480px;
            margin-right: 8%;
        }

        &-image {
            flex: 1;
            max-height: 400px;
        }

        .cruise-detail-ship__info-desc--mobile {
            &::v-deep {
                .readmore-height .readmore-desc.has-overflow:after {
                    background: linear-gradient(to right, rgba(11, 62, 131, 0), rgba(11, 62, 131, 1) 50%);
                }
            }
        }
    }

    ::v-deep .ship-description {
        .readmore-link {
            @apply text-base leading-snug text-red-500 font-medium hover:text-blue-300 border-none mt-0 md:text-white;
        }

        .readmore-desc {
            @apply mb-6;
        }
    }

    @screen xl {
        .cruise-detail-ship {
            &-image {
                flex: 0 1 100%;
                margin: 0 0 20px;
                max-height: 360px;
            }

            &-desc {
                order: 1;
                width: 100%;
                margin: 0;
            }
        }
    }

    @screen md {
        .cruise-detail-ship {
            &-image {
                margin: 0;
                border-radius: 0;
            }
        }
    }
</style>
