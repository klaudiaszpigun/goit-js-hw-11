import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', async event => {
  event.preventDefault();
  try {
    const response = await fetchData(input.value);
    const total = response.total;
    if (total !== undefined && total > 0) {
      Notify.success(`Hooray! We found ${total}`);
    } else {
      Notify.failure('Try again');
    }
  } catch (error) {
    console.log(error);
  }
});
