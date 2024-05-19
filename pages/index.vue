<script setup lang="ts">
const desc = "Welcome to Saihex Studios' Official Wiki Website! This website is where all Saihex's franchise and other creations official wikis are located. This website name can be shorten as Saihex Wiki";
useHead({
    title: 'Saihex Studios Official Wiki | Saihex Wiki',
    meta: [
        { name: 'description', content: desc }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://img.saihex.com/saihex.ico' }
    ],
    htmlAttrs: { lang: 'en' }
})

useSeoMeta({
    ogTitle: 'Saihex Studios\' Wiki Homepage | Saihex Wiki Homepage',
    twitterTitle: 'Saihex Studios\' Wiki Homepage | Saihex Wiki Homepage',
    ogDescription: desc,
    twitterDescription: desc
})

///

const bg_image_reaction = ref({
    opacity: 1, top_margin: "4rem"
});
const no_scroll = ref(true);
const event_collection = create_event_collection();
const view_image_ref = create_image_viewer_ref();

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

onMounted(async () => {
  const bg_event_handler = () => {
    const scroll_position = window.scrollY;
    const scroll_progress = scroll_position / 500; // to threshold

    bg_image_reaction.value.opacity = Math.max(1 - scroll_progress, 0.2);
    bg_image_reaction.value.top_margin = `${clamp(1 - scroll_progress * 5, 0, 1) * 4}rem`
  }

  bg_event_handler();

  event_collection.addEvent("scroll", bg_event_handler);
  no_scroll.value = false;

  await nextTick();
  refresh_image_elements(view_image_ref);
})

onUnmounted(() => {
    event_collection.removeAllEvents();
})
</script>

