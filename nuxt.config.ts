// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxt/content', '@nuxt/eslint', 'nuxt3-vuex-module'],
  nitro: {
    preset: 'github_pages'
  },
  app: {
    baseURL: '/tree-structure/',
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        }
      ]
    },
  }
})