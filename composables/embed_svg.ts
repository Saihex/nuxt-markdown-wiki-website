import type { AsyncDataRequestStatus } from "#app";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const saihex_image_url = "https://img.saihex.com/";

export const embed_svg_url = function (url: string): string {
    if (url.startsWith(saihex_image_url) && url.endsWith(".svg")) {
        return `https://img.saihex.com/svg_png?src=${url.substring(saihex_image_url.length)}`;
    } else {
        return url;
    }
};
