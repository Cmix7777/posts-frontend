<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'

const route = useRoute()

// Получение данных о посте по ID
const { data: post } = useAsyncData(
  () => `http://localhost:3001/posts/${route.params.id}`,
  () => fetch(`http://localhost:3001/posts/${route.params.id}`).then(res => res.json())
)
</script>

<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <NuxtLink to="/posts">Назад к списку</NuxtLink>
  </div>
</template>