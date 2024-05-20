interface references {
  url_ref: globalThis.Ref<string>;
  visible_ref: globalThis.Ref<boolean>;
}

const refresh_image_elements = function (ref: references) {
  const image_elements = document.querySelectorAll("#page_contents img");
  const arr_of_elements = Array.from(image_elements);

  arr_of_elements.forEach((element) => {
    let found = false;
    for (let i = 0; i < element.classList.length; i++) {
      if (element.classList[i] == "no-view-image") {
        found = true;
        break;
      }
    }

    if (!found) {
      element.classList.add("cursor-pointer");
      element.classList.add("image_scale_up");

      element.addEventListener("click", () => {
        const src = element.getAttribute("src");
        ref.url_ref.value = typeof src == "string" ? src : "";
        ref.visible_ref.value = true;
      });
    }
  });
};

const create_image_viewer_ref = function (): references {
  return {
    url_ref: ref(""),
    visible_ref: ref(false),
  };
};

export { refresh_image_elements, create_image_viewer_ref };
export type { references };
