<script setup>
import { useAsyncData } from '#app'

const { data: posts } = useAsyncData(
  'postsList',
  () => fetch('http://localhost:3001/posts').then(res => res.json())
)
</script>

<template>
  <div>
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
  transition: 100ms;

  &:hover{
    color:rgb(255, 255, 255);
    font-size: 1rem;
    background-color: black;
    border-radius: 5px;
    padding: 10px;
    transform: translateY(-5%)
  }
}
.post {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  max-width: 30%;
  margin-left: auto;
  margin-right: auto;
}
.post{
  width:100% ;
}
</style>