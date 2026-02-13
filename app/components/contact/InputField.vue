<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClass"
      />
    </div>

    <p v-if="error" class="text-xs text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modelValue?: string
    type?: string
    placeholder?: string
    label?: string
    error?: string
    disabled?: boolean
    className?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
  })

  const model = defineModel<string>()

  const baseClass =
    'w-full rounded-lg bg-transparent py-2 pl-3 pr-3 text-sm' +
    'placeholder:text-gray-400 focus:outline-none transition'

  const normalClass =
    'border border-zinc-200 ' +
    'dark:border-zinc-800 ' +
    'focus:border-blue-400'

  const errorClass =
    'border border-red-400 text-zinc-800 dark:text-zinc-100 ' +
    'focus:border-red-400'

  const inputClass = computed(() => [
    baseClass,
    props.error ? errorClass : normalClass,
    props.className,
  ])
</script>
