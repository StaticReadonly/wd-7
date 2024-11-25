<script setup>
import { reactive } from 'vue';

const user = reactive({
  firstname: '',
  lastname: '',
  email: '',
});

const logout = async () => {
  try {
    const res = await fetch('https://localhost:7015/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
      }
    });

    if (res.ok) {
      localStorage.removeItem('authToken');
      user.firstname = '';
      user.lastname = '';
      user.email = '';
      window.location.href = '/home'; 
    } else {
      console.error('Помилка при виході');
    }
  } catch (error) {
    console.error('Сталася помилка:', error);
  }
};
</script>

<template>
  <main>
    <h1>Особистий кабінет</h1>
    <section class="user">
      <p><strong>Ім'я:</strong> {{ user.firstname }} {{ user.lastname }}</p>
      <p><strong>Електронна пошта:</strong> {{ user.email }}</p>
      <button @click="logout">Вихід</button>
    </section>
    
  </main>
</template>

<style scoped src='../styles/user_account_style.css'></style>
