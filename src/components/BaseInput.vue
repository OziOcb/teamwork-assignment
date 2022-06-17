<template>
  <div class="input">
    <label class="input__label sr-only" :for="label">{{ label }}</label>

    <input
      class="input__input"
      :type="type"
      :name="label"
      :disabled="disabled"
      :value="filterBy"
      :placeholder="label"
      @input="handleInputChange"
    />

    <button
      class="input__close-button"
      v-if="!!filterBy"
      @click="handleInputClear"
    >
      <IconCross />
    </button>
  </div>
</template>

<script setup>
import IconCross from "@/components/icons/IconCross.vue";

defineProps({
  filterBy: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:filterBy"]);

function handleInputChange($event) {
  emit("update:filterBy", $event.target.value);
}

function handleInputClear() {
  emit("update:filterBy", "");
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

.input {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  border-radius: 0.3rem;
  padding: 1.4rem 2rem 1.6rem;
  background: $color-body-bg-darker;
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

  &__input {
    border-style: none;
    background: transparent;
    outline: none;
    flex-grow: 1;
    color: $color-text-primary;
    font-size: 1.8rem;
    line-height: 2.4rem;
    vertical-align: middle;
    &::-webkit-input-placeholder {
      color: $color-text-primary;
    }
  }

  &__close-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 4rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
