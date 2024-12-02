<script>
import TagsManagement from '@/components/adminProfile/TagsManagement.vue';
import IngredientsManagement from '@/components/adminProfile/IngredientsManagement.vue';
import StepsManagement from '@/components/adminProfile/StepsManagement.vue';
import MenuManagement from '@/components/adminProfile/MenuManagement.vue';

export default {
  components: {
    TagsManagement,
    IngredientsManagement,
    StepsManagement,
    MenuManagement,
  },
  data() {
    return {
      newRecipe: {
        name: '',
        description: '',
        time: '',
        tags: [],
        ingredients: [],
        steps: [],
      },
      tags: {
        allTags: [],
        filteredTags: [],
        tagSearch: '',
      },
      ingredients: {
        allIngredients: [],
        filteredIngredients: [],
        ingredientSearch: '',
      },
    };
  },
  methods: {
    async searchTags(query) {
      if (!query) {
        this.tags.filteredTags = [];
        return;
      }
      if (query.length >= 3) {
        try {
          const response = await fetch('https://localhost:7015/api/tags/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ query: query }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Помилка на сервері');
          }

          const data = await response.json();
          this.tags.filteredTags = data;
        } catch (error) {
          alert(`Помилка під час пошуку тегу: ${error.message}`);
        }
      } else {
        alert('Для пошуку потрібно щонайменше 3 символи');
      }
    },

    addSelectedTag(tag) {
      if (tag && !this.newRecipe.tags.includes(tag)) {
        this.newRecipe.tags.push(tag);  
        this.tags.allTags.push(tag.id);
      }
    },

    async addTag(tag) {
      if (tag && !this.newRecipe.tags.some(t => t.name === tag.name)) {
        this.newRecipe.tags.push(tag.name);
        try {
          const response = await fetch('https://localhost:7015/api/tags/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name: tag.name,
              description: tag.description,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Помилка на сервері');
          }

          const data = await response.json();
          this.tags.allTags.push(data);
        } catch (error) {
          alert(`Не вдалося створити тег: ${error.message}`);
        }
      }
    },

    removeTag(index) {
      if (index !== -1) {
        this.newRecipe.tags.splice(index, 1);
      }
    },

    addSelectedIngredient(ingredient) {
      if (ingredient && !this.newRecipe.ingredients.includes(ingredient)) {
        this.newRecipe.ingredients.push(ingredient);  
        this.ingredients.allIngredients.push(ingredient);
      }
    },

    async addIngredient(ingredient) {
      if (ingredient && !this.newRecipe.ingredients.includes(ingredient)) {
        this.newRecipe.ingredients.push(ingredient);
        try {
          const response = await fetch('https://localhost:7015/api/ingredient/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name: ingredient.name,
              unit: ingredient.unit,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Помилка на сервері');
          }

          const data = await response.json();
          this.ingredients.allIngredients.push(data);
        } catch (error) {
          alert(`Не вдалося створити інгредієнт: ${error.message}`);
        }
      }
    },

    removeIngredient(index) {
      if (index !== -1) {
        this.newRecipe.ingredients.splice(index, 1);
      }
    },

    async searchIngredients(query) {
      if (!query) {
        this.ingredients.filteredIngredients = [];
        return;
      }
      if (query.length >= 3) {
        try {
          const response = await fetch('https://localhost:7015/api/ingredient/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ query: query }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Помилка на сервері');
          }

          const data = await response.json();
          this.ingredients.filteredIngredients = data;
        } catch (error) {
          alert(`Помилка під час пошуку інгредієнтів: ${error.message}`);
        }
      } else {
        alert('Для пошуку потрібно щонайменше 3 символи');
      }
    },

    async addRecipe() {
      try {
        const response = await fetch('https://localhost:7015/api/dish/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: this.newRecipe.name,
            description: this.newRecipe.description,
            time: this.newRecipe.time,
            steps: this.newRecipe.steps,
            components: this.ingredients.allIngredients.map(ingredient => ({
              id: ingredient.id,
              amount: ingredient.proportion,
            })),
            tags: this.tags.allTags
        }),
        });

        alert('Рецепт успішно доданий!');
        this.newRecipe = { name: '', description: '', time: '', tags: [], ingredients: [], steps: [] };
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Помилка на сервері');
        }
      } catch (error) {
        alert(`Не вдалося створити рецепт: ${error.message}`);
      }
    },

    addStep(newStep) {
      this.newRecipe.steps.push(newStep);
    },

    removeStep(index) {
      this.newRecipe.steps.splice(index, 1);
    },
  },
};
</script>

<template>
  <MenuManagement />

  <div class="recipe">
    <h1>Додати новий рецепт</h1>
    <form @submit.prevent="addRecipe">
      <label>
        Назва страви:
        <input v-model="newRecipe.name" type="text" placeholder="Додати назву страви" required />
      </label>
      <label>
        Опис:
        <textarea v-model="newRecipe.description" placeholder="Додати опис страви" required></textarea>
      </label>
      <label>
        Час приготування:
        <input v-model="newRecipe.time" type="time" step="2" required />
      </label>

      <TagsManagement
        :tags="newRecipe.tags"
        :allTags="tags.allTags"
        :filteredTags="tags.filteredTags"
        :tagSearch="tags.tagSearch"
        @add-tag="addTag"
        @remove-tag="removeTag"
        @search-tags="searchTags"
        @add-selected-tag="addSelectedTag"  
      />

      <IngredientsManagement
        :ingredients="newRecipe.ingredients"
        :allIngredients="ingredients.allIngredients"
        :filteredIngredients="ingredients.filteredIngredients"
        :ingredientSearch="ingredients.ingredientSearch"
        @add-ingredient="addIngredient"
        @remove-ingredient="removeIngredient"
        @search-ingredients="searchIngredients"
        @add-selected-ingredient="addSelectedIngredient"
      />

      <StepsManagement
        :steps="newRecipe.steps"
        @add-step="addStep"
        @remove-step="removeStep"
      />

      <button type="submit">Зберегти рецепт</button>
    </form>
  </div>
</template>

<style scoped src='../styles/admin_account_style.css'></style>
