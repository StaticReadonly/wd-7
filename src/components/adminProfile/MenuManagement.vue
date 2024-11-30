<script>
export default {
  data() {
    return {
      newDish: {
        name: '',
        recipeLink: '',
      },
      menuItems: {
        name: '',
        dishes: [],
      },
    };
  },
  methods: {
    addDish() {
      if (this.newDish.name && this.newDish.recipeLink) {
        this.menuItems.dishes.push({ ...this.newDish });
        this.newDish.name = '';
        this.newDish.recipeLink = '';
      } else {
        alert('Будь ласка, заповніть всі поля!');
      }
    },
    removeDish(index) {
      this.menuItems.dishes.splice(index, 1);
    },
    editDish(index) {
      const editedName = prompt('Введіть нову назву страви', this.menuItems.dishes[index].name);
      const editedLink = prompt('Введіть нове посилання на рецепт', this.menuItems.dishes[index].recipeLink);

      if (editedName && editedLink) {
        this.menuItems.dishes[index].name = editedName;
        this.menuItems.dishes[index].recipeLink = editedLink;
      }
    },
  },
};
</script>

<template>
    <div class="menu">
      <h1>Управління меню</h1>
  
      <div>
        <label for="menuName">Назва меню:</label>
        <input v-model="newDish.name" id="dishName" type="text" placeholder="Введіть назву страви" />
  
        <label for="recipeLink">Посилання на рецепт:</label>
        <input v-model="newDish.recipeLink" id="recipeLink" type="text" placeholder="Введіть посилання на рецепт" />
  
        <button @click="addDish">Додати страву</button>
      </div>
  
      <h3>Страви в меню</h3>
      <table>
        <thead>
          <tr>
            <th>Назва страви</th>
            <th>Посилання на рецепт</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dish, index) in menuItems.dishes" :key="index">
            <td>{{ dish.name }}</td>
            <td><a :href="dish.recipeLink" target="_blank">{{ dish.recipeLink }}</a></td>
            <td>
              <button @click="editDish(index)">Редагувати</button>
              <button @click="removeDish(index)">Видалити</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped src='../../styles/admin_account_style.css'></style>
  