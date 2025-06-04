<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const postId = route.params.id

const { data: currentPost, pending } = await useAsyncData(
  `edit-post-${postId}`,
  () => $fetch(`http://localhost:3001/posts/${postId}`)
)

const form = ref({
  title: currentPost.value?.title || '',
  body: currentPost.value?.body || ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')

const updatePost = async () => {
  if (!form.value.title.trim() || !form.value.body.trim()) {
    errorMessage.value = "Заголовок и текст поста обязательны"
    return
  }
  
  isSubmitting.value = true
  errorMessage.value = ""
  
  try {
    await $fetch(`http://localhost:3001/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    
    await router.push(`/posts/${postId}`)
  } catch (err) {
    console.error('Ошибка при обновлении поста:', err)
    errorMessage.value = `Ошибка: ${err.message || 'Не удалось обновить пост'}`
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="edit-page">
    <div v-if="pending" class="loading">
      <p>Загрузка данных поста...</p>
    </div>
    
    <div v-else-if="currentPost" class="edit-container">
      <h1 class="edit-title">Редактировать пост</h1>
      
      <form @submit.prevent="updatePost" class="edit-form">
        <div class="form-group">
          <label for="title" class="form-label">Заголовок</label>
          <input 
            type="text" 
            id="title" 
            v-model="form.title" 
            class="form-input"
            placeholder="Введите заголовок"
          >
        </div>
        
        <div class="form-group">
          <label for="body" class="form-label">Содержание</label>
          <textarea 
            id="body" 
            v-model="form.body" 
            class="form-textarea"
            placeholder="Напишите содержание поста"
            rows="8"
          ></textarea>
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div class="form-actions">
          <button 
            type="button" 
            class="cancel-button"
            @click="router.push(`/posts/${postId}`)"
          >
            Отмена
          </button>
          <button 
            type="submit" 
            class="submit-button"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Сохранение...</span>
            <span v-else>Сохранить изменения</span>
          </button>
        </div>
      </form>
    </div>
    
    <div v-else class="not-found">
      <h2>Пост не найден</h2>
      <p>Невозможно редактировать несуществующий пост</p>
      <NuxtLink to="/posts" class="back-link">
        ← Вернуться к списку постов
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.edit-page {
  padding: 2rem 1rem;
  min-height: 80vh;
  @include all-flex-center;
}

.edit-container {
  @include post-card(white, false);
  width: 100%;
  max-width: 800px;
  padding: 2rem;
}

.edit-title {
  @include adap-font(1.5rem, 2rem);
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-input, .form-textarea {
  background: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:focus {
    border-color: #333;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
}

.form-textarea {
  min-height: 200px;
  resize: vertical;
}

.error-message {
  background: #ffeeee;
  padding: 1rem;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  text-align: center;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.submit-button, .cancel-button {
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button {
  @include text;
  background: #222;
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background: #000;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
}

.cancel-button {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  
  &:hover {
    background: #eee;
  }
}

@include respond(768px) {
  .edit-container {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>