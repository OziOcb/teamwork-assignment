<template>
  <button class="button" @click="handleClick">
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);

function handleClick(page) {
  emit("click", page);
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

.button {
  position: relative;
  padding: 0.4em 1em;
  color: $color-text-primary;
  background-color: transparent;
  border: 1px solid $color-white;
  cursor: pointer;
  border-radius: 0.4rem;
  overflow: hidden;
  transition: border-color $duration-transition-base linear;
  &:before {
    content: "";
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
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

  &:hover {
    border-color: transparent;
    &:before {
      display: block;
    }
  }
}
</style>
