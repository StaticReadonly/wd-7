<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import { RouterView } from 'vue-router';

const user = ref({
  userData: null, 
  loading: true
});

const fetchUserData = async () => {
  try {
    const res = await fetch("https://localhost:7015/api/user/info", {
      method: "POST"
    });

    if (res.status === 200) {
      const data = await res.json();
      user.value.userData = data;  
      user.value.role = data.role;
      
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      console.error('Не вдалося отримати дані користувача');
    }
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
  } finally {
    user.value.loading = false; 
  }
};

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    user.value.userData = JSON.parse(storedUser);
    user.value.loading = false;  
  } else {
    fetchUserData();  
  }
});
</script>

<template>
  <div v-if="!user.loading">
    <Header :user="user.value" />
    <RouterView />
  </div>
  <div v-if="user.loading">
    loading...
  </div>
</template>