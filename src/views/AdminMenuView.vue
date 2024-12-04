<script>
import MenuManagement from '@/components/admin/MenuManagement.vue';

export default {
  components: {
    MenuManagement,
  },
  data() {
    return {
      menu: {
        name: '',
        description: '',
      },
      dishes: {
        allDishes: [],
        filteredDishes: [],
      },
    };
  },
  methods: {
    async searchDishes(query) {
      if (!query) {
        this.dishes.filteredDishes = [];
        return;
      }

      if (query.length >= 3) {
        try {
          const response = await fetch('https://localhost:7015/api/dish/search', {
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
          this.dishes.filteredDishes = data;
        } catch (error) {
          console.error(`Error while searching for a dish: ${error.message}`);
        }
      } else {
        alert('Для пошуку потрібно щонайменше 3 символи');
      }
    },

    addSelectedDish(dish) {
      if (dish && !this.dishes.allDishes.some(d => d.id === dish.id)) {
        this.dishes.allDishes = [...this.dishes.allDishes, dish];
      }
    },

    removeDish(index) {
      if (index !== -1) {
        this.dishes.allDishes.splice(index, 1);
      }
    },

    async addMenu() {
      try {
        const res = await fetch('https://localhost:7015/api/menu/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: this.menu.name,
            description: this.menu.description,
            dishes: this.dishes.allDishes.map(dish => dish.id),
          }),
        });

        if (res.ok) {
          alert('Меню успішно створено!');
          this.menu.name = '';
          this.menu.description = '';
          this.dishes.allDishes = [];
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Server error');
        }
      } catch (error) {
        console.error(`Failed to create menu: ${error.message}`);
      }
    },
  },
};
</script>

<template>
  <div class="recipe">
    <h1>Управління меню</h1>
    <label for="menuName">Назва меню:</label>
    <input v-model="menu.name" id="menuName" type="text" placeholder="Введіть назву меню" />

    <label for="menuDesc">Опис меню:</label>
    <input v-model="menu.description" id="menuDesc" type="text" placeholder="Введіть опис меню" />

    <MenuManagement
      :menu="menu"
      :dishes="dishes"
      :allDishes="dishes.allDishes"
      :filteredDishes="dishes.filteredDishes"
      @update-menu="updateMenu"
      @search-dishes="searchDishes"
      @add-selected-dish="addSelectedDish"
      @remove-dish="removeDish"
    />
    <button @click="addMenu">Зберегти меню</button>
  </div>
</template>

<style scoped src='../styles/admin_account_style.css'></style>
