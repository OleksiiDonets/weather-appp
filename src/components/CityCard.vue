<template>
  <div class="relative flex py-5 px-3 shadow-md bg-green-200">
    <a class="absolute top-2 right-2 hover:text-red-500" type="button" @click.prevent="deleteItem">
      <font-awesome-icon icon="fa-trash-can" />
    </a>
    <!-- <button class="absolute top-2 left-2" type="button">
      <font-awesome-icon icon="fa-star" />
    </button> -->
    <div class="grid grid-flow-row w-full lg:grid-flow-col">
      <div class="img-wrap">
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherValue.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
      <div class="description">
        <h2 class="text-xl mb-2">{{ city.names[Translation.currentLocale].name }}</h2>
        <span> {{ city.names[Translation.currentLocale].state }}</span>
        <hr class="border-white border w-full my-2" />
        <p>{{ $t('weather.temp') }} : {{ Math.round(weatherValue.current.temp) }} &deg;</p>
        <p>{{ $t('weather.feel') }} {{ Math.round(weatherValue.current.feels_like) }} &deg;</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { weatherModel } from '../models/weather.model'
import Translation from '../i18n/translation'
const props = defineProps({
  city: Object
})
const emit = defineEmits(['delete-city'])
const weatherValue = ref(null)
const result = await weatherModel.getWeatherForecast({
  lat: props.city.coords.lat,
  lon: props.city.coords.lng
})
weatherValue.value = result

const deleteItem = () => {
  emit('delete-city', props.city.id)
}
</script>
