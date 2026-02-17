export default defineCachedEventHandler(async () => {
  const [github, wakatime] = await Promise.all([
    $fetch('/api/github', { method: 'POST' }),
    $fetch('/api/wakatime')
  ])

  return {
    github,
    wakatime
  }
}, {
  maxAge: 60 * 10,
})
