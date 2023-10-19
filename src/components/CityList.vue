<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <Suspense>
      <CityCard
        v-for="item in cities"
        :key="item.id"
        :city="item"
        @delete-city="modalHandler"
        @to-detail="goToWeatherPage"
      />
      <template #fallback>
        <div class="grid grid-flow-row grid-cols-[1fr_2fr]">
          <div class="flex py-5 px-3 shadow-md bg-green-200">
            <SkeletonItem />
          </div>
          <div class="bg-green-200">
            <SkeletonItem />
          </div>
        </div>
      </template>
    </Suspense>
    <MainModal :modal-show="deleteModal" @modal-close="deleteHandler">
      <template #header>
        <div class="flex flex-row text-lg py-4 border-b border-gray-600">
          {{ $t('deleteModal.title') }}
        </div>
      </template>
      <template #body>
        <div class="p-10 text-md text-center">
          <p>
            {{ $t('deleteModal.message') }}
          </p>
        </div>
      </template>
      <template #confirm>
        <button class="bg-red-700 text-white rounded-md py-2 px-6" @click="deleteHandler">
          {{ $t('main.delete') }}
        </button>
      </template>
    </MainModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCitiesStore } from '../stores/cities'
import CityCard from './CityCard.vue'
import SkeletonItem from './SkeletonItem.vue'
import MainModal from './MainModal.vue'

const store = useCitiesStore()
const { removeCity, selectCity } = store
const { cities } = storeToRefs(store)
const deleteModal = ref(false)
const cityId = ref(null)
const modalHandler = (id) => {
  deleteModal.value = true
  cityId.value = id
}
const deleteHandler = (params) => {
  if (!params) {
    deleteModal.value = false
    return
  }
  removeCity(cityId.value)
  deleteModal.value = false
}
const router = useRouter()
const goToWeatherPage = async (cityObj) => {
  selectCity(cityObj.id)
  await router.push({
    name: 'weather',
    params: { city: cityObj.names.en.name }
  })
}
</script>
