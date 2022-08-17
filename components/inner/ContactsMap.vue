<template>
    <yandex-map
        class="contacts-map"
        :coords="getCoords"
        :scroll-zoom="false"
    >
        <ymap-marker
            marker-id="123"
            :coords="getCoords"
            :balloon-template="balloonTemplate"
        />
    </yandex-map>
</template>

<script>
    // https://vue-yandex-maps.github.io/examples/
    // :icon="markerIcon" - add to ymap-marker
    // markerIcon: { - v-data
    //     layout: 'default#imageWithContent',
    //     imageHref: '/images/map-icon.png',
    //     imageSize: [30, 30],
    //     imageOffset: [-10, -10],
    //     content: "",
    //     contentOffset: [0, 15],
    //     contentLayout: "",
    // },


    export default {
        name: "ContactsMap",
        props: {
            id: {
                type: [String, Number],
                default: "map",
            },
            vectors: {
                type: String,
                required: true
            },
            coords: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        },
        computed: {
            getCoords() {
                return this.coords.split(',').map(item => Number(item));
            },
            balloonTemplate() {
                return this.desc;
            },
        },
    };
</script>

<style scoped>
    .contacts-map {
        width: 100%;
        height: 100%;
    }
</style>
