<template>
    <div
        class="tabs-list-heading relative z-10"
        :class="{'tabs-list-heading--fixed': isFixed}"
    >
        <div class="tabs-list-heading__list flex border border-gray-50 rounded-sm overflow-hidden tablet:block">
            <button
                v-for="(tabItem, tabIdx) in tabsList"
                :key="tabIdx"
                type="button"
                class="cruise-detail-tabs-list__item custom-transition flex items-center justify-center flex-auto px-8 py-7 bg-white text-black-400 text-center text-base font-medium uppercase overflow-hidden 4xl:p-4 4xl:text-sm xxl:flex-col xl:text-xs xs:p-2 tablet:hidden"
                :class="{'cruise-detail-tabs-list__item--active': isActiveTab(tabItem)}"
                :title="tabItem.name"
                @click="(e) => onLinkClick(e, tabItem)"
            >
                <span class="tabs-list-heading__text flex-1-1">{{ tabItem.name }}</span>
            </button>

            <div class="hidden relative tablet:block" v-click-outside="closeDropdown">
                <button
                    type="button"
                    class="tabs-list-btn button w-full flex items-center justify-center py-5 px-7 bg-blue-900 text-white text-base uppercase z-30"
                    :class="{'dropdown-btn--active': showDropdown}"
                    :title="getSelectedTab"
                    @click="onDropdownButtonClick"
                >
                    <span class="mr-3 mob:text-sm mob:normal-case">{{ getSelectedTab }}</span>
                    <svg
                        class="fill-current"
                        width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.58104 7.00501C4.99155 6.63555 5.62384 6.66882 5.9933 7.07934L9.28126 10.7326L12.5692 7.07934C12.9387 6.66883 13.571 6.63555 13.9815 7.00501C14.392 7.37447 14.4253 8.00675 14.0558 8.41726L10.0246 12.8964C9.83491 13.1071 9.56474 13.2275 9.28126 13.2275C8.99777 13.2275 8.72761 13.1071 8.53796 12.8964L4.50671 8.41726C4.13726 8.00675 4.17053 7.37446 4.58104 7.00501Z"
                            fill="white"
                        />
                    </svg>
                </button>

                <transition name="fill-dropdown">
                    <div
                        v-show="showDropdown"
                        class="absolute z-1 left-0 top-full w-full py-6 px-5 bg-white text-black-400 rounded-b-sm border border-gray-50 border-t-0"
                    >
                        <div
                            v-for="(tabItem, tabIdx) in tabsList"
                            :key="tabIdx"
                            :class="['mb-4 last:mb-0', { 'dropdown-item--active' :isActiveTab(tabItem) }]"
                            @click="(e) => onDropdownItemClick(e, tabItem)"
                        >
                            <div
                                class="inline-block max-w-full text-lg font-medium border-b border-dashed truncate mob:text-base"
                            >
                                {{ tabItem.name }}
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabsListHeadingWithScroll',
        props: {
            tabsList: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                showDropdown: false,
                selectedTab: null,
                isFixed: false,
                elementYOffset: 0,
            };
        },
        computed: {
            isActiveTab() {
                return (tab) => this.selectedTab && Object.keys(this.selectedTab).length > 0 && this.selectedTab.name === tab.name;
            },
            getSelectedTab() {
                return this.selectedTab && this.selectedTab.name ? this.selectedTab.name : this.tabsList[0].name;
            },
            getOffsetHeight() {
                const $elHeight = this.$el.offsetHeight;
                const headerHeight = document.querySelector('.header').offsetHeight;
                return $elHeight + headerHeight;
            },
        },
        methods: {
            onLinkClick(e, tab) {
                e.preventDefault();
                this.scrollToSection(tab.link);
            },
            scrollToSection(link) {
                const footer = document.querySelector('.footer');
                const section = document.querySelector(`#cruise-detail-section-${link}`);

                if (section && footer) {
                    const windowYOffset = window.pageYOffset;
                    const footerCoord = footer.getBoundingClientRect().top;

                    if (windowYOffset > 290 || windowYOffset <= footerCoord) {
                        const y = section.getBoundingClientRect().top + windowYOffset - this.getOffsetHeight;
                        window.scrollTo({ top: y, behavior: 'smooth' });
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
                    window.addEventListener('scroll', this.scrollHandler);
                });
            },
            scrollHandler() {
                this.toggleFixed(); // стили для фиксед табов во время скрола
                this.setActiveTabOnScroll(); // активный элемент во время скрола
            },
            toggleFixed() {
                if (window.pageYOffset > this.elementYOffset) {
                    this.$el.style.height = this.$el.querySelector('.tabs-list-heading__list').offsetHeight + 'px'; // добавляем пустое место, когда вырываем табы из потока
                    this.isFixed = true;
                } else {
                    this.$el.style.height = 'auto';
                    this.isFixed = false;
                }
            },
            setActiveTabOnScroll() {
                let sections = document.querySelectorAll('.cruise-detail__content');

                if (sections) {
                    sections = [...sections];

                    sections.forEach(section => {
                        const currentSectionPos = section.getBoundingClientRect();
                        const sectionStart = window.pageYOffset >= currentSectionPos.top + window.pageYOffset - this.getOffsetHeight - 12;
                        const sectionEnd = window.pageYOffset < currentSectionPos.bottom + window.pageYOffset - this.getOffsetHeight - 12;

                        if (sectionStart && sectionEnd) {
                            const id = section.getAttribute('id');
                            const idSplitted = id.split('-');
                            const tabName = idSplitted[idSplitted.length - 1];

                            this.setActiveTabByName(tabName);
                        }
                    });
                }
            },
            setActiveTabByName(name) {
                const idx = this.tabsList.findIndex(item => item.link === name);
                if (idx !== -1) this.selectedTab = this.tabsList[idx];
            },

            onDropdownButtonClick() {
                this.showDropdown = !this.showDropdown;
            },
            closeDropdown() {
                this.showDropdown = false;
            },
            onDropdownItemClick(e, tab) {
                this.closeDropdown();
                this.onLinkClick(e, tab);
            },
        },
        beforeMount() {
            this.selectedTab = this.selectedTab && Object.keys(this.selectedTab).length > 0 ? this.selectedTab : null;
        },
        mounted() {
            this.setElementYOffsetOnInit();
            this.updateElementScroll();
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollHandler);
        },
    };
