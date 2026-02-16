<script lang="ts" setup>
    useSeoPage('ProfilePage')
</script>

<template>
    <UDashboardPanel id="profile">
        <template #body>
            <ProfileAbout />
            <ProfileSkills />
            <ProfileCarrers />
            <ProfileEducation />
        </template>
    </UDashboardPanel>
</template>