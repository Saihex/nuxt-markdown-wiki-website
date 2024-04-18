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
</script>

<template>
    <div>
        <div class="min-h-svh">
            <div class="my-10" />
            <h2 class="py-4 text-center font-bold text-6xl">Select a wiki lmfao</h2>
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
}</style>