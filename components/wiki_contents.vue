<script setup lang="ts">


const props = defineProps<{
  franchise: string;
  additional_data: {
    absolute_url: string,
    cover_image: string,
    title: string
  }
}>();

const localStorageData = ref<string | null>(null);

const recent_activities = ref([{
  title: "",
  cover: "",
  link: "",
}]);

recent_activities.value = [];

const no_recent_activities = ref(false);

const show_recent_activities = ref(false);

function readAgain() {
  const recent_activities_data = localStorage.getItem(`${props.franchise}-History`);
  const should_show_recent_activities = localStorage.getItem("show_recent_activities");

  if (!should_show_recent_activities) {
    show_recent_activities.value = true;
    localStorage.setItem("show_recent_activities", "true");

  } else {
    if (should_show_recent_activities == "true") {
      show_recent_activities.value = true;
    } else {
      show_recent_activities.value = false;
    }
  }

  if (recent_activities_data) {
    recent_activities.value = JSON.parse(recent_activities_data);
  } else {
    recent_activities.value = [];
  }
}

onMounted(() => {
  if (process.client) {
    add_activity_history(props.additional_data.absolute_url, props.additional_data.cover_image, props.additional_data.title, props.franchise);

    readAgain();

    window.addEventListener('storage', (event) => {
      // Check if the key that changed is the one you're interested in
      if (event.key === `${props.franchise}-History`) {
        readAgain();
      }
    });
  }
});

function clearHistory() {
  localStorage.removeItem(`${props.franchise}-History`);
  recent_activities.value = [];
}

function invertShowRecentActivity() {
  show_recent_activities.value = !show_recent_activities.value;
  localStorage.setItem("show_recent_activities", show_recent_activities.value ? "true" : "false");
}

defineExpose({ readAgain });

</script>

<template>
  <div class="content_box flex justify-between">
    <div>
      <slot></slot>
    </div>

    <div v-if="show_recent_activities" class="activity_box">
      <div class="flex justify-between">
        <p class="font-bold">Recent Activities</p>

        <button @click="clearHistory()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="red" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
      <hr class="mb-5">

      <div class="overflow-y-auto h-full p-4">
        <div v-if="recent_activities.length > 0" v-for="recent_activity in recent_activities" class="mb-3">
          <NuxtLink class="activity_button" :to="recent_activity.link">

            <div class="md:flex">
              <div class="flex justify-center align-middle">
                <img :src="recent_activity.cover" class="w-10 h-10 object-cover align-middle" />
                <h1 class="ml-2 text-2xl">{{ recent_activity.title }}</h1>
              </div>
            </div>

          </NuxtLink>

          <hr style="border: 1px solid rgb(127, 127, 127); width: 100%;" class="mt-2">
        </div>

        <div v-if="recent_activities.length < 1">
          <p>Oh look, you have no recent activities on this wiki!</p>
          <hr class="my-2">
          <p>Go on! Visit pages and we will automatically save it here! We will clear up the oldest once the array reaches 30 pages. Or you can just clear this up by pressing the trash bin icon above
            this box</p>
          <hr class="my-2">
          <p class="font-bold">We only save this data on YOUR browser local storage.</p>
        </div>
      </div>
    </div>

    <div class="action_grid_container">
      <div class="action_grid">
        <!-- First row item -->
        <div class="action_button">
          <UTooltip text="Toggle Recent History List">
            <button @click="invertShowRecentActivity()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </UTooltip>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.content_box {
  @apply mx-2 md:mx-7
}

.activity_box {
  @apply hidden md:block ml-5 bg-zinc-700 p-2 shadow-md min-w-[30%] max-w-[35%] tablet:min-w-[15%] tablet:max-w-[20%] mt-[150px] min-h-72 outline outline-1 max-h-dvh overflow-clip
}

.activity_button {
  @apply my-20
}

.action_grid_container {
  @apply z-20 fixed top-20 right-0 transform transition-transform duration-300 translate-x-3/4;
}


.action_grid_container:hover {
  @apply translate-x-0
}

.action_grid {
  @apply bg-zinc-800 text-white shadow-lg grid grid-rows-3 gap-4 p-4 opacity-50 transition-all outline outline-1
}

.action_button {
  @apply bg-zinc-700 px-2 pt-2 transition-colors outline outline-1
}

.action_button:hover {
  @apply bg-green-500
}
</style>