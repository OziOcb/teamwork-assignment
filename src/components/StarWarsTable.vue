<template>
  <ul>
    <li v-for="person in starWarsStore.people" :key="person.url">
      {{ person.name }}
    </li>
  </ul>

  <ul>
    <li v-for="page in starWarsStore.numberOfPages" :key="page">
      <button>{{ page }}</button>
    </li>
  </ul>
</template>

<script setup>
import { onMounted } from "vue";
import { useStarWarsStore } from "@/stores/star-wars";

const starWarsStore = useStarWarsStore();

onMounted(() => {
  starWarsStore.fetchPeople();
});
</script>
