<script>
export default {
  data() {
    return {
      dishes: {
        dishSearch: '', 
        allDishes: [],
        filteredDishes: [], 
      }
    };
  },
  methods: {

    filterDishes() {
      const searchText = this.dishes.dishSearch.toLowerCase().trim();
      if (searchText) {
        this.dishes.filteredDishes = this.dishes.allDishes.filter((dish) =>
          dish.name.toLowerCase().includes(searchText)
        );
      } else {
        this.dishes.filteredDishes = [];
      }
    },

    selectDish(event) {
      const selectedDishId = event.target.value;
      this.goToDishPage(selectedDishId);
    },

    searchDish() {
      const searchText = this.dishes.dishSearch.toLowerCase().trim();
      const matchedDish = this.dishes.allDishes.find((dish) =>
        dish.name.toLowerCase().includes(searchText)
      );

      if (matchedDish) {
        this.goToDishPage(matchedDish.id);
      } else {
        alert('Страву не знайдено!');
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
  <main>
    <h1>Рецепти</h1>
    <div id="dish-search">
      <input type="text" v-model="dishes.dishSearch" placeholder="Пошук страви" @input="filterDishes"/>

      <select name="dishSelect" size="6" v-if="dishes.filteredDishes.length > 0" @change="selectDish($event)">
        <option v-for="(dish, index) in dishes.filteredDishes" :key="index" :value="dish.id">{{ dish.name }}</option>
      </select>

      <select name="dishSelect" size="6" v-else @change="selectDish($event)">
        <option v-for="(dish, index) in dishes.allDishes" :key="index" :value="dish.id">{{ dish.name }}</option>
      </select>

      <button @click="searchDish">Пошук</button>
    </div>
  </main>
</template>

<style scoped src='../styles/recipe_style.css'></style>
