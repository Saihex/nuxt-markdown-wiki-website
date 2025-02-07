**Version: 0.0.2-g**

Note: Letters after the version numbers are their sub-evolutions when non-major changes were added. Version number will increase after the letter hits `z`. If we found lethal issues after a push we will delete the last image build from docker hub and push fixes under the same version. Version won't increase if changes are less than `three` unless huge change such as UI rework.

# Saihex Studios' Nuxt Markdown Wiki Website
**BUILT ON TOP [Nuxt 3](https://nuxt.com/)**

Runs together with [Saihex Studios' Markdown Catalogue Server (MCS)](https://github.com/Saihex/markdown_catalogue_server) **v0.0.2-g** and above.

**WARNING: This software is meant to be used within a Docker container**

- Expose port `3000`
- Attach to the same Docker network as `MCS` container that is named `markdown_cat_server`.

## Default Docker setup with **MCS**
This software is designed to be used with [Saihex Studios' Markdown Catalogue Server (MCS)](https://github.com/Saihex/markdown_catalogue_server) and if you want to integrate your own database that doesn't have the same API system structure you'll need to modify the code to support yours. We do not plan to add support to any other software that we do not use.

## Web structure
We will only discuss wiki structure as root and `/backends` are self-explanatory if you understand [Nuxt 3](https://nuxt.com/) well enough.

- `/wiki` is the wiki search page where all the available wikis provided by the MCS will be listed. When a search query is entered the URL will automatically add the query parameter to make sharing more easier. Ex: `/wiki?search=test`

- `/wiki/[franchise]` is the wiki home page. In **MCS** `/[franchise]/index.md` is used.

- `/wiki/[franchise]/changes` is the wiki changes page. In **MCS** `/[franchise]/changes.md` is used.

- `/wiki/[franchise]/category` is the category search page. The `[franchise]` must be a valid franchise otherwise `404` error will be thrown. Query behavior same as `/wiki`

- `/wiki/[franchise]/category/[category]` is the category's page search. The `[franchise]` and `[category]` must be a valid paths otherwise `404` will be thrown.

- `/wiki/[franchise]/category/[category]/[page]` is the deepest it goes. The page.

## APIs
The only rest API available on this program is `/api/msc/...`.
All the APIs can be referenced in the documentation for [Saihex Studios' Markdown Catalogue Server (MCS)](https://github.com/Saihex/markdown_catalogue_server).