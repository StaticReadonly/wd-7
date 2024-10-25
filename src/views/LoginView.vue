<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <main>
        <form>
            <h1>Вхід</h1>
            <label>
                Ел. пошта
                <input type="email" name="email"/>
            </label>
            <label>
                Пароль
                <input type="password" name="password"/>
            </label>
            <div>
                <button type="submit">Увійти</button>
            </div>
            <div class="text-small">
                Не маєте облікового запису?
                <RouterLink to="/signup">Створіть його!</RouterLink>
            </div>
        </form>
    </main>
</template>

<style scoped src="../styles/login_form_common.css"></style>