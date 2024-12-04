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
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role
      });
      console.log('data',data);

      user.value.userData = data;
      localStorage.setItem('user', JSON.stringify(data));
      } else {
        console.error('Не вдалося отримати дані користувача');
        console.log('res',res);
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
  <div class="loading" v-if="user.loading">
    <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://kit.fontawesome.com/465d4025de.js');
    script.setAttribute('defer', 'defer');
    script.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(script);
  }
};
</script>

<style scoped src="../src/styles/app_style.css"></style>