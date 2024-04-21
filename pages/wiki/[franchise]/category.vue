<script setup lang="ts">
const route = useRoute();
const path = `${route.params.franchise}/index.md`;
const show_loading = ref(true);
const {parsed_markdown, franchise_data, used_path} = await fetch_markdown_parse(path, route.params.franchise as string, route);

useHead({
    title: 'Saihex Studios Official Wiki - Homepage',
    meta: [
        { name: 'description', content: "desc" }
    ],
    link: [],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: 'Saihex Studios Homepage',
    twitterTitle: 'Saihex Studios Homepage',
    ogDescription: "desc",
    twitterDescription: "desc"
})
</script>

<template>
    <div>
        <div class="wiki_header justify-between"> <!-- a div to make elements a little bit far from the sides. -->
            <Wiki_header :franchise="route.params.franchise" :franchise_image="franchise_data.wiki_head_image"
                :raw_json="used_path" :page_count="franchise_data.page_count" :no_json="true"/>
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
            <h2 class="py-4 text-center font-bold text-6xl">Select a category yoy</h2>
        </div>
    </div>
</template>

<style>
.homeImage {
    background-image: linear-gradient(to bottom, transparent, transparent, rgb(32, 32, 32)), url("https://img.saihex.com/website_exclusive/general/sairo.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: calc(50%) calc(50%);
    height: 350px;
}

.information_texts {
    @apply flex flex-col overflow-x-hidden my-32
}

.twitterWidget {
    width: 350px;
    height: 500px;
    padding: 4px;
    @apply text-center mx-1;
}

.nonWidgetSocials {
    width: 350px;
    height: 500px;
    padding: 4px;
    @apply text-center mx-1 rounded-xl;
}

.mobile_socials {
    @apply h-16 w-16 mx-5
}
</style>