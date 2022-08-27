import http from "./httpService"
import config from "../config.json";

const API=config.api +"/genres";



export  function getGenres(){
    
    return http.get(API);

};






 