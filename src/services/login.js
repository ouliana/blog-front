import axios from 'axios';
const baseURL = '/api/login';

const login = async credentials => {
  try {
    const response = await axios.post(baseURL, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Could not log in');
  }
};

export default { login };
