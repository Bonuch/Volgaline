<template>
    <button
        type="button"
        class="hamburger"
        :class="{'hamburger--active': getMobileMenuActivity}"
        @click="toggleMobileMenu"
    >
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
    </button>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    export default {
        name: "Hamburger",
        computed: {
            ...mapGetters(["getMobileMenuActivity"]),
        },
        methods: {
            ...mapActions(["toggleMobileMenu"]),
        },
    };
</script>

<style lang="scss" scoped>
    .hamburger {
        padding: 5px;
        border-radius: 0;
        border: 0;

        &:hover,
        &:focus {
            background-color: transparent;

            .hamburger__line {
                @apply bg-red-200;
            }
        }

        &--active {
            .hamburger__line {
                @apply bg-red-200;

                &:nth-child(1) {
                    transform: translateY(8px) rotate(45deg);
                }

                &:nth-child(2) {
                    opacity: 0;
                }

                &:nth-child(3) {
                    transform: translateY(-8px) rotate(-45deg);
                }
            }
        }

        &__line {
            width: 22px;
            height: 3px;
            display: block;
            margin: 6px auto;
            transition: all 0.3s ease-in-out;
            @apply bg-red-500;

            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    @screen mob {
        .hamburger {
            &__line {
                width: 18px;
                height: 2px;
                margin: 5px auto;
            }
        }
    }
</style>
