import axios from 'axios';
import environment from '../libs/environment';

export default {
  getEpisodes: (number = 1, size = 10) =>
    axios({
      method: 'GET',
      url: `${environment.baseUrl}/episodes/?page=${number}&limit=${size}`,
    }),

  saveEpisode: (data) =>
    axios({
      method: 'POST',
      url: `${environment.baseUrl}/episodes`,
      data,
    }),

  editEpisode: (data, id) =>
    axios({
      method: 'PUT',
      url: `${environment.baseUrl}/episodes/${id}`,
      data,
    }),

  deleteEpisode: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.baseUrl}/episodes/${id}`,
    }),
};
