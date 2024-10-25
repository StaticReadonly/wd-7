<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <RouterView />
</template>

<script>
    export default {
        mounted() {
            const script = document.createElement('script');
            script.setAttribute('src', 'https://kit.fontawesome.com/465d4025de.js');
            script.setAttribute('defer', 'defer');
            script.setAttribute('crossorigin', 'anonymous');
            document.head.appendChild(script);
        }
    }
</script>