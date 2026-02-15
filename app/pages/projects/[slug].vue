<script lang="ts" setup>
    import { useRoute, createError } from '#imports'
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
    const route = useRoute()
    const tProj = (key: string) => t(`ProjectsPage.${key}`)

    const { getBySlug } = useProjects()
    const project = getBySlug(route.params.slug as string)

    if (!project) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Project not found'
        })
    }
</script>

<template>
  <UCard>
    <div class="lg:p-6 bg-white dark:bg-gray-900">
      
      <div class="flex justify-between mb-5">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 font-medium text-zinc-600 dark:text-zinc-400 transition hover:text-red-500"
        >
          <UIcon name="mdi:arrow-back-circle" />
          {{ tProj('back') }}
        </NuxtLink>

        <a
          v-if="project.href"
          :href="project.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 p-3 font-medium text-zinc-600 dark:text-zinc-100 transition hover:text-blue-500"
        >
          {{ tProj('live_preview') }}
          <UIcon name="mdi:external-link" />
        </a>
      </div>

      <div class="flex flex-col lg:flex-row justify-center dark:bg-zinc-900">
        
        <div class="flex-1">
            <div class="aspect-video overflow-hidden rounded-2xl">
                <img
                :src="project.image"
                :alt="project.image"
                loading="lazy"
                class="w-full h-full object-cover transition duration-500 hover:scale-[.99]"
                />
            </div>
        </div>

        <div class="flex flex-col flex-1 lg:px-5">
          <h1 class="py-5 text-center xl:text-left xl:text-2xl font-semibold">
            {{ project.title }}
          </h1>

          <div class="flex flex-wrap gap-3 py-5">
            <div
              v-for="tech in project.techstack"
              :key="tech.title"
              class="relative group"
            >
              <ClientOnly>
                <UIcon
                  :name="tech.icon"
                  class="text-3xl text-zinc-600 dark:text-zinc-300 cursor-pointer transition hover:text-blue-500"
                />
              </ClientOnly>

              <span
                class="absolute left-1/2 top-full z-10 m-2 -translate-x-1/2
                whitespace-nowrap rounded-md bg-zinc-500 px-2 py-1 text-xs text-white
                opacity-0 shadow-md transition-opacity group-hover:opacity-100"
              >
                {{ tech.title }}
              </span>
            </div>
          </div>

          <p class="text-justify text-zinc-600 dark:text-zinc-400">
            {{ project.description }}
          </p>
        </div>

      </div>
    </div>
  </UCard>
</template>
