import { WeatherService } from '../services/Weather.service'
const apiKey = import.meta.env.VITE_API_KEY

export const weatherModel = new WeatherService(apiKey)
