<script setup lang="ts">
    import type { NuxtError } from '#app'
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()

    const tNot = (key: string) => t(`NotFoundPage.${key}`)

    const props = defineProps<{
        error: NuxtError
    }>()

    const handleClearError = () => {
        clearError({ redirect: '/' })
    }
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center p-6">
    <h1 class="text-6xl font-bold mb-4">
      {{ error.statusCode }}
    </h1>

    <p class="text-xl mb-6">
      <span v-if="error.statusCode === 404">
        {{ tNot('title') }}
      </span>
      <span v-else>
        {{ tNot('error') }}
      </span>
    </p>

    <button
      class="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      @click="handleClearError"
    >
      {{ tNot('button') }}
    </button>
  </div>
</template>
