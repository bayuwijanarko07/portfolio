<script lang="ts" setup>
    import { ref } from 'vue'
    import { useSidebar } from '@/composables/useSidebar'

    const { toggleSidebar, toggleMobileSidebar } = useSidebar()

    const isHamburgerOpen = ref(false)

    const handleToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar()
        } else {
            toggleMobileSidebar()
        }
    }

    const isApplicationMenuOpen = ref(false)

    const toggleApplicationMenu = () => {
        isApplicationMenuOpen.value = !isApplicationMenuOpen.value
    }
</script>

<template>
    <header class="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-zinc-900 xl:border-b">
        <div class="flex flex-col items-center justify-between grow xl:flex-row xl:px-6">
            <div class="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0 lg:py-4">
                <HeaderHamburger v-model="isHamburgerOpen" @click="handleToggle" />
                <button
                    @click="toggleApplicationMenu"
                    class="flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg z-50 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 xl:hidden"
                >
                    <UIcon name="mdi:dots-horizontal"/>
                </button>
            </div>
            <div
                :class="[
                    isApplicationMenuOpen ? 'flex' : 'hidden',
                    'items-center justify-between w-full gap-4 px-5 py-4 xl:flex lg:justify-end lg:px-0'
                ]"
                >
                <div class="flex items-center gap-2 2xsm:gap-3">
                    <!-- <HeaderLocaleSwitcher />
                    <HeaderModeSwitcher /> -->
                </div>
            </div>
        </div>
    </header>
</template>
