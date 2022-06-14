<template>
  <ul class="paginationButtons">
    <li v-for="page in numberOfPages" :key="page">
      <button
        :class="page === currentPage ? 'active' : ''"
        @click="handleButtonClick(page)"
      >
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

const emit = defineEmits(["changePage"]);

function handleButtonClick(page) {
  emit("changePage", page);
}
</script>

<style lang="scss" scoped>
.paginationButtons {
  display: flex;
  list-style: none;
}
.active {
  background-color: #ada; // REMOVE_ME: remove when done!
}
</style>
