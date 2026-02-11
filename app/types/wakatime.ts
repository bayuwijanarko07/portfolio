export interface WakaApiResponse<T>{
    data: T
}

export interface WakaStatsData {
    start: string
    end: string
    modified_at: string

    best_day?: {
        date: string
        text: string
    }

    human_readable_daily_average_including_other_language: string
    human_readable_total_including_other_language: string
}

export interface WakaAllTimeData {
    text: string
    total_seconds: number
}

export interface WakaHandlerResponse {
  status: number
  stats: WakaStatsData | null
  all_time: WakaAllTimeData | null
}
