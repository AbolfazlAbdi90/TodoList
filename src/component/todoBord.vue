<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  User: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['move-inpro', 'move-done', 'deleto', 'ReturnToTodo'])

const dragTask = ref(null)
function Dragstart(id) {
  dragTask.value = id
}
function DragDrop(event) {
  event.preventDefault()
}

function onDrop(newState) {
  if (dragTask.value !== null) {
    if (newState === 'todo') emit('ReturnToTodo', dragTask.value)
    else if (newState === 'inprogress') emit('move-inpro', dragTask.value)
    else if (newState === 'done') emit('move-done', dragTask.value)
  }
}

const todoTask = computed(() => props.User.filter(({ status }) => status === 'todo'))
const inprogress = computed(() => props.User.filter(({ status }) => status === 'inprogress'))
const Done = computed(() => props.User.filter(({ status }) => status === 'done'))
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 min-h-screen">
    <!-- TODO -->
    <section
      @dragover="DragDrop"
      @drop="() => onDrop('todo')"
      class="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-blue-500"
    >
      <h2 class="font-bold mb-4 text-blue-600 text-lg">📝 Todo</h2>

      <div
        v-for="task in todoTask"
        :key="task.id"
        class="bg-blue-50 p-4 rounded-xl mb-4 shadow-sm hover:shadow-md transition cursor-move"
        draggable="true"
        @dragstart="() => Dragstart(task.id)"
      >
        <h3 class="font-semibold mb-1 text-gray-800">{{ task.title }}</h3>
        <p class="text-sm text-gray-600 mb-3">{{ task.des }}</p>

        <button
          class="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 rounded-lg transition mb-2"
          @click="emit('move-inpro', task.id)"
        >
          Move →
        </button>

        <button
          @click="emit('deleto', task.id)"
          class="w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </section>

    <!-- IN PROGRESS -->
    <section
      @dragover="DragDrop"
      @drop="() => onDrop('inprogress')"
      class="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-yellow-500"
    >
      <h2 class="font-bold mb-4 text-yellow-600 text-lg">⏳ In Progress</h2>

      <div
        v-for="task in inprogress"
        :key="task.id"
        class="bg-yellow-50 p-4 rounded-xl mb-4 shadow-sm hover:shadow-md transition cursor-move"
        draggable="true"
        @dragstart="() => Dragstart(task.id)"
      >
        <h3 class="font-semibold mb-1 text-gray-800">{{ task.title }}</h3>
        <p class="text-sm text-gray-600 mb-3">{{ task.des }}</p>

        <button
          class="w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 rounded-lg transition mb-2"
          @click="emit('move-done', task.id)"
        >
          Done ✅
        </button>

        <button
          @click="emit('deleto', task.id)"
          class="w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white py-2 rounded-lg transition"
        >
          Delete
        </button>

        <button
          class="w-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer mt-2 text-white py-2 rounded-lg transition"
          @click="emit('ReturnToTodo', task.id)"
        >
          Todo
        </button>
      </div>
    </section>

    <!-- DONE -->
    <section
      @dragover="DragDrop"
      @drop="() => onDrop('done')"
      class="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-green-500"
    >
      <h2 class="font-bold mb-4 text-green-600 text-lg">✅ Done</h2>

      <div
        v-for="task in Done"
        :key="task.id"
        class="bg-green-50 p-4 rounded-xl mb-4 shadow-sm opacity-80 cursor-move"
        draggable="true"
        @dragstart="() => Dragstart(task.id)"
      >
        <h2 class="font-semibold text-gray-700 line-through">{{ task.title }}</h2>
        <p class="text-sm text-gray-500 mb-3 line-through">{{ task.des }}</p>

        <button
          @click="emit('deleto', task.id)"
          class="w-full bg-red-500 cursor-pointer hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Delete
        </button>

        <button
          class="bg-yellow-500 text-white p-2 cursor-pointer rounded-2xl w-full mt-2"
          @click="emit('move-inpro', task.id)"
        >
          Inprogress
        </button>
      </div>
    </section>
  </div>
</template>
