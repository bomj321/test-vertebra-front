import axios from 'axios';
import environment from '../libs/environment';

export default {
  getLocations: (number = 1, size = 10) =>
    axios({
      method: 'GET',
      url: `${environment.baseUrl}/locations/?page=${number}&limit=${size}`,
    }),

  saveLocation: (data) =>
    axios({
      method: 'POST',
      url: `${environment.baseUrl}/locations`,
      data,
    }),

  editLocation: (data, id) =>
    axios({
      method: 'PUT',
      url: `${environment.baseUrl}/locations/${id}`,
      data,
    }),

  deleteLocation: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.baseUrl}/locations/${id}`,
    }),
};
