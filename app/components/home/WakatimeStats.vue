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

    const dateFnsLocale = computed(() =>
        locale.value === 'id' ? id : enUS
    )

    const isActive = WAKATIME_ACCOUNT.is_active

    const allowedKeys = [
        'best_day',
        'start',
        'end',
        'human_readable_daily_average_including_other_language',
        'human_readable_total_including_other_language'
    ]

    const range = computed(() => props.wakatime?.stats?.range ?? '')

    const wakaCards = computed(() => {

        if (!props.wakatime?.stats) return []

        const { stats } = props.wakatime

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
                <span class="font-semibold text-primary-500">
                    {{ item.label }}
                </span>

                <span class="text-sm text-muted">
                    {{ item.value }}
                </span>
            </div>
        </UPageCard>
    </UPageGrid>
</template>
