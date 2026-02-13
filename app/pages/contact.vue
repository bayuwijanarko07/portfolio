<script lang="ts" setup>
   
</script>

<template>
    <UDashboardPanel id="contact">
        <template #header>
            <UDashboardNavbar title="Contact" :ui="{ right: 'gap-3' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

            </UDashboardNavbar>
        </template>

        <template #body>
            <ContactForms />
            <ContactSocmed />
        </template>
    </UDashboardPanel>
</template>