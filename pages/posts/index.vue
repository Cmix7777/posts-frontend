<script setup>
import { useAsyncData } from '#app'

const { data: posts } = useAsyncData(
  'postsList',
  () => fetch('http://localhost:3001/posts').then(res => res.json())
)
</script>

<template>
  <div>
    <h1>Все посты</h1>
    <div v-if="posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <NuxtLink :to="`/posts/${post.id}`">Подробнее</NuxtLink>
      </div>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<style scoped>
a{
  text-decoration: none;
  color:black;
}
.post {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>