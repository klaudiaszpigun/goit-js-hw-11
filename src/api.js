import axios from 'axios';

export const fetchPhotos = nameOfPhotos => {
  const key = '42539798-27c3408c7f5dca4caada8a6c7';
  axios
    .get(
      `https://pixabay.com/api/?key=${key}&q=${nameOfPhotos}&image_type=photo&pretty=true`
    )
    .then(response => response.data);
};
