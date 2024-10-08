**Version: 0.0.2-e**

Note: Letters after the version numbers are their sub-evolutions when non-major changes were added. Version number will increase after the letter hits `z`. If we found lethal issues after a push we will delete the last image build from docker hub and push fixes under the same version. Version won't increase if changes are less than `three` unless huge change such as UI rework.

# Saihex Studios' Nuxt Markdown Wiki Website
**BUILT ON TOP [Nuxt 3](https://nuxt.com/)**

Runs together with [Saihex Studios' Markdown Catalogue Server (MCS)](https://github.com/Saihex/markdown_catalogue_server) **v0.0.2-f**.

**WARNING: This software is meant to be used within a Docker container**

- Expose port `3000`
- Attach to the same Docker network as `MCS` container that is named `markdown_cat_server`.

## Default Docker setup with **MCS**
This software is designed to be used with [Saihex Studios' Markdown Catalogue Server (MCS)](https://github.com/Saihex/markdown_catalogue_server) and if you want to integrate your own database that doesn't have the same API system structure you'll need to modify the code to support yours. We do not plan to add support to any other software that we do not use.

The **MCS** container must be named `markdown_cat_server` or service name within a Docker Compose.

## Web structure
We will only discuss wiki structure as root and `/backends` are self-explanatory if you understand [Nuxt 3](https://nuxt.com/) well enough.

- `/wiki` is the wiki search page where all the available wikis provided by the MCS will be listed. When a search query is entered the URL will automatically add the query parameter to make sharing more easier. Ex: `/wiki?search=test`

- `/wiki/[franchise]` is the wiki home page. In **MCS** `/[franchise]/index.md` is used.

- `/wiki/[franchise]/changes` is the wiki changes page. In **MCS** `/[franchise]/changes.md` is used.

- `/wiki/[franchise]/category` is the category search page. The `[franchise]` must be a valid franchise otherwise `404` error will be thrown. Query behavior same as `/wiki`

- `/wiki/[franchise]/category/[category]` is the category's page search. The `[franchise]` and `[category]` must be a valid paths otherwise `404` will be thrown.

- `/wiki/[franchise]/category/[category]/[page]` is the deepest it goes. The page.

## APIs
**MCS** isn't meant to be accessed directly as it is still prone to crashes from malformed requests. So, `/api` contains few endpoints so that **MCS** can be exposed safely to the world.

- `/api/get_markdown/[path]` is used to get the raw markdown file string. `[path]` must be relative from MCS' `./collection` directory.
- `/api/last_changed/[path]` is used to get the last modified date of the file. Provided by the OS.
- `/api/search/cat_contents/[franchise]` is used to search category contents which is `/wiki/[franchise]/category/[category]`.
- `/api/search/category/[franchise]` is used to search a wiki's categories which is `/wiki/[franchise]/category`.
- `/api/sitemap` used by crawlers.
- `/api/sitemap_xml` used by crawlers.
---

**Used dependencies (TOTAL MIT)**
```
"devDependencies": {
    "@nuxt/devtools": "latest" -- MIT
},
"dependencies": {
    "@nuxt/content": "^2.8.5", -- MIT
    "@nuxt/image": "^1.0.0", -- MIT
    "@nuxt/ui": "^2.15.2", -- MIT
    "@nuxtjs/google-fonts": "^3.0.2", -- MIT
    "@nuxtjs/tailwindcss": "^6.10.3", -- MIT
    "nuxt": "^3.7.4", -- MIT
    "vue": "^3.3.4", -- MIT
    "vue-router": "^4.2.5" -- MIT
}
```

**Docker Image**
```
saihex/nuxt-markdown-wiki-website:v0.0.2-f
```