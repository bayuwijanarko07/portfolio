import type { ContributionsCollection } from '@/types/github'
import type { WakaHandlerResponse } from '@/types/wakatime'

interface HomeData {
  github: ContributionsCollection | null
  wakatime: WakaHandlerResponse | null
}

export const useHomeData = () => {
  const { data, pending, error, refresh } = useAsyncData<HomeData>(
    'home-data',
    async () => {
      const [github, wakatime] = await Promise.all([
        $fetch<ContributionsCollection>('/api/github', {
          method: 'POST'
        }),
        $fetch<WakaHandlerResponse>('/api/wakatime')
      ])

      return {
        github,
        wakatime
      }
    },
    {
      server: true,
      lazy: false
    }
  )

  return {
    data,
    pending,
    error,
    refresh
  }
}
