import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', () => {
  const cities = ref([])
  const errorDuplicate = ref(false)
  const errorCount = ref(false)
  const selectedCity = ref(null)

  function addCity(city) {
    const duplicate = cities.value.some((item) => item.id === city.id)
    if (!duplicate && cities.value.length < 5) {
      cities.value.push(city)
      localStorage.setItem('cities', JSON.stringify(cities.value))
      errorDuplicate.value = false
    } else if (cities.value.length >= 5) {
      errorCount.value = true
    } else {
      errorDuplicate.value = true
    }
  }

  function loadSavedCity() {
    if (localStorage.getItem('cities')) {
      cities.value = JSON.parse(localStorage.getItem('cities'))
    }
    return
  }
  function closeDuplicate() {
    errorDuplicate.value = false
  }
  function closeCount() {
    errorCount.value = false
  }

  function removeCity(cityId) {
    cities.value = cities.value.filter((item) => item.id !== cityId)
    localStorage.setItem('cities', JSON.stringify(cities.value))
  }

  function selectCity(cityId) {
    selectedCity.value = cities.value.find((item) => item.id === cityId)
  }
  function addToFavorites(cityId) {}
  return {
    cities,
    addCity,
    loadSavedCity,
    errorDuplicate,
    errorCount,
    closeDuplicate,
    closeCount,
    removeCity,
    selectedCity,
    selectCity
  }
})
