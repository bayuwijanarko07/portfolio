<script lang="ts" setup>
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { format, formatDistanceToNowStrict } from 'date-fns'
    import { id, enUS } from 'date-fns/locale'

    import { WAKATIME_ACCOUNT } from '@/constants/wakatime'
    import type { WakaStatsData, WakaAllTimeData } from '@/types/wakatime'

    const { t, locale } = useI18n()
    const tWaka = (key: string) => t(`DashboardPage.wakatime.${key}`)

    const dateFnsLocale = computed(() =>
        locale.value === 'id' ? id : enUS
    )

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

    const range = computed(() => data.value?.stats?.range ?? '')

    const wakaCards = computed(() => {

        if (!data.value?.stats) return []

        const { stats } = data.value

        return Object.entries(stats)
            .filter(([key]) => allowedKeys.includes(key))
            .map(([key, value]) => {
            let displayValue = ''

            if (key === 'start' || key === 'end') {
                displayValue = format(new Date(value as string), 'dd MMM yyyy', {
                    locale: dateFnsLocale.value
                })
            } else if (key === 'best_day' && value) {
                const date = format(new Date(value.date), 'dd MMM yyyy', {
                    locale: dateFnsLocale.value
                })

                displayValue = `${date} • ${value.text}`
            } else {
                displayValue = value as string
            }

            return {
                label: tWaka(key),
                value: displayValue
            }
            })
        })


    const lastUpdated = computed(() => {
    const date = data.value?.stats?.modified_at
        if (!date) return ''

        return formatDistanceToNowStrict(new Date(date), {
            addSuffix: true,
            locale: dateFnsLocale.value
        })
    })

</script>

<template>
    <div class="flex justify-between">
        <div class="text-sm text-muted">{{ tWaka(range) }}</div>
        <div class="text-sm text-muted"> {{ tWaka('last_update') }} : {{ lastUpdated }}</div>
    </div>
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
