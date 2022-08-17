<template>
    <div
        class="tabs-list-heading"
        :class="{'tabs-list-heading--fixed': isFixed}"
    >
        <div class="tabs-list-heading__list cruise-detail-tabs-list flex overflow-hidden">
            <nuxt-link
                v-for="(tabItem, tabIdx) in tabsList"
                :key="tabIdx"
                :to="{query: {'tab': tabItem.link}}"
                class="cruise-detail-tabs-list__item custom-transition flex items-center justify-center flex-auto p-6 bg-blue-900 bg-opacity-75 text-white text-center text-lg font-bold uppercase overflow-hidden extra:text-base 2xl:p-4 2xl:text-sm xxl:flex-col xl:text-xs xs:p-2"
                @click.native="(e) => onLinkClick(e, tabItem.link)"
                :title="tabItem.name"
            >
                <div
                    class="tabs-list-heading__icon w-10 h-10 flex mr-1 border-2 border-current text-white rounded-full xxl:mr-0 xxl:mb-2 tablet:mb-0 tablet:border-0"
                >
                    <BaseIcon
                        width="20px"
                        height="20px"
                        :viewBox="viewBox(tabItem.icon)"
                        selectors="m-auto fill-current"
                    >
                        <component v-if="tabItem.icon" :is="tabItem.icon"></component>
                    </BaseIcon>
                </div>

                <span class="tabs-list-heading__text flex-1-1 tablet:hidden">{{ tabItem.name }}</span>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import BaseIcon from "@/components/base/BaseIcon";
    import InfoIcon from "@/components/icons/InfoIcon";
    import PriceIcon from "@/components/icons/PriceIcon";
    import RoadIcon from "@/components/icons/RoadIcon";
    import ExcursionIcon from "@/components/icons/ExcursionIcon";
    import ShipIcon from "@/components/icons/ShipIcon";
    import ReviewIcon from "@/components/icons/ReviewIcon";
    import TeamIcon from "@/components/icons/TeamIcon";

    export default {
        name: "TabsListHeading",
        components: { TeamIcon, ReviewIcon, ShipIcon, ExcursionIcon, RoadIcon, PriceIcon, InfoIcon, BaseIcon },
        props: {
            tabsList: {
                type: Array,
                required: true,
            },
            currentTab: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                selectedTab: null,
                isFixed: false,
                elementYOffset: 0,
            };
        },
        computed: {
            viewBox() {
                return (icon) => {
                    let result = "0 0 32 32";

                    switch (icon) {
                        case "ExcursionIcon":
                            result = "0 0 60 60";
                            break;
                        case "PriceIcon":
                            result = "0 0 510.127 510.127";
                            break;
                        case "InfoIcon":
                            result = "0 0 111.577 111.577";
                            break;
                        case "RoadIcon":
                            result = "0 0 496 496";
                            break;
                        case "ReviewIcon":
                        case "TeamIcon":
                            result = "0 0 512 512";
                            break;
                    }

                    return result;
                };
            },
        },
        methods: {
            onLinkClick(e, link) {
                e.preventDefault();
                this.pushParams(link);
            },
            onInput(selected) {
                this.pushParams(selected.link);
            },
            pushParams(link) {
                this.scrollToFirstSection();
                this.$router.push({
                    query: {
                        tab: link,
                    },
                });
            },
            scrollToFirstSection() {
                const footer = document.querySelector(".footer");
                const section = document.querySelector(".cruise-detail__content-scroll-to");

                if (section && footer) {
                    const windowYOffset = window.pageYOffset;
                    const footerCoord = footer.getBoundingClientRect().top;
                    const $elHeight = this.$el.offsetHeight;
                    const headerHeight = document.querySelector(".header").offsetHeight;
                    const yOffset = $elHeight + headerHeight;

                    if (windowYOffset < 290 || windowYOffset >= footerCoord) {
                        const y = section.getBoundingClientRect().top + windowYOffset - yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    }
                } else {
                    return false;
                }
            },
            setElementYOffsetOnInit() {
                const elementY = this.$el.getBoundingClientRect().top;
                this.elementYOffset = elementY + window.scrollY;
            },
            updateElementScroll() {
                this.$nextTick(function() {
                    window.addEventListener("scroll", this.toggleFixed);
                });
            },
            toggleFixed() {
                if (window.pageYOffset > this.elementYOffset) {
                    this.$el.style.height = this.$el.querySelector(".tabs-list-heading__list").offsetHeight + "px"; // добавляем пустое место, когда вырываем табы из потока
                    this.isFixed = true;
                } else {
                    this.$el.style.height = "auto";
                    this.isFixed = false;
                }
            },
        },
        beforeMount() {
            this.selectedTab = this.currentTab;
        },
        mounted() {
            this.setElementYOffsetOnInit();
            this.updateElementScroll();
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.toggleFixed);
        },
    };
</script>

<style lang="scss" scoped>
    .tabs-list-heading {
        &--fixed {
            .tabs-list-heading__list {
                position: fixed;
                z-index: 10;
                left: 0;
                top: 82px;
                width: 100%;
                margin: 0;
            }
        }

        &__icon {
            svg {
                width: 50%;
                height: 50%;
            }

            path {
                fill: currentColor;
            }
        }
    }

    @screen xxl {
        .tabs-list-heading {
            &--fixed {
                .tabs-list-heading__icon {
                    @apply w-8 h-8;
                }

                .tabs-list-heading__text {
                    @apply text-xs normal-case;
                }
            }
        }
    }

    @screen xl {
        .tabs-list-heading {
            &--fixed {
                .tabs-list-heading__list {
                    top: 64px;
                }
            }
        }
    }

    @screen tablet {
        .tabs-list-heading {
            &__icon {
                svg {
                    width: 80%;
                    height: 80%;
                }
            }
        }
    }

    @screen xs {
        .tabs-list-heading {
            &__icon {
                svg {
                    width: 60%;
                    height: 60%;
                }
            }
        }
    }
</style>
