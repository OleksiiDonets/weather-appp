import axios from 'axios'
import Translation from '../i18n/translation'

export class CityService {
  languages = Translation.supportedLocales.join()
  constructor(apiToken) {
    this.token = apiToken
  }
  URL(place) {
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${this.token}&types=place&language=${this.languages}`
  }

  async getPlace(query) {
    try {
      const result = await axios.get(this.URL(query))
      return result.data
    } catch (eror) {
      console.error(eror)
    }
  }
}
