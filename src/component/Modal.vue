<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const closeModal = () => {
  isOpen.value = false
}
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-opacity-50  flex items-center justify-center z-50 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
        <div @click="closeModal" class="absolute top-6 right-6 w-6 h-6 cursor-pointer text-xl">
          ❌
        </div>

        <h2 v-if="title" class="font-bold text-lg mb-4 text-black">{{ title }}</h2>

        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
