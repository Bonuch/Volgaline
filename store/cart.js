export const state = () => ({
    cartItem: null,
    cartItems: null,
    totalPrices: null,
    paymentTypes: [],
    dataFastBuy: null,
    cruiseID: null,
    operationFinished: false,
    bookingItems: null,
    cruiseSlug: null,
    promocode: null,
});

export const getters = {
    getCartItem(state) {
        return state.cartItem;
    },
    getCartItems(state) {
        return state.cartItems;
    },
    getFastBuyData(state) {
        return state.dataFastBuy;
    },
    getCruiseID(state) {
        return state.cruiseID;
    },
    getTotalPrices(state) {
        return state.totalPrices;
    },
    getPaymentTypes(state) {
        return state.paymentTypes;
    },
    getOperationFinished(state) {
        return state.operationFinished;
    },
    getBookingItems(state) {
        return state.bookingItems;
    },
    getCruiseSlug(state) {
        return state.cruiseSlug;
    },
    getPromocode(state) {
        return state.promocode;
    },
};

export const mutations = {
    setCartItem(state, payload) {
        state.cartItem = payload;
    },
    setCartItems(state, payload) {
        state.cartItems = payload;
    },
    setFastBuyData(state, payload) {
        state.dataFastBuy = payload;
    },
    setCruiseID(state, payload) {
        state.cruiseID = payload;
    },
    setTotalPrices(state, payload) {
        state.totalPrices = payload;
    },
    setOperationFinished(state, payload) {
        state.operationFinished = payload;
    },
    setPaymentTypes(state) {
        return state.paymentTypes;
    },
    setBookingItems(state, payload) {
        state.bookingItems = payload;
    },
    setCruiseSlug(state, payload) {
        state.cruiseSlug = payload;
    },
    setPromocode(state, payload) {
        state.promocode = payload;
    },
};

export const actions = {
    onFastBuyClick({ commit, dispatch }, id) {
        dispatch(
            "modals/openModal",
            { name: "ModalFastBuy" },
            { root: true },
        );

        commit("setFastBuyData", id);
    },
    updateOperationFinished({ commit }, data) {
        commit("setOperationFinished", data);
    },
    updateCartItems({ commit }, data) {
        commit("setCartItems", data);
    },
    updateCartItem({ commit }, data) {
        commit("setCartItem", data);
    },
    updateTotalPrices({ commit }, payload) {
        commit("setTotalPrices", payload);
    },
    async fetchPaymentTypes({ commit }) {
        try {
            const { data } = await this.$axios.get('/cart/get-payment-types');
            commit('setPaymentTypes', data);
            return data;
        } catch (ex) {
            console.log("cant fetch cart items: " + ex);
        }
        return [];
    },
    async fetchCartItems({ commit }) {
        try {
            const { data } = await this.$axios.get("/cart/get");
            commit("setCartItems", data.items);
            commit("setTotalPrices", data.total);
        } catch (ex) {
            console.log("cant fetch cart items: " + ex);
        }
    },
    async addItemToCart({ state, commit, dispatch }, cartItem) {
        try {
            const { data } = await this.$axios.post("/cart/add", { ...cartItem });
            commit("setCartItems", data.items);
            commit("setTotalPrices", data.total);
            commit("setOperationFinished", true);
        } catch (ex) {
            console.log("cant add item to cart: " + ex);
            this.dispatch('modals/openModal', {
                name: 'ModalError',
                message: 'Произошла ошибка добавления в корзину, пожалуйста, попробуйте выбрать другую каюту'
            });
            commit("setOperationFinished", true);
        }
    },
    async removeItemFromCart({ commit, dispatch }, cruiseId) {
        try {
            const { data } = await this.$axios.get(`/cart/delete/${cruiseId}`);
            commit("setCartItems", data.items);
            commit("setTotalPrices", data.total);
        } catch (ex) {
            console.log("cant remove item from cart: " + ex);
            this.dispatch('modals/openModal', {
                name: 'ModalError',
                message: 'Произошла ошибка связи с сервером'
            });
        }
    },
    async removeCabinFromCartItem({ commit, dispatch }, { cruiseId, cabinId }) {
        try {
            const { data } = await this.$axios.get(`/cart/delete/${cruiseId}/${cabinId}`);
            commit("setCartItems", data.items);
            commit("setTotalPrices", data.total);
        } catch (ex) {
            console.log("cant delete cabin from cart item: " + ex);
            this.dispatch('modals/openModal', {
                name: 'ModalError',
                message: 'Произошла ошибка связи с сервером'
            });
        }
    },
    updateBookingItems({ state, commit }, { cruiseId, cabinId, passengers }) {
        const newCabin = {
            id: cabinId,
            passengers,
        };
        const newCruise = {
            id: cruiseId,
            cabins: [newCabin],
        };

        if (state.bookingItems && state.bookingItems.length > 0) {
            let cruises = JSON.parse(JSON.stringify(state.bookingItems));
            const cruiseIdx = cruises.findIndex(cruise => cruise.id === cruiseId);

            if (cruiseIdx !== -1) {
                const cruise = cruises[cruiseIdx];
                const cabinsIdx = cruises[cruiseIdx].cabins.findIndex(cabin => cabin.id === cabinId);

                if (cabinsIdx !== -1) {
                    cruise.cabins[cabinsIdx]['passengers'] = passengers;
                } else {
                    cruise.cabins.push(newCabin);
                }
            } else {
                cruises = [...cruises, newCruise];
            }

            commit("setBookingItems", cruises);
        } else {
            commit("setBookingItems", [newCruise]);
        }
    },
    clearBookingItems({ commit }) {
        commit("setBookingItems", null);
    },
};