</script>

<style lang="scss" scoped>
    .cruise-detail-tabs-list {
        &__item {
            @apply border-r border-gray-50 last:border-none;

            &:hover {
                @apply bg-yellow-350;
            }

            &.cruise-detail-tabs-list__item--active {
                pointer-events: none;
                @apply bg-yellow-400 text-black-400;
            }
        }

        .nuxt-link-exact-active {
            pointer-events: none;
            @apply bg-yellow-400 text-black-400;
        }
    }

    .tabs-list-heading {
        &--fixed {
            .tabs-list-heading__list {
                position: fixed;
                left: 50%;
                top: 89px;
                width: 100%;
                max-width: 1920px;
                margin: 0;
                transform: translateX(-50%);
            }

            .cruise-detail-tabs-list__item {
                max-width: 100%;
            }

            .tabs-list-btn {
                @apply border-b border-white rounded-none;
            }
        }

        .cruise-detail-tabs-list__item {
            &:first-of-type {
                padding-left: 52px;
                max-width: 400px;
            }

            &:last-of-type {
                padding-right: 52px;
            }
        }

        .dropdown-btn {
            &--active {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                @apply bg-yellow-400;
            }
        }

        .dropdown-item {
            &--active {
                pointer-events: none;
                @apply text-blue-400;
            }
        }
    }

    @screen xxl {
        .tabs-list-heading {
            &--fixed {
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

            .cruise-detail-tabs-list__item {
                &:first-of-type {
                    padding-left: 32px;
                }

                &:last-of-type {
                    padding-right: 32px;
                }
            }
        }
    }

    @screen tablet {
        .tabs-list-heading__list {
            overflow: inherit;
        }
    }

    @screen sm {
        .tabs-list-heading--fixed .tabs-list-heading__list {
            top: 120px;
        }
    }
</style>
