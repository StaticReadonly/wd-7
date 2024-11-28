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
        title: '',
        description: '',
        tags: [],
        ingredients: [],
        steps: [],
      },
      tags: {
        allTags: [
          { name: 'Вегетаріанське', description: 'Страва без м’яса' },
          { name: 'Пісне', description: 'Не містить продуктів тваринного походження' },
          { name: 'Гостре', description: 'Містить гострі спеції' },
          { name: 'Без глютену', description: 'Підходить для безглютенової дієти' },
        ],
        filteredTags: [],
        tagSearch: '',
      },
      ingredients: {
        allIngredients: ['Борошно', 'Молоко', 'Яйця', 'Масло'],
        filteredIngredients: [],
        ingredientSearch: '',
      },
    };
  },
  methods: {
    filterTags() {
      this.tags.filteredTags = this.tags.allTags.filter(tag =>
        tag.name.toLowerCase().includes(this.tags.tagSearch.toLowerCase()) && 
        !this.newRecipe.tags.some(t => t.name === tag.name));
    },

    async addTag(tag) {
      if (tag && !this.newRecipe.tags.some(t => t.name === tag.name)) {
        this.newRecipe.tags.push(tag);
        try {
          const response = await fetch('https://localhost:7015/api/tag/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
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

    addAllTag(tag) {
      if (tag && !this.tags.allTags.some(t => t.name === tag.name)) {
        this.tags.allTags.push(tag);
      }
    },

    addIngredient(ingredient) {
      if (ingredient && !this.newRecipe.ingredients.includes(ingredient)) {
        this.newRecipe.ingredients.push(ingredient);
      }
    },

    addAllIngredient(ingredient) {
      if (ingredient && !this.ingredients.allIngredients.includes(ingredient)) {
        this.ingredients.allIngredients.push(ingredient);
      }
    },

    removeIngredient(index) {
      if (index !== -1) {
        this.newRecipe.ingredients.splice(index, 1);
      }
    },

    filterIngredients() {
      this.ingredients.filteredIngredients = this.ingredients.allIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(this.ingredients.ingredientSearch.toLowerCase()) &&
        !this.newRecipe.ingredients.includes(ingredient));
    },

    addRecipe() {
      if (
        this.newRecipe.title &&
        this.newRecipe.description &&
        this.newRecipe.ingredients.length &&
        this.newRecipe.steps.length
      ) {
        alert('Рецепт успішно доданий!');
        this.newRecipe = { title: '', description: '', tags: [], ingredients: [], steps: [] };
      } else {
        alert('Будь ласка, заповніть всі поля рецепту!');
      }
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
        <input v-model="newRecipe.title" type="text" placeholder="Додати назву страви" required />
      </label>
      <label>
        Опис:
        <textarea v-model="newRecipe.description" placeholder="Додати опис страви" required></textarea>
      </label>

      <TagsManagement
        :tags="newRecipe.tags"
        :allTags="tags.allTags"
        :filteredTags="tags.filteredTags"
        :tagSearch="tags.tagSearch"
        @add-tag="addTag"
        @remove-tag="removeTag"
        @add-all-tag="addAllTag"
        @filter-tags="filterTags"  
      />

      <IngredientsManagement
        :ingredients="newRecipe.ingredients"
        :allIngredients="ingredients.allIngredients"
        :filteredIngredients="ingredients.filteredIngredients"
        :ingredientSearch="ingredients.ingredientSearch"
        @add-ingredient="addIngredient"
        @remove-ingredient="removeIngredient"
        @add-all-ingredient="addAllIngredient"
        @filter-ingredients="filterIngredients"
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
