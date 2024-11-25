import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FAQ from '@/views/FAQ.vue'
import LoginView from '@/views/LoginView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import SignupView from '@/views/SignupView.vue'
import AdminProfileView from '@/views/AdminProfileView.vue'
import MenuView from '@/views/MenuView.vue'
import RecipeView from '@/views/RecipeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin/profile',
      name: 'admin-profile',
      component: AdminProfileView
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: UserProfileView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    }
  ]
})

export default router