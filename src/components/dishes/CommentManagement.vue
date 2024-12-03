<script>
export default {
  props: {
    comments: Array,        // Список коментарів
    userName: String,       // Ім'я користувача
  },
  data() {
    return {
      newComment: '',        // Текст нового коментаря
      editingCommentId: null, // Id коментаря, що редагується
      editingCommentText: '', // Текст редагованого коментаря
      commentSearch: '',      // Текст для пошуку коментарів
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
      if (comment.userName === this.userName) {
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
  <div>
    <h4>Коментарі</h4>

    <div v-if="userName">
      <textarea v-model="newComment" placeholder="Напишіть коментар"></textarea>
      <button @click="addComment">Додати коментар</button>
    </div>
    <div v-else>
      <p>Для того, щоб додавати коментарі, будь ласка, зареєструйтеся.</p>
    </div>

    <div v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment">
          <strong>{{ userName }}</strong>: 
          <span v-if="editingCommentId === comment.id">
            <textarea v-model="editingCommentText"></textarea>
            <button @click="updateComment">Оновити</button>
            <button @click="cancelEdit">Скасувати</button>
          </span>
          <span v-else>
            {{ comment.text }}
          </span>
        </div>

        <div v-if="comment.userName === userName">
          <button @click="editComment(comment)">Редагувати</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Коментарів немає.</p>
    </div>
  </div>
</template>


<style scoped src='../../styles/dish_style.css'></style>