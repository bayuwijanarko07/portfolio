import { reactive } from 'vue'

export function useContactForm() {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const form = reactive({
    name: '',
    email: '',
    message: '',
  })

  const errors = reactive({
    name: '',
    email: '',
    message: '',
  })

  watch(() => form.name,
    (val) => {
      if (val.trim()) errors.name = ''
    }
  )

  watch(() => form.email,
    (val) => {
      if (!val.trim()) return
      if (emailRegex.test(val)) errors.email = ''
    }
  )

  watch(() => form.message,
    (val) => {
      if (val.trim()) errors.message = ''
    }
  )

  function validate() {
    errors.name = form.name.trim()
      ? ''
      : 'error_name'

    errors.email = !form.email.trim()
      ? 'error_email'
      : !emailRegex.test(form.email)
        ? 'error_email'
        : ''

    errors.message = form.message.trim()
      ? ''
      : 'error_message'

    return !(errors.name || errors.email || errors.message)
  }

  function reset() {
    form.name = ''
    form.email = ''
    form.message = ''
    errors.name = ''
    errors.email = ''
    errors.message = ''
  }

  return {
    form,
    errors,
    validate,
    reset,
  }
}