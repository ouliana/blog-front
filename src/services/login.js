import axios from 'axios';
const baseURL = '/api/login';

export async function login(credentials) {
  console.log('login is running');
  try {
    var response = await axios.post(baseURL, credentials);
    console.log({ response });
    return response.data;
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
}
