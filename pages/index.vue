<script setup lang="ts">
const desc = "Welcome to Saihex Studios' Official Wiki Website! This website is where all Saihex's franchise and other creations official wikis are located.";
useHead({
    title: 'Saihex Studios Official Wiki',
    meta: [
        { name: 'description', content: desc }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://img.saihex.com/saihex.ico' }
    ],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: 'Saihex Studios\' Wiki Homepage',
    twitterTitle: 'Saihex Studios\' Wiki Homepage',
    ogDescription: desc,
    twitterDescription: desc
})
</script>

<template>
    <div>
        <div class="min-h-svh">
            <div class="homeImage"></div>
            <div class="my-10" />
            <h2 class="py-4 text-center font-bold text-6xl">Welcome to Saihex Studios' Official Wiki Website!</h2>

            <p class="text-center text-3xl mb-20">This website contains all the wiki for all of franchises under Saihex
                Studios and not. Here are few guides to use this website!</p>

            <div class="information_texts ">
                <img src="https://img.saihex.com/wiki_exclusive/tutorial/wiki_list.png"
                    class="w-[512px] mr-5 outline outline-black outline-2 h-fit" />
                <div>
                    <h1 class="underline font-bold">Wiki List</h1>
                    <p class="my-2 text-2xl">You can access the wiki list and search page from clicking the <b
                            class="underline">List of
                            wikis</b> button at the website header, for mobile it is hidden within the "burger" stack
                        button.</p>
                    <p class="my-2 text-2xl">You may find wikis with <b class="bg-orange-600 p-1">NOT OWNED OR/AND
                            CONTROLLED BY SAIHEX
                            STUDIOS</b> written inside a orange box <b>(the entire box appear as orange and the text won't be present for mobile)</b>, this indicates that wiki franchise is not owned
                        or/and controlled by Saihex Studios. However it still falls under <a
                            class="text-purple-400 underline"
                            href="https://creativecommons.org/licenses/by-nc-sa/4.0/">BY-NC-SA</a>.</p>
                    <p class="my-2 text-2xl">Franchises that are not owned or/and controlled by Saihex Studios are
                        likely to be from our allies or our developer's own projects who wanted to host their franchise
                        on our wiki website. We are not
                        open for requests so don't bother contacting us to host your franchises here.</p>
                </div>
            </div>

            <div class="information_texts  justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="hidden w-[256px] outline outline-1 outline-black max-sm:flex">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
                <div>
                    <h1 class="underline font-bold">Category based structure</h1>
                    <p class="my-2 text-2xl">Wiki pages are structured with category system, after going to the wiki
                        main page simply click the <b class="underline">Category List</b> button at the top of the page
                        to search for categories.</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-[256px] outline outline-1 outline-black max-sm:hidden">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
            </div>

            <div class="information_texts ">
                <img src="https://img.saihex.com/wiki_exclusive/tutorial/syntax.png"
                    class="w-[512px] mr-5 outline outline-black outline-2 h-fit" />
                <div>
                    <h1 class="underline font-bold">Syntax highlighting</h1>
                    <p class="my-2 text-2xl">Header 1 or the title is only used as the page title. <a
                            class="text-purple-400 underline cursor-pointer" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Text that are colored
                            purple and underlined</a> are links and you can click on them to go to other pages or
                        website, be
                        ware that there is no confirmation dialogue.</p>
                    <p class="my-2 text-2xl">All links and pages in this website is checked by Saihex Studios whether it
                        is safe for at least
                        teens (average profanity is allowed) or not. But, it would just be inconvenient to be disturbed
                        while reading.</p>
                    <p class="my-2 text-2xl">Subtitles are links because by clicking them it will scroll down until the
                        subtitle text reach top of your viewport unless the scroll can't go that far. This also adds
                        anchor hashtag to the page URL which can be useful for sharing specific subtitle of a page to
                        others.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.homeImage {
    background-image: linear-gradient(to bottom, transparent, transparent, rgb(32, 32, 32)), url("https://img.saihex.com/website_exclusive/general/web_banner.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: calc(50%) calc(50%);
    height: 350px;
}

.information_texts {
    @apply flex max-sm:flex-col mx-5 my-20
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