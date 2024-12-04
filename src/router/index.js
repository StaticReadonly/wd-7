import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FAQ from '@/views/FAQ.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SignupView from '@/views/SignupView.vue'
import AdminMenuView from '@/views/AdminMenuView.vue'
import UserMenuView from '@/views/UserMenuView.vue'
import AdminRecipeView from '@/views/AdminRecipeView.vue'
import UserRecipeView from '@/views/UserRecipeView.vue'
import DishView from '@/views/DishView.vue'
import MenuView from '@/views/MenuView.vue'

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
      path: '/admin/recipes',
      name: 'admin-recipes',
      component: AdminRecipeView
    },
    {
      path: '/user/recipes',
      name: 'user-recipes',
      component: UserRecipeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/admin/menu',
      name: 'admin-menu',
      component: AdminMenuView
    },
    {
      path: '/user/menu',
      name: 'user-menu',
      component: UserMenuView
    },
    {
      path: '/dish/:id',
      name: 'DishPage',
      component: DishView,
      props: true
    },
    {
      path: '/menu/:id',  
      name: 'menu',
      component: MenuView, 
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    }
  ]
})

export default router