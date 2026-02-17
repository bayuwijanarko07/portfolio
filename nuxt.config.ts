// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@vueuse/motion',
    '@nuxtjs/i18n',
    '@nuxt/ui',
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      {
        code: 'id',
        iso: 'id-ID',
        name: 'Bahasa Indonesia',
        file: 'id.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'id',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    },
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  runtimeConfig: {
    githubToken: process.env.GITHUB_PERSONAL_TOKEN,
    wakatimeApiKey: process.env.WAKATIME_API_KEY,
  },
})
