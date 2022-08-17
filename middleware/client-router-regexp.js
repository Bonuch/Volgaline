export default function(context) {
    const router = context.app.router;

    router.beforeEach((to, from, next) => {
        const routes = router.getRoutes();
        for (const route of Object.values(routes)) {
            if (route.meta.regex) {
                route.regex = new RegExp(route.meta.regex, 'i');
                route.regex.keys = [];
                route.path = to.fullPath;
            }
        }
        next();
    });
}
