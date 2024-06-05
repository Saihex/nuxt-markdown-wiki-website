export const fixup_category_name = function (category_name: string) {
  const words = category_name.split("_");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the capitalized words with a space
  const formattedString = capitalizedWords.join(" ");

  return formattedString;
};

export const new_tab_out_urls = function () {
  const url = useRequestURL();
  const any_port = url.port != "" ? `:${url.port}` : "";
  const website_domain = `${url.protocol}//${url.hostname}${any_port}`;
  const url_elements = Array.from(
    document.querySelectorAll("#page_contents a")
  );

  url_elements.forEach((element) => {
    const href = element.getAttribute("href");
    if (href) {
      const outside_url = !href.startsWith(website_domain);
      const is_http = href.startsWith("https://") || href.startsWith("http://");

      if (outside_url && is_http) {
        element.setAttribute("target", "_blank");
      }
    }
  });

  return url_elements;
};
