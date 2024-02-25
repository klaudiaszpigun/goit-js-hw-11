import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchData } from './api';

const input = document.querySelector('input');
const button = document.querySelector('button');
const container = document.querySelector('.gallery');
const fetchMore = document.querySelector('.load-more');

button.addEventListener('click', async event => {
  event.preventDefault();
  try {
    const response = await fetchData(input.value);
    const total = response.total;

    if (total !== undefined && total > 0) {
      Notify.success(`Hooray! We found ${total}`);
      const renderCode = response => {
        const array = response.hits;
        const result = array
          .map(({ webformatURL, likes, comments, views, downloads }) => {
            return `<div class="photo-card">
                          <img src="${webformatURL}" alt="${input.value}" loading="lazy" />
                            <div class="info">
                              <p class="info-item">
                                <b>Likes</b>
                                ${likes}
                              </p>
                              <p class="info-item">
                                <b>Views</b>
                                ${views}
                              </p>
                              <p class="info-item">
                                <b>Comments</b>
                                ${comments}
                              </p>
                              <p class="info-item">
                                <b>Downloads</b>
                                ${downloads}
                              </p>
                            </div>`;
          })
          .join('');
        container.insertAdjacentHTML('afterbegin', result);
        fetchMore.classList.remove('load-more');
      };

      renderCode(response);
    } else {
      Notify.failure('Try again');
    }
  } catch (error) {
    console.log(error);
  }
});

const renderPhotos = photos => {};

let page = 1;
let perpage = 40;

fetchMore.addEventListener('click', async () => {
  try {
    const fetchMorePhotos = await fetchMoreCallback(input.value);

    const renderMorePhotos = response => {
      const array = response.hits;
      const result = array
        .map(({ webformatURL, likes, comments, views, downloads }) => {
          return `<div class="photo-card">
                        <img src="${webformatURL}" alt="${input.value}" loading="lazy" />
                          <div class="info">
                            <p class="info-item">
                              <b>Likes</b>
                              ${likes}
                            </p>
                            <p class="info-item">
                              <b>Views</b>
                              ${views}
                            </p>
                            <p class="info-item">
                              <b>Comments</b>
                              ${comments}
                            </p>
                            <p class="info-item">
                              <b>Downloads</b>
                              ${downloads}
                            </p>
                          </div>`;
        })
        .join('');
    };
    renderMorePhotos(fetchMorePhotos);

    page += 1;
    if (page > 1) {
      fetchMore.textContent = 'fetch more photos';
    }
  } catch (error) {
    console.log(error);
  }
});

const fetchMoreCallback = (titleOfSearching) => {
  const params = new URLSearchParams({
    _limit: perPage,
    _page: page,
  });

  const response = await axios.get(
    `https://pixabay.com/api/?key=42539798-27c3408c7f5dca4caada8a6c7&q=${titleOfSearching}&image_type=photo${params}`
  );
  return response.data;
};
