<script lang="ts" setup>
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import type { ContributionsCollection } from '@/types/github'

    const props = defineProps<{
        github?: ContributionsCollection | null
    }>()

    const { t } = useI18n()

    const tGithub = (key: string) => t(`HomePage.github.${key}`)

    interface StatItem {
        label: string
        value: number
        unit?: string
        icon: string
    }

    const totalContributions = computed(() => {
        return props.github?.contributionCalendar.totalContributions ?? 0
    })

    const weeks = computed(
        () => props.github?.contributionCalendar.weeks ?? []
    )

    const totalContributionList = computed(() =>
        weeks.value.flatMap(week =>
        week.contributionDays.map(day => day.contributionCount)
        )
    )

    const averageContribution = computed(() => {
        const list = totalContributionList.value
        if (!list.length) return 0

        const total = list.reduce((sum, v) => sum + v, 0)
        return Math.round(total / list.length)
    })

    const stats = computed<StatItem[]>(() => [
        {
            label: tGithub('title_total_contribution'),
            value: totalContributions.value,
            icon: 'mdi:speedometer'
        },
        {
            label: tGithub('title_average_contribution'),
            value: averageContribution.value,
            unit: '/' + tGithub('unit'),
            icon: 'mdi:chart-timeline-variant'
        }
    ])
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3">
        <UCard 
            v-for="(stat, index) in stats"
            :key="index"
            class="hover:shadow"
        >
            <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-zinc-800">
                <Icon class="text-blue-500" :name="stat.icon" />
            </div>

            <div class="flex items-end justify-between mt-5">
                <h3 class="mt-2 text-lg text-zinc-500 font-semibold dark:text-zinc-400">
                    {{ stat.label }}
                </h3>

                <div class="mt-2 text-xl text-blue-500 lg:text-2xl">
                    {{ stat.value }}
                <span
                    v-if="stat.unit"
                    class="ml-1 text-sm font-normal dark:text-zinc-400"
                >
                    {{ ' ' + stat.unit }}
                </span>
                </div>
            </div>
        </UCard>
    </div>
</template>