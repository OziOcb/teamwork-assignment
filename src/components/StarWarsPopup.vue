<template>
  <Transition>
    <div class="popup" v-if="starWarsStore.isPopupOpen">
      <div class="overlay" @click="handleClosePopup" />

      <section class="card">
        <div class="card__button">
          <BaseButton @click="handleClosePopup">
            <IconCross />
          </BaseButton>
        </div>

        <h1 class="card__title">Planet data</h1>

        <div class="card__spinner" v-if="starWarsStore.isFetchingPlanet">
          <LoadingSpinner />
        </div>

        <div v-else>
          <ul class="card__content">
            <li v-for="(value, key) in starWarsStore.planet" :key="key">
              {{ _startCase(key) }}: {{ value }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script setup>
import { useStarWarsStore } from "@/stores/star-wars";
import _startCase from "lodash.startcase";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import BaseButton from "@/components/BaseButton.vue";
import IconCross from "@/components/icons/IconCross.vue";

const starWarsStore = useStarWarsStore();

function handleClosePopup() {
  starWarsStore.isPopupOpen = false;
}
</script>

<style lang="scss" scoped>
@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

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
  text-align: center;
  background-color: $color-body-bg-darker;
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    background-position: 0% 0%;
    background: linear-gradient(
      to right,
      $color-black,
      $color-black,
      $color-secondary,
      $color-accent,
      $color-white,
      $color-accent,
      $color-secondary,
      $color-black,
      $color-black
    );
    background-size: 700% auto;
    animation: gradient 6s linear infinite;
  }

  &__button {
    text-align: right;

    button {
      width: 3.2rem;
      height: 3.2rem;
      padding: 0;
      margin: 1rem;
      border: none;
    }
  }

  &__title {
    font-size: 4rem;
    margin-bottom: 1.6rem;
  }

  &__content {
    padding: 0;
    list-style: none;
    text-align: left;
    max-width: 50%;
    margin: 0 auto;
  }
}

// Transition
.v-enter-active,
.v-leave-active {
  transition: opacity $duration-transition-base ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
