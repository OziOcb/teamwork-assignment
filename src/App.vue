<template>
  <StarWarsPopup />

  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/assignment">Assignment</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import StarWarsPopup from "@/components/StarWarsPopup.vue";
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

html {
  font-size: 62.5%;
}

body {
  min-height: 100vh;
  color: $color-text-primary;
  background: $color-body-bg;
  transition: color $duration-transition-base * 2,
    background-color $duration-transition-base * 2;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 1.6rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
