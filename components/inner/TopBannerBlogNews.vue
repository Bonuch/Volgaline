<template>
    <div
    >
        <div class='wrapper wrapper-1410 relative z-1'>
            <Breadcrumbs v-if='breadcrumbs' :breadcrumbs='breadcrumbs'
                         class='page-inner__breadcrumbs text-black-100 mt-7 mb-5' />

            <div class='flex tablet:flex-col'>
                <div
                    class='top-banner-content-left px-15 py-9 bg-blue-300 bg-opacity-5 rounded-l-xl tablet:rounded-t-xl tablet:rounded-bl-none xxl:px-10 xxl:py-6 lg:px-5 lg:pl-7 lg:pr-4 xxl:w-1/3 tablet:w-full'>
                    <div class='flex mb-5'>
                        <div class='text-sm text-black-100 font-normal'>
                            {{ getDateFormattedWithDot(topBannerContentDate) }}
                        </div>
                        <div v-if='+viewCounter !== 0' class='flex items-center ml-5'>
                            <svg width='16' height='12' viewBox='0 0 16 12' fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M15.8806 5.454C15.2952 4.174 12.9999 0 7.99991 0C2.99991 0 0.704581 4.174 0.119247 5.454C0.040673 5.62553 0 5.81199 0 6.00067C0 6.18934 0.040673 6.3758 0.119247 6.54733C0.704581 7.826 2.99991 12 7.99991 12C12.9999 12 15.2952 7.826 15.8806 6.546C15.959 6.37466 15.9996 6.18843 15.9996 6C15.9996 5.81157 15.959 5.62534 15.8806 5.454ZM7.99991 10.6667C3.79525 10.6667 1.83325 7.08933 1.33325 6.00733C1.83325 4.91067 3.79525 1.33333 7.99991 1.33333C12.1946 1.33333 14.1572 4.89533 14.6666 6C14.1572 7.10467 12.1946 10.6667 7.99991 10.6667Z'
                                    fill='#696969' />
                                <path
                                    d='M8.0013 2.66748C7.34203 2.66748 6.69757 2.86298 6.1494 3.22925C5.60124 3.59552 5.174 4.11612 4.92171 4.7252C4.66941 5.33429 4.6034 6.00451 4.73202 6.65112C4.86064 7.29772 5.17811 7.89166 5.64428 8.35784C6.11046 8.82401 6.7044 9.14148 7.351 9.2701C7.99761 9.39872 8.66783 9.33271 9.27692 9.08041C9.886 8.82812 10.4066 8.40088 10.7729 7.85272C11.1391 7.30455 11.3346 6.66009 11.3346 6.00081C11.3336 5.11708 10.982 4.26985 10.3572 3.64496C9.73226 3.02007 8.88503 2.66854 8.0013 2.66748ZM8.0013 8.00082C7.60574 8.00082 7.21906 7.88352 6.89016 7.66375C6.56126 7.44399 6.30492 7.13163 6.15354 6.76618C6.00217 6.40073 5.96256 5.9986 6.03973 5.61063C6.1169 5.22267 6.30738 4.86631 6.58709 4.5866C6.86679 4.3069 7.22316 4.11641 7.61112 4.03924C7.99909 3.96207 8.40122 4.00168 8.76667 4.15305C9.13212 4.30443 9.44448 4.56078 9.66424 4.88967C9.88401 5.21857 10.0013 5.60525 10.0013 6.00081C10.0013 6.53125 9.79059 7.03996 9.41552 7.41503C9.04044 7.7901 8.53174 8.00082 8.0013 8.00082Z'
                                    fill='#696969' />
                            </svg>
                            <span class='ml-1 text-sm text-black-100 font-normal'>{{ viewCounter }}</span>
                        </div>
                    </div>
                    <h1
                        v-if='title'
                        class='text-black-900 text-30 font-normal leading-1-5 lg:leading-1-2 m-0 mb-9 lg:mb-4 xxl:text-26 lg:text-22 xl:mb-5'
                        v-html='title'
                    ></h1>
                    <div
                        v-if='topBannerContent.content'
                        v-html='topBannerContent.content'
                        class='inner-cruises-top-banner__content text-white text-22 leading-1-2 xl:text-lg xs:hidden'
                        :class='showDescription'
                    ></div>

                    <div
                        v-if='topBannerContent.content'
                        v-html='topBannerContent.content'
                        class='inner-cruises-top-banner__content inner-cruises-top-banner__content--mobile text-white leading-1-2 text-22 sm:text-xl hidden xs:block mob:text-lg'
                        :class="{'inner-cruises-top-banner__content--expanded': showDescription}"
                    ></div>
                    <template v-if='pageSlug'>
                        <div class='font-medium text-base text-blue-300 mb-5 lg:text-sm'>Поделиться</div>

                        <div class='flex'>
                          <ShareNetwork
                              network="vk"
                              title=""
                              :url="getPageSlug"
                          >
                                <svg class='mr-4' width='32' height='32' viewBox='0 0 32 32' fill='none'
                                     xmlns='http://www.w3.org/2000/svg'>
                                    <circle cx='16' cy='16' r='16' fill='#0077FF' />
                                    <path
                                        d='M16.7145 21C11.2479 21 8.12992 17.2462 8 11H10.7383C10.8282 15.5846 12.8469 17.5265 14.4459 17.9269V11H17.0244V14.954C18.6034 14.7838 20.2622 12.982 20.8218 11H23.4003C22.9705 13.4424 21.1717 15.2442 19.8925 15.985C21.1717 16.5856 23.2205 18.1572 24 21H21.1617C20.5521 19.0981 19.0332 17.6266 17.0244 17.4264V21H16.7145Z'
                                        fill='white' />
                                </svg>
                            </ShareNetwork>
                            <ShareNetwork
                                network="Odnoklassniki"
                                title=""
                                :url="getPageSlug"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#FD8824"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9605 15.7792C14.7904 15.7744 13.6695 15.3136 12.8421 14.4971C12.0146 13.6806 11.5476 12.5746 11.5428 11.4199C11.5458 10.259 12.0103 9.14569 12.8364 8.31919C13.6625 7.4927 14.7843 7.01903 15.9605 7C16.5461 6.99913 17.126 7.11331 17.6664 7.33588C18.2068 7.55844 18.6969 7.88494 19.1081 8.29634C19.5193 8.70774 19.8434 9.19582 20.0615 9.73208C20.2796 10.2684 20.3873 10.8421 20.3783 11.4199C20.3857 11.9944 20.2765 12.5645 20.0571 13.0967C19.8377 13.6289 19.5126 14.1124 19.1009 14.5187C18.6892 14.925 18.1992 15.2458 17.6599 15.4623C17.1205 15.6788 16.5428 15.7865 15.9605 15.7792ZM15.9605 9.60349C15.7136 9.60336 15.4691 9.65227 15.2417 9.74731C15.0142 9.84236 14.8085 9.98158 14.6368 10.1567C14.465 10.3319 14.3307 10.5393 14.2419 10.7667C14.1531 10.9941 14.1116 11.2369 14.1198 11.4804C14.1162 11.7172 14.1618 11.9521 14.2538 12.1708C14.3458 12.3895 14.4823 12.5872 14.6548 12.7517C14.8273 12.9163 15.0322 13.0442 15.2568 13.1275C15.4814 13.2109 15.7209 13.2479 15.9605 13.2363C16.1987 13.2419 16.4356 13.2007 16.6575 13.1153C16.8793 13.0298 17.0818 12.9016 17.2531 12.7382C17.4244 12.5749 17.561 12.3796 17.6551 12.1636C17.7492 11.9477 17.7989 11.7155 17.8013 11.4804C17.8095 11.2369 17.768 10.9941 17.6792 10.7667C17.5904 10.5393 17.4561 10.3319 17.2843 10.1567C17.1126 9.98158 16.9069 9.84236 16.6794 9.74731C16.452 9.65227 16.2075 9.60336 15.9605 9.60349ZM17.7399 19.412L20.2556 21.8338C20.3725 21.9491 20.4652 22.0859 20.5284 22.2366C20.5917 22.3872 20.6243 22.5487 20.6243 22.7117C20.6243 22.8748 20.5917 23.0362 20.5284 23.1869C20.4652 23.3375 20.3725 23.4744 20.2556 23.5896C20.1468 23.7181 20.0107 23.8214 19.8569 23.8923C19.7032 23.9633 19.5356 24 19.3659 24C19.1962 24 19.0286 23.9633 18.8749 23.8923C18.7211 23.8214 18.5851 23.7181 18.4762 23.5896L15.9605 21.1678L13.5062 23.5896C13.3869 23.71 13.2433 23.8045 13.0849 23.8671C12.9264 23.9296 12.7564 23.9589 12.5859 23.9529C12.2457 23.9404 11.9205 23.8121 11.6655 23.5896C11.5486 23.4744 11.4559 23.3375 11.3926 23.1869C11.3294 23.0362 11.2968 22.8748 11.2968 22.7117C11.2968 22.5487 11.3294 22.3872 11.3926 22.2366C11.4559 22.0859 11.5486 21.9491 11.6655 21.8338L14.2425 19.412C13.3218 19.1281 12.4367 18.7422 11.6041 18.2616C11.3198 18.0776 11.1171 17.7937 11.0373 17.4675C10.9576 17.1414 11.0066 16.7975 11.1746 16.5057C11.2683 16.3592 11.3911 16.2329 11.5358 16.1347C11.6804 16.0364 11.8438 15.9682 12.016 15.9342C12.1882 15.9002 12.3656 15.9012 12.5374 15.937C12.7092 15.9728 12.8718 16.0427 13.0154 16.1425C13.9135 16.677 14.9424 16.9595 15.9912 16.9595C17.04 16.9595 18.069 16.677 18.9671 16.1425C19.1106 16.0427 19.2733 15.9728 19.4451 15.937C19.6169 15.9012 19.7943 15.9002 19.9665 15.9342C20.1387 15.9682 20.302 16.0364 20.4467 16.1347C20.5913 16.2329 20.7142 16.3592 20.8078 16.5057C20.9818 16.7904 21.0405 17.1293 20.9723 17.4548C20.904 17.7803 20.7138 18.0684 20.4397 18.2616C19.5857 18.7425 18.6802 19.1283 17.7399 19.412Z" fill="white"/>
                                </svg>
                            </ShareNetwork>
                        </div>
                    </template>
                </div>
                <div class='aspect-w-12 aspect-h-3 w-full'>
                    <img :src='topBannerContent.image' :alt='title'
                         class='inner-cruises-top-banner__img  rounded-r-xl tablet:rounded-b-xl tablet:rounded-tr-none xxl:w-2/3 md:max-h-52 md:object-cover tablet:w-full'>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Breadcrumbs from '@/components/base/Breadcrumbs';
