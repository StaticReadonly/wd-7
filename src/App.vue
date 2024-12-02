<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import Header from './components/Header.vue';
import { RouterView } from 'vue-router';

const userStore = useUserStore(); 
const user = ref({
  userData: null, 
  loading: true
});

const fetchUserData = async () => {
  try {
    const res = await fetch("https://localhost:7015/api/user/info", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    });

    if (res.status === 200) {
      const data = await res.json();
      userStore.setUser({
        email: data.userInfo.email,
        first_name: data.userInfo.first_name,
        last_name: data.userInfo.last_name,
        role: data.userInfo.role
      });

      user.value.userData = data;
      localStorage.setItem('token', JSON.stringify(data.token)); 
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
  fetchUserData();
});
</script>

<template>
  <div v-if="!user.loading">
    <Header :user="userStore" />
    <RouterView />
  </div>
  <div v-if="user.loading">
    loading...
  </div>
</template>
