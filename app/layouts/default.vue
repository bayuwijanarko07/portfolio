<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui'

    const open = ref(false)

    const links = [[
        {
            label: 'Home',
            icon: 'i-lucide-house',
            to: '/',
            onSelect: () => {
                open.value = false
            }
        }, 
    ]] satisfies NavigationMenuItem[][]

    const groups = computed(() => [{
        id: 'links',
        label: 'Go to',
        items: links.flat()
    }])
</script>

<template>
    <UDashboardGroup unit="rem">
        <UDashboardSidebar
            id="default"
            v-model:open="open"
            collapsible
            resizable

            :ui="{ footer: 'lg:border-t lg:border-default' }"
        >

            <template #default="{ collapsed }">
                <UDashboardSearchButton :collapsed="collapsed" />

                <UNavigationMenu
                    :collapsed="collapsed"
                    :items="links[0]"
                    orientation="vertical"
                    tooltip
                    popover
                />

                <UNavigationMenu
                    :collapsed="collapsed"
                    :items="links[1]"
                    orientation="vertical"
                    tooltip
                    class="mt-auto"
                />
            </template>

        </UDashboardSidebar>

        <UDashboardSearch :groups="groups" />

        <slot />
  </UDashboardGroup>
</template>