<script setup lang="ts">
useHead({
	title: 'Saihex Studios',
	meta: [
		{ name: 'description', content: 'Saihex Studios\'s website' },
		{ name: 'theme-color', "data-react-helmet": 'true', content: '#FF95FF' },
        { name: 'cache-control', content: `public, max-age=7200` }
	],
	htmlAttrs: { lang: 'en' }
})

// This will set some embed parameters
useSeoMeta({
	ogTitle: 'Saihex Studios\' official website',
	twitterTitle: "Saihex Studios\' official website",
	ogDescription: 'Saihex Studios\' official website',
	ogImage: 'https://img.saihex.com/webp?src=embed_pic.png',
	twitterImage: 'https://img.saihex.com/webp?src=embed_pic.png',
	ogUrl: '/',
	twitterDescription: "Saihex Studio\' official website",
	twitterCard: 'summary_large_image'
})
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>


<style>
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