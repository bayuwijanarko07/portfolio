<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import { careers } from '@/constants/careers'
    import { format, formatDistanceStrict } from 'date-fns'
    import { id, enUS } from 'date-fns/locale'

    const { t, locale } = useI18n()
    const tCareers = (key: string) => t(`ProfilPage.careers.${key}`)

    const dfLocale = computed(() => (locale.value === 'id' ? id : enUS))

    function parseYM(dateStr: string) {
        const [yStr, mStr] = dateStr.split('-')
        const y = Number(yStr)
        const m = Number(mStr ?? 1)

        return new Date(y, m - 1)
    }

    function startLabel(dateStr: string) {
        return format(parseYM(dateStr), 'MMM yyyy', {
            locale: dfLocale.value
        })
    }

    function endLabel(dateStr?: string) {
        if (!dateStr) return locale.value === 'id' ? 'Sekarang' : 'Present'

        return format(parseYM(dateStr), 'MMM yyyy', {
            locale: dfLocale.value
        })
    }

    function duration(start: string, end?: string) {
        const startDate = parseYM(start)
        const endDate = end ? parseYM(end) : new Date()

        return formatDistanceStrict(startDate, endDate, {
            locale: dfLocale.value
        })
    }

</script>

<template>
    <UPageGrid class="gap-4 lg:grid-cols-1">
        <UCard>

            <template #header>
                <div class="flex items-center gap-2 p-0">
                    <div class="p-0.5 rounded bg-primary flex items-center justify-center">
                        <UIcon name="mdi:briefcase-variant" class="text-white"/>
                    </div>
                    <span class="font-semibold text-primary-500">
                        {{ tCareers('title') }}
                    </span>
                </div>
            </template>

            <div class="grid grid-cols-1 gap-4">
                <UCard v-for="c in careers">
                    <div class="flex flex-row">
                        <div class="mx-4">
                            <img  
                                :src="c.logo"
                                :alt="c.company"
                                width="70"
                                height="70"
                                class="shrink-0 rounded"
                            />
                        </div>
                        <div class="w-full space-y-1">
                            <h6 class="space-y-2 text-sm text-muted">{{ c.position }}</h6>
                            <div class="space-y-2 text-sm text-muted">
                                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <NuxtLink :href="c.link || '#'" target="_blank" rel="noopener">
                                        <span class="cursor-pointer hover:text-zinc-900 hover:underline hover:dark:text-zinc-50">
                                            {{ c.company }}
                                        </span>
                                    </NuxtLink>
                                    <span class="text-sm text-muted">
                                    •
                                    </span>
                                    <span>{{ c.location }}</span>
                                </div>
                            </div>
                            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                                <span class="text-sm text-muted">
                                    {{ startLabel(c.start_date) }} - {{ endLabel(c.end_date) }}
                                </span>
                                <span class="">
                                •
                                </span>
                                <span class="text-sm text-muted">
                                    {{ duration(c.start_date, c.end_date) }}
                                </span>
                                <div class="flex gap-2">
                                    <span class="text-sm text-muted">
                                    •
                                    </span>
                                    <span class="text-sm text-muted">{{ c.location_type }}</span>
                                </div>
                                <div class="flex gap-2">
                                    <span class="text-sm text-muted">
                                    •
                                    </span>
                                    <span class="text-sm text-muted">{{ c.type }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mx-4">
                            <UModal title="Responsibilities" :close="{ variant: 'outline' }">
                                <div class="p-0.5 rounded flex items-center justify-center cursor-pointer">
                                    <UIcon name="mdi:open-in-app" class="size-5"/>
                                </div>
                                <template #body>
                                   <div class="p-5">
                                        <ul class="list-disc" v-for="res in c.responsibilities">
                                            <li class="py-2">{{ res }}</li>
                                        </ul>
                                   </div>
                                </template>
                            </UModal>
                        </div>
                    </div>
                </UCard>
            </div>

        </UCard>
    </UPageGrid>
</template>