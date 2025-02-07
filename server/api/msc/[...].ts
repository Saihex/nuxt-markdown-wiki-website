export default defineEventHandler(async (event) => {
  // Set the endpoint based on the environment
  const endpoint =
    process.env.NODE_ENV !== "production"
      ? "http://0.0.0.0:8080"
      : "http://markdown_cat_server:8080";


  // Construct the target URL by appending the original request path
  const path = event.node.req.url?.replace('/api/msc', '') || '';
  const targetUrl = new URL(path, endpoint);

  // Prepare headers to pass to the fetch request
  const headers: HeadersInit = {};
  
  // Populate headers ensuring all values are strings
  for (const [key, value] of Object.entries(event.node.req.headers)) {
    if (typeof value === 'string') {
      headers[key] = value; // Directly assign string values
    } else if (Array.isArray(value)) {
      headers[key] = value.join(', '); // Join array values into a comma-separated string
    }
  }

  // Forward the request to the target URL using fetch
  let response;

  try {
    response = await fetch(targetUrl.toString());
  } catch (err) {
    event.node.res.statusCode = 500;
    event.node.res.setHeader('Cache-Control', 'no-cache');
    return err;
  }

  // Get the response body and status code from the target server
  const responseBody = await response.text();
  const statusCode = response.status;

  // Set the status code and return the response body
  event.node.res.statusCode = statusCode;
  event.node.res.setHeader('Content-Type', response.headers.get('Content-Type') || 'application/json');
  event.node.res.setHeader('Cache-Control', response.headers.get('Cache-Control') || 'no-cache');

  return responseBody;
});
