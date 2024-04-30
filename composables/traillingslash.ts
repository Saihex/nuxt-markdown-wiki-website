import type { RouteLocationNormalizedLoaded } from "vue-router";

export const remove_trailing_slash = function (router : RouteLocationNormalizedLoaded) {
    if (router.path.endsWith("/")) {
        const newPath = router.path.slice(0, -1);
        console.log(newPath);
        navigateTo(newPath);
    }
};
