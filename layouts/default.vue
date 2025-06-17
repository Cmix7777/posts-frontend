<template>
  <div>
    <AppHeader />
    <slot /> 
    <AppFooter v-if="!hideFooter" />
  </div>
</template>

<script setup>
defineProps({
  hideFooter: Boolean    
})
</script>