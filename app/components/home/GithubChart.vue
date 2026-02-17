<script lang="ts" setup>
    import * as d3 from 'd3'
    import { ref,computed,watch,onMounted,onBeforeUnmount,nextTick } from 'vue'
    import { useColorMode } from '#imports'
    import type { ContributionsCollection } from '@/types/github'

    const props = defineProps<{
        github?: ContributionsCollection | null
    }>()

    const svg = ref<SVGSVGElement | null>(null)
    const container = ref<HTMLDivElement | null>(null)

    const colorMode = useColorMode()

    const hasAnimated = ref(false)
    let resizeObserver: ResizeObserver | null = null
    let tooltip: d3.Selection<HTMLDivElement, unknown, null, undefined> | null = null

    const colors = computed(() => ({
        commits: '#22c55e',
        issues: '#3b82f6',
        prs: '#f59e0b',
        reviews: '#ec4899',
        label: colorMode.value === 'dark' ? '#e5e7eb' : '#334155'
    }))

    const draw = () => {
        if (!svg.value || !container.value || !props.github) return

        const shouldAnimate = !hasAnimated.value

        const rect = container.value.getBoundingClientRect()
        const size = Math.min(rect.width, rect.height || rect.width)
        const radius = size * 0.45

        const chartData = [
            { key: 'commits', label: 'Commits', value: props.github.totalCommitContributions, color: colors.value.commits },
            { key: 'issues', label: 'Issues', value: props.github.totalIssueContributions, color: colors.value.issues },
            { key: 'prs', label: 'Pull Requests', value: props.github.totalPullRequestContributions, color: colors.value.prs },
            { key: 'reviews', label: 'Reviews', value: props.github.totalPullRequestReviewContributions, color: colors.value.reviews }
        ].filter(d => d.value > 0)

        const root = d3.select(svg.value)
        root.attr('viewBox', `0 0 ${size} ${size}`)

        const g = root
            .selectAll<SVGGElement, null>('g.chart')
            .data([null])
            .join('g')
            .attr('class', 'chart')
            .attr('transform', `translate(${size / 2}, ${size / 2})`)

        const pie = d3.pie<any>().value(d => d.value)
        const arc = d3.arc<any>()
            .innerRadius(radius * 0.55)
            .outerRadius(radius)

        const arcHover = d3.arc<any>()
            .innerRadius(radius * 0.55)
            .outerRadius(radius * 1.05)

        if (!tooltip) {
            tooltip = d3
            .select(container.value)
            .append('div')
            .style('position', 'absolute')
            .style('background', 'rgba(0,0,0,0.85)')
            .style('color', '#fff')
            .style('padding', '8px 12px')
            .style('border-radius', '8px')
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('transform', 'translate(-50%, -120%)')
        }

        const arcs = g
            .selectAll<SVGPathElement, any>('path.arc')
            .data(pie(chartData), d => d.data.key)
            .join(
            enter => {
                const path = enter
                .append('path')
                .attr('class', 'arc')
                .attr('fill', d => d.data.color)
                .attr('stroke-width', 2)
                .each(function () {
                    ;(this as any)._current = { startAngle: 0, endAngle: 0 }
                })

                if (shouldAnimate) {
                path
                    .transition()
                    .duration(900)
                    .ease(d3.easeCubicOut)
                    .attrTween('d', function (d) {
                    const i = d3.interpolate((this as any)._current, d);
                    (this as any)._current = i(1)
                    return t => arc(i(t))!
                    })
                } else {
                    path.attr('d', arc)
                }

                return path
            },
                update => update.attr('d', arc),
                exit => exit.remove()
            )

        arcs
            .on('mouseenter', function (event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('d', arcHover(d))

            const percent = ((d.data.value / props.github!.totalCommitContributions) * 100).toFixed(1)

            tooltip!
                .html(`<strong>${d.data.label}</strong><br>${d.data.value} (${percent}%)`)
                .style('opacity', 1)
            })
            .on('mousemove', event => {
                const [x, y] = d3.pointer(event, container.value!)
                tooltip!.style('left', `${x}px`).style('top', `${y}px`)
            })
            .on('mouseleave', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('d', arc(d))
                tooltip!.style('opacity', 0)
            })

            if (shouldAnimate) {
                hasAnimated.value = true
            }
    }

    onMounted(async () => {
        await nextTick()
        draw()

        resizeObserver = new ResizeObserver(draw)
            if (container.value) resizeObserver.observe(container.value)
    })

    onBeforeUnmount(() => {
        resizeObserver?.disconnect()
    })

    watch(() => props.github, async val => {
        if (!val) return
        await nextTick()
        draw()
    })

    watch(() => colorMode.value, draw)

    const items = computed(() => [
        {
            key: 'commits',
            label: 'Commits',
            value: props.github?.totalCommitContributions ?? 0,
            color: colors.value.commits
        },
        {
            key: 'issues',
            label: 'Issues',
            value: props.github?.totalIssueContributions ?? 0,
            color: colors.value.issues
        },
        {
            key: 'prs',
            label: 'Pull Requests',
            value: props.github?.totalPullRequestContributions ?? 0,
            color: colors.value.prs
        },
        {
            key: 'reviews',
            label: 'Reviews',
            value: props.github?.totalPullRequestReviewContributions ?? 0,
            color: colors.value.reviews
        }
    ])
</script>

<template>
    <UCard>
        <div class="text-muted dark:text-zinc-400">Activty Overview</div>
        <div class="flex flex-col items-center gap-8 xl:flex-row">
            <div class="lg:py-8 sm:py-2">
                <div ref="container" class="relative w-full aspect-square max-w-45 sm:max-w-50 lg:max-w-56 mx-auto">
                    <svg ref="svg" class="h-full w-full"></svg>
                </div>
            </div>

            <div class="flex items-start gap-4 md:flex-row xl:flex-col sm:flex-col">
                <div
                    v-for="item in items"
                    :key="item.key"
                    class="flex items-start gap-2.5"
                >
                    <span
                        class="mt-1.5 h-2 w-2 rounded-full"
                        :style="{ backgroundColor: item.color }">
                    </span>

                    <div>
                        <h5 class="text-sm text-zinc-500 dark:text-zinc-100">
                        {{ item.label }}
                        </h5>
                        <div :style="{ color: item.color }">
                        {{ item.value }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>