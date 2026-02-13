<script lang="ts" setup>
    const { t } = useI18n()
    const tCont = (key: string) => t(`ContactPage.${key}`)
    import { Sosmed } from '@/constants/social'

    const tooltip = ref({
        show: false,
        text: '',
        x: 0,
        y: 0
    })

    const onEnter = (e: MouseEvent, title: string) => {
        tooltip.value.show = true
        tooltip.value.text = title
        onMove(e)
    }

    const onMove = (e: MouseEvent) => {
        tooltip.value.x = e.clientX
        tooltip.value.y = e.clientY
    }

    const onLeave = () => {
        tooltip.value.show = false
    }
    
</script>

<template>
    <UCard>
        <template #header class="border-none">
            <div class="flex items-center gap-2 p-0">
                <div class="p-0.5 rounded bg-primary flex items-center justify-center">
                    <UIcon name="mdi:user" class="text-white"/>
                </div>
                <span class="font-semibold text-primary-500">
                    {{ tCont('social_media.title') }}
                </span>
            </div>
        </template>

        <UMarquee reverse :overlay="false" pause-on-hover>
            <NuxtLink
                v-for="(sos) in Sosmed"
                :to="sos.href" target="_blank"
                class="m-2 flex items-center justify-center"
            >
                <UIcon
                    :name="sos.icon"
                    @mouseenter="onEnter($event, sos.title)"
                    @mousemove="onMove($event)"
                    @mouseleave="onLeave"
                    class="text-xl lg:text-2xl transition hover:scale-110 hover:text-primary-500"
                />
            </NuxtLink>
        </UMarquee>

        <div
            v-if="tooltip.show"
            class="fixed z-50 rounded bg-zinc-800 px-2 py-1 text-xs text-white pointer-events-none"
            :style="{
                left: tooltip.x + 12 + 'px',
                top: tooltip.y + 12 + 'px'
            }"
            >
            {{ tooltip.text }}
        </div>
    </UCard>
</template>