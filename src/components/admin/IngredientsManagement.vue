<script>
export default {
  props: {
    ingredients: Array,          
    allIngredients: Array,       
    filteredIngredients: Array,  
  },
  data() {
    return {
      ingredientSearch: '',  
      ingredientAdd: {
        id: '',                
        name: '', 
        proportion:'',            
        unit: '',             
      },
    };
  },
  methods: {
    searchQuery() {
      this.$emit('search-ingredients', this.ingredientSearch.trim());
    },

    addSelectedIngredient(selectedName) {
      if (!this.ingredients.some(ing => ing.name === selectedName)) {
        const selectedIngredient = this.filteredIngredients.find(ing => ing.name === selectedName);
        
        if (selectedIngredient) {
          this.$emit('add-selected-ingredient', {
            id: selectedIngredient.id,      
            name: selectedIngredient.name,
            proportion: '',  
            unit: selectedIngredient.unit
          }); 
        }
      }
    },

    selectIngredient(event) {
      const selectedName = event.target.value;
      this.addSelectedIngredient(selectedName); 

      this.ingredientSearch = '';  
      this.$emit('search-ingredients', '');
    },

    addIngredient() {
      const newIngredient = this.ingredientAdd.name.trim();
      const newIngredientUnit = this.ingredientAdd.unit.trim();

      if (newIngredient && !this.ingredients.some(ing => ing.name === newIngredient)) {
        const newIngredientData = { 
          id: this.ingredientAdd.id,  
          name: newIngredient, 
          unit: newIngredientUnit 
        };

        this.$emit('add-ingredient', { ...newIngredientData, proportion: '' });
        this.$emit('add-all-ingredient', newIngredientData);

        this.ingredientAdd.name = '';
        this.ingredientAdd.unit = '';
        this.ingredientAdd.id = '';  
      }
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
      <input v-model="ingredientSearch" type="search" placeholder="Пошук інгредієнту" />
      <button type="button" @click="searchQuery"><i class="fa-solid fa-magnifying-glass"></i></button>

      <select v-if="filteredIngredients.length > 0" @change="selectIngredient">
        <option value="" disabled selected>Виберіть інгредієнт</option>
        <option 
          v-for="ingredient in filteredIngredients" 
          :key="ingredient.id" 
          :value="ingredient.name">
          {{ ingredient.name }} ({{ ingredient.unit }})
        </option>
      </select>
    </div>

    <input v-model="ingredientAdd.name" type="text" placeholder="Додати новий інгредієнт"/>
    <input v-model="ingredientAdd.unit" type="text" placeholder="Одиниці вимірювання" />
    <button type="button" @click="addIngredient">Додати інгредієнт</button>

    <table>
      <thead>
        <tr>
          <th>Назва інгредієнту</th>
          <th>Пропорція</th>
          <th>Одиниці вимірювання</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingredient, index) in ingredients" :key="ingredient.id">
          <td>{{ ingredient.name }}</td> 
          <td>
            <input v-model="ingredient.proportion" type="text" placeholder="Пропорція"/>
          </td>
          <td>{{ ingredient.unit }}</td> 
          <td>
            <button type="button" @click="removeIngredient(index)"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped src='../../styles/admin_account_style.css'></style>
