<template>
    <button
        type="button" class="inner-cruises-controls__item custom-transition"
        :class="{'inner-cruises-controls__item--active': getInnerCruisesOrientation === item.name}"
        @click="onItemClick"
    >
        <BaseIcon
            width="20"
            height="20"
            selectors="fill-current"
            viewBox="0 0 22 22"
        >
            <component v-if="item.icon" :is="item.icon"></component>
        </BaseIcon>
    </button>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex";
    import BaseIcon from "@/components/base/BaseIcon";
    import LineIcon from "@/components/icons/LineIcon";
    import GridIcon from "@/components/icons/GridIcon";
    import ListIcon from "@/components/icons/ListIcon";

    export default {
        name: "HeadingControl",
        components: { BaseIcon, ListIcon, GridIcon, LineIcon },
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        methods: {
            ...mapMutations({
                setInnerCruisesOrientation: "setInnerCruisesOrientation",
            }),
            onItemClick() {
                this.setInnerCruisesOrientation(this.item.name);
            },
        },
        computed: {
            ...mapGetters({
                getInnerCruisesOrientation: "getInnerCruisesOrientation",
            }),
        }
    };
</script>

<style lang="scss" scoped>
    .inner-cruises-controls {
        &__item {
            margin-right: 16px;

            &:last-of-type {
                margin-right: 0;
            }

            &:hover {
                @apply text-orange-400;
            }

            svg {
                width: 20px;
                height: 20px;

                path {
                    fill: currentColor;
                }
            }

            &--active {
                pointer-events: none;
                @apply text-red-400;
            }
        }
    }
</style>
