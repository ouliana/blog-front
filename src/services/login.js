import axios from 'axios';
const baseURL = '/api/login';

export async function login(credentials) {
  try {
    var response = await axios.post(baseURL, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
