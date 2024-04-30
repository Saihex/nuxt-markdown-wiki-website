<script setup lang="ts">
const route = useRoute();
remove_trailing_slash(route);
const path = `${route.params.franchise}/index.md`;
const show_loading = ref(true);
const {parsed_markdown, franchise_data, used_path} = await fetch_markdown_parse(path, route);

show_loading.value = false;

useHead({
    title: `${franchise_data.franchise_proper_name} - Home`,
    meta: [
        { name: 'description', content: parsed_markdown.data.description },
        { name: 'twitter:card', content: "summary"}
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_image = embed_svg_url(parsed_markdown.data.default_embed_image);

useSeoMeta({
    ogTitle: `${franchise_data.franchise_proper_name} - Home`,
    twitterTitle: `${franchise_data.franchise_proper_name} - Home`,
    ogDescription: parsed_markdown.data.description,
    twitterDescription: parsed_markdown.data.description,
	ogImage: embed_image,
	twitterImage: embed_image,
})
</script>

<template>
    <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->
        <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image"
            :raw_json="used_path" :page_count="franchise_data.page_count" />
        <!-- logo -->
        <div class="hidden md:flex md:centerItem md:wiki_header_buttons_nohover h-32 w-32">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-32 h-32">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </div>
    </div>

    <div class="pageDataContainer">
        <container class="wiki_container">
            <pa class="flex text-5xl m-24 content-center min-h-svh" v-if="show_loading">Loading...</pa>
            <ContentRendererMarkdown v-if="!show_loading" :value="parsed_markdown" class="min-h-svh">
            </ContentRendererMarkdown>
        </container>
    </div>
</template>

<style>
@import url("~/assets/css/generic_markdown_style.css");
</style>