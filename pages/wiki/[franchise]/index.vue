<script setup lang="ts">
const route = useRoute();
const path = `${route.params.franchise}/index.md`;
const show_loading = ref(true);
const {parsed_markdown, franchise_data} = await fetch_markdown_parse(path, route.params.franchise as string, route);

show_loading.value = false;

useHead({
    title: parsed_markdown.data.title,
    meta: [
        { name: 'description', content: parsed_markdown.data.description }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: parsed_markdown.data.title,
    twitterTitle: parsed_markdown.data.title,
    ogDescription: parsed_markdown.data.description,
    twitterDescription: parsed_markdown.data.description,
	ogImage: parsed_markdown.data.image,
	twitterImage: parsed_markdown.data.image,
})
</script>

<template>
    <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->

        <!-- logo -->
        <NuxtLink :to="`/wiki/${route.params.franchise}`" class="centerItem wiki_header_buttons">
            <img preload :src="franchise_data.wiki_head_image" class="h-32 mr-1" />
        </NuxtLink>
    </div>

    <div class="pageDataContainer">
        <container class="wiki_container">
            <pa class="flex text-5xl m-24 content-center min-h-svh" v-if="show_loading">Loading...</pa>
            <ContentRendererMarkdown v-if="!show_loading" :value="parsed_markdown" class="min-h-svh"></ContentRendererMarkdown>
        </container>
    </div>
</template>

<style>
@import url("~/assets/css/generic_markdown_style.css");
</style>