<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'

const route = useRoute()

const { data: post } = useAsyncData(
  `post-${route.params.id}`,
  () => fetch(`http://localhost:3001/posts/${route.params.id}`).then(res => res.json())
)


const { data: comments } = useAsyncData(
  'all-comments',
  () => fetch('http://localhost:3001/comments').then(res => res.json())
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
  <div class="post-detail">
    <div v-if="post" class="post-container">
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.createdAt) }}</span>
        </div>
      </div>
      
      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>
      
      <div v-if="comments" class="comments">
        <template v-if="comments.filter(c => c.postId == post.id).lenght > 0">
          <h1>Комментарии</h1>
          <div class="commentaries">
            <div v-for="comment in comments.filter(c => c.postId == post.id)" key:="comment.id" class="comment-item">
              <div class="comm-header">
                <span>{{ comment.author }}</span>
                <span>{{ formateDate(comment.createAt) }}</span>
              </div>
              <div class="comm-text">{{ comment.text }}</div>
            </div>
          </div>
        </template>
        <div v-else>Пока нет комментариев</div>
      </div>
      <div v-else><p>Загруэаем комментарии...</p></div>
      <div class="post-footer">
        <NuxtLink to="/posts" class="back-link">
          ← Назад к списку
        </NuxtLink>
      </div>
    </div>
    
    <div v-else>
      <p>Загружаем пост...</p>
    </div>
  </div>
</template>

<style lang="scss">
.post-detail {
  @include all-flex-center;
  padding: 2rem 1rem;
  min-height: 80vh;
}

.post-container {
  @include post-card(white, false);
  max-width: 800px;
  width: 100%;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #e0e0e0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
}

.post-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  
  .post-title {
    @include adap-font(1.5rem, 2.2rem);
    margin-bottom: 1rem;
    color: #222;
    line-height: 1.4;
  }
}

.post-meta {
  @include flex-center(row, 1.5rem);
  font-size: 0.95rem;
  color: #777;
  
  .post-id {
    font-weight: 500;
  }
}

.post-content {
  padding: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  
  p {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.post-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.back-link {
  @include text;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  
  &:hover {
    @include text-hover;
  }
}

@include respond(768px) {
  .post-container {
    max-width: 90%;
  }
  
  .post-header,
  .post-content {
    padding: 1.5rem;
  }
}

@include respond(480px) {
  .post-header,
  .post-content {
    padding: 1.25rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>