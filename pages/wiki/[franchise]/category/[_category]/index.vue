<script setup lang="ts">
import Wiki_contents from '~/components/wiki_contents.vue';

const route = useRoute();

await remove_trailing_slash(route);
const path = `${route.params.franchise}/category/${route.params._category}/index.md`;

const inputValue = ref(typeof route.query.search == "string" ? route.query.search : "");

const [{ parsed_markdown, franchise_data, used_path }, unref_results] = await Promise.all([
    fetch_markdown_parse(path, route), // Assuming fetch_markdown_parse() returns an array with three elements
    fetch_category_content_search(route.params.franchise as string, route.params._category as string, inputValue.value)
]);
const results = ref(unref_results);

const errored = ref(false);
const debouce = ref(false);
const debouce_interfered = ref(false);
const mounted = ref(false);

onMounted(() => {
    mounted.value = true;
})

const search_input = async (inputValue: string) => {
    await navigateTo(inputValue != "" ? `?search=${inputValue}` : "?");
    if (debouce.value) {
        debouce_interfered.value = true;
        return
    };
    try {
        debouce.value = true;
        results.value = await fetch_category_content_search(route.params.franchise as string, route.params._category as string, inputValue);
        errored.value = false;
    } catch (e) {
        errored.value = true;
    }

    debouce_interfered.value = false;
    debouce.value = false;
}

const spoiler_warning = parsed_markdown.data.spoiler ? '[SPOILER WARNING]\n' : '';

useHead({
    title: `${parsed_markdown.data.title} Category - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    meta: [
        { name: 'description', content: add_description_mark(spoiler_warning + parsed_markdown.data.description, undefined) },
        { name: 'twitter:card', content: "summary_large_image" }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_images = embed_svg_url(parsed_markdown.data.image);

useSeoMeta({
    ogTitle: `${parsed_markdown.data.title} Category - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    twitterTitle: `${parsed_markdown.data.title} Category - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
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
            <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image" :raw_json="used_path" :page_count="franchise_data.page_count" :no_json="true"
                :saihex_creation="franchise_data.saihex_creation" :spoiler="parsed_markdown.data.spoiler" />

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
        <div class="my-5 p-1 text-center text-2xl bg-yellow-500 mx-20 text-black" v-if="debouce_interfered">Wait a little alright?</div>
        <div class="my-2 p-5 text-center text-3xl bg-red-400 mx-20 text-black" v-if="errored">Oh uh... something
            failed...</div>
        <div class="search_box">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" class="p-1 w-full" :placeholder="`Search contents of ${fixup_category_name(route.params._category as string)} Category`" v-model="inputValue"
                @keyup.enter="search_input(inputValue)" @blur="search_input(inputValue)" />
        </div>

        <div class="result_box mb-20">
            <NuxtLink v-for="one_of_rsult in results" :class="!one_of_rsult.spoiler ? `result_boxes` : `result_boxes_spoiler`" :to="`${route.fullPath}/${one_of_rsult.dynamic_path}`">
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
    @apply bg-green-700 translate-x-5 -translate-y-5 transition ease-in
}

.bounce-ease {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.result_boxes_spoiler {
    @apply flex justify-between bg-orange-950 md:bg-zinc-900 min-h-32 h-fit mb-2 transition bounce-ease py-2 overflow-hidden p-2
}

.result_boxes_spoiler:hover {
    @apply bg-orange-500 translate-x-5 -translate-y-5 transition ease-in
}

.spoiler {
    @apply bg-orange-700 p-1 font-bold uppercase text-center md:text-left
}
</style>