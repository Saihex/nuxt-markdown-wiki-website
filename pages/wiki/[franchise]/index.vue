<script setup lang="ts">
import Wiki_contents from '~/components/wiki_contents.vue';

const route = useRoute();
await remove_trailing_slash(route);
const path = `${route.params.franchise}/index.md`;
const show_loading = ref(true);
const { parsed_markdown, franchise_data, used_path } = await fetch_markdown_parse(path, route);
const mounted = ref(false);
const view_image_ref = create_image_viewer_ref();

const history_data = {
    absolute_url: `${route.fullPath}`,
    cover_image: parsed_markdown.data.image,
    title: parsed_markdown.data.title
}

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

show_loading.value = false;

useHead({
    title: `Home - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    meta: [
        { name: 'description', content: add_description_mark(`[${franchise_data.franchise_proper_name} Franchise] \n${parsed_markdown.data.description}`, franchise_data.last_modified) },
        { name: 'twitter:card', content: "summary_large_image" }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_image = embed_svg_url(parsed_markdown.data.default_embed_image);

useSeoMeta({
    ogTitle: `Home - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    twitterTitle: `Home - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    ogDescription: add_description_mark(`[${franchise_data.franchise_proper_name} Franchise] \n${parsed_markdown.data.description}`, franchise_data.last_modified),
    twitterDescription: add_description_mark(`[${franchise_data.franchise_proper_name} Franchise] \n${parsed_markdown.data.description}`, franchise_data.last_modified),
    ogImage: embed_image,
    twitterImage: embed_image,
})
</script>

<template>
    <ImageViewer :visible_ref="view_image_ref.visible_ref.value" :url_ref="view_image_ref.url_ref.value" @close="view_image_ref.url_ref.value = ``; view_image_ref.visible_ref.value = false">
    </ImageViewer>

    <LoadingOverlay :visible="!mounted"></LoadingOverlay>

    <div :class="!mounted ? `overflow-hidden` : ``">
        <Wiki_contents :franchise="route.params.franchise as string" :additional_data="history_data">
            <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->
                <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image" :raw_json="used_path" :page_count="franchise_data.page_count"
                    :saihex_creation="franchise_data.saihex_creation" />
                <!-- logo -->
                <div class="hidden tablet:flex md:centerItem md:wiki_header_buttons_nohover h-32 w-32">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
            </div>

            <div class="pageDataContainer">
                <h1 class="text-xl italic opacity-50">Last database change on {{ date_formatter(franchise_data.last_modified) }}</h1>

                <div class="wiki_container" id="page_contents">
                    <pa class="flex text-5xl m-24 content-center min-h-svh" v-if="show_loading">Loading...</pa>
                    <ContentRendererMarkdown v-if="!show_loading" :value="parsed_markdown" class="min-h-svh">
                    </ContentRendererMarkdown>
                </div>
            </div>
        </Wiki_contents>
    </div>
</template>

<style>
@import url("~/assets/css/generic_markdown_style.css");
</style>