<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import { Educations } from '@/constants/education'

    const { t } = useI18n()
    const tEducation = (key: string) => t(`ProfilPage.education.${key}`)
</script>

<template>
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
        
        <UCard v-for="ed in Educations">
            <div class="flex flex-row">
                <div class="mx-4">
                    <img  
                        :src="ed.logo"
                        :alt="ed.school"
                        width="70"
                        height="70"
                        class="shrink-0 rounded"
                    />
                </div>
                <div class="w-full space-y-1">
                    <NuxtLink :href="ed.link || '#'" target="_blank" rel="noopener">
                        <h6 class="cursor-pointer hover:underline hover:text-zinc-900 hover:dark:text-zinc-50">
                            {{ ed.school }}
                        </h6>
                    </NuxtLink>
                    <div class="space-y-2 text-sm text-muted">
                        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span class="text-sm text-muted">
                                {{ ed.major }}
                            </span>
                            <span class="text-sm text-muted">
                            •
                            </span>
                            <span>{{ ed.location }}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                        <span class="text-sm text-muted">
                            {{ ed.start_year }} - {{ ed.end_year }}
                        </span>
                    </div>
                </div>
            </div>
        </UCard>
    </UCard>
</template>