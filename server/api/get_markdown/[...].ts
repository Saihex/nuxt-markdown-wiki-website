export default defineEventHandler(async (event) => {
  const [response1, response2] = await Promise.all([
    $fetch(`http://localhost:8080/${event.context.params?._}`, {
      method: "GET",
    }),
    $fetch(
      `http://localhost:8080/${
        event.context.params?._.split(".")[0].split("/")[0]
      }/index.md`,
      { method: "GET" }
    ),
  ]);

  return { markdown_string: response1, franchise_data: response2 };
});
