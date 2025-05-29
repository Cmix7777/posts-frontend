<template>
  <div class="container">
    <h1 class="title">Главная страница</h1>
    <NuxtLink to="/posts" class="post-link">
      <span>Смотреть все посты</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  text-align: center;
}

.title {
  margin-bottom: 2rem;
}

.post-link {
  display: inline-block;
  padding: 1rem 2rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.4s ease;
  
  &:hover {
    background: #000000;
    border-color: #999;
    box-shadow: 10px rgba(177, 177, 177, 0.1);
    color:white;
  }
}
</style>