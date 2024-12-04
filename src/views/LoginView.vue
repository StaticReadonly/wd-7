<script>
import router from '@/router';
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: [],
    };
  },
  methods: {
    async login(e) {
      e.preventDefault(); 

      localStorage.clear();

      this.errors = []; 

      if (!this.form.email) {
        this.errors.push('Ел. пошта обов’язкова');
      }
      if (!this.form.password) {
        this.errors.push('Пароль обов’язковий');
      }
      if (this.errors.length > 0) {
        return; 
      }

      const userStore = useUserStore();
      try {
        const res = await fetch('https://localhost:7015/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            email: this.form.email,
            password: this.form.password,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();           
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.userInfo));
          userStore.setUser({
            email: data.userInfo.email,
            first_name: data.userInfo.first_name,
            last_name: data.userInfo.last_name,
            role: data.userInfo.role,
          });

          router.push("/");
        } 
      } catch (error) {
        console.error('Login error:', error);
        this.errors.push('Виникла помилка. Будь ласка, спробуйте пізніше.');
        this.form.email = '';
        this.form.password = '';
      }
    },
  },
};
</script>

<template>
    <main class="background-container">
    <form @submit="login">
      <h1>Вхід</h1>
      <label>
        Ел. пошта
        <input type="email" name="email" v-model="form.email" />
      </label>
      <label>
        Пароль
        <input type="password" name="password" v-model="form.password" />
      </label>

      <div>
        <button type="submit">Увійти</button>
      </div>

      <ul v-if="errors.length" class="error-messages">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>

      <div class="text-small">
        Не маєте облікового запису?
        <RouterLink to="/signup">Створіть його!</RouterLink>
      </div>
    </form>
  </main>
</template>

<style scoped src="../styles/login_form_common.css"></style>
