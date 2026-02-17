<script lang="ts" setup>
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { format, formatDistanceToNowStrict } from 'date-fns'
    import { id, enUS } from 'date-fns/locale'
    import { WAKATIME_ACCOUNT } from '@/constants/wakatime'
    import type { WakaHandlerResponse } from '@/types/wakatime'

    const props = defineProps<{
        wakatime?: WakaHandlerResponse | null
    }>()

    const { t, locale } = useI18n()
    const tWaka = (key: string) => t(`HomePage.wakatime.${key}`)

    const dateFnsLocale = computed(() => (locale.value === 'id' ? id : enUS))

    const isActive = WAKATIME_ACCOUNT.is_active

    const formatDate = (date?: string) => {
        if (!date) return ''
        return format(new Date(date), 'dd MMM yyyy', {
            locale: dateFnsLocale.value
        })
    }

    const range = computed(() => props.wakatime?.stats?.range ?? '')

    const allTimeSinceJoined = computed(
        () => props.wakatime?.all_time?.text ?? ''
    )

    const wakaCards = computed(() => {
        const stats = props.wakatime?.stats
        if (!stats) return []

    const cards = [
        {
            key: 'all_time_since_joined',
            value: allTimeSinceJoined.value
        },
        {
            key: 'best_day',
            value: stats.best_day
                ? `${formatDate(stats.best_day.date)} • ${stats.best_day.text}`
                : ''
        },
        {
            key: 'start',
            value: formatDate(stats.start as string)
        },
        {
            key: 'end',
            value: formatDate(stats.end as string)
        },
        {
            key: 'human_readable_daily_average_including_other_language',
            value: stats.human_readable_daily_average_including_other_language as string
        },
        {
            key: 'human_readable_total_including_other_language',
            value: stats.human_readable_total_including_other_language as string
        }
    ]

    return cards
        .filter(item => item.value)
        .map(item => ({
            label: tWaka(item.key),
            value: item.value
        }))
    })

    const lastUpdated = computed(() => {
        const date = props.wakatime?.stats?.modified_at
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
    <UPageGrid class="lg:grid-cols-3 gap-2 sm:gap-3">
        <UCard 
            v-if="isActive && wakaCards.length"
            v-for="(item, index) in wakaCards"
            :key="index"
            class="hover:shadow"
        >
            <div class="flex flex-col gap-2">
                <span class="font-semibold text-primary-500">
                    {{ item.label }}
                </span>

                <span class="text-sm text-muted">
                    {{ item.value }}
                </span>
            </div>
        </UCard>
    </UPageGrid>
</template>
