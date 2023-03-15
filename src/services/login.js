import axios from 'axios';
const baseURL = '/api/login';

const login = async credentials => {
  try {
    const response = await axios.post(baseURL, credentials);
    return response.data;
  } catch {
    throw new Error('Could not log in');
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
