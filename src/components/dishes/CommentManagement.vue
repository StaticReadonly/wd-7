<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    },
    addCommentHandler: {
      type: Function,
      required: true
    },
    updateCommentHandler: {
      type: Function,
      required: true
    },
    userName: { 
      type: String,
      required: true
    }
  },
  data() {
    return {
      newComment: {
        text: ''
      },
      editingCommentId: null,
      editingCommentText: ''
    };
  },
  methods: {
    addComment() {
      if (this.userName && this.newComment.text) {
        this.addCommentHandler({
          userName: this.userName,
          text: this.newComment.text
        });
        this.newComment.text = '';
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
        this.updateCommentHandler(this.editingCommentId, this.editingCommentText);
        this.editingCommentId = null;
        this.editingCommentText = '';
      } else {
        alert('Текст коментаря не може бути порожнім.');
      }
    },
    cancelEdit() {
      this.editingCommentId = null;
      this.editingCommentText = '';
    }
  }
};
</script>

<template>
  <div>
    <h3>Коментарі</h3>
    <div v-if="comments.length === 0">Коментарів немає.</div>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div v-if="editingCommentId === comment.id">
        <textarea v-model="editingCommentText"></textarea>
        <button @click="updateComment">Зберегти</button>
        <button @click="cancelEdit">Скасувати</button>
      </div>
      <div v-else>
        <strong>{{ comment.userName }}</strong>: {{ comment.text }}
        <button v-if="comment.userName === userName" @click="editComment(comment)">
          Редагувати
        </button>
      </div>
    </div>
    <div v-if="!userName">
      <p>Для того, щоб додавати коментарі, будь ласка, зареєструйтеся.</p>
    </div>
    <div v-else>
      <textarea v-model="newComment.text" placeholder="Напишіть коментар"></textarea>
      <button @click="addComment">Додати коментар</button>
    </div>
  </div>
</template>

<style scoped src='../../styles/dish_style.css'></style>
