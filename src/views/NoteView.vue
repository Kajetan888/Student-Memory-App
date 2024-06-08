<template>
  <div class="single-note">
    <div class="note-container" v-if="note">
      <img :src="note.thumbnail" alt="Thumbnail" v-if="note.thumbnail" class="thumbnail" />
      <h2>{{ note.title }}</h2>
      <p class="description">{{ note.description }}</p>
      <p class="priority">Priority: <span :class="note.priority">{{ note.priority }}</span></p>
      <div class="content">{{ note.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/user';

const route = useRoute();
const note = ref(null);
const userStore = useUserStore();

const fetchNote = () => {
  const storedTodos = userStore.todos;
  note.value = storedTodos.find(todo => todo.id === route.params.id);
};

onMounted(fetchNote);
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.single-note {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #1c1c1c;
  padding: 2rem;
}

.note-container {
  background-color: #333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 1rem;
  color: hsla(160, 100%, 37%, 1);
}

.description {
  margin-bottom: 1rem;
  color: #fff;
}

.priority {
  color: #fff;
}

.priority span.low {
  color: green;
}

.priority span.medium {
  color: orange;
}

.priority span.high {
  color: red;
}

.content {
  margin-top: 1rem;
  color: #ddd;
  text-align: left;
}
</style>