import createPersistedState from "vuex-persistedstate"

export default ({ store, req }) => {
    createPersistedState({
        storage: {
            getItem: (key) => {
                if (process.server) {
                    const parsedCookies = cookie.parse(req.headers.cookie);
                    return parsedCookies[key];
                } else {
                    return Cookies.get(key);
                }
            },
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) =>
                Cookies.set(key, value, { expires: 365, secure: false }),
            removeItem: key => Cookies.remove(key)
        }
    })(store);
};