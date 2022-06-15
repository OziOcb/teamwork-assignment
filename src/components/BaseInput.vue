<template>
  <div>
    <label :for="label">{{ label }}</label>

    <input
      :type="type"
      :name="label"
      :disabled="disabled"
      :value="filter"
      @input="handleInputChange"
    />

    <button v-if="!!filter" @click="handleInputClear">x</button>
  </div>
</template>

<script setup>
defineProps({
  filter: {
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

const emit = defineEmits(["update:filter"]);

function handleInputChange($event) {
  emit("update:filter", $event.target.value);
}

function handleInputClear() {
  emit("update:filter", "");
}
</script>
