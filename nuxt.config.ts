// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['Disc', 'pa'].includes(tag)
    }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: true
    }
  ],
  css: ["~/assets/css/primary.css"],
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxt/content"
  ],

  routeRules: {
    "/**": {
      headers: {
        "Cache-Control": "public, max-age=21600, must-revalidate"
      }
    },
    "/wiki/**": {
      headers: {
        "Cache-Control": "public, max-age=7200, must-revalidate"
      }
    },
    "/api/**": {
    }
  },
  ssr: true,

  tailwindcss: {},
  googleFonts: {
    preload: true,
    families: { Roboto: true, Audiowide: true },
  },

  content: {
    markdown: {
      // Object syntax can be used to override default options
      anchorLinks: {
        exclude: [0]
      }
    }
  },

  app: {
    head: {
      title: "Saihex Wiki",
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