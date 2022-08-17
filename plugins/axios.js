export default ({ store, app: { $axios, error, $cookies } }) => {
    $axios.onRequest(config => {
        const token = $cookies.get("authUser");

        if (token) {
            config.headers.common["Authorization"] = `Bearer ${token}`;
        }
    });

    $axios.onResponseError(response => {
        if (response && response.response && response.response.status && response.response.status === 401) {
            store.dispatch('users/logout');
        }
    });
}
