export default defineEventHandler(async (event) => {
  const endpoint = process.env.NODE_ENV !== "production" ? "http://localhost:8080" : "http://markdown_cat_server:8080"
  const [response1, response2] = await Promise.all([
    $fetch(`${endpoint}/${event.context.params?._}`, {
      method: "GET",
    }),
    $fetch(
      `${endpoint}/${
        event.context.params?._.split(".")[0].split("/")[0]
      }?franchise=true`,
      { method: "GET" }
    ),
  ]);

  return { markdown_string: response1, franchise_data: response2 };
});
