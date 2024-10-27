<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc/runtime/types/parser";
import Wiki_contents from "~/components/wiki_contents.vue";
import type { franchise_data } from "~/composables/v2/generic_types";
import * as essentials from "~/composables/v2/essential_functions";

const route = useRoute();
await remove_trailing_slash(route);
const view_image_ref = create_image_viewer_ref();
const mounted = ref(false);
let the_franchise_data: franchise_data;
let parsed_markdown: MDCParserResult;
let last_changed_unix = 0;

// fetch markdown
{
    const main_page_frontmatter = await essentials.getFranchiseFrontmatters_useFetch(route.params.franchise as string);

    if (main_page_frontmatter) {
        the_franchise_data = main_page_frontmatter;

    } else {
        throw createError({
            statusCode: 404,
            statusMessage: "Page Not Found",
        });
    }

    const this_page_markdown = await essentials.fetchMarkdownFile(`${route.params.franchise as string}/category/${route.params._category}/${route.params.page}.md`, true);

    if (this_page_markdown) {
        parsed_markdown = await parseMarkdown(
            this_page_markdown
        );
    } else {
        throw createError({
            statusCode: 404,
            statusMessage: "Page Not Found",
        });
    }

    const this_page_modidate = await essentials.fetchModificationDate(`${route.params.franchise as string}/category/${route.params._category}/${route.params.page}.md`, true);

    if (this_page_modidate) {
        last_changed_unix = this_page_modidate;
    } else {
        last_changed_unix = 0;
    }
}

const history_data = {
    absolute_url: `${route.fullPath}`,
    cover_image: parsed_markdown.data.image,
    title: parsed_markdown.data.title,
};

onMounted(async () => {
    update_hash_effect(route);

    mounted.value = true;
    await nextTick();
    refresh_image_elements(view_image_ref);
    await new_tab_out_urls();
});

watch(() => route.hash, () => {
    update_hash_effect(route);
})

const spoiler_warning = parsed_markdown.data.spoiler ? '[SPOILER WARNING]\n' : '';

// meta

const page_title = `${parsed_markdown.data.title} - ${fixup_category_name(route.params._category as string)} Category - ${the_franchise_data.franchise_proper_name} - Saihex Wiki`;
const page_desc = add_description_mark(spoiler_warning + `\n[${fixup_category_name(route.params._category as string)} Category]\n` + parsed_markdown.data.description, last_changed_unix);

useHead({
    title: page_title,
    meta: [
        { name: 'description', content: page_desc },
        { name: 'twitter:card', content: "summary_large_image" }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: the_franchise_data.ico_image }
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
    <ImageViewer :visible_ref="view_image_ref.visible_ref.value" :url_ref="view_image_ref.url_ref.value" @close="view_image_ref.url_ref.value = ``; view_image_ref.visible_ref.value = false">
    </ImageViewer>

    <LoadingOverlay :visible="!mounted"></LoadingOverlay>

    <div :class="!mounted ? `overflow-hidden` : ``">
        <Wiki_contents :franchise="route.params.franchise as string" :additional_data="history_data">
            <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->

                <Wiki_header :franchise="route.params.franchise" :franchise_image="the_franchise_data.wiki_head_image" :raw_markdown="`/api/msc/files/${route.params.franchise as string}/category/${route.params._category}/${route.params.page}.md`" :page_count="the_franchise_data.page_count"
                    :saihex_creation="the_franchise_data" :spoiler="parsed_markdown.data.spoiler" :category_str="route.params._category" />

                <div class="hidden above-tablet:flex above-tablet:centerItem above-tablet:wiki_header_buttons_nohover">
                    <img preload :src="parsed_markdown.data.image" class="h-32 mr-1" alt="page icon" />
                </div>
            </div>

            <div class="pageDataContainer">
                <h1 class="text-xl italic opacity-50">Last database change on {{ date_formatter(last_changed_unix) }}</h1>
                <div class="wiki_container" id="page_contents">
                    <ContentRendererMarkdown :value="parsed_markdown" class="min-h-svh">
                    </ContentRendererMarkdown>
                </div>
            </div>
        </Wiki_contents>
    </div>
</template>

<style>
@import url("~/assets/css/generic_markdown_style.css");
</style>