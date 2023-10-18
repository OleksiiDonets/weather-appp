<template>
  <Transition>
    <div class="flex flex-col items-center py-5">
      <p class="text-sm capitalize mb-5 text-center">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(Translation.currentLocale, {
            weekday: 'long',
            day: '2-digit',
            month: 'long'
          })
        }}
      </p>
      <h1 class="text-5xl text-center">{{ selectedCity.names[Translation.currentLocale].name }}</h1>
      <div class="text-center flex items-center flex-col mt-10">
        <p class="text-8xl mb-8">{{ Math.round(weatherData.current.temp) }}&deg;</p>
        <p>
          {{ $t('weather.feel') }}
          {{ Math.round(weatherData.current.feels_like) }} &deg;
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
      <h3>{{ $t('weather.hourly') }}</h3>
      <WeatherChart :chart-data="hourlyData" />
    </div>
  </Transition>
</template>
<script setup>
import { ref } from 'vue'
import Translation from '../i18n/translation'
import { useCitiesStore } from '../stores/cities'
import { weatherModel } from '../models/weather.model'
import WeatherChart from './WeatherChart.vue'
const hourlyData = ref(null)

const { selectedCity } = useCitiesStore()
const getWeather = async () => {
  const weatherData = await weatherModel.getWeatherForecast({
    lat: selectedCity.coords.lat,
    lon: selectedCity.coords.lng
  })

  const localOffset = new Date().getTimezoneOffset() * 60000
  const utc = weatherData.current.dt * 1000 + localOffset
  weatherData.currentTime = utc + 1000 * weatherData.timezone_offset

  weatherData.hourly.forEach((hour) => {
    const utc = hour.dt * 1000 + localOffset
    hour.currentTime = utc + 1000 * weatherData.timezone_offset
  })
  normalizeHourly(weatherData.hourly)
  return weatherData
}
const normalizeHourly = (dataset) => {
  const cutData = dataset.slice(0, 24)
  cutData.forEach((hour) => {
    hour.timeValue = new Date(hour.currentTime).toLocaleTimeString(Translation.currentLocale, {
      hour: 'numeric',
      minute: '2-digit'
    })
  })
  hourlyData.value = cutData
}
const weatherData = await getWeather()
</script>
