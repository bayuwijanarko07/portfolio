<script setup>
  import * as locales from '@nuxt/ui/locale'
  const colorMode = useColorMode()
  const { locale } = useI18n()

  useHead({
     meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'theme-color',
        content: () =>
          colorMode.value === 'dark' ? '#1b1718' : '#ffffff'
      }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
      lang: () => locale.value
    },
  })


  useSeoMeta({
    title: 'Bayu Wijanarko',
    description: 'Personal website dan portfolio Bayu Wijanarko',
    ogTitle: 'Personal website dan portfolio Bayu Wijanarko',
    ogDescription: 'Personal website dan portfolio Bayu Wijanarko',
    twitterCard: 'summary_large_image'
  })

</script>

<template>
  <UApp :locale="locales[locale]" :color-mode="colorMode.value">
    <NuxtLoadingIndicator color="#3b82f6" :throttle="100"/>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
