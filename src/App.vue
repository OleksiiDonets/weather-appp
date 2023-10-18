<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppNavigation from './components/AppNavigation.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-green-100">
    <AppNavigation />
    <RouterView />
  </div>
</template>
