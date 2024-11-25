<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const recipes = ref([]);

const fetchRecipes = async () => {
  try {
    const response = await axios.get('http://your-api-url/recipes');  
    recipes.value = response.data;  
  } catch (error) {
    console.error('Помилка при завантаженні рецептів:', error);
  }
};

onMounted(() => {
  fetchRecipes();
});
</script>

<template>
    <main>
      <h1>Рецепти</h1>  
      <section class="recipe-list">
        <div v-if="recipes.length > 0" class="recipe-cards">
          <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
            <h3>{{ recipe.title }}</h3>  
            <p>{{ recipe.description }}</p>  
            <p>
              <span v-for="(tag, index) in recipe.tags" :key="index" class="tag">
                {{ tag }}<span v-if="index < recipe.tags.length - 1"></span>  
              </span>
            </p>
  
            <button @click="viewRecipe(recipe.id)">Переглянути</button>  
          </div>
        </div>
        <p v-else>Немає рецептів для відображення.</p>
      </section>
    </main>
</template>

<style scoped src='../styles/recipe_style.css'></style>
