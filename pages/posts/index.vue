<script setup>
import { useAsyncData } from '#app'

const { data: posts, pending: postsPending } = useAsyncData(
  'postsList',
  () => $fetch('http://localhost:3001/posts')
)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="posts-page">
    <div class="page-header">
      <h1>Все записи</h1>
      <p>Последние мысли и идеи</p>
    </div>
    
    <div v-if="postsPending" class="loading">
      Загрузка записей...
    </div>
    
    <div v-else class="posts-grid">
      <div 
        v-for="post in posts" 
        :key="post.id" 
        class="post-card"
      >
        <div class="card-content">
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.createdAt) }}</span>
          </div>
          
          <h2 class="post-title">{{ post.title }}</h2>
          
          <p class="post-excerpt">{{ post.body }}</p>
        </div>
        
        <NuxtLink :to="`/posts/${post.id}`" class="read-link">
          Читать дальше
        </NuxtLink>
      </div>
    </div>
    
    <div v-if="!posts && !postsPending" class="no-posts">
      Нет постов для отображения
    </div>
  </div>
</template>
<style scoped lang="scss">
.posts-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  @include all-flex-center;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
  
  h1 {
    @include adap-font(1.8rem, 2.5rem);
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  p {
    @include adap-font(1rem, 1.1rem);
    color: #666;
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
}

.post-card {
  @include post-card(white, true);
  @include column-center;
  overflow: hidden;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #e0e0e0;
  }
}

.card-content {
  padding: 1.5rem;
  width: 100%;
  flex-grow: 1;
}

.post-meta {
  @include flex-center(row, 1rem);
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.post-date {
  color: #777;
}

.post-id {
  color: #999;
  font-weight: 500;
}

.post-title {
  @include adap-font(1.1rem, 1.3rem);
  margin-bottom: 1rem;
  color: #222;
  font-weight: 600;
  line-height: 1.4;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  @include text-ellipsis(3);
}

.read-link {
  @include text;
  display: block;
  padding: 1rem 1.5rem;
  background: #f8f8f8;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s ease;
  border-top: 1px solid #eee;
  width: 100%;
  
  &:hover {
    @include text-hover;
    background: #000;
  }
}

.loading {
  @include all-flex-center;
  padding: 3rem;
  color: #777;
}

@include respond(768px) {
  .posts-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
}

@include respond(480px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .post-card {
    max-width: 100%;
  }
}
</style>