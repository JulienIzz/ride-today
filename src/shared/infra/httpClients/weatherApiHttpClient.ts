import axios from "axios";

const baseUrl = "https://api.weatherapi.com/v1";
const apiKey = "9edd17adaf6c4920854124646242712";

export const weatherApiHttpClient = axios.create({
  baseURL: baseUrl,
  params: {
    key: apiKey,
  },
});
