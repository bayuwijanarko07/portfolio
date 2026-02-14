<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import { menus } from "@/constants/menu";
    import { useSidebar } from "@/composables/useSidebar";
    import { useRoute } from 'vue-router'
    const { t } = useI18n()
    const tNav = (key: string) => t(`Navigation.${key}`)
    const route = useRoute()

    const { isExpanded, isMobileOpen, isHovered , toggleMobileSidebar } = useSidebar();

    const isSidebarOpen = computed(() => isExpanded.value || isHovered.value || isMobileOpen.value)

    const handleMobileNavigate = () => {
        if (isMobileOpen.value) {
            toggleMobileSidebar()
        }
    }

    const isActiveRoute = (targetPath: string) => {
        const currentPath = route.path

        if (currentPath === targetPath) return true

        return currentPath.startsWith(`${targetPath}/`)
    }

    const props = defineProps<{
        isExclusive?: boolean
    }>()

    const baseClasses = computed(() => {
        if (props.isExclusive) {
            return [
            'my-1 flex items-center gap-2 rounded-full',
            'border border-blue-500 bg-blue-500/10',
            'px-4 py-2 text-blue-500',
            'hover:bg-blue-500/20',
            'dark:border-blue-300 dark:bg-blue-300/10 dark:text-blue-300',
            'dark:hover:bg-blue-400/20',
            'lg:transition-all lg:duration-300'
            ]
        }

        return [
            'flex items-center rounded-lg group',
            isSidebarOpen.value ? 'gap-2 px-4 py-2' : 'justify-center p-2',
            'text-zinc-700 dark:text-zinc-400',
            'hover:text-zinc-900 hover:dark:text-zinc-300'
        ]
    })

    const activeClasses = (targetPath: string) => {
        if (props.isExclusive) {
            return baseClasses.value
        }

        return [
            ...baseClasses.value,
            isActiveRoute(targetPath)
            ? 'bg-blue-100 dark:bg-zinc-800 text-blue-500 dark:!text-zinc-200'
            : 'hover:lg:bg-zinc-200 hover:dark:lg:bg-zinc-800 lg:transition-all lg:duration-300'
        ]
    }

</script>

<template>
    <aside
        ref="sidebarEl"
        :class="[
            'fixed flex flex-col mt-0 top-0 px-5 left-0 h-screen z-50 bg-white',
            {
                'xl:w-70': isExpanded || isMobileOpen,
                'xl:w-20': !isExpanded && !isHovered,
                'translate-x-0 w-70`': isMobileOpen,
                '-translate-x-full': !isMobileOpen,
                'xl:translate-x-0': true,
            },
        ]"
    >
        <div
            :class="[
                'flex m-2 justify-center',
                !isExpanded ? 'py-8' : 'py-6',
            ]"
            >
            <NuxtLink to="/">
                <img
                    v-if="isExpanded || isMobileOpen"
                    class="dark:hidden"
                    src="/images/logo-b.webp"
                    alt="Logo"
                    width="150"
                    height="40"
                    />
                <img
                    v-if="isExpanded || isMobileOpen"
                    class="hidden dark:block"
                    src="/images/logo-w.webp"
                    alt="Logo"
                    width="150"
                    height="40"
                />
                <img
                    v-else
                    src="/images/logo.webp"
                    alt="Logo"
                    width="30"
                    height="30"
                />
            </NuxtLink>
        </div>

        <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
            <nav class="mb-6">
                <ul v-for="men in menus"
                    :key="men.to"
                    class="flex flex-col gap-1">
                    <li>
                        <NuxtLink 
                            :to="men.to"
                            @click="handleMobileNavigate"
                        >
                            <div :class="activeClasses(men.to)">
                                <UIcon :name="men.icon" :class="isActiveRoute(men.to) && 'transition-all duration-300 animate-pulse bg-blue-500'"/>
                        
                                <span
                                    v-if="isSidebarOpen"
                                    class="menu-item-text grow"
                                    :class="isActiveRoute(men.to) ? 'text-blue-500' : ''"
                                >      
                                    {{ tNav(men.label) }}
                                </span>

                                <div v-if="!isSidebarOpen" class="absolute left-full ml-2 hidden group-hover:block">
                                    <span class="px-2 py-1 text-xs rounded bg-zinc-800 text-white">
                                        {{ tNav(men.label) }}
                                    </span>
                                </div>

                                <UIcon
                                    v-if="isActiveRoute(men.to) && isSidebarOpen"
                                    name="mdi:arrow-right"
                                    class="animate-pulse bg-blue-500"
                                />
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>