<script>
  export default {
    data() {
      return {
        menuItems: [] 
      };
    },
    created() {
      this.menuItems = [
        { name: 'Борщ', recipeLink: 'https://example.com/borch' },
        { name: 'Пельмені', recipeLink: 'https://example.com/pelmeni' }
      ];
    }
  };
  </script>
  
  <template>
    <div>
      <h1>Меню</h1>
      <h2>Назва меню</h2>
      <table>
        <thead>
          <tr>
            <th>Назва страви</th>
            <th>Посилання на рецепт</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dish, index) in menuItems" :key="index">
            <td>{{ dish.name }}</td>
            <td><a :href="dish.recipeLink" target="_blank">{{ dish.recipeLink }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped src="../styles/menu_style.css"></style>