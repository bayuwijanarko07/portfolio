<script setup lang="ts">
    import { menus } from "@/constants/menu";
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

    const changeLanguage = async (code: Locale) => {
        if (locale.value === code) return
        await setLocale(code)
    }

    const allMenuItems = computed<NavigationMenuItem[]>(() => menus)

    const languageItems = computed(() =>
        locales.map(l => ({
            id: `lang-${l.code}`,
            label: l.name,
            icon: 'i-lucide-languages',
            onSelect: () => changeLanguage(l.code)
        }))
    )

    const groups = computed(() => [
        {
            id: 'navigation',
            label: 'Navigation',
            items: allMenuItems.value
        },
        {
            id: 'language',
            label: 'Language',
            items: languageItems.value
        }
    ])

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
                    :items="allMenuItems"
                    orientation="vertical"
                />

                <UNavigationMenu
                    :collapsed="collapsed"
                    orientation="vertical"
                    class="mt-auto"
                />

                <UDropdownMenu :items="languageItems">
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

        <UDashboardSearch :groups="groups" modal/>

        <slot />
    </UDashboardGroup>
</template>