<template>
    <div class="flex stars">
        <span v-for="(filled, idx) in stars" :class="[starsClasses, {star: true, filled: filled}]" :key="`star-${idx}`">
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
        </span>
    </div>
</template>

<script>
    export default {
        name: "Stars",
        props: {
            starsClasses: null,
            number: {
                type: Number,
                required: true,
            },
            value: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                stars: []
            };
        },
        mounted() {
            const stars = [];
            for (let idx=0; idx<this.number; idx++) {
                stars.push(
                    (idx < this.value)
                )
            }
            this.stars = stars;
        },
    };
</script>

<style lang="scss" scoped>
    .stars {
        display: flex;

        .star {
            direction: rtl;
            justify-content: flex-end;

            path {
                @apply text-yellow-400 stroke-current;
            }

            &.filled path {
                @apply text-yellow-400 fill-current stroke-current;
            }
        }

    }
</style>
