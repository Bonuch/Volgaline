<template>
    <div class="tooltip">
        <slot name="heading"></slot>

        <slot name="body"></slot>
    </div>
</template>

<script>
export default {
    name: "Tooltip"
}
</script>

<style scoped lang="scss">
.tooltip {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    right: -20px;
    max-width: 446px;
    background-color: #FFFFFF;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    box-shadow: 0px 4px 50px rgba(72, 72, 72, 0.25);
    padding: 26px 20px;
    z-index: 2;
    &:before {
        content: "";
        position: absolute;
        bottom: 29%;
        left: -8px;
        width: 35px;
        height: 35px;
        transform: rotate(45deg);
        border-radius: 10px;
        background-color: #FFFFFF;
        z-index: 1;
    }
}
</style>
