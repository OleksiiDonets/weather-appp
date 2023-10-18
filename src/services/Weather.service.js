import axios from 'axios'
import Translation from '../i18n/translation'

export class WeatherService {
  language = Translation.currentLocale
  constructor(apiKey) {
    this.key = apiKey
  }

  URL(coords) {
    return `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${this.key}&lang=${this.language}&units=metric`
  }

  async getWeatherForecast(params) {
    try {
      const result = await axios.get(this.URL(params))
      return result.data
    } catch (e) {
      console.error(e)
    }
  }
}
