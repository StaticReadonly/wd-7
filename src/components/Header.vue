<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; 

const userStore = useUserStore();

const accountRoute = computed(() => {
  if (userStore.email) { 
    return userStore.role === 'admin' ? '/admin/profile' : '/user/profile';
  }
  return '/login'; 
});
</script>

<template>
  <header>
    <RouterLink to="/" class="header-logo"></RouterLink>
    <nav>
      <RouterLink to="/menu">Меню</RouterLink>
      <RouterLink to="/recipes">Рецепти</RouterLink>
      <RouterLink :to="accountRoute">Обліковий запис</RouterLink>
      <RouterLink to="/faq">FAQ</RouterLink>
    </nav>
    <label for="main-menu-checker" class="main-menu-button"></label>
    <input type="checkbox" id="main-menu-checker" />
    <div class="mobile-main-menu-container">
      <label for="main-menu-checker" class="mobile-main-menu-filler"></label>
      <div class="mobile-main-menu">
        <RouterLink class="menu-item" to="/">Головна</RouterLink>
        <RouterLink class="menu-item" to="/menu">Меню</RouterLink>
        <RouterLink class="menu-item" to="/recipes">Рецепти</RouterLink>
        <RouterLink class="menu-item" :to="accountRoute">Обліковий запис</RouterLink>
        <RouterLink class="menu-item" to="/faq">FAQ</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped src="../styles/header_style.css"></style>
