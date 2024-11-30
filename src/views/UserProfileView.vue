<script setup>
import router from '@/router';
import { reactive, onMounted } from 'vue';

const user = reactive({
  first_name: '',
  last_name: '',
  email: '',
});

const logout = async () => {
  try {
    const res = await fetch('https://localhost:7015/api/user/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      localStorage.removeItem('user'); 
      router.push('/');
    } else {
      console.error('Помилка при виході:', res.statusText);
    }
  } catch (error) {
    console.error('Сталася помилка при запиті:', error);
  }
};

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser); 
    user.first_name = parsedUser.first_name || '';
    user.last_name = parsedUser.last_name || '';
    user.email = parsedUser.email || '';
  }
});
</script>

<template>
  <main>
    <h1>Особистий кабінет</h1>
    <section class="user">
      <p><strong>Ім'я:</strong> {{ user.first_name }} {{ user.last_name }}</p>
      <p><strong>Електронна пошта:</strong> {{ user.email }}</p>
      <button @click="logout">Вихід</button>
    </section>
  </main>
</template>

<style scoped src='../styles/user_account_style.css'></style>
