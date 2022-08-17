<template>
    <div class="product-rate product-rate--with-hover">
        <div v-if="rating" class="ml-2 font-medium">({{ rating }})</div>

        <input type="radio" v-model="rating" :name="idName" value="10" :id="`${idName}-10`">
        <label :for="`${idName}-10`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="9" :id="`${idName}-9`">
        <label :for="`${idName}-9`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="8" :id="`${idName}-8`">
        <label :for="`${idName}-8`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="7" :id="`${idName}-7`">
        <label :for="`${idName}-7`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="6" :id="`${idName}-6`">
        <label :for="`${idName}-6`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="5" :id="`${idName}-5`">
        <label :for="`${idName}-5`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="4" :id="`${idName}-4`">
        <label :for="`${idName}-4`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="3" :id="`${idName}-3`">
        <label :for="`${idName}-3`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="2" :id="`${idName}-2`">
        <label :for="`${idName}-2`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>

        <input type="radio" v-model="rating" :name="idName" value="1" :id="`${idName}-1`">
        <label :for="`${idName}-1`" class="product-rate-item">
            <svg width="20" height="19" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438L14.5469 11.9688L16.1875 19L10  15.25Z"
                    fill="#fff" stroke="#ed1c24"/>
                <defs>
                    <linearGradient x1="10" x2="10" y1="-2" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED1C24" offset="0"/>
                        <stop stop-color="#ED1C24" offset="1"/>
                    </linearGradient>
                </defs>
            </svg>
        </label>
    </div>
</template>

<script>
    export default {
        name: "ReviewRating",
        props: {
            idName: {
                type: String,
                required: true,
            },
            customVal: {
                type: Number,
            },
        },
        data() {
            return {
                rating: null,
            };
        },
        watch: {
            rating(val) {
                this.$emit("on-rating-change", val);
            },
        },
        mounted() {
            if (this.customVal) {
                this.rating = this.customVal;
            }
        },
    };
</script>

<style lang="scss" scoped>
    .product-rate {
        display: flex;
        align-items: center;

        &--with-hover {
            direction: rtl;
            justify-content: flex-end;

            input {
                display: none;

                &:checked + .product-rate-item,
                &:checked ~ .product-rate-item {
                    path {
                        @apply text-yellow-400 fill-current stroke-current;
                    }
                }
            }

            .product-rate-item {
                margin-right: 4px;
                cursor: pointer;

                &:first-child {
                    margin-right: 0;
                }

                &:last-child {
                    margin-right: 4px;
                }

                &:hover,
                &:focus {
                    path {
                        @apply text-yellow-400 fill-current stroke-current;
                    }

                    & ~ .product-rate-item {
                        path {
                            @apply text-yellow-400 fill-current stroke-current;
                        }
                    }
                }
            }
        }

        &-item {
            z-index: 1;
            position: relative;
            display: block;
            width: 30px;
            height: 26px;
            margin-right: 1px;

            &:last-child {
                margin-right: 0;
            }

            svg {
                width: 100%;
                height: 100%;
            }

            path {
                fill: #fff;
                transition: all 0.3s var(--custom-transition);
                @apply text-yellow-400 stroke-current;
            }
        }

        &-item--filled {
            path {
                @apply text-yellow-400 fill-current stroke-current;
            }
        }
    }
</style>
