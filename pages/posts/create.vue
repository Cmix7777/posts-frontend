<script setup>
import { ref } from 'vue'

const title = ref('')
const body = ref('')
const error = ref('')
const loading = ref(false)

const createPost = async () => {
  if (!title.value.trim() || !body.value.trim()) {
    error.value = "Заголовок и текст поста обязательны для заполнения"
    return
  }
  
  loading.value = true
  error.value = ""
  
  try {
    const newPost = await $fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        createdAt: new Date().toISOString()
      })
    })
    
    console.log('Создан новый пост: ', newPost)
    await navigateTo(`/posts/${newPost.id}`)
  } catch (err) {
    error.value = `Ошибка: ${err.message}`
    console.error('Ошибка при создании поста: ', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="create-page">
    <div class="create-container">
      <h1 class="create-title">Создать новый пост</h1>
      
      <form @submit.prevent="createPost" class="create-form">
        <div class="form-group">
          <input 
            type="text" 
            v-model="title" 
            placeholder="Заголовок поста"
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <textarea 
            v-model="body" 
            placeholder="Содержание поста"
            class="form-textarea"
            rows="6"
          ></textarea>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" class="submit-button" :disabled="loading">
          <span v-if="loading">Создание...</span>
          <span v-else>Опубликовать пост</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-page {
  @include all-flex-center;
  min-height: 80vh;
  padding: 2rem 1rem;
}

.create-container {
  @include post-card(white, true);
  width: 100%;
  max-width: 800px;
  border: 1px solid #eee;
  padding: 2rem;
}

.create-title {
  @include adap-font(1.5rem, 2rem);
  text-align: center;
  margin-bottom: 2rem;
  color: #222;
  font-weight: 600;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
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
}

.submit-button {
  @include text;
  padding: 1rem 2rem;
  background: white;
  color: black;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover:not(:disabled) {
    @include text-hover;
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    color: #666;
  }
}

@include respond(768px) {
  .create-container {
    width: 90%;
    padding: 1.5rem;
  }
}

@include respond(480px) {
  .create-container {
    padding: 1.25rem;
  }
  
  .create-title {
    font-size: 1.8rem;
  }
  
  .submit-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>