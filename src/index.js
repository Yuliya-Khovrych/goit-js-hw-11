import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchImages } from './js/axios';
import { markupGallery } from './js/markupGallery';

const searchForm = document.querySelector('.search-form');
console.log(searchForm);
const input = document.querySelector('input');
console.log(input);
const gallery = document.querySelector('.gallery');
console.log(gallery);

let query = '';

searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(evt) {
  evt.preventDefault();
  query = evt.currentTarget.searchQuery.value.trim();
  console.log(query);

  gallery.innerHTML = '';
  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  fetchImages(query)
    .then(({ data }) => {
      console.log(data);
      if (data.totalHits === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        markupGallery(data.hits);
      }
    })
    .catch(error => console.log(error));
}
