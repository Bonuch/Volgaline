import { mapSettings, parseQuery } from '../helpers/helpers';

export const state = () => ({
    windowWidth: 0,
    headerNotification: null,
    mobileMenuActivity: null,
    overlayStatus: null,
    map: {},
    socials: [],
    mainNav: [],
    footerNav: [],
    QuickCruiseSearchNav: [],
    currentMainNavItem: null,
    headerNavActivity: false,
    allSettings: {},
    workTime: null,
    innerCruisesOrientation: 'list', // 'list, grid, line',
});

export const getters = {
    getWindowWidth(state) {
        return state.windowWidth;
    },
    getInnerCruisesOrientation(state) {
        return state.innerCruisesOrientation;
    },
    getOverlayStatus(state) {
        return state.overlayStatus;
    },
    getAllSettings(state) {
        return state.allSettings;
    },
    getSettingsByName(state) {
        return (prop, field) => {
            const all = state.allSettings;
            return (all.hasOwnProperty(prop) && all[prop].hasOwnProperty(field)) ? all[prop][field] : null;
        };
    },
    getHeaderNotification(state) {
        return state.headerNotification;
    },
    getMobileMenuActivity(state) {
        return state.mobileMenuActivity;
    },
    getSocials(state) {
        return state.socials;
    },
    getMap(state) {
        return state.map;
    },
    getMainNav(state) {
        return state.mainNav;
    },
    getCurrentMainNavItem(state) {
        return state.currentMainNavItem;
    },
    getHeaderNavActivity(state) {
        return state.headerNavActivity;
    },
    getFooterNav(state) {
        return state.footerNav;
    },
    getQuickCruiseSearchNav(state) {
        return state.QuickCruiseSearchNav;
    },
};

export const mutations = {
    setWindowWidth(state, payload) {
        state.windowWidth = payload;
    },
    setOverlayStatus(state, payload) {
        state.overlayStatus = payload;
    },
    setAllSettings(state, payload) {
        state.allSettings = payload;
    },
    setHeaderNotification(state, payload) {
        state.headerNotification = payload;
    },
    setMobileMenuActivity(state, payload) {
        state.mobileMenuActivity = payload;
    },
    setSocials(state, payload) {
        state.socials = payload;
    },
    setMap(state, payload) {
        state.map = payload;
    },
    setMainNav(state, payload) {
        state.mainNav = payload;
    },
    setCurrentMainNavItem(state, payload) {
        state.currentMainNavItem = payload;
    },
    setHeaderNavActivity(state, payload) {
        state.headerNavActivity = payload;
    },
    setFooterNav(state, payload) {
        state.footerNav = payload;
    },
    setInnerCruisesOrientation(state, payload) {
        state.innerCruisesOrientation = payload;
    },
    setQuickCruiseSearchNav(state, payload) {
        state.QuickCruiseSearchNav = payload;
    },
};

export const actions = {
    async nuxtServerInit({ getters, dispatch }, { app, route }) {
        // запоминаем UTM метки в кукисы для дальнейшего учета в заказе
        if (route.query) {
            for (const key of Object.keys(route.query)) {
                if (key.substr(0, 4) === 'utm_') {
                    app.$cookies.set(key, route.query[key]);
                }

                if (key === 'click_id') {
                    app.$cookies.set('click_id', route.query[key]);
                }
            }
        }

        await dispatch('fetchSiteSettings');
        await dispatch('users/getUserByToken');

        // if (getters['users/isLogged']) {
            await dispatch('cart/fetchCartItems');
        // }
    },
    toggleMobileMenu({ commit, state }) {
        commit('setMobileMenuActivity', !state.mobileMenuActivity);
    },
    closeMobileMenu({ commit }) {
        commit('setMobileMenuActivity', null);
    },
    async fetchSiteSettings({ commit }) {
        try {
            const { data } = await this.$axios.get('/site-settings');
            const settings = mapSettings(data.settings);
            commit('setAllSettings', settings);
            commit('setMainNav', data.header.items);
            commit('setQuickCruiseSearchNav', data.quick_cruise_search.items);
            commit('setFooterNav', data.footer.items);
            commit('setHeaderNotification', settings.notification.value)
            commit('setSocials', [
                { link: settings.vk.value, icon: 'VkIcon', iconCircle: 'VkIconCircle' },
                //{ link: settings.insta.value, icon: 'InstaIcon', iconCircle: 'InstaIconCircle' },
                { link: settings.odnoklassniki.value, icon: 'MatesIcon', iconCircle: 'MatesIconCircle' },
            ]);
            commit('setMap', {
                coords: settings.map.value,
                vector: settings.map.value_2,
                desc: settings.map_description.value,
            });
        } catch (ex) {
            console.log('cant fetch site settings: ' + ex);
        }
    },
};
