import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
    first_name: '',
    last_name: '',
    role: '',
  }),
  actions: {
    setUser(userData) {
      this.email = userData.email;
      this.first_name = userData.first_name;
      this.last_name = userData.last_name;
      this.role = userData.role;
    },
    clearUser() {
      this.email = '';
      this.first_name = '';
      this.last_name = '';
      this.role = '';
    },
  },
  
});
