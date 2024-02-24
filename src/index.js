import Notiflix from 'notiflix';
import { fetchPhotos } from './api';

const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', async event => {
  event.preventDefault();
  try {
    const response = await fetchPhotos(input.value);
    const total = response.total;
    if (total !== undefined && total > 0) {
      Notiflix.Notify.success(`Hooray! We found ${total}`);
    } else {
      Notiflix.Report.Warning(`Try again`);
    }
  } catch (error) {
    console.log(error);
  }
});
