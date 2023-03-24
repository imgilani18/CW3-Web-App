const API_URL = 'https://18.223.106.157:3000'
export function fetchApi(path, data) { 
  console.log("hehehehetalhaaaaaaaae");
  return fetch(API_URL + path, data); 
}
