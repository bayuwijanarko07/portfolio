<script setup lang="ts">
    import { useSidebar } from '@/composables/useSidebar'
    const { toggleMobileSidebar, isMobileOpen } = useSidebar()
</script>

<template>
    <div
        v-if="isMobileOpen"
        class="xl:hidden fixed inset-0 bg-zinc-900/50 z-40"
        @click="toggleMobileSidebar"
    ></div>
</template>