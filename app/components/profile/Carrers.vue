<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
    const tCareers = (key: string) => t(`ProfilPage.careers.${key}`)
</script>

<template>
    <UPageGrid class="gap-4 lg:grid-cols-1">
        <UCard>
            <div class="flex items-center gap-2 p-0 justify-start">
                <div class="p-0.5 rounded bg-primary flex items-center justify-center">
                    <UIcon name="mdi:briefcase-variant" class="text-white"/>
                </div>
                <span class="font-semibold text-primary-500">
                    {{ tCareers('title') }}
                </span>
            </div>
        </UCard>
    </UPageGrid>
</template>