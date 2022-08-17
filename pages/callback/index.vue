<template>
<div class="max-w-sm mx-auto position-form-callback">
    <ModalCall/>
</div>
</template>

<script>
import ModalCall from '@/components/modals/ModalCall';
export default {
    name: 'CallBackPage',
    components: { ModalCall },
    layout: 'clean'
};
</script>

<style scoped lang='scss'>
.position-form-callback {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @screen xs {
        transform: unset;
        position: static;
        padding-right: 15px;
        padding-left: 15px;
    }
}
</style>
