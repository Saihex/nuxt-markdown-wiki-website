<script setup lang="ts">
const route = useRoute();
const inputValue = ref(typeof route.query.search == "string" ? route.query.search : "");
const results = ref(await fetch_search_wikis(inputValue.value));
const errored = ref(false);
const debouce = ref(false);
const debouce_interfered = ref(false);
const view_image_ref = create_image_viewer_ref();

onMounted(async () => {
  await nextTick();
  refresh_image_elements(view_image_ref);
  await new_tab_out_urls();
})

const search_input = async (inputValue: string) => {
    await navigateTo(inputValue != "" ? `?search=${inputValue}` : "?");
    if (debouce.value) {
        debouce_interfered.value = true;
        return
    };
    try {
        results.value = await fetch_search_wikis(inputValue);
        errored.value = false;
    } catch (e) {
        errored.value = true;
    }

    debouce_interfered.value = false;
    debouce.value = false;
}
const desc = "List of wikis available on Saihex Studios Wiki | Saihex Wiki";
useHead({
    title: 'Saihex Studios Official Wiki - Wiki List | Saihex wiki list',
    meta: [
        { name: 'description', content: desc }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://img.saihex.com/saihex.ico' }
    ],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: 'Saihex Studios Wiki List | Saihex wiki list',
    twitterTitle: 'Saihex Studios Wiki List | Saihex wiki list',
    ogDescription: desc,
    twitterDescription: desc
})
</script>

<template>
    <div>
        <ImageViewer :visible_ref="view_image_ref.visible_ref.value" :url_ref="view_image_ref.url_ref.value"
            @close="view_image_ref.url_ref.value = ``; view_image_ref.visible_ref.value = false"></ImageViewer>

        <div class="min-h-svh">
            <div class="my-10" />
            <h2 class="py-4 text-center font-bold text-6xl underline">Wiki Search Page</h2>
            <h3 class="my-2 text-center text-xl">Limited to 50 results per search</h3>
            <div class="my-5 p-1 text-center text-2xl bg-yellow-500 mx-20 text-black" v-if="debouce_interfered">Wait a
                little alright?</div>
            <div class="my-2 p-5 text-center text-3xl bg-red-400 mx-20 text-black" v-if="errored">Oh uh... something
                failed...</div>
            <div class="search_box">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-16">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" class="p-1 w-full" placeholder="Search for a wiki" v-model="inputValue"
                    @keyup.enter="search_input(inputValue)" @blur="search_input(inputValue)" />
            </div>

            <div class="result_box">
                <NuxtLink v-for="one_of_rsult in results"
                    :class="one_of_rsult.saihex_creation ? `result_boxes` : `result_boxes_non_saihex`"
                    :to="`/wiki/${one_of_rsult.dynamic_path}`">
                    <div class="above-tablet:flex">
                        <img :src="one_of_rsult.image" class="w-32 h-32 mx-3" alt="franchise icon"/>
                        <div>
                            <h3 class="flex text-1xl overflow-hidden opacity-50 italic">Last main-page database mirror change: {{date_formatter(one_of_rsult.last_modified)}}</h3>
                            <p class="non-saihex hidden above-tablet:flex" v-if="!one_of_rsult.saihex_creation">Not owned or/and
                                controlled by Saihex Studios</p>
                            <h1 class="underline block above-tablet:flex no-view-image">{{one_of_rsult.franchise_proper_name}}
                            </h1>
                            <h2 class="flex text-2xl overflow-hidden">{{one_of_rsult.description}}</h2>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style>
.search_box {
    @apply flex bg-zinc-950 h-16 mx-2 above-tablet:mx-16 rounded-sm outline outline-2 outline-black p-2
}

.result_box {
    @apply flex flex-col bg-zinc-800 min-h-dvh h-fit mx-2 above-tablet:mx-12 my-5 px-5 py-2 pt-7 outline-1 outline-white outline
}

.result_boxes {
    @apply flex justify-between bg-zinc-900 min-h-32 h-fit mb-2 transition bounce-ease py-2 overflow-hidden p-2 outline-1 outline-white outline
}

.result_boxes_non_saihex {
    @apply flex justify-between bg-orange-950 above-tablet:bg-zinc-900 min-h-32 h-fit mb-2 transition bounce-ease py-2 overflow-hidden p-2 outline-1 outline-white outline
}

.result_boxes_non_saihex:hover {
    @apply bg-orange-500 translate-x-5 -translate-y-5 transition ease-in
}

.result_boxes:hover {
    @apply bg-green-700 translate-x-5 -translate-y-5 transition ease-in
}

.bounce-ease {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.non-saihex {
    @apply bg-orange-700 p-1 font-bold uppercase text-center above-tablet:text-left
}
</style>