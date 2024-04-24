<script setup lang="ts">
const route = useRoute();
const results = ref(await fetch_search_wikis(""));
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
        results.value = await fetch_search_wikis(inputValue.replace(" ", "_"));
        errored.value = false;
    } catch (e) {
        errored.value = true;
    }

    debouce_interfered.value = false;
    debouce.value = false;
}
const desc = "Welcome to Saihex Studios' Official Wiki Website! This website is where all Saihex's franchise and other creations official wikis are located.";
useHead({
    title: 'Saihex Studios Official Wiki - Wiki List',
    meta: [
        { name: 'description', content: desc }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://img.saihex.com/saihex.ico' }
    ],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: 'Saihex Studios Wiki List',
    twitterTitle: 'Saihex Studios Wiki List',
    ogDescription: desc,
    twitterDescription: desc
})
</script>

<template>
    <div>
        <div class="min-h-svh">
            <div class="my-10" />
            <h2 class="py-4 text-center font-bold text-6xl underline">Wiki Search Page</h2>
            <h3 class="my-2 text-center text-xl">Limited to 50 results per search</h3>
            <div class="my-5 p-1 text-center text-2xl bg-yellow-500 mx-20 text-black" v-if="debouce_interfered">Wait a little alright?</div>
            <div class="my-2 p-5 text-center text-3xl bg-red-400 mx-20 text-black" v-if="errored">Oh uh... something failed...</div>
            <div class="search_box">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-16">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" class="p-1 w-full" placeholder="Search for a wiki" v-model="inputValue" @keyup.enter="search_input(inputValue)" @blur="search_input(inputValue)"/>
            </div>

            <div class="result_box">
                <li v-for="one_of_rsult in results" class="result_boxes">
                    <a :href="`/wiki/${one_of_rsult.dynamic_path}`" class="md:flex md:justify-between">
                        <div>
                            <h1 class="underline">{{one_of_rsult.franchise_proper_name}}</h1>
                            <h2 class="hidden md:flex text-2xl overflow-hidden">{{one_of_rsult.description}}</h2>
                        </div>
                        <img :src="one_of_rsult.image" class="w-32 h-32" />
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