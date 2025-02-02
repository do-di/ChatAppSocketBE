<template>
    <div class="full-screen-bg">
      <!-- Login Form container -->
      <div class="login-container">
        <!-- Login Form -->
        <div class="login-form">
          <h2 class="text-center mb-4">Login</h2>
          
          <form @submit.prevent="handleSubmit">
            <!-- userma,e input -->
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input 
                type="username" 
                class="form-control" 
                id="username" 
                v-model="username" 
                placeholder="Enter your username" 
                required
              />
            </div>
  
            <!-- Password input -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                v-model="password" 
                placeholder="Enter your password" 
                required
              />
            </div>
  
            <!-- Remember me checkbox -->
            <div class="form-check mb-3">
              <input 
                type="checkbox" 
                class="form-check-input" 
                id="remember" 
                v-model="rememberMe"
              />
              <label class="form-check-label" for="remember">Remember me</label>
            </div>
  
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
  
          <!-- Forgot password and sign-up links -->
          <div class="mt-3 text-center">
            <a href="#" class="text-decoration-none">Forgot password?</a> | 
            <a href="#" class="text-decoration-none">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../services/api';
  import Cookies from 'js-cookie';
  export default {
    name: 'LoginForm',
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false
      };
    },
    methods: {
      async handleSubmit() {
        try {
          // Prepare the login data
          const loginData = {
            username: this.username,
            password: this.password,
          };

          // Call the login API
          const response = await api.post('/auth', loginData);  // Assuming the endpoint is "/login"
        
          if (response.status === 200) {
            Cookies.set('accessToken', response.data.accessToken, { expires: 7, secure: false, sameSite: 'Strict' });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: 7, secure: false, sameSite: 'Strict' });
            this.$router.push('/chat');
          }
        } catch (error) {
          if (error.response) {
            this.errorMessage = error.response.data.message || 'Login failed, please try again.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Full screen background */
  .full-screen-bg {
    background: no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
  }
  
  /* Center the login form vertically and horizontally */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .login-form {
    background-color: rgba(255, 255, 255, 0.9); /* Light white background with transparency */
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 150%;
    max-width: 600px;
  }
  </style>
  