import type { RouteLocationNormalizedLoaded } from "vue-router";

export const remove_trailing_slash = async function (router : RouteLocationNormalizedLoaded) {
    if (router.path.endsWith("/")) {
        const newPath = router.path.slice(0, -1);
        await navigateTo(newPath + router.hash);
    }
};
