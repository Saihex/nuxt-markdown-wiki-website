export default defineEventHandler(async (event) => {
  const endpoint =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "http://markdown_cat_server:8080";
  let xml_return = "";

  try {

    xml_return = await (await fetch(`${endpoint}/sitemap/${event.context.params?._}`)).text();

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

  return xml_return;
});
