<template>
    <div class="container mt-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h1 class="text-center mb-4">Socket.IO Chat</h1>
          <ul class="list-group mb-3">
            <li v-for="(msg, index) in messages" :key="index" class="list-group-item">
              {{ msg }}
            </li>
          </ul>
          <form @submit.prevent="handleSubmit" class="d-flex">
            <input
              v-model="input"
              type="text"
              class="form-control me-2"
              placeholder="Type a message..."
              required
            />
            <button type="submit" class="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { io } from 'socket.io-client';
  import Cookies from 'js-cookie';

  export default {
    name: 'ChatForm',
    setup() {
      const SOCKET_URL = 'http://localhost:8000';
      const messages = ref([]);
      const input = ref('');
      let socket;
  
      onMounted(() => {
        const token = Cookies.get('accessToken');  // Replace 'authToken' with the actual cookie name
        socket = io(SOCKET_URL, { 
          transports: ['websocket'],
          auth: {
            token: token,
          }
        });
  
        socket.on('chat message', (msg) => {
          // receive data from socket and push to messages.
          messages.value.push(msg);
        });
      });
  
      onUnmounted(() => {
        if (socket) {
          socket.disconnect();
        }
      });
  
      const handleSubmit = () => {
        if (input.value.trim()) {
          socket.emit('chat message', input.value);
          input.value = '';
        }
      };
  
      return { messages, input, handleSubmit };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  