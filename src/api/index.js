import axios from "axios";
import { MARVEL_API_KEY } from "react-native-dotenv";

export function configure() {
  axios.defaults.baseURL = "https://gateway.marvel.com/v1/public";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Referer"] = "https://mouredev.com";
}

export function fetchHeroes() {
  const url =
    "/characters?limit=50&nameStartsWith=Spider&apikey=" + MARVEL_API_KEY;
  return axios.get(url);
}
