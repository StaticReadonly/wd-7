<script>
  export default {
    props: {
      steps: Array,
    },
    methods: {
      addStep() {
        this.$emit('add-step', { name: '', description: '', media: [] });
      },
      removeStep(index) {
        this.$emit('remove-step', index);
      },
      handleFileChange(event, stepIndex) {
        const file = event.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file); 
  
          const mediaFile = {
            file,
            url,
            type: file.type,
          };
  
          this.$set(this.steps, stepIndex, {
            ...this.steps[stepIndex],
            media: [...this.steps[stepIndex].media, mediaFile],
          });
        }
      },
      removeMedia(stepIndex, fileIndex) {
        this.$set(this.steps, stepIndex, {
          ...this.steps[stepIndex],
          media: this.steps[stepIndex].media.filter((_, index) => index !== fileIndex),
        });
      },
    },
  };
</script>

<template>
    <div>
      <h4>Спосіб приготування:</h4>
      <table>
        <thead>
          <tr>
            <th>Назва кроку</th>
            <th>Опис</th>
            <th>Медіа (фото/відео)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(step, index) in steps" :key="index">
            <td><input v-model="step.name" type="text" placeholder="Назва кроку" required /></td>
            <td><input v-model="step.description" type="text" placeholder="Опис" required /></td>
            <td>
              <input type="file" @change="handleFileChange($event, index)" accept="image/*, video/*" />
              <div v-if="step.media.length">
                <div v-for="(file, fileIndex) in step.media" :key="fileIndex">
                  <div v-if="file.type.startsWith('image/')">
                    <img :src="file.url" alt="media" width="100" />
                  </div>
                  <div v-if="file.type.startsWith('video/')">
                    <video :src="file.url" controls width="200"></video>
                  </div>
                  <button type="button" @click="removeMedia(index, fileIndex)">Видалити</button>
                </div>
              </div>
            </td>
            <td>
              <button type="button" @click="removeStep(index)">Видалити</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addStep">Додати крок</button>
    </div>
</template>
  
<style scoped src='../../styles/admin_account_style.css'></style>