<template>
    <div class="modal-filter">
        <h3 class="page-inner-h1 leading-1-1 mb-8">Найти круиз</h3>

        <SearchBig
            :show-expand-button="false"
            v-on:on-search-big-submit="handleModalClose"
            v-model="clearSearchParams"
            :routeHasSearchParams="routeHasSearchParams"
            :modalMode="true"
            @clearSearch="onClearClick"
        />

    </div>
</template>

<script>
    import { mapMutations, mapActions } from "vuex";
    import { sfmQueryHasProp, sfmQueryNames } from '@/helpers/search';

    export default {
        name: "ModalFilter",
        components: { SearchBig: () => import("@/components/search/SearchBig") },
        data() {
            return {
                clearSearchParams: false,
            };
        },
        computed: {
            routeHasSearchParams() {
                const query = this.$route.query;
                return query && Object.keys(query).length > 0 && sfmQueryHasProp(query);
            },
        },
        methods: {
            ...mapMutations({
                setModalFilterClosed: 'search/setModalFilterClosed',
            }),
            ...mapActions({
                closeModal: "modals/closeModal",
            }),
            handleModalClose() {
                this.closeModal();
                const query = Object.assign({}, this.$route.query, { 'modal-filter': true });
                this.$router.push({ query });
            },
            onClearClick() {
                let query = JSON.parse(JSON.stringify(this.$route.query));
                this.clearSearchParams = true;

                for (let i = 0; i < sfmQueryNames.length; i++) {
                    if (query.hasOwnProperty(sfmQueryNames[i])) {
                        delete query[sfmQueryNames[i]];
                    }
                }

                this.$router.push({ query });
            },
        },
        beforeMount() {
            let query = Object.assign({}, this.$route.query);
            delete query['modal-filter'];
            this.$router.push({ query });
        },
    };
</script>

<style scoped></style>
