import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { fetchImages } from './js/axios';
import markupGallery from './templates/markupGallery.hbs';

const searchForm = document.querySelector('.search-form');
//console.log(searchForm);
const input = document.querySelector('input');
//console.log(input);
const gallery = document.querySelector('.gallery');
//console.log(gallery);
const loadMoreBtn = document.querySelector('.load-more');
//console.log(loadMoreBtn);

let query = '';
let lightbox = new SimpleLightbox('.gallery a');
const perPage = 40;
let page = 1;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

loadMoreBtn.classList.add('is-hidden');

function onSearchForm(evt) {
  evt.preventDefault();
  page = 1;
  query = evt.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
  
  if (query) {
    fetchImages(query, page, perPage)
      .then(data => {
        if (data.totalHits === 0) {
          Notiflix.Notify.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          renderMarkupGallery(data.hits);
          lightbox.refresh();
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

          if (data.totalHits > perPage) {
            loadMoreBtn.classList.remove('is-hidden');
          }
        }
      })
      .catch(error => console.log(error));
  }
}

function onLoadMoreBtn() {
  page += 1;
  query = input.value.trim();
  fetchImages(query, page, perPage)
    .then(data => {
      renderMarkupGallery(data.hits);
      lightbox.refresh();
      const totalPages = Math.ceil(data.totalHits / perPage);
      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function renderMarkupGallery(images) {
  gallery.insertAdjacentHTML('beforeend', markupGallery(images));
}
