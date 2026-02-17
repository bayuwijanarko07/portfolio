<script setup lang="ts">
    useSeoPage('HomePage')

    const { data, pending, error } = useHomeData()
</script>

<template>
    <UDashboardPanel id="home">
        <template #body>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
                <div class="lg:col-span-2 space-y-3">
                    <HomeGithubStats v-if="!pending && data" :github="data.github" />
                    <HomeGithubCalendar v-if="!pending && data" :github="data?.github" />
                </div>

                <div class="lg:col-span-1">
                    <HomeGithubGraph v-if="!pending && data" :github="data?.github" />
                </div>
            </div>
     
            <HomeWakatimeStats v-if="!pending && data" :wakatime="data?.wakatime" />
            <div v-else-if="pending">
                Loading...
            </div>
            <div v-else-if="error">
                Error load home data
            </div>
            <!-- <HomeWakatimeSGraph :wakatime="data?.wakatime" /> -->
        </template>
    </UDashboardPanel>
</template>