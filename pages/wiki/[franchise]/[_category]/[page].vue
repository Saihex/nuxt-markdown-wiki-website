<script setup lang="ts">
import Wiki_header from '~/components/wiki_header.vue';

const route = useRoute();
const path = `${route.params.franchise}/${route.params._category}/${route.params.page}.md`;
const show_loading = ref(true);
const {parsed_markdown, franchise_data, used_path} = await fetch_markdown_parse(path, route);

show_loading.value = false;

useHead({
    title: `${franchise_data.franchise_proper_name} - ${parsed_markdown.data.title}`,
    meta: [
        { name: 'description', content: parsed_markdown.data.description },
        { name: 'twitter:card', content: "summary"}
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_images = embed_svg_url(parsed_markdown.data.image);

useSeoMeta({
    ogTitle: `${franchise_data.franchise_proper_name} - ${parsed_markdown.data.title}`,
    twitterTitle: `${franchise_data.franchise_proper_name} - ${parsed_markdown.data.title}`,
    ogDescription: parsed_markdown.data.description,
    twitterDescription: parsed_markdown.data.description,
	ogImage: embed_images,
	twitterImage: embed_images,
})
</script>

<template>
    <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->

        <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image"
            :raw_json="used_path" :page_count="franchise_data.page_count" />

        <div class="hidden md:flex md:centerItem md:wiki_header_buttons_nohover">
            <img preload :src="parsed_markdown.data.image" class="h-32 mr-1" />
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