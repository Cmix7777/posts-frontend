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
  @include all-flex-center;
  min-height: 90vh;
  text-align: center;
}

.title {
  margin-bottom: 2rem;
  @include adap-font(1.5rem, 2.5rem);
}

.post-link {
  @include post-card(white, true);
  @include text;
  padding: 1rem 2rem;
  border: 1px solid #ddd;
  
  &:hover {
    background: #000000;
    border-color: #999;
    box-shadow: 10px rgba(177, 177, 177, 0.1);
    color:white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}
</style>