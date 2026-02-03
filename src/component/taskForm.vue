<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits(['add-task'])

const title = ref('')
const description = ref('')
const errors = reactive<{ title?: string; des?: string }>({})

const isValid = (str: string) => /^[a-zA-Z\s]+$/.test(str)

const submit = () => {
  errors.title = !title.value
    ? 'Title is empty'
    : !isValid(title.value)
    ? 'Only English letters'
    : ''

  errors.des = !description.value
    ? 'Description is empty'
    : !isValid(description.value)
    ? 'Only English letters'
    : ''

  if (!errors.title && !errors.des) {
    emit('add-task', {
      id: Date.now(),
      title: title.value,
      des: description.value,
    })

    title.value = ''
    description.value = ''
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="title" placeholder="Title" class="w-full border p-2 rounded" />
      <span class="text-red-500 text-sm">{{ errors.title }}</span>

      <input v-model="description" placeholder="Description" class="w-full border p-2 rounded" />
      <span class="text-red-500 text-sm">{{ errors.des }}</span>

      <button class="w-full bg-purple-500 text-white py-2 rounded">
        Add Task
      </button>
    </form>
  </div>
</template>
