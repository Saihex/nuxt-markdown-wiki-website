<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

</script>

<template>
    <div class="flex justify-center py-1 bg-orange-900 z-[60]">
        <h2 class="font-semibold">Public testing v0.0.2-g</h2>
    </div>
    
    <div class="py-32 text-center justify-center flex">
        <div class="hidden md:flex">
            <img v-if="error?.statusCode === 404" src="https://img.saihex.com/webp?src=website_exclusive/error_images/404.svg"
                class="image_err mr-20" alt="404 warning"/>
            <img v-else src="https://img.saihex.com/webp?src=website_exclusive/error_images/500.svg"
                class="image_err mr-20" alt="500 warning"/>
        </div>
        <div>
            <div class="inline-block align-middle md:pt-36">
                <h2 class="text-9xl font-bold animate-bounce">{{ error?.statusCode }}</h2>
                <div v-if="error?.statusCode === 404">
                    <h1>Page not found</h1>
                </div>
                <div v-else>
                    <h1 class="underline font-bold">Internal Server Error</h1>
                    <p>{{error?.message}}</p>
                </div>
                <div class="go_back">
                    <NuxtLink to="/" class="go_back_button">Go back</NuxtLink>
                </div>
            </div>
            <div class="flex md:hidden">
                <img v-if="error?.statusCode === 404" src="https://img.saihex.com/webp?src=website_exclusive/error_images/404.svg"
                    class="image_err" alt="404 warning"/>
                <img v-else src="https://img.saihex.com/webp?src=website_exclusive/error_images/500.svg"
                    class="image_err" alt="500 warning"/>
            </div>
        </div>
    </div>
</template>

<style>
.go_back {
    @apply flex my-5 justify-center
}

.go_back_button {
    @apply flex bg-green-900 hover:bg-green-400 rounded w-20 justify-center
}

.image_err {
    @apply object-contain;
    width: 512px;
}
</style>