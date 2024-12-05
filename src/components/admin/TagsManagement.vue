<script>
export default {
  props: {
    tags: Array,          
    allTags: Array,       
    filteredTags: Array,  
  },
  data() {
    return {
      tagSearch: '',       
      tagAdd: {
        id: '',              
        name: '',
        description: '',
      },          
    };
  },
  methods: {
    searchQuery() {
      this.$emit('search-tags', this.tagSearch.trim());  
    },

    addSelectedTag(selectedName) {
      if (!this.tags.some(tag => tag.name === selectedName)) {
        const selectedTag = this.filteredTags.find(tag => tag.name === selectedName);
        
        if (selectedTag) {
  
          this.$emit('add-selected-tag', {
            id: selectedTag.id,       
            name: selectedTag.name
          });
        }
      }
    },

    selectTag(event) {
      const selectedName = event.target.value;
      this.addSelectedTag(selectedName);  

      this.tagSearch = '';  
      this.$emit('search-tags', '');  
    },

    addTag() {
      const newTag = this.tagAdd.name.trim();  
      const newTagDescription = this.tagAdd.description.trim();  

      if (newTag && !this.tags.some(t => t.name === newTag)) {
 
        const newTagData = { 
          id: this.tagAdd.id,       
          name: newTag, 
          description: newTagDescription
        };

        this.$emit('add-tag', newTagData);  
        this.$emit('add-all-tag', newTagData);  

        this.tagAdd.name = '';
        this.tagAdd.description = '';
        this.tagAdd.id = ''; 
      }
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
      <input v-model="tagSearch" type="search" placeholder="Пошук тегу"/>
      <button type="button" @click="searchQuery"><i class="fa-solid fa-magnifying-glass"></i></button> 

      <select v-if="filteredTags.length > 0" @change="selectTag">
        <option value="" disabled selected>Виберіть тег</option>
        <option v-for="tag in filteredTags" :key="tag.id" :value="tag.name">
          {{ tag.name }}
        </option>
      </select>
    </div>

    <h4>Створити новий тег:</h4>
    <input v-model="tagAdd.name" type="text" placeholder="Додати новий тег"/>
    <textarea v-model="tagAdd.description" placeholder="Додати опис тегу"></textarea>

    <button type="button" @click="addTag">Додати тег</button>

    <div class="tags">
      <span v-for="(tag, index) in tags" :key="tag.id" class="tag">
        {{ tag.name }}
        <button type="button" @click="removeTag(index)">×</button>
      </span>
    </div>
  </div>
</template>

<style scoped src='../../styles/admin_account_style.css'></style>
