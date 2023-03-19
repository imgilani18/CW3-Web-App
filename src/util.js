const API_URL = 'http://3.15.148.102'

export function fetchApi(path, data) { 
  return fetch(API_URL + path, data); 
}
