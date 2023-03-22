const API_URL = 'http://18.218.126.168:3000'
export function fetchApi(path, data) { 
  console.log("hehehehetalhaaaaaaaae");
  return fetch(API_URL + path, data); 
}
