<script>
export default {
  props: {
    ingredients: Array,
    allIngredients: Array,
  },
  data() {
    return {
      ingredientSearch: '',
      ingredientAdd: '',
      filteredIngredients: [],
    };
  },
  methods: {
    filterIngredients() {
      this.filteredIngredients = this.allIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(this.ingredientSearch.toLowerCase()) &&
        !this.ingredients.some((ing) => ing.name === ingredient)
      );
    },

    selectIngredient(event) {
      const selectedIngredient = event.target.value;
      if (selectedIngredient && !this.ingredients.some((ing) => ing.name === selectedIngredient)) {
        this.$emit('add-ingredient', { name: selectedIngredient, proportion: '', unit: '' });
        this.ingredientSearch = '';  
        this.filteredIngredients = []; 
      }
    }, 
    addIngredient() {
      const newIngredient = this.ingredientAdd.trim();
      if (newIngredient && !this.ingredients.some((ing) => ing.name === newIngredient)) {
        this.$emit('add-ingredient', { name: newIngredient, proportion: '', unit: '' });
        if (!this.allIngredients.includes(newIngredient)) {
          this.$emit('add-all-ingredient', newIngredient); 
        }
      }
      this.ingredientAdd = '';
    },

    removeIngredient(index) {
      this.$emit('remove-ingredient', index);
    }
  },
};
</script>

<template>
  <div>
    <h4>Інгредієнти:</h4>
    <div>
      <input v-model="ingredientSearch" type="text" placeholder="Пошук інгредієнту"/>
      <button type="button" @click="filterIngredients">Пошук</button>

      <select v-if="filteredIngredients.length > 0" @change="selectIngredient">
        <option value="" disabled selected>Виберіть інгредієнт</option>
        <option v-for="(ingredient, index) in filteredIngredients" :key="index" :value="ingredient">
          {{ ingredient }}
        </option>
      </select>
    </div>

    <input v-model="ingredientAdd" type="text" placeholder="Додати новий інгредієнт"/>
    <button type="button" @click="addIngredient">Додати інгредієнт</button>

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
        <tr v-for="(ingredient, index) in ingredients" :key="index">
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
</template>

  
<style scoped src='../../styles/admin_account_style.css'></style>