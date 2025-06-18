<script setup lang="ts">
const refreshEvent = ref()

provide('refresh', {
  refreshPosts: () => refreshEvent.value?.()
})

const triggerRefresh = () => {
  refreshEvent.value = Math.random()
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage @refresh="triggerRefresh" />
  </NuxtLayout>
</template>