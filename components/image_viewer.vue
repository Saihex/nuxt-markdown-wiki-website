<template>
    <div v-if="visible_ref" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="flex bg-slate-800 p-1 rounded-lg shadow-lg justify-center items-center flex-col h-fit max-h-[98%]">
            <button class="flex w-full bg-red-700 items-center" @click="close_image_view()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

                <h1 class="text-base">Close Image Viewer</h1>
            </button>
            <h1 class="font-bold underline">Image Viewer</h1>
            <h3 class="mb-2 italic">Image may be CSS downscaled in order to fit on your screen</h3>
            <div class="flex justify-center">
                <img :src="url_ref" class="min-w-72 max-w-[60%] h-auto outline outline-1 outline-white" />
            </div>
            <a class="m-2 text-purple-300 underline text-base" :href="url_ref" target="_blank">{{
                url_ref }}</a>
            <div class="m-2">
                <div class="text-xs md:text-lg font-bold">
                    This content is under the <a class="text-purple-300 underline" target="_blank"
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons
                        Attribution-NonCommercial-ShareAlike 4.0 International</a> unless otherwise noted.
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "image_viewer",
    props: {
        visible_ref: {
            type: Boolean,
            default: false,
        },
        url_ref: {
            type: String,
            default: ""
        }
    },
    methods: {
        close_image_view() {
            this.$emit('close', "");
        }
    },
}
</script>