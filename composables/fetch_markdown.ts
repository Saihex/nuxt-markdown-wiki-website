import type { AsyncDataRequestStatus } from "#app";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const check_error = function (
  status: globalThis.Ref<AsyncDataRequestStatus>,
  error: any,
  route: RouteLocationNormalizedLoaded
) {
  if (status.value == "error" && error.value && error.value.statusCode == 404) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
    });
  } else if (
    (error.value && error.value.statusCode == 500) ||
    typeof route.params.franchise != "string"
  ) {
    throw createError({
      statusCode: 500,
      statusMessage: "Oop",
    });
  }
};

export const fetch_markdown_parse = async function (
  path: string,
  franchise: string,
  route: RouteLocationNormalizedLoaded
) {
  // Run the requests in parallel
  const markdown_return = await useFetch(`/api/get_markdown/${path}`, {
    server: true,
  });

  // Destructure the responses
  const { data: markdownString, status, error } = markdown_return;

  const value = markdownString.value as {
    markdown_string: string;
    franchise_data: string;
  };

  if (
    typeof value !== "object" || // Check if value is not an object
    value === null || // Check if value is null
    typeof value.markdown_string !== "string" || // Check if markdown_string is not a string
    typeof value.franchise_data !== "string" // Check if franchise_data is not a string
  ) {
    throw createError({
      statusCode: 500,
      statusMessage: "Oop",
    });
  }

  check_error(status, error, route);

  value.markdown_string = value.markdown_string.replace(
    "](./",
    `](${route.params.franchise}/`
  );

  const parsed_markdown = await parseMarkdown(value.markdown_string);
  const franchise_parsed_markdown = await parseMarkdown(value.franchise_data);

  const franchise_data = franchise_parsed_markdown.data;

  return { parsed_markdown, franchise_data };
};
