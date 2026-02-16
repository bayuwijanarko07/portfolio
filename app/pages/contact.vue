<script lang="ts" setup>
    useSeoPage('ContactPage')
</script>

<template>
    <UDashboardPanel id="contact">
        <template #body>
            <ContactForms />
            <ContactSocmed />
        </template>
    </UDashboardPanel>
</template>