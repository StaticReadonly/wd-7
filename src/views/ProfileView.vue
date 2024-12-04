<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const logout = async () => {
  try {
    const res = await fetch('https://localhost:7015/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); 
      userStore.clearUser();  
      router.push('/'); 
    } else {
      console.error('Error while logging out');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
</script>

<template>
  <div class="background-container">
    <main>
    <h2>Особистий кабінет</h2>
    <section class="user">
      <p><strong>Ім'я:</strong> {{ userStore.first_name }} {{ userStore.last_name }}</p>
      <p><strong>Електронна пошта:</strong> {{ userStore.email }}</p>
      <button @click="logout">Вихід</button>
    </section>
  </main></div>
  
</template>

<style scoped src='../styles/user_account_style.css'></style>
