<template>
    <div class="badge-rating relative flex items-center justify-center text-lg text-white font-bold">
        <svg
            class="absolute left-0 top-0 w-full h-full"
            width="52"
            height="48"
            viewBox="0 0 52 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.202 4C5.20195 1.79086 6.9928 0 9.20194 0H48C50.2091 0 52 1.79086 52 4V44C52 46.2091 50.2091 48 48 48H9.20195C6.99281 48 5.20195 46.2091 5.20195 44V26.4C5.20195 22.012 3.75788 19.048 0.5807 17.2116C-0.134416 16.7983 -0.229393 15.7354 0.522664 15.3984C1.9557 14.7562 3.5384 14.4 5.20222 14.4C5.20222 10.9333 5.20208 7.46667 5.202 4Z"
                fill="#0B3E83"
            />
        </svg>

        <span class="relative z-1">{{ count }}</span>
    </div>
</template>

<script>
export default {
    name: "BadgeRating",
    props: {
        count: {
            type: [Number, String],
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped>
.badge-rating {
    padding: 13px 9px 14px 14px;
}
</style>
