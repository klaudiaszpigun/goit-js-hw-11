import axios from 'axios';

export const fetchData = nameOfPhotos => {
  const key = '42539798-27c3408c7f5dca4caada8a6c7';
  return axios
    .get(
      `https://pixabay.com/api/?key=${key}&q=${nameOfPhotos}&image_type=photo`
    )
    .then(response => response.data);
};
