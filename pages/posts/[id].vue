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
  <div v-if="post" class="main">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <NuxtLink to="/posts" class="main__posttext"><span>Назад к списку</span></NuxtLink>
  </div>
  <div v-else><h1>Грузим...</h1></div>
</template>

<style lang="scss">
  .main{
    border: solid 1px rgb(206, 206, 206);
    margin: 1rem;
    max-width: 40%;
    @include all-flex-center;
    border-radius: 5px;

    &__posttext{
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
  }

</style>