<template>
  <ul>
    <li v-for="person in starWarsStore.people" :key="person.url">
      {{ person.name }}
    </li>
  </ul>

  <PaginationButtons
    :number-of-pages="starWarsStore.numberOfPages"
    :current-page="starWarsStore.currentPage"
  />
</template>

<script setup>
import { onMounted } from "vue";
import { useStarWarsStore } from "@/stores/star-wars";
import PaginationButtons from "@/components/PaginationButtons.vue";

const starWarsStore = useStarWarsStore();

onMounted(() => {
  starWarsStore.fetchPeople();
});
</script>
