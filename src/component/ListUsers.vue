<script setup>
import { reactive, onMounted } from 'vue'
import ListItem from '@/component/ListItem.vue'
import FormInput from '@/component/FormInput.vue'

const STORAGE_KEY = 'vue_user_list'
const Users = reactive([])

function convertToCSV(data) {
  if (!data || data.length === 0) return ''
  const H = Object.keys(data[0])
  const R = data.map((row) => H.map((h) => row[h] ?? '').join(','))
  return [H.join(','), ...R].join('\n')
}

function downloadCSV() {
  if (Users.length === 0) {
    alert('لیست خالی است.')
    return
  }
  const url = URL.createObjectURL(new Blob([convertToCSV(Users)], { type: 'text/csv' }))

  const link = document.createElement('a')
  link.href = url
  link.download = 'users_data.csv'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Users))
}

function loadFromLocalStorage() {
  const storedData = localStorage.getItem(STORAGE_KEY)
  if (storedData) {
    const parsedData = JSON.parse(storedData)
    Users.push(...parsedData)
  }
}

function AddUsers(data) {
  const newId = Date.now() + Math.random()
  const newUser = { ...data, id: newId }

  Users.push(newUser)
  saveToLocalStorage()
}

function handleDelete(id) {
  const userIndexToDelete = Users.findIndex((user) => user.id === id)
  if (userIndexToDelete !== -1) {
    Users.splice(userIndexToDelete, 1)
    saveToLocalStorage()
  } else {
    alert('User Not Found, There is a Problem in Delete Function.')
  }
}

function handleEdit(updatedData) {
  const userIndexToEdit = Users.findIndex((user) => user.id === updatedData.id)

  if (userIndexToEdit !== -1) {
    Users[userIndexToEdit] = updatedData
    saveToLocalStorage()
  } else {
    alert('User Not Found, There is a Problem in Edit Function.')
  }
}

onMounted(() => {
  loadFromLocalStorage()
})
</script>

<template>
  <ul>
    <FormInput @addUsers="AddUsers" />
    <div class="flex justify-center">
      <button
        @click="downloadCSV"
        class="bg-linear-to-r mt-10 cursor-pointer from-purple-500 to-pink-500 rounded-2xl text-2xl font-extrabold p-4 text-white"
      >
        Download List
      </button>
    </div>

    <ListItem @Delete="handleDelete" @editUser="handleEdit" :Users="Users" />
  </ul>
</template>
