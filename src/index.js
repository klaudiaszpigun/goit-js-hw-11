import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchData } from './api';

const input = document.querySelector('input');
const button = document.querySelector('button');
const container = document.querySelector('.container');

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
          .map(({ previewURL, likes, comments, views, downloads }) => {
            return `<img src="${previewURL}" alt="${input.value}" width="150" height="84">
                <div>
                  <strong>likes:</strong>
                  <p>${likes}</p>
                  <strong>views:</strong>
                  <p>${views}</p>
                  <strong>comments:</strong>
                  <p>${comments}</p>
                  <strong>downloads:</strong>
                  <p>${downloads}</p>
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
