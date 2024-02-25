import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchData } from './api';

const input = document.querySelector('input');
const button = document.querySelector('button');
const container = document.querySelector('.gallery');

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
      };

      renderCode(response);
    } else {
      Notify.failure('Try again');
    }
  } catch (error) {
    console.log(error);
  }
});
