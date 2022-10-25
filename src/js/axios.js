import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30758964-b2abbca2686476de38f5cecb6';

export async function fetchImages(searchQuery, page, perPage) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );
  console.log(response.data);
  return response.data;
}
