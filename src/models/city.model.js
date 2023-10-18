import { CityService } from '../services/City.service'
const apiKey = import.meta.env.VITE_MAPBOX_API_KEY

export const cityModel = new CityService(apiKey)
