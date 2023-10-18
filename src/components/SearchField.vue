<template>
  <div class="flex relative">
    <input
      type="text"
      v-model="searchValue"
      @input="getSearchResult"
      :placeholder="$t('search.placeholder')"
      class="shadow-md rounded-md w-full bg-stone-100 text-xl px-2 py-3 focus:outline-none focus:shadow-green-700 focus:shadow-md"
    />
    <ul
      class="absolute z-10 w-full shadow-md py-2 px-2 top-14 bg-stone-100 rounded-md shadow-green-300"
      v-if="searchResults"
    >
      <li
        v-for="city in searchResults"
        :key="city.id"
        class="cursor-pointer py-3 hover:bg-green-200 px-2"
        @click="selectCity(city)"
      >
        {{ city.place_name }}
      </li>
    </ul>
    <MainModal :modal-show="errorDuplicate" @modal-close="closeDuplicate">
      <template #header>
        <div class="flex flex-row text-lg py-4 border-b border-gray-600">
          {{ $t('errorDuplicate.title') }}
        </div>
      </template>
      <template #body>
        <div class="p-10 text-md text-center">
          <p>
            {{ $t('errorDuplicate.message') }}
          </p>
        </div>
      </template>
      <template #confirm>
        <button class="bg-red-700 text-white rounded-md py-2 px-6" @click="closeDuplicate">
          {{ $t('main.close') }}
        </button>
      </template>
    </MainModal>
    <MainModal :modal-show="errorCount" @modal-close="closeCount">
      <template #header>
        <div class="flex flex-row text-lg py-4 border-b border-gray-600">
          {{ $t('errorCount.title') }}
        </div>
      </template>
      <template #body>
        <div class="p-10 text-md text-center">
          <p>
            {{ $t('errorCount.message') }}
          </p>
        </div>
      </template>
      <template #confirm>
        <button class="bg-red-700 text-white rounded-md py-2 px-6" @click="closeCount">
          {{ $t('main.close') }}
        </button>
      </template>
    </MainModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import debounce from 'lodash.debounce'
import { cityModel } from '../models/city.model'
import { useCitiesStore } from '../stores/cities'
import MainModal from './MainModal.vue'
import Translation from '../i18n/translation'

const searchValue = ref('')
const searchResults = ref(null)
const store = useCitiesStore()
const { cities, addCity, closeDuplicate, closeCount } = store

const getSearchResult = debounce(async () => {
  if (searchValue.value !== '') {
    const result = await cityModel.getPlace(searchValue.value)
    searchResults.value = result.features
    return
  }
  searchResults.value = null
}, 300)
const { errorDuplicate, errorCount } = storeToRefs(store)

const cityNames = (city) => {
  let nameObj = {}
  const locales = Translation.supportedLocales
  for (let i = 0; i < locales.length; i++) {
    let [nameCity, stateCity] = city[`place_name_${locales[i]}`].split(',')
    nameObj[locales[i]] = { name: nameCity, state: stateCity }
  }
  return nameObj
}
const selectCity = (city) => {
  if (cities.length < 5) {
    const names = cityNames(city)
    const cityObj = {
      id: city.id,
      names: names,
      coords: {
        lat: city.geometry.coordinates[1],
        lng: city.geometry.coordinates[0]
      }
    }
    addCity(cityObj)
    searchResults.value = null
    searchValue.value = ''
  } else {
    errorCount.value = true
  }
}
</script>
