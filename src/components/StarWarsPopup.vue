<template>
  <div class="popup" v-if="starWarsStore.isPopupOpen">
    <div class="overlay" @click="handleClosePopup" />

    <section class="card">
      <button @click="handleClosePopup">x</button>

      <h1>Planet data</h1>

      <LoadingSpinner v-if="starWarsStore.isFetchingPlanet" />

      <div v-else>
        <ul>
          <li v-for="(value, key) in starWarsStore.planet" :key="key">
            {{ _startCase(key) }}: {{ value }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useStarWarsStore } from "@/stores/star-wars";
import _startCase from "lodash.startcase";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const starWarsStore = useStarWarsStore();

function handleClosePopup() {
  starWarsStore.isPopupOpen = false;
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: $layer-popover-z-index;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.card {
  width: 100%;
  max-width: 40rem;
  min-height: 30rem;
  border-radius: 0.8rem;
  margin-top: 10rem;
  margin-left: 1.6rem;
  margin-right: 1.6rem;
  background-color: $color-body-bg-darker;
}
</style>
