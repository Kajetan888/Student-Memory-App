<template>
  <div class="home">
    <div class="todo-container">
      <h2>To-Do List</h2>
      <section class="quote-section">
        <p>{{ randomQuote }}</p>
      </section>
      <section class="note-form">
        <form @submit.prevent="addTodo">
          <div class="input-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title" required />
          </div>
          <div class="input-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="description"
              required
            ></textarea>
          </div>
          <div class="input-group">
            <label for="priority">Priority</label>
            <select id="priority" v-model="priority" required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="input-group">
            <label for="thumbnail">Thumbnail</label>
            <input type="file" id="thumbnail" @change="handleFileUpload" />
          </div>
          <div class="input-group">
            <label for="content">Content</label>
            <textarea id="content" v-model="content" required></textarea>
          </div>
          <button type="submit" class="add-button">{{ addEditTodoButtonText }}</button>
          <button v-if="visible" @click="resetEdit()" class="cancel-edit-button">Stop Edit Todo</button>
        </form>
      </section>
      <section class="note-list">
        <div v-for="todo in todos" :key="todo.id" class="todo-item">
          <img
            :src="todo.thumbnail"
            alt="Thumbnail"
            v-if="todo.thumbnail"
            class="thumbnail"
          />
          <div class="todo-content">
            <h3>{{ todo.title }}</h3>
            <p>{{ todo.description }}</p>
            <p>
              Priority: <span :class="todo.priority">{{ todo.priority }}</span>
            </p>
            <router-link
              :to="{ name: 'SingleNote', params: { id: todo.id } }"
              class="view-note"
              >View Note</router-link
            >
          </div>
          <button @click="editTodo(todo)" class="edit-button">Edit</button>
          <button @click="deleteTodo(todo.id)" class="delete-button">
            Delete
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";

const quotes = [
  "The secret of getting ahead is getting started. - Mark Twain",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The best way to predict your future is to create it. - Abraham Lincoln",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "The harder you work for something, the greater you'll feel when you achieve it. - Anonymous",
];

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const randomQuote = ref(getRandomQuote());

const title = ref("");
const description = ref("");
const priority = ref("low");
const thumbnail = ref(null);
const content = ref("");
const todos = ref([]);
const userStore = useUserStore();
var currentEditedTodoId = null
var addEditTodoButtonText = "Add To-Do"
var visible = false

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    thumbnail.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const resetEdit = () => {
  title.value = "";
  description.value = "";
  priority.value = "low";
  thumbnail.value = null;
  content.value = "";
  currentEditedTodoId = null
  addEditTodoButtonText = "Add To-Do"
  visible = false
}

const addTodo = () => {
  const newTodo = {
    id: currentEditedTodoId != null ? currentEditedTodoId : Date.now().toString(),
    user_id: userStore.user.id,
    title: title.value,
    description: description.value,
    priority: priority.value,
    thumbnail: thumbnail.value,
    content: content.value,
  };
  if (currentEditedTodoId != null){
    userStore.editTodo(newTodo);
  }
  else {
      userStore.addTodo(newTodo);
      todos.value.push(newTodo);
  }
  resetEdit()
};

const fetchTodos = () => {
  todos.value = userStore.fetchTodos(userStore.user.id);
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  userStore.todos = userStore.todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(userStore.todos));
};

const editTodo = (todo) => {
    addEditTodoButtonText = "Edit Todo"
    visible = true
    title.value = todo.title
    description.value = todo.description
    priority.value = todo.priority
    thumbnail.value = todo.thumbnail
    content.value = todo.content
    currentEditedTodoId = todo.id
};

onMounted(fetchTodos);
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #1c1c1c;
  padding: 2rem 1rem;
}

.todo-container {
  background-color: #333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
}

h2 {
  margin-bottom: 1.5rem;
  color: hsla(160, 100%, 37%, 1);
  text-align: center;
}

.quote-section {
  margin-bottom: 2rem;
  background-color: #555;
  padding: 1rem;
  border-radius: 8px;
  color: #ddd;
  text-align: center;
  font-style: italic;
}

.note-form {
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ddd;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #555;
  color: #fff;
}

button {
  padding: 0.75rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333;
}

.note-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.todo-item {
  background-color: #444;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: calc(50% - 1rem);
  position: relative;
  transition: transform 0.2s;
}

.todo-item:hover {
  transform: translateY(-5px);
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.todo-content {
  flex: 1;
}

.todo-content h3 {
  margin: 0 0 0.5rem 0;
  color: #fff;
  font-size: 18px;
}

.todo-content p {
  margin: 0;
  color: #bbb;
  font-size: 16px;
}

.todo-content p span.low {
  color: green;
  font-size: 16px;
}

.todo-content p span.medium {
  color: orange;
  font-size: 16px;
}

.todo-content p span.high {
  color: red;
  font-size: 16px;
}

.view-note {
  display: inline-block;
  margin-top: 0.5rem;
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
  font-size: 16px;
}

.view-note:hover {
  text-decoration: underline;
}

.delete-button {
  background-color: red;
  margin-top: 1rem;
  position: absolute;
  top: 10px;
  right: 10px;
}

.delete-button:hover {
  background-color: darkred;
}
</style>
