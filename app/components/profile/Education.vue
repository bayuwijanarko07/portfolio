<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
    const tEducation = (key: string) => t(`ProfilPage.education.${key}`)
</script>

<template>
    <UPageGrid class="gap-4 lg:grid-cols-1">
        <UCard>

            <template #header>
                <div class="flex items-center gap-2 p-0">
                    <div class="p-0.5 rounded bg-primary flex items-center justify-center">
                        <UIcon name="mdi:education-outline" class="text-white"/>
                    </div>
                    <span class="font-semibold text-primary-500">
                        {{ tEducation('title') }}
                    </span>
                </div>
            </template>
            
        </UCard>
    </UPageGrid>
</template>