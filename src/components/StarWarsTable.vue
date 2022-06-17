<template>
  <BaseInput
    v-model:filterBy="filterBy"
    label="filterBy"
    :disabled="starWarsStore.isFetchingPeople"
  />

  <div v-if="starWarsStore.isFetchingPeople" class="loading-spinner">
    <LoadingSpinner />
  </div>

  <section v-else class="table">
    <table class="table__inner">
      <thead class="table__head">
        <tr>
          <th
            class="table__header"
            :class="column === 'name' ? 'table__header--name' : ''"
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
        <tr class="table__row" v-for="person in sortedPeople" :key="person.url">
          <td v-for="(data, index) in personData" :key="index">
            {{ person[data] }}
          </td>
          <td>
            <BaseButton
              class="table__button"
              @click="handleOpenPopup(person.planetUrl)"
            >
              {{ person.planetName }}
            </BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

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
import BaseButton from "@/components/BaseButton.vue";
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

<style lang="scss" scoped>
.loading-spinner {
  min-height: 41.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table {
  margin-top: 3rem;
  margin-bottom: 3rem;
  overflow-y: scroll;

  &__inner {
    width: 100%;
    min-width: 70rem;
  }

  &__header {
    text-align: left;

    &--name {
      width: 18rem;
    }
  }

  &__button {
    width: 100%;
  }

  &__row:nth-child(odd) {
    background-color: $color-body-bg-darker;
  }
}
</style>
