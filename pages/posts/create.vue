<script setup>
const form = ref({
  title: '',
  body: ''
})
const error = ref('')
const isSubmitting = ref(false)

const api = useApi()

const createPost = async () => {
  if (!form.value.title.trim() || !form.value.body.trim()) {
    error.value = "Заголовок и текст поста обязательны для заполнения"
    return
  }
  
  isSubmitting.value = true
  error.value = ""
  
  try {
    const newPost = await api.post('/posts', {
      title: form.value.title,
      body: form.value.body,
      createdAt: new Date().toISOString()
    })
    
    await navigateTo(`/posts/${newPost.id}`)
  } catch (err) {
    error.value = `Ошибка: ${err.message || 'Не удалось создать пост'}`
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="create-page">
    <div class="create-container">
      <h1 class="create-title">Создать новый пост</h1>
      
      <form @submit.prevent="createPost" class="create-form">
        <AppInput
          v-model="form.title"
          placeholder="Заголовок поста"
          label="Заголовок"
          :error="error && !form.title.trim() ? error : ''"
        />
        
        <div class="form-group">
          <label for="body" class="form-label">Содержание</label>
          <textarea
            id="body"
            v-model="form.body"
            placeholder="Содержание поста"
            class="form-textarea"
            rows="6"
          ></textarea>
          <span v-if="error && !form.body.trim()" class="error-message">{{ error }}</span>
        </div>
        
        <AppButton 
          type="submit" 
          :disabled="isSubmitting"
          variant="primary"
          class="submit-button"
          >
          <span v-if="isSubmitting">Создание...</span>
          <span v-else>Опубликовать пост</span>
        </AppButton>
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

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-textarea {
  background: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  
  &:focus {
    border-color: #333;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-button {
  margin-top: 1rem;
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
}
</style>