import { WAKATIME_ACCOUNT } from '@/constants/wakatime'
import { wakatimeAuthHeader } from '../utils/wakatimeAuthHeader'
import { 
    WakaStatsData,
    WakaAllTimeData,
    WakaHandlerResponse
} from '@/types/wakatime'

export default cachedEventHandler(
    async (): Promise<WakaHandlerResponse> => {
        try {
            const headers = wakatimeAuthHeader()
            const base = `${WAKATIME_ACCOUNT.base_url}/users/current`

            const [statsRes, allTimeRes] = await Promise.all([
                $fetch<{ data: WakaStatsData }>(`${base}/stats/last_7_days`,{ headers }),
                $fetch<{ data: WakaAllTimeData }>(`${base}/all_time_since_today`,{ headers } ),
            ])

            return {
                status: 200,
                stats: statsRes.data,
                all_time: allTimeRes.data,
            }

        } catch (error: unknown) {
            const err = error as { statusCode?: number }

            return {
                status: err?.statusCode ?? 500,
                stats: null,
                all_time: null,
            }
        }
    },
    {
        maxAge: 60 * 60,
        staleMaxAge: 60 * 60 * 24,
        name: 'wakatime-overview-cache',
    }
)

