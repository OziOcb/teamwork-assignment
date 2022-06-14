<template>
  <ul>
    <li v-for="person in starWarsStore.people" :key="person.url">
      {{ person.name }}
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
