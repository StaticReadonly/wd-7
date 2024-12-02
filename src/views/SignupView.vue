<script setup>
import router from '@/router';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const currentUser = reactive({
  email: '',
  password: '',
  firstname: '',
  lastname: ''
});

const errors = reactive({
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  general: ''  
});

const emailValidator = (email) => {
  if (!email) {
    return 'Поле не може бути порожнім'; 
  }
  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  return regex.test(email) ? '' : 'Неправильний формат електронної пошти';
};

const passwordValidator = (password) => {
  if (!password) {
    return 'Поле не може бути порожнім'; 
  }
  const regex = /^[a-zA-Z0-9!@#$%^&*()-=+\\'\\";:.,_]{6,100}$/;
  return regex.test(password) ? '' : 'Пароль має містити не менше 6 символів';
};

const firstnameValidator = (firstname) => {
  if (!firstname) {
    return 'Поле не може бути порожнім'; 
  }
  const regex = /^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$/;
  return regex.test(firstname) ? '' : 'Неправильний формат запису';
};

const lastnameValidator = (lastname) => {
  if (!lastname) {
    return 'Поле не може бути порожнім'; 
  }
  const regex = /^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$/;
  return regex.test(lastname) ? '' : 'Неправильний формат запису';
};

const emailInput = (e) => {
  currentUser.email = e.target.value;
  errors.email = emailValidator(currentUser.email);
};

const passwordInput = (e) => {
  currentUser.password = e.target.value;
  errors.password = passwordValidator(currentUser.password);
};

const firstnameInput = (e) => {
  currentUser.firstname = e.target.value;
  errors.firstname = firstnameValidator(currentUser.firstname);
};

const lastnameInput = (e) => {
  currentUser.lastname = e.target.value;
  errors.lastname = lastnameValidator(currentUser.lastname);
};

const submitHandler = async (e) => {
  e.preventDefault();

  errors.email = emailValidator(currentUser.email);
  errors.password = passwordValidator(currentUser.password);
  errors.firstname = firstnameValidator(currentUser.firstname);
  errors.lastname = lastnameValidator(currentUser.lastname);

  if (errors.email || errors.password || errors.firstname || errors.lastname) {
    console.error('Форма містить помилки');
    return;
  }

  try {
    const res = await fetch('https://localhost:7015/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        email: currentUser.email,
        password: currentUser.password,
        first_name: currentUser.firstname,
        last_name: currentUser.lastname
      }),
    });

    if (res.status === 200) {
      console.log(currentUser)
      localStorage.setItem('token', currentUser.token);
      localStorage.setItem('user', JSON.stringify(currentUser.userInfo));
      userStore.setUser({
        email: currentUser.userInfo.email,
        first_name: currentUser.userInfo.first_name,
        last_name: currentUser.userInfo.last_name,
        role: currentUser.userInfo.role,
      });
      router.push('/user/profile'); 
    } else {
      const errorData = await res.json();
      console.error('Виникла помилка при реєстрації:', errorData);
      errors.general = 'Неправильні дані для реєстрації';
    }
  } catch (error) {
    console.error('Помилка при відправці запиту:', error);
    errors.general = 'Виникла помилка. Будь ласка, спробуйте пізніше.';   
  }
};
</script>


<template>
    <main>
        <form @submit="submitHandler" id="registrationForm">
            <h1>Реєстрація</h1>
            <label>
                Ел. пошта
                <input type="email" name="email" v-bind:value="currentUser.email" @input="emailInput">
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </label>
            <label>
                Пароль
                <input type="password" name="password" v-bind:value="currentUser.password" @input="passwordInput">
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            </label>
            <label>
                Ім'я
                <input type="text" v-bind:value="currentUser.firstname" @input="firstnameInput">
                <span v-if="errors.firstname" class="error-message">{{ errors.firstname }}</span>
            </label>
            <label>
                Прізвище
                <input type="text" v-bind:value="currentUser.lastname" @input="lastnameInput">
                <span v-if="errors.lastname" class="error-message">{{ errors.lastname }}</span>
            </label>
        
            <ul v-if="errors.general" class="error-messages">
        <li>{{ errors.general }}</li>
      </ul>

            <div>
                <button type="submit">
                    Реєстрація
                </button>
            </div>
        </form>
    </main>
</template>

<style scoped src="../styles/login_form_common.css"></style>