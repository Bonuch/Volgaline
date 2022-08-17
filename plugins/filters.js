import Vue from 'vue';
import { formatCurrency } from "@/helpers/text";


Vue.filter('formatPrice', (value) => {
    return formatCurrency(value);
});
