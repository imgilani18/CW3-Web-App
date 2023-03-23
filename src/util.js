const API_URL = 'https://3.133.154.7:3000'
export function fetchApi(path, data) { 
  console.log("hehehehetalhaaaaaaaae");
  return fetch(API_URL + path, data); 
}
