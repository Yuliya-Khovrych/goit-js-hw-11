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

searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(evt) {
  evt.preventDefault();
  query = e.currentTarget.searchQuery.value.trim();
  console.log(query);

  fetchImages(query)
    .then(({ data }) => {
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