import { dayjsHelpers } from '~/mixins/content-helpers';

export default {
    name: 'TopBannerBlogNews',
    components: { Breadcrumbs },
    mixins: [dayjsHelpers],
    props: {
        title: {
            type: String,
            required: true,
        },
        breadcrumbs: {
            type: Array,
            required: true,
        },
        topBannerContent: {
            type: Object,
            required: true,
        },
        topBannerContentDate: {
            required: true,
        },
        viewCounter: {
            type: [ String, Number ],
            required: true,
        },
        pageSlug: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            showDescription: false,
        };
    },
    computed: {
        getPageSlug() {
            return `https://volgaline.com/blog-o-kruizah/${this.pageSlug}`;
        }
    },
};
</script>

<style lang='scss' scoped>
.page-inner__breadcrumbs {
    &::v-deep {
        & li {
            @apply text-sm;
        }
    }
}

.top-banner-content-left {
    max-width: 480px;
}

.inner-cruises-top-banner {
    position: relative;

    &--about {
        h1 {
            max-width: 860px;
        }
    }

    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(270deg, rgba(11, 62, 131, 0) 10%, #0B3E83 100%);
    }

    &::v-deep {
        p {
            @apply m-0 mb-6 last:m-0 xl:mb-4;
        }
    }

    &__content {
        max-width: 1240px;

        &--mobile {
            position: relative;
            max-height: 156px;
            overflow: hidden;
            transition: height 0.3s var(--custom-transition);
        }

        &--expanded {
            max-height: 100%;
        }
    }

    &__img {
        object-fit: cover;
        width: 100%;
    }
}

@screen tablet {
    .top-banner-content-left {
        max-width: 100%;
    }
}

@screen sm {
    .inner-cruises-top-banner {
        &:after {
            background: linear-gradient(270deg, rgba(11, 62, 131, 0) -30%, #0B3E83 100%);
        }
    }

}
</style>
