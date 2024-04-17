<!-- Use this if you want to import a css specific to some page -->
<!--<style>
@import url("~/assets/css/primary.css");
</style>
-->

<script setup lang="ts">
// import {
//   useFirestore,
//   useFirebaseStorage
// } from 'vuefire'

// const firestore = useFirestore();
// const storage = useFirebaseStorage();
// This will set the appropriate head element for the whole website
useHead({
	title: 'Saihex Studios',
	meta: [
		{ name: 'description', content: 'Saihex Studios\'s website' },
		{ name: 'theme-color', "data-react-helmet": 'true', content: '#FF95FF' },
        { name: 'cache-control', content: `public, max-age=7200` }
	],
	link: [
		{ rel: 'icon', type: 'image/png', href: 'https://img.saihex.com/saihex.ico' } // You don't need "public/".
	],
	htmlAttrs: { lang: 'en' } // i dont see the necessity here but it's to "help" search engines
})

// This will set some embed parameters
useSeoMeta({
	ogTitle: 'Saihex Studios\' official website',
	twitterTitle: "Saihex Studios\' official website",
	ogDescription: 'Saihex Studios\' official website',
	ogImage: 'https://img.saihex.com/embed_pic.png',
	twitterImage: 'https://img.saihex.com/embed_pic.png',
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
	@apply bg-gray-500 border-x-4 border-solid border-gray-500;
	border-radius: 20px;
}
</style>