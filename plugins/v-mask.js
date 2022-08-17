import Vue from "vue";
import VueMask from "v-mask";

Vue.use(VueMask, {   // (!) custom placeholders support requires registration as a plugin to
    placeholders: {
        D: /[0-3]/,         // ведущая цифра дней месяца(от 0 до 3) для формата DD.*.*
        M: /[0-1]/         // ведущая цифра месяца(от 0 до 1) для формата *.MM.*
    }
});
