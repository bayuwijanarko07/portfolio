<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
    const tFooter = (key: string) => t(`Footer.${key}`)

    const dateNow = () => {
        return new Date().getFullYear()
    }
</script>

<template>
    <div class="mx-auto w-full max-w-60 rounded-2xl bg-zinc-50 px-4 py-5 text-center text-sm dark:bg-white/3 text-zinc-600 dark:text-zinc-200">
        <div class="px-2">{{ tFooter('title') }}</div>
        <div class="mt-2">© {{ dateNow() }} {{ tFooter('sub_title') }}</div>
    </div>
</template>