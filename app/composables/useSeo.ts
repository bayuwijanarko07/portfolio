import { computed, unref } from 'vue'
import { useI18n, useSeoMeta } from '#imports'

type SeoOverride = {
  title?: string
  description?: string
}

export function useSeoPage(
  pageKey: string,
  override?: SeoOverride
) {
  const { t, locale } = useI18n()

  const title = computed(() => {
    if (override?.title) {
      return `${unref(override.title)} | Bayu Wijanarko`
    }
    return `${t(`${pageKey}.title`)} | Bayu Wijanarko`
  })

  const description = computed(() => {
    if (override?.description) {
      return unref(override.description)
    }
    return t(`${pageKey}.description`)
  })

  useSeoMeta({
    title,
    description,

    ogTitle: title,
    ogDescription: description,
    ogLocale: () => locale.value,
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description
  })
}