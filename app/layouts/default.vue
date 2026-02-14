<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui'
    import { useI18n } from 'vue-i18n'
    import { useSidebar } from '@/composables/useSidebar'

    const { isExpanded } = useSidebar()

    useHead({
        bodyAttrs: {
            class: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100'
        }
    })

</script>

<template>
    <UDashboardGroup unit="rem">
        <Sidebar/>
        <main class="flex-1 transition-all duration-300 ease-in-out"
                :class="[isExpanded ? 'xl:ml-72.5' : 'xl:ml-22.5']"
            >
            <div class="mx-auto max-w-screen-2xl p-4 pb-20 md:p-6 md:pb-6">
                <slot />
            </div>
        </main>
    </UDashboardGroup>
</template>