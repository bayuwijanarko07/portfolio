<script lang="ts" setup>
  import { menus } from "@/constants/menu";
  import { useSidebar } from "@/composables/useSidebar";
  const { isExpanded, isMobileOpen, isHovered } = useSidebar();
  
</script>

<template>
  <aside
    ref="sidebarEl"
    :class="[
    'fixed flex flex-col mt-0 top-0 px-5 left-0 bg-white dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 h-screen z-50 border-r border-zinc-200',
        {
            'xl:w-70': isExpanded || isMobileOpen,
            'xl:w-25': !isExpanded && !isHovered,
            'translate-x-0 w-70': isMobileOpen,
            '-translate-x-full': !isMobileOpen,
            'xl:translate-x-0': true,
        },
    ]"
  >
    <div
        :class="[
          'py-8 flex',
          !isExpanded && !isHovered ? 'sm:justify-center' : 'justify-center',
        ]"
      >
      <NuxtLink to="/">
        <img
            v-if="isExpanded || isMobileOpen"
            class="dark:hidden"
            src="/images/logo-b.webp"
            alt="Logo"
            width="150"
            height="40"
        />
        <img
            v-if="isExpanded || isMobileOpen"
            class="hidden dark:block"
            src="/images/logo-w.webp"
            alt="Logo"
            width="150"
            height="40"
        />
        <img
            v-else
            src="/images/logo.webp"
            alt="Logo"
            width="30"
            height="30"
        />
      </NuxtLink>
    </div>
    <SidebarMenu :list="menus" />
    <SidebarFooter />
  </aside>
</template>