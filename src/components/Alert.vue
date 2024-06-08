<template>
    <div class="alert" :class="type" v-if="visible">
      <span>{{ message }}</span>
      <button class="close-btn" @click="closeAlert">X</button>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  
  const props = defineProps({
    message: String,
    type: {
      type: String,
      default: 'error',
    },
    duration: {
      type: Number,
      default: 1500,
    },
  });
  
  const visible = ref(false);
  
  watchEffect(() => {
    if (props.message) {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    }
  });
  
  const closeAlert = () => {
    visible.value = false;
  };
  </script>
  
  <style scoped>
  .alert {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px 0;
    width: 90%;
    max-width: 500px;
    z-index: 1000;
  }
  
  .alert.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
  .alert.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.2rem;
    cursor: pointer;
  }
  </style>