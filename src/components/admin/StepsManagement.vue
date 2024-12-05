<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      stepAdd: {
        name: '',
        description: '', 
        step_number: '',
      },
    };
  },
  methods: {
    addStep() {
      const newStepName = this.stepAdd.name.trim(); 

      if (newStepName && !this.steps.some((step) => step.name === newStepName)) {
        
        const step_number = this.steps.length + 1; 

        const newStep = {
          step_number: step_number,
          name: newStepName,
          description: this.stepAdd.description.trim(),
          media: this.stepAdd.media,
        };

        this.$emit('add-step', newStep);
        this.$emit('add-all-steps', newStepName);

        this.stepAdd.name = '';
        this.stepAdd.description = '';
      }
    },

    removeStep(index) {
      this.$emit('remove-step', index); 
    }
  }
};
</script>

<template>
  <div>
    <h4>Спосіб приготування:</h4>
    <input v-model="stepAdd.name" type="text" placeholder="Додати крок"/>
    <input v-model="stepAdd.description" type="text" placeholder="Додати опис" />
    <button type="button" @click="addStep">Додати крок</button>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Назва кроку</th>
          <th>Опис</th>
          <th>Медіа(фото/відео)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(step, index) in steps" :key="index">
          <td>{{ step.step_number }}</td> 
          <td>{{ step.name }}</td>
          <td>{{ step.description }}</td>
          <td><input type="file" name="material" accept="image/*, video/*" /></td>
          <td>
            <button type="button" @click="removeStep(index)"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped src='../../styles/admin_account_style.css'></style>
