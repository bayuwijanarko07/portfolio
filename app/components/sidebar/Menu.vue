<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSidebar } from "@/composables/useSidebar"
import type { SidebarMenuProps, MenuItem } from '@/types/menu'

const props = defineProps<SidebarMenuProps>()

const route = useRoute()
const { t } = useI18n()
const { isExpanded, isMobileOpen, isHovered, toggleMobileSidebar } = useSidebar()

const tNav = (key: string) => t(`Navigation.${key}`)

const isSidebarOpen = computed(() =>
  isExpanded.value || isHovered.value || isMobileOpen.value
)

const isHashLink = (menu: MenuItem) => menu.to === '#'

const isActiveRoute = (menu: MenuItem) => {
  const currentPath = route.path
  const targetPath = menu.to

  if (currentPath === targetPath) return true
  return currentPath.startsWith(`${targetPath}/`)
}

const getActiveClasses = (menu: MenuItem) => {
  if (menu.isExclusive) {
    return `
      my-1 flex items-center gap-2 rounded-full
      border border-blue-500 bg-blue-500/10
      px-4 py-2 text-blue-500
      hover:bg-blue-500/20
      dark:border-blue-300 dark:bg-blue-300/10 dark:text-blue-300
      dark:hover:bg-blue-400/20
      lg:transition-all lg:duration-300
    `
  }

  return `
    flex items-center rounded-lg group relative
    ${isSidebarOpen.value ? 'gap-2 px-4 py-2' : 'justify-center p-2'}
    text-zinc-700 dark:text-zinc-400
    hover:text-zinc-900 hover:dark:text-zinc-300
    ${
      isActiveRoute(menu)
        ? 'bg-blue-100 dark:bg-zinc-800 text-blue-500 dark:!text-zinc-200'
        : 'hover:lg:bg-zinc-200 hover:dark:lg:bg-zinc-800 lg:transition-all lg:duration-300'
    }
  `
}

const handleMobileNavigate = () => {
  if (isMobileOpen.value) {
    toggleMobileSidebar()
  }
}
</script>

<template>
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav class="mb-6">
            <ul class="flex flex-col gap-1">
                <li v-for="menu in props.list" :key="menu.to">
                    <div v-if="isHashLink(menu)" class="cursor-pointer">
                        <div :class="getActiveClasses(menu)">
                            <UIcon :name="menu.icon" />
                            <span v-if="isSidebarOpen"> 
                                {{ tNav(`${menu.label}`) }}
                            </span>
                        </div>
                    </div>

                    <NuxtLink
                        v-else
                        :to="menu.to"
                        :aria-current="isActiveRoute(menu) ? 'page' : undefined"
                        class="cursor-pointer"
                        @click="handleMobileNavigate"
                    >
                        <div :class="getActiveClasses(menu)">
                            <UIcon :name="menu.icon" :class="isActiveRoute(menu) && 'transition-all duration-300 animate-pulse bg-blue-500'" />

                            <span v-if="isSidebarOpen" class="menu-item-text grow"  :class="isActiveRoute(menu) && 'text-blue-500'">
                                {{ tNav(`${menu.label}`) }}
                            </span>

                            <div v-if="!isSidebarOpen" class="absolute left-full ml-2 hidden group-hover:block">
                                <span class="px-2 py-1 text-xs rounded bg-zinc-800 text-white">
                                    {{ tNav(`${menu.label}`) }}
                                </span>
                            </div>

                            <UIcon v-if="isActiveRoute(menu) && !menu.isExclusive && isSidebarOpen" name="mdi:arrow-right" class="animate-pulse bg-blue-500" />
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
