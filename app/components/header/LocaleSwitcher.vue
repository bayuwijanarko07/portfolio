<script lang="ts" setup>
    import { useI18n } from '#imports'
    import { useMotion } from '@vueuse/motion'

    type Locale = 'id' | 'en'

    const langs = [
        { code: 'id', src: '/icon/mc.svg' },
        { code: 'en', src: '/icon/gb.svg' }
    ] as const

    const { locale, setLocale } = useI18n()

    const currentLocale = ref<Locale>(locale.value as Locale)
    const isOpen = ref(false)

    watch(locale, (val) => {
        currentLocale.value = val as Locale
    })

    const changeLanguage = (code: Locale) => {
        setLocale(code)
        isOpen.value = false
    }
  
    const chevronEl = ref<HTMLElement | null>(null)

    const chevronMotion = useMotion(chevronEl, {
        initial: {
            rotate: 0,
        },
    })

    watch(isOpen, async (open) => {
        chevronMotion.apply({
            rotate: open ? 90 : 0,
        })
    })
</script>

<template>
    <ClientOnly>
        <div class="relative inline-block">
            <button 
                @click="isOpen = !isOpen"
                class="flex items-center justify-center h-10 px-2 cursor-pointer
                    border rounded bg-zinc-100 dark:bg-zinc-800
                    border-zinc-300 dark:border-zinc-700">
                <img :src="`${currentLocale === 'id' ? '/icon/mc.svg' : '/icon/gb.svg'}`" class="h-5 w-5" />
                <span ref="chevronEl">
                    <UIcon name="mdi:chevron-right" class="h-5 w-5 ml-0.5 mt-1" />
                </span>
            </button>
            <div
                v-if="isOpen"
                class="absolute right-0 z-10 mt-2
                        rounded border bg-zinc-100 dark:bg-zinc-800
                        border-zinc-300 dark:border-zinc-700"
                >
                <button
                    v-for="lang in langs"
                    :key="lang.code"
                    @click="changeLanguage(lang.code)"
                    class="flex items-center justify-center h-10 px-5 dark:hover:bg-zinc-700"
                >
                    <img :src="`${lang.src}`" class="h-5 w-5" />
                </button>
            </div>
        </div>
  </ClientOnly>
</template>