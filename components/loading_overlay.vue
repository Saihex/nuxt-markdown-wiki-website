<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="text">
            <h1 class="text-5xl m-2 mb-5 text-center">Page is currently loading...</h1>
            <p class="text-base text-center">We block usage because use of this website during load may cause misrepresentation. This loading screen does not wait for images.</p>
        </div>
    </div>
</template>

<style>
.text {
    background-color: rgba(0, 0, 0, .7);
    @apply p-5 rounded-sm m-7
}
</style>

<script lang="ts">
export default {
    name: "loading_overlay",
    props: {
        visible: {
            type: Boolean,
            default: false,
        }
    },
}
</script>