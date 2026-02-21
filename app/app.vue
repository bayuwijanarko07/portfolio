<script setup>

  import * as locales from '@nuxt/ui/locale'
  const colorMode = useColorMode()
  const { locale } = useI18n()

  const lang = computed(() => locales[locale.value].code)
  const dir = computed(() => locales[locale.value].dir)
  const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

  useHead({
     meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { key: 'theme-color', name: 'theme-color', content: color }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
      lang: lang,
      dir: dir
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
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  </UApp>
</template>
