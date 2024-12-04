<script>
export default {
  props: {
    comments: Array,        
    userName: String,       
  },
  data() {
    return {
      newComment: '',        
      editingCommentId: null, 
      editingCommentText: '', 
      commentSearch: '',      
    };
  },
  methods: {
    addComment() {
      if (this.userName && this.newComment.trim()) {
        this.$emit('add-comment', {
          userName: this.userName,
          text: this.newComment.trim(),
        });
        
        
        this.newComment = ''; 
      } else {
        alert('Будь ласка, введіть текст коментаря.');
      }
    },

    editComment(comment) {
      if (comment.canEdit) {
        this.editingCommentId = comment.id;
        this.editingCommentText = comment.text;
      } else {
        alert('Ви можете редагувати лише свої коментарі.');
      }
    },

    updateComment() {
      if (this.editingCommentText.trim()) {
        this.$emit('update-comment', this.editingCommentId, this.editingCommentText);
        this.editingCommentId = null;
        this.editingCommentText = ''; 
      } else {
        alert('Текст коментаря не може бути порожнім.');
      }
    },

    cancelEdit() {
      this.editingCommentId = null;
      this.editingCommentText = '';
    },
  },
};
</script>

<template>
  <div class="comments">
    <h4>Коментарі</h4>

    <div v-if="userName">
      <textarea v-model="newComment" placeholder="Напишіть коментар"></textarea>
      <button @click="addComment">Додати коментар</button>
    </div>
    <div v-else>
      <p class="warning-message">Для того, щоб додавати коментарі, будь ласка, зареєструйтеся.</p>
    </div>

    <div v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment">
          <strong>{{ comment.userName }}</strong>: 
          <span v-if="editingCommentId === comment.id">
            <textarea v-model="editingCommentText"></textarea>
            <button @click="updateComment">Оновити</button>
            <button @click="cancelEdit">Скасувати</button>
          </span>
          <span v-else>
            {{ comment.text }}
          </span>
          <div v-if="comment.canEdit">
          <button @click="editComment(comment)"><i class="fa-regular fa-pen-to-square"></i></button>
        </div>
        <p class="timestamp">{{ comment.timeStamp }}</p>
      </div>

      </div>
    </div>

    <div v-else>
      <p>Коментарів немає.</p>
    </div>
  </div>
</template>


<style scoped src='../../styles/dish_style.css'></style>