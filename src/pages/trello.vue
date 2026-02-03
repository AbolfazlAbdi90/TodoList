<script setup>
import { onMounted, ref } from 'vue'
import taskForm from '@/component/taskForm.vue'
import TodoBoard from '@/component/todoBord.vue'
import { saveToLocalStorage, loadFromLocalStorage } from '@/modules/localStorageUtils'
const STORAGE_KEY = 'vue_custom_list'

const Task = ref([])

function convertToCSV(data) {
  if (!data || data.length === 0) return ''

  const headers = Object.keys(data[0])
  const rows = data.map((row) => headers.map((h) => row[h] ?? '').join(','))

  return [headers.join(','), ...rows].join('\n')
}

function DownLoadToCsv() {
  if (Task.value.length === 0) {
    alert('لیست شما خالی هست')
    return
  }

  const csv = convertToCSV(Task.value)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'todo-data.csv'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

function saveLocal() {
  saveToLocalStorage(STORAGE_KEY, Task.value)
}

function loadFromLocal() {
  const data = loadFromLocalStorage(STORAGE_KEY)
  if (data) {
    Task.value = data
  }
}

const addTask = (task) => {
  Task.value.push({
    ...task,
    status: 'todo',
  })
  saveLocal()
}

const Delete = (id) => {
  Task.value = Task.value.filter((item) => item.id !== id)
  saveLocal()
}

const ReturnToTodo = (id) => {
  const item = Task.value.find((t) => t.id === id)
  if (item) item.status = 'todo'
  saveLocal()
}

const moveToInProgress = (id) => {
  const item = Task.value.find((t) => t.id === id)
  if (item) item.status = 'inprogress'
  saveLocal()
}

const moveToDone = (id) => {
  const item = Task.value.find((t) => t.id === id)
  if (item) item.status = 'done'
  saveLocal()
}

onMounted(loadFromLocal)
</script>

<template>
  <taskForm @add-task="addTask" />

  <div class="flex items-center justify-center mt-10 mb-10">
    <button
      class="bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl text-2xl font-extrabold p-4 text-white cursor-pointer"
      @click="DownLoadToCsv"
    >
      DownLoad List
    </button>
  </div>

  <TodoBoard
    :User="Task"
    @move-inpro="moveToInProgress"
    @move-done="moveToDone"
    @deleto="Delete"
    @ReturnToTodo="ReturnToTodo"
  />
</template>
