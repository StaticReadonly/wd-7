<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; 

const userStore = useUserStore();

const accountRoute = computed(() => 
  userStore.email ? '/profile' : '/login'
);

const menuRoute = computed(() => 
  userStore.email 
    ? (userStore.role === 'Admin' ? '/admin/menu' : '/user/menu') 
    : '/user/menu'
);

const recipesRoute = computed(() => 
  userStore.email 
    ? (userStore.role === 'Admin' ? '/admin/recipes' : '/user/recipes') 
    : '/user/recipes'
);

const accountLabel = computed(() => 
  userStore.email ? 'Обліковий запис' : 'Увійти'
);
</script>

<template>
  <header>
    <RouterLink to="/" class="header-logo"></RouterLink>
    <nav>
      <RouterLink v-if="menuRoute" :to="menuRoute">Меню</RouterLink>
      <RouterLink v-if="recipesRoute" :to="recipesRoute">Рецепти</RouterLink>
      <RouterLink :to="accountRoute">{{ accountLabel }}</RouterLink>
      <RouterLink to="/faq">FAQ</RouterLink>
    </nav>
    <label for="main-menu-checker" class="main-menu-button"></label>
    <input type="checkbox" id="main-menu-checker" />
    <div class="mobile-main-menu-container">
      <label for="main-menu-checker" class="mobile-main-menu-filler"></label>
      <div class="mobile-main-menu">
        <RouterLink class="menu-item" to="/">Головна</RouterLink>
        <RouterLink v-if="menuRoute" class="menu-item" :to="menuRoute">Меню</RouterLink>
        <RouterLink v-if="recipesRoute" class="menu-item" :to="recipesRoute">Рецепти</RouterLink>
        <RouterLink class="menu-item" :to="accountRoute">{{ accountLabel }}</RouterLink>
        <RouterLink class="menu-item" to="/faq">FAQ</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import '../styles/header_style.css';
</style>
