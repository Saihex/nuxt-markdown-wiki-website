<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc/runtime/types/parser";
import { embed_svg_url } from '~/composables/embed_svg';
import * as essentials from "~/composables/v2/essential_functions";
import type { franchise_data, search_result } from '~/composables/v2/generic_types';

const route = useRoute();
await remove_trailing_slash(route);
const mounted = ref(false);
let the_franchise_data: franchise_data;
let parsed_markdown: MDCParserResult;
const inputValue = ref(
    typeof route.query.search == "string" ? route.query.search : ""
);

const fetchStatus = ref(1); // 0 no error, 1 fetching, 3 error, 4 empty
const results = ref<{ [key: string]: search_result }>({});


// initial search
{
    await essentials.heartbeatCheck(true, false);
    const main_page_frontmatter = await essentials.getFranchiseFrontmatters_useFetch(route.params.franchise as string);

    if (main_page_frontmatter) {
        the_franchise_data = main_page_frontmatter;

    } else {
        throw createError({
            statusCode: 404,
            statusMessage: "Page Not Found",
        });
    }

    const this_category_markdown = await essentials.fetchMarkdownFile(`${route.params.franchise as string}/category/${route.params._category}/index.md`, true);

    if (!this_category_markdown) {
        fetchStatus.value = 3;

        throw createError({
            status: 404
        })
    } else {
        parsed_markdown = await parseMarkdown(
            this_category_markdown
        );

        fetchStatus.value = 0;
    }

    results.value = {};

    fetchStatus.value = 1;
    const FetchResult = await essentials.searchDirectory(`${route.params.franchise as string}/category/${route.params._category}`, false, inputValue.value || "", true);

    if (!FetchResult) {
        fetchStatus.value = 3;
    } else {
        for (const key in FetchResult) {
            if (FetchResult[key] == "index.md") continue;
            const _category_data = await essentials.getSearchFrontmatters(`${route.params.franchise as string}/category/${route.params._category}/${FetchResult[key]}`, true);


            if (_category_data) {
                _category_data.dynamic_route = FetchResult[key].replace(".md", "");
                results.value[FetchResult[key]] = _category_data;
            }
        }

        fetchStatus.value = 0;
    }
}

async function searchLogic(searchEntry: string) {
    results.value = {};

    fetchStatus.value = 1;
    const FetchResult = await essentials.searchDirectory(`${route.params.franchise as string}/category/${route.params._category}`, false, searchEntry, false);

    if (!FetchResult) {
        fetchStatus.value = 3;
        return;
    }

    if (FetchResult.length > 0) {
        for (const key in FetchResult) {
            if (FetchResult[key] == "index.md") continue;
            const _category_data = await essentials.getSearchFrontmatters(`${route.params.franchise as string}/category/${route.params._category}/${FetchResult[key]}`, false);
            if (_category_data) {
                _category_data.dynamic_route = FetchResult[key].replace(".md", "");
                results.value[FetchResult[key]] = _category_data;
            }
        }
    }

    fetchStatus.value = 0;
}

const search_input = async (inputValue: string) => {
  if (fetchStatus.value == 1) return;
  await navigateTo(inputValue != "" ? `?search=${inputValue}` : "?");

  await searchLogic(inputValue);
  fetchStatus.value = 0;
};

onMounted(() => {
    mounted.value = true;
})

const spoiler_warning = parsed_markdown.data.spoiler ? '[SPOILER WARNING]\n' : '';

// meta

