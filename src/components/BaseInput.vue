<template>
  <div>
    <label :for="label">{{ label }}</label>

    <input
      :type="type"
      :name="label"
      :disabled="disabled"
      :value="filterBy"
      @input="handleInputChange"
    />

    <button v-if="!!filterBy" @click="handleInputClear">x</button>
  </div>
</template>

<script setup>
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
