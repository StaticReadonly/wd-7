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
    }
  },
  data() {
    return {
      newComment: {
        userName: '',
        text: ''
      }
    };
  },
  methods: {
    addComment() {
      if (this.newComment.userName && this.newComment.text) {
        this.addCommentHandler(this.newComment);
        this.newComment.userName = '';
        this.newComment.text = '';
      } else {
        alert('Будь ласка, введіть ім\'я та коментар.');
      }
    }
  }
};
</script>
  
<template>
    <div>
      <h3>Коментарі</h3>
      <div v-if="comments.length === 0">Коментарів немає.</div>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <strong>{{ comment.userName }}</strong>: {{ comment.text }}
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
  