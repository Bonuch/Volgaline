<template>
    <input
        type="text"
        name="name"
        id="modal-phone"
        class="input"
        autocomplete="off"
        :placeholder="placeholder"
        v-mask="'+7 (###) ###-##-##'"
        :value="value"
        @input="handleInput"
    >
</template>

<script>
    export default {
        name: 'PhoneComponent',
        props: {
            value: {
                type: null,
            },
            placeholder: {
                type: String,
                default: "+7 (###) ###-##-##"
            }
        },
        methods: {
            handleInput(e) {
                if (e.target.value === '8' || e.target.value === '+7 (8' || e.target.value === '7' || e.target.value === '+7 (7' || e.target.value === '+' || e.target.value === '+7 (+') {
                    e.target.value = '+7 (';
                }
                this.$emit('input', e.target.value);
            }
        }
    };
</script>

<style scoped>

</style>
