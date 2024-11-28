<script>
import DishManagement from '@/components/dishes/DishManagement.vue';
import CommentManagement from '@/components/dishes/CommentManagement.vue';

export default {
  components: {
    DishManagement,
    CommentManagement,
  },
  data() {
    return {
      recipe: null,
      comments: [],
      userName: this.getUserNameFromLocalStorage(), 
    };
  },
  created() {
    const recipeId = this.$route.params.id;
    this.loadRecipeData(recipeId);
  },
  methods: {
    loadRecipeData(recipeId) {
      const allRecipes = [];
      this.recipe = allRecipes.find((recipe) => recipe.id === recipeId) || null;
    },
    getUserNameFromLocalStorage() {
      return localStorage.getItem('userName') || ''; 
    },
    addComment(newComment) {
      const comment = {
        id: this.comments.length + 1,
        userName: newComment.userName,
        text: newComment.text,
      };
      this.comments.push(comment);
    },
  },
};
</script>

<template>
  <div>
    <div v-if="recipe">
      <DishManagement :recipe="recipe" />
      <CommentManagement 
        :comments="comments"
        :userName="userName"  
        :addCommentHandler="addComment"  
      />
    </div>
    <div v-else>
      <p>Рецепт не знайдено!</p>
    </div>
  </div>
</template>

<style scoped src='../styles/dish_style.css'></style>