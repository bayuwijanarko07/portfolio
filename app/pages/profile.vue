<script lang="ts" setup>
</script>

<template>
    <UDashboardPanel id="profile">
        <template #header>
            <UDashboardNavbar title="Profile" :ui="{ right: 'gap-3' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <ProfileAbout />
            <ProfileSkills />
            <ProfileCarrers />
            <ProfileEducation />
        </template>
    </UDashboardPanel>
</template>