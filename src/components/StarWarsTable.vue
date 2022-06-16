<template>
  <BaseInput
    v-model:filterBy="filterBy"
    label="filterBy"
    :disabled="starWarsStore.isFetchingPeople"
  />

  <LoadingSpinner v-if="starWarsStore.isFetchingPeople" />

  <table v-else class="table">
    <thead class="table__head">
      <tr>
        <th
          class="table__header"
          v-for="column in personData"
          :key="column"
          @click="handleSort(column)"
        >
          {{ _startCase(column) }}
        </th>

        <th class="table__header" @click="handleSort('planetName')">
          Planet Name
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="person in sortedPeople" :key="person.url">
        <td v-for="(data, index) in personData" :key="index">
          {{ person[data] }}
        </td>

        <td>
          <button @click="handleOpenPopup(person.planetUrl)">
            {{ person.planetName }}
          </button>
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
import debouncedRef from "@/utilities/debouncedRef";
import _startCase from "lodash.startcase";
import BaseInput from "@/components/BaseInput.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import PaginationButtons from "@/components/PaginationButtons.vue";

const starWarsStore = useStarWarsStore();

onMounted(() => {
  starWarsStore.fetchPeople(1);
});

// Table - start;
const personData = ref(["name", "height", "mass", "created", "edited"]);

function handleOpenPopup(url) {
  starWarsStore.isPopupOpen = true;
  starWarsStore.fetchPlanet(url);
}
// Table - end

// FilterBy - start
const filterBy = debouncedRef("", 300);

watch(filterBy, (newValue) => {
  starWarsStore.currentPage = 1;

  !newValue
    ? starWarsStore.fetchPeople(1)
    : starWarsStore.fetchFilteredPeople(newValue);
});
// FilterBy - end

// Sort - start
let currentSort = ref("name");
let currentSortDir = ref("asc");

// FIXME: There's a bug when a value for Height and Mass is "unknown". Try to fix it or consider using 3rd party plugin
const sortedPeople = computed(() => {
  const sortBy = currentSort.value;
  let modifier = currentSortDir.value === "desc" ? -1 : 1;

  return [...starWarsStore.people].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1 * modifier;
    if (a[sortBy] > b[sortBy]) return 1 * modifier;
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
  starWarsStore.currentPage = page;

  !filterBy.value
    ? starWarsStore.fetchPeople(page)
    : starWarsStore.fetchFilteredPeople(filterBy.value, page);
}
// Pagination - end
</script>
