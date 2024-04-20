<script lang="ts" setup>
onMounted(async () => {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector("div.mobile-menu");

    console.log(menu);
    console.log(btn);

    // event listeners
    btn?.addEventListener('click', () => {
        menu?.classList.toggle("hidden");
        console.log("button work");
    });
})
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <!-- Navbar -->
        <nav class="mainTopbar">
            <div class="topbar justify-between"> <!-- a div to make elements a little bit far from the sides. -->

                <!-- logo -->
                <a href="/" class="centerItem topbarButton">
                    <img preload src="https://img.saihex.com/saihex.svg" class="h-8 w-8 mr-1" />
                    <h2>Saihex Studios Official Wiki</h2>
                </a>

                <!-- primary navigation -->
                <div class="hidden flex md:flex">
                    <NuxtLink to="https://www.saihex.com" class="topbarButton centerItem">Main Website</NuxtLink>
                    <NuxtLink to="/list" class="topbarButton centerItem">List of wikis</NuxtLink>
                </div>

                <!-- mobile menu stuff -->
                <div class="flex md:hidden">
                    <button class="topbarButton mobile-menu-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

            </div>
            <div class="md:hidden bg-gray-900 mobile-menu hidden">
                <NuxtLink to="https://www.saihex.com" class="block topbarButton centerItem">Main Website</NuxtLink>
                <NuxtLink to="/list" class="block topbarButton centerItem">List of wikis</NuxtLink>
            </div>
        </nav>

        <slot /> <!-- Inject page Vue code -->

        <!-- Footer -->
        <footer class="mainFooter">
            <div class="flex mt-3 font-bold justify-between h-full mx-2">
                <div class="text-xs md:text-lg">
                    Page content is under the <a class="text-purple-300 underline" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</a> unless otherwise noted.
                </div>
                <img src="https://commons.wiki.gg/images/b/bd/CC-BY-NC-SA.svg"/>
            </div>
            <div class="flex justify-center my-1">
                <a href="https://discord.gg/eJjsqzkQ7t"><img
                        src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
                        class="mobile_socials_footer" /></a>
                <a href="https://twitter.com/saihex_studios"><img src="https://img.saihex.com/website_exclusive/socials/x.svg" class="mobile_socials_footer" /></a>
                <a href="https://www.youtube.com/@saihex_studios"><img src="https://img.saihex.com/website_exclusive/socials/yt_logo_mono_dark.png"
                        class="mobile_socials_footer" /></a>
            </div>
            <div class="flex text-center justify-center">Saihex Studios © 2024</div>
        </footer>
    </div>
</template>

<style>
.mainTopbar {
    @apply bg-gray-900 h-16;
    z-index: 1;
    position: relative;
}

.mainFooter {
    @apply flex bg-zinc-900 h-28 grid grid-rows-3 gap-2 content-end justify-center;
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