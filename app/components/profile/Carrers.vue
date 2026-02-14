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

    const openId = ref<string | number | null>(null)

    const toggle = (id: string | number) => {
        openId.value = openId.value === id ? null : id
    }
</script>

<template>
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
            <UCard v-for="(c,index) in careers">
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
                        <h6>{{ c.position }}</h6>
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
                        <button
                            class="flex items-center justify-center"
                            @click="toggle(c.id)"
                            >
                            <span class="rounded flex items-center justify-center cursor-pointer text-sm text-muted ">
                                {{ openId === c.id
                                ? tCareers('hide_detail')
                                : tCareers('show_detail') }}
                            </span>
                            <UIcon name="mdi:chevron-right" class="size-5" :class="{ 'rotate-90': openId === c.id }" />
                        </button>
                    </div>
                </div>
                <div v-if="openId === c.id" class="mt-3">
                    <ul class="list-disc pl-5">
                        <li v-for="(res, i) in c.responsibilities" :key="i" class="py-1 text-sm text-muted">
                        {{ res }}
                        </li>
                    </ul>
                </div>
            </UCard>
        </div>

    </UCard>
</template>