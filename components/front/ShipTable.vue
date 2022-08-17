<template>
    <div class=''>
        <div
            class='flex flex-row'
            v-for='(item, indexIdm) in itemShip'
            :key='item.id'
            v-show='itemShip && itemShip.length > 0 && indexIdm <= limitationList'
        >
            <div class='text-base font-semibold mb-3'>
                <nuxt-link :to='`populyarnye-kruiznye-teplohody/${item.slug}`'>
                <span class='text-blue-800 transition duration-300 hover:text-blue-400'>Т/х «{{ item.title }}»</span>
                </nuxt-link>
                <span v-if='item.ship_class_title'>
                    Класс - <span :style="`color: ${item.ship_class_color};`">{{ item.ship_class_title }}</span>
                </span>
                <span v-if="item.decks_number_title">{{ item.decks_number_title }}</span>
            </div>
        </div>
        <button
            class='text-blue-800'
            v-if='itemShip.length > 5'
            @click='updateLimitation(limitationList)'
        >
            {{ limitationList === 5 ? 'Показать ещё' : 'Скрыть' }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'ShipTable',
    props: {
        itemShip: {
            required: true,
        },
    },
    data() {
        return {
            limitationList: 5,
        };
    },
    methods: {
        updateLimitation(limitationList) {
            if (this.limitationList === this.itemShip.length) {
                this.limitationList = 5;
            } else {
                this.limitationList = this.itemShip.length;
            }
        },
    },
};
</script>

<style scoped>

</style>
