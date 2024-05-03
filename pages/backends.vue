<script setup lang="ts">
const desc = "Saihex Studios' wiki website backend software.";
useHead({
    title: 'Saihex Studios Official Wiki Backends',
    meta: [
        { name: 'description', content: desc }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://img.saihex.com/saihex.ico' }
    ],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: 'Saihex Studios\' Wiki Backends',
    twitterTitle: 'Saihex Studios\' Wiki Backends',
    ogDescription: desc,
    twitterDescription: desc
})
</script>

<template>
    <div>
        <div class="min-h-svh">
            <div class="my-10" />
            <h2 class="py-4 text-center font-bold text-6xl underline">We prioritize transparency! We love Free
                Open-Source Software!</h2>
            <p class="text-center text-3xl mb-2">These are the software that we make to make this wiki website
                possible. Wanna use them? Go ahead! <br /> It would be nice for credits too though 😊</p>
            <p class="text-center text-2xl mb-20 italic">All of repositories linked in this page are <a
                    href="https://opensource.org/license/mit" class="text-2xl underline text-purple-400">MIT Licensed</a> but please do check their dependencies
                    licensing.</p>

            <div class="information_texts">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-[256px]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>

                <div>
                    <h1 class="underline font-bold">Markdown Catalogue Server</h1>
                    <p class="my-2 text-2xl">This wiki used a Rust program made by Saihex Studios to catalogue and
                        manage markdown files. It is structured in a way that scaling it would be easy and can be
                        sharded across a Network Attached Storage for horizontal scalability</p>

                    <a href="https://github.com/Saihex/markdown_catalogue_server"
                        class="text-2xl underline text-purple-400" external>Link to the GitHub repository:
                        https://github.com/Saihex/markdown_catalogue_server</a>
                </div>
            </div>

            <div class="information_texts  justify-end">
                <img src="https://nuxt.com/assets/design-kit/icon-green.svg"
                    class="hidden w-[256px] mr-5 h-fit max-sm:flex" />
                <div>
                    <h1 class="underline font-bold">Front-end framework</h1>
                    <p class="my-2 text-2xl">We used <b>Nuxt 3</b> as our website framework because it is generally easy
                        to use and increase our productivity! Of course, it by itself won't structure this website
                        automatically so we program it to be this wiki website.</p>

                    <a href="https://nuxt.com/" class="text-2xl underline text-purple-400" external>Link to Nuxt's
                        website: https://nuxt.com/</a>
                    <br />
                    <a href="https://github.com/Saihex/nuxt-static-markdown-wiki-website"
                        class="text-2xl underline text-purple-400" external>Link to the GitHub repository:
                        https://github.com/Saihex/nuxt-static-markdown-wiki-website</a>
                </div>
                <img src="https://nuxt.com/assets/design-kit/icon-green.svg"
                    class="flex w-[256px] mr-5 h-fit max-sm:hidden" />
            </div>
        </div>
    </div>
</template>

<style>
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