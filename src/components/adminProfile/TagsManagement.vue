<script>
export default {
  props: {
    tags: Array, 
    allTags: Array, 
  },
  data() {
    return {
      tagSearch: '',  
      tagAdd: '', 
      tagDescription: '', 
      filteredTags: [],  
    };
  },
  methods: {
    filterTags() {
      this.filteredTags = this.allTags.filter(tag => 
        tag.name.toLowerCase().includes(this.tagSearch.toLowerCase()) && 
        !this.tags.some(t => t.name === tag.name)  
      );
    },

    selectTag(event) {
      const selectedTag = event.target.value;
      if (selectedTag && !this.tags.some(t => t.name === selectedTag)) {
        this.$emit('add-tag', { name: selectedTag, description: '' });  
        this.tagSearch = ''; 
        this.filteredTags = [];  
      }
    },

    addTag() {
      const newTag = this.tagAdd.trim();
      const newDescription = this.tagDescription.trim();
      if (newTag && !this.tags.some(t => t.name === newTag)) {
        this.$emit('add-tag', { name: newTag, description: newDescription }); 
        if (!this.allTags.some(t => t.name === newTag)) {
          this.$emit('add-all-tag', { name: newTag, description: newDescription });  
        }
      }
      this.tagAdd = '';  
      this.tagDescription = '';  
    },

    removeTag(index) {
      this.$emit('remove-tag', index);  
    }
  },
};
</script>

<template>
  <div>
    <h4>Теги:</h4>
    <div>
      <input v-model="tagSearch" type="text" placeholder="Пошук тегу"/>
      <button type="button" @click="filterTags">Пошук</button> 

      <select v-if="filteredTags.length > 0" @change="selectTag">
        <option value="" disabled selected>Виберіть тег</option>
        <option v-for="(tag, index) in filteredTags" :key="index" :value="tag.name">
          {{ tag.name }}
        </option>
      </select>
    </div>

    <input v-model="tagAdd" type="text" placeholder="Додати новий тег"/>
    <textarea v-model="tagDescription" placeholder="Додати опис тегу"></textarea>

    <button type="button" @click="addTag">Додати тег</button>

    <div class="tags">
      <span v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag.name }}
        <button type="button" @click="removeTag(index)">×</button>
      </span>
    </div>
  </div>
</template>

<style scoped src='../../styles/admin_account_style.css'></style>
