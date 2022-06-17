<template>
  <div class="spinner"></div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: "50px",
  },
});
</script>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  width: v-bind(size);
  height: v-bind(size);
  border: 3px solid rgba($color-tertiary, 0.3);
  border-radius: 50%;
  border-top-color: $color-primary;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
