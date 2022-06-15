<template>
  <!-- TODO: ENDED HERE! Extract this to a separate component-->
  <div>
    <label for="filter">filter</label>
    <input
      type="text"
      name="filter"
      v-model="filter"
      :disabled="starWarsStore.isFetchingPeople"
    />
  </div>

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

const starWarsStore = useStarWarsStore();

onMounted(() => {
  starWarsStore.fetchPeople(1);
});

let currentSort = ref("name");
let currentSortDir = ref("asc");
const filter = useDebouncedRef("", 300);
const personData = ref([
  "name",
  "height",
  "mass",
  "created",
  "edited",
  "homeworld",
]);

watch(filter, (newValue) => {
  starWarsStore.setCurrentPage(1);

  !newValue
    ? starWarsStore.fetchPeople(1)
    : starWarsStore.fetchFilteredPeople(newValue);
});

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

function formatColumnTitle(text) {
  if (text === "homeworld") return "Planet Name";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function handleChangePage(page) {
  starWarsStore.setCurrentPage(page);

  !filter.value
    ? starWarsStore.fetchPeople(page)
    : starWarsStore.fetchFilteredPeople(filter.value, page);
}
</script>
