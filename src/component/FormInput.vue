<script setup lang="ts">
import { reactive, ref } from 'vue'

interface UserData {
  name: string
  Family: string
  score: string
}

const Family = ref<string>('')
const name = ref<string>('')
const score = ref<string>('')

const emit = defineEmits<{
  (e: 'addUsers', userData: UserData): void
}>()

const errors: Record<string, string> = reactive({})

function isValidName(str: string): boolean {
  return /^[a-zA-Z\s]+$/.test(str)
}

function isValidScore(str: string): boolean {
  const num = parseFloat(str)
  return !isNaN(num) && num >= 0 && num <= 20
}

function HandleSubmit() {
  errors.name = name.value
    ? isValidName(name.value)
      ? ''
      : 'Name must contain only English letters and spaces'
    : 'Name is empty'

  errors.Family = Family.value
    ? isValidName(Family.value)
      ? ''
      : 'Family must contain only English letters and spaces'
    : 'Family is empty'

  errors.score = score.value
    ? isValidScore(score.value)
      ? ''
      : 'Score must be a number between 0 and 20'
    : 'Score is empty'

  if (!errors.name && !errors.Family && !errors.score) {
    alert('submitted successfully')
    emit('addUsers', { name: name.value, Family: Family.value, score: score.value })
    name.value = ''
    Family.value = ''
    score.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="HandleSubmit" class=" flex items-center justify-center px-4">
    <div
      class="w-full  bg-white/70  rounded-3xl shadow-2xl p-8"
    >
      <h2
        class="text-3xl font-extrabold text-center mb-10
               bg-linear-to-r from-blue-500 to-purple-500
               bg-clip-text text-transparent"
      >
        Add New User
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Name -->
        <section class="space-y-2">
          <label class="block font-semibold text-gray-700">Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Enter name"
            class="w-full rounded-2xl px-4 py-3 text-center
                   border border-gray-300
                   focus:outline-none focus:ring-4 focus:ring-blue-300
                   transition-all duration-300"
          />
          <span
            v-if="errors.name"
            class="block text-center text-sm font-bold text-red-500"
          >
            {{ errors.name }}
          </span>
        </section>

        <!-- Family -->
        <section class="space-y-2">
          <label class="block font-semibold text-gray-700">Family</label>
          <input
            v-model="Family"
            type="text"
            placeholder="Enter family"
            class="w-full rounded-2xl px-4 py-3 text-center
                   border border-gray-300
                   focus:outline-none focus:ring-4 focus:ring-purple-300
                   transition-all duration-300"
          />
          <span
            v-if="errors.Family"
            class="block text-center text-sm font-bold text-red-500"
          >
            {{ errors.Family }}
          </span>
        </section>

        <!-- Score -->
        <section class="space-y-2">
          <label class="block font-semibold text-gray-700">Score</label>
          <input
            v-model="score"
            type="text"
            placeholder="0 - 20"
            class="w-full rounded-2xl px-4 py-3 text-center
                   border border-gray-300
                   focus:outline-none focus:ring-4 focus:ring-green-300
                   transition-all duration-300"
          />
          <span
            v-if="errors.score"
            class="block text-center text-sm font-bold text-red-500"
          >
            {{ errors.score }}
          </span>
        </section>
      </div>

      <div class="flex justify-center mt-12">
        <button
          type="submit"
          class="group relative overflow-hidden cursor-pointer rounded-2xl
                 bg-linear-to-l from-blue-500 to-purple-600
                 px-12 py-3 font-bold text-white
                 shadow-xl transition-all duration-300
                 hover:scale-105 active:scale-95"
        >
          <span class="relative z-10">Add User</span>
          <span
            class="absolute inset-0 bg-white/20 opacity-0
                   group-hover:opacity-100 transition"
          ></span>
        </button>
      </div>
    </div>
  </form>
</template>


