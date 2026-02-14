<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const tAbout = (key: string) => t(`ProfilPage.${key}`)
  const paragrafData = [1, 2, 3]
</script>

<template>
    <UCard>

        <template #header class="border-none">
            <div class="flex items-center gap-2 p-0">
                <div class="p-0.5 rounded bg-primary flex items-center justify-center">
                    <UIcon name="mdi:user" class="text-white"/>
                </div>
                <span class="font-semibold text-primary-500">
                    {{ tAbout('title') }}
                </span>
            </div>
        </template>

        <div class="flex flex-col gap-2">
            <span class="text-sm text-muted"
                v-for="item in paragrafData"
            >
                {{ t(`ProfilPage.about.paragraf_${item}`) }}
            </span>
        </div>

    </UCard>
</template>