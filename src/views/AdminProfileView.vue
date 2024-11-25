<script>
export default {
  data() {
    return {
      newDish: {
        name: '',
        recipeLink: '',
      },

      menuItems: {
        name:'',
        dishes:[],
      },

      tags: {
      tagSearch: '', 
      tagAdd: '', 
      allTags: [], 
      filteredTags: [],
    }, 

      ingredient: {
      ingredientSearch: '', 
      ingredientAdd: '',
      allIngredients: [], 
      filteredIngredients: [], 
    },
      
      newRecipe: {
        title: '',
        description: '',
        tags: [],
        ingredients: [],
        steps: [], 
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
    filterTags() {
      this.tags.filteredTags = this.tags.allTags.filter((tag) => 
      tag.toLowerCase().includes(this.tags.tagSearch.toLowerCase()) && !this.newRecipe.tags.includes(tag));
    },
    selectTag(event) {
      const selectedTag = event.target.value;
      if (selectedTag && !this.newRecipe.tags.includes(selectedTag)) {
        this.newRecipe.tags.push(selectedTag);
        this.tags.tagSearch = ''; 
        this.tags.filteredTags = []; 
      }
    },
    addTag() {
      const newTag = this.tags.tagAdd.trim();
      if (newTag && !this.newRecipe.tags.includes(newTag)) {
        this.newRecipe.tags.push(newTag);
        if (!this.tags.allTags.includes(newTag)) {
          this.tags.allTags.push(newTag); 
        }
      }
      this.tags.tagAdd = ''; 
    },
    removeTag(index) {
      this.newRecipe.tags.splice(index, 1);
    },

    filterIngredients() {
      this.ingredient.filteredIngredients = this.ingredient.allIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(this.ingredient.ingredientSearch.toLowerCase()) &&
        !this.newRecipe.ingredients.some((ing) => ing.name === ingredient)
      );
    },
    selectIngredient(event) {
      const selectedIngredient = event.target.value;
      if (selectedIngredient && !this.newRecipe.ingredients.some((ing) => ing.name === selectedIngredient)) {
        this.newRecipe.ingredients.push({
          name: selectedIngredient,
          proportion: '',
          unit: '',
        });
        this.ingredient.ingredientSearch = ''; 
        this.ingredient.filteredIngredients = []; 
      }
    },
    addIngredient() {
      const newIngredient = this.ingredient.ingredientAdd.trim();
      if (newIngredient && !this.newRecipe.ingredients.some((ing) => ing.name === newIngredient)) {
        this.newRecipe.ingredients.push({
          name: newIngredient,
          proportion: '',
          unit: '',
        });
        if (!this.ingredient.allIngredients.includes(newIngredient)) {
          this.ingredient.allIngredients.push(newIngredient); 
        }
      }
      this.ingredient.ingredientAdd = ''; 
    },
    removeIngredient(index) {
      this.newRecipe.ingredients.splice(index, 1);
    },
    addStep() {
      this.newRecipe.steps.push({ name: '', description: '' });
    },
    removeStep(index) {
      this.newRecipe.steps.splice(index, 1);
    },
    async addRecipe() {
      if (
        this.newRecipe.title &&
        this.newRecipe.description &&
        this.newRecipe.ingredients.length > 0 &&
        this.newRecipe.steps.length > 0
      ) {
        console.log('Рецепт добавлен:', this.newRecipe);
        alert('Рецепт успішно доданий!');
        this.newRecipe = { title: '', description: '', tags: [], ingredients: [], steps: [] };
      } else {
        alert('Будь ласка, заповніть всі поля рецепту!');
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

      <label for="dishName">Назва страви:</label>
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

  <div class="recipe">
    <h1>Додати новий рецепт</h1>
    <form @submit.prevent="addRecipe">
      <label>
        Назва страви:
        <input v-model="newRecipe.title" type="text" placeholder="Додати назву страви" required />
      </label>
      <label>
        Опис:
        <textarea v-model="newRecipe.description" placeholder="Додати опис страви" required></textarea>
      </label>

      <div>
    <h4>Теги:</h4>
    <div>
      <div id="f">      
        <input type="text" v-model="tags.tagSearch" placeholder="Пошук тегу" @input="filterTags"/>
        <select name="tagSelect" size="6" v-if="tags.filteredTags.length > 0" @change="selectTag($event)">
          <option v-for="(tag, index) in tags.filteredTags" :key="index" :value="tag"> {{ tag }} </option>
        </select>
      </div>

      <input v-model="tags.tagAdd" type="text" placeholder="Додати новий тег"/>
      <button type="button" @click="addTag">Додати тег</button>
    </div>

    <div class="tags">
      <span v-for="(tag, index) in newRecipe.tags" :key="index" class="tag">
        {{ tag }}
        <button type="button" @click="removeTag(index)">×</button>
      </span>
    </div>

    <h4>Інгредієнти:</h4>
    <div>
      <div id="ingredient-search">
        <input type="text" v-model="ingredient.ingredientSearch" placeholder="Пошук інгредієнту" @input="filterIngredients"/>
        <select name="ingredientSelect" size="6" v-if="ingredient.filteredIngredients.length > 0" @change="selectIngredient($event)">
          <option v-for="(ingredient, index) in ingredient.filteredIngredients" :key="index" :value="ingredient">{{ ingredient }}</option>
        </select>
      </div>

      <input
        v-model="ingredient.ingredientAdd"
        type="text"
        placeholder="Додати новий інгредієнт"
      />
      <button type="button" @click="addIngredient">Додати інгредієнт</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Назва інгредієнту</th>
          <th>Пропорція</th>
          <th>Одиниці вимірювання</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
          <td>{{ ingredient.name }}</td>
          <td>
            <input v-model="ingredient.proportion" type="text" placeholder="Пропорція"/>
          </td>
          <td>
            <input v-model="ingredient.unit" type="text" placeholder="Одиниці вимірювання" />
          </td>
          <td>
            <button type="button" @click="removeIngredient(index)">Видалити</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

        <div>
          <h4>Спосіб приготування:</h4>
          <table>
            <thead>
              <tr>
                <th>Назва кроку</th>
                <th>Опис</th>
                <th>Фото/відео</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(step, index) in newRecipe.steps" :key="index">
                <td><input v-model="step.name" type="text" placeholder="Назва кроку" required /></td>
                <td><input v-model="step.description" type="text" placeholder="Опис" required /></td>
                <td><input type="file" name="material" accept="image/*, video/*" /></td>
                <td>
                  <button type="button" @click="removeStep(index)">Видалити</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" @click="addStep">Додати крок</button>
        </div>

        <button type="submit">Зберегти рецепт</button>
      </form>
  </div>
</template>


  <style scoped src="../styles/admin_account_style.css">
  
  </style>
  