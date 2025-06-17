<script setup>
const { data: posts, pending} = await useAsyncData(
  'homepage-posts', 
  async () => {
    const api = useApi()
    const allPosts = await api.get('/posts')
    return allPosts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
  },
  {
    getCachedData(key) {
      return useNuxtApp().payload.data[key]
    }
  }
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
  <div class="container">
    <h1 class="title">PostVibe</h1>
    
    <div class="posts-preview" v-if="posts && posts.length">
      <h2 class="subtitle">Последние записи</h2>
      
      <div v-if="pending" class="loading-posts">
        <p>Загружаем последние посты...</p>
      </div>
      
      <div v-else class="posts-grid">
        <div 
          v-for="post in posts" 
          :key="post.id" 
          class="post-card"
        >
          <div class="card-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            <p class="post-excerpt">{{ post.body.slice(0, 100) }}...</p>
            <NuxtLink 
              :to="`/posts/${post.id}`" 
              class="read-more"
            >
              Читать далее →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <NuxtLink to="/posts" class="post-link">
      <span>Смотреть все посты</span>
    </NuxtLink>
  </div>
</template>
<style scoped lang="scss">
.loading-posts {
  @include all-flex-center;
  padding: 2rem;
  font-style: italic;
  color: #666;
}
.container {
  @include all-flex-center;
  min-height: 90vh;
  text-align: center;
  flex-direction: column;
  padding: 2rem;
}

.title {
  margin-bottom: 2rem;
  @include adap-font(1.5rem, 2.5rem);
  font-family: "Shadows Into Light", cursive;
  font-weight: 400;
  font-style: normal;

  &:hover{
    color:rgb(0, 37, 67);
    font-size: 50px;
    cursor:default;
  }
}

.subtitle {
  @include adap-font(1.2rem, 1.8rem);
  margin-bottom: 1.5rem;
  color: #333;
}

.posts-preview {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.post-card {
  @include post-card(white, true);
  border: 1px solid #eee;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
}

.card-content {
  padding: 1.5rem;
}

.post-title {
  @include adap-font(1.1rem, 1.3rem);
  margin-bottom: 0.5rem;
  color: #222;
  font-weight: 600;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: block;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.read-more {
  @include text;
  color: #000000;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #474747;
    text-decoration: underline;
  }
}

.post-link {
  @include post-card(white, true);
  @include text;
  padding: 1rem 2rem;
  border: 1px solid #ddd;
  font-size: 28px;
  
  &:hover {
    background: #000;
    border-color: #999;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: white;
  }
}

@include respond(768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .post-card {
    max-width: 100%;
  }
}
</style>