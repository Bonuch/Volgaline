<template>
    <a :href="item.link" class="social-item" target="_blank">
        <BaseIcon
            :width="typeIcon === 'icon'? '24px': '45px'"
            :height="typeIcon === 'icon'? '24px': '45px'"
            :selectors="`${getMarginRight} fill-current`"
            :view-box="getViewBox"
        >
            <component v-if="item[typeIcon]" :is="item[typeIcon]"></component>
        </BaseIcon>
    </a>
</template>

<script>
    import BaseIcon from "./BaseIcon";
    import VkIcon from "../icons/VkIcon";
    import FbIcon from "../icons/FbIcon";
    import MatesIcon from "../icons/MatesIcon";
    import InstaIcon from "../icons/InstaIcon";
    import VkIconCircle from "../icons/VkIconCircle";
    import FbIconCircle from "../icons/FbIconCircle";
    import MatesIconCircle from "../icons/MatesIconCircle";
    import InstaIconCircle from "../icons/InstaIconCircle";

    export default {
        name: "SocialItem",
        components: { InstaIcon, MatesIcon, FbIcon, VkIcon, BaseIcon, VkIconCircle, FbIconCircle, MatesIconCircle, InstaIconCircle },
        props: {
            item: {
                type: Object,
                required: true,
            },
            typeIcon: {
                type: String,
                default: 'icon'
            },
        },
        computed: {
            getViewBox() {
                const iconViewBox = this.item.icon === "InstaIcon" ? "0 0 512 512" : "0 0 24 24";
                return this.typeIcon === "iconCircle" ? "0 0 45 45" : iconViewBox;
            },
            getMarginRight() {
                return this.typeIcon === "iconCircle" ? "mr-5" : 'mr-6';
            }
        },
    };
</script>

<style scoped></style>
