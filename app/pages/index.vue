<script setup lang="ts">
    import type { DropdownMenuItem } from '@nuxt/ui'

    const items = [[{
        label: 'New mail',
        icon: 'i-lucide-send',
        to: '/inbox'
    }, {
        label: 'New customer',
        icon: 'i-lucide-user-plus',
        to: '/customers'
    }]] satisfies DropdownMenuItem[][]
</script>

<template>
    <UDashboardPanel id="home">
        <template #header>
            <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UTooltip text="Notifications" :shortcuts="['N']">
                        <UChip color="error" inset>
                            <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
                        </UChip>
                    </UTooltip>

                    <UDropdownMenu :items="items">
                        <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
                    </UDropdownMenu>
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
        
        </template>
    </UDashboardPanel>
</template>
