// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: ["~/assets/css/primary.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxt/image", "@nuxt/content"],

  routeRules: {
    "/blogs/**": {
      headers: {
        "cache-control": "public, max-age=3600"
      }
    },
    "/*": {
      headers: {
        "cache-control": "public, max-age=7200"
      }
    }
  },

  tailwindcss: {},
  googleFonts: {
    preload: true,
    families: { Roboto: true },
  },

  app: {
    head: {
      title: "Saihex",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Saihex Studios' official website.",
        },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "~/public/favicon.ico" },
      ] /*,
            script: [
                { hid: 'twitterWidgets', src: 'https://platform.twitter.com/widgets.js', defer: true }
            ]*/,
    },
  },
});