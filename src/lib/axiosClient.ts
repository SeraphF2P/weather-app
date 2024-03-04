import Axios from "axios";


const OPENWETHER_API = Axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  params: {
    appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY
  }
});
OPENWETHER_API.interceptors.request.use((config) => {
  return config;
});
OPENWETHER_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
  }
);
const GEO_API = Axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_Geo_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
});

GEO_API.interceptors.request.use((config) => {
  return config;
});
GEO_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
  }
);
const axios = {
  OPENWETHER_API,
  GEO_API
}
export default axios;
