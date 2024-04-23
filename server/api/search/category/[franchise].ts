interface category_search_result {
  title: string,
  description: string,
  image: string,
  dynamic_route: string
}

export default defineEventHandler(async (event) => {
  const endpoint =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "http://markdown_cat_server:8080";
  let response1: category_search_result[] = [];
  let reqQuery = getQuery(event);

  try {
    response1 = (await $fetch(
      `${endpoint}/${event.context.params?.franchise}`,
      {
        method: "GET",
        query: {
          search_input: reqQuery.search_input,
          category_search: true,
        },
      }
    )) as category_search_result[];
  } catch (error: any) {
    if (typeof error == "object" && error instanceof Error) {
      if (error.message.indexOf("404") > 0) {
        event.node.res.statusCode = 404;
      } else {
        event.node.res.statusCode = 500;
      }
    }

    return;
  }

  return response1;
});
