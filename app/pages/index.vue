<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    useSeoPage('HomePage')
    const { data, pending, error } = useHomeData()
  

    const { t } = useI18n()
    const tGit = (key: string) => t(`HomePage.github.${key}`)
    const tWak = (key: string) => t(`HomePage.wakatime.${key}`)
</script>

<template>
    <UDashboardPanel id="home">
        <template #body>
            <div class="flex items-center gap-2 p-0">
                <div class="p-0.5 rounded bg-primary flex items-center">
                    <UIcon name="mdi:github" class="text-white"/>
                </div>
                <a href="https://github.com/bayuwijanarko07" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary-500">
                    {{ tGit('title') }}
                </a>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
                <div class="lg:col-span-2 space-y-3">
                    <HomeGithubStats v-if="!pending && data" :github="data.github" />
                    <HomeGithubCalendar v-if="!pending && data" :github="data?.github" />
                </div>

                <div class="lg:col-span-1">
                    <HomeGithubChart v-if="!pending && data" :github="data?.github" />
                </div>
            </div>
            
            <div class="flex items-center gap-2 p-0">
                <div class="p-0.5 rounded bg-primary flex items-center justify-center">
                    <UIcon name="mdi:code" class="text-white"/>
                </div>
                <a href="https://wakatime.com/@bayuwijanarko07" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary-500">
                    {{ tWak('title') }}
                </a>
            </div>
            <HomeWakatimeStats v-if="!pending && data" :wakatime="data?.wakatime" />
            <HomeWakatimeChart v-if="!pending && data" :wakatime="data?.wakatime" />
            <div v-else-if="pending">
                Loading...
            </div>
            <div v-else-if="error">
                Error load home data
            </div>
        </template>
    </UDashboardPanel>
</template>