import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30758964 - b2abbca2686476de38f5cecb6';
const params = new URLSearchParams({
  key: KEY,
  q: 'query',
  imageType: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});
console.log(params);

export async function fetchImages() {
  const response = await axios.get('${BASE_URL}${params}');
  console.log(response);
  return response;
}
