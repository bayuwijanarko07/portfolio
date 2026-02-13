<script lang="ts" setup>
    import { Projects } from '@/constants/projects'
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
        <template #header>
            <UDashboardNavbar title="Project" :ui="{ right: 'gap-3' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
          <div class="grid grid-cols-1 gap-5 py-2 xl:grid-cols-3">
            <UCard class="flex flex-col sm:col-span-1 hover:shadow transition cursor-pointer"
              v-for="pro in Projects"
              @click="show(pro)"
            >
            
              <div class="overflow-hidden rounded-lg">
                <img  
                    :src="pro.image"
                    :alt="pro.image"
                    loading="lazy"
                    class="object-cover ease-in-out scale-100 blur-0 grayscale-0 transition duration-500 hover:scale-[.99]"
                />
              </div>

              <div class="space-y-2 p-5">
                <h4 class="mb-1 font-medium">
                  {{ pro.title }}
                </h4>
                <p class="line-clamp-1">
                  {{ pro.description }}
                </p>
              </div>

              <!-- <UModal v-model:open="open" :ui="{ content: 'max-w-6xl' }">
                <template #content>
                    <div v-if="selected" class="space-y-4 p-5">
                      <div class="flex justify-between py-2">
                        <UButton
                          color="neutral"
                          variant="ghost"
                          icon="i-lucide-x"
                          @click="open = false"
                        >
                        </UButton>
                        <a v-if="selected.href"
                          :href="selected?.href"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 p-3 text-zinc-600 hover:text-blue-500 transition-all duration-300 font-medium dark:text-zinc-100"
                        >
                          {{ tProj('live_preview') }}
                          <UIcon name="mdi:external-link" />
                        </a>
                      </div>
                    <img
                      :src="selected.image"
                      :alt="selected.title"
                      class="rounded-lg w-full object-cover"
                    />

                    <div class="flex flex-wrap gap-3">
                      <div
                        v-for="tech in selected.techstack"
                        :key="tech.title"
                        class="relative group"
                      >
                      <UIcon :name="`${tech.icon}`" class="text-3xl hover:text-blue-500 text-zinc-600 dark:text-zinc-300 cursor-pointer" />
                        <span
                          class="absolute left-1/2 top-full z-10 m-2 -translate-x-1/2
                                whitespace-nowrap rounded-md bg-zinc-500  px-2 py-1
                                text-xs text-white opacity-0 shadow-md
                                transition-opacity duration-200
                                group-hover:opacity-100"
                        >
                          {{ tech.title }}
                        </span>
                      </div>
                    </div>
                    <h2 class="text-xl font-bold">
                      {{ selected.title }}
                    </h2>

                    <p>
                      {{ selected.description }}
                    </p>

                  </div>
                </template>
              </UModal> -->

            </UCard>
          </div>
        </template>
     
    </UDashboardPanel>
</template>