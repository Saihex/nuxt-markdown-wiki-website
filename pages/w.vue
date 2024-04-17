<script setup lang="ts">
const desc = "Welcome to Saihex Studios' Official Wiki Website! This website is where all Saihex's franchise and other creations official wikis are located.";
useHead({
    title: 'Saihex Studios Official Wiki - Homepage',
    meta: [
        { name: 'description', content: desc }
    ],
    link: [],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: 'Saihex Studios Homepage',
    twitterTitle: 'Saihex Studios Homepage',
    ogDescription: desc,
    twitterDescription: desc
})
const {data: markdownString} = await useFetch("http://localhost:8080/logic/Brain_Crystal.md");
const parsed_markdown = await parseMarkdown(markdownString.value as string);
</script>

<template>
    <div class="mainDiv">
        <container class=container>
            <ContentRendererMarkdown :value="parsed_markdown"></ContentRendererMarkdown>
        </container>
    </div>
</template>

<style>
.mainDiv {
    @apply mx-14
}

.container h1 {
    @apply mt-20 underline font-bold text-3xl
}

.container h2 {
    @apply mt-5 underline font-bold text-2xl
}

.container h3 {
    @apply mt-5 underline font-bold text-xl text-white
}

.container p {
    @apply mb-5
}

.container a {
    @apply text-purple-400 underline
}

.container code {
    @apply bg-yellow-900 p-0.5
}
</style>