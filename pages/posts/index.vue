<script setup>
const currentPage = ref(1)
const itemsPerPage = ref(6)

const { data: posts, pending } = await useAsyncData(
  'postsList',
  () => {
    const api = useApi()
    return api.get('/posts')
  }
)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const paginatedPosts = computed(() => {
  if (!posts.value) return []
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return posts.value.slice(start, end)
})

const totalPages = computed(() => {
  if (!posts.value) return 0
  return Math.ceil(posts.value.length / itemsPerPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div class="posts-page">
    <div class="page-header">
      <h1>Все записи</h1>
      <p>Последние мысли и идеи</p>
    </div>
    
    <div v-if="pending" class="loading">
      Загрузка записей...
    </div>
    
    <div v-else>
      <div class="posts-grid">
        <div 
          v-for="post in paginatedPosts" 
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
      
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="pagination-button"
        >
          Назад
        </button>
        
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: currentPage === page }"
          class="pagination-button"
        >
          {{ page }}
        </button>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="pagination-button"
        >
          Вперед
        </button>
      </div>
    </div>
    
    <div v-if="!posts?.length && !pending" class="no-posts">
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
  margin-bottom: 3rem;
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

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  min-width: 40px;

  &:hover:not(:disabled) {
    background: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background: #000;
    color: white;
    border-color: #000;
  }
}

@include respond(768px) {
  .posts-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }

  .pagination {
    gap: 0.3rem;
  }

  .pagination-button {
    padding: 0.4rem 0.8rem;
    min-width: 35px;
  }
}

@include respond(480px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .post-card {
    max-width: 100%;
  }

  .pagination {
    gap: 0.2rem;
  }
}
</style>