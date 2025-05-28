<template>
  <div class="container">
    <h1 class="title">Главная страница</h1>
    <NuxtLink to="/posts" class="post-link">
      Смотреть все посты
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
  transition: all 0.3s ease;
  
  &:hover {
    background: #f5f5f5;
    border-color: #999;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}
</style>