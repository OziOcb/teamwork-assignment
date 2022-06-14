<template>
  <ul>
    <li v-for="person in starWarsStore.people" :key="person.url">
      {{ person.name }}
    </li>
  </ul>

  <PaginationButtons
    :number-of-pages="starWarsStore.numberOfPages"
    :current-page="starWarsStore.currentPage"
    @changePage="handleChangePage"
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

function handleChangePage(page) {
  starWarsStore.setCurrentPage(page);
  starWarsStore.fetchPeople(page);
}
</script>
