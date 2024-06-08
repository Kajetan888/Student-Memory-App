<template>
  <div>
    <nav class="navbar">
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/signup">Signup</router-link>
      <router-link v-if="isAuthenticated" to="/">Home</router-link>
      <button v-if="isAuthenticated" class="logout-button" @click="logout">Logout</button>
      <button class="copy-database" @click="copyDatabase('users')">Copy Users Database</button>
      <button class="copy-database" @click="copyDatabase('todos')">Copy Todos Database</button>
      <input type="file" id="upload-users" @change="uploadDatabase('users')" style="display: none" />
      <input type="file" id="upload-todos" @change="uploadDatabase('todos')" style="display: none" />
      <label for="upload-users" class="upload-label">Upload Users Database</label>
      <label for="upload-todos" class="upload-label">Upload Todos Database</label>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const router = useRouter();

const isAuthenticated = computed(() => !!userStore.user);

const logout = () => {
  userStore.signOut();
  router.push('/login');
};

const copyDatabase = (type) => {
  const database = userStore.exportDatabase(type);
  navigator.clipboard.writeText(database).then(() => {
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} database copied to clipboard`);
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
};

const uploadDatabase = (type) => (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      userStore.importDatabase(type, data);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} database uploaded successfully`);
    };
    reader.readAsText(file);
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
}

.navbar a,
.logout-button,
.copy-database,
.upload-label {
  color: black;
  text-decoration: none;
  background-color: hsla(160, 100%, 37%, 1);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  display: grid;
  place-items: center;
  font-size: 16px;
  transition: background-color 0.3s;
}

.logout-button {
  background-color: rgb(225, 75, 75);
}

.logout-button:hover {
  background-color: rgb(234, 41, 41) !important;
}

.navbar a:hover,
.logout-button:hover,
.copy-database:hover,
.upload-label:hover {
  background-color: rgb(10, 234, 160);
}

.copy-database {
  position: relative;
}

.upload-label {
  cursor: pointer;
}

.upload-label:hover {
  background-color: #555;
}
</style>
