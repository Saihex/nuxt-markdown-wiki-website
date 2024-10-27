import type { franchise_data, search_result } from "./generic_types";

export async function getFranchiseFrontmatters_useFetch(
  franchise_id: string
): Promise<franchise_data | null> {
  const _franchise_data = await useFetch(
    `${getOriginURL()}/api/msc/frontmatter/${franchise_id}/index.md?markdown_count=true`
  );

  if (!_franchise_data.error.value && _franchise_data.data.value) {
    const frontmatter = _franchise_data.data.value as franchise_data;
    frontmatter.dynamic_path = franchise_id;
    return frontmatter;
  }

  return null;
}

/** $fetch LACKS ERROR HANDLING, DATA MAY OR NOT BE INVALID */
export async function getFranchiseFrontmatters_$Fetch(
  franchise_id: string
): Promise<franchise_data> {
  const _franchise_data: franchise_data = await $fetch(
    `${getOriginURL()}/api/msc/frontmatter/${franchise_id}/index.md?markdown_count=true`
  );

  return _franchise_data;
}

export async function searchDirectory(
  forwarding_path: string,
  dirMode: boolean,
  searchEntry: string,
  useFetchMode: boolean
): Promise<string[] | null> {
  const url = new URL(`${getOriginURL()}/api/msc/dirSearch/${forwarding_path}`);

  // Sanitize and encode the query value
  if (dirMode) {
    url.searchParams.set("directoryMode", "true");
  }
  url.searchParams.set("searchEntry", searchEntry);

  const FetchURL = url.toString();

  // final
  if (useFetchMode) {
    const search_return = await useFetch(FetchURL);

    if (search_return.error.value) return null;

    return search_return.data.value as string[];
  } else {
    const response = await $fetch(FetchURL);
    return response as string[];
  }
}

export async function fetchMarkdownFile(
  path: string,
  useFetchMode: boolean
): Promise<string | null> {
  if (useFetchMode) {
    const markdown = await useFetch(`${getOriginURL()}/api/msc/files/${path}`);

    if (markdown.error.value) return null;
    return markdown.data.value as string;
  } else {
    const markdown = await $fetch(`${getOriginURL()}/api/msc/files/${path}`);
    return markdown as string;
  }
}

export async function fetchModificationDate(
  path: string,
  useFetchMode: boolean
): Promise<number | null> {
  if (useFetchMode) {
    const markdown = await useFetch(`${getOriginURL()}/api/msc/fileModiDate/${path}`);

    if (markdown.error.value) return null;
    return (markdown.data.value as {[key: string]: number}).unix_modification_date;
  } else {
    const markdown = await $fetch(`${getOriginURL()}/api/msc/fileModiDate/${path}`);
    return (markdown as {[key: string]: number}).unix_modification_date;
  }
}

export async function getSearchFrontmatters(
  file_path: string,
  useFetchMode: boolean
): Promise<search_result | null> {
  if (useFetchMode) {
    const frontmatter_return = await useFetch(
      `${getOriginURL()}/api/msc/frontmatter/${file_path}`
    );

    if (frontmatter_return.error.value) return null;
    return frontmatter_return.data.value as search_result;

  } else {
    const frontmatter: search_result = await $fetch(
      `${getOriginURL()}/api/msc/frontmatter/${file_path}`
    );
    return frontmatter;
  }
}

export function getOriginURL() {
  return process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://wiki.saihex.com";
}
