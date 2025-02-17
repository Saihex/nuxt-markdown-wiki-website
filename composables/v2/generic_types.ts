export interface franchise_data {
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

export interface search_result {
  title: string;
  description: string;
  image: string;
  dynamic_route: string;
  spoiler: boolean;
  last_modified: number;
}
