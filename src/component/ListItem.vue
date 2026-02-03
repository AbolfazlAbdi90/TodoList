<script setup lang="ts">
import { reactive, ref } from 'vue'
import Modal from './Modal.vue'

interface User {
  id: number | string
  name: string
  Family: string
  score: string
}

const props = defineProps<{
  Users: User[]
}>()

const emit = defineEmits<{
  (e: 'editUser', user: Omit<User, 'id'> & { id: number | string }): void
  (e: 'Delete', userId: number | string): void
}>()

const openEdit = ref(false)
const deleteo = ref(false)
const Name = ref('')
const Family = ref('')
const Score = ref('')
const editingUser = ref<User | null>(null)

const error: Record<string, string> = reactive({})

function isValidName(str: string): boolean {
  return /^[a-zA-Z\s]+$/.test(str)
}

function IsValidScore(str: string): boolean {
  const num = parseFloat(str)
  return !isNaN(num) && num >= 0 && num <= 20
}

function handleEdit() {
  error.name = Name.value.trim()
    ? isValidName(Name.value)
      ? ''
      : 'Name must contain only English letters and spaces'
    : 'Name is empty'

  error.family = Family.value.trim()
    ? isValidName(Family.value)
      ? ''
      : 'Family must contain only English letters and spaces'
    : 'Family is empty'
  error.score = Score.value.trim()
    ? IsValidScore(Score.value)
      ? ''
      : 'Score must be a number between 0 and 20'
    : 'Score is empty'

  if (!error.name && !error.family && !error.score) {
    if (editingUser.value) {
      emit('editUser', {
        id: editingUser.value.id,
        name: Name.value,
        Family: Family.value,
        score: Score.value,
      })
    }
    HnadleClose()
  }
}

function HnadleClose() {
  openEdit.value = false
  Name.value = ''
  Family.value = ''
  Score.value = ''
  editingUser.value = null
}

function OpenEditContainer(user: User) {
  editingUser.value = user
  Name.value = user.name
  Family.value = user.Family
  Score.value = user.score
  openEdit.value = true
}

function OpenDeletContainer(user: User) {
  editingUser.value = user
  deleteo.value = true
}

function HandleDelete() {
  if (editingUser.value) {
    emit('Delete', editingUser.value.id)
  }
  CancleDelete()
}

function CancleDelete() {
  deleteo.value = false
  editingUser.value = null
}
</script>

<template>
  <table
    class="w-full max-w-300 mx-auto mt-24 border border-gray-300 rounded-2xl shadow-2xl border-collapse overflow-hidden"
  >
    <thead
      class="bg-linear-to-r from-purple-600  via-pink-500 to-red-500 text-white font-extrabold uppercase tracking-widest "
    >
      <tr>
        <th class="border border-gray-400 px-4 py-3 `min-w-30` max-w-50">Name</th>
        <th class="border border-gray-400 px-4 py-3 min-w-30 max-w-50">Family</th>
        <th class="border border-gray-400 px-4 py-3 min-w-20 max-w-30">Score</th>
        <th class="border border-gray-400 px-4 py-3 min-w-30 max-w-40"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in Users"
        :key="index"
        class="bg-linear-to-r from-pink-50 to-purple-400 text-gray-900 hover:from-pink-300 hover:to-purple-300 transition-colors duration-500   shadow-md hover:shadow-xl rounded-lg"
      >
        <td
          class="border border-gray-300 px-4 text-center py-3 font-semibold transition-colors duration-300 truncate max-w-50"
          :title="user.name"
        >
          {{ user.name }}
        </td>
        <td
          class="border border-gray-300 text-center px-4 py-3 font-semibold transition-colors duration-300 truncate max-w-50"
          :title="user.Family"
        >
          {{ user.Family }}
        </td>
        <td
          class="border border-gray-300 px-4 py-3 font-semibold text-center transition-colors duration-300 truncate max-w-30"
          :title="user.score"
        >
          {{ user.score }}
        </td>
        <td class="border border-gray-300 px-4 py-3 flex gap-4 justify-center min-w-">
          <button
            class="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-5 py-2 rounded-full shadow-lg transition transform hover:scale-110 hover:shadow-2xl"
            @click="OpenEditContainer(user)"
          >
            Edit
          </button>
          <button
            class="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-5 py-2 rounded-full shadow-lg transition transform hover:scale-110 hover:shadow-2xl"
            @click="OpenDeletContainer(user)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <Modal v-model="openEdit" title="Edit User Details">
    <div class="flex flex-col gap-4">
      <label class="font-bold text-black">Name:</label>
      <input
        class="text-black py-2 px-4 border rounded-2xl"
        type="text"
        placeholder="enter your Name"
        v-model="Name"
      />
      <span class="text-red-500 font-bold ml-5" v-if="error.name">{{ error.name }}</span>

      <label class="font-bold text-black">Family:</label>
      <input
        class="text-black py-2 px-4 border rounded-2xl"
        type="text"
        placeholder="enter your Family"
        v-model="Family"
      />
      <span class="text-red-500 font-bold ml-5" v-if="error.family">{{ error.family }}</span>
      <label class="font-bold text-black">Score:</label>
      <input
        class="text-black py-2 px-4 border rounded-2xl"
        type="text"
        placeholder="enter your Score"
        v-model="Score"
      />
      <span class="text-red-500 font-bold ml-5" v-if="error.score">{{ error.score }}</span>
      <button
        class="bg-blue-900 py-1 px-4 rounded-2xl cursor-pointer text-white mt-2"
        @click="handleEdit"
      >
        done
      </button>
    </div>
  </Modal>

  <Modal v-model="deleteo" title="Confirm Deletion">
    <h1 class="text-black text-xl text-center mb-6">Are you sure You want delete this user?</h1>
    <div class="flex justify-around mt-4">
      <button
        class="bg-red-500 py-2 px-4 rounded-2xl cursor-pointer text-white"
        @click="HandleDelete"
      >
        delete
      </button>
      <button
        class="bg-blue-500 py-2 px-4 rounded-2xl cursor-pointer text-white"
        @click="CancleDelete"
      >
        cancel
      </button>
    </div>
  </Modal>
</template>

<style>
.my-table,
.my-table tr,
.my-table th,
.my-table td {
  border: 1px solid white;
  width: 1200px;
  text-align: center;
  margin-left: 150px;
  margin-top: 100px;
}
</style>
