<template>
    <tr>
      <td>
        <input type="checkbox" v-model="localUser.checked" @change="updateChecked" />
      </td>
      <td>{{ localUser.email }}</td>
      <td>{{ localUser.surname }}</td>
      <td>{{ localUser.firstName }}</td>
      <td>{{ localUser.phone }}</td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localUser: { ...this.user }
      };
    },
    watch: {
      user: {
        handler(newUser) {
          this.localUser = { ...newUser };
        },
        deep: true
      }
    },
    methods: {
      updateChecked() {
        this.$emit('update-checked', { id: this.localUser.id, checked: this.localUser.checked });
      }
    }
  };
  </script>