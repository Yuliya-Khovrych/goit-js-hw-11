import axios from 'axios';

const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30758964-b2abbca2686476de38f5cecb6';

// const params = new URLSearchParams({
//   key: KEY,
//   q: 'searchQuery',
//   imageType: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
// });

export async function fetchImages(searchQuery, page, perPage) {
  const response = await axios.get(
    '${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}'
  );
  console.log(response);
  return response;
}
