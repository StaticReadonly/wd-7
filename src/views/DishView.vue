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
    async loadRecipeData() {
      try {
        const response = await fetch(`https://localhost:7015/api/dish/info/${this.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load dish');
        }

        const recipeData = await response.json();
        this.recipe = recipeData; 
      } catch (error) {
        console.error('Error loading a dish:', error);
      }
    },

    async loadComments() {
      try {
        const response = await fetch(`https://localhost:7015/api/comment/${this.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Could not load comments');
        }
        const loadedComments = await response.json();
        console.log(loadedComments);
        this.comments = loadedComments.map(comment => {
          const formattedTimeStamp = new Date(comment.timeStamp).toLocaleString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          return {
            id: comment.id,
            userName: comment.ownerInfo.first_Name,
            timeStamp: formattedTimeStamp, 
            canEdit: comment.canEdit,
            text: comment.text,
          };
        });

      } catch (error) {
        console.error('Error loading comments:', error);
      }
    },

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
          throw new Error('Could not add comment');
        }

        await this.loadComments();
      } catch (error) {
        console.error('Error adding a comment:', error);
      }
    },

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
          throw new Error('Could not update comment');
        }

        const comment = this.comments.find(c => c.id === updatedCommentId);
        if (comment) {
          comment.text = updatedCommentText; 
        }
      } catch (error) {
        console.error('Error updating a comment:', error);
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
