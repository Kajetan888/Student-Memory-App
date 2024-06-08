<template>
    <div class="signup">
      <Alert v-if="userStore.alert.message" :message="userStore.alert.message" :type="userStore.alert.type" />
      <div class="signup-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="signup">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';
  import Alert from '../components/Alert.vue';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const userStore = useUserStore();
  
  const signup = async () => {
    try {
      await userStore.signUp(email.value, password.value);
      if (userStore.user) {
        router.push('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  </script>
  
  

  <style scoped>
  .signup {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 12em;
  }
  
  .signup-container {
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  h2 {
    margin-bottom: 1.5rem;
    color: #fff;
    text-align: center;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .signup-button {
    width: 100%;
    padding: 0.75rem;
    background-color: hsla(160, 100%, 37%, 1);
    color: black;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  </style>
  