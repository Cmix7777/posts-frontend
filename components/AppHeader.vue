<template>
  <header class="header">
    <NuxtLink to="/" class="header__link">На главную</NuxtLink>
    <NuxtLink to="/posts" class="header__link">Посты</NuxtLink>
    <NuxtLink to="/posts/create" class="header__link">Создать пост</NuxtLink>
  </header>
</template>

<style lang="scss">
.header {
  padding: 1rem;
  background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(214, 214, 214, 1) 19%, rgba(0, 0, 0, 1) 61%, rgba(236, 236, 236, 1) 75%, rgba(255, 255, 255, 1) 45%, rgba(0, 0, 0, 1) 83%, rgba(237, 237, 237, 1) 90%, rgba(0, 0, 0, 1) 100%);
  @include flex-center(row, 1rem);
  height: auto;

  &__link {
    @include text;
    margin-right: 1rem;
    color:white;
    
    &--active {
      color: #37a2cd;
    }
    
    &:hover {
      font-size: 110%;
    }
  }
}
</style>