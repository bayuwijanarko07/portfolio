import { useSidebarState } from '@/composables/useSidebarState'

let initialized = false 

export const useSidebar = () => {
  const state = useSidebarState()

  const handleResize = () => {
    if (!import.meta.client) return

    const mobile = window.innerWidth < 1220
    state.isMobile.value = mobile

    if (!mobile) {
      state.isMobileOpen.value = false
    }
  }

  const init = () => {
    if (initialized || !import.meta.client) return
    initialized = true

    handleResize()
    window.addEventListener('resize', handleResize)
  }

  onMounted(init)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  const toggleSidebar = () => {
    if (state.isMobile.value) {
      state.isMobileOpen.value = !state.isMobileOpen.value
    } else {
      state.isExpanded.value = !state.isExpanded.value
    }
  }

  const toggleMobileSidebar = () => {
     state.isMobileOpen.value = !state.isMobileOpen.value
  }

  return {
    ...state,
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered: (v: boolean) => (state.isHovered.value = v),
    setActiveItem: (v: string | null) => (state.activeItem.value = v),
  }
}