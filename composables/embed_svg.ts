const saihex_image_url = "https://img.saihex.com/";

function removeQueryParams(url: string): string {
    try {
        const parsedUrl = new URL(url);
        // Remove the query string by setting search to an empty string
        parsedUrl.search = '';
        // Reconstruct the URL without query parameters
        return parsedUrl.toString();
    } catch (error) {
        console.error('Invalid URL:', error);
        return url; // Return the original URL if it's invalid
    }
}

export const embed_svg_url = function (url: string): string {
    const parsed_url = removeQueryParams(url);
    if (url.startsWith(saihex_image_url) && (parsed_url.endsWith(".svg") || parsed_url.endsWith(".png") || parsed_url.endsWith(".jpg") || parsed_url.endsWith(".jpeg"))) {
        return `https://img.saihex.com/webp?src=${parsed_url.substring(saihex_image_url.length)}`;
    } else {
        return url;
    }
};
