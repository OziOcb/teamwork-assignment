<template>
  <ul class="paginationButtons">
    <li v-for="page in numberOfPages" :key="page">
      <BaseButton
        class="button"
        :class="page === currentPage ? 'button--active' : ''"
        @click="handleButtonClick(page)"
      >
        {{ page }}
      </BaseButton>
    </li>
  </ul>
</template>

<script setup>
import BaseButton from "@/components/BaseButton.vue";

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
  justify-content: center;
  list-style: none;
  padding: 0;
}
.button {
  margin-right: 0.8rem;

  &--active {
    background-color: $color-secondary;
  }
}
</style>
