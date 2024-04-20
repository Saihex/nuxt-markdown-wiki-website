export default defineEventHandler(async (event) => {
  const endpoint =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "http://markdown_cat_server:8080";
  let [response1, response2]: [object, object] = [{}, {}];

  try {
    [response1, response2] = await Promise.all([
      $fetch(`${endpoint}/${event.context.params?._}`, {
        method: "GET",
      }) as object,
      $fetch(
        `${endpoint}/${
          event.context.params?._.split(".")[0].split("/")[0]
        }?franchise=true`,
        { method: "GET" }
      ) as object,
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

  
  return { markdown_string: response1, franchise_data: response2 };
});
