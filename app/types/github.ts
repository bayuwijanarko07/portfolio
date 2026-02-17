export interface ContributionDay {
    date: string
    contributionCount: number
    color: string
}

export interface ContributionWeek {
    firstDay: string
    contributionDays: ContributionDay[]
}

export interface ContributionMonth {
    name: string
    firstDay: string
    totalWeeks: number
}

export interface ContributionCalendar {
    totalContributions: number
    colors: string[]
    months: ContributionMonth[]
    weeks: ContributionWeek[]
}

export interface ContributionsCollection {
    contributionCalendar: ContributionCalendar
    ContributionsCollection: number
    totalCommitContributions: number
    totalIssueContributions: number
    totalPullRequestContributions: number
    totalPullRequestReviewContributions: number
}

export interface GithubUser {
    contributionsCollection: ContributionsCollection
}

export interface GithubApiResponse {
    status: number
    data: GithubUser
}

export interface GithubGraphQLResponse {
    data: {
        user: GithubUser
    }
}