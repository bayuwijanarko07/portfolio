<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui'
    import { useI18n } from 'vue-i18n'

    const open = ref(false)

    type Locale = 'id' | 'en'

    const { locale, setLocale } = useI18n()

    const locales: { code: Locale; name: string }[] = [
        { code: 'id', name: 'Indonesia' },
        { code: 'en', name: 'English' }
    ]

    const currentLocaleLabel = computed(() => 
        locale.value.toUpperCase()
    )

    const changeLanguage = (code: Locale) => {
        if (locale.value === code) return
        setLocale(code)
    }

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

                <UDropdownMenu
                    :items="locales.map(l => ({
                        label: l.name,
                        onSelect: () => changeLanguage(l.code)
                    }))"
                    >
                    <UButton
                        icon="i-lucide-languages"
                        color="neutral"
                        variant="ghost"
                        block
                    >
                        {{ currentLocaleLabel }}
                    </UButton>
                </UDropdownMenu>
            </template>

        </UDashboardSidebar>

        <UDashboardSearch :groups="groups" />

        <slot />
    </UDashboardGroup>
</template>