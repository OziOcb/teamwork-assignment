<template>
  <div class="popup" v-if="popupStore.isPopupOpen">
    <div class="overlay" @click="handleClickOnOverlay" />

    <section class="card">
      <button @click="handleClickOnOverlay">x</button>

      <h1>{{ popupStore.content.header }}</h1>

      <div v-html="popupStore.content.body" />
    </section>
  </div>
</template>

<script setup>
import { usePopupStore } from "@/stores/the-popup";
const popupStore = usePopupStore();

function handleClickOnOverlay() {
  popupStore.isPopupOpen = false;
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
