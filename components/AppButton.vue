<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
    class="app-button"
    :class="[variant, { 'full-width': fullWidth }]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: Boolean,
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  fullWidth: Boolean
})

defineEmits(['click'])
</script>

<style scoped lang="scss">
.app-button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.primary {
    background-color: #333;
    color: white;

    &:hover:not(:disabled) {
      background-color: #000;
    }
  }

  &.secondary {
    background-color: #f0f0f0;
    color: #333;

    &:hover:not(:disabled) {
      background-color: #e0e0e0;
    }
  }

  &.danger {
    background-color: #ff4444;
    color: white;

    &:hover:not(:disabled) {
      background-color: #cc0000;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.full-width {
    width: 100%;
  }
}
</style>