<script lang="ts" setup>
    import * as d3 from 'd3'
    import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
    import type { WakaHandlerResponse } from '@/types/wakatime'

    type LanguageChartItem = {
        name: string
        value: number
        label: string
    }

    const props = defineProps<{
        wakatime: WakaHandlerResponse | null
    }>()

    const container = ref<HTMLDivElement | null>(null)

    const chartData = computed<LanguageChartItem[]>(() => {
        const languages = props.wakatime?.stats?.languages ?? []

        return languages
            .map(l => ({
                name: l.name,
                value: (Number(l.total_seconds) || 0) / 3600,
                label: l.text ?? '',
            }))
            .filter(d => d.value > 0)
            .sort((a, b) => b.value - a.value)
    })

    let resizeObserver: ResizeObserver | null = null

    const draw = () => {
        if (!container.value || !chartData.value.length) return

        container.value.innerHTML = ''

        const margin = { top: 20, right: 20, bottom: 20, left: 50 }
        const containerWidth = container.value.clientWidth
        const width = containerWidth - margin.left - margin.right
        const height = 320

        const svg = d3
            .select(container.value)
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', height + margin.top + margin.bottom)

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        const names = chartData.value.map(d => d.name)

        const xBand = d3
            .scaleBand()
            .domain(names)
            .range([0, width])
            .padding(0.4)

        const xLinear = d3
            .scaleLinear()
            .domain([0, names.length])
            .range([0, width])

        const maxValue = d3.max(chartData.value, d => d.value) || 0
        
        const y = d3
            .scaleLinear()
            .domain([0, maxValue])
            .nice()
            .range([height, 0])

        const xAxis = g.append('g').attr('transform', `translate(0, ${height})`)
        const yAxis = g.append('g')

        xAxis.call(d3.axisBottom(xBand))
        yAxis.call(d3.axisLeft(y).ticks(5))

        const tooltip = d3
            .select(container.value)
            .append('div')
            .style('position', 'absolute')
            .style('background', 'rgba(0,0,0,0.8)')
            .style('color', '#fff')
            .style('padding', '6px 10px')
            .style('border-radius', '6px')
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('opacity', 0)

        const bars = g
            .append('g')
            .selectAll('rect')
            .data(chartData.value)
            .enter()
            .append('rect')
            .attr('x', d => xBand(d.name)!)
            .attr('width', xBand.bandwidth())
            .attr('y', d => y(d.value))
            .attr('height', d => height - y(d.value))
            .attr('fill', '#50A2FF')
            .style('cursor', 'pointer')
            .on('mouseenter', (event, d) => {
            d3.select(event.currentTarget)
                .transition()
                .duration(150)
                .attr('fill', '#2563eb')

            tooltip
                .style('opacity', 1)
                .html(`<b>${d.name}</b><br/>${d.label}`)
            })
            .on('mousemove', event => {
            tooltip
                .style('left', event.offsetX + 12 + 'px')
                .style('top', event.offsetY - 10 + 'px')
            })
            .on('mouseleave', event => {
            d3.select(event.currentTarget)
                .transition()
                .duration(150)
                .attr('fill', '#3b82f6')

            tooltip.style('opacity', 0)
            })

        bars
            .attr('y', d => y(d.value))
            .attr('height', d => height - y(d.value))

        const update = (transform: d3.ZoomTransform) => {
            const zx = transform.rescaleX(xLinear)
            const domain = zx.domain()
            const d0 = domain[0] ?? 0
            const d1 = domain[1] ?? names.length
            const start = Math.max(0, Math.floor(d0))
            const end = Math.min(names.length, Math.ceil(d1))

            const visibleNames = names.slice(start, end)

            const xZoomBand = d3
            .scaleBand()
            .domain(visibleNames)
            .range([0, width])
            .padding(0.2)

            const tZoom = d3.transition().duration(500).ease(d3.easeCubicOut)

            bars
            .transition(tZoom)
            .attr('x', d => xZoomBand(d.name) ?? -9999)
            .attr('width', xZoomBand.bandwidth())

            xAxis
            .transition(tZoom)
            .call(d3.axisBottom(xZoomBand))

            yAxis
            .transition(tZoom)
            .call(d3.axisLeft(y).ticks(5))
        }

        update(d3.zoomIdentity)

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([1, 8])
            .translateExtent([
            [0, 0],
            [width, height],
            ])
            .on('zoom', event => update(event.transform))

        svg.call(zoom as any)
    }

    onMounted(() => {
        draw()
        resizeObserver = new ResizeObserver(() => draw())
        if (container.value) resizeObserver.observe(container.value)
    })

    onBeforeUnmount(() => {
        resizeObserver?.disconnect()
    })

    watch(chartData, draw, { deep: true })
</script>

<template>
  <UCard>
    <div class="text-muted dark:text-zinc-400">Activty Overview</div>
    <div ref="container" class="relative w-full overflow-hidden"></div>
  </UCard>
</template>