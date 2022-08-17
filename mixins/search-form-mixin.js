import { sfmPrepearFormData } from '@/helpers/search';
import { mapGetters } from 'vuex';

export const searchFormMixin = {
    data() {
        return {
            options: {},
        };
    },
    computed: {
        ...mapGetters({
            getFilteredOptions: 'search/getFilteredOptions',
        }),
    },
    methods: {
        fillSelectedParamsOnInit() {
            const params = this.$route.query;

            if (params && Object.keys(params).length > 0) {
                let dates = {};
                let prices = {};

                for (const [key, val] of Object.entries(params)) {
                    if (
                        key === 'departure_date_from' && params.departure_date_from ||
                        key === 'departure_date_to' && params.departure_date_to
                    ) {
                        dates[key] = val;
                        continue;
                    }

                    if (key === 'price_from' || key === 'price_to' && val) {
                        prices[key] = val;
                        continue;
                    }

                    if (key === 'is_weekend') {
                        this.formData[key] = val && val === 'true';
                        continue;
                    }

                    if (val) {
                        this.formData[key] = val.split(',');
                    }
                }

                // set departure date
                if (Object.keys(dates).length > 1 && this.formData) this.fillDepartureDates(dates);
                // set price
                if (Object.keys(prices).length > 1 && this.formData) this.fillPrices(prices);
            }
        },
        fillDepartureDates(dates) {
            const start = dates.departure_date_from.split('.');
            const end = dates.departure_date_to.split('.');

            this.$set(this.formData, 'departureDate', {
                end: new Date(end[2], Number(end[1]) - 1, end[0]),
                start: new Date(start[2], Number(start[1]) - 1, start[0]),
            });
            dates = null;
        },
        fillPrices(prices) {
            this.$set(this.formData, 'priceRange', [prices.price_from, prices.price_to]);
        },
        onSelect() {
            const departureDate = this.formData.departureDate;
            if(Object.keys(this.formData.departureDate).length < 2) this.formData.departureDate = null;

            const preparedData = sfmPrepearFormData(this.formData, this.$dayjs);
            this.formData.departureDate = departureDate;

            this.$router.push({ query: preparedData });
        },
    },
    watch: {
        value(val) {
            if (val) {
                for (const key in this.formData) {
                    if (key === 'is_weekend') {
                        this.formData[key] = false;
                    } else if (key === 'priceRange') {
                        this.formData[key] = [null, null];
                    } else if (key === 'departureDate') {
                        this.formData[key] = {};
                    }else {
                            this.formData[key] = null;
                        }
                    }

                this.$emit('input', false);
            }
        },
    },
    mounted() {
        this.fillSelectedParamsOnInit();
    },
};
