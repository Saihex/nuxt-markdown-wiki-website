<script setup lang="ts">
import * as essentials from "~/composables/v2/essential_functions";
const heartbeatCheck = ref(true);

// intial serverside heartbeat check.
{
	heartbeatCheck.value = await essentials.heartbeatCheck(false, false);
}

async function occasionalHeartbeatCheck() {
	if (document.hasFocus() || !heartbeatCheck.value) {
		heartbeatCheck.value = await essentials.heartbeatCheck(false, true);
	}
}

onMounted(() => {
	const heartbeatCheck = setInterval(occasionalHeartbeatCheck, 30000);

	onUnmounted(() => {
		clearInterval(heartbeatCheck);
	});
});

// meta

const title = "Saihex Studios\' Official Wiki Website"

useHead({
	title: title,
	meta: [
		{ name: 'description', content: 'Saihex Studios\'s website' },
		{ name: 'theme-color', "data-react-helmet": 'true', content: '#FF95FF' },
		{ name: 'cache-control', content: `public, max-age=7200` }
	],
	htmlAttrs: { lang: 'en' }
})

// This will set some embed parameters
useSeoMeta({
	ogTitle: title,
	twitterTitle: title,
	ogDescription: title,
	ogImage: 'https://img.saihex.com/webp?src=embed_pic.png',
	twitterImage: 'https://img.saihex.com/webp?src=embed_pic.png',
	ogUrl: '/',
	twitterDescription: title,
	twitterCard: 'summary_large_image'
})
</script>

<template>
	<div>
		<NuxtLayout>
			<div v-if="!heartbeatCheck" class="fixed top-10 left-0 w-full text-white text-center py-2 z-50 animate-pulsate_heartbeat_warning">
				<p>⚠️ Connection Lost: Unable to reach the backend. Please check your network or try again later. ⚠️</p>
				<p>We will retry every 30 seconds regardless of whether the window is focused or not.</p>
			</div>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>


<style>
@keyframes pulsate_heartbeat_warning {

	0%,
	100% {
		background-color: rgba(220, 38, 38, 1);
		/* Red-600 full opacity */
	}

	50% {
		background-color: rgba(220, 38, 38, 0.7);
		/* Red-600 70% opacity */
	}
}

.animate-pulsate_heartbeat_warning {
	animation: pulsate_heartbeat_warning 3s ease-in-out infinite;
}


*::-webkit-scrollbar {
	width: 8px;
}

*::-webkit-scrollbar-track {
	background: rgb(60, 60, 60);
}

*::-webkit-scrollbar-thumb {
	@apply bg-zinc-500 border-x-4 border-solid border-zinc-500;
	border-radius: 20px;
}
</style>