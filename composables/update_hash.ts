import type { RouteLocationNormalizedLoaded } from "vue-router";

export const update_hash_effect = function (route: RouteLocationNormalizedLoaded) {
    const non_hash_elements = document.querySelectorAll(".highlight_bg");

    non_hash_elements.forEach((element) => {
        element.classList.remove("highlight_bg");
    });

    if (route.hash != "") {
        const hash = route.hash.replace("#", "");
        const element = document.getElementById(hash);

        element?.classList.add("highlight_bg");
    }
};
