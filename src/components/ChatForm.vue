<template>
  <div class="container mt-5">
    <div class="row mb-3">
      <div class="col-md-2">
        <label for="messageInput" class="form-label">Message</label>
      </div>
      <div class="col-md-6">
        <input v-model="message" type="text" id="messageInput" class="form-control" placeholder="Type your message" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-8 text-end">
        <button :disabled="isButtonDisabled" @click="sendMessage" class="btn btn-primary">
          Send Message
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <hr />
        <h5>Messages:</h5>
        <ul class="list-group">
          <li v-for="(msg, index) in messages" :key="index" class="list-group-item">
            <strong>{{ msg.user }}:</strong> {{ msg.message }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Cookies from 'js-cookie';

export default {
  name: 'ChatForm',
  setup() {
    // Reactive state variables
    const message = ref('');
    const isButtonDisabled = ref(true);
    const messages = ref([]);
    let connection = null;

    // Setup SignalR connection
    const setupSignalR = () => {
      // Update the URL to point to your correct backend URL for SignalR
      connection = new HubConnectionBuilder()
        .withUrl('http://localhost:8080/chatHub', { accessTokenFactory: () => Cookies.get('accessToken') })
        .build();

      connection.on('ReceiveMessage', (user, message) => {
        messages.value.push({ user, message });
      });

      connection
        .start()
        .then(() => {
          isButtonDisabled.value = false;
        })
        .catch((err) => {
          console.error(err.toString());
        });
    };

    // Send a message through SignalR
    const sendMessage = () => {
      if (message.value) {
        connection
          .invoke('SendMessage', message.value)
          .catch((err) => console.error(err.toString()));
        message.value = ''; // Clear the message input after sending
      }
    };

    // Set up the SignalR connection when the component is mounted
    onMounted(() => {
      setupSignalR();
    });

    return {
      message,
      isButtonDisabled,
      messages,
      sendMessage,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 50px;
}

.list-group-item {
  border-radius: 5px;
}

button:disabled {
  background-color: #d6d6d6;
  border-color: #ccc;
}
</style>
