<!-- Logo.vue -->
<template>
  <div class="flex flex-col mt-5">
    <p class="non-saihex w-fit mb-2" v-if="!saihex_creation">Not owned or/and controlled by Saihex Studios</p>

    <div class="md:flex md:justify-between select-none">
      <NuxtLink :to="`/wiki/${franchise}`" class="centerItem wiki_header_buttons">
        <img :src="franchise_image" class="h-32 mr-1" alt="franchise head image"/>
      </NuxtLink>

      <UTooltip text="Including home page and category page" :popper="{ arrow: true }">
        <div class="py-5 mx-2">
          <h1 class="text-center">
            {{page_count}}
          </h1>
          <h1 class="text-center">
            Pages
          </h1>
        </div>
      </UTooltip>

      <div>
        <div class="flex">
          <NuxtLink :to="`/wiki/${franchise}/category`" class="wiki_header_topbar centerItem max-sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            <p class="ml-2">Category List</p>
          </NuxtLink>
          <a :href="raw_json" class="wiki_header_topbar centerItem" v-if="!no_json">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <p class="ml-2">Raw JSON</p>
          </a>
        </div>
        <NuxtLink :to="`/wiki/${franchise}/category/${category_str}`" class="wiki_header_topbar centerItem max-sm:hidden" v-if="typeof category_str == `string` && category_str.length > 0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>          
          <p class="ml-2">Back to category page</p>
        </NuxtLink>
      </div>
    </div>

    <p class="spoiler w-full m-2 max-sm:mb-20 text-3xl" v-if="spoiler">[SPOILER WARNING]</p>
  </div>
</template>

<script>
  export default {
    props: {
      franchise: {
        type: String,
        required: true
      },
      category_str: {
        type: String,
        required: false
      },
      franchise_image: {
        type: String,
        required: true
      },
      raw_json: {
        type: String,
        required: true
      },
      page_count: {
        type: Number,
        required: true
      },
      no_json: {
        type: Boolean,
        required: false
      },
      saihex_creation: {
        type: Boolean,
        required: true
      },
      spoiler: {
        type: Boolean,
        required: false
      }
    }
  }
</script>

<style>
.wiki_header_topbar {
  @apply h-16 px-4 justify-start;
}

.wiki_header_topbar_nohover {
  @apply h-16 px-4 justify-start;
}

.wiki_header_topbar:hover {
  background-color: rgb(255, 255, 255, 0.2);
}

.non-saihex {
  @apply bg-orange-700 p-1 font-bold uppercase max-sm:text-center max-sm:text-base
}

.spoiler {
  @apply bg-orange-700 p-1 font-bold uppercase max-sm:text-center max-sm:text-base
}

@keyframes spoiler_pulsate {
  0% {
      background-color: #c23d00;
  }

  100% {
      background-color: #381500;
  }
}

.spoiler {
  animation: spoiler_pulsate 2s ease-in-out infinite alternate;
  @apply outline outline-1 p-2 text-center
}
</style>