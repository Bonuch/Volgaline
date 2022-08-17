<template>
    <button
        type="button"
        class="tab-messages__row custom-transition"
        :class='{"tab-messages__closed": item.status == 2}'
        @click="onRowClick"
    >
        <span class="tab-messages__col md:font-normal md:text-sm">
            <span class="block">{{ item.subject }}</span>
            <span class="hidden md:block md:text-gray-300">{{ item.status }}</span>
        </span>

        <span class="tab-messages__col">
            {{ item.status_label }}
        </span>

        <span class="tab-messages__col text-base font-normal md:text-sm">
            {{ formatDate }}
        </span>

        <span class="tab-messages__col text-base text-gray-300 font-normal md:text-sm">
            {{ formatTime }}
<!--            {{ item.time|normalizeDate }}-->
        </span>
    </button>
</template>

<script>
export default {
    name: "MessageTableRow",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onRowClick() {
            this.$emit("on-row-click", this.item.id);
        },
    },
    computed: {
        formatDate() {
            return this.$dayjs(this.item.created).locale("ru").format('DD.MM.YYYY')
        },
        formatTime() {
            return this.$dayjs(this.item.created).locale('ru').format('HH:mm')
        }
    }
};
</script>

<style lang="scss" scoped>
.tab-messages__row {
    @apply font-medium text-lg;

    &:hover,
    &:focus {
        .tab-messages__col {
            color: #0E84CC !important;
        }
    }

    p {
        margin: 0;
    }
}
.tab-messages__closed {
    @apply text-gray-500;
}
</style>
