<script>
import { useUserStore } from '@/stores/userStore';
import DishManagement from '@/components/dishes/DishManagement.vue';
import CommentManagement from '@/components/dishes/CommentManagement.vue';

export default {
  props: ['id'],
  components: {
    DishManagement,
    CommentManagement,
  },
  data() {
    return {
      recipe: null,
      comments: [], 
      userName: useUserStore().first_name, 
    };
  },
  created() {
    this.loadRecipeData();  
    this.loadComments();   
  },
  methods: {
    
    // Завантаження даних про страву
    async loadRecipeData() {
      try {
        const response = await fetch(`https://localhost:7015/api/dish/info/${this.id}`, {
          method: 'POST',
          headers: {
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

    // Завантаження коментарів
    async loadComments() {
      try {
        const response = await fetch(`https://localhost:7015/api/comment/${this.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Не вдалося завантажити коментарі');
        }
        const loadedComments = await response.json();
        console.log(loadedComments);
        this.comments = loadedComments.map(comment => ({
          id: comment.id,
          userName: comment.ownerInfo.first_Name,
          text: comment.text,
        }));
      } catch (error) {
        console.error('Помилка при завантаженні коментарів:', error);
      }
    },

    // Додавання нового коментаря
    async addComment(newComment) {
      try {
        const response = await fetch(`https://localhost:7015/api/comment/${this.id}/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ text: newComment.text }), 
        });

        if (!response.ok) {
          throw new Error('Не вдалося додати коментар');
        }

        // Завантажуємо нові коментарі після додавання
        await this.loadComments();
      } catch (error) {
        console.error('Помилка при додаванні коментаря:', error);
      }
    },

    // Оновлення коментаря
    async updateComment(updatedCommentId, updatedCommentText) {
      try {
        const response = await fetch(`https://localhost:7015/api/comment/${updatedCommentId}/edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ newtext: updatedCommentText }), 
        });

        if (!response.ok) {
          throw new Error('Не вдалося оновити коментар');
        }

        const comment = this.comments.find(c => c.id === updatedCommentId);
        if (comment) {
          comment.text = updatedCommentText; 
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
    <CommentManagement
      :comments="comments"
      :userName="userName"
      @add-comment="addComment"
      @update-comment="updateComment"
    />
  </div>
</template>

<style scoped src='../styles/dish_style.css'></style>
