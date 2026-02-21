<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import { Skiils } from '@/constants/skills'

    const { t } = useI18n()
    const tSkills = (key: string) => t(`ProfilePage.skills.${key}`)

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
  <div class="flex items-center gap-2 justify-start">
    <div class="p-1 rounded bg-primary flex items-center justify-center">
      <UIcon name="mdi:code" class="text-white text-sm sm:text-base" />
    </div>
    <span class="font-semibold text-primary-500 text-sm sm:text-base">
      {{ tSkills('title') }}
    </span>
  </div>

  <div class="w-full overflow-hidden">
    <UCard>
    <UMarquee
      :overlay="false"
      pause-on-hover
    >
      <div
        v-for="(skill, i) in Skiils"
        :key="i"
        class="shrink-0 px-2 sm:px-3 lg:px-4 flex items-center justify-center"
      >
        <UIcon
          :name="skill.icon"
          @mouseenter="onEnter($event, skill.title)"
          @mousemove="onMove($event)"
          @mouseleave="onLeave"
          class="text-lg sm:text-xl lg:text-2xl transition duration-300 hover:scale-110 hover:text-primary-500"
        />
      </div>
    </UMarquee>
    

    <div
      v-if="tooltip.show"
      class="fixed z-50 rounded bg-zinc-800 px-2 py-1 text-xs text-white pointer-events-none shadow-lg"
      :style="{
        left: tooltip.x + 12 + 'px',
        top: tooltip.y + 12 + 'px'
      }"
    >
      {{ tooltip.text }}
    </div>
    </UCard>
  </div>
</template>