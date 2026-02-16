<script lang="ts" setup>
    import { Projects } from '@/constants/projects'
    useSeoPage('ProjectsPage')
    const { t } = useI18n()
    const tProj = (key: string) => t(`ProjectsPage.${key}`)
    
    const open = ref(false)
    const selected = ref<any>(null)

    function show(pro: any) {
      selected.value = pro
      open.value = true
    }
</script>

<template>
    <UDashboardPanel id="project">
        <template #body>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-5 py-2">
                <div v-for="pro in Projects" :key="pro.slug">
                    <NuxtLink :to="`/projects/${pro.slug}`" class="group relative block h-full" >
                        <div class="absolute inset-0 z-10 flex items-center justify-center rounded
                                opacity-0 transition duration-300
                                group-hover:bg-black/10 group-hover:backdrop group-hover:opacity-100"
                        >
                            <UIcon name="i-mdi:external-link" class="text-white text-4xl scale-75 transition duration-300 group-hover:scale-100"
                            />
                        </div>

                        <UCard class="h-full flex flex-col overflow-hidden transition duration-300 hover:shadow" >
                            <div class="aspect-video overflow-hidden">
                                <img :src="pro.image"
                                    :alt="pro.title"
                                    loading="lazy"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                            <div class="flex flex-col flex-1 p-5 space-y-2">
                                <h4 class="font-medium line-clamp-1">
                                    {{ pro.title }}
                                </h4>

                                <p class="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                    {{ pro.description }}
                                </p>
                            </div>
                        </UCard>
                    </NuxtLink>
                </div>
            </div>
        </template>
    </UDashboardPanel>
</template>