<template>
    <ImageViewer :visible_ref="view_image_ref.visible_ref.value" :url_ref="view_image_ref.url_ref.value"
        @close="view_image_ref.url_ref.value = ``; view_image_ref.visible_ref.value = false"></ImageViewer>

    <div v-if="!no_scroll" id="page_contents">
        <div class="min-h-dvh">
            <div class="homeImage"></div>
            <div class="my-10 mb-[350px]" />
            <h2 class="py-4 text-center font-bold text-6xl">Welcome to Saihex Studios' Official Wiki Website!</h2>

            <p class="text-center text-3xl mb-20">This website contains all the wiki for all of franchises under Saihex
                Studios and not. Here are few guides to use this website!</p>

            <div class="information_texts justify-between">
                <img src="https://img.saihex.com/webp?src=wiki_exclusive/tutorial/wiki_list.png"
                    class="w-[512px] mr-5 outline outline-black outline-2 h-fit" alt="wiki list example"/>
                <div>
                    <h1 class="underline font-bold">Wiki List</h1>
                    <p class="my-2 text-2xl">You can access the wiki list and search page from clicking the <b
                            class="underline">List of
                            wikis</b> button at the website header, for mobile it is hidden within the "burger" stack
                        button.</p>
                    <p class="my-2 text-2xl">You may find wikis with <b class="bg-orange-600 p-1">NOT OWNED OR/AND
                            CONTROLLED BY SAIHEX
                            STUDIOS</b> written inside a orange box <b>(the entire box appear as orange and the text
                            won't be present for mobile)</b>, this indicates that wiki franchise is not owned
                        or/and controlled by Saihex Studios. However it still falls under <a
                            class="text-purple-400 underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                            target="_blank">CC BY-NC-SA</a>.</p>
                    <p class="my-2 text-2xl">Franchises that are not owned or/and controlled by Saihex Studios are
                        likely to be from our allies or our developer's own projects who wanted to host their franchise
                        on our wiki website. We are not
                        open for requests so don't bother contacting us to host your franchises here.</p>
                </div>
            </div>

            <div class="information_texts justify-between">
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

            <div class="information_texts justify-between">
                <img src="https://img.saihex.com/webp?src=wiki_exclusive/tutorial/syntax.png"
                    class="w-[512px] mr-5 outline outline-black outline-2 h-fit" alt="syntax example"/>
                <div>
                    <h1 class="underline font-bold">Syntax highlighting</h1>
                    <p class="my-2 text-2xl">Header 1 or the title is only used as the page title. <a
                            class="text-purple-400 underline cursor-pointer"
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Text that are colored
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

            <div class="information_texts justify-between">
                <img src="https://img.saihex.com/webp?src=wiki_exclusive/tutorial/anchor_urls.png"
                    class="flex md:hidden w-[512px] mr-5 outline outline-black outline-2 h-fit" alt="anchor url example"/>
                <div>
                    <h1 class="underline font-bold">Hash URL</h1>
                    <p class="my-2 text-2xl">Hash URL will result in the page scrolling down to the subtitle upon page
                        load. It will have a outline and pulsating green background to make it more noticeable thus
                        easier to see especially in text cluttered page.</p>
                </div>
                <img src="https://img.saihex.com/webp?src=wiki_exclusive/tutorial/anchor_urls.png"
                    class="hidden md:flex w-[512px] mr-5 outline outline-black outline-2 h-fit" alt="anchor url example"/>
            </div>

            <div class="information_texts justify-between">
                <img src="https://img.saihex.com/webp?src=wiki_exclusive/tutorial/spoilers.png"
                    class="w-[512px] mr-5 outline outline-black outline-2 h-fit" alt="spoiler warning example"/>
                <div>
                    <h1 class="underline font-bold">Spoiler warnings</h1>
                    <ul class="list-disc ml-3">
                        <li>
                            <p class="my-2 text-2xl">At some point, we don't want to hear nor read any spoilers about
                                the
                                franchise we are enjoying. Any category or pages that are spoilers will have a spoiler
                                warning
                                under the interaction button navbar. It is a orange box that pulsates and have outline
                                around
                                it.</p>
                        </li>
                        <li>
                            <p class="my-2 text-2xl">Categories that are made as a spoiler by itself will be tagged as
                                spoiler.
                                This depends on the wiki writer decision but normally categories will not be considered
                                a
                                spoiler if only one or two pages in it are spoilers.
                            </p>
                        </li>
                        <li>
                            <p class="my-2 text-2xl">Pages that are spoilers will be tagged too.</p>
                            <p class="my-2 text-2xl">Embed will have [SPOILER WARNING] text at the beginning of its
                                description.</p>
                        </li>
                        <li>
                            <p class="my-2 text-2xl font-bold">Due to scaling issue, on mobile the spoiler indicator
                                only
                                appears as orange result box color in search results.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="information_texts justify-between">
                <img src="https://img.saihex.com/webp?src=wiki_exclusive/tutorial/image_viewer.png"
                    class="flex md:hidden w-[512px] mr-5 outline outline-black outline-2 h-fit" alt="image viewer example"/>
                <div>
                    <h1 class="underline font-bold">Image Viewer</h1>
                    <p class="my-2 text-2xl">By clicking on the images within the wiki pages or even this page; a
                        dialogue will
                        appear showing you the image as well URL to its source link at the bottom.</p>
                    <p class="my-2 text-2xl">The image is set to be minimum scale of 288px and maximum scale of 60% of
                        the screen width. Height will scale alongside with width to maintain aspect ratio.</p>
                    <p class="my-2 text-2xl font-bold">Images on this website falls under <a
                            class="text-purple-400 underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                            target="_blank">CC BY-NC-SA</a> unless otherwise noted.</p>
                </div>
                <img src="https://img.saihex.com/webp?src=wiki_exclusive/tutorial/image_viewer.png"
                    class="hidden md:flex w-[512px] mr-5 outline outline-black outline-2 h-fit" alt="image viewer example"/>
            </div>
        </div>
    </div>
</template>

<style>
.homeImage {
    position: fixed;
    /* or absolute */
    z-index: -1;
    top: v-bind('bg_image_reaction.top_margin');
    left: 0;
    right: 0;
    background-image: linear-gradient(to bottom, transparent, transparent, rgb(32, 32, 32)), url("https://img.saihex.com/webp?src=website_exclusive/general/web_banner.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 350px;
    opacity: v-bind('bg_image_reaction.opacity');
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