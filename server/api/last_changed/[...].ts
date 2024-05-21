export default defineEventHandler(async (event) => {
  const endpoint =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "http://markdown_cat_server:8080";
  let [response1]: [object] = [{}];

  try {
    [response1] = await Promise.all([
      $fetch(`${endpoint}/${event.context.params?._}?frontmatter_only=true`, {
        method: "GET",
      }) as object,
    ]);
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

  if (!("last_modified" in response1)) {
    event.node.res.statusCode = 500;
    return;
  }

  return response1.last_modified;
});
