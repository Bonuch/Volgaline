export default function({ store, redirect, req, route }) {
    if (!store.getters["users/isLogged"]) {
        // store.dispatch("modals/openModal", {
        //     name: "ModalRegistration"
        // });
        // if (route.path.substring(0, 8) !== '/orders/') {
        //     return redirect("/");
        // }
    }
}
