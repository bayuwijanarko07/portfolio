
<script lang="ts" setup>
    import { ref, watch } from 'vue'
    import { useMotion } from '@vueuse/motion'

    const props = defineProps<{
        modelValue?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void
    }>()

    const isOpen = ref(props.modelValue ?? false)

    watch(
    () => props.modelValue,
        (val) => {
            if (typeof val === 'boolean') {
                isOpen.value = val
                animate()
            }
        }
    )

    const toggle = () => {
        isOpen.value = !isOpen.value
        emit('update:modelValue', isOpen.value)
        animate()
    }

    const line1 = ref<HTMLElement | null>(null)
    const line2 = ref<HTMLElement | null>(null)
    const line3 = ref<HTMLElement | null>(null)

    const m1 = useMotion(line1, {
        initial: { y: -6, rotate: 0 },
        transition: { duration: 0.25, easing: 'ease-out' },
    })
    const m2 = useMotion(line2, {
        initial: { y: 0, opacity: 1 },
        transition: { duration: 0.2, easing: 'ease-out' },
    })
    const m3 = useMotion(line3, {
        initial: { y: 6, rotate: 0 },
        transition: { duration: 0.25, easing: 'ease-out' },
    })

    const animate = () => {
        if (isOpen.value) {
            m1.apply({ y: 0, rotate: 45 })
            m2.apply({ opacity: 0 })
            m3.apply({ y: 0, rotate: -45 })
        } else {
            m1.apply({ y: -6, rotate: 0 })
            m2.apply({ opacity: 1 })
            m3.apply({ y: 6, rotate: 0 })
        }
    }
</script>
<template>
     <button
        @click="toggle"
        class="flex items-center justify-center w-10 h-10 z-50 cursor-pointer
        border rounded bg-zinc-100 dark:bg-zinc-800
        border-zinc-300 dark:border-zinc-700
        "
        >
        <span ref="line1" class="absolute w-4 h-0.5 bg-gray-500 dark:bg-gray-400"></span>
        <span ref="line2" class="absolute w-4 h-0.5 bg-gray-500 dark:bg-gray-400"></span>
        <span ref="line3" class="absolute w-4 h-0.5 bg-gray-500 dark:bg-gray-400"></span>
    </button>
</template>