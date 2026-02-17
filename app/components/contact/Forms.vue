<script setup lang="ts">
    import { useContactForm } from '@/composables/useForm'

    const { t } = useI18n()
    const tCont = (key: string) => t(`ContactPage.${key}`)
    const errorMessage = (key: string) => {
        return key
        ? t(`ContactPage.email_forms.${key}`)
        : ''
    }

    const toast = useAppToast()
  
    const loading = ref(false)
    const turnstileRef = ref<any>(null)

    const {
        form,
        errors,
        validate,
        reset,
    } = useContactForm()

    const canSubmit = computed(() => {
        return !loading.value
    })

    async function handleSubmit() {
        if (!validate()) return

        loading.value = true

        try { await $fetch('/api/contact', {
            method: 'POST',
            body: {
                ...form,
            },
        })

        toast.success('Message sent','Thanks for reaching out, I will reply soon.')

        reset()
        turnstileRef.value?.reset()
        
        } catch (err) {
            toast.error('Failed to send','Something went wrong. Please try again later.')
        } finally {
            loading.value = false
        }
    }
</script>

<template>
     <div class="flex items-center gap-2 p-0">
        <div class="p-0.5 rounded bg-primary flex items-center justify-center">
            <UIcon name="mdi:user" class="text-white"/>
        </div>
        <span class="font-semibold text-primary-500">
            {{ tCont('title') }}
        </span>
    </div>
    <UPageCard>
        <form @submit.prevent="handleSubmit">
            <div class="-mx-2.5 flex flex-wrap gap-y-5">
                <div class="w-full px-2.5 xl:w-1/2">
                    <ContactInputField
                        :label="tCont('email_forms.label_name')"
                        v-model="form.name"
                        type="text"
                        :placeholder="tCont('email_forms.placeholder_name')"
                        className="text-sm font-sm"
                        :error="errorMessage(errors.name)"
                        :disabled="loading"
                    />
                </div>
                <div class="w-full px-2.5 xl:w-1/2">
                    <ContactInputField
                        :label="tCont('email_forms.label_email')"
                        v-model="form.email"
                        type="text"
                        :placeholder="tCont('email_forms.placeholder_email')"
                        className="text-sm font-sm"
                        :error="errorMessage(errors.email)"
                        :disabled="loading"
                    />
                </div>
                <div class="w-full px-2.5">
                    <ContactTextArea
                        :label="tCont('email_forms.label_message')"
                        v-model="form.message"
                        :rows=5
                        :placeholder="tCont('email_forms.placeholder_message')"
                        className="text-sm font-sm"
                        :error="errorMessage(errors.message)"
                        :disabled="loading"
                    />
                </div>
                <div class="w-full px-2.5">
                    <button
                        type="submit"
                        :disabled="!canSubmit"
                        class="w-full cursor-pointer p-3 bg-blue-500 text-sm font-medium rounded-lg 
                        text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2 hover:bg-blue-600 transition-hover duration-300 ease-in-out"
                    >
                        <span v-if="!loading">{{ tCont('email_forms.button') }}</span>

                        <span v-else class="flex items-center gap-2">
                            <UIcon name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
                            {{ tCont('email_forms.sending') }}
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </UPageCard>
</template>