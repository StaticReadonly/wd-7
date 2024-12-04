<script>
export default {
  data() {
    return {
      dishSearch: '',           
      filteredDishes: [],        
      allDishes: [],            
    };
  },
  methods: {
    async searchQuery() {
      const query = this.dishSearch;
      if (query.trim() === '') {
        this.filteredDishes = [];  
      } else {
        if (query.length >= 3) {
          try {
            const response = await fetch('https://localhost:7015/api/dish/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({ query }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Server error');
            }
            const data = await response.json();
            this.filteredDishes = data;
          } catch (error) {
            console.error(`Error while searching for a dish: ${error.message}`);
          }
        } else {
          alert('Для пошуку потрібно щонайменше 3 символи');
        }
      }
    },

    selectDish(event) {
      const selectedDishId = event.target.value; 
      if (selectedDishId) {
        this.goToDishPage(selectedDishId);
      } else {
        alert('Меню не вибрано!');
      }
    },

    goToDishPage(dishId) {
      if (dishId) {
        this.$router.push(`/dish/${dishId}`);
      } else {
        alert('Страву не знайдено!');
      }
    },
  },
};
</script>
  
<template>
  <div class="background-container">
    <div class="search-recipe">
      <h3>Пошук страви</h3>
      <div class="search-container">
      <input v-model="dishSearch" type="search" placeholder="Пошук страви" />
      <button type="button" @click="searchQuery"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
      <select v-if="filteredDishes.length > 0" @change="selectDish">
        <option value="" disabled selected>Виберіть страву</option>
        <option v-for="dish in filteredDishes" :key="dish.id" :value="dish.id">
          {{ dish.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped src="../styles/recipe_style.css"></style>
