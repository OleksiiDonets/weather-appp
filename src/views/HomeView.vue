<template>
  <main class="container">
    <div class="flex flex-col px-10 py-10">
      <div class="py-5">
        <SearchField />
      </div>
      <div>
        <CityList />
      </div>
    </div>
  </main>
</template>

<script setup>
import CityList from '../components/CityList.vue'
import SearchField from '../components/SearchField.vue'
import { useCitiesStore } from '../stores/cities'
const { loadSavedCity } = useCitiesStore()
loadSavedCity()
</script>