useHead({
    title: `${parsed_markdown.data.title} Category - ${the_franchise_data.franchise_proper_name} - Saihex Wiki`,
    meta: [
        { name: 'description', content: add_description_mark(spoiler_warning + parsed_markdown.data.description, undefined) },
        { name: 'twitter:card', content: "summary_large_image" }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: the_franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_images = embed_svg_url(parsed_markdown.data.image);

useSeoMeta({
    ogTitle: `${parsed_markdown.data.title} Category - ${the_franchise_data.franchise_proper_name} - Saihex Wiki`,
    twitterTitle: `${parsed_markdown.data.title} Category - ${the_franchise_data.franchise_proper_name} - Saihex Wiki`,
    ogDescription: `${spoiler_warning} [Category]\n ${add_description_mark(parsed_markdown.data.description, undefined)}`,
    twitterDescription: `${spoiler_warning} [Category]\n ${add_description_mark(parsed_markdown.data.description, undefined)}`,
    ogImage: embed_images,
    twitterImage: embed_images,
})
</script>

<template>
    <LoadingOverlay :visible="!mounted"></LoadingOverlay>

    <div :class="!mounted ? `overflow-hidden` : ``">
        <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->
            <Wiki_header :franchise="route.params.franchise" :franchise_image="the_franchise_data.wiki_head_image" :raw_markdown="``" :page_count="the_franchise_data.page_count" :no_json="true"
                :saihex_creation="the_franchise_data.saihex_creation" :spoiler="parsed_markdown.data.spoiler" />

            <div class="hidden md:flex md:centerItem md:wiki_header_buttons_nohover">
                <img preload :src="parsed_markdown.data.image" class="h-32 mr-1" alt="page_icon" />
            </div>
        </div>

        <div class="pageDataContainer mx-10">
            <div class="wiki_container">
                <ContentRendererMarkdown :value="parsed_markdown" class="min-h-20">
                </ContentRendererMarkdown>
            </div>
        </div>

        <h2 class="py-4 text-center font-bold text-6xl underline my-3">{{ parsed_markdown.data.title }} Category contents search page</h2>
        <div class="search_box">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" class="p-1 w-full" :placeholder="`Search contents of ${fixup_category_name(route.params._category as string)} Category`" v-model="inputValue"
                @keyup.enter="search_input(inputValue)" @blur="search_input(inputValue)" />
        </div>

        <div class="result_box mb-20">
            <NuxtLink v-for="one_of_rsult in results" :class="!one_of_rsult.spoiler ? `result_boxes` : `result_boxes_spoiler`" :to="`${route.fullPath}/${one_of_rsult.dynamic_route}`">
                <div class="md:flex">
                    <img :src="one_of_rsult.image" class="w-28 h-28 mx-3" :alt="`${one_of_rsult.title} page icon`" />
                    <div>
                        <p class="spoiler hidden md:flex" v-if="one_of_rsult.spoiler">SPOILER WARNING</p>
                        <h3 class="flex text-1xl overflow-hidden opacity-50 italic">Last database change: {{ date_formatter(one_of_rsult.last_modified) }}</h3>
                        <h1 class="underline">{{ one_of_rsult.title }}</h1>
                        <h2 class="text-2xl overflow-hidden">{{ one_of_rsult.description }}</h2>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<style>
@import url("~/assets/css/generic_markdown_style.css");

.search_box {
    @apply flex bg-zinc-950 h-16 mx-2 md:mx-16 rounded-sm outline outline-2 outline-black p-2
}

.result_box {
    @apply flex flex-col bg-zinc-800 min-h-dvh h-fit mx-2 md:mx-12 my-5 px-5 py-2 pt-7 outline-1 outline-white outline
}

.result_boxes {
    @apply flex justify-between bg-zinc-900 min-h-32 h-fit mb-2 transition bounce-ease py-2 overflow-hidden p-2 outline-1 outline-white outline
}

.result_boxes:hover {
    @apply bg-green-700 scale-105 transition ease-in
}

.bounce-ease {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.result_boxes_spoiler {
    @apply flex justify-between bg-orange-950 md:bg-zinc-900 min-h-32 h-fit mb-2 transition bounce-ease py-2 overflow-hidden p-2
}

.result_boxes_spoiler:hover {
    @apply bg-orange-500 scale-105 transition ease-in
}

.spoiler {
    @apply bg-orange-700 p-1 font-bold uppercase text-center md:text-left
}
</style>