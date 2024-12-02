<script>
  export default {
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
<template>
    <div class="recipe-container">
      <h1>{{ recipe.title }}</h1>
      <p>{{ recipe.description }}</p>
  
      <div class="tags">
        <ul>
          <li v-for="(tag, index) in recipe.tags" :key="index" class="tag">{{ tag }}</li>
        </ul>
      </div>
  
      <h2>Інгредієнти</h2>
      <table>
        <thead>
          <tr>
            <th>Інгредієнт</th>
            <th>Пропорція</th>
            <th>Одиниця вимірювання</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.quantity }}</td>
            <td>{{ ingredient.unit }}</td>
          </tr>
        </tbody>
      </table>
  
      <h2>Кроки приготування</h2>
      <ol>
        <li v-for="(step, index) in recipe.steps" :key="index">
          <p>{{ step.description }}</p>
          <div v-if="step.media">
            <div v-if="step.media.type === 'image'">
              <img :src="step.media.url" :alt="'Крок ' + (index + 1)" />
            </div>
            <div v-if="step.media.type === 'video'">
              <video controls>
                <source :src="step.media.url" type="video/mp4" />
                Відео недоступне.
              </video>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </template>
  
  <style scoped src='../../styles/dish_style.css'></style> 