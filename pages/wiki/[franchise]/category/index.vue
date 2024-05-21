<script setup lang="ts">
import { embed_svg_url } from '~/composables/embed_svg';

const route = useRoute();
const path = `${route.params.franchise}/index.md`;
const {parsed_markdown, franchise_data, used_path} = await fetch_markdown_parse(path, route);

const inputValue = ref(typeof route.query.search == "string" ? route.query.search : "");
const results = ref(await fetch_category_search(route.params.franchise as string, inputValue.value));

const errored = ref(false);
const debouce = ref(false);
const debouce_interfered = ref(false);
const mounted = ref(false);

onMounted(() => {
    mounted.value = true;
})

const search_input = async (inputValue: string) => {
    navigateTo(inputValue != "" ? `?search=${inputValue}` : "?");
    if (debouce.value) {
        debouce_interfered.value = true;
        return
    };
    try {
        results.value = await fetch_category_search(route.params.franchise as string, inputValue);
        errored.value = false;
    } catch (e) {
        errored.value = true;
    }

    debouce_interfered.value = false;
    debouce.value = false;
}

useHead({
    title: `Category search - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    meta: [
        { name: 'description', content: add_description_mark(`Search this wiki's categories.`, undefined) },
        { name: 'twitter:card', content: "summary_large_image"}
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: franchise_data.ico_image }
    ],
    htmlAttrs: { lang: 'en' }
})

const embed_images = embed_svg_url(parsed_markdown.data.default_embed_image);
useSeoMeta({
    ogTitle: `Category search - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    twitterTitle: `Category search - ${franchise_data.franchise_proper_name} - Saihex Wiki`,
    ogDescription: add_description_mark(`Search ${franchise_data.franchise_proper_name} wiki's categories.`, undefined),
    twitterDescription: add_description_mark(`Search ${franchise_data.franchise_proper_name} wiki's categories.`, undefined),
	ogImage: embed_images,
	twitterImage: embed_images,
})
</script>

<template>
    <div class="block bg-orange-600 m-5 p-2 font-bold text-center text-2xl" v-if="!mounted">
        Page still loading, hold on...
    </div>

    <div :class="!mounted ? `overflow-hidden` : ``">
        <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->
            <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image"
                :raw_json="used_path" :page_count="franchise_data.page_count" :no_json="true" :saihex_creation="franchise_data.saihex_creation" />
            <!-- logo -->
            <div class="hidden md:flex md:centerItem md:wiki_header_buttons_nohover h-32 w-32">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-32 h-32">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
            </div>
        </div>

        <div class="min-h-svh">
            <div class="my-10" />
            <h2 class="py-4 text-center font-bold text-6xl underline my-3">Category search page</h2>
            <div class="my-5 p-1 text-center text-2xl bg-yellow-500 mx-20 text-black" v-if="debouce_interfered">Wait a little alright?</div>
            <div class="my-2 p-5 text-center text-3xl bg-red-400 mx-20 text-black" v-if="errored">Oh uh... something failed...</div>
            <div class="search_box">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-16">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" class="p-1 w-full" placeholder="Search for a category" v-model="inputValue" @keyup.enter="search_input(inputValue)" @blur="search_input(inputValue)"/>
            </div>

            <div class="result_box">
                <a v-for="one_of_rsult in results" :class="!one_of_rsult.spoiler ? `result_boxes` : `result_boxes_spoiler`" :href="`category/${one_of_rsult.dynamic_path}`">
                    <div class="md:flex">
                        <img :src="one_of_rsult.image" class="w-28 h-28 mx-3" :alt="`${one_of_rsult.title} category icon`"/>
                        <div>
                            <p class="spoiler hidden md:flex" v-if="one_of_rsult.spoiler">SPOILER WARNING</p>
                            <h1 class="underline">{{one_of_rsult.title}}</h1>
                            <h2 class="text-2xl overflow-hidden">{{one_of_rsult.description}}</h2>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style>
.search_box {
    @apply flex bg-gray-950 h-16 mx-2 md:mx-16 rounded-sm outline outline-2 outline-black p-2
}

.result_box {
    @apply flex flex-col bg-zinc-800 min-h-dvh h-fit mx-2 md:mx-12 my-5 px-5 py-2
}

.result_boxes {
    @apply flex justify-between bg-zinc-900 min-h-32 h-fit mb-2 transition bounce-ease py-2 overflow-hidden p-2
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