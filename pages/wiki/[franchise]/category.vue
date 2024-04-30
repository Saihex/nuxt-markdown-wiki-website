<script setup lang="ts">
import { embed_svg_url } from '~/composables/embed_svg';

const route = useRoute();
const path = `${route.params.franchise}/index.md`;
const {parsed_markdown, franchise_data, used_path} = await fetch_markdown_parse(path, route);
const results = ref(await fetch_category_search(route.params.franchise as string, ""));
const inputValue = ref('');
const errored = ref(false);
const debouce = ref(false);
const debouce_interfered = ref(false);

const search_input = async (inputValue: string) => {
    if (debouce.value) {
        debouce_interfered.value = true;
        return
    };
    try {
        results.value = await fetch_category_search(route.params.franchise as string, inputValue.replace(" ", "_"));
        errored.value = false;
    } catch (e) {
        errored.value = true;
    }

    debouce_interfered.value = false;
    debouce.value = false;
}

useHead({
    title: `${franchise_data.franchise_proper_name} - Category search`,
    meta: [
        { name: 'description', content: `Search this wiki's categories.` },
        { name: 'twitter:card', content: "summary"}
    ],
    link: [],
    htmlAttrs: { lang: 'en' }
})

const embed_images = embed_svg_url(parsed_markdown.data.default_embed_image);
useSeoMeta({
    ogTitle: `${franchise_data.franchise_proper_name} - Category search`,
    twitterTitle: `${franchise_data.franchise_proper_name} - Category search`,
    ogDescription: `Search this wiki's categories.`,
    twitterDescription: `Search this wiki's categories.`,
	ogImage: embed_images,
	twitterImage: embed_images,
})
</script>

<template>
    <div>
        <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->
            <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image"
                :raw_json="used_path" :page_count="franchise_data.page_count" :no_json="true" />
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
            <h2 class="py-4 text-center font-bold text-6xl underline">Category search page</h2>
            <h3 class="my-2 text-center text-xl">Limited to 50 results per search</h3>
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
                <li v-for="one_of_rsult in results" class="result_boxes">
                    <a :href="`${one_of_rsult.dynamic_path}`" class="md:flex">
                        <img :src="one_of_rsult.image" class="w-32 h-32 mx-3" />
                        <div>
                            <h1 class="underline">{{one_of_rsult.title}}</h1>
                            <h2 class="hidden md:flex text-2xl overflow-hidden">{{one_of_rsult.description}}</h2>
                        </div>
                    </a>
                </li>
            </div>
        </div>
    </div>
</template>

<style>
.search_box {
    @apply flex bg-gray-950 h-16 mx-16 rounded-sm outline outline-2 outline-black p-2
}

.result_box {
    @apply flex flex-col bg-zinc-800 h-dvh mx-12 my-5 px-5 py-2
}

.result_boxes {
    @apply block justify-between bg-zinc-900 min-h-32 p-2 mb-2 transition bounce-ease
}

.result_boxes:hover {
    @apply bg-green-700 translate-x-5 -translate-y-5 transition ease-in
}

.bounce-ease {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>