interface franchise_data {
    title: string,
    description: string,
    ico_image: string,
    wiki_head_image: string,
    default_embed_image: string,
    image: string,
    franchise_proper_name: String,
    page_count: Number,
    dynamic_path: String,
  }

export default defineEventHandler(async (event) => {
  const endpoint =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "http://markdown_cat_server:8080";
  let response1: franchise_data[] = [];
  let reqQuery = getQuery(event);

  try {
    response1 = (await $fetch(
      `${endpoint}`,
      {
        method: "GET",
        query: {
            root_dir_search: true,
            search_input: reqQuery.search_input
        },
      }
    )) as franchise_data[];
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
