<script>
export default {
  props: {
    dishes: Object,                 
    allDishes: Array,       
    filteredDishes: Array,  
  },
  data() {
    return {
      dishSearch: '', 
    };
  },
  methods: {
    searchQuery() {
      this.$emit('search-dishes', this.dishSearch.trim());
    },

    addSelectedDish(selectedName) {
      if (selectedName && !this.dishes.allDishes.some(dish => dish.name === selectedName)) {
        const selectedDish = this.filteredDishes.find(dish => dish.name === selectedName);
        
        if (selectedDish) {
          this.$emit('add-selected-dish', selectedDish);
        }
      }
    },

    selectDish(event) {
      const selectedName = event.target.value;
      if (selectedName) {
        this.addSelectedDish(selectedName);
      }

      this.dishSearch = '';  
      this.$emit('search-dishes', ''); 
    },

    removeDish(index) {
      this.$emit('remove-dish', index);
    },
  },
};
</script>

<template>
  <h4>Страви:</h4>
  <input v-model="dishSearch" type="search" placeholder="Пошук страви" />
  <button type="button" @click="searchQuery"><i class="fa-solid fa-magnifying-glass"></i></button>

  <select v-if="filteredDishes.length > 0" @change="selectDish">
    <option value="" disabled selected>Виберіть страву</option>
    <option v-for="dish in filteredDishes" :key="dish.id" :value="dish.name">
      {{ dish.name }}
    </option>
  </select>

    <h3>Страви в меню</h3>
    <table>
      <thead>
        <tr>
          <th>Назва страви</th>
          <th>Опис страви</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dish, index) in dishes.allDishes" :key="dish.id">
          <td>{{ dish.name }}</td>
          <td>{{ dish.description }}</td>
          <td>
            <button @click="removeDish(index)">Видалити</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<style scoped src='../../styles/admin_account_style.css'></style>
