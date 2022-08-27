import http from "./httpService"
import config from "../config.json";
const API=config.api +"/movies";


export function getMovies() {
  return http.get(API);
}

export function deleteMovies(id){
  return http.delete(API+"/"+id);
}

export function saveMovie(movie) {
  return http.post(API,movie);
}

export function updateMovie(id,movie) {
  return http.put(API+"/"+id,movie);
}



