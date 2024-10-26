export default interface franchise_data {
  title: string;
  description: string;
  ico_image: string;
  wiki_head_image: string;
  default_embed_image: string;
  image: string;
  franchise_proper_name: String;
  page_count: Number;
  dynamic_path: String;
  saihex_creation: boolean;
  last_modified: number;
}

export function getOriginURL() {
  return process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://wiki.saihex.com";
}
