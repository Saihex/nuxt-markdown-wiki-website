<template>
    <div class="py-32 text-center justify-center flex">
        <div class="hidden md:flex">
            <img v-if="error.statusCode === 404" src="https://img.saihex.com/website_exclusive/error_images/404.png?downscale=fm"
                class="image_err" />
            <img v-if="error.statusCode === 500" src="https://img.saihex.com/website_exclusive/error_images/500.png?downscale=fm"
                class="image_err" />
        </div>
        <div>
            <div class="inline-block align-middle md:pt-36">
                <h2 class="text-9xl font-bold animate-bounce">{{ error.statusCode }}</h2>
                <div v-if="error.statusCode === 404">
                    <h1>Page not found</h1>
                </div>
                <div v-if="error.statusCode === 500">
                    <h1>Internal Server Error</h1>
                </div>
                <div class="go_back">
                    <NuxtLink to="/" class="go_back_button">Go back</NuxtLink>
                </div>
            </div>
            <div class="flex md:hidden">
                <img v-if="error.statusCode === 404" src="https://img.saihex.com/website_exclusive/error_images/404.png?downscale=fm"
                    class="image_err" />
                <img v-if="error.statusCode === 500" src="https://img.saihex.com/website_exclusive/error_images/500.png?downscale=fm"
                    class="image_err" />
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['error'],
    layout: "default",
    head() {
        return {
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "https://img.saihex.com/saihex.ico",
                }
            ]
        }
    }
}
</script>

<style>
.go_back {
    @apply flex my-5 justify-center
}

.go_back_button {
    @apply flex bg-green-900 hover:bg-green-400 rounded w-20 justify-center
}

.image_err {
    @apply flex;
    width: 512px;
}
</style>