<script setup>
import { useRoute, useRouter } from 'vue-router' 
import { useAsyncData, useLazyAsyncData } from '#app' 

const route = useRoute()
const router = useRouter() 
const postId = route.params.id

const { data: post, pending: postPending } = useAsyncData(
  `post-${postId}`,
  () => $fetch(`http://localhost:3001/posts/${postId}`)
)

const { data: comments, pending: commentsPending } = useLazyAsyncData(
  `comments-${postId}`,
  () => $fetch('http://localhost:3001/comments')
)

const postComments = computed(() => {
  if (!comments.value || !postId) return []
  return comments.value.filter(c => c.postId == postId)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const deletePost = async () => {
  if (!confirm('Вы уверены, что хотите удалить этот пост?')) return
  
  try {
    await $fetch(`http://localhost:3001/posts/${postId}`, {
      method: 'DELETE'
    })
    router.push('/posts')
  } catch (error) {
    console.error('Ошибка при удалении поста:', error)
    alert('Не удалось удалить пост')
  }
}
</script>

<template>
  <div class="post-page">
    <div v-if="postPending" class="loading">
      <p>Загружаем пост...</p>
    </div>
    
    <div v-else-if="post" class="post-container">
      <!-- Заголовок поста -->
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <button @click="deletePost" class="delete-button">
            Удалить пост
          </button>
        <!-- <NuxtLink :to="`/posts/${postId}/edit`" class="edit-button">
        Редактировать
        </NuxtLink> -->
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.createdAt) }}</span>
        </div>
      </div>
      
      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>
      
      <div class="comments-section">
        <h2 class="section-title">Комментарии</h2>
        
        <div v-if="commentsPending" class="loading-comments">
          <p>Загружаем комментарии...</p>
        </div>
        
        <div v-else-if="postComments.length === 0" class="no-comments">
          Пока нет комментариев. Будьте первым!
        </div>
        
        <div v-else class="comments-list">
          <div 
            v-for="comment in postComments" 
            :key="comment.id" 
            class="comment-item"
          >
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <div class="comment-text">{{ comment.text }}</div>
          </div>
        </div>
      </div>
      
      <div class="post-footer">
        <NuxtLink to="/posts" class="back-link">
          ← Назад к списку постов
        </NuxtLink>
      </div>
    </div>
    
    <div v-else class="not-found">
      <h2>Пост не найден</h2>
      <p>Запрошенный пост не существует</p>
      <NuxtLink to="/posts" class="back-link">
        ← Вернуться к списку постов
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-page {
  padding: 2rem 1rem;
  min-height: 80vh;
  @include all-flex-center;
  background: linear-gradient(to bottom, #f5f5f5, #e0e0e0);
}

.loading {
  @include all-flex-center;
  flex-direction: column;
  gap: 1.5rem;
  padding: 4rem;
  
  p {
    @include adap-font(1rem, 1.3rem);
    font-weight: 500;
    color: #444;
    letter-spacing: 0.5px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.post-container {
  @include post-card(#fff, true);
  max-width: 800px;
  width: 100%;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  }
}

.post-header {
  padding: 2.5rem 2.5rem 1.5rem;
  border-bottom: 1px solid #eee;
  background: #fafafa;
  
  .post-title {
    @include adap-font(1.8rem, 2.5rem);
    margin-bottom: 1.2rem;
    color: #111;
    line-height: 1.3;
    font-weight: 700;
    letter-spacing: -0.5px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
}
.post-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.delete-button {
  padding: 0.5rem 1rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #cc0000;
  }
  
  &:active {
    transform: scale(0.98);
  }
}

@include respond(768px) {
  .post-title-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .delete-button {
    margin-top: 0.5rem;
  }
}
.post-meta {
  @include flex-center(row, 1.5rem);
  font-size: 0.95rem;
  color: #666;
  
  .post-date {
    background: #f0f0f0;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-weight: 500;
  }
}

.post-content {
  padding: 2.5rem;
  font-size: 1.15rem;
  line-height: 1.85;
  color: #333;
  
  p {
    margin-bottom: 1.8rem;
    text-align: justify;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.comments-section {
  padding: 0 2.5rem 2rem;
}

.section-title {
  @include adap-font(1.4rem, 1.8rem);
  margin-bottom: 1.8rem;
  color: #222;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: #222;
  }
}

.loading-comments {
  padding: 1.5rem;
  text-align: center;
  
  p {
    @include adap-font(1rem, 1.2rem);
    color: #555;
    font-weight: 500;
  }
}

.no-comments {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 10px;
  text-align: center;
  color: #666;
  border: 2px dashed #ddd;
  font-size: 1.1rem;
  font-weight: 500;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.comment-item {
  @include post-card(#f9f9f9, true);
  padding: 1.8rem;
  border-left: 3px solid #222;
  transform: translateX(0);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.comment-author {
  font-weight: 700;
  color: #111;
  background: #eee;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.95rem;
}

.comment-date {
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.comment-text {
  color: #444;
  line-height: 1.7;
  padding-left: 1rem;
  border-left: 1px solid #ddd;
  margin-left: 0.5rem;
}

.post-footer {
  padding: 2rem;
  border-top: 1px solid #eee;
  background: #fafafa;
  text-align: center;
}

.back-link {
  @include text;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  padding: 0.8rem 1.8rem;
  border: 2px solid #222;
  border-radius: 30px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    @include text-hover;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

.not-found {
  @include post-card(#fff, false);
  max-width: 600px;
  padding: 3rem;
  text-align: center;
  border: 2px solid #eee;
  
  h2 {
    @include adap-font(1.6rem, 2rem);
    color: #222;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
  
  p {
    color: #555;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  .back-link {
    border: none;
    text-decoration: underline;
    padding: 0;
    
    &:hover {
      background: transparent;
      color: #000;
      text-decoration: none;
      transform: none;
      box-shadow: none;
    }
  }
}

@include respond(768px) {
  .post-container {
    max-width: 92%;
  }
  
  .post-header,
  .post-content,
  .comments-section {
    padding: 1.8rem;
  }
  
  .comment-header {
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;
  }
}

@include respond(480px) {
  .post-page {
    padding: 1.5rem 0.8rem;
  }
  
  .post-header,
  .post-content,
  .comments-section {
    padding: 1.5rem;
  }
  
  .section-title::after {
    width: 40px;
  }
  
  .back-link {
    padding: 0.7rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>