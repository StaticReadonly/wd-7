<script>
export default {
  data() {
    return {
      menuSearch: '',           
      filteredMenus: [],        
      allMenus: [],            
    };
  },
  methods: {
    async searchQuery() {
      const query = this.menuSearch;
      if (query.trim() === '') {
        this.filteredMenus = [];  
      } else {
        if (query.length >= 3) {
          try {
            const response = await fetch('https://localhost:7015/api/menu/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({ query }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Server error');
            }
            const data = await response.json();
            this.filteredMenus = data;
          } catch (error) {
            console.error(`Error while searching for a menu: ${error.message}`);
          }
        } else {
          alert('Для пошуку потрібно щонайменше 3 символи');
        }
      }
    },

    selectMenu(event) {
      const selectedMenuId = event.target.value; 
      if (selectedMenuId) {
        this.goToDishPage(selectedMenuId);
      } else {
        alert('Меню не вибрано!');
      }
    },

    goToDishPage(menuId) {
      if (menuId) {
        this.$router.push(`/menu/${menuId}`);
      } else {
        alert('Меню не знайдено!');
      }
    },
  },
};
</script>
  
<template>
  <div class="background-container">
    <div class="search-menu">
      <h3>Пошук меню</h3>
      <div class="search-container">
        <input v-model="menuSearch" type="search" placeholder="Пошук меню" />
        <button type="button" @click="searchQuery"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <select v-if="filteredMenus.length > 0" @change="selectMenu">
        <option value="" disabled selected>Виберіть меню</option>
        <option v-for="menu in filteredMenus" :key="menu.id" :value="menu.id">
          {{ menu.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped src="../styles/menu_style.css"></style>
