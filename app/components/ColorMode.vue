<template>
  <ClientOnly v-if="!colorMode?.forced">
    <div role="switch"
        :aria-checked="isDark"
        class="relative flex h-10 w-20 items-center bg-zinc-100 dark:bg-zinc-800
            rounded-full border border-zinc-300 dark:border-zinc-700 p-1"
    >
    <div
        ref="sliderEl"
        class="absolute bottom-1 top-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700"
    />
        <div class="flex w-full items-center justify-between px-2 mt-1">
            <button
                ref="sunEl"
                class="relative z-10 p-2 -m-2 cursor-pointer"
                @click="setMode(false)"
            >
            <UIcon
                name="mdi:white-balance-sunny"
                class="text-yellow-500 dark:text-yellow-300 transition-colors"
            />
            </button>

            <button
                ref="moonEl"
                class="relative z-10 p-2 -m-2 cursor-pointer"
                @click="setMode(true)"
            >
            <UIcon
                name="mdi:weather-night"
                class="text-gray-600 dark:text-gray-300 transition-colors"
            />
        </button>
        </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue'
    import { useMotion } from '@vueuse/motion'
    const colorMode = useColorMode()

    const isDark = computed({
        get() {
            return colorMode.value === 'dark'
        },
        set(value: boolean) {
            colorMode.preference = value ? 'dark' : 'light'
        }
    })
    
    const sliderEl = ref<HTMLElement | null>(null)
    const sunEl = ref<HTMLElement | null>(null)
    const moonEl = ref<HTMLElement | null>(null)

    const sliderMotion = useMotion(sliderEl)
    const sunMotion = useMotion(sunEl)
    const moonMotion = useMotion(moonEl)

    const applyMotion = (dark: boolean) => {
        sliderMotion.apply({
        x: dark ? 38 : 0,
        transition: {
            type: 'spring',
            stiffness: 220,
            damping: 22,
        },
        })

        sunMotion.apply({
        opacity: dark ? 0.4 : 1,
        scale: dark ? 0.9 : 1,
        })

        moonMotion.apply({
        opacity: dark ? 1 : 0.4,
        scale: dark ? 1 : 0.9,
        })
    }

    onMounted(() => {
        applyMotion(isDark.value)
    })

    watch(isDark, applyMotion)

    const setMode = (dark: boolean) => {
        isDark.value = dark
    }
</script>