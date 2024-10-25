<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <RouterLink to="/" class="header-logo"></RouterLink>
        <nav>
            <RouterLink to="/menu">Меню</RouterLink>
            <RouterLink to="/recipies">Рецепти</RouterLink>
            <RouterLink to="/login">Обліковий запис</RouterLink>
            <RouterLink to="/faq">FAQ</RouterLink>
        </nav>
        <label for="main-menu-checker" class="main-menu-button"></label>
        <input type="checkbox" id="main-menu-checker" />
        <div class="mobile-main-menu-container">
            <label for="main-menu-checker" class="mobile-main-menu-filler"></label>
            <div class="mobile-main-menu">
                <RouterLink class="menu-item" to="/">Головна</RouterLink>
                <RouterLink class="menu-item" to="/menu">Меню</RouterLink>
                <RouterLink class="menu-item" to="/recipies">Рецепти</RouterLink>
                <RouterLink class="menu-item" to="/login">Обліковий запис</RouterLink>
                <RouterLink  class="menu-item" to="/faq">FAQ</RouterLink>
            </div>
        </div>
    </header>
</template>

<style scoped src="../styles/header_style.css"></style>