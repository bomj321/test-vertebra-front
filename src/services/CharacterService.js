import axios from 'axios';
import environment from '../libs/environment';

export default {
  getCharacters: (number = 1, size = 10) =>
    axios({
      method: 'GET',
      url: `${environment.baseUrl}/characters/?page=${number}&limit=${size}`,
    }),

  saveCharacter: (data) =>
    axios({
      method: 'POST',
      url: `${environment.baseUrl}/characters`,
      data,
    }),

  editCharacter: (data, id) =>
    axios({
      method: 'PUT',
      url: `${environment.baseUrl}/characters/${id}`,
      data,
    }),

  deleteCharacter: (id) =>
    axios({
      method: 'DELETE',
      url: `${environment.baseUrl}/characters/${id}`,
    }),
};
