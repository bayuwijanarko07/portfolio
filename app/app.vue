<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})


useSeoMeta({
  title: 'Bayu Wijanarko',
  description: 'Personal website dan portfolio Bayu Wijanarko',
  // ogTitle: title,
  // ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#3b82f6" :throttle="100"/>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
