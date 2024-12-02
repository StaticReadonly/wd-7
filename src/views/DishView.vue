<script>
import { ref } from 'vue'; 
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
      comments: ref([]), 
      userName: this.useUserStore().first_name,
    };
  },
  created() {
    const recipeId = this.$route.params.id; 
    this.loadRecipeData(recipeId);  
    this.loadComments(recipeId);   
  },
  methods: {
    async loadRecipeData(recipeId) {
      try {
        const response = await fetch(`https://localhost:7015/api/dish/info/${recipeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Не вдалося завантажити страву');
        }

        const recipeData = await response.json();
        this.recipe = recipeData; 
      } catch (error) {
        console.error('Помилка при завантаженні страви:', error);
      }
    },

    async loadComments(recipeId) {
      try {
        const response = await fetch(`https://localhost:7015/api/comment/${recipeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Не вдалося завантажити коментарі');
        }

        const loadedComments = await response.json();
        this.comments = loadedComments.map(comment => ({
          id: comment.id,
          userName: comment.userName,
          text: comment.text,
        }));
      } catch (error) {
        console.error('Помилка при завантаженні коментарів:', error);
      }
    },

    async addComment(newComment) {
      const recipeId = this.$route.params.id;  
      try {
        const response = await fetch(`https://localhost:7015/api/comment/${recipeId}/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ 
            text: newComment.text 
          }), 
        });

        if (!response.ok) {
          throw new Error('Не вдалося додати коментар');
        }

        const addedComment = await response.json();
        this.comments.push({
          id: addedComment.id,
          userName: this.userName,
          text: addedComment.text,
        });
      } catch (error) {
        console.error('Помилка при додаванні коментаря:', error);
      }
    },

    async updateComment(commentId, newText) {
      try {
        const response = await fetch(`https://localhost:7015/api/comment/${commentId}/edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ newtext: newText }), 
        });

        if (!response.ok) {
          throw new Error('Не вдалося оновити коментар');
        }

        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
          comment.text = newText;
        }
      } catch (error) {
        console.error('Помилка при оновленні коментаря:', error);
      }
    },
  },
};
</script>

<template>
  <div>
    <DishManagement :recipe="recipe" />
    <section class="comments">
      <CommentManagement
        :comments="comments" 
        :addCommentHandler="addComment"
        :updateCommentHandler="updateComment"
        :userName="userName" 
      />
    </section> 
  </div>
</template>

<style scoped src='../styles/dish_style.css'></style>
