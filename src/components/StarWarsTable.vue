<template>
  <BaseInput
    v-model:filterBy="filterBy"
    label="filterBy"
    :disabled="starWarsStore.isFetchingPeople"
  />

  <!-- TODO: ENDED HERE! Create spinner -->
  <div v-if="starWarsStore.isFetchingPeople">spinner</div>

  <table v-else class="table">
    <thead class="table__head">
      <tr>
        <th
          class="table__header"
          v-for="column in personData"
          :key="column"
          @click="handleSort(column)"
        >
          {{ formatColumnTitle(column) }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="person in sortedPeople" :key="person.url">
        <td v-for="(data, index) in personData" :key="index">
          {{ person[data] }}
        </td>
      </tr>
    </tbody>
  </table>

  <PaginationButtons
    :number-of-pages="starWarsStore.numberOfPages"
    :current-page="starWarsStore.currentPage"
    @changePage="handleChangePage"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStarWarsStore } from "@/stores/star-wars";
import { useDebouncedRef } from "@/utilities/debouncedRef";
import PaginationButtons from "@/components/PaginationButtons.vue";
import BaseInput from "@/components/BaseInput.vue";

const starWarsStore = useStarWarsStore();

onMounted(() => {
  starWarsStore.fetchPeople(1);
});

// Table - start
const personData = ref([
  "name",
  "height",
  "mass",
  "created",
  "edited",
  "homeworld",
]);

function formatColumnTitle(text) {
  if (text === "homeworld") return "Planet Name";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
// Table - end

// FilterBy - start
const filterBy = useDebouncedRef("", 300);

watch(filterBy, (newValue) => {
  starWarsStore.setCurrentPage(1);

  !newValue
    ? starWarsStore.fetchPeople(1)
    : starWarsStore.fetchFilteredPeople(newValue);
});
// FilterBy - end

// Sort - start
let currentSort = ref("name");
let currentSortDir = ref("asc");

// FIXME: There's a weird bug when a value for Height and Mass is "unknown". Try to fix it or consider using 3rd party plugin
const sortedPeople = computed(() => {
  const numberTypes = ["height", "mass"];
  const sortBy = currentSort.value;
  let modifier = currentSortDir.value === "desc" ? -1 : 1;

  return [...starWarsStore.people].sort((a, b) => {
    const x = numberTypes.includes(sortBy) ? +a[sortBy] : a[sortBy];
    const y = numberTypes.includes(sortBy) ? +b[sortBy] : b[sortBy];

    if (x < y) return -1 * modifier;
    if (x > y) return 1 * modifier;
    return 0;
  });
});

function handleSort(sortBy) {
  if (sortBy === currentSort.value) {
    currentSortDir.value = currentSortDir.value === "asc" ? "desc" : "asc";
  }
  currentSort.value = sortBy;
}
// Sort - end

// Pagination - start
function handleChangePage(page) {
  starWarsStore.setCurrentPage(page);

  !filterBy.value
    ? starWarsStore.fetchPeople(page)
    : starWarsStore.fetchFilteredPeople(filterBy.value, page);
}
// Pagination - end
</script>
