<script setup lang="ts">
import Wiki_header from '~/components/wiki_header.vue';

const route = useRoute();
const path = `${route.params.franchise}/changes.md`;
const show_loading = ref(true);
const {parsed_markdown, franchise_data, used_path} = await fetch_markdown_parse(path, route);
const last_changed_unix = await fetch_last_changed(path);
const mounted = ref(false);

show_loading.value = false;

const view_image_ref = create_image_viewer_ref();

onMounted(async () => {
    update_hash_effect(route);

    mounted.value = true;
    await nextTick();
    refresh_image_elements(view_image_ref);
    await new_tab_out_urls();
})

watch(() => route.hash, () => {
    update_hash_effect(route);
})

const page_title = `Recent Changes - ${franchise_data.franchise_proper_name} - Saihex Wiki`;
const page_desc = add_description_mark(`latest changes made on ${franchise_data.franchise_proper_name} wiki`, last_changed_unix);

useHead({
    title: page_title,
    meta: [
        { name: 'description', content: page_desc },
        { name: 'twitter:card', content: "summary_large_image"}
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_images = embed_svg_url(parsed_markdown.data.image);

useSeoMeta({
    ogTitle: page_title,
    twitterTitle: page_title,
    ogDescription: page_desc,
    twitterDescription: page_desc,
	ogImage: embed_images,
	twitterImage: embed_images,
})
</script>

<template>
    <ImageViewer :visible_ref="view_image_ref.visible_ref.value" :url_ref="view_image_ref.url_ref.value"
        @close="view_image_ref.url_ref.value = ``; view_image_ref.visible_ref.value = false"></ImageViewer>

    <LoadingOverlay :visible="!mounted"></LoadingOverlay>

    <div :class="!mounted ? `overflow-hidden` : ``">
        <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->

            <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image"
                :raw_json="used_path" :page_count="franchise_data.page_count" :saihex_creation="franchise_data"
                :spoiler="parsed_markdown.data.spoiler" :category_str="route.params._category" />

            <div class="hidden md:flex md:centerItem md:wiki_header_buttons_nohover">
                <img preload :src="parsed_markdown.data.image" class="h-32 mr-1" alt="page icon" />
            </div>
        </div>

        <div class="pageDataContainer">
            <h1 class="text-xl italic opacity-50">Last database change on {{date_formatter(last_changed_unix)}}</h1>
            <div class="wiki_container" id="page_contents">
                <pa class="flex text-5xl m-24 content-center min-h-svh" v-if="show_loading">Loading...</pa>
                <ContentRendererMarkdown v-if="!show_loading" :value="parsed_markdown" class="min-h-svh">
                </ContentRendererMarkdown>
            </div>
        </div>
    </div>
</template>

<style>
@import url("~/assets/css/generic_markdown_style.css");
</style>