<script>
export default {
  props: ['id'],
  data() {
    return {
      menu: null, 
    };
  },
  created() {
    this.fetchMenu(); 
  },
  methods: {
    async fetchMenu() {
      try {
        const response = await fetch(`https://localhost:7015/api/menu/${this.id}`, {
          method: 'POST', 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load a menu');
        }

        this.menu = await response.json(); 
      } catch (error) {
        alert(`Error while loading a menu: ${error.message}`); 
      }
    },
  },
};
</script>

<template>
  <div class="menu">
    <div v-if="menu">
      <h1>{{ menu.name }}</h1> 
      <p>{{ menu.description }}</p> 

      <div v-if="menu.dishesInfo && menu.dishesInfo.length > 0">
        <h3>Страви в меню</h3>
        <table>
          <thead>
            <tr>
              <th>Назва страви</th>
              <th>Опис страви</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dish in menu.dishesInfo" :key="dish.id">
              <td>{{ dish.name }}</td>
              <td>{{ dish.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>В цьому меню немає страв.</p>
      </div>
    </div>

    <div v-else>
      <p>Завантаження меню...</p>
    </div>
  </div>
</template>

<style scoped src="../styles/menu_style.css"></style>
