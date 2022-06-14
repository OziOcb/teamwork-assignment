<template>
  <ul>
    <li v-for="page in numberOfPages" :key="page">
      <button :class="page === currentPage ? 'active' : ''">
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  numberOfPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.active {
  background-color: #ada; // REMOVE_ME: remove when done!
}
</style>
