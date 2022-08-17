export const state = () => ({
    user: {},
    userDetailContent: {},
});

export const getters = {
    getUser(state) {
        return state.user;
    },
    getUserDetailContent(state) {
        return state.userDetailContent;
    },
    isLogged(state) {
        return state.user && Object.keys(state.user).length > 0;
    },
};

export const mutations = {
    setUser(state, payload) {
        if (typeof(window) !== 'undefined') {
            window.LogRocket && window.LogRocket.identify(payload.id, {
                name: payload.name,
                email: payload.email,
                role: payload.role
            });
        }
        state.user = payload;
    },
    setUserDetailContent(state, payload) {
        state.userDetailContent = payload;
    },
};

export const actions = {
    async updateUser({ commit }, payload) {
        commit("setUser", payload);
    },
    async updateToken({ commit }, payload) {
        // todo crypt token
        this.$cookies.set("authUser", payload);
    },
    async getUserByToken({ commit, dispatch }) {
        const token = this.$cookies.get("authUser");
        if (token) {
            try {
                const { data } = await this.$axios.get("/profile");
                commit("setUser", data.data);
            } catch (ex) {
                this.$cookies.remove("authUser");
                console.log("cant get user: " + ex);
            }
        } else {
            dispatch("logout");
        }
    },
    async logout({ commit, dispatch }) {
        this.$cookies.remove("authUser");
        commit("setUser", null);
        dispatch("cart/updateCartItems", null, { root: true });
    },
};
