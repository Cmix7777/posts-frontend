<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="app-input"
      :class="{ 'error': error }"
    >
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: String,
  error: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.app-input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #333;
  }

  &.error {
    border-color: #ff4444;
  }
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>