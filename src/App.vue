<template>
  <main>
        <form ref="form"  id="registrationForm">
            <h1>Реєстрація</h1>
            <label>
                Ел. пошта
                <input type="email" v-model="inputFields.email" @input="emailValidator()" id="email" required>
                <span className="error-message" id="emailError">{{errorFields.email}}</span>
            </label>
            <label>
                Пароль
                <input type="password" v-model="inputFields.password" @input="passwordValidator()" name="password" id="password" required>
                <span className="error-message" id="passwordError">{{errorFields.password}}</span>
            </label>
            <label>
                Прізвище
                <input type="text" v-model="inputFields.surname" @input="surnameValidator()" name="surname" id="surname" required>
                <span className="error-message" id="surnameError">{{errorFields.surname}}</span>
            </label>
            <label>
                Ім'я
                <input type="text" v-model="inputFields.firstName" @input="firstnameValidator()" name="firstName" id="firstName" required>
                <span className="error-message" id="firstNameError">{{errorFields.firstName}}</span>
            </label>
            <label>
                По-батькові
                <input type="text" v-model="inputFields.secondName" @input="secondNameValidator()" name="secondName" id="secondname" required>
                <span className="error-message" id="secondNameError">{{errorFields.secondName}}</span>
            </label>


            <div className="selection-block">
                <div>
                    Стать
                </div>
                <div>
                    <input type="radio" name="gender" value="male" required> Чоловік
                    <input type="radio" name="gender" value="female" required> Жінка
                    <span className="error-message" id="genderError">{{}}</span>
                </div>
            </div>


            <label>
                Дата народження
                <input type="date" v-model="inputFields.date" @input="dateValidator()" name="date" id="date" required>
                <span className="error-message" id="birthdayError"></span>
            </label>
            <label>
                Група
                <select className="group" name="group" required>
                    <option value="" selected disabled></option>
                    <option value="ia_31">IA-31</option>
                    <option value="ia_32">IA-32</option>
                    <option value="ia_33">IA-33</option>
                    <option value="ia_34">IA-34</option>
                </select>
                <span className="error-message" id="groupError">{{}}</span>
            </label>

            <label>Номер телефону
                <input type="tel" v-model="inputFields.phone" @input="phoneValidator()" id="phone" name="phone" placeholder="+38(0__) ___-__-__" required>
                <span className="error-message" id="phoneError">{{errorFields.phone}}</span>
            </label>
            <label>
                Картинка профілю
                <input type="file" name="picture" accept="image/*" />
            </label>
            <div>
                <button @click="sendForm()" type="submit">
                    Реєстрація
                </button>
            </div>
        </form>
        <div class="userTableWrapper">
            <div className="userTableContainer">
            <div className="userTableWrapper">
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
                        <UserTable v-for="(el, index) in users" :key="index" :user="el" @update-checked="updateChecked"/>
                    </tbody>
                </table>
            </div>
            <div className="action-buttons">
                <button @click="deleteSelected" id="delete">Видалити</button>
                <button @click="duplicateSelected" id="duplicate">Продублювати</button>
            </div>
        </div>  
    </div>  
    </main>

</template>

<script>
import UserTable from './components/UserTable.vue';
export default{
    components:{ UserTable },
    data() {
        return{
            users: [],
            inputFields:{
                email: '',
                password: '',
                surname: '', 
                firstName: '', 
                secondName: '',
                gender: '',
                date: '',
                group: '',
                phone: ''
            },
            errorFields:{
                email: '',
                password: '',
                surname: '', 
                firstName: '', 
                secondName: '',
                gender: '',
                birthday: '',
                group: '',
                phone: ''
            },
            
    }
    
}, 
methods: {
        emailValidator() {
            this.errorFields.email = !this.inputFields.email || !this.inputFields.email.match(/^[a-z]+(\.[a-z]+)*@[a-z]+(\.[a-z]+)+$/) ? 'Неправильна електронна пошта' : '';
        },

        passwordValidator() {
            this.errorFields.password = !this.inputFields.password || !this.inputFields.password.match(/^[a-zA-Z0-9!@#$%^&*()\-+=;:.,_]{6,100}$/) ? 'Пароль має містити від 6 до 100 символів' : '';
        },

        surnameValidator() {
            this.errorFields.surname = !this.inputFields.surname || !this.inputFields.surname.match(/^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$/) ? 'Неправильне прізвище' : '';
        },

        firstnameValidator() {
            this.errorFields.firstName = !this.inputFields.firstName || !this.inputFields.firstName.match(/^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$/) ? 'Неправильне ім\'я' : '';
        },

        secondNameValidator() {
            this.errorFields.secondName = !this.inputFields.secondName || !this.inputFields.secondName.match(/^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$/) ? 'Неправильне по-батькові' : '';
        },
        genderValidator() {
        const allowedValues = ['male', 'female'];
        if (!allowedValues.includes(this.inputFields.gender)) {
            this.errorFields.gender = 'Оберіть стать';
            return false;
        }
        this.errorFields.gender = '';
        return true;
        },
        dateValidator() {
            const minDate = new Date(1940, 0, 1);
            const maxDate = new Date();
            const currentDate = new Date(this.inputFields.date);
            this.errorFields.birthday = !this.inputFields.date ? 'Дата не може бути пустою' : (minDate < currentDate && currentDate < maxDate) ? '' : 'Неправильна дата народження';
        },
        groupValidator() {
        const allowedValues = ['ia_31', 'ia_32', 'ia_33', 'ia_34'];
        if (!allowedValues.includes(this.inputFields.group)) {
            this.errorFields.group = 'Оберіть групу';
            return false;
        }
        this.errorFields.group = '';
        return true;
        },
        phoneValidator() {
            this.errorFields.phone = !this.inputFields.phone || !this.inputFields.phone.match(/^\+38\(0[0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/) ? 'Неправильний номер телефону' : '';
        },

        sendForm() {
            const validators = [
                this.emailValidator(),
                this.passwordValidator(),
                this.surnameValidator(),
                this.firstnameValidator(),
                this.secondNameValidator(),
                this.genderValidator(),
                this.dateValidator(),
                this.groupValidator(),
                this.phoneValidator()
            ];
            if (validators.every(v => !v)) {
                this.sendData();
                this.resetForm();
            }
        },

        sendData() {
            this.users.push({
                email: this.inputFields.email,
                password: this.inputFields.password,
                surname: this.inputFields.surname, 
                firstName: this.inputFields.firstName, 
                secondName: this.inputFields.secondName,
                date: this.inputFields.date,
                phone: this.inputFields.phone,
                group: this.inputFields.group
            });
        }, 

        resetForm() {
            this.$refs.form.reset();
            this.inputFields = {
                email: '',
                password: '',
                surname: '', 
                firstName: '', 
                secondName: '',
                gender: '',
                date: '',
                phone: '',
                group: ''
            };
            this.errorFields = {
                email: '',
                password: '',
                surname: '', 
                firstName: '', 
                secondName: '',
                gender: '',
                birthday: '',
                group: '',
                phone: ''
            };
        },
        updateChecked({ id, checked }) {
            const user = this.users.find(u => u.id === id);
            if (user) {
                user.checked = checked;
            }
        },
        deleteSelected() {
            this.users = this.users.filter(user => !user.checked)
        },
        duplicateSelected() {
            const duplicates = this.users
                .filter(user => user.checked)
                .map(user => ({...user, id: user.id++, checked: false }));
            this.users.push(...duplicates);
        }
}

}
</script>


