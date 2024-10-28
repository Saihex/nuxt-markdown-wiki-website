<script setup lang="ts">
import { embed_svg_url } from '~/composables/embed_svg';
import * as essentials from "~/composables/v2/essential_functions";
import type { franchise_data, search_result } from '~/composables/v2/generic_types';

const route = useRoute();
await remove_trailing_slash(route);
const mounted = ref(false);
let the_franchise_data: franchise_data;
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

    results.value = {};

    fetchStatus.value = 1;
    const FetchResult = await essentials.searchDirectory(`${route.params.franchise as string}/category`, true, inputValue.value || "", true);

    if (!FetchResult) {
        fetchStatus.value = 3;
    } else {
        for (const key in FetchResult) {
            const _category_data = await essentials.getSearchFrontmatters(`${route.params.franchise as string}/category/${FetchResult[key]}/index.md`, true);

            console.log(_category_data);

            if (_category_data) {
                _category_data.dynamic_route = FetchResult[key];
                results.value[FetchResult[key]] = _category_data;
            }
        }

        fetchStatus.value = 0;
    }
}

async function searchLogic(searchEntry: string) {
  results.value = {};

  fetchStatus.value = 1;
  const FetchResult = await essentials.searchDirectory(`${route.params.franchise as string}/category`, true, inputValue.value || "", false);

  if (!FetchResult) {
    fetchStatus.value = 3;
    return;
  }

  if (FetchResult.length > 0) {
    for (const key in FetchResult) {
        const _category_data = await essentials.getSearchFrontmatters(`${route.params.franchise as string}/category/${FetchResult[key]}/index.md`, false);
        if (_category_data) {
            _category_data.dynamic_route = FetchResult[key];
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

// meta

useHead({
    title: `Category search - ${the_franchise_data.franchise_proper_name} - Saihex Wiki`,
    meta: [
        { name: 'description', content: add_description_mark(`Search this wiki's categories.`, undefined) },
        { name: 'twitter:card', content: "summary_large_image" }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: the_franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_images = embed_svg_url(the_franchise_data.default_embed_image);
useSeoMeta({
    ogTitle: `Category search - ${the_franchise_data.franchise_proper_name} - Saihex Wiki`,
    twitterTitle: `Category search - ${the_franchise_data.franchise_proper_name} - Saihex Wiki`,
    ogDescription: add_description_mark(`Search ${the_franchise_data.franchise_proper_name} wiki's categories.`, undefined),
    twitterDescription: add_description_mark(`Search ${the_franchise_data.franchise_proper_name} wiki's categories.`, undefined),
    ogImage: embed_images,
    twitterImage: embed_images,
})
</script>

<template>
    <LoadingOverlay :visible="!mounted"></LoadingOverlay>

    <div :class="!mounted ? `overflow-hidden` : ``">
        <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->
            <Wiki_header :franchise="route.params.franchise" :franchise_image="the_franchise_data.wiki_head_image"
                :raw_markdown="`${essentials.getOriginURL()}/api/msc/files/${route.params.franchise}/changes.md`" :page_count="the_franchise_data.page_count" :no_json="true"
                :saihex_creation="the_franchise_data.saihex_creation" />
            <!-- logo -->
            <div class="hidden md:flex md:centerItem md:wiki_header_buttons_nohover h-32 w-32">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
            </div>
        </div>

        <div class="min-h-svh">
            <div class="my-10" />
            <div class="my-5 p-1 text-center text-2xl bg-yellow-600 mx-20 text-white" v-if="fetchStatus != 0">{{ fetchStatus == 1 ? "Searching..." : "Somethings wrong..." }}</div>
            <h2 class="py-4 text-center font-bold text-6xl underline my-3">Category search page</h2>
            <div class="search_box">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" class="p-1 w-full" placeholder="Search for a category" v-model="inputValue" @keyup.enter="search_input(inputValue)" @blur="search_input(inputValue)"/>
            </div>

            <div class="result_box">
                <NuxtLink v-for="one_of_rsult in results" :class="!one_of_rsult.spoiler ? `result_boxes` : `result_boxes_spoiler`" :to="`${route.fullPath}/${one_of_rsult.dynamic_route}`">
                    <div class="md:flex">
                        <img :src="one_of_rsult.image" class="w-28 h-28 mx-3" :alt="`${one_of_rsult.title} category icon`" />
                        <div>
                            <p class="spoiler hidden md:flex" v-if="one_of_rsult.spoiler">SPOILER WARNING</p>
                            <h1 class="underline">{{ one_of_rsult.title }}</h1>
                            <h2 class="text-2xl overflow-hidden">{{ one_of_rsult.description }}</h2>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style>
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