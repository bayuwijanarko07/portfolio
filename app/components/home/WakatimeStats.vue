<script lang="ts" setup>
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { WAKATIME_ACCOUNT } from '@/constants/wakatime'
    import type { WakaStatsData, WakaAllTimeData } from '@/types/wakatime'

    const { t } = useI18n()
    const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)

    const isActive = WAKATIME_ACCOUNT.is_active

    interface WakaResponse {
        status: number
        stats: WakaStatsData | null
        all_time: WakaAllTimeData | null
    }

    const { data, pending, error } = await useFetch<WakaResponse>('/api/wakatime')

    const allowedKeys = [
        'best_day',
        'start',
        'end',
        'human_readable_daily_average_including_other_language',
        'human_readable_total_including_other_language'
    ]
    
    const wakaCards = computed(() => {
        if (!data.value?.stats) return []

            const { stats } = data.value

            const filtered = Object.entries(stats)
                .filter(([key]) => allowedKeys.includes(key))
                .map(([key, value]) => {
                let displayValue = value

                if (key === 'best_day') {
                    displayValue = `${value?.date} (${value?.text})`
                }

                return {
                    label: tWaka(key),
                    value: displayValue
                }
            })

            return filtered
        })
</script>

<template>
  <UPageGrid class="lg:grid-cols-3 gap-4 sm:gap-6">
    <UPageCard 
        v-if="isActive && wakaCards.length"
        v-for="(item, index) in wakaCards"
        :key="index"
        :ui="{
            container: 'gap-y-1.5',
            wrapper: 'items-start',
        }"
        class="hover:shadow"
    >
      <div class="flex flex-col gap-2">
        <span class="text-sm text-muted">
            {{ item.label }}
        </span>

        <span class="text-2xl font-semibold text-primary-500">
            {{ item.value }}
        </span>
      </div>
    </UPageCard>

    <div v-else-if="pending">
      Loading...
    </div>

    <div v-else-if="error">
      Failed to load Wakatime data
    </div>
  </UPageGrid>
</template>
