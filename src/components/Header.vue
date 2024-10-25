<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <RouterLink to="/" class="header-logo"></RouterLink>
        <!-- <a class="header-logo"></a> -->
        <nav>
            <RouterLink to="/menu">Меню</RouterLink>
            <RouterLink to="/recipies">Рецепти</RouterLink>
            <RouterLink to="/login">Обліковий запис</RouterLink>
            <RouterLink to="/faq">FAQ</RouterLink>
            <!-- <a>
                Меню
            </a>
            <a>
                Рецепти
            </a>
            <a href="authentication/index.html">
                Обліковий запис
            </a>
            <a href="faq/index.html">
                FAQ
            </a> -->
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
                <!-- <a class="menu-item">
                    Головна
                </a>
                <a class="menu-item">
                    Меню
                </a>
                <a class="menu-item">
                    Рецепти
                </a>
                <a href="./authentication/index.html" class="menu-item">
                    Обліковий запис
                </a>
                <a href="./faq/index.html" class="menu-item">
                    FAQ
                </a> -->
            </div>
        </div>
    </header>
</template>

<style>
    @import url('../styles/header_style.css');
</style>