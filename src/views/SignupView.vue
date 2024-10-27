<script setup>
    import { emailValidator, passwordValidator, surnameValidator, firstnameValidator, secondNameValidator,
        genderValidator, dateValidator, groupValidator, phoneValidator,
        clearErrors
    } from '@/js/form';
    import { ref, reactive } from 'vue';
    import UserRecord from '@/components/UserRecord.vue';

    const keys = ref(0);

    const newKey = () => {
        return (keys.value++);
    }

    const users = ref([]);

    const createNewUser = () => {
        return {
            email: '',
            password: '',
            surname: '',
            firstName: '',
            secondName: '',
            gender: '',
            date: '',
            group: '',
            phone: ''
        }
    };

    let currentUser = reactive(createNewUser());

    const errors = reactive({
        email: false,
        password: false,
        surname: false,
        firstName: false,
        secondName: false,
        gender: false,
        date: false,
        group: false,
        phone: false
    });

    const validators = {
        email: emailValidator,
        password: passwordValidator,
        surname: surnameValidator,
        firstName: firstnameValidator,
        secondName: secondNameValidator,
        gender: genderValidator,
        date: dateValidator,
        group: groupValidator,
        phone: phoneValidator
    };

    const submitHandler = (e) => {
        e.preventDefault();

        for (let valid of Object.values(validators)){
            valid(currentUser, errors);
        }

        if (Object.values(errors).includes(true)){
            return;
        }

        users.value = users.value.concat({
            key: newKey(),
            checked: false,
            data: currentUser
        });

        currentUser = reactive(createNewUser());
        clearErrors();
    };

    const deleteHandler = () => {
        users.value = users.value.filter(u => !u.checked);
    };

    const duplicateHandler = () => {
        const hasCheckedUsers = users.value.some(u => {
            return u.checked;
        });
        
        if (hasCheckedUsers){
            users.value = users.value.flatMap(u => {
                if (u.checked){
                    u.checked = false;
                    const duplicate = {};
                    Object.assign(duplicate, u);
                    duplicate.key = newKey();
                    u.key = newKey();
                    return [u, duplicate];
                }
                else{
                    return [u];
                }
            });
        }
    };

    const emailInput = (e) => {
        currentUser.email = e.target.value;
        validators.email(currentUser, errors);
    };
    const passwordInput = (e) => {
        currentUser.password = e.target.value;
        validators.password(currentUser, errors);
    };
    const surnameInput = (e) => {
        currentUser.surname = e.target.value;
        validators.surname(currentUser, errors);
    };
    const firstNameInput = (e) => {
        currentUser.firstName = e.target.value;
        validators.firstName(currentUser, errors);
    };
    const secondNameInput = (e) => {
        currentUser.secondName = e.target.value;
        validators.secondName(currentUser, errors);
    };
    const genderInput = (e) => {
        currentUser.gender = e.target.value;
        validators.gender(currentUser, errors);
    };
    const dateInput = (e) => {
        currentUser.date = e.target.value;
        validators.date(currentUser, errors);
    };
    const groupInput = (e) => {
        currentUser.group = e.target.value;
        validators.group(currentUser, errors);
    };
    const phoneInput = (e) => {
        currentUser.phone = e.target.value;
        validators.phone(currentUser, errors);
    };

</script>

<template>
    <main>
        <form @submit="submitHandler" id="registrationForm">
            <h1>Реєстрація</h1>
            <label>
                Ел. пошта
                <input type="email" name="email" v-bind:value="currentUser.email" @input="emailInput">
                <span v-if="errors.email" class="error-message">Невірна пошта</span>
            </label>
            <label>
                Пароль
                <input type="password" name="password" v-bind:value="currentUser.password" @input="passwordInput">
                <span v-if="errors.password" class="error-message">Невірний пароль</span>
            </label>
            <label>
                Прізвище
                <input type="text" v-bind:value="currentUser.surname" @input="surnameInput">
                <span v-if="errors.surname" class="error-message">Невірне прізвище</span>
            </label>
            <label>
                Ім'я
                <input type="text" v-bind:value="currentUser.firstName" @input="firstNameInput">
                <span v-if="errors.firstName" class="error-message">Невірне ім'я</span>
            </label>
            <label>
                По-батькові
                <input type="text" v-bind:value="currentUser.secondName" @input="secondNameInput">
                <span v-if="errors.secondName" class="error-message">Невірне по-батькові</span>
            </label>


            <div>
                <div>
                    Стать
                </div>
                <div>
                    <input type="radio" name="gender" value="male" @input="genderInput"> Чоловік
                    <input type="radio" name="gender" value="female" @input="genderInput"> Жінка
                    <span v-if="errors.gender" class="error-message">Невірна стать</span>
                </div>
            </div>


            <label>
                Дата народження
                <input type="date" v-bind:value="currentUser.date" @input="dateInput">
                <span v-if="errors.date" class="error-message">Невірна дата народження</span>
            </label>
            <label>
                Група
                <select class="group" v-bind:value="currentUser.group" @input="groupInput">
                    <option value="ia_31">IA-31</option>
                    <option value="ia_32">IA-32</option>
                    <option value="ia_33">IA-33</option>
                    <option value="ia_34">IA-34</option>
                </select>
                <span v-if="errors.group" class="error-message">Невріна група</span>
            </label>

            <label>Номер телефону
                <input type="tel" v-bind:value="currentUser.phone" @input="phoneInput" v-mask="'+38(0##) ###-##-##'" placeholder="+38(0__) ___-__-__">
                <span v-if="errors.phone" class="error-message">Невріний телефон</span>
            </label>
            <label>
                Картинка профілю
                <input type="file" accept="image/*" />
            </label>
            <div>
                <button type="submit">
                    Реєстрація
                </button>
            </div>
        </form>

        <div class="userTableContainer">
            <div class="userTableWrapper">
                <h2>Зареєстровані користувачі</h2>
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>Вибір</th>
                            <th>Ел. пошта</th>
                            <th>Прізвище</th>
                            <th>Ім'я</th>
                            <th>Телефон</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody">
                        <UserRecord v-for="user in users" v-bind:key="user.key" v-bind:user="user"/>
                    </tbody>
                </table>
            </div>
            <div class="action-buttons">
                <button id="delete" @click="deleteHandler">Видалити</button>
                <button id="duplicate" @click="duplicateHandler">Продублювати</button>
            </div>
        </div>
    </main>
</template>

<style scoped src="../styles/login_form_common.css"></style>