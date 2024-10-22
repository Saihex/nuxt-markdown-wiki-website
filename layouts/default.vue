<script lang="ts" setup>
onMounted(async () => {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector("div.mobile-menu");

    // event listeners
    btn?.addEventListener('click', () => {
        menu?.classList.toggle("hidden");
    });
})
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <!-- Navbar -->
        <nav class="mainTopbar">
            <div class="topbar justify-between"> <!-- a div to make elements a little bit far from the sides. -->

                <!-- logo -->
                <NuxtLink to="/" class="centerItem topbarButton">
                    <img preload src="https://img.saihex.com/saihex.svg" class="h-8 w-8 mr-1" alt="Saihex Studios Icon" />
                    <h2>Saihex Studios Official Wiki</h2>
                </NuxtLink>

                <!-- primary navigation -->
                <div class="hidden md:flex">
                    <NuxtLink to="https://www.saihex.com" class="topbarButton centerItem" target="_blank">
                        Main Website
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </NuxtLink>
                    <NuxtLink to="/wiki" class="topbarButton centerItem">List of wikis</NuxtLink>
                    <UTooltip text="Backend Software List" :popper="{ arrow: true }">
                        <NuxtLink to="/backends" class="topbarButton centerItem">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                            </svg>
                        </NuxtLink>
                    </UTooltip>

                    <UTooltip text="The 4Tris Wiki" :popper="{ arrow: true }">
                        <NuxtLink to="/wiki/The4Tris" class="block topbarButton centerItem"><img src="https://img.saihex.com/wiki_exclusive/The4Tris/The4Tris.svg" class="h-10 mr-1"
                                alt="The 4Tris icon" />
                        </NuxtLink>
                    </UTooltip>
                </div>

                <!-- mobile menu stuff -->
                <div class="flex md:hidden">
                    <button class="topbarButton mobile-menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

            </div>
            <div class="md:hidden hidden bg-zinc-900 mobile-menu z-50">
                <NuxtLink to="https://www.saihex.com" class="block topbarButton centerItem" target="_blank">
                    Main Website

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </NuxtLink>
                <NuxtLink to="/wiki" class="block topbarButton centerItem">List of wikis</NuxtLink>

                <NuxtLink to="/backends" class="block topbarButton centerItem">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                    </svg>
                    Backend Software List
                </NuxtLink>

                <NuxtLink to="/wiki/The4Tris" class="block topbarButton centerItem mb-20">
                    <img src="https://img.saihex.com/wiki_exclusive/The4Tris/The4Tris.svg" class="h-12 mr-1" alt="The 4Tris wiki" />
                    The 4Tris Wiki
                </NuxtLink>
            </div>
        </nav>
        <div class="md:hidden bg-orange-900 p-2">
            <h1 class="text-base font-bold">This website is designed for desktop resolutions as well the pages, we recommends you to enable "desktop site" mode on your browser.</h1>
        </div>

        <slot class="z-0" /> <!-- Inject page Vue code -->

        <!-- Footer -->
        <footer class="mainFooter">
            <div class="flex mt-3 font-bold justify-between h-auto mx-2 mb-2">
                <div class="text-xs md:text-lg">
                    Page content is under the <a class="text-purple-300 underline" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons
                        Attribution-NonCommercial-ShareAlike 4.0 International</a> unless otherwise noted.
                </div>
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="inline-block w-24 h-9 mx-2">
                    <img src="https://img.saihex.com/wiki_exclusive/etc/CC-BY-NC-SA.svg" alt="Creative Commons License" class="object-contain">
                </a>
            </div>
            <div class="flex justify-center my-1">
                <a href="https://discord.gg/eJjsqzkQ7t" target="_blank"><img alt="Discord" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
                    class="mobile_socials_footer" /></a>
            <a href="https://bsky.app/profile/saihex.com" target="_blank"><img src="https://img.saihex.com/website_exclusive/socials/Bluesky.svg" alt="Bluesky" class="mobile_socials_footer" /></a>
            <a href="https://twitter.com/saihex_studios" target="_blank"><img src="https://img.saihex.com/website_exclusive/socials/x.svg" alt="Twitter (X)" class="mobile_socials_footer" /></a>
            <a href="https://www.youtube.com/@saihex_studios" target="_blank"><img alt="YouTube" src="https://img.saihex.com/webp?src=website_exclusive/socials/yt_logo_mono_dark.png"
                    class="mobile_socials_footer" /></a>
            </div>
            <div class="flex text-center justify-center">Saihex Studios © 2024</div>
        </footer>
    </div>
</template>

<style>
.mainTopbar {
    @apply bg-zinc-900 h-28;
    z-index: 20;
    position: relative;
}

.mainFooter {
    @apply bg-zinc-900 h-56 md:h-28 grid grid-rows-3 grid-cols-1 gap-5 justify-center;
}

.topbar {
    @apply px-8 h-16 flex items-center;
    z-index: 1;
    position: relative;
    width: -moz-available;
}

.topbarButton {
    @apply h-16 px-4;
}

.topbarButton:hover {
    background-color: rgb(255, 255, 255, 0.2);
}

.mobile_socials_footer {
    @apply h-8 w-8 mx-2
}
</style